let currentInput = '';
let resultDisplayed = false;

const display = document.getElementById('display');

document.addEventListener('keydown', handleKeyPress);

function handleKeyPress(event) {
    const { key } = event;
    if (!isNaN(key) || key === '.') {
        appendCharacter(key);
    } else if (key === '+') {
        appendOperator('+');
    } else if (key === '-') {
        appendOperator('-');
    } else if (key === '*') {
        appendOperator('*');
    } else if (key === '/') {
        appendOperator('/');
    } else if (key === 'Enter' || key === '=') {
        evaluateExpression();
    } else if (key === 'Backspace') {
        clearDisplay();
    } else if (key === 'Escape') {
        clearDisplay();
    }
}

function clearDisplay() {
    currentInput = '';
    resultDisplayed = false;
    updateDisplay('0');
}

function appendCharacter(character) {
    if (resultDisplayed) {
        currentInput = '';
        resultDisplayed = false;
    }
    currentInput += character;
    updateDisplay(currentInput);
}

function appendOperator(operator) {
    if (resultDisplayed) {
        resultDisplayed = false;
    }
    currentInput += ` ${operator} `;
    updateDisplay(currentInput);
}

function evaluateExpression() {
    try {
        let result = eval(currentInput.replace(/÷/g, '/').replace(/×/g, '*'));
        if (result === Infinity || isNaN(result)) {
            throw new Error('Invalid operation');
        }
        currentInput = result.toString();
        resultDisplayed = true;
        updateDisplay(currentInput);
    } catch (error) {
        updateDisplay('Error');
        currentInput = '';
        resultDisplayed = true;
    }
}

function updateDisplay(value) {
    display.textContent = value;
}

// Initial display
clearDisplay();
