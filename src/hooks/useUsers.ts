import { useState, useEffect, useCallback } from 'react'
import type { User } from '../types'
import { fetchUsers } from '../api/users'

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

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchUsers()
      setUsers(data)
    } catch {
      setError('Failed to fetch users. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  return { users, loading, error, retry: load }
}
