import calc from "./CalculatorLogic.jsx";
import { useState } from "react";

function Buttons(props) {
  let [shift, setShift] = useState(false);
  function addChar(char) {
    console.log("Adding char:", char);
    props.setExpr(props.expr + char);
  }

  function deleteChar(all) {
    console.log("Deleting all:", all);
    if (all) {
      props.setExpr("");
    } else {
      props.setExpr(props.expr.slice(0, props.expr.length - 1));
    }
  }

  function updateOutput(expr) {
    let val = calc(expr);
    console.log("Calculated val:", val);
    props.setVal(val);
  }
  updateOutput(props.expr);

  return (
    <div className="buttons">
      <button></button>
      {shift ? (
        <button onClick={() => addChar("sin")}>sin</button>
      ) : (
        <button onClick={() => addChar("asin")}>asin</button>
      )}
      {shift ? (
        <button onClick={() => addChar("cos")}>cos</button>
      ) : (
        <button onClick={() => addChar("acos")}>acos</button>
      )}
      {shift ? (
        <button onClick={() => addChar("tan")}>tan</button>
      ) : (
        <button onClick={() => addChar("atan")}>atan</button>
      )}
      <button onClick={() => setShift(!shift)}>shift</button>

      <button className="bracket-button" onClick={() => addChar("(")}>
        (
      </button>
      <button className="bracket-button" onClick={() => addChar(")")}>
        )
      </button>
      <button onClick={() => addChar("π")}>π</button>
      <button onClick={() => addChar("e")}>e</button>
      <button onClick={() => addChar("ln")}>ln</button>

      <button onClick={() => addChar("7")}>7</button>
      <button onClick={() => addChar("8")}>8</button>
      <button onClick={() => addChar("9")}>9</button>
      <button className="removal-button" onClick={() => deleteChar(false)}>
        DEL
      </button>
      <button className="removal-button" onClick={() => deleteChar(true)}>
        AC
      </button>

      <button onClick={() => addChar("4")}>4</button>
      <button onClick={() => addChar("5")}>5</button>
      <button onClick={() => addChar("6")}>6</button>
      <button onClick={() => addChar("×")}>×</button>
      <button onClick={() => addChar("÷")}>÷</button>

      <button onClick={() => addChar("1")}>1</button>
      <button onClick={() => addChar("2")}>2</button>
      <button onClick={() => addChar("3")}>3</button>
      <button onClick={() => addChar("+")}>+</button>
      <button onClick={() => addChar("-")}>-</button>

      <button onClick={() => addChar("0")}>0</button>
      <button onClick={() => addChar(".")}>.</button>
      <button onClick={() => addChar("E")}>EXP</button>
      <button onClick={() => addChar("^")}>^</button>
      <button onClick={() => addChar("!")}>!</button>
    </div>
  );
}

export default Buttons;
