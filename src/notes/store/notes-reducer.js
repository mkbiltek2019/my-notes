const initialState = {
  notes: [
    { id: 1, title: "Amazon shopping", text: "This is Amazon shopping" },
    { id: 2, title: "Todos", text: "This is Todos" },
    { id: 3, title: "Cooking", text: "This is Cooking" },
  ],
  open: [
    1,
    2,
    3,
  ],
  active: 1,
  fresh: null,
};

const ADD_NOTE = (state) => {
  const newNoteId = state.notes.length
    ? Math.max(...(state.notes.map((note) => note.id))) + 1
    : 1;

  const newNote = { id: newNoteId, title: "New Note", text: "" };

  return {
    notes: [...state.notes, newNote],
    open: [...state.open, newNoteId],
    active: newNoteId,
    fresh: newNoteId,
  };
};

const OPEN_NOTE = (state, action) => {
  const open = [...state.open, action.id];
  const active = action.id;
  return {
    ...state,
    open,
    active,
    fresh: null,
  };
};

const CLOSE_NOTE = (state, action) => {
  const open = [...state.open];
  const openIndex = open.indexOf(action.id);
  if (openIndex !== -1) {
    open.splice(openIndex, 1);
  }
  // Activate next or previous open note if exists
  const active = open[openIndex] || open[openIndex - 1] || null;
  return {
    ...state,
    open,
    active,
    fresh: null,
  };
};

const ACTIVATE_NOTE = (state, action) => ({
  ...state,
  active: action.id,
  fresh: null,
});

const REMOVE_NOTE = (state, action) => {
  const afterCloseState = CLOSE_NOTE(state, action);
  const notes = [...afterCloseState.notes];
  const noteIndex = notes.findIndex((note) => note.id === action.id);
  notes.splice(noteIndex, 1);
  return {
    ...afterCloseState,
    notes,
  };
};

const EDIT_NOTE = (state, action) => {
  const { id, title, text } = action;
  const notes = [...state.notes];
  const noteIndex = notes.findIndex((note) => note.id === id);
  const note = { ...notes[noteIndex] };

  note.title = (typeof title === "string") ? title : note.title;
  note.text = (typeof text === "string") ? text : note.text;

  // Remove Note if title and text are set to ""
  const canRemove = note.title === "" && note.text === "";
  if (canRemove) {
    return REMOVE_NOTE(state, action);
  }

  // Title cannot be empty if NOT deleting (text is NOT empty)
  if (note.title === "") {
    note.title = notes[noteIndex].title; // previous title
  }

  // Replace note with new note
  notes[noteIndex] = note;

  return {
    ...state,
    notes,
    fresh: null,
  };
};

const REORDER_NOTE = (state, action) => {
  const { oldIndex, newIndex } = action;

  const open = [...state.open];
  const aOpen = open[oldIndex];

  open.splice(oldIndex, 1); // remove open
  open.splice(newIndex, 0, aOpen); // insert open

  return {
    ...state,
    open,
  };
};

const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_NOTE": return ADD_NOTE(state);
    case "OPEN_NOTE": return OPEN_NOTE(state, action);
    case "CLOSE_NOTE": return CLOSE_NOTE(state, action);
    case "ACTIVATE_NOTE": return ACTIVATE_NOTE(state, action);
    case "REMOVE_NOTE": return REMOVE_NOTE(state, action);
    case "EDIT_NOTE": return EDIT_NOTE(state, action);
    case "REORDER_NOTE": return REORDER_NOTE(state, action);

    default: return state;
  }
};

export default notesReducer;
