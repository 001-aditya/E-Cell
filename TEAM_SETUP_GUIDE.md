# Team Page Setup Guide

## Overview

The team page has been redesigned with **15 sections** and **50 dummy team members**, featuring enhanced glassmorphism effects and full admin management capabilities.

## What Changed

### 1. Team.jsx Component
- ✅ Updated with all 15 team sections in proper order
- ✅ Enhanced glassmorphism styling for profile cards
- ✅ Fallback avatar support using DiceBear API
- ✅ Social media/email link support with smart detection
- ✅ Improved hover animations and transitions

### 2. Admin.jsx Component
- ✅ Added category dropdown with all 15 sections
- ✅ Ensures consistent category naming
- ✅ Existing add/edit/delete functionality works perfectly

### 3. Dummy Data
- ✅ 50 team members across 15 sections
- ✅ Uses randomuser.me API for profile images
- ✅ LinkedIn-style URLs for social media links
- ✅ Priority-based ordering within sections

## How to Populate the Data

### Option 1: Via Supabase SQL Editor (Recommended)

1. Open your Supabase project dashboard
2. Go to **SQL Editor**
3. Open the file: `Backend/team-seed-data.sql`
4. Copy all the SQL content
5. Paste it into the Supabase SQL Editor
6. Click **Run**

This will insert all 50 team members into your database.

### Option 2: Via Admin Panel (Manual)

1. Login to your admin account
2. Navigate to `/admin`
3. Click on the **Team** tab
4. For each team member:
   - Click "Add team member"
   - Fill in: Name, Post
   - Select Category from dropdown
   - Add Email/Social Link (e.g., LinkedIn URL)
   - Add Photo URL (or leave blank for auto-generated avatar)
   - Set Priority (lower numbers appear first)
   - Click "Add member"

## Team Sections & Profile Counts

| Section | Number of Profiles |
|---------|-------------------|
| Faculty & E-Cell Head | 3 |
| Event Head | 2 |
| Event Coordinator | 3 |
| Corporate & Marketing Head | 2 |
| Corporate & Marketing Coordinator | 3 |
| Media Head | 2 |
| Media Coordinator | 3 |
| Student Body & Startup Monitoring Head | 2 |
| Student Body & Startup Monitoring Coordinators | 4 |
| Web Development & Designing Head | 2 |
| Web Designing & Development Coordinator | 4 |
| Research Analyst | 2 |
| Research Coordinators | 4 |
| Volunteers | 7 |
| Mentors | 7 |
| **TOTAL** | **50** |

## Glassmorphism Effects

Profile cards now feature:
- **Gradient backgrounds**: `from-white/10 to-white/5`
- **Strong backdrop blur**: `backdrop-blur-lg`
- **Smooth transitions**: `duration-300`
- **Hover effects**: Scale, glow, and color shifts
- **Yellow accent**: Borders and buttons with yellow-400 theme
- **Professional shadows**: Subtle depth on hover

## Image Sources

### Profile Photos
The seed data uses `randomuser.me` API:
```
https://randomuser.me/api/portraits/men/1.jpg
https://randomuser.me/api/portraits/women/1.jpg
```

### Fallback Avatars
If no photo_url is provided, DiceBear avatars are auto-generated:
```javascript
https://api.dicebear.com/7.x/avataaars/svg?seed=${name}
```

### Replacing with Real Images
To use real team photos:
1. Upload images to a CDN or image hosting service (e.g., Cloudinary, ImgBB)
2. Copy the image URL
3. In Admin Panel → Team → Edit member → Paste URL in "Photo Url" field

## Social Media Links

The "Connect" button supports:
- **Email addresses**: Automatically opens mailto link
  - Example: `john.doe@example.com`
- **Social media URLs**: Opens in new tab
  - Example: `https://linkedin.com/in/john-doe`
  - Example: `https://twitter.com/johndoe`

The code intelligently detects if the link contains `@` to determine if it's an email.

## Testing the Team Page

1. Start your development server:
   ```bash
   cd Frontend
   npm run dev
   ```

2. Navigate to `http://localhost:5173/team`

3. You should see:
   - All 15 sections in proper order
   - Profile cards with glassmorphism effects
   - Hover animations working smoothly
   - Connect buttons for each member

## Managing Team Members

### Add a New Member
1. Go to `/admin` → Team tab
2. Click "Add team member"
3. Select category from dropdown
4. Fill in details and submit

### Edit a Member
1. Find the member in the admin list
2. Click "Edit"
3. Modify details
4. Click "Update member"

### Delete a Member
1. Find the member in the admin list
2. Click "Delete"
3. Confirm deletion

### Change Display Order
Use the "Priority" field:
- Lower numbers appear first
- Same priority members are sorted by creation date
- Recommended: Use increments of 10 (10, 20, 30...) for easy reordering

## Design Consistency

The team page maintains the existing website design:
- ✅ Background unchanged
- ✅ Yellow accent color theme
- ✅ Glassmorphism style consistent with auth pages
- ✅ Responsive grid layout
- ✅ Smooth animations and transitions

## Troubleshooting

### Images Not Loading
- Check if the URL is publicly accessible
- Try using the DiceBear fallback (remove photo_url)
- Verify CORS settings if using custom CDN

### Categories Not Showing in Order
- Check the `categoryOrder` array in `Team.jsx`
- Verify category names match exactly (case-sensitive)

### Admin Panel Not Working
- Ensure you're logged in with admin role
- Check Supabase RLS policies
- Verify network connection to Supabase

## Next Steps

1. Run the SQL seed data script
2. Test the team page at `/team`
3. Test admin functionality at `/admin`
4. Replace dummy images with real team photos
5. Update names and positions as needed
6. Customize social media links

Enjoy your new enhanced team page! 🎉
