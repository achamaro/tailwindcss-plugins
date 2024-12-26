# @achamaro/tailwindcss-iconify-icon

![npm (scoped)](https://img.shields.io/npm/v/@achamaro/tailwindcss-iconify-icon)

[Tailwind CSS]: https://tailwindcss.com/
[arbitrary values]: https://tailwindcss.com/docs/adding-custom-styles#using-arbitrary-values
[Iconify API]: https://iconify.design/docs/api/
[tailwind merge]: https://github.com/dcastil/tailwind-merge

[**README (English)**](README.md)

このプラグインを使用すると、[Tailwind CSS]の[arbitrary values]記法でアイコンを指定するだけで、[Iconify API]から自動的にアイコンがダウンロードされます。アイコンセットを事前にインストールする必要はありません。

## Quick Start

#### 1. インストール

```sh
npm i -D @achamaro/tailwindcss-iconify-icon
```

#### 2. 設定

tailwind.config.ts

```typescript
// プラグインを追加
import icon from "@achamaro/tailwindcss-iconify-icon";

export default {
  plugins: [icon()],
};
```

#### 3. 使用

```html
<!-- Iconifyのアイコンを使用 -->
<i className="i-[simple-icons/iconify]"></i>

<!-- カスタムSVGを使用 -->
<i className="i-[my-custom/icon]"></i>
```

## Installation

```sh
npm i -D @achamaro/tailwindcss-iconify-icon
```

## Configuration

<details open>
<summary>tailwind.config.ts</summary>

```typescript
import icon from "@achamaro/tailwindcss-iconify-icon";

export default {
  // ...

  plugins: [
    // ...
    icon({
      // options
    }),
  ],
};
```

</details>

<details>
<summary>tailwind.config.js</summary>

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  // ...

  plugins: [
    // ...
    require("@achamaro/tailwindcss-iconify-icon")(),
  ],
};
```

</details>

## Options

### iconDir

- **Type**: `string`
- **Default**: `src/assets/icons`

アイコンファイルを格納するディレクトリ。以下の2種類のアイコンを配置できます:

1. Iconify APIからダウンロードされたアイコン
   - 例: `src/assets/icons/simple-icons/iconify.svg`
2. カスタムSVGファイル
   - `src/assets/icons/my-custom/icon.svg` に置いた SVG ファイルは `i-[my-custom/icon]` で表示できます。
   - カスタムSVGは任意のディレクトリ名で配置できます

### prefix

- **Type**: `string`
- **Default**: `"i"`

クラス名の接頭辞

### extraProperties

- **Type**: `Record<string, string>`
- **Default**: `{ display: "inline-block" }`

デフォルトでは以下のスタイルが設定されています。
これらのスタイルはアイコンを適切に表示するために必要な基本的なCSS設定です。
このパラメータでこれらを上書きすることができます。

```css
:where([class^="{prefix}-["], [class*=" {prefix}-["], [class*=":{prefix}-["]) {
  background-size: 100% 100%;
  background-repeat: no-repeat;
  mask-size: 100% 100%;
  mask-repeat: no-repeat;
  height: 1em;
}
```

### enableSuggestion

- **Type**: `boolean`
- **Default**: `false`

このパラメータを有効にするとプラグインは `matchUtilities` の第二引数の `values` にアイコン名を設定します。
下のほうで紹介している VSCode 拡張を使用する場合は `false` のままにしてください。

## Usage

### Syntax

```
{prefix}-[{icon_set}/{icon_name}]
{prefix}-[{icon_set}/{icon_name}]/{mask | bg}
```

#### modifier

- **Type**: `mask | bg`
  - mask: アイコンの色をCSS（color）で制御できます
  - bg: アイコンの元の色が保持されます
- **Default**: `null`

`background-image` または `mask-image` のどちらでアイコンを表示するかを指定します。

### Example

```html
<!-- アイコンの色をCSSで制御（デフォルト） -->
<i className="i-[simple-icons/iconify]"></i>

<!-- アイコンの元の色を保持 -->
<i className="i-[simple-icons/iconify]/bg"></i>
```

## Other

### [tailwind merge] プラグイン

```typescript
import { extendTailwindMerge } from "tailwind-merge";
import twMergeIconifyIcon from "@achamaro/tailwindcss-iconify-icon/tailwind-merge-plugin";

const twMerge = extendTailwindMerge(twMergeIconifyIcon());
```

### VSCode 拡張

[TailwindCSS Iconify Icon IntelliSense](https://marketplace.visualstudio.com/items?itemName=achamaro.tailwindcss-iconify-icon-intellisense).

アイコン名の補完と、アイコン名をデコレーションで実際のアイコン画像に置き換えます。

![tailwindcss-iconify-icon-intellisense](tailwindcss-iconify-icon-intellisense.png)

## Credit

#### Icons in Pure CSS

https://antfu.me/posts/icons-in-pure-css

#### Asynchronous processing in TailwindCSS plugins

https://github.com/InfiniteXyy/tailwindcss-iconify
