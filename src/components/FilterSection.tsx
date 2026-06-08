import type { FC } from 'react'
import type { FilterConfig } from '../types'

interface FilterSectionProps {
  filters: FilterConfig
  cities: string[]
  companies: string[]
  onFilterChange: (filters: FilterConfig) => void
}

const FilterSection: FC<FilterSectionProps> = ({ filters, cities, companies, onFilterChange }) => {
  const handleCityChange = (city: string) => onFilterChange({ ...filters, city })
  const handleCompanyChange = (company: string) => onFilterChange({ ...filters, company })

  return (
    <div className="controls__filters">
      <div className="filter-select">
        <label htmlFor="city-filter" className="filter-select__label">
          City
        </label>
        <select
          id="city-filter"
          className="filter-select__field"
          value={filters.city}
          onChange={(e) => handleCityChange(e.target.value)}
          aria-label="Filter by city"
        >
          <option value="">All Cities</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-select">
        <label htmlFor="company-filter" className="filter-select__label">
          Company
        </label>
        <select
          id="company-filter"
          className="filter-select__field"
          value={filters.company}
          onChange={(e) => handleCompanyChange(e.target.value)}
          aria-label="Filter by company"
        >
          <option value="">All Companies</option>
          {companies.map((company) => (
            <option key={company} value={company}>
              {company}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default FilterSection
