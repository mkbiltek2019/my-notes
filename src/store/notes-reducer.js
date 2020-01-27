const initialState = {
  local: "This are my local notes",
  synced: "This are my synced notes",
  active: "local",
};

const SET_ACTIVE_NOTES = (state, action) => ({
  ...state,
  active: action.id,
});

const EDIT_NOTES = (state, action) => ({
  ...state,
  [state.active]: action.text,
});

const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ACTIVE_NOTES": return SET_ACTIVE_NOTES(state, action);
    case "EDIT_NOTES": return EDIT_NOTES(state, action);

    default: return state;
  }
};

export default notesReducer;
