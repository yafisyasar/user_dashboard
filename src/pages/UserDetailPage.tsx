import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchUserById } from '../api/users'
import ErrorState from '../components/ErrorState'
import type { User } from '../types'

const AVATAR_COLORS = [
  '#6b7280',
]

const UserDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadUser = async () => {
    if (!id) return
    setLoading(true)
    setError(null)
    try {
      const data = await fetchUserById(Number(id))
      setUser(data)
    } catch {
      setError('Could not load user details. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadUser()
  }, [id])

  if (loading) {
    return (
      <div className="page-loader">
        <div className="spinner" />
        <span>Loading profile…</span>
      </div>
    )
  }

  if (error) {
    return <ErrorState message={error} onRetry={loadUser} />
  }

  if (!user) return null

  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
  const avatarColor = AVATAR_COLORS[user.id % AVATAR_COLORS.length]

  return (
    <div>
      <Link to="/" className="back-link" aria-label="Back to user list">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        Back to users
      </Link>

      <div className="detail-hero">
        <div
          className="detail-hero__avatar"
          style={{ background: `linear-gradient(135deg, ${avatarColor}, ${avatarColor}dd)` }}
        >
          {initials}
        </div>
        <div className="detail-hero__info">
          <h1 className="detail-hero__name">{user.name}</h1>
          <p className="detail-hero__username">@{user.username}</p>
          <div className="detail-hero__links">
            <span className="detail-hero__link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <a href={`mailto:${user.email}`}>{user.email}</a>
            </span>
            <span className="detail-hero__link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 15a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.55 4h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8 11.91a16 16 0 0 0 5.92 5.92l1.06-1.06a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              {user.phone}
            </span>
            <span className="detail-hero__link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              <a href={`https://${user.website}`} target="_blank" rel="noopener noreferrer">{user.website}</a>
            </span>
          </div>
        </div>
      </div>

      <div className="detail-grid">
        <section className="detail-card" aria-labelledby="address-title">
          <div className="detail-card__header">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <h2 className="detail-card__title" id="address-title">Address</h2>
          </div>
          <div className="detail-card__body">
            <div className="detail-row">
              <span className="detail-row__label">Street</span>
              <span className="detail-row__value">{user.address.street}</span>
            </div>
            <div className="detail-row">
              <span className="detail-row__label">Suite</span>
              <span className="detail-row__value">{user.address.suite}</span>
            </div>
            <div className="detail-row">
              <span className="detail-row__label">City</span>
              <span className="detail-row__value">{user.address.city}</span>
            </div>
            <div className="detail-row">
              <span className="detail-row__label">Zipcode</span>
              <span className="detail-row__value">{user.address.zipcode}</span>
            </div>
            <div className="detail-row">
              <span className="detail-row__label">Coordinates</span>
              <span className="detail-row__value">{user.address.geo.lat}, {user.address.geo.lng}</span>
            </div>
          </div>
        </section>

        <section className="detail-card" aria-labelledby="company-title">
          <div className="detail-card__header">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
            <h2 className="detail-card__title" id="company-title">Company</h2>
          </div>
          <div className="detail-card__body">
            <div className="detail-row">
              <span className="detail-row__label">Name</span>
              <span className="detail-row__value">{user.company.name}</span>
            </div>
            <div className="detail-row">
              <span className="detail-row__label">Catch Phrase</span>
              <span className="detail-row__value" style={{ fontStyle: 'italic' }}>
                "{user.company.catchPhrase}"
              </span>
            </div>
            <div className="detail-row">
              <span className="detail-row__label">Description</span>
              <span className="detail-row__value">{user.company.bs}</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default UserDetailPage
