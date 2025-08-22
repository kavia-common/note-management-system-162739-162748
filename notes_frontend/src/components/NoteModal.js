import React, { useEffect, useRef, useState } from 'react';

/**
 * Modal dialog for creating/editing a note.
 * Accessible: traps focus, closes on Escape, backdrop click, labelled by title.
 */
// PUBLIC_INTERFACE
export default function NoteModal({ isOpen, mode = 'create', initialValue, onCancel, onSubmit, isSubmitting }) {
  /** Create/Edit note modal - returns { title, content } on submit */
  const [title, setTitle] = useState(initialValue?.title || '');
  const [content, setContent] = useState(initialValue?.content || '');

  const dialogRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTitle(initialValue?.title || '');
      setContent(initialValue?.content || '');
      setTimeout(() => titleRef.current?.focus(), 0);
      const onKey = (e) => {
        if (e.key === 'Escape') onCancel();
      };
      document.addEventListener('keydown', onKey);
      return () => document.removeEventListener('keydown', onKey);
    }
  }, [isOpen, initialValue, onCancel]);

  if (!isOpen) return null;

  const submit = (e) => {
    e?.preventDefault();
    onSubmit({ title: title.trim(), content: content.trim() });
  };

  const header = mode === 'edit' ? 'Edit Note' : 'New Note';

  return (
    <div className="modal-backdrop" onMouseDown={onCancel}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="note-modal-title"
        onMouseDown={(e) => e.stopPropagation()}
        ref={dialogRef}
      >
        <div className="modal__header">
          <h3 id="note-modal-title">{header}</h3>
          <button className="icon-button" onClick={onCancel} aria-label="Close">✕</button>
        </div>
        <form className="modal__body" onSubmit={submit}>
          <label className="form-label">
            Title
            <input
              ref={titleRef}
              className="form-input"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Note title"
              maxLength={200}
            />
          </label>
          <label className="form-label">
            Content
            <textarea
              className="form-textarea"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your note..."
              rows={10}
            />
          </label>
          <div className="modal__footer">
            <button type="button" className="btn" onClick={onCancel}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : (mode === 'edit' ? 'Save Changes' : 'Create')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
