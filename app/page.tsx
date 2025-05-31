import { LoginForm } from "@/components/login-form"
import Image from "next/image"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-4">
            <Image src="/images/resus-logo.jpeg" alt="Resus Logo" width={200} height={60} className="object-contain" />
          </div>
          <p className="text-gray-600 text-lg">Sistema Jurídico de Ressarcimento ao SUS</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
