import React from "react";
import { connect } from "react-redux";

const e = React.createElement;

const Add = ({ addNote }) => {
  const onClick = () => {
    addNote();
  };

  return e("div", { id: "add", className: "tab action", onClick },
    e("img", { id: "plus", src: "plus.svg" }));
};

const mapDispatchToProps = (dispatch) => ({
  addNote: () => dispatch({ type: "ADD_NOTE" }),
});

export default connect(
  null,
  mapDispatchToProps,
)(Add);
