const RandomEncounter = require("./RandomEncounter.js");
const Combat = require("../AI/Decisions/Combat.js");
const Flee = require("../AI/Decisions/Flee.js");

module.exports = class MonsterEncounter extends RandomEncounter{
    constructor(creatures) {
        super();
        this.creatures = creatures;
    }

    getAvailableDecisions() {
        let combat = new Combat();
        combat.setMandatory(true);
        let flee = new Flee();
        flee.setMandatory(true);
        return [combat, flee];
    }

    getDescription(){
        return "You encounter a fierce monster!";
    }

    getCreatures(){
        return this.creatures;
    }
}