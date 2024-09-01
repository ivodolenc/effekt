const composeRegex = (...regxs: RegExp[]) =>
  new RegExp(regxs.map((r) => r.source).join('|'))

export const rgxBrackets = /\((.*?)\)/

export const rgxDigits = /(-?[0-9.]+)/g

export const rgxDigitsOnly = /^\d+$/

export const rgxColor = /^(#|rgb|hsl)/

export const rgxIsColor = /(color|background)/i

export const rgxUnits =
  /(px|pt|pc|in|cm|mm|em|rem|%|ex|ch|fr|vw|vh|vmin|vmax|deg|rad|turn)/

export const rgxPxTransform = /^(x|y|z|translate|perspective)/

export const rgxPxOther =
  /(width|height|margin|padding|inset|top|right|bottom|left)/i

export const rgxDegTransform = /^(rotate|skew)/

export const rgxUnitlessTransform = /^scale/

export const rgxIsTransform = composeRegex(
  rgxPxTransform,
  rgxDegTransform,
  rgxUnitlessTransform,
)

export const rgxPxAll = composeRegex(rgxPxTransform, rgxPxOther)

export const rgxShadow = /shadow/i

export const rgxIsFilter =
  /(blur|bright|contrast|dropShadow|gray|hue|invert|opacityFilter|saturate|sepia)/i
