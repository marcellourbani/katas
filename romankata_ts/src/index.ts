console.log("Hello, world")

const digits: Map<number, string> = new Map([
  [1, "I"],
  [5, "V"],
  [10, "X"],
  [50, "L"],
  [100, "C"],
  [500, "D"],
  [1000, "M"]
])
const romanDigits = new Map([...digits.entries()].map(x => [x[1], x[0]]))
const digitValues = [...digits.keys()].sort((x, y) =>
  x < y ? 1 : x === y ? 0 : -1
)

function biggestDigitIndex(num: number) {
  return digitValues.find(x => x < num) || 1
}

function nextDigit(num: number) {
  return digitValues[digitValues.indexOf(num) - 1]
}

function validSubtraction(num: number) {
  return num !== 5 && num !== 50 && num !== 500
}

function subtraction(num: number, upper: number) {
  return (
    upper &&
    digitValues.find(x => validSubtraction(x) && upper > x && upper - x <= num)
  )
}

export function roman(num: number): string {
  if (num < 1) return ""
  const single = digits.get(num)
  if (single) return single

  if (num > 0) {
    const index = biggestDigitIndex(num)
    const upperIndex = nextDigit(index)
    const subIndex = subtraction(num, upperIndex)
    if (upperIndex && subIndex)
      return `${digits.get(subIndex)}${digits.get(upperIndex)}${roman(
        num - upperIndex + subIndex
      )}`

    return `${digits.get(index)}${roman(num - index)}`
  }

  throw new Error("Unknown number")
}

export function arabic(roman: string): number {
  if (roman === "") return 0
  let result = 0
  let lastDigit = 0
  for (const digit of roman) {
    const digitValue = romanDigits.get(digit)
    if (!digitValue) throw new Error("Unknown digit")
    result += digitValue
    if (digitValue > lastDigit) result -= 2 * lastDigit
    lastDigit = digitValue
  }
  return result
}
