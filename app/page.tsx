import { getLogtoContext } from "@logto/next/server-actions"
import { redirect } from "next/navigation"
import { logtoConfig } from "./logto"
import SignIn from "@/components/sign-in"
import { handleSignIn } from "./actions/auth"
import Image from "next/image"

export default async function Home() {
  const { isAuthenticated } = await getLogtoContext(logtoConfig)

  if (isAuthenticated) {
    redirect("/dashboard")
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-4">
            <Image
              src="/images/LogoReSUS.6fc1138b.png"
              alt="ReSUS Logo"
              width={200}
              height={60}
              className="object-contain"
            />
          </div>
          <p className="text-gray-600 text-lg">Sistema Jurídico de Ressarcimento ao SUS</p>
        </div>

        <div className="bg-white shadow-lg border border-gray-200 rounded-lg p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Bem-vindo</h1>
            <p className="text-gray-600">Entre com suas credenciais para acessar o sistema</p>
          </div>

          <SignIn onSignIn={handleSignIn} />

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">Esqueceu sua senha? Entre em contato com o administrador</p>
          </div>
        </div>
      </div>
    </div>
  )
}
