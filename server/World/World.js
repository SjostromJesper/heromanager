 module.exports = class World {

    constructor() {
        console.log("test");
        this.worldTiles = [[]];
        this.creatures = new Map();
    }

    getTiles(){
        return this.worldTiles;
    }

    addCreature(creature){
        this.creatures.set(creature.getId(), creature);
    }

    removeCreature(creature) {
        this.creatures.delete(creature.getId());
    }

     getCreature(id) {
        return this.creatures.get(id);
     }
 }

