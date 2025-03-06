import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Provjeri je li korisnik autentificiran
  const isAuth = !!session
  const isAuthPage = req.nextUrl.pathname === "/login"

  // Ako korisnik nije autentificiran i pokušava pristupiti zaštićenoj ruti
  if (!isAuth && !isAuthPage) {
    const redirectUrl = req.nextUrl.clone()
    redirectUrl.pathname = "/login"
    redirectUrl.searchParams.set("redirectedFrom", req.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // Ako je korisnik već autentificiran i pokušava pristupiti login stranici
  if (isAuth && isAuthPage) {
    return NextResponse.redirect(new URL("/", req.url))
  }

  return res
}

export const config = {
  matcher: [
    /*
     * Zaštićene rute:
     * - /tasks i sve podrute
     * - /dashboard i sve podrute
     * - /settings i sve podrute
     *
     * Nezaštićene rute:
     * - /login
     * - /auth/callback
     * - /_next
     * - /api
     * - /static
     * - /favicon.ico
     */
    "/tasks/:path*",
    "/dashboard/:path*",
    "/settings/:path*",
    "/login",
  ],
}

