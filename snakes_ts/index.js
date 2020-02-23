"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
console.log("hi");
exports.dieRoll = () => Math.floor(Math.random() * 6 + 1);
exports.gameMap = new Map();
class Token {
    constructor() {
        this.tLocation = 1;
        this.boardSize = 100;
    }
    roll(die = exports.dieRoll) {
        this.move(die());
    }
    get location() {
        return this.tLocation;
    }
    goTo(loc) {
        this.tLocation = loc;
    }
    move(roll) {
        if (this.tLocation + roll <= this.boardSize) {
            this.tLocation += roll;
            this.tLocation = exports.gameMap.get(this.location) || this.location;
        }
    }
    get won() {
        return this.tLocation === 100;
    }
}
exports.Token = Token;
