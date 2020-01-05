import React from "react";
import { connect } from "react-redux";

const e = React.createElement;

const Textarea = ({ note, editNote }) => {
  const { id, text } = note || {}; // fallback in case all notes have been deleted

  return e("textarea", {
    id: "textarea",
    placeholder: "Type your notes here.",
    value: text || "",
    onChange: (event) => {
      if (id) {
        editNote(id, { text: event.target.value });
      }
    },
  });
};

const mapStateToProps = (state) => ({
  note: state.notes.find((note) => note.id === state.active),
});

const mapDispatchToProps = (dispatch) => ({
  editNote: (id, attrs) => dispatch({ type: "EDIT_NOTE", id, ...attrs }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Textarea);
