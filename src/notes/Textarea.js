import React from "react";
import { connect } from "react-redux";

const e = React.createElement;

const Textarea = ({ notesLength, activeNote, editNote }) => {
  const { id, text } = activeNote || {}; // fallback in case no note is active

  const placeholder = () => {
    if (notesLength === 0) {
      return "Create a note first. Use the + button.";
    }

    if (!id) {
      return ""
        + "Create or open a note first.\r\n"
        + "Use the + button to create a note.\r\n"
        + `Use the gear button to open a note. (you have ${notesLength} notes)`;
    }

    return "Type your notes here.";
  };

  return e("textarea", {
    id: "textarea",
    placeholder: placeholder(),
    value: text || "",
    onChange: (event) => {
      if (id) {
        editNote(id, { text: event.target.value });
      }
    },
  });
};

const mapStateToProps = (state) => ({
  notesLength: state.notes.length,
  activeNote: state.notes.find((note) => note.id === state.active),
});

const mapDispatchToProps = (dispatch) => ({
  editNote: (id, attrs) => dispatch({ type: "EDIT_NOTE", id, ...attrs }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Textarea);
