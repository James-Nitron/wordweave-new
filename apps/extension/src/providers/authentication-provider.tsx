import { ClerkProvider } from "@clerk/chrome-extension"
import type { PropsWithChildren } from "react"
import { useNavigate } from "react-router"

const PUBLISHABLE_KEY = process.env.PLASMO_PUBLIC_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error(
    "Please add the PLASMO_PUBLIC_CLERK_PUBLISHABLE_KEY to the .env.development file"
  )
}

export function AuthenticationProvider({ children }: PropsWithChildren) {
  const navigate = useNavigate()

  return (
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      routerPush={(to) => navigate(to)}
      routerReplace={(to) => navigate(to, { replace: true })}
      afterSignOutUrl="/sign-in"
      signInForceRedirectUrl="/home"
      signUpForceRedirectUrl="/home">
      {children}
    </ClerkProvider>
  )
}
