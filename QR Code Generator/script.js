const imgBoxElement = document.getElementById('img-box');
const qrImageElement = document.getElementById('image');
const qrTextElement = document.getElementById('text');
const btnElement = document.querySelector('button');

function generateQRCode() {
    if (!qrTextElement.value) {
        qrTextElement.value = 'Please enter text or URL!';
        qrTextElement.classList.add('highlight');
        qrTextElement.classList.add('error');
        setTimeout(() => {
            qrTextElement.value = '';
            qrTextElement.classList.remove('highlight');
            qrTextElement.classList.remove('error');
        }, 1000)

        return;
    }

    qrImageElement.setAttribute(
        'src', `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrTextElement.value}`
    );

    imgBoxElement.classList.add('show-image');
}

btnElement.addEventListener('click', generateQRCode);