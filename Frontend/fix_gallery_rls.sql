-- Fix RLS policies for gallery_images
-- Drop existing policies to be sure
DROP POLICY IF EXISTS "Public read access" ON gallery_images;
DROP POLICY IF EXISTS "Authenticated insert access" ON gallery_images;
DROP POLICY IF EXISTS "Authenticated update access" ON gallery_images;
DROP POLICY IF EXISTS "Authenticated delete access" ON gallery_images;

-- Recreate policies
CREATE POLICY "Public read access" ON gallery_images FOR SELECT USING (true);

CREATE POLICY "Authenticated insert access" ON gallery_images 
FOR INSERT 
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated update access" ON gallery_images 
FOR UPDATE 
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated delete access" ON gallery_images 
FOR DELETE 
USING (auth.role() = 'authenticated');

-- Verify RLS is enabled
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
