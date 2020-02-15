/* global chrome, window, document */

import state from "./notes/state/index.js";
import setPage from "./notes/view/set-page.js";
// import { saveNotes } from "./notes/saving.js";


// Typing a
// import typing from "./notes/typing.js";
// typing.initialize(textarea);

// Commands
// import commands from "./notes/commands.js";
// commands.register();

chrome.storage.local.get([
  "font",
  "size",
  "focus",
  "notes",
  "active",
  "notification",
  "mode",
], local => {
  const {
    font,
    size,
    focus,
    notes,
    active,
    notification,
    mode
  } = local;

  state.font = font;
  state.size = size;
  state.focus = focus;
  state.notes = notes;
  state.active = active;
  state.notification = notification;
  state.mode = mode;
});

import {
  noteName,
  button,
  actions,
  renameAction,
  deleteAction,
  textarea,
} from "./notes/view/elements.js";

noteName.addEventListener("click", () => {
  setPage("notes");
});

button.addEventListener("click", () => {
  actions.classList.toggle("hide");
});

renameAction.addEventListener("mouseenter", () => {
  noteName.classList.add("to-be-renamed");
});

renameAction.addEventListener("mouseleave", () => {
  noteName.classList.remove("to-be-renamed");
});

deleteAction.addEventListener("mouseenter", () => {
  noteName.classList.add("to-be-deleted");
  textarea.classList.add("to-be-deleted");
});

deleteAction.addEventListener("mouseleave", () => {
  noteName.classList.remove("to-be-deleted");
  textarea.classList.remove("to-be-deleted");
});

chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === "local") {
    if (changes["font"]) {
      state.font = changes["font"].newValue;
    }

    if (changes["size"]) {
      state.size = changes["size"].newValue;
    }

    if (changes["focus"]) {
      state.focus = changes["focus"].newValue;
    }

    if (changes["notes"]) {
      state.notes = changes["notes"].newValue;
    }

    if (changes["active"]) {
      state.active = changes["active"].newValue;
    }

    if (changes["mode"]) {
      state.mode = changes["mode"].newValue;
    }
  }

  if (areaName === "sync") {
    if (changes["selection"]) {
      const selection = changes["selection"].newValue;
      if (!selection) { return; }
      chrome.storage.local.get(["id"], local => {
        if (selection.sender === local.id) { return; }
        // TODO
        // const notes = [...state.currentNotes];
        // notes[0] = selection.text + notes[0];
        // chrome.storage.local.set({ notes: notes });
      });
    }
  }
});

// If the window is closed (before "saveNotesDebounce" is called),
// save the notes.
window.addEventListener("beforeunload", () => {
  // saveNotes() might be called multiple times (multiple My Notes tabs were closed).
  // Before "notes" are saved, "notesToSave" will be removed from localStorage,
  // to prevent saving the same notes multiple times.
  // saveNotes();
});

// import { backup } from "./notes/google-drive.js";
