module.exports =  class MapDrawer {
    drawMap(world) {

        let tileIdMatrix = [];

        for(let i = 0 ; i < world.worldTiles.length ; i++) {
            tileIdMatrix[i] = [];
            for(let j = 0 ; j < world.worldTiles[i].length ; j++) {

                let currentTile = world.worldTiles[i][j]
                let color = currentTile.getColor()

                if(currentTile.events.includes("DUNGEON")) {
                    color = 'red'
                }

                tileIdMatrix[i][j] = color;
            }
        }

        for(let keyValue of world.creatures) {
            let creature = world.creatures.get(keyValue[0]);
            let color = creature.getColor();
            tileIdMatrix[creature.coordinate.x][creature.coordinate.y] = color;
        }

        return tileIdMatrix;
    }
}
