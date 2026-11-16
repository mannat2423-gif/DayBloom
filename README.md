# Daybloom

A calm daily planner built with React, Vite, JavaScript, CSS, and browser LocalStorage. Tasks and notes stay on the device and remain available after refreshing.

## Run locally

From this directory, install dependencies and start the development server:

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. Use the sidebar to switch between the dashboard, tasks, daily schedule, weekly planner, calendar, notes, focus timer, and progress views.

## Project map

- `src/App.jsx` connects navigation, shared task and note state, and the task editor.
- `src/components/` contains reusable task list and task editor components.
- `src/pages/` contains the individual planner views.
- `src/utils/storage.js` reads and writes local data safely.
- `src/App.css` and `src/index.css` define the responsive theme and layout.

## Check the app

```sh
npm run lint
npm run build
```

To check the main interactions, add a task with a date and time, mark it complete, edit it, then refresh to confirm it persists. Try the week and month views, create and edit a note, and run the focus and break timers.

## Deploy

Run `npm run build` and deploy the generated `dist/` directory to any static host such as Netlify, Vercel, or GitHub Pages. No server or database is required. Each visitor's tasks and notes are stored in that browser's LocalStorage.
