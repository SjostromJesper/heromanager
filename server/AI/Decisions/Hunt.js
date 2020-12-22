const Decision = require('./Decision.js');

module.exports = class Hunt extends Decision{
    perform(creatureTick) {

        creatureTick.getActingCreature().getInventory()
    }
}
