# Animation

**Effekt** creates powerful Animation instances with advanced controls to manage all animated elements.

## Keyframes

<details>
  <summary><code><strong>transform</strong></code></summary>

<br>

Animates transforms individually instead of combining them into one large string.

```ts
import { animate } from 'effekt'

animate('.el', {
  x: [0, 300],
  y: [0, 50],
  scaleX: [1, 1.3],
})
```

List of animatable properties:

```ts
{
  x: TransformValues
  y: TransformValues
  z: TransformValues
  translateX: TransformValues
  translateY: TransformValues
  translateZ: TransformValues
  rotateX: TransformValues
  rotateY: TransformValues
  rotateZ: TransformValues
  skewX: TransformValues
  skewY: TransformValues
  scaleX: TransformValues
  scaleY: TransformValues
  scaleZ: TransformValues
  perspective: TransformValues
}
```

</details>

<details>
  <summary><code><strong>filter</strong></code></summary>

<br>

Animates filters individually instead of combining them into one large string.

```ts
import { animate } from 'effekt'

animate('.el', {
  blur: ['0px', '4px'],
  dropShadow: ['3px 6px 9px #cf3', '9px 6px 3px #0df'],
})
```

List of animatable properties:

```ts
{
  blur: FilterValues
  brightness: FilterValues
  contrast: FilterValues
  dropShadow: ShadowValues
  grayscale: FilterValues
  hueRotate: FilterValues
  invert: FilterValues
  opacityFilter: FilterValues
  saturate: FilterValues
  sepia: FilterValues
}
```

</details>

<details>
  <summary><code><strong>color</strong></code></summary>

<br>

Animates colors in `hex`, `rgb`, `rgba`, `hsl` or `hsla` formats.

```ts
import { animate } from 'effekt'

animate('.el', {
  background: ['#cf3', '#0df'],
  color: ['rgba(0,0,0,1)', 'rgba(33,33,33,0.3)'],
})
```

List of animatable properties:

```ts
{
  color: ColorValues
  background: ColorValues
  backgroundColor: ColorValues
  borderColor: ColorValues
  borderTopColor: ColorValues
  borderRightColor: ColorValues
  borderBottomColor: ColorValues
  borderLeftColor: ColorValues
  outlineColor: ColorValues
  textDecorationColor: ColorValues
  columnRuleColor: ColorValues
}
```

</details>

<details>
  <summary><code><strong>other</strong></code></summary>

<br>

Animates all other styles that can be interpolated.

```ts
import { animate } from 'effekt'

animate('.el', {
  opacity: [1, 0.3],
  fontSize: ['1rem', '1.5rem'],
})
```

List of animatable properties:

```ts
{
  opacity: OtherValues
  width: OtherValues
  minWidth: OtherValues
  maxWidth: OtherValues
  height: OtherValues
  minHeight: OtherValues
  maxHeight: OtherValues
  margin: OtherValues
  marginTop: OtherValues
  marginRight: OtherValues
  marginBottom: OtherValues
  marginLeft: OtherValues
  padding: OtherValues
  paddingTop: OtherValues
  paddingRight: OtherValues
  paddingBottom: OtherValues
  paddingLeft: OtherValues
  inset: OtherValues
  top: OtherValues
  right: OtherValues
  bottom: OtherValues
  left: OtherValues
  fontSize: OtherValues
  lineHeight: OtherValues
  letterSpacing: OtherValues
  borderRadius: OtherValues
  borderWidth: OtherValues
  textShadow: ShadowValues
  boxShadow: ShadowValues
  strokeDashoffset: OtherValues
  fill: ColorValues
}
```

</details>

<details>
  <summary><code><strong>css variables</strong></code></summary>

<br>

Animates custom css variables that can be interpolated.

CSS variables must be defined in the global `:root` pseudo-class before use.

```css
:root {
  --bg-primary: #cf3;
  --bg-secondary: #0df;
  --text-base: 1rem;
  --text-lg: 1.125rem;
}
```

```ts
import { animate } from 'effekt'

animate('.el', {
  background: ['--bg-primary', '--bg-secondary'],
  fontSize: ['--text-base', '--text-lg'],
})
```

</details>

<br>

## Methods

<details>
  <summary><code><strong>onStart</strong></code></summary>

<br>

- Type: `Function`
- Default: `undefined`

Called at the beginning of the animation.

```ts
import { animate } from 'effekt'

animate('.el', {
  onStart: (data) => {
    console.log(data)
  },
})
```

</details>

<details>
  <summary><code><strong>onPlay</strong></code></summary>

<br>

- Type: `Function`
- Default: `undefined`

Called every time the animation starts.

