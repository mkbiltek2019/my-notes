import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Sortable from "sortablejs";
import Tab from "./Tab";

const Tabs = ({ notes, reorderNote }) => {
  useEffect(() => {
    const tabs = document.getElementById("tabs");
    Sortable.create(tabs, {
      delay: 50,
      animation: 150,
      direction: "horizontal",
      onEnd: (event) => {
        const { oldIndex, newIndex } = event;
        if (oldIndex !== newIndex) {
          reorderNote(oldIndex, newIndex);
        }
      },
    });
  }, []);

  return (
    <div id="tabs">
      {notes.map((note) => <Tab key={note.id} note={note} />)}
    </div>
  );
};

Tabs.propTypes = {
  notes: PropTypes.array,
  reorderNote: PropTypes.func,
};

const mapStateToProps = (state) => ({
  notes: state.open.map((id) => state.notes.find((note) => note.id === id)),
});

const mapDispatchToProps = (dispatch) => ({
  reorderNote: (oldIndex, newIndex) => dispatch({ type: "REORDER_NOTE", oldIndex, newIndex }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Tabs);
