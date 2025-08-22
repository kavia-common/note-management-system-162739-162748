# Notes Frontend (React)

A modern, light-themed notes management app with:
- Sidebar navigation
- Search
- Notes list and details
- Create/Edit modals
- REST API integration for CRUD

## Getting Started

- Install dependencies: `npm install`
- Start dev server: `npm start`
- Run tests: `npm test`
- Build: `npm run build`

## Configuration

Set the backend API base URL via environment variable:

- REACT_APP_API_BASE_URL=http://localhost:4000

Create a `.env` file in this folder if needed (do not commit secrets). The app defaults to `http://localhost:4000` when not provided.

## API Contract

The app expects a REST API with the following endpoints:
- GET    /notes           -> returns array of notes [{ id, title, content }]
- GET    /notes/:id       -> returns a single note
- POST   /notes           -> accepts { title, content }, returns created note with id
- PUT    /notes/:id       -> accepts { title, content }, returns updated note
- DELETE /notes/:id       -> deletes a note, returns 204

Optional: GET /notes?q=searchTerm to filter notes by search.

## Theming

The app supports light/dark themes with a toggle button. Brand colors used:
- primary: #1976d2
- secondary: #424242
- accent: #388e3c

## Project Structure

- src/api/notesApi.js: Fetch helpers for CRUD
- src/hooks/useNotes.js: State management for notes
- src/components/*: UI components
- src/App.js: Main application layout and logic
- src/styles.css: Primary styling
