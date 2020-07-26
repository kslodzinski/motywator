const form = document.querySelector('#daily-task-form'); //formularz doddawania
const item = document.querySelector('#input-task-text'); // wartosc tekstowa z inputa
const sumbit = document.querySelector('.add-task-btn'); // przycisk dodaj
const lists = document.querySelector('#daily-task-list'); // cala lista ul
const clear = document.querySelector('#clear-tasks-btn'); // przycisk kasujacy cala liste
const error = document.querySelector('.error'); // komunikat o bledzie domyslnie niewidoczny
let listItems = localStorage.getItem('items')?JSON.parse(localStorage.getItem('items')):[];
const trash = document.getElementById('trash');

localStorage.setItem('items',JSON.stringify(listItems));
let data = JSON.parse(localStorage.getItem('items'));


// Functions

const listMaker = text =>{
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.innerHTML = '<i id="trash" class="fa fa-trash trash"></i>';
    li.textContent = text;
    li.appendChild(span);
    lists.appendChild(li);
    location.reload()
}

function checkInput(e){
    e.preventDefault();
    if(item.value.trim()===""){
        error.classList.add('show')
    }
    else{
        error.classList.remove('show');
        listItems.push(item.value)
        localStorage.setItem('items',JSON.stringify(listItems))
        listMaker(item.value);
        item.value = '';
    }
}

data.forEach(e=>{
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.innerHTML = '<i id="trash" class="fa fa-trash trash"></i>';
    li.textContent = e;
    li.appendChild(span);
    lists.appendChild(li);

    span.addEventListener('click',e=>{
        if(e.target.classList.contains('trash')){
            let text = e.target.parentElement.parentElement.textContent;
            listItems.splice(listItems.indexOf(text),1);
            localStorage.setItem('items',JSON.stringify(listItems));
            li.remove();
            location.reload()
        }
    })
})

function clearAll(){
    localStorage.clear()
    location.reload()
}
// preventing the page from refreshing when the form is submitted
form.addEventListener('submit',checkInput);
clear.addEventListener('click',clearAll);