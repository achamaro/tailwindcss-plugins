# @achamaro/tailwindcss-iconify-icon

![npm (scoped)](https://img.shields.io/npm/v/@achamaro/tailwindcss-iconify-icon)

[**README (Japanese)**](README_ja.md)

[Iconify]: https://iconify.design/

This plugin uses the [Iconify] API to automatically download icons specified by arbitrary value, so you do not need to install an icon set in advance.

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

The directory for downloading icon files and storing arbitrary SVG files.
`i-[custom/icon]` will display `src/assets/icons/custom/icon.svg` if the SVG file exists.

### prefix

- **Type**: `string`
- **Default**: `"i"`

Class name prefix.

### extraProperties

- **Type**: `Record<string, string>`
- **Default**: `{ display: "inline-block" }`

By default, the following styles are applied:

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

This parameter can be used to override them.

### enableSuggestion

- **Type**: `boolean`
- **Default**: `false`

Enable icon suggestions.

### downloadDir (deprecated)

This option is deprecated and will be removed in future versions. Please use `iconDir` instead.

- **Type**: `string`
- **Default**: `src/assets/icons`

The directory for downloading icon files.

### customSvg (deprecated)

This option is deprecated and will be removed in future versions. Please use `iconDir` instead.

- **Type**: `Record<string, string>`
- **Default**: `{}`

This is a map of the Icon Set Name and the directory where SVG files are stored.

If specified as follows:

```
{ custom: "src/assets/custom" }
```

`i-[custom/icon]` will display `src/assets/custom/icon.svg`

## Usage

### Syntax

```
{prefix}-[{icon_set}/{icon_name}]
{prefix}-[{icon_set}/{icon_name}]/{mask | bg}
```

#### modifier

- **Type**: `mask | bg`
- **Default**: `null`

Specify `background-image` or `mask-image` explicitly.

### Example

```html
<i className="i-[simple-icons/iconify]"></i>
<i className="i-[simple-icons/iconify]/bg"></i>
```

## Other

### Plugin for tailwind-merge

```typescript
import { extendTailwindMerge } from "tailwind-merge";
import twMergeIconifyIcon from "@achamaro/tailwindcss-iconify-icon/tailwind-merge-plugin";

const twMerge = extendTailwindMerge(twMergeIconifyIcon());
```

### VSCode Intellisense

If you set `enableSuggestion` to `true`, the VSCode extension `Tailwind CSS IntelliSense` will display the icons that exist at the time tailwind.config.js is loaded as candidates. If you want to display the newly added icons as candidates, please run Reload Window from the Command Palette.

Alternatively, you can use the [TailwindCSS Iconify Icon IntelliSense](https://marketplace.visualstudio.com/items?itemName=achamaro.tailwindcss-iconify-icon-intellisense).

![tailwindcss-iconify-icon-intellisense](tailwindcss-iconify-icon-intellisense.png)

## Credit

#### Icons in Pure CSS

https://antfu.me/posts/icons-in-pure-css

#### Asynchronous processing in TailwindCSS plugins

https://github.com/InfiniteXyy/tailwindcss-iconify
