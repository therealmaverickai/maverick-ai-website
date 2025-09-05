import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/database'
import { createClient } from '@supabase/supabase-js'

const getSupabaseClient = () => {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.warn('Supabase configuration missing - document chunks cleanup will be disabled')
    return null
  }
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const documentId = searchParams.get('id')
    
    if (!documentId) {
      return NextResponse.json({
        success: false,
        error: 'Document ID is required'
      }, { status: 400 })
    }

    console.log(`Deleting document: ${documentId}`)
    
    // Delete from Supabase vector store first (document_chunks will be auto-deleted due to CASCADE)
    const supabase = getSupabaseClient()
    if (supabase) {
      const { error: supabaseError } = await supabase
        .from('document_chunks')
        .delete()
        .eq('document_id', documentId)
      
      if (supabaseError) {
        console.error('Error deleting from Supabase:', supabaseError)
        // Continue anyway - we'll still delete from Prisma
      } else {
        console.log('Successfully deleted chunks from Supabase')
      }
    }
    
    // Delete from Prisma (this will also handle DocumentChunk if they exist in Prisma)
    const deletedDocument = await prisma.document.delete({
      where: { id: documentId }
    })
    
    console.log(`Successfully deleted document: ${deletedDocument.filename}`)
    
    return NextResponse.json({
      success: true,
      message: `Document "${deletedDocument.filename}" deleted successfully`
    })
    
  } catch (error) {
    console.error('Error deleting document:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to delete document'
    }, { status: 500 })
  }
}