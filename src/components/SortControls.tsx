import type { FC } from 'react'
import type { SortConfig, SortField } from '../types'

interface SortControlsProps {
  sort: SortConfig
  onSortChange: (sort: SortConfig) => void
}

const SORT_FIELDS: { field: SortField; label: string }[] = [
  { field: 'name', label: 'Name' },
  { field: 'username', label: 'Username' },
  { field: 'email', label: 'Email' },
]

const SortControls: FC<SortControlsProps> = ({ sort, onSortChange }) => {
  const handleClick = (field: SortField) => {
    if (sort.field === field) {
      onSortChange({ field, direction: sort.direction === 'asc' ? 'desc' : 'asc' })
    } else {
      onSortChange({ field, direction: 'asc' })
    }
  }

  return (
    <div className="sort-controls">
      <span className="sort-controls__label">Sort by</span>
      <div className="sort-controls__buttons" role="group" aria-label="Sort users">
        {SORT_FIELDS.map(({ field, label }) => {
          const isActive = sort.field === field
          return (
            <button
              key={field}
              className={`sort-btn ${isActive ? 'active' : ''}`}
              onClick={() => handleClick(field)}
              aria-pressed={isActive}
              aria-label={`Sort by ${label} ${isActive ? (sort.direction === 'asc' ? 'descending' : 'ascending') : 'ascending'}`}
            >
              {label}
              {isActive && <span aria-hidden="true">{sort.direction === 'asc' ? '↑' : '↓'}</span>}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default SortControls
