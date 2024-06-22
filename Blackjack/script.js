let dealerTotal = 0;
let yourTotal = 0;

let dealerAceCount = 0;
let yourAceCount = 0;

let hidden;
let deck;

let canHit = true;

const builtDeck = function () {
    const types = ['C', 'D', 'H', 'S'];
    const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

    deck = [];

    for (let i = 0; i < types.length; i++) {
        for (let j = 0; j < values.length; j++) {
            deck.push(values[j] + '-' + types[i]);
        }
    }
}

const shuffleDeck = function () {
    for (let i = 0; i < deck.length; i++) {
        let j = Math.floor(Math.random() * deck.length);

        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
}

const newGame = function () {
    setTimeout(() => {
        location.reload();
    }, "2000");
}

const startGame = function () {
    hidden = deck.pop();
    dealerTotal += getValue(hidden);
    dealerAceCount += checkAce(hidden);

    let cardImgElement = document.createElement('img');
    let card = deck.pop();

    cardImgElement.setAttribute('src', `cards/${card}.png`);

    dealerTotal += getValue(card);
    dealerAceCount += checkAce(card);

    document.getElementById('dealer-cards').append(cardImgElement);

    for (let i = 0; i < 2; i++) {
        let cardImgElement = document.createElement('img');
        let card = deck.pop();

        cardImgElement.setAttribute('src', `cards/${card}.png`);

        yourTotal += getValue(card);
        yourAceCount += checkAce(card);

        document.getElementById('your-total').textContent = yourTotal;
        document.getElementById('your-cards').append(cardImgElement);
    }

    document.getElementById('hit').addEventListener('click', hitCard);
    document.getElementById('stay').addEventListener('click', stay);
}

const revealDealerCards = function () {
    document.getElementById('hidden').setAttribute('src', `cards/${hidden}.png`);

    while (dealerTotal < 17) {
        let cardImgElement = document.createElement('img');
        let card = deck.pop();
        cardImgElement.setAttribute('src', `cards/${card}.png`);
        dealerTotal += getValue(card);
        dealerAceCount += checkAce(card);
        document.getElementById('dealer-cards').append(cardImgElement);
    }

    document.getElementById('dealer-total').textContent = dealerTotal;
}

const hitCard = function () {
    if (!canHit) {
        return;
    }

    let cardImgElement = document.createElement('img');
    let card = deck.pop();

    cardImgElement.setAttribute('src', `cards/${card}.png`);

    yourTotal += getValue(card);
    yourAceCount += checkAce(card);

    document.getElementById('your-total').textContent = yourTotal;
    document.getElementById('your-cards').append(cardImgElement);

    if (reduceAce(yourTotal, yourAceCount) > 21) {
        canHit = false;

        document.getElementById('results').style.color = 'red';
        document.getElementById('results').textContent = 'You lose!';

        newGame();
    }
}

const stay = function () {
    dealerTotal = reduceAce(dealerTotal, dealerAceCount);
    yourTotal = reduceAce(yourTotal, yourAceCount);

    canHit = false;

    revealDealerCards();

    document.getElementById('hidden').setAttribute('src', `cards/${hidden}.png`);

    let message = '';
    if (yourTotal > 21) {
        message = 'You lose!';
    } else if (dealerTotal > 21) {
        message = 'You win!';
    } else if (yourTotal == dealerTotal) {
        message = 'Tie!'
    } else if (yourTotal > dealerTotal) {
        message = 'You win!';
    } else if (yourTotal < dealerTotal) {
        message = 'You lose!';
    }

    if (message === 'You lose!') {
        document.getElementById('results').style.color = 'red';
    } else {
        document.getElementById('results').style.color = 'lightgreen';
    }

    document.getElementById('dealer-total').textContent = dealerTotal;
    document.getElementById('your-total').textContent = yourTotal;
    document.getElementById('results').textContent = message;

    newGame();
}

const getValue = function (card) {
    let cardData = card.split('-');
    let value = cardData[0];

    if (isNaN(value)) {
        if (value === 'A') {
            return 11;
        }

        return 10;
    }

    return parseInt(value);
}

const checkAce = function (card) {
    if (card[0] === 'A') {
        return 1;
    }

    return 0;
}

const reduceAce = function (playerTotal, playerAceCount) {
    while (playerTotal > 21 && playerAceCount > 0) {
        playerTotal -= 10;
        playerAceCount -= 1;
    }

    return playerTotal;
}

builtDeck();
shuffleDeck();
startGame();