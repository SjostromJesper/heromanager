const Decision = require('./Decision.js')
const PF = require('pathfinding');

module.exports = class Move extends Decision {

    perform(creatureTick) {

        let creature = creatureTick.getActingCreature();

        function findCoordinateForRequirement(worldTiles, tileRequirement, onlyKnownCoordinates = true) {
            let closestMatchingCoordinate = null;
            if (onlyKnownCoordinates) {
                this.knownCoordinates.forEach(knownCoordinate => {
                    if (tileRequirement(worldTiles[knownCoordinate.x][knownCoordinate.y])) {
                        if (closestMatchingCoordinate == null || (this.distance(creature.coordinate, knownCoordinate) < this.distance(creature.coordinate, closestMatchingCoordinate))) {
                            closestMatchingCoordinate = knownCoordinate;
                        }
                    }
                });
            } else {
                for (let x = 0; x < worldTiles.length; x++) {
                    for (let y = 0; y < worldTiles[x].length; y++) {
                        if (tileRequirement(worldTiles[x][y])) {
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
            if (closestMatchingCoordinate) {
                console.log("found forest at x: " + closestMatchingCoordinate.x + " y: " + closestMatchingCoordinate.y);
            } else {
                console.log("couldn't find forest");
            }
            return closestMatchingCoordinate;
        }

        function distance(coordinate1, coordinate2) {
            return Math.sqrt(Math.pow((coordinate2.x - coordinate1.x), 2) + Math.pow((coordinate2.y - coordinate1.y), 2));
        }

        const Woodlands = require('../../World/Tiles/Woodlands.js');
        const WaterTile = require('../../World/Tiles/WaterTile.js');

        let destinationCoordinate = findCoordinateForRequirement(creatureTick.getWorld().worldTiles, function (tile) {
            return tile instanceof Woodlands;
        }, false);


        let grid = new PF.Grid(creatureTick.getWorld().worldTiles.length, creatureTick.getWorld().worldTiles[0].length);
        for (let x = 0; x < creatureTick.getWorld().worldTiles.length; x++) {
            for (let y = 0; y < creatureTick.getWorld().worldTiles[x].length; y++) {
                grid.setWalkableAt(x, y, !(creatureTick.getWorld().worldTiles[x][y] instanceof WaterTile));
            }
        }

        let finder = new PF.AStarFinder({
            diagonalMovement: PF.DiagonalMovement.IfAtMostOneObstacle
        });

        let path = null;
        if (destinationCoordinate) {
            path = finder.findPath(creature.coordinate.x, creature.coordinate.y, destinationCoordinate.x, destinationCoordinate.y, grid);
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
