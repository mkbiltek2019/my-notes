/*
 * Returns left and right sibling indexes
 * Used when open note is closed or deleted,
 * to activate the sibling.
 */
export default function openSiblings(notes, index) {
  let leftOpenIndex = -1;
  let rightOpenIndex = -1;

  for (let i = 0; i < notes.length; i += 1) {
    if (!notes[i].open) {
      continue;
    }

    if (i < index) { leftOpenIndex = i; }
    if (i > index && rightOpenIndex === -1) { rightOpenIndex = i; }
  }

  return { leftOpenIndex, rightOpenIndex };
}
