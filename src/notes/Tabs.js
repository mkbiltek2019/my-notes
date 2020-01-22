import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Sortable from "sortablejs";
import Tab from "./Tab";
import selectors from "./store/selectors";

const Tabs = ({ openNotes, reorderNote }) => {
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
      {openNotes.map((note) => <Tab key={note.id} note={note} />)}
    </div>
  );
};

Tabs.propTypes = {
  openNotes: PropTypes.array,
  reorderNote: PropTypes.func,
};

const mapStateToProps = (state) => ({
  openNotes: selectors.openNotes(state),
});

const mapDispatchToProps = (dispatch) => ({
  reorderNote: (oldIndex, newIndex) => dispatch({ type: "REORDER_NOTE", oldIndex, newIndex }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Tabs);
