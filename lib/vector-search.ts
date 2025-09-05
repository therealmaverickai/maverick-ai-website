import { createClient } from '@supabase/supabase-js'
import OpenAI from 'openai'
import { generateEmbedding } from './document-processing'

// Vector search configuration
export const SEARCH_CONFIG = {
  defaultSimilarityThreshold: 0.7,
  defaultMaxResults: 5,
  hybridSearchEnabled: true,
  keywordBoostWeight: 0.3,
  semanticWeight: 0.7
}

// Search result interfaces
export interface SearchResult {
  chunkId: string
  documentId: string
  content: string
  similarityScore: number
  metadata: any
  documentTitle: string | null
  documentFilename: string
  chunkIndex: number
  pageNumber: number | null
  sectionTitle: string | null
  keywords: string[]
  entities: string[]
}

export interface HybridSearchResult extends SearchResult {
  keywordScore: number
  combinedScore: number
}

export interface SearchFilters {
  companyFilter?: string
  documentTypeFilter?: string
  similarityThreshold?: number
  maxResults?: number
  dateRange?: {
    from: Date
    to: Date
  }
}

// Initialize Supabase client
const getSupabaseClient = () => {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.warn('Supabase configuration missing - RAG features will be disabled')
    return null
  }
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )
}

// Extract keywords from query
export function extractQueryKeywords(query: string): string[] {
  // Simple keyword extraction - you might want to use more sophisticated NLP
  const keywords = query
    .toLowerCase()
    .replace(/[^a-z0-9\\s]/g, ' ')
    .split(/\\s+/)
    .filter(word => word.length > 2)
    .filter(word => !['the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 'had', 'her', 'was', 'one', 'our', 'out', 'day', 'get', 'has', 'him', 'his', 'how', 'man', 'new', 'now', 'old', 'see', 'two', 'way', 'who'].includes(word))
  
  return Array.from(new Set(keywords)) // Remove duplicates
}

// Semantic search using vector similarity
export async function semanticSearch(
  query: string,
  filters: SearchFilters = {}
): Promise<SearchResult[]> {
  const supabase = getSupabaseClient()
  
  if (!supabase) {
    console.warn('Semantic search unavailable - Supabase not configured')
    return []
  }
  
  try {
    // Generate embedding for the query
    const queryEmbedding = await generateEmbedding(query)
    
    // Call the search RPC function
    const { data, error } = await supabase.rpc('search_documents', {
      query_embedding: queryEmbedding,
      company_filter: filters.companyFilter || null,
      document_type_filter: filters.documentTypeFilter || null,
      similarity_threshold: filters.similarityThreshold || SEARCH_CONFIG.defaultSimilarityThreshold,
      max_results: filters.maxResults || SEARCH_CONFIG.defaultMaxResults
    })
    
    if (error) {
      console.error('Semantic search error:', error)
      throw new Error('Semantic search failed')
    }
    
    return data.map((row: any): SearchResult => ({
      chunkId: row.chunk_id,
      documentId: row.document_id,
      content: row.content,
      similarityScore: row.similarity_score,
      metadata: row.metadata,
      documentTitle: row.document_title,
      documentFilename: row.document_filename,
      chunkIndex: row.chunk_index,
      pageNumber: row.page_number,
      sectionTitle: row.section_title,
      keywords: [], // Will be populated if needed
      entities: []  // Will be populated if needed
    }))
    
  } catch (error) {
    console.error('Semantic search error:', error)
    throw new Error('Semantic search failed')
  }
}

// Hybrid search combining semantic and keyword matching
export async function hybridSearch(
  query: string,
  filters: SearchFilters = {}
): Promise<HybridSearchResult[]> {
  const supabase = getSupabaseClient()
  
  if (!supabase) {
    console.warn('Hybrid search unavailable - Supabase not configured')
    return []
  }
  
  try {
    // Generate embedding for the query
    const queryEmbedding = await generateEmbedding(query)
    const queryKeywords = extractQueryKeywords(query)
    
    // Call the hybrid search RPC function
    const { data, error } = await supabase.rpc('hybrid_search_documents', {
      query_embedding: queryEmbedding,
      query_keywords: queryKeywords,
      company_filter: filters.companyFilter || null,
      similarity_threshold: filters.similarityThreshold || SEARCH_CONFIG.defaultSimilarityThreshold,
      max_results: filters.maxResults || SEARCH_CONFIG.defaultMaxResults
    })
    
    if (error) {
      console.error('Hybrid search error:', error)
      throw new Error('Hybrid search failed')
    }
    
    return data.map((row: any): HybridSearchResult => ({
      chunkId: row.chunk_id,
      documentId: row.document_id,
      content: row.content,
      similarityScore: row.similarity_score,
      keywordScore: row.keyword_score,
      combinedScore: row.combined_score,
      metadata: row.metadata,
      documentTitle: row.document_title,
      documentFilename: row.document_filename,
      chunkIndex: 0, // Will be populated from metadata if needed
      pageNumber: null, // Will be populated from metadata if needed
      sectionTitle: null, // Will be populated from metadata if needed
      keywords: [],
      entities: []
    }))
    
  } catch (error) {
    console.error('Hybrid search error:', error)
    throw new Error('Hybrid search failed')
  }
}

// Context-aware search for AI chat integration
export async function searchForContext(
  userQuery: string,
  companyContext: string,
  conversationHistory: string[] = []
): Promise<SearchResult[]> {
  try {
    // Enhance query with conversation context
    const contextualQuery = enhanceQueryWithContext(userQuery, conversationHistory)
    
    console.log(`Searching for context: "${contextualQuery}" (company: ${companyContext})`)
    
    // Perform hybrid search if enabled, otherwise semantic search
    let results: SearchResult[]
    
    if (SEARCH_CONFIG.hybridSearchEnabled) {
      const hybridResults = await hybridSearch(contextualQuery, {
        companyFilter: companyContext,
        similarityThreshold: 0.75, // Slightly higher threshold for chat context
        maxResults: 3 // Fewer results for chat to avoid overwhelming the prompt
      })
      results = hybridResults.map(result => ({
        chunkId: result.chunkId,
        documentId: result.documentId,
        content: result.content,
        similarityScore: result.combinedScore, // Use combined score
        metadata: result.metadata,
        documentTitle: result.documentTitle,
        documentFilename: result.documentFilename,
        chunkIndex: result.chunkIndex,
        pageNumber: result.pageNumber,
        sectionTitle: result.sectionTitle,
        keywords: result.keywords,
        entities: result.entities
      }))
    } else {
      results = await semanticSearch(contextualQuery, {
        companyFilter: companyContext,
        similarityThreshold: 0.75,
        maxResults: 3
      })
    }
    
    // Post-process results for chat context
    const processedResults = deduplicateAndRank(results)
    
    console.log(`Found ${processedResults.length} relevant context chunks`)
    
    return processedResults
    
  } catch (error) {
    console.error('Context search error:', error)
    return [] // Return empty array instead of throwing to allow chat to continue
  }
}

// Enhance query with conversation context
function enhanceQueryWithContext(
  userQuery: string,
  conversationHistory: string[]
): string {
  // Take last few messages from conversation for context
  const recentContext = conversationHistory.slice(-3).join(' ')
  
  // Combine user query with recent context
  const enhancedQuery = `${userQuery} ${recentContext}`
    .replace(/\\s+/g, ' ')
    .trim()
  
  return enhancedQuery
}

// Remove duplicate results and rank by relevance
function deduplicateAndRank(results: SearchResult[]): SearchResult[] {
  // Remove duplicates based on content similarity
  const unique = results.filter((result, index, arr) => {
    return !arr.slice(0, index).some(prev => 
      calculateContentSimilarity(result.content, prev.content) > 0.8
    )
  })
  
  // Sort by similarity score
  return unique.sort((a, b) => b.similarityScore - a.similarityScore)
}

// Simple content similarity calculation
function calculateContentSimilarity(content1: string, content2: string): number {
  const words1 = new Set(content1.toLowerCase().split(/\\s+/))
  const words2 = new Set(content2.toLowerCase().split(/\\s+/))
  
  const intersection = new Set(Array.from(words1).filter(x => words2.has(x)))
  const union = new Set([...Array.from(words1), ...Array.from(words2)])
  
  return intersection.size / union.size
}

// Format search results for AI prompt injection
export function formatContextForPrompt(results: SearchResult[]): string {
  if (results.length === 0) {
    return ''
  }
  
  const contextSections = results.map((result, index) => {
    const source = result.documentTitle || result.documentFilename
    const pageInfo = result.pageNumber ? ` (pagina ${result.pageNumber})` : ''
    const section = result.sectionTitle ? ` - ${result.sectionTitle}` : ''
    
    return `[FONTE ${index + 1}] Da "${source}"${pageInfo}${section}:
${result.content.trim()}
Rilevanza: ${(result.similarityScore * 100).toFixed(1)}%`
  }).join('\\n\\n')
  
  return `CONTESTO DA DOCUMENTI AZIENDALI:
${contextSections}

---`
}

// Get document statistics for admin dashboard
export async function getDocumentSearchStats(): Promise<any> {
  const supabase = getSupabaseClient()
  
  if (!supabase) {
    // Return mock data when Supabase is not configured
    return {
      total_documents: 0,
      completed_documents: 0,
      total_chunks: 0,
      avg_chunks_per_document: 0,
      document_types: {}
    }
  }
  
  try {
    const { data, error } = await supabase.rpc('get_document_stats')
    
    if (error) {
      console.error('Stats retrieval error:', error)
      return null
    }
    
    return data[0] || null
    
  } catch (error) {
    console.error('Document stats error:', error)
    return null
  }
}

// Test vector search functionality
export async function testVectorSearch(testQuery: string = "cos'è l'intelligenza artificiale"): Promise<void> {
  try {
    console.log('Testing vector search...')
    
    const results = await semanticSearch(testQuery, {
      maxResults: 3,
      similarityThreshold: 0.5
    })
    
    console.log(`Test search results for "${testQuery}":`)
    results.forEach((result, index) => {
      console.log(`${index + 1}. Score: ${result.similarityScore.toFixed(3)} - ${result.content.substring(0, 100)}...`)
    })
    
    console.log('Vector search test completed successfully')
    
  } catch (error) {
    console.error('Vector search test failed:', error)
  }
}