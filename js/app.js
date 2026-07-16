/* =========================================================
   Voyage — 旅するフランス語  アプリ本体
   ナビ / 描画 / 音声 / お気に入り / テーマ
   データ(PHRASES_DATA, CULTURE_DATA, Quiz)は防御的に参照する。
   ========================================================= */
(function () {
  'use strict';

  // --- データを防御的に取得(別エージェント作成物が無くても落ちない) ---
  var PHRASES = Array.isArray(window.PHRASES_DATA) ? window.PHRASES_DATA : [];
  var CULTURE = Array.isArray(window.CULTURE_DATA) ? window.CULTURE_DATA : [];
  var PHOTOS = Array.isArray(window.PHOTOS_DATA) ? window.PHOTOS_DATA : [];

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  // 全フレーズ(カテゴリ情報つき)をフラット化
  var ALL_PHRASES = [];
  PHRASES.forEach(function (cat) {
    (cat.phrases || []).forEach(function (p) {
      ALL_PHRASES.push({
        catId: cat.id, catName: cat.name, catIcon: cat.icon,
        fr: p.fr, ja: p.ja, kana: p.kana, note: p.note,
        key: (cat.id || 'x') + '::' + (p.fr || '')
      });
    });
  });

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
  // 音声 (Web Speech API)— 既定言語は window.APP_LANG(なければ fr-FR)
  // =========================================================
  var synth = window.speechSynthesis || null;
  var APP_LANG = window.APP_LANG || 'fr-FR';
  var langVoice = null;
  function pickVoice() {
    if (!synth) return;
    var voices = synth.getVoices() || [];
    var full = new RegExp(APP_LANG.replace('-', '[-_]'), 'i');
    var prefix = new RegExp('^' + APP_LANG.split('-')[0], 'i');
    langVoice = voices.find(function (v) { return full.test(v.lang); })
             || voices.find(function (v) { return prefix.test(v.lang); })
             || null;
  }
  if (synth) {
    pickVoice();
    if (typeof synth.onvoiceschanged !== 'undefined') {
      synth.onvoiceschanged = pickVoice;
    }
  }

  var activeBtn = null;
  function clearSpeakingState() {
    if (activeBtn) { activeBtn.classList.remove('is-speaking'); activeBtn = null; }
  }

  // 公開する speak(text[, btn][, rate])— rate はシャドーイングのスロー再生用
  function speak(text, btn, rate) {
    if (!text) return;
    if (!synth || typeof window.SpeechSynthesisUtterance === 'undefined') return;
    try {
      synth.cancel();          // 連打時に前の再生を止める
      clearSpeakingState();
      var u = new SpeechSynthesisUtterance(text);
      u.lang = APP_LANG;
      u.rate = typeof rate === 'number' ? rate : 0.92;
      u.pitch = 1.0;
      if (langVoice) u.voice = langVoice;
      if (btn) {
        activeBtn = btn;
        btn.classList.add('is-speaking');
        u.onend = u.onerror = function () { if (activeBtn === btn) clearSpeakingState(); };
      }
      synth.speak(u);
    } catch (e) { clearSpeakingState(); }
  }

  // 音声ボタン要素を生成
  function makeSpeakBtn(text) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'speak-btn';
    b.setAttribute('aria-label', '「' + (text || '') + '」を発音');
    b.textContent = '🔊';
    b.addEventListener('click', function (e) { e.stopPropagation(); speak(text, b); });
    return b;
  }

  // 見せるカードを開くボタン要素を生成
  function makeShowBtn(fr, ja) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'show-btn';
    b.setAttribute('aria-label', 'カードを見せる');
    b.textContent = '🪧';
    b.addEventListener('click', function (e) { e.stopPropagation(); showCard(fr, ja); });
    return b;
  }

  // =========================================================
  // お気に入り (localStorage: window.APP_FAV_KEY / 既定 voyage.favs)
  // =========================================================
  var FAV_KEY = window.APP_FAV_KEY || 'voyage.favs';
  var favs = loadFavs();
  function loadFavs() {
    try { return JSON.parse(localStorage.getItem(FAV_KEY) || '[]') || []; }
    catch (e) { return []; }
  }
  function saveFavs() {
    try { localStorage.setItem(FAV_KEY, JSON.stringify(favs)); } catch (e) {}
  }
  function isFav(key) { return favs.indexOf(key) !== -1; }
  function toggleFav(key) {
    var i = favs.indexOf(key);
    if (i === -1) favs.push(key); else favs.splice(i, 1);
    saveFavs();
    return i === -1;
  }

  // =========================================================
  // ホーム: 今日のフレーズ(日付ベースのローテーション)
  // =========================================================
  function dayIndex() {
    var now = new Date();
    // 通算日数でローテーション
    return Math.floor(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) / 86400000);
  }
  function renderDaily() {
    var mount = $('#dailyPhrase');
    if (!mount) return;
    if (!ALL_PHRASES.length) {
      mount.innerHTML = '<div class="card daily__card"><div class="daily__body"><p class="daily__ja">フレーズを準備中です。</p></div></div>';
      return;
    }
    var p = ALL_PHRASES[dayIndex() % ALL_PHRASES.length];
    var card = document.createElement('div');
    card.className = 'card daily__card';

    var quote = document.createElement('div');
    quote.className = 'daily__quote'; quote.setAttribute('aria-hidden', 'true'); quote.textContent = '“';

    var body = document.createElement('div');
    body.className = 'daily__body';
    body.innerHTML =
      '<p class="daily__label">Phrase du jour · ' + esc(p.catName || '') + '</p>' +
      '<p class="daily__fr">' + esc(p.fr) + '</p>' +
      '<p class="daily__ja">' + esc(p.ja) + '</p>' +
      '<p class="daily__kana">' + esc(p.kana) + '</p>' +
      (p.note ? '<p class="daily__note">💡 ' + esc(p.note) + '</p>' : '');

    var actions = document.createElement('div');
    actions.className = 'daily__actions';
    actions.appendChild(makeSpeakBtn(p.fr));
    actions.appendChild(makeShowBtn(p.fr, p.ja));

    card.appendChild(quote); card.appendChild(body); card.appendChild(actions);
    mount.innerHTML = ''; mount.appendChild(card);
  }

  // =========================================================
  // フレーズ集
  // =========================================================
  var phraseState = { cat: 'all', favOnly: false };

  function renderPhraseChips() {
    var wrap = $('#phraseChips');
    if (!wrap) return;
    wrap.innerHTML = '';

    function chip(label, active, onClick, extraClass) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'chip' + (active ? ' is-active' : '') + (extraClass ? ' ' + extraClass : '');
      b.innerHTML = label;
      b.addEventListener('click', onClick);
      wrap.appendChild(b);
      return b;
    }

    chip('すべて', phraseState.cat === 'all' && !phraseState.favOnly, function () {
      phraseState.cat = 'all'; renderPhraseChips(); renderPhraseList();
    });
    PHRASES.forEach(function (cat) {
      chip((cat.icon ? cat.icon + ' ' : '') + esc(cat.name), phraseState.cat === cat.id, function () {
        phraseState.cat = cat.id; renderPhraseChips(); renderPhraseList();
      });
    });
    chip('☆ お気に入り', phraseState.favOnly, function () {
      phraseState.favOnly = !phraseState.favOnly; renderPhraseChips(); renderPhraseList();
    }, 'chip--fav');
  }

  function renderPhraseList() {
    var list = $('#phraseList');
    if (!list) return;
    var items = ALL_PHRASES.filter(function (p) {
      if (phraseState.cat !== 'all' && p.catId !== phraseState.cat) return false;
      if (phraseState.favOnly && !isFav(p.key)) return false;
      return true;
    });

    list.innerHTML = '';
    if (!items.length) {
      list.innerHTML = '<div class="empty"><span class="empty__icon">' +
        (phraseState.favOnly ? '☆' : '🥐') + '</span>' +
        (phraseState.favOnly ? 'お気に入りはまだありません。☆で保存できます。' : 'フレーズを準備中です。') +
        '</div>';
      return;
    }

    items.forEach(function (p, i) {
      var card = document.createElement('article');
      card.className = 'card phrase-card';
      card.style.animationDelay = Math.min(i * 28, 320) + 'ms';

      var top = document.createElement('div');
      top.className = 'phrase-card__top';
      var fr = document.createElement('p');
      fr.className = 'phrase-card__fr'; fr.textContent = p.fr || '';
      top.appendChild(fr);

      var meta = document.createElement('div');
      meta.innerHTML =
        '<p class="phrase-card__ja">' + esc(p.ja) + '</p>' +
        '<p class="phrase-card__kana">' + esc(p.kana) + '</p>' +
        (p.note ? '<p class="phrase-card__note">💡 ' + esc(p.note) + '</p>' : '');

      var actions = document.createElement('div');
      actions.className = 'phrase-card__actions';
      actions.appendChild(makeSpeakBtn(p.fr));
      actions.appendChild(makeShowBtn(p.fr, p.ja));

      var favBtn = document.createElement('button');
      favBtn.type = 'button';
      favBtn.className = 'fav-btn' + (isFav(p.key) ? ' is-fav' : '');
      favBtn.setAttribute('aria-pressed', String(isFav(p.key)));
      favBtn.setAttribute('aria-label', 'お気に入り');
      favBtn.textContent = isFav(p.key) ? '★' : '☆';
      favBtn.addEventListener('click', function () {
        var on = toggleFav(p.key);
        favBtn.classList.toggle('is-fav', on);
        favBtn.textContent = on ? '★' : '☆';
        favBtn.setAttribute('aria-pressed', String(on));
        if (!on && phraseState.favOnly) renderPhraseList(); // フィルタ中に外したら消す
      });
      actions.appendChild(favBtn);

      card.appendChild(top);
      card.appendChild(meta);
      card.appendChild(actions);
      list.appendChild(card);
    });
  }

  // =========================================================
  // 文化ガイド
  // =========================================================
  var cultureState = { cat: 'all' };

  function cultureCategories() {
    var seen = [], out = [];
    CULTURE.forEach(function (a) {
      if (a.category && seen.indexOf(a.category) === -1) { seen.push(a.category); out.push(a.category); }
    });
    return out;
  }

  function renderCultureChips() {
    var wrap = $('#cultureChips');
    if (!wrap) return;
    wrap.innerHTML = '';
    function chip(label, active, val) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'chip' + (active ? ' is-active' : '');
      b.textContent = label;
      b.addEventListener('click', function () { cultureState.cat = val; renderCultureChips(); renderCultureList(); });
      wrap.appendChild(b);
    }
    chip('すべて', cultureState.cat === 'all', 'all');
    cultureCategories().forEach(function (c) { chip(c, cultureState.cat === c, c); });
  }

  function renderCultureList() {
    var list = $('#cultureList');
    if (!list) return;
    var items = CULTURE.filter(function (a) {
      return cultureState.cat === 'all' || a.category === cultureState.cat;
    });
    list.innerHTML = '';
    if (!items.length) {
      list.innerHTML = '<div class="empty"><span class="empty__icon">📖</span>文化ガイドを準備中です。</div>';
      return;
    }
    items.forEach(function (a, i) {
      var card = document.createElement('article');
      card.className = 'culture-card';
      card.style.animationDelay = Math.min(i * 30, 320) + 'ms';
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.innerHTML =
        '<div class="culture-card__top">' +
          '<span class="culture-card__icon" aria-hidden="true">' + esc(a.icon || '📖') + '</span>' +
          '<div><span class="culture-card__cat">' + esc(a.category || '') + '</span>' +
          '<h3 class="culture-card__title">' + esc(a.title || '') + '</h3></div>' +
        '</div>' +
        '<p class="culture-card__summary">' + esc(a.summary || '') + '</p>' +
        '<span class="culture-card__more">続きを読む →</span>';
      card.addEventListener('click', function () { openCultureModal(a); });
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openCultureModal(a); }
      });
      list.appendChild(card);
    });
  }

  // =========================================================
  // モーダル
  // =========================================================
  var modal = $('#modal');
  var modalBody = $('#modalBody');
  var lastFocused = null;

  function openCultureModal(a) {
    if (!modal || !modalBody) return;
    lastFocused = document.activeElement;
    var paras = (Array.isArray(a.body) ? a.body : (a.body ? [a.body] : []))
      .map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('');

    var html =
      '<div class="modal__icon" aria-hidden="true">' + esc(a.icon || '📖') + '</div>' +
      '<span class="modal__cat">' + esc(a.category || '') + '</span>' +
      '<h2 class="modal__title" id="modalTitle">' + esc(a.title || '') + '</h2>' +
      '<div class="modal__text">' + paras + '</div>';
    modalBody.innerHTML = html;

    // 文化記事に紐づく写真があれば、上部に写真ヘッダー(下地→読み込めたらフェードイン)
    var headerPhoto = PHOTOS.filter(function (p) { return p.cultureId && p.cultureId === a.id; })[0];
    if (headerPhoto) {
      var head = document.createElement('div');
      head.className = 'modal__photo';
      var headSurface = buildPhotoSurface(headerPhoto, false);
      head.appendChild(headSurface);
      modalBody.insertBefore(head, modalBody.firstChild);
      loadPhotoInto(headSurface, headerPhoto);
    }

    // 関連フレーズ(音声ボタンつき)
    if (a.phrase && a.phrase.fr) {
      var box = document.createElement('div');
      box.className = 'modal__phrase';
      var pb = document.createElement('div');
      pb.className = 'modal__phrase-body';
      pb.innerHTML =
        '<p class="modal__phrase-fr">' + esc(a.phrase.fr) + '</p>' +
        '<p class="modal__phrase-ja">' + esc(a.phrase.ja || '') + '</p>' +
        (a.phrase.kana ? '<p class="modal__phrase-kana">' + esc(a.phrase.kana) + '</p>' : '');
      box.appendChild(pb);
      box.appendChild(makeSpeakBtn(a.phrase.fr));
      modalBody.appendChild(box);
    }

    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    var closeBtn = $('.modal__close', modal);
    if (closeBtn) closeBtn.focus();
  }

  function closeModal() {
    if (!modal || modal.hidden) return;
    modal.hidden = true;
    // 多重ロック配慮: 他のオーバーレイが開いていなければ解除
    if ((!lightbox || lightbox.hidden) && (!showcardEl || showcardEl.hidden)) {
      document.body.style.overflow = '';
    }
    if (synth) synth.cancel();
    clearSpeakingState();
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }

  if (modal) {
    $$('[data-close]', modal).forEach(function (el) { el.addEventListener('click', closeModal); });
  }

  // =========================================================
  // ナビゲーション
  // =========================================================
  var VIEWS = ['home', 'phrases', 'learn', 'culture', 'quiz'];

  function navigate(view) {
    if (VIEWS.indexOf(view) === -1) view = 'home';

    VIEWS.forEach(function (v) {
      var sec = $('#view-' + v);
      if (sec) {
        var on = v === view;
        sec.hidden = !on;
        sec.classList.toggle('is-active', on);
      }
    });
    $$('.tabs__btn').forEach(function (btn) {
      var on = btn.getAttribute('data-nav') === view;
      btn.classList.toggle('is-active', on);
      btn.setAttribute('aria-selected', String(on));
    });

    // 音声を止める
    if (synth) synth.cancel();
    clearSpeakingState();

    if (view === 'quiz') initQuiz();
    if (view === 'learn') initLearn();

    // フォーカスとスクロール
    var sec = $('#view-' + view);
    if (sec) { try { sec.focus({ preventScroll: true }); } catch (e) {} }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function initLearn() {
    var mount = $('#learnRoot');
    if (!mount) return;
    if (window.Learn && typeof window.Learn.init === 'function') {
      try {
        window.Learn.init(mount, {
          phrasesData: PHRASES,
          dialogues: window.DIALOGUES_DATA || [],
          grammar: window.GRAMMAR_DATA || [],
          vocab: window.VOCAB_DATA || [],
          speak: speak,
          lang: APP_LANG,
          storagePrefix: window.APP_STORE_PREFIX || 'voyage.fr'
        });
      } catch (e) {
        mount.innerHTML = '<div class="quiz-fallback">レッスンの読み込みに失敗しました。</div>';
      }
    } else {
      mount.innerHTML = '<div class="quiz-fallback"><p style="font-size:2rem;margin:0 0 8px">📚</p>レッスンを準備中です。</div>';
    }
  }

  function initQuiz() {
    var mount = $('#quizRoot');
    if (!mount) return;
    if (window.Quiz && typeof window.Quiz.init === 'function') {
      // タブを開き直すたびに再init可能に
      mount.innerHTML = '';
      try {
        window.Quiz.init(mount, PHRASES, speak);
      } catch (e) {
        mount.innerHTML = '<div class="quiz-fallback">クイズの読み込みに失敗しました。</div>';
      }
    } else {
      mount.innerHTML = '<div class="quiz-fallback"><p style="font-size:2rem;margin:0 0 8px">🎯</p>クイズを準備中です。</div>';
    }
  }

  // data-nav 属性を持つ全要素でナビ
  document.addEventListener('click', function (e) {
    var el = e.target.closest ? e.target.closest('[data-nav]') : null;
    if (el) {
      e.preventDefault();
      navigate(el.getAttribute('data-nav'));
    }
  });

  // =========================================================
  // フォトギャラリー(フランスの風景)
  //   PHOTOS_DATA は防御的に参照。無ければセクションごと非表示。
  //   写真は実行時に Wikipedia REST API から取得。失敗・オフライン時は
  //   grad + emoji + caption の下地のまま(=決して壊れて見えない)。
  // =========================================================
  var photoUrlCache = new Map(); // wiki => Promise<string|null>(同一写真の二重fetch防止)

  function wikiSummaryUrl(wiki) {
    return 'https://en.wikipedia.org/api/rest_v1/page/summary/' + encodeURIComponent(wiki);
  }
  function wikiPageUrl(wiki) {
    return 'https://en.wikipedia.org/wiki/' + encodeURIComponent(wiki);
  }

  // Wikipedia のリード画像(1200px)URLを取得。例外は絶対に外へ漏らさない。
  function fetchPhotoUrl(photo) {
    if (!photo || !photo.wiki) return Promise.resolve(null);
    if (photoUrlCache.has(photo.wiki)) return photoUrlCache.get(photo.wiki);
    var task;
    try {
      task = fetch(wikiSummaryUrl(photo.wiki), { headers: { Accept: 'application/json' } })
        .then(function (r) { return (r && r.ok) ? r.json() : null; })
        .then(function (json) {
          var src = json && json.thumbnail && json.thumbnail.source;
          if (!src) return null;
          var hi = src.replace('/320px-', '/1200px-');
          // 実画像をプリロードし、読み込み成功時のみ採用
          return new Promise(function (resolve) {
            var pre = new Image();
            pre.onload = function () { resolve(hi); };
            pre.onerror = function () { resolve(null); };
            pre.src = hi;
          });
        })
        .catch(function () { return null; });
    } catch (e) {
      task = Promise.resolve(null);
    }
    photoUrlCache.set(photo.wiki, task);
    return task;
  }

  // グラデ下地 + emoji (+caption) のサーフェスを生成
  function buildPhotoSurface(photo, withCaption) {
    var g = (photo && photo.grad && photo.grad.length >= 2) ? photo.grad : ['#2a2350', '#c96f4a'];
    var surface = document.createElement('div');
    surface.className = 'photo-surface';
    surface.style.background = 'linear-gradient(145deg, ' + g[0] + ' 0%, ' + g[1] + ' 100%)';

    var emoji = document.createElement('span');
    emoji.className = 'photo-surface__emoji';
    emoji.setAttribute('aria-hidden', 'true');
    emoji.textContent = (photo && photo.emoji) || '📷';
    surface.appendChild(emoji);

    if (withCaption && photo && photo.caption) {
      var cap = document.createElement('span');
      cap.className = 'photo-surface__caption';
      cap.textContent = photo.caption;
      surface.appendChild(cap);
    }
    return surface;
  }

  // サーフェスに写真をフェードインで重ねる(取得成功時のみ)
  function loadPhotoInto(surface, photo) {
    fetchPhotoUrl(photo).then(function (url) {
      if (!url || !surface || !surface.isConnected) return;
      var img = document.createElement('img');
      img.className = 'photo-surface__img';
      img.alt = (photo.name || '') + (photo.place ? ' — ' + photo.place : '');
      img.decoding = 'async';
      img.loading = 'lazy';
      var reveal = function () { img.classList.add('is-loaded'); };
      img.addEventListener('load', reveal);
      img.src = url; // プリロード済みのためキャッシュから即描画
      if (img.complete) requestAnimationFrame(reveal);
      surface.appendChild(img);
      surface.classList.add('has-photo');
    }).catch(function () {});
  }

  // ギャラリーのフォトカードを生成
  function buildGalleryCard(photo) {
    var card = document.createElement('button');
    card.type = 'button';
    card.className = 'photo-card';
    card.setAttribute('role', 'listitem');
    card.setAttribute('aria-label', (photo.name || '写真') + (photo.place ? '(' + photo.place + ')' : '') + ' を拡大表示');

    var surface = buildPhotoSurface(photo, true);
    card.appendChild(surface);

    var scrim = document.createElement('div');
    scrim.className = 'photo-card__scrim';
    scrim.setAttribute('aria-hidden', 'true');
    card.appendChild(scrim);

    var meta = document.createElement('div');
    meta.className = 'photo-card__meta';
    meta.innerHTML =
      '<span class="photo-card__name">' + esc(photo.name || '') + '</span>' +
      (photo.place ? '<span class="photo-card__place">' + esc(photo.place) + '</span>' : '');
    card.appendChild(meta);

    card._photo = photo;
    card._surface = surface;
    card.addEventListener('click', function () { openLightbox(photo); });
    return card;
  }

  function renderGallery() {
    var section = $('#gallerySection');
    var mount = $('#photoGallery');
    if (!section || !mount) return;
    if (!PHOTOS.length) { section.hidden = true; return; } // 未定義なら非表示
    section.hidden = false;
    mount.innerHTML = '';

    var cards = PHOTOS.map(function (photo, i) {
      var card = buildGalleryCard(photo);
      card.style.animationDelay = Math.min(i * 40, 360) + 'ms';
      mount.appendChild(card);
      return card;
    });

    // ビューポートに入ってから fetch を開始(IO非対応なら即時)
    var start = function () { cards.forEach(function (c) { loadPhotoInto(c._surface, c._photo); }); };
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { obs.disconnect(); start(); }
        });
      }, { rootMargin: '200px' });
      io.observe(section);
    } else {
      start();
    }
  }

  // --- ライトボックス(写真拡大 + 出典) ---
  var lightbox = $('#lightbox');
  var lbStage = $('#lightboxStage');
  var lbCaption = $('#lightboxCaption');
  var lbLastFocused = null;

  function openLightbox(photo) {
    if (!lightbox || !lbStage || !lbCaption) return;
    lbLastFocused = document.activeElement;

    lbStage.innerHTML = '';
    var surface = buildPhotoSurface(photo, false);
    lbStage.appendChild(surface);
    loadPhotoInto(surface, photo);

    lbCaption.innerHTML =
      '<h2 class="lightbox__name" id="lightboxTitle">' + esc(photo.name || '') + '</h2>' +
      (photo.place ? '<p class="lightbox__place">' + esc(photo.place) + '</p>' : '') +
      (photo.caption ? '<p class="lightbox__text">' + esc(photo.caption) + '</p>' : '') +
      (photo.wiki ?
        '<p class="lightbox__source">画像: <a href="' + esc(wikiPageUrl(photo.wiki)) +
          '" target="_blank" rel="noopener">Wikipedia より</a></p>' : '');

    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
    var closeBtn = $('.lightbox__close', lightbox);
    if (closeBtn) closeBtn.focus();
  }

  function closeLightbox() {
    if (!lightbox || lightbox.hidden) return;
    lightbox.hidden = true;
    // 多重ロック配慮: 他のオーバーレイが開いていなければ解除
    if ((!modal || modal.hidden) && (!showcardEl || showcardEl.hidden)) {
      document.body.style.overflow = '';
    }
    if (lbStage) lbStage.innerHTML = '';
    if (lbLastFocused && lbLastFocused.focus) lbLastFocused.focus();
  }

  if (lightbox) {
    $$('[data-lb-close]', lightbox).forEach(function (el) { el.addEventListener('click', closeLightbox); });
  }

  // =========================================================
  // 見せるカード(全画面オーバーレイ)
  //   発音に自信がなくても、フレーズを店員に「見せるだけ」で伝える。
  //   仏語を特大表示 → 日本語訳 → 案内。タップ/Escで閉じる。
  // =========================================================
  var showcardEl = null, showcardFr = null, showcardJa = null, showcardInner = null;
  var showcardLastFocused = null;

  function buildShowcard() {
    if (showcardEl) return;
    showcardEl = document.createElement('div');
    showcardEl.id = 'showcard';
    showcardEl.className = 'showcard';
    showcardEl.setAttribute('role', 'dialog');
    showcardEl.setAttribute('aria-modal', 'true');
    showcardEl.setAttribute('aria-label', '見せるカード');
    showcardEl.hidden = true;

    var closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'showcard__close';
    closeBtn.setAttribute('aria-label', '閉じる');
    closeBtn.textContent = '✕';

    showcardInner = document.createElement('div');
    showcardInner.className = 'showcard__inner';

    showcardFr = document.createElement('p');
    showcardFr.className = 'showcard__fr';
    showcardJa = document.createElement('p');
    showcardJa.className = 'showcard__ja';
    var hint = document.createElement('p');
    hint.className = 'showcard__hint';
    hint.textContent = 'この画面をお店の人に見せてください 🙂';

    showcardInner.appendChild(showcardFr);
    showcardInner.appendChild(showcardJa);
    showcardInner.appendChild(hint);
    showcardEl.appendChild(closeBtn);
    showcardEl.appendChild(showcardInner);
    document.body.appendChild(showcardEl);

    // どこをタップしても閉じる(×ボタンのクリックもここへ伝播)
    showcardEl.addEventListener('click', closeShowcard);
  }

  // 仏語が画面からはみ出さないよう、収まるまでフォントを縮める(最大4行程度)
  function fitShowcard() {
    if (!showcardEl || showcardEl.hidden || !showcardFr || !showcardInner) return;
    var size = Math.min(window.innerWidth / 4.2, window.innerHeight / 3.2, 176);
    size = Math.max(size, 30);
    showcardFr.classList.remove('is-clamped');
    showcardFr.style.fontSize = size + 'px';
    var guard = 90;
    while (guard-- > 0 && size > 26 &&
           (showcardInner.scrollHeight > showcardInner.clientHeight ||
            showcardFr.scrollWidth > showcardFr.clientWidth)) {
      size -= 3;
      showcardFr.style.fontSize = size + 'px';
    }
    // それでも横に溢れる超長語だけは途中改行を許可
    if (showcardFr.scrollWidth > showcardFr.clientWidth) showcardFr.classList.add('is-clamped');
  }

  function showCard(fr, ja) {
    fr = fr == null ? '' : String(fr);
    ja = ja == null ? '' : String(ja);
    if (!fr && !ja) return;
    buildShowcard();
    showcardLastFocused = document.activeElement;
    showcardFr.textContent = fr;
    showcardJa.textContent = ja;
    showcardJa.style.display = ja ? '' : 'none';
    showcardEl.hidden = false;
    document.body.style.overflow = 'hidden';
    fitShowcard();
    var cb = showcardEl.querySelector('.showcard__close');
    if (cb) { try { cb.focus(); } catch (e) {} }
  }

  function closeShowcard() {
    if (!showcardEl || showcardEl.hidden) return;
    showcardEl.hidden = true;
    // 多重ロック配慮: 他のオーバーレイが開いていなければ解除
    if ((!modal || modal.hidden) && (!lightbox || lightbox.hidden)) {
      document.body.style.overflow = '';
    }
    if (showcardLastFocused && showcardLastFocused.focus) {
      try { showcardLastFocused.focus(); } catch (e) {}
    }
  }

  // Escape は最前面のオーバーレイだけを閉じる(見せるカード → ライトボックス → モーダルの順)
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (showcardEl && !showcardEl.hidden) { closeShowcard(); return; }
    if (lightbox && !lightbox.hidden) { closeLightbox(); return; }
    closeModal();
  });
  window.addEventListener('resize', function () { if (showcardEl && !showcardEl.hidden) fitShowcard(); });
  window.addEventListener('orientationchange', function () { if (showcardEl && !showcardEl.hidden) fitShowcard(); });

  // =========================================================
  // ユーティリティ
  // =========================================================
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  // =========================================================
  // 初期化
  // =========================================================
  function init() {
    renderDaily();
    renderPhraseChips();
    renderPhraseList();
    renderCultureChips();
    renderCultureList();
    renderGallery();
    navigate('home');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // =========================================================
  // 公開API
  // =========================================================
  window.VoyageApp = {
    speak: speak,             // (frenchText[, btnEl]) => void
    navigate: navigate,       // (viewName) => void
    setTheme: setTheme,       // ('light'|'dark') => void
    toggleFav: toggleFav,     // (key) => boolean
    isFav: isFav,             // (key) => boolean
    showCard: showCard,       // (fr, ja) => void  見せるカードを開く
    refresh: init             // データ後読み込み時などに再描画
  };
})();
