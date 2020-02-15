/* global localStorage */

import { state } from "./state.js";
import { saveNotesDebounce } from "./saving.js";

const TAB = "  "; // 2 whitespaces

// Tab key is used to insert 2 whitespaces at the current cursor position
export function isTab(event) {
  return event.keyCode === 9 || event.which === 9 || event.key === "Tab";
}

// Shift key is used in combination with Tab key
// Shift + Tab is used to remove 2 whitespaces before the current cursor position
export function isShift(event) {
  return event.shiftKey;
}

let typing = false;

const keydown = (textarea) => textarea.addEventListener("keydown", (event) => {
  typing = true;
  if (isTab(event)) {
    event.preventDefault();
  }
});

const keyup = (textarea) => textarea.addEventListener("keyup", (event) => {
  // If Tab is pressed in browser's address bar to focus My Notes
  // it will not trigger "keydown" event and so typing will be false.
  //
  // This way, My Notes can be focused from address bar without
  // actually inserting 2 whitespaces which Tab usually inserts.
  if (!typing) { return; }

  typing = false;

  // A) Pressed Tab
  // Insert 2 whitespaces at the current cursor position
  //
  // B) Pressed Shift + Tab
  // Reove 2 whitespaces before the current cursor position
  if (isTab(event)) {
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    // If text is selected, stop
    if (start !== end) {
      return;
    }

    let before = textarea.value.substring(0, start);
    let after = textarea.value.substring(start);
    let movement = isShift(event) ? (TAB.length * -1) : TAB.length;
    let change = false;

    if (movement > 0) { // only TAB
      before = before + TAB;
      change = true;
    } else { // SHIFT + TAB
      for (let i = 1; i <= Math.abs(movement); i++) {
        if (before.endsWith(" ")) {
          before = before.substring(0, before.length - 1);
          change = true;
        } else {
          movement = (i - 1) * -1;
          break;
        }
      }
    }

    // This can happen in case of Shift + Tab
    // when there is a text before the cursor,
    // therefore there is no whitespace to remove,
    // and so text remained unchanged.
    //
    // It is an optimization to not save notes,
    // if unchanged.
    if (!change) {
      return;
    }

    // Update text and current cursor position,
    // because whitespace was either put or removed.
    textarea.value = before + after;
    textarea.selectionStart = start + movement;
    textarea.selectionEnd = end + movement;
  }

  // Do not save text if unchanged (Ctrl, Alt, Shift, Arrow keys)
  if (state.currentNotes[state.currentIndex].text === textarea.value) {
    return;
  }

  // Store most recent "notesToSave" to localStorage.
  // "notesToSave" can be set/updated by different My Notes tabs.
  // In other words, different My Notes tabs can edit different pages.
  // "notesToSave" is then used to save all the changes across all pages/tabs.
  let notesToSave = JSON.parse(localStorage.getItem("notesToSave")) || [];
  notesToSave[state.currentIndex] = { text: textarea.value };
  localStorage.setItem("notesToSave", JSON.stringify(notesToSave));

  // Save "notes" (as a merge of "currentNotes" and "notesToSave")
  // to "chrome.storage.local".
  saveNotesDebounce(state.currentNotes);
});

const initialize = (textarea) => {
  keydown(textarea);
  keyup(textarea);
};

export default { initialize };
