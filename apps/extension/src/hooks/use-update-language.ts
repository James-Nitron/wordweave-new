import useSWRMutation from "swr/mutation"

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export function useUpdateLanguage(userId: string) {
  const { trigger, isMutating, error } = useSWRMutation(
    userId
      ? `${process.env.PLASMO_PUBLIC_API_ENDPOINT}/api/users/${userId}/language`
      : null,
    async (url, { arg: language }: { arg: string }) => {
      const response = await fetch(
        `${process.env.PLASMO_PUBLIC_API_ENDPOINT}/api/users/${userId}/language`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ language })
        }
      )
      if (!response.ok) {
        throw new Error("Failed to update language")
      }
      // Simulate longer loading
      await sleep(1500)
      return response.json()
    }
  )
  return {
    trigger,
    isLoading: isMutating,
    error
  }
}
