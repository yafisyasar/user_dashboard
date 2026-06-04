import { useCallback, useMemo, useState } from 'react'
import EmptyState from '../components/EmptyState'
import ErrorState from '../components/ErrorState'
import FilterSection from '../components/FilterSection'
import Pagination from '../components/Pagination'
import SearchBar from '../components/SearchBar'
import SkeletonLoader from '../components/SkeletonLoader'
import SortControls from '../components/SortControls'
import UserCard from '../components/UserCard'
import UserTable from '../components/UserTable'
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

type ViewMode = 'card' | 'table'

const ITEMS_PER_PAGE = 5

const UserListPage = () => {
  const { users, loading, error, retry } = useUsers()
  const { isFavorite, toggleFavorite } = useFavorites()

  const [searchQuery, setSearchQuery] = useState('')
  const [sort, setSort] = useState<SortConfig>({ field: 'name', direction: 'asc' })
  const [filters, setFilters] = useState<FilterConfig>({ city: '', company: '' })
  const [currentPage, setCurrentPage] = useState(1)
  const [viewMode, setViewMode] = useState<ViewMode>('card')

  const debouncedQuery = useDebounce(searchQuery, 400)

  const cities = useMemo(() => getUniqueCities(users), [users])
  const companies = useMemo(() => getUniqueCompanies(users), [users])

  const processedUsers = useMemo(() => {
    let result = searchUsers(users, debouncedQuery)
    result = filterUsers(result, filters)
    result = sortUsers(result, sort)
    return result
  }, [users, debouncedQuery, filters, sort])

  const { paginatedUsers, totalPages } = useMemo(
    () => paginateUsers(processedUsers, currentPage, ITEMS_PER_PAGE),
    [processedUsers, currentPage]
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
    setCurrentPage(1)
  }, [])

  const handleExport = useCallback(() => {
    exportToCSV(processedUsers)
  }, [processedUsers])

  const hasActiveFilters = debouncedQuery || filters.city || filters.company

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
            <div className="view-toggle" role="group" aria-label="View mode">
              <button
                className={`view-toggle__btn ${viewMode === 'card' ? 'active' : ''}`}
                onClick={() => setViewMode('card')}
                aria-label="Card view"
                aria-pressed={viewMode === 'card'}
              >
                ▦
              </button>
              <button
                className={`view-toggle__btn ${viewMode === 'table' ? 'active' : ''}`}
                onClick={() => setViewMode('table')}
                aria-label="Table view"
                aria-pressed={viewMode === 'table'}
              >
                ☰
              </button>
            </div>
            <button
              className="btn btn-secondary"
              onClick={handleExport}
              disabled={processedUsers.length === 0}
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
            Showing <strong>{processedUsers.length}</strong>{' '}
            {processedUsers.length === 1 ? 'user' : 'users'}
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
        <SkeletonLoader count={6} />
      ) : processedUsers.length === 0 ? (
        <EmptyState query={debouncedQuery} onClear={handleClearAll} />
      ) : viewMode === 'card' ? (
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
      ) : (
        <UserTable
          users={paginatedUsers}
          isFavorite={isFavorite}
          onToggleFavorite={toggleFavorite}
        />
      )}

      {!loading && processedUsers.length > 0 && (
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
