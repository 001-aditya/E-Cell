-- Seed data for Events table
-- These events are from the Events.jsx fallback data

-- Note: You'll need to update the cover_image URLs to point to your actual hosted images
-- or local paths from your assets folder

-- Clear existing events (optional, comment out if you want to keep existing data)
-- DELETE FROM events;

-- Insert the 4 main E-Cell events
INSERT INTO events (title, subtitle, description, cover_image, date, location, registration_deadline)
VALUES
  (
    'E-Chaupal',
    'Grassroots entrepreneurship drive',
    'Connect with rural innovators, understand their challenges, and co-create digital solutions with the E-Cell mentors.',
    '/src/assets/Logos/chaupal.jpeg',
    '2025-02-15T10:00:00',
    'On campus',
    '2025-02-10T23:59:59'
  ),
  (
    'Startup Spotlight',
    'Campus pitch day',
    'Student-led teams pitch their MVPs in front of founders, investors and faculty mentors.',
    '/src/assets/Logos/startup.jpeg',
    '2025-03-20T14:00:00',
    'Auditorium',
    '2025-03-15T23:59:59'
  ),
  (
    'International Workshop',
    'Meetup with International Entrepreneur',
    'This week-long workshop features global speakers sharing insights on entrepreneurship. It equips students with strategies, leadership skills and startup knowledge.',
    '/src/assets/Logos/workshop.jpeg',
    '2025-04-10T09:00:00',
    'Auditorium',
    '2025-04-05T23:59:59'
  ),
  (
    'E-Clinic',
    'Way of Startup',
    'E-Clinic helps startups and new entrepreneurs solve challenges in their journey. It connects them with experts to refine ideas, overcome obstacles, and grow their ventures.',
    '/src/assets/Logos/eclinic.jpeg',
    '2025-05-05T15:00:00',
    'Auditorium',
    '2025-05-01T23:59:59'
  );

-- Verify the data
SELECT id, title, subtitle, date, location FROM events ORDER BY date;
