// 現地マップ用の座標データ(WGS84)。ストップ位置・アメニティとも「目安」であり、
// 建物内部のストップは建物上の代表点に置いている。
window.GUIDE_GEO = {
  versailles: {
    center: [48.8075, 2.1130],
    zoom: 15,
    stops: {
      "cour-honneur":   [48.80410, 2.12160],
      "chapelle":       [48.80545, 2.12125],
      "hercule":        [48.80560, 2.12060],
      "appartement-1":  [48.80565, 2.11985],
      "appartement-2":  [48.80560, 2.11905],
      "guerre":         [48.80550, 2.11850],
      "galerie-glaces": [48.80485, 2.11840],
      "chambre-roi":    [48.80488, 2.11945],
      "paix-reine":     [48.80425, 2.11855],
      "chambre-reine":  [48.80420, 2.11905],
      "sacre":          [48.80390, 2.11960],
      "jardins":        [48.80425, 2.11565],
      "grand-canal":    [48.80400, 2.10770],
      "grand-trianon":  [48.81455, 2.10450],
      "petit-trianon":  [48.81555, 2.10960],
      "hameau":         [48.81855, 2.11305]
    },
    amenities: [
      { type: "wc",    pos: [48.80355, 2.12110], label: "入口周辺: トイレ・売店(目安)" },
      { type: "water", pos: [48.80405, 2.11265], label: "庭園の売店・キオスク(季節営業・目安)" },
      { type: "food",  pos: [48.80475, 2.10820], label: "プティット・ヴニーズ: レストラン・トイレ(目安)" },
      { type: "food",  pos: [48.81400, 2.10620], label: "トリアノン周辺のカフェ(目安)" },
      { type: "shade", pos: [48.80510, 2.11230], label: "ボスケの木陰(王の散歩道 北側)" },
      { type: "shade", pos: [48.80290, 2.11300], label: "ボスケの木陰(王の散歩道 南側)" },
      { type: "shade", pos: [48.80680, 2.10480], label: "大運河沿いの並木" },
      { type: "shade", pos: [48.81530, 2.10700], label: "トリアノン庭園の木陰" },
      { type: "shade", pos: [48.81800, 2.11380], label: "アモー周辺の木立" }
    ]
  },
  concorde: {
    center: [48.8656, 2.3212],
    zoom: 17,
    stops: {
      "obelisque":      [48.86560, 2.32125],
      "revolution":     [48.86590, 2.32060],
      "fontaines":      [48.86585, 2.32120],
      "axe-historique": [48.86550, 2.32030],
      "tuileries":      [48.86395, 2.32330]
    },
    amenities: [
      { type: "wc",    pos: [48.86370, 2.32450], label: "チュイルリー庭園内: トイレ・カフェ(目安)" },
      { type: "shade", pos: [48.86390, 2.32700], label: "チュイルリー庭園の木陰とベンチ" }
    ]
  },
  champs: {
    center: [48.8690, 2.3080],
    zoom: 15,
    stops: {
      "jardins":            [48.86660, 2.31450],
      "grand-petit-palais": [48.86615, 2.31350],
      "marche":             [48.86885, 2.30905],
      "cafes":              [48.87105, 2.30330]
    },
    amenities: [
      { type: "shade", pos: [48.86720, 2.31530], label: "庭園ゾーンの木陰(マリニー周辺)" },
      { type: "water", pos: [48.86890, 2.30980], label: "ロン・ポワン周辺のカフェ(目安)" }
    ]
  },
  arc: {
    center: [48.87380, 2.29510],
    zoom: 17,
    stops: {
      "souterrain": [48.87375, 2.29595],
      "sculptures": [48.87365, 2.29530],
      "tombe":      [48.87380, 2.29505],
      "murs":       [48.87388, 2.29498],
      "terrasse":   [48.87380, 2.29488],
      "napoleon":   [48.87395, 2.29450]
    },
    amenities: [
      { type: "shade", pos: [48.87310, 2.29690], label: "シャンゼリゼ側の並木(目安)" }
    ]
  },
  seine: {
    center: [48.8620, 2.3180],
    zoom: 14,
    stops: {
      "pont-alexandre": [48.86390, 2.31355],
      "grand-palais-nuit": [48.86450, 2.31270],
      "quais":          [48.86200, 2.32500],
      "conciergerie":   [48.85570, 2.34540],
      "blue-hour":    [48.86340, 2.31150],
      "eiffel-sparkle": [48.85840, 2.29450],
      "retour":         [48.86260, 2.31480]
    },
    amenities: [
      { type: "shade", pos: [48.86480, 2.31000], label: "クール・ラ・レーヌの並木道" }
    ]
  }
};
