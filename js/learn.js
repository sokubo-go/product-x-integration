/*
 * js/learn.js — Voyage レッスンエンジン(SRS + 想起 + シャドーイング + シーン会話)
 * 契約: window.Learn = { init(container, conf) }  再入可
 *   conf = { phrasesData, dialogues, speak(text, btn?, rate?), lang, storagePrefix }
 * 素の ES2020+。DESIGN.md の CSS 変数契約に準拠(スタイルは css/learn.css)。
 */
(function () {
  'use strict';

  // ライトナー5箱の間隔(日)
  var INTERVALS = { 1: 0, 2: 1, 3: 3, 4: 7, 5: 16 };
  var NEW_PER_DAY = 10;      // 新規カードは1日10枚まで
  var SESSION_DUE_MAX = 12;  // 1セッションの期限到来カード上限
  var SESSION_NEW_MAX = 6;   // 1セッションの新規カード上限
  var SHADOW_EVERY = 3;      // 何枚ごとにシャドーイングを挿入するか
  var SLOW_RATE = 0.7;

  // ---------- ユーティリティ ----------
  function todayNum() { return Math.floor(Date.now() / 86400000); }

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  // 学ぶ言語の語(phrases は fr、dialogues は it を主フィールドに持つ契約)
  function target(o) { return (o && (o.fr || o.it || o.text)) || ''; }

  function readJSON(key, fallback) {
    try {
      var v = JSON.parse(localStorage.getItem(key));
      return v == null ? fallback : v;
    } catch (e) { return fallback; }
  }
  function writeJSON(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) {}
  }

  // 言語ごとの称賛メッセージ
  function praiseList(lang) {
    var l = String(lang || '').toLowerCase();
    if (l.indexOf('it') === 0) return ['Bravissimo!', 'Perfetto!', 'Ottimo lavoro!', 'Continua così!'];
    if (l.indexOf('el') === 0) return ['Μπράβο!', 'Τέλεια!', 'Πολύ καλά!'];
    return ['Bravo !', 'Parfait !', 'Très bien !', 'Continuez comme ça !'];
  }
  function praiseOne(lang) {
    var l = praiseList(lang);
    return l[Math.floor(Math.random() * l.length)];
  }

  // ---------- メイン ----------
  function init(container, conf) {
    if (!container) return;
    conf = conf || {};
    var speak = typeof conf.speak === 'function' ? conf.speak : function () {};
    var lang = conf.lang || 'fr-FR';
    var prefix = conf.storagePrefix || 'voyage.fr';
    var dialogues = Array.isArray(conf.dialogues) ? conf.dialogues : [];
    var grammar = Array.isArray(conf.grammar) ? conf.grammar : [];
    var vocab = Array.isArray(conf.vocab) ? conf.vocab : [];

    var K_SRS = prefix + '.srs';
    var K_NEW = prefix + '.newcount';
    var K_STREAK = prefix + '.streak';
    var K_SCENES = prefix + '.scenes';
    var K_GRAMMAR = prefix + '.grammar';

    // フレーズをフラット化(key = catId::fr)
    var cats = Array.isArray(conf.phrasesData) ? conf.phrasesData : [];
    var CARDS = [];
    var CAT_META = [];
    cats.forEach(function (cat) {
      if (!cat || !Array.isArray(cat.phrases)) return;
      var meta = { id: cat.id || 'x', name: cat.name || '', icon: cat.icon || '📗', total: 0 };
      cat.phrases.forEach(function (p) {
        var tt = target(p);
        if (!tt || !p.ja) return;
        CARDS.push({
          key: meta.id + '::' + tt,
          catId: meta.id, catName: meta.name, catIcon: meta.icon,
          fr: tt, ja: p.ja, kana: p.kana || '', note: p.note || ''
        });
        meta.total++;
      });
      if (meta.total) CAT_META.push(meta);
    });
    var CARD_BY_KEY = {};
    CARDS.forEach(function (c) { CARD_BY_KEY[c.key] = c; });

    // 単語帳(vocab)をカード化。SRS キーは vocab::カテゴリid::単語
    var VOCAB_CATS = [];
    var VOCAB_CARDS = [];
    var VOCAB_CARD_BY_KEY = {};
    vocab.forEach(function (cat) {
      if (!cat || !Array.isArray(cat.words)) return;
      var meta = { id: cat.id || 'v', name: cat.name || '', icon: cat.icon || '📒', words: [] };
      cat.words.forEach(function (w) {
        var x = w && w.x;
        if (!x || !w.ja) return;
        var key = 'vocab::' + meta.id + '::' + x;
        var card = { key: key, catId: meta.id, catName: meta.name, catIcon: meta.icon,
                     fr: x, ja: w.ja, kana: w.kana || '', note: w.note || '', isVocab: true };
        VOCAB_CARDS.push(card);
        VOCAB_CARD_BY_KEY[key] = card;
        meta.words.push({ x: x, ja: w.ja, kana: w.kana || '', note: w.note || '', key: key });
      });
      if (meta.words.length) VOCAB_CATS.push(meta);
    });

    // 4択の誤答プール = フレーズ + 語彙
    var DISTRACTOR_POOL = CARDS.concat(VOCAB_CARDS);

    // srs キーからカードを解決(phrase / vocab)。孤児は null
    function cardForKey(key) {
      return CARD_BY_KEY[key] || VOCAB_CARD_BY_KEY[key] || null;
    }

    // 音声再生ボタン生成(speak 経由・rate 指定でスロー)
    function speakBtn(text, label, rate, extraClass) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'learn-audio' + (extraClass ? ' ' + extraClass : '');
      b.innerHTML = label;
      b.addEventListener('click', function (e) {
        e.stopPropagation();
        speak(text, b, rate);
      });
      return b;
    }

    // ---------- SRS 状態 ----------
    function loadSrs() { return readJSON(K_SRS, {}) || {}; }
    function saveSrs(s) { writeJSON(K_SRS, s); }

    function newCountToday() {
      var nc = readJSON(K_NEW, null);
      if (nc && nc.day === todayNum()) return nc.n || 0;
      return 0;
    }
    function bumpNewCount(add) {
      var n = newCountToday() + add;
      writeJSON(K_NEW, { day: todayNum(), n: n });
    }

    function loadStreak() {
      var s = readJSON(K_STREAK, null);
      return s && typeof s.count === 'number' ? s : { last: -1, count: 0 };
    }
    // セッション/シーン完了時に呼ぶ。当日は一度だけ加算。
    function bumpStreak() {
      var s = loadStreak();
      var t = todayNum();
      if (s.last === t) return s;               // 本日はカウント済み
      if (s.last === t - 1) s.count += 1;        // 連続
      else s.count = 1;                          // 途切れ→リセット
      s.last = t;
      writeJSON(K_STREAK, s);
      return s;
    }

    function loadScenes() {
      var v = readJSON(K_SCENES, []);
      return Array.isArray(v) ? v : [];
    }
    function markSceneDone(id) {
      var done = loadScenes();
      if (done.indexOf(id) === -1) { done.push(id); writeJSON(K_SCENES, done); }
    }

    // 文法コースの修了状態
    function loadGrammarDone() {
      var v = readJSON(K_GRAMMAR, {});
      return (v && typeof v === 'object' && !Array.isArray(v)) ? v : {};
    }
    function markGrammarDone(id) {
      var d = loadGrammarDone(); d[id] = true; writeJSON(K_GRAMMAR, d);
    }
    function grammarSorted() {
      return grammar.slice().sort(function (a, b) { return (a.order || 0) - (b.order || 0); });
    }

    // 単語帳の SRS 操作(キー = vocab::カテゴリid::単語)
    function addVocabWord(word) {
      var srs = loadSrs();
      if (!srs[word.key]) { srs[word.key] = { box: 1, due: todayNum(), seen: 0, ok: 0 }; saveSrs(srs); }
    }
    function removeVocabWord(word) {
      var srs = loadSrs();
      if (srs[word.key]) { delete srs[word.key]; saveSrs(srs); }
    }
    function vocabAddedCount(meta) {
      var srs = loadSrs(), n = 0;
      meta.words.forEach(function (w) { if (srs[w.key]) n++; });
      return n;
    }

    // 期限到来・新規の集計
    function dueCards() {
      var srs = loadSrs(), t = todayNum(), out = [], changed = false;
      Object.keys(srs).forEach(function (key) {
        var c = cardForKey(key);
        if (!c) {
          // conf.vocab に見つからない孤児 vocab キーは掃除
          if (key.indexOf('vocab::') === 0) { delete srs[key]; changed = true; }
          return;
        }
        var r = srs[key];
        if (r && (r.due == null || r.due <= t)) out.push(c);
      });
      if (changed) saveSrs(srs);
      return out;
    }
    function newAvailable() {
      var srs = loadSrs();
      return CARDS.filter(function (c) { return !srs[c.key]; });
    }
    function newBudgetToday() {
      return Math.max(0, NEW_PER_DAY - newCountToday());
    }

    // カテゴリ別定着率(box4以上の割合)
    function retentionByCat() {
      var srs = loadSrs();
      return CAT_META.map(function (m) {
        var strong = 0;
        CARDS.forEach(function (c) {
          if (c.catId !== m.id) return;
          var r = srs[c.key];
          if (r && r.box >= 4) strong++;
        });
        return { name: m.name, icon: m.icon, total: m.total, strong: strong,
                 pct: m.total ? Math.round((strong / m.total) * 100) : 0 };
      });
    }
    // 全体定着率(%)
    function overallRetention() {
      if (!CARDS.length) return 0;
      var srs = loadSrs(), strong = 0;
      CARDS.forEach(function (c) { var r = srs[c.key]; if (r && r.box >= 4) strong++; });
      return Math.round((strong / CARDS.length) * 100);
    }

    // 採点: ok=true → box+1(最大5) / false → box=1
    function grade(card, ok) {
      var srs = loadSrs();
      var r = srs[card.key] || { box: 1, seen: 0, ok: 0 };
      if (ok) { r.box = Math.min((r.box || 1) + 1, 5); r.ok = (r.ok || 0) + 1; }
      else { r.box = 1; }
      r.seen = (r.seen || 0) + 1;
      r.due = todayNum() + (INTERVALS[r.box] || 0);
      srs[card.key] = r;
      saveSrs(srs);
    }

    function boxOf(card) {
      var r = loadSrs()[card.key];
      return r && r.box ? r.box : 1;
    }

    // 4択の誤答を他フレーズの和訳から
    function distractors(correctJa, n) {
      var pool = shuffle(DISTRACTOR_POOL).filter(function (c) { return c.ja && c.ja !== correctJa; });
      var seen = {}, out = [];
      seen[correctJa] = true;
      for (var i = 0; i < pool.length && out.length < n; i++) {
        if (!seen[pool[i].ja]) { seen[pool[i].ja] = true; out.push(pool[i].ja); }
      }
      return out;
    }

    // =========================================================
    // ホーム(レッスンタブ初期表示)
    // =========================================================
    function renderHome() {
      container.className = 'learn-root';
      container.innerHTML = '';

      if (!CARDS.length && !dialogues.length && !grammar.length && !VOCAB_CATS.length) {
        container.innerHTML = '<div class="learn-card learn-empty">' +
          '<div class="learn-empty__icon">📚</div>' +
          '<p>レッスン用のフレーズを準備中です。</p></div>';
        return;
      }

      var due = dueCards();
      var newAvail = newAvailable();
      var newShow = Math.min(newAvail.length, newBudgetToday());
      var streak = loadStreak();
      var streakActive = streak.last === todayNum() || streak.last === todayNum() - 1;
      var streakCount = streakActive ? streak.count : 0;
      var canStart = (due.length + newShow) > 0;

      var html = '';

      // 今日の状況カード
      html += '<div class="learn-card learn-status">' +
        '<div class="learn-status__grid">' +
          '<div class="learn-stat"><span class="learn-stat__n">' + due.length + '</span>' +
            '<span class="learn-stat__l">復習</span></div>' +
          '<div class="learn-stat"><span class="learn-stat__n">' + newShow + '</span>' +
            '<span class="learn-stat__l">新規</span></div>' +
          '<div class="learn-stat"><span class="learn-stat__n">🔥 ' + streakCount + '</span>' +
            '<span class="learn-stat__l">連続日数</span></div>' +
        '</div>';

      if (canStart) {
        html += '<button type="button" class="learn-btn learn-btn-primary learn-start">' +
          '今日のレッスンを始める <span class="learn-btn__sub">約5分</span></button>';
      } else {
        html += '<p class="learn-done-msg">✨ 今日の分は完了。明日また忘れかけた頃に会いましょう。</p>' +
          '<button type="button" class="learn-btn learn-start-extra">それでも練習する</button>';
      }
      html += '</div>';

      // 📖 基礎文法コース(ユニット一覧 + 修了✓ + 進捗 n/12)
      if (grammar.length) {
        var gdone = loadGrammarDone();
        var gsorted = grammarSorted();
        var doneN = gsorted.filter(function (u) { return gdone[u.id]; }).length;
        var firstUndoneSeen = false;
        html += '<div class="learn-section">' +
          '<div class="learn-h3-row"><h3 class="learn-h3">📖 基礎文法コース</h3>' +
          '<span class="learn-count">' + doneN + '/' + grammar.length + '</span></div>' +
          '<div class="learn-unit-list">';
        gsorted.forEach(function (u, i) {
          var isDone = !!gdone[u.id];
          var isFirst = !isDone && !firstUndoneSeen;
          if (isFirst) firstUndoneSeen = true;
          html += '<button type="button" class="learn-unit-card' + (isDone ? ' is-done' : '') + '" data-unit="' + i + '">' +
            '<span class="learn-unit-card__icon" aria-hidden="true">' + esc(u.icon || '📖') + '</span>' +
            '<span class="learn-unit-card__body">' +
              '<span class="learn-unit-card__title">' + esc(u.title || '') +
                (isDone ? ' <span class="learn-check" aria-label="修了">✓</span>' : '') + '</span>' +
              (isFirst ? '<span class="learn-badge">まずはここから</span>' : '') +
            '</span></button>';
        });
        html += '</div></div>';
      }

      // シーン会話ドリル一覧
      if (dialogues.length) {
        var done = loadScenes();
        html += '<div class="learn-section"><h3 class="learn-h3">🎭 シーン会話ドリル</h3>' +
          '<div class="learn-scene-list">';
        dialogues.forEach(function (d, i) {
          var isDone = done.indexOf(d.id) !== -1;
          html += '<button type="button" class="learn-scene-card" data-scene="' + i + '">' +
            '<span class="learn-scene-card__icon" aria-hidden="true">' + esc(d.icon || '💬') + '</span>' +
            '<span class="learn-scene-card__body">' +
              '<span class="learn-scene-card__title">' + esc(d.title || '') +
                (isDone ? ' <span class="learn-check" aria-label="完了">✓</span>' : '') + '</span>' +
              '<span class="learn-scene-card__desc">' + esc(d.desc || '') + '</span>' +
            '</span></button>';
        });
        html += '</div></div>';
      }

      // 📒 単語帳(カテゴリカード + 追加済みn)
      if (VOCAB_CATS.length) {
        html += '<div class="learn-section"><h3 class="learn-h3">📒 単語帳</h3>' +
          '<div class="learn-vocab-cats">';
        VOCAB_CATS.forEach(function (meta, i) {
          var added = vocabAddedCount(meta);
          html += '<button type="button" class="learn-vocab-cat" data-vcat="' + i + '">' +
            '<span class="learn-vocab-cat__icon" aria-hidden="true">' + esc(meta.icon) + '</span>' +
            '<span class="learn-vocab-cat__name">' + esc(meta.name) + '</span>' +
            '<span class="learn-vocab-cat__meta">' + meta.words.length + '語' +
              (added ? ' · <em>' + added + '追加済み</em>' : '') + '</span>' +
          '</button>';
        });
        html += '</div></div>';
      }

      // カテゴリ別定着率
      var rets = retentionByCat();
      if (rets.length) {
        html += '<div class="learn-section"><h3 class="learn-h3">📈 定着率</h3>' +
          '<p class="learn-note">しっかり覚えた(箱4以上)フレーズの割合です。</p>' +
          '<div class="learn-retention">';
        rets.forEach(function (r) {
          html += '<div class="learn-ret">' +
            '<div class="learn-ret__top"><span class="learn-ret__name">' + esc(r.icon) + ' ' + esc(r.name) +
              '</span><span class="learn-ret__pct">' + r.pct + '%</span></div>' +
            '<div class="learn-bar"><div class="learn-bar__fill" style="width:' + r.pct + '%"></div></div>' +
          '</div>';
        });
        html += '</div></div>';
      }

      container.innerHTML = html;

      var startBtn = container.querySelector('.learn-start') || container.querySelector('.learn-start-extra');
      if (startBtn) startBtn.addEventListener('click', startSession);
      Array.prototype.forEach.call(container.querySelectorAll('[data-scene]'), function (el) {
        el.addEventListener('click', function () {
          openScene(dialogues[parseInt(el.getAttribute('data-scene'), 10)]);
        });
      });
      Array.prototype.forEach.call(container.querySelectorAll('[data-unit]'), function (el) {
        el.addEventListener('click', function () {
          openGrammarUnit(grammarSorted()[parseInt(el.getAttribute('data-unit'), 10)]);
        });
      });
      Array.prototype.forEach.call(container.querySelectorAll('[data-vcat]'), function (el) {
        el.addEventListener('click', function () {
          openVocabList(VOCAB_CATS[parseInt(el.getAttribute('data-vcat'), 10)]);
        });
      });
    }

    // =========================================================
    // レッスンセッション
    // =========================================================
    var session = null;

    function startSession() {
      var due = shuffle(dueCards()).slice(0, SESSION_DUE_MAX);
      var budget = Math.min(newBudgetToday(), SESSION_NEW_MAX);
      var news = shuffle(newAvailable()).slice(0, budget);

      // 新規カードを box1・本日期限で登録し、新規カウントを加算
      if (news.length) {
        var srs = loadSrs(), t = todayNum();
        news.forEach(function (c) {
          if (!srs[c.key]) srs[c.key] = { box: 1, due: t, seen: 0, ok: 0 };
        });
        saveSrs(srs);
        bumpNewCount(news.length);
      }

      var review = shuffle(due.concat(news));
      if (!review.length) { renderHome(); return; }

      // 3枚ごとにシャドーイングを挿入
      var steps = [];
      review.forEach(function (c, i) {
        steps.push({ type: 'review', card: c });
        if ((i + 1) % SHADOW_EVERY === 0) steps.push({ type: 'shadow', card: c });
      });

      session = {
        steps: steps, index: 0, reviewed: 0,
        retBefore: overallRetention(), streakBefore: loadStreak().count
      };
      renderStep();
    }

    function sessionProgress() {
      return Math.round((session.index / session.steps.length) * 100);
    }

    function progressBar() {
      return '<div class="learn-progress"><div class="learn-progress__track">' +
        '<div class="learn-progress__fill" style="width:' + sessionProgress() + '%"></div></div>' +
        '<button type="button" class="learn-quit" aria-label="レッスンを中断して戻る">✕</button></div>';
    }

    function bindQuit() {
      var q = container.querySelector('.learn-quit');
      if (q) q.addEventListener('click', renderHome);
    }

    function renderStep() {
      if (!session || session.index >= session.steps.length) { finishSession(); return; }
      var step = session.steps[session.index];
      if (step.type === 'shadow') { renderShadow(step.card); return; }
      var box = boxOf(step.card);
      if (box >= 3) renderFlip(step.card);
      else renderRecognition(step.card, Math.random() < 0.5 ? 'meaning' : 'listening');
    }

    function advance() { session.index++; renderStep(); }

    // 認識問題(box1-2): 伊(仏)語表示 or リスニング → 和訳4択
    function renderRecognition(card, mode) {
      var options = shuffle([card.ja].concat(distractors(card.ja, 3)));
      var isListen = mode === 'listening';

      container.className = 'learn-root';
      container.innerHTML = progressBar() +
        '<div class="learn-card learn-play">' +
          '<p class="learn-kicker">' + (isListen ? '🎧 聞いて意味を選ぶ' : '📖 意味を選ぶ') + '</p>' +
          '<div class="learn-prompt">' +
            (isListen
              ? '<div class="learn-listen"><button type="button" class="learn-listen__btn" aria-label="音声を再生">🔊</button>' +
                '<p class="learn-note">音声を聞いて意味を選んでください(何度でも再生)</p></div>'
              : '<p class="learn-fr">' + esc(card.fr) + '</p>') +
          '</div>' +
          '<div class="learn-options"></div>' +
          '<div class="learn-feedback" hidden></div>' +
        '</div>';
      bindQuit();

      if (isListen) {
        var lb = container.querySelector('.learn-listen__btn');
        lb.addEventListener('click', function () { speak(card.fr, lb); });
        speak(card.fr, lb); // 自動で1回再生
      }

      var wrap = container.querySelector('.learn-options');
      var answered = false;
      options.forEach(function (opt) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'learn-option';
        b.textContent = opt;
        b.addEventListener('click', function () {
          if (answered) return;
          answered = true;
          var ok = opt === card.ja;
          grade(card, ok);
          session.reviewed++;
          Array.prototype.forEach.call(wrap.children, function (btn) {
            btn.disabled = true;
            if (btn.textContent === card.ja) btn.classList.add('is-correct');
            if (btn === b && !ok) btn.classList.add('is-wrong');
          });
          var fb = container.querySelector('.learn-feedback');
          fb.hidden = false;
          fb.className = 'learn-feedback ' + (ok ? 'is-correct' : 'is-wrong');
          fb.innerHTML =
            '<p class="learn-feedback__h">' + (ok ? praiseOne(lang) + ' 🎉' : 'おしい!') + '</p>' +
            '<p class="learn-feedback__fr">' + esc(card.fr) + '</p>' +
            '<p class="learn-feedback__ja">' + esc(card.ja) +
              (card.kana ? ' <span class="learn-feedback__kana">' + esc(card.kana) + '</span>' : '') + '</p>' +
            '<button type="button" class="learn-btn learn-btn-primary learn-next">次へ</button>';
          fb.querySelector('.learn-next').addEventListener('click', advance);
          fb.scrollIntoView({ block: 'nearest' });
        });
        wrap.appendChild(b);
      });
    }

    // 想起フリップ(box3+): 和訳 →「声に出してから」→ めくって原文+カナ+音声 → 自己評価
    function renderFlip(card) {
      var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      container.className = 'learn-root';
      container.innerHTML = progressBar() +
        '<div class="learn-card learn-play">' +
          '<p class="learn-kicker">🗣️ 声に出して思い出す</p>' +
          '<div class="learn-flip' + (reduce ? ' is-reduced' : '') + '">' +
            '<div class="learn-flip__inner">' +
              '<div class="learn-flip__face learn-flip__front">' +
                '<p class="learn-flip__ja">' + esc(card.ja) + '</p>' +
                '<p class="learn-flip__cue">声に出してから、めくって確認</p>' +
                '<span class="learn-flip__hint">タップでめくる</span>' +
              '</div>' +
              '<div class="learn-flip__face learn-flip__back">' +
                '<p class="learn-flip__fr">' + esc(card.fr) + '</p>' +
                (card.kana ? '<p class="learn-flip__kana">' + esc(card.kana) + '</p>' : '') +
                '<div class="learn-flip__audio"></div>' +
              '</div>' +
            '</div>' +
          '</div>' +
          '<div class="learn-selfeval" hidden>' +
            '<button type="button" class="learn-btn learn-eval-yes">✅ 言えた</button>' +
            '<button type="button" class="learn-btn learn-eval-no">🙈 まだ</button>' +
          '</div>' +
        '</div>';
      bindQuit();

      var flip = container.querySelector('.learn-flip');
      var audioSlot = container.querySelector('.learn-flip__audio');
      audioSlot.appendChild(speakBtn(card.fr, '🔊', null, 'learn-audio--lg'));
      var flipped = false;
      function doFlip() {
        if (flipped) return;
        flipped = true;
        flip.classList.add('is-flipped');
        container.querySelector('.learn-selfeval').hidden = false;
        speak(card.fr); // めくったら発音
      }
      flip.addEventListener('click', function (e) {
        if (e.target.closest('.learn-audio')) return; // 音声ボタンはめくらない
        doFlip();
      });

      container.querySelector('.learn-eval-yes').addEventListener('click', function () {
        grade(card, true); session.reviewed++; advance();
      });
      container.querySelector('.learn-eval-no').addEventListener('click', function () {
        grade(card, false); session.reviewed++; advance();
      });
    }

    // シャドーイングカード(採点なし): 原文+カナ + 通常/スロー/もう一度 + 次へ
    function renderShadow(card) {
      container.className = 'learn-root';
      container.innerHTML = progressBar() +
        '<div class="learn-card learn-play learn-shadow">' +
          '<p class="learn-kicker">🎤 シャドーイング</p>' +
          '<p class="learn-note">お手本を聞いて、すぐ後を追って真似しましょう。</p>' +
          '<p class="learn-shadow__fr">' + esc(card.fr) + '</p>' +
          (card.kana ? '<p class="learn-shadow__kana">' + esc(card.kana) + '</p>' : '') +
          '<div class="learn-shadow__btns"></div>' +
          '<button type="button" class="learn-btn learn-btn-primary learn-next">できたら次へ</button>' +
        '</div>';
      bindQuit();

      var btns = container.querySelector('.learn-shadow__btns');
      btns.appendChild(speakBtn(card.fr, '▶️ 通常', null, 'learn-audio--pill'));
      btns.appendChild(speakBtn(card.fr, '🐢 スロー', SLOW_RATE, 'learn-audio--pill'));
      btns.appendChild(speakBtn(card.fr, '🔁 もう一度', null, 'learn-audio--pill'));
      container.querySelector('.learn-next').addEventListener('click', advance);

      speak(card.fr); // 開始時に1回
    }

    function finishSession() {
      var streak = bumpStreak();
      var retAfter = overallRetention();
      var diff = retAfter - session.retBefore;
      var diffLabel = diff > 0 ? '+' + diff : String(diff);

      container.className = 'learn-root';
      container.innerHTML =
        '<div class="learn-card learn-result">' +
          '<div class="learn-result__icon">🎉</div>' +
          '<p class="learn-result__praise">' + esc(praiseOne(lang)) + '</p>' +
          '<p class="learn-result__sub">今日のレッスン、おつかれさまでした。</p>' +
          '<div class="learn-result__stats">' +
            '<div class="learn-stat"><span class="learn-stat__n">' + session.reviewed + '</span>' +
              '<span class="learn-stat__l">枚 復習</span></div>' +
            '<div class="learn-stat"><span class="learn-stat__n">' + retAfter + '%</span>' +
              '<span class="learn-stat__l">定着率 <em>' + esc(diffLabel) + '</em></span></div>' +
            '<div class="learn-stat"><span class="learn-stat__n">🔥 ' + streak.count + '</span>' +
              '<span class="learn-stat__l">連続日数</span></div>' +
          '</div>' +
          '<button type="button" class="learn-btn learn-btn-primary learn-home">ホームへ戻る</button>' +
        '</div>';
      container.querySelector('.learn-home').addEventListener('click', renderHome);
      session = null;
    }

    // =========================================================
    // シーン会話ドリル
    // =========================================================
    var scene = null;

    function openScene(d) {
      if (!d || !Array.isArray(d.turns) || !d.turns.length) { renderHome(); return; }
      scene = { d: d, index: 0 };
      renderTurn();
    }

    function sceneBar() {
      var pct = Math.round((scene.index / scene.d.turns.length) * 100);
      return '<div class="learn-progress"><div class="learn-progress__track">' +
        '<div class="learn-progress__fill" style="width:' + pct + '%"></div></div>' +
        '<button type="button" class="learn-quit" aria-label="会話を閉じる">✕</button></div>';
    }

    function renderTurn() {
      if (scene.index >= scene.d.turns.length) { finishScene(); return; }
      var t = scene.d.turns[scene.index];
      container.className = 'learn-root';

      if (t.speaker === 'you') {
        // まず和ヒントだけ
        container.innerHTML = sceneBar() +
          '<div class="learn-card learn-turn learn-turn--you">' +
            '<p class="learn-turn__who">あなた</p>' +
            '<p class="learn-turn__hint">💭 ' + esc(t.hint || t.ja || '') + '</p>' +
            '<div class="learn-turn__reveal" hidden></div>' +
            '<button type="button" class="learn-btn learn-btn-primary learn-reveal">🎤 声に出してから答えを見る</button>' +
          '</div>';
        bindSceneQuit();
        container.querySelector('.learn-reveal').addEventListener('click', function () {
          this.hidden = true;
          var box = container.querySelector('.learn-turn__reveal');
          box.hidden = false;
          box.innerHTML =
            '<p class="learn-turn__fr">' + esc(target(t)) + '</p>' +
            (t.kana ? '<p class="learn-turn__kana">' + esc(t.kana) + '</p>' : '') +
            '<p class="learn-turn__ja">' + esc(t.ja || '') + '</p>' +
            '<div class="learn-turn__audio"></div>' +
            '<button type="button" class="learn-btn learn-btn-primary learn-next">次へ</button>';
          var slot = box.querySelector('.learn-turn__audio');
          slot.appendChild(speakBtn(target(t), '🔊 通常', null, 'learn-audio--pill'));
          slot.appendChild(speakBtn(target(t), '🐢 スロー', SLOW_RATE, 'learn-audio--pill'));
          speak(target(t));
          box.querySelector('.learn-next').addEventListener('click', function () {
            scene.index++; renderTurn();
          });
          box.scrollIntoView({ block: 'nearest' });
        });
      } else {
        // 相手ターン: 名前+原文+カナ+和訳+自動音声
        container.innerHTML = sceneBar() +
          '<div class="learn-card learn-turn learn-turn--them">' +
            '<p class="learn-turn__who">' + esc(t.name || '相手') + '</p>' +
            '<p class="learn-turn__fr">' + esc(target(t)) + '</p>' +
            (t.kana ? '<p class="learn-turn__kana">' + esc(t.kana) + '</p>' : '') +
            '<p class="learn-turn__ja">' + esc(t.ja || '') + '</p>' +
            '<div class="learn-turn__audio"></div>' +
            '<button type="button" class="learn-btn learn-btn-primary learn-next">次へ</button>' +
          '</div>';
        bindSceneQuit();
        container.querySelector('.learn-turn__audio').appendChild(
          speakBtn(target(t), '🔊 もう一度', null, 'learn-audio--pill'));
        speak(target(t)); // 自動再生
        container.querySelector('.learn-next').addEventListener('click', function () {
          scene.index++; renderTurn();
        });
      }
    }

    function bindSceneQuit() {
      var q = container.querySelector('.learn-quit');
      if (q) q.addEventListener('click', renderHome);
    }

    function finishScene() {
      markSceneDone(scene.d.id);
      var streak = bumpStreak();
      container.className = 'learn-root';
      container.innerHTML =
        '<div class="learn-card learn-result">' +
          '<div class="learn-result__icon">🎭</div>' +
          '<p class="learn-result__praise">' + esc(praiseOne(lang)) + '</p>' +
          '<p class="learn-result__sub">「' + esc(scene.d.title || '') + '」を最後まで通せました。</p>' +
          '<div class="learn-scene-actions">' +
            '<button type="button" class="learn-btn learn-btn-primary learn-playall">🔊 通し再生</button>' +
            '<button type="button" class="learn-btn learn-home">ホームへ戻る</button>' +
          '</div>' +
          '<p class="learn-note">🔥 連続 ' + streak.count + '日</p>' +
        '</div>';
      container.querySelector('.learn-home').addEventListener('click', renderHome);
      container.querySelector('.learn-playall').addEventListener('click', function () {
        playAll(scene.d.turns, this);
      });
    }

    // 通し再生: 全ターン(you 含む)を順に再生。長さ推定で間隔を空ける。
    function playAll(turns, btn) {
      if (btn) { btn.disabled = true; btn.classList.add('is-playing'); }
      var delay = 0, last = 0;
      turns.forEach(function (t) {
        var text = target(t);
        setTimeout(function () { speak(text); }, delay);
        var dur = Math.max(1500, text.length * 95);
        delay += dur; last = delay;
      });
      if (btn) setTimeout(function () { btn.disabled = false; btn.classList.remove('is-playing'); }, last);
    }

    // =========================================================
    // 基礎文法コース(ユニットプレーヤー)
    // =========================================================
    var gunit = null;

    function openGrammarUnit(unit) {
      if (!unit) { renderHome(); return; }
      gunit = { unit: unit, drills: Array.isArray(unit.drills) ? unit.drills.slice() : [], i: 0 };
      renderGrammarIntro();
    }

    // intro 段落 + points ルールカード(例文に🔊)→「練習する」
    function renderGrammarIntro() {
      var u = gunit.unit;
      var points = Array.isArray(u.points) ? u.points : [];
      var intro = (Array.isArray(u.intro) ? u.intro : (u.intro ? [u.intro] : []))
        .map(function (p) { return '<p class="learn-g-intro__p">' + esc(p) + '</p>'; }).join('');

      var html = '<div class="learn-topbar">' +
          '<button type="button" class="learn-back" aria-label="コース一覧に戻る">‹ コース一覧</button></div>' +
        '<div class="learn-card learn-g-head">' +
          '<div class="learn-g-head__icon" aria-hidden="true">' + esc(u.icon || '📖') + '</div>' +
          '<h2 class="learn-g-title">' + esc(u.title || '') + '</h2>' +
          (intro ? '<div class="learn-g-intro">' + intro + '</div>' : '') +
        '</div>';

      points.forEach(function (pt) {
        html += '<div class="learn-card learn-rule">' +
          '<h3 class="learn-rule__h">' + esc(pt.rule || '') + '</h3>' +
          '<div class="learn-rule__examples">';
        (Array.isArray(pt.examples) ? pt.examples : []).forEach(function (ex) {
          html += '<div class="learn-rule__ex">' +
            '<div class="learn-rule__ex-text">' +
              '<span class="learn-rule__x">' + esc(ex.x || '') + '</span>' +
              (ex.kana ? '<span class="learn-rule__kana">' + esc(ex.kana) + '</span>' : '') +
              (ex.ja ? '<span class="learn-rule__ja">' + esc(ex.ja) + '</span>' : '') +
            '</div>' +
            '<span class="learn-rule__audio"></span>' +
          '</div>';
        });
        html += '</div></div>';
      });

      html += '<button type="button" class="learn-btn learn-btn-primary learn-g-start">' +
        (gunit.drills.length ? '練習する →' : '修了にする 🎉') + '</button>';

      container.className = 'learn-root';
      container.innerHTML = html;
      container.querySelector('.learn-back').addEventListener('click', renderHome);

      // 例文の音声ボタンを挿入(点→行の順で対応)
      var ruleEls = container.querySelectorAll('.learn-rule');
      Array.prototype.forEach.call(ruleEls, function (ruleEl, pi) {
        var exs = Array.isArray(points[pi].examples) ? points[pi].examples : [];
        Array.prototype.forEach.call(ruleEl.querySelectorAll('.learn-rule__audio'), function (slot, ei) {
          if (exs[ei] && exs[ei].x) slot.appendChild(speakBtn(exs[ei].x, '🔊', null, ''));
        });
      });

      container.querySelector('.learn-g-start').addEventListener('click', function () {
        if (gunit.drills.length) { gunit.i = 0; renderGrammarDrill(); }
        else finishGrammar();
      });
    }

    function grammarBar() {
      var pct = gunit.drills.length ? Math.round((gunit.i / gunit.drills.length) * 100) : 0;
      return '<div class="learn-progress"><div class="learn-progress__track">' +
        '<div class="learn-progress__fill" style="width:' + pct + '%"></div></div>' +
        '<button type="button" class="learn-quit" aria-label="コース一覧に戻る">✕</button></div>';
    }

    function renderGrammarDrill() {
      if (!gunit || gunit.i >= gunit.drills.length) { finishGrammar(); return; }
      var drill = gunit.drills[gunit.i];
      if (drill && drill.type === 'order') renderOrderDrill(drill);
      else renderChoiceDrill(drill);
    }

    // choice / fill: 選択肢ボタン。正解=緑+一言 / 不正解=explain 表示 → 選択肢シャッフルで再挑戦
    function renderChoiceDrill(drill) {
      var choices = Array.isArray(drill.choices) ? drill.choices : [];
      var correctVal = choices[drill.answer];
      var opts = shuffle(choices);

      container.className = 'learn-root';
      container.innerHTML = grammarBar() +
        '<div class="learn-card learn-play learn-drill">' +
          '<p class="learn-kicker">' + (drill.type === 'fill' ? '✏️ 空欄をうめる' : '❓ 正しいものを選ぶ') + '</p>' +
          '<p class="learn-drill__q">' + esc(drill.q || '') + '</p>' +
          '<div class="learn-options"></div>' +
          '<div class="learn-feedback" hidden></div>' +
        '</div>';
      container.querySelector('.learn-quit').addEventListener('click', renderHome);

      var wrap = container.querySelector('.learn-options');
      var fb = container.querySelector('.learn-feedback');
      var answered = false;

      opts.forEach(function (opt) {
        var b = document.createElement('button');
        b.type = 'button'; b.className = 'learn-option'; b.textContent = opt;
        b.addEventListener('click', function () {
          if (answered) return;
          var ok = opt === correctVal;
          if (ok) {
            answered = true;
            Array.prototype.forEach.call(wrap.children, function (btn) {
              btn.disabled = true;
              if (btn === b) btn.classList.add('is-correct');
            });
            fb.hidden = false; fb.className = 'learn-feedback is-correct';
            fb.innerHTML = '<p class="learn-feedback__h">' + praiseOne(lang) + ' 🎉</p>' +
              (drill.explain ? '<p class="learn-feedback__ja">' + esc(drill.explain) + '</p>' : '') +
              '<button type="button" class="learn-btn learn-btn-primary learn-next">次へ</button>';
            fb.querySelector('.learn-next').addEventListener('click', function () {
              gunit.i++; renderGrammarDrill();
            });
            fb.scrollIntoView({ block: 'nearest' });
          } else {
            b.classList.add('is-wrong'); b.disabled = true;
            fb.hidden = false; fb.className = 'learn-feedback is-wrong';
            fb.innerHTML = '<p class="learn-feedback__h">おしい!</p>' +
              (drill.explain ? '<p class="learn-feedback__ja">' + esc(drill.explain) + '</p>' : '') +
              '<button type="button" class="learn-btn learn-retry">もう一度</button>';
            fb.querySelector('.learn-retry').addEventListener('click', function () {
              renderChoiceDrill(drill); // 選択肢シャッフルで再挑戦
            });
            fb.scrollIntoView({ block: 'nearest' });
          }
        });
        wrap.appendChild(b);
      });
    }

    // order: tokens をシャッフルしてチップ表示。タップで組み立て/取り消し。答え合わせで比較
    function renderOrderDrill(drill) {
      var tokens = (Array.isArray(drill.tokens) ? drill.tokens : []).map(function (t, i) {
        return { id: i, val: t };
      });
      var bank = shuffle(tokens);
      var built = [];
      var solved = false;

      container.className = 'learn-root';
      container.innerHTML = grammarBar() +
        '<div class="learn-card learn-play learn-drill">' +
          '<p class="learn-kicker">🧩 語を並べて文を作る</p>' +
          '<p class="learn-drill__q">' + esc(drill.q || '') + '</p>' +
          '<div class="learn-build" aria-label="組み立てエリア"></div>' +
          '<div class="learn-bank"></div>' +
          '<div class="learn-drill__actions">' +
            '<button type="button" class="learn-btn learn-btn-primary learn-check" disabled>答え合わせ</button>' +
          '</div>' +
          '<div class="learn-feedback" hidden></div>' +
        '</div>';
      container.querySelector('.learn-quit').addEventListener('click', renderHome);

      var buildEl = container.querySelector('.learn-build');
      var bankEl = container.querySelector('.learn-bank');
      var checkBtn = container.querySelector('.learn-check');
      var fb = container.querySelector('.learn-feedback');

      function chip(tok, built1) {
        var c = document.createElement('button');
        c.type = 'button';
        c.className = 'learn-chip' + (built1 ? ' is-built' : '');
        c.textContent = tok.val;
        c.addEventListener('click', function () {
          if (solved) return;
          if (built1) { built = built.filter(function (x) { return x !== tok; }); bank.push(tok); }
          else { bank = bank.filter(function (x) { return x !== tok; }); built.push(tok); }
          draw();
        });
        return c;
      }
      function draw() {
        buildEl.innerHTML = ''; bankEl.innerHTML = '';
        built.forEach(function (tok) { buildEl.appendChild(chip(tok, true)); });
        if (!built.length) {
          var ph = document.createElement('span');
          ph.className = 'learn-build__ph'; ph.textContent = 'ここに語を並べます';
          buildEl.appendChild(ph);
        }
        bank.forEach(function (tok) { bankEl.appendChild(chip(tok, false)); });
        checkBtn.disabled = built.length === 0;
      }
      draw();

      checkBtn.addEventListener('click', function () {
        if (solved) return;
        var attempt = built.map(function (t) { return t.val; }).join(' ');
        if (attempt === drill.answer) {
          solved = true;
          Array.prototype.forEach.call(buildEl.querySelectorAll('.learn-chip'), function (c) { c.disabled = true; });
          checkBtn.disabled = true;
          fb.hidden = false; fb.className = 'learn-feedback is-correct';
          fb.innerHTML = '<p class="learn-feedback__h">' + praiseOne(lang) + ' 🎉</p>' +
            '<p class="learn-feedback__fr">' + esc(drill.answer) + '</p>' +
            (drill.explain ? '<p class="learn-feedback__ja">' + esc(drill.explain) + '</p>' : '') +
            '<button type="button" class="learn-btn learn-btn-primary learn-next">次へ</button>';
          fb.querySelector('.learn-next').addEventListener('click', function () {
            gunit.i++; renderGrammarDrill();
          });
          fb.scrollIntoView({ block: 'nearest' });
        } else {
          fb.hidden = false; fb.className = 'learn-feedback is-wrong';
          fb.innerHTML = '<p class="learn-feedback__h">おしい!並べ替えてみよう</p>' +
            (drill.explain ? '<p class="learn-feedback__ja">' + esc(drill.explain) + '</p>' : '');
          fb.scrollIntoView({ block: 'nearest' });
        }
      });
    }

    // 全問クリア → 修了(grammar 保存 + ストリーク)
    function finishGrammar() {
      var u = gunit.unit;
      markGrammarDone(u.id);
      var streak = bumpStreak();
      container.className = 'learn-root';
      container.innerHTML =
        '<div class="learn-card learn-result">' +
          '<div class="learn-result__icon">🎉</div>' +
          '<p class="learn-result__praise">' + esc(praiseOne(lang)) + '</p>' +
          '<p class="learn-result__sub">「' + esc(u.title || '') + '」を修了しました。</p>' +
          '<div class="learn-scene-actions">' +
            '<button type="button" class="learn-btn learn-btn-primary learn-home">コース一覧へ戻る</button>' +
          '</div>' +
          '<p class="learn-note">🔥 連続 ' + streak.count + '日</p>' +
        '</div>';
      container.querySelector('.learn-home').addEventListener('click', renderHome);
      gunit = null;
    }

    // =========================================================
    // 単語帳(カテゴリ一覧)
    // =========================================================
    function openVocabList(meta) {
      if (!meta) { renderHome(); return; }
      renderVocabList(meta);
    }

    function renderVocabList(meta) {
      var srs = loadSrs();

      container.className = 'learn-root';
      container.innerHTML = '<div class="learn-topbar">' +
          '<button type="button" class="learn-back" aria-label="単語帳に戻る">‹ 単語帳</button></div>' +
        '<div class="learn-card learn-vocab-head">' +
          '<div class="learn-vocab-head__title">' +
            '<span aria-hidden="true">' + esc(meta.icon) + '</span> ' + esc(meta.name) +
            ' <span class="learn-count">' + meta.words.length + '語</span>' +
          '</div>' +
          '<button type="button" class="learn-btn learn-vocab-all">＋ このカテゴリを全部追加</button>' +
        '</div>' +
        '<div class="learn-card learn-vocab-list"></div>';
      container.querySelector('.learn-back').addEventListener('click', renderHome);

      var listEl = container.querySelector('.learn-vocab-list');

      function paintBtn(btn, added) {
        btn.classList.toggle('is-added', added);
        btn.textContent = added ? '✓' : '＋';
        btn.setAttribute('aria-label', added ? '追加済み(タップで削除)' : 'SRSに追加');
        btn.setAttribute('aria-pressed', String(added));
      }

      meta.words.forEach(function (word) {
        var row = document.createElement('div');
        row.className = 'learn-vword';
        row.innerHTML =
          '<div class="learn-vword__text">' +
            '<span class="learn-vword__x">' + esc(word.x) + '</span>' +
            (word.kana ? '<span class="learn-vword__kana">' + esc(word.kana) + '</span>' : '') +
            '<span class="learn-vword__ja">' + esc(word.ja) + '</span>' +
          '</div>' +
          '<div class="learn-vword__actions"></div>';
        var actions = row.querySelector('.learn-vword__actions');
        actions.appendChild(speakBtn(word.x, '🔊', null, ''));
        var add = document.createElement('button');
        add.type = 'button'; add.className = 'learn-vadd';
        paintBtn(add, !!loadSrs()[word.key]);
        add.addEventListener('click', function () {
          var nowAdded = !loadSrs()[word.key];
          if (nowAdded) addVocabWord(word); else removeVocabWord(word);
          paintBtn(add, nowAdded);
        });
        actions.appendChild(add);
        listEl.appendChild(row);
      });

      container.querySelector('.learn-vocab-all').addEventListener('click', function () {
        meta.words.forEach(function (word) { addVocabWord(word); });
        renderVocabList(meta); // 再描画で全て✓に
      });
    }

    // 起動
    renderHome();
  }

  window.Learn = { init: init };
})();
