import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside   //Logic part
export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname

    //made public path
    const isPublicPath = path === "/login" || path === "/signup"  || path === "/verifyEmail" || path === "/forgotPassword"

    const token = request.cookies.get("token")?.value || "";  

    //Only login user should be access the profile section
    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/profile', request.nextUrl))  //nextUrl, <------------just like next(); in mongodb in middleware
    }
    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }

    return

}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        "/",
        "/login",
        "/logout",
        "/signup",
        "/profile",
        "/verifyEmail",
    ]
}