const Decision = require('./Decision.js')
const MonsterEncounter = require('../RandomEncounter/MonsterEncounter.js');

module.exports = class Combat extends Decision {

    perform(creatureTick) {
        if(creatureTick.getRandomEvent() instanceof MonsterEncounter){
            //decision maker decided to fight the monsters
        }else{
            //see if there's something to fight in our current whereabouts
        }
    }

    findEnemies() {
        return undefined;
    }
}
