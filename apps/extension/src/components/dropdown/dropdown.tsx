import React, { forwardRef } from "react"
import type { ChangeEvent, FocusEvent, ForwardedRef } from "react"

export interface Option {
  value: string
  label: string
}

interface DropdownProps {
  options: Option[]
  value?: string
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void
  onBlur?: (event: FocusEvent<HTMLSelectElement>) => void
  name?: string
  label: string
  id: string
  placeholder?: string
  disabled?: boolean
  required?: boolean
  className?: string
}

const Dropdown = forwardRef(
  (
    {
      options,
      value,
      onChange,
      onBlur,
      name,
      label,
      id,
      placeholder,
      disabled = false,
      required = false,
      className = ""
    }: DropdownProps,
    ref: ForwardedRef<HTMLSelectElement>
  ) => {
    return (
      <div className={`flex flex-col gap-1 ${className}`}>
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <select
          ref={ref}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          required={required}
          aria-label={label}
          className="block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500">
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    )
  }
)

Dropdown.displayName = "Dropdown"

export default Dropdown
