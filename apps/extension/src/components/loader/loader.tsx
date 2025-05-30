import { Loader2 } from "lucide-react"

const Loader = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Loader2 className="w-5 h-5 animate-spin" />
    </div>
  )
}

export default Loader
