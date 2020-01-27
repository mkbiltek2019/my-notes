import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Tab = ({
  id, name, isActive, setActive,
}) => (
  <div
    className={`tab${isActive(id) ? " active" : ""}`}
    onClick={() => setActive(id)}
  >{name}</div>
);

Tab.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  isActive: PropTypes.func,
  setActive: PropTypes.func,
};

const mapStateToProps = (state) => ({
  isActive: (id) => state.active === id,
});

const mapDispatchToProps = (dispatch) => ({
  setActive: (id) => dispatch({ type: "SET_ACTIVE_NOTES", id }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Tab);
