import openSiblings from "./open-siblings.js";

// Return index of open note to the right, or left
export default function nextToActivate(notes, index) {
  const { leftOpenIndex, rightOpenIndex } = openSiblings(notes, index);
  return rightOpenIndex !== -1 ? rightOpenIndex : leftOpenIndex;
}
