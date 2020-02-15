/* global chrome, Uint8Array, crypto */

const defaultNotes = {
  1: "",
  2: "",
  3: "",
};
const defaultActive = "1";

const defaultFont = {
  id: "courier-new",
  name: "Courier New",
  genericFamily: "monospace",
  fontFamily: "\"Courier New\",monospace",
};

const defaultSize = 150;
const defaultMode = "light"; // "light", "dark"
const defaultFocus = false;

const generateRandomId = () => {
  const randomPool = new Uint8Array(32);
  crypto.getRandomValues(randomPool);
  let hex = "";
  for (let i = 0; i < randomPool.length; i += 1) {
    hex += randomPool[i].toString(16);
  }
  return hex;
};

// Once My Notes is installed, a random ID is assigned.
// This ID is used by "Save selection to other devices"
// to send a note to other devices only, which is
// achieved by comparing the ID.
const setId = () => {
  const id = generateRandomId();
  chrome.storage.local.set({ id: id });
}

// Creates Context menu.
//
// Context menu is shown only when:
// - text is selected
// - right click
//
// Required permission: "contextMenus" (see manifest.json)
const createContextMenu = () => {
  chrome.contextMenus.create({
    id: "my-notes",
    title: "My Notes",
    contexts: ["selection"],
  }, () => {
    chrome.contextMenus.create({
      parentId: "my-notes",
      id: "my-notes-save",
      title: "Save selection",
      contexts: ["selection"],
    });
    chrome.contextMenus.create({
      parentId: "my-notes",
      id: "my-notes-send",
      title: "Save selection to other devices",
      contexts: ["selection"],
    });
  });
};

// Used when My Notes is installed or updated to initialize the data.
// If My Notes is installed for the first time, defaultValue is returned.
// If My Notes is updated, localValue is returned.
const safeValue = (localValue, defaultValue) => {
  if (typeof localValue === "undefined") { return defaultValue; }
  return localValue;
};

// Return key if exists, otherwise return first key
const safeActive = (notes, key) => {
  if (key in notes) {
    return key;
  }
  const keys = Object.keys(notes);
  return keys[0];
};

// Run when My Notes is installed or updated
chrome.runtime.onInstalled.addListener(() => {
  // Try to load notes from prior versions (order matters)
  chrome.storage.sync.get(["newtab", "value", "notes"], sync => {
    // 1.x
    // sync.value:string => 1.4, 1.3, 1.2
    // sync.newtab:string => 1.1.1, 1.1, 1.0
    //
    // 2.x
    // sync.notes:array => 2.0, 2.0.1, 2.0.2, 2.1
    // local.notes:array => >= 2.2 && < 3.0
    //
    // 3.x
    // local.notes:object => 3.x

    chrome.storage.local.get(["notes"], local => {
      // order matters
      let notes = sync.value || sync.newtab || sync.notes || local.notes || defaultNotes;

      // Migrate notes from 1.x to 2.x (string => array of strings)
      if (typeof notes === "string") {
        notes = [notes, "", ""];
      }

      // Migrate notes from 2.x to 3.x (array of strings => object)
      if (Array.isArray(notes) && typeof notes[0] === "string") {
        notes = {
          1: notes[0], // 1/3
          2: notes[1], // 2/2
          3: notes[2], // 3/3
        };
      }

      // Delete old keys
      chrome.storage.sync.remove(["newtab", "value", "notes"]);

      // Use values set by prior version, if not set, use default
      chrome.storage.local.get(["active", "font", "size", "mode", "focus"], local => {
        chrome.storage.local.set({
          notes: notes, // migrated to 3.x
          active: safeActive(notes, safeValue(local.active, defaultActive)),
          font: safeValue(local.font, defaultFont),
          size: safeValue(local.size, defaultSize),
          mode: safeValue(local.mode, defaultMode),
          focus: safeValue(local.focus, defaultFocus),
        });
      });
    });
  });

  setId(); // Sets unique My Notes ID
  createContextMenu(); // Create context menu
});

chrome.contextMenus.onClicked.addListener((/*info*/) => {
  // const { pageUrl, selectionText } = info;
  // const textToSave = `// ${pageUrl}\r\n${selectionText}\r\n\r\n`;

  // TODO
  /*
  if (info.menuItemId === "my-notes-save") {
    chrome.storage.local.get(["notes"], local => {
      const notes = local.notes;
      // notes[0] = textToSave + notes[0];
      // chrome.storage.local.set({ notes: notes });
    });
  }

  if (info.menuItemId === "my-notes-send") {
    chrome.storage.local.get(["id"], local => {
      const selection = {
        text: textToSave,
        sender: local.id,
      };
      chrome.storage.sync.set({ selection: selection });
    });
  }*/
});

// Open My Notes with 1 click on the icon located in browser's toolbar
chrome.browserAction.onClicked.addListener(() => {
  chrome.tabs.create({ url: "/notes.html" });
});

// Prepare a notification that a new version of My Notes has been installed
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === "update") {
    const notification = {
      type: "NEW_VERSION",
      version: chrome.runtime.getManifest().version,
    };
    chrome.storage.local.set({ notification: notification });
  }
});
