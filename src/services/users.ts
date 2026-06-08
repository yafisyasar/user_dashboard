import axios from 'axios'
import type { User } from '../types'

const BASE_URL = 'https://jsonplaceholder.typicode.com'

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
})

export const fetchUsers = async (): Promise<User[]> => {
  const response = await apiClient.get<User[]>('/users')
  return response.data
}

export const fetchUserById = async (id: number): Promise<User> => {
  const response = await apiClient.get<User>(`/users/${id}`)
  return response.data
}
