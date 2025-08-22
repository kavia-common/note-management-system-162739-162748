import React from 'react';

// PUBLIC_INTERFACE
export default function NoteList({ notes, selectedId, onSelect }) {
  /** Renders a vertical list of notes; highlights selected. */
  return (
    <ul className="note-list" role="listbox" aria-label="Notes list">
      {notes.map((n) => (
        <li
          key={n.id}
          className={`note-list__item ${selectedId === n.id ? 'is-active' : ''}`}
          onClick={() => onSelect(n.id)}
          role="option"
          aria-selected={selectedId === n.id}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') onSelect(n.id);
          }}
        >
          <div className="note-list__title">{n.title || 'Untitled'}</div>
          <div className="note-list__preview">{(n.content || '').slice(0, 80)}</div>
        </li>
      ))}
      {notes.length === 0 && (
        <li className="note-list__empty">No notes found.</li>
      )}
    </ul>
  );
}
