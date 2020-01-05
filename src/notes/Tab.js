import React, { useEffect } from "react";
import { connect } from "react-redux";

const e = React.createElement;

const startRename = (ref) => {
  ref.current.setAttribute("contenteditable", "true");
  ref.current.focus();
  document.execCommand("selectAll", false, null);
};

const stopRename = (ref) => {
  ref.current.setAttribute("contenteditable", "false");
};

const Tab = ({
  note, isActive, isFresh, activate, editNote,
}) => {
  const ref = React.createRef();
  const { id, title } = note;

  useEffect(() => {
    if (isFresh(id)) {
      startRename(ref);
    }
  }, []);

  const onClick = () => !isActive(id) && activate(id);
  const onDoubleClick = () => startRename(ref);
  const onKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };
  const onKeyUp = (event) => {
    if (event.key === "Enter") {
      ref.current.blur();
    }
  };
  const onBlur = () => {
    stopRename(ref);
    if (title === ref.current.innerText) {
      return;
    }

    editNote(id, { title: ref.current.innerText });
    if (ref.current) {
      ref.current.innerText = title;
    }
  };

  const options = {
    ref,
    className: `tab${isActive(id) ? " active" : ""}`,
    onClick,
    onDoubleClick,
    onKeyPress,
    onKeyUp,
    onBlur,
  };

  return e("div", options, title);
};

const mapStateToProps = (state) => ({
  isActive: (id) => state.active === id,
  isFresh: (id) => state.fresh === id,
});

const mapDispatchToProps = (dispatch) => ({
  activate: (id) => dispatch({ type: "ACTIVATE_NOTE", id }),
  editNote: (id, attrs) => dispatch({ type: "EDIT_NOTE", id, ...attrs }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Tab);
