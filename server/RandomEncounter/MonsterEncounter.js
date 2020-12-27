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

    logEncounterDescription(creatureTick){
        creatureTick.getActingCreature().writeLogEntry("dear diary: monsters", "I encountered a fierce monster in the " + creatureTick.getCreatureTile().constructor.name);
    }

    getCreatures(){
        return this.creatures;
    }
}