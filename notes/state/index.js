/* global Proxy */

//import activateNote from "./activate-note.js"; // click
import renameNote from "./rename-note.js"; // double-click
//import deleteNote from "./delete-note.js"; // see context menu
import createNote from "./create-note.js";

import view from "../view/index.js";

const state = {
  createNote,
};

const activateNote = (noteName) => {
  state.active = noteName;
  view.setActive(noteName, state.notes[noteName]);
};

const handler = {
  set: function(obj, prop, value) {
    if (prop === "font") {
      view.setFont(value);
    }
    if (prop === "size") {
      view.setSize(value);
    }
    if (prop === "focus") {
      view.setFocus(value);
    }
    if (prop === "notes") {
      view.setNotes(value, { activateNote, renameNote });
    }
    if (prop === "active") {
      view.setActive(value, state.notes[value]);
    }
    if (prop === "notification") {
      view.showNotification(value);
    }
    if (prop === "mode") {
      view.setMode(value);
    }

    obj[prop] = value;
    return true;
  }
};

const stateProxy = new Proxy(state, handler);

export default stateProxy;
