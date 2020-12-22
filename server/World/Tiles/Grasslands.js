const Tile = require("./Tile.js");
const MonsterEncounter = require("../../RandomEncounter/MonsterEncounter.js");
const Orc = require("../../Creatures/Orc.js");



module.exports =class Grasslands extends Tile{
    constructor() {
        super();
    }

    getId() {
        return tileIds.grasslands;
    }

    getColor() {
        return 'green';
    }

    getRandomEvent(){
        if(Math.random() > 0.8){
            /*return new MonsterEncounter(new Orc());*/
        }
        return null;
    }

    getDecisions() {
        return []
    }
}
