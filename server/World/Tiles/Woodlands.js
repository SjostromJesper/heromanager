const Tile = require("./Tile.js");

module.exports = class Woodlands extends Tile {

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
