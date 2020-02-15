import { panel, notes, textarea } from "./elements.js";

const hide = (elem) => elem.classList.add("hide");
const show = (elem) => elem.classList.remove("hide");

export default function setPage(pageName) {
  hide(panel);
  hide(notes);
  hide(textarea);

  if (pageName === "notes") {
    show(notes);
  }

  if (pageName === "textarea") {
    show(panel);
    show(textarea);
  }
}
