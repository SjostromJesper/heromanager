
module.exports = class EventReport{

    constructor() {
        this.creatures = [];
        this.tile = null;
    }

    setTile(tile){
        this.tile = tile;
    }

    getTile(){
        return this.tile;
    }

    addCreature(creature){
        this.creatures.add(creature);
    }

    getCreatures(){
        return this.creatures;
    }
}