import { useState, useCallback } from 'react'

const STORAGE_KEY = 'user_favorites'

const loadFavorites = (): number[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as number[]) : []
  } catch {
    return []
  }
}

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<number[]>(loadFavorites)

  const toggleFavorite = useCallback((id: number) => {
    setFavorites((prev) => {
      const next = prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      return next
    })
  }, [])

  const isFavorite = useCallback((id: number) => favorites.includes(id), [favorites])

  return { favorites, toggleFavorite, isFavorite }
}
