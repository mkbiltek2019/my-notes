/* global document */

import { noteName, textarea } from "./elements.js";
import setPage from "./set-page.js";

export default function setActive(name, text) {
  document.title = name;
  noteName.innerText = name;
  textarea.value = text;

  setPage("textarea");
}
