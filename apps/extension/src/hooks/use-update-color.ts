import { useAuth } from "@clerk/chrome-extension"
import { useSWRConfig } from "swr"
import useSWRMutation from "swr/mutation"

import { updateColor } from "~/lib/api"

export function useUpdateColor() {
  const { userId, getToken } = useAuth()
  const { mutate } = useSWRConfig()

  const fetcher = async (url: string, { arg: color }: { arg: string }) => {
    const token = await getToken()
    const updatedUser = await updateColor(userId, color, token)

    console.log("updatedUser", updatedUser)
    // Mutate the user data cache with the updated user
    await mutate(
      `${process.env.PLASMO_PUBLIC_API_ENDPOINT}/api/users/${userId}`,
      updatedUser
    )
  }

  const { trigger, isMutating, error } = useSWRMutation(
    userId
      ? `${process.env.PLASMO_PUBLIC_API_ENDPOINT}/api/users/${userId}/color`
      : null,
    fetcher
  )

  return {
    trigger,
    isLoading: isMutating,
    error
  }
}
