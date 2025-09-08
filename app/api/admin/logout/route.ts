import { NextRequest, NextResponse } from 'next/server'
import { getAdminTokenFromRequest, verifyAdminToken } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const token = getAdminTokenFromRequest(request)
    
    if (token) {
      const user = await verifyAdminToken(token)
      if (user) {
        console.log(`Admin logout for username: ${user.username}`)
      }
    }

    // Create response
    const response = NextResponse.json({
      success: true,
      message: 'Logged out successfully'
    })

    // Clear the httpOnly cookie
    response.cookies.set('admin-token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0, // Expire immediately
      path: '/'
    })

    return response

  } catch (error) {
    console.error('Admin logout error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}