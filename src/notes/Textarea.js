import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import selectors from "./store/selectors";

const Textarea = ({ notesLength, activeNote, editNote }) => {
  const { id, text } = activeNote || {}; // fallback in case no note is active

  const placeholder = () => {
    if (notesLength === 0) {
      return "Create a note first. Use the + button.";
    }

    if (!id) {
      return ""
        + "Create or open a note first.\r\n\r\n"
        + "Use the + button to create a note.\r\n"
        + "Use the gear button to open a note.\r\n\r\n"
        + `You have ${notesLength} note${notesLength > 1 ? "s" : ""}.`;
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
  activeNote: selectors.activeNote(state),
});

const mapDispatchToProps = (dispatch) => ({
  editNote: (id, attrs) => dispatch({ type: "EDIT_NOTE", id, ...attrs }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Textarea);
