import Inventory from "./components/Inventory/Inventory.js";
import Log from "./components/Log/Log.js";
import Map from "./components/Map/Map.js";
import LogText from "./components/LogText/LogText.js";
import Loadbar from "./components/Loadbar/Loadbar.js";


function App() {
  return (
    <div className="App">
      <Inventory/>
      <Log/>
      <Map/>
      <LogText/>
      <Loadbar/>
    </div>
  );
}

export default App;
