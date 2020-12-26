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
        let encounter = super.getRandomEvent();
        if (encounter == null)
        {
            if (Math.random() > 0.8) {
                /*return new MonsterEncounter(new Orc());*/
            }
        }

        return encounter;
    }

    getDecisions() {
        return [decisions.gather, decisions.hunt];
    }
}
