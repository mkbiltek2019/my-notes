import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import selectors from "./store/selectors";

const exportNotes = (notesToExport, format) => {
  import(/* webpackChunkName: "export" */"./export/export-notes").then(
    (module) => module.default(notesToExport, format),
  );
};

const Manage = ({
  allNotes, openNotes, closedNotes, openNote, closeNote, deleteNote,
}) => {
  const [idToDelete, confirmDelete] = useState(null);

  const renderNotes = (notes, type) => notes.map((note) => (
    <div className="row" key={`row-${note.id}`}>
      {idToDelete !== note.id && (
        <>
          <div className="row-title"><span>{note.title}</span></div>
          <div className="row-actions">
              {type === "open" && <span className="good-action" onClick={() => closeNote(note.id)}>Close</span>}
              {type === "closed" && <span className="good-action" onClick={() => openNote(note.id)}>Open</span>}
              <span className="bad-action" onClick={() => confirmDelete(note.id)}>Delete</span>
          </div>
        </>
      )}
      {idToDelete === note.id && (
        <>
          <div className="row-title">
            <span className="confirmation">Are you sure you want to delete <span>{note.title}?</span></span>
          </div>
          <div className="row-actions">
            <span className="bad-action" onClick={() => deleteNote(note.id)}>Yes</span><span>/</span>
            <span className="good-action" onClick={() => confirmDelete(null)}>No</span>
          </div>
        </>
      )}
    </div>
  ));

  const haveNotes = allNotes.length > 0;
  const canExportOpen = openNotes.length > 0 && openNotes.length !== allNotes.length;
  const canExportClosed = closedNotes.length > 0 && closedNotes.length !== allNotes.length;

  return (
    <div id="manage">
      <h1>Notes</h1>
      {!haveNotes && <div>There are no notes.</div>}
      {haveNotes && (
        <div id="manage-notes">
          {renderNotes(openNotes, "open")}
          {openNotes.length > 0 && closedNotes.length > 0 && <hr />}
          {renderNotes(closedNotes, "closed")}
        </div>
      )}

      <br /><br />
      <h2>Export</h2>
      {!haveNotes && <div>There are no notes to export.</div>}
      {haveNotes && (
        <div id="export">
          <div>
            {canExportOpen && <div className="row"><strong>Open: ({openNotes.length})</strong></div>}
            {canExportClosed && <div className="row"><strong>Closed: ({closedNotes.length})</strong></div>}
            {(canExportOpen || canExportClosed) && <br />}
            <div className="row"><strong>All: ({allNotes.length})</strong></div>
          </div>
          <div>
            {canExportOpen && (
              <div className="row">
                <span className="good-action" onClick={() => exportNotes(openNotes, "txt")}>TXT</span><span>,&nbsp;</span>
                <span className="good-action" onClick={() => exportNotes(openNotes, "md")}>MD</span>
              </div>
            )}
            {canExportClosed && (
              <div className="row">
                <span className="good-action" onClick={() => exportNotes(closedNotes, "txt")}>TXT</span><span>,&nbsp;</span>
                <span className="good-action" onClick={() => exportNotes(closedNotes, "md")}>MD</span>
              </div>
            )}
            {(canExportOpen || canExportClosed) && <br />}
            <div className="row">
              <span className="good-action" onClick={() => exportNotes(allNotes, "txt")}>TXT</span><span>,&nbsp;</span>
              <span className="good-action" onClick={() => exportNotes(allNotes, "md")}>MD</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

Manage.propTypes = {
  allNotes: PropTypes.array,
  openNotes: PropTypes.array,
  closedNotes: PropTypes.array,
  openNote: PropTypes.func,
  closeNote: PropTypes.func,
  deleteNote: PropTypes.func,
};

const mapStateToProps = (state) => ({
  allNotes: state.notes,
  openNotes: selectors.openNotes(state),
  closedNotes: selectors.closedNotes(state),
});

const mapDispatchToProps = (dispatch) => ({
  openNote: (id) => dispatch({ type: "OPEN_NOTE", id }),
  closeNote: (id) => dispatch({ type: "CLOSE_NOTE", id }),
  deleteNote: (id) => dispatch({ type: "REMOVE_NOTE", id }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Manage);
