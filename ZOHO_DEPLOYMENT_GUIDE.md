# Zoho SalesIQ Consulting Services Chatbot - Deployment Guide

## Project Overview
A professional-grade consulting services chatbot built with Node.js, React, and MongoDB, integrated with Zoho SalesIQ for real-time chat, visitor tracking, and engagement metrics.

## Architecture Components

### Backend (Node.js/Express)
- **Appointment Management**: Zoho Deluge script for booking, validation, and OTP verification
- **SalesIQ Integration**: Webhook handlers for real-time chat events
- **MongoDB Integration**: Persistent data storage for chats, visitors, and analytics

### Frontend (React)
- Real-time chat interface
- Appointment booking form
- Visitor tracking dashboard
- Analytics visualization

### Zoho Integration
1. **Deluge Backend Script** (`zoho_deluge_backend.ds`)
   - Handles appointment creation and management
   - OTP generation via Twilio
   - Email confirmation via SendGrid
   - MongoDB backend API integration

2. **SalesIQ Webhook Handler** (`zoho_salesiq_webhook.js`)
   - Processes visitor messages
   - Manages chat assignments
   - Tracks chat closure and feedback
   - Real-time visitor engagement

## Installation & Setup

### Prerequisites
- Node.js 14+
- MongoDB instance
- Zoho SalesIQ account with API access
- Twilio account for SMS
- SendGrid account for email

### Environment Variables
Create `.env` file in backend directory:
```
ZOHO_CLIENT_ID=your_client_id
ZOHO_CLIENT_SECRET=your_client_secret
ZOHO_ORG_ID=your_org_id
ZOHO_WEBHOOK_SECRET=your_webhook_secret
MONGODB_URI=mongodb://your_uri
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
SENDGRID_API_KEY=your_sendgrid_key
WEBHOOK_URL=https://your_domain.com
```

### Installation Steps

1. **Clone Repository**
   ```bash
   git clone https://github.com/MatheshM2007/consulting-services-chatbot.git
   cd consulting-services-chatbot
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Configure Zoho Integration**
   - Copy `backend/zoho/zoho_salesiq_config.json` to your config directory
   - Update environment variables

4. **Start Backend Server**
   ```bash
   npm start
   ```

5. **Configure Zoho SalesIQ Webhook**
   - Go to SalesIQ Settings > Webhooks
   - Add webhook URL: `{WEBHOOK_URL}/webhook/salesiq`
   - Select events: Visitor Message, Chat Assignment, Chat Closure

## API Endpoints

### Appointments
- `POST /api/appointments` - Create appointment
- `GET /api/appointments/:id` - Get appointment details
- `PUT /api/appointments/:id` - Update appointment

### SalesIQ Integration
- `POST /webhook/salesiq` - Handle SalesIQ events
- `GET /api/chats` - Retrieve chat history
- `GET /api/visitors` - Get visitor data

## Deployment to Zoho Platform

### Step 1: Deploy Backend to Zoho Ecosystem
1. Build the Node.js backend: `npm run build`
2. Configure Zoho API OAuth credentials
3. Deploy to your hosting (Heroku, Render, AWS, etc.)

### Step 2: Configure Zoho SalesIQ Widget
1. Navigate to SalesIQ Admin > Chat Widget
2. Customize widget appearance
3. Configure chat departments and routing
4. Enable analytics tracking

### Step 3: Set Up Webhooks
1. Define webhook endpoints for visitor events
2. Configure authentication tokens
3. Test webhook delivery
4. Enable error logging and monitoring

### Step 4: Database Setup
1. Create MongoDB collections:
   - `chats` - Chat messages and history
   - `visitors` - Visitor profiles and data
   - `appointments` - Booking records
   - `analytics` - Engagement metrics

## Monitoring & Analytics

### Key Metrics
- Visitor engagement rate
- Chat response time
- Appointment conversion rate
- Customer satisfaction ratings

### Logging
- Enable SalesIQ event logging
- MongoDB query logging
- API request/response logging

## Troubleshooting

### Webhook Not Receiving Events
- Verify webhook URL is publicly accessible
- Check firewall rules and security groups
- Validate webhook secret in config

### MongoDB Connection Issues
- Verify connection string in .env
- Check database user permissions
- Ensure IP whitelist includes server

### Zoho API Errors
- Refresh OAuth tokens
- Validate API rate limits
- Check organization ID configuration

## Security Considerations

1. **Authentication**: Use OAuth 2.0 for Zoho integration
2. **Data Encryption**: Enable SSL/TLS for all connections
3. **API Keys**: Store securely in environment variables
4. **Webhook Verification**: Validate webhook signatures
5. **Rate Limiting**: Implement API rate limiting

## Support & Maintenance

- Monitor API quotas and limits
- Regular security audits
- Update dependencies monthly
- Backup MongoDB data regularly
- Review analytics and user feedback

## License
MIT License - See LICENSE file for details
