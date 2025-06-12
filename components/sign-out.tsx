"use client"

import { useTransition } from "react"

type Props = {
  onSignOut: () => Promise<void>
}

const SignOut = ({ onSignOut }: Props) => {
  const [isPending, startTransition] = useTransition()

  const handleClick = () => {
    startTransition(async () => {
      await onSignOut()
    })
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="flex-1 text-left text-sm font-medium text-modernize-error hover:text-modernize-error/80 transition-colors disabled:opacity-50"
    >
      {isPending ? "Saindo..." : "Sair"}
    </button>
  )
}

export default SignOut
