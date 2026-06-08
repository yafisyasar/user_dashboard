import type { FC } from 'react'

interface SkeletonLoaderProps {
  count?: number
}

const SkeletonLoader: FC<SkeletonLoaderProps> = ({ count = 6 }) => {
  return (
    <div className="skeleton-grid" aria-label="Loading users" role="status">
      <span className="sr-only">Loading users...</span>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="skeleton-card">
          <div className="skeleton-card__header">
            <div className="skeleton skeleton--avatar" />
            <div className="skeleton-card__info">
              <div className="skeleton skeleton--text-lg" />
              <div className="skeleton skeleton--text" />
            </div>
          </div>
          <div className="skeleton-card__body">
            <div className="skeleton skeleton--text-lg" />
            <div className="skeleton skeleton--text" />
            <div className="skeleton skeleton--text skeleton--text-half" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default SkeletonLoader
