import setFont from "./set-font.js";
import setSize from "./set-size.js";
import setFocus from "./set-focus.js";

import setNotes from "./set-notes.js";
import setActive from "./set-active.js";

import showNotification from "./show-notification.js";
import setMode from "./set-mode.js";


export default {
  setFont,
  setSize,
  setFocus,

  setNotes,
  setActive,

  showNotification,

  // prefer to set as last when all other UI components are set
  setMode, // sets opacity to 1
};
