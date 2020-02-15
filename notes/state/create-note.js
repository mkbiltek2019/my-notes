/* global chrome */

const newNoteId = (notes) => {
  const ids = notes.map(note => note.id);
  const id = ids.length === 0 ? 1 : Math.max(...ids) + 1;
  return id;
}

export default function createNote() {
  chrome.storage.local.get(["notes"], local => {
    const newNote = {
      id: newNoteId(local.notes),
      name: "New note",
      text: "",
      open: true,
      active: false,
    }

    const notes = [
      ...local.notes,
      newNote,
    ];

    for (const note of notes) { note.active = false; }
    notes[notes.length - 1].active = true;

    chrome.storage.local.set({ notes: notes });
  });
}
