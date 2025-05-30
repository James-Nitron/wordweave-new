import React from "react"

import "../style.css"

import { Protect } from "@clerk/chrome-extension"
import { createMemoryRouter, Navigate, RouterProvider } from "react-router"

import { AuthenticationProvider } from "~/providers/authentication-provider"
import { SWRProvider } from "~/providers/swr-provider"

import { RootLayout } from "./layouts/root-layout"
import History from "./routes/history"
import Home from "./routes/home"
import { Settings } from "./routes/settings"
import Setup from "./routes/setup"
import { SignInPage } from "./routes/sign-in"
import { SignUpPage } from "./routes/sign-up"

const PUBLISHABLE_KEY = process.env.PLASMO_PUBLIC_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error(
    "Please add the PLASMO_PUBLIC_CLERK_PUBLISHABLE_KEY to the .env.development file"
  )
}

const router = createMemoryRouter([
  {
    element: (
      <AuthenticationProvider>
        <SWRProvider>
          <RootLayout />
        </SWRProvider>
      </AuthenticationProvider>
    ),
    children: [
      {
        path: "/",
        element: <Navigate to="/sign-in" replace />
      },
      {
        path: "/sign-in",
        element: <SignInPage />
      },
      {
        path: "/sign-up",
        element: <SignUpPage />
      },

      {
        path: "/home",
        element: (
          <Protect fallback={<Navigate to="/sign-in" />}>
            <Home />
          </Protect>
        )
      },
      {
        path: "/history",
        element: (
          <Protect fallback={<Navigate to="/sign-in" />}>
            <History />
          </Protect>
        )
      },
      {
        path: "/setup",
        element: (
          <Protect fallback={<Navigate to="/sign-in" />}>
            <Setup />
          </Protect>
        )
      },
      {
        path: "/settings",
        element: (
          <Protect fallback={<Navigate to="/sign-in" />}>
            <Settings />
          </Protect>
        )
      }
    ]
  }
])

export default function PopupIndex() {
  return <RouterProvider router={router} />
}
