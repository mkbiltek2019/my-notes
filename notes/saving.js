/* global chrome, localStorage */

import debounce from "./debounce.js";
import { state } from "./state.js";

const mergeNotes = (currentNotes) => {
  const notesToSave = JSON.parse(localStorage.getItem("notesToSave"));
  if (!notesToSave) {
    return false;
  }

  const notes = [...currentNotes];
  for (let index = 0; index < notes.length; index += 1) {
    const updatedText = notesToSave[index] && notesToSave[index].text;
    if (updatedText) {
      notes[index].text = updatedText;
    }
  }
  return notes;
};

const saveNotes = (notes) => {
  const notesToSave = mergeNotes(notes);

  // "notesToSave" are no longer in localStorage.
  if (!notesToSave) {
    return;
  }

  // When closing a window (all My Notes tabs),
  // first My Notes tab will save the changes,
  // and remove "notesToSave" from localStorage.
  //
  // This will save "notesToSave" just once, and
  // prevent other My Notes tabs to call the same
  // saving repeatedly.
  localStorage.removeItem("notesToSave");

  // "currentNotes" are updated before they are saved, so
  // listener updates ONLY other open My Notes Tabs/Windows
  state.currentNotes = notesToSave;
  chrome.storage.local.set({ notes: notesToSave });
};

// Saves notes after 1 second of inactivity
const saveNotesDebounce = debounce(saveNotes, 1000);

export {
  saveNotes,
  saveNotesDebounce
};
