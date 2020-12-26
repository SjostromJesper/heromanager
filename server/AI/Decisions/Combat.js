const Decision = require('./Decision.js')
const MonsterEncounter = require('../../RandomEncounter/MonsterEncounter.js');

module.exports = class Combat extends Decision {

    perform(creatureTick) {
        if(creatureTick.getRandomEncounter() != null && creatureTick.getRandomEncounter().constructor.name === "MonsterEncounter"){
            //decision maker decided to fight the monsters
            console.log(creatureTick.getRandomEncounter().getDescription());
        }else{
            //see if there's something to fight in our current whereabouts
        }
    }

    findEnemies() {
        return undefined;
    }
}
