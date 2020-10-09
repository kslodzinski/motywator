const toModalAdd = document.querySelector('.open-add-modal-btn');
const bodyHolder = document.querySelector('.body-holder');
const formTaskHolder = document.querySelector('.form-add-task-holder'); //caly modal dodawnia
const addTaskBtn = document.querySelector('.add-task-btn');

// otwieranie modala dodawania zadan
toModalAdd.addEventListener('click', function() {
    formTaskHolder.classList.add('form-is-open');
    bodyHolder.classList.add('body-holder-after');

    // dodaj btn zamykania modala
    const closeModalBtn = document.createElement('span');
    var txt = document.createTextNode("\u00D7");
    closeModalBtn.className = "close-modal-btn";
    closeModalBtn.appendChild(txt);

    formTaskHolder.appendChild(closeModalBtn);

    // zamykanie modala
    closeModalBtn.addEventListener ('click', function() {
        formTaskHolder.classList.remove('form-is-open');
        bodyHolder.classList.remove('body-holder-after');
    });

});

// dodawanie taskow
const formTaskAdd = document.querySelector('.form-task-add');
const urgentList = document.querySelector('#urgent-list');
const parsingLocalStorageItems = JSON.parse(localStorage.getItem('urgent-list'))  || [];

function listItemsFn(e) {
    e.preventDefault();
    const itemText = (this.querySelector('[name=item]')).value;
    const item = {
        itemText,
        checkedOff: false,
        deleted: false
    };
};

addTaskBtn.addEventListener('click', function(e) {
    e.preventDefault();
    let addTaskValue = document.querySelector('.add-task-value').value;
    console.log(addTaskValue);
});