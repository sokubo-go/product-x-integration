// data/grammar-fr.js — Voyage フランス語 基礎文法コース(12ユニット)
window.GRAMMAR_DATA = [
  {
    id: "pronuncia",
    order: 1,
    title: "発音とリエゾン — 読まない文字と、つながる音",
    icon: "🔤",
    intro: [
      "Bonjour は言えても、そのあとに続くメニューや看板の文字を見て「読めない」と固まってしまう人は多い。フランス語はローマ字読みの直感がそのまま通じないぶん、逆に言えば「読まれない文字」と「音がつながるリエゾン」というルールさえ知れば、初見の単語でもかなり正確に発音できるようになる。",
      "この最初のユニットでは、パリの通りで毎日目にする語(vous、trois、un、restaurant)を使って、語末の子音が消える感覚とリエゾンの心地よさ、そして日本語にない鼻母音を身体に入れていく。ここを飛ばして先へ進むと、あとのユニットの例文がすべて「読めるけど発音できない」状態になってしまう。"
    ],
    points: [
      {
        rule: "語末の子音(s, t, d, x など)は原則として発音しない",
        examples: [
          { x: "Paris", ja: "パリ(地名)", kana: "パリ" },
          { x: "vous", ja: "あなた(たち)は", kana: "ヴ" },
          { x: "trois", ja: "3", kana: "トロワ" },
          { x: "restaurant", ja: "レストラン", kana: "レストラン" }
        ]
      },
      {
        rule: "ただし c, f, l, r で終わる語は例外的に発音することが多い(覚え歌 CaReFuL)",
        examples: [
          { x: "avec", ja: "〜と一緒に", kana: "アヴェック" },
          { x: "neuf", ja: "9", kana: "ヌフ" },
          { x: "hôtel", ja: "ホテル", kana: "オテル" },
          { x: "bonjour", ja: "こんにちは", kana: "ボンジュール" }
        ]
      },
      {
        rule: "リエゾン: 消えるはずの語末子音が、次の語が母音で始まると復活してつながる",
        examples: [
          { x: "vous avez", ja: "あなたは持っている", kana: "ヴ ザヴェ" },
          { x: "nous avons", ja: "私たちは持っている", kana: "ヌ ザヴォン" },
          { x: "un instant", ja: "ちょっとの間", kana: "アン ナンスタン" },
          { x: "trois heures", ja: "3時", kana: "トロワ ズール" }
        ]
      },
      {
        rule: "鼻母音: n/m の前の母音は、鼻に抜ける音になり n/m 自体は発音しない",
        examples: [
          { x: "un", ja: "1 / (男性の)不定冠詞", kana: "アン(鼻に抜ける)" },
          { x: "vin", ja: "ワイン", kana: "ヴァン(鼻に抜ける)" },
          { x: "bon", ja: "良い", kana: "ボン(鼻に抜ける)" },
          { x: "combien", ja: "いくつ、いくら", kana: "コンビヤン(鼻に抜ける)" }
        ]
      },
      {
        rule: "h は常に無音。母音として扱われるので、前の語とリエゾンやエリジオンが起こる",
        examples: [
          { x: "l'hôtel", ja: "そのホテル", kana: "ロテル" },
          { x: "les hôtels", ja: "それらのホテル", kana: "レ ゾテル" },
          { x: "l'homme", ja: "その男性", kana: "ロム" }
        ]
      }
    ],
    drills: [
      {
        type: "choice",
        q: "「restaurant」の読みはどれ?",
        choices: ["レストラント", "レストラン", "レスタウラント"],
        answer: 1,
        explain: "語末の t は発音しない。フランス語の語末子音は基本的に沈黙する。"
      },
      {
        type: "choice",
        q: "「vous avez」のように、消えるはずの子音が次の母音とつながって聞こえる現象を何という?",
        choices: ["エリジオン", "リエゾン", "アクサン"],
        answer: 1,
        explain: "リエゾン。vous の s が母音の avez とつながって「ヴ ザヴェ」になる。"
      },
      {
        type: "fill",
        q: "trois ___(3時)を正しく発音するとリエゾンで「トロワ ズール」となる。空欄は?",
        choices: ["heures", "heure", "heurs"],
        answer: 0,
        explain: "heures(複数)。trois の s が h を越えて母音 eu とつながり z の音が生まれる。"
      },
      {
        type: "choice",
        q: "「un」の発音として正しいのは?",
        choices: ["ウン(nをはっきり発音)", "アン(鼻に抜ける、nは発音しない)", "ユン"],
        answer: 1,
        explain: "un は鼻母音。n の前の母音が鼻に抜け、n 自体は発音しない。"
      },
      {
        type: "choice",
        q: "hôtel の h はどう発音する?",
        choices: ["ハ行の音で軽く発音する", "常に無音", "語頭だけ発音する"],
        answer: 1,
        explain: "フランス語の h は常に無音。ただし母音扱いのため l'hôtel のようにエリジオンが起こる。"
      },
      {
        type: "order",
        q: "「あなたは持っていますか」の疑問文の核となる2語をリエゾンが起きる順に並べよう",
        tokens: ["vous", "avez"],
        answer: "vous avez",
        explain: "vous avez は「ヴ ザヴェ」とつながって発音される定番の並び。"
      }
    ]
  },
  {
    id: "genre",
    order: 2,
    title: "名詞の性 — カフェは男性、水は女性",
    icon: "♀️♂️",
    intro: [
      "フランス語の名詞にはすべて「男性」か「女性」かの性別があり、これは日本語にはまったくない発想だ。café(コーヒー)は男性、eau(水)は女性、というように、ものの見た目や意味とは関係なく決まっている。最初は「なぜ?」と思うだろうが、性が分かれば冠詞も形容詞もそこに合わせるだけなので、実は覚え方さえつかめば楽になる分岐点でもある。",
      "旅先で「このパンを1つ」「その席は空いていますか」と言うたびに、名詞の性は avoir や形容詞の語尾にまで影響してくる。ここでは注文や道案内で頻出する単語を使い、語尾のパターンから性を見分けるコツを先に押さえておこう。"
    ],
    points: [
      {
        rule: "名詞は男性名詞(masculin)と女性名詞(féminin)のどちらかに必ず属する",
        examples: [
          { x: "un café", ja: "コーヒー1杯(男性)", kana: "アン カフェ" },
          { x: "une eau", ja: "水1つ(女性)", kana: "ユヌ オー" },
          { x: "un pain", ja: "パン1つ(男性)", kana: "アン パン" },
          { x: "une chambre", ja: "部屋1つ(女性)", kana: "ユヌ シャンブル" }
        ]
      },
      {
        rule: "-e で終わる名詞は女性であることが多いが、例外も少なくないので単語ごと丸暗記が結局は近道",
        examples: [
          { x: "une table", ja: "テーブル(女性)", kana: "ユヌ タブル" },
          { x: "un musée", ja: "美術館(男性・例外)", kana: "アン ミュゼ" },
          { x: "une gare", ja: "駅(女性)", kana: "ユヌ ギャール" }
        ]
      },
      {
        rule: "-tion, -sion, -té で終わる名詞はほぼ確実に女性",
        examples: [
          { x: "une réservation", ja: "予約(女性)", kana: "ユヌ レゼルヴァシオン" },
          { x: "une addition", ja: "お会計(女性)", kana: "ユヌ アディシオン" },
          { x: "une ville", ja: "街(女性)", kana: "ユヌ ヴィル" }
        ]
      },
      {
        rule: "-age, -ment, -eau で終わる名詞はほぼ確実に男性",
        examples: [
          { x: "un fromage", ja: "チーズ(男性)", kana: "アン フロマージュ" },
          { x: "un appartement", ja: "アパルトマン(男性)", kana: "アン アパルトマン" },
          { x: "un bateau", ja: "船(男性)", kana: "アン バトー" }
        ]
      },
      {
        rule: "人を表す名詞は性別に合わせて形が変わることが多い(語尾に e を足すのが基本形)",
        examples: [
          { x: "un ami / une amie", ja: "友人(男性/女性)", kana: "アン ナミ / ユヌ ナミ" },
          { x: "un touriste / une touriste", ja: "観光客(男女同形)", kana: "アン トゥーリスト / ユヌ トゥーリスト" }
        ]
      }
    ],
    drills: [
      {
        type: "choice",
        q: "「café(コーヒー)」の性は?",
        choices: ["男性", "女性", "どちらでもよい"],
        answer: 0,
        explain: "café は男性名詞。un café のように男性の冠詞がつく。"
      },
      {
        type: "choice",
        q: "-tion で終わる名詞の性として最も可能性が高いのは?",
        choices: ["男性", "女性", "単複で変わる"],
        answer: 1,
        explain: "-tion, -sion で終わる名詞はほぼ例外なく女性。réservation, addition など。"
      },
      {
        type: "choice",
        q: "「chambre(部屋)」の性は?",
        choices: ["男性", "女性"],
        answer: 1,
        explain: "chambre は -e で終わる女性名詞の典型例。"
      },
      {
        type: "fill",
        q: "「fromage(チーズ)」は語尾 -age から推測すると ___ 名詞。",
        choices: ["男性", "女性"],
        answer: 0,
        explain: "-age で終わる名詞は男性であることが非常に多い。"
      },
      {
        type: "choice",
        q: "同じ「観光客」でも男女で語の形が変わらない例はどれ?",
        choices: ["ami / amie", "touriste / touriste", "どちらも変わる"],
        answer: 1,
        explain: "touriste は男女同形。すでに -e で終わっているため語尾変化が不要。"
      }
    ]
  },
  {
    id: "articles",
    order: 3,
    title: "冠詞 — un / une / le / la、指させる一言",
    icon: "🔖",
    intro: [
      "Bonjour の次に必要なのは、欲しいものを指させる冠詞だ。「コーヒーを1つ」と言うにも「そのテーブル」と言うにも、フランス語では名詞の前に必ず冠詞が要る。前のユニットで学んだ名詞の性がここでそのまま活きてくる。un café、une eau のように、冠詞は名詞の性と単複に合わせて4種類ほどに姿を変える。",
      "冠詞には「初めて話題に出すもの」を指す不定冠詞(un/une/des)と、「すでに話題に出た、特定のもの」を指す定冠詞(le/la/les)がある。カフェで「コーヒーを1つ」と頼むときは不定冠詞、会計のときに「そのお会計」と言うときは定冠詞、という使い分けを実際の場面で覚えていこう。"
    ],
    points: [
      {
        rule: "不定冠詞: un(男性単数)/ une(女性単数)/ des(複数) — 「(数ある中の)ある一つ・いくつか」",
        examples: [
          { x: "un café, s'il vous plaît.", ja: "コーヒーを1つください", kana: "アン カフェ シル ヴ プレ" },
          { x: "une table pour deux.", ja: "2名用のテーブル", kana: "ユヌ タブル プール ドゥ" },
          { x: "des croissants.", ja: "クロワッサンをいくつか", kana: "デ クロワッサン" }
        ]
      },
      {
        rule: "定冠詞: le(男性単数)/ la(女性単数)/ les(複数) — 「その、あの」既に特定されたもの",
        examples: [
          { x: "le musée est fermé.", ja: "その美術館は閉まっている", kana: "ル ミュゼ エ フェルメ" },
          { x: "la gare est loin ?", ja: "その駅は遠いですか?", kana: "ラ ギャール エ ロワン" },
          { x: "les toilettes, s'il vous plaît ?", ja: "お手洗いはどこですか?", kana: "レ トワレット シル ヴ プレ" }
        ]
      },
      {
        rule: "le / la は母音・無音の h の前で l' に縮む(エリジオン)",
        examples: [
          { x: "l'addition, s'il vous plaît.", ja: "お会計をお願いします", kana: "ラディシオン シル ヴ プレ" },
          { x: "l'hôtel est près d'ici.", ja: "そのホテルはここから近い", kana: "ロテル エ プレ ディシ" }
        ]
      },
      {
        rule: "部分冠詞 du / de la は「量がはっきりしないもの(数えられないもの)」に使う",
        examples: [
          { x: "de l'eau, s'il vous plaît.", ja: "お水をください", kana: "ドゥ ロー シル ヴ プレ" },
          { x: "du pain, s'il vous plaît.", ja: "パンをください", kana: "デュ パン シル ヴ プレ" },
          { x: "de la confiture.", ja: "ジャムを少し", kana: "ドゥ ラ コンフィチュール" }
        ]
      }
    ],
    drills: [
      {
        type: "choice",
        q: "「コーヒーを1つください」に入る冠詞は?",
        choices: ["un café", "une café", "le café"],
        answer: 0,
        explain: "café は男性名詞なので不定冠詞は un。初めて注文する「ある一つ」を指す。"
      },
      {
        type: "fill",
        q: "___ table pour deux, s'il vous plaît.(2名用のテーブル)",
        choices: ["un", "une", "des"],
        answer: 1,
        explain: "table は女性名詞なので une。「ある一つのテーブル」を指す不定冠詞。"
      },
      {
        type: "choice",
        q: "「そのお会計をお願いします」で addition の前につく形は?",
        choices: ["la addition", "l'addition", "le addition"],
        answer: 1,
        explain: "la は母音で始まる addition の前で l' にエリジオンする。"
      },
      {
        type: "choice",
        q: "「お水をください」に最もふさわしい冠詞は?",
        choices: ["un eau", "de l'eau", "les eau"],
        answer: 1,
        explain: "水のように数えられないものには部分冠詞 du / de la(母音の前は de l')を使う。"
      },
      {
        type: "order",
        q: "「その美術館は閉まっている」を組み立てよう",
        tokens: ["Le", "musée", "est", "fermé"],
        answer: "Le musée est fermé",
        explain: "musée は男性名詞なので定冠詞は le。すでに話題の「その美術館」を指す。"
      }
    ]
  },
  {
    id: "etre",
    order: 4,
    title: "être — 「〜です」で自分と状況を伝える",
    icon: "🧍",
    intro: [
      "être(〜である)は英語の be動詞にあたる、フランス語で最初に暗記すべき動詞だ。「私は日本人です」「道に迷いました」「予約しています」など、旅先の自己紹介やトラブル対応の多くが être の一言から始まる。不規則変化なので活用は丸ごと覚える必要があるが、6つの人称すべてに音の癖があり、一度体に入れば応用が利く。",
      "特に日本人がつまずくのは vous(あなた/あなたたち)を使う場面の多さだ。フランスでは初対面や目上の人には必ず vous を使う。ここでは vous êtes を含めて全人称を実際の旅の一言とセットで覚えていこう。"
    ],
    points: [
      {
        rule: "être の現在形は全人称で不規則に変化する。まず活用表を音で覚える",
        examples: [
          { x: "je suis", ja: "私は〜です", kana: "ジュ スイ" },
          { x: "tu es", ja: "君は〜です", kana: "テュ エ" },
          { x: "il / elle est", ja: "彼は/彼女は〜です", kana: "イル / エル エ" },
          { x: "nous sommes", ja: "私たちは〜です", kana: "ヌ ソム" },
          { x: "vous êtes", ja: "あなた(たち)は〜です", kana: "ヴ ゼット" },
          { x: "ils / elles sont", ja: "彼らは/彼女らは〜です", kana: "イル / エル ソン" }
        ]
      },
      {
        rule: "国籍・身分を名乗るときは être + 無冠詞の名詞(冠詞をつけない)",
        examples: [
          { x: "Je suis japonais.", ja: "私は日本人です(男性)", kana: "ジュ スイ ジャポネ" },
          { x: "Je suis japonaise.", ja: "私は日本人です(女性)", kana: "ジュ スイ ジャポネーズ" },
          { x: "Nous sommes touristes.", ja: "私たちは観光客です", kana: "ヌ ソム トゥーリスト" }
        ]
      },
      {
        rule: "être は状態・場所・迷子など「今どういう状況か」を伝える万能動詞",
        examples: [
          { x: "Je suis perdu(e).", ja: "道に迷いました", kana: "ジュ スイ ペルデュ" },
          { x: "Nous sommes en retard.", ja: "私たちは遅れています", kana: "ヌ ソム アン ルタール" },
          { x: "C'est délicieux !", ja: "とても美味しいです!", kana: "セ デリシュー" }
        ]
      },
      {
        rule: "vous êtes のリエゾンは「ヴ ゼット」と z の音が挟まる。聞き取りにも要注意",
        examples: [
          { x: "Vous êtes prêt(e) ?", ja: "準備はいいですか?", kana: "ヴ ゼット プレ" },
          { x: "Vous êtes français(e) ?", ja: "あなたはフランス人ですか?", kana: "ヴ ゼット フランセ(ーズ)" }
        ]
      }
    ],
    drills: [
      {
        type: "choice",
        q: "「私は〜です」の活用は?",
        choices: ["je suis", "je es", "je sommes"],
        answer: 0,
        explain: "être の1人称単数は je suis(ジュ スイ)。"
      },
      {
        type: "choice",
        q: "「私たちは〜です」に対応する活用は?",
        choices: ["nous sommes", "nous êtes", "nous sont"],
        answer: 0,
        explain: "1人称複数は nous sommes(ヌ ソム)。"
      },
      {
        type: "fill",
        q: "Vous ___ prêt ?(準備はいいですか)",
        choices: ["êtes", "es", "est"],
        answer: 0,
        explain: "vous(あなた/あなたたち)に対応する形は êtes。リエゾンで「ヴ ゼット」となる。"
      },
      {
        type: "choice",
        q: "「私は日本人です」を国籍を答える文として自然に言うと?",
        choices: ["Je suis un japonais.", "Je suis japonais.", "Je japonais suis."],
        answer: 1,
        explain: "être + 国籍の名詞は無冠詞。un をつけない点が日本語話者の落とし穴。"
      },
      {
        type: "order",
        q: "「道に迷いました」を組み立てよう",
        tokens: ["Je", "suis", "perdu"],
        answer: "Je suis perdu",
        explain: "être の状態表現。女性なら perdue と綴るが発音は同じ。"
      },
      {
        type: "choice",
        q: "「彼らは〜です」の活用は?",
        choices: ["ils sont", "ils sommes", "ils êtes"],
        answer: 0,
        explain: "3人称複数は ils / elles sont(イル / エル ソン)。"
      }
    ]
  },
  {
    id: "avoir",
    order: 5,
    title: "avoir — 「持っている」で予約もトラブルも伝える",
    icon: "🎒",
    intro: [
      "avoir(持っている)は être と並ぶ最重要動詞で、しかも使い道が驚くほど広い。「予約を持っている(=予約している)」「お湯が出ない(=お湯を持たない)」「〜の必要がある(besoin de を持つ)」まで、フランス語では avoir 一つで表現してしまう場面が多い。日本語の発想では「予約する」「必要とする」と動詞が分かれる感覚を、avoir に一本化して考え直す練習になる。",
      "また avoir は年齢を言うときにも使われ(J'ai vingt ans = 私は20歳です、直訳は「20年を持つ」)、英語の be動詞的な感覚とはずれる。この違和感こそがフランス語らしさなので、ここで実例ごと飲み込んでしまおう。"
    ],
    points: [
      {
        rule: "avoir の現在形も不規則変化。活用を音で丸ごと覚える",
        examples: [
          { x: "j'ai", ja: "私は持っている", kana: "ジェ" },
          { x: "tu as", ja: "君は持っている", kana: "テュ ア" },
          { x: "il / elle a", ja: "彼は/彼女は持っている", kana: "イル / エル ア" },
          { x: "nous avons", ja: "私たちは持っている", kana: "ヌ ザヴォン" },
          { x: "vous avez", ja: "あなた(たち)は持っている", kana: "ヴ ザヴェ" },
          { x: "ils / elles ont", ja: "彼らは/彼女らは持っている", kana: "イル / エル ゾン" }
        ]
      },
      {
        rule: "「予約がある」「〜を持っている」は avoir でそのまま表現できる",
        examples: [
          { x: "J'ai une réservation.", ja: "予約しています", kana: "ジェ ユヌ レゼルヴァシオン" },
          { x: "Vous avez du Wi-Fi ?", ja: "Wi-Fiはありますか?", kana: "ヴ ザヴェ デュ ウィフィ" },
          { x: "Il n'y a pas d'eau chaude.", ja: "お湯が出ません", kana: "イル ニ ヤ パ ド ショード" }
        ]
      },
      {
        rule: "avoir besoin de 〜 で「〜が必要だ」。besoin(必要)を avoir で持つ発想",
        examples: [
          { x: "J'ai besoin d'un médecin.", ja: "医者が必要です", kana: "ジェ ブゾワン ダン メドサン" },
          { x: "J'ai besoin d'aide.", ja: "助けが必要です", kana: "ジェ ブゾワン デード" }
        ]
      },
      {
        rule: "年齢は être ではなく avoir + 数字 + ans(直訳「〜年を持つ」)",
        examples: [
          { x: "J'ai vingt ans.", ja: "私は20歳です", kana: "ジェ ヴァン タン" },
          { x: "Quel âge avez-vous ?", ja: "おいくつですか?", kana: "ケラージュ アヴェ ヴ" }
        ]
      }
    ],
    drills: [
      {
        type: "choice",
        q: "「私は持っている」の活用は?",
        choices: ["j'ai", "je as", "j'avons"],
        answer: 0,
        explain: "avoir の1人称単数は j'ai(ジェ)。je + ai がエリジオンで j'ai になる。"
      },
      {
        type: "fill",
        q: "Vous ___ une réservation ?(予約はありますか)",
        choices: ["avez", "avons", "as"],
        answer: 0,
        explain: "vous に対応する形は avez。リエゾンで「ヴ ザヴェ」となる。"
      },
      {
        type: "choice",
        q: "「医者が必要です」を avoir を使って言うと?",
        choices: ["Je suis besoin d'un médecin.", "J'ai besoin d'un médecin.", "J'ai un médecin besoin."],
        answer: 1,
        explain: "avoir besoin de 〜 で「〜が必要」。être ではなく avoir を使う点が日本語話者の落とし穴。"
      },
      {
        type: "choice",
        q: "「私は20歳です」をフランス語で言うと?",
        choices: ["Je suis vingt ans.", "J'ai vingt ans.", "J'ai vingt ans old."],
        answer: 1,
        explain: "年齢は avoir + 数字 + ans。être ではない点に注意。"
      },
      {
        type: "order",
        q: "「私たちはWi-Fiを持っている(利用できる)」を組み立てよう",
        tokens: ["Nous", "avons", "du", "Wi-Fi"],
        answer: "Nous avons du Wi-Fi",
        explain: "avoir の1人称複数は avons。du は数えられないものにつく部分冠詞。"
      }
    ]
  },
  {
    id: "verbes-er",
    order: 6,
    title: "-er動詞の現在形 — parler, regarder, réserverの型を覚える",
    icon: "🗣️",
    intro: [
      "フランス語の動詞の9割近くは -er で終わる規則動詞で、この一つの型を覚えるだけで一気に使える動詞が増える。parler(話す)、regarder(見る)、réserver(予約する)、trouver(見つける)など、旅先で頻出する動詞のほとんどがこのグループに属する。語幹(er の前の部分)は変えず、語尾だけを人称に合わせて -e, -es, -e, -ons, -ez, -ent と入れ替えるだけでよい。",
      "厄介なのは語尾の多くが発音上ほぼ同じ(「e, es, e, ent」はすべて無音に近い)という点だ。つまり書き言葉では6通りに見えても、話し言葉では je/tu/il/ils の4つがほぼ同じ音に聞こえる。ここでは違いを意識しつつ、聞き取りは文脈と主語で判断する感覚を養おう。"
    ],
    points: [
      {
        rule: "-er動詞は語幹+e / es / e / ons / ez / ent。parler(話す)で型を確認",
        examples: [
          { x: "je parle", ja: "私は話す", kana: "ジュ パルル" },
          { x: "tu parles", ja: "君は話す", kana: "テュ パルル" },
          { x: "il / elle parle", ja: "彼は/彼女は話す", kana: "イル / エル パルル" },
          { x: "nous parlons", ja: "私たちは話す", kana: "ヌ パルロン" },
          { x: "vous parlez", ja: "あなた(たち)は話す", kana: "ヴ パルレ" },
          { x: "ils / elles parlent", ja: "彼らは/彼女らは話す", kana: "イル / エル パルル" }
        ]
      },
      {
        rule: "je, tu, il, ils の語尾(e, es, e, ent)は発音上ほぼ無音。音はどれも同じに近い",
        examples: [
          { x: "je regarde / il regarde / ils regardent", ja: "私は見る/彼は見る/彼らは見る", kana: "ジュ ルギャルド / イル ルギャルド / イル ルギャルド" }
        ]
      },
      {
        rule: "vous を使う丁寧な依頼は「主語+動詞+ください(s'il vous plaît)」の型で作れる",
        examples: [
          { x: "Vous réservez une table ?", ja: "テーブルを予約されますか?", kana: "ヴ レゼルヴェ ユヌ タブル" },
          { x: "Vous parlez anglais ?", ja: "英語を話しますか?", kana: "ヴ パルレ アングレ" }
        ]
      },
      {
        rule: "nous のときだけ語幹の綴りが変わる -er動詞に注意(発音をなめらかにするため)",
        examples: [
          { x: "nous mangeons", ja: "私たちは食べる(mangerの1人称複数、gのあとにe)", kana: "ヌ マンジョン" },
          { x: "nous commençons", ja: "私たちは始める(commencerの1人称複数、cにセディーユ)", kana: "ヌ コマンソン" }
        ]
      }
    ],
    drills: [
      {
        type: "choice",
        q: "「私は話す」の正しい活用は?",
        choices: ["je parle", "je parles", "je parlent"],
        answer: 0,
        explain: "1人称単数の語尾は -e。je parle(ジュ パルル)。"
      },
      {
        type: "fill",
        q: "Nous ___ une table pour ce soir.(今夜のテーブルを予約します)",
        choices: ["réservons", "réservez", "réserve"],
        answer: 0,
        explain: "nous に対応する語尾は -ons。réserver → réservons。"
      },
      {
        type: "choice",
        q: "「あなたは英語を話しますか?」の vous に対応する活用は?",
        choices: ["parlez", "parles", "parlons"],
        answer: 0,
        explain: "vous に対応する語尾は -ez。parler → parlez。"
      },
      {
        type: "choice",
        q: "「彼らは話す」の活用 parlent の発音として近いのは?",
        choices: ["パルラン(語尾をはっきり発音)", "パルル(jeやilとほぼ同じ音)", "パルレント"],
        answer: 1,
        explain: "-ent はほぼ無音。ils parlent は il parle とほぼ同じ音に聞こえる。"
      },
      {
        type: "order",
        q: "「私たちは今夜テーブルを予約します」を組み立てよう",
        tokens: ["Nous", "réservons", "une", "table", "pour", "ce", "soir"],
        answer: "Nous réservons une table pour ce soir",
        explain: "réserver の nous 形は réservons。ce soir(今夜)は文末に置く。"
      }
    ]
  },
  {
    id: "adjectifs",
    order: 7,
    title: "形容詞の一致 — délicieux か délicieuse か",
    icon: "🎨",
    intro: [
      "「とても美味しい!」と言いたいとき、料理が男性名詞か女性名詞かで délicieux / délicieuse と語尾が変わる。フランス語の形容詞は、修飾する名詞の性・数に合わせて自分も姿を変える「一致」のルールを持っている。日本語にはない感覚だが、基本パターンは女性形なら -e を足す、複数形なら -s を足す、というシンプルな足し算で対応できることが多い。",
      "旅先の感想を言う場面(「素晴らしい!」「高すぎる」「大きいサイズはありますか」)は形容詞の宝庫だ。ここでは頻出の形容詞を男性形・女性形セットで覚え、間違えても通じるという安心感も持ちつつ、正しい形も押さえておこう。"
    ],
    points: [
      {
        rule: "基本は男性形に -e を足すと女性形になる",
        examples: [
          { x: "un plat délicieux / une tarte délicieuse", ja: "美味しい料理/美味しいタルト", kana: "アン プラ デリシュー / ユヌ タルト デリシューズ" },
          { x: "un grand hôtel / une grande chambre", ja: "大きなホテル/大きな部屋", kana: "アン グラン トテル / ユヌ グランド シャンブル" }
        ]
      },
      {
        rule: "すでに -e で終わる形容詞は男女同形(そのまま使える)",
        examples: [
          { x: "un magasin magnifique / une vue magnifique", ja: "素晴らしい店/素晴らしい景色", kana: "アン マガザン マニフィック / ユヌ ヴュ マニフィック" }
        ]
      },
      {
        rule: "複数形は原則 -s を足す(発音は変わらないことが多い)",
        examples: [
          { x: "des plats délicieux", ja: "美味しい料理たち(複数、délicieuxはxのまま変化なし)", kana: "デ プラ デリシュー" },
          { x: "de grandes chambres", ja: "大きな部屋たち", kana: "ドゥ グランド シャンブル" }
        ]
      },
      {
        rule: "多くの形容詞は名詞の後ろに置くが、grand, petit, bon など日常語は名詞の前に置く",
        examples: [
          { x: "une chambre calme", ja: "静かな部屋(名詞の後ろ)", kana: "ユヌ シャンブル カルム" },
          { x: "une petite table", ja: "小さなテーブル(名詞の前)", kana: "ユヌ プティット タブル" },
          { x: "un bon restaurant", ja: "良いレストラン(名詞の前)", kana: "アン ボン レストラン" }
        ]
      }
    ],
    drills: [
      {
        type: "choice",
        q: "「C'est délicieux(このスープは美味しい)」の soupe(女性名詞)に合わせた形は?",
        choices: ["délicieux", "délicieuse", "délicieuses"],
        answer: 1,
        explain: "女性単数名詞には -e を足した délicieuse を使う。"
      },
      {
        type: "fill",
        q: "Avez-vous une taille plus ___ ?(もっと大きいサイズはありますか)",
        choices: ["grand", "grande", "grands"],
        answer: 1,
        explain: "taille は女性名詞なので grande。男性形 grand に -e を足す。"
      },
      {
        type: "choice",
        q: "「素晴らしい景色」を magnifique を使って言うと女性形はどうなる?",
        choices: ["vue magnifique", "vue magnifiques", "vue magnifiqe"],
        answer: 0,
        explain: "magnifique はすでに -e で終わるため男女同形。そのまま使う。"
      },
      {
        type: "choice",
        q: "「良いレストラン」で bon はどこに置く?",
        choices: ["restaurant bon", "bon restaurant", "どちらでも同じ"],
        answer: 1,
        explain: "bon, grand, petit など日常的な短い形容詞は名詞の前に置く。"
      },
      {
        type: "order",
        q: "「小さなテーブルをお願いします」を組み立てよう",
        tokens: ["Une", "petite", "table", "s'il", "vous", "plaît"],
        answer: "Une petite table s'il vous plaît",
        explain: "petite は table(女性)に一致。petit は名詞の前に置く形容詞。"
      }
    ]
  },
  {
    id: "questions",
    order: 8,
    title: "疑問文 — Est-ce que で誰でも質問できる",
    icon: "❓",
    intro: [
      "フランス語の疑問文には主に3つの作り方があるが、旅行者にとって一番安全で万能なのが Est-ce que を文頭につける方法だ。平叙文の語順をそのままに、頭に Est-ce que をつけるだけで疑問文になるので、倒置(主語と動詞をひっくり返す)のような複雑な語順変化を覚える必要がない。",
      "実際には語尾を上げるだけの疑問文(Vous avez une réservation ? のように語順そのまま)もカジュアルな場ではよく使われるが、書き言葉や丁寧な場面では Est-ce que を使うと迷わない。ここでは Qu'est-ce que(何を)や Où(どこ)などの疑問詞と組み合わせるパターンも押さえよう。"
    ],
    points: [
      {
        rule: "Est-ce que + 平叙文の語順で疑問文になる。語順を変えなくてよいのが最大の利点",
        examples: [
          { x: "Est-ce que vous avez une table ?", ja: "テーブルはありますか?", kana: "エス ク ヴ ザヴェ ユヌ タブル" },
          { x: "Est-ce que je peux payer par carte ?", ja: "カードで払えますか?", kana: "エス ク ジュ プ ペイエ パール カルト" }
        ]
      },
      {
        rule: "カジュアルには文末のイントネーションを上げるだけでも疑問文になる",
        examples: [
          { x: "Vous avez une réservation ?", ja: "予約はありますか?", kana: "ヴ ザヴェ ユヌ レゼルヴァシオン" },
          { x: "C'est loin ?", ja: "それは遠いですか?", kana: "セ ロワン" }
        ]
      },
      {
        rule: "疑問詞(Qu'est-ce que「何を」, Où「どこ」, Quand「いつ」, Combien「いくつ・いくら」)を文頭に置く",
        examples: [
          { x: "Qu'est-ce que vous recommandez ?", ja: "おすすめは何ですか?", kana: "ケス ク ヴ ルコマンデ" },
          { x: "Où est la station de métro ?", ja: "地下鉄駅はどこですか?", kana: "ウ エ ラ スタシオン ドゥ メトロ" },
          { x: "Combien ça coûte ?", ja: "これはいくらですか?", kana: "コンビヤン サ クート" }
        ]
      },
      {
        rule: "「はい/いいえ」で答える質問には Est-ce que がそのまま使える便利な万能パターン",
        examples: [
          { x: "Est-ce que c'est inclus ?", ja: "それは含まれていますか?", kana: "エス ク セ アンクリュ" },
          { x: "Est-ce qu'il y a une réduction ?", ja: "割引はありますか?(母音の前でqueがqu'に)", kana: "エス キ リ ヤ ユヌ レデュクシオン" }
        ]
      }
    ],
    drills: [
      {
        type: "choice",
        q: "「テーブルはありますか?」を Est-ce que を使って作ると?",
        choices: ["Est-ce que vous avez une table ?", "Avez vous que une table ?", "Vous est-ce que avez une table ?"],
        answer: 0,
        explain: "Est-ce que + 平叙文の語順(vous avez une table)をそのまま続ける。"
      },
      {
        type: "fill",
        q: "___ ça coûte ?(いくらですか)",
        choices: ["Combien", "Où", "Quand"],
        answer: 0,
        explain: "値段を尋ねるときは疑問詞 Combien(いくつ・いくら)を使う。"
      },
      {
        type: "choice",
        q: "「割引はありますか?」で que が qu' に変わるのはなぜ?",
        choices: ["次が母音で始まるため", "疑問文だから", "決まりはなく自由"],
        answer: 0,
        explain: "que の後に il のような母音始まりの語が続くとエリジオンで qu' になる。"
      },
      {
        type: "choice",
        q: "「おすすめは何ですか?」に対応する自然な疑問詞の組み合わせは?",
        choices: ["Où est-ce que vous recommandez ?", "Qu'est-ce que vous recommandez ?", "Combien vous recommandez ?"],
        answer: 1,
        explain: "「何を」を尋ねるので Qu'est-ce que(=Qu' + est-ce que)を使う。"
      },
      {
        type: "order",
        q: "「地下鉄駅はどこですか?」を組み立てよう",
        tokens: ["Où", "est", "la", "station", "de", "métro"],
        answer: "Où est la station de métro",
        explain: "場所を尋ねる疑問詞 Où を文頭に置き、そのあとに être の文が続く。"
      }
    ]
  },
  {
    id: "negation",
    order: 9,
    title: "否定文 — ne...pas で動詞をサンドイッチ",
    icon: "🚫",
    intro: [
      "「英語を話せません」「お湯が出ません」「結構です」——旅先では肯定文と同じくらい否定文もよく使う。フランス語の基本の否定は ne と pas で動詞を挟み込む「サンドイッチ」の形をとる。慣れないうちは ne を忘れがちだが、話し言葉では実際 ne が省略されることも多く、pas だけでも通じるという安心材料もある。",
      "ここでは ne...pas の基本形に加え、母音の前で ne が n' になるエリジオン、そして日常会話で ne が聞こえにくくなる感覚も一緒に身につけていこう。"
    ],
    points: [
      {
        rule: "基本形は 主語 + ne + 動詞 + pas。動詞を ne と pas で挟む",
        examples: [
          { x: "Je ne parle pas français.", ja: "私はフランス語を話しません", kana: "ジュ ヌ パルル パ フランセ" },
          { x: "Ce n'est pas loin.", ja: "それは遠くありません", kana: "ス ネ パ ロワン" }
        ]
      },
      {
        rule: "動詞が母音で始まる場合、ne は n' にエリジオンする",
        examples: [
          { x: "Je n'ai pas de réservation.", ja: "私は予約していません", kana: "ジュ ネ パ ドゥ レゼルヴァシオン" },
          { x: "Il n'y a pas d'eau chaude.", ja: "お湯が出ません", kana: "イル ニ ヤ パ ド ショード" }
        ]
      },
      {
        rule: "否定文の中では不定冠詞・部分冠詞(un, une, du, de la)がすべて de に変わる",
        examples: [
          { x: "J'ai un stylo. → Je n'ai pas de stylo.", ja: "ペンがある→ペンがない", kana: "ジェ アン スティロ → ジュ ネ パ ドゥ スティロ" },
          { x: "Il y a du pain. → Il n'y a pas de pain.", ja: "パンがある→パンがない", kana: "イリ ヤ デュ パン → イル ニ ヤ パ ドゥ パン" }
        ]
      },
      {
        rule: "話し言葉では ne が聞こえにくく消えがち。pas の有無で否定と気づくことが多い",
        examples: [
          { x: "Je (ne) sais pas.", ja: "わかりません", kana: "ジュ セ パ" },
          { x: "C'(ne) marche pas.", ja: "これは動きません(故障)", kana: "サ マルシュ パ" }
        ]
      }
    ],
    drills: [
      {
        type: "choice",
        q: "「私はフランス語を話しません」の正しい語順は?",
        choices: ["Je parle ne pas français.", "Je ne parle pas français.", "Ne je parle pas français."],
        answer: 1,
        explain: "ne + 動詞 + pas の順で動詞をサンドイッチする。"
      },
      {
        type: "fill",
        q: "Il ___ y a pas d'eau chaude.(お湯が出ません)",
        choices: ["ne", "n'", "no"],
        answer: 1,
        explain: "動詞 y a は母音 y で始まるため ne は n' にエリジオンする。"
      },
      {
        type: "choice",
        q: "肯定文 J'ai un stylo. を否定文にすると un はどう変わる?",
        choices: ["そのまま un", "de に変わる", "des に変わる"],
        answer: 1,
        explain: "否定文の中では不定冠詞・部分冠詞は de に変わるのが基本ルール。"
      },
      {
        type: "choice",
        q: "話し言葉でよく省略されるのは ne と pas のどちら?",
        choices: ["ne", "pas", "両方とも省略されない"],
        answer: 0,
        explain: "カジュアルな会話では ne が聞こえにくく省略されがち。pas は残ることが多い。"
      },
      {
        type: "order",
        q: "「私は予約していません」を組み立てよう",
        tokens: ["Je", "n'ai", "pas", "de", "réservation"],
        answer: "Je n'ai pas de réservation",
        explain: "avoir の否定+否定文中の冠詞 de の組み合わせ。"
      }
    ]
  },
  {
    id: "prepositions",
    order: 10,
    title: "前置詞と縮約 — à + le は au、de + le は du",
    icon: "🧩",
    intro: [
      "「駅へ行く」「美術館の近くに」——場所を言う前置詞 à(〜へ、〜に)と de(〜の、〜から)は旅先の必需品だが、後ろに定冠詞 le / les が続くと単純にくっつくのではなく、姿を変えて縮約する。à + le は au に、à + les は aux に、de + le は du に、de + les は des に、というルールがある。",
      "つまり「駅へ」は à la gare とそのまま言えるのに、「美術館へ」は au musée(à le musée ではない)になる。この縮約を知らないと文法書には載っていない単語 au / du が急に出てきて混乱するので、ここでまとめて整理してしまおう。"
    ],
    points: [
      {
        rule: "à(〜へ/〜に)+ le → au 、à + les → aux。女性 la と l' はそのまま",
        examples: [
          { x: "Je vais au musée.", ja: "私は美術館へ行きます(à + le musée)", kana: "ジュ ヴェ オ ミュゼ" },
          { x: "Je vais à la gare.", ja: "私は駅へ行きます(女性名詞はそのまま)", kana: "ジュ ヴェ ア ラ ギャール" },
          { x: "Je vais aux toilettes.", ja: "お手洗いへ行きます(à + les toilettes)", kana: "ジュ ヴェ オ トワレット" }
        ]
      },
      {
        rule: "de(〜の/〜から)+ le → du 、de + les → des。女性 la と l' はそのまま",
        examples: [
          { x: "la station du métro", ja: "地下鉄の駅(de + le métro)", kana: "ラ スタシオン デュ メトロ" },
          { x: "près de la gare", ja: "駅の近く(女性名詞はそのまま)", kana: "プレ ドゥ ラ ギャール" },
          { x: "le prix des billets", ja: "切符の値段(de + les billets)", kana: "ル プリ デ ビエ" }
        ]
      },
      {
        rule: "縮約は au/du のような「新しい単語」に見えるが、中身は前置詞+定冠詞と理解すれば覚えやすい",
        examples: [
          { x: "à + le musée = au musée", ja: "美術館へ", kana: "オ ミュゼ" },
          { x: "de + le centre-ville = du centre-ville", ja: "街の中心地から/の", kana: "デュ サントル ヴィル" }
        ]
      },
      {
        rule: "手段や場所の細かい使い分け: en(乗り物・国)、chez(〜の家/店)も旅先の頻出前置詞",
        examples: [
          { x: "en train", ja: "電車で", kana: "アン トラン" },
          { x: "chez le médecin", ja: "医者のところへ/で", kana: "シェ ル メドサン" }
        ]
      }
    ],
    drills: [
      {
        type: "choice",
        q: "「美術館へ行きます」で à + le musée はどう縮約される?",
        choices: ["à le musée", "au musée", "à la musée"],
        answer: 1,
        explain: "à + le は必ず au に縮約する。à le とは書かない。"
      },
      {
        type: "fill",
        q: "la station ___ métro(地下鉄の駅、de + le métro)",
        choices: ["du", "de le", "des"],
        answer: 0,
        explain: "de + le は du に縮約する。de le という形は存在しない。"
      },
      {
        type: "choice",
        q: "「駅へ行きます」で la gare(女性名詞)の前の à はどうなる?",
        choices: ["au la gare", "à la gare(縮約しない)", "à gare"],
        answer: 1,
        explain: "縮約が起きるのは le/les の前だけ。女性単数 la の前ではそのまま à la。"
      },
      {
        type: "choice",
        q: "「切符の値段」で de + les billets はどう縮約される?",
        choices: ["de les billets", "des billets", "du billets"],
        answer: 1,
        explain: "de + les は des に縮約する。"
      },
      {
        type: "order",
        q: "「お手洗いへ行きたいのですが」の核となる部分を組み立てよう",
        tokens: ["Je", "vais", "aux", "toilettes"],
        answer: "Je vais aux toilettes",
        explain: "à + les toilettes は aux toilettes に縮約される。"
      }
    ]
  },
  {
    id: "passe-compose",
    order: 11,
    title: "複合過去 — 「盗まれました」「失くしました」を伝える",
    icon: "🕰️",
    intro: [
      "トラブルの報告(「カバンを盗まれました」「パスポートを失くしました」)や旅の思い出を語るには過去形が要る。フランス語の日常会話で最もよく使う過去形が複合過去(passé composé)で、作り方は avoir または être の現在形 + 過去分詞、という2語の組み合わせだけでよい。英語の現在完了に近い形なので、パーツの組み立て方さえ分かれば構造自体は難しくない。",
      "ポイントは動詞ごとに avoir を使うか être を使うかが決まっていること、そして être を使うグループでは過去分詞が主語の性・数に一致すること。旅先で頻出する「行く」「来る」などの移動動詞は être グループなので、ここでセットで覚えておこう。"
    ],
    points: [
      {
        rule: "複合過去 = avoir/être の現在形 + 過去分詞。ほとんどの動詞は avoir を使う",
        examples: [
          { x: "J'ai perdu mon passeport.", ja: "パスポートを失くしました(perdre→perdu)", kana: "ジェ ペルデュ モン パスポール" },
          { x: "On m'a volé mon sac.", ja: "カバンを盗まれました(voler→volé)", kana: "オン マ ヴォレ モン サック" },
          { x: "J'ai réservé une table.", ja: "テーブルを予約しました(réserver→réservé)", kana: "ジェ レゼルヴェ ユヌ タブル" }
        ]
      },
      {
        rule: "-er動詞の過去分詞は語幹+é。réserver→réservé、visiter→visitéのように規則的",
        examples: [
          { x: "J'ai visité le musée.", ja: "美術館を訪れました", kana: "ジェ ヴィジテ ル ミュゼ" },
          { x: "Nous avons mangé au restaurant.", ja: "レストランで食事しました", kana: "ヌ ザヴォン マンジェ オ レストラン" }
        ]
      },
      {
        rule: "移動を表す一部の動詞(aller, venir, arriver など)は être を使い、過去分詞が主語に一致する",
        examples: [
          { x: "Je suis allé(e) à Paris.", ja: "私はパリへ行きました(男性allé/女性allée)", kana: "ジュ スイ ザレ" },
          { x: "Nous sommes arrivé(e)s à l'hôtel.", ja: "私たちはホテルに着きました", kana: "ヌ ソム ザリヴェ" }
        ]
      },
      {
        rule: "再帰動詞(se perdre など、〜self にあたる se がつく動詞)も être を使う",
        examples: [
          { x: "Je me suis perdu(e).", ja: "私は道に迷いました", kana: "ジュ ム スイ ペルデュ" },
          { x: "Je me suis trompé(e) de direction.", ja: "方向を間違えました", kana: "ジュ ム スイ トロンペ ドゥ ディレクシオン" }
        ]
      }
    ],
    drills: [
      {
        type: "choice",
        q: "「パスポートを失くしました」の正しい複合過去は?",
        choices: ["Je perds mon passeport.", "J'ai perdu mon passeport.", "Je suis perdu mon passeport."],
        answer: 1,
        explain: "perdre は avoir を使う動詞。過去分詞は perdu。"
      },
      {
        type: "fill",
        q: "Nous ___ mangé au restaurant.(レストランで食事しました)",
        choices: ["avons", "sommes", "avez"],
        answer: 0,
        explain: "manger は avoir を使う動詞。nous に対応する avoir の形は avons。"
      },
      {
        type: "choice",
        q: "「私はパリへ行きました」で使う助動詞は?",
        choices: ["avoir", "être"],
        answer: 1,
        explain: "aller は移動を表す動詞グループに属し、être を助動詞として使う。"
      },
      {
        type: "choice",
        q: "être を使う複合過去で、過去分詞が女性なら語尾に何を足す?",
        choices: ["s", "e", "es"],
        answer: 1,
        explain: "être グループの過去分詞は主語に性・数一致する。女性単数なら -e を足す(allé→allée)。"
      },
      {
        type: "order",
        q: "「私は道に迷いました」を複合過去で組み立てよう",
        tokens: ["Je", "me", "suis", "perdu"],
        answer: "Je me suis perdu",
        explain: "se perdre は再帰動詞なので être を使う。"
      },
      {
        type: "choice",
        q: "réserver(予約する)の過去分詞は?",
        choices: ["réservé", "réservais", "réserve"],
        answer: 0,
        explain: "-er動詞の過去分詞は語幹+é が基本形。réserver→réservé。"
      }
    ]
  },
  {
    id: "je-voudrais",
    order: 12,
    title: "Je voudrais — 丁寧に欲しいものを伝える魔法の一言",
    icon: "🙏",
    intro: [
      "旅先のフランス語で最も出番が多いフレーズを一つだけ挙げるなら Je voudrais(〜が欲しいのですが)だ。vouloir(欲しい・したい)の直説法現在 je veux をあえて条件法にした形で、直接的な「〜をください(Je veux)」よりずっと柔らかく丁寧に響く。カフェでもホテルでも駅窓口でも、この一言に名詞や動詞の原形を続けるだけで、たいていの要望が伝わる。",
      "このコースの最後に、これまで学んだ冠詞・名詞の性・前置詞のすべてを Je voudrais に載せて総仕上げをしよう。旅の最初の日から最後の日まで、この一言があれば困らない。"
    ],
    points: [
      {
        rule: "Je voudrais + 名詞(冠詞つき)で「〜が欲しいのですが」",
        examples: [
          { x: "Je voudrais un café, s'il vous plaît.", ja: "コーヒーをください", kana: "ジュ ヴドレ アン カフェ シル ヴ プレ" },
          { x: "Je voudrais une chambre calme.", ja: "静かな部屋がいいのですが", kana: "ジュ ヴドレ ユヌ シャンブル カルム" }
        ]
      },
      {
        rule: "Je voudrais + 動詞の原形(不定詞)で「〜したいのですが」",
        examples: [
          { x: "Je voudrais réserver une table.", ja: "テーブルを予約したいのですが", kana: "ジュ ヴドレ レゼルヴェ ユヌ タブル" },
          { x: "Je voudrais changer de chambre.", ja: "部屋を替えていただきたいです", kana: "ジュ ヴドレ シャンジェ ドゥ シャンブル" }
        ]
      },
      {
        rule: "Est-ce que je peux 〜?(〜してもいいですか)は許可を求める時のペアフレーズ",
        examples: [
          { x: "Est-ce que je peux avoir un peu plus de pain ?", ja: "パンをもう少しいただけますか?", kana: "エス ク ジュ プ アヴォワール アン プ プリュス ドゥ パン" },
          { x: "Est-ce que je peux payer par carte ?", ja: "カードで払えますか?", kana: "エス ク ジュ プ ペイエ パール カルト" }
        ]
      },
      {
        rule: "Pourriez-vous 〜?(〜していただけますか)はさらに丁寧に相手に依頼する形",
        examples: [
          { x: "Pourriez-vous m'appeler un taxi ?", ja: "タクシーを呼んでいただけますか?", kana: "プーリエ ヴ マプレ アン タクシ" },
          { x: "Pourriez-vous parler plus lentement ?", ja: "もう少しゆっくりお願いします", kana: "プーリエ ヴ パルレ プリュ ラントマン" }
        ]
      }
    ],
    drills: [
      {
        type: "choice",
        q: "「コーヒーをください」を丁寧に言うと?",
        choices: ["Je veux un café.", "Je voudrais un café, s'il vous plaît.", "Un café, donnez-moi."],
        answer: 1,
        explain: "Je voudrais は je veux より柔らかく丁寧な響きを持つ。旅先の基本フレーズ。"
      },
      {
        type: "fill",
        q: "Je voudrais ___ une table pour ce soir.(今夜のテーブルを予約したいです)",
        choices: ["réserver", "réserve", "réservé"],
        answer: 0,
        explain: "Je voudrais の後には動詞の原形(不定詞)réserver が続く。"
      },
      {
        type: "choice",
        q: "「パンをもう少しいただけますか?」に近い丁寧さの型は?",
        choices: ["Je pain plus.", "Est-ce que je peux avoir un peu plus de pain ?", "Pain plus s'il vous plaît donne."],
        answer: 1,
        explain: "Est-ce que je peux 〜? は許可を求める丁寧な定型フレーズ。"
      },
      {
        type: "choice",
        q: "「タクシーを呼んでいただけますか?」で最も丁寧な依頼の形は?",
        choices: ["Appelez un taxi.", "Pourriez-vous m'appeler un taxi ?", "Je veux un taxi."],
        answer: 1,
        explain: "Pourriez-vous 〜? は Je voudrais よりもさらに丁寧な依頼表現。"
      },
      {
        type: "order",
        q: "「静かな部屋がいいのですが」を組み立てよう",
        tokens: ["Je", "voudrais", "une", "chambre", "calme"],
        answer: "Je voudrais une chambre calme",
        explain: "Je voudrais + 冠詞つき名詞 + 形容詞(女性名詞に一致したcalme)。"
      }
    ]
  }
];
