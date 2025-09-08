import { NextRequest, NextResponse } from 'next/server'
import { getAdminTokenFromRequest, verifyAdminToken } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const token = getAdminTokenFromRequest(request)
    
    if (!token) {
      return NextResponse.json(
        { success: false, error: 'No token provided' },
        { status: 401 }
      )
    }

    const user = await verifyAdminToken(token)
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Invalid or expired token' },
        { status: 401 }
      )
    }

    return NextResponse.json({
      success: true,
      user: {
        username: user.username,
        role: user.role,
        loginTime: user.loginTime
      }
    })

  } catch (error) {
    console.error('Admin token verification error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}