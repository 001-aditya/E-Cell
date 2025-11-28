-- Team Members Real Data for E-Cell Website 2026
-- This script populates all 15 team sections with actual team member data
-- Run this in your Supabase SQL editor

-- Clear existing team members (optional - comment out if you want to keep existing data)
-- DELETE FROM team_members;

-- Faculty & E-Cell Head (3 members)
INSERT INTO team_members (name, post, category, email, photo_url, priority) VALUES
('BK Tripathi', 'Director', 'Faculty & E-Cell Head', 'bk.tripathi@college.edu', 'https://randomuser.me/api/portraits/men/50.jpg', 1),
('Dr. Ambrish Singh', 'Professor In-charge', 'Faculty & E-Cell Head', 'ambrish.singh@college.edu', 'https://randomuser.me/api/portraits/men/51.jpg', 2),
('Rajeev Rajesh', 'E-Cell Head', 'Faculty & E-Cell Head', 'rajeev.rajesh@college.edu', 'https://randomuser.me/api/portraits/men/52.jpg', 3);

-- Event Head (2 members)
INSERT INTO team_members (name, post, category, email, photo_url, priority) VALUES
('Saumya Singh', 'Event Head', 'Event Head', 'saumya.singh@college.edu', 'https://randomuser.me/api/portraits/women/50.jpg', 10),
('Pankaj Kumar', 'Event Head', 'Event Head', 'pankaj.kumar@college.edu', 'https://randomuser.me/api/portraits/men/53.jpg', 11);

-- Event Coordinator (3 members)
INSERT INTO team_members (name, post, category, email, photo_url, priority) VALUES
('Utkarsh Upadhyay', 'Event Coordinator', 'Event Coordinator', 'utkarsh.upadhyay@college.edu', 'https://randomuser.me/api/portraits/men/54.jpg', 20),
('Sonam Singh', 'Event Coordinator', 'Event Coordinator', 'sonam.singh@college.edu', 'https://randomuser.me/api/portraits/women/51.jpg', 21),
('Prakhar Mishra', 'Event Coordinator', 'Event Coordinator', 'prakhar.mishra@college.edu', 'https://randomuser.me/api/portraits/men/55.jpg', 22);

-- Corporate & Marketing Head (2 members)
INSERT INTO team_members (name, post, category, email, photo_url, priority) VALUES
('Abhishek Mishra', 'Corporate & Marketing Head', 'Corporate & Marketing Head', 'abhishek.mishra@college.edu', 'https://randomuser.me/api/portraits/men/56.jpg', 30),
('Abhay Singh', 'Corporate & Marketing Head', 'Corporate & Marketing Head', 'abhay.singh@college.edu', 'https://randomuser.me/api/portraits/men/57.jpg', 31);

-- Corporate & Marketing Coordinator (3 members)
INSERT INTO team_members (name, post, category, email, photo_url, priority) VALUES
('Anoop Kumar', 'Corporate & Marketing Coordinator', 'Corporate & Marketing Coordinator', 'anoop.kumar@college.edu', 'https://randomuser.me/api/portraits/men/58.jpg', 40),
('Kritika Pandey', 'Corporate & Marketing Coordinator', 'Corporate & Marketing Coordinator', 'kritika.pandey@college.edu', 'https://randomuser.me/api/portraits/women/52.jpg', 41),
('Siddharth Gautam', 'Corporate & Marketing Coordinator', 'Corporate & Marketing Coordinator', 'siddharth.gautam@college.edu', 'https://randomuser.me/api/portraits/men/59.jpg', 42);

-- Media Head (2 members)
INSERT INTO team_members (name, post, category, email, photo_url, priority) VALUES
('Vaishnavi Mishra', 'Media Head', 'Media Head', 'vaishnavi.mishra@college.edu', 'https://randomuser.me/api/portraits/women/53.jpg', 50),
('Priya Yadav', 'Media Head', 'Media Head', 'priya.yadav@college.edu', 'https://randomuser.me/api/portraits/women/54.jpg', 51);

