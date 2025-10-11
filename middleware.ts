// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  exp: number;
  roles?: string[];
}

export function middleware(req: NextRequest) {
  // const token = req.cookies.get("logto_access_token")?.value;

  // if (!token) {
  //   return NextResponse.redirect(new URL("/", req.url));
  // }

  // try {
  //   const decoded = jwtDecode<JwtPayload>(token);
  //   const isExpired = decoded.exp * 1000 < Date.now();

  //   if (isExpired) {
  //     const res = NextResponse.redirect(new URL("/", req.url));
  //     res.cookies.delete("logto_access_token");
  //     return res;
  //   }

  //   // exemplo: bloquear usuários sem ADMIN
  //   // if (!decoded.roles?.includes("ADMIN")) {
  //   //   return NextResponse.redirect(new URL("/sem-permissao", req.url));
  //   // }
  // } catch (err) {
  //   console.error("Erro ao validar token no middleware:", err);
  //   return NextResponse.redirect(new URL("/", req.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api/public|login|sem-permissao|$).*)",
  ],
};