import { Token, dieRoll, gameMap } from "./index"
test("tokem starts at position 1", () => {
  const testToken = new Token()
  expect(testToken.location).toBe(1)
})

test("expect a roll of 3 on new token to go to 4", () => {
  const testToken = new Token()
  testToken.move(3)
  expect(testToken.location).toBe(4)
})

test("expect a token on 1 to be in 8 after roll of 3 and 4", () => {
  const testToken = new Token()
  testToken.move(3)
  testToken.move(4)
  expect(testToken.location).toBe(8)
})

test("expect a roll of 3 on 97 to win the game", () => {
  const testToken = new Token()
  testToken.goTo(97)
  testToken.move(3)
  expect(testToken.location).toBe(100)
  expect(testToken.won).toBe(true)
})

test("rolls past 100 do not move", () => {
  const testToken = new Token()
  testToken.goTo(97)
  testToken.move(4)
  expect(testToken.location).toBe(97)
  expect(testToken.won).toBe(false)
})

test("die roll results in random number 1-6", () => {
  for (let i = 0; i < 100; i++) {
    const roll = dieRoll()
    expect(roll).toBeLessThanOrEqual(6)
    expect(roll).toBeGreaterThanOrEqual(1)
    expect(roll - Math.floor(roll)).toBe(0)
  }
})

test("die roll of 4 results in moving by 4", () => {
  const testToken = new Token()
  testToken.roll(() => 4)
  expect(testToken.location).toBe(5)
})

test("snake goes down", () => {
  const testToken = new Token()
  gameMap.set(12, 2)
  testToken.move(1)
  expect(testToken.location).toBe(2)
  testToken.move(10)
  expect(testToken.location).toBe(2)
})

test("ladder goes up", () => {
  const testToken = new Token()
  gameMap.clear()
  gameMap.set(2, 12)
  testToken.move(1)
  expect(testToken.location).toBe(12)
  testToken.goTo(10)
  testToken.move(2)

  expect(testToken.location).toBe(12)
})
