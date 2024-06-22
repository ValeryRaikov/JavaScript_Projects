let board = [];
let rows = 8;
let cols = 8;
let minesCount;
let minesLocation = [];
let tilesClicked = 0;
let flagEnabled = false;
let gameOver = false;

function playAgain() {
    document.getElementById('play-again-btn').style.display = 'inline-block';

    document.getElementById('play-again-btn').addEventListener('click', () => {
        location.reload();
    });
}

function getMinesCount() {
    document.getElementById('submit-btn').addEventListener('click', () => {
        minesCount = parseInt(document.getElementById('mine-input').value);

        if (minesCount === '') {
            alert('Please enter a valid number!');
        }

        if (minesCount < 10) {
            minesCount = 10;
            alert('Set automatically to 10!');
        }

        if (minesCount > 30) {
            minesCount = 30;
            alert('Set automatically to 30!');
        }

        document.getElementById('mine-input').style.display = 'none';
        document.getElementById('submit-btn').style.display = 'none';
        
        startGame();
    });
}

function setMines() {
    let minesLeft = minesCount;
    while (minesLeft > 0) {
        let row = Math.floor(Math.random() * rows);
        let col = Math.floor(Math.random() * cols);
        let id = row.toString() + '-' + col.toString();

        if (!minesLocation.includes(id)) {
            minesLocation.push(id);
            minesLeft -= 1;
        }
    }
}

function startGame() {
    document.getElementById('mines-count').textContent = minesCount;
    document.getElementById('flag-btn').addEventListener('click', setFlag);

    setMines();

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < cols; c++) {
            let tile = document.createElement('div');
            tile.setAttribute('id', r.toString() + '-' + c.toString());
            tile.addEventListener('click', clickTile);

            document.getElementById('board').append(tile);
            row.push(tile);
        }

        board.push(row);
    }
}

function setFlag() {
    if (flagEnabled) {
        flagEnabled = false;
        document.getElementById('flag-btn').style.backgroundColor = '#d3d3d3';
    } else {
        flagEnabled = true;
        document.getElementById('flag-btn').style.backgroundColor = '#a9a9a9';
    }
}

function clickTile() {
    if (gameOver || this.classList.contains('tile-clicked')) {
        playAgain();
        return;
    }

    let tile = this;
    if (flagEnabled) {
        if (tile.textContent === '') {
            tile.textContent = '🚩';
            minesCount -= 1;
            document.getElementById('mines-count').textContent = minesCount;
        } else if (tile.textContent === '🚩') {
            tile.textContent = '';
        }

        return;
    }

    if (minesLocation.includes(tile.id)) {
        gameOver = true;
        revealMines();
        playAgain();
        return;
    }

    let coordinates = tile.id.split('-');
    let row = parseInt(coordinates[0]);
    let col = parseInt(coordinates[1]);

    checkMine(row, col);
}

function revealMines() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            let tile = board[r][c];
            if (minesLocation.includes(tile.id)) {
                tile.textContent = '💣';
                tile.style.backgroundColor = 'red';
            }
        }
    }
}

function checkMine(row, col) {
    if (row < 0 || row >= rows || col < 0 || col >= cols) {
        return;
    }

    if (board[row][col].classList.contains('tile-clicked')) {
        return;
    }

    board[row][col].classList.add('tile-clicked');
    tilesClicked++;

    let minesFound = 0;

    minesFound += checkTile(row - 1, col - 1);
    minesFound += checkTile(row - 1, col);
    minesFound += checkTile(row - 1, col + 1);

    minesFound += checkTile(row, col - 1);
    minesFound += checkTile(row, col + 1);

    minesFound += checkTile(row + 1, col - 1);
    minesFound += checkTile(row + 1, col);
    minesFound += checkTile(row + 1, col + 1);

    if (minesFound > 0) {
        board[row][col].textContent = minesFound;
        board[row][col].classList.add('x' + minesFound.toString());
    } else {
        checkMine(row - 1, col - 1);
        checkMine(row - 1, col);
        checkMine(row - 1, col + 1);

        checkMine(row, col - 1);
        checkMine(row, col + 1);
        
        checkMine(row + 1, col - 1);
        checkMine(row + 1, col);
        checkMine(row + 1, col + 1);
    }

    checkForWin();
}

function checkForWin() {
    if (tilesClicked === rows * cols - minesCount) {
        document.getElementById('mines-count').textContent = 'Cleared!';
        gameOver = true;
        alert('Congratulations, you won!');
    }
}

function checkTile(row, col) {
    if (row < 0 || row >= rows || col < 0 || col >= cols) {
        return 0;
    }
    if (minesLocation.includes(row.toString() + '-' + col.toString())) {
        return 1;
    }

    return 0;
}

getMinesCount();
