# Consulting Services Chatbot - Cliqtrix 2025

## 🚀 Project Overview

A **professional-grade Consulting Services Chatbot** built for Zoho Cliqtrix 2025 coding contest. This chatbot enables seamless appointment booking, management, and integration with third-party scheduling services through Zoho SalesIQ.

### ✨ Key Features

✅ **Appointment Booking System**
- Display service types using carousel cards
- Collect visitor information (name, email, phone, preferred date)
- OTP phone verification
- Real-time availability checking
- Time slot selection and booking
- Automated confirmation emails

✅ **Appointment Management**
- View existing appointments
- Reschedule appointments
- Cancel appointments with notifications

✅ **Advanced Features**
- OAuth 2.0 3rd-party authentication
- Multi-language support ready
- Real-time visitor engagement
- Workflow automation triggers
- Custom AI recommendations

---

## 🏗️ Tech Stack

### Backend
- **Runtime**: Node.js 16+
- **Framework**: Express.js 4.18+
- **Database**: MongoDB 5.0+
- **Authentication**: JWT + OAuth 2.0
- **APIs**: Twilio, SendGrid, Acuity Scheduling

### Frontend
- **Library**: React 18+
- **State**: Redux/Context API
- **Styling**: Tailwind CSS
- **Package Manager**: npm/yarn

### Integration
- **Platform**: Zoho SalesIQ
- **Deployment**: Heroku/Railway/AWS
- **CI/CD**: GitHub Actions

---

## 📋 Project Structure

```
consulting-services-chatbot/
├── backend/
│   ├── routes/
│   │   ├── appointments.js
│   │   ├── auth.js
│   │   └── users.js
│   ├── models/
│   │   ├── Appointment.js
│   │   └── User.js
│   ├── middleware/
│   │   └── auth.js
│   ├── utils/
│   │   ├── emailService.js
│   │   ├── otpService.js
│   │   └── schedulingAPI.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   ├── package.json
│   └── .env.example
├── docs/
│   ├── API_DOCUMENTATION.md
│   └── ZOHO_INTEGRATION.md
├── README.md
└── .gitignore
```

---

## ⚡ Quick Start

### Prerequisites
- Node.js 16+ and npm/yarn
- MongoDB Atlas account
- Zoho SalesIQ account
- Git

### Installation

1. **Clone Repository**
```bash
git clone https://github.com/YourUsername/consulting-services-chatbot.git
cd consulting-services-chatbot
```

2. **Backend Setup**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your credentials
npm run dev
```

3. **Frontend Setup**
```bash
cd ../frontend
npm install
cp .env.example .env
# Edit .env with API URL
npm start
```

---

## 🔧 Configuration

### Environment Variables

**Backend (.env)**
```
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/chatbot
JWT_SECRET=your_secret_key
SENDGRID_API_KEY=your_key
TWILIO_ACCOUNT_SID=your_sid
TWILIO_AUTH_TOKEN=your_token
ACUITY_USER_ID=your_id
ACUITY_API_KEY=your_key
```

**Frontend (.env)**
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ZOHO_KEY=your_zoho_key
```

---

## 📡 API Endpoints

### Appointments
- `POST /api/appointments/book` - Book appointment
- `GET /api/appointments/:email` - Get user appointments
- `PUT /api/appointments/:id` - Update appointment
- `DELETE /api/appointments/:id` - Cancel appointment
- `POST /api/appointments/verify-otp` - Verify phone OTP

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/refresh` - Refresh JWT token

---

## 🔌 Zoho SalesIQ Integration

1. Create bot in Zoho SalesIQ dashboard
2. Configure webhook to backend API
3. Deploy bot flow configuration
4. Test with sample visitors

---

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd ../frontend
npm test
```

---

## 📦 Deployment

### Deploy to Heroku
```bash
heroku create your-app-name
git push heroku main
```

### Deploy Frontend
- Netlify/Vercel: Connect GitHub repo
- AWS: S3 + CloudFront

---

## 📝 Documentation

- [API Documentation](./docs/API_DOCUMENTATION.md)
- [Zoho Integration Guide](./docs/ZOHO_INTEGRATION.md)
- [Architecture Overview](./docs/ARCHITECTURE.md)

---

## 🎯 Requirements Met

- ✅ Appointment booking workflow
- ✅ OTP verification
- ✅ 3rd-party scheduling integration
- ✅ Email notifications
- ✅ Appointment management (update/reschedule/cancel)
- ✅ OAuth 2.0 authentication
- ✅ AI-powered recommendations
- ✅ Zoho SalesIQ integration

---

## 👤 Author

Mathesh M - [GitHub](https://github.com/MatheshM2007)

---

## 📄 License

This project is licensed under the ISC License - see LICENSE file for details.

---

## 🤝 Support

For issues, contact: support@cliqtrix.com

**Built with ❤️ for Cliqtrix 2025**
