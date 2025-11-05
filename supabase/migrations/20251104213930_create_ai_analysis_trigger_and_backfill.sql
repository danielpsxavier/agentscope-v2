-- Function to create a new ai_analyses record for each new opportunity_mapping
CREATE OR REPLACE FUNCTION public.create_ai_analysis_on_mapping_insert()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert a new record into ai_analyses table, linking it to the new opportunity_mapping
  -- and setting its initial processed status to false.
  INSERT INTO public.ai_analyses (opportunity_mapping_id, processed)
  VALUES (NEW.id, false);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop the trigger if it already exists to ensure the script is re-runnable.
DROP TRIGGER IF EXISTS trigger_create_ai_analysis ON public.opportunity_mappings;

-- Create the trigger that executes the function after a new opportunity_mapping is inserted.
CREATE TRIGGER trigger_create_ai_analysis
AFTER INSERT ON public.opportunity_mappings
FOR EACH ROW
EXECUTE FUNCTION public.create_ai_analysis_on_mapping_insert();

-- Backfill ai_analyses for existing opportunity_mappings that do not have a corresponding entry.
-- This query is idempotent, as it only inserts records for mappings that are missing an analysis.
INSERT INTO public.ai_analyses (opportunity_mapping_id, processed)
SELECT
  om.id,
  false
FROM
  public.opportunity_mappings om
LEFT JOIN
  public.ai_analyses aa ON om.id = aa.opportunity_mapping_id
WHERE
  aa.opportunity_mapping_id IS NULL;
