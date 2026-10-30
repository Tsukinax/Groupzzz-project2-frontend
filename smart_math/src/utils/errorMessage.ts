import { isAxiosError } from 'axios'

export function getErrorMessage(error: unknown, fallback: string): string {
  if (isAxiosError(error) && error.response?.data?.detail) {
    return error.response.data.detail
  }
  return fallback
}
