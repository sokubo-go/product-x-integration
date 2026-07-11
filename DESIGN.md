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

## 検証

Playwright(内蔵 Chromium)で実際に開き、全タブ・音声ボタン・クイズ一巡・
ライト/ダーク両テーマをスクリーンショットで確認する。
