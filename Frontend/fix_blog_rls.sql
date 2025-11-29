-- Fix RLS policies for blogs
-- Drop existing policies to be sure
DROP POLICY IF EXISTS "Public read access" ON blogs;
DROP POLICY IF EXISTS "Authenticated insert access" ON blogs;
DROP POLICY IF EXISTS "Authenticated update access" ON blogs;
DROP POLICY IF EXISTS "Authenticated delete access" ON blogs;

-- Recreate policies
CREATE POLICY "Public read access" ON blogs FOR SELECT USING (true);

CREATE POLICY "Authenticated insert access" ON blogs 
FOR INSERT 
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated update access" ON blogs 
FOR UPDATE 
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated delete access" ON blogs 
FOR DELETE 
USING (auth.role() = 'authenticated');

-- Verify RLS is enabled
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
