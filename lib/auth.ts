import { NextRequest } from 'next/server'
import { SignJWT, jwtVerify } from 'jose'

const JWT_SECRET = process.env.JWT_SECRET
const ADMIN_USERNAME = process.env.ADMIN_USERNAME
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

if (!JWT_SECRET || !ADMIN_USERNAME || !ADMIN_PASSWORD) {
  throw new Error('Missing required environment variables: JWT_SECRET, ADMIN_USERNAME, ADMIN_PASSWORD')
}

export interface AdminUser {
  username: string
  role: 'admin'
  loginTime: number
}

export function validateAdminCredentials(username: string, password: string): boolean {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD
}

export async function generateAdminToken(username: string): Promise<string> {
  const secret = new TextEncoder().encode(JWT_SECRET)
  
  const jwt = await new SignJWT({
    username,
    role: 'admin',
    loginTime: Date.now()
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(secret)
    
  return jwt
}

export async function verifyAdminToken(token: string): Promise<AdminUser | null> {
  try {
    console.log('Verifying JWT token with secret:', JWT_SECRET ? 'SECRET_PRESENT' : 'NO_SECRET')
    const secret = new TextEncoder().encode(JWT_SECRET)
    
    const { payload } = await jwtVerify(token, secret)
    console.log('JWT verification successful, decoded user:', payload.username)
    
    // Check if token is not too old (24 hours)
    const tokenAge = Date.now() - (payload.loginTime as number)
    if (tokenAge > 24 * 60 * 60 * 1000) {
      console.log('Token expired, age:', tokenAge)
      return null
    }
    
    const user: AdminUser = {
      username: payload.username as string,
      role: payload.role as 'admin',
      loginTime: payload.loginTime as number
    }
    
    console.log('Token verification complete - VALID')
    return user
  } catch (error) {
    console.log('JWT verification failed:', error)
    return null
  }
}

export function getAdminTokenFromRequest(request: NextRequest): string | null {
  // Try to get token from Authorization header
  const authHeader = request.headers.get('authorization')
  if (authHeader && authHeader.startsWith('Bearer ')) {
    console.log('Found token in Authorization header')
    return authHeader.substring(7)
  }
  
  // Try to get token from cookie
  const tokenCookie = request.cookies.get('admin-token')
  if (tokenCookie) {
    console.log('Found token in cookie:', tokenCookie.value.substring(0, 20) + '...')
    return tokenCookie.value
  }
  
  console.log('No token found in request')
  return null
}

export async function isAdminAuthenticated(request: NextRequest): Promise<boolean> {
  const token = getAdminTokenFromRequest(request)
  if (!token) {
    return false
  }
  
  const user = await verifyAdminToken(token)
  return user !== null
}