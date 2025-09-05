// Test script for RAG system functionality
// Run with: node test-rag-system.js

const { testVectorSearch, getDocumentSearchStats } = require('./lib/vector-search')
const { generateEmbedding, countTokens } = require('./lib/document-processing')

async function testRAGSystem() {
  console.log('🧪 Testing RAG System Functionality')
  console.log('=' .repeat(50))
  
  try {
    // Test 1: Vector Search
    console.log('\\n1. Testing Vector Search...')
    await testVectorSearch("cos'è l'intelligenza artificiale")
    
    // Test 2: Document Statistics
    console.log('\\n2. Getting Document Statistics...')
    const stats = await getDocumentSearchStats()
    if (stats) {
      console.log('📊 Document Stats:')
      console.log(`- Total documents: ${stats.total_documents}`)
      console.log(`- Completed documents: ${stats.completed_documents}`)
      console.log(`- Total chunks: ${stats.total_chunks}`)
      console.log(`- Avg chunks per doc: ${stats.avg_chunks_per_document?.toFixed(1) || 'N/A'}`)
    } else {
      console.log('⚠️ Could not retrieve document statistics')
    }
    
    // Test 3: Embedding Generation
    console.log('\\n3. Testing Embedding Generation...')
    const testText = 'Questa è una prova per verificare la generazione di embedding'
    const embedding = await generateEmbedding(testText)
    console.log(`✅ Generated embedding with ${embedding.length} dimensions`)
    
    // Test 4: Token Counting
    console.log('\\n4. Testing Token Counting...')
    const tokenCount = countTokens(testText)
    console.log(`✅ Text "${testText}" contains ${tokenCount} tokens`)
    
    // Test 5: API Endpoints
    console.log('\\n5. Testing API Endpoints...')
    
    // Test search endpoint
    try {
      const searchResponse = await fetch('http://localhost:3001/api/documents/search', {
        method: 'GET'
      })
      
      if (searchResponse.ok) {
        const searchConfig = await searchResponse.json()
        console.log('✅ Search API endpoint accessible')
        console.log(`- Default similarity threshold: ${searchConfig.searchConfig?.defaultSimilarityThreshold}`)
      } else {
        console.log('❌ Search API endpoint not accessible')
      }
    } catch (error) {
      console.log('⚠️ Could not test search API (server may not be running)')
    }
    
    // Test upload endpoint
    try {
      const uploadResponse = await fetch('http://localhost:3001/api/documents/upload', {
        method: 'GET'
      })
      
      if (uploadResponse.ok) {
        const uploadConfig = await uploadResponse.json()
        console.log('✅ Upload API endpoint accessible')
        console.log(`- Max file size: ${uploadConfig.config?.maxFileSizeMB}MB`)
        console.log(`- Supported types: ${uploadConfig.config?.supportedTypes?.length} formats`)
      } else {
        console.log('❌ Upload API endpoint not accessible')
      }
    } catch (error) {
      console.log('⚠️ Could not test upload API (server may not be running)')
    }
    
    console.log('\\n' + '='.repeat(50))
    console.log('🎉 RAG System Test Complete!')
    console.log('\\n📋 Next Steps:')
    console.log('1. Run the vector database setup SQL in Supabase')
    console.log('2. Upload some test documents via the API')
    console.log('3. Test the enhanced AI chat functionality')
    console.log('4. Monitor RAG usage in chat responses')
    
  } catch (error) {
    console.error('❌ RAG System Test Failed:', error.message)
    console.log('\\n🔧 Troubleshooting:')
    console.log('- Ensure all environment variables are set')
    console.log('- Check Supabase vector extension is enabled')
    console.log('- Verify OpenAI API key is valid')
    console.log('- Run database setup SQL script')
  }
}

// Run the test
if (require.main === module) {
  testRAGSystem()
}

module.exports = { testRAGSystem }