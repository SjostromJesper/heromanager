const Decision = require('./Decision.js');

module.exports = class Gather extends Decision{
    perform(creatureTick) {
        console.log("gathering")
    }
}
