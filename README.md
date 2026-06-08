# User Dashboard

A dark-themed user management dashboard built with React, TypeScript, and Vite. Fetches user data from [JSONPlaceholder](https://jsonplaceholder.typicode.com) and provides search, filter, sort, pagination, and favorites functionality.

**Live Demo:** [https://usr-dboard.vercel.app/](https://usr-dboard.vercel.app/)

## Project Overview

This single-page application displays a paginated grid of user cards fetched from the JSONPlaceholder API. Users can:

- Search across name, username, email, phone, and website
- Filter by city and company
- Sort by name, username, or email (ascending / descending)
- Favorite users (persisted to localStorage)
- Toggle between dark and light themes (persisted to localStorage)
- Export the filtered user list to CSV
- View detailed information for each user on a dedicated detail page
- Remove all favorites with one click

The app uses a glassmorphism-inspired dark-first design with a violet accent palette and the Unbounded font from Google Fonts.

## Installation Steps

```bash
# 1. Clone the repository
git clone <repo-url>
cd usr_db

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev

# 4. Build for production
npm run build
```

The app runs on `http://localhost:5173` by default.

## Architecture Explanation

```
src/
├── api/            # Axios client for JSONPlaceholder
│   └── users.ts
├── components/     # Reusable UI components
│   ├── EmptyState.tsx
│   ├── ErrorState.tsx
│   ├── FilterSection.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── Pagination.tsx
│   ├── SearchBar.tsx
│   ├── SkeletonLoader.tsx
│   ├── SortControls.tsx
│   └── UserCard.tsx
├── hooks/          # Custom React hooks
│   ├── useDebounce.ts
│   ├── useFavorites.ts
│   ├── useTheme.ts
│   └── useUsers.ts
├── pages/          # Route-level page components
│   ├── UserDetailPage.tsx
│   └── UserListPage.tsx
├── types/          # TypeScript type definitions
│   └── index.ts
├── utils/          # Pure utility functions
│   └── userUtils.ts
├── App.tsx         # Root component with routing
├── main.tsx        # Entry point
└── index.css       # All styles (global, theme tokens, components)
```

**Data flow:** `UserListPage` uses `useUsers` to fetch all users on mount. The raw list is passed through `searchUsers` → `filterUsers` → `sortUsers` → `paginateUsers` (pure functions in `userUtils.ts`). Search is debounced (400ms) via `useDebounce`. Favorites are managed independently through `useFavorites` (localStorage-backed) and applied as a post-filter when the favorites toggle is active.

**Routing:** React Router v6 — `/` renders `UserListPage`, `/users/:id` renders `UserDetailPage`. Pages are lazy-loaded with `React.lazy` and wrapped in `<Suspense>`.

**Theming:** `useTheme` reads the initial preference from localStorage (fallback to system `prefers-color-scheme`). Toggling updates a `data-theme` attribute on `<html>`, and CSS custom properties switch accordingly.

## Testing Instructions

This project does not include automated tests. The test directory and Jest dependencies were removed early in development per project constraints.

To manually verify the app:

1. Run `npm run dev` and open in a browser
2. Confirm the user list loads from the JSONPlaceholder API
3. Test search with various queries (name, email, phone, etc.)
4. Test city and company filters
5. Test sort toggles (ascending / descending / none)
6. Click the star icon on cards to favorite/unfavorite users
7. Enable the "Favorites only" toggle to verify filtering
8. Change the page via pagination controls
9. Click a user card to navigate to the detail page
10. Toggle dark/light theme and verify persistence on reload
11. Click the CSV export button and verify the downloaded file

## Performance Optimizations Implemented

- **Debounced search** (400ms) to reduce filtering work while typing
- **All filtering, sorting, and pagination done client-side** on a single API call (only 10 users, so no server round-trips)
- **React.lazy + Suspense** for code-splitting the detail page bundle
- **CSS custom properties** for theming (no re-renders on theme switch — single DOM attribute change)
- **Infinite scroll not needed** — small dataset kept in memory; client-side pagination renders 5 items per page
- **localStorage writes** only happen on explicit favorite/theme toggle (not on every render)
- **Pure functions** in `userUtils.ts` are side-effect-free and trivially testable/reusable

## Assumptions Made

- **JSONPlaceholder is always available** — no fallback data or caching layer is implemented. If the API is down, `ErrorState` is shown with a retry button.
- **The dataset is small (10 users)** — all users are fetched in one request. No lazy loading, virtual scrolling, or server-side pagination is needed.
- **No authentication or authorization** — the app is fully public and client-side only.
- **localStorage is available** — favorites and theme preferences depend on it. If unavailable (private browsing restrictions), features degrade silently with defaults (empty favorites, dark theme).
- **No backend** — all data comes from JSONPlaceholder. No mutations (create/update/delete) are supported.
- **Mobile-first responsive is not required** — the layout targets desktop screens primarily. No media queries beyond basic card grid wrapping.
