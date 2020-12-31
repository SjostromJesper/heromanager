module.exports = class Dice {
    constructor(sides) {
        this.sides = sides;
    }

    roll() {
        return 1 + Math.floor(Math.random() * this.sides)
    }
}