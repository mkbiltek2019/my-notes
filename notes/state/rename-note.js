/* global chrome */

export default function renameNote(oldName, newName) {
  chrome.storage.local.get(["notes"], local => {
    const notes = { ...local.notes };
    const text = notes[oldName];

    delete notes[oldName];
    notes[newName] = text;

    chrome.storage.local.set({ notes: notes });
  });
}
