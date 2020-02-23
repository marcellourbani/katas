import { roman, arabic } from "./index"
test("zero", () => {
  expect(roman(0)).toBe("")
})

test("single digit", () => {
  expect(roman(1)).toBe("I")
  expect(roman(5)).toBe("V")
  expect(roman(10)).toBe("X")
  expect(roman(50)).toBe("L")
  expect(roman(500)).toBe("D")
  expect(roman(100)).toBe("C")
  expect(roman(1000)).toBe("M")
})

test("Additive", () => {
  expect(roman(2)).toBe("II")
  expect(roman(3)).toBe("III")
  expect(roman(20)).toBe("XX")
  expect(roman(30)).toBe("XXX")
  expect(roman(3000)).toBe("MMM")
  expect(roman(300)).toBe("CCC")
})

test("Subtractive", () => {
  expect(roman(4)).toBe("IV")
  expect(roman(40)).toBe("XL")
})

test("Complex", () => {
  expect(roman(2751)).toBe("MMDCCLI")
  expect(roman(9)).toBe("IX")
  expect(roman(369)).toBe("CCCLXIX")
})

test("reverse 0", () => {
  expect(arabic("")).toBe(0)
})

test("reverse single digit", () => {
  expect(arabic("I")).toBe(1)
  expect(arabic("V")).toBe(5)
  expect(arabic("X")).toBe(10)
  expect(arabic("L")).toBe(50)
  expect(arabic("D")).toBe(500)
  expect(arabic("C")).toBe(100)
  expect(arabic("M")).toBe(1000)
})

test("reverse Additive", () => {
  expect(arabic("II")).toBe(2)
  expect(arabic("III")).toBe(3)
  expect(arabic("XX")).toBe(20)
  expect(arabic("XXX")).toBe(30)
  expect(arabic("MMM")).toBe(3000)
  expect(arabic("CCC")).toBe(300)
})
test("reverse Subtractive", () => {
  expect(arabic("IV")).toBe(4)
  expect(arabic("XL")).toBe(40)
})

test("reverse Complex", () => {
  expect(arabic("MMDCCLI")).toBe(2751)
  expect(arabic("IX")).toBe(9)
  expect(arabic("CCCLXIX")).toBe(369)
})
