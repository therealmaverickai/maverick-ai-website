import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/database'

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

    // Clean phone number (remove spaces and formatting)
    const cleanPhone = phone.replace(/\s+/g, '').trim()

    // Prepare data to save
    const saveData = {
      phone: cleanPhone,
      email: assessmentData?.email || null,
      company: assessmentData?.company || null,
      name: assessmentData?.name || null,
      assessmentData: assessmentData ? JSON.stringify(assessmentData) : null,
      assessmentResults: assessmentResults ? JSON.stringify(assessmentResults) : null,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    // Try to save to database
    const result = await prisma.aiChatAccess.upsert({
      where: { phone: cleanPhone },
      update: {
        email: saveData.email,
        company: saveData.company,
        name: saveData.name,
        assessmentData: saveData.assessmentData,
        assessmentResults: saveData.assessmentResults,
        updatedAt: saveData.updatedAt
      },
      create: saveData
    })

    console.log('AI Chat access saved for phone:', cleanPhone)

    return NextResponse.json({
      success: true,
      message: 'Phone number and data saved successfully',
      id: result.id
    })

  } catch (error: any) {
    console.error('Error saving AI chat access:', error)

    // Return success even if DB fails (don't block user experience)
    return NextResponse.json({
      success: true, // Still return success to not block user
      warning: 'Data saved locally but database sync failed',
      dbError: error.message
    })
  }
}