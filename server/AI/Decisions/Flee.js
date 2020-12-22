const Decision = require('./Decision.js');

module.exports = class Flee extends Decision{
    perform(creatureTick) {
        console.log("fleeing")
    }
}

