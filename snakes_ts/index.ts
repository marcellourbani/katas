console.log("hi")
export const dieRoll = () => Math.floor(Math.random() * 6 + 1)
interface Link {
  start: number
  end: number
}

export const gameMap = new Map<number, number>()

export class Token {
  roll(die = dieRoll) {
    this.move(die())
  }
  private tLocation = 1
  private boardSize = 100
  public get location() {
    return this.tLocation
  }
  public goTo(loc: number) {
    this.tLocation = loc
  }
  public move(roll: number) {
    if (this.tLocation + roll <= this.boardSize) {
      this.tLocation += roll
      this.tLocation = gameMap.get(this.location) || this.location
    }
  }
  public get won() {
    return this.tLocation === 100
  }
}
