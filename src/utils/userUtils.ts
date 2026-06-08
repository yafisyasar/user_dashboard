import type { FilterConfig, SortConfig, User } from '../types'

export const searchUsers = (users: User[], query: string): User[] => {
  if (!query.trim()) return users
  const q = query.toLowerCase()
  return users.filter(
    (u) =>
      u.name.toLowerCase().includes(q) ||
      u.username.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q),
  )
}

export const sortUsers = (users: User[], sort: SortConfig): User[] => {
  return [...users].sort((a, b) => {
    const aVal = a[sort.field].toLowerCase()
    const bVal = b[sort.field].toLowerCase()
    if (aVal < bVal) return sort.direction === 'asc' ? -1 : 1
    if (aVal > bVal) return sort.direction === 'asc' ? 1 : -1
    return 0
  })
}

export const filterUsers = (users: User[], filters: FilterConfig): User[] => {
  return users.filter((u) => {
    const cityMatch = !filters.city || u.address.city === filters.city
    const companyMatch = !filters.company || u.company.name === filters.company
    return cityMatch && companyMatch
  })
}

export const paginateUsers = (
  users: User[],
  currentPage: number,
  itemsPerPage: number,
): { paginatedUsers: User[]; totalPages: number } => {
  const totalPages = Math.ceil(users.length / itemsPerPage)
  const start = (currentPage - 1) * itemsPerPage
  const paginatedUsers = users.slice(start, start + itemsPerPage)
  return { paginatedUsers, totalPages }
}

export const exportToCSV = (users: User[]): void => {
  const headers = ['Name', 'Username', 'Email', 'Phone', 'Website', 'City', 'Company']
  const rows = users.map((u) => [
    u.name,
    u.username,
    u.email,
    u.phone,
    u.website,
    u.address.city,
    u.company.name,
  ])

  const csvContent = [headers, ...rows]
    .map((row) => row.map((cell) => `"${cell}"`).join(','))
    .join('\n')

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'users.csv'
  link.click()
  URL.revokeObjectURL(url)
}

export const getUniqueCities = (users: User[]): string[] =>
  [...new Set(users.map((u) => u.address.city))].sort()

export const getUniqueCompanies = (users: User[]): string[] =>
  [...new Set(users.map((u) => u.company.name))].sort()
