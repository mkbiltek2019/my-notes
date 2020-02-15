export const createFolderBody = (folderName) => `
--my-notes
Content-Type: application/json; charset=UTF-8

{
  "name": "${folderName}",
  "mimeType": "application/vnd.google-apps.folder"
}

--my-notes--`;

export const createFileBody = (parent, id, name, content) => `
--my-notes
Content-Type: application/json; charset=UTF-8

{
  parents: ["${parent}"],
  id: "${id}",
  "name": "${name}"
}

--my-notes
Content-Type: text/plain

${content}

--my-notes--`;
