const Decision = require('./Decision.js')

module.exports = class Combat extends Decision {

    perform(creatureTick) {

        let enemyCreatures = findEnemies();

        doAttack(creature, enemyCreatures);
    }

    findEnemies() {
        return undefined;
    }
}
