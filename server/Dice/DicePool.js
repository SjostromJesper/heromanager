module.exports = class DicePool {
    constructor(...dices) {
        this.dicePool = [];
        dices.forEach(dice => {
            this.dicePool.push(dice);
        })
    }

    get roll(){
        return this.doRoll();
    }

    doRoll() {
        let roll = 0;
        for(let i = 0; i < this.dicePool.length; i++){
            roll += this.dicePool[i].roll
        }
        return roll;
    }
}