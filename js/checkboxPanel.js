var myList = document.getElementsByClassName("one-task");
var myListNr = 2;
var i;
const taskAddBtn = document.querySelector('.add-task-btn');
const taskText = document.querySelector('#input-task-text');
var myListPanel = document.querySelector('#daily-task-list');

for (i = 0; i < myList.length; i++) {
  const span = document.createElement("SPAN");
  const spanTxt = document.createTextNode("\u00D7");
  span.className = "close-task-span";
  span.appendChild(spanTxt);
  myList[i].appendChild(span);
}

// zamykanie zadania
var close = document.getElementsByClassName("close-task-span");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function () {
    var div = this.parentElement;
    div.style.display = "none";
  };
}

// dodawanie nowego elementu
taskAddBtn.onclick = function () {
  const taskKey = myListNr;
  myListNr++;
  const textValue = taskText.value;

  console.log(taskKey);
  console.log(textValue);

  if ( taskKey && textValue ) {
    localStorage.setItem(taskKey, textValue);
  }
};

for ( i = 0; i < localStorage.length; i++) {
  const taskKey = localStorage.key(i);
  const textValue = localStorage.getItem(taskKey);

  myListPanel.innerHTML +=`${textValue}<br />`;
}