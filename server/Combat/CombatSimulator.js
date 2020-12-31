//simulates EON combat rules

//in EON combat there are rules for
// one-on-one, many-on-one and one-on-many
// if both sides of the fight have multiple participants, the rules state that
// the combat is divided into sub-fights, such that each fight
// plays out as one-on-one, many-on-one, or one-on-many
//
// Parameters are two arrays of class 'EONCreature'
const Dice = require("../Dice/Dice.js");
const CombatLog = require("../StoryGenerator/CombatLog.js");
const OtherNameGenerator = require("../Generators/OtherNameGenerator.js");
const DicePool = require("../Dice/DicePool.js");


const offensiveTactics = {
    STANDARD_ATTACK: "standard_attack",
    QUICK_ATTACK: "quick_attack",
    POWERFUL_ATTACK: "powerful_attack",
    GROUP_ATTACK: "group_attack"
}
const defensiveTactics = {
    STANDARD_DEFENSE: "standard_defense",
    ACTIVE_DEFENSE: "active_defense",
    COUNTER: "counter"
}

const defensiveMoves = {
    PARRY: "parry",
    BLOCK: "block",
    DODGE: "dodge"
}

//EON combat distances, value is 'difficulty'
const distances = {
    SHORT: 6,
    MEDIUM: 10,
    LONG: 14,
    VERY_LONG: 18
}

const bodyParts = {
    HEAD: "head",
    TORSO: "torso",
    LEFT_ARM: "left arm",
    RIGHT_ARM: "right arm",
    LEFT_LEG: "left leg",
    RIGHT_LEG: "right leg"
}

const phases = {
    RANGED: "ranged",
    MELEE: "melee",
    MAGIC: "magic"
}

module.exports = function testCombat() {
    let group1 = [new EONTestCreature()];
    let group2 = [new EONTestCreature()];

    let combatSimulator = getSimulator(group1, group2)
    console.log("Simulator: " + combatSimulator.test);
    while (!combatSimulator.done) {
        let combatLog = combatSimulator.next();
    }
}

module.exports = function getSimulator(group1, group2) {
    if (group1.length === 1 && group2.length === 1) {
        return oneOnOne(group1[0], group2[0])
    } else if (group1.length === 1 && group2.length > 1) {
        return oneOnMany(group1[0], group2);
    } else if (group2.length > 1 && group2.length === 1) {
        return manyOnOne(group1, group2[0])
    } else if (group1.length > 1 && group2.length > 1) {
        //divide into subfights - split the groups into smaller groups
        //then call this function again as many times as are required
        //
        //example
        // 2 on 2 gets split to 1-1 & 1-1
        // 2 on 3 gets split to 1-2 & 1-1
        // 3 on 8 gets split to 1-3 % 1-3 & 1-2
        // a fight can have at most 4 creatures on either side, presumably because by then you are covered
        throw new Error("divide into subfights not yet implemented");
    } else {
        throw new Error("No matching fight case for groups");
    }
}

//first parameter is assumed to be a player character
//perform each step of combat by calling next
//each step returns a user-readable combat log
//
// first step will log that a combat is about to begin, and it's participants

/*
function* generator(){
    yield "hej";
    yield "då";
    return;
}
*/

/*let thing = generator(); //thing instanceof Generator

console.log(thing.next()); //hej
console.log(thing.next()); //då

thing.next === undefined
thing.done = true;*/

function* oneOnOne(creature1, creature2) {
    this.test = "";
    let combatLog = new CombatLog();
    combatLog.startOfCombat(creature1, creature2);

    yield combatLog;

    //Loop Rounds
    for (; ;) {
        //reactions
        let reaction1 = creature1.rollReaction();
        let reaction2 = creature2.rollReaction();
        let attacker = null;
        let defender = null;

        if (reaction1 >= reaction2) { //TODO fix ties
            attacker = creature1;
            defender = creature2;
        } else {
            attacker = creature2;
            defender = creature1;
        }

        //don't execute a round of combat if there's no one to fight
        if (creature1.isDead() || creature2.isDead()) {
            //returning signals the end of the generator function
            return combatLog;
        }

        //creatures pick in which phase they would like to act
        let attackerPhase = attacker.pickPhase();
        let defenderPhase = defender.pickPhase();

        //Ranged phase - Avståndsfasen
        if (attackerPhase === phases.RANGED) {
            //NYI
        }

        //Melee phase - Närstridsfasen
        if (attackerPhase === phases.MELEE) {
            let attackRoll = attacker.rollAttack();
            let defenseRoll = defender.rollDefense();

            if (attackRoll >= defenseRoll) { //tie breaker is attacker wins, eon rules
                let bodyPart = getBodyPart();
                let damageEffect = getDamageEffect();
                let damageTableNumber = getDamageTableRoll(damageEffect);

            } else {
                //nothing happens?
            }
        }

        //Magic phase - Mystikfasen
        //NY

        yield combatLog;
    }
}

