"use client"

import { useTransition } from "react"

type Props = {
  onSignIn: () => Promise<void>
}

const SignIn = ({ onSignIn }: Props) => {
  const [isPending, startTransition] = useTransition()

  const handleClick = () => {
    startTransition(async () => {
      await onSignIn()
    })
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="w-full bg-resus-blue text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-800 transition-colors disabled:opacity-50"
    >
      {isPending ? "Entrando..." : "Entrar"}
    </button>
  )
}

export default SignIn
