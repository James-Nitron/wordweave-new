import { Search as SearchIcon } from "lucide-react"
import type { InputHTMLAttributes } from "react"

import { cn } from "~/lib/utils"

interface SearchProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
}

const Search = ({ className, ...props }: SearchProps) => {
  return (
    <div className="relative w-full">
      <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
      <input
        type="text"
        className={cn(
          "w-full pl-9 pr-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white",
          className
        )}
        {...props}
      />
    </div>
  )
}

export default Search
