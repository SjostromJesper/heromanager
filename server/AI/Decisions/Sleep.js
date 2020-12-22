const Decision = require('./Decision.js');

module.exports = class Sleep extends Decision{
    perform(creatureTick) {
        console.log("sleeping")
    }
}
