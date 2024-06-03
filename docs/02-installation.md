# Installation

Follow simple guides and learn how to integrate **Effekt** into your project.

## npm

Install `effekt` package via npm.

```sh
npm install effekt
```

```ts
// unminified esm

import { animate } from 'effekt'
```

## CDN

Here are some examples of how to integrate `Effekt` with a CDN, but feel free to download the scripts manually and serve them yourself.

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
