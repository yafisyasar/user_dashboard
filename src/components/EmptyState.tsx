import React from 'react'

interface EmptyStateProps {
  query: string
  onClear: () => void
}

const EmptyState: React.FC<EmptyStateProps> = ({ query, onClear }) => (
  <div className="empty-state" role="status" aria-live="polite">
    <div className="empty-state__icon" aria-hidden="true">🔍</div>
    <h2 className="empty-state__title">No users found</h2>
    <p className="empty-state__text">
      {query
        ? `No results for "${query}". Try a different search term or remove some filters.`
        : 'No users match the selected filters. Try adjusting your criteria.'}
    </p>
    <button className="btn btn-secondary" onClick={onClear}>
      Clear all filters
    </button>
  </div>
)

export default EmptyState
