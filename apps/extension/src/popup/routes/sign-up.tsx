import { SignUp } from "@clerk/chrome-extension"
import React from "react"

export const SignUpPage = () => {
  return <SignUp routing="virtual" signInUrl="/" />
}
