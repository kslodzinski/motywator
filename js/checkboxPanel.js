var myList = document.getElementsByClassName("one-task");
var i;

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
function newElement() {
  const li = document.createElement("li");
  let inputValue = document.getElementById("input-task-text").value;
  const t = document.createTextNode(inputValue);
  localStorage.setItem(inputValue, inputValue.length);
  console.log(localStorage)
  li.appendChild(t);
  if (inputValue === "") {
    alert("You must write somethin");
  } else {
    document.getElementById("daily-task-list").appendChild(li);
  }
  document.getElementById("input-task-text").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close-task-span";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }

}
