# @achamaro/tailwindcss-iconify-icon

![npm (scoped)](https://img.shields.io/npm/v/@achamaro/tailwindcss-iconify-icon)

[Tailwind CSS]: https://tailwindcss.com/
[arbitrary values]: https://tailwindcss.com/docs/adding-custom-styles#using-arbitrary-values
[Iconify API]: https://iconify.design/docs/api/
[tailwind merge]: https://github.com/dcastil/tailwind-merge

[**README (日本語)**](README_ja.md)

This plugin automatically downloads icons from the [Iconify API] when specified using [Tailwind CSS]'s [arbitrary values] syntax. No need to install icon sets in advance.

## Quick Start

#### 1. Install

```sh
npm i -D @achamaro/tailwindcss-iconify-icon
```

#### 2. Configure

```css
@import "tailwindcss";

@plugin "@achamaro/tailwindcss-iconify-icon";
```

For Tailwind CSS v3, please refer to [Method 2: tailwind.config](#method-2-config-file-tailwindconfig).

#### 3. Use

```html
<!-- Use Iconify icon -->
<i className="i-[simple-icons/iconify]"></i>

<!-- Use custom SVG -->
<i className="i-[my-custom/icon]"></i>
```

## Installation

```sh
npm i -D @achamaro/tailwindcss-iconify-icon
```

## Configuration

The plugin can be configured in two ways:

### Method 1: @plugin (CSS-first configuration)

```css
@import "tailwindcss";

@plugin "@achamaro/tailwindcss-iconify-icon";
```

To specify options:

```css
@import "tailwindcss";

@plugin "@achamaro/tailwindcss-iconify-icon" {
  /* iconDir */
  icon-dir: "src/my/icons";

  /* extraProperties */
  height: 1.5em;
  margin-inline: 4px;
}
```

### Method 2: Config File (tailwind.config)

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

### iconDir / icon-dir

- **Type**: `string`
- **Default**: `{src,app}/assets/icons`

Directory for storing icon files. You can place two types of icons:

1. Icons downloaded from Iconify API
   - Example: `src/assets/icons/simple-icons/iconify.svg`
2. Custom SVG files
   - SVG files placed in `src/assets/icons/my-custom/icon.svg` can be displayed with `i-[my-custom/icon]`
   - Custom SVGs can be placed in any directory name

If this option is not specified, the default directory is `app/assets/icons` if the `app` directory exists, otherwise `src/assets/icons`.

### prefix

- **Type**: `string`
- **Default**: `"i"`

Class name prefix

### extraProperties

- **Type**: `Record<string, string>`
- **Default**: `{ display: "inline-block" }`

The following styles are set by default.
These styles are basic CSS settings required for proper icon display.
You can override these with this parameter.

```css
:where([class^="{prefix}-["], [class*=" {prefix}-["], [class*=":{prefix}-["]) {
  background-size: 100% 100%;
  background-repeat: no-repeat;
  mask-size: 100% 100%;
  mask-repeat: no-repeat;
  height: 1em;
}
```

In CSS-first configuration, all properties except options are treated as `extraProperties`.

```css
@plugin "@achamaro/tailwindcss-iconify-icon" {
  /* options */
  icon-dir: "src/my/icons";
  prefix: "i";

  /* extraProperties */
  height: 1.5em;
  margin-inline: 4px;
}
```

## Usage

### Syntax

```
{prefix}-[{icon_set}/{icon_name}]
{prefix}-[{icon_set}/{icon_name}]/{mask | bg}
```

#### modifier

- **Type**: `mask | bg`
  - mask: Icon color can be controlled with CSS (color)
  - bg: Original icon color is preserved
- **Default**: `null`

Specifies whether to set the icon as `background-image` or `mask-image`.

### Example

```html
<!-- Control icon color with CSS (default) -->
<i className="i-[simple-icons/iconify]"></i>

<!-- Preserve original icon color -->
<i className="i-[simple-icons/iconify]/bg"></i>
```

## Other

### [tailwind merge] Plugin

```typescript
import { extendTailwindMerge } from "tailwind-merge";
import twMergeIconifyIcon from "@achamaro/tailwindcss-iconify-icon/tailwind-merge-plugin";

const twMerge = extendTailwindMerge(twMergeIconifyIcon());
```

### VSCode Extension

[TailwindCSS Iconify Icon IntelliSense](https://marketplace.visualstudio.com/items?itemName=achamaro.tailwindcss-iconify-icon-intellisense).

Provides icon name completion and replaces icon names with actual icon images in decorations.

![tailwindcss-iconify-icon-intellisense](tailwindcss-iconify-icon-intellisense.png)

## Credit

#### Icons in Pure CSS

https://antfu.me/posts/icons-in-pure-css

#### Asynchronous processing in TailwindCSS plugins

https://github.com/InfiniteXyy/tailwindcss-iconify
