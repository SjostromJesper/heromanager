const RandomEncounter = require("../RandomEncounter/RandomEncounter.js");

//Holder object for things that happen
//during a tick for a creature
//for example the decision it has made
//an event that has occurred
//outcomes e.t.c
//
module.exports = class CreatureTick{

    constructor() {
        this.actingCreature = null;
        this.randomEncounter = null;
        this.creatureTile = null;
        this.world = null;
    }

    //Creatures that are spawned as part of an event are in the event
    //this is just a helper to get them
    getEncounterCreatures(){
        if(this.randomEncounter != null){
            return this.randomEncounter.getCreatures();
        }
    }

    getWorld() {
        return this.world;
    }

    setWorld(world) {
        this.world = world;
    }

    //The tile the current creature is on
    setCreatureTile(creatureTile) {
        this.creatureTile = creatureTile;
    }

    //The tile the current creature is on
    getCreatureTile() {
        return this.creatureTile;
    }

    //The creature that is currently doing something
    setActingCreature(creature) {
        this.actingCreature = creature;
    }

    getActingCreature() {
       return this.actingCreature;
    }

    setRandomEncounter(randomEncounter) {
        this.randomEncounter = randomEncounter;
    }

    getRandomEncounter(){
        return this.randomEncounter;
    }
}
