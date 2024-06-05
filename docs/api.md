# API Reference

Explore the complete API structure and learn how to use **Effekt**.

> [!NOTE]
>
> There is a possibility that the API will change before the first stable release so keep that in mind.
>
> Currently, it is not recommended to use it in production.

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

<br>

Gets a parsed list of DOM elements.

```ts
import { getElements } from 'effekt'

getElements('.class')
```

</details>

<details>
  <summary><code><strong>hexToRgba</strong></code></summary>

<br>

Converts `hex` to `rgba` color format.

```ts
import { hexToRgba } from 'effekt'

hexToRgba('#fff') // => [255, 255, 255, 1]
hexToRgba('#ffffff33') // => [255, 255, 255, 0.2]
```

</details>

<details>
  <summary><code><strong>hslaToRgba</strong></code></summary>

<br>

Converts `hsla` to `rgba` color format.

```ts
import { hslaToRgba } from 'effekt'

hslaToRgba(75, 100, 60, 1) // => [204, 255, 51, 1]
```

</details>

<details>
  <summary><code><strong>interpolate</strong></code></summary>

<br>

Creates a linear interpolation from a series of `values` and custom effects, based on `progress`.

```ts
import { interpolate } from 'effekt'

const from = [255, 0, 0, 0]
const to = [0, 255, 0, 1]

interpolate([from, to], [0, 1])(0.5) // => [127.5, 127.5, 0, 0.5]
```

</details>

<details>
  <summary><code><strong>mix</strong></code></summary>

<br>

Linearly interpolates between the `from` and `to` values, based on `progress`.

```ts
import { mix } from 'effekt'

mix(0, 150, 0.5) // => 75
```

</details>

<details>
  <summary><code><strong>mixColor</strong></code></summary>

<br>

Linearly interpolates color between the `from` and `to` values, based on `progress`.

```ts
import { mixColor } from 'effekt'

mixColor(0, 100, 0.3) // => 54.772
```

</details>

<details>
  <summary><code><strong>msToSec</strong></code></summary>

<br>

Converts `milliseconds` to `seconds`.

```ts
import { msToSec } from 'effekt'

msToSec(1000) // => 1
```

</details>

<details>
  <summary><code><strong>secToMs</strong></code></summary>

<br>

Converts `seconds` to `milliseconds`.

```ts
import { secToMs } from 'effekt'

secToMs(1) // => 1000
```

</details>

<details>
  <summary><code><strong>pipe</strong></code></summary>

<br>

Combines multiple functions into a single pipeline.

```ts
import { pipe } from 'effekt'

const add3 = (v: number) => v + 3
const sub2 = (v: number) => v - 2

pipe(add3, sub2)(6) // => 7
```

</details>

<details>
  <summary><code><strong>progress</strong></code></summary>

<br>

Recalculates progress between the `from` and `to` values, based on specified `value`.

```ts
import { progress } from 'effekt'

progress(0, 100, 30) // => 0.3
```

</details>

<details>
  <summary><code><strong>round</strong></code></summary>

<br>

Rounds a number with a specified precision.

```ts
import { round } from 'effekt'

round(32.997633923673) // => 33
```

</details>

<details>
  <summary><code><strong>setStyle</strong></code></summary>

<br>

Sets the individual CSS style for the element.

The `property` and `value` parameters should follow the built-in syntax of the `CSSStyleDeclaration` interface.

```ts
import { setStyle } from 'effekt'

setStyle(el, 'background', 'rgba(255, 255, 255, 1)')
```

</details>

<details>
  <summary><code><strong>stagger</strong></code></summary>

<br>

Creates a `stagger` animation effect.

```ts
import { animate, stagger } from 'effekt'

animate('.el', {
  delay: stagger(),
})
```

```ts
import { animate, stagger } from 'effekt'

animate('.el', {
  delay: stagger(0.3, {
    grid: [9, 6],
    from: 'center',
  }),
})
```

</details>

<br>

## Easing

<details>
  <summary><code><strong>cubicBezier</strong></code></summary>

<br>

Creates a `cubic-bezier` easing effect.

