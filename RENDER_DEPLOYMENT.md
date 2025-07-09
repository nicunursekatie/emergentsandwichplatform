# The Sandwich Project - Render Deployment Guide

## Prerequisites

1. **Render Account**: Sign up at [render.com](https://render.com)
2. **GitHub Repository**: Your code should be in a GitHub repository
3. **Environment Variables**: Prepare your environment variables

## Deployment Steps

### Method 1: Using render.yaml (Recommended)

1. **Connect GitHub Repository**
   - Go to Render Dashboard
   - Click "New" → "Blueprint"
   - Connect your GitHub repository
   - Render will automatically detect the `render.yaml` file

2. **Environment Variables**
   The following variables will be automatically configured:
   - `DATABASE_URL`: Auto-generated from PostgreSQL service
   - `SESSION_SECRET`: Auto-generated secure value
   - `NODE_ENV`: Set to "production"
   - `PORT`: Set to 10000 (Render's default)

3. **Additional Variables** (Add manually if needed):
   - `SENDGRID_API_KEY`: Your SendGrid API key
   - `GOOGLE_SHEETS_CLIENT_EMAIL`: For Google Sheets integration
   - `GOOGLE_SHEETS_PRIVATE_KEY`: For Google Sheets integration

### Method 2: Manual Setup

1. **Create PostgreSQL Database**
   - Go to Render Dashboard
   - Click "New" → "PostgreSQL"
   - Choose plan (Free tier available)
   - Note the connection details

2. **Create Web Service**
   - Go to Render Dashboard
   - Click "New" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name**: `sandwich-platform-backend`
     - **Environment**: `Node`
     - **Region**: `Oregon` (or closest to your users)
     - **Branch**: `main`
     - **Build Command**: `npm install && npm run build`
     - **Start Command**: `npm start`

3. **Set Environment Variables**
   ```
   NODE_ENV=production
   DATABASE_URL=postgresql://username:password@host:port/database
   SESSION_SECRET=your-long-random-string
   PORT=10000
   SENDGRID_API_KEY=your-sendgrid-key
   ```

## Database Setup

After deployment, run database migrations:

1. **Connect to your service**
   - Go to your web service in Render
   - Click "Shell" tab
   - Run: `npm run db:push`

2. **Verify database connection**
   - Your app should automatically create tables on first run
   - Check the logs for successful database initialization

## Environment Variables Reference

### Required Variables
- `DATABASE_URL`: PostgreSQL connection string (auto-generated)
- `SESSION_SECRET`: Session encryption key (auto-generated)
- `NODE_ENV`: Set to "production"
- `PORT`: Set to 10000

### Optional Variables
- `SENDGRID_API_KEY`: For email notifications
- `GOOGLE_SHEETS_CLIENT_EMAIL`: For Google Sheets integration
- `GOOGLE_SHEETS_PRIVATE_KEY`: For Google Sheets integration

## Post-Deployment

1. **Test the deployment**
   - Visit your Render URL
   - Check `/health` endpoint
   - Verify database connectivity

2. **Create admin user**
   - The system should auto-create an admin user
   - Default login: `admin@sandwich.project` / `admin123`

3. **Configure custom domain** (optional)
   - Go to your web service settings
   - Add your custom domain
   - Configure DNS records

## Monitoring and Logs

- **Logs**: Available in Render dashboard under your service
- **Health Check**: Configured at `/health` endpoint
- **Metrics**: Available in Render dashboard

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check that all dependencies are in `package.json`
   - Verify TypeScript compiles without errors

2. **Database Connection Issues**
   - Verify `DATABASE_URL` is correctly set
   - Check PostgreSQL service is running

3. **Environment Variables**
   - Ensure all required variables are set
   - Check for typos in variable names

### Support

- Check Render documentation: [render.com/docs](https://render.com/docs)
- Check application logs in Render dashboard
- Monitor health check endpoint: `https://your-app.render.com/health`

## Cost Considerations

- **Starter Plan**: $7/month for web service
- **PostgreSQL**: $7/month for database
- **Free Tier**: Available with limitations (spins down after inactivity)

## Security Notes

- All connections are HTTPS by default
- Database connections are encrypted
- Session secrets are auto-generated
- Regular security updates via Render platform
