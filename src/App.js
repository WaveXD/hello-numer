import "./App.css";
import Dropdown1 from "./Dropdown1";
import { Routes, Route } from "react-router-dom";
import Bisection from "./component/Bisection";
import Taylor from "./component/TaylorSeries";
import FalsePosition from "./component//FalsePosition";
import OnePointIteration from "./component/OnePoint";
import NewtonRaphson from "./component/NewtonRaphson";
import Secant from "./component/Secant";
import CramerRule from "./component/CramerRule";

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/Bisection" element={<Bisection />}></Route>
          <Route path="/FalsePosition" element={<FalsePosition />}></Route>
          <Route path="/OnePoint" element={<OnePointIteration />}></Route>
          <Route path="/TaylorSeries" element={<Taylor />}></Route>
          <Route path="/NewtonRaphson" element={<NewtonRaphson />}></Route>
          <Route path="/Secant" element={<Secant />}></Route>

          <Route path="/CramerRule" element={<CramerRule />}></Route>
          
          <Route path="/" element={<Dropdown1 />}></Route>
        </Routes>
   
    </div>
  );
}

export default App;
