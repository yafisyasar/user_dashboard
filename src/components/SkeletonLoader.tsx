import type { FC } from 'react'

interface SkeletonLoaderProps {
  count?: number
}

const SkeletonLoader: FC<SkeletonLoaderProps> = ({ count = 6 }) => {
  return (
    <div className="skeleton-grid" aria-label="Loading users" role="status">
      <span className="sr-only" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0,0,0,0)' }}>Loading users...</span>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="skeleton-card">
          <div className="skeleton-card__header">
            <div className="skeleton skeleton--avatar" />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div className="skeleton skeleton--text-md" />
              <div className="skeleton skeleton--text-sm" />
            </div>
          </div>
          <div className="skeleton-card__lines">
            <div className="skeleton skeleton--text-md" />
            <div className="skeleton skeleton--text-sm" />
            <div className="skeleton skeleton--text-md" style={{ width: '50%' }} />
          </div>
        </div>
      ))}
    </div>
  )
}

export default SkeletonLoader
