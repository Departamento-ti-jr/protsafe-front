import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { disabledRoutes } from "./app/config/disabled-routes"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (disabledRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next|api|static|.*\\..*).*)"],
}
