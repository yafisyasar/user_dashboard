import React from 'react'

interface EmptyStateProps {
  query: string
  onClear: () => void
  isFavoritesOnly?: boolean
}

const EmptyState: React.FC<EmptyStateProps> = ({ query, onClear, isFavoritesOnly }) => (
  <div className="empty-state" role="status" aria-live="polite">
    <div className="empty-state__icon" aria-hidden="true">
      {isFavoritesOnly ? '⭐' : '🔍'}
    </div>
    <h2 className="empty-state__title">
      {isFavoritesOnly ? 'No favorites yet' : 'No users found'}
    </h2>
    <p className="empty-state__text">
      {isFavoritesOnly
        ? 'Click the ★ on any user card to add them to your favorites.'
        : query
          ? `No results for "${query}". Try a different search term or remove some filters.`
          : 'No users match the selected filters. Try adjusting your criteria.'}
    </p>
    <button className="btn btn-secondary" onClick={onClear}>
      Clear filters
    </button>
  </div>
)

export default EmptyState
