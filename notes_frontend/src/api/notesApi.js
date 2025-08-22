//
// Notes API utility for CRUD operations against a REST backend.
// Uses fetch and an environment-based base URL (REACT_APP_API_BASE_URL).
//

const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:4000';

async function handleResponse(res) {
  if (!res.ok) {
    let message = `Request failed with status ${res.status}`;
    try {
      const data = await res.json();
      if (data?.message) message = data.message;
    } catch (e) {
      // ignore JSON parse error
    }
    const error = new Error(message);
    error.status = res.status;
    throw error;
  }
  // No content
  if (res.status === 204) return null;
  const contentType = res.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    return res.json();
  }
  return res.text();
}

// PUBLIC_INTERFACE
export async function listNotes(search = '') {
  /** List notes with optional search filter. Returns array of notes. */
  const url = new URL(`${BASE_URL}/notes`);
  if (search) url.searchParams.append('q', search);
  const res = await fetch(url.toString(), {
    headers: { 'Accept': 'application/json' },
  });
  return handleResponse(res);
}

// PUBLIC_INTERFACE
export async function getNote(id) {
  /** Get a single note by id. */
  const res = await fetch(`${BASE_URL}/notes/${encodeURIComponent(id)}`, {
    headers: { 'Accept': 'application/json' },
  });
  return handleResponse(res);
}

// PUBLIC_INTERFACE
export async function createNote(payload) {
  /** Create a new note. Payload: { title, content } */
  const res = await fetch(`${BASE_URL}/notes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}

// PUBLIC_INTERFACE
export async function updateNote(id, payload) {
  /** Update a note. Payload may include: { title, content } */
  const res = await fetch(`${BASE_URL}/notes/${encodeURIComponent(id)}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}

// PUBLIC_INTERFACE
export async function deleteNote(id) {
  /** Delete a note by id. */
  const res = await fetch(`${BASE_URL}/notes/${encodeURIComponent(id)}`, {
    method: 'DELETE',
    headers: { 'Accept': 'application/json' },
  });
  return handleResponse(res);
}
