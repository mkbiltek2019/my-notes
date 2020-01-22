import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

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
    const newTitle = ref.current.innerText.trim();
    if (newTitle === title) {
      ref.current.innerText = title;
      return;
    }

    editNote(id, { title: newTitle });

    // Reference still exists (newTitle is not saved)
    // Title cannot be "" if text is not "" (deleting)
    if (ref.current) {
      ref.current.innerText = title; // change title back
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

  return (
    <div {...options}>{title}</div>
  );
};

Tab.propTypes = {
  note: PropTypes.object,
  isActive: PropTypes.func,
  isFresh: PropTypes.func,
  activate: PropTypes.func,
  editNote: PropTypes.func,
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
