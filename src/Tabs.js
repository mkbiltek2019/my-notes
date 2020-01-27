import React from "react";
import { connect } from "react-redux";
import Tab from "./Tab";

const Tabs = ({ notes }) => (
  <div id="tabs">
    <div className="tab">Menu</div>
    <div className="tab space-tab"></div>
    <Tab id="local" name="Local" />
    <Tab id="synced" name="Synced" />
  </div>
);

const mapStateToProps = (state) => ({
  notes: state[state.active],
});

export default connect(
  mapStateToProps,
)(Tabs);
