-- SQL to add prompts table to Supabase database
-- Run this in your Supabase SQL editor

-- Create prompts table
CREATE TABLE IF NOT EXISTS "prompts" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "prompt_id" TEXT NOT NULL UNIQUE,
    "name" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "version" TEXT NOT NULL DEFAULT '1.0',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_by" TEXT,
    "description" TEXT,
    "usage_count" INTEGER NOT NULL DEFAULT 0,
    "last_used" TIMESTAMPTZ
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS "prompts_prompt_id_idx" ON "prompts" ("prompt_id");
CREATE INDEX IF NOT EXISTS "prompts_is_active_idx" ON "prompts" ("is_active");
CREATE INDEX IF NOT EXISTS "prompts_updated_at_idx" ON "prompts" ("updated_at" DESC);

-- Add auto-update timestamp trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_prompts_updated_at BEFORE UPDATE ON prompts FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Insert the default AI Chat prompt (this will be automatically created by the API, but you can run this manually if needed)
-- INSERT INTO prompts (prompt_id, name, content, created_by, description) 
-- VALUES ('aiChat', 'AI Chat System Prompt', 'Your prompt content here...', 'system', 'Main AI chat consultant system prompt with RAG integration')
-- ON CONFLICT (prompt_id) DO NOTHING;

COMMENT ON TABLE prompts IS 'AI system prompts storage with versioning and usage tracking';