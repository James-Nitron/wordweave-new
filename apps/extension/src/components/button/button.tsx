import { Loader2 } from "lucide-react"
import type { ButtonHTMLAttributes, ReactNode } from "react"
import { Link, type LinkProps } from "react-router"

import { cn } from "~/lib/utils"

type BaseButtonProps = {
  variant?: "info" | "warning" | "destructive"
  isLoading?: boolean
  icon?: ReactNode
  className?: string
  children?: ReactNode
  disabled?: boolean
}

type ButtonAsButtonProps = BaseButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    to?: never
  }

type ButtonAsLinkProps = BaseButtonProps &
  Omit<LinkProps, "children" | "className"> & {
    to: string
  }

type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps

const Button = ({
  variant = "info",
  isLoading = false,
  icon,
  children,
  className,
  to,
  disabled,
  ...props
}: ButtonProps) => {
  const baseStyles =
    "inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"

  const variantStyles = {
    info: children
      ? "bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500"
      : "text-gray-500 hover:text-blue-600 focus-visible:ring-blue-500",
    warning: children
      ? "bg-yellow-600 text-white hover:bg-yellow-700 focus-visible:ring-yellow-500"
      : "text-gray-500 hover:text-yellow-600 focus-visible:ring-yellow-500",
    destructive: children
      ? "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500"
      : "text-gray-500 hover:text-red-600 focus-visible:ring-red-500"
  }

  const content = (
    <>
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          <span>Loading...</span>
        </>
      ) : (
        <>
          {icon && (
            <div
              className={cn("flex items-center justify-center", {
                "mr-2": children
              })}>
              <div className="h-5 w-5 flex items-center justify-center">
                {icon}
              </div>
            </div>
          )}
          {children}
        </>
      )}
    </>
  )

  const sizeStyles = children
    ? "h-10 px-4 rounded-md"
    : "flex items-center justify-center h-auto w-auto p-2 hover:bg-gray-100 rounded-full"

  const isDisabled = isLoading || disabled

  if (to) {
    return isDisabled ? (
      <div
        className={cn(
          baseStyles,
          sizeStyles,
          variantStyles[variant],
          "opacity-50 cursor-not-allowed",
          className
        )}>
        {content}
      </div>
    ) : (
      <Link
        to={to}
        className={cn(
          baseStyles,
          sizeStyles,
          variantStyles[variant],
          className
        )}
        {...(props as ButtonAsLinkProps)}>
        {content}
      </Link>
    )
  }

  return (
    <button
      className={cn(baseStyles, sizeStyles, variantStyles[variant], className)}
      disabled={isDisabled}
      {...(props as ButtonAsButtonProps)}>
      {content}
    </button>
  )
}

export default Button
