import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import './styles.css';
import Sidebar from './components/Sidebar';
import SearchBar from './components/SearchBar';
import NoteList from './components/NoteList';
import NoteDetails from './components/NoteDetails';
import NoteModal from './components/NoteModal';
import Header from './components/Header';
import EmptyState from './components/EmptyState';
import useNotes from './hooks/useNotes';

// PUBLIC_INTERFACE
function App() {
  /** Main Notes App with sidebar, list, details, and CRUD modals. */
  const {
    notes,
    selectedId,
    selected,
    setSelectedId,
    loading,
    saving,
    error,
    search,
    setSearch,
    refresh,
    create,
    update,
    remove,
  } = useNotes();

  const [theme, setTheme] = useState('light');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const hasNotes = notes.length > 0;

  const onCreateSubmit = async (data) => {
    await create(data);
    setIsCreateOpen(false);
  };

  const onEditSubmit = async (data) => {
    if (!selectedId) return;
    await update(selectedId, data);
    setIsEditOpen(false);
  };

  const onDelete = async () => {
    if (!selectedId) return;
    const ok = window.confirm('Delete this note?');
    if (!ok) return;
    await remove(selectedId);
  };

  const primaryAccent = useMemo(() => ({
    '--primary': '#1976d2',
    '--secondary': '#424242',
    '--accent': '#388e3c',
  }), []);

  return (
    <div className="app-root" style={primaryAccent}>
      <Header onNew={() => setIsCreateOpen(true)} onThemeToggle={() => setTheme((t) => t === 'light' ? 'dark' : 'light')} theme={theme} />
      <div className="layout">
        <div className="layout__sidebar">
          <Sidebar onCreate={() => setIsCreateOpen(true)}>
            {/* search injected below via adjacent container */}
          </Sidebar>
          <div className="sidebar-inset">
            <SearchBar value={search} onChange={setSearch} />
          </div>
        </div>
        <main className="layout__main">
          <div className="main__left">
            <div className="panel">
              <div className="panel__header">
                <h2 className="panel__title">All Notes</h2>
                <div className="panel__tools">
                  <button className="btn btn-outline btn-sm" onClick={() => refresh()}>Refresh</button>
                </div>
              </div>
              {loading ? (
                <div className="loading">Loading notes...</div>
              ) : (
                <NoteList notes={notes} selectedId={selectedId} onSelect={setSelectedId} />
              )}
              {error && <div className="error-banner" role="alert">{error}</div>}
            </div>
          </div>
          <div className="main__right">
            <div className="panel">
              <div className="panel__header">
                <h2 className="panel__title">Details</h2>
                <div className="panel__tools">
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => setIsEditOpen(true)}
                    disabled={!selected}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={onDelete}
                    disabled={!selected || saving}
                  >
                    Delete
                  </button>
                </div>
              </div>
              {!hasNotes ? (
                <EmptyState onCreate={() => setIsCreateOpen(true)} />
              ) : (
                <NoteDetails
                  note={selected}
                  onEdit={() => setIsEditOpen(true)}
                  onDelete={onDelete}
                />
              )}
            </div>
          </div>
        </main>
      </div>

      <NoteModal
        isOpen={isCreateOpen}
        mode="create"
        onCancel={() => setIsCreateOpen(false)}
        onSubmit={onCreateSubmit}
        isSubmitting={saving}
      />
      <NoteModal
        isOpen={isEditOpen}
        mode="edit"
        initialValue={selected || { title: '', content: '' }}
        onCancel={() => setIsEditOpen(false)}
        onSubmit={onEditSubmit}
        isSubmitting={saving}
      />
    </div>
  );
}

export default App;
