# Real Team Members Data - E-Cell 2026

## Summary

Successfully updated the SQL seed data file with **50 real team members** based on the provided information.

## Team Structure

### 1. Faculty & E-Cell Head (3 members)
- **BK Tripathi** - Director
- **Dr. Ambrish Singh** - Professor In-charge
- **Rajeev Rajesh** - E-Cell Head

### 2. Event Head (2 members)
- **Saumya Singh** - Event Head
- **Pankaj Kumar** - Event Head

### 3. Event Coordinator (3 members)
- **Utkarsh Upadhyay** - Event Coordinator
- **Sonam Singh** - Event Coordinator
- **Prakhar Mishra** - Event Coordinator

### 4. Corporate & Marketing Head (2 members)
- **Abhishek Mishra** - Corporate & Marketing Head
- **Abhay Singh** - Corporate & Marketing Head

### 5. Corporate & Marketing Coordinator (3 members)
- **Anoop Kumar** - Corporate & Marketing Coordinator
- **Kritika Pandey** - Corporate & Marketing Coordinator
- **Siddharth Gautam** - Corporate & Marketing Coordinator

### 6. Media Head (2 members)
- **Vaishnavi Mishra** - Media Head
- **Priya Yadav** - Media Head

### 7. Media Coordinator (3 members)
- **Akhand Pratap** - Media Coordinator
- **Gulshan Yadav** - Media Coordinator
- **Akanksha Ojha** - Media Coordinator

### 8. Student Body & Startup Monitoring Head (2 members)
- **Divyansh Vishwakarma** - Student Body & Monitoring Head
- **Anand Chaudhary** - Student Body & Monitoring Head

### 9. Student Body & Startup Monitoring Coordinators (4 members)
- **Riddhima Srivastava** - Student Body & Monitoring Coordinator
- **Manish Sonkar** - Student Body & Monitoring Coordinator
- **Peeyush Yadav** - Student Body & Monitoring Coordinator
- **Ayush Tiwari** - Student Body & Monitoring Coordinator

### 10. Web Development & Designing Head (2 members)
- **Gaurav Kumar** - Web Development & Designing Head
- **Suyash Mishra** - Web Development & Designing Head

### 11. Web Designing & Development Coordinator (4 members)
- **Aditya Shukla** - Web Development & Designing Coordinator
- **Ketan** - Web Development & Designing Coordinator
- **Jitesh Siddharth** - Web Development & Designing Coordinator
- **Sadaf** - Web Development & Designing Coordinator

### 12. Research Analyst (2 members)
- **Suraj Pandey** - Research Analyst
- **Suryansh Tiwari** - Research Analyst

### 13. Research Coordinators (4 members)
- **Nihal Singh** - Research Coordinator
- **Swati Rai** - Research Coordinator
- **Tripti Gupta** - Research Coordinator
- **Debangjit Deka** - Research Coordinator

### 14. Volunteers (7 members)
- **Anjali Upadhyay** - Volunteer
- **Priyanshu Awasthi** - Volunteer
- **Anurag Yadav** - Volunteer
- **Keshav Thakur** - Volunteer
- **Akash Singh** - Volunteer
- **Jagriti Maurya** - Volunteer
- **Ripunjay Dhar Dwivedi** - Volunteer

### 15. Mentors (7 members)
- **Satyam Singh** - Mentor
- **Alok Singh** - Mentor
- **Nandini Gupta** - Mentor
- **Mihir Singh** - Mentor
- **Yash Jaiswal** - Mentor
- **Amit Dubey** - Mentor
- **Shubham Yadav** - Mentor

## Email Format

All team members have been assigned email addresses in the format:
```
firstname.lastname@college.edu
```

For single names (e.g., "Ketan", "Sadaf"):
```
firstname@college.edu
```

## Profile Images

Currently using placeholder images from `randomuser.me` API. You should replace these with actual team member photos by:

1. Collecting real photos from each team member
2. Uploading to an image hosting service (Cloudinary, ImgBB, etc.)
3. Updating the `photo_url` field in the admin panel or SQL

## Next Steps

1. **Run the SQL Script**
   - Open Supabase SQL Editor
   - Copy content from `Backend/team-seed-data.sql`
   - Execute the script

2. **Replace Placeholder Images**
   - Collect actual photos from team members
   - Upload to image hosting
   - Update via Admin Panel (`/admin` → Team)

3. **Update Email Addresses**
   - Replace `@college.edu` with actual institutional domain
   - Or update with personal Gmail addresses
   - Update via Admin Panel

4. **Verify Data**
   - Visit `/team` page
   - Check all names appear correctly
   - Test Connect buttons

## File Location

Updated SQL file: `Backend/team-seed-data.sql`
