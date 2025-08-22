import React from 'react';

// PUBLIC_INTERFACE
export default function NoteDetails({ note, onEdit, onDelete }) {
  /** Shows note details with actions. */
  if (!note) {
    return (
      <div className="note-details note-details--empty">
        <h2>Select a note to view details</h2>
        <p>Choose a note from the list or create a new one.</p>
      </div>
    );
  }

  return (
    <div className="note-details">
      <div className="note-details__header">
        <h2 className="note-details__title">{note.title || 'Untitled'}</h2>
        <div className="note-details__actions">
          <button className="btn btn-primary" onClick={onEdit}>Edit</button>
          <button className="btn btn-danger" onClick={onDelete}>Delete</button>
        </div>
      </div>
      <div className="note-details__content">
        {(note.content || '').split('\n').map((line, idx) => (
          <p key={idx}>{line || '\u00A0'}</p>
        ))}
      </div>
    </div>
  );
}
