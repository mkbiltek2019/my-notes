import { saveAs } from "file-saver";
import JSZip from "jszip";

const types = {
  txt: "text/plain",
  md: "text/markdown",
};

export const getBlob = (text, format) => new Blob([text], { type: types[format] });
export const getFilename = (title, format) => {
  const escapedTitle = title.replace(/[/\\:*?"<>]/g, "").trim().replace(/  +/g, " ");
  const filename = `${escapedTitle}.${format}`;
  return filename;
};

const prepareNote = (note, format) => {
  const { title, text } = note;
  const blob = getBlob(text, format);
  const filename = getFilename(title, format);
  return { blob, filename };
};

const exportNotes = (notes, format) => {
  if (notes.length === 0) { return; }
  if (notes.length === 1) {
    const { blob, filename } = prepareNote(notes[0], format);
    saveAs(blob, filename);
    return;
  }

  const zip = new JSZip();
  notes.forEach((note) => {
    const { blob, filename } = prepareNote(note, format);
    zip.file(filename, blob);
  });
  zip.generateAsync({ type: "blob" }).then((content) => {
    saveAs(content, "notes.zip");
  });
};

export default exportNotes;
