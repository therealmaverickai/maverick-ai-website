import { NextRequest, NextResponse } from 'next/server'
import { sendDetailedReportRequestToAdmin } from '@/lib/mailersend'
import { z } from 'zod'

// Validation schema for detailed report request
const detailedReportRequestSchema = z.object({
  userEmail: z.string().email('Email non valida'),
  userName: z.string().min(1, 'Nome deve essere specificato'),
  userRole: z.string().min(1, 'Ruolo deve essere specificato'),
  userCompany: z.string().min(1, 'Società deve essere specificata'),
  assessmentScore: z.number(),
  assessmentCluster: z.string(),
  requestedAt: z.string()
})

export async function POST(request: NextRequest) {
  try {
    console.log('Processing detailed report request')
    
    // Parse request body
    const body = await request.json()
    console.log('Received detailed report request data:', JSON.stringify(body, null, 2))
    
    // Validate data
    const validationResult = detailedReportRequestSchema.safeParse(body)
    if (!validationResult.success) {
      console.error('Validation failed:')
      console.error('Errors:', validationResult.error.errors)
      
      return NextResponse.json({
        success: false,
        error: 'Alcuni campi non sono stati compilati correttamente',
        details: validationResult.error.errors
      }, { status: 400 })
    }

    const data = validationResult.data

    // Send admin notification email
    console.log('Sending admin notification for detailed report request by:', data.userEmail)
    
    try {
      const emailResult = await sendDetailedReportRequestToAdmin(data)

      if (!emailResult.success) {
        console.error('Failed to send admin notification:', emailResult.error)
        return NextResponse.json({
          success: false,
          error: 'Errore nell\'invio della richiesta. Riprova più tardi.'
        }, { status: 500 })
      } else {
        console.log('Admin notification sent successfully:', emailResult.messageId)
        
        return NextResponse.json({
          success: true,
          message: 'Richiesta inviata con successo! Riceverai il report dettagliato entro 1 giorno lavorativo.'
        })
      }
    } catch (emailError) {
      console.error('Error sending admin notification:', emailError)
      return NextResponse.json({
        success: false,
        error: 'Errore nell\'invio della richiesta. Riprova più tardi.'
      }, { status: 500 })
    }

  } catch (error) {
    console.error('Detailed Report Request API error:', error)
    
    return NextResponse.json({
      success: false,
      error: 'Errore interno del server. Riprova più tardi.'
    }, { status: 500 })
  }
}