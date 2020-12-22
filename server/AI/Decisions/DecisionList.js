const Flee = require('./Flee.js');
const Move = require('./Move.js');
const Combat = require('./Combat.js');
const Sleep = require('./Sleep.js');
const Hunt = require('./Hunt.js');
const Gather = require('./Gather.js');
const Eat = require('./Eat.js');

module.exports = function decisionsList(global) {
    const mod = global.decisions = {};

    mod.flee = new Flee();
    mod.move = new Move();
    mod.combat = new Combat();
    mod.gather = new Gather();
    mod.sleep = new Sleep();
    mod.hunt = new Hunt();
    mod.eat = new Eat();
}
