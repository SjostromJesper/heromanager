import {useEffect, useState, useContext} from "react";
import "./App.css"

import Inventory from "./components/Inventory/Inventory.js";
import {Log} from "./components/Log/Log.js";
import Map from "./components/Map/Map.js";
import LogText from "./components/LogText/LogText.js";
import Loadbar from "./components/Loadbar/Loadbar.js";

import io from 'socket.io-client'
import {logContext} from "./contexts/LogContext.js";

let socket;

const App = () => {
    const [world, setWorld] = useState()
    const [inventory, setInventory] = useState()
    const [log, setLog] = useState()
    useEffect(() => {
        const interval = setInterval(() => {
            if(socket) {
                socket.emit("functionName", "functionParameter");
            }
            else {
                socket = io.connect("http://localhost:3001", {
                    withCredentials: true,
                    extraHeaders: {
                        "auth": "tokenId"
                    }
                });

                socket.on("world", world => {
                    setWorld(world);
                });
            }


        }, 1000)
        return () => clearInterval(interval)
    }, [])

  return (
    <div className="App">
        <div className="info">
            <Inventory inventoryData={inventory}/>
                <Log logData={log}/>
            <Map worldData={world}/>
        </div>
            <LogText/>
        <Loadbar/>
    </div>
  );
}

export default App;
