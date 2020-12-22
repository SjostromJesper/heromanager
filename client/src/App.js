import {useEffect, useState} from "react";

import Inventory from "./components/Inventory/Inventory.js";
import Log from "./components/Log/Log.js";
import Map from "./components/Map/Map.js";
import LogText from "./components/LogText/LogText.js";
import Loadbar from "./components/Loadbar/Loadbar.js";

import io from 'socket.io-client'

let socket;

const App = () => {
    const [getWorld, setWorld] = useState()

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
        <Inventory/>
        <Log/>
        <Map worldData={getWorld}/>
        <LogText/>
        <Loadbar/>
    </div>
  );
}

export default App;
