import { createClient } from '@supabase/supabase-js'
import OpenAI from 'openai'
import { encoding_for_model } from 'tiktoken'
// Dynamic imports to prevent build issues
// import pdfParse from 'pdf-parse'
// import mammoth from 'mammoth'
import { prisma } from './database'

// Document processing configuration
export const DOCUMENT_CONFIG = {
  maxFileSize: 10 * 1024 * 1024, // 10MB
  supportedTypes: ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'],
  chunkSize: 800, // tokens per chunk
  chunkOverlap: 200, // token overlap between chunks
  embeddingModel: 'text-embedding-3-small' as const,
  embeddingDimensions: 1536
}

// Initialize clients
const getSupabaseClient = () => {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('Supabase configuration missing')
  }
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )
}

const getOpenAIClient = () => {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OpenAI API key missing')
  }
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
}

// Document processing interfaces
export interface ProcessingResult {
  success: boolean
  documentId?: string
  chunksCreated?: number
  error?: string
}

export interface DocumentMetadata {
  filename: string
  contentType: string
  fileSize: number
  title?: string
  companyContext?: string[]
  documentType?: string
  tags?: string[]
  createdBy?: string
}

export interface ChunkWithEmbedding {
  content: string
  chunkIndex: number
  tokenCount: number
  embedding: number[]
  metadata: any
  pageNumber?: number
  sectionTitle?: string
  keywords: string[]
  entities: string[]
}

// Text extraction functions
export async function extractTextFromPDF(buffer: Buffer): Promise<{ text: string; pages: number }> {
  try {
    const pdfParse = (await import('pdf-parse')).default
    const data = await pdfParse(buffer)
    return {
      text: data.text,
      pages: data.numpages
    }
  } catch (error) {
    console.error('PDF extraction error:', error)
    throw new Error('Failed to extract text from PDF')
  }
}

export async function extractTextFromDOCX(buffer: Buffer): Promise<{ text: string; pages: number }> {
  try {
    const mammoth = await import('mammoth')
    const result = await mammoth.extractRawText({ buffer })
    return {
      text: result.value,
      pages: Math.ceil(result.value.length / 3000) // Estimate pages
    }
  } catch (error) {
    console.error('DOCX extraction error:', error)
    throw new Error('Failed to extract text from DOCX')
  }
}

export async function extractTextFromTXT(buffer: Buffer): Promise<{ text: string; pages: number }> {
  try {
    const text = buffer.toString('utf-8')
    return {
      text,
      pages: Math.ceil(text.length / 3000) // Estimate pages
    }
  } catch (error) {
    console.error('TXT extraction error:', error)
    throw new Error('Failed to extract text from TXT')
  }
}

// Text chunking with token counting
export function chunkText(text: string, chunkSize: number = DOCUMENT_CONFIG.chunkSize, overlap: number = DOCUMENT_CONFIG.chunkOverlap): string[] {
  const encoding = encoding_for_model('gpt-4')
  const tokens = encoding.encode(text)
  const chunks: string[] = []
  
  let start = 0
  while (start < tokens.length) {
    const end = Math.min(start + chunkSize, tokens.length)
    const chunkTokens = tokens.slice(start, end)
    const chunkText = new TextDecoder().decode(encoding.decode(chunkTokens))
    
    chunks.push(chunkText)
    
    // Move start position with overlap
    start = end - overlap
    if (start >= tokens.length) break
  }
  
  encoding.free()
  return chunks
}

// Token counting utility
export function countTokens(text: string): number {
  const encoding = encoding_for_model('gpt-4')
  const tokens = encoding.encode(text)
  const count = tokens.length
  encoding.free()
  return count
}

// Extract keywords and entities from text (simple implementation)
export function extractKeywordsAndEntities(text: string): { keywords: string[], entities: string[] } {
  // Simple keyword extraction (you might want to use a more sophisticated NLP library)
  const keywords = text
    .toLowerCase()
    .match(/\\b[a-z]{3,}\\b/g) || []
  
  // Remove duplicates and common stop words
  const stopWords = new Set(['the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 'had', 'her', 'was', 'one', 'our', 'out', 'day', 'get', 'has', 'him', 'his', 'how', 'man', 'new', 'now', 'old', 'see', 'two', 'way', 'who', 'boy', 'did', 'its', 'let', 'put', 'say', 'she', 'too', 'use'])
  
  const uniqueKeywords = Array.from(new Set(keywords))
    .filter(word => word.length > 3 && !stopWords.has(word))
    .slice(0, 20) // Limit to top 20 keywords
  
  // Simple entity extraction (capitalized words)
  const entities = text
    .match(/\\b[A-Z][a-z]+(?:\\s+[A-Z][a-z]+)*\\b/g) || []
  
  const uniqueEntities = Array.from(new Set(entities))
    .filter(entity => entity.length > 2)
    .slice(0, 10) // Limit to top 10 entities
  
  return {
    keywords: uniqueKeywords,
    entities: uniqueEntities
  }
}

// Generate embeddings for text chunks
export async function generateEmbedding(text: string): Promise<number[]> {
  const openai = getOpenAIClient()
  
  try {
    const response = await openai.embeddings.create({
      model: DOCUMENT_CONFIG.embeddingModel,
      input: text.replace(/\\n/g, ' ').trim()
    })
    
    return response.data[0].embedding
  } catch (error) {
    console.error('Embedding generation error:', error)
    throw new Error('Failed to generate embedding')
  }
}

// Process document content into chunks with embeddings
export async function processDocumentContent(
  text: string,
  documentId: string,
  metadata: any = {}
): Promise<ChunkWithEmbedding[]> {
  const chunks = chunkText(text)
  const processedChunks: ChunkWithEmbedding[] = []
  
  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i]
    const tokenCount = countTokens(chunk)
    const { keywords, entities } = extractKeywordsAndEntities(chunk)
    
    try {
      const embedding = await generateEmbedding(chunk)
      
      processedChunks.push({
        content: chunk,
        chunkIndex: i,
        tokenCount,
        embedding,
        metadata: {
          ...metadata,
          processingTimestamp: new Date().toISOString()
        },
        keywords,
        entities
      })
      
      // Add small delay to respect rate limits
      await new Promise(resolve => setTimeout(resolve, 100))
      
    } catch (error) {
      console.error(`Failed to process chunk ${i}:`, error)
      // Continue with other chunks even if one fails
    }
  }
  
  return processedChunks
}

