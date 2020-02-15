/* global document */

import { notes } from "./elements.js";

const noteElem = (name, text, { activateNote, renameNote }) => {
  const oldName = name;

  // <div class="note">Todos</div>
  const elem = document.createElement("div");
  elem.classList.add("note-name");
  elem.innerText = name;

  // click => activate note
  elem.addEventListener("click", () => {
    activateNote(name);
    //setActive(name, text); // callback
  });

  // dblclick => start renaming (contentEditable=true)
  elem.addEventListener("dblclick", () => {
    elem.classList.add("renaming");
    elem.contentEditable = true;
    elem.focus();
    document.execCommand("selectAll",false,null);
  });


  // blur => stop renaming (contentEditable=false)
  elem.addEventListener("blur", () => {
    elem.classList.remove("renaming");
    elem.contentEditable = false;
    const newName = elem.innerText.trim();
    if (newName.length === 0 || newName === oldName) {
      elem.innerText = oldName;
      return;
    }
    elem.innerText = newName;
    renameNote(oldName, newName); // callback
  });

  // keypress => Enter to blur
  elem.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      elem.blur();
    }
  });

  return elem;
};

export default function setNotes(notesObject, { activateNote, renameNote }) {
  const fragment = document.createDocumentFragment();
  //const noteNames = notesToRender(notes, active);
  let noteNames = Object.keys(notesObject);

  // Add all notes to the fragment
  for (const name of noteNames) {
    const text = notes[name];
    const elem = noteElem(name, text, { activateNote, renameNote });
    fragment.appendChild(elem);
  }

  // Render notes to <div id="notes"></div>
  notes.innerHTML = "";
  notes.appendChild(fragment);
}
