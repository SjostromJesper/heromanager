const Tile = require("./Tile.js");


module.exports = class MountainTile extends Tile{
    constructor() {
        super();
    }

    getColor() {
        return 'grey'
    }

    getId() {
        return tileIds.mountain;
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
        return []
    }
}
