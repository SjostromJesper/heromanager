const RandomEncounter = require("./RandomEncounter.js");
const Combat = require("../AI/Decisions/Combat.js");
const Flee = require("../AI/Decisions/Flee.js");

module.exports = class MonsterEncounter extends RandomEncounter{
    constructor(creatures) {
        super();
        this.creatures = creatures;
    }

    getAvailableDecisions() {
        return [new Combat(), new Flee()];
    }

    getCreatures(){
        return this.creatures;
    }
}