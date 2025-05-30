import { SignIn } from "@clerk/chrome-extension"
import React from "react"

export const SignInPage = () => {
  return <SignIn routing="virtual" signUpUrl="/sign-up" />
}
