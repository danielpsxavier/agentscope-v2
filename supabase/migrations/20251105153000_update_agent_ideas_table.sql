-- Add the new 'objective' column to the agent_ideas table.
ALTER TABLE public.agent_ideas
ADD COLUMN objective TEXT;

-- Rename the 'key_features' column to 'tools'.
ALTER TABLE public.agent_ideas
RENAME COLUMN key_features TO tools;

-- Update the data type of the 'tools' column from TEXT to JSONB.
-- It attempts to cast the existing text data to JSONB.
-- This assumes the existing data is a valid JSON array string like '["feature1", "feature2"]'.
ALTER TABLE public.agent_ideas
ALTER COLUMN tools TYPE JSONB USING tools::jsonb;

-- Update the data type of the 'expected_benefits' column from TEXT to JSONB.
-- Similar to the 'tools' column, this casts the existing text data to JSONB.
ALTER TABLE public.agent_ideas
ALTER COLUMN expected_benefits TYPE JSONB USING expected_benefits::jsonb;

-- Add a comment to the new column for clarity.
COMMENT ON COLUMN public.agent_ideas.objective IS 'The main objective or problem the agent solves.';
