# Project Architecture - Zoho SalesIQ Consulting Chatbot

## System Design Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend Layer                           │
│  React.js | Chat UI | Appointment Form | Analytics Dashboard│
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│              API Gateway / Express Server                    │
│      /api/appointments | /api/chats | /webhook/salesiq      │
└────────────────────────┬────────────────────────────────────┘
                         │
        ┌────────────────┼────────────────┐
        ▼                ▼                ▼
   Backend Services  MongoDB          Zoho Platform
   - Auth            - Chats          - SalesIQ
   - Validation      - Visitors       - Deluge
   - OTP             - Analytics      - OAuth
   - Email/SMS       - Appointments   - Webhooks

```

## Directory Structure

```
consulting-services-chatbot/
├── backend/
│   ├── zoho/
│   │   ├── zoho_deluge_backend.ds       # Appointment management script
│   │   ├── zoho_salesiq_webhook.js      # Webhook event handler
│   │   └── zoho_salesiq_config.json     # Configuration & environment
│   ├── routes/
│   │   └── appointments.js              # API endpoints
│   ├── server.js                        # Express server
│   └── package.json                     # Dependencies
├── docs/
│   └── API_DOCUMENTATION.md
├── ZOHO_DEPLOYMENT_GUIDE.md            # Deployment instructions
├── PROJECT_ARCHITECTURE.md              # This file
├── DEPLOYMENT_GUIDE.md                  # Production checklist
├── README.md                            # Project overview
└── .env.example                         # Environment template
```

## Core Components

### 1. Backend Services (Node.js/Express)
- **Appointment Management API**: CRUD operations for bookings
- **Visitor Chat Handler**: Real-time message processing
- **Authentication Service**: OAuth 2.0 with Zoho
- **Notification Service**: Email & SMS integration
- **Analytics Collector**: Event tracking and metrics

### 2. Zoho Deluge Backend Script
Handles server-side business logic:
- **Appointment Creation**: Validation, slot checking, booking confirmation
- **OTP Generation**: 6-digit random code with 10-minute expiry
- **Email Notifications**: SendGrid integration for confirmations
- **SMS Alerts**: Twilio integration for OTP delivery
- **Database Sync**: MongoDB backend API calls

### 3. SalesIQ Integration
- **Real-time Chat**: Widget embedded in web pages
- **Visitor Tracking**: Anonymous visitor identification
- **Chat History**: Persistent storage of conversations
- **Agent Assignment**: Automatic routing to support teams
- **Analytics**: Visitor behavior and engagement metrics

### 4. MongoDB Collections

**chats**
```json
{
  "_id": ObjectId,
  "visitorId": String,
  "agentId": String,
  "messages": [{"sender": "", "text": "", "timestamp": ""}],
  "status": "active|closed",
  "rating": Number,
  "feedback": String,
  "createdAt": Date,
  "closedAt": Date
}
```

**visitors**
```json
{
  "_id": ObjectId,
  "salesiqId": String,
  "email": String,
  "phone": String,
  "name": String,
  "location": String,
  "chats": [ObjectId],
  "totalChats": Number,
  "lastActive": Date,
  "createdAt": Date
}
```

**appointments**
```json
{
  "_id": ObjectId,
  "visitorEmail": String,
  "visitorName": String,
  "service": String,
  "preferredDate": Date,
  "preferredTime": String,
  "otpVerified": Boolean,
  "status": "pending|confirmed|completed|cancelled",
  "createdAt": Date,
  "confirmationSent": Boolean
}
```

## API Endpoints

### Appointments
- `POST /api/appointments` - Create new appointment
- `GET /api/appointments/:id` - Retrieve appointment
- `PUT /api/appointments/:id` - Update appointment
- `GET /api/appointments/visitor/:email` - Get visitor's appointments

### Chats
- `GET /api/chats` - List all chats
- `GET /api/chats/:id` - Get chat details
- `POST /api/chats/:id/message` - Add message to chat
- `PUT /api/chats/:id/close` - Close chat

### Webhooks
- `POST /webhook/salesiq` - Handle SalesIQ events
  - `visitor.message.received`
  - `chat.assigned`
  - `chat.closed`

## Data Flow

### Appointment Booking Flow
1. User fills form on website → Frontend API call
2. Backend validates input → Calls Zoho Deluge script
3. Deluge script checks availability → MongoDB query
4. OTP generated → SMS via Twilio
5. User enters OTP → Verification
6. Appointment confirmed → Email via SendGrid
7. Record saved → MongoDB + Zoho CRM

### Chat Message Flow
1. Visitor sends message in SalesIQ widget
2. Webhook triggered → Backend receives event
3. Message logged → MongoDB chats collection
4. Route to agent → Department-based assignment
5. Agent notified → Real-time notification
6. Response tracked → Analytics updated

## Security Architecture

- **Authentication**: OAuth 2.0 with Zoho (refresh token flow)
- **Webhook Verification**: HMAC-SHA256 signature validation
- **Data Encryption**: TLS 1.3 for all communications
- **API Keys**: Environment variables, never hardcoded
- **Rate Limiting**: Per IP, per user rate limits
- **CORS**: Restricted to authorized domains
- **Input Validation**: Server-side validation on all inputs

## Deployment Architecture

```
[GitHub Repository]
         ▼
[CI/CD Pipeline]
         ▼
[Docker Container]
         ▼
[Cloud Hosting (Heroku/Render/AWS)]
         ▼
[MongoDB Atlas] + [Zoho Platform] + [Third-party APIs]
```

## Performance Considerations

- **Caching**: Redis for session and chat cache
- **Database Indexing**: Indexes on frequently queried fields
- **Connection Pooling**: MongoDB connection pool management
- **Async Processing**: Queue for email/SMS sending
- **CDN**: Static assets served from CDN

## Monitoring & Observability

- **Logging**: ELK Stack for centralized logging
- **Metrics**: Prometheus for performance metrics
- **Tracing**: OpenTelemetry for distributed tracing
- **Alerting**: PagerDuty for critical alerts
- **Analytics**: Google Analytics for user behavior

## Scalability Plan

1. **Horizontal Scaling**: Multiple Express server instances
2. **Database Sharding**: MongoDB sharding by visitor ID
3. **Load Balancing**: Nginx reverse proxy
4. **Message Queue**: RabbitMQ for async operations
5. **Microservices**: Separate services for notifications, analytics
