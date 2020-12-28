const Decision = require('./Decision.js');

module.exports = class Eat extends Decision{
    perform(creatureTick) {
        creatureTick.getActingCreature().getCreatureStatus().setHunger(200);
    }

    getTickCost() {
        return 1;
    }

    //return a list of decisions that would make us able to perform this decision
    //or nothing if
    getRequirements(creatureTick) {
        return creatureTick.getActingCreature().getInventory().hasFood();
    }
}
