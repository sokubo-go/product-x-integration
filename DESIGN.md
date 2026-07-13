# Voyage — 旅するフランス語 🇫🇷

**設計: Claude Fable 5 / 実装: Claude Opus + Claude Sonnet(マルチエージェント)**

フランス旅行を最高に楽しむための、フランス語フレーズ & フランス文化アプリ。
ビルド不要の純粋な静的 SPA。`index.html` を開くだけで動く。

## コンセプト

「勉強」ではなく「旅の予感」。開いた瞬間にパリの空気を感じ、
声に出したくなり、旅先で本当に使える——そんな体験を目指す。

- UI は日本語、学ぶのはフランス語(カタカナ発音つき)
- Web Speech API(fr-FR)でネイティブ発音を再生
- お気に入り・クイズ成績は localStorage に保存
- 外部依存ゼロ・オフラインで動作(音声合成はブラウザ内蔵)

## 画面構成(タブナビゲーション)

1. **ホーム** — ヒーロー(パリの夜明けグラデーション)、「今日のフレーズ」(日付でローテーション)、各セクションへの導線
2. **フレーズ集** — カテゴリ別フレーズカード。仏語 / 日本語 / カタカナ / 音声ボタン / お気に入り☆
3. **文化ガイド** — マナー・食・暮らし・旅のコツの読み物カード(モーダルで全文)
4. **クイズ** — フレーズデータから出題。意味当て & リスニング。10問、スコアと称賛演出

## ファイル構成と担当

| ファイル | 内容 | 担当 |
|---|---|---|
| `index.html` | アプリシェル、全セクションの骨格 | Opus |
| `css/style.css` | デザインシステム一式 | Opus |
| `js/app.js` | ナビ、フレーズ/文化の描画、音声、お気に入り、テーマ | Opus |
| `data/phrases.js` | フレーズデータ(7カテゴリ×約10句) | Sonnet |
| `data/culture.js` | 文化記事(約12本) | Sonnet |
| `js/quiz.js` | クイズエンジン | Sonnet |

読み込み順: `data/phrases.js` → `data/culture.js` → `js/quiz.js` → `js/app.js`

## デザイン言語

- 世界観: パリの朝。クリーム地に深紺・トリコロールの差し色・金のアクセント
- 見出しはセリフ体(Georgia 系)でフレンチシックに、本文はシステムサンセリフ
- ライト/ダークテーマ対応(`data-theme` 属性 + `prefers-color-scheme`)
- マイクロインタラクション: カードのホバー浮遊、音声再生中の波紋、クイズ正解の祝福

### CSS カスタムプロパティ契約(全モジュール共通)

```css
:root {
  --bg;        /* ページ背景 */
  --surface;   /* カード背景 */
  --ink;       /* 本文色 */
  --ink-soft;  /* 補助テキスト */
  --line;      /* 罫線 */
  --accent;    /* 深紺(主アクセント) */
  --accent-2;  /* 赤(トリコロール) */
  --gold;      /* 金 */
  --radius;    /* カード角丸 */
  --shadow;    /* カード影 */
}
```

共通クラス: `.card`(カード)、`.btn`(ボタン)、`.btn-primary`(主ボタン)、`.chip`(タグ)

## データ契約

### `data/phrases.js`

```js
window.PHRASES_DATA = [
  {
    id: "greetings",            // 英小文字スラッグ
    name: "あいさつ・基本",       // 日本語カテゴリ名
    icon: "👋",
    description: "まずはここから。笑顔と Bonjour で旅が変わる",
    phrases: [
      {
        fr: "Bonjour !",         // フランス語(正しい綴り・句読点)
        ja: "こんにちは",          // 日本語訳
        kana: "ボンジュール",      // カタカナ発音
        note: "入店時に言わないと失礼になる魔法の言葉" // 任意: 一言メモ
      }
    ]
  }
]
```

カテゴリ(7つ、この順): greetings / cafe(カフェ・レストラン)/ hotel(ホテル)/ shopping(買い物)/ transport(交通)/ sightseeing(観光)/ emergency(緊急・トラブル)

### `data/culture.js`

```js
window.CULTURE_DATA = [
  {
    id: "bonjour-rule",
    title: "Bonjour の魔法",
    icon: "✨",
    category: "マナー",           // マナー | 食 | 暮らし | 旅のコツ
    summary: "1〜2文の要約(カード表示用)",
    body: ["段落1", "段落2", "段落3"],  // 2〜4段落
    phrase: { fr: "...", ja: "...", kana: "..." }  // 任意: 関連フレーズ
  }
]
```

### `data/photos.js`

