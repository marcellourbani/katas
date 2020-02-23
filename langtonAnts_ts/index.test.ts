import {
  directionToPosUpdater,
  Position,
  newDirection,
  Directions,
  Colours,
  flipColour,
  Game
} from "."

test("turns", () => {
  expect(newDirection(Directions.NORTH, Colours.WHITE)).toBe(Directions.EAST)
  expect(newDirection(Directions.EAST, Colours.WHITE)).toBe(Directions.SOUTH)
  expect(newDirection(Directions.SOUTH, Colours.WHITE)).toBe(Directions.WEST)
  expect(newDirection(Directions.WEST, Colours.WHITE)).toBe(Directions.NORTH)
  expect(newDirection(Directions.NORTH, Colours.BLACK)).toBe(Directions.WEST)
  expect(newDirection(Directions.WEST, Colours.BLACK)).toBe(Directions.SOUTH)
  expect(newDirection(Directions.SOUTH, Colours.BLACK)).toBe(Directions.EAST)
  expect(newDirection(Directions.EAST, Colours.BLACK)).toBe(Directions.NORTH)
})

test("colours", () => {
  expect(flipColour(Colours.BLACK)).toBe(Colours.WHITE)
  expect(flipColour(Colours.WHITE)).toBe(Colours.BLACK)
})

test("positionUpdater", () => {
  const startPos: Position = { lat: 4, lon: 2 }
  let newPos = directionToPosUpdater(Directions.NORTH)(startPos)
  expect(newPos.lon).toBe(2)
  expect(newPos.lat).toBe(3)
  newPos = directionToPosUpdater(Directions.SOUTH)(startPos)
  expect(newPos.lon).toBe(2)
  expect(newPos.lat).toBe(5)
  newPos = directionToPosUpdater(Directions.WEST)(startPos)
  expect(newPos.lon).toBe(1)
  expect(newPos.lat).toBe(4)
  newPos = directionToPosUpdater(Directions.EAST)(startPos)
  expect(newPos.lon).toBe(3)
  expect(newPos.lat).toBe(4)
})

test("constructor", () => {
  const game = new Game(10)
  expect(game.field.length).toBe(10)
  expect(game.field[3].length).toBe(10)
})

test("update", () => {
  const game = new Game(10)
  game.ant.direction = Directions.SOUTH
  game.ant.pos.lat = 0
  game.ant.pos.lon = 0
  game.field[0][0] = Colours.WHITE
  game.update()
  expect(game.ant.pos.lon).toBe(0)
  expect(game.ant.pos.lat).toBe(1)
  expect(game.field[0][0]).toBe(Colours.BLACK)
  expect(game.ant.direction).toBe(Directions.WEST)
  game.ant.direction = Directions.NORTH
  game.ant.pos.lat = 0
  game.ant.pos.lon = 0
  game.field[game.ant.pos.lat][game.ant.pos.lon] = Colours.BLACK
  game.update()
  expect(game.ant.pos.lon).toBe(0)
  expect(game.ant.pos.lat).toBe(9)
  expect(game.field[0][0]).toBe(Colours.WHITE)
  expect(game.ant.direction).toBe(Directions.WEST)
})
