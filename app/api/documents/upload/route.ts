import { NextRequest, NextResponse } from 'next/server'
import { processDocument, DOCUMENT_CONFIG } from '@/lib/document-processing'
import { prisma } from '@/lib/database'

export async function POST(request: NextRequest) {
  try {
    console.log('Document upload request received')
    
    // Parse multipart form data
    const formData = await request.formData()
    const file = formData.get('file') as File
    const companyContext = formData.get('companyContext') as string
    const documentType = formData.get('documentType') as string
    const tags = formData.get('tags') as string
    const createdBy = formData.get('createdBy') as string
    
    if (!file) {
      return NextResponse.json({
        success: false,
        error: 'No file provided'
      }, { status: 400 })
    }
    
    // Validate file
    if (file.size > DOCUMENT_CONFIG.maxFileSize) {
      return NextResponse.json({
        success: false,
        error: 'File size exceeds 10MB limit'
      }, { status: 400 })
    }
    
    if (!DOCUMENT_CONFIG.supportedTypes.includes(file.type)) {
      return NextResponse.json({
        success: false,
        error: 'Unsupported file type. Please upload PDF, DOCX, or TXT files.'
      }, { status: 400 })
    }
    
    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    
    // Prepare metadata
    const metadata = {
      filename: file.name,
      contentType: file.type,
      fileSize: file.size,
      title: file.name.replace(/\\.[^/.]+$/, ''), // Remove extension for title
      companyContext: companyContext ? companyContext.split(',').map(s => s.trim()) : [],
      documentType: documentType || 'general',
      tags: tags ? tags.split(',').map(s => s.trim()) : [],
      createdBy: createdBy || 'system'
    }
    
    console.log(`Processing document: ${metadata.filename} (${metadata.fileSize} bytes)`)
    
    // Process the document
    const result = await processDocument(buffer, metadata)
    
    if (!result.success) {
      return NextResponse.json({
        success: false,
        error: result.error
      }, { status: 500 })
    }
    
    console.log(`Document processed successfully: ${result.documentId}`)
    
    return NextResponse.json({
      success: true,
      message: 'Document uploaded and processed successfully',
      documentId: result.documentId,
      chunksCreated: result.chunksCreated
    })
    
  } catch (error) {
    console.error('Document upload error:', error)
    
    return NextResponse.json({
      success: false,
      error: 'Internal server error during document processing'
    }, { status: 500 })
  }
}

// Get upload configuration and limits
export async function GET() {
  return NextResponse.json({
    config: {
      maxFileSize: DOCUMENT_CONFIG.maxFileSize,
      maxFileSizeMB: DOCUMENT_CONFIG.maxFileSize / (1024 * 1024),
      supportedTypes: DOCUMENT_CONFIG.supportedTypes,
      chunkSize: DOCUMENT_CONFIG.chunkSize,
      embeddingModel: DOCUMENT_CONFIG.embeddingModel
    }
  })
}