import { useCallback, useMemo, useState } from 'react'
import EmptyState from '../components/EmptyState'
import ErrorState from '../components/ErrorState'
import FilterSection from '../components/FilterSection'
import Pagination from '../components/Pagination'
import SearchBar from '../components/SearchBar'
import SkeletonLoader from '../components/SkeletonLoader'
import SortControls from '../components/SortControls'
import UserCard from '../components/UserCard'
import { useDebounce } from '../hooks/useDebounce'
import { useFavorites } from '../hooks/useFavorites'
import { useUsers } from '../hooks/useUsers'
import type { FilterConfig, SortConfig } from '../types'
import {
  exportToCSV,
  filterUsers,
  getUniqueCities,
  getUniqueCompanies,
  paginateUsers,
  searchUsers,
  sortUsers,
} from '../utils/userUtils'

const ITEMS_PER_PAGE = 5

const UserListPage = () => {
  const { users, loading, error, retry } = useUsers()
  const { favorites, isFavorite, toggleFavorite } = useFavorites()

  const [searchQuery, setSearchQuery] = useState('')
  const [sort, setSort] = useState<SortConfig>({ field: 'name', direction: 'asc' })
  const [filters, setFilters] = useState<FilterConfig>({ city: '', company: '' })
  const [currentPage, setCurrentPage] = useState(1)
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)

  const debouncedQuery = useDebounce(searchQuery, 400)

  const cities = useMemo(() => getUniqueCities(users), [users])
  const companies = useMemo(() => getUniqueCompanies(users), [users])

  const processedUsers = useMemo(() => {
    let result = searchUsers(users, debouncedQuery)
    result = filterUsers(result, filters)
    result = sortUsers(result, sort)
    return result
  }, [users, debouncedQuery, filters, sort])

  const displayedUsers = useMemo(() => {
    if (showFavoritesOnly) return processedUsers.filter((u) => isFavorite(u.id))
    return processedUsers
  }, [processedUsers, showFavoritesOnly, isFavorite])

  const { paginatedUsers, totalPages } = useMemo(
    () => paginateUsers(displayedUsers, currentPage, ITEMS_PER_PAGE),
    [displayedUsers, currentPage]
  )

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearchQuery(value)
      setCurrentPage(1)
    },
    []
  )

  const handleFilterChange = useCallback((newFilters: FilterConfig) => {
    setFilters(newFilters)
    setCurrentPage(1)
  }, [])

  const handleSortChange = useCallback((newSort: SortConfig) => {
    setSort(newSort)
    setCurrentPage(1)
  }, [])

  const handleClearAll = useCallback(() => {
    setSearchQuery('')
    setFilters({ city: '', company: '' })
    setShowFavoritesOnly(false)
    setCurrentPage(1)
  }, [])

  const handleExport = useCallback(() => {
    exportToCSV(displayedUsers)
  }, [displayedUsers])

  const hasActiveFilters = debouncedQuery || filters.city || filters.company || showFavoritesOnly

  if (error) {
    return <ErrorState message={error} onRetry={retry} />
  }

  return (
    <section aria-label="User dashboard">
      <div className="controls">
        <div className="controls__top">
          <div className="controls__search">
            <SearchBar value={searchQuery} onChange={handleSearchChange} />
          </div>
          <div className="controls__actions">
            <button
              className={`fav-filter ${showFavoritesOnly ? 'active' : ''}`}
              onClick={() => { setShowFavoritesOnly((v) => !v); setCurrentPage(1) }}
              aria-label={showFavoritesOnly ? 'Show all users' : 'Show favorites only'}
              aria-pressed={showFavoritesOnly}
            >
              <span className={`fav-filter__star ${showFavoritesOnly ? 'active' : ''}`}>
                {showFavoritesOnly ? '★' : '☆'}
              </span>
              Favorites
              {favorites.length > 0 && <span className="fav-filter__count">{favorites.length}</span>}
            </button>
            <button
              className="btn btn-secondary"
              onClick={handleExport}
              disabled={displayedUsers.length === 0}
              aria-label="Export users as CSV"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              CSV
            </button>
          </div>
        </div>
        <div className="controls__bottom">
          <FilterSection
            filters={filters}
            cities={cities}
            companies={companies}
            onFilterChange={handleFilterChange}
          />
          <SortControls sort={sort} onSortChange={handleSortChange} />
        </div>
      </div>

      {!loading && (
        <div className="results-info" aria-live="polite">
          <p className="results-info__text">
            Showing <strong>{displayedUsers.length}</strong>{' '}
            {displayedUsers.length === 1 ? 'user' : 'users'}
            {hasActiveFilters && ' (filtered)'}
          </p>
          {hasActiveFilters && (
            <div className="results-info__controls">
              <button
                className="btn btn-secondary"
                onClick={handleClearAll}
                style={{ height: 30, fontSize: '0.78rem', padding: '0 10px' }}
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      )}

      {loading ? (
        <SkeletonLoader count={5} />
      ) : displayedUsers.length === 0 ? (
        <EmptyState query={debouncedQuery} onClear={handleClearAll} isFavoritesOnly={showFavoritesOnly} />
      ) : (
        <div className="user-grid">
          {paginatedUsers.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              isFavorite={isFavorite(user.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}

      {!loading && displayedUsers.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </section>
  )
}

export default UserListPage
