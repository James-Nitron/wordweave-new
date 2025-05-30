import { useAuth } from "@clerk/chrome-extension"
import useSWRMutation from "swr/mutation"

import { updateProfile } from "~/lib/api"

export function useUpdateProfile() {
  const { userId, getToken } = useAuth()

  const fetcher = async (
    url: string,
    { arg: profile }: { arg: { language: string; color: string } }
  ) => {
    const token = await getToken()
    return updateProfile(userId, profile, token)
  }

  const { trigger, isMutating, error } = useSWRMutation(
    userId
      ? `${process.env.PLASMO_PUBLIC_API_ENDPOINT}/api/users/${userId}/profile`
      : null,
    fetcher
  )
  return {
    trigger,
    isLoading: isMutating,
    error
  }
}