-- Media Coordinator (3 members)
INSERT INTO team_members (name, post, category, email, photo_url, priority) VALUES
('Akhand Pratap', 'Media Coordinator', 'Media Coordinator', 'akhand.pratap@college.edu', 'https://randomuser.me/api/portraits/men/60.jpg', 60),
('Gulshan Yadav', 'Media Coordinator', 'Media Coordinator', 'gulshan.yadav@college.edu', 'https://randomuser.me/api/portraits/men/61.jpg', 61),
('Akanksha Ojha', 'Media Coordinator', 'Media Coordinator', 'akanksha.ojha@college.edu', 'https://randomuser.me/api/portraits/women/55.jpg', 62);

-- Student Body & Startup Monitoring Head (2 members)
INSERT INTO team_members (name, post, category, email, photo_url, priority) VALUES
('Divyansh Vishwakarma', 'Student Body & Monitoring Head', 'Student Body & Startup Monitoring Head', 'divyansh.vishwakarma@college.edu', 'https://randomuser.me/api/portraits/men/62.jpg', 70),
('Anand Chaudhary', 'Student Body & Monitoring Head', 'Student Body & Startup Monitoring Head', 'anand.chaudhary@college.edu', 'https://randomuser.me/api/portraits/men/63.jpg', 71);

-- Student Body & Startup Monitoring Coordinators (4 members)
INSERT INTO team_members (name, post, category, email, photo_url, priority) VALUES
('Riddhima Srivastava', 'Student Body & Monitoring Coordinator', 'Student Body & Startup Monitoring Coordinators', 'riddhima.srivastava@college.edu', 'https://randomuser.me/api/portraits/women/56.jpg', 80),
('Manish Sonkar', 'Student Body & Monitoring Coordinator', 'Student Body & Startup Monitoring Coordinators', 'manish.sonkar@college.edu', 'https://randomuser.me/api/portraits/men/64.jpg', 81),
('Peeyush Yadav', 'Student Body & Monitoring Coordinator', 'Student Body & Startup Monitoring Coordinators', 'peeyush.yadav@college.edu', 'https://randomuser.me/api/portraits/men/65.jpg', 82),
('Ayush Tiwari', 'Student Body & Monitoring Coordinator', 'Student Body & Startup Monitoring Coordinators', 'ayush.tiwari@college.edu', 'https://randomuser.me/api/portraits/men/66.jpg', 83);

-- Web Development & Designing Head (2 members)
INSERT INTO team_members (name, post, category, email, photo_url, priority) VALUES
('Gaurav Kumar', 'Web Development & Designing Head', 'Web Development & Designing Head', 'gaurav.kumar@college.edu', 'https://randomuser.me/api/portraits/men/67.jpg', 90),
('Suyash Mishra', 'Web Development & Designing Head', 'Web Development & Designing Head', 'suyash.mishra@college.edu', 'https://randomuser.me/api/portraits/men/68.jpg', 91);

-- Web Designing & Development Coordinator (4 members)
INSERT INTO team_members (name, post, category, email, photo_url, priority) VALUES
('Aditya Shukla', 'Web Development & Designing Coordinator', 'Web Designing & Development Coordinator', 'aditya.shukla@college.edu', 'https://randomuser.me/api/portraits/men/69.jpg', 100),
('Ketan', 'Web Development & Designing Coordinator', 'Web Designing & Development Coordinator', 'ketan@college.edu', 'https://randomuser.me/api/portraits/men/70.jpg', 101),
('Jitesh Siddharth', 'Web Development & Designing Coordinator', 'Web Designing & Development Coordinator', 'jitesh.siddharth@college.edu', 'https://randomuser.me/api/portraits/men/71.jpg', 102),
('Sadaf', 'Web Development & Designing Coordinator', 'Web Designing & Development Coordinator', 'sadaf@college.edu', 'https://randomuser.me/api/portraits/women/57.jpg', 103);

