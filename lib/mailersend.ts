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
  console.log('MailerSend: Environment variables check:')
  console.log('- MAILERSEND_API_TOKEN exists:', !!apiKey)
  console.log('- MAILERSEND_FROM_EMAIL:', process.env.MAILERSEND_FROM_EMAIL)
  console.log('- API Token format check:', apiKey ? (apiKey.startsWith('mlsn.') ? 'Valid format' : 'Invalid format - should start with mlsn.') : 'No token')
  
  if (!apiKey) {
    throw new Error('MAILERSEND_API_TOKEN is required')
  }
  
  if (!apiKey.startsWith('mlsn.')) {
    console.warn('MailerSend: API token might be invalid - should start with "mlsn."')
  }
  
  try {
    const client = new MailerSend({ apiKey })
    console.log('MailerSend: Client created successfully')
    return client
  } catch (error) {
    console.error('MailerSend: Failed to create client:', error)
    throw error
  }
}

export async function sendContactEmailWithMailerSend(data: ContactFormData): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    console.log('MailerSend: Starting fresh email send process')
    console.log('MailerSend: API Token exists:', !!process.env.MAILERSEND_API_TOKEN)
    console.log('MailerSend: From email env var:', process.env.MAILERSEND_FROM_EMAIL)
    console.log('MailerSend: Using from email:', process.env.MAILERSEND_FROM_EMAIL || 'federico.thiella@maverickai.it')
    console.log('MailerSend: API Token value:', process.env.MAILERSEND_API_TOKEN ? `${process.env.MAILERSEND_API_TOKEN.substring(0, 10)}...` : 'undefined')
    
    const mailerSendClient = getMailerSendClient()
    console.log('MailerSend: Client initialized successfully')

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

    // Configure sender - use verified domain email
    // Since maverickai.it domain is verified, use federico.thiella@maverickai.it
    const fromEmail = process.env.MAILERSEND_FROM_EMAIL || 'federico.thiella@maverickai.it'
    const sentFrom = new Sender(fromEmail, 'Maverick AI Website')

    // For trial accounts, MailerSend requires sending to administrator email
    // Change this to the email you used to register your MailerSend account
    const recipients = [
      new Recipient(process.env.MAILERSEND_ADMIN_EMAIL || 'federico.thiella@maverickai.it', 'Maverick AI Admin')
    ]

    // Create reply-to for user's email
    const replyTo = new Recipient(data.email, data.name)

    // Create email parameters
    console.log('MailerSend: Creating email params...')
    console.log('MailerSend: Sender:', sentFrom)
    console.log('MailerSend: Recipients:', recipients)
    console.log('MailerSend: Reply-to:', replyTo)
    
    // Build email parameters step by step
    const mailParams = new EmailParams()
    mailParams.setFrom(sentFrom)
    mailParams.setTo(recipients) 
    mailParams.setReplyTo(replyTo)
    mailParams.setSubject(`🚀 Nuova richiesta di contatto da ${data.name}`)
    mailParams.setHtml(htmlContent)
    mailParams.setText(textContent)
      
    console.log('MailerSend: Email params built successfully')

    // Send the email
    console.log('MailerSend: Attempting to send email...')
    console.log('MailerSend: Email params before sending:', JSON.stringify({
      from: mailParams.from,
      to: mailParams.to,
      replyTo: mailParams.reply_to,
      subject: mailParams.subject
    }, null, 2))
    
    const emailResponse = await mailerSendClient.email.send(mailParams)
    console.log('MailerSend: Email sent successfully')
    console.log('MailerSend: Response:', emailResponse)
    console.log('MailerSend: Message ID:', emailResponse.body?.messageId)
    
    return {
      success: true,
      messageId: emailResponse.body?.messageId || 'sent'
    }
  } catch (error: any) {
    console.error('MailerSend error occurred:', error)
    console.error('MailerSend error type:', typeof error)
    console.error('MailerSend error message:', error instanceof Error ? error.message : 'Unknown error')
    
    // Check for specific MailerSend API errors
    if (error.response) {
      console.error('MailerSend API response error:', error.response.status)
      console.error('MailerSend API response data:', error.response.data)
      console.error('MailerSend API response headers:', error.response.headers)
    } else if (error.request) {
      console.error('MailerSend API request error (no response):', error.request)
    }
    
    console.error('MailerSend error full object:', JSON.stringify(error, null, 2))
    
    // Provide specific error messages for common issues
    let errorMessage = 'Unknown error'
    if (error.statusCode === 401) {
      errorMessage = 'Invalid MailerSend API token'
    } else if (error.statusCode === 422) {
      if (error.body?.message?.includes('Trial accounts')) {
        errorMessage = 'MailerSend trial account limitation - emails can only be sent to administrator email'
      } else if (error.body?.message?.includes('domain must be verified')) {
        errorMessage = 'MailerSend domain verification required - please verify your sending domain'
      } else {
        errorMessage = 'MailerSend validation error - ' + (error.body?.message || 'check configuration')
      }
    } else if (error.statusCode === 429) {
      errorMessage = 'MailerSend rate limit exceeded'
    } else if (error instanceof Error) {
      errorMessage = error.message
    } else if (error.body?.message) {
      errorMessage = error.body.message
    }
    
    return {
      success: false,
      error: errorMessage
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
      process.env.MAILERSEND_FROM_EMAIL || 'federico.thiella@maverickai.it',
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

export async function sendAssessmentNotificationToAdmin(assessmentData: any): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    console.log('MailerSend: Starting admin notification for new assessment')
    console.log('MailerSend: User:', assessmentData.email)
    console.log('MailerSend: Company:', assessmentData.company)
    
    const mailerSendClient = getMailerSendClient()
    console.log('MailerSend: Client initialized successfully for admin notification')

    // Simple HTML content for admin notification
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .header { background: linear-gradient(135deg, #0F172A, #1E293B); color: white; padding: 20px; text-align: center; }
          .content { padding: 30px; background: #f9f9f9; }
          .notification { background: white; border-radius: 10px; padding: 20px; margin: 20px 0; border-left: 5px solid #f59e0b; }
          .data { background: #f8f9fa; border-radius: 8px; padding: 15px; margin: 15px 0; }
          .footer { background: #0F172A; color: white; padding: 20px; text-align: center; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🔔 Nuovo AI Assessment Completato</h1>
          <p>Maverick AI - Notifica Admin</p>
        </div>
        
        <div class="content">
          <div class="notification">
            <h2>📋 Un nuovo utente ha completato l'AI Assessment</h2>
            
            <div class="data">
              <h3>👤 Informazioni Contatto</h3>
              <p><strong>Nome:</strong> ${assessmentData.name}</p>
              <p><strong>Email:</strong> ${assessmentData.email}</p>
              <p><strong>Ruolo:</strong> ${assessmentData.role}</p>
              <p><strong>Società:</strong> ${assessmentData.company}</p>
              ${assessmentData.website ? `<p><strong>Sito web:</strong> ${assessmentData.website}</p>` : ''}
            </div>
            
            <div class="data">
              <h3>📊 Risultati Assessment</h3>
              <p><strong>Punteggio:</strong> ${assessmentData.assessment.score}% - ${assessmentData.assessment.cluster}</p>
              <p><strong>Data:</strong> ${new Date().toLocaleDateString('it-IT')} alle ${new Date().toLocaleTimeString('it-IT')}</p>
            </div>
            
            <div class="data">
              <h3>🎯 Highlights</h3>
              <p><strong>Visione AI:</strong> ${assessmentData.aiVisionClarity}/5</p>
              <p><strong>Vantaggio Competitivo:</strong> ${assessmentData.competitiveAdvantage}/5</p>
              <p><strong>Utilizzo Dipendenti:</strong> ${assessmentData.employeeUsage}/5</p>
              <p><strong>Utilizzo Management:</strong> ${assessmentData.managementUsage}/5</p>
            </div>
            
            <div style="background: #e3f2fd; border-radius: 8px; padding: 15px; margin: 20px 0;">
              <h4>⚡ Azione Richiesta</h4>
              <p>Considera di contattare <strong>${assessmentData.name}</strong> presso <strong>${assessmentData.company}</strong> per una consulenza personalizzata.</p>
              <p><strong>Email di contatto:</strong> ${assessmentData.email}</p>
            </div>
          </div>
        </div>
        
        <div class="footer">
          <p>Maverick AI - Sistema di notifica automatico</p>
        </div>
      </body>
      </html>
    `

    // Text content for the admin notification
    const textContent = `
Nuovo AI Assessment Completato - Notifica Admin

Un nuovo utente ha completato l'AI Assessment:

INFORMAZIONI CONTATTO:
- Nome: ${assessmentData.name}
- Email: ${assessmentData.email}
- Ruolo: ${assessmentData.role}
- Società: ${assessmentData.company}
${assessmentData.website ? `- Sito web: ${assessmentData.website}` : ''}

RISULTATI ASSESSMENT:
- Punteggio: ${assessmentData.assessment.score}% - ${assessmentData.assessment.cluster}
- Data: ${new Date().toLocaleDateString('it-IT')} alle ${new Date().toLocaleTimeString('it-IT')}

HIGHLIGHTS:
- Visione AI: ${assessmentData.aiVisionClarity}/5
- Vantaggio Competitivo: ${assessmentData.competitiveAdvantage}/5
- Utilizzo Dipendenti: ${assessmentData.employeeUsage}/5
- Utilizzo Management: ${assessmentData.managementUsage}/5

AZIONE RICHIESTA:
Considera di contattare ${assessmentData.name} presso ${assessmentData.company} per una consulenza personalizzata.

Maverick AI - Sistema di notifica automatico
    `

    // Configure sender and recipient - always send to admin
    const fromEmail = process.env.MAILERSEND_FROM_EMAIL || 'federico.thiella@maverickai.it'
    const sentFrom = new Sender(fromEmail, 'Maverick AI System')

    const recipients = [
      new Recipient(
        process.env.MAILERSEND_ADMIN_EMAIL || 'federico.thiella@maverickai.it',
        'Maverick AI Admin'
      )
    ]

    // Build email parameters step by step
    const mailParams = new EmailParams()
    mailParams.setFrom(sentFrom)
    mailParams.setTo(recipients)
    mailParams.setSubject(`🔔 Nuovo AI Assessment: ${assessmentData.name} (${assessmentData.company})`)
    mailParams.setHtml(htmlContent)
    mailParams.setText(textContent)
      
    console.log('MailerSend: Assessment email params built successfully')

    // Send the email
    console.log('MailerSend: Attempting to send assessment results email...')
    
    const emailResponse = await mailerSendClient.email.send(mailParams)
    console.log('MailerSend: Assessment email sent successfully')
    console.log('MailerSend: Response:', emailResponse)
    console.log('MailerSend: Message ID:', emailResponse.body?.messageId)
    
    return {
      success: true,
      messageId: emailResponse.body?.messageId || 'sent'
    }
  } catch (error: any) {
    console.error('MailerSend assessment email error occurred:', error)
    console.error('MailerSend error type:', typeof error)
    console.error('MailerSend error message:', error instanceof Error ? error.message : 'Unknown error')
    
    // Check for specific MailerSend API errors
    if (error.response) {
      console.error('MailerSend API response error:', error.response.status)
      console.error('MailerSend API response data:', error.response.data)
      console.error('MailerSend API response headers:', error.response.headers)
    } else if (error.request) {
      console.error('MailerSend API request error (no response):', error.request)
    }
    
    console.error('MailerSend error full object:', JSON.stringify(error, null, 2))
    
    // Provide specific error messages for common issues
    let errorMessage = 'Unknown error'
    if (error.statusCode === 401) {
      errorMessage = 'Invalid MailerSend API token'
    } else if (error.statusCode === 422) {
      if (error.body?.message?.includes('Trial accounts')) {
        errorMessage = 'MailerSend trial account limitation - emails can only be sent to administrator email'
      } else if (error.body?.message?.includes('domain must be verified')) {
        errorMessage = 'MailerSend domain verification required - please verify your sending domain'
      } else {
        errorMessage = 'MailerSend validation error - ' + (error.body?.message || 'check configuration')
      }
    } else if (error.statusCode === 429) {
      errorMessage = 'MailerSend rate limit exceeded'
    } else if (error instanceof Error) {
      errorMessage = error.message
    } else if (error.body?.message) {
      errorMessage = error.body.message
    }
    
    return {
      success: false,
      error: errorMessage
    }
  }
}

// Send admin notification for detailed report request
export async function sendDetailedReportRequestToAdmin(requestData: any): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    console.log('MailerSend: Starting admin notification for detailed report request')
    console.log('MailerSend: User:', requestData.userEmail)
    console.log('MailerSend: Company:', requestData.userCompany)
    
    const mailerSendClient = getMailerSendClient()
    console.log('MailerSend: Client initialized successfully for detailed report request')

    // Simple HTML content for admin notification
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .header { background: linear-gradient(135deg, #059669, #10b981); color: white; padding: 20px; text-align: center; }
          .content { padding: 30px; background: #f9f9f9; }
          .notification { background: white; border-radius: 10px; padding: 20px; margin: 20px 0; border-left: 5px solid #059669; }
          .data { background: #f8f9fa; border-radius: 8px; padding: 15px; margin: 15px 0; }
          .urgent { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 15px 0; border-radius: 8px; }
          .footer { background: #059669; color: white; padding: 20px; text-align: center; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>📄 Richiesta Report Dettagliato</h1>
          <p>Maverick AI - Notifica Admin</p>
        </div>
        
        <div class="content">
          <div class="notification">
            <h2>📋 Un utente ha richiesto il report dettagliato</h2>
            
            <div class="urgent">
              <h3>⚡ Azione Richiesta</h3>
              <p><strong>Consegna:</strong> Entro 1 giorno lavorativo</p>
              <p><strong>Tipo:</strong> Report completo e dettagliato dell'AI Assessment</p>
            </div>
            
            <div class="data">
              <h3>👤 Informazioni Utente</h3>
              <p><strong>Nome:</strong> ${requestData.userName}</p>
              <p><strong>Email:</strong> ${requestData.userEmail}</p>
              <p><strong>Ruolo:</strong> ${requestData.userRole}</p>
              <p><strong>Società:</strong> ${requestData.userCompany}</p>
            </div>
            
            <div class="data">
              <h3>📊 Risultati Assessment Originale</h3>
              <p><strong>Punteggio:</strong> ${requestData.assessmentScore}%</p>
              <p><strong>Cluster:</strong> ${requestData.assessmentCluster}</p>
              <p><strong>Data Richiesta:</strong> ${new Date(requestData.requestedAt).toLocaleDateString('it-IT')} alle ${new Date(requestData.requestedAt).toLocaleTimeString('it-IT')}</p>
            </div>
            
            <div class="data">
              <h3>📝 Cosa Includere nel Report</h3>
              <ul>
                <li><strong>Analisi approfondita:</strong> Dettagli per ogni area dell'assessment</li>
                <li><strong>Raccomandazioni mirate:</strong> Specifiche per il settore e la realtà aziendale</li>
                <li><strong>Strategie di implementazione:</strong> Piani concreti e actionable</li>
                <li><strong>Roadmap personalizzata:</strong> Timeline e priorità per la trasformazione AI</li>
                <li><strong>Benchmark di settore:</strong> Confronto con aziende simili</li>
                <li><strong>ROI e metriche:</strong> Come misurare il successo</li>
              </ul>
            </div>
            
            <div style="background: #dc2626; color: white; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: center;">
              <h3>⏰ REMINDER: Deadline 1 Giorno Lavorativo</h3>
              <p>Il report deve essere preparato e inviato a <strong>${requestData.userEmail}</strong></p>
            </div>
          </div>
        </div>
        
        <div class="footer">
          <p>Maverick AI - Sistema di Notifiche Admin</p>
          <p>📧 ${requestData.userEmail} | 🏢 ${requestData.userCompany}</p>
        </div>
      </body>
      </html>
    `

    // Email configuration
    const fromEmail = process.env.MAILERSEND_FROM_EMAIL || 'federico.thiella@maverickai.it'
    const adminEmail = process.env.MAILERSEND_ADMIN_EMAIL || 'federico.thiella@maverickai.it'

    const sentFrom = new Sender(fromEmail, 'Maverick AI Sistema')
    const recipients = [new Recipient(adminEmail, 'Admin Maverick AI')]

    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setSubject(`🔥 URGENTE: Richiesta Report Dettagliato - ${requestData.userCompany}`)
      .setHtml(htmlContent)

    console.log('MailerSend: Sending detailed report request notification...')
    const response = await mailerSendClient.email.send(emailParams)
    
    console.log('MailerSend: Response received:', response.body)
    
    if (response.statusCode === 202) {
      console.log('MailerSend: Detailed report request notification sent successfully')
      return {
        success: true,
        messageId: response.body?.message_id || 'unknown'
      }
    } else {
      console.error('MailerSend: Unexpected status code:', response.statusCode)
      return {
        success: false,
        error: `Unexpected status code: ${response.statusCode}`
      }
    }

  } catch (error) {
    console.error('MailerSend detailed report request notification error:', error)
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error('MailerSend: Error details:', errorMessage)
    
    return {
      success: false,
      error: errorMessage
    }
  }
}

// Send admin notification for AI assistant usage via MailerSend
export async function sendAIUsageNotificationWithMailerSend(leadData: any, message: string, conversationCount: number): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    console.log('🔧 MailerSend: Attempting to send AI usage notification...')
    console.log('📧 MailerSend config check:', {
      MAILERSEND_API_TOKEN: process.env.MAILERSEND_API_TOKEN ? '✓ Set' : '✗ Missing',
      MAILERSEND_FROM_EMAIL: process.env.MAILERSEND_FROM_EMAIL ? '✓ Set' : '✗ Missing',
      MAILERSEND_ADMIN_EMAIL: process.env.MAILERSEND_ADMIN_EMAIL ? '✓ Set' : '✗ Missing'
    })
    
    const mailerSendClient = getMailerSendClient()
    console.log('MailerSend: Client initialized successfully for AI usage notification')

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

    // Configure sender and recipient using MailerSend
    const fromEmail = process.env.MAILERSEND_FROM_EMAIL || 'federico.thiella@maverickai.it'
    const sentFrom = new Sender(fromEmail, 'Maverick AI Assistant')

    const recipients = [
      new Recipient(
        process.env.MAILERSEND_ADMIN_EMAIL || 'federico.thiella@maverickai.it',
        'Maverick AI Admin'
      )
    ]

    // Build email parameters
    const mailParams = new EmailParams()
    mailParams.setFrom(sentFrom)
    mailParams.setTo(recipients)
    mailParams.setSubject(`🤖 AI Assistant Usage - ${leadData.company} (${conversationCount} messaggi)`)
    mailParams.setHtml(htmlContent)
    mailParams.setText(textContent)
      
    console.log('📬 MailerSend: Sending AI usage email to:', recipients[0].email)
    console.log('📄 MailerSend: Subject:', mailParams.subject)

    // Send the email using MailerSend
    const emailResponse = await mailerSendClient.email.send(mailParams)
    
    console.log('✅ MailerSend: AI usage email sent successfully! Message ID:', emailResponse.body?.messageId)
    return {
      success: true,
      messageId: emailResponse.body?.messageId || 'sent'
    }
  } catch (error: any) {
    console.error('❌ MailerSend AI usage notification error:', error)
    console.error('Error details:', {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : 'Unknown error',
      statusCode: error.statusCode || 'No status code'
    })

    // Specific error handling for MailerSend
    let errorMessage = 'Unknown error'
    if (error.statusCode === 401) {
      errorMessage = 'Invalid MailerSend API token'
    } else if (error.statusCode === 422) {
      if (error.body?.message?.includes('Trial accounts')) {
        errorMessage = 'MailerSend trial account limitation - emails can only be sent to administrator email'
      } else if (error.body?.message?.includes('domain must be verified')) {
        errorMessage = 'MailerSend domain verification required - please verify your sending domain'
      } else {
        errorMessage = 'MailerSend validation error - ' + (error.body?.message || 'check configuration')
      }
    } else if (error.statusCode === 429) {
      errorMessage = 'MailerSend rate limit exceeded'
    } else if (error instanceof Error) {
      errorMessage = error.message
    } else if (error.body?.message) {
      errorMessage = error.body.message
    }

    return {
      success: false,
      error: errorMessage
    }
  }
}

// Test function to validate MailerSend configuration
export async function testMailerSendConfiguration(): Promise<{ success: boolean; error?: string }> {
  try {
    console.log('MailerSend: Testing configuration...')
    const client = getMailerSendClient()
    console.log('MailerSend: Client initialized successfully for test')
    
    // Test with a simple email setup (don't send, just validate)
    const sentFrom = new Sender(
      process.env.MAILERSEND_FROM_EMAIL || 'federico.thiella@maverickai.it',
      'Maverick AI Test'
    )
    
    const recipients = [
      new Recipient('test@example.com', 'Test User')
    ]
    
    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setSubject('Configuration Test')
      .setHtml('<p>This is a test email</p>')
    
    console.log('MailerSend: Email params created successfully for test')
    console.log('MailerSend: Configuration appears valid')
    
    return { success: true }
  } catch (error: any) {
    console.error('MailerSend: Configuration test failed:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Configuration test failed'
    }
  }
}