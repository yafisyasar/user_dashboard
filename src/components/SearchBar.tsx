import type { FC } from 'react'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

const SearchBar: FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <div className="search-input">
      <label htmlFor="user-search" className="search-input__label">
        Search Users
      </label>
      <div className="search-input__wrap">
        <svg
          className="search-input__icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          id="user-search"
          type="search"
          className="search-input__field"
          placeholder="Search by name, username or email…"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-label="Search users by name, username, or email"
          autoComplete="off"
        />
        {value && (
          <button
            className="search-input__clear visible"
            onClick={() => onChange('')}
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>
    </div>
  )
}

export default SearchBar
