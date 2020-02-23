type SpeedValues = 1 | 0 | -1

export type Position = {
  lat: number
  lon: number
}

export enum Directions {
  NORTH,
  SOUTH,
  EAST,
  WEST
}

export enum Colours {
  BLACK,
  WHITE
}

export const directionToPosUpdater = (
  d: Directions
): ((cur: Position) => Position) => {
  switch (d) {
    case Directions.NORTH:
      return (cur: Position) => ({ ...cur, lat: cur.lat - 1 })
    case Directions.SOUTH:
      return (cur: Position) => ({ ...cur, lat: cur.lat + 1 })
    case Directions.WEST:
      return (cur: Position) => ({ ...cur, lon: cur.lon - 1 })
    case Directions.EAST:
      return (cur: Position) => ({ ...cur, lon: cur.lon + 1 })
  }
}

export function newDirection(
  direction: Directions,
  colour: Colours
): Directions {
  if (colour === Colours.WHITE)
    switch (direction) {
      case Directions.NORTH:
        return Directions.EAST
      case Directions.EAST:
        return Directions.SOUTH
      case Directions.SOUTH:
        return Directions.WEST
      case Directions.WEST:
        return Directions.NORTH
    }
  else
    switch (direction) {
      case Directions.NORTH:
        return Directions.WEST
      case Directions.WEST:
        return Directions.SOUTH
      case Directions.SOUTH:
        return Directions.EAST
      case Directions.EAST:
        return Directions.NORTH
    }
}

export function flipColour(c: Colours): Colours {
  if (c === Colours.BLACK) return Colours.WHITE
  else return Colours.BLACK
}

export type Ant = {
  pos: Position
  direction: Directions
}

export class Game {
  public readonly ant: Ant
  public readonly field: Colours[][]

  constructor(private size: number) {
    this.field = []
    this.ant = { pos: { lon: 0, lat: 0 }, direction: Directions.NORTH }
    for (let i = 0; i < size; i++) {
      const line = []
      for (let j = 0; j < size; j++) line.push(Colours.WHITE)
      this.field.push(line)
    }
  }

  public update() {
    const { lat, lon } = this.ant.pos
    const prevcol = this.field[lat][lon]
    this.field[lat][lon] = flipColour(this.field[lat][lon])
    const clip = (x: number) =>
      x < 0 ? this.size + x : x > this.size ? x - this.size : x
    const clippos = (p: Position): Position => ({
      lat: clip(p.lat),
      lon: clip(p.lon)
    })
    this.ant.pos = clippos(
      directionToPosUpdater(this.ant.direction)(this.ant.pos)
    )
    this.ant.direction = newDirection(this.ant.direction, prevcol)
  }
}
