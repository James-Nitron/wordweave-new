import React from "react"
import { Outlet } from "react-router"

import { Footer } from "~/components/footer"
import { Header } from "~/components/header"

export function RootLayout() {
  return (
    <div className="w-[350px] h-[600px] overflow-hidden bg-white">
      <Header />
      <main className="h-[calc(600px-136px)] bg-slate-50 overflow-y-auto scrollbar-thin scrollbar-thumb-transparent scrollbar-track-transparent">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
