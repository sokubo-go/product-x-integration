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
  // 音声 (Web Speech API / fr-FR)
  // =========================================================
  var synth = window.speechSynthesis || null;
  var frVoice = null;
  function pickVoice() {
    if (!synth) return;
    var voices = synth.getVoices() || [];
    // フランス語ボイスを優先(女性/Google/Amélie 等があれば尚可)
    frVoice = voices.find(function (v) { return /fr[-_]FR/i.test(v.lang); })
           || voices.find(function (v) { return /^fr/i.test(v.lang); })
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

  // 公開する speak(text[, btn])
  function speak(text, btn) {
    if (!text) return;
    if (!synth || typeof window.SpeechSynthesisUtterance === 'undefined') return;
    try {
      synth.cancel();          // 連打時に前の再生を止める
      clearSpeakingState();
      var u = new SpeechSynthesisUtterance(text);
      u.lang = 'fr-FR';
      u.rate = 0.92;
      u.pitch = 1.0;
      if (frVoice) u.voice = frVoice;
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

  // =========================================================
  // お気に入り (localStorage: voyage.favs)
  // =========================================================
  var favs = loadFavs();
  function loadFavs() {
    try { return JSON.parse(localStorage.getItem('voyage.favs') || '[]') || []; }
    catch (e) { return []; }
  }
  function saveFavs() {
    try { localStorage.setItem('voyage.favs', JSON.stringify(favs)); } catch (e) {}
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
    document.body.style.overflow = '';
    if (synth) synth.cancel();
    clearSpeakingState();
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }

  if (modal) {
    $$('[data-close]', modal).forEach(function (el) { el.addEventListener('click', closeModal); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeModal(); });
  }

  // =========================================================
  // ナビゲーション
  // =========================================================
  var VIEWS = ['home', 'phrases', 'culture', 'quiz'];
  var current = 'home';
  var quizInited = false;

  function navigate(view) {
    if (VIEWS.indexOf(view) === -1) view = 'home';
    current = view;

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

    // フォーカスとスクロール
    var sec = $('#view-' + view);
    if (sec) { try { sec.focus({ preventScroll: true }); } catch (e) {} }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function initQuiz() {
    var mount = $('#quizRoot');
    if (!mount) return;
    if (window.Quiz && typeof window.Quiz.init === 'function') {
      // タブを開き直すたびに再init可能に
      mount.innerHTML = '';
      try {
        window.Quiz.init(mount, PHRASES, speak);
        quizInited = true;
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
    refresh: init             // データ後読み込み時などに再描画
  };
})();
