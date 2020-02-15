import { panel } from "./elements.js";

export default function setFocus(focus) {
  panel.classList.toggle("hide", focus);
}
