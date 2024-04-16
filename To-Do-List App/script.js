const taskInputElement = document.getElementById('input-box');
const listUlElement = document.getElementById('list-container');

const addBtnElement = document.querySelector('button');

const setTaskInputToNormal = () => {
    taskInputElement.value = ''; 
    taskInputElement.style.fontWeight = 'normal';
    taskInputElement.style.textDecoration = 'none';
}

const saveData = () => {
    localStorage.setItem('data', listUlElement.innerHTML);
}

const showTask = () => {
    listUlElement.innerHTML = localStorage.getItem('data');
}

addBtnElement.addEventListener('click', () => {
    if (taskInputElement.value === '') {
        taskInputElement.value = 'Please write something!'; 
        taskInputElement.style.fontWeight = 'bold';
        taskInputElement.style.textDecoration = 'underline';
    } else {
        let taskExists = false;
        listUlElement.querySelectorAll('li').forEach(existingLiElement => {
            if (existingLiElement.textContent.toLocaleLowerCase() === taskInputElement.value.toLocaleLowerCase()) {
                taskInputElement.value = 'Such task already exists!';
                existingLiElement.style.fontWeight = 'bold';
                existingLiElement.style.color = '#ff0000';
                taskExists = true;
            }
        });

        if (!taskExists) {
            const liElement = document.createElement('li');
            liElement.textContent = taskInputElement.value;

            const spanElement = document.createElement('span');
            spanElement.textContent = '\u00d7';

            liElement.appendChild(spanElement);
            listUlElement.appendChild(liElement);
        }
    }

    taskInputElement.value = '';
    saveData();
});

taskInputElement.addEventListener('click', () => {
    if (taskInputElement.value === 'Please write something!') {
        setTaskInputToNormal();
    }
});

listUlElement.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle('checked');
        saveData();
    } else if (e.target.tagName === 'SPAN') {
        e.target.parentElement.remove();
        saveData();
    }
});

showTask();