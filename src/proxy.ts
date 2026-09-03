import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/*
|--------------------------------------------------------------------------
| Authentication Routes
|--------------------------------------------------------------------------
|
| Public authentication pages.
| Authenticated users will be redirected away from these pages.
|
*/
const authRoutes = [
    '/auth/login',
    '/auth/forgot-password',
    '/auth/reset-password',
]

/*
|--------------------------------------------------------------------------
| Protected Routes
|--------------------------------------------------------------------------
|
| Routes that require authentication.
| Guests will be redirected to the login page.
|
*/
const protectedRoutes = [
    '/dashboard',
]

/*
|--------------------------------------------------------------------------
| Proxy
|--------------------------------------------------------------------------
|
| Runs before matching routes.
|
| - Redirects guests trying to access protected pages.
| - Redirects authenticated users away from authentication pages.
|
*/
export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl

    /*
    |--------------------------------------------------------------------------
    | Authentication
    |--------------------------------------------------------------------------
    |
    | Read the access token from the authentication cookie.
    |
    */
    const token = request.cookies.get('tenant_access_token')?.value

    /*
    |--------------------------------------------------------------------------
    | Home Route
    |--------------------------------------------------------------------------
    |
    | Redirect the user from the home page.
    |
    | - Guests -> Login
    | - Authenticated users -> Dashboard
    |
    */
    if (pathname === '/') {
        return NextResponse.redirect(new URL(token ? '/dashboard' : '/auth/login', request.url))
    }

    /*
    |--------------------------------------------------------------------------
    | Protected Routes
    |--------------------------------------------------------------------------
    |
    | Redirect guests to the login page when accessing protected routes.
    |
    */
    if (
        protectedRoutes.some(route => pathname.startsWith(route)) &&
        !token
    ) {
        return NextResponse.redirect(new URL('/auth/login', request.url))
    }

    /*
    |--------------------------------------------------------------------------
    | Authentication Routes
    |--------------------------------------------------------------------------
    |
    | Redirect authenticated users away from authentication pages.
    |
    */
    if (
        authRoutes.some(route => pathname.startsWith(route)) &&
        token
    ) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    /*
    |--------------------------------------------------------------------------
    | Continue Request
    |--------------------------------------------------------------------------
    |
    | Allow the request to continue.
    |
    */
    return NextResponse.next()
}

/*
|--------------------------------------------------------------------------
| Route Matcher
|--------------------------------------------------------------------------
|
| Defines the routes that should be processed by the proxy.
|
*/
export const config = {
    matcher: [
        '/',
        '/dashboard/:path*',
        '/auth/:path*',
    ],
}