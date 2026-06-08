import { useState, useEffect } from 'react'
import type { User } from '../types'
import { fetchUsers } from '../services/users'

interface UseUsersReturn {
  users: User[]
  loading: boolean
  error: string | null
  retry: () => void
}

export const useUsers = (): UseUsersReturn => {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchUsers()
      .then(setUsers)
      .catch(() => setError('Failed to fetch users. Please check your connection and try again.'))
      .finally(() => setLoading(false))
  }, [])

  const retry = () => {
    setLoading(true)
    setError(null)
    fetchUsers()
      .then(setUsers)
      .catch(() => setError('Failed to fetch users. Please check your connection and try again.'))
      .finally(() => setLoading(false))
  }

  return { users, loading, error, retry }
}
