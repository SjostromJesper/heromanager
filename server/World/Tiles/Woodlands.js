const Tile = require("./Tile.js");
const MonsterEncounter = require("../../RandomEncounter/MonsterEncounter.js");
const Orc = require("../../Creatures/Orc.js");


module.exports = class Woodlands extends Tile{
    constructor() {
        super();
    }

    getColor() {
        return 'darkgreen';
    }

    getId() {
       return tileIds.woodlands;
    }

    getRandomEvent(){
        if(Math.random() > 0.9998){
            /*return new MonsterEncounter(new Orc());*/
        }
        return null;
    }

    getDecisions() {
        return [decisions.gather, decisions.hunt];
    }
}