//many-on-one may play out differently from one-on-many
//as one player-character against many NPCs could have different rules than
//one NPC against many player characters
function* manyOnOne(group1, creature2) {
    throw new Error("not yet implemented");
}

function* oneOnMany(creature1, group2) {
    throw new Error("not yet implemented");
}

function getBodyPart() {
    let nr = new Dice(10).roll();
    switch (nr) {
        case 1:
            return bodyParts.HEAD;
        case 2 || 3 || 4:
            return bodyParts.TORSO;
        case 5 || 6:
            return bodyParts.LEFT_ARM;
        case 7 || 8:
            return bodyParts.RIGHT_ARM;
        case 9:
            return bodyParts.LEFT_LEG;
        case 10:
            return bodyParts.RIGHT_LEG;
        default:
            throw new Error("no body part defined for " + nr);
    }
}

//amounts of damage (skadeverkan/damage effect) equal different results in the damage table
//can return null, indicating no damage was taken (a creature may still have taken exhaustion)
//by looking at the damage table in the book, one can see that the additional damage is most easily calculated as
//exhaustion - 4
function getDamageTableRoll(damageEffect) {
    if (damageEffect <= 9) {
        return null;
    }
    return new Dice(10).roll() + Math.max(0, getExhaustion(damageEffect) - 4);
}

//pass a damage table roll
//In the book, there are a lot of various results here, including a lot of different injuries that remain during the fight
//for now, just say that any number over 10 is a deathblow, for which s save must be rolled or you are dead
function getDamageTableResult(damageTableRoll) {

}

//amounts of damage cause different amounts of exhaustion
//
//using corresponding math formulas for the table
//
// 1-4 = 1
// 5-9 = 2
// 10-14 = 4
// 15-19 = 6
// 20-24 = 8
// and so on, where the first two steps of 5 damage increases exhaustion by one
// and steps of 5 damage after that increases exhaustion by 2
/**
 * @param damage mängden skadeverkan som varelsen tog
 * @returns {number} herp de deurpe
 */
function getExhaustion(damage) {
    if (damage <= 9) {
        return 1 + Math.trunc(damage / 5);
    }
    return Math.trunc(damage / 5) * 2;
}

//Skadeverkan = skadeslaget - rustning = vapenskada + grundskada + modiferare - rustning - grundrustning;
function getDamageEffect(attacker, defender) {
    return attacker.rollDamage() - defender.getArmorValue() - defender.getBaseArmorValue();
}

//functions that an object needs to define to participate
module.exports = class EONCreature {
    constructor() {

    }

    getName() {
        throw new Error("Implement me");
    }

    rollReaction() {
        throw new Error("Implement me");
    }

    pickPhase() {
        throw new Error("Implement me");
    }

    takeDamage(amount) {

    }

    //Chokslag - Varje gång en skada leder till att man ökar utmattning sår man ett Chokslag
    //Se undantag i regelboken om utmattning
    rollShock() {

    }

    //Dödsslag - På vissa tabellresultat (för tagen skada?) måste man slå ett dödsslag.
    rollDeath() {

    }

    //skadeslaget = vapenskada + grundskada + modifierare
    rollDamage() {
        return this.rollWeaponDamage() + this.rollBaseDamage() + this.getModifierDamage();
    }

    rollWeaponDamage() {
        throw new Error("implement me");
    }

    rollBaseDamage() {

    }

    getModifierDamage() {
        return 0;
        //NYI
    }

    //Eon rules mention "Rustningens skydd"
    getArmorValue() {
        throw new Error("Implement me");
    }

    //Eon rules mention "grundrustningen"
    getBaseArmorValue() {
        throw new Error("Implement me");
    }

    rollAttack() {
        throw new Error("Implement me");
    }

    //block, dodge or parry
    rollDefense() {
        throw new Error("Implement me");
    }
}

class EONTestCreature extends EONCreature {
    constructor() {
        super();
        this.exhaustion = 0;
    }

    getName() {
        return new OtherNameGenerator().getRandomName();
    }

    rollReaction() {
        return new Dice(6).roll();
    }

    pickPhase() {
        return phases.MELEE;
    }

    getModifiedExhaustion() {
        return this.getBaseExhaustion() + this.exhaustion;
    }

    addExhaustion(amount) {
        this.exhaustion += amount;
    }

    rollWeaponDamage() {
        throw new Error("implement me");
    }

    getBaseExhaustion() {
        return 0;
    }

    rollBaseDamage() {
        throw new Error("implement me");
    }

    getModifierDamage() {
        throw new Error("implement me");
    }

    //Eon rules mention "Rustningens skydd"
    getArmorValue() {
        return 1;
    }

    //Eon rules mention "grundrustningen"
    getBaseArmorValue() {
        return 1;
    }

    rollAttack() {
        return new DicePool([new Dice(6), new Dice(6)]).roll();
    }

    //block, dodge or parry
    rollDefense() {
        return new DicePool([new Dice(6), new Dice(6)]).roll();
    }
}

const DamageTable = {

    slashingAndCrushing: {},
    piercingAndRanged: {}
}