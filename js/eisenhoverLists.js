






// modal do obslugi dodawania zadan
const modalOpenBtn = document.querySelector('.open-task-modal');
const modalContent = document.querySelector('.to-do-list-form');
const fullPageContainer = document.querySelector('.full-page-container');

modalOpenBtn,addEventListener('click', function() {
    modalContent.style.display = "flex";
    fullPageContainer.classList.add("f-p-g-after");
})

// przyciski sterujace wyswietlana lista
const toUrgentBtn = document.querySelector('#urgent-btn');
const toImportantBtn = document.querySelector('#important-btn');
const toOthersBtn = document.querySelector('#others-btn');

// list
const urgentList = document.querySelector('.list-urgent');
const importantList = document.querySelector('.list-important');
const othersList = document.querySelector('.list-others');

// wystwietlanei list
toUrgentBtn.addEventListener('click', function() {
    urgentList.style.display = "flex";
    importantList.style.display = "none";
    othersList.style.display = "none";
});

toImportantBtn.addEventListener('click', function() {
    urgentList.style.display = "none";
    importantList.style.display = "flex";
    othersList.style.display = "none";
});

toOthersBtn.addEventListener('click', function() {
    urgentList.style.display = "none";
    importantList.style.display = "none";
    othersList.style.display = "flex";
});

modalContent.addEventListener('submit',checkInput);