"use strict";

const operations = ["add", "subtract", "multiply", "divide"]

//Create math functions
function add(a,b) {
    return a + b;
}

function subtract(a,b) {
    return a - b;
}

function multiply(a,b) {
    return a * b;
}

function divide(a,b) {
    if (b == 0) {
        return "Error! 0 Division!";
    }
    return a / b;
}

function operate(a,b,op) {
    if (operations.includes(op)) {
        return window[op](a,b);
    } else {
        return a;
    }
}

//Build HTML of calculator
const buttonValues = ["1", "2", "3", "+", "4", "5", "6", "-", "7","8","9", "*", "0", "C", "/", "="];
const buttonPad = document.querySelector("#inputs");
let buttons = [];
let charValue;

for (let i = 0; i < buttonValues.length; i++) {
    buttons[i] = document.createElement("button");
    buttons[i].classList.add("input");
    if (isNaN(buttonValues[i])) {
        buttons[i].classList.add("operator");
    }
    buttons[i].setAttribute('id', buttonValues[i]);
    buttons[i].innerHTML = buttonValues[i];
    buttonPad.appendChild(buttons[i]);
}

//Interact with inputs
const num1Display = document.querySelector("#num1");
const num2Display = document.querySelector("#num2");
const operator = document.querySelector("#symbol");
let currNum = "num1";
let num1 = ""
let num2 = ""
let currOperator = "";
let raw_input = "";


function correctOperator(input) {
    switch (input) {
        case "*":
            return "multiply";
        case "/":
            return "divide";
        case "+":
            return "add";
        case "-":
            return "subtract";
        case "=":
            return "equals";
        case "C":
            return "clear";
    }
}


function clearDisplay(result = false) {
    num2 = "";
    num2Display.textContent = num2;
    currOperator = "";
    operator.textContent = "";

    if (!result) {
        num1 = "";
        num1Display.textContent = "0";
        currNum = "num1";
    }
}


function numAppend(num) {
    if (currNum == "num1") {
        num1 += num;
        num1Display.textContent = num1;
    } else {
        num2 += num;
        num2Display.textContent = num2;
    }
}

function inputEntered(input) {
    if (isNaN(input)) {
        raw_input = input;
        input = correctOperator(input);
        let a;
        let b;
        let result;

        if (input == "equals") {
            a = parseInt(num1);
            if (isNaN(a)) {
                a = 0;
            }
            b = parseInt(num2);
            if (isNaN(b)) {
                b = 0;
            }
            result = operate(a,b, currOperator);
            num1 = result;
            num1Display.textContent = num1;

            clearDisplay(true);
        } else if (input == "clear") {
            clearDisplay();

        } else {
            currOperator = input;
            operator.textContent = raw_input;
            currNum = "num2";
        }
    } else {
        if (currOperator == "") {
            currNum = "num1";
            if ((typeof(num1) == "number") || (num1.startsWith("Error"))) {
                num1 = "";
            }
        }
            numAppend(input);
    }


}

//Listen for clicks on inputs
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function(e) {
        inputEntered(e.target.id);
    });
}