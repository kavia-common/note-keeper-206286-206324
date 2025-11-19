import React from "react";
import { Link } from "react-router-dom";
import { useNotes } from "../hooks/useNotes";

/**
 * PUBLIC_INTERFACE
 * Lists all notes. Shows summaries and allows navigation to view/edit.
 */
export default function NotesList() {
  const { notes } = useNotes();

  return (
    <div className="notes-list-container">
      <div className="notes-list-header">
        <h1>My Notes</h1>
        <Link to="/notes/new" className="notes-list-create-btn">
          + New Note
        </Link>
      </div>
      <div className="notes-list">
        {notes.length === 0 ? (
          <div className="notes-list-empty">No notes. Click 'New Note' to create one.</div>
        ) : (
          notes.map((note) => (
            <Link className="notes-list-item" to={`/notes/${note.id}`} key={note.id}>
              <div className="notes-list-title">{note.title || <em>(Untitled)</em>}</div>
              <div className="notes-list-date">
                {new Date(note.updated).toLocaleString()}
              </div>
              <div className="notes-list-snippet">
                {note.content.slice(0, 80)}{note.content.length > 80 ? "..." : ""}
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
