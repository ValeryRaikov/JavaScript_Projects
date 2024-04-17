const angleDivElement = document.querySelector('div .circle:first-of-type');
const angleElement = document.querySelector('.fa-angle-left');
const barsDivElement = document.querySelector('div .circle:last-of-type');

const songImageElement = document.querySelector('.song-image');
const songTitleElement = document.querySelector('.song-title');
const songAuthorElement = document.querySelector('.song-author');

const songElement = document.getElementById('song');

const progressElement = document.getElementById('progress');
const ctrlIconDivElement = document.getElementById('ctrl-icon');
const backwardIconElement = document.getElementById('backward-icon');
const forwardIconElement = document.getElementById('forward-icon');

const ctrlIcon = document.getElementById('ctrl-icon').firstChild;

angleDivElement.addEventListener('click', function () {
    if (angleElement.classList.contains('fa-angle-left')) {
        angleElement.classList.remove('fa-angle-left');
        angleElement.classList.add('fa-angle-right');
        songImageElement.src = 'images/default-theme.png';
        songImageElement.style.filter = 'brightness(75%)';
        songTitleElement.textContent = 'Please select a song to play!';
        songAuthorElement.textContent = '';
        progressElement.remove();
        ctrlIconDivElement.remove();
        backwardIconElement.remove();
        forwardIconElement.remove();
    } else {
        location.reload(true);
    }
});

let clickCount = 1;
barsDivElement.addEventListener('click', function () {
    const songContainerElement = document.querySelector('.song-container');
    if (clickCount % 2 === 0) {
        songContainerElement.removeChild(songImageElement);
    } else {
        songContainerElement.appendChild(songImageElement);
    }

    clickCount++;
});

songElement.onloadedmetadata = function () {
    progressElement.max = songElement.duration;
    progressElement.value = songElement.currentTime;
};

ctrlIconDivElement.addEventListener('click', function () {
    if (ctrlIcon.classList.contains('fa-pause')) {
        songElement.pause();
        ctrlIcon.classList.remove('fa-pause');
        ctrlIcon.classList.add('fa-play');
    } else {
        songElement.play();
        ctrlIcon.classList.remove('fa-play');
        ctrlIcon.classList.add('fa-pause');
    }
});

backwardIconElement.addEventListener('click', function () {
    songElement.currentTime -= 5;
});

forwardIconElement.addEventListener('click', function () {
    songElement.currentTime += 5;
});

setInterval(function () {
    progressElement.value = songElement.currentTime;
}, 500);

progressElement.addEventListener('input', function () {
    songElement.currentTime = progressElement.value;
    ctrlIcon.classList.remove('fa-play');
    ctrlIcon.classList.add('fa-pause');
});

songElement.removeAttribute('controls');