// Store document and chunks in database
export async function storeDocumentWithChunks(
  metadata: DocumentMetadata,
  content: string,
  chunks: ChunkWithEmbedding[]
): Promise<ProcessingResult> {
  const supabase = getSupabaseClient()
  
  try {
    // Store document in Prisma
    const document = await prisma.document.create({
      data: {
        filename: metadata.filename,
        contentType: metadata.contentType,
        fileSize: metadata.fileSize,
        title: metadata.title,
        content,
        companyContext: metadata.companyContext || [],
        documentType: metadata.documentType || 'general',
        tags: metadata.tags || [],
        createdBy: metadata.createdBy,
        processingStatus: 'processing',
        chunkCount: chunks.length
      }
    })
    
    // Store chunks directly in Supabase (for vector operations)
    const supabaseChunks = chunks.map(chunk => ({
      id: `chunk_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      document_id: document.id,
      content: chunk.content,
      chunk_index: chunk.chunkIndex,
      token_count: chunk.tokenCount,
      embedding: chunk.embedding,
      metadata: chunk.metadata,
      keywords: chunk.keywords,
      entities: chunk.entities,
      chunk_type: 'content'
    }))
    
    const { error: chunksError } = await supabase
      .from('document_chunks')
      .insert(supabaseChunks)
    
    if (chunksError) {
      console.error('Error storing chunks:', chunksError)
      throw new Error('Failed to store document chunks')
    }
    
    // Update document status to completed
    await prisma.document.update({
      where: { id: document.id },
      data: {
        processingStatus: 'completed'
      }
    })
    
    console.log(`Document processed successfully: ${document.id} with ${chunks.length} chunks`)
    
    return {
      success: true,
      documentId: document.id,
      chunksCreated: chunks.length
    }
    
  } catch (error) {
    console.error('Error storing document:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

// Main document processing function
export async function processDocument(
  file: Buffer,
  metadata: DocumentMetadata
): Promise<ProcessingResult> {
  try {
    console.log(`Starting document processing: ${metadata.filename}`)
    
    // Validate file size
    if (metadata.fileSize > DOCUMENT_CONFIG.maxFileSize) {
      return {
        success: false,
        error: 'File size exceeds maximum limit (10MB)'
      }
    }
    
    // Validate content type
    if (!DOCUMENT_CONFIG.supportedTypes.includes(metadata.contentType)) {
      return {
        success: false,
        error: 'Unsupported file type'
      }
    }
    
    // Extract text based on file type
    let extractedData: { text: string; pages: number }
    
    switch (metadata.contentType) {
      case 'application/pdf':
        extractedData = await extractTextFromPDF(file)
        break
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        extractedData = await extractTextFromDOCX(file)
        break
      case 'text/plain':
        extractedData = await extractTextFromTXT(file)
        break
      default:
        return {
          success: false,
          error: 'Unsupported file type'
        }
    }
    
    if (!extractedData.text.trim()) {
      return {
        success: false,
        error: 'No text content found in document'
      }
    }
    
    console.log(`Extracted ${extractedData.text.length} characters from ${metadata.filename}`)
    
    // Process content into chunks with embeddings
    const chunks = await processDocumentContent(
      extractedData.text,
      '', // Will be set after document creation
      {
        pages: extractedData.pages,
        originalFilename: metadata.filename
      }
    )
    
    if (chunks.length === 0) {
      return {
        success: false,
        error: 'Failed to process document chunks'
      }
    }
    
    // Store document and chunks
    const result = await storeDocumentWithChunks(metadata, extractedData.text, chunks)
    
    return result
    
  } catch (error) {
    console.error('Document processing error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Processing failed'
    }
  }
}