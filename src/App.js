import React, { useState } from "react";
import "./App.css";
import InputScreen from "./InputScreen.jsx";
import Buttons from "./Buttons.jsx";
import OutputScreen from "./OutputScreen.jsx";

function App() {
  let [expr, setExpr] = useState("");
  let [val, setVal] = useState("");
  return (
    <div className="App">
      <InputScreen expr={expr} setExpr={setExpr} />
      <OutputScreen expr={expr} val={val} setVal={setVal} />
      <Buttons expr={expr} setExpr={setExpr} val={val} setVal={setVal} />
    </div>
  );
}

export default App;
