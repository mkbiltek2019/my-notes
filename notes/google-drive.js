/* global console */

import { getValue, setValue } from "./google-drive/storage.js";
import { getFile, createFile } from "./google-drive/file.js";
import { createFolderBody } from "./google-drive/bodies.js";

// Returns My Notes folder ID; if folder doesn't exist, it is created
async function getMyNotesFolderId() {
  let json;
  let folderId;

  /*
   * A) Try to get cached ID (Chrome Storage Local)
   */
  folderId = await getValue("folderId");
  if (folderId) {
    // return folderId;
  }

  /*
   * B) Try to get ID of already existing folder in Google Drive
   *
   * JSON example:
   * {
   *   kind: "drive#fileList",
   *   incompleteSearch: false,
   *   files: [
   *     {
   *       kind: "drive#file",
   *       id: "1KMlS94GWy705tjljszXs8xXpIMk597mD",
   *       name: "My Notes",
   *       mimeType: "application/vnd.google-apps.folder"
   *     }
   *   ]
   * }
   */
  const q = "name='My Notes' and mimeType='application/vnd.google-apps.folder' and trashed=false";
  json = await getFile(q);
  folderId = json && json.files && json.files.length && json.files[0].id;
  if (folderId) {
    await setValue("folderId", folderId);
    return folderId;
  }

  /*
   * C) Create fresh folder and get its ID
   *
   * JSON example:
   * {
   *   kind: "drive#file",
   *   id: "1KMlS94GWy705tjljszXs8xXpIMk597mD",
   *   name: "My Notes",
   *   mimeType: "application/vnd.google-apps.folder"
   * }
   */
  json = await createFile(createFolderBody("My Notes"));
  folderId = json && json.id;
  if (folderId) {
    await setValue("folderId", folderId);
    return folderId;
  }
}

async function backup() {
  const folderId = await getMyNotesFolderId();
  chrome.storage.local.get("notes", local => {
    for (const note of local.notes) {
      console.log(note);
    }
  });
}

export { backup };
