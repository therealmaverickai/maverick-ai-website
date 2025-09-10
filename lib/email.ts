import nodemailer from 'nodemailer'

export interface ContactFormData {
  name: string
  email: string
  company?: string
  phone?: string
  message: string
  services?: string[]
}

// Create transporter based on the email service provider
function createTransporter() {
  // For Gmail (recommended for production)
  if (process.env.EMAIL_SERVICE === 'gmail') {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD, // Use App Password for Gmail
      },
    })
  }

  // For custom SMTP server
  if (process.env.SMTP_HOST) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    })
  }

  // For development - Ethereal Email (fake SMTP)
  return nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'ethereal.user@ethereal.email',
      pass: 'ethereal.pass'
    }
  })
}

export async function sendContactEmail(data: ContactFormData): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    const transporter = createTransporter()

    // Create email template
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

    const mailOptions = {
      from: `"Maverick AI Website" <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
      to: 'info@maverickai.it',
      replyTo: data.email,
      subject: `🚀 Nuova richiesta di contatto da ${data.name}`,
      text: textContent,
      html: htmlContent,
    }

    const result = await transporter.sendMail(mailOptions)
    
    return {
      success: true,
      messageId: result.messageId
    }
  } catch (error) {
    console.error('Email sending error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

// Send confirmation email to the user
export async function sendConfirmationEmail(data: ContactFormData): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    const transporter = createTransporter()

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

    const mailOptions = {
      from: `"Maverick AI" <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
      to: data.email,
      subject: 'Grazie per averci contattato - Maverick AI',
      html: htmlContent,
    }

    const result = await transporter.sendMail(mailOptions)
    
    return {
      success: true,
      messageId: result.messageId
    }
  } catch (error) {
    console.error('Confirmation email error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

// Send admin notification for AI assistant usage
export async function sendAIUsageNotification(leadData: any, message: string, conversationCount: number): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    console.log('🔧 Attempting to send AI usage notification...')
    console.log('📧 Email config check:', {
      EMAIL_SERVICE: process.env.EMAIL_SERVICE ? '✓ Set' : '✗ Missing',
      EMAIL_USER: process.env.EMAIL_USER ? '✓ Set' : '✗ Missing', 
      EMAIL_PASSWORD: process.env.EMAIL_PASSWORD ? '✓ Set' : '✗ Missing',
      EMAIL_FROM: process.env.EMAIL_FROM ? '✓ Set' : '✗ Missing'
    })
    
    const transporter = createTransporter()

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
          .message-box { background-color: #e0f2fe; padding: 15px; border-radius: 6px; border-left: 4px solid #0284c7; margin: 15px 0; }
          .business-info { background-color: #fefce8; padding: 15px; border-radius: 6px; border-left: 4px solid #ca8a04; margin: 15px 0; }
          .footer { background: #0F172A; color: white; padding: 20px; text-align: center; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🤖 AI Assistant - Nuova Conversazione</h1>
          <p>Un utente sta utilizzando il tuo AI Assistant</p>
        </div>
        
        <div class="content">
          <h2>📋 Informazioni Lead:</h2>
          
          <div class="field">
            <div class="label">Azienda:</div>
            <div class="value">${leadData.company}</div>
          </div>
          
          <div class="field">
            <div class="label">Contatto:</div>
            <div class="value">${leadData.fullName} (${leadData.email})</div>
          </div>
          
          <div class="field">
            <div class="label">Ruolo:</div>
            <div class="value">${leadData.jobRole}</div>
          </div>
          
          <div class="field">
            <div class="label">Settore:</div>
            <div class="value">${leadData.industry}</div>
          </div>
          
          <div class="field">
            <div class="label">Dimensione Azienda:</div>
            <div class="value">${leadData.companySize}</div>
          </div>

          <h2>💬 Dettagli Conversazione:</h2>
          
          <div class="field">
            <div class="label">Numero Messaggi:</div>
            <div class="value">${conversationCount} messaggi totali</div>
          </div>
          
          <div class="field">
            <div class="label">Ultima Domanda:</div>
            <div class="message-box">
              "${message.length > 300 ? message.substring(0, 300) + '...' : message}"
            </div>
          </div>

          <h2>🏢 Descrizione Business:</h2>
          <div class="business-info">
            ${leadData.businessDescription}
          </div>
          
          <div class="field">
            <div class="label">Data e Ora:</div>
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
          <p>Questa notifica è stata inviata automaticamente dall'AI Assistant di Maverick AI.</p>
          <p><strong>Lead potenzialmente qualificato!</strong> Considera di contattare direttamente: ${leadData.email}</p>
        </div>
      </body>
      </html>
    `

    const textContent = `
🤖 AI Assistant - Nuova Conversazione

INFORMAZIONI LEAD:
Azienda: ${leadData.company}
Contatto: ${leadData.fullName} (${leadData.email})
Ruolo: ${leadData.jobRole}
Settore: ${leadData.industry}
Dimensione: ${leadData.companySize}

CONVERSAZIONE:
Messaggi: ${conversationCount}
Ultima domanda: "${message.substring(0, 200)}${message.length > 200 ? '...' : ''}"

BUSINESS:
${leadData.businessDescription}

Data: ${new Date().toLocaleString('it-IT', { timeZone: 'Europe/Rome' })}
    `

    const mailOptions = {
      from: `"Maverick AI Assistant" <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
      to: 'info@maverickai.it',
      subject: `🤖 AI Assistant Usage - ${leadData.company} (${conversationCount} messaggi)`,
      text: textContent,
      html: htmlContent,
    }

    console.log('📬 Sending email to:', mailOptions.to)
    console.log('📄 Subject:', mailOptions.subject)
    
    const result = await transporter.sendMail(mailOptions)
    
    console.log('✅ Email sent successfully! Message ID:', result.messageId)
    return {
      success: true,
      messageId: result.messageId
    }
  } catch (error) {
    console.error('❌ AI usage notification error:', error)
    console.error('Error details:', {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : 'No stack trace'
    })
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}