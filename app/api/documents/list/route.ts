import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/database'

export async function GET(request: NextRequest) {
  try {
    console.log('Fetching documents list')
    
    const documents = await prisma.document.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        id: true,
        filename: true,
        contentType: true,
        fileSize: true,
        title: true,
        processingStatus: true,
        chunkCount: true,
        companyContext: true,
        documentType: true,
        tags: true,
        createdBy: true,
        createdAt: true,
        updatedAt: true
      }
    })

    console.log(`Found ${documents.length} documents`)

    return NextResponse.json({
      success: true,
      documents: documents.map(doc => ({
        ...doc,
        fileSizeMB: (doc.fileSize / (1024 * 1024)).toFixed(2)
      }))
    })
    
  } catch (error) {
    console.error('Error fetching documents:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch documents'
    }, { status: 500 })
  }
}