import React from "react"

import { useUser } from "~/hooks/use-user"

const Header = () => {
  const { user } = useUser()

  return (
    <div className="h-[100px] sticky top-0 flex flex-col items-center gap-2 p-4 shadow-md border-b bg-white">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-bold">WordWeave</h1>
        <p className="text-sm text-gray-500">{user?.selectedLanguage}</p>
      </div>
      <p className="text-sm text-gray-500">
        Learn languages as you browse the web.
      </p>
    </div>
  )
}

export default Header
