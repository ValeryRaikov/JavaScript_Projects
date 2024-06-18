const blockSize = 25;
const rows = 18;
const cols = 18;
let context;
let gameOver = false;

let snakeX = blockSize * 5;
let snakeY = blockSize * 5;
let snakeBody = [];

let foodX = blockSize * 10;
let foodY = blockSize * 10;

let positionX = 0;
let positionY = 0;

window.onload = () => {
    const board = document.getElementById('board');
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext('2d');

    board.style.display = 'none';

    const closeMsg = document.querySelector('h2');

    const playBtn = document.getElementById('play-btn');
    playBtn.addEventListener('click', () => {
        board.style.display = 'inline-block';
        closeMsg.style.display = 'none';

        placeFood();
        document.addEventListener('keyup', changeDirection);
        setInterval(update, 1000 / 10);
    });

    const closeBtn = document.getElementById('close-btn');
    closeBtn.addEventListener('click', () => {
        board.style.display = 'none';
        closeMsg.style.display = 'inline-block';
    });
}

const update = () => {
    if (gameOver) {
        return;
    }
    
    context.fillStyle = 'black';
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = 'red';
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if (snakeX === foodX && snakeY === foodY) {
        snakeBody.push([foodX, foodY]);
        placeFood();
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }

    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle = 'lime';
    snakeX += positionX * blockSize;
    snakeY += positionY * blockSize; 
    context.fillRect(snakeX, snakeY, blockSize, blockSize);

    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    if (snakeX < 0 || snakeX > cols * blockSize || snakeY < 0 || snakeY > rows * blockSize) {
        gameOver = true;
        alert('Sorry, you lost!');
        location.reload();
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX === snakeBody[i][0] && snakeY === snakeBody[i][1]) {
            gameOver = true;
            alert('Sorry, you lost!');
            location.reload();
        }
    }
}

const placeFood = () => {
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}

const changeDirection = (e) => {
    if (e.code === 'ArrowUp' && positionY != 1) {
        positionX = 0;
        positionY = -1;
    } else if (e.code === 'ArrowDown'&& positionY != -1) {
        positionX = 0;
        positionY = 1;
    } else if (e.code === 'ArrowLeft' && positionX != 1) {
        positionX = -1;
        positionY = 0;
    } else if (e.code === 'ArrowRight' && positionX != -1) {
        positionX = 1;
        positionY = 0;
    }
}
