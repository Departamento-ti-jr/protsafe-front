import { handleSignOut } from "@/app/actions/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"
import Image from "next/image"

export default function SemPermissaoPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
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
        </div>

        <Card className="shadow-lg border border-red-200">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <AlertTriangle className="h-16 w-16 text-red-500" />
            </div>
            <CardTitle className="text-2xl font-bold text-red-700">Acesso Negado</CardTitle>
            <CardDescription className="text-gray-600">
              Você não tem permissão para acessar este sistema
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-6">
                Seu usuário não possui as permissões necessárias para utilizar o ReSUS. Entre em contato com o
                administrador do sistema para solicitar acesso.
              </p>

              <form action={handleSignOut}>
                <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white">
                  Sair do Sistema
                </Button>
              </form>
            </div>

            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">Para suporte, entre em contato com o administrador</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
