import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Add = ({ addNote }) => (
  <div id="add" className="tab action" onClick={addNote}>
    <img id="plus" src="plus.svg" alt="+" />
  </div>
);

Add.propTypes = {
  addNote: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
  addNote: () => dispatch({ type: "ADD_NOTE" }),
});

export default connect(
  null,
  mapDispatchToProps,
)(Add);
