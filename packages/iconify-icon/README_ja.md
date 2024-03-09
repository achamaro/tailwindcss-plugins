# @achamaro/tailwindcss-iconify-icon

![npm (scoped)](https://img.shields.io/npm/v/@achamaro/tailwindcss-iconify-icon)

[Tailwind CSS]: https://tailwindcss.com/
[arbitrary values]: https://tailwindcss.com/docs/adding-custom-styles#using-arbitrary-values
[Iconify API]: https://iconify.design/docs/api/
[tailwind merge]: https://github.com/dcastil/tailwind-merge

[**README (English)**](README.md)

このプラグインは、[Tailwind CSS]の[arbitrary values]で指定したアイコンを[Iconify API]を使って自動的にダウンロードするため、事前にアイコンセットをインストールする必要がありません。

## Installation

```sh
npm i -D @achamaro/tailwindcss-iconify-icon
```

## Configuration

tailwind.config.js

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

## Options

### iconDir

- **Type**: `string`
- **Default**: `src/assets/icons`

アイコンファイルのダウンロードと任意の SVG ファイルを格納するディレクトリ。

`src/assets/icons/custom/icon.svg` に置いた SVG ファイルは `i-[custom/icon]` で表示できます。

### prefix

- **Type**: `string`
- **Default**: `"i"`

クラス名の接頭辞

### extraProperties

- **Type**: `Record<string, string>`
- **Default**: `{ display: "inline-block" }`

デフォルトでは以下のスタイルが設定されています。
このパラメータでこれらを上書きすることができます。

```css
[class^="{prefix}-["],
[class*=" {prefix}-["],
[class*=":{prefix}-["] {
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

### downloadDir (deprecated)

このオプションは非推奨であり、将来のバージョンでは削除される予定です。代わりに `iconDir` を使用してください。

- **Type**: `string`
- **Default**: `src/assets/icons`

アイコンファイルをダウンロードするディレクトリ

### customSvg (deprecated)

このオプションは非推奨であり、将来のバージョンでは削除される予定です。代わりに `iconDir` を使用してください。

- **Type**: `Record<string, string>`
- **Default**: `{}`

SVG 用の任意のアイコンセット名と対応する SVG ファイルを格納するディレクトリのマップ

以下の設定をした場合、

```
{ custom: "src/assets/custom" }
```

`i-[custom/icon]` で `src/assets/custom/icon.svg` を表示します。

## Usage

### Syntax

```
{prefix}-[{icon_set}/{icon_name}]
{prefix}-[{icon_set}/{icon_name}]/{mask | bg}
```

#### modifier

- **Type**: `mask | bg`
- **Default**: `null`

`background-image` に設定するか `mask-image` に設定するのかを指定します。

### Example

```html
<i className="i-[simple-icons/iconify]"></i>
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