```ts
import { animate } from 'effekt'
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
import { animate } from 'effekt'
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
import { animate } from 'effekt'
import { spring } from 'effekt/easing'

animate('.el', {
  ease: spring(),
})
```

</details>

### Presets

<details>
  <summary><code><strong>linear</strong></code></summary>

<br>

Creates a `linear` easing effect.

```ts
import { animate } from 'effekt'
import { linear } from 'effekt/easing'

animate('.el', {
  ease: linear,
})
```

</details>

<details>
  <summary><code><strong>inQuad</strong></code></summary>

<br>

Creates a `inQuad` easing effect.

```ts
import { animate } from 'effekt'
import { inQuad } from 'effekt/easing'

animate('.el', {
  ease: inQuad,
})
```

</details>

<details>
  <summary><code><strong>outQuad</strong></code></summary>

<br>

Creates a `outQuad` easing effect.

```ts
import { animate } from 'effekt'
import { outQuad } from 'effekt/easing'

animate('.el', {
  ease: outQuad,
})
```

</details>

<details>
  <summary><code><strong>inOutQuad</strong></code></summary>

<br>

Creates a `inOutQuad` easing effect.

```ts
import { animate } from 'effekt'
import { inOutQuad } from 'effekt/easing'

animate('.el', {
  ease: inOutQuad,
})
```

</details>

<details>
  <summary><code><strong>outInQuad</strong></code></summary>

<br>

Creates a `outInQuad` easing effect.

```ts
import { animate } from 'effekt'
import { outInQuad } from 'effekt/easing'

animate('.el', {
  ease: outInQuad,
})
```

</details>

<details>
  <summary><code><strong>inCubic</strong></code></summary>

<br>

Creates a `inCubic` easing effect.

```ts
import { animate } from 'effekt'
import { inCubic } from 'effekt/easing'

animate('.el', {
  ease: inCubic,
})
```

</details>

<details>
  <summary><code><strong>outCubic</strong></code></summary>

<br>

Creates a `outCubic` easing effect.

```ts
import { animate } from 'effekt'
import { outCubic } from 'effekt/easing'

animate('.el', {
  ease: outCubic,
})
```

</details>

<details>
  <summary><code><strong>inOutCubic</strong></code></summary>

<br>

Creates a `inOutCubic` easing effect.

```ts
import { animate } from 'effekt'
import { inOutCubic } from 'effekt/easing'

animate('.el', {
  ease: inOutCubic,
})
```

</details>

<details>
  <summary><code><strong>outInCubic</strong></code></summary>

<br>

Creates a `outInCubic` easing effect.

```ts
import { animate } from 'effekt'
import { outInCubic } from 'effekt/easing'

animate('.el', {
  ease: outInCubic,
})
```

</details>

<details>
  <summary><code><strong>inQuart</strong></code></summary>

<br>

Creates a `inQuart` easing effect.

```ts
import { animate } from 'effekt'
import { inQuart } from 'effekt/easing'

animate('.el', {
  ease: inQuart,
})
```

</details>

<details>
  <summary><code><strong>outQuart</strong></code></summary>

<br>

Creates a `outQuart` easing effect.

```ts
import { animate } from 'effekt'
import { outQuart } from 'effekt/easing'

animate('.el', {
  ease: outQuart,
})
```

</details>

<details>
  <summary><code><strong>inOutQuart</strong></code></summary>

<br>

Creates a `inOutQuart` easing effect.

```ts
import { animate } from 'effekt'
import { inOutQuart } from 'effekt/easing'

animate('.el', {
  ease: inOutQuart,
})
```

</details>

<details>
  <summary><code><strong>outInQuart</strong></code></summary>

<br>

Creates a `outInQuart` easing effect.

```ts
import { animate } from 'effekt'
import { outInQuart } from 'effekt/easing'

animate('.el', {
  ease: outInQuart,
})
```

</details>

<details>
  <summary><code><strong>inQuint</strong></code></summary>

<br>

Creates a `inQuint` easing effect.

```ts
import { animate } from 'effekt'
import { inQuint } from 'effekt/easing'

animate('.el', {
  ease: inQuint,
})
```

