let currentDisplay = '';
const display = document.getElementById('display');

const appendToDisplay = (value) => display.value = currentDisplay += value;

const clearDisplay = () => display.value = currentDisplay = '';

const calculateResult = () => display.value = currentDisplay = eval(currentDisplay);

const operate = (operation) => appendToDisplay(operation);