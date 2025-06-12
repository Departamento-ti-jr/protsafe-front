import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-modernize-primary text-white hover:bg-modernize-primary/90 shadow-modernize hover:shadow-modernize-lg",
        destructive: "bg-modernize-error text-white hover:bg-modernize-error/90",
        outline:
          "border border-modernize-gray-300 bg-white text-modernize-gray-700 hover:bg-modernize-gray-50 hover:border-modernize-primary hover:text-modernize-primary",
        secondary: "bg-modernize-gray-100 text-modernize-gray-900 hover:bg-modernize-gray-200",
        ghost: "text-modernize-gray-600 hover:bg-modernize-gray-100 hover:text-modernize-gray-900",
        link: "text-modernize-primary underline-offset-4 hover:underline",
        success: "bg-modernize-success text-white hover:bg-modernize-success/90",
        warning: "bg-modernize-warning text-white hover:bg-modernize-warning/90",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-lg px-3 text-xs",
        lg: "h-12 rounded-xl px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
