module.exports = class Dice {

    constructor(sides) {
        this.sides = sides;
    }

    doRoll() { //<- this function not accessible in "DicePool.js" because of reasons, defining a getter fixes it
        return 1 + Math.floor(Math.random() * this.sides);
    }

    get roll(){ //<- getter is public, whereas 'doRoll' is only sort of public but not really ¯\_(ツ)_/¯
        return this.doRoll();
    }
}