-- Research Analyst (2 members)
INSERT INTO team_members (name, post, category, email, photo_url, priority) VALUES
('Suraj Pandey', 'Research Analyst', 'Research Analyst', 'suraj.pandey@college.edu', 'https://randomuser.me/api/portraits/men/72.jpg', 110),
('Suryansh Tiwari', 'Research Analyst', 'Research Analyst', 'suryansh.tiwari@college.edu', 'https://randomuser.me/api/portraits/men/73.jpg', 111);

-- Research Coordinators (4 members)
INSERT INTO team_members (name, post, category, email, photo_url, priority) VALUES
('Nihal Singh', 'Research Coordinator', 'Research Coordinators', 'nihal.singh@college.edu', 'https://randomuser.me/api/portraits/men/74.jpg', 120),
('Swati Rai', 'Research Coordinator', 'Research Coordinators', 'swati.rai@college.edu', 'https://randomuser.me/api/portraits/women/58.jpg', 121),
('Tripti Gupta', 'Research Coordinator', 'Research Coordinators', 'tripti.gupta@college.edu', 'https://randomuser.me/api/portraits/women/59.jpg', 122),
('Debangjit Deka', 'Research Coordinator', 'Research Coordinators', 'debangjit.deka@college.edu', 'https://randomuser.me/api/portraits/men/75.jpg', 123);

-- Volunteers (7 members)
INSERT INTO team_members (name, post, category, email, photo_url, priority) VALUES
('Anjali Upadhyay', 'Volunteer', 'Volunteers', 'anjali.upadhyay@college.edu', 'https://randomuser.me/api/portraits/women/60.jpg', 130),
('Priyanshu Awasthi', 'Volunteer', 'Volunteers', 'priyanshu.awasthi@college.edu', 'https://randomuser.me/api/portraits/men/76.jpg', 131),
('Anurag Yadav', 'Volunteer', 'Volunteers', 'anurag.yadav@college.edu', 'https://randomuser.me/api/portraits/men/77.jpg', 132),
('Keshav Thakur', 'Volunteer', 'Volunteers', 'keshav.thakur@college.edu', 'https://randomuser.me/api/portraits/men/78.jpg', 133),
('Akash Singh', 'Volunteer', 'Volunteers', 'akash.singh@college.edu', 'https://randomuser.me/api/portraits/men/79.jpg', 134),
('Jagriti Maurya', 'Volunteer', 'Volunteers', 'jagriti.maurya@college.edu', 'https://randomuser.me/api/portraits/women/61.jpg', 135),
('Ripunjay Dhar Dwivedi', 'Volunteer', 'Volunteers', 'ripunjay.dwivedi@college.edu', 'https://randomuser.me/api/portraits/men/80.jpg', 136);

-- Mentors (7 members)
INSERT INTO team_members (name, post, category, email, photo_url, priority) VALUES
('Satyam Singh', 'Mentor', 'Mentors', 'satyam.singh@college.edu', 'https://randomuser.me/api/portraits/men/81.jpg', 140),
('Alok Singh', 'Mentor', 'Mentors', 'alok.singh@college.edu', 'https://randomuser.me/api/portraits/men/82.jpg', 141),
('Nandini Gupta', 'Mentor', 'Mentors', 'nandini.gupta@college.edu', 'https://randomuser.me/api/portraits/women/62.jpg', 142),
('Mihir Singh', 'Mentor', 'Mentors', 'mihir.singh@college.edu', 'https://randomuser.me/api/portraits/men/83.jpg', 143),
('Yash Jaiswal', 'Mentor', 'Mentors', 'yash.jaiswal@college.edu', 'https://randomuser.me/api/portraits/men/84.jpg', 144),
('Amit Dubey', 'Mentor', 'Mentors', 'amit.dubey@college.edu', 'https://randomuser.me/api/portraits/men/85.jpg', 145),
('Shubham Yadav', 'Mentor', 'Mentors', 'shubham.yadav@college.edu', 'https://randomuser.me/api/portraits/men/86.jpg', 146);

-- Verify the data
SELECT category, COUNT(*) as member_count 
FROM team_members 
GROUP BY category 
ORDER BY MIN(priority);

-- Display all inserted members
SELECT name, post, category, priority 
FROM team_members 
ORDER BY priority;