```ts
import { animate } from 'effekt'

animate('.el', {
  onPlay: (data) => {
    console.log(data)
  },
})
```

</details>

<details>
  <summary><code><strong>onPause</strong></code></summary>

<br>

- Type: `Function`
- Default: `undefined`

Called every time the animation pauses.

```ts
import { animate } from 'effekt'

animate('.el', {
  onPause: (data) => {
    console.log(data)
  },
})
```

</details>

<details>
  <summary><code><strong>onUpdate</strong></code></summary>

<br>

- Type: `Function`
- Default: `undefined`

Called every time the animation is updated.

```ts
import { animate } from 'effekt'

animate('.el', {
  onUpdate: (data, elements) => {
    console.log(data, elements)
  },
})
```

</details>

<details>
  <summary><code><strong>onReverse</strong></code></summary>

<br>

- Type: `Function`
- Default: `undefined`

Called every time the animation is reversed.

```ts
import { animate } from 'effekt'

animate('.el', {
  onReverse: (data) => {
    console.log(data)
  },
})
```

</details>

<details>
  <summary><code><strong>onStop</strong></code></summary>

<br>

- Type: `Function`
- Default: `undefined`

Called right after the animation stops.

```ts
import { animate } from 'effekt'

animate('.el', {
  onStop: (data) => {
    console.log(data)
  },
})
```

</details>

<details>
  <summary><code><strong>onComplete</strong></code></summary>

<br>

- Type: `Function`
- Default: `undefined`

Called right after the animation ends.

```ts
import { animate } from 'effekt'

animate('.el', {
  onComplete: (data) => {
    console.log(data)
  },
})
```

</details>

<details>
  <summary><code><strong>onCancel</strong></code></summary>

<br>

- Type: `Function`
- Default: `undefined`

Called right after the animation is canceled.

```ts
import { animate } from 'effekt'

animate('.el', {
  onCancel: (data) => {
    console.log(data)
  },
})
```

</details>

<br>

## Options

<details>
  <summary><code><strong>autoPlay</strong></code></summary>

<br>

- Type: `boolean`
- Default: `true`

Specifies whether the animation will play automatically when `animate` is called.

If disabled, the animation must be explicitly started with the `.play()` method.

```ts
import { animate } from 'effekt'

animate('.el', {
  autoPlay: true,
})
```

</details>

<details>
  <summary><code><strong>direction</strong></code></summary>

<br>

- Type: `string`
- Default: `normal`

Specifies the direction in which the animation will run.

- `normal` - runs forwards.
- `reverse` - runs backwards.
- `alternate` - switches direction after each iteration.
- `alternate-reverse` - runs backwards and switches direction after each iteration.

```ts
import { animate } from 'effekt'

animate('.el', {
  direction: 'normal',
})
```

</details>

<details>
  <summary><code><strong>playRate</strong></code></summary>

<br>

- Type: `number`
- Default: `1`

Specifies the animation playback rate before it starts.

The value can be positive, negative, or 0. Positive values play the animation normally, negative values reverse the animation, and 0 pauses the animation.

A positive value is a scaling factor, so for example a value of 2 would double the playback rate and 0.5 would slow it in half.

```ts
import { animate } from 'effekt'

animate('.el', {
  playRate: 1,
})
```

</details>

<details>
  <summary><code><strong>duration</strong></code></summary>

<br>

- Type: `number`
- Default: `0.6`

Specifies the duration of the animation in `seconds`.

```ts
import { animate } from 'effekt'

animate('.el', {
  duration: 0.6,
})
```

</details>

<details>
  <summary><code><strong>repeat</strong></code></summary>

<br>

- Type: `number`
- Default: `0`

Specifies the number of iterations of the animation.

```ts
import { animate } from 'effekt'

animate('.el', {
  repeat: 0,
})
```

</details>

<details>
  <summary><code><strong>delay</strong></code></summary>

<br>

- Type: `number | Function`
- Default: `0`

Specifies the animation `start` delay in `seconds`.

For example, 0.3 means the animation will wait that long before starting.

```ts
import { animate } from 'effekt'

animate('.el', {
  delay: 0,
})
```

</details>

<details>
  <summary><code><strong>endDelay</strong></code></summary>

<br>

- Type: `number | Function`
- Default: `0`

Specifies the animation `end` delay in `seconds`.

For example, 0.3 means that the animation will wait that long before it ends completely.

```ts
import { animate } from 'effekt'

animate('.el', {
  endDelay: 0,
})
```

</details>

<details>
  <summary><code><strong>ease</strong></code></summary>

<br>

- Type: `Function`
- Default: `outQuart`

Specifies the mathematical function used in the interpolation between the `start` and `end` keyframes.

