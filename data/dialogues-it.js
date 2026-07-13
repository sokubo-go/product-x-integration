// data/dialogues-it.js — イタリア語版シーン会話ドリル用データ(js/learn.js から参照)
window.DIALOGUES_DATA = [
  {
    id: "bar",
    title: "バールで朝食",
    icon: "☕",
    desc: "カウンターでカプチーノとコルネットを頼む",
    turns: [
      { speaker: "them", name: "バリスタ", it: "Buongiorno! Mi dica.", ja: "おはようございます!ご注文は?", kana: "ボンジョルノ!ミ ディーカ" },
      { speaker: "you", hint: "カプチーノを1つください、と言ってみよう",
        it: "Un cappuccino, per favore.", ja: "カプチーノを1つください", kana: "ウン カプッチーノ ペル ファヴォーレ" },
      { speaker: "them", name: "バリスタ", it: "Subito! E da mangiare, desidera qualcosa?", ja: "かしこまりました!お食事は何か召し上がりますか?", kana: "スービト!エ ダ マンジャーレ デジデーラ クアルコーザ" },
      { speaker: "you", hint: "コルネットもひとつ、と付け加えてみよう",
        it: "Sì, anche un cornetto, grazie.", ja: "はい、コルネットもひとつお願いします", kana: "シー アンケ ウン コルネット グラツィエ" },
      { speaker: "them", name: "バリスタ", it: "Ecco a lei: cappuccino e cornetto. Buon appetito!", ja: "どうぞ、カプチーノとコルネットです。召し上がれ!", kana: "エッコ ア レイ カプッチーノ エ コルネット ブォン アッペティート" },
      { speaker: "you", hint: "食べ終えたら、お会計はいくらか尋ねてみよう",
        it: "Quant'è, per favore?", ja: "おいくらですか?", kana: "クアンテ ペル ファヴォーレ" },
      { speaker: "them", name: "バリスタ", it: "Sono due euro e cinquanta.", ja: "2ユーロ50セントです", kana: "ソノ ドゥーエ エウロ エ チンクアンタ" },
      { speaker: "you", hint: "お礼を言って店を出よう",
        it: "Grazie mille, arrivederci!", ja: "どうもありがとう、それでは!", kana: "グラツィエ ミッレ アッリヴェデルチ" },
      { speaker: "them", name: "バリスタ", it: "Grazie a lei, buona giornata!", ja: "こちらこそありがとうございます、良い一日を!", kana: "グラツィエ ア レイ ブオナ ジョルナータ" }
    ]
  },
  {
    id: "gelateria",
    title: "ジェラテリアで",
    icon: "🍨",
    desc: "フレーバーを選んでコーンで2段重ねを楽しむ",
    turns: [
      { speaker: "them", name: "店員", it: "Buongiorno! Che gusti vorrebbe?", ja: "いらっしゃいませ!どのフレーバーになさいますか?", kana: "ボンジョルノ!ケ グスティ ヴォレッベ" },
      { speaker: "you", hint: "おすすめのフレーバーを聞いてみよう",
        it: "Quali sono i gusti più buoni?", ja: "おすすめのフレーバーは何ですか?", kana: "クアーリ ソノ イ グスティ ピュー ブォーニ" },
      { speaker: "them", name: "店員", it: "Il pistacchio e il limone sono i più richiesti.", ja: "ピスタチオとレモンが一番人気です", kana: "イル ピスタッキオ エ イル リモーネ ソノ イ ピュー リキエスティ" },
      { speaker: "you", hint: "コーンでお願いします、と伝えよう",
        it: "Un cono, per favore.", ja: "コーンでお願いします", kana: "ウン コーノ ペル ファヴォーレ" },
      { speaker: "them", name: "店員", it: "Perfetto. Quanti gusti desidera, uno o due?", ja: "承知しました。フレーバーはいくつになさいますか、1つ、2つ?", kana: "ペルフェット クアンティ グスティ デジデーラ ウーノ オ ドゥーエ" },
      { speaker: "you", hint: "ピスタチオとレモンを2段重ねで、と頼もう",
        it: "Pistacchio e limone, per favore.", ja: "ピスタチオとレモンをお願いします", kana: "ピスタッキオ エ リモーネ ペル ファヴォーレ" },
      { speaker: "them", name: "店員", it: "Ecco qua! Buona degustazione.", ja: "どうぞ!お楽しみください", kana: "エッコ クア ブオナ デグスタツィオーネ" },
      { speaker: "you", hint: "一口食べて、感想を伝えてみよう",
        it: "Che buono, è squisito!", ja: "すごく美味しい、最高です!", kana: "ケ ブォーノ エ スクイジート" },
      { speaker: "them", name: "店員", it: "Sono contento che le piaccia!", ja: "お気に召して嬉しいです!", kana: "ソノ コンテント ケ レ ピアッチャ" }
    ]
  },
  {
    id: "ristorante",
    title: "リストランテで夕食",
    icon: "🍝",
    desc: "予約を告げておすすめを聞き、会計まで済ませる",
    turns: [
      { speaker: "them", name: "カメリエーレ", it: "Buonasera, avete una prenotazione?", ja: "こんばんは、ご予約はございますか?", kana: "ブオナセーラ アヴェーテ ウナ プレノタツィオーネ" },
      { speaker: "you", hint: "田中の名前で予約している、と伝えよう",
        it: "Sì, abbiamo una prenotazione a nome Tanaka.", ja: "はい、田中の名前で予約しています", kana: "シー アッビアーモ ウナ プレノタツィオーネ ア ノーメ タナカ" },
      { speaker: "them", name: "カメリエーレ", it: "Perfetto, ecco il menù. Cosa desiderate?", ja: "承知しました、こちらメニューです。ご注文は?", kana: "ペルフェット エッコ イル メヌー コーザ デジデラーテ" },
      { speaker: "you", hint: "シェフのおすすめを聞いてみよう",
        it: "Cosa ci consiglia lo chef?", ja: "シェフのおすすめは何ですか?", kana: "コーザ チ コンシリア ロ シェフ" },
      { speaker: "them", name: "カメリエーレ", it: "La carbonara della casa è la nostra specialità.", ja: "自家製カルボナーラが当店のスペシャリテです", kana: "ラ カルボナーラ デッラ カーザ エ ラ ノストラ スペチャリタ" },
      { speaker: "you", hint: "それを一つと赤ワインをグラスで注文しよう",
        it: "Va bene, una carbonara e un bicchiere di vino rosso.", ja: "それでは、カルボナーラと赤ワインをグラスでお願いします", kana: "ヴァ ベーネ ウナ カルボナーラ エ ウン ビッキエーレ ディ ヴィーノ ロッソ" },
      { speaker: "them", name: "カメリエーレ", it: "Subito, buon appetito!", ja: "かしこまりました、召し上がれ!", kana: "スービト ブォン アッペティート" },
      { speaker: "you", hint: "食べて感想を伝え、会計を頼んでみよう",
        it: "Buonissimo! Il conto, per favore.", ja: "とても美味しいです!お会計をお願いします", kana: "ブオニッシモ イル コント ペル ファヴォーレ" },
      { speaker: "them", name: "カメリエーレ", it: "Certo, arrivo subito. Grazie e buonasera!", ja: "かしこまりました、すぐお持ちします。ありがとうございました、良い夜を!", kana: "チェルト アッリーヴォ スービト グラツィエ エ ブオナセーラ" }
    ]
  },
  {
    id: "biglietti",
    title: "切符を買う・電車に乗る",
    icon: "🚆",
    desc: "ローマ行きの切符を買い、乗車前に刻印を確認する",
    turns: [
      { speaker: "them", name: "駅員", it: "Buongiorno, mi dica.", ja: "おはようございます、ご用件は?", kana: "ボンジョルノ ミ ディーカ" },
      { speaker: "you", hint: "ローマ行きの切符を2枚、と言ってみよう",
        it: "Due biglietti per Roma, per favore.", ja: "ローマ行きの切符を2枚ください", kana: "ドゥーエ ビリエッティ ペル ローマ ペル ファヴォーレ" },
      { speaker: "them", name: "駅員", it: "Andata e ritorno o solo andata?", ja: "往復ですか、片道ですか?", kana: "アンダータ エ リトルノ オ ソロ アンダータ" },
      { speaker: "you", hint: "片道でお願いします、と答えよう",
        it: "Solo andata, grazie.", ja: "片道でお願いします", kana: "ソロ アンダータ グラツィエ" },
      { speaker: "them", name: "駅員", it: "Ecco a lei. Il treno delle dieci parte dal binario cinque.", ja: "どうぞ。10時の電車は5番線から発車します", kana: "エッコ ア レイ イル トレノ デッレ ディエチ パルテ ダル ビナーリオ チンクエ" },
      { speaker: "you", hint: "聞き取れなかったので、何番線か聞き直してみよう",
        it: "Scusi, da che binario parte?", ja: "すみません、何番線から出発ですか?", kana: "スクージ ダ ケ ビナーリオ パルテ" },
      { speaker: "them", name: "駅員", it: "Dal binario cinque, tra venti minuti.", ja: "5番線です、20分後に出発です", kana: "ダル ビナーリオ チンクエ トラ ヴェンティ ミヌーティ" },
      { speaker: "you", hint: "乗る前に刻印が必要か確認してみよう",
        it: "Devo obliterare il biglietto prima di salire?", ja: "乗る前に切符を刻印する必要がありますか?", kana: "デーヴォ オブリテラーレ イル ビリエット プリマ ディ サリーレ" },
      { speaker: "them", name: "駅員", it: "Sì, c'è una macchinetta gialla vicino al binario.", ja: "はい、ホーム近くの黄色い刻印機を使ってください", kana: "シー チェ ウナ マッキネッタ ジャッラ ヴィチーノ アル ビナーリオ" }
    ]
  },
  {
    id: "hotel",
    title: "ホテルチェックイン",
    icon: "🏨",
    desc: "予約を確認し、朝食時間とWi-Fiを聞いて鍵を受け取る",
    turns: [
      { speaker: "them", name: "レセプション", it: "Buonasera, benvenuti! Avete una prenotazione?", ja: "こんばんは、ようこそ!ご予約はございますか?", kana: "ブオナセーラ ベンヴェヌーティ アヴェーテ ウナ プレノタツィオーネ" },
      { speaker: "you", hint: "鈴木の名前で予約している、と伝えよう",
        it: "Sì, abbiamo una prenotazione a nome Suzuki.", ja: "はい、鈴木の名前で予約しています", kana: "シー アッビアーモ ウナ プレノタツィオーネ ア ノーメ スズキ" },
      { speaker: "them", name: "レセプション", it: "Un attimo... ecco, camera trecentocinque, due notti.", ja: "少々お待ちを…はい、305号室で2泊ですね", kana: "ウナッティモ エッコ カメラ トレチェントチンクエ ドゥーエ ノッティ" },
      { speaker: "you", hint: "朝食は何時か尋ねてみよう",
        it: "A che ora è la colazione?", ja: "朝食は何時ですか?", kana: "ア ケ オーラ エ ラ コラツィオーネ" },
      { speaker: "them", name: "レセプション", it: "Dalle sette alle dieci, al piano terra.", ja: "7時から10時まで、1階でご用意しています", kana: "ダッレ セッテ アッレ ディエチ アル ピアーノ テッラ" },
      { speaker: "you", hint: "Wi-Fiのパスワードを聞いてみよう",
        it: "Qual è la password del Wi-Fi?", ja: "Wi-Fiのパスワードは何ですか?", kana: "クアル エ ラ パスワード デル ウィーフィ" },
      { speaker: "them", name: "レセプション", it: "È scritta sulla chiave: hotelroma2026.", ja: "鍵に書いてあります、hotelroma2026です", kana: "エ スクリッタ スッラ キアーヴェ オテルローマ ドゥエミラヴェンティセイ" },
      { speaker: "you", hint: "鍵を受け取って、お礼を言おう",
        it: "Grazie mille, molto gentile.", ja: "どうもありがとうございます、ご親切に", kana: "グラツィエ ミッレ モルト ジェンティーレ" },
      { speaker: "them", name: "レセプション", it: "Ecco la sua chiave. Buon soggiorno a Roma!", ja: "こちらが鍵です。ローマでの滞在をお楽しみください!", kana: "エッコ ラ スア キアーヴェ ブォン ソッジョルノ ア ローマ" }
    ]
  },
  {
    id: "aiuto",
    title: "困ったとき",
    icon: "🆘",
    desc: "道を尋ね、ゆっくり話してもらい、トイレの場所も確認する",
    turns: [
      { speaker: "you", hint: "すみません、と道行く人に声をかけてみよう",
        it: "Mi scusi, può aiutarmi?", ja: "すみません、助けていただけますか?", kana: "ミ スクージ プオ アイウタルミ" },
      { speaker: "them", name: "通行人", it: "Certo, dica pure!", ja: "もちろんです、どうぞ!", kana: "チェルト ディーカ プーレ" },
      { speaker: "you", hint: "コロッセオへの道を尋ねてみよう",
        it: "Come si arriva al Colosseo?", ja: "コロッセオへはどう行けばいいですか?", kana: "コーメ シ アッリーヴァ アル コロッセオ" },
      { speaker: "them", name: "通行人", it: "Deve andare dritto e poi girare a destra al semaforo.", ja: "まっすぐ行って、それから信号を右に曲がってください", kana: "デーヴェ アンダーレ ドリット エ ポイ ジラーレ ア デストラ アル セマーフォロ" },
      { speaker: "you", hint: "聞き取れなかったので、ゆっくり話してもらうよう頼もう",
        it: "Mi scusi, può parlare più lentamente?", ja: "すみません、もっとゆっくり話していただけますか?", kana: "ミ スクージ プオ パルラーレ ピュー レンタメンテ" },
      { speaker: "them", name: "通行人", it: "Certo! Dritto, poi a destra al semaforo.", ja: "もちろん!まっすぐ、それから信号を右です", kana: "チェルト ドリット ポイ ア デストラ アル セマーフォロ" },
      { speaker: "you", hint: "一番近いトイレはどこか尋ねてみよう",
        it: "Scusi, dov'è il bagno più vicino?", ja: "すみません、一番近いトイレはどこですか?", kana: "スクージ ドヴェ イル バーニョ ピュー ヴィチーノ" },
      { speaker: "them", name: "通行人", it: "C'è un bar qui vicino, può usare quello.", ja: "すぐ近くにバールがあるので、そこを使えますよ", kana: "チェ ウン バール クイ ヴィチーノ プオ ウザーレ クエッロ" },
      { speaker: "you", hint: "お礼を言って締めくくろう",
        it: "Grazie mille, è stato molto gentile!", ja: "どうもありがとうございます、とても親切にしていただきました!", kana: "グラツィエ ミッレ エ スタート モルト ジェンティーレ" }
    ]
  }
];
