import { createStore } from "redux";

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

const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_NOTE": {
      const id = state.notes.length
        ? Math.max(...(state.notes.map((note) => note.id))) + 1
        : 1;

      const note = { id, title: "New Note", text: "" };

      return {
        notes: [
          ...state.notes,
          note,
        ],
        open: [
          ...state.open,
          id,
        ],
        active: id,
        fresh: id,
      };
    }

    case "ACTIVATE_NOTE":
      return {
        ...state,
        active: action.id,
        fresh: null,
      };

    case "EDIT_NOTE": {
      const { id, title, text } = action;
      let active = id;

      const notes = [...state.notes];
      const open = [...state.open];
      const noteIndex = notes.findIndex((note) => note.id === id);
      const note = { ...notes[noteIndex] };

      note.title = (typeof title === "string") ? title : note.title;
      note.text = (typeof text === "string") ? text : note.text;

      // Delete Note if title and text are set to ""
      const deleting = note.title === "" && note.text === "";

      if (deleting) {
        // Remove note
        notes.splice(noteIndex, 1);

        // Remove open
        const openIndex = open.indexOf(id);
        if (openIndex !== -1) {
          open.splice(openIndex, 1);
        }

        // Activate next or previous note if exists
        active = open[openIndex] || open[openIndex - 1] || null;

      // NOT deleting (rename title)
      } else {
        // Title cannot be empty if NOT deleting (text is NOT empty)
        if (note.title === "") {
          note.title = notes[noteIndex].title; // previous title
        }

        // Replace note with new note
        notes[noteIndex] = note;
      }

      return {
        notes,
        open,
        active,
        fresh: null,
      };
    }

    case "REORDER_NOTE": {
      const { oldIndex, newIndex } = action;

      const notes = [...state.notes];
      const open = [...state.open];

      const aNote = { ...notes[oldIndex] };
      const aOpen = open[oldIndex];

      notes.splice(oldIndex, 1); // remove note
      notes.splice(newIndex, 0, aNote); // insert note

      open.splice(oldIndex, 1); // remove open
      open.splice(newIndex, 0, aOpen); // insert open

      return {
        ...state,
        notes,
        open,
      };
    }

    default:
      return state;
  }
};

const store = createStore(notesReducer);
export default store;
