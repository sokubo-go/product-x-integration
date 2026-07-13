/*
 * js/quiz.js — Voyage クイズエンジン
 * 契約: window.Quiz = { init(container, phrasesData, speak) }
 * モジュール構文・フレームワーク不使用。DESIGN.md の CSS 変数契約に準拠。
 */
(function () {
  'use strict';

  var STYLE_ID = 'quiz-style';
  var BEST_KEY = window.APP_QUIZ_KEY || 'voyage.quiz.best';
  var QUESTION_COUNT = 10;
  var WRONG_CHOICE_COUNT = 3;

  // ---------- スタイル自己注入(二重注入防止) ----------
  function injectStyle() {
    if (document.getElementById(STYLE_ID)) return;
    var style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = CSS_TEXT;
    document.head.appendChild(style);
  }

  var CSS_TEXT =
    '.quiz-root{font-family:inherit;color:var(--ink);max-width:640px;margin:0 auto;}' +
    '.quiz-root *{box-sizing:border-box;}' +
    '.quiz-start,.quiz-play,.quiz-result,.quiz-error{background:var(--surface);border-radius:var(--radius);' +
      'box-shadow:var(--shadow);border:1px solid var(--line);padding:2rem 1.5rem;text-align:center;}' +
    '.quiz-icon{font-size:3rem;margin-bottom:.5rem;}' +
    '.quiz-title{font-family:Georgia,"Times New Roman",serif;font-size:1.75rem;margin:0 0 .75rem;color:var(--accent);}' +
    '.quiz-desc{color:var(--ink-soft);line-height:1.6;margin:0 0 1.25rem;}' +
    '.quiz-best{margin:0 0 1.5rem;color:var(--ink);}' +
    '.quiz-best strong{color:var(--gold);}' +
    '.quiz-btn{border-radius:calc(var(--radius)/1.5);padding:.8rem 1.9rem;font-size:1rem;font-weight:600;' +
      'cursor:pointer;background:var(--surface);color:var(--ink);border:1px solid var(--line);' +
      'transition:transform .15s ease,box-shadow .15s ease,background .15s ease;}' +
    '.quiz-btn:hover{transform:translateY(-2px);box-shadow:var(--shadow);}' +
    '.quiz-btn:active{transform:translateY(0) scale(.97);}' +
    '.quiz-btn-primary{background:linear-gradient(135deg,var(--accent),var(--accent-2));color:#fff;border:none;}' +
    '.quiz-progress-track{height:8px;background:var(--line);border-radius:999px;overflow:hidden;margin:0 0 1rem;}' +
    '.quiz-progress-fill{height:100%;background:linear-gradient(90deg,var(--accent),var(--gold));' +
      'border-radius:999px;transition:width .4s ease;}' +
    '.quiz-meta{color:var(--ink-soft);font-size:.875rem;margin:0 0 1rem;}' +
    '.quiz-prompt-card{margin:0 0 1.5rem;}' +
    '.quiz-fr{font-family:Georgia,serif;font-size:1.5rem;color:var(--accent);margin:0;}' +
    '.quiz-listen{display:flex;flex-direction:column;align-items:center;gap:.75rem;}' +
    '.quiz-speak-btn{width:64px;height:64px;border-radius:50%;border:2px solid var(--accent);' +
      'background:var(--surface);font-size:1.75rem;cursor:pointer;transition:transform .15s ease,box-shadow .2s ease;}' +
    '.quiz-speak-btn:hover{transform:scale(1.08);box-shadow:var(--shadow);}' +
    '.quiz-speak-btn:active{transform:scale(.95);}' +
    '.quiz-listen-label{color:var(--ink-soft);font-size:.9rem;margin:0;}' +
    '.quiz-options{display:grid;gap:.75rem;margin:0 0 1rem;}' +
    '.quiz-option{padding:.85rem 1rem;border-radius:calc(var(--radius)/1.5);border:1px solid var(--line);' +
      'background:var(--surface);color:var(--ink);font-size:1rem;cursor:pointer;text-align:left;' +
      'transition:transform .12s ease,border-color .15s ease,background .15s ease;}' +
    '.quiz-option:hover:not(:disabled){border-color:var(--accent);transform:translateX(3px);}' +
    '.quiz-option:active:not(:disabled){transform:scale(.98);}' +
    '.quiz-option:disabled{cursor:default;opacity:.85;}' +
    '.quiz-option.is-correct{border-color:#2e7d46;background:rgba(46,125,70,.14);font-weight:700;}' +
    '.quiz-option.is-wrong{border-color:#c0392b;background:rgba(192,57,43,.14);}' +
    '.quiz-feedback{border-radius:var(--radius);padding:1rem 1.25rem;margin:0 0 1rem;text-align:left;}' +
    '.quiz-feedback.is-correct{background:rgba(46,125,70,.12);border:1px solid #2e7d46;animation:quiz-bounce .5s ease;}' +
    '.quiz-feedback.is-wrong{background:rgba(192,57,43,.12);border:1px solid #c0392b;}' +
    '.quiz-feedback-headline{font-weight:700;font-size:1.15rem;margin:0 0 .5rem;}' +
    '.quiz-feedback-note,.quiz-feedback-answer{color:var(--ink-soft);margin:0 0 .75rem;}' +
    '.quiz-next-btn{display:block;margin:0 auto;}' +
    '@keyframes quiz-bounce{0%{transform:scale(.92);}50%{transform:scale(1.05);}100%{transform:scale(1);}}' +
    '.quiz-result-score{font-size:3rem;font-weight:700;color:var(--accent);font-family:Georgia,serif;margin:0;}' +
    '.quiz-result-score span{font-size:1.4rem;color:var(--ink-soft);}' +
    '.quiz-result-headline{font-size:1.4rem;font-weight:700;margin:.5rem 0;color:var(--accent-2);}' +
    '.quiz-result-sub{color:var(--ink-soft);margin:0 0 1rem;}' +
    '.quiz-newbest{color:var(--gold);font-weight:700;margin:0 0 1rem;}' +
    '.quiz-error{color:var(--ink-soft);padding:2.5rem 1.5rem;}' +
    '.quiz-result.is-perfect{position:relative;overflow:hidden;}' +
    '.quiz-confetti{position:absolute;inset:0;pointer-events:none;overflow:hidden;}' +
    '.quiz-confetti-piece{position:absolute;top:-8%;left:calc(var(--i) * 4.2%);width:8px;height:14px;' +
      'background:var(--gold);opacity:.9;border-radius:2px;' +
      'animation:quiz-confetti-fall 2.6s linear infinite;animation-delay:calc(var(--i) * .08s);}' +
    '.quiz-confetti-piece:nth-child(3n){background:var(--accent);}' +
    '.quiz-confetti-piece:nth-child(3n+1){background:var(--accent-2);}' +
    '@keyframes quiz-confetti-fall{0%{transform:translateY(-20px) rotate(0deg);opacity:1;}' +
      '100%{transform:translateY(420px) rotate(360deg);opacity:0;}}' +
    '@media (prefers-reduced-motion: reduce){' +
      '.quiz-confetti-piece{animation:none!important;display:none;}' +
      '.quiz-feedback.is-correct{animation:none;}' +
      '.quiz-btn,.quiz-option,.quiz-speak-btn{transition:none;}}';

  // ---------- ユーティリティ ----------
  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i];
      a[i] = a[j];
      a[j] = tmp;
    }
    return a;
  }

  function escapeHtml(str) {
    return String(str == null ? '' : str).replace(/[&<>"']/g, function (ch) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
    });
  }

  // phrasesData(カテゴリ配列)から有効なフレーズだけをフラット化
  function flattenPhrases(phrasesData) {
    var out = [];
    if (!Array.isArray(phrasesData)) return out;
    for (var i = 0; i < phrasesData.length; i++) {
      var cat = phrasesData[i];
      if (!cat || !Array.isArray(cat.phrases)) continue;
      for (var j = 0; j < cat.phrases.length; j++) {
        var p = cat.phrases[j];
        if (p && typeof p.fr === 'string' && typeof p.ja === 'string' && p.fr && p.ja) {
          out.push(p);
        }
      }
    }
    return out;
  }

  function pickWrongAnswers(all, correctJa, count) {
    var seen = { };
    seen[correctJa] = true;
    var pool = [];
    var pickedFrom = shuffle(all);
    for (var i = 0; i < pickedFrom.length && pool.length < count; i++) {
      var ja = pickedFrom[i].ja;
      if (!seen[ja]) {
        seen[ja] = true;
        pool.push(ja);
      }
    }
    return pool;
  }

  function buildQuestions(all) {
    var n = Math.min(QUESTION_COUNT, all.length);
    var chosen = shuffle(all).slice(0, n);
    return chosen.map(function (p) {
      var type = Math.random() < 0.5 ? 'meaning' : 'listening';
      var wrongs = pickWrongAnswers(all, p.ja, WRONG_CHOICE_COUNT);
      var options = shuffle([p.ja].concat(wrongs));
      return { phrase: p, type: type, options: options };
    });
  }

  function scoreMessage(score, total) {
    var ratio = total > 0 ? score / total : 0;
    if (ratio >= 1) {
      return { fr: 'Parfait !', ja: '文句なしの満点。旅先でもきっと堂々と話せますね。' };
    }
    if (ratio >= 0.8) {
      return { fr: 'Très bien !', ja: 'とても良い出来です。あと少しで満点ですよ。' };
    }
    if (ratio >= 0.5) {
      return { fr: 'Pas mal !', ja: '着実に身についています。復習すればもっと伸びます。' };
    }
    return { fr: 'Bon courage !', ja: 'まだ伸びしろたっぷり。フレーズ集を見返してまた挑戦しましょう。' };
  }

  function getBest() {
    try {
      var v = parseInt(localStorage.getItem(BEST_KEY), 10);
      return isNaN(v) ? 0 : v;
    } catch (e) {
      return 0;
    }
  }

  function setBest(v) {
    try {
      localStorage.setItem(BEST_KEY, String(v));
    } catch (e) {
      /* ストレージ不可時は無視 */
    }
  }

  function renderConfettiHtml() {
    var pieces = '';
    for (var i = 0; i < 24; i++) {
      pieces += '<span class="quiz-confetti-piece" style="--i:' + i + '"></span>';
    }
    return '<div class="quiz-confetti" aria-hidden="true">' + pieces + '</div>';
  }

  // 再入時に container を作り直し、過去のリスナー・状態を確実に断ち切る
  function resetContainer(container) {
    if (container.parentNode) {
      var fresh = container.cloneNode(false); // 属性は引き継ぐがリスナーは引き継がない
      container.parentNode.replaceChild(fresh, container);
      return fresh;
    }
    container.innerHTML = '';
    return container;
  }

  // ---------- メイン ----------
  function init(container, phrasesData, speak) {
    if (!container) return;
    container = resetContainer(container);
    injectStyle();
    container.classList.add('quiz-root');

    var all = flattenPhrases(phrasesData);
    var speakFn = typeof speak === 'function' ? speak : function () {};

    if (all.length === 0) {
      container.innerHTML = '<div class="quiz-error">フレーズデータが読み込めませんでした</div>';
      return;
    }

    var state = null;

    renderStart();

    function renderStart() {
      var best = getBest();
      container.innerHTML =
        '<div class="quiz-start">' +
          '<div class="quiz-icon">' + (window.APP_QUIZ_ICON || '🇫🇷') + '</div>' +
          '<h2 class="quiz-title">フレーズクイズ</h2>' +
          '<p class="quiz-desc">覚えたフレーズ、旅先で使えるか試してみましょう。意味当てとリスニング、全' + QUESTION_COUNT + '問です。</p>' +
          (best > 0
            ? '<p class="quiz-best">ベストスコア: <strong>' + best + ' / ' + QUESTION_COUNT + '</strong></p>'
            : '') +
          '<button type="button" class="quiz-btn quiz-btn-primary quiz-start-btn">スタート</button>' +
        '</div>';
      var btn = container.querySelector('.quiz-start-btn');
      if (btn) btn.addEventListener('click', startQuiz);
    }

    function startQuiz() {
      var questions = buildQuestions(all);
      state = { questions: questions, index: 0, score: 0, answered: false };
      renderQuestion();
    }

    function renderQuestion() {
      var q = state.questions[state.index];
      var total = state.questions.length;
      var progress = Math.round((state.index / total) * 100);
      var isListening = q.type === 'listening';

      container.innerHTML =
        '<div class="quiz-play">' +
          '<div class="quiz-progress-track"><div class="quiz-progress-fill" style="width:' + progress + '%"></div></div>' +
          '<p class="quiz-meta">問題 ' + (state.index + 1) + ' / ' + total + '</p>' +
          '<div class="quiz-prompt-card">' +
            (isListening
              ? '<div class="quiz-listen"><button type="button" class="quiz-speak-btn" aria-label="発音を再生">🔊</button>' +
                '<p class="quiz-listen-label">音声を聞いて意味を選んでください(何度でも再生できます)</p></div>'
              : '<p class="quiz-fr">' + escapeHtml(q.phrase.fr) + '</p>') +
          '</div>' +
          '<div class="quiz-options"></div>' +
          '<div class="quiz-feedback" hidden></div>' +
        '</div>';

      var optionsWrap = container.querySelector('.quiz-options');
      q.options.forEach(function (opt) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'quiz-option';
        b.textContent = opt;
        b.addEventListener('click', function () { selectAnswer(opt, b); });
        optionsWrap.appendChild(b);
      });

      if (isListening) {
        var speakBtn = container.querySelector('.quiz-speak-btn');
        speakBtn.addEventListener('click', function () { speakFn(q.phrase.fr); });
      }
    }

    function selectAnswer(opt, btnEl) {
      if (state.answered) return;
      state.answered = true;
      var q = state.questions[state.index];
      var correct = opt === q.phrase.ja;
      if (correct) state.score++;

      var optionsWrap = container.querySelector('.quiz-options');
      Array.prototype.forEach.call(optionsWrap.children, function (btn) {
        btn.disabled = true;
        if (btn.textContent === q.phrase.ja) btn.classList.add('is-correct');
        if (btn === btnEl && !correct) btn.classList.add('is-wrong');
      });

      var feedback = container.querySelector('.quiz-feedback');
      feedback.hidden = false;
      if (correct) {
        feedback.className = 'quiz-feedback is-correct';
        feedback.innerHTML =
          '<p class="quiz-feedback-headline">Bravo ! 🎉</p>' +
          (q.phrase.note ? '<p class="quiz-feedback-note">💡 ' + escapeHtml(q.phrase.note) + '</p>' : '') +
          '<button type="button" class="quiz-btn quiz-btn-primary quiz-next-btn">次へ</button>';
      } else {
        feedback.className = 'quiz-feedback is-wrong';
        feedback.innerHTML =
          '<p class="quiz-feedback-headline">Dommage…</p>' +
          '<p class="quiz-feedback-answer">正解: <strong>' + escapeHtml(q.phrase.ja) + '</strong>' +
          '(' + escapeHtml(q.phrase.fr) + ' / ' + escapeHtml(q.phrase.kana || '') + ')</p>' +
          '<button type="button" class="quiz-btn quiz-btn-primary quiz-next-btn">次へ</button>';
      }
      container.querySelector('.quiz-next-btn').addEventListener('click', nextQuestion);
    }

    function nextQuestion() {
      state.index++;
      if (state.index >= state.questions.length) {
        finish();
      } else {
        state.answered = false;
        renderQuestion();
      }
    }

    function finish() {
      var total = state.questions.length;
      var score = state.score;
      var best = getBest();
      var isNewBest = score > best;
      if (isNewBest) setBest(score);
      var msg = scoreMessage(score, total);
      var perfect = total > 0 && score === total;

      container.innerHTML =
        '<div class="quiz-result' + (perfect ? ' is-perfect' : '') + '">' +
          (perfect ? renderConfettiHtml() : '') +
          '<p class="quiz-result-score">' + score + ' <span>/ ' + total + '</span></p>' +
          '<p class="quiz-result-headline">' + escapeHtml(msg.fr) + '</p>' +
          '<p class="quiz-result-sub">' + escapeHtml(msg.ja) + '</p>' +
          (isNewBest ? '<p class="quiz-newbest">🎉 ベストスコア更新!</p>' : '') +
          '<button type="button" class="quiz-btn quiz-btn-primary quiz-retry-btn">もう一度</button>' +
        '</div>';

      container.querySelector('.quiz-retry-btn').addEventListener('click', renderStart);
    }
  }

  window.Quiz = { init: init };
})();
