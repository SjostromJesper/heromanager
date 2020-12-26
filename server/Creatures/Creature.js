const CreatureStatus = require('./CreatureStatus.js');
const Inventory = require('../Inventory/Inventory.js')
const DecisionMaker = require('../AI/DecisionMaker.js');


module.exports = class Creature{

    constructor(quirks = "", bodyParts = "", items = "", x = 0, y= 0) {
        this.quirks = quirks;
        this.creatureStatus = new CreatureStatus();
        this.knownCoordinates = new Set();
        this.inventory = new Inventory(items);
        this.coordinate = {x:x, y:y};
        this.home = {x:x, y:y};
        this.id = Date.now() * Math.random();
        this.name = "getDemonNameGenerator().getRandomName()";
        this.creatureStatus.health = 10;
        this.creatureDecisions = [decisions.move, decisions.eat];
        this.currentDecision = null;
    }

    getHomeCoordinate(){
        return this.home;
    }

    //is compared against Math.random, so should return a double 0 - 0.99999
    //0.9 is 90% chance
    getEscapeChance(){
        return 0.9;
    }

    getId(){
        return this.id;
    }

    getInventory(){
        return this.inventory;
    }

    makeDecision(creatureTick){
        const availableDecisions = []

        //any decisions the custom creature might be able to make
        availableDecisions.push(...creatureTick.getActingCreature().getCustomDecisions());

        //any decisions offered by the tile we're on
        availableDecisions.push(...creatureTick.creatureTile.getDecisions());

        //default creature decisions
        availableDecisions.push(...this.creatureDecisions);

        //any decisions offered by the random event
        if(creatureTick.getRandomEvent()){
            availableDecisions.push(...creatureTick.getRandomEvent().getAvailableDecisions());
        }

        let uniqueDecisions =  [...new Set(availableDecisions)];

        let decision = new DecisionMaker().getDecision(creatureTick, uniqueDecisions);

        //TODO
        //return decision;

        return decisions.move;
    }

    getCustomDecisions(){
        throw new Error("Creatures must implement this");
    }

    setKnownTile(x,y){
        this.knownCoordinates.push({x:x, y:y});
    }

    getQuirks(){
        return this.quirks
    }

    getAdjacentTiles(){

    }

    getName(){
        return this.name;
    }

    getGoal(){
        return this.quirks[0]
    }

    getCreatureStatus(){
        return this.creatureStatus;
    }

    getColor() {
        throw new Error("implement me")
    }

    hungerTick(){
        this.creatureStatus.setHunger(this.creatureStatus.getHunger()-1);

        if(this.creatureStatus.getHunger() < 0){
            this.creatureStatus.setHealth(this.creatureStatus.getHealth()-1);
        }
    }

    isDead(){
        return this.creatureStatus.getHealth() <= 0;
    }


    getOpinionOf(otherCreature) {

    }
}
