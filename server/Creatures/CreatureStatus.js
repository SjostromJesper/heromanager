
module.exports = class CreatureStatus{

    getBodyParts() {
        return this._bodyParts;
    }

    setBodyParts(value) {
        this._bodyParts = value;
    }

    getHealth() {
        return this.health;
    }

    setHealth(value) {
        this.health = value;
    }

    // < 0 means that you need to eat
    getHunger(){
        return this.hunger;
    }

    setHunger(hunger){
        this.hunger = hunger;
    }

    getMaxHunger(){
        return this.maxHunger;
    }

    setMaxHunger(maxHunger){
        this.maxHunger = maxHunger;
    }

    constructor() {
        this.health = 100;
        this.hunger = 200;
        this.maxHunger = 300;
        this._bodyParts = [];
    }

}