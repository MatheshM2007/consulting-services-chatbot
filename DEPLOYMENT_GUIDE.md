# Deployment Guide - Consulting Services Chatbot

## Quick Deploy (5 minutes)

### Option 1: Railway.app (Recommended)

1. **Backend Deployment**
   - Go to https://railway.app
   - Click "New Project" → Import GitHub Repo
   - Select your repository
   - Railway auto-detects Node.js
   - Add environment variables:
     - PORT=5000
     - Add other necessary env vars
   - Deploy (automatic)
   - Get API URL from Railway dashboard

2. **Frontend Deployment (Vercel)**
   - Go to https://vercel.com
   - Import GitHub repository
   - Add environment variable: `REACT_APP_API_URL=your_railway_api_url`
   - Deploy (automatic)
   - Get frontend URL

### Option 2: Heroku

```bash
heroku login
cd backend
heroku create your-app-name
git push heroku main
heroku config:set PORT=5000
```

## Production Deployment Checklist

- [ ] Backend deployed and accessible
- [ ] Frontend deployed and accessible
- [ ] Environment variables configured
- [ ] CORS enabled for frontend domain
- [ ] Database connection verified
- [ ] API endpoints tested
- [ ] Zoho SalesIQ webhook configured
- [ ] SSL/HTTPS enabled
- [ ] Rate limiting configured
- [ ] Error logging enabled

## Zoho SalesIQ Configuration

1. Log into Zoho SalesIQ
2. Create new bot
3. Set webhook URL: `https://your-backend.com/api/appointments/book`
4. Test webhook
5. Deploy bot to live

## Monitoring

- Monitor API response times
- Check error logs daily
- Monitor database storage
- Track user engagement metrics

## Rollback Plan

If deployment fails:
1. Check application logs
2. Verify environment variables
3. Restart application
4. Contact support if needed
