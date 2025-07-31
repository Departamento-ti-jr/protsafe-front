"use client"

import { Button } from "@/components/ui/button"

interface SignOutProps {
  onSignOut: () => Promise<void>
}

export default function SignOut({ onSignOut }: SignOutProps) {
  return (
    <form action={onSignOut}>
      <Button
        type="submit"
        variant="ghost"
        className="text-red-500 hover:text-red-600 hover:bg-red-50 font-medium text-sm p-0 h-auto"
      >
        Sair
      </Button>
    </form>
  )
}
