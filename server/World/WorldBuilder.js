const Grasslands = require("./Tiles/Grasslands.js");
const WaterTile = require("./Tiles/WaterTile.js");
const MountainTile = require("./Tiles/MountainTile.js");
const Woodlands = require("./Tiles/Woodlands.js");

module.exports = class WorldBuilder {

    constructor() {
        console.log("please work");
    }

    getSmartWorld() {
        let worldHeight = 150;
        let worldWidth = 150;

        let worldTiles = [];

        //first pass
        for (let x = 0; x < worldHeight; x++) {
            worldTiles[x] = [];
            for (let y = 0; y < worldWidth; y++) {
                let nr = Math.trunc(noise.perlin2(x/100,y/100) * 100)
                worldTiles[x][y] = this.getFirstPassTileByNumber(worldTiles, x, y, nr);
            }
        }

        noise.seed(Math.random());
        //second pass
        for (let x = 0; x < worldHeight; x++) {
            for (let y = 0; y < worldWidth; y++) {
                let nr = Math.trunc(noise.perlin2(x/100,y/100) * 100)
                let tile = this.getSecondPassTileByNumber(worldTiles, x, y, nr);
                if(tile != null){
                    worldTiles[x][y] = tile;
                }
            }
        }



        return worldTiles;
    }

    getRandomWorld() {

        let worldHeight = 1000;
        let worldWidth = 1000;

        let worldTiles = [];

        for (let i = 0; i < worldHeight; i++) {
            worldTiles[i] = [];
            for (let j = 0; j < worldWidth; j++) {
                worldTiles[i][j] = this.getFirstPassTileByNumber(i, j);
            }
        }

        return worldTiles;
    }

    getRandomTile() {
        return new Grasslands();
    }

    getFirstPassTileByNumber(worldTiles, x, y, nr) {
        if(nr < 0) {
            return this.getNewWaterTile()
        }
        else if(nr >= 0 && nr <= 40) {
            return this.getNewGrassTile(worldTiles, x, y, nr);
        }
        else {
            return this.getNewMountainTile()
        }
    }

    getSecondPassTileByNumber(worldTiles, x, y, nr) {
        if(nr >= 35) {
            if(!(worldTiles[x][y] instanceof WaterTile)){
                return this.getNewWoodlandsTile(worldTiles, x, y, nr);
            }
        }
        return null;
    }

    getNewGrassTile(worldTiles, x, y, nr){
        let tile = new Grasslands();
        if(Math.random() > 0.9998) {
            /* if(tileNextToMe(worldTiles, x, y){
                 tile.events.add(new WaterDungeon)();
             }else{
                 /!*tile.events.add(new Dungeon());*!/
             }*/
            tile.events.push("DUNGEON");
        }
        if(Math.random() > 0.99) {
            tile.events.push("CURSED GROUND");
        }
        return tile;
    }

    getNewWoodlandsTile(worldTiles, x, y, nr){
        let tile = new Woodlands();
        return tile;
    }

    getNewMountainTile(worldTiles, x, y, nr){
        let tile = new MountainTile();
        return tile;
    }

    getNewWaterTile(worldTiles, x, y, nr){
        let tile = new WaterTile();
        return tile;
    }
}