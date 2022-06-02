function add(a, b){
    return +a + +b;
}
function subtract(a, b){
    return a - b;
}
function multiply(a, b){
    return a * b;
}
function divide(a, b){
    if (b != 0)
        return Math.round((a / b) * 100) / 100;
    else 
        return error();
}

function error() {
    buttons.forEach(button => button.disabled = true);
    clearButton.disabled = false;
    return "ERROR";
}

function operate(op, a, b){
    if (op == "+") return add(a, b);
    else if (op == "-") return subtract(a, b);
    else if (op == "x") return multiply(a, b);
    else if (op == "÷") return divide(a, b);
}

function checkOperator(){
    console.table(history);
    operatorIndex = undefined;
    history.forEach((char, i) => {
        if (char == "+" || char == "-" || char == "x" || char == "÷"){
            console.log(`operator found: ${char}`);
            operatorIndex = i;
        }
    });
    return operatorIndex;
}

function doOperation(){
    if (checkOperator()){
        console.log("operator index: " + operatorIndex);
        let n1 = history.slice(0, operatorIndex).join("");
        let n2 = history.slice(operatorIndex + 1).join("");
        console.log("n1 is: " + n1);
        console.log("n2 is: " + n2);
        result = operate(history[operatorIndex], n1, n2);
        console.log("result: " + result);
    }
    else
        return error();
    history = [...result.toString()];
    console.table(history);
    return result;
}



let history = [];
let operatorIndex = undefined;
const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");

const numberButtons = document.querySelectorAll(".bn");
numberButtons.forEach((numberButton) => {
    numberButton.addEventListener("click", () => {
        history.push(numberButton.textContent);
        display.textContent += numberButton.textContent;
        operatorButtons.forEach(button => button.disabled = false);
    });
});

const dotButton = document.querySelector(".bdot");
dotButton.addEventListener("click", () => {
    history.push(".");
    display.textContent += ".";
    dotButton.disabled = true;
});

const operatorButtons = document.querySelectorAll(".bop");
operatorButtons.forEach(button => button.disabled = true);
operatorButtons.forEach((operatorButton) => {
    operatorButton.addEventListener("click", () => {
        dotButton.disabled = false;
        if (checkOperator()){
            display.textContent = doOperation();
            if (display.textContent != "ERROR")
                display.textContent += operatorButton.textContent;
            history.push(operatorButton.textContent); //put after because history is overwritten with doOpeartion()
        }
        else {
            history.push(operatorButton.textContent);
            display.textContent += operatorButton.textContent;
        }
        operatorButtons.forEach(button => button.disabled = true);
    });
});

const equalButton = document.querySelector(".beq");
equalButton.addEventListener("click", () => display.textContent = doOperation());

const clearButton = document.querySelector(".bclear");
clearButton.addEventListener("click", () => {
    buttons.forEach(button => button.disabled = false);
    history = [];
    display.textContent = "";
});

const deleteButton = document.querySelector(".bdelete");
deleteButton.addEventListener("click", () => {
    let lastChar = history.pop();
    if (lastChar == "."){
        dotButton.disabled = false;
    }
    else if (lastChar == "+" || lastChar == "-" || lastChar == "x" || lastChar == "÷"){
        operatorButtons.forEach(button => button.disabled = false);
    }
    display.textContent = display.textContent.slice(0, -1);
});
