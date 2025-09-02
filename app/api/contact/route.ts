import { NextRequest, NextResponse } from 'next/server'
import { sendContactEmail, sendConfirmationEmail, ContactFormData } from '@/lib/email'
import { z } from 'zod'

// Validation schema for contact form
const contactSchema = z.object({
  name: z.string().min(2, 'Nome deve essere di almeno 2 caratteri').max(100, 'Nome troppo lungo'),
  email: z.string().email('Email non valida'),
  company: z.string().max(100, 'Nome azienda troppo lungo').optional(),
  phone: z.string().max(20, 'Numero di telefono troppo lungo').optional(),
  message: z.string().min(10, 'Messaggio deve essere di almeno 10 caratteri').max(2000, 'Messaggio troppo lungo'),
  services: z.array(z.string()).optional(),
})

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json()
    
    // Validate data
    const validationResult = contactSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json({
        success: false,
        error: 'Dati non validi',
        details: validationResult.error.issues
      }, { status: 400 })
    }

    const data: ContactFormData = validationResult.data

    // Basic rate limiting check (simple IP-based)
    const clientIP = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    console.log(`Contact form submission from IP: ${clientIP}`)

    // Send email to info@maverickai.it
    const emailResult = await sendContactEmail(data)
    
    if (!emailResult.success) {
      console.error('Failed to send contact email:', emailResult.error)
      return NextResponse.json({
        success: false,
        error: 'Errore nell\'invio dell\'email. Riprova più tardi.'
      }, { status: 500 })
    }

    // Send confirmation email to user (optional - don't fail if this fails)
    try {
      await sendConfirmationEmail(data)
    } catch (confirmationError) {
      console.warn('Failed to send confirmation email:', confirmationError)
      // Continue anyway - main email was sent successfully
    }

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Messaggio inviato con successo! Ti risponderemo entro 24 ore.',
      messageId: emailResult.messageId
    })

  } catch (error) {
    console.error('Contact form API error:', error)
    
    return NextResponse.json({
      success: false,
      error: 'Errore interno del server. Riprova più tardi.'
    }, { status: 500 })
  }
}

// Handle OPTIONS for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}