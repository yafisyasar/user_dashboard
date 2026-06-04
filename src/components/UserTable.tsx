import React, { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import type { User } from '../types'

interface UserTableProps {
  users: User[]
  isFavorite: (id: number) => boolean
  onToggleFavorite: (id: number) => void
}

const UserTable: React.FC<UserTableProps> = memo(({ users, isFavorite, onToggleFavorite }) => {
  const navigate = useNavigate()

  return (
    <div className="user-table-wrap" role="region" aria-label="Users table">
      <table className="user-table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Website</th>
            <th scope="col">Company</th>
            <th scope="col">City</th>
            <th scope="col">Fav</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              onClick={() => navigate(`/users/${user.id}`)}
              onKeyDown={(e) => e.key === 'Enter' && navigate(`/users/${user.id}`)}
              tabIndex={0}
              aria-label={`View details for ${user.name}`}
            >
              <td className="user-table__name">{user.name}</td>
              <td>@{user.username}</td>
              <td>
                <a
                  href={`mailto:${user.email}`}
                  className="user-table__link"
                  onClick={(e) => e.stopPropagation()}
                  aria-label={`Email ${user.name}`}
                >
                  {user.email}
                </a>
              </td>
              <td>{user.phone}</td>
              <td>
                <a
                  href={`https://${user.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="user-table__link"
                  onClick={(e) => e.stopPropagation()}
                  aria-label={`Visit ${user.name}'s website`}
                >
                  {user.website}
                </a>
              </td>
              <td>{user.company.name}</td>
              <td>{user.address.city}</td>
              <td>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onToggleFavorite(user.id)
                  }}
                  aria-label={
                    isFavorite(user.id)
                      ? `Remove ${user.name} from favorites`
                      : `Add ${user.name} to favorites`
                  }
                  aria-pressed={isFavorite(user.id)}
                  style={{
                    fontSize: '1rem',
                    color: isFavorite(user.id) ? '#f59e0b' : 'var(--text-muted)',
                    transition: 'color 0.2s ease',
                  }}
                >
                  {isFavorite(user.id) ? '★' : '☆'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
})

UserTable.displayName = 'UserTable'
export default UserTable
