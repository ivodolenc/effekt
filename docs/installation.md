# Installation

Follow simple guides and learn how to integrate **Effekt** into your project.

## Quick Start

Install `effekt` package:

```sh
# via pnpm
pnpm add effekt
```

```sh
# via npm
npm install effekt
```

After installation, import `effekt` into your project:

```ts
// unminified esm

import { animate } from 'effekt'
```

## CDN

Here are some examples of how to integrate **Effekt** from a CDN via a script tag.

Also, it is possible to download files manually and serve them accordingly.

### script module - esm

```html
<!-- minified esm -->

<script type="module">
  import { animate } from 'https://unpkg.com/effekt/dist/index.min.mjs'
</script>
```

### script - iife

```html
<!-- minified iife -->

<script src="https://unpkg.com/effekt/dist/index.iief.js"></script>

<script>
  const { animate } = Effekt
</script>
```

### script - umd

```html
<!-- minified umd -->

<script src="https://unpkg.com/effekt/dist/index.umd.js"></script>

<script>
  const { animate } = Effekt
</script>
```

<br>

---

[← Back](./README.md)
