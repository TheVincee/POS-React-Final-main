import Dashboard from "./Dashboard";
import Historys from "./History";
import Inventory from "./Inventory";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Inventory />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/History" element={<Historys />} />
      </Routes>
    </div>
  );
}

export default App;
