function solve() {
    const resultTextElement = document.getElementById('result');
    const clearElement = document.getElementById('clear');

    const numZeroElement = document.querySelector('input[type=button][value="0"]');
    const numOneElement = document.querySelector('input[type=button][value="1"]');
    const numTwoElement = document.querySelector('input[type=button][value="2"]');
    const numThreeElement = document.querySelector('input[type=button][value="3"]');
    const numFourElement = document.querySelector('input[type=button][value="4"]');
    const numFiveElement = document.querySelector('input[type=button][value="5"]');
    const numSixElement = document.querySelector('input[type=button][value="6"]');
    const numSevenElement = document.querySelector('input[type=button][value="7"]');
    const numEightElement = document.querySelector('input[type=button][value="8"]');
    const numNineElement = document.querySelector('input[type=button][value="9"]');

    const divideElement = document.querySelector('input[type=button][value="/"]');
    const multiplyElement = document.querySelector('input[type=button][value="*"]');
    const subtractElement = document.querySelector('input[type=button][value="-"]');
    const addElement = document.querySelector('input[type=button][value="+"]');
    const equalsElement = document.querySelector('input[type=button][value="="]');
    const dotElement = document.querySelector('input[type=button][value="."]');

    let expression = '';

    function clearResult() {
        expression = '';
        resultTextElement.value = '';
    }

    function updateResult(newValue) {
        expression += newValue;
        resultTextElement.value += newValue;

        resultTextElement.classList.contains('color-error') ?
            resultTextElement.classList.remove('color-error') :
            resultTextElement;
    }

    function evaluateExpression() {
        try {
            const safeFunction = new Function('return ' + expression);
            const result = safeFunction();

            if (!isFinite(result) || isNaN(result)) {
                resultTextElement.classList.add('color-error');
                resultTextElement.value = 'Invalid operation';
            } else {
                resultTextElement.value = result.toFixed(3);
                expression = result.toString();
            }
        } catch (error) {
            resultTextElement.value = 'Error';
        }
    }

    numZeroElement.addEventListener('click', () => updateResult('0'));
    numOneElement.addEventListener('click', () => updateResult('1'));
    numTwoElement.addEventListener('click', () => updateResult('2'));
    numThreeElement.addEventListener('click', () => updateResult('3'));
    numFourElement.addEventListener('click', () => updateResult('4'));
    numFiveElement.addEventListener('click', () => updateResult('5'));
    numSixElement.addEventListener('click', () => updateResult('6'));
    numSevenElement.addEventListener('click', () => updateResult('7'));
    numEightElement.addEventListener('click', () => updateResult('8'));
    numNineElement.addEventListener('click', () => updateResult('9'));

    divideElement.addEventListener('click', () => updateResult('/'));
    multiplyElement.addEventListener('click', () => updateResult('*'));
    subtractElement.addEventListener('click', () => updateResult('-'));
    addElement.addEventListener('click', () => updateResult('+'));
    dotElement.addEventListener('click', () => updateResult('.'));

    equalsElement.addEventListener('click', evaluateExpression);
    clearElement.addEventListener('click', clearResult)
}

solve();