const CreatureStatus = require('./CreatureStatus.js');
const Inventory = require('../Inventory/Inventory.js')
const DecisionMaker = require('../AI/DecisionMaker.js');
const LogBook = require('../Items/LogBook.js');

module.exports = class Creature{

    constructor(quirks = "", bodyParts = "", items = "", x = 0, y= 0) {
        this.quirks = quirks;
        this.creatureStatus = new CreatureStatus();
        this.knownCoordinates = new Set();
        this.inventory = new Inventory(items);
        this.coordinate = {x: x, y: y};
        this.home = {x: x, y: y};
        this.id = Math.trunc(Date.now() * Math.random());
        this.name = "getDemonNameGenerator().getRandomName()";
        this.creatureStatus.health = 10;
        this.creatureDecisions = [decisions.move, decisions.eat];
        this.currentDecision = null;
        this.inventory.addItem(new LogBook()); //a creature always has a log book
        this.updateKnownTiles();
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

    getInventory = () => {
        return this.inventory;
    }

    //helper method so we don't have to dig into the inventory every time to log something
    writeLogEntry(title, entry){
        this.inventory.getCurrentLogBook().addNewLog(title, entry)
    }

    updateKnownTiles(creatureTick = null){
        this.getVisibleTiles(creatureTick).forEach(coordinate => this.knownCoordinates.add(coordinate));
    }

    getVisibleTiles(creatureTick = null){
        let x = this.coordinate.x;
        let y = this.coordinate.y;
        let visibleTiles = [];

        //current
        visibleTiles.push({x: x, y: y});

        //diagonals
        visibleTiles.push({x: x+1, y: y+1}); //top right
        visibleTiles.push({x: x-1, y: y+1}); //top left
        visibleTiles.push({x: x+1, y: y-1}); //bottom right
        visibleTiles.push({x: x-1, y: y-1}); //bottom left

        //up down
        visibleTiles.push({x: x, y: y+1}); //over
        visibleTiles.push({x: x, y: y-1}); //under

        //left right
        visibleTiles.push({x: x+1, y: y}); //right
        visibleTiles.push({x: x-1, y: y}); //left
        return visibleTiles;
    }

    //TODO set.has doesn't work with objects (Has to be the exact same object)
    knowsCoordinate(x, y){
        let knownCheck = false;
        this.knownCoordinates.forEach(known => {
            if (known.x === x && known.y === y){
                knownCheck = true;
            }
        });
        return knownCheck;
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
        if(creatureTick.getRandomEncounter()){
            availableDecisions.push(...creatureTick.getRandomEncounter().getAvailableDecisions());
        }

        let uniqueDecisions =  [...new Set(availableDecisions)];

        let decision = new DecisionMaker().getDecision(creatureTick, uniqueDecisions);

        return decision;
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
