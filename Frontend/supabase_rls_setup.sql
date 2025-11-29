-- Enable RLS on all tables
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts when re-running
DROP POLICY IF EXISTS "Public read access" ON team_members;
DROP POLICY IF EXISTS "Authenticated insert access" ON team_members;
DROP POLICY IF EXISTS "Authenticated update access" ON team_members;
DROP POLICY IF EXISTS "Authenticated delete access" ON team_members;

DROP POLICY IF EXISTS "Public read access" ON blogs;
DROP POLICY IF EXISTS "Authenticated insert access" ON blogs;
DROP POLICY IF EXISTS "Authenticated update access" ON blogs;
DROP POLICY IF EXISTS "Authenticated delete access" ON blogs;

DROP POLICY IF EXISTS "Public read access" ON events;
DROP POLICY IF EXISTS "Authenticated insert access" ON events;
DROP POLICY IF EXISTS "Authenticated update access" ON events;
DROP POLICY IF EXISTS "Authenticated delete access" ON events;

DROP POLICY IF EXISTS "Public read access" ON gallery_images;
DROP POLICY IF EXISTS "Authenticated insert access" ON gallery_images;
DROP POLICY IF EXISTS "Authenticated update access" ON gallery_images;
DROP POLICY IF EXISTS "Authenticated delete access" ON gallery_images;

DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Upload" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Update" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Delete" ON storage.objects;

-- Policies for 'team_members'
CREATE POLICY "Public read access" ON team_members FOR SELECT USING (true);
CREATE POLICY "Authenticated insert access" ON team_members FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated update access" ON team_members FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated delete access" ON team_members FOR DELETE USING (auth.role() = 'authenticated');

-- Policies for 'blogs'
CREATE POLICY "Public read access" ON blogs FOR SELECT USING (true);
CREATE POLICY "Authenticated insert access" ON blogs FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated update access" ON blogs FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated delete access" ON blogs FOR DELETE USING (auth.role() = 'authenticated');

-- Policies for 'events'
CREATE POLICY "Public read access" ON events FOR SELECT USING (true);
CREATE POLICY "Authenticated insert access" ON events FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated update access" ON events FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated delete access" ON events FOR DELETE USING (auth.role() = 'authenticated');

-- Policies for 'gallery_images'
CREATE POLICY "Public read access" ON gallery_images FOR SELECT USING (true);
CREATE POLICY "Authenticated insert access" ON gallery_images FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated update access" ON gallery_images FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated delete access" ON gallery_images FOR DELETE USING (auth.role() = 'authenticated');

-- Storage Bucket Policies (for 'images' bucket)
INSERT INTO storage.buckets (id, name, public) VALUES ('images', 'images', true) ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING ( bucket_id = 'images' );
CREATE POLICY "Authenticated Upload" ON storage.objects FOR INSERT WITH CHECK ( bucket_id = 'images' AND auth.role() = 'authenticated' );
CREATE POLICY "Authenticated Update" ON storage.objects FOR UPDATE USING ( bucket_id = 'images' AND auth.role() = 'authenticated' );
CREATE POLICY "Authenticated Delete" ON storage.objects FOR DELETE USING ( bucket_id = 'images' AND auth.role() = 'authenticated' );
