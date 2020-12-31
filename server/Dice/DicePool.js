module.exports = class DicePool {
    constructor(...dice) {
        this.dicePool = [];
        this.dicePool.push(dice);
    }

    roll() {
        return this.dicePool.reduce((total, dice) => total + dice.roll(), 0);
    }
}