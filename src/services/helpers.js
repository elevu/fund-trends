export const antdPresets = [
  'magenta',
  'red',
  'volcano',
  'orange',
  'gold',
  'lime',
  'green',
  'cyan',
  'bluegeek',
  'bluepurple',
]

export const colorFromString = (str, colorList = antdPresets) => {
  const numberFromString = parseInt(String(str.length).charAt(0))
  return colorList[numberFromString]
}