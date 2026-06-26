interface AuthMeResponse {
  code?: number
  error?: string
  message?: string
  roles?: string[]
}

export async function checkUserPermissions(token: string): Promise<{ hasPermission: boolean; error?: string; roles?: string[] }> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    const data: AuthMeResponse = await response.json()
    if (response.status === 403) {
    
      if (data.code === 403 && data.error === "ROLE_NOT_ALLOWED") {
        return {
          hasPermission: false,
          error: data.message || "Você não tem permissão para acessar este recurso.",
          roles: data.roles,
        }
      }
    }

    if (!response.ok) {
      console.error("Erro na verificação de permissões:", response.status)
      return { hasPermission: false, error: "Erro ao verificar permissões", roles: data.roles }
    }

    return { hasPermission: true, roles: data.roles }
  } catch (error) {
    console.error("Erro ao verificar permissões do usuário:", error)
    return { hasPermission: false, error: "Erro de conexão", roles: undefined }
  }
}
