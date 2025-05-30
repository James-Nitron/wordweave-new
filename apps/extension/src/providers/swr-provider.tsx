import { useEffect, useState } from "react"
import { SWRConfig } from "swr"

interface SWRProviderProps {
  children: React.ReactNode
}

export function SWRProvider({ children }: SWRProviderProps) {
  const [fallback, setFallback] = useState<{ [key: string]: any }>({})

  useEffect(() => {
    // Load all prefetched data from storage when provider mounts
    chrome.storage.local.get("user").then(({ user }) => {
      if (user) {
        // Create the fallback object with the key matching our SWR key
        setFallback({
          [`${process.env.PLASMO_PUBLIC_API_ENDPOINT}/api/users/${user.id}`]:
            user
        })
      }
    })
  }, [])

  return (
    <SWRConfig
      value={{
        fallback,
        revalidateIfStale: false,
        revalidateOnMount: false,
        revalidateOnFocus: true,
        revalidateOnReconnect: true,
        keepPreviousData: true,
        dedupingInterval: 2000,
        shouldRetryOnError: true,
        errorRetryCount: 3,
        onError: (error) => {
          console.error("SWR Global Error:", error)
        }
      }}>
      {children}
    </SWRConfig>
  )
}
