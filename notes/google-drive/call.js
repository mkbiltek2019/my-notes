/* global fetch */

// Makes call to Google Drive API and returns a json promise
export default function call(url, options) {
  return fetch(url, options).then((response) => {
    if (!response.ok) {
      return false;
    }

    return response.json();
  });
}
