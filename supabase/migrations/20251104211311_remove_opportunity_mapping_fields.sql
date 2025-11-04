ALTER TABLE public.opportunity_mappings
DROP COLUMN IF EXISTS multiple_data_sources,
DROP COLUMN IF EXISTS unstructured_data,
DROP COLUMN IF EXISTS unstructured_data_details,
DROP COLUMN IF EXISTS open_apis,
DROP COLUMN IF EXISTS security_restrictions,
DROP COLUMN IF EXISTS interaction_channels,
DROP COLUMN IF EXISTS request_types,
DROP COLUMN IF EXISTS agent_persona,
DROP COLUMN IF EXISTS agent_role,
DROP COLUMN IF EXISTS ai_usage,
DROP COLUMN IF EXISTS initial_agent_ideas,
DROP COLUMN IF EXISTS experience_based_decisions,
DROP COLUMN IF EXISTS additional_notes;
