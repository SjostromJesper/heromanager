const Tile = require("./Tile.js");

module.exports = class WaterTile extends Tile{
    constructor() {
        super();
    }

    getColor() {
        return 'aqua'
    }

    getId(){
        return tileIds.water;
    }

    getRandomEvent(){
        if(Math.random() > 0.8){
        }
        return null;
    }

    getDecisions() {
        return []
    }
}
