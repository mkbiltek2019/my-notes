/* global Promise, chrome */

import call from "./call.js";

// Needed when My Notes is reinstalled and looking for My Notes folder in Google Drive
export function getFile(q) {
  return new Promise(resolve => {
    chrome.identity.getAuthToken({ interactive: true }, token => {
      const url = `https://www.googleapis.com/drive/v3/files?q=${q}`;
      const options = {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
      };
      call(url, options).then(json => resolve(json));
    });
  });
}

// Needed to create My Notes folder or any file of a backup
export function createFile(body) {
  return new Promise(resolve => {
    chrome.identity.getAuthToken({ interactive: true }, (token) => {
      const url = "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart";
      const options = {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json",
          "Content-Type": "multipart/related; boundary=my-notes",
        },
        body: body,
      };
      call(url, options).then(json => resolve(json));
    });
  });
}
