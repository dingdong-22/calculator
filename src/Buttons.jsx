import React, { useState } from "react";

//maybe add a manual input

let actions = {
    "÷": (a, b) => a / b,
    "×": (a, b) => a * b,
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
};

let binaryExpr = {
    "÷": new RegExp(
        `(?<e1>\\-?[0-9]+\\.?[0-9]*)\\÷(?<e2>\\-?[0-9]+\\.?[0-9]*)`
    ),
    "×": new RegExp(
        `(?<e1>\\-?[0-9]+\\.?[0-9]*)\\×(?<e2>\\-?[0-9]+\\.?[0-9]*)`
    ),
    "+": new RegExp(
        `(?<e1>\\-?[0-9]+\\.?[0-9]*)\\+(?<e2>\\-?[0-9]+\\.?[0-9]*)`
    ),
    "-": new RegExp(
        `(?<e1>\\-?[0-9]+\\.?[0-9]*)\\-(?<e2>\\-?[0-9]+\\.?[0-9]*)`
    ),
};

function unaryResolver(exprChunk) {
    let changes = true;
    while (changes) {
        changes = false;
        let info = exprChunk.match(/(?<op>[\÷|\×])\+/);
        if (info) {
            exprChunk = exprChunk.replace(/(?<op>[\÷|\×])\+/, info.groups.op);
            changes = true;
        }
        if (exprChunk.match(/\+\-/)) {
            exprChunk = exprChunk.replace(/\+\-/, "-");
            changes = true;
        }
        if (exprChunk.match(/\-\+/)) {
            exprChunk = exprChunk.replace(/\-\+/, "-");
            changes = true;
        }
        if (exprChunk.match(/\-\-/)) {
            exprChunk = exprChunk.replace(/\-\-/, "+");
            changes = true;
        }
        if (exprChunk.match(/\+\+/)) {
            exprChunk = exprChunk.replace(/\+\+/, "+");
            changes = true;
        }
    }
    return exprChunk;
}

function parentheseCount(expression) {
    let counter = 0;
    for (let char of expression) {
        if (char === "(") {
            counter++;
        } else if (char === ")") {
            counter--;
        }
        if (counter < 0) {
            return false;
        }
    }
    return counter === 0;
}

function calc(expression) {
    console.log("expression", expression);
    if (!parentheseCount(expression)) {
        return NaN;
    }
    expression = `(${expression})`.replaceAll(/\s/g, "");

    while (expression.match(/\(.*\)/)) {
        let exprChunk = expression.match(/\([^\(\)]*\)/);
        exprChunk = exprChunk[0].slice(1, exprChunk[0].length - 1);
        exprChunk = unaryResolver(exprChunk);
        for (const op of Object.keys(actions)) {
            let regex = binaryExpr[op];
            while (true) {
                let binExpr = exprChunk.match(regex);
                if (binExpr) {
                    let operandOne = parseFloat(binExpr.groups.e1);
                    let operandTwo = parseFloat(binExpr.groups.e2);
                    let evaluated = actions[op](operandOne, operandTwo);
                    exprChunk = exprChunk.replace(regex, evaluated);
                } else {
                    break;
                }
            }
        }
        expression = expression.replace(/\([^\(\)]*\)/, exprChunk);
    }
    return Number(expression);
}

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
        let evaluation = calc(expr);
        console.log("Calculated val:", evaluation);
        props.setVal(evaluation);
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
