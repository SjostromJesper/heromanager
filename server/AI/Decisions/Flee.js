const Decision = require('./Decision.js');
const Move = require('./Move.js');
const Combat = require('./Combat.js');

module.exports = class Flee extends Decision{
    perform(creatureTick) {
        if(Math.random() < creatureTick.getActingCreature().getEscapeChance(creatureTick)){
            new Move().perform(creatureTick);
        }else{
            //if we don't manage to flee, do the combat anyway
            new Combat().perform(creatureTick);
        }
    }
}

