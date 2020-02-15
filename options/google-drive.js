/* global chrome */

export const requestGoogleDriveAccess = (callback) => {
  // Request "identity" permission
  //
  // "identity" is an optional permission defined in manifest.json
  // "identity" permission is needed to get access token
  chrome.permissions.request({ permissions: ["identity"] }, granted => {
    if (!granted) {
      callback(false);
      return;
    }

    // Try to get access token (displays consent screen)
    chrome.identity.getAuthToken({ interactive: true }, token => {
      if (!token) {
        callback(false);
        return;
      }


      // My Notes is granted both "identity" permission
      // and access to Google Drive
      callback(true);
    });
  });
};

export const removeGoogleDriveAccess = (callback) => {
  // Remove "identity" permission
  chrome.permissions.remove({ permissions: ["identity"] }, removed => {
    if (removed) {
      callback();
    }
  });
};