```js
window.PHOTOS_DATA = [
  {
    id: "eiffel",
    wiki: "Eiffel_Tower",        // 英語版 Wikipedia のページタイトル(URLエンコード前)
    name: "エッフェル塔",
    place: "パリ",
    caption: "夕暮れ、シャン・ド・マルスの芝生から見上げる鉄の貴婦人",
    emoji: "🗼",                  // フォールバックタイル用
    grad: ["#2a2350", "#c96f4a"], // フォールバックタイルのグラデーション2色
    cultureId: null               // 文化記事と紐づく場合はその id
  }
]
```

写真の実体は同梱しない。閲覧時に Wikipedia REST API
(`https://en.wikipedia.org/api/rest_v1/page/summary/<wiki>`、CORS 対応)から
リード画像を取得し、`thumbnail.source` の `/320px-` を `/1200px-` に置換して表示。
取得失敗・オフライン時は grad + emoji + caption のタイルが常に下地として表示され、
アプリは決して壊れて見えない。ライトボックスには出典として Wikipedia 記事への
リンクを必ず表示する。

### `js/quiz.js`

```js
window.Quiz = {
  // container: DOM要素。PHRASES_DATA を使って10問のクイズUIを描画。
  // speak: (frenchText) => void  — 音声再生コールバック(app.js が提供)
  init(container, phrasesData, speak) { ... }
}
```

- 出題形式は2種を混合: ①仏語 → 意味を4択 ②リスニング(音声を聞いて意味を4択)
- 進捗バー、即時フィードバック(正解/不正解 + 正しい答え)、最終スコア画面
- スコアに応じた仏語の称賛メッセージ(例: Parfait ! / Très bien ! / Bon courage !)
- ベストスコアを localStorage(`voyage.quiz.best`)に保存
- スタイルは CSS 変数契約に従い、`.quiz-root` スコープで `<style>` を自己注入

## 観光ガイド(guide.html)

現地を歩きながら使う1日観光ガイド。ヴェルサイユ宮殿(パスポートチケット=全域アクセス前提)、
コンコルド広場、シャンゼリゼ、凱旋門。本体アプリと同じデザインシステムを継承しつつ、
「読み物」ではなく「現地での相棒」として設計する。

### 体験設計の原則

1. **順路が主役**: スポットごとに歩く順のストップカード列。「いま目の前にあるもの」単位
2. **3層の情報密度**: ①ヘッドライン1行(歩きながら) → ②見どころ箇条書き(立ち止まって30秒) → ③物語・歴史(ベンチで2分)。③は折りたたみで既定は閉
3. **チェックオフ**: 各ストップに「見た✓」。進捗が残る(localStorage voyage.guide.visited)。旅の達成感を演出
4. **片手・屋外**: 大きなタップ領域、高コントラスト、スティッキーなスポット内ナビ、日光下でも読める配色
5. **オフライン完全動作**: 全テキスト同梱。写真は Wikipedia から遅延読み込み(失敗時はグラデーションタイル)
6. **正確性**: 料金・開館時間など変動する情報は断定せず「公式サイト要確認」と添える。歴史的事実は確度の高いもののみ

### ファイル

| ファイル | 内容 | 担当 |
|---|---|---|
| `guide.html` + `css/guide.css` + `js/guide.js` | ガイドUIシェル | Opus |
| `data/guide-versailles.js` | ヴェルサイユ深掘りコンテンツ | Opus |
| `data/guide-paris.js` | コンコルド広場・シャンゼリゼ・凱旋門 + 1日プラン | Sonnet |

読み込み順: guide-versailles.js → guide-paris.js → guide.js

### データ契約

```js
// data/guide-versailles.js
window.GUIDE_SPOTS = window.GUIDE_SPOTS || [];
window.GUIDE_SPOTS.push({
  id: "versailles",
  order: 1,                        // 表示順
  name: "ヴェルサイユ宮殿",
  fr: "Château de Versailles",
  icon: "👑",
  accent: "#8a6d1f",               // このスポットの章テーマ色(金)
  wiki: "Palace_of_Versailles",    // ヒーロー写真用 Wikipedia(en)タイトル
  tagline: "太陽王が世界に見せつけた、絶対王政の頂点",
  intro: ["導入 2〜3段落。到着した瞬間の気分を高める文章"],
  practical: [                     // 実用情報カード(5〜8個)
    { icon: "🚆", title: "行き方", body: "..." }
  ],
  phrases: [ { fr: "...", ja: "...", kana: "..." } ],  // この場所で使う一言(3〜5)
  route: [                         // ストップカード(順路)
    {
      id: "chapelle",              // スポット内で一意
      name: "王室礼拝堂",
      fr: "Chapelle royale",
      wiki: null,                  // 任意: ストップ個別写真の Wikipedia タイトル
      duration: "10分",
      headline: "ルイ14世が晩年毎朝通った、天と地をつなぐ白と金の空間",
      look: ["見るべき点を3〜6個。視線の誘導(天井/床/右手の…)を具体的に"],
      story: ["歴史・人物・事件の物語 2〜4段落。ここでしか語れない濃度で"],
      tips: ["混雑回避・撮影・豆知識など 1〜3個"],
      photoSpot: "ベストな撮影位置と構図(任意)"
    }
  ]
});

// data/guide-paris.js — 同形式で concorde / champs / arc の3スポットを push。
// さらに1日プラン:
window.GUIDE_DAY = {
  title: "今日のプラン",
  intro: "1〜2文",
  plan: [
    { time: "午前", title: "ヴェルサイユ宮殿", note: "一言", spotId: "versailles" }
  ]
};
```

