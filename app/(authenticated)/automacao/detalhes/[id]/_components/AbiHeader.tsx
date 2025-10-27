import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Abi } from "@/lib/services/abis.service"

interface AbiHeaderProps {
  abi: Abi
}

export function AbiHeader({ abi }: AbiHeaderProps) {
  return (
    <div className="flex items-center gap-4">
      <Link href="/abis">
        <Button variant="outline" size="icon">
          <ArrowLeft className="h-4 w-4" />
        </Button>
      </Link>
      <div>
        <h1 className="text-2xl font-bold tracking-tight">ABI {abi.numeroABI}</h1>
        <p className="text-sm text-gray-600">Confira os detalhes da ABI "{abi.numeroABI}"</p>
      </div>
    </div>
  )
}
