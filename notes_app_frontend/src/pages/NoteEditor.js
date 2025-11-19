import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useNotes } from "../hooks/useNotes";

/**
 * PUBLIC_INTERFACE
 * Page for creating a new note or editing an existing note.
 */
export default function NoteEditor() {
  const { id } = useParams();
  const isNew = id === "new";
  const { notes, createNote, updateNote, deleteNote } = useNotes();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // For editing, load the current note
  useEffect(() => {
    if (!isNew) {
      const note = notes.find((n) => n.id === id);
      if (note) {
        setTitle(note.title || "");
        setContent(note.content || "");
      }
    } else {
      setTitle("");
      setContent("");
    }
  }, [id, notes, isNew]);

  // PUBLIC_INTERFACE
  const handleSave = (e) => {
    e.preventDefault();
    if (isNew) {
      const n = createNote({ title, content });
      navigate(`/notes/${n.id}`);
    } else {
      updateNote(id, { title, content });
      navigate(`/notes/${id}`);
    }
  };

  // PUBLIC_INTERFACE
  const handleDelete = () => {
    if (!isNew) {
      deleteNote(id);
    }
    navigate("/notes");
  };

  return (
    <form className="note-editor" onSubmit={handleSave}>
      <div className="note-editor-header">
        <button
          type="button"
          className="note-editor-back-btn"
          onClick={() => navigate("/notes")}
          title="Back to list"
        >
          ← Back
        </button>
        {!isNew && (
          <button
            type="button"
            className="note-editor-delete-btn"
            onClick={handleDelete}
            title="Delete note"
          >
            Delete
          </button>
        )}
        <button type="submit" className="note-editor-save-btn" title="Save">
          Save
        </button>
      </div>
      <input
        type="text"
        className="note-editor-title"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        autoFocus
      />
      <textarea
        className="note-editor-content"
        placeholder="Write your note here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={15}
      />
    </form>
  );
}
