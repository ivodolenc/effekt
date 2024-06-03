# API Reference

> [!NOTE]
>
> There is a possibility that the API will change before the first stable release so keep that in mind. Currently, it is not recommended to use it in production.

## Core

<details>
  <summary><code><strong>animate</strong></code></summary>

<br>

Creates a new `AnimationController` instance.

Provides advanced controls that manage all animated elements.

```ts
import { animate } from 'effekt'

animate('.el', {
  x: [0, 600, 300],
  background: ['#cf3', '#0df'],
  duration: 1,
})
```

</details>

<details>
  <summary><code><strong>clamp</strong></code></summary>

<br>

Clamps a value within a range of `min` and `max` values.

```ts
import { clamp } from 'effekt'

clamp(0, 100, 60) // => 60
```

</details>

<details>
  <summary><code><strong>getElements</strong></code></summary>

</details>

<details>
  <summary><code><strong>hexToRgba</strong></code></summary>

</details>

<details>
  <summary><code><strong>hslaToRgba</strong></code></summary>

</details>

<details>
  <summary><code><strong>interpolate</strong></code></summary>

</details>

<details>
  <summary><code><strong>mix</strong></code></summary>

</details>

<details>
  <summary><code><strong>mixColor</strong></code></summary>

</details>

<details>
  <summary><code><strong>msToSec</strong></code></summary>

</details>

<details>
  <summary><code><strong>secToMs</strong></code></summary>

</details>

<details>
  <summary><code><strong>pipe</strong></code></summary>

</details>

<details>
  <summary><code><strong>progress</strong></code></summary>

</details>

<details>
  <summary><code><strong>round</strong></code></summary>

</details>

<details>
  <summary><code><strong>setStyle</strong></code></summary>

</details>

<details>
  <summary><code><strong>stagger</strong></code></summary>

</details>

<br>

## Easing

<details>
  <summary><code><strong>cubicBezier</strong></code></summary>

<br>

Creates a `cubic-bezier` easing effect.

```ts
import { cubicBezier } from 'effekt/easing'

animate('.el', {
  ease: cubicBezier(0.33, 1, 0.66, 1),
})
```

</details>

<details>
  <summary><code><strong>steps</strong></code></summary>

<br>

Creates a `steps` easing effect.

```ts
import { steps } from 'effekt/easing'

animate('.el', {
  ease: steps(3),
})
```

</details>

<details>
  <summary><code><strong>spring</strong></code></summary>

<br>

Creates a `spring` easing effect.

```ts
import { spring } from 'effekt/easing'

animate('.el', {
  ease: spring(),
})
```

</details>

### Presets

<details>
  <summary><code><strong>linear</strong></code></summary>

</details>

<details>
  <summary><code><strong>inQuad</strong></code></summary>

</details>

<details>
  <summary><code><strong>outQuad</strong></code></summary>

</details>

<details>
  <summary><code><strong>inOutQuad</strong></code></summary>

</details>

<details>
  <summary><code><strong>outInQuad</strong></code></summary>

</details>

### Modifiers

<details>
  <summary><code><strong>easingOut</strong></code></summary>

<br>

Creates a `reverse` easing modifier.

Turns `ease-in` into `ease-out` effect.

```ts
import { easingOut } from 'effekt/easing'

const easeOut = easingOut(easeIn)
```

</details>

<details>
  <summary><code><strong>easingInOut</strong></code></summary>

<br>

Creates a `mirror` easing modifier.

Turns `ease-in` into `ease-in-out` effect.

```ts
import { easingInOut } from 'effekt/easing'

const easeInOut = easingInOut(easeIn)
```

</details>

<details>
  <summary><code><strong>easingOutIn</strong></code></summary>

<br>

Creates a `reverse-mirror` easing modifier.

Turns `ease-in` into `ease-out-in` effect.

```ts
import { easingOutIn } from 'effekt/easing'

const easeOutIn = easingOutIn(easeIn)
```

</details>

<br>

## Interaction

<details>
  <summary><code><strong>inView</strong></code></summary>

<br>

Triggers a callback when the specified elements enter and leave the viewport.

```ts
import { inView } from 'effekt/interaction'

inView('.el', ({ target }) => {
  animate(target, { opacity: [0, 1] })
})
```

</details>

<br>

---

[← Back](./README.md)
