// data/photos.js — 写真ギャラリー用データ。実画像は同梱せず、Wikipedia REST API から取得する。
window.PHOTOS_DATA = [
  {
    id: "eiffel",
    wiki: "Eiffel_Tower",
    name: "エッフェル塔",
    place: "パリ",
    caption: "宵闇に浮かび上がる鉄の塔、光の瞬きが夜のパリを静かに彩り続ける",
    emoji: "🗼",
    grad: ["#2a2350", "#c96f4a"],
    cultureId: null
  },
  {
    id: "louvre",
    wiki: "Louvre",
    name: "ルーヴル美術館",
    place: "パリ",
    caption: "ガラスのピラミッドをくぐれば、時代を越えた傑作たちが静かに出迎える",
    emoji: "🖼️",
    grad: ["#1f2a44", "#d4af6a"],
    cultureId: "museum-free-day"
  },
  {
    id: "montsaintmichel",
    wiki: "Mont-Saint-Michel",
    name: "モン・サン=ミシェル",
    place: "ノルマンディー",
    caption: "潮が満ちれば島となる修道院、干潮の砂地を歩いて辿り着く奇跡の光景",
    emoji: "🏰",
    grad: ["#3a4a5a", "#c9a876"],
    cultureId: null
  },
  {
    id: "notredame",
    wiki: "Notre-Dame_de_Paris",
    name: "ノートルダム大聖堂",
    place: "パリ",
    caption: "セーヌ川のほとりに聳える尖塔、火災を越えてなお祈りを紡ぎ続ける",
    emoji: "⛪",
    grad: ["#2e2a3d", "#8a6d4f"],
    cultureId: null
  },
  {
    id: "versailles",
    wiki: "Palace_of_Versailles",
    name: "ヴェルサイユ宮殿",
    place: "イル=ド=フランス",
    caption: "鏡の回廊に朝日が差し込む瞬間、王侯貴族の栄華が今も息づいている",
    emoji: "👑",
    grad: ["#4a3b28", "#e0c184"],
    cultureId: null
  },
  {
    id: "arcdetriomphe",
    wiki: "Arc_de_Triomphe",
    name: "凱旋門",
    place: "パリ",
    caption: "シャンゼリゼの喧騒を抜けて仰ぐ石の門、無名戦士の炎が絶えず揺れる",
    emoji: "🎖️",
    grad: ["#3b3530", "#8f9aa8"],
    cultureId: null
  },
  {
    id: "sacrecoeur",
    wiki: "Sacré-Cœur,_Paris",
    name: "サクレ・クール寺院",
    place: "モンマルトル",
    caption: "白亜のドームがモンマルトルの丘に浮かぶ、祈りの鐘が街並みに響く",
    emoji: "🕊️",
    grad: ["#4a3f55", "#e8c9b0"],
    cultureId: null
  },
  {
    id: "pontalexandre",
    wiki: "Pont_Alexandre_III",
    name: "アレクサンドル3世橋",
    place: "パリ",
    caption: "黄金の像が輝く橋の上、セーヌの川面に街灯りが揺らめき映る静かな夜",
    emoji: "🌉",
    grad: ["#2c3e50", "#d9a441"],
    cultureId: null
  },
  {
    id: "luxembourg",
    wiki: "Jardin_du_Luxembourg",
    name: "リュクサンブール公園",
    place: "パリ",
    caption: "宮殿を望む庭園の椅子に座れば、子どもたちの笑い声が木漏れ日に溶ける",
    emoji: "🌳",
    grad: ["#2f4a3d", "#a8c98a"],
    cultureId: null
  },
  {
    id: "moulinrouge",
    wiki: "Moulin_Rouge",
    name: "ムーラン・ルージュ",
    place: "モンマルトル",
    caption: "赤い風車が回る夜のモンマルトル、キャバレーの灯りが妖しく街を染める",
    emoji: "💃",
    grad: ["#3a1220", "#c9425f"],
    cultureId: null
  },
  {
    id: "chambord",
    wiki: "Château_de_Chambord",
    name: "シャンボール城",
    place: "ロワール渓谷",
    caption: "ロワールの森に浮かぶ幾何学の城、二重螺旋階段が今も謎めいている",
    emoji: "🏯",
    grad: ["#3a3020", "#a68a5b"],
    cultureId: null
  },
  {
    id: "etretat",
    wiki: "Étretat",
    name: "エトルタの断崖",
    place: "ノルマンディー",
    caption: "白亜の断崖が海へ切り立つ、象の鼻に似た岩門を波音が絶えず洗う",
    emoji: "🌊",
    grad: ["#1e3a4a", "#7fb0b8"],
    cultureId: null
  },
  {
    id: "cafedeflore",
    wiki: "Café_de_Flore",
    name: "カフェ・ド・フロール",
    place: "サン=ジェルマン=デ=プレ",
    caption: "サルトルも通ったカフェのテラスで、湯気の向こうに移りゆく街角を眺める",
    emoji: "☕",
    grad: ["#3d2b1f", "#d99a5b"],
    cultureId: "cafe-terrace"
  },
  {
    id: "baguette",
    wiki: "Baguette",
    name: "バゲット",
    place: null,
    caption: "焼きたての香りが漂う朝、紙一枚に包まれた一本を抱えて家路を急ぐ",
    emoji: "🥖",
    grad: ["#4a3320", "#e0a45c"],
    cultureId: "baguette-boulangerie"
  },
  {
    id: "macaron",
    wiki: "Macaron",
    name: "マカロン",
    place: null,
    caption: "パステルカラーの小さな宝石、ひと口ごとに広がる甘さが旅の記憶を彩る",
    emoji: "🍬",
    grad: ["#4a3448", "#e8b3c2"],
    cultureId: null
  },
  {
    id: "wine",
    wiki: "French_wine",
    name: "フランスワイン",
    place: null,
    caption: "ぶどう畑が広がる丘陵地帯、一杯のグラスに土地の記憶と陽光が満ちる",
    emoji: "🍷",
    grad: ["#2e1015", "#8f2f42"],
    cultureId: "wine-ordering"
  }
];
