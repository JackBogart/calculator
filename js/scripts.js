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
let secondNum = 0;
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
                return 0;
            }
            return divide(a, b);
        default:
            console.error('Unknown operator');
    }
}

function updateDisplayDigit(digit) {
    // If the operation isn't null, we're updating the second number
    if (!currentOperation) {
        firstNum += digit;
    } else {
        secondNum += digit;
    }
    display.textContent += digit;
}

function updateDisplayOperator(operator) {
    // If the operation isn't null, we're calculating the current output
    if (currentOperation) {
        firstNum = operate(currentOperation, Number(firstNum), Number(secondNum));
        if (!Number.isInteger(firstNum)) firstNum = firstNum.toFixed(5);
        display.textContent = firstNum;
        secondNum = 0;
    }
    currentOperation = operator;
    display.textContent += currentOperation;
}

const digits = document.querySelectorAll('#digits > button');
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
    display.textContent = '';
});
