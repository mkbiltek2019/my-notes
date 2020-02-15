/* global chrome */

import { state, setCurrentNote } from "./state.js";

/*
Commands defined by manifest.json:

page-1   Open page 1
page-2   Open page 2
page-3   Open page 3
focus    Toggle Focus mode
*/

const register = () => chrome.commands.onCommand.addListener(command => {
  if (command.startsWith("page-")) {
    const pageNumber = command.split("page-")[1];
    const index = parseInt(pageNumber, 10) - 1;

    console.log(state.currentNotes);
    return;
    setCurrentNote(state.currentNotes, index, true);
    return;
  }

  if (command === "focus") {
    chrome.storage.local.get(["focus"], local => {
      chrome.storage.local.set({ focus: !local.focus });
    });
    return;
  }
});


export default { register };
