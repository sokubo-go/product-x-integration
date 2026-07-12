/* =========================================================
   Voyage — ヴェルサイユ「全体マップ」
   guide.html のヴェルサイユ章に、フランス式庭園の平面図を
   インライン SVG で挿入する自己完結スクリプト。
   - GUIDE_SPOTS / 対象章が無ければ何もしない(防御的)。
   - guide.js は一切変更しない。visited は localStorage を読むだけ。
   - 番号ピン tap → 対応する順路カードへスクロール + 発光。
   ========================================================= */
(function () {
  'use strict';

  var SPOT_ID = 'versailles';
  var VISITED_KEY = 'voyage.guide.visited';

  // --- 各ストップのマップ上座標(viewBox 0 0 400 700)。id は route と一致 ---
  // 下段=宮殿内順路インセット(y>430)、上段=敷地全体。
  var PINS = {
    // 宮殿内順路(1〜11)
    'cour-honneur':   [200, 646],
    'chapelle':       [276, 590],
    'hercule':        [276, 528],
    'appartement-1':  [262, 500],
    'appartement-2':  [262, 476],
    'guerre':         [272, 460],
    'galerie-glaces': [200, 459],
    'chambre-roi':    [200, 487],
    'paix-reine':     [130, 461],
    'chambre-reine':  [152, 486],
    'sacre':          [124, 560],
    // 敷地全体(12〜16)
    'jardins':        [200, 330],
    'grand-canal':    [200, 120],
    'grand-trianon':  [300, 182],
    'petit-trianon':  [350, 150],
    'hameau':         [340,  92]
  };

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  // --- visited を localStorage から読む(guide.js と同じ形式) ---
  function loadVisited() {
    try {
      var raw = JSON.parse(localStorage.getItem(VISITED_KEY) || '{}');
      if (Array.isArray(raw)) { var m = {}; raw.forEach(function (k) { m[k] = true; }); return m; }
      return (raw && typeof raw === 'object') ? raw : {};
    } catch (e) { return {}; }
  }
  function vKey(id) { return SPOT_ID + '::' + id; }

  // =========================================================
  // SVG 部品生成ヘルパー
  // =========================================================
  function dots(x0, y0, nx, ny, gx, gy, r, cls) {
    var s = '';
    for (var j = 0; j < ny; j++) {
      for (var i = 0; i < nx; i++) {
        s += '<circle class="' + cls + '" cx="' + (x0 + i * gx) + '" cy="' + (y0 + j * gy) + '" r="' + r + '"/>';
      }
    }
    return s;
  }

  // 装飾: 刺繍花壇(broderie parterre)。外周=生垣、内側=砂利+中央モチーフ。
  function parterre(x, y, w, h) {
    var cx = x + w / 2, cy = y + h / 2;
    return '<g>' +
      '<rect class="vmap-hedge" x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="5"/>' +
      '<rect class="vmap-grit" x="' + (x + 5) + '" y="' + (y + 5) + '" width="' + (w - 10) + '" height="' + (h - 10) + '" rx="4"/>' +
      '<path class="vmap-scroll" d="M' + cx + ' ' + (y + 9) + ' C' + (x + 9) + ' ' + (y + 9) + ',' + (x + 9) + ' ' + (cy) + ',' + cx + ' ' + (y + h - 9) +
        ' C' + (x + w - 9) + ' ' + (cy) + ',' + (x + w - 9) + ' ' + (y + 9) + ',' + cx + ' ' + (y + 9) + ' Z"/>' +
      '<circle class="vmap-scroll-dot" cx="' + cx + '" cy="' + cy + '" r="3.4"/>' +
      '</g>';
  }

  // 装飾: ボスケ(木立の小部屋)。生垣の四角に砂利の十字路と樹木の点。
  function bosquet(x, y, w, h) {
    return '<g>' +
      '<rect class="vmap-hedge2" x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="5"/>' +
      '<line class="vmap-alley" x1="' + x + '" y1="' + (y + h / 2) + '" x2="' + (x + w) + '" y2="' + (y + h / 2) + '"/>' +
      '<line class="vmap-alley" x1="' + (x + w / 2) + '" y1="' + y + '" x2="' + (x + w / 2) + '" y2="' + (y + h) + '"/>' +
      dots(x + 12, y + 12, 2, 2, w - 24, h - 24, 4.6, 'vmap-tree') +
      '<circle class="vmap-tree" cx="' + (x + w / 2) + '" cy="' + (y + h / 2) + '" r="4"/>' +
      '</g>';
  }

  // 装飾アメニティ(タップ非対象)。💧=水/売店の目安、🌳=木陰の目安。
  function amenity(kind, x, y) {
    var cls = kind === 'water' ? 'vmap-am vmap-am--water' : 'vmap-am vmap-am--shade';
    var glyph = kind === 'water' ? '💧' : '🌳';
    return '<g class="' + cls + '" aria-hidden="true">' +
      '<circle class="vmap-am__disc" cx="' + x + '" cy="' + y + '" r="8"/>' +
      '<text class="vmap-am__gl" x="' + x + '" y="' + y + '">' + glyph + '</text>' +
      '</g>';
  }

  function label(x, y, text, cls) {
    return '<text class="vmap-label ' + (cls || '') + '" x="' + x + '" y="' + y + '">' + esc(text) + '</text>';
  }

  // 小さな家(アモー用): 壁 + 三角屋根
  function cottage(x, y, s) {
    return '<g>' +
      '<rect class="vmap-stone" x="' + x + '" y="' + y + '" width="' + s + '" height="' + s * 0.8 + '" rx="1"/>' +
      '<path class="vmap-roof" d="M' + (x - 1.5) + ' ' + y + ' L' + (x + s / 2) + ' ' + (y - s * 0.6) + ' L' + (x + s + 1.5) + ' ' + y + ' Z"/>' +
      '</g>';
  }

  // =========================================================
  // マップ SVG 本体を組み立て
  // =========================================================
  function buildSVG(route, visited) {
    var P = [];

    // defs: 影・砂利テクスチャ
    P.push('<defs>' +
      '<filter id="vmapSoft" x="-20%" y="-20%" width="140%" height="140%">' +
        '<feDropShadow dx="0" dy="1.4" stdDeviation="1.6" flood-color="rgba(20,16,8,.28)"/>' +
      '</filter>' +
      '<pattern id="vmapGrit" width="7" height="7" patternUnits="userSpaceOnUse">' +
        '<circle cx="1.5" cy="1.5" r="0.7" class="vmap-grit-dot"/>' +
      '</pattern>' +
      '</defs>');

    // 外枠(額縁)
    P.push('<rect class="vmap-frame vmap-frame--out" x="6" y="6" width="388" height="688" rx="14"/>');
    P.push('<rect class="vmap-frame vmap-frame--in" x="11" y="11" width="378" height="678" rx="11"/>');

    // タイトル
    P.push('<text class="vmap-title" x="200" y="34" text-anchor="middle">ヴェルサイユ 全体マップ</text>');
    P.push('<line class="vmap-rule" x1="150" y1="42" x2="250" y2="42"/>');

    // ---- 上段: 敷地全体パネル ----
    P.push('<rect class="vmap-ground" x="16" y="52" width="368" height="356" rx="12"/>');
    P.push('<rect x="16" y="52" width="368" height="356" rx="12" fill="url(#vmapGrit)"/>');
    P.push(label(26, 68, '敷地全体 — 庭園と大運河', 'vmap-label--sec'));

    // 方位(上=西 / 右=北)
    P.push('<g class="vmap-compass">' +
      '<line x1="52" y1="118" x2="52" y2="96"/>' +
      '<path d="M52 92 l-3.4 6 h6.8 Z" class="vmap-compass-head"/>' +
      '<line x1="52" y1="118" x2="72" y2="118"/>' +
      '<path d="M76 118 l-6 -3.4 v6.8 Z" class="vmap-compass-head"/>' +
      '<circle cx="52" cy="118" r="1.8" class="vmap-compass-hub"/>' +
      '<text class="vmap-compass-t" x="52" y="88" text-anchor="middle">西</text>' +
      '<text class="vmap-compass-t" x="82" y="121">北</text>' +
      '</g>');

    // 大運河(十字の水面)
    P.push('<g filter="url(#vmapSoft)">' +
      '<rect class="vmap-water" x="192" y="92" width="16" height="134" rx="7"/>' +
      '<rect class="vmap-water" x="116" y="150" width="168" height="16" rx="7"/>' +
      '</g>');
    P.push(label(150, 112, '大運河', 'vmap-label--water'));

    // トリアノンへの散策路(点線)
    P.push('<path class="vmap-path" d="M284 158 C300 158 296 182 300 182 C330 176 336 152 350 150 C346 130 338 108 340 100"/>');

    // グラン・トリアノン
    P.push('<g filter="url(#vmapSoft)">' +
      '<rect class="vmap-stone" x="282" y="172" width="40" height="18" rx="2"/>' +
      '<rect class="vmap-hedge" x="282" y="192" width="40" height="12" rx="3"/>' +
      '</g>');
    P.push(label(280, 216, 'グラン・トリアノン', 'vmap-label--sm'));

    // プチ・トリアノン
    P.push('<g filter="url(#vmapSoft)"><rect class="vmap-stone" x="338" y="138" width="24" height="22" rx="2"/></g>');
    P.push(label(378, 170, 'プチ・トリアノン', 'vmap-label--sm vmap-label--end'));

    // アモー(王妃の村里): 小さな池 + 茅葺きの家々
    P.push('<ellipse class="vmap-water" cx="338" cy="98" rx="17" ry="11"/>');
    P.push(cottage(320, 78, 8));
    P.push(cottage(352, 82, 7));
    P.push(cottage(340, 108, 7));
    P.push(label(316, 70, '王妃の村里', 'vmap-label--sm'));

    // アポロンの泉水
    P.push('<ellipse class="vmap-water" cx="200" cy="232" rx="26" ry="15" filter="url(#vmapSoft)"/>');
    P.push(dots(190, 232, 3, 1, 10, 0, 1.4, 'vmap-water-dot'));

    // 王の散歩道(緑のじゅうたん)+ 両側のボスケ
    P.push('<rect class="vmap-lawn" x="184" y="244" width="32" height="66" rx="4"/>');
    P.push(bosquet(120, 248, 56, 58));
    P.push(bosquet(224, 248, 56, 58));

    // ラトナの泉水 + 左右対称の刺繍花壇
    P.push('<circle class="vmap-water" cx="200" cy="330" r="16" filter="url(#vmapSoft)"/>');
    P.push(parterre(104, 306, 72, 50));
    P.push(parterre(224, 306, 72, 50));
    P.push(label(150, 300, '庭園', 'vmap-label--sm'));

    // テラス + 宮殿(上段では小さく)
    P.push('<g filter="url(#vmapSoft)">' +
      '<rect class="vmap-stone" x="152" y="360" width="96" height="30" rx="3"/>' +
      '<line class="vmap-gold-line" x1="152" y1="366" x2="248" y2="366"/>' +
      '</g>');
    P.push(label(200, 402, '宮殿', 'vmap-label--ctr'));

    // グランド・ペルスペクティヴ(中心軸の点線)
    P.push('<line class="vmap-axis" x1="200" y1="358" x2="200" y2="94"/>');

    // ---- 敷地全体アメニティ(装飾) ----
    // 💧 大運河手前の飲食(プティット・ヴニーズ)・ボート乗り場・トリアノンのカフェ
    P.push(amenity('water', 232, 214)); // 大運河手前(プティット・ヴニーズ)
    P.push(amenity('water', 176, 208)); // 大運河ボート乗り場周辺
    P.push(amenity('water', 334, 194)); // トリアノン周辺のカフェ
    // 🌳 木陰: 散歩道両側の木立・運河沿い並木・トリアノンの庭・アモー周辺
    P.push(amenity('shade', 112, 276));
    P.push(amenity('shade', 288, 276));
    P.push(amenity('shade', 232, 132)); // 運河沿い並木
    P.push(amenity('shade', 168, 132));
    P.push(amenity('shade', 318, 122)); // アモー周辺の木陰

    // ---- 段の仕切り ----
    P.push('<line class="vmap-divider" x1="40" y1="420" x2="360" y2="420"/>');
    P.push('<text class="vmap-title vmap-title--sm" x="200" y="418" text-anchor="middle">◆</text>');

    // ---- 下段: 宮殿内順路インセット ----
    P.push('<rect class="vmap-ground vmap-ground--2" x="16" y="430" width="368" height="258" rx="12"/>');
    P.push(label(26, 446, '宮殿内 順路(拡大図)', 'vmap-label--sec'));

    // 前庭(グラヴィエ)と大理石の中庭
    P.push('<rect class="vmap-court" x="148" y="500" width="104" height="150" rx="3"/>');
    P.push(dots(158, 512, 5, 6, 18, 22, 1.1, 'vmap-court-dot'));
    // 黄金の門(グリル・ロワイヤル)
    P.push('<line class="vmap-grille" x1="150" y1="632" x2="250" y2="632"/>');

    // 宮殿本館(U字。下=東=前庭に開く)
    P.push('<path class="vmap-stone vmap-palace" filter="url(#vmapSoft)" d="M100 452 H300 V628 H252 V500 H148 V628 H100 Z"/>');
    // 室内の間仕切り(アンフィラード)
    P.push('<g class="vmap-floor">' +
      '<line x1="100" y1="482" x2="148" y2="482"/><line x1="252" y1="482" x2="300" y2="482"/>' +
      '<line x1="140" y1="465" x2="140" y2="500"/><line x1="180" y1="465" x2="180" y2="500"/>' +
      '<line x1="220" y1="465" x2="220" y2="500"/><line x1="260" y1="465" x2="260" y2="500"/>' +
      '<line x1="124" y1="540" x2="124" y2="628"/><line x1="276" y1="540" x2="276" y2="628"/>' +
      '</g>');
    // 鏡の回廊(庭園側=上の長い回廊)
    P.push('<rect class="vmap-hall" x="116" y="452" width="168" height="13" rx="2"/>');

    P.push(label(200, 448, '鏡の回廊', 'vmap-label--ctr vmap-label--onstone'));
    P.push(label(200, 664, '儀礼の中庭', 'vmap-label--ctr'));

    // ---- インセットのアメニティ(装飾) ----
    // 💧 宮殿入口周辺(セキュリティ検査後のエリア)
    P.push(amenity('water', 168, 646));
    P.push(amenity('shade', 232, 646));

    // ---- 順路(点線) + 番号ピン ----
    // route の並び順のうち、インセット領域(y>430)のものだけ点線でつなぐ
    var interior = route.filter(function (st) {
      var c = PINS[st.id]; return c && c[1] > 430;
    });
    if (interior.length > 1) {
      var d = 'M' + interior.map(function (st) { return PINS[st.id][0] + ' ' + PINS[st.id][1]; }).join(' L');
      P.push('<path class="vmap-route" d="' + d + '"/>');
    }

    // ピン(全16)。番号=route 内の通し番号。
    route.forEach(function (st, i) {
      var c = PINS[st.id];
      if (!c) return;
      var on = !!visited[vKey(st.id)];
      var num = i + 1;
      var nm = st.name || st.id;
      P.push('<g class="vmap-pin' + (on ? ' is-visited' : '') + '" data-stop="' + esc(st.id) + '" role="button" tabindex="0" aria-label="' + esc(num + '. ' + nm) + ' の順路カードへ移動">' +
        '<title>' + esc(num + '. ' + nm) + '</title>' +
        '<circle class="vmap-pin__halo" cx="' + c[0] + '" cy="' + c[1] + '" r="15"/>' +
        '<circle class="vmap-pin__disc" cx="' + c[0] + '" cy="' + c[1] + '" r="11.2"/>' +
        '<text class="vmap-pin__num" x="' + c[0] + '" y="' + c[1] + '" data-num="' + num + '">' + (on ? '✓' : num) + '</text>' +
        '</g>');
    });

    return '<svg class="vmap" viewBox="0 0 400 700" role="img" ' +
      'aria-label="ヴェルサイユ全体マップ。上段が庭園と大運河・トリアノン、下段が宮殿内の順路。番号ピンをタップすると順路カードへ移動します。" ' +
      'xmlns="http://www.w3.org/2000/svg">' + P.join('') + '</svg>';
  }

  // =========================================================
  // 凡例(SVGの下、HTMLで)
  // =========================================================
  function legendHTML() {
    return '<div class="vmap-legend">' +
      '<span class="vmap-legend__i"><span class="vmap-legend__pin">1</span>番号=順路</span>' +
      '<span class="vmap-legend__i"><span class="vmap-legend__pin vmap-legend__pin--on">✓</span>見た場所</span>' +
      '<span class="vmap-legend__i"><span class="vmap-legend__am vmap-legend__am--water">💧</span>水・売店の目安</span>' +
      '<span class="vmap-legend__i"><span class="vmap-legend__am vmap-legend__am--shade">🌳</span>木陰・休憩の目安</span>' +
      '</div>' +
      '<p class="vmap-note">💧🌳 は目安です。売店・給水は季節運営のため当日の案内で要確認。' +
      'ピンをタップすると順路カードへ移動し、訪れた場所は金色に光ります。</p>';
  }

  // =========================================================
  // 挿入 + インタラクション配線
  // =========================================================
  var wired = false;

  function build(section, spot) {
    var routeWrap = section.querySelector('.route');
    if (!routeWrap) return false;
    var cards = routeWrap.querySelectorAll('.stop');
    var route = Array.isArray(spot.route) ? spot.route : [];
    if (!cards.length || !route.length) return false;

    // route[i] ↔ cards[i](guide.js は route 順に描画するため位置対応が確実)
    var cardById = {};
    route.forEach(function (st, i) { if (cards[i]) cardById[st.id] = cards[i]; });

    var visited = loadVisited();

    // 章見出し + 折りたたみマップ
    var head = document.createElement('h3');
    head.className = 'spot__subhead';
    head.textContent = '🗺️ 全体マップ';

    var details = document.createElement('details');
    details.className = 'vmap-wrap';
    details.open = true;
    var summary = document.createElement('summary');
    summary.className = 'vmap-summary';
    summary.innerHTML =
      '<span class="vmap-summary__ic" aria-hidden="true">🗺️</span>' +
      '<span class="vmap-summary__label">全体マップ</span>' +
      '<span class="vmap-summary__hint" aria-hidden="true">開く / 閉じる</span>';
    details.appendChild(summary);

    var body = document.createElement('div');
    body.className = 'vmap-body';
    body.innerHTML = buildSVG(route, visited) + legendHTML();
    details.appendChild(body);

    // 順路の小見出しの直前に挿入
    var subheads = section.querySelectorAll('.spot__subhead');
    var routeHead = null;
    Array.prototype.forEach.call(subheads, function (h) {
      if (!routeHead && /順路/.test(h.textContent || '')) routeHead = h;
    });
    var anchor = routeHead || routeWrap;
    section.insertBefore(head, anchor);
    section.insertBefore(details, anchor);

    var svg = body.querySelector('svg.vmap');
    var pins = Array.prototype.slice.call(svg.querySelectorAll('.vmap-pin'));

    // ピン → 順路カードへスクロール + 一瞬ハイライト
    function goTo(id) {
      var card = cardById[id];
      if (!card) return;
      try { card.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
      catch (e) { card.scrollIntoView(); }
      card.classList.remove('vmap-flash');
      void card.offsetWidth; // reflow で再アニメーション
      card.classList.add('vmap-flash');
      setTimeout(function () { card.classList.remove('vmap-flash'); }, 1500);
    }
    svg.addEventListener('click', function (e) {
      var pin = e.target.closest && e.target.closest('.vmap-pin');
      if (pin) goTo(pin.getAttribute('data-stop'));
    });
    svg.addEventListener('keydown', function (e) {
      if (e.key !== 'Enter' && e.key !== ' ' && e.key !== 'Spacebar') return;
      var pin = e.target.closest && e.target.closest('.vmap-pin');
      if (pin) { e.preventDefault(); goTo(pin.getAttribute('data-stop')); }
    });

    // visited 連動: ピン表示を localStorage から再同期
    function syncPins() {
      var v = loadVisited();
      pins.forEach(function (pin) {
        var on = !!v[vKey(pin.getAttribute('data-stop'))];
        pin.classList.toggle('is-visited', on);
        var t = pin.querySelector('.vmap-pin__num');
        if (t) t.textContent = on ? '✓' : (t.getAttribute('data-num') || '');
      });
    }

    // ✓ボタンのトグルを document 委譲で検知(guide.js は変更しない)
    if (!wired) {
      wired = true;
      document.addEventListener('click', function (e) {
        var btn = e.target.closest && e.target.closest('.stop__check');
        if (btn) setTimeout(syncPins, 0);
      });
    }

    return true;
  }

  // =========================================================
  // 起動: 章の描画完了まで短くリトライ
  // =========================================================
  function findSpot() {
    if (!Array.isArray(window.GUIDE_SPOTS)) return null;
    for (var i = 0; i < window.GUIDE_SPOTS.length; i++) {
      var s = window.GUIDE_SPOTS[i];
      if (s && s.id === SPOT_ID) return s;
    }
    return null;
  }

  var tries = 0;
  function tick() {
    try {
      var spot = findSpot();
      if (!spot) return; // データが無ければ何もしない
      var section = document.getElementById('spot-' + SPOT_ID);
      if (section && !section.querySelector('.vmap-wrap')) {
        var route = section.querySelector('.route');
        if (route && route.querySelector('.stop')) {
          if (build(section, spot)) return;
        }
      } else if (section) {
        return; // 既に挿入済み
      }
    } catch (e) { return; }
    if (++tries <= 40) setTimeout(tick, 80);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', tick);
  } else {
    tick();
  }
})();
