let trig = ["sin", "cos", "tan", "asin", "acos", "atan"];

let actions = {
  asin: (a) => Math.asin(a),
  acos: (a) => Math.acos(a),
  atan: (a) => Math.atan(a),
  sin: (a) => Math.sin(a),
  cos: (a) => Math.cos(a),
  tan: (a) => Math.tan(a),

  "^": (a, b) => Math.pow(a, b),
  "÷": (a, b) => a / b,
  "×": (a, b) => a * b,
  "/": (a, b) => a / b,
  "*": (a, b) => a * b,
  "-": (a, b) => a - b,
  "+": (a, b) => a + b,
};

let binaryExpr = {
  asin: new RegExp(`asin(?<e1>\\-?[0-9]+\\.?[0-9]*)`),
  acos: new RegExp(`acos(?<e1>\\-?[0-9]+\\.?[0-9]*)`),
  atan: new RegExp(`atan(?<e1>\\-?[0-9]+\\.?[0-9]*)`),
  sin: new RegExp(`sin(?<e1>\\-?[0-9]+\\.?[0-9]*)`),
  cos: new RegExp(`cos(?<e1>\\-?[0-9]+\\.?[0-9]*)`),
  tan: new RegExp(`tan(?<e1>\\-?[0-9]+\\.?[0-9]*)`),

  "^": new RegExp(`(?<e1>\\-?[0-9]+\\.?[0-9]*)\\^(?<e2>\\-?[0-9]+\\.?[0-9]*)`),
  "÷": new RegExp(`(?<e1>\\-?[0-9]+\\.?[0-9]*)÷(?<e2>\\-?[0-9]+\\.?[0-9]*)`),
  "×": new RegExp(`(?<e1>\\-?[0-9]+\\.?[0-9]*)×(?<e2>\\-?[0-9]+\\.?[0-9]*)`),
  "/": new RegExp(`(?<e1>\\-?[0-9]+\\.?[0-9]*)\\/(?<e2>\\-?[0-9]+\\.?[0-9]*)`),
  "*": new RegExp(`(?<e1>\\-?[0-9]+\\.?[0-9]*)\\*(?<e2>\\-?[0-9]+\\.?[0-9]*)`),
  "-": new RegExp(`(?<e1>\\-?[0-9]+\\.?[0-9]*)\\-(?<e2>\\-?[0-9]+\\.?[0-9]*)`),
  "+": new RegExp(`(?<e1>\\-?[0-9]+\\.?[0-9]*)\\+(?<e2>\\-?[0-9]+\\.?[0-9]*)`),
};

function unaryResolver(exprChunk) {
  let changes = true;
  while (changes) {
    changes = false;
    let info = exprChunk.match(/(?<op>[÷|×])\+/);
    if (info) {
      exprChunk = exprChunk.replace(/(?<op>[÷|×])\+/, info.groups.op);
      changes = true;
    }
    if (exprChunk.match(/\+-/)) {
      exprChunk = exprChunk.replace(/\+-/, "-");
      changes = true;
    }
    if (exprChunk.match(/-\+/)) {
      exprChunk = exprChunk.replace(/-\+/, "-");
      changes = true;
    }
    if (exprChunk.match(/--/)) {
      exprChunk = exprChunk.replace(/--/, "+");
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
  console.log("Expression:", expression);
  if (!parentheseCount(expression)) {
    return NaN;
  }
  expression = `(${expression})`.replaceAll(/\s/g, "");

  while (expression.match(/\(.*\)/)) {
    let exprChunk = expression.match(/\([^()]*\)/);
    exprChunk = exprChunk[0].slice(1, exprChunk[0].length - 1);
    exprChunk = unaryResolver(exprChunk);
    for (const op of Object.keys(actions)) {
      let regex = binaryExpr[op];
      while (true) {
        let binExpr = exprChunk.match(regex);
        console.log(binExpr, Math.asin(8 / 10), "hello");
        if (binExpr) {
          if (trig.includes(op)) {
            let operandOne = parseFloat(binExpr.groups.e1);
            let evaluated = actions[op](operandOne);
            exprChunk = exprChunk.replace(regex, evaluated);
          } else {
            let operandOne = parseFloat(binExpr.groups.e1);
            let operandTwo = parseFloat(binExpr.groups.e2);
            let evaluated = actions[op](operandOne, operandTwo);
            exprChunk = exprChunk.replace(regex, evaluated);
          }
        } else {
          break;
        }
      }
    }
    expression = expression.replace(/\([^()]*\)/, exprChunk);
  }
  return Number(expression);
}

export default calc;
