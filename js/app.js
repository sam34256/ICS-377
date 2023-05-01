// Load shared notes from local storage
const sharedNotes = JSON.parse(localStorage.getItem('sharedNotes')) || [];

// Load user-specific notes from local storage
const userNotesKey = localStorage.getItem('userNotesKey');
const userNotes = (userNotesKey && JSON.parse(localStorage.getItem(userNotesKey))) || [];

// Generate a new user-specific notes key
if (!userNotesKey) {
  const newUserNotesKey = Date.now().toString();
  localStorage.setItem('userNotesKey', newUserNotesKey);
}

// Function to add a note
const addNote = () => {
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;
  const sharedKey = document.getElementById('shared-key').value;

  if (!title || !content) {
    alert('Please enter a title and content for the note.');
    return;
  }

  const newNote = {
    title: title,
    content: content,
    ownerKey: userNotesKey
  };

  if (sharedKey) {
    const sharedNoteIndex = sharedNotes.findIndex(note => note.sharedKey === sharedKey);
    if (sharedNoteIndex !== -1) {
      sharedNotes[sharedNoteIndex].notes.push(newNote);
    } else {
      sharedNotes.push({
        sharedKey: sharedKey,
        notes: [newNote]
      });
    }
    localStorage.setItem('sharedNotes', JSON.stringify(sharedNotes));
  } else {
    userNotes.push(newNote);
    localStorage.setItem(userNotesKey, JSON.stringify(userNotes));
  }

  displayNotes();
  document.getElementById('title').value = '';
  document.getElementById('content').value = '';
  document.getElementById('shared-key').value = '';
};

// Function to delete a note
const deleteNote = (noteIndex, ownerKey) => {
  if (ownerKey === userNotesKey) {
    userNotes.splice(noteIndex, 1);
    localStorage.setItem(userNotesKey, JSON.stringify(userNotes));
  } else {
    const sharedNoteIndex = sharedNotes.findIndex(note => note.sharedKey === ownerKey);
    if (sharedNoteIndex !== -1) {
      sharedNotes[sharedNoteIndex].notes.splice(noteIndex, 1);
      localStorage.setItem('sharedNotes', JSON.stringify(sharedNotes));
    }
  }

  displayNotes();
};

// Function to display all notes
const displayNotes = () => {
  const notesDiv = document.getElementById('notes');
  notesDiv.innerHTML = '';

  // Display user-specific notes
  userNotes.forEach((note, i) => {
    const noteDiv = createNoteElement(note.title, note.content, i, userNotesKey);
    notesDiv.appendChild(noteDiv);
  });

  // Display shared notes
  sharedNotes.forEach(sharedNote => {
    sharedNote.notes.forEach
    ((note, i) => {
      const noteDiv = createNoteElement(note.title, note.content, i, sharedNote.sharedKey);
      notesDiv.appendChild(noteDiv);
    });
  });
};

// Function to create a note element
const createNoteElement = (title, content, index, ownerKey) => {
  const noteDiv = document.createElement('div');
  noteDiv.classList.add('note');

  const noteTitle = document.createElement('h3');
  noteTitle.innerText = title;
  noteDiv.appendChild(noteTitle);

  const noteContent = document.createElement('p');
  noteContent.innerText = content;
  noteDiv.appendChild(noteContent);

  if (ownerKey === userNotesKey) {
    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.addEventListener('click', () => deleteNote(index, ownerKey));
    noteDiv.appendChild(deleteButton);
  }

  return noteDiv;
};

// Add event listener to add note button
document.getElementById('add-btn').addEventListener('click', addNote);

// Display all notes on page load
displayNotes();
