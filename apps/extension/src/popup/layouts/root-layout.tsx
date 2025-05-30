import React from "react"
import { Outlet } from "react-router"

import { Footer } from "~/components/footer"
import { Header } from "~/components/header"

export function RootLayout() {
  return (
    <div className="w-[350px] h-[600px] flex flex-col bg-white">
      <Header />
      <main className="flex-1 overflow-y-auto bg-slate-50 min-h-0">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
