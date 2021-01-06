const Decision = require('./Decision.js')
const PF = require('pathfinding');

module.exports = class Move extends Decision {

    perform(creatureTick) {

        let creature = creatureTick.getActingCreature();

        function findCoordinateForRequirement(worldTiles, tileRequirement, onlyKnownCoordinates = true) {
            let closestMatchingCoordinate = null;
            if (onlyKnownCoordinates) {
                creature.knownCoordinates.forEach(knownCoordinate => {
                    if (tileRequirement(knownCoordinate.x, knownCoordinate.y, worldTiles[knownCoordinate.x][knownCoordinate.y])) {
                        if (closestMatchingCoordinate == null || (distance(creature.coordinate, knownCoordinate) < distance(creature.coordinate, closestMatchingCoordinate))) {
                            closestMatchingCoordinate = knownCoordinate;
                        }
                    }
                });
            } else {
                for (let x = 0; x < worldTiles.length; x++) {
                    for (let y = 0; y < worldTiles[x].length; y++) {
                        if (tileRequirement(x, y, worldTiles[x][y])) {
                            if (closestMatchingCoordinate == null || (distance(creature.coordinate, {
                                x: x,
                                y: y
                            }) < distance(creature.coordinate, closestMatchingCoordinate))) {
                                closestMatchingCoordinate = {x: x, y: y};
                            }
                        }
                    }
                }
            }
            return closestMatchingCoordinate;
        }

        function distance(coordinate1, coordinate2) {
            return Math.sqrt(Math.pow((coordinate2.x - coordinate1.x), 2) + Math.pow((coordinate2.y - coordinate1.y), 2));
        }

        const Woodlands = require('../../World/Tiles/Woodlands.js');
        const WaterTile = require('../../World/Tiles/WaterTile.js');

        //figure out what we want to move to
        let destinationCoordinate = findCoordinateForRequirement(creatureTick.getWorld().worldTiles, function (x, y, tile) {
            return tile instanceof Woodlands;
        }, true);


        //update which tiles the pathfinder can use
        let grid = new PF.Grid(creatureTick.getWorld().worldTiles.length, creatureTick.getWorld().worldTiles[0].length);
        for (let x = 0; x < creatureTick.getWorld().worldTiles.length; x++) {
            for (let y = 0; y < creatureTick.getWorld().worldTiles[x].length; y++) {

                //can't walk on water
                grid.setWalkableAt(x, y, !(creatureTick.getWorld().worldTiles[x][y] instanceof WaterTile));

                //can't search through unknown tiles
                if (!creatureTick.getActingCreature().knowsCoordinate(x, y)) {
                    grid.setWalkableAt(x, y, false);
                }
            }
        }

        //instantiate the pathfinder
        let finder = new PF.AStarFinder({
            diagonalMovement: PF.DiagonalMovement.IfAtMostOneObstacle
        });

        let path = null;
        if (destinationCoordinate) {
            //path to the destination we found
            path = finder.findPath(creature.coordinate.x, creature.coordinate.y, destinationCoordinate.x, destinationCoordinate.y, grid);
        } else {
            //we couldn't find our destination, path to nearest unknown coordinate
            let destinationCoordinate = findCoordinateForRequirement(creatureTick.getWorld().worldTiles, function (x, y, tile) {
                return !creature.knowsCoordinate({x: x, y: y});
            }, false);

            //if this doesn't return a destination coordinate, it means we know the whole world (that we can path to)
            if (destinationCoordinate) {
                //TODO we're just setting a 'new PF.Grid' (because the old one ignores the unknown tiles)
                path = finder.findPath(creature.coordinate.x, creature.coordinate.y, destinationCoordinate.x, destinationCoordinate.y, new PF.Grid(creatureTick.getWorld().worldTiles.length, creatureTick.getWorld().worldTiles[0].length));
            }
        }

        if (this.isValidPath(path)) {
            let coordinates = path[1];
            creature.coordinate.x = coordinates[0];
            creature.coordinate.y = coordinates[1];
        } else {
            let x = (Math.round(Math.random()) * 2) - 1
            let y = (Math.round(Math.random()) * 2) - 1
            if (Math.random() <= 0.5) {
                creature.coordinate.x += x;
            } else {
                creature.coordinate.y += y;
            }
        }
    }

    isValidPath(path) {
        return path != null && path.length > 0 && path[1];
    }

    getLabels() {

    }
}
