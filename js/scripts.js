function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

let firstNum = 0;
let secondNum = null;
let currentOperation = '';
const display = document.querySelector('#display');

function operate(operator, a, b) {
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case 'x':
            return multiply(a, b);
        case '/':
            if (b === 0) {
                alert('ERROR: Stop trying to divide by 0');
                return NaN;
            }
            return divide(a, b);
        default:
            console.error('Unknown operator');
    }
}

function updateDisplayDigit(digit) {
    // If the operation isn't null, we're updating the second number
    if (!currentOperation) {
        firstNum = Number(firstNum + digit).toString();
        display.textContent = firstNum;
    } else {
        if (secondNum == null) secondNum = 0;
        secondNum = Number(secondNum + digit).toString();
        display.textContent = secondNum;
    }
}

function updateDisplayOperator(operator) {
    // If the operation isn't null, we're calculating the current output
    if (operator === '*') operator = 'x';
    if (currentOperation && secondNum != null) {
        // TO-DO: Need to handle empty second input differently
        firstNum = operate(currentOperation, Number(firstNum), Number(secondNum));
        if (!Number.isInteger(firstNum)) {
            minimumDecimalPlaces = Math.min(
                firstNum.toString().substring(firstNum.toString().indexOf('.') + 1).length,
                6
            );
            firstNum = firstNum.toFixed(minimumDecimalPlaces);
        }
        display.textContent = firstNum;
        secondNum = null;
    }
    switch (currentOperation) {
        case '+':
            document.querySelector(`#add`).style.backgroundColor = '';
            break;
        case '-':
            document.querySelector(`#subtract`).style.backgroundColor = '';
            break;
        case 'x':
            document.querySelector(`#multiply`).style.backgroundColor = '';
            break;
        case '/':
            document.querySelector(`#divide`).style.backgroundColor = '';
            break;
    }
    currentOperation = operator;
    switch (currentOperation) {
        case '+':
            document.querySelector(`#add`).style.backgroundColor = 'hsl(30, 58%, 39%)';
            break;
        case '-':
            document.querySelector(`#subtract`).style.backgroundColor = 'hsl(30, 58%, 39%)';
            break;
        case 'x':
            document.querySelector(`#multiply`).style.backgroundColor = 'hsl(30, 58%, 39%)';
            break;
        case '/':
            document.querySelector(`#divide`).style.backgroundColor = 'hsl(30, 58%, 39%)';
            break;
    }
}

function inputBackspace() {
    if (!currentOperation && firstNum.toString().length > 0) {
        firstNum = Number(firstNum.toString().slice(0, -1));
        display.textContent = firstNum;
    } else if (currentOperation && secondNum.toString().length > 0) {
        secondNum = Number(secondNum.toString().slice(0, -1));
        display.textContent = secondNum;
    }
}

function inputDecimal() {
    if (!currentOperation && !firstNum.toString().includes('.')) {
        firstNum += '.';
        display.textContent = firstNum;
    } else if (currentOperation && !secondNum.toString().includes('.')) {
        secondNum += '.';
        display.textContent = secondNum;
    }
}

const digits = document.querySelectorAll('#digits > button:not(.special)');
digits.forEach((button) => button.addEventListener('click', (e) => updateDisplayDigit(e.target.textContent)));

const operations = document.querySelectorAll('#operations');
operations.forEach((button) => {
    button.addEventListener('click', (e) => updateDisplayOperator(e.target.textContent));
});

const equals = document.querySelector('#equals');
equals.addEventListener('click', function () {
    updateDisplayOperator('');
});

const clear = document.querySelector('#clear');
clear.addEventListener('click', () => {
    firstNum = 0;
    secondNum = 0;
    currentOperation = '';
    display.textContent = '0';
});

const del = document.querySelector('#delete');
del.addEventListener('click', () => {
    inputBackspace();
});

const decimal = document.querySelector('#decimal');
decimal.addEventListener('click', () => {
    inputDecimal();
});

addEventListener('keydown', (event) => {
    if (!isNaN(event.key)) {
        updateDisplayDigit(event.key);
    } else if (event.key === 'Backspace') {
        inputBackspace();
    } else if (event.key === 'Enter') {
        updateDisplayOperator('');
    } else if (event.key === '.') {
        inputDecimal();
    } else if ('+-*/'.includes(event.key)) {
        updateDisplayOperator(event.key);
    }
    console.log(event.key);
});
