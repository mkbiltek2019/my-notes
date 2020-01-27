import notesReducer from "./notes-reducer";

test("initial state", () => {
  const state = {
    local: "This are my local notes",
    synced: "This are my synced notes",
    active: "local",
  };

  expect(notesReducer(state, {})).toEqual(state);
});

test("SET_ACTIVE_NOTES", () => {
  expect(notesReducer({
    local: "This are my local notes",
    synced: "This are my synced notes",
    active: "local",
  }, { type: "SET_ACTIVE_NOTES", id: "synced" })).toEqual({
    local: "This are my local notes",
    synced: "This are my synced notes",
    active: "synced",
  });

  expect(notesReducer({
    local: "This are my local notes",
    synced: "This are my synced notes",
    active: "synced",
  }, { type: "SET_ACTIVE_NOTES", id: "local" })).toEqual({
    local: "This are my local notes",
    synced: "This are my synced notes",
    active: "local",
  });
});

test("EDIT_NOTES", () => {
  expect(notesReducer({
    local: "This are my local notes",
    synced: "This are my synced notes",
    active: "local",
  }, { type: "EDIT_NOTES", text: "Editing my active notes" })).toEqual({
    local: "Editing my active notes",
    synced: "This are my synced notes",
    active: "local",
  });

  expect(notesReducer({
    local: "This are my local notes",
    synced: "This are my synced notes",
    active: "synced",
  }, { type: "EDIT_NOTES", text: "Editing my active notes" })).toEqual({
    local: "This are my local notes",
    synced: "Editing my active notes",
    active: "synced",
  });
});
