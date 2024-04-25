const fromTextElement = document.querySelector('.from-text');
const toTextElement = document.querySelector('.to-text');
const selectElements = document.querySelectorAll('select');
const translateBtnElement = document.querySelector('button');
const exchangeIconElement = document.querySelector('.exchange');
const iconElements = document.querySelectorAll('.row i');

selectElements.forEach((el, id) => {
    for (const country_code in countries) {
        // Set default languages
        let selected;

        if (id === 0 && country_code === 'en-GB') {
            selected = 'selected';
        } else if (id === 1 && country_code === 'bg-BG') {
            selected = 'selected';
        }

        const optionElement = document.createElement('option');
        optionElement.textContent = countries[country_code];
        optionElement.value = country_code;
        optionElement.setAttribute(selected, 'selected');

        el.appendChild(optionElement);
    }
});

iconElements.forEach(icon => {
    icon.addEventListener('click', (e) => {
        if (e.target.classList.contains('fa-copy')) {
            if (e.target.id === 'from') {
                navigator.clipboard.writeText(fromTextElement.value);
            } else {
                navigator.clipboard.writeText(toTextElement.value);
            }
        } else {
            let utterance;
            if (e.target.id === 'from') {
                utterance = new SpeechSynthesisUtterance(fromTextElement.value);
                utterance.lang = selectElements[0].value;
            } else {
                utterance = new SpeechSynthesisUtterance(toTextElement.value);
                utterance.lang = selectElements[1].value;
            }

            speechSynthesis.speak(utterance);
        }
    });
});

exchangeIconElement.addEventListener('click', () => {
    let tempText = fromTextElement.value;
    let tempLanguage = selectElements[0].value;
    fromTextElement.value = toTextElement.value;
    selectElements[0].value = selectElements[1].value;
    toTextElement.value = tempText;
    selectElements[1].value = tempLanguage;
});

translateBtnElement.addEventListener('click', () => {
    const text = fromTextElement.value;
    const translateFrom = selectElements[0].value;
    const translateTo = selectElements[1].value;

    if (!text) {
        alert('No text provided!');
        return;
    }

    toTextElement.setAttribute('placeholder', 'Translating...');

    const apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;

    fetch(apiUrl)
        .then(res => {
            if (!res.ok) {
                throw new Error(`Fetching ${apiUrl} failed!`);
            }

            return res.json();
        })
        .then(data => {
            toTextElement.value = data.responseData.translatedText;
            toTextElement.setAttribute('placeholder', 'Translating...');
        })
        .catch(err => console.error(err));
});