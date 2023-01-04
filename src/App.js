import "./App.css";
import InputScreen from "./InputScreen.jsx";
import Buttons from "./Buttons.jsx";
import React, { useState } from "react";
import OutputScreen from "./OutputScreen.jsx";

function App() {
    let [expr, setExpr] = useState("");
    let [val, setVal] = useState("");
    return (
        <div className="App">
            <InputScreen expr={expr} />
            <OutputScreen expr={expr} val={val} setVal={setVal} />
            <Buttons expr={expr} setExpr={setExpr} val={val} setVal={setVal} />
        </div>
    );
}

export default App;
