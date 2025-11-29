-- Fix UPDATE policy for team_members
-- First, drop the existing policy to be sure
DROP POLICY IF EXISTS "Authenticated update access" ON team_members;

-- Recreate it with both USING and WITH CHECK to be absolutely sure
CREATE POLICY "Authenticated update access" ON team_members 
FOR UPDATE 
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

-- Verify RLS is enabled
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
