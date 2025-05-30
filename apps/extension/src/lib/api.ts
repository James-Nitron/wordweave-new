import type { DailyWord, User } from "@wordweave/database"

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function fetchUser(userId: string, token: string): Promise<User> {
  const response = await fetch(
    `${process.env.PLASMO_PUBLIC_API_ENDPOINT}/api/users/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(
        `Failed to fetch user, user not found: ${response.status}`
      )
    }
    throw new Error(`Server error: ${response.status}`)
  }

  return response.json()
}

export async function fetchDailyWord(
  userId: string,
  language: string,
  token: string
): Promise<DailyWord> {
  const response = await fetch(
    `${process.env.PLASMO_PUBLIC_API_ENDPOINT}/api/users/${userId}/daily-word?language=${language}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(
        `Failed to fetch daily word, daily word not found: ${response.status}`
      )
    }
    throw new Error(`Server error: ${response.status}`)
  }

  return response.json()
}

export async function updateProfile(
  userId: string,
  profile: { language: string; color: string },
  token: string
): Promise<User> {
  const response = await fetch(
    `${process.env.PLASMO_PUBLIC_API_ENDPOINT}/api/users/${userId}/profile`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(profile)
    }
  )

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(
        `Failed to update profile, user not found: ${response.status}`
      )
    }
    throw new Error(`Server error: ${response.status}`)
  }

  await sleep(1500)

  return response.json()
}

export async function updateColor(
  userId: string,
  color: string,
  token: string
): Promise<User> {
  const response = await fetch(
    `${process.env.PLASMO_PUBLIC_API_ENDPOINT}/api/users/${userId}/color`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ color })
    }
  )

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(
        `Failed to update color, user not found: ${response.status}`
      )
    }
    throw new Error(`Server error: ${response.status}`)
  }

  await sleep(1500)

  return response.json()
}
