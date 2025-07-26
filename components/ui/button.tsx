import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-xs font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[#795032] text-white hover:bg-[#795032]/90 shadow-modernize hover:shadow-modernize-lg",
        destructive: "bg-[#C25E3F] text-white hover:bg-[#C25E3F]/90",
        outline:
          "border border-modernize-gray-300 bg-white text-modernize-gray-700 hover:bg-modernize-gray-50 hover:border-[#795032] hover:text-[#795032]",
        secondary: "bg-[#A67C52] text-white hover:bg-[#A67C52]/90",
        ghost: "text-modernize-gray-600 hover:bg-modernize-gray-100 hover:text-modernize-gray-900",
        link: "text-[#795032] underline-offset-4 hover:underline",
        success: "bg-[#5D7F3A] text-white hover:bg-[#5D7F3A]/90",
        warning: "bg-[#D9A566] text-white hover:bg-[#D9A566]/90",
      },
      size: {
        default: "h-8 px-3 py-1.5",
        sm: "h-7 rounded-lg px-2 text-xs",
        lg: "h-10 rounded-xl px-6 text-sm",
        icon: "h-8 w-8",
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