```ts
import { animate } from 'effekt'
import { outQuart } from 'effekt/easing'

animate('.el', {
  ease: outQuart,
})
```

</details>

<details>
  <summary><code><strong>force3d</strong></code></summary>

<br>

- Type: `boolean`
- Default: `true`

Specifies `transform` rendering mode.

By default, it automatically activates GPU acceleration by applying 3D transforms instead of 2D.

When the animation ends or is canceled, the mode reverts back to its initial state to conserve GPU memory.

```ts
import { animate } from 'effekt'

animate('.el', {
  force3d: true,
})
```

</details>

<br>

## Controls

<details>
  <summary><code><strong>.play()</strong></code></summary>

<br>

- Type: `Function`

Plays the animation.

```ts
import { animate } from 'effekt'

const animation = animate('.el', {
  autoPlay: false,
})

animation.play()
```

</details>

<details>
  <summary><code><strong>.pause()</strong></code></summary>

<br>

- Type: `Function`

Pauses the animation.

```ts
import { animate } from 'effekt'

const animation = animate('.el', {
  duration: 1,
})

animation.pause()
```

</details>

<details>
  <summary><code><strong>.stop()</strong></code></summary>

<br>

- Type: `Function`

Stops the animation and sets `currentTime` to the last time before stopping.

Rejects the animation `Promise`.

```ts
import { animate } from 'effekt'

const animation = animate('.el', {
  duration: 1,
})

animation.stop()
```

</details>

<details>
  <summary><code><strong>.cancel()</strong></code></summary>

<br>

- Type: `Function`

Cancels the animation and resets the `currentTime` to 0.

Rejects the animation `Promise`.

```ts
import { animate } from 'effekt'

const animation = animate('.el', {
  duration: 1,
})

setTimeout(() => {
  animation.cancel()
}, 500)
```

</details>

<details>
  <summary><code><strong>.finish()</strong></code></summary>

<br>

- Type: `Function`

Immediately ends the animation and sets `currentTime` to the end of duration.

Resolves the animation `Promise`.

```ts
import { animate } from 'effekt'

const animation = animate('.el', {
  duration: 1,
})

setTimeout(() => {
  animation.finish()
}, 500)
```

</details>

<details>
  <summary><code><strong>.reverse()</strong></code></summary>

<br>

- Type: `Function`

Reverses the animation.

```ts
import { animate } from 'effekt'

const animation = animate('.el', {
  duration: 1,
})

setTimeout(() => {
  animation.reverse()
}, 500)
```

</details>

<details>
  <summary><code><strong>.finished</strong></code></summary>

<br>

- Type: `Promise`

Creates a new animation `Promise`.

```ts
import { animate } from 'effekt'

const animation = animate('.el', {
  duration: 1,
})

animation.finished
  .then((data) => {
    console.log(data)
  })
  .catch((err) => {
    console.log(err)
  })
```

</details>

<details>
  <summary><code><strong>.currentTime</strong></code></summary>

<br>

- Type: `number`

Gets or sets the animation current time.

```ts
import { animate } from 'effekt'

const animation = animate('.el', {
  duration: 1,
})

setTimeout(() => {
  console.log(animation.currentTime)
}, 500)
```

</details>

<details>
  <summary><code><strong>.playRate</strong></code></summary>

<br>

- Type: `number`

Gets or sets the animation playback rate before or during the animation.

```ts
import { animate } from 'effekt'

const animation = animate('.el', {
  duration: 1,
})

setTimeout(() => {
  animation.playRate = -1
}, 500)
```

</details>

<br>

## Data

<details>
  <summary><code><strong>.data</strong></code></summary>

<br>

- Type: `object`

Each animation instance provides a detailed status.

```ts
{
  autoplay: boolean
  direction: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse'
  playState: 'finished' | 'idle' | 'paused' | 'running'
  promiseState: 'pending' | 'fulfilled' | 'rejected'
  playRate: number
  duration: number
  repeat: number
  delay: number
  endDelay: number
  delta: number
  timestamp: number
  time: number
  initTime: number
  startTime: number
  pauseTime: number | null
  totalDuration: number
  maxDuration: number
  progress: number
  totalProgress: number
  isReverse: boolean
}
```

Data can be accessed at any time via methods or explicitly via read-only `.data` property.

```ts
import { animate } from 'effekt'

animate('.el', {
  duration: 1,
  onStart: (data) => {
    console.log(data)
  },
})
```

```ts
import { animate } from 'effekt'

const animation = animate('.el', {
  duration: 1,
})

setTimeout(() => {
  console.log(animation.data)
}, 500)
```

</details>

<br>

---

[← Back](./README.md)
