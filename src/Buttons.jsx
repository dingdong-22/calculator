import calc from "./CalculatorLogic.jsx";

function Buttons(props) {
    function addChar(char) {
        console.log("Adding char:", char);
        props.setExpr(props.expr + char);
    }

    function deleteChar(all = false) {
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
            <button className="bracket-button" onClick={() => addChar("(")}>
                (
            </button>
            <button className="bracket-button" onClick={() => addChar(")")}>
                )
            </button>
            <button
                className="removal-button"
                onClick={() => deleteChar(false)}
            >
                DEL
            </button>
            <button className="removal-button" onClick={() => deleteChar(true)}>
                AC
            </button>
            <button onClick={() => addChar("7")}>7</button>
            <button onClick={() => addChar("8")}>8</button>
            <button onClick={() => addChar("9")}>9</button>
            <button onClick={() => addChar("÷")}>÷</button>
            <button onClick={() => addChar("4")}>4</button>
            <button onClick={() => addChar("5")}>5</button>
            <button onClick={() => addChar("6")}>6</button>
            <button onClick={() => addChar("×")}>×</button>
            <button onClick={() => addChar("1")}>1</button>
            <button onClick={() => addChar("2")}>2</button>
            <button onClick={() => addChar("3")}>3</button>
            <button onClick={() => addChar("-")}>-</button>
            <button onClick={() => addChar("0")}>0</button>
            <button onClick={() => addChar(".")}>.</button>
            <button>spare</button>
            <button onClick={() => addChar("+")}>+</button>
        </div>
    );
}

export default Buttons;