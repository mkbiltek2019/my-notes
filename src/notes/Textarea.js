import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

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

  const onChange = (event) => {
    if (id) {
      editNote(id, { text: event.target.value });
    }
  };

  return (
    <textarea
      id="textarea"
      placeholder={placeholder()}
      value={text || ""}
      onChange={onChange}
    />
  );
};

Textarea.propTypes = {
  notesLength: PropTypes.number,
  activeNote: PropTypes.object,
  editNote: PropTypes.func,
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
