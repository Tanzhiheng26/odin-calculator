let operand1 = '';
let operand2 = '';
let operator = null;
let first = true; // indicator for which operand to edit
let hasDecimalPoint = false;

const resultRow = document.querySelector('#result-row');
resultRow.textContent = operand1;

const equationRow = document.querySelector('#equation-row');

const numbers = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

for (let i = 0; i <= 9; i++) {
    const button = document.querySelector('#' + numbers[i]);
    button.addEventListener('click', () => displayNumber(i));
}

const del = document.querySelector('#delete');
del.addEventListener('click', deleteNumber);

const clr = document.querySelector('#clear');
clr.addEventListener('click', clear);

const plus = document.querySelector('#plus');
plus.addEventListener('click', () => onOperation('+'));

const subtract = document.querySelector('#subtract');
subtract.addEventListener('click', () => onOperation('–'));

const multiply = document.querySelector('#multiply');
multiply.addEventListener('click', () => onOperation('×'));

const divide = document.querySelector('#divide');
divide.addEventListener('click', () => onOperation('÷'));

const equals = document.querySelector('#equals');
equals.addEventListener('click', onEquals);

const decimalPoint = document.querySelector('#decimal-point');
decimalPoint.addEventListener('click', addDecimalPoint);

function displayNumber(num) {
    num = num.toString(); // ensures that we are doing string concatenation not addition
    if (first) {
        operand1 += num;
        resultRow.textContent = operand1;
    } else {
        operand2 += num;
        resultRow.textContent = operand2;
    }
}

function deleteNumber() {
    if (first) {
        operand1 = operand1.toString().slice(0, -1);
        resultRow.textContent = operand1;
        hasDecimalPoint = operand1.includes('.'); // check if the decimal point has been deleted
    } else {
        operand2 = operand2.toString().slice(0, -1);
        resultRow.textContent = operand2;
        hasDecimalPoint = operand2.includes('.');
    }
}

function clear() {
    operand1 = '';
    operand2 = '';
    first = true;
    resultRow.textContent = operand1;
    equationRow.textContent = null;
    hasDecimalPoint = false;
}

function onOperation(op) {
    first = false;
    hasDecimalPoint = false;
    if (operand2 !== '') { 
        operand1 = operate(+operand1, +operand2, operator).toString();
        operand2 = '';
        resultRow.textContent = operand1;
    }
    operator = op;
    equationRow.textContent = `${operand1 === '' ? 0 : operand1} ${operator}`;
}

function onEquals() {
    if (operand2 !== '') {
        equationRow.textContent = `${operand1 === '' ? 0 : operand1} ${operator} ${operand2} =`;
        operand1 = operate(+operand1, +operand2, operator).toString();
        operand2 = '';
        resultRow.textContent = operand1;
        first = true; // allows us to edit the result of the calculation
        hasDecimalPoint = operand1.includes('.');
    }
}

function operate(a, b, operator) {
    if (operator === '+') {
        return a + b;
    }
    if (operator === '–') {
        return a - b;
    }
    if (operator === '×') {
        return a * b;
    }
    if (operator === '÷') {
        return a / b;
    }
}

function addDecimalPoint() {
    if (!hasDecimalPoint) {
        if (first) {
            if (operand1 === '') {
                operand1 = '0';
            }
            operand1 += '.';
            resultRow.textContent = operand1;
        } else {
            if (operand2 === '') {
                operand2 = '0';
            }
            operand2 += '.';
            resultRow.textContent = operand2;
        }
        hasDecimalPoint = true;
    }
}