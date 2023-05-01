const noteButton = document.getElementById("note-button");
const noteFormContainer = document.getElementById("note-form-container");
const noteForm = document.getElementById("note-form");
const noteText = document.getElementById("note-text");

// Show the note form when the button is clicked
noteButton.addEventListener("click", () => {
  noteFormContainer.classList.remove("hidden");
});

// Hide the note form when the cancel button is clicked
document.getElementById("note-cancel-button").addEventListener("click", () => {
  noteFormContainer.classList.add("hidden");
});

// Save the note when the form is submitted
noteForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const note = noteText.value;
// Do something with the note, e.g. save it to a database or display it on the
// page

// Clear the form and hide it
  noteText.value = "";
  noteFormContainer.classList.add("hidden");

// Display the note on the page
  const noteDisplay = document.createElement("div");
  noteDisplay.innerText = note;
  document.body.appendChild(noteDisplay);
});

// Make the note button draggable
dragElement(noteButton);

function dragElement(element) {
  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (document.getElementById(element.id + "-header")) {
    /* if present, the header is where you move the DIV from:/
    document.getElementById(element.id + "-header").onmousedown = dragMouseDown;
    } else {
    / otherwise, move the DIV from anywhere inside the DIV:*/
    element.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
// get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
// call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
// calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
// set the element's new position:
    element.style.top = element.offsetTop - pos2 + "px";
    element.style.left = element.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}