### guide.html の構成(Opus)

- カバー(日付なしの普遍的なヒーロー)→ 1日プラン(タイムライン)→ スポット章 ×4
- スポット章: 写真ヒーロー / intro / practical(横スクロールカード)/ フレーズ(音声ボタン付き、
  speechSynthesis fr-FR)/ 順路ストップカード列
- ストップカード: 番号 + name + duration + headline 常時表示。「見どころ」「物語」は
  アコーディオン(見どころは既定開、物語は既定閉)。✓ボタンで visited トグル
- 上部に横スクロールのスポットジャンプナビ(sticky)。スポット内の進捗 n/m 表示
- 写真読み込みは app.js と同じ方式(Wikipedia REST summary、フォールバックはグラデーション+絵文字)を
  guide.js 内に自己完結で実装
- index.html のホーム導線に guide.html へのリンクカードを1枚追加(既存を壊さない)
- テーマ(voyage.theme)・デザイントークンは本体と共有。ライト/ダーク両対応。reduced-motion 配慮

## 拡充ラウンド2

1. **data/guide-seine.js**: 新スポット id "seine", order 5(セーヌ河岸と夜のパリ)。既存 GUIDE_SPOTS 契約のまま。guide.html に script タグを guide-paris.js の直後に追加
2. **data/phrases.js 追記**: 既存配列に3カテゴリ push — numbers(数字・お金・時刻 🔢)/ smalltalk(会話をつなぐ一言 💬)/ romance(ふたりの旅 💐)。各9〜12句、既存契約と同形式
3. **data/culture.js 追記**: 記事+6本(既存契約と同形式、id 重複禁止)
4. **見せるカード**: フレーズカードに 🪧 ボタン → 全画面オーバーレイに仏語を特大表示(セリフ体・自動フィット)、下に日本語小さく、タップ/Escで閉じる。localStorage 不要。app.js + style.css のみ変更。guide.html のフレーズにも同ボタン(guide.js)…は今回見送り、本体のみ

## イタリア編(guide-it.html)— ローマ & サントリーニ

新婚旅行の後半日程(7/13 ローマ着 → 7/14 市内 → 7/15 サンタンジェロ→サントリーニへ → 7/17 島内観光)向け。
仏語版ガイドと同じ契約・同じ guide.js / real-map.js / css/guide.css を再利用し、別ページとして追加する。

- `guide-it.html` は guide.js 読み込み前に `window.GUIDE_LANG = 'it-IT'` を定義(音声がイタリア語になる)
- フレーズはイタリア語 {fr(=現地語), ja, kana}。サントリーニのみギリシャ語で、各フレーズに `lang: "el-GR"` を付与
- スポット/ストップ id と順序は固定(data/geo-it.js の座標キーと一致させること):
  1. centro(ローマ歴史地区 ⛲): fontana-di-trevi / pantheon / piazza-navona / spagna / gelato
  2. colosseo(コロッセオとフォロ・ロマーノ 🏛️): colosseo / arco-costantino / foro-romano / palatino / campidoglio / vittoriano
  3. vaticano(バチカン市国 ⛪): piazza-san-pietro / basilica / cupola / musei-vaticani / cappella-sistina
  4. santangelo(サンタンジェロ城とボルゴ 🏰): ponte / castello / terrazza / passetto / borgo
  5. santorini(サントリーニ島 🏖️): oia / blue-domes / amoudi / sunset / fira / caldera-walk / akrotiri
- ファイル分担: data/guide-it-roma.js(centro+colosseo)/ data/guide-it-vaticano.js(vaticano+santangelo+GUIDE_DAY)/ data/guide-it-santorini.js(santorini)
- 読み込み順: guide-it-roma → guide-it-vaticano → guide-it-santorini → guide.js → leaflet → geo-it.js → real-map.js
- index.html のホームにイタリア編への導線カードを追加。両ガイドのヘッダーで相互リンク

