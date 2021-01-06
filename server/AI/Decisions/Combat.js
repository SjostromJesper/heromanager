const Decision = require('./Decision.js')
const MonsterEncounter = require('../../RandomEncounter/MonsterEncounter.js');

module.exports = class Combat extends Decision {

    perform(creatureTick) {
        if(creatureTick.getRandomEncounter() != null && creatureTick.getRandomEncounter().constructor.name === "MonsterEncounter"){ //TODO want to use 'instanceof' but couldn't get it to work
            //decision maker decided to fight the monsters
            console.log("decided to fight in random encounter")
            creatureTick.getRandomEncounter().logEncounterDescription(creatureTick);
            let creatures = creatureTick.getRandomEncounter().getCreatures();

        }else{
            //see if there's something to fight in our current whereabouts
        }
    }

    findEnemies() {
        return undefined;
    }
}
