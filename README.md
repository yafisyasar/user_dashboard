# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

``` 
Entry Point
- main.tsx — App bootstrap. Imports index.css, creates React root, renders <App /> in StrictMode.
- App.tsx — Root component. Sets up routing (/ → UserListPage, /users/:id → UserDetailPage), lazy-loads pages, wraps in BrowserRouter and Suspense, renders Header/Footer/main.
Pages
- pages/UserListPage.tsx — Dashboard view. Fetches all users, handles search (debounced), filter by city/company, sort by name/username/email, pagination, view toggle (card/table), CSV export, and favorites.
- pages/UserDetailPage.tsx — Single-user detail view. Fetches user by id from URL params, displays avatar, badges, and sections for basic info, address, and company.
API
- api/users.ts — Axios client pointing at jsonplaceholder.typicode.com. Exports fetchUsers() and fetchUserById(id).
Hooks
- hooks/useUsers.ts — Fetches user list, manages loading/error/data state, exposes retry.
- hooks/useFavorites.ts — Persists favorite user IDs to localStorage, provides toggleFavorite/isFavorite.
- hooks/useTheme.ts — Reads/writes theme (light/dark) to localStorage, respects prefers-color-scheme.
- hooks/useDebounce.ts — Generic debounce hook (default 400ms) for the search input.
Components
- components/Header.tsx — Sticky header with logo, "jsonplaceholder API" badge, and dark/light theme toggle button.
- components/Footer.tsx — Simple footer with credit text.
- components/SearchBar.tsx — Search input with magnifying glass icon and clear button.
- components/FilterSection.tsx — Two <select> dropdowns to filter by city and company.
- components/SortControls.tsx — Three toggle buttons (Name/Username/Email) that cycle asc/desc.
- components/Pagination.tsx — Page number navigation with ellipsis for large page counts.
- components/UserCard.tsx — Card view of a user (avatar, name, email, phone, website, city, favorite star). Clicking navigates to detail page.
- components/UserTable.tsx — Table view of users with columns for all fields. Clicking a row navigates to detail page.
- components/SkeletonLoader.tsx — Shimmer placeholder cards shown while users are loading.
- components/EmptyState.tsx — "No users found" message with clear-filters button.
- components/ErrorState.tsx — "Something went wrong" message with retry button.
Types & Utils
- types/index.ts — TypeScript interfaces: User, Address, Geo, Company, plus config types SortConfig, FilterConfig, PaginationConfig.
- utils/userUtils.ts — Pure functions: searchUsers, sortUsers, filterUsers, paginateUsers, exportToCSV, getUniqueCities, getUniqueCompanies.
Styles
- index.css — All app styles: design tokens (light/dark), reset, header, controls, search, filters, sort, buttons, view toggle, results info, user grid, cards, table, pagination, skeleton, empty/error states, footer, detail page, spinner, animations.
- App.css — Unused Vite boilerplate (not imported anywhere).