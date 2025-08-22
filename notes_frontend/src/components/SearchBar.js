import React from 'react';

// PUBLIC_INTERFACE
export default function SearchBar({ value, onChange, placeholder = 'Search notes...' }) {
  /** Controlled search input used to filter notes */
  return (
    <div className="searchbar">
      <span className="searchbar__icon" aria-hidden>🔎</span>
      <input
        className="searchbar__input"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search notes"
      />
    </div>
  );
}
