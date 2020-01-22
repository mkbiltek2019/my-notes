// Open notes order is defined by "state.open"
const openNotes = (state) => state.open
  .map((id) => state.notes.find((note) => note.id === id));

// Closed notes order is A-Z
const closedNotes = (state) => state.notes
  .filter((note) => !state.open.includes(note.id))
  .sort((a, b) => a.title.localeCompare(b.title));

const activeNote = (state) => state.notes
  .find((note) => note.id === state.active);

export default {
  openNotes,
  closedNotes,
  activeNote,
};
