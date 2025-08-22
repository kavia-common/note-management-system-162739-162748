import React from 'react';

// PUBLIC_INTERFACE
export default function EmptyState({ onCreate }) {
  /** Shown when there are no notes */
  return (
    <div className="empty-state">
      <h2>No notes yet</h2>
      <p>Create your first note to get started.</p>
      <button className="btn btn-accent" onClick={onCreate}>Create a Note</button>
    </div>
  );
}
