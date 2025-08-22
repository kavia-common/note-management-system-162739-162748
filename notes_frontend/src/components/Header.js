import React from 'react';

// PUBLIC_INTERFACE
export default function Header({ onNew, onThemeToggle, theme }) {
  /** Top header with global actions */
  return (
    <header className="header">
      <div className="header__left">
        <button className="btn btn-accent btn-sm" onClick={onNew}>+ New</button>
      </div>
      <div className="header__right">
        <button className="btn btn-outline btn-sm" onClick={onThemeToggle} aria-label="Toggle theme">
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
      </div>
    </header>
  );
}
