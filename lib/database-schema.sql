-- Supabase database schema for AI Lead Generation feature
-- Run these commands in your Supabase SQL editor

-- 1. Create leads table
CREATE TABLE IF NOT EXISTS leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Contact information
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    website VARCHAR(500),
    
    -- Business information
    industry VARCHAR(100) NOT NULL,
    company_size VARCHAR(50) NOT NULL, -- startup, sme, enterprise
    job_role VARCHAR(255) NOT NULL,
    business_description TEXT NOT NULL,
    
    -- Lead qualification
    lead_score INTEGER DEFAULT 0, -- 0-100 score based on qualification
    lead_status VARCHAR(50) DEFAULT 'new', -- new, qualified, contacted, converted
    
    -- Metadata
    source VARCHAR(100) DEFAULT 'ai-assistant', -- tracking source
    utm_source VARCHAR(255),
    utm_medium VARCHAR(255),
    utm_campaign VARCHAR(255),
    
    -- AI analysis results
    ai_analysis_completed BOOLEAN DEFAULT FALSE,
    ai_use_cases JSONB, -- Store generated use cases
    estimated_roi VARCHAR(255),
    implementation_timeline VARCHAR(255)
);

-- 2. Create conversations table
CREATE TABLE IF NOT EXISTS conversations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Conversation data
    session_id VARCHAR(255) NOT NULL,
    message_count INTEGER DEFAULT 0,
    conversation_data JSONB NOT NULL, -- Store full conversation history
    
    -- Analysis metrics
    engagement_score INTEGER DEFAULT 0, -- 1-10 based on interaction quality
    topics_discussed TEXT[], -- Array of main topics
    questions_asked TEXT[], -- Key questions from prospect
    
    -- Status
    status VARCHAR(50) DEFAULT 'active', -- active, completed, abandoned
    completed_at TIMESTAMP WITH TIME ZONE,
    
    UNIQUE(lead_id, session_id)
);

-- 3. Create ai_interactions table for detailed tracking
CREATE TABLE IF NOT EXISTS ai_interactions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Message data
    message_type VARCHAR(50) NOT NULL, -- user, assistant, system
    content TEXT NOT NULL,
    
    -- AI metrics
    response_time_ms INTEGER,
    tokens_used INTEGER,
    model_used VARCHAR(100),
    
    -- Context
    prompt_version VARCHAR(50),
    use_case_generated BOOLEAN DEFAULT FALSE,
    contains_cta BOOLEAN DEFAULT FALSE
);

-- 4. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_company ON leads(company);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at);
CREATE INDEX IF NOT EXISTS idx_leads_lead_status ON leads(lead_status);
CREATE INDEX IF NOT EXISTS idx_leads_industry ON leads(industry);
CREATE INDEX IF NOT EXISTS idx_leads_company_size ON leads(company_size);

CREATE INDEX IF NOT EXISTS idx_conversations_lead_id ON conversations(lead_id);
CREATE INDEX IF NOT EXISTS idx_conversations_session_id ON conversations(session_id);
CREATE INDEX IF NOT EXISTS idx_conversations_created_at ON conversations(created_at);

CREATE INDEX IF NOT EXISTS idx_ai_interactions_conversation_id ON ai_interactions(conversation_id);
CREATE INDEX IF NOT EXISTS idx_ai_interactions_created_at ON ai_interactions(created_at);

-- 5. Create RLS (Row Level Security) policies
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_interactions ENABLE ROW LEVEL SECURITY;

-- Policy for service role (backend operations)
CREATE POLICY "Service role can manage leads" ON leads
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role can manage conversations" ON conversations
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role can manage ai_interactions" ON ai_interactions
    FOR ALL USING (auth.role() = 'service_role');

-- 6. Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 7. Create triggers
CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 8. Create lead scoring function
CREATE OR REPLACE FUNCTION calculate_lead_score(
    p_industry VARCHAR,
    p_company_size VARCHAR,
    p_job_role VARCHAR,
    p_business_description TEXT,
    p_has_website BOOLEAN
) RETURNS INTEGER AS $$
DECLARE
    score INTEGER := 0;
BEGIN
    -- Base score
    score := 20;
    
    -- Industry scoring (high-value industries)
    IF p_industry IN ('Tecnologia e Software', 'Servizi Finanziari', 'Sanità e Farmaceutico', 'Manifatturiero') THEN
        score := score + 25;
    ELSIF p_industry IN ('Retail e E-commerce', 'Energia e Utilities', 'Trasporti e Logistica') THEN
        score := score + 20;
    ELSE
        score := score + 10;
    END IF;
    
    -- Company size scoring
    CASE p_company_size
        WHEN 'enterprise' THEN score := score + 30;
        WHEN 'sme' THEN score := score + 25;
        WHEN 'startup' THEN score := score + 15;
    END CASE;
    
    -- Job role scoring (decision makers)
    IF p_job_role ILIKE ANY(ARRAY['%CEO%', '%CTO%', '%CDO%', '%Chief%', '%Direttore%', '%Director%', '%VP%', '%President%']) THEN
        score := score + 20;
    ELSIF p_job_role ILIKE ANY(ARRAY['%Manager%', '%Head%', '%Lead%', '%Responsabile%']) THEN
        score := score + 15;
    ELSE
        score := score + 5;
    END IF;
    
    -- Business description quality
    IF LENGTH(p_business_description) > 100 THEN
        score := score + 5;
    END IF;
    
    -- Has website
    IF p_has_website THEN
        score := score + 5;
    END IF;
    
    -- Ensure score is between 0-100
    IF score > 100 THEN score := 100; END IF;
    IF score < 0 THEN score := 0; END IF;
    
    RETURN score;
END;
$$ LANGUAGE plpgsql;

-- 9. Create view for lead analytics
CREATE OR REPLACE VIEW lead_analytics AS
SELECT 
    DATE(created_at) as date,
    COUNT(*) as total_leads,
    COUNT(*) FILTER (WHERE lead_score >= 70) as high_quality_leads,
    COUNT(*) FILTER (WHERE ai_analysis_completed = true) as completed_analysis,
    AVG(lead_score) as avg_lead_score,
    industry,
    company_size,
    lead_status
FROM leads 
GROUP BY DATE(created_at), industry, company_size, lead_status
ORDER BY date DESC;

-- 10. Grant permissions
GRANT ALL ON leads TO service_role;
GRANT ALL ON conversations TO service_role;
GRANT ALL ON ai_interactions TO service_role;
GRANT SELECT ON lead_analytics TO service_role;