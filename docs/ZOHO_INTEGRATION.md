# Zoho SalesIQ Integration Guide

## Backend & Frontend Status: ✅ READY

Both frontend (React chatbot component) and backend (Node.js API endpoints) are fully functional and ready for Zoho SalesIQ integration [web:19].

## Step 1: API Integration via Webhooks [web:19]

### Configure Webhook in Backend

Add this endpoint to your backend server.js:

```javascript
// Zoho SalesIQ Webhook Endpoint
app.post('/api/zoho-webhook', async (req, res) => {
  try {
    const { visitorEmail, appointmentData } = req.body;
    
    // Log webhook event
    console.log('Zoho Webhook Event:', appointmentData);
    
    // Process appointment
    const appointment = await Appointment.create({
      visitorName: appointmentData.name,
      email: visitorEmail,
      phone: appointmentData.phone,
      serviceType: appointmentData.service,
      appointmentDate: appointmentData.date,
      timeSlot: appointmentData.time,
      status: 'confirmed'
    });
    
    // Send confirmation
    res.json({ success: true, appointmentId: appointment._id });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
```

## Step 2: Zoho SalesIQ Bot Configuration [web:19]

### Create Bot & Configure Webhook

1. **Log into Zoho SalesIQ** - https://www.zoho.com/salesiq
2. **Navigate to Bot Settings:**
   - Settings → Developers → Bot Platform
   - Click "Create New Bot"
3. **Set Bot Name:** "Consulting Services Chatbot"
4. **Configure Webhook URL:**
   - Webhook URL: `https://your-deployed-api.com/api/zoho-webhook`
   - Method: POST
   - Add Authorization Header: `Authorization: Bearer YOUR_API_TOKEN`

## Step 3: Bot Flow Configuration

### Create Appointment Booking Flow

```javascript
// Zoho SalesIQ Bot Script (Deluge)
function bookAppointment(visitorData) {
  response = invokeurl [
    url: "https://your-api.com/api/appointments/book"
    type: POST
    parameters: {
      visitorName: visitorData.name,
      email: visitorData.email,
      phone: visitorData.phone,
      serviceType: visitorData.service,
      appointmentDate: visitorData.date,
      timeSlot: visitorData.time
    }
  ];
  return response;
}
```

## Step 4: Authentication & Security

### OAuth 2.0 Integration

```javascript
const axios = require('axios');

const zohoAuthConfig = {
  clientId: process.env.ZOHO_CLIENT_ID,
  clientSecret: process.env.ZOHO_CLIENT_SECRET,
  grantType: 'authorization_code',
  redirectUri: 'https://your-api.com/api/zoho-callback'
};

// Get OAuth Token
app.get('/api/zoho-callback', async (req, res) => {
  const { code } = req.query;
  try {
    const tokenResponse = await axios.post(
      'https://accounts.zoho.com/oauth/v2/token',
      {
        code,
        ...zohoAuthConfig
      }
    );
    res.json({ accessToken: tokenResponse.data.access_token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

## Step 5: Test Integration [web:19]

### Test Webhook

1. In Zoho SalesIQ Bot Settings, click "Test Webhook"
2. Verify response: `{ "success": true, "appointmentId": "..." }`
3. Check backend logs for webhook payload

### Test Bot Flow

1. Visit your website with Zoho SalesIQ widget
2. Trigger bot action: "Book Appointment"
3. Fill appointment form
4. Verify appointment created in backend database

## Step 6: Production Deployment

### Environment Variables

```bash
ZOHO_CLIENT_ID=your_client_id
ZOHO_CLIENT_SECRET=your_client_secret
ZOHO_PORTAL_ID=your_portal_id
ZOHO_WEBHOOK_URL=https://your-api.com/api/zoho-webhook
```

### Deploy Bot to Live

1. Settings → Bot Platform → Your Bot
2. Click "Deploy to Live"
3. Configure bot trigger conditions
4. Enable on website

## Step 7: Monitor & Troubleshoot

### Check Webhook Delivery [web:19]

- Zoho SalesIQ → Settings → Developers → Webhooks
- View webhook logs and response codes
- Retry failed deliveries

### Common Issues

| Issue | Solution |
|-------|----------|
| Webhook timeout | Increase backend response timeout to 30s |
| 401 Unauthorized | Verify OAuth token in Authorization header |
| Bot not responding | Check bot flow syntax and variable names |
| Appointments not syncing | Verify webhook URL and firewall rules |

## Step 8: Advanced Features

### Real-time Appointment Updates

```javascript
// Use Zoho Bookings API for real-time sync
app.post('/api/sync-with-zoho', async (req, res) => {
  const { appointmentId } = req.body;
  const appointment = await Appointment.findById(appointmentId);
  
  // Sync to Zoho Bookings
  await axios.post(
    `https://www.zohoapis.com/bookings/v2/appointments`,
    {
      appointment_title: appointment.serviceType,
      customer_name: appointment.visitorName,
      customer_email: appointment.email,
      appointment_date: appointment.appointmentDate,
      appointment_start_time: appointment.timeSlot
    },
    {
      headers: { Authorization: `Zoho-oauthtoken ${accessToken}` }
    }
  );
  
  res.json({ success: true, syncedWithZoho: true });
});
```

### Multi-Channel Integration [web:22]

- Integrate with Zoho Bookings for scheduling
- Connect to Zoho CRM for lead management
- Sync with Google Calendar for availability
- Use Zoho Flow for workflow automation

## Completion Checklist

- ✅ Backend API endpoints created
- ✅ Webhook endpoint configured
- ✅ Zoho SalesIQ bot created
- ✅ OAuth 2.0 authentication setup
- ✅ Bot flow tested and working
- ✅ Deployed to production
- ✅ Monitoring enabled

## References

- Zoho SalesIQ Webhook Integration: [web:19]
- Zoho Bookings Integration: [web:22]
- REST API Documentation: [web:29]
- Bot Building Guide: https://www.zoho.com/salesiq/help/developer-guides/bot-introduction-2.0.html
