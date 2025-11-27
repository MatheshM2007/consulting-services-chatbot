# API Documentation - Consulting Services Chatbot

## Base URL
`https://your-deployed-api.com/api`

## Endpoints

### 1. Book Appointment
**POST** `/appointments/book`

Request:
```json
{
  "visitorName": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "serviceType": "Consultation",
  "appointmentDate": "2025-12-15",
  "timeSlot": "10:00 AM"
}
```

Response:
```json
{
  "success": true,
  "appointment": {
    "id": 1234567890,
    "visitorName": "John Doe",
    "email": "john@example.com",
    "status": "confirmed",
    "otpVerified": true
  },
  "message": "Appointment booked!"
}
```

### 2. Get User Appointments
**GET** `/appointments/:email`

Response:
```json
[
  {
    "id": 1234567890,
    "visitorName": "John Doe",
    "serviceType": "Consultation",
    "appointmentDate": "2025-12-15",
    "status": "confirmed"
  }
]
```

### 3. Update Appointment
**PUT** `/appointments/:id`

Request:
```json
{
  "appointmentDate": "2025-12-20",
  "timeSlot": "2:00 PM"
}
```

### 4. Cancel Appointment
**DELETE** `/appointments/:id`

Response:
```json
{
  "success": true,
  "message": "Cancelled"
}
```

### 5. Verify OTP
**POST** `/appointments/verify-otp`

Request:
```json
{
  "appointmentId": 1234567890,
  "otp": "123456"
}
```

## Response Codes
- `200` - Success
- `400` - Bad Request
- `404` - Not Found
- `500` - Server Error

## Error Handling
All errors return:
```json
{
  "success": false,
  "error": "Error message"
}
```
