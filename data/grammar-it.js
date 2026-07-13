// data/grammar-it.js — Viaggio 基礎文法コース(イタリア語・12ユニット)
window.GRAMMAR_DATA = [
  {
    id: "pronuncia",
    order: 1,
    title: "発音のルール — ローマ字読みでほぼ通じる",
    icon: "🔤",
    intro: [
      "空港に降り立って最初に耳にするのはイタリア語の音そのもの。幸いイタリア語はほぼローマ字読みで通じる言語で、英語のような不規則な発音変化が少ない。綴りを見れば読み方が分かる、それだけで旅の不安はかなり減る。ローマの看板もバチカンの案内板も、声に出して読めれば意味の見当がつくようになる。",
      "つまずくとしたら c と g の後に来る母音で音が変わる点、そして日本語にない rr(巻き舌)の存在くらい。ここさえ押さえれば「Buongiorno」も「Grazie」も自信を持って声に出せるようになる。最初の数語を口に出せた瞬間から、旅の景色は少し違って見えてくるはずだ。"
    ],
    points: [
      {
        rule: "c は a/o/u の前で「カ行」、e/i の前で「チャ行」になる",
        examples: [
          { x: "ciao", ja: "やあ/またね", kana: "チャオ" },
          { x: "cappuccino", ja: "カプチーノ", kana: "カップッチーノ" },
          { x: "Colosseo", ja: "コロッセオ", kana: "コロッセーオ" }
        ]
      },
      {
        rule: "g も同じ規則。a/o/u の前は「ガ行」、e/i の前は「ジャ行」になる",
        examples: [
          { x: "grazie", ja: "ありがとう", kana: "グラッツィエ" },
          { x: "gelato", ja: "ジェラート", kana: "ジェラート" },
          { x: "oggi", ja: "今日", kana: "オッジ" }
        ]
      },
      {
        rule: "gli は「リ」、gn は「ニャ行」という、イタリア語特有の綴りと発音",
        examples: [
          { x: "famiglia", ja: "家族", kana: "ファミーリア" },
          { x: "bagno", ja: "お手洗い", kana: "バーニョ" },
          { x: "Bologna", ja: "ボローニャ", kana: "ボローニャ" }
        ]
      },
      {
        rule: "rr は舌を震わせる巻き舌。無理に巻けなくても「ル」を強めに伸ばせば通じる",
        examples: [
          { x: "birra", ja: "ビール", kana: "ビッラ" },
          { x: "terrazza", ja: "テラス", kana: "テラッツァ" },
          { x: "arrivederci", ja: "さようなら", kana: "アッリヴェデルチ" }
        ]
      }
    ],
    drills: [
      {
        type: "choice",
        q: "「Colosseo」の読み方は?",
        choices: ["コロッセーオ", "コロセーイオ", "コロッゼオ"],
        answer: 0,
        explain: "c は o の前なので「コ」、s は二重子音でも「ス/セ」のままで濁らない。日本語話者は s を濁って読みたくなるが、イタリア語の s は基本的に無声音のままだと覚えておこう。"
      },
      {
        type: "choice",
        q: "「gelato」の g の音は?",
        choices: ["ジェ", "ゲ", "ゲェ"],
        answer: 0,
        explain: "g は e の前で「ジャ行」になるため、gelato は「ジェラート」と読む。同じ g でも次に来る母音次第で音が変わることを、最初の単語で体に叩き込んでおくと後がずっと楽になる。"
      },
      {
        type: "fill",
        q: "___ giorno!(こんにちは)",
        choices: ["Buon", "Bene", "Bono"],
        answer: 0,
        explain: "Buongiorno は「良い(buon)+ 日(giorno)」。挨拶はまるごと1語のつもりで覚えると、文法を分解して考えるより先に口が動くようになる。"
      },
      {
        type: "fill",
        q: "お手洗いは italiano で ___。",
        choices: ["bagno", "bango", "bagno gn なし"],
        answer: 0,
        explain: "gn は「ニャ行」なので bagno は「バーニョ」と読む。gli と gn は見た目が似ているので、旅先で焦って読み間違えないように今のうちに区別しておきたい。"
      },
      {
        type: "order",
        q: "「すみません、コーヒーを1つ」の語順を作ろう",
        tokens: ["Scusi,", "un", "caffè"],
        answer: "Scusi, un caffè",
        explain: "Scusi(すみません)を文頭に置き、欲しいものを続けるのがイタリア語の基本パターン。声をかける一言と注文をひとつなぎにできると、バールでの会話が一気にスムーズになる。"
      }
    ]
  },
  {
    id: "nomi",
    order: 2,
    title: "名詞の性と単数・複数 — メニューが読める理由",
    icon: "👫",
    intro: [
      "メニューを見て「il gelato」なのか「la pizza」なのか迷った経験はないだろうか。イタリア語の名詞にはすべて男性・女性の性があり、それが冠詞や形容詞の形を決める土台になっている。性を覚えることは、実は文法全体の暗記量を減らす近道でもある。なぜなら冠詞さえ聞こえれば、その名詞の性が自動的に分かるからだ。",
      "幸い、語尾を見れば8割方の性は推測できる。-o で終われば男性、-a で終われば女性、というシンプルな規則から始めよう。複数形の作り方も同時に押さえれば、レストランで「2つください」も自在に言える。ローマのジェラテリアで指を2本立てるだけでなく、言葉でも数を伝えられると旅がぐっと楽しくなる。"
    ],
    points: [
      {
        rule: "語尾が -o なら男性名詞、-a なら女性名詞というのが基本パターン",
        examples: [
          { x: "il gelato", ja: "ジェラート(男性)", kana: "イル ジェラート" },
          { x: "la pizza", ja: "ピザ(女性)", kana: "ラ ピッツァ" },
          { x: "il vino", ja: "ワイン(男性)", kana: "イル ヴィーノ" }
        ]
      },
      {
        rule: "-e で終わる名詞は男女どちらもある。冠詞を見て性を判断する",
        examples: [
          { x: "il caffè", ja: "コーヒー(男性・例外綴り)", kana: "イル カッフェ" },
          { x: "la chiave", ja: "鍵(女性)", kana: "ラ キアーヴェ" },
          { x: "il ponte", ja: "橋(男性)", kana: "イル ポンテ" }
        ]
      },
      {
        rule: "複数形は語尾を変える。-o→-i、-a→-e、-e→-i",
        examples: [
          { x: "i gelati", ja: "ジェラート(複数)", kana: "イ ジェラーティ" },
          { x: "le pizze", ja: "ピザ(複数)", kana: "レ ピッツェ" },
          { x: "i ponti", ja: "橋(複数)", kana: "イ ポンティ" }
        ]
      },
      {
        rule: "-ista で終わる職業名などは男女同形。性は冠詞だけが教えてくれる",
        examples: [
          { x: "il turista", ja: "観光客(男性)", kana: "イル トゥリスタ" },
          { x: "la turista", ja: "観光客(女性)", kana: "ラ トゥリスタ" }
        ]
      }
    ],
    drills: [
      {
        type: "choice",
        q: "「pizza」の性は?",
        choices: ["女性", "男性", "分からない"],
        answer: 0,
        explain: "-a で終わる名詞は女性が基本。冠詞も la pizza になる。語尾を見るだけで性が分かる名詞がほとんどなので、まず語尾のパターンを反射的に見る癖をつけよう。"
      },
      {
        type: "choice",
        q: "「due gelati」の gelati は何形?",
        choices: ["複数形", "単数形", "女性形"],
        answer: 0,
        explain: "-o は複数で -i に変わるため、gelato の複数形は gelati になる。数詞のあとに単数形を置いてしまうのは日本語話者にありがちなミスなので、数字とセットで複数形を覚えたい。"
      },
      {
        type: "fill",
        q: "___ chiave(その鍵)",
        choices: ["la", "il", "le"],
        answer: 0,
        explain: "chiave は -e で終わる女性名詞なので、冠詞は la を使う。-e 終わりの名詞は男女どちらもあり得るので、辞書か周りの単語で性を確認する習慣が役に立つ。"
      },
      {
        type: "fill",
        q: "due ___(ピザ2枚)",
        choices: ["pizze", "pizza", "pizzi"],
        answer: 0,
        explain: "女性名詞 -a の複数形は -e になるので、pizza の複数は pizze。男性名詞の -i と混同しやすいポイントなので、性別ごとに複数の作り方を分けて覚えておこう。"
      },
      {
        type: "order",
        q: "「2つのジェラートをください」を組み立てよう",
        tokens: ["Due", "gelati,", "per", "favore"],
        answer: "Due gelati, per favore",
        explain: "数詞のあとは名詞を複数形にするのがイタリア語のルール。favore(お願い)を添えるだけで注文がぐっと丁寧に聞こえるので、セットで覚えておくと便利。"
      }
    ]
  },
  {
    id: "articoli",
    order: 3,
    title: "冠詞 — il/lo/la/un/unoの使い分け",
    icon: "🗂️",
    intro: [
      "イタリア語で最初の壁になりやすいのが冠詞。名詞の性・数・最初の文字によって il/lo/la/l'/i/gli/le と七変化する。面倒に見えるが、逆に言えば冠詞さえ聞き取れれば名詞の性と数がすぐ分かる、という便利な仕組みでもある。教会の入口で「la basilica」と耳にした瞬間、それが女性名詞だと自動的に分かるということだ。",
      "不定冠詞(un/uno/una/un')も同じ理屈で決まる。バールで「Un caffè」と言えるようになれば、応用で「Una birra」にも自然に切り替えられる。最初は表を横目に見ながらでいい。声に出した回数だけ、指が勝手に正しい冠詞を選ぶようになる。"
    ],
    points: [
      {
        rule: "定冠詞は男性 il/lo/l'、女性 la/l' と、名詞の最初の文字で決まる",
        examples: [
          { x: "il museo", ja: "美術館", kana: "イル ムゼーオ" },
          { x: "lo zaino", ja: "リュック", kana: "ロ ザイーノ" },
          { x: "l'aeroporto", ja: "空港", kana: "ラエロポルト" }
        ]
      },
      {
        rule: "s+子音、z、gn などで始まる男性名詞は lo になる",
        examples: [
          { x: "lo scontrino", ja: "レシート", kana: "ロ スコントリーノ" },
          { x: "lo studente", ja: "学生(男性)", kana: "ロ ストゥデンテ" }
        ]
      },
      {
        rule: "母音で始まる名詞は男女ともエリジオン(短縮)して l' になる",
        examples: [
          { x: "l'acqua", ja: "水", kana: "ラックア" },
          { x: "l'entrata", ja: "入口", kana: "レントラータ" }
        ]
      },
      {
        rule: "不定冠詞は un(男)/uno(s+子音等の男)/una(女)/un'(母音始まりの女)",
        examples: [
          { x: "un caffè", ja: "コーヒー1杯", kana: "ウン カッフェ" },
          { x: "uno scontrino", ja: "レシート1枚", kana: "ウノ スコントリーノ" },
          { x: "una camera", ja: "部屋1室", kana: "ウナ カーメラ" },
          { x: "un'amica", ja: "友人1人(女性)", kana: "ウナミーカ" }
        ]
      }
    ],
    drills: [
      {
        type: "choice",
        q: "「acqua(水)」につく定冠詞は?",
        choices: ["l'", "la", "il"],
        answer: 0,
        explain: "母音 a で始まる名詞は男女ともエリジオンして l' になる。母音がぶつかると音がつながりにくいので、イタリア語は短縮して発音を滑らかにしていると考えると納得しやすい。"
      },
      {
        type: "choice",
        q: "「zaino(リュック)」につく定冠詞は?",
        choices: ["lo", "il", "la"],
        answer: 0,
        explain: "z で始まる男性名詞は lo を使う。il ではないので注意が必要で、s+子音・z・gn 始まりの男性名詞はまとめて lo グループと覚えてしまうのが早い。"
      },
      {
        type: "fill",
        q: "___ camera doppia, per favore.(ダブルルームを1室)",
        choices: ["Una", "Un", "Uno"],
        answer: 0,
        explain: "camera は -a で終わる女性名詞なので、不定冠詞は una。ホテルのチェックインで最初に口にする言葉なので、una camera の形で丸ごと覚えておくと安心できる。"
      },
      {
        type: "fill",
        q: "Vorrei ___ biglietto.(切符を1枚欲しいのですが)",
        choices: ["un", "uno", "una"],
        answer: 0,
        explain: "biglietto は子音 b で始まる男性名詞なので un を使う。lo/uno のグループに入る子音の組み合わせ(s+子音・z・gn・ps など)を覚えておけば、それ以外は基本的に un でよい。"
      },
      {
        type: "order",
        q: "「入口はどこですか?」を組み立てよう",
        tokens: ["Dov'è", "l'entrata?"],
        answer: "Dov'è l'entrata?",
        explain: "母音で始まる entrata は l' になり、dov'è(どこですか)と組み合わせて場所を尋ねる。バチカン美術館のような広い施設では特に出番の多い一文になる。"
      }
    ]
  },
  {
    id: "essere",
    order: 4,
    title: "essere(〜である)— 自己紹介の要",
    icon: "🧍",
    intro: [
      "自己紹介の第一歩は essere(〜である)。「私は日本人です」「これは初めての旅行です」——旅先での自己紹介はほぼこの一語から始まる。不規則変化だが、たった6つの形を覚えれば一生使える。新婚旅行だと伝えたい時にも、essere を使った一言が驚くほど場を和ませてくれる。",
      "空港の入国審査、ホテルのチェックイン、レストランでの一言、そのすべてに essere が顔を出す。語呂よりも声に出した回数がものを言う動詞なので、まずは全人称を並べて口に出してみよう。歌うように6つの形を繰り返すだけで、次第に主語を意識せずに正しい形が出てくるようになる。"
    ],
    points: [
      {
        rule: "essere は不規則動詞。主語ごとに形が大きく変わるので丸ごと覚える",
        examples: [
          { x: "io sono", ja: "私は〜です", kana: "イオ ソーノ" },
          { x: "tu sei", ja: "君は〜です", kana: "トゥ セイ" },
          { x: "lui/lei è", ja: "彼/彼女は〜です", kana: "ルイ/レイ エ" },
          { x: "noi siamo", ja: "私たちは〜です", kana: "ノイ シアーモ" },
          { x: "voi siete", ja: "あなたたちは〜です", kana: "ヴォイ シエーテ" },
          { x: "loro sono", ja: "彼らは〜です", kana: "ローロ ソーノ" }
        ]
      },
      {
        rule: "主語代名詞は省略できる。動詞の形だけで誰のことか伝わる",
        examples: [
          { x: "Sono giapponese.", ja: "私は日本人です", kana: "ソーノ ジャッポネーゼ" },
          { x: "Siamo in luna di miele.", ja: "私たちは新婚旅行中です", kana: "シアーモ イン ルーナ ディ ミエーレ" }
        ]
      },
      {
        rule: "疑問文は語順を変えず、文末のイントネーションを上げるだけ",
        examples: [
          { x: "È libero questo tavolo?", ja: "この席は空いていますか?", kana: "エ リーベロ クエスト ターヴォロ" },
          { x: "Sei stanco?", ja: "疲れた?(君に)", kana: "セイ スターンコ" }
        ]
      }
    ],
    drills: [
      {
        type: "choice",
        q: "「私たちは新婚旅行中です」の動詞は?",
        choices: ["Siamo", "Sono", "Siete"],
        answer: 0,
        explain: "noi(私たち)に対応する essere の形は siamo。二人での旅であることを伝えるだけで、レストランの店員が特別な一皿を出してくれることもある一言だ。"
      },
      {
        type: "choice",
        q: "「彼女は」に対応する essere の形は?",
        choices: ["è", "sei", "sono"],
        answer: 0,
        explain: "lui/lei の三人称単数はアクセント付きの è。日本語には主語による動詞変化がないため、最初は主語と動詞をセットで声に出す練習が効果的。"
      },
      {
        type: "fill",
        q: "Io ___ giapponese.(私は日本人です)",
        choices: ["sono", "sei", "è"],
        answer: 0,
        explain: "io(私)に対応する essere の活用は sono。主語を省略しても sono だけで「私は」の意味が含まれているのがイタリア語らしいところ。"
      },
      {
        type: "fill",
        q: "___ libero questo tavolo?(この席は空いていますか)",
        choices: ["È", "Sono", "Sei"],
        answer: 0,
        explain: "questo tavolo(この席)は三人称単数扱いなので è を使う。人だけでなく物や場所についても、essere は同じ活用パターンで語れる。"
      },
      {
        type: "order",
        q: "「私はサクラです」を組み立てよう",
        tokens: ["Sono", "Sakura."],
        answer: "Sono Sakura.",
        explain: "主語の io は省略し、sono + 名前だけで自己紹介が完成する。ホテルの受付や現地ツアーの集合場所で、名前を名乗る時にすぐ使える形。"
      },
      {
        type: "order",
        q: "「私たちは日本人です」を組み立てよう",
        tokens: ["Siamo", "giapponesi."],
        answer: "Siamo giapponesi.",
        explain: "複数主語 noi には siamo を使い、形容詞 giapponese も複数形 giapponesi にする。essere の後ろに来る形容詞は主語に合わせて姿を変えることを、ここで一緒に覚えておこう。"
      }
    ]
  },
  {
    id: "avere",
    order: 5,
    title: "avere(持つ)— 空腹も予約もこの一語",
    icon: "🎒",
    intro: [
      "「予約があります」「お腹が空いています」——avere(持つ)は所有だけでなく、空腹・喉の渇き・年齢まで表す万能動詞。essere と形が似ている部分もあるので、セットで声に出して覚えると定着が早い。日本語では「〜がある」「お腹がすいた」と別々の言い方でも、イタリア語ではどちらも avere 一語でまかなえる。",
      "レストランで「Ho una prenotazione」と言えれば、ウェイターの態度が変わる瞬間に立ち会える。旅先で一番出番の多い動詞と言ってもいい。荷物のトラブル、体調の変化、予約の確認——困った時にまず出てくるのは avere の活用だ。"
    ],
    points: [
      {
        rule: "avere も不規則動詞。h で始まる形が多いが、h は発音しない黙字",
        examples: [
          { x: "io ho", ja: "私は持っている", kana: "イオ オ" },
          { x: "tu hai", ja: "君は持っている", kana: "トゥ アイ" },
          { x: "lui/lei ha", ja: "彼/彼女は持っている", kana: "ルイ/レイ ア" },
          { x: "noi abbiamo", ja: "私たちは持っている", kana: "ノイ アッビアーモ" },
          { x: "voi avete", ja: "あなたたちは持っている", kana: "ヴォイ アヴェーテ" },
          { x: "loro hanno", ja: "彼らは持っている", kana: "ローロ アンノ" }
        ]
      },
      {
        rule: "avere は「〜がある/いる」だけでなく、空腹・喉の渇き・年齢にも使う",
        examples: [
          { x: "Ho fame.", ja: "お腹が空いています", kana: "オ ファーメ" },
          { x: "Ho sete.", ja: "喉が渇いています", kana: "オ セーテ" },
          { x: "Ho trent'anni.", ja: "私は30歳です", kana: "オ トレンタンニ" }
        ]
      },
      {
        rule: "予約や持ち物を伝えるときの定番表現もavereで作る",
        examples: [
          { x: "Ho una prenotazione.", ja: "予約をしています", kana: "オ ウナ プレノタツィオーネ" },
          { x: "Non abbiamo bagagli.", ja: "荷物はありません", kana: "ノン アッビアーモ バガーリ" }
        ]
      }
    ],
    drills: [
      {
        type: "choice",
        q: "「私たちは予約をしています」の動詞は?",
        choices: ["Abbiamo", "Ho", "Hanno"],
        answer: 0,
        explain: "noi(私たち)に対応する avere の活用は abbiamo。二人分の予約を伝える時は必ずこの形になるので、ホテルやレストラン到着時のお決まりフレーズとして覚えておこう。"
      },
      {
        type: "choice",
        q: "「お腹が空いた」は?",
        choices: ["Ho fame.", "Sono fame.", "Ho sete."],
        answer: 0,
        explain: "空腹は avere を使って ho fame と表す。essere の sono は使わない。日本語の「お腹が『すいている』状態です」という発想につられて essere を選びがちなので要注意。"
      },
      {
        type: "fill",
        q: "Io ___ trent'anni.(私は30歳です)",
        choices: ["ho", "sono", "hai"],
        answer: 0,
        explain: "年齢は avere で表すので ho を使う。essere の sono は年齢には使わない。英語の be動詞につられて essere を選んでしまう典型的な間違いなので、ここで型として覚えてしまいたい。"
      },
      {
        type: "fill",
        q: "___ una prenotazione a nome Sato.(サトウの名前で予約があります)",
        choices: ["Ho", "Sono", "È"],
        answer: 0,
        explain: "予約を伝えるには ho una prenotazione が定番の言い方。a nome(〜の名前で)を後ろに続けるだけで、レストランでもホテルでもそのまま使い回せる。"
      },
      {
        type: "order",
        q: "「喉が渇きました」を組み立てよう",
        tokens: ["Ho", "sete."],
        answer: "Ho sete.",
        explain: "sete(喉の渇き)は avere と組み合わせて体感を伝える名詞。fame(空腹)と対で覚えておくと、屋外観光の途中で助けを求めやすくなる。"
      },
      {
        type: "order",
        q: "「私たちは荷物がありません」を組み立てよう",
        tokens: ["Non", "abbiamo", "bagagli."],
        answer: "Non abbiamo bagagli.",
        explain: "否定は non を動詞の直前に置くだけ。abbiamo は noi に対応する活用で、空港のロストバゲージ窓口などでそのまま使える一文になる。"
      }
    ]
  },
  {
    id: "verbi-regolari",
    order: 6,
    title: "規則動詞の現在形 — -are/-ere/-ire",
    icon: "⚙️",
    intro: [
      "essere と avere を覚えたら、次は規則動詞。-are/-ere/-ire の3グループに分かれるが、語尾の変化パターンは驚くほど規則的で、ひとつ覚えれば同じグループの動詞は全部同じ理屈で活用できる。暗記量が多く感じられるかもしれないが、実際に覚えるのは6つの語尾セットが3種類、それだけだ。",
      "「Vorrei ordinare(注文したい)」の ordinare のように、旅行会話で使う動詞の大半は -are 動詞。ここを制覇すれば、注文も予約も自分の言葉で組み立てられるようになる。教科書の例文ではなく、その日その場で言いたい一言を作る練習だと思って取り組んでみよう。"
    ],
    points: [
      {
        rule: "-are動詞(parlare話す)の現在形は語尾を -o/-i/-a/-iamo/-ate/-ano に変える",
        examples: [
          { x: "io parlo", ja: "私は話す", kana: "イオ パルロ" },
          { x: "tu parli", ja: "君は話す", kana: "トゥ パルリ" },
          { x: "lui/lei parla", ja: "彼/彼女は話す", kana: "ルイ/レイ パルラ" },
          { x: "noi parliamo", ja: "私たちは話す", kana: "ノイ パルリアーモ" },
          { x: "voi parlate", ja: "あなたたちは話す", kana: "ヴォイ パルラーテ" },
          { x: "loro parlano", ja: "彼らは話す", kana: "ローロ パルラーノ" }
        ]
      },
      {
        rule: "-ere動詞(prendere取る/注文する)は -o/-i/-e/-iamo/-ete/-ono に変える",
        examples: [
          { x: "io prendo", ja: "私は(飲食物を)頼む", kana: "イオ プレンド" },
          { x: "tu prendi", ja: "君は頼む", kana: "トゥ プレンディ" },
          { x: "lui/lei prende", ja: "彼/彼女は頼む", kana: "ルイ/レイ プレンデ" },
          { x: "noi prendiamo", ja: "私たちは頼む", kana: "ノイ プレンディアーモ" },
          { x: "voi prendete", ja: "あなたたちは頼む", kana: "ヴォイ プレンデーテ" },
          { x: "loro prendono", ja: "彼らは頼む", kana: "ローロ プレンドノ" }
        ]
      },
      {
        rule: "-ire動詞(dormire眠る)は -o/-i/-e/-iamo/-ite/-ono に変える",
        examples: [
          { x: "io dormo", ja: "私は眠る", kana: "イオ ドルモ" },
          { x: "tu dormi", ja: "君は眠る", kana: "トゥ ドルミ" },
          { x: "lui/lei dorme", ja: "彼/彼女は眠る", kana: "ルイ/レイ ドルメ" },
          { x: "noi dormiamo", ja: "私たちは眠る", kana: "ノイ ドルミアーモ" },
          { x: "voi dormite", ja: "あなたたちは眠る", kana: "ヴォイ ドルミーテ" },
          { x: "loro dormono", ja: "彼らは眠る", kana: "ローロ ドルモノ" }
        ]
      },
      {
        rule: "capire型の-ire動詞はisc をio/tu/lui/loroに挟む(noi/voiは挟まない)",
        examples: [
          { x: "io capisco", ja: "私は理解する", kana: "イオ カピスコ" },
          { x: "tu capisci", ja: "君は理解する", kana: "トゥ カピッシ" },
          { x: "lui/lei capisce", ja: "彼/彼女は理解する", kana: "ルイ/レイ カピッシェ" },
          { x: "noi capiamo", ja: "私たちは理解する", kana: "ノイ カピアーモ" },
          { x: "voi capite", ja: "あなたたちは理解する", kana: "ヴォイ カピーテ" },
          { x: "loro capiscono", ja: "彼らは理解する", kana: "ローロ カピスコノ" }
        ]
      }
    ],
    drills: [
      {
        type: "choice",
        q: "「Cosa prendi?(何を頼む?)」に自分のことで答えるなら?",
        choices: ["Prendo un caffè.", "Prendi un caffè.", "Prende un caffè."],
        answer: 0,
        explain: "自分のことを言うので io に対応する prendo を使う。質問文の tu(君)の形につられてそのまま答えてしまうミスが多いので、主語の切り替えを意識しよう。"
      },
      {
        type: "choice",
        q: "-are動詞のnoi(私たち)の語尾は?",
        choices: ["-iamo", "-ate", "-ano"],
        answer: 0,
        explain: "noi の語尾は -are/-ere/-ire のどのグループでも共通して -iamo になる。3グループの活用表の中で唯一「暗記しなくていい」列なので、まずここから覚えると気が楽になる。"
      },
      {
        type: "fill",
        q: "Noi ___ l'italiano un po'.(私たちは少しイタリア語を話します)",
        choices: ["parliamo", "parlate", "parlano"],
        answer: 0,
        explain: "noi(私たち)に対応する parlare の活用は parliamo。二人での旅なら「私たちは」の形を使う場面が多いので、真っ先に定着させておきたい形。"
      },
      {
        type: "fill",
        q: "Non ___ bene l'italiano.(イタリア語がよく分かりません)",
        choices: ["capisco", "capo", "capa"],
        answer: 0,
        explain: "capire は isc型なので、io の形は capisco になる。困った時に使う一言なので、正しい形をそのまま丸暗記しておくと安心。"
      },
      {
        type: "order",
        q: "「コーヒーを1つ頼みます」を組み立てよう",
        tokens: ["Prendo", "un", "caffè."],
        answer: "Prendo un caffè.",
        explain: "prendere は飲食物を注文する時にも使う動詞。io の形は prendo で、バールのカウンターでそのまま使える実戦的な一文になる。"
      },
      {
        type: "order",
        q: "「私たちはよく眠ります」を組み立てよう",
        tokens: ["Dormiamo", "bene."],
        answer: "Dormiamo bene.",
        explain: "-ire動詞dormireのnoiの形はdormiamo。beneは「よく」を表す副詞で、ホテルの朝食で交わす何気ない世間話にも使える。"
      }
    ]
  },
  {
    id: "aggettivi",
    order: 7,
    title: "形容詞の一致 — 美しい景色を言葉にする",
    icon: "🎨",
    intro: [
      "「美しい景色」と言うとき、bello(美しい)は名詞の性と数に合わせて姿を変える。フォトジェニックな旅先ほど形容詞を使いたくなるからこそ、この一致のルールは早めに体に入れておきたい。名詞の性数を見てから形容詞を選ぶ、というたった一つの手順に慣れるだけでいい。",
      "サントリーニの夕日を前に「È bellissimo!」と叫べるかどうかは、たった一つのルールにかかっている。名詞の性・数を見て、形容詞の語尾を合わせるだけだ。感動を言葉にできる瞬間は、旅の記憶をより鮮やかにしてくれる。"
    ],
    points: [
      {
        rule: "形容詞は名詞の性・数に合わせて語尾を -o/-a/-i/-e に変える",
        examples: [
          { x: "un tramonto bello", ja: "美しい夕日(男性単数)", kana: "ウン トラモント ベッロ" },
          { x: "una vista bella", ja: "美しい景色(女性単数)", kana: "ウナ ヴィスタ ベッラ" },
          { x: "due chiese belle", ja: "美しい教会2つ(女性複数)", kana: "ドゥエ キエーゼ ベッレ" }
        ]
      },
      {
        rule: "-e で終わる形容詞は男女同形。複数はどちらも-iに変わる",
        examples: [
          { x: "un posto grande", ja: "大きな場所(男性)", kana: "ウン ポスト グランデ" },
          { x: "una piazza grande", ja: "大きな広場(女性)", kana: "ウナ ピアッツァ グランデ" },
          { x: "due piazze grandi", ja: "大きな広場2つ", kana: "ドゥエ ピアッツェ グランディ" }
        ]
      },
      {
        rule: "色や国籍を表す形容詞も同じ一致の規則に従う",
        examples: [
          { x: "il cielo azzurro", ja: "青い空", kana: "イル チエロ アッズッロ" },
          { x: "la cupola bianca", ja: "白いドーム", kana: "ラ クーポラ ビアンカ" },
          { x: "le case bianche", ja: "白い家々", kana: "レ カーゼ ビアンケ" }
        ]
      },
      {
        rule: "「とても」を強調するには語尾に-issimoをつける最上級の型がある",
        examples: [
          { x: "bellissimo", ja: "最高に美しい(男性)", kana: "ベッリッシモ" },
          { x: "buonissimo", ja: "最高に美味しい", kana: "ブオニッシモ" }
        ]
      }
    ],
    drills: [
      {
        type: "choice",
        q: "「美しい景色(vista)」を女性形で言うと?",
        choices: ["una vista bella", "un vista bello", "una vista bello"],
        answer: 0,
        explain: "vistaは女性名詞なので、冠詞unaと形容詞bellaを両方女性形にそろえる。冠詞・名詞・形容詞は三点セットで性数をそろえると覚えておくと迷いにくい。"
      },
      {
        type: "choice",
        q: "「白いドーム(cupola)」の形容詞は?",
        choices: ["bianca", "bianco", "bianchi"],
        answer: 0,
        explain: "cupolaは女性単数名詞なので、biancoではなくbiancaにする。サントリーニの白い家並みを語るときにも、この一致は何度も登場する。"
      },
      {
        type: "fill",
        q: "Il cielo è molto ___.(空がとても青い)",
        choices: ["azzurro", "azzurra", "azzurri"],
        answer: 0,
        explain: "cielo(空)は男性単数名詞なので、形容詞はazzurroにする。moltoは副詞なのでここでは形を変えず、後ろの形容詞だけが名詞に一致する点に注意。"
      },
      {
        type: "fill",
        q: "Le chiese sono ___.(教会は美しい)",
        choices: ["belle", "bello", "bella"],
        answer: 0,
        explain: "chieseは女性複数名詞なので、形容詞もbelleにそろえる。essereの後ろに形容詞を置く文でも、一致のルールは変わらず適用される。"
      },
      {
        type: "order",
        q: "「最高に美しい!」を組み立てよう",
        tokens: ["È", "bellissimo!"],
        answer: "È bellissimo!",
        explain: "語尾に-issimoをつけると「最高に〜」という強い最上級のニュアンスになる。景色や料理への感動をひとことで表せる、旅先での万能フレーズだ。"
      }
    ]
  },
  {
    id: "domande",
    order: 8,
    title: "疑問文 — 語順そのまま、声だけで質問",
    icon: "❓",
    intro: [
      "イタリア語の疑問文は実は簡単。語順を変えず、文末のイントネーションを上げるだけで質問になる。英語のdoやフランス語のest-ce queのような特別な仕掛けは要らないので、覚えた平叙文をそのまま質問に転用できる。",
      "あとは疑問詞(dove/quando/quanto/come/perché)を先頭に置くパターンを覚えれば、道を尋ねる、値段を聞く、時刻を確認するといった旅の必須会話が一通りこなせるようになる。コロッセオの入口で「Quanto costa?」と聞けるだけで、旅の自由度は大きく変わる。"
    ],
    points: [
      {
        rule: "平叙文と語順は同じ。文末の音を上げるだけで疑問文になる",
        examples: [
          { x: "È aperto?", ja: "開いていますか?", kana: "エ アペルト" },
          { x: "Hai fame?", ja: "お腹空いた?", kana: "アイ ファーメ" }
        ]
      },
      {
        rule: "dove(どこ)/quando(いつ)/come(どのように)/perché(なぜ)は文頭に置く",
        examples: [
          { x: "Dov'è la stazione?", ja: "駅はどこですか?", kana: "ドヴェ ラ スタツィオーネ" },
          { x: "Quando parte il treno?", ja: "電車はいつ出発しますか?", kana: "クアンド パルテ イル トレーノ" },
          { x: "Come si dice in italiano?", ja: "イタリア語で何と言いますか?", kana: "コーメ スィ ディーチェ イン イタリアーノ" }
        ]
      },
      {
        rule: "quanto(いくつ/いくら)は名詞の性数に合わせてquanto/quanta/quanti/quanteに変化する",
        examples: [
          { x: "Quanto costa?", ja: "おいくらですか?", kana: "クアント コスタ" },
          { x: "Quanti minuti ci vogliono?", ja: "何分かかりますか?", kana: "クアンティ ミヌーティ チ ヴォリオーノ" }
        ]
      },
      {
        rule: "chi(誰)/che cosa(何)は人・物を尋ねる基本の疑問詞",
        examples: [
          { x: "Che cos'è questo?", ja: "これは何ですか?", kana: "ケ コゼ クエスト" },
          { x: "Chi è?", ja: "どなたですか?", kana: "キ エ" }
        ]
      }
    ],
    drills: [
      {
        type: "choice",
        q: "「駅はどこですか?」は?",
        choices: ["Dov'è la stazione?", "Quando la stazione?", "Che la stazione?"],
        answer: 0,
        explain: "場所を尋ねる疑問詞はdove(どこ)。dov'èはdove+èの短縮形で、駅やお手洗いなど、旅先で最も出番の多い疑問文の型になる。"
      },
      {
        type: "choice",
        q: "値段を尋ねる定番表現は?",
        choices: ["Quanto costa?", "Quando costa?", "Come costa?"],
        answer: 0,
        explain: "quantoは量や値段を尋ねる疑問詞で、costare(値段がする)とセットで使う。市場やお土産店で真っ先に口にする一言になる。"
      },
      {
        type: "fill",
        q: "___ parte il treno per Atene?(アテネ行きの電車はいつ出発しますか)",
        choices: ["Quando", "Dove", "Chi"],
        answer: 0,
        explain: "時刻を尋ねる疑問文なので、quando(いつ)を使う。サントリーニへの乗り継ぎなど、時間に関わる質問はほぼこの形でまかなえる。"
      },
      {
        type: "fill",
        q: "___ minuti ci vogliono a piedi?(徒歩で何分かかりますか)",
        choices: ["Quanti", "Quanto", "Quanta"],
        answer: 0,
        explain: "minuti(分)は男性複数名詞なので、quantoをquantiに一致させる。quantoも疑問詞でありながら形容詞のように性数変化することを、ここで覚えておこう。"
      },
      {
        type: "order",
        q: "「これは何ですか?」を組み立てよう",
        tokens: ["Che", "cos'è", "questo?"],
        answer: "Che cos'è questo?",
        explain: "che cosa(何)はche cos'èと母音の前で短縮されることが多い。見慣れないメニューの品名を尋ねる時にすぐ使える一文だ。"
      },
      {
        type: "order",
        q: "「開いていますか?」を組み立てよう",
        tokens: ["È", "aperto?"],
        answer: "È aperto?",
        explain: "語順を変えず、イントネーションだけで疑問文になるのがイタリア語の特徴。教会やお店の開閉を確認する時に、まず口に出したい一言。"
      }
    ]
  },
  {
    id: "negazione",
    order: 9,
    title: "否定 non — たった一語で「ない」と言う",
    icon: "🚫",
    intro: [
      "イタリア語の否定はシンプルで、動詞の直前にnonを置くだけ。フランス語のne...pasのような二重の枠がないぶん、身につけるハードルはぐっと低い。ひとつ動詞の活用が言えれば、それを否定するのにもう新しいことを覚える必要はない。",
      "「Non capisco(分かりません)」「Non c'è(ありません)」——旅先のトラブルシューティングは、たいていnonの一言から始まる。困った時にこそ活躍するユニットなので、肯定文とセットで否定文もすぐ言えるように練習しておこう。"
    ],
    points: [
      {
        rule: "nonは活用した動詞の直前に置くだけで、文全体を否定できる",
        examples: [
          { x: "Non capisco.", ja: "分かりません", kana: "ノン カピスコ" },
          { x: "Non parlo italiano.", ja: "イタリア語は話せません", kana: "ノン パルロ イタリアーノ" }
        ]
      },
      {
        rule: "c'è(〜がある)/ci sono(〜がある・複数)の否定もnonを前に置くだけ",
        examples: [
          { x: "Non c'è problema.", ja: "問題ありません", kana: "ノン チェ プロブレーマ" },
          { x: "Non ci sono posti.", ja: "席がありません", kana: "ノン チ ソーノ ポスティ" }
        ]
      },
      {
        rule: "niente(何も〜ない)/mai(決して〜ない)はnonとセットで使う二重否定",
        examples: [
          { x: "Non ho niente da dichiarare.", ja: "申告するものは何もありません", kana: "ノン オ ニエンテ ダ ディキアラーレ" },
          { x: "Non sono mai stanco.", ja: "全然疲れていません", kana: "ノン ソーノ マイ スターンコ" }
        ]
      }
    ],
    drills: [
      {
        type: "choice",
        q: "「分かりません」は?",
        choices: ["Non capisco.", "No capisco.", "Capisco non."],
        answer: 0,
        explain: "否定は動詞の直前にnonを置く語順が正しい。noは単独の返事にしか使わないので、動詞を否定する時のnonと混同しないようにしたい。"
      },
      {
        type: "choice",
        q: "「席がありません」は?",
        choices: ["Non ci sono posti.", "Ci non sono posti.", "Sono non ci posti."],
        answer: 0,
        explain: "ci sonoの否定は、文頭にnonを置くだけで作れる。ci sonoをひとつの塊として覚えておけば、否定文にする時も語順に迷わない。"
      },
      {
        type: "fill",
        q: "___ parlo molto bene l'italiano.(イタリア語はあまり上手に話せません)",
        choices: ["Non", "No", "Niente"],
        answer: 0,
        explain: "動詞を否定するのはnon。noは質問への単独の返答にのみ使う。会話の出だしで自分のレベルを控えめに伝える、便利なひとことになる。"
      },
      {
        type: "fill",
        q: "Non ho ___ da dichiarare.(申告するものは何もありません)",
        choices: ["niente", "tutto", "molto"],
        answer: 0,
        explain: "「何も〜ない」はnon...nienteの組み合わせで表す二重否定。日本語の感覚では二重否定は不自然に感じるが、イタリア語ではむしろ標準的な形。"
      },
      {
        type: "order",
        q: "「問題ありません」を組み立てよう",
        tokens: ["Non", "c'è", "problema."],
        answer: "Non c'è problema.",
        explain: "c'è(〜がある)の前にnonを置くだけで、そのまま否定文になる。ちょっとしたハプニングを笑って流す時にも重宝する一言だ。"
      }
    ]
  },
  {
    id: "preposizioni",
    order: 10,
    title: "前置詞と冠詞前置詞 — al/nel/dalの世界",
    icon: "🧭",
    intro: [
      "「駅で」「ホテルに」「バールから」——場所や時間を語るには前置詞が欠かせない。イタリア語の前置詞a/in/di/da/suは定冠詞と融合して一語になる、冠詞前置詞という独特の仕組みを持つ。最初は複雑に見えても、実は足し算のルールが決まっているだけの規則的な変化だ。",
      "これはフランス語のau/duと同じ発想で、覚えてしまえば単純な組み合わせ。最初は表を見ながらでいいので、al bar、alla stazione、nel museo…とよく使う組み合わせから体に染み込ませよう。ローマからサントリーニへと移動が続く旅程だからこそ、場所を語る力がそのまま安心感につながる。"
    ],
    points: [
      {
        rule: "a(〜に/で)+定冠詞はal/allo/alla/ai/agli/alleに融合する",
        examples: [
          { x: "al bar", ja: "バールで", kana: "アル バール" },
          { x: "alla stazione", ja: "駅で", kana: "アッラ スタツィオーネ" },
          { x: "all'aeroporto", ja: "空港で", kana: "アッラエロポルト" }
        ]
      },
      {
        rule: "in(〜の中に)+定冠詞はnel/nello/nella/nei/negli/nelleになる",
        examples: [
          { x: "nel museo", ja: "美術館の中で", kana: "ネル ムゼーオ" },
          { x: "nella piazza", ja: "広場で", kana: "ネッラ ピアッツァ" }
        ]
      },
      {
        rule: "di(〜の)+定冠詞はdel/dello/della/dei/degli/delleになる",
        examples: [
          { x: "il centro della città", ja: "街の中心", kana: "イル チェントロ デッラ チッタ" },
          { x: "un po' del vino", ja: "ワインを少し", kana: "ウン ポ デル ヴィーノ" }
        ]
      },
      {
        rule: "da(〜から/〜のもとへ)は起点や「〜のお店へ」を表す",
        examples: [
          { x: "dalla stazione", ja: "駅から", kana: "ダッラ スタツィオーネ" },
          { x: "Vado dal fruttivendolo.", ja: "八百屋さんへ行きます", kana: "ヴァード ダル フルッティヴェンドロ" }
        ]
      }
    ],
    drills: [
      {
        type: "choice",
        q: "「バールで」は?",
        choices: ["al bar", "il bar", "a bar"],
        answer: 0,
        explain: "a+ilが融合してalになる。barは母音を伴わないためそのまま冠詞と融合し、これが冠詞前置詞のもっとも基本的な形になる。"
      },
      {
        type: "choice",
        q: "「駅から」は?",
        choices: ["dalla stazione", "della stazione", "alla stazione"],
        answer: 0,
        explain: "起点を表すのはda。da+laが融合してdallaになる。同じ「〜の」でも起点を表すdaと所属を表すdiは意味が違うので、混同しないようにしたい。"
      },
      {
        type: "fill",
        q: "Il museo è vicino ___ Colosseo.(美術館はコロッセオの近くです)",
        choices: ["al", "il", "a"],
        answer: 0,
        explain: "a+ilが融合してalになる。Colosseoは男性名詞。vicino a(〜の近くに)はセットで覚えておくと、道案内でそのまま使える表現になる。"
      },
      {
        type: "fill",
        q: "Andiamo ___ Vaticano domani.(明日バチカンに行きます)",
        choices: ["in", "al", "nel"],
        answer: 0,
        explain: "国や独立した地域を表す固有名にはinを使う。Vaticanoは国家扱いのためin Vaticanoとなり、都市を表すRomaにはinをそのまま使い、a Romaとは形が異なる。"
      },
      {
        type: "order",
        q: "「駅の近くのバールで」を組み立てよう",
        tokens: ["al", "bar", "vicino", "alla", "stazione"],
        answer: "al bar vicino alla stazione",
        explain: "al(a+il)とalla(a+la)は、それぞれbarとstazioneの性に合わせた冠詞前置詞。待ち合わせ場所を伝える時に、そのまま形を組み替えて使い回せる。"
      }
    ]
  },
  {
    id: "passato-prossimo",
    order: 11,
    title: "近過去 — 旅の思い出を語る",
    icon: "⏳",
    intro: [
      "「昨日コロッセオに行きました」「美味しいジェラートを食べました」——旅の思い出を語るなら過去形は避けて通れない。日常会話で一番よく使う過去形が近過去(passato prossimo)だ。文法用語は難しく聞こえるが、仕組みを知れば作文パズルのように組み立てられる。",
      "仕組みはavereかessereの現在形+過去分詞という組み立て式。essereを使う動詞は過去分詞が主語の性数に一致するという癖があるが、覚えてしまえばパーツを組み合わせる感覚で文が作れる。旅の後半、ローマからサントリーニへ話が広がるほど、この過去形の出番は増えていく。"
    ],
    points: [
      {
        rule: "多くの動詞はavere+過去分詞で作る(-are→-ato/-ere→-uto/-ire→-ito)",
        examples: [
          { x: "Ho mangiato un gelato.", ja: "ジェラートを食べました", kana: "オ マンジャート ウン ジェラート" },
          { x: "Abbiamo visitato il Colosseo.", ja: "コロッセオを見学しました", kana: "アッビアーモ ヴィズィタート イル コロッセオ" },
          { x: "Ho ricevuto il conto.", ja: "お会計をもらいました", kana: "オ リチェヴート イル コント" }
        ]
      },
      {
        rule: "移動・状態変化の動詞(andare/venire/partire/arrivareなど)はessere+過去分詞",
        examples: [
          { x: "Sono andato al Vaticano.", ja: "バチカンに行きました(男性)", kana: "ソーノ アンダート アル ヴァティカーノ" },
          { x: "Siamo arrivati a Roma.", ja: "ローマに着きました", kana: "シアーモ アッリヴァーティ ア ローマ" }
        ]
      },
      {
        rule: "essereを使う場合、過去分詞は主語の性数に一致して語尾が変わる",
        examples: [
          { x: "Sono andata al mercato.", ja: "市場に行きました(女性)", kana: "ソーノ アンダータ アル メルカート" },
          { x: "Siamo andati insieme.", ja: "一緒に行きました(複数)", kana: "シアーモ アンダーティ インスィエーメ" }
        ]
      },
      {
        rule: "essere自身とavere自身も不規則な過去分詞を持つ(stato/avuto)",
        examples: [
          { x: "È stato bellissimo!", ja: "最高でした!", kana: "エ スタート ベッリッシモ" },
          { x: "Abbiamo avuto fortuna.", ja: "運が良かったです", kana: "アッビアーモ アヴート フォルトゥーナ" }
        ]
      }
    ],
    drills: [
      {
        type: "choice",
        q: "「ジェラートを食べました」は?",
        choices: ["Ho mangiato un gelato.", "Sono mangiato un gelato.", "Ho mangiare un gelato."],
        answer: 0,
        explain: "mangiareは移動を表さない動詞なので、avere+過去分詞mangiatoを使う。近過去の助動詞は移動や状態変化かどうかで見分けると迷いにくい。"
      },
      {
        type: "choice",
        q: "女性が「バチカンに行きました」と言うなら?",
        choices: ["Sono andata al Vaticano.", "Sono andato al Vaticano.", "Ho andata al Vaticano."],
        answer: 0,
        explain: "andareはessereを取る動詞。女性主語では過去分詞がandataになる。essereを使う動詞では、話し手自身の性別が文の形に直接反映される。"
      },
      {
        type: "fill",
        q: "Abbiamo ___ il Colosseo ieri.(昨日コロッセオを見学しました)",
        choices: ["visitato", "visita", "visitare"],
        answer: 0,
        explain: "-are動詞の過去分詞は-atoになる。visitareの過去分詞はvisitatoで、原形の語尾-areを-atoに変えるだけの単純な規則。"
      },
      {
        type: "fill",
        q: "___ stato bellissimo!(最高でした)",
        choices: ["È", "Ha", "Sono"],
        answer: 0,
        explain: "感嘆文の主語は「それは」に近いニュアンスなので、è+過去分詞statoを使う。旅の締めくくりに感想を語る時、真っ先に口をついて出てくる形にしたい。"
      },
      {
        type: "order",
        q: "「私たちはローマに着きました」を組み立てよう",
        tokens: ["Siamo", "arrivati", "a", "Roma."],
        answer: "Siamo arrivati a Roma.",
        explain: "arrivareはessereを取る移動動詞。noiの主語なら過去分詞は複数形arrivatiになる。到着直後の第一声としてそのまま使える一文だ。"
      },
      {
        type: "order",
        q: "「運が良かったです」を組み立てよう",
        tokens: ["Abbiamo", "avuto", "fortuna."],
        answer: "Abbiamo avuto fortuna.",
        explain: "avereの過去分詞は不規則でavuto。avere自身を近過去にした形で、天気やハプニングに恵まれた時の感想としてよく使われる。"
      }
    ]
  },
  {
    id: "vorrei-potrei",
    order: 12,
    title: "Vorrei / Potrei — いちばん使える丁寧な一言",
    icon: "🙏",
    intro: [
      "旅で一番よく使う一言は、実は命令形ではなく条件法。vorrei(〜が欲しいのですが)とpotrei(〜できますか)を覚えれば、注文もお願いごとも一気に丁寧になる。動詞の活用を全部覚えなくても、この二つの形だけで驚くほど多くの場面を乗り切れる。",
      "サントリーニのタベルナでも、ローマのバールでも、「Vorrei」で文を始めるだけで店員の態度は柔らかくなる。12ユニットの締めくくりにふさわしい、いちばん実用的な一言だ。ここまで学んだ名詞・冠詞・動詞をこの型に乗せれば、旅先で言いたいことのほとんどが言葉になる。"
    ],
    points: [
      {
        rule: "vorrei(〜が欲しいのですが)はvolere(欲しい)の条件法。voglioより丁寧",
        examples: [
          { x: "Vorrei un caffè.", ja: "コーヒーを1つお願いします", kana: "ヴォッレイ ウン カッフェ" },
          { x: "Vorrei prenotare un tavolo.", ja: "テーブルを予約したいのですが", kana: "ヴォッレイ プレノターレ ウン ターヴォロ" }
        ]
      },
      {
        rule: "potrei(〜できますでしょうか)はpotere(できる)の条件法。お願い事の定番",
        examples: [
          { x: "Potrei avere il conto?", ja: "お会計をいただけますか?", kana: "ポトレイ アヴェーレ イル コント" },
          { x: "Potrebbe aiutarmi?", ja: "手伝っていただけますか?(相手への敬称形)", kana: "ポトレッベ アイウタルミ" }
        ]
      },
      {
        rule: "vorremmo/potremmoは「私たち」で丁寧にお願いするときの形",
        examples: [
          { x: "Vorremmo due camere.", ja: "部屋を2室お願いしたいのですが", kana: "ヴォレンモ ドゥエ カーメレ" },
          { x: "Potremmo avere il menu?", ja: "メニューをいただけますか?", kana: "ポトレンモ アヴェーレ イル メヌー" }
        ]
      },
      {
        rule: "vorrei/potreiの後ろには名詞も動詞の原形も置ける",
        examples: [
          { x: "Vorrei vedere il Pantheon.", ja: "パンテオンを見てみたいです", kana: "ヴォッレイ ヴェデーレ イル パンテオン" },
          { x: "Potrei pagare con carta?", ja: "カードで支払えますか?", kana: "ポトレイ パガーレ コン カルタ" }
        ]
      }
    ],
    drills: [
      {
        type: "choice",
        q: "「コーヒーを1つお願いします」は?",
        choices: ["Vorrei un caffè.", "Voglio un caffè.", "Ho un caffè."],
        answer: 0,
        explain: "vorreiはvoglioより柔らかく丁寧な依頼表現になる。旅先ではvoglio(欲しい)よりvorreiを基本形にしておくと、どんな場面でも失礼にならない。"
      },
      {
        type: "choice",
        q: "「お会計をいただけますか?」は?",
        choices: ["Potrei avere il conto?", "Ho il conto?", "Sono il conto?"],
        answer: 0,
        explain: "potreiは「〜してもらえますか」と丁寧に尋ねる条件法。il conto(お会計)をil menu(メニュー)などに入れ替えれば、そのまま応用が利く。"
      },
      {
        type: "fill",
        q: "___ prenotare un tavolo per due.(2名でテーブルを予約したいのですが)",
        choices: ["Vorrei", "Voglio", "Ho"],
        answer: 0,
        explain: "予約のお願いはvorrei+動詞の原形prenotareが定番の言い方。per due(2名で)を後ろに添えるだけで、電話でもその場でも使い回せる。"
      },
      {
        type: "fill",
        q: "___ pagare con carta?(カードで支払えますか)",
        choices: ["Potrei", "Vorrei", "Sono"],
        answer: 0,
        explain: "「〜できますか」と可否を尋ねる場合はpotreiを使う。現金しか使えない小さな店もあるので、確認の一言として覚えておくと安心。"
      },
      {
        type: "order",
        q: "「メニューをいただけますか?」を組み立てよう",
        tokens: ["Potremmo", "avere", "il", "menu?"],
        answer: "Potremmo avere il menu?",
        explain: "「私たち」で丁寧に頼むので、potere の条件法noi形potremmoを使う。二人での旅では、単数のpotreiより出番の多い形になる。"
      },
      {
        type: "order",
        q: "「部屋を2室お願いしたいのですが」を組み立てよう",
        tokens: ["Vorremmo", "due", "camere."],
        answer: "Vorremmo due camere.",
        explain: "複数人でのお願いはvolereの条件法noi形vorremmoを使う。学んできた数詞・名詞の複数形・条件法が、この一文に全部つながっている。"
      }
    ]
  }
];
