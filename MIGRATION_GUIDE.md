# The Sandwich Project - Vercel Migration

This document contains the migration instructions from Replit to Vercel.

## ✅ Migration Status

### Completed
- ✅ Removed Replit-specific dependencies (`@replit/vite-plugin-cartographer`, `@replit/vite-plugin-runtime-error-modal`)
- ✅ Updated `vite.config.ts` to remove Replit plugins
- ✅ Removed Replit dev banner from HTML
- ✅ Replaced Replit auth with standard authentication system
- ✅ Created Vercel configuration (`vercel.json`)
- ✅ Added Vercel build script
- ✅ Created environment variables template

### Next Steps
1. Deploy to Vercel
2. Configure environment variables in Vercel dashboard
3. Test all functionality
4. Set up custom domain (optional)

## 🚀 Deployment Instructions

### 1. Connect to Vercel
```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy from the project root
vercel --prod
```

### 2. Configure Environment Variables
In your Vercel dashboard, add these environment variables:

**Required:**
- `DATABASE_URL` - Your existing Neon PostgreSQL connection string
- `SESSION_SECRET` - A secure random string for session encryption

**Optional:**
- `SENDGRID_API_KEY` - For email notifications
- `GOOGLE_SHEETS_CLIENT_EMAIL` - For Google Sheets integration
- `GOOGLE_SHEETS_PRIVATE_KEY` - For Google Sheets integration

### 3. Test Deployment
After deployment, visit your Vercel URL and:
- ✅ Verify login page loads at `/api/login`
- ✅ Test user registration and login
- ✅ Check that all pages load correctly
- ✅ Test core functionality (collections, messaging, etc.)

## 🔒 Authentication System

The app now uses a standard authentication system with:
- **Default admin user:** `admin@sandwich.project` / `admin123`
- **Registration:** Users can register at `/api/login`
- **Session-based auth:** Uses PostgreSQL for session storage
- **Role-based permissions:** Admin, coordinator, volunteer, etc.

## 🎯 Key Changes Made

### Removed Replit Dependencies
- No more `@replit/vite-plugin-cartographer`
- No more `@replit/vite-plugin-runtime-error-modal`
- No more Replit dev banner
- No more Replit-specific environment variables

### Authentication Updates
- Replaced Replit OAuth with standard login/registration
- Kept all existing user roles and permissions
- Session storage uses PostgreSQL (same as before)

### Build Configuration
- Updated for Vercel serverless deployment
- Frontend builds to `dist/public`
- Backend runs as serverless function
- Static assets served from `attached_assets`

## 📊 Database

**No changes needed!** Your existing Neon PostgreSQL database will continue to work perfectly with Vercel.

## 🆘 Troubleshooting

If you encounter issues:
1. Check Vercel function logs in the dashboard
2. Verify environment variables are set correctly
3. Test database connection with `DATABASE_URL`
4. Ensure build completes successfully

## 🔄 Rollback Plan

If needed, you can always:
1. Switch back to the `main` branch
2. Redeploy to Replit
3. All data remains in the same database