</details>

<details>
  <summary><code><strong>outQuint</strong></code></summary>

<br>

Creates a `outQuint` easing effect.

```ts
import { animate } from 'effekt'
import { outQuint } from 'effekt/easing'

animate('.el', {
  ease: outQuint,
})
```

</details>

<details>
  <summary><code><strong>inOutQuint</strong></code></summary>

<br>

Creates a `inOutQuint` easing effect.

```ts
import { animate } from 'effekt'
import { inOutQuint } from 'effekt/easing'

animate('.el', {
  ease: inOutQuint,
})
```

</details>

<details>
  <summary><code><strong>outInQuint</strong></code></summary>

<br>

Creates a `outInQuint` easing effect.

```ts
import { animate } from 'effekt'
import { outInQuint } from 'effekt/easing'

animate('.el', {
  ease: outInQuint,
})
```

</details>

<details>
  <summary><code><strong>inExpo</strong></code></summary>

<br>

Creates a `inExpo` easing effect.

```ts
import { animate } from 'effekt'
import { inExpo } from 'effekt/easing'

animate('.el', {
  ease: inExpo,
})
```

</details>

<details>
  <summary><code><strong>outExpo</strong></code></summary>

<br>

Creates a `outExpo` easing effect.

```ts
import { animate } from 'effekt'
import { outExpo } from 'effekt/easing'

animate('.el', {
  ease: outExpo,
})
```

</details>

<details>
  <summary><code><strong>inOutExpo</strong></code></summary>

<br>

Creates a `inOutExpo` easing effect.

```ts
import { animate } from 'effekt'
import { inOutExpo } from 'effekt/easing'

animate('.el', {
  ease: inOutExpo,
})
```

</details>

<details>
  <summary><code><strong>outInExpo</strong></code></summary>

<br>

Creates a `outInExpo` easing effect.

```ts
import { animate } from 'effekt'
import { outInExpo } from 'effekt/easing'

animate('.el', {
  ease: outInExpo,
})
```

</details>

<details>
  <summary><code><strong>inSine</strong></code></summary>

<br>

Creates a `inSine` easing effect.

```ts
import { animate } from 'effekt'
import { inSine } from 'effekt/easing'

animate('.el', {
  ease: inSine,
})
```

</details>

<details>
  <summary><code><strong>outSine</strong></code></summary>

<br>

Creates a `outSine` easing effect.

```ts
import { animate } from 'effekt'
import { outSine } from 'effekt/easing'

animate('.el', {
  ease: outSine,
})
```

</details>

<details>
  <summary><code><strong>inOutSine</strong></code></summary>

<br>

Creates a `inOutSine` easing effect.

```ts
import { animate } from 'effekt'
import { inOutSine } from 'effekt/easing'

animate('.el', {
  ease: inOutSine,
})
```

</details>

<details>
  <summary><code><strong>outInSine</strong></code></summary>

<br>

Creates a `outInSine` easing effect.

```ts
import { animate } from 'effekt'
import { outInSine } from 'effekt/easing'

animate('.el', {
  ease: outInSine,
})
```

</details>

<details>
  <summary><code><strong>inCirc</strong></code></summary>

<br>

Creates a `inCirc` easing effect.

```ts
import { animate } from 'effekt'
import { inCirc } from 'effekt/easing'

animate('.el', {
  ease: inCirc,
})
```

</details>

<details>
  <summary><code><strong>outCirc</strong></code></summary>

<br>

Creates a `outCirc` easing effect.

```ts
import { animate } from 'effekt'
import { outCirc } from 'effekt/easing'

animate('.el', {
  ease: outCirc,
})
```

</details>

<details>
  <summary><code><strong>inOutCirc</strong></code></summary>

<br>

Creates a `inOutCirc` easing effect.

```ts
import { animate } from 'effekt'
import { inOutCirc } from 'effekt/easing'

animate('.el', {
  ease: inOutCirc,
})
```

</details>

<details>
  <summary><code><strong>outInCirc</strong></code></summary>

<br>

Creates a `outInCirc` easing effect.

```ts
import { animate } from 'effekt'
import { outInCirc } from 'effekt/easing'

animate('.el', {
  ease: outInCirc,
})
```

</details>

<details>
  <summary><code><strong>inBack</strong></code></summary>

<br>

Creates a `inBack` easing effect.

```ts
import { animate } from 'effekt'
import { inBack } from 'effekt/easing'

animate('.el', {
  ease: inBack,
})
```

</details>

<details>
  <summary><code><strong>outBack</strong></code></summary>

<br>

Creates a `outBack` easing effect.

```ts
import { animate } from 'effekt'
import { outBack } from 'effekt/easing'

animate('.el', {
  ease: outBack,
})
```

</details>

<details>
  <summary><code><strong>inOutBack</strong></code></summary>

<br>

Creates a `inOutBack` easing effect.

```ts
import { animate } from 'effekt'
import { inOutBack } from 'effekt/easing'

animate('.el', {
  ease: inOutBack,
})
```

</details>

<details>
  <summary><code><strong>outInBack</strong></code></summary>

<br>

Creates a `outInBack` easing effect.

```ts
import { animate } from 'effekt'
import { outInBack } from 'effekt/easing'

animate('.el', {
  ease: outInBack,
})
```

</details>

<details>
  <summary><code><strong>inBounce</strong></code></summary>

<br>

Creates a `inBounce` easing effect.

```ts
import { animate } from 'effekt'
import { inBounce } from 'effekt/easing'

animate('.el', {
  ease: inBounce,
})
```

</details>

<details>
  <summary><code><strong>outBounce</strong></code></summary>

<br>

Creates a `outBounce` easing effect.

```ts
import { animate } from 'effekt'
import { outBounce } from 'effekt/easing'

animate('.el', {
  ease: outBounce,
})
```

</details>

<details>
  <summary><code><strong>inOutBounce</strong></code></summary>

<br>

Creates a `inOutBounce` easing effect.

```ts
import { animate } from 'effekt'
import { inOutBounce } from 'effekt/easing'

animate('.el', {
  ease: inOutBounce,
})
```

</details>

<details>
  <summary><code><strong>outInBounce</strong></code></summary>

<br>

Creates a `outInBounce` easing effect.

```ts
import { animate } from 'effekt'
import { outInBounce } from 'effekt/easing'

animate('.el', {
  ease: outInBounce,
})
```

</details>

<details>
  <summary><code><strong>inElastic</strong></code></summary>

<br>

Creates a `inElastic` easing effect.

```ts
import { animate } from 'effekt'
import { inElastic } from 'effekt/easing'

animate('.el', {
  ease: inElastic(),
})
```

</details>

<details>
  <summary><code><strong>outElastic</strong></code></summary>

<br>

Creates a `outElastic` easing effect.

```ts
import { animate } from 'effekt'
import { outElastic } from 'effekt/easing'

animate('.el', {
  ease: outElastic(),
})
```

</details>

<details>
  <summary><code><strong>inOutElastic</strong></code></summary>

<br>

Creates a `inOutElastic` easing effect.

```ts
import { animate } from 'effekt'
import { inOutElastic } from 'effekt/easing'

animate('.el', {
  ease: inOutElastic(),
})
```

</details>

<details>
  <summary><code><strong>outInElastic</strong></code></summary>

<br>

Creates a `outInElastic` easing effect.

```ts
import { animate } from 'effekt'
import { outInElastic } from 'effekt/easing'

animate('.el', {
  ease: outInElastic(),
})
```

</details>

### Modifiers

<details>
  <summary><code><strong>easingOut</strong></code></summary>

<br>

Creates a `reverse` easing modifier.

Turns `ease-in` into `ease-out` effect.

```ts
import { animate } from 'effekt'
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
import { animate } from 'effekt'
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
import { animate } from 'effekt'
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
import { animate } from 'effekt'
import { inView } from 'effekt/interaction'

inView('.el', ({ target }) => {
  animate(target, { opacity: [0, 1] })
})
```

</details>

<br>

---

[← Back](./README.md)
