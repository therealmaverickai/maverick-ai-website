import { NextRequest, NextResponse } from 'next/server'
import { testMailerSendConfiguration } from '@/lib/mailersend'

export async function GET(request: NextRequest) {
  try {
    console.log('Testing MailerSend configuration...')
    
    const result = await testMailerSendConfiguration()
    
    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'MailerSend configuration is valid',
        timestamp: new Date().toISOString()
      })
    } else {
      return NextResponse.json({
        success: false,
        error: result.error,
        message: 'MailerSend configuration test failed',
        timestamp: new Date().toISOString()
      }, { status: 500 })
    }
  } catch (error) {
    console.error('MailerSend test endpoint error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      message: 'Failed to test MailerSend configuration',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}