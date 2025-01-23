export const composeRegex = (...regxs: RegExp[]): RegExp =>
  new RegExp(regxs.map((r) => r.source).join('|'))
