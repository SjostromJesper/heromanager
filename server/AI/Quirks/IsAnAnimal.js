const Quirk = require('./Quirk')
const Wary = require('./Wary.js')
const Flee = require('../Decisions/Flee.js');

module.exports = class IsAnAnimal extends Wary {
    getProbability(decision) {
        let probability = super.getProbability(decision);
        if(decision instanceof Flee){
            return -100000;
        }
        return 1;
    }
}