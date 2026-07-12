/* Voyage — 現地マップ(OpenStreetMap + Leaflet)
   GUIDE_GEO の座標を使い、各章に本物の地図を挿入する。
   タイルはオンライン時のみ読み込まれる。失敗時は案内を表示(イラストマップが控え)。 */
(function () {
  'use strict';

  var GEO = window.GUIDE_GEO;
  var SPOTS = window.GUIDE_SPOTS;
  if (!GEO || !Array.isArray(SPOTS) || !SPOTS.length || typeof window.L === 'undefined') return;

  var VISITED_KEY = 'voyage.guide.visited';
  var AMENITY = {
    water: { ic: '💧', label: '水・売店' },
    food:  { ic: '🍽️', label: '飲食・トイレ' },
    wc:    { ic: '🚻', label: 'トイレ・売店' },
    shade: { ic: '🌳', label: '木陰・休憩' }
  };

  function loadVisited() {
    try {
      var raw = JSON.parse(localStorage.getItem(VISITED_KEY) || '{}');
      if (Array.isArray(raw)) {
        var m = {};
        raw.forEach(function (k) { m[k] = true; });
        return m;
      }
      return raw && typeof raw === 'object' ? raw : {};
    } catch (e) { return {}; }
  }
  function isVisited(visited, spotId, stopId) {
    return !!(visited[spotId + '::' + stopId] || (visited[spotId] && visited[spotId][stopId]));
  }

  // ストップカードへスクロールして一瞬光らせる
  function flashStop(spotId, stopIndex) {
    var section = document.getElementById('spot-' + spotId);
    if (!section) return;
    var cards = section.querySelectorAll('.route > .stop');
    var card = cards[stopIndex];
    if (!card) return;
    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    card.classList.add('rmap-flash');
    setTimeout(function () { card.classList.remove('rmap-flash'); }, 1600);
  }

  function pinIcon(n, on) {
    return window.L.divIcon({
      className: 'rmap-pin-wrap',
      html: '<span class="rmap-pin' + (on ? ' is-on' : '') + '">' + (on ? '✓' : n) + '</span>',
      iconSize: [30, 30], iconAnchor: [15, 15], popupAnchor: [0, -14]
    });
  }
  function amenityIcon(type) {
    var a = AMENITY[type] || AMENITY.shade;
    return window.L.divIcon({
      className: 'rmap-pin-wrap',
      html: '<span class="rmap-amenity" title="' + a.label + '">' + a.ic + '</span>',
      iconSize: [22, 22], iconAnchor: [11, 11], popupAnchor: [0, -10]
    });
  }

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function buildMapSection(spot, geo, visited) {
    var section = document.getElementById('spot-' + spot.id);
    if (!section) return;
    var routeWrap = section.querySelector('.route');
    if (!routeWrap) return;

    var head = document.createElement('h3');
    head.className = 'spot__subhead';
    head.textContent = '🗺️ 現地マップ';

    var wrap = document.createElement('div');
    wrap.className = 'rmap-wrap';
    wrap.innerHTML =
      '<div class="rmap-el" aria-label="' + esc(spot.name) + 'の現地マップ"></div>' +
      '<div class="rmap-note">番号=順路(タップでカードへ) / ✓=見た場所 / 💧🍽️🚻🌳=水・飲食・トイレ・木陰の<strong>目安</strong>。' +
      '売店・給水は季節運営のため当日の案内で要確認。地図がオンラインで表示されない時は下のイラストマップをどうぞ。</div>';

    // 挿入位置: イラストマップがあればその見出しの前、なければ順路小見出しの前
    var subheads = section.querySelectorAll('.spot__subhead');
    var routeHead = null, illustHead = null;
    Array.prototype.forEach.call(subheads, function (h) {
      var t = h.textContent || '';
      if (!illustHead && /イラストマップ/.test(t)) illustHead = h;
      if (!routeHead && /順路/.test(t)) routeHead = h;
    });
    var anchor = illustHead || routeHead || routeWrap;
    anchor.parentNode.insertBefore(head, anchor);
    anchor.parentNode.insertBefore(wrap, anchor);

    var mapEl = wrap.querySelector('.rmap-el');
    var map = window.L.map(mapEl, {
      center: geo.center, zoom: geo.zoom,
      scrollWheelZoom: false,        // ページスクロールと喧嘩しない(ズームはボタン/ピンチ)
      attributionControl: true
    });
    map.attributionControl.setPrefix(false);

    var tileFailed = false;
    var tiles = window.L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors'
    });
    tiles.on('tileerror', function () {
      if (tileFailed) return;
      tileFailed = true;
      var b = document.createElement('div');
      b.className = 'rmap-offline';
      b.textContent = '地図タイルを読み込めません(オフライン?)。下のイラストマップをご利用ください。(タップで閉じる)';
      b.addEventListener('click', function () { b.remove(); });
      mapEl.appendChild(b);
      setTimeout(function () { if (b.parentNode) b.remove(); }, 7000);
    });
    tiles.addTo(map);

    // 順路ピン
    var markers = {};
    (spot.route || []).forEach(function (st, idx) {
      var pos = geo.stops && geo.stops[st.id];
      if (!pos) return;
      var on = isVisited(visited, spot.id, st.id);
      var mk = window.L.marker(pos, { icon: pinIcon(idx + 1, on), keyboard: false }).addTo(map);
      mk._voyage = { idx: idx, stopId: st.id };
      mk.bindPopup(
        '<div class="rmap-pop"><strong>' + (idx + 1) + '. ' + esc(st.name) + '</strong>' +
        (st.fr ? '<em>' + esc(st.fr) + '</em>' : '') +
        '<button type="button" class="rmap-pop__go" data-spot="' + esc(spot.id) + '" data-idx="' + idx + '">カードを見る →</button></div>'
      );
      markers[st.id] = mk;
    });

    // アメニティ(目安・非タップ主役)
    (geo.amenities || []).forEach(function (a) {
      window.L.marker(a.pos, { icon: amenityIcon(a.type), keyboard: false, interactive: true })
        .bindPopup('<div class="rmap-pop">' + esc(a.label) + '</div>')
        .addTo(map);
    });

    // 全ピンが収まるように
    var pts = Object.keys(geo.stops || {}).map(function (k) { return geo.stops[k]; });
    if (pts.length > 1) map.fitBounds(pts, { padding: [34, 34] });

    // 📍現在地ボタン(HTTPS のみ動作)
    var Locate = window.L.Control.extend({
      options: { position: 'topleft' },
      onAdd: function () {
        var btn = window.L.DomUtil.create('button', 'rmap-locate');
        btn.type = 'button';
        btn.textContent = '📍';
        btn.title = '現在地を表示';
        btn.setAttribute('aria-label', '現在地を表示');
        var meMarker = null, meCircle = null;
        window.L.DomEvent.on(btn, 'click', function (e) {
          window.L.DomEvent.stop(e);
          if (!navigator.geolocation) { btn.textContent = '✕'; return; }
          btn.classList.add('is-busy');
          navigator.geolocation.getCurrentPosition(function (p) {
            btn.classList.remove('is-busy');
            var ll = [p.coords.latitude, p.coords.longitude];
            if (meMarker) { meMarker.setLatLng(ll); meCircle.setLatLng(ll).setRadius(p.coords.accuracy || 30); }
            else {
              meMarker = window.L.marker(ll, {
                icon: window.L.divIcon({ className: 'rmap-pin-wrap', html: '<span class="rmap-me"></span>', iconSize: [18, 18], iconAnchor: [9, 9] }),
                keyboard: false
              }).addTo(map);
              meCircle = window.L.circle(ll, { radius: p.coords.accuracy || 30, weight: 1, opacity: .5, fillOpacity: .12 }).addTo(map);
            }
            map.setView(ll, Math.max(map.getZoom(), 16));
          }, function () {
            btn.classList.remove('is-busy');
            btn.textContent = '✕';
            setTimeout(function () { btn.textContent = '📍'; }, 1800);
          }, { enableHighAccuracy: true, timeout: 12000, maximumAge: 30000 });
        });
        return btn;
      }
    });
    map.addControl(new Locate());

    // ポップアップ内の「カードを見る」
    map.on('popupopen', function (ev) {
      var go = ev.popup.getElement().querySelector('.rmap-pop__go');
      if (!go) return;
      go.addEventListener('click', function () {
        map.closePopup();
        flashStop(go.getAttribute('data-spot'), parseInt(go.getAttribute('data-idx'), 10));
      });
    });

    return { map: map, markers: markers, spot: spot };
  }

  function init() {
    // guide.js の描画完了を待つ
    var ready = SPOTS.every(function (s) { return document.getElementById('spot-' + s.id); });
    if (!ready) { setTimeout(init, 120); return; }

    var visited = loadVisited();
    var built = [];
    SPOTS.forEach(function (spot) {
      var geo = GEO[spot.id];
      if (geo && geo.stops) {
        var r = buildMapSection(spot, geo, visited);
        if (r) built.push(r);
      }
    });

    // ✓トグルに追従してピンを更新(guide.js は変更しない)
    document.addEventListener('click', function (e) {
      if (!e.target || !e.target.classList || !e.target.classList.contains('stop__check')) return;
      setTimeout(function () {
        var v = loadVisited();
        built.forEach(function (b) {
          (b.spot.route || []).forEach(function (st, idx) {
            var mk = b.markers[st.id];
            if (mk) mk.setIcon(pinIcon(idx + 1, isVisited(v, b.spot.id, st.id)));
          });
        });
      }, 30);
    });

    // 折りたたみ等でサイズが変わった時の再計算
    window.addEventListener('resize', function () {
      built.forEach(function (b) { b.map.invalidateSize(); });
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
