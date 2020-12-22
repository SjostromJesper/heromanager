const Creature = require('../Creatures/Creature.js');

module.exports = class Farmer extends Creature {

    getCustomDecisions() {
        //things a farmer would do that a base creature maybe wouldn't
        return [];
    }

    getColor() {
        return 'rgb(255,228,128)'
    }

}
