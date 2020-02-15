/* global chrome */

import nextToActivate from "./find/next-to-activate.js";

export default function deleteNote(noteId) {
  chrome.storage.local.get(["notes"], local => {
    const notes = [...local.notes];
    const index = notes.findIndex(note => note.id === noteId);
    if (index === -1) {
      return;
    }

    // activate next
    const toActivateIndex = nextToActivate(notes, index);
    if (toActivateIndex !== -1) {
      notes[toActivateIndex].active = true;
    }

    // delete note
    notes.splice(index, 1);

    chrome.storage.local.set({ notes: notes });
  });
}
