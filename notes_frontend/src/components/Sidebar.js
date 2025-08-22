import React from 'react';

/**
 * Sidebar component for navigation and actions.
 * Displays app title, create button, and search input (children).
 */
// PUBLIC_INTERFACE
export default function Sidebar({ onCreate }) {
  /** Sidebar with create button; use children to pass search. */
  return (
    <aside className="sidebar">
      <div className="sidebar__top">
        <h1 className="app-title">Notes</h1>
        <button className="btn btn-accent" onClick={onCreate} aria-label="Create new note">
          + New Note
        </button>
      </div>
      <div className="sidebar__content">
        {/* Consumers can inject search/filter controls here */}
      </div>
    </aside>
  );
}
