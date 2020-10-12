const toModalAdd = document.querySelector('.open-add-modal-btn');
const bodyHolder = document.querySelector('.body-holder'); // cala strona z wylaczeniem formularza
const formTaskHolder = document.querySelector('.form-add-task-holder'); //caly modal dodawnia
const addTaskBtn = document.querySelector('.add-task-btn');

// otwieranie modala dodawania zadan
toModalAdd.addEventListener('click', function () {
    formTaskHolder.classList.add('form-is-open');
    bodyHolder.classList.add('body-holder-after');

    // dodaj btn zamykania modala
    const closeModalBtn = document.createElement('span');
    var txt = document.createTextNode("\u00D7");
    closeModalBtn.className = "close-modal-btn";
    closeModalBtn.appendChild(txt);

    formTaskHolder.appendChild(closeModalBtn);

    // zamykanie modala
    closeModalBtn.addEventListener('click', function () {
        formTaskHolder.classList.remove('form-is-open');
        bodyHolder.classList.remove('body-holder-after');
    });

});

// dodawanie taskow

const todoInput = document.querySelector('.todo-input'); // miejsce na wartosc do dodania
const mainForm = document.querySelector('.main-form'); // caly formularz
const todoUrgentList = document.querySelector('.todo-list-urgent'); //pilne zadania
const todoImportantList = document.querySelector('.todo-list-important'); //wazne zadania
const todoOthersList = document.querySelector('.todo-list-others'); //inne zadania

let urgentTodos = [];
let importantTodos = [];
let othersTodos = [];

function addTodo(item) {
    if (item !== '') {
        const todo = {
            id: Date.now(),
            name: item,
            completed: false
        };
    }

    const urgentHolder = document.querySelector('.urgent');
    const importantHolder = document.querySelector('.important');
    const othersHolder = document.querySelector('.others');

    if (urgentHolder.classList.contains('list-active')) {
        urgentTodos.push(todo);
        renderTodos(urgentTodos);
        todoInput.value = '';
    } else if (importantHolder.classList.contains('list-active')) {
        importantTodos.push(todo);
        renderTodos(importantTodos);
        todoInput.value = '';
    } else if (othersHolder.classList.contains('list-active')) {
        othersTodos.push(todo);
        renderTodos(othersTodos);
        todoInput.value = '';
    };
};







