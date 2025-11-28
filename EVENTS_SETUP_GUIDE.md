# Events Page Implementation Guide

## Overview
A dedicated Events page has been created to display all E-Cell events with registration functionality. Admins can manage events through the Admin panel.

## Files Created

### 1. EventsPage.jsx
**Location**: `Frontend/src/pages/EventsPage.jsx`

**Features**:
- Displays all events from Supabase database
- Background component with Vanta.js animation
- Responsive grid layout (1 column mobile, 2 columns tablet, 3 columns desktop)
- Glassmorphism card design
- Registration button that redirects to dashboard (or login if not authenticated)
- Shows event details: cover image, date, title, subtitle, description, location, registration deadline

### 2. events-seed-data.sql
**Location**: `Backend/events-seed-data.sql`

**Contains**: SQL script to seed 4 events:
1. **E-Chaupal** - Grassroots entrepreneurship drive (Feb 15, 2025)
2. **Startup Spotlight** - Campus pitch day (Mar 20, 2025)
3. **International Workshop** - International entrepreneur meetup (Apr 10, 2025)
4. **E-Clinic** - Way of Startup (May 5, 2025)

## Setup Instructions

### Step 1: Run the Seed Data
1. Open your Supabase SQL Editor
2. Copy the contents of `Backend/events-seed-data.sql`
3. Execute the SQL script to populate the events table

**Note**: You may need to update the `cover_image` URLs in the SQL script to point to:
- Hosted image URLs (recommended for production)
- Or import images to Supabase storage and use those URLs

### Step 2: Update Image Paths (Optional)
The seed data currently references local asset paths. To use actual images:
- Upload event images to Supabase Storage
- Update the `cover_image` URLs in the seed data
- Or use the admin panel to update images after seeding

### Step 3: Access the Events Page
Navigate to `/events` in your browser to see the events page.

## Admin Functionality

The Admin panel (`/admin`) already has full CRUD operations for events:

### ✅ Add Events
- Click the "Events" tab in Admin Dashboard
- Fill in the form:
  - Title (required)
  - Subtitle
  - Description
  - Cover Image URL
  - Date
  - Location  
  - Registration Deadline
- Click "Publish event"

### ✅ Edit Events
- Click "Edit" on any event card
- Modify the fields
- Click "Update event"

### ✅ Delete Events
- Click "Delete" on any event card
- Confirm deletion

## Route Added
The `/events` route has been added to `App.jsx` to make the Events page accessible.

## Event Registration Flow
1. User clicks "Register Now" on an event
2. If not logged in → Redirected to `/login` with return URL
3. If logged in → Redirected to `/dashboard` with event preselected
4. User fills registration form and submits

## Database Schema
The `events` table should have these columns:
- `id` (uuid, primary key)
- `title` (text)
- `subtitle` (text)
- `description` (text)
- `cover_image` (text)
- `date` (timestamp)
- `location` (text)
- `registration_deadline` (timestamp)
- `created_at` (timestamp)

All events functionality is ready to use! 🎉
