var myList = document.getElementsByClassName("one-task");
var i;

for (i=0; i < myList.length; i++) {
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
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  }
}