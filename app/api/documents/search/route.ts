import { NextRequest, NextResponse } from 'next/server'
import { semanticSearch, hybridSearch, getDocumentSearchStats } from '@/lib/vector-search'
import { z } from 'zod'

// Validation schema for search requests
const searchRequestSchema = z.object({
  query: z.string().min(1, 'Query cannot be empty'),
  companyFilter: z.string().optional(),
  documentTypeFilter: z.string().optional(),
  similarityThreshold: z.number().min(0).max(1).optional().default(0.7),
  maxResults: z.number().min(1).max(20).optional().default(5),
  searchType: z.enum(['semantic', 'hybrid']).optional().default('hybrid')
})

export async function POST(request: NextRequest) {
  try {
    console.log('Document search request received')
    
    // Parse and validate request
    const body = await request.json()
    const { 
      query, 
      companyFilter, 
      documentTypeFilter, 
      similarityThreshold, 
      maxResults,
      searchType 
    } = searchRequestSchema.parse(body)
    
    console.log(`Searching: "${query}" (type: ${searchType}, company: ${companyFilter || 'all'})`)
    
    // Perform search based on type
    let results
    if (searchType === 'hybrid') {
      results = await hybridSearch(query, {
        companyFilter,
        documentTypeFilter,
        similarityThreshold,
        maxResults
      })
    } else {
      results = await semanticSearch(query, {
        companyFilter,
        documentTypeFilter,
        similarityThreshold,
        maxResults
      })
    }
    
    console.log(`Found ${results.length} results for query: "${query}"`)
    
    return NextResponse.json({
      success: true,
      query,
      searchType,
      resultsCount: results.length,
      results: results.map(result => ({
        chunkId: result.chunkId,
        documentId: result.documentId,
        content: result.content,
        similarityScore: result.similarityScore,
        documentTitle: result.documentTitle,
        documentFilename: result.documentFilename,
        pageNumber: result.pageNumber,
        sectionTitle: result.sectionTitle,
        metadata: result.metadata
      }))
    })
    
  } catch (error) {
    console.error('Document search error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        error: 'Invalid request data',
        details: error.errors
      }, { status: 400 })
    }
    
    return NextResponse.json({
      success: false,
      error: 'Search failed'
    }, { status: 500 })
  }
}

// Get search statistics and configuration
export async function GET() {
  try {
    const stats = await getDocumentSearchStats()
    
    return NextResponse.json({
      success: true,
      stats,
      searchConfig: {
        defaultSimilarityThreshold: 0.7,
        maxResults: 20,
        supportedSearchTypes: ['semantic', 'hybrid']
      }
    })
    
  } catch (error) {
    console.error('Error fetching search stats:', error)
    
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch search statistics'
    }, { status: 500 })
  }
}