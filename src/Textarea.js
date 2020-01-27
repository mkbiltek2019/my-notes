import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Textarea = ({ notes, editNotes }) => (
  <textarea
    id="textarea"
    placeholder="Type your notes here."
    value={notes}
    onChange={(event) => editNotes(event.target.value)}
  />
);

Textarea.propTypes = {
  notes: PropTypes.string,
  editNotes: PropTypes.func,
};

const mapStateToProps = (state) => ({
  notes: state[state.active],
});

const mapDispatchToProps = (dispatch) => ({
  editNotes: (text) => dispatch({ type: "EDIT_NOTES", text }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Textarea);
