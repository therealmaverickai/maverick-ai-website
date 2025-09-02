import { NextRequest, NextResponse } from 'next/server'
import { getAssessment } from '@/lib/database'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const result = await getAssessment(params.id)

    if (!result.success) {
      return NextResponse.json({
        success: false,
        error: result.error
      }, { status: result.error === 'Assessment not found' ? 404 : 500 })
    }

    return NextResponse.json({
      success: true,
      assessment: result.data
    })

  } catch (error) {
    console.error('Assessment API error:', error)
    
    return NextResponse.json({
      success: false,
      error: 'Errore interno del server'
    }, { status: 500 })
  }
}