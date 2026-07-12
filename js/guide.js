/* =========================================================
   Voyage — 観光ガイド本体(guide.html 専用)
   データ(GUIDE_SPOTS, GUIDE_DAY)は防御的に参照。空でも壊れない。
   写真取得・音声・テーマは app.js の手法を自己完結で再実装。
   ========================================================= */
(function () {
  'use strict';

  // --- データを防御的に取得(別エージェント作成物が無くても落ちない) ---
  var SPOTS = (Array.isArray(window.GUIDE_SPOTS) ? window.GUIDE_SPOTS.slice() : [])
    .sort(function (a, b) { return (a && a.order || 0) - (b && b.order || 0); });
  var DAY = (window.GUIDE_DAY && typeof window.GUIDE_DAY === 'object') ? window.GUIDE_DAY : null;

  var $ = function (s, r) { return (r || document).querySelector(s); };

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function arr(x) { return Array.isArray(x) ? x : (x != null && x !== '' ? [x] : []); }

  // =========================================================
  // テーマ
  // =========================================================
  var themeBtn = $('#themeToggle');
  function setTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    try { localStorage.setItem('voyage.theme', t); } catch (e) {}
    if (themeBtn) themeBtn.setAttribute('aria-label', t === 'dark' ? 'ライトテーマに切替' : 'ダークテーマに切替');
  }
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var cur = document.documentElement.getAttribute('data-theme');
      setTheme(cur === 'dark' ? 'light' : 'dark');
    });
  }

  // =========================================================
  // 音声(Web Speech API / fr-FR)— app.js の speak 相当
  // =========================================================
  var synth = window.speechSynthesis || null;
  var frVoice = null;
  function pickVoice() {
    if (!synth) return;
    var voices = synth.getVoices() || [];
    frVoice = voices.find(function (v) { return /fr[-_]FR/i.test(v.lang); })
           || voices.find(function (v) { return /^fr/i.test(v.lang); }) || null;
  }
  if (synth) {
    pickVoice();
    if (typeof synth.onvoiceschanged !== 'undefined') synth.onvoiceschanged = pickVoice;
  }
  var activeBtn = null;
  function clearSpeaking() { if (activeBtn) { activeBtn.classList.remove('is-speaking'); activeBtn = null; } }
  function speak(text, btn) {
    if (!text || !synth || typeof window.SpeechSynthesisUtterance === 'undefined') return;
    try {
      synth.cancel(); clearSpeaking();
      var u = new SpeechSynthesisUtterance(text);
      u.lang = 'fr-FR'; u.rate = 0.92; u.pitch = 1.0;
      if (frVoice) u.voice = frVoice;
      if (btn) {
        activeBtn = btn; btn.classList.add('is-speaking');
        u.onend = u.onerror = function () { if (activeBtn === btn) clearSpeaking(); };
      }
      synth.speak(u);
    } catch (e) { clearSpeaking(); }
  }
  function makeSpeakBtn(text) {
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'speak-btn';
    b.setAttribute('aria-label', '「' + (text || '') + '」を発音');
    b.textContent = '🔊';
    b.addEventListener('click', function (e) { e.stopPropagation(); speak(text, b); });
    return b;
  }

  // =========================================================
  // 訪問チェック(localStorage: voyage.guide.visited)
  //   { "spotId::stopId": true } のマップで保持。
  // =========================================================
  var visited = loadVisited();
  function loadVisited() {
    try {
      var raw = JSON.parse(localStorage.getItem('voyage.guide.visited') || '{}');
      if (Array.isArray(raw)) { // 配列で保存されていても受け入れる
        var m = {}; raw.forEach(function (k) { m[k] = true; }); return m;
      }
      return (raw && typeof raw === 'object') ? raw : {};
    } catch (e) { return {}; }
  }
  function saveVisited() {
    try { localStorage.setItem('voyage.guide.visited', JSON.stringify(visited)); } catch (e) {}
  }
  function visitKey(spotId, stopId) { return (spotId || 'x') + '::' + (stopId || 'x'); }
  function isVisited(spotId, stopId) { return !!visited[visitKey(spotId, stopId)]; }
  function toggleVisited(spotId, stopId) {
    var k = visitKey(spotId, stopId);
    if (visited[k]) delete visited[k]; else visited[k] = true;
    saveVisited();
    return !!visited[k];
  }
  function spotProgress(spot) {
    var route = arr(spot && spot.route);
    var n = 0;
    route.forEach(function (st) { if (isVisited(spot.id, st.id)) n++; });
    return { done: n, total: route.length };
  }

  // =========================================================
  // 写真(Wikipedia REST summary、フォールバックは accent グラデ + icon)
  //   app.js と同じ手法。二重fetch防止キャッシュ + IO 遅延開始。
  // =========================================================
  var photoCache = new Map(); // wiki => Promise<string|null>
  function wikiSummaryUrl(w) { return 'https://en.wikipedia.org/api/rest_v1/page/summary/' + encodeURIComponent(w); }

  function fetchPhotoUrl(wiki) {
    if (!wiki) return Promise.resolve(null);
    if (photoCache.has(wiki)) return photoCache.get(wiki);
    var task;
    try {
      task = fetch(wikiSummaryUrl(wiki), { headers: { Accept: 'application/json' } })
        .then(function (r) { return (r && r.ok) ? r.json() : null; })
        .then(function (json) {
          var src = json && json.thumbnail && json.thumbnail.source;
          if (!src) return null;
          var hi = src.replace('/320px-', '/1200px-');
          return new Promise(function (resolve) {
            var pre = new Image();
            pre.onload = function () { resolve(hi); };
            pre.onerror = function () { resolve(null); };
            pre.src = hi;
          });
        })
        .catch(function () { return null; });
    } catch (e) { task = Promise.resolve(null); }
    photoCache.set(wiki, task);
    return task;
  }

  // accent 色ベースのグラデ + icon のサーフェス
  function buildSurface(accent, icon, caption) {
    var c = accent || '#1f3a6e';
    var surface = document.createElement('div');
    surface.className = 'photo-surface';
    surface.style.background = 'linear-gradient(150deg, ' + c + ' 0%, color-mix(in srgb, ' + c + ' 52%, #10131f) 100%)';
    var em = document.createElement('span');
    em.className = 'photo-surface__emoji'; em.setAttribute('aria-hidden', 'true');
    em.textContent = icon || '📷';
    surface.appendChild(em);
    if (caption) {
      var cap = document.createElement('span');
      cap.className = 'photo-surface__caption photo-surface__caption--guide';
      cap.textContent = caption;
      surface.appendChild(cap);
    }
    return surface;
  }
  function loadPhotoInto(surface, wiki, alt) {
    fetchPhotoUrl(wiki).then(function (url) {
      if (!url || !surface || !surface.isConnected) return;
      var img = document.createElement('img');
      img.className = 'photo-surface__img';
      img.alt = alt || ''; img.decoding = 'async'; img.loading = 'lazy';
      var reveal = function () { img.classList.add('is-loaded'); };
      img.addEventListener('load', reveal);
      img.src = url;
      if (img.complete) requestAnimationFrame(reveal);
      surface.appendChild(img);
      surface.classList.add('has-photo');
    }).catch(function () {});
  }

  // ビューポート接近で写真取得を開始(IO 非対応なら即時)
  var photoIO = ('IntersectionObserver' in window)
    ? new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            obs.unobserve(en.target);
            var t = en.target;
            loadPhotoInto(t._surface, t._wiki, t._alt);
          }
        });
      }, { rootMargin: '250px' })
    : null;
  function lazyPhoto(host, surface, wiki, alt) {
    if (!wiki) return;
    host._surface = surface; host._wiki = wiki; host._alt = alt;
    if (photoIO) photoIO.observe(host); else loadPhotoInto(surface, wiki, alt);
  }

  // =========================================================
  // 1日プラン(タイムライン)
  // =========================================================
  function renderDayPlan() {
    var mount = $('#dayPlan');
    if (!mount) return;
    var plan = DAY && arr(DAY.plan);
    if (!DAY || !plan || !plan.length) { mount.hidden = true; return; }

    var head = document.createElement('div');
    head.className = 'dayplan__head';
    head.innerHTML =
      '<h2 class="dayplan__title">' + esc(DAY.title || '今日のプラン') + '</h2>' +
      (DAY.intro ? '<p class="dayplan__intro">' + esc(DAY.intro) + '</p>' : '');
    mount.appendChild(head);

    var ol = document.createElement('ol');
    ol.className = 'timeline';
    plan.forEach(function (p) {
      var li = document.createElement('li');
      var inner = p.spotId ? document.createElement('a') : document.createElement('div');
      inner.className = 'tl-item';
      if (p.spotId) {
        inner.href = '#spot-' + p.spotId;
        inner.addEventListener('click', function (e) { smoothTo(p.spotId, e); });
      }
      inner.innerHTML =
        (p.time ? '<p class="tl-item__time">' + esc(p.time) + '</p>' : '') +
        '<h3 class="tl-item__title">' + esc(p.title || '') + '</h3>' +
        (p.note ? '<p class="tl-item__note">' + esc(p.note) + '</p>' : '') +
        (p.spotId ? '<span class="tl-item__go" aria-hidden="true">→</span>' : '');
      li.appendChild(inner);
      ol.appendChild(li);
    });
    mount.appendChild(ol);
  }

  function smoothTo(spotId, e) {
    var target = document.getElementById('spot-' + spotId);
    if (!target) return;
    if (e) e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (history.replaceState) history.replaceState(null, '', '#spot-' + spotId);
  }

  // =========================================================
  // スポットジャンプナビ(sticky チップ + 進捗 n/m)
  // =========================================================
  function renderNav() {
    var nav = $('#spotNav');
    var inner = $('#spotNavInner');
    if (!nav || !inner) return;
    if (!SPOTS.length) { nav.hidden = true; return; }
    nav.hidden = false;
    inner.innerHTML = '';
    SPOTS.forEach(function (spot) {
      var a = document.createElement('a');
      a.className = 'spotchip';
      a.href = '#spot-' + spot.id;
      a.style.setProperty('--chap', spot.accent || '');
      a.dataset.spot = spot.id;
      var pr = spotProgress(spot);
      a.innerHTML =
        '<span class="spotchip__icon" aria-hidden="true">' + esc(spot.icon || '📍') + '</span>' +
        '<span class="spotchip__name">' + esc(spot.name || '') + '</span>' +
        '<span class="spotchip__prog" data-prog="' + esc(spot.id) + '">' + pr.done + '/' + pr.total + '</span>';
      a.addEventListener('click', function (e) { smoothTo(spot.id, e); });
      inner.appendChild(a);
    });
  }

  function updateNavProgress(spot) {
    var pr = spotProgress(spot);
    var el = document.querySelector('.spotchip__prog[data-prog="' + cssEsc(spot.id) + '"]');
    if (el) el.textContent = pr.done + '/' + pr.total;
    var chip = document.querySelector('.spotchip[data-spot="' + cssEsc(spot.id) + '"]');
    if (chip) chip.classList.toggle('is-done', pr.total > 0 && pr.done === pr.total);
  }
  function cssEsc(s) { return String(s == null ? '' : s).replace(/["\\]/g, '\\$&'); }

  function setCurrentChip(spotId) {
    var chips = document.querySelectorAll('.spotchip');
    Array.prototype.forEach.call(chips, function (c) {
      var on = c.dataset.spot === spotId;
      c.classList.toggle('is-current', on);
      if (on && c.scrollIntoView) {
        try { c.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' }); } catch (e) {}
      }
    });
  }

  // =========================================================
  // スポット章
  // =========================================================
  function renderSpots() {
    var mount = $('#spots');
    if (!mount) return;
    if (!SPOTS.length) {
      mount.innerHTML =
        '<div class="gempty"><span class="gempty__icon" aria-hidden="true">🗺️</span>' +
        'ガイドを準備中です。もう少しお待ちください。</div>';
      return;
    }
    SPOTS.forEach(function (spot, i) { mount.appendChild(buildSpot(spot, i)); });
  }

  function buildSpot(spot, i) {
    var sec = document.createElement('section');
    sec.className = 'spot';
    sec.id = 'spot-' + spot.id;
    sec.dataset.spot = spot.id;
    if (spot.accent) sec.style.setProperty('--chap', spot.accent);

    // 写真ヒーロー
    var hero = document.createElement('div');
    hero.className = 'spot__hero';
    var surface = buildSurface(spot.accent, spot.icon, null);
    hero.appendChild(surface);
    var scrim = document.createElement('div');
    scrim.className = 'spot__hero-scrim'; scrim.setAttribute('aria-hidden', 'true');
    hero.appendChild(scrim);
    var cap = document.createElement('div');
    cap.className = 'spot__hero-cap';
    cap.innerHTML =
      '<span class="spot__badge">' + esc(spot.icon || '📍') + ' SPOT ' + (i + 1) + '</span>' +
      (spot.fr ? '<p class="spot__fr">' + esc(spot.fr) + '</p>' : '') +
      '<h2 class="spot__name">' + esc(spot.name || '') + '</h2>';
    hero.appendChild(cap);
    sec.appendChild(hero);
    lazyPhoto(hero, surface, spot.wiki, (spot.name || '') + (spot.fr ? ' — ' + spot.fr : ''));

    // tagline
    if (spot.tagline) {
      var tl = document.createElement('p');
      tl.className = 'spot__tagline'; tl.textContent = spot.tagline;
      sec.appendChild(tl);
    }
    // intro
    var intro = arr(spot.intro);
    if (intro.length) {
      var iw = document.createElement('div');
      iw.className = 'spot__intro';
      iw.innerHTML = intro.map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('');
      sec.appendChild(iw);
    }

    // practical(横スクロール)
    var practical = arr(spot.practical);
    if (practical.length) {
      sec.appendChild(subhead('🎫 実用情報'));
      var pw = document.createElement('div');
      pw.className = 'practical';
      practical.forEach(function (p) {
        var c = document.createElement('div');
        c.className = 'pcard';
        c.innerHTML =
          '<span class="pcard__icon" aria-hidden="true">' + esc(p.icon || 'ℹ️') + '</span>' +
          '<p class="pcard__title">' + esc(p.title || '') + '</p>' +
          '<p class="pcard__body">' + esc(p.body || '') + '</p>';
        pw.appendChild(c);
      });
      sec.appendChild(pw);
    }

    // phrases(音声ボタン付き)
    var phrases = arr(spot.phrases);
    if (phrases.length) {
      sec.appendChild(subhead('💬 ここで使う一言'));
      var gw = document.createElement('div');
      gw.className = 'gphrases';
      phrases.forEach(function (ph) {
        if (!ph || !ph.fr) return;
        var row = document.createElement('div');
        row.className = 'gphrase';
        var body = document.createElement('div');
        body.className = 'gphrase__body';
        body.innerHTML =
          '<p class="gphrase__fr">' + esc(ph.fr) + '</p>' +
          '<p class="gphrase__ja">' + esc(ph.ja || '') + '</p>' +
          (ph.kana ? '<p class="gphrase__kana">' + esc(ph.kana) + '</p>' : '');
        row.appendChild(body);
        row.appendChild(makeSpeakBtn(ph.fr));
        gw.appendChild(row);
      });
      sec.appendChild(gw);
    }

    // route(順路ストップ)
    var route = arr(spot.route);
    if (route.length) {
      sec.appendChild(subhead('🚶 順路'));
      var rw = document.createElement('div');
      rw.className = 'route';
      route.forEach(function (st, idx) { rw.appendChild(buildStop(spot, st, idx)); });
      sec.appendChild(rw);
    }

    return sec;
  }

  function subhead(text) {
    var h = document.createElement('h3');
    h.className = 'spot__subhead';
    h.textContent = text;
    return h;
  }

  function buildStop(spot, st, idx) {
    var card = document.createElement('article');
    card.className = 'stop';
    var on = isVisited(spot.id, st.id);
    if (on) card.classList.add('is-visited');

    // 番号バッジ
    var num = document.createElement('div');
    num.className = 'stop__num'; num.setAttribute('aria-hidden', 'true');
    num.textContent = on ? '✓' : String(idx + 1);

    var main = document.createElement('div');
    main.className = 'stop__main';

    // ヘッダー: name / fr / duration + ✓
    var head = document.createElement('div');
    head.className = 'stop__head';
    var titles = document.createElement('div');
    titles.className = 'stop__titles';
    titles.innerHTML =
      '<h4 class="stop__name">' + esc(st.name || '') + '</h4>' +
      (st.fr ? '<p class="stop__fr">' + esc(st.fr) + '</p>' : '') +
      (st.duration ? '<span class="stop__dur">' + esc(st.duration) + '</span>' : '');
    head.appendChild(titles);

    var check = document.createElement('button');
    check.type = 'button';
    check.className = 'stop__check' + (on ? ' is-on' : '');
    check.setAttribute('aria-pressed', String(on));
    check.setAttribute('aria-label', '「' + (st.name || '') + '」を見た');
    check.textContent = '✓';
    check.addEventListener('click', function () {
      var now = toggleVisited(spot.id, st.id);
      check.classList.toggle('is-on', now);
      check.setAttribute('aria-pressed', String(now));
      card.classList.toggle('is-visited', now);
      num.textContent = now ? '✓' : String(idx + 1);
      updateNavProgress(spot);
    });
    head.appendChild(check);
    main.appendChild(head);

    // headline(常時表示)
    if (st.headline) {
      var hl = document.createElement('p');
      hl.className = 'stop__headline'; hl.textContent = st.headline;
      main.appendChild(hl);
    }

    // サムネイル(ストップ個別 wiki があれば)
    if (st.wiki) {
      var thumb = document.createElement('div');
      thumb.className = 'stop__thumb';
      var tsurf = buildSurface(spot.accent, spot.icon, null);
      thumb.appendChild(tsurf);
      main.appendChild(thumb);
      lazyPhoto(thumb, tsurf, st.wiki, st.name || '');
    }

    // 見どころ(既定=開)
    var look = arr(st.look);
    if (look.length) {
      var d1 = document.createElement('details');
      d1.className = 'acc'; d1.open = true;
      d1.innerHTML =
        '<summary><span class="acc__ic" aria-hidden="true">👀</span>' +
        '<span class="acc__label">見どころ</span>' +
        '<span class="acc__count">' + look.length + '</span></summary>';
      var b1 = document.createElement('div');
      b1.className = 'acc__body';
      var ul = document.createElement('ul');
      ul.className = 'look';
      look.forEach(function (x) { var li = document.createElement('li'); li.textContent = x; ul.appendChild(li); });
      b1.appendChild(ul);
      d1.appendChild(b1);
      main.appendChild(d1);
    }

    // 物語(既定=閉)+ tips
    var story = arr(st.story);
    var tips = arr(st.tips);
    if (story.length || tips.length) {
      var d2 = document.createElement('details');
      d2.className = 'acc';
      d2.innerHTML =
        '<summary><span class="acc__ic" aria-hidden="true">📖</span>' +
        '<span class="acc__label">物語</span></summary>';
      var b2 = document.createElement('div');
      b2.className = 'acc__body';
      if (story.length) {
        var sd = document.createElement('div');
        sd.className = 'story';
        sd.innerHTML = story.map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('');
        b2.appendChild(sd);
      }
      if (tips.length) {
        var tw = document.createElement('div');
        tw.className = 'tips';
        tw.innerHTML =
          '<p class="tips__head">💡 tips</p><ul>' +
          tips.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul>';
        b2.appendChild(tw);
      }
      d2.appendChild(b2);
      main.appendChild(d2);
    }

    // photoSpot 📷
    if (st.photoSpot) {
      var ps = document.createElement('div');
      ps.className = 'photospot';
      ps.innerHTML =
        '<span class="photospot__ic" aria-hidden="true">📷</span>' +
        '<div class="photospot__body"><p class="photospot__label">撮影ポイント</p>' +
        '<p class="photospot__text">' + esc(st.photoSpot) + '</p></div>';
      main.appendChild(ps);
    }

    card.appendChild(num);
    card.appendChild(main);
    return card;
  }

  // =========================================================
  // 現在章ハイライト(IntersectionObserver)
  // =========================================================
  function observeSpots() {
    if (!SPOTS.length) return;
    var sections = Array.prototype.slice.call(document.querySelectorAll('.spot'));
    if (!sections.length) return;
    if (!('IntersectionObserver' in window)) { return; }
    var ratios = {};
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { ratios[en.target.id] = en.isIntersecting ? en.intersectionRatio : 0; });
      // 最も見えている章を現在に
      var best = null, bestR = 0;
      sections.forEach(function (s) {
        var r = ratios[s.id] || 0;
        if (r > bestR) { bestR = r; best = s; }
      });
      if (best && bestR > 0) setCurrentChip(best.dataset.spot);
    }, { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.01, 0.25, 0.5, 1] });
    sections.forEach(function (s) { io.observe(s); });
  }

  // =========================================================
  // 初期化
  // =========================================================
  function init() {
    renderDayPlan();
    renderNav();
    renderSpots();
    observeSpots();

    // ハッシュ付きで開かれた場合、該当章へ
    if (location.hash && /^#spot-/.test(location.hash)) {
      var id = location.hash.replace('#spot-', '');
      setTimeout(function () { smoothTo(id); }, 60);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // 公開API(データ後読み込み時の再描画など)
  window.VoyageGuide = {
    speak: speak,
    setTheme: setTheme,
    refresh: init
  };
})();
