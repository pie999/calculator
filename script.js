function add(a, b){
    return a + b;
}
function subtract(a, b){
    return a - b;
}
function multiply(a, b){
    return a * b;
}
function divide(a, b){
    return a / b;
}

function operate(op, a, b){
    if (op == "+") add(a, b);
    else if (op == "-") subtract(a, b);
    else if (op == "*") multiply(a, b);
    else if (op == "/") divide(a, b);
}

const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");
const history = [];
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        history.push(button.textContent);
        display.textContent += button.textContent;
        if (history[history.length - 1] == "=")
            display.textContent = doOperation();
    });
});

function doOperation (){
    history.forEach((char, i) => {
        if (char == "+"){
            console.table(history);
            let n1 = history.slice(0, i).join("");
            let n2 = history.slice(i+1, -1).join("");
            result = +n1 + +n2;
        }
    });
    return result;
}
