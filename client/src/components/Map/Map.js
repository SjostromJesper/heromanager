const Map = () => {
    function drawMap(world) {
        let sizeFactor = 4;

        const canvas = document.querySelector("canvas");

        canvas.setAttribute("width", "" + world.worldTiles.length * sizeFactor);
        canvas.setAttribute("height", "" + world.worldTiles.length * sizeFactor);

        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, world.worldTiles.length * sizeFactor, world.worldTiles.length * sizeFactor)

        for(let i = 0 ; i < world.worldTiles.length ; i++) {
            for(let j = 0 ; j < world.worldTiles[i].length ; j++) {
                let currentTile = world.worldTiles[i][j]
                let color = currentTile.getColor()

                if(currentTile.events.includes("DUNGEON")) {
                    color = 'red'
                }

                ctx.fillStyle = color;
                ctx.fillRect(i * sizeFactor, j * sizeFactor, sizeFactor, sizeFactor);
            }
        }

        for(let keyValue of world.creatures) {
            let creature = world.creatures.get(keyValue[0]);
            let color = 'none'

            color = creature.getColor()

            ctx.fillStyle = color;
            ctx.fillRect(creature.coordinate.x * sizeFactor, creature.coordinate.y * sizeFactor, sizeFactor, sizeFactor);
        }

        return canvas;
    }

    return (
        <div className="Map">
            <p>map</p>
            <canvas></canvas>
        </div>
    );
}

export default Map;
