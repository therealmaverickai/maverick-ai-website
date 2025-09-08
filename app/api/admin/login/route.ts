import { NextRequest, NextResponse } from 'next/server'
import { validateAdminCredentials, generateAdminToken } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    // Validate input
    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: 'Username and password are required' },
        { status: 400 }
      )
    }

    // Check credentials
    if (!validateAdminCredentials(username, password)) {
      // Log failed login attempt
      console.warn(`Failed admin login attempt for username: ${username}`)
      
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Generate JWT token
    const token = await generateAdminToken(username)
    
    // Log successful login
    console.log(`Successful admin login for username: ${username}`)

    // Create response with token
    const response = NextResponse.json({
      success: true,
      message: 'Login successful',
      token,
      user: { username, role: 'admin' }
    })

    // Set httpOnly cookie for additional security
    response.cookies.set('admin-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax', // Changed from 'strict' to 'lax' for better navigation compatibility
      maxAge: 24 * 60 * 60, // 24 hours
      path: '/'
    })

    return response

  } catch (error) {
    console.error('Admin login error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}