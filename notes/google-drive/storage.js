/* global Promise, chrome */

export const getValue = (key) => {
  return new Promise(resolve => {
    chrome.storage.local.get(["backup"], local => {
      const value = local.backup && local.backup[key];
      resolve(value);
    });
  });
}

export const setValue = (key, value) => {
  return new Promise(resolve => {
    chrome.storage.local.get(["backup"], local => {
      const backup = local.backup || {};
      backup[key] = value;

      chrome.storage.local.set({ backup }, () => {
        resolve(value);
      });
    });
  });
}
