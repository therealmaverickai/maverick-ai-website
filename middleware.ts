import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { isAdminAuthenticated } from '@/lib/auth'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Protect all admin routes except login
  if (pathname.startsWith('/admin')) {
    // Allow access to login page
    if (pathname === '/admin/login') {
      return NextResponse.next()
    }
    
    // Check authentication for all other admin routes
    const isAuthenticated = await isAdminAuthenticated(request)
    console.log(`Auth check for ${pathname}: ${isAuthenticated}`)
    
    if (!isAuthenticated) {
      console.warn(`Unauthorized admin access attempt to ${pathname}`)
      
      // Redirect to login page
      const loginUrl = new URL('/admin/login', request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  // Protect admin API routes
  if (pathname.startsWith('/api/admin/') && !pathname.startsWith('/api/admin/login') && !pathname.startsWith('/api/admin/verify')) {
    if (!(await isAdminAuthenticated(request))) {
      console.warn(`Unauthorized API access attempt to ${pathname}`)
      
      return NextResponse.json(
        { success: false, error: 'Unauthorized access' },
        { status: 401 }
      )
    }
  }

  return NextResponse.next()
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*'
  ]
}