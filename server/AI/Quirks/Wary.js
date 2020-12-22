const Quirk = require('../Quirks/Quirk.js');
const Flee =  require('../Decisions/Flee.js');
const Move = require('../Decisions/Move.js');


module.exports = class Wary extends Quirk{
    getProbability(decision) {
        if(decision instanceof Flee)
        {
            return 9;
        }
        else if(decision instanceof Move){
            return 1;
        }
        return 0
    }
}