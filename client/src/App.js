import {useState} from "react";

import Inventory from "./components/Inventory/Inventory.js";
import Log from "./components/Log/Log.js";
import Map from "./components/Map/Map.js";
import LogText from "./components/LogText/LogText.js";
import Loadbar from "./components/Loadbar/Loadbar.js";

import io from 'socket.io-client'

let socket;

const App = () => {
    const [getWorld, setWorld] = useState([])

    const verify = (tokenId) => {
        console.log(tokenId)
        socket = io.connect("http://localhost:3001", {
            withCredentials: true,
            extraHeaders: {
                "auth": "tokenId"
            }
        });

        socket.emit("functionName", "functionParameter");

        socket.on("world", worldTiles => {
           console.log(worldTiles);
           setWorld(...worldTiles);
        });
    }


  return (
    <div className="App">
        <button onClick={() => {verify()}}>click me!</button>
        <Inventory/>
        <Log/>
        <Map worldData={getWorld}/>
        <LogText/>
        <Loadbar/>
    </div>
  );
}

export default App;
