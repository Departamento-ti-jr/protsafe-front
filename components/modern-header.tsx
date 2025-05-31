"use client"

import { Bell, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Image from "next/image"

export function ModernHeader() {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Image src="/images/resus-logo.jpeg" alt="Resus Logo" width={100} height={32} className="object-contain" />
      </div>

      {/* User Section */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <div className="relative">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5 text-gray-600" />
            <span className="absolute -top-1 -right-1 h-5 w-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </Button>
        </div>

        {/* User Info */}
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-gray-200 text-gray-600">
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">João Silva</p>
            <p className="text-xs text-gray-500">Administrador</p>
          </div>
        </div>
      </div>
    </header>
  )
}
