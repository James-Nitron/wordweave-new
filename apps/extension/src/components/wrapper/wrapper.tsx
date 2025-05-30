import { ArrowLeftIcon } from "lucide-react"
import type { PropsWithChildren } from "react"

import Button from "../button/button"

const Wrapper = ({
  title,
  back,
  children
}: PropsWithChildren<{ title?: string; back?: string }>) => {
  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <div className="flex items-center w-full relative">
        {back && (
          <div className="absolute left-0">
            <Button icon={<ArrowLeftIcon />} to={back} variant="info" />
          </div>
        )}
        {title && (
          <h2 className="w-full text-center text-lg font-bold">{title}</h2>
        )}
      </div>
      <div className="flex flex-col gap-4 w-full">{children}</div>
    </div>
  )
}

export default Wrapper
