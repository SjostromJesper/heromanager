const Decision = require('./Decision.js')
const MonsterEncounter = require('../../RandomEncounter/MonsterEncounter.js');

module.exports = class Combat extends Decision {

    perform(creatureTick) {
        if(creatureTick.getRandomEncounter() != null && creatureTick.getRandomEncounter().constructor.name === "MonsterEncounter"){ //TODO want to use 'instanceof' but couldn't get it to work
            //decision maker decided to fight the monsters
            creatureTick.getRandomEncounter().logEncounterDescription(creatureTick);
        }else{
            //see if there's something to fight in our current whereabouts
        }
    }

    findEnemies() {
        return undefined;
    }
}
