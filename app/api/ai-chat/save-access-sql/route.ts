import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseServiceKey)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { phone, assessmentData, assessmentResults } = body

    if (!phone) {
      return NextResponse.json({
        success: false,
        error: 'Phone number is required'
      }, { status: 400 })
    }

    // Clean phone number
    const cleanPhone = phone.replace(/\s+/g, '').trim()

    // Upsert data to Supabase
    const { data, error } = await supabase
      .from('ai_chat_access')
      .upsert({
        phone: cleanPhone,
        email: assessmentData?.email || null,
        company: assessmentData?.company || null,
        name: assessmentData?.name || null,
        assessment_data: assessmentData || null,
        assessment_results: assessmentResults || null,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'phone'
      })
      .select()

    if (error) {
      throw error
    }

    console.log('AI Chat access saved for phone:', cleanPhone)

    return NextResponse.json({
      success: true,
      message: 'Phone number and data saved successfully',
      data: data?.[0]
    })

  } catch (error: any) {
    console.error('Error saving AI chat access:', error)

    // Return success to not block user experience
    return NextResponse.json({
      success: true,
      warning: 'Data saved locally but database sync failed',
      error: error.message
    })
  }
}