import { MailerSend, EmailParams, Recipient, Sender } from 'mailersend'

export interface ContactFormData {
  name: string
  email: string
  company?: string
  phone?: string
  message: string
  services?: string[]
}

// Initialize MailerSend client
function getMailerSendClient() {
  const apiKey = process.env.MAILERSEND_API_TOKEN
  if (!apiKey) {
    throw new Error('MAILERSEND_API_TOKEN is required')
  }
  return new MailerSend({ apiKey })
}

export async function sendContactEmailWithMailerSend(data: ContactFormData): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    const mailerSend = getMailerSendClient()

    // HTML content for the email
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .header { background: linear-gradient(135deg, #0F172A, #1E293B); color: white; padding: 20px; text-align: center; }
          .content { padding: 30px; background: #f9f9f9; }
          .field { margin-bottom: 20px; }
          .label { font-weight: bold; color: #0F172A; }
          .value { margin-top: 5px; padding: 10px; background: white; border-left: 3px solid #3B82F6; }
          .footer { background: #0F172A; color: white; padding: 20px; text-align: center; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🚀 Nuova Richiesta di Contatto - Maverick AI</h1>
        </div>
        
        <div class="content">
          <h2>Dettagli del Contatto:</h2>
          
          <div class="field">
            <div class="label">Nome Completo:</div>
            <div class="value">${data.name}</div>
          </div>
          
          <div class="field">
            <div class="label">Email:</div>
            <div class="value">${data.email}</div>
          </div>
          
          ${data.company ? `
          <div class="field">
            <div class="label">Azienda:</div>
            <div class="value">${data.company}</div>
          </div>
          ` : ''}
          
          ${data.phone ? `
          <div class="field">
            <div class="label">Telefono:</div>
            <div class="value">${data.phone}</div>
          </div>
          ` : ''}
          
          ${data.services && data.services.length > 0 ? `
          <div class="field">
            <div class="label">Servizi di Interesse:</div>
            <div class="value">${data.services.join(', ')}</div>
          </div>
          ` : ''}
          
          <div class="field">
            <div class="label">Messaggio:</div>
            <div class="value">${data.message.replace(/\n/g, '<br>')}</div>
          </div>
          
          <div class="field">
            <div class="label">Data Invio:</div>
            <div class="value">${new Date().toLocaleString('it-IT', { 
              timeZone: 'Europe/Rome',
              year: 'numeric',
              month: 'long', 
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}</div>
          </div>
        </div>
        
        <div class="footer">
          <p>Questa email è stata inviata automaticamente dal modulo di contatto del sito web Maverick AI.</p>
          <p>Per rispondere, utilizza direttamente l'indirizzo email del mittente: ${data.email}</p>
        </div>
      </body>
      </html>
    `

    // Text content for the email
    const textContent = `
Nuova Richiesta di Contatto - Maverick AI

Nome: ${data.name}
Email: ${data.email}
${data.company ? `Azienda: ${data.company}` : ''}
${data.phone ? `Telefono: ${data.phone}` : ''}
${data.services && data.services.length > 0 ? `Servizi: ${data.services.join(', ')}` : ''}

Messaggio:
${data.message}

Data: ${new Date().toLocaleString('it-IT', { timeZone: 'Europe/Rome' })}
    `

    // Configure sender and recipient
    const sentFrom = new Sender(
      process.env.MAILERSEND_FROM_EMAIL || 'info@maverickai.it',
      'Maverick AI Website'
    )

    const recipients = [
      new Recipient('info@maverickai.it', 'Maverick AI')
    ]

    // Create reply-to for user's email
    const replyTo = new Recipient(data.email, data.name)

    // Create email parameters
    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setReplyTo(replyTo)
      .setSubject(`🚀 Nuova richiesta di contatto da ${data.name}`)
      .setHtml(htmlContent)
      .setText(textContent)

    // Send the email
    const response = await mailerSend.email.send(emailParams)
    
    return {
      success: true,
      messageId: response.body?.messageId || 'sent'
    }
  } catch (error) {
    console.error('MailerSend error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

export async function sendConfirmationEmailWithMailerSend(data: ContactFormData): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    const mailerSend = getMailerSendClient()

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .header { background: linear-gradient(135deg, #3B82F6, #2563EB); color: white; padding: 30px; text-align: center; }
          .content { padding: 30px; }
          .footer { background: #0F172A; color: white; padding: 20px; text-align: center; }
          .button { background: #3B82F6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Grazie per averci contattato!</h1>
          <p>Maverick AI</p>
        </div>
        
        <div class="content">
          <p>Ciao <strong>${data.name}</strong>,</p>
          
          <p>Grazie per il tuo interesse verso <strong>Maverick AI</strong>. Abbiamo ricevuto la tua richiesta e il nostro team ti risponderà entro 24 ore.</p>
          
          <p><strong>Il tuo messaggio:</strong><br>
          <em>"${data.message.substring(0, 200)}${data.message.length > 200 ? '...' : ''}"</em></p>
          
          <p>Nel frattempo, puoi esplorare i nostri servizi e scoprire come l'AI può trasformare il tuo business:</p>
          
          <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://maverickai.it'}" class="button">
            Esplora i Nostri Servizi
          </a>
          
          <p>Se hai domande urgenti, non esitare a contattarci direttamente a <strong>info@maverickai.it</strong>.</p>
          
          <p>Cordiali saluti,<br>
          <strong>Il Team Maverick AI</strong></p>
        </div>
        
        <div class="footer">
          <p>Maverick AI - Partner strategici per la trasformazione digitale</p>
          <p>Questo è un messaggio automatico, non rispondere a questa email.</p>
        </div>
      </body>
      </html>
    `

    const sentFrom = new Sender(
      process.env.MAILERSEND_FROM_EMAIL || 'info@maverickai.it',
      'Maverick AI'
    )

    const recipients = [
      new Recipient(data.email, data.name)
    ]

    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setSubject('Grazie per averci contattato - Maverick AI')
      .setHtml(htmlContent)

    const response = await mailerSend.email.send(emailParams)
    
    return {
      success: true,
      messageId: response.body?.messageId || 'sent'
    }
  } catch (error) {
    console.error('MailerSend confirmation email error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}