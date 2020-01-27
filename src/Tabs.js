import React from "react";
import { connect } from "react-redux";
import NotesTab from "./tabs/NotesTab";
import SpaceTab from "./tabs/SpaceTab";

const Tabs = () => (
  <div id="tabs">
    <div id="menu">
      <div className="tab">Options</div>
      <div className="tab">Focus</div>
      <div className="tab">Help</div>
    </div>
    <div>
      <div className="tab">Menu</div>
      <SpaceTab />
      <NotesTab id="local" name="Local" />
      <NotesTab id="synced" name="Synced" />
    </div>
  </div>
);

const mapStateToProps = (state) => ({
  notes: state[state.active],
});

export default connect(
  mapStateToProps,
)(Tabs);
