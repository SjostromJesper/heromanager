const MonsterEncounter = require("../../RandomEncounter/MonsterEncounter.js");
const Orc = require("../../Creatures/Orc.js");

module.exports = class Tile {
    constructor() {
        this.events = [];
        this.color = this.getColor()
        this.id = null;
    }

    getId(){
        throw new Error("implement me");
    }

    getColor() {
        throw new Error("implement me")
    }

    getRandomEvent() {
        if(Math.random() > 0.75){
            return new MonsterEncounter(new Orc());
        }
    }

    getDecisions() {
        throw new Error("implement me")
    }
}
