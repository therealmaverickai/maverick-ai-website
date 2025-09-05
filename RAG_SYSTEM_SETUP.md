# 🤖 RAG System Setup Guide

## Overview
This guide will help you set up the complete RAG (Retrieval Augmented Generation) system using Supabase Vector to enhance your AI chat feature with document-based knowledge retrieval.

## 🗄️ Database Setup

### Step 1: Enable pgvector Extension
Run this SQL in your Supabase SQL Editor:

```sql
CREATE EXTENSION IF NOT EXISTS vector;
```

### Step 2: Create RAG Tables and Functions
Execute the complete SQL script from `setup-vector-db.sql`:

```bash
# Copy contents of setup-vector-db.sql and run in Supabase SQL Editor
```

This will create:
- `documents` table for document metadata
- `document_chunks` table for vector embeddings
- Search functions for semantic and hybrid retrieval
- Indexes for optimal performance

### Step 3: Update Prisma Schema
Run Prisma commands to sync the new models:

```bash
npx prisma generate
# Note: Migration may fail due to vector types, this is expected
# The tables are created directly in Supabase
```

## 📦 Dependencies Installed

The following packages have been added:
- `pdf-parse` - PDF text extraction
- `mammoth` - DOCX document processing  
- `multer@next` - File upload handling
- `@supabase/storage-js` - Supabase storage integration
- `tiktoken` - Token counting for chunking

## 🚀 API Endpoints

### Document Upload
`POST /api/documents/upload`
- Accepts PDF, DOCX, TXT files (max 10MB)
- Processes and creates vector embeddings
- Stores in vector database

### Document Search  
`POST /api/documents/search`
- Semantic search using vector similarity
- Hybrid search combining keywords and vectors
- Company-specific filtering

### Configuration
`GET /api/documents/upload` - Returns upload limits and config
`GET /api/documents/search` - Returns search stats and config

## 🧠 RAG Integration with AI Chat

The existing AI chat system has been enhanced with:

### Automatic Context Retrieval
- Searches for relevant documents based on user query
- Considers company context and conversation history
- Uses hybrid search for better accuracy

### Enhanced AI Prompts
- Injects retrieved context into system prompt
- Instructs AI to prioritize document information
- Maintains natural conversation flow

### Analytics & Tracking
- Tracks when RAG is used vs. base knowledge
- Logs token usage and performance metrics
- Records document citation patterns

## 📊 Key Features

### Document Processing Pipeline
1. **Upload**: Multi-format file support
2. **Extraction**: Text extraction with metadata
3. **Chunking**: Intelligent chunking with overlap (800 tokens)
4. **Embedding**: OpenAI text-embedding-3-small (1536 dimensions)
5. **Storage**: Supabase Vector with pgvector

### Vector Search System
1. **Semantic Search**: Pure vector similarity
2. **Hybrid Search**: Vector + keyword matching  
3. **Context-Aware**: Company and conversation context
4. **Filtered Search**: Document type and date filtering
5. **Relevance Scoring**: Configurable similarity thresholds

### Chat Enhancement
1. **Automatic RAG**: Triggered by user queries
2. **Context Injection**: Seamless prompt enhancement
3. **Fallback Handling**: Graceful degradation if search fails
4. **Citation Support**: Document source attribution
5. **Performance Tracking**: RAG usage analytics

## 🛠️ Configuration

### Environment Variables Required
```env
# Existing variables
DATABASE_URL=your_postgresql_connection
OPENAI_API_KEY=your_openai_key

# Supabase (for vector operations)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### RAG Settings (Configurable in code)
```typescript
SEARCH_CONFIG = {
  defaultSimilarityThreshold: 0.7,
  defaultMaxResults: 5,
  hybridSearchEnabled: true,
  keywordBoostWeight: 0.3,
  semanticWeight: 0.7
}

DOCUMENT_CONFIG = {
  maxFileSize: 10MB,
  chunkSize: 800 tokens,
  chunkOverlap: 200 tokens,
  embeddingModel: 'text-embedding-3-small'
}
```

## 🧪 Testing the RAG System

### 1. Upload Test Documents
```typescript
// Use the DocumentUpload component or API directly
const formData = new FormData()
formData.append('file', pdfFile)
formData.append('companyContext', 'TestCorp')
formData.append('documentType', 'general')

fetch('/api/documents/upload', {
  method: 'POST',
  body: formData
})
```

### 2. Test Vector Search
```typescript
// Test search functionality
const searchResult = await fetch('/api/documents/search', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    query: "cos'è l'intelligenza artificiale",
    companyFilter: "TestCorp",
    searchType: "hybrid"
  })
})
```

### 3. Test Enhanced AI Chat
- Use existing AI chat interface
- Ask questions related to uploaded documents
- Verify RAG context is being used in responses
- Check `ragUsed: true` in API responses

## 📈 Performance Optimization

### Vector Index Tuning
```sql
-- Adjust lists parameter based on data size
CREATE INDEX document_chunks_embedding_idx 
ON document_chunks USING ivfflat (embedding vector_cosine_ops) 
WITH (lists = 100);  -- Increase for larger datasets
```

### Search Performance
- Use hybrid search for better results
- Cache frequently accessed chunks
- Implement result deduplication
- Monitor similarity thresholds

### Token Management
- Track OpenAI API usage for embeddings
- Monitor chunk sizes and overlap
- Optimize prompt lengths with context

## 🔧 Administration

### Document Management
Use the `DocumentUpload` component in admin interfaces:
```jsx
import DocumentUpload from '@/components/DocumentUpload'

<DocumentUpload 
  onUploadComplete={(result) => {
    console.log('Document processed:', result)
  }} 
/>
```

### Analytics Queries
```sql
-- RAG usage statistics
SELECT 
  prompt_version,
  COUNT(*) as usage_count,
  AVG(tokens_used) as avg_tokens
FROM ai_interactions 
WHERE created_at >= NOW() - INTERVAL '30 days'
GROUP BY prompt_version;

-- Document search statistics
SELECT * FROM get_document_stats();
```

## 🚨 Troubleshooting

### Common Issues

1. **Vector Extension Not Found**
   ```sql
   CREATE EXTENSION IF NOT EXISTS vector;
   ```

2. **Embedding Generation Fails**
   - Check OpenAI API key
   - Verify rate limits
   - Monitor token usage

3. **Search Returns No Results**
   - Lower similarity threshold
   - Check document processing status
   - Verify company context matching

4. **Performance Issues**
   - Optimize vector indexes
   - Reduce chunk sizes
   - Implement caching

### Debug Commands
```typescript
// Test vector search
await testVectorSearch("test query")

// Check document stats
await getDocumentSearchStats()

// Verify embeddings
console.log('Embedding dimensions:', embedding.length)
```

## ✅ Verification Checklist

- [ ] pgvector extension enabled
- [ ] RAG tables and functions created
- [ ] Document upload API working
- [ ] Vector search API functional
- [ ] AI chat shows `ragUsed: true` for relevant queries
- [ ] Document processing creates chunks successfully
- [ ] Search returns relevant results
- [ ] Analytics tracking RAG usage

## 🔄 Next Steps

1. **Upload Knowledge Base**: Add company documents, case studies, technical documentation
2. **Fine-tune Search**: Adjust similarity thresholds based on results quality
3. **Monitor Performance**: Track RAG effectiveness and user satisfaction
4. **Expand Document Types**: Consider adding more file format support
5. **Advanced Features**: Implement document versioning, expiration, access controls

The RAG system is now fully integrated and ready to enhance your AI chat with document-based knowledge retrieval! 🎉