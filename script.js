const addBtn = document.getElementById("addBtn");
const notesContainer = document.getElementById("notes");
const search = document.getElementById("search");

// Load saved notes
function loadNotes() {
  const notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes.forEach(note => createNote(note));
}

// Save notes
function saveNotes() {
  const textareas = document.querySelectorAll("textarea");
  const notes = [];
  
  textareas.forEach(textarea => {
    notes.push(textarea.value);
  });

  localStorage.setItem("notes", JSON.stringify(notes));
}

// Create note UI
function createNote(text = "") {
  const noteDiv = document.createElement("div");
  noteDiv.classList.add("note");

  const textarea = document.createElement("textarea");
  textarea.value = text;

  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.classList.add("delete");

  deleteBtn.addEventListener("click", () => {
    noteDiv.remove();
    saveNotes();
  });

  textarea.addEventListener("input", saveNotes);

  noteDiv.appendChild(textarea);
  noteDiv.appendChild(deleteBtn);

  notesContainer.appendChild(noteDiv);
}

// Add note button
addBtn.addEventListener("click", () => {
  createNote();
});

// 🔍 Search functionality
search.addEventListener("input", () => {
  const value = search.value.toLowerCase();
  const notes = document.querySelectorAll(".note");

  notes.forEach(note => {
    const text = note.querySelector("textarea").value.toLowerCase();
    if (text.includes(value)) {
      note.style.display = "block";
    } else {
      note.style.display = "none";
    }
  });
});

// Initial load
loadNotes();