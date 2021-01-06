import {useEffect, useState} from "react";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import { AuthProvider } from "./context";

import "./App.css"

import routes from "./routes.js";
import Inventory from "./components/Inventory/Inventory.js";
import {Log} from "./components/Log/Log.js";
import Map from "./components/Map/Map.js";
import LogText from "./components/LogText/LogText.js";
import Loadbar from "./components/Loadbar/Loadbar.js";

import io from 'socket.io-client'
import {Login} from "./components/Login/Login.js";
import socket from "./Network.js";

const App = () => {
    //const {authContext} = useContext(AuthContext)

    const [world, setWorld] = useState()
    const [inventory, setInventory] = useState()
    const [log, setLog] = useState()

    useEffect(() => {
        const interval = setInterval(() => {
            if (socket.isConnected) {
                socket.emit("getWorld", "");
                socket.emit("getPlayer", "");
            }
        }, 1000)
        return () => clearInterval(interval)
    }, [])

    socket.on("world", world => {
        setWorld(world);
    });

    socket.on("player", player => {
        console.log("player log books")
        console.log(player)
        console.log(player.inventory);
    });
        return (
            <div className="App">
                <Router>
                    <Switch>
                        {routes.map((route) => {
                            return (
                            <Route
                                key={route.path}
                                path={route.path}
                                component={route.component}
                            />)
                        })}
                    </Switch>
                </Router>
                <Login></Login>
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
