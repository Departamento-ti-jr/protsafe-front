import { Bell, Search, Settings, MessageSquare, Calendar, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { getLogtoContext } from "@logto/next/server-actions"
import { logtoConfig } from "@/app/logto"

export async function ModernHeader() {
  let userInfo = { name: "Usuário", email: "" }

  try {
    const { claims } = await getLogtoContext(logtoConfig)
    userInfo = {
      name: claims?.name || claims?.given_name || claims?.username || "Usuário",
      email: claims?.email || "",
    }
  } catch (error) {
    console.error("Erro ao obter informações do usuário:", error)
  }

  return (
    <header className="h-16 bg-white border-b border-modernize-gray-200 flex items-center justify-between px-6 shadow-sm">
      {/* Left Section - Search */}
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-modernize-gray-400" />
          <Input
            placeholder="Buscar no sistema..."
            className="pl-10 border-modernize-gray-200 focus:border-modernize-primary focus:ring-modernize-primary bg-modernize-gray-50"
          />
        </div>
      </div>

      {/* Right Section - Actions and User */}
      <div className="flex items-center gap-3">
        {/* Quick Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative hover:bg-modernize-gray-50">
            <MessageSquare className="h-5 w-5 text-modernize-gray-600" />
          </Button>

          <Button variant="ghost" size="icon" className="relative hover:bg-modernize-gray-50">
            <Calendar className="h-5 w-5 text-modernize-gray-600" />
          </Button>

          <Button variant="ghost" size="icon" className="relative hover:bg-modernize-gray-50">
            <Mail className="h-5 w-5 text-modernize-gray-600" />
          </Button>
        </div>

        <div className="w-px h-6 bg-modernize-gray-200"></div>

        {/* Notifications */}
        <div className="relative">
          <Button variant="ghost" size="icon" className="relative hover:bg-modernize-gray-50">
            <Bell className="h-5 w-5 text-modernize-gray-600" />
            <span className="absolute -top-1 -right-1 h-5 w-5 bg-modernize-error text-white text-xs rounded-full flex items-center justify-center font-medium">
              3
            </span>
          </Button>
        </div>

        {/* Settings */}
        <Button variant="ghost" size="icon" className="hover:bg-modernize-gray-50">
          <Settings className="h-5 w-5 text-modernize-gray-600" />
        </Button>

        <div className="w-px h-6 bg-modernize-gray-200"></div>

        {/* User Profile */}
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9 border-2 border-modernize-primary/20">
            <AvatarFallback className="bg-gradient-to-r from-modernize-primary to-modernize-secondary text-white font-medium">
              {userInfo.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="text-right">
            <p className="text-sm font-semibold text-modernize-gray-800">{userInfo.name}</p>
            <p className="text-xs text-modernize-gray-500">Administrador</p>
          </div>
        </div>
      </div>
    </header>
  )
}
