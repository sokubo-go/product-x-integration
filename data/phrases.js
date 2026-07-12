// data/phrases.js — Voyage フレーズデータ(7カテゴリ)
window.PHRASES_DATA = [
  {
    id: "greetings",
    name: "あいさつ・基本",
    icon: "👋",
    description: "まずはここから。笑顔と Bonjour で旅が変わる",
    phrases: [
      {
        fr: "Bonjour !",
        ja: "こんにちは(おはようございます)",
        kana: "ボンジュール",
        note: "店に入ったら必ず言う。言わないと無愛想な客扱いに"
      },
      {
        fr: "Bonsoir !",
        ja: "こんばんは",
        kana: "ボンソワール",
        note: "夕方18時頃を境に Bonjour からこちらへ切り替わる"
      },
      {
        fr: "Merci beaucoup.",
        ja: "どうもありがとうございます",
        kana: "メルシー ボク"
      },
      {
        fr: "S'il vous plaît.",
        ja: "お願いします",
        kana: "シル ヴ プレ",
        note: "何にでも添えられる万能フレーズ。語尾につけるだけで丁寧に"
      },
      {
        fr: "Excusez-moi.",
        ja: "すみません",
        kana: "エクスキュゼ モワ",
        note: "人に声をかける時も、軽くぶつかった時もこれ一つ"
      },
      {
        fr: "Pardon.",
        ja: "ごめんなさい / すみません",
        kana: "パルドン"
      },
      {
        fr: "Oui.",
        ja: "はい",
        kana: "ウィ"
      },
      {
        fr: "Non, merci.",
        ja: "いいえ、結構です",
        kana: "ノン メルシー",
        note: "勧誘や物売りをやんわり断る時に使う定番の一言"
      },
      {
        fr: "Au revoir !",
        ja: "さようなら",
        kana: "オ ルヴォワール",
        note: "店を出る時にも Merci, au revoir ! と言うと印象が良い"
      },
      {
        fr: "Comment allez-vous ?",
        ja: "お元気ですか?",
        kana: "コマン タレ ヴ"
      },
      {
        fr: "Je m'appelle Sakura.",
        ja: "私はサクラといいます",
        kana: "ジュ マペル サクラ"
      },
      {
        fr: "Parlez-vous anglais ?",
        ja: "英語を話せますか?",
        kana: "パルレ ヴ ザングレ",
        note: "フランス語より先にこれを聞くと会話がスムーズになる"
      }
    ]
  },
  {
    id: "cafe",
    name: "カフェ・レストラン",
    icon: "☕",
    description: "テラス席で一杯。パリの時間はここから流れ出す",
    phrases: [
      {
        fr: "Une table pour deux, s'il vous plaît.",
        ja: "2名でお願いします",
        kana: "ユヌ タブル プール ドゥ シル ヴ プレ"
      },
      {
        fr: "Je voudrais un café, s'il vous plaît.",
        ja: "コーヒーをください",
        kana: "ジュ ヴドレ アン カフェ シル ヴ プレ",
        note: "café だけ頼むとエスプレッソが出てくるので注意"
      },
      {
        fr: "L'addition, s'il vous plaît.",
        ja: "お会計をお願いします",
        kana: "ラディシオン シル ヴ プレ",
        note: "フランスでは会計は必ず自分から頼む。黙って待っても来ない"
      },
      {
        fr: "Qu'est-ce que vous recommandez ?",
        ja: "おすすめは何ですか?",
        kana: "ケス ク ヴ ルコマンデ"
      },
      {
        fr: "C'est délicieux !",
        ja: "とても美味しいです!",
        kana: "セ デリシュー"
      },
      {
        fr: "Je suis allergique aux fruits de mer.",
        ja: "私は魚介類アレルギーです",
        kana: "ジュ スイ ザレルジック オ フリュイ ドゥ メール",
        note: "allergique の後を入れ替えれば他の食材にも応用できる便利文"
      },
      {
        fr: "Sans gluten, s'il vous plaît.",
        ja: "グルテン抜きでお願いします",
        kana: "サン グルテン シル ヴ プレ"
      },
      {
        fr: "Un verre de vin rouge, s'il vous plaît.",
        ja: "赤ワインを一杯ください",
        kana: "アン ヴェール ドゥ ヴァン ルージュ シル ヴ プレ"
      },
      {
        fr: "C'est pour emporter.",
        ja: "持ち帰りでお願いします",
        kana: "セ プール アンポルテ",
        note: "カウンターより窓際・テラス席の方が料金が高いカフェもある"
      },
      {
        fr: "Le service est-il compris ?",
        ja: "サービス料は含まれていますか?",
        kana: "ル セルヴィス エティル コンプリ",
        note: "フランスは通常サービス料込み。チップは義務ではなく気持ち程度でOK"
      },
      {
        fr: "Est-ce que je peux avoir un peu plus de pain ?",
        ja: "パンをもう少しいただけますか?",
        kana: "エス ク ジュ プ アヴォワール アン プ プリュス ドゥ パン",
        note: "バゲットのおかわりは無料で頼めることが多い"
      },
      {
        fr: "Je réserve une table pour ce soir.",
        ja: "今夜のテーブルを予約したいです",
        kana: "ジュ レゼルヴ ユヌ タブル プール ス ソワール"
      }
    ]
  },
  {
    id: "hotel",
    name: "ホテル",
    icon: "🏨",
    description: "旅の拠点、扉を開けた瞬間からもてなしは始まる",
    phrases: [
      {
        fr: "J'ai une réservation au nom de Sakura.",
        ja: "サクラの名前で予約しています",
        kana: "ジェ ユヌ レゼルヴァシオン オ ノン ドゥ サクラ"
      },
      {
        fr: "À quelle heure est le check-in ?",
        ja: "チェックインは何時ですか?",
        kana: "ア ケル ウール エ ル シェックイン"
      },
      {
        fr: "Est-ce que le petit-déjeuner est inclus ?",
        ja: "朝食は含まれていますか?",
        kana: "エス ク ル プティ デジュネ エ アンクリュ",
        note: "近くのブーランジェリーでクロワッサンを買う方が安く済むことも多い"
      },
      {
        fr: "Puis-je avoir le Wi-Fi, s'il vous plaît ?",
        ja: "Wi-Fiを教えていただけますか?",
        kana: "ピュイ ジュ アヴォワール ル ウィフィ シル ヴ プレ"
      },
      {
        fr: "Il n'y a pas d'eau chaude.",
        ja: "お湯が出ません",
        kana: "イル ニ ヤ パ ド ショード"
      },
      {
        fr: "Pourriez-vous m'appeler un taxi ?",
        ja: "タクシーを呼んでいただけますか?",
        kana: "プーリエ ヴ マプレ アン タクシ"
      },
      {
        fr: "La climatisation ne fonctionne pas.",
        ja: "エアコンが動きません",
        kana: "ラ クリマティザシオン ヌ フォンクシオンヌ パ",
        note: "夏でもエアコン非設置の古いホテルが多いので予約時の確認が肝心"
      },
      {
        fr: "Je voudrais garder mes bagages jusqu'à ce soir.",
        ja: "夜まで荷物を預かってほしいです",
        kana: "ジュ ヴドレ ギャルデ メ バガージュ ジュスカ ス ソワール",
        note: "チェックアウト後も荷物預かりは無料が基本。遠慮せず頼める"
      },
      {
        fr: "À quelle heure dois-je libérer la chambre ?",
        ja: "チェックアウトは何時ですか?",
        kana: "ア ケル ウール ドワ ジュ リベレ ラ シャンブル",
        note: "通常11〜12時。遅めの出発なら早めにレイトチェックアウトを交渉しておくと安心"
      },
      {
        fr: "Pouvez-vous me réveiller à sept heures ?",
        ja: "7時にモーニングコールをお願いできますか?",
        kana: "プヴェ ヴ ム レヴェイエ ア セット ウール"
      },
      {
        fr: "Je voudrais changer de chambre.",
        ja: "部屋を替えていただきたいです",
        kana: "ジュ ヴドレ シャンジェ ドゥ シャンブル"
      },
      {
        fr: "Où puis-je trouver un distributeur de billets ?",
        ja: "ATMはどこにありますか?",
        kana: "ウ ピュイ ジュ トゥルヴェ アン ディストリビュトゥール ドゥ ビエ",
        note: "現地では ATM より distributeur(略して DAB)と呼ぶ方が通じやすい"
      }
    ]
  },
  {
    id: "shopping",
    name: "買い物",
    icon: "🛍️",
    description: "マルシェの香り、ブティックの輝き。パリは五感で買い物する街",
    phrases: [
      {
        fr: "Je regarde, merci.",
        ja: "見ているだけです、ありがとう",
        kana: "ジュ ルギャルド メルシー",
        note: "店員に話しかけられた時の定番の返し。冷たくなく断れる"
      },
      {
        fr: "Combien ça coûte ?",
        ja: "これはいくらですか?",
        kana: "コンビヤン サ クート"
      },
      {
        fr: "Est-ce que je peux l'essayer ?",
        ja: "試着してもいいですか?",
        kana: "エス ク ジュ プ レセイエ"
      },
      {
        fr: "Avez-vous une taille plus grande ?",
        ja: "もう少し大きいサイズはありますか?",
        kana: "アヴェ ヴ ユヌ タイユ プリュ グランド"
      },
      {
        fr: "Je le prends.",
        ja: "これをください(買います)",
        kana: "ジュ ル プラン",
        note: "レジで店員が Voulez-vous un sac ? と聞くのはレジ袋有料化のため"
      },
      {
        fr: "Vous acceptez la carte bancaire ?",
        ja: "カードは使えますか?",
        kana: "ヴ ザクセプテ ラ カルト バンケール",
        note: "小さな店では少額決済にカード利用の最低金額が設定されていることがある"
      },
      {
        fr: "Pouvez-vous me faire un paquet cadeau ?",
        ja: "ギフト包装をお願いできますか?",
        kana: "プヴェ ヴ ム フェール アン パケ カドー"
      },
      {
        fr: "Le marché ouvre à quelle heure ?",
        ja: "市場は何時に開きますか?",
        kana: "ル マルシェ ウーヴル ア ケル ウール",
        note: "パリの朝市は昼過ぎに閉まる店が多い。午前中の訪問が狙い目"
      },
      {
        fr: "Un kilo de ces pommes, s'il vous plaît.",
        ja: "このりんごを1キロください",
        kana: "アン キロ ドゥ セ ポム シル ヴ プレ"
      },
      {
        fr: "Où est la cabine d'essayage ?",
        ja: "試着室はどこですか?",
        kana: "ウ エ ラ カビヌ デセイヤージュ"
      },
      {
        fr: "Je voudrais un formulaire de détaxe.",
        ja: "免税書類をお願いします",
        kana: "ジュ ヴドレ アン フォルミュレール ドゥ デタクス",
        note: "EU圏外に住む旅行者は一定額以上の買い物で免税が受けられる"
      },
      {
        fr: "C'est trop cher pour moi.",
        ja: "私には高すぎます",
        kana: "セ トロ シェール プール モワ",
        note: "通常の店での値引き交渉は一般的ではない。蚤の市(ブロカント)なら別"
      }
    ]
  },
  {
    id: "transport",
    name: "交通",
    icon: "🚇",
    description: "メトロの扉が開くたび、街の顔が変わる。移動もまた旅の醍醐味",
    phrases: [
      {
        fr: "Un ticket pour le centre-ville, s'il vous plaît.",
        ja: "市内までの切符を1枚ください",
        kana: "アン ティケ プール ル サントル ヴィル シル ヴ プレ",
        note: "1枚ずつより回数券(carnet)で10枚まとめて買う方が割安"
      },
      {
        fr: "Où est la station de métro la plus proche ?",
        ja: "一番近い地下鉄駅はどこですか?",
        kana: "ウ エ ラ スタシオン ドゥ メトロ ラ プリュ プロシュ"
      },
      {
        fr: "Ce train va bien à Lyon ?",
        ja: "この電車はリヨン行きで合っていますか?",
        kana: "ス トラン ヴァ ビヤン ア リヨン",
        note: "プラットホームは出発直前に変更されることがあるので電光掲示板を最後まで確認"
      },
      {
        fr: "Je voudrais un billet aller-retour.",
        ja: "往復切符をお願いします",
        kana: "ジュ ヴドレ アン ビエ アレ ルトゥール"
      },
      {
        fr: "À quelle heure part le prochain bus ?",
        ja: "次のバスは何時に出ますか?",
        kana: "ア ケル ウール パール ル プロシャン ビュス"
      },
      {
        fr: "Pouvez-vous m'indiquer sur le plan ?",
        ja: "地図で示していただけますか?",
        kana: "プヴェ ヴ マンディケ シュール ル プラン"
      },
      {
        fr: "Je descends au prochain arrêt.",
        ja: "次の停留所で降ります",
        kana: "ジュ デサン オ プロシャン アレ"
      },
      {
        fr: "Combien de temps pour aller à la tour Eiffel ?",
        ja: "エッフェル塔までどのくらいかかりますか?",
        kana: "コンビヤン ドゥ タン プール アレ ア ラ トゥール エッフェル"
      },
      {
        fr: "Le compostage est-il obligatoire ?",
        ja: "刻印(改札の打刻)は必要ですか?",
        kana: "ル コンポスタージュ エティル オブリガトワール",
        note: "地方の在来線は乗車前に黄色い機械で切符に刻印が必須。忘れると罰金の対象に"
      },
      {
        fr: "Appelez-moi un taxi, s'il vous plaît.",
        ja: "タクシーを呼んでください",
        kana: "アプレ モワ アン タクシ シル ヴ プレ",
        note: "路上で無許可の客引きに声をかけられることがある。正規のタクシー乗り場か配車アプリが安全"
      },
      {
        fr: "Je me suis trompé de direction.",
        ja: "方向を間違えました",
        kana: "ジュ ム スイ トロンペ ドゥ ディレクシオン"
      },
      {
        fr: "Est-ce que ce quai est pour Versailles ?",
        ja: "このホームはヴェルサイユ行きですか?",
        kana: "エス ク ス ケ エ プール ヴェルサイユ",
        note: "RERは同じ路線でも行き先が分岐する。乗車前に電光掲示の最終駅名を必ず確認"
      }
    ]
  },
  {
    id: "sightseeing",
    name: "観光",
    icon: "🗼",
    description: "石畳の先に広がる景色。カメラより先に心が動く瞬間を",
    phrases: [
      {
        fr: "Où se trouve l'office de tourisme ?",
        ja: "観光案内所はどこにありますか?",
        kana: "ウ ス トルーヴ ロフィス ドゥ トゥーリスム"
      },
      {
        fr: "Un billet, s'il vous plaît.",
        ja: "チケットを1枚ください",
        kana: "アン ビエ シル ヴ プレ"
      },
      {
        fr: "Y a-t-il une réduction pour les étudiants ?",
        ja: "学生割引はありますか?",
        kana: "イ アティル ユヌ レデュクシオン プール レ ゼテュディアン",
        note: "EU居住の26歳未満は国立美術館が無料になることも。パスポートで年齢を提示"
      },
      {
        fr: "Est-ce que je peux prendre une photo ?",
        ja: "写真を撮ってもいいですか?",
        kana: "エス ク ジュ プ プランドル ユヌ フォト",
        note: "美術館では作品によりフラッシュ・撮影禁止の表示がある。必ず確認を"
      },
      {
        fr: "Pourriez-vous nous prendre en photo ?",
        ja: "私たちの写真を撮っていただけますか?",
        kana: "プーリエ ヴ ヌ プランドル アン フォト"
      },
      {
        fr: "À quelle heure ferme le musée ?",
        ja: "美術館は何時に閉まりますか?",
        kana: "ア ケル ウール フェルム ル ミュゼ",
        note: "多くの美術館は月または火曜が休館日。訪問前の確認が必須"
      },
      {
        fr: "Y a-t-il une visite guidée en anglais ?",
        ja: "英語のガイドツアーはありますか?",
        kana: "イ アティル ユヌ ヴィジット ギデ アン ナングレ"
      },
      {
        fr: "C'est magnifique !",
        ja: "素晴らしいですね!",
        kana: "セ マニフィック"
      },
      {
        fr: "Où sont les toilettes ?",
        ja: "お手洗いはどこですか?",
        kana: "ウ ソン レ トワレット",
        note: "有料トイレも多い。小銭を常に用意しておくと安心"
      },
      {
        fr: "Est-ce que l'entrée est gratuite le premier dimanche ?",
        ja: "第一日曜日は入場無料ですか?",
        kana: "エス ク ラントレ エ グラチュイット ル プルミエ ディマンシュ",
        note: "国立美術館の多くは毎月第一日曜が無料。旅程を合わせる価値あり"
      },
      {
        fr: "Combien de temps dure la visite ?",
        ja: "見学にはどれくらい時間がかかりますか?",
        kana: "コンビヤン ドゥ タン デュール ラ ヴィジット",
        note: "ルーヴルは全展示を見ようとすると数日かかる規模。事前に見どころを絞るのが吉"
      }
    ]
  },
  {
    id: "emergency",
    name: "緊急・トラブル",
    icon: "🆘",
    description: "備えあれば憂いなし。いざという時にすっと出る一言が旅を守る",
    phrases: [
      {
        fr: "Au secours !",
        ja: "助けて!",
        kana: "オ スクール"
      },
      {
        fr: "Appelez la police, s'il vous plaît !",
        ja: "警察を呼んでください!",
        kana: "アプレ ラ ポリス シル ヴ プレ"
      },
      {
        fr: "Appelez une ambulance !",
        ja: "救急車を呼んでください!",
        kana: "アプレ ユヌ アンビュランス",
        note: "EU共通の緊急番号112はどの携帯からでも無料でつながる"
      },
      {
        fr: "On m'a volé mon sac.",
        ja: "カバンを盗まれました",
        kana: "オン マ ヴォレ モン サック",
        note: "観光地・メトロ内はスリが多発。斜めがけバッグは前に抱えるのが基本"
      },
      {
        fr: "J'ai perdu mon passeport.",
        ja: "パスポートを失くしました",
        kana: "ジェ ペルデュ モン パスポール",
        note: "紛失時は現地警察で証明書を発行してもらい、大使館へ。コピーの携行が命綱"
      },
      {
        fr: "Je ne me sens pas bien.",
        ja: "気分が悪いです",
        kana: "ジュ ヌ ム サン パ ビヤン"
      },
      {
        fr: "Où est l'hôpital le plus proche ?",
        ja: "一番近い病院はどこですか?",
        kana: "ウ エ ロピタル ル プリュ プロシュ",
        note: "軽い体調不良なら緑十字のマークの薬局(pharmacie)でまず相談できる"
      },
      {
        fr: "J'ai besoin d'un médecin.",
        ja: "医者が必要です",
        kana: "ジェ ブゾワン ダン メドサン"
      },
      {
        fr: "Laissez-moi tranquille !",
        ja: "放っておいてください!",
        kana: "レッセ モワ トランキル",
        note: "しつこい勧誘・物乞いを強く拒む時の決め台詞。声の大きさも大事"
      },
      {
        fr: "Je voudrais signaler un vol.",
        ja: "盗難届を出したいです",
        kana: "ジュ ヴドレ シニャレ アン ヴォル"
      },
      {
        fr: "Pouvez-vous m'aider, s'il vous plaît ?",
        ja: "助けていただけますか?",
        kana: "プヴェ ヴ メデ シル ヴ プレ"
      },
      {
        fr: "Je suis perdu(e).",
        ja: "道に迷いました",
        kana: "ジュ スイ ペルデュ",
        note: "男性は perdu、女性は perdue と発音は同じでも綴りが変わる"
      }
    ]
  },
  {
    id: "numbers",
    name: "数字・お金・時刻",
    icon: "🔢",
    description: "数える、払う、時間を尋ねる。旅の実務をスマートにこなす数字たち",
    phrases: [
      {
        fr: "Un, deux, trois, quatre, cinq, six, sept, huit, neuf, dix.",
        ja: "1、2、3、4、5、6、7、8、9、10",
        kana: "アン ドゥ トロワ キャトル サンク シス セット ユイット ヌフ ディス",
        note: "six と dix は単独では「シス」「ディス」。フランスでは指を折るとき親指から数え始めるのが一般的"
      },
      {
        fr: "C'est combien, s'il vous plaît ?",
        ja: "おいくらですか?",
        kana: "セ コンビヤン シル ヴ プレ"
      },
      {
        fr: "Est-ce que je peux payer par carte ?",
        ja: "カードで払えますか?",
        kana: "エス ク ジュ プ ペイエ パール カルト"
      },
      {
        fr: "Seulement en espèces ?",
        ja: "現金のみですか?",
        kana: "スルマン アン ネスペス",
        note: "小さなカフェや市場の屋台では今もカード不可・現金のみの店が残る"
      },
      {
        fr: "Le reçu, s'il vous plaît.",
        ja: "レシートをください",
        kana: "ル ルス シル ヴ プレ"
      },
      {
        fr: "On partage en deux ?",
        ja: "半分こにできますか?",
        kana: "オン パルタージュ アン ドゥ",
        note: "支払いを割り勘にする時も、料理をシェアする時にも使える便利な一言"
      },
      {
        fr: "Quelle heure est-il ?",
        ja: "今何時ですか?",
        kana: "ケル ウール エティル"
      },
      {
        fr: "Vous ouvrez et vous fermez à quelle heure ?",
        ja: "何時に開いて、何時に閉まりますか?",
        kana: "ヴ ゾーヴレ エ ヴ フェルメ ア ケル ウール",
        note: "vous ouvrez はリエゾンで「ヴ ゾーヴレ」と z の音が挟まる"
      },
      {
        fr: "La réservation est à vingt heures.",
        ja: "予約は20時です",
        kana: "ラ レゼルヴァシオン エタ ヴァントゥール",
        note: "フランスでは時刻を24時間表記で言うのが一般的。20時=vingt heures はリエゾンで「ヴァントゥール」"
      },
      {
        fr: "Nous sommes deux.",
        ja: "2名です",
        kana: "ヌ ソム ドゥ"
      },
      {
        fr: "Ça fait combien en tout ?",
        ja: "全部でいくらですか?",
        kana: "サ フェ コンビヤン アン トゥ"
      },
      {
        fr: "Vous avez la monnaie ?",
        ja: "小銭はありますか?",
        kana: "ヴ ザヴェ ラ モネ",
        note: "高額紙幣は少額の会計だと断られることがある。早めに小銭を崩しておくと安心"
      }
    ]
  },
  {
    id: "smalltalk",
    name: "会話をつなぐ一言",
    icon: "💬",
    description: "一言添えるだけで、会話がふっとほどける。相槌と質問の魔法",
    phrases: [
      {
        fr: "C'est incroyable !",
        ja: "すごい!",
        kana: "セ タンクロワイヤブル",
        note: "c'est incroyable はリエゾンで「セ タンクロワイヤブル」と t の音が挟まる"
      },
      {
        fr: "Comme c'est joli !",
        ja: "きれい!",
        kana: "コム セ ジョリ"
      },
      {
        fr: "Ça a l'air délicieux !",
        ja: "おいしそう!",
        kana: "サ ア ラール デリシュー",
        note: "délicieux は男性形。女性名詞(tarte、soupe など)には délicieuse を使う"
      },
      {
        fr: "Vraiment ?",
        ja: "本当ですか?",
        kana: "ヴレマン"
      },
      {
        fr: "Bien sûr !",
        ja: "もちろん!",
        kana: "ビヤン シュール"
      },
      {
        fr: "Un instant, s'il vous plaît.",
        ja: "ちょっと待ってください",
        kana: "アン ナンスタン シル ヴ プレ",
        note: "un instant はリエゾンで「アン ナンスタン」と n の音が挟まる"
      },
      {
        fr: "Pourriez-vous parler plus lentement ?",
        ja: "もう少しゆっくりお願いします",
        kana: "プーリエ ヴ パルレ プリュ ラントマン"
      },
      {
        fr: "Pouvez-vous répéter, s'il vous plaît ?",
        ja: "もう一度言ってください",
        kana: "プヴェ ヴ レペテ シル ヴ プレ",
        note: "Pardon ? だけでも通じるが、この一文の方が丁寧でゆっくり話してもらいやすい"
      },
      {
        fr: "Je ne parle qu'un peu français.",
        ja: "フランス語は少しだけ話せます",
        kana: "ジュ ヌ パルル カン プ フランセ"
      },
      {
        fr: "Je viens du Japon.",
        ja: "日本から来ました",
        kana: "ジュ ヴィヤン デュ ジャポン"
      },
      {
        fr: "Qu'est-ce que vous me conseillez ?",
        ja: "おすすめはどれですか?",
        kana: "ケス ク ヴ ム コンセイエ",
        note: "recommander(客観的なおすすめ)より conseiller の方が「あなたの個人的な意見」を尋ねるニュアンスで、会話が弾みやすい"
      }
    ]
  },
  {
    id: "romance",
    name: "ふたりの旅",
    icon: "💐",
    description: "ふたりだけの時間に。乾杯の言葉から、心に残るひとことまで",
    phrases: [
      {
        fr: "Trinquons à nous !",
        ja: "乾杯、私たちに",
        kana: "トランコン ア ヌ",
        note: "グラスを合わせる時は必ず相手の目を見るのがフランス流の乾杯マナー"
      },
      {
        fr: "Pourriez-vous prendre une photo de nous deux ?",
        ja: "ふたりの写真を撮ってもらえますか?",
        kana: "プーリエ ヴ プランドル ユヌ フォト ドゥ ヌ ドゥ"
      },
      {
        fr: "Je vous présente mon mari.",
        ja: "夫を紹介します(妻の場合は ma femme)",
        kana: "ジュ ヴ プレザント モン マリ",
        note: "女性のパートナーを紹介する時は mon mari を ma femme に置き換えるだけでよい"
      },
      {
        fr: "C'est notre anniversaire de mariage.",
        ja: "結婚記念日なんです",
        kana: "セ ノートル アニヴェルセール ドゥ マリアージュ",
        note: "レストランで記念日だと伝えると、デザートに一工夫添えてくれる店もある。押し付けにならない程度にさりげなく伝えるのが吉"
      },
      {
        fr: "Je suis heureux(se) d'être venu(e) ici avec toi.",
        ja: "あなたと来られてよかった",
        kana: "ジュ スイ ウルー デートル ヴニュ イシ アヴェック トワ"
      },
      {
        fr: "Je t'aime.",
        ja: "愛してる",
        kana: "ジュ テーム",
        note: "tu で話す相手専用の言葉。恋人・配偶者にはこちら、目上の人には使わない"
      },
      {
        fr: "Cette table a-t-elle vue sur le coucher de soleil ?",
        ja: "この席は夕日が見えますか?",
        kana: "セット タブル ア テル ヴュ シュール ル クシェ ドゥ ソレイユ",
        note: "avoir vue sur ~ で「~を見渡せる」という意味。窓際・テラス席を頼む時に添えたい一言"
      },
      {
        fr: "On partage ce dessert tous les deux ?",
        ja: "このデザートをふたりでシェアしましょうか?",
        kana: "オン パルタージュ ス デセール トゥ レ ドゥ"
      },
      {
        fr: "Tu es magnifique ce soir.",
        ja: "今夜の君はとても素敵だよ",
        kana: "テュ エ マニフィック ス ソワール"
      },
      {
        fr: "Cette vue restera gravée dans nos souvenirs.",
        ja: "この景色はふたりの思い出にずっと残るね",
        kana: "セット ヴュ レストラ グラヴェ ダン ノ スヴニール"
      },
      {
        fr: "À nous deux, pour toujours.",
        ja: "ふたりでずっと、これからも",
        kana: "ア ヌ ドゥ プール トゥジュール"
      }
    ]
  }
];
