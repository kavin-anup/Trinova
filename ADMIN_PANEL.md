# CMS Admin Panel Guide

## Overview

The CMS Admin Panel is a password-protected interface for managing all website content, including:
- Hero slides
- Services
- Testimonials
- Customer inquiries
- Media library
- Site configuration

## Access

**URL:** `http://localhost:5173/admin/login` (or your deployed URL + `/admin/login`)

**Default Credentials:**
- Email: Set in backend `.env` file (`ADMIN_EMAIL`)
- Password: Set in backend `.env` file (`ADMIN_PASSWORD`)

⚠️ **Important:** Change the default password after first login!

## Features

### 1. Dashboard (`/admin/dashboard`)
- Overview statistics
- Quick actions
- Recent activity

### 2. Hero Slides (`/admin/hero-slides`)
- Add, edit, delete hero slides
- Upload images
- Set order and active status
- Manage titles, descriptions, and CTAs

### 3. Services (`/admin/services`)
- Manage service cards
- Add icons, descriptions
- Set active/inactive status

### 4. Testimonials (`/admin/testimonials`)
- Add client testimonials
- Upload client images
- Set ratings
- Publish/unpublish

### 5. Customer Inquiries (`/admin/inquiries`)
- View all contact form submissions
- Filter by status (new, contacted, closed)
- Mark as read/unread
- Export to CSV
- Update inquiry status

### 6. Media Library (`/admin/media`)
- Upload multiple images
- View all uploaded media
- Copy image URLs
- Delete images

### 7. Settings (`/admin/settings`)
- Update site name, logo, contact info
- Change admin password
- Manage site configuration

## Setup

### 1. Environment Variables

Add to your `.env` file (or `vite.config.ts`):

```env
VITE_API_URL=http://localhost:5000/api
```

### 2. Backend Connection

Ensure your backend is running and accessible at the `VITE_API_URL`.

### 3. First Login

1. Start the backend server
2. Navigate to `/admin/login`
3. Use credentials from backend `.env`
4. Change password in Settings after login

## Usage Tips

### Image Uploads
- Supported formats: JPG, PNG, WEBP, GIF
- Maximum file size: 10MB (configurable in backend)
- Images are stored locally in `uploads/images/` directory

### Content Management
- All changes are saved immediately
- Use "Active" toggle to show/hide content
- Order can be managed via `order_index` field

### Customer Inquiries
- New inquiries appear with a blue badge
- Click on an inquiry to view full details
- Update status to track follow-up progress
- Export to CSV for external analysis

## Security

- All admin routes are protected with JWT authentication
- Tokens expire after 7 days (configurable)
- Passwords are hashed using bcrypt
- Rate limiting on authentication endpoints

## Troubleshooting

### Can't Login
- Verify backend is running
- Check `VITE_API_URL` is correct
- Verify credentials in backend `.env`
- Check browser console for errors

### Images Not Uploading
- Check backend uploads directory permissions
- Verify file size is under limit
- Check backend logs for errors

### API Errors
- Verify backend is running
- Check CORS configuration in backend
- Verify JWT token is valid (try logging out and back in)

## Support

For issues or questions, check:
1. Backend logs
2. Browser console
3. Network tab in browser dev tools

