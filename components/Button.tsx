/* eslint-disable react/button-has-type */
import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  className,
  children,
  disabled,
  type,
}, ref) => (
  <button
    type={type}
    className={twMerge(
      `
        w-full 
        rounded-full 
        bg-green-500
        border
        border-transparent
        px-3 
        py-3 
        disabled:cursor-not-allowed 
        disabled:opacity-50
        text-black
        font-bold
        hover:opacity-75
        transition
      `,
      disabled && 'opacity-75 cursor-not-allowed',
      className,
    )}
    disabled={disabled}
    ref={ref}

  >
    {children}
  </button>
))

Button.displayName = 'Button'

export default Button
