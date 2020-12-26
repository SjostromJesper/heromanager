import {useEffect, useState} from "react";

const Map = (props) => {
    const [world, setWorld] = useState()

    useEffect(() => {
        setWorld(props.worldData)
        if(world) {
            drawMap(world)
        }
        else {
            console.log("no data")
        }
    })
    /**
     * [[tileId, tileId, tileId],
     * [tileId, tileId, tileId],
     * [tileId, tileId, tileId]]
     */

    function drawMap(tileIdMatrix) {
        let sizeFactor = 4;

        const canvas = document.querySelector("canvas");

        canvas.setAttribute("width", "" + tileIdMatrix.length * sizeFactor);
        canvas.setAttribute("height", "" + tileIdMatrix.length * sizeFactor);

        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, tileIdMatrix.length * sizeFactor, tileIdMatrix.length * sizeFactor)

        for(let i = 0 ; i < tileIdMatrix.length ; i++) {
            for(let j = 0 ; j < tileIdMatrix[i].length ; j++) {

                ctx.fillStyle = tileIdMatrix[i][j];
                ctx.fillRect(i * sizeFactor, j * sizeFactor, sizeFactor, sizeFactor);
            }
        }
    }

    return (
        <div className="Map">
            <canvas></canvas>
        </div>
    );
}

export default Map;
