-- Gallery Images Seed Data for E-Cell Website
-- This populates the gallery with images from the Gallery folder
-- Organized into 4 categories: Workshop, Spotlight, E-Chaupal, and Others

-- Clear existing gallery images (optional - comment out if you want to keep existing data)
-- DELETE FROM gallery_images;

-- International Workshop Images (week1, week2, week3, week8, week9, week10, week11, week12)
INSERT INTO gallery_images (title, category, image_url) VALUES
('Week 1 - Workshop Opening', 'Workshop', '/src/assets/Gallery/week1.jpg'),
('Week 2 - Speaker Session', 'Workshop', '/src/assets/Gallery/week2.jpg'),
('Week 3 - Panel Discussion', 'Workshop', '/src/assets/Gallery/week3.jpg'),
('Week 8 - Networking Event', 'Workshop', '/src/assets/Gallery/week8.jpg'),
('Week 9 - Innovation Lab', 'Workshop', '/src/assets/Gallery/week9.jpg'),
('Week 10 - Startup Pitch', 'Workshop', '/src/assets/Gallery/week10.jpg'),
('Week 11 - Mentoring Session', 'Workshop', '/src/assets/Gallery/week11.jpeg'),
('Week 12 - Grand Finale', 'Workshop', '/src/assets/Gallery/week12.jpg');

-- Startup Spotlight Images (week5, week6, week7)
INSERT INTO gallery_images (title, category, image_url) VALUES
('Week 5 - Startup Showcase', 'Spotlight', '/src/assets/Gallery/week5.jpg'),
('Week 6 - Entrepreneur Talk', 'Spotlight', '/src/assets/Gallery/week6.jpg'),
('Week 7 - Demo Day', 'Spotlight', '/src/assets/Gallery/week7.jpg');

-- E-Chaupal Images (chaupal1, chaupal2, chaupal3, chaupal4)
INSERT INTO gallery_images (title, category, image_url) VALUES
('E-Chaupal Session 1', 'E-Chaupal', '/src/assets/Gallery/chaupal1.jpg'),
('E-Chaupal Discussion 2', 'E-Chaupal', '/src/assets/Gallery/chaupal2.jpg'),
('E-Chaupal Meet 3', 'E-Chaupal', '/src/assets/Gallery/chaupal3.jpg'),
('E-Chaupal Gathering 4', 'E-Chaupal', '/src/assets/Gallery/chaupal4.jpeg');

-- Others category is empty for now, can be populated via admin panel

-- Verify the data
SELECT category, COUNT(*) as image_count 
FROM gallery_images 
GROUP BY category 
ORDER BY category;

-- Display all inserted images
SELECT title, category, created_at 
FROM gallery_images 
ORDER BY category, created_at;
