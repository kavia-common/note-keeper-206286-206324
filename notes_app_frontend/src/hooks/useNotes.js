import { useState, useEffect } from "react";

/**
 * PUBLIC_INTERFACE
 * Custom React hook to manage notes in localStorage.
 * Handles CRUD operations and keeps state in sync.
 */
export function useNotes(key = "notes-app-notes") {
  // notes: {id: string, title: string, content: string, updated: Date}
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem(key);
    if (stored) setNotes(JSON.parse(stored));
  }, [key]);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(notes));
  }, [key, notes]);

  // PUBLIC_INTERFACE
  const createNote = (note) => {
    const n = {
      ...note,
      id: Date.now().toString(),
      updated: new Date().toISOString(),
    };
    setNotes([n, ...notes]);
    return n;
  };

  // PUBLIC_INTERFACE
  const updateNote = (id, updates) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id ? { ...note, ...updates, updated: new Date().toISOString() } : note
      )
    );
  };

  // PUBLIC_INTERFACE
  const deleteNote = (id) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  return { notes, createNote, updateNote, deleteNote };
}
