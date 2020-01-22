import notesReducer from "./notes-reducer";

const initialState = () => ({
  notes: [],
  open: [],
  active: null,
  fresh: null,
});

test("initial state", () => {
  const state = notesReducer(initialState(), {});
  expect(state).toEqual(initialState());
});

test("ADD_NOTE", () => {
  expect(notesReducer(initialState(), { type: "ADD_NOTE" })).toEqual({
    notes: [
      { id: 1, title: "New Note", text: "" },
    ],
    open: [1],
    active: 1,
    fresh: 1,
  });

  expect(notesReducer({
    notes: [
      { id: 2, title: "Cooking", text: "This is Cooking" },
      { id: 4, title: "Todos", text: "This is Todos" },
    ],
    open: [2],
    active: 2,
    fresh: null,
  }, { type: "ADD_NOTE" })).toEqual({
    notes: [
      { id: 2, title: "Cooking", text: "This is Cooking" },
      { id: 4, title: "Todos", text: "This is Todos" },
      { id: 5, title: "New Note", text: "" },
    ],
    open: [2, 5],
    active: 5,
    fresh: 5,
  });
});

test("OPEN_NOTE", () => {
  expect(notesReducer({
    notes: [
      { id: 2, title: "Cooking", text: "This is Cooking" },
      { id: 4, title: "Todos", text: "This is Todos" },
      { id: 5, title: "New Note", text: "" },
    ],
    open: [2, 5],
    active: 5,
    fresh: 5,
  }, { type: "OPEN_NOTE", id: 4 })).toEqual({
    notes: [
      { id: 2, title: "Cooking", text: "This is Cooking" },
      { id: 4, title: "Todos", text: "This is Todos" },
      { id: 5, title: "New Note", text: "" },
    ],
    open: [2, 5, 4],
    active: 4, // set as active
    fresh: null,
  });
});

test("CLOSE_NOTE", () => {
  expect(notesReducer({
    notes: [
      { id: 2, title: "Cooking", text: "This is Cooking" },
      { id: 4, title: "Todos", text: "This is Todos" },
      { id: 5, title: "New Note", text: "" },
    ],
    open: [2, 5, 4], // previous to 4 is 5
    active: 4,
    fresh: null,
  }, { type: "CLOSE_NOTE", id: 4 })).toEqual({
    notes: [
      { id: 2, title: "Cooking", text: "This is Cooking" },
      { id: 4, title: "Todos", text: "This is Todos" },
      { id: 5, title: "New Note", text: "" },
    ],
    open: [2, 5],
    active: 5,
    fresh: null,
  });

  expect(notesReducer({
    notes: [
      { id: 2, title: "Cooking", text: "This is Cooking" },
      { id: 4, title: "Todos", text: "This is Todos" },
      { id: 5, title: "New Note", text: "" },
    ],
    open: [2, 5, 4], // next to 2 is 5
    active: 2,
    fresh: null,
  }, { type: "CLOSE_NOTE", id: 2 })).toEqual({
    notes: [
      { id: 2, title: "Cooking", text: "This is Cooking" },
      { id: 4, title: "Todos", text: "This is Todos" },
      { id: 5, title: "New Note", text: "" },
    ],
    open: [5, 4],
    active: 5,
    fresh: null,
  });
});

test("ACTIVATE_NOTE", () => {
  expect(notesReducer({
    notes: [
      { id: 2, title: "Cooking", text: "This is Cooking" },
      { id: 4, title: "Todos", text: "This is Todos" },
      { id: 5, title: "New Note", text: "" },
    ],
    open: [2, 5],
    active: 5,
    fresh: 5,
  }, { type: "ACTIVATE_NOTE", id: 2 })).toEqual({
    notes: [
      { id: 2, title: "Cooking", text: "This is Cooking" },
      { id: 4, title: "Todos", text: "This is Todos" },
      { id: 5, title: "New Note", text: "" },
    ],
    open: [2, 5],
    active: 2,
    fresh: null,
  });
});

test("REMOVE_NOTE", () => {
  expect(notesReducer({
    notes: [
      { id: 2, title: "Cooking", text: "This is Cooking" },
      { id: 4, title: "Todos", text: "This is Todos" },
      { id: 5, title: "New Note", text: "" },
    ],
    open: [2, 5],
    active: 5,
    fresh: 5,
  }, { type: "REMOVE_NOTE", id: 5 })).toEqual({
    notes: [
      { id: 2, title: "Cooking", text: "This is Cooking" },
      { id: 4, title: "Todos", text: "This is Todos" },
    ],
    open: [2],
    active: 2,
    fresh: null,
  });
});

test("EDIT_NOTE", () => {
  expect(notesReducer({
    notes: [
      { id: 2, title: "Cooking", text: "This is Cooking" },
      { id: 4, title: "Todos", text: "This is Todos" },
      { id: 5, title: "New Note", text: "" },
    ],
    open: [2, 5],
    active: 5,
    fresh: null,
  }, { type: "EDIT_NOTE", id: 5, title: "" })).toEqual({
    notes: [
      { id: 2, title: "Cooking", text: "This is Cooking" },
      { id: 4, title: "Todos", text: "This is Todos" },
    ],
    open: [2],
    active: 2,
    fresh: null,
  });

  expect(notesReducer({
    notes: [
      { id: 2, title: "Cooking", text: "This is Cooking" },
      { id: 4, title: "Todos", text: "This is Todos" },
      { id: 5, title: "New Note", text: "" },
    ],
    open: [2, 5],
    active: 5,
    fresh: null,
  }, {
    type: "EDIT_NOTE", id: 5, title: "Shopping", text: "This is Shopping",
  })).toEqual({
    notes: [
      { id: 2, title: "Cooking", text: "This is Cooking" },
      { id: 4, title: "Todos", text: "This is Todos" },
      { id: 5, title: "Shopping", text: "This is Shopping" },
    ],
    open: [2, 5],
    active: 5,
    fresh: null,
  });

  expect(notesReducer({
    notes: [
      { id: 2, title: "Cooking", text: "This is Cooking" },
      { id: 4, title: "Todos", text: "This is Todos" },
      { id: 5, title: "Shopping", text: "This is Shopping" },
    ],
    open: [2, 5],
    active: 5,
    fresh: null,
  }, {
    type: "EDIT_NOTE", id: 5, title: "",
  })).toEqual({
    notes: [
      { id: 2, title: "Cooking", text: "This is Cooking" },
      { id: 4, title: "Todos", text: "This is Todos" },
      { id: 5, title: "Shopping", text: "This is Shopping" },
    ],
    open: [2, 5],
    active: 5,
    fresh: null,
  });
});

test("REORDER_NOTE", () => {
  expect(notesReducer({
    notes: [
      { id: 2, title: "Cooking", text: "This is Cooking" },
      { id: 4, title: "Todos", text: "This is Todos" },
      { id: 5, title: "New Note", text: "" },
    ],
    open: [2, 5],
    active: 5,
    fresh: null,
  }, { type: "REORDER_NOTE", oldIndex: 1, newIndex: 0 })).toEqual({
    notes: [
      { id: 2, title: "Cooking", text: "This is Cooking" },
      { id: 4, title: "Todos", text: "This is Todos" },
      { id: 5, title: "New Note", text: "" },
    ],
    open: [5, 2],
    active: 5,
    fresh: null,
  });
});
