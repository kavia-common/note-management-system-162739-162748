import { useCallback, useEffect, useMemo, useState } from 'react';
import { createNote, deleteNote, listNotes, updateNote } from '../api/notesApi';

// PUBLIC_INTERFACE
export default function useNotes() {
  /**
   * Provides notes state and CRUD operations with loading and error handling.
   */
  const [notes, setNotes] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  const selected = useMemo(
    () => notes.find((n) => n.id === selectedId) || null,
    [notes, selectedId]
  );

  const refresh = useCallback(async (query = search) => {
    setLoading(true);
    setError(null);
    try {
      const data = await listNotes(query);
      setNotes(Array.isArray(data) ? data : []);
      if (data?.length && !selectedId) {
        setSelectedId(data[0].id);
      } else if (selectedId && !data.find((n) => n.id === selectedId)) {
        setSelectedId(data[0]?.id ?? null);
      }
    } catch (e) {
      setError(e.message || 'Failed to load notes');
    } finally {
      setLoading(false);
    }
  }, [search, selectedId]);

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const create = useCallback(async ({ title, content }) => {
    setSaving(true);
    setError(null);
    try {
      const created = await createNote({ title, content });
      setNotes((prev) => [created, ...prev]);
      setSelectedId(created.id);
      return created;
    } catch (e) {
      setError(e.message || 'Failed to create note');
      throw e;
    } finally {
      setSaving(false);
    }
  }, []);

  const update = useCallback(async (id, { title, content }) => {
    setSaving(true);
    setError(null);
    try {
      const updated = await updateNote(id, { title, content });
      setNotes((prev) => prev.map((n) => (n.id === id ? updated : n)));
      return updated;
    } catch (e) {
      setError(e.message || 'Failed to update note');
      throw e;
    } finally {
      setSaving(false);
    }
  }, []);

  const remove = useCallback(async (id) => {
    setSaving(true);
    setError(null);
    try {
      await deleteNote(id);
      setNotes((prev) => prev.filter((n) => n.id !== id));
      if (selectedId === id) {
        setSelectedId((prev) => {
          const remaining = notes.filter((n) => n.id !== id);
          return remaining[0]?.id ?? null;
        });
      }
    } catch (e) {
      setError(e.message || 'Failed to delete note');
      throw e;
    } finally {
      setSaving(false);
    }
  }, [notes, selectedId]);

  return {
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
  };
}
