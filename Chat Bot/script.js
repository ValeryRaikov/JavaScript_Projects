const chatInputElement = document.querySelector('.chat-input textarea');
const sendMsgBtnElement = document.querySelector('.chat-input #send-btn');
const chatBoxElement = document.querySelector('.chatbox');
const chatTogglerElement = document.querySelector('.chatbot-toggler');
const chatCloseBtnElement = document.querySelector('.fa-solid .fa-xmark');

const inputInitHeight = chatInputElement.scrollHeight;

const api_key = ''; // Secret API key removed for privacy protection

let userMsg;

function createChatMsg(message, className) {
    const chatLiElement = document.createElement('li');
    chatLiElement.classList.add('chat', className);

    const chatContent = document.createElement('p');
    chatContent.textContent = message;

    if (className !== 'outcoming') {
        const chatBotIcon = document.createElement('i');
        chatBotIcon.classList.add('fa-solid', 'fa-robot');

        chatLiElement.appendChild(chatBotIcon);
    }

    chatLiElement.appendChild(chatContent);

    return chatLiElement;
}

function generateResponse(incomingChatLi) {
    const api_url = 'https://api.openai.com/v1/chat/completions';

    const msgElement = incomingChatLi.querySelector('p');

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${api_key}`,
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo-16k',
            messages: [{
                role: 'user',
                content: userMsg,
            }],
        }),
    }

    fetch(
        api_url, requestOptions
    ).then(
        result => {
            if (!result.ok) {
                if (result.status === 429){
                    throw new Error('Too Many Requests. Please try again later.');
                } else {
                    throw new Error('Error fetching Chat Bot API!');
                }
            }

            return result.json();
        }
    ).then(
        data => {
            msgElement.textContent = data.choices[0].message.content;
        }
    ).catch(
        err => {
            msgElement.classList.add('error');
            msgElement.textContent = err.message;
        }
    ).finally(() => chatBoxElement.scrollTo(0, chatBoxElement.scrollHeight));
}

function chatHandler() {
    userMsg = chatInputElement.value.trim();
    if (!userMsg) {
        return;
    }

    chatInputElement.value = '';

    chatBoxElement.appendChild(createChatMsg(userMsg, 'outcoming'));

    chatBoxElement.scrollTo(0, chatBoxElement.scrollHeight);

    setTimeout(() => {
        const incomingChatLi = createChatMsg('Thinking...', 'incoming');
        chatBoxElement.appendChild(incomingChatLi);

        generateResponse(incomingChatLi);

        chatBoxElement.scrollTo(0, chatBoxElement.scrollHeight);
    }, 600);
}

sendMsgBtnElement.addEventListener('click', chatHandler);

chatInputElement.addEventListener('input', () => {
    chatInputElement.style.height = `${inputInitHeight}px`;
    chatInputElement.style.height = `${chatInputElement.scrollHeight}px`;
});

chatTogglerElement.addEventListener('click', () => {
    document.body.classList.toggle('show-chatbot');
});

chatCloseBtnElement.addEventListener('click', () => {
    document.body.classList.remove('show-chatbot');
});