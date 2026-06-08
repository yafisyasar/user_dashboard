import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import type { User } from '../types'

const AVATAR_COLORS = [
  '#6b7280',
]

interface UserCardProps {
  user: User
  isFavorite: boolean
  onToggleFavorite: (id: number) => void
}

const UserCard = memo(({ user, isFavorite, onToggleFavorite }: UserCardProps) => {
  const navigate = useNavigate()
  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
  const avatarColor = AVATAR_COLORS[user.id % AVATAR_COLORS.length]

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation()
    onToggleFavorite(user.id)
  }

  return (
    <article
      className={`user-card${isFavorite ? ' user-card--fav' : ''}`}
      onClick={() => navigate(`/users/${user.id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && navigate(`/users/${user.id}`)}
      aria-label={`View profile of ${user.name}`}
    >
      <div className="user-card__header">
        <div
          className="user-card__avatar"
          style={{ background: `linear-gradient(135deg, ${avatarColor}, ${avatarColor}dd)` }}
        >
          {initials}
        </div>
        <div className="user-card__info">
          <div className="user-card__name">{user.name}</div>
          <div className="user-card__username">@{user.username}</div>
        </div>
        <button
          className={`user-card__fav${isFavorite ? ' active' : ''}`}
          onClick={handleFavorite}
          aria-label={isFavorite ? `Remove ${user.name} from favorites` : `Add ${user.name} to favorites`}
          aria-pressed={isFavorite}
        >
          {isFavorite ? '★' : '☆'}
        </button>
      </div>

      <div className="user-card__details">
        <div className="user-card__detail">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
          <a href={`mailto:${user.email}`} onClick={(e) => e.stopPropagation()}>{user.email}</a>
        </div>
        <div className="user-card__detail">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 15a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.55 4h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8 11.91a16 16 0 0 0 5.92 5.92l1.06-1.06a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          <span>{user.phone}</span>
        </div>
        <div className="user-card__detail">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
          <a href={`https://${user.website}`} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>{user.website}</a>
        </div>
      </div>
    </article>
  )
})

UserCard.displayName = 'UserCard'
export default UserCard
