# Pre-Deployment Checklist

## Before Deployment
- [ ] Vercel CLI installed (`npm install -g vercel`)
- [ ] Logged into Vercel account (`vercel login`)
- [ ] Gathered environment variables from Replit
- [ ] Tested local build (`npm run vercel-build`)

## Environment Variables Needed
- [ ] DATABASE_URL (from Replit secrets)
- [ ] SESSION_SECRET (from Replit secrets or generate new)
- [ ] SENDGRID_API_KEY (if using email features)
- [ ] NODE_ENV=production

## Deployment Steps
- [ ] Run `vercel --prod`
- [ ] Answer setup questions
- [ ] Add environment variables in Vercel dashboard
- [ ] Redeploy with `vercel --prod`
- [ ] Test deployment URL

## Post-Deployment Testing
- [ ] Visit deployment URL
- [ ] Test login page (`/api/login`)
- [ ] Login with admin@sandwich.project / admin123
- [ ] Test core functionality:
  - [ ] Dashboard loads
  - [ ] Collections page works
  - [ ] Messaging system functions
  - [ ] User management accessible
  - [ ] Reports generate

## Optional
- [ ] Set up custom domain
- [ ] Configure DNS records
- [ ] Monitor function logs
- [ ] Set up alerts