## 学習システム(レッスン)と イタリア語版アプリ(app-it.html)

「読む」から「身につく」へ。SRS(間隔反復)+想起練習+シャドーイング+シーン会話ドリルを
「レッスン」タブとして実装。仏語版(index.html)と伊語版(app-it.html)で共用する。

### 多言語プラミング(app.js / quiz.js)

- `window.APP_LANG`(既定 'fr-FR')… 音声言語。app-it.html は 'it-IT'
- `window.APP_FAV_KEY`(既定 'voyage.favs')/ `window.APP_QUIZ_KEY`(既定 'voyage.quiz.best')
- `window.APP_STORE_PREFIX`(既定 'voyage.fr')… レッスンの保存プレフィックス。伊語版は 'voyage.it'
- データファイルはページごとに同じグローバル名(PHRASES_DATA / CULTURE_DATA / PHOTOS_DATA)を定義

### js/learn.js + css/learn.css の契約

```js
window.Learn = {
  // conf: { phrasesData, dialogues, speak(text, btn?, rate?), lang, storagePrefix }
  init(container, conf) { ... }  // 再入可
}
```

- **SRS**: ライトナー5箱。間隔(日)= box1:0 / box2:1 / box3:3 / box4:7 / box5:16。
  保存: `<prefix>.srs` = { "catId::フレーズ": { box, due(通算日), seen, ok } }。新規は1日10枚まで
- **セッション構成**: 期限到来カード最大12枚 + 新規最大6枚をシャッフル。出題形式は箱で変える:
  box1-2 = 認識(伊→和4択 / リスニング4択)、box3+ = 想起フリップ(和→伊。「声に出してから」めくり、
  自己評価「言えた→box+1 / まだ→box=1」)。3枚に1枚の頻度でシャドーイング挿入(音声→スロー→リピート)
- **シーン会話ドリル**: DIALOGUES_DATA を順に再生。相手ターン=伊語+音声+和訳。自分ターン=和ヒント表示→
  「答えを見る」→伊語+カナ+音声+シャドーイング。最後に通し再生。完了記録 `<prefix>.scenes`
- **習慣化**: `<prefix>.streak` { last, count }。ホーム/レッスン冒頭に「今日のレッスン(約5分)」導線、
  ストリーク🔥表示、カテゴリ別定着率(box4以上の割合)
- スタイルは learn.css(トークン契約準拠・両テーマ)。音声は conf.speak を使用(rate 指定でスロー再生)

### data/dialogues-it.js の契約

```js
window.DIALOGUES_DATA = [{
  id: "bar",            // 英小文字スラッグ
  title: "バールで朝食",
  icon: "☕",
  desc: "カウンターでカプチーノとコルネットを頼む",
  turns: [
    { speaker: "them", name: "バリスタ", it: "Buongiorno! Mi dica.", ja: "おはようございます!ご注文は?", kana: "ボンジョルノ!ミ ディーカ" },
    { speaker: "you",  hint: "カプチーノを1つください、と言ってみよう",
      it: "Un cappuccino, per favore.", ja: "カプチーノを1つください", kana: "ウン カプチーノ ペル ファヴォーレ" }
  ]
}]
```

### app-it.html(旅するイタリア語)

- index.html の構造を踏襲した5タブ: ホーム / フレーズ集 / レッスン / 文化ガイド / クイズ
- ヒーロー: イタリアの朝(テラコッタとオリーブ、糸杉とドゥオーモのスカイラインSVG)
- 読み込み: phrases-it → culture-it → photos-it → dialogues-it → quiz.js → learn.js → app.js
  (直前に APP_LANG='it-IT' / APP_FAV_KEY / APP_QUIZ_KEY / APP_STORE_PREFIX を定義)
- index.html(仏語版)にも「レッスン」タブを追加(dialogues 未定義でもSRSだけで動く)し、
  ホームに伊語版への導線カードを追加。両アプリのヘッダーで相互リンク

### data/phrases-it.js / culture-it.js / photos-it.js

- phrases-it: 仏語版と同じ10カテゴリ構成・同契約(fr フィールドにイタリア語)で約110句
- culture-it: イタリア文化記事12本(バール文化、アペリティーボ、コペルト、ジェスチャー、
  食後のカプチーノ問題、リポーゾ、切符の刻印、教会の服装、広場の暮らし、チップ、ジェラート、Ferragosto 等)
- photos-it: 16スポット(既存 PHOTOS_DATA 契約。wiki は英語版タイトル)

## 検証

Playwright(内蔵 Chromium)で実際に開き、全タブ・音声ボタン・クイズ一巡・
ライト/ダーク両テーマをスクリーンショットで確認する。
