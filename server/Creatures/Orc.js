const Creature = require('../Creatures/Creature.js');

module.exports = class Orc extends Creature {

    getCustomDecisions(creatureTick) {
        return [decisions.attack];
    }

    getColor() {
        return 'black';
    }
}
