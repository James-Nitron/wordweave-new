import { useAuth } from "@clerk/chrome-extension"
import type { User } from "@wordweave/database"
import useSWR from "swr"

import { fetchUser } from "~/lib/api"

export const useUser = () => {
  const { userId, getToken } = useAuth()

  const fetcher = async (url: string): Promise<User | null> => {
    const token = await getToken()
    return fetchUser(userId, token)
  }

  const { data, isLoading, error } = useSWR<User | null, Error>(
    userId
      ? `${process.env.PLASMO_PUBLIC_API_ENDPOINT}/api/users/${userId}`
      : null,
    fetcher
  )

  return {
    user: data,
    isLoading,
    isError: error !== undefined
  }
}
