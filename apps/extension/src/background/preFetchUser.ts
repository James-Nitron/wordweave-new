import { createClerkClient } from "@clerk/chrome-extension/background"
import type { User } from "@wordweave/database"

import { fetchUser } from "~/lib/api"

/*
  This function is used to pre-fetch the user data when the extension is loaded. 
  This pre-fetched data is then accessed by SWR as fallback data.
*/

export async function preFetchUser(): Promise<User | null> {
  try {
    /* Init Clerk Client */
    const clerk = await createClerkClient({
      publishableKey: process.env.PLASMO_PUBLIC_CLERK_PUBLISHABLE_KEY
    })

    /* If no session or token, remove user data */
    if (!clerk.session?.user?.id) {
      await chrome.storage.local.remove("user")
      return null
    }

    const token = await clerk.session.getToken()
    if (!token) {
      await chrome.storage.local.remove("user")
      return null
    }

    /* Fetch user data with all relations in a single request */
    const id = clerk.session.user.id
    const userData = await fetchUser(id, token)

    // Store the complete user data
    await chrome.storage.local.set({ user: userData })
  } catch (error) {
    await chrome.storage.local.remove("user")
  }
}
