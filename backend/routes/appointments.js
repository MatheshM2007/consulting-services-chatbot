const express = require('express');
const router = express.Router();

// Mock DB - Replace with MongoDB in production
let appointments = [];

// Book appointment
router.post('/book', async (req, res) => {
  const { visitorName, email, phone, serviceType, appointmentDate, timeSlot } = req.body;
  const appointment = { id: Date.now(), visitorName, email, phone, serviceType, appointmentDate, timeSlot, status: 'confirmed', otpVerified: true, createdAt: new Date() };
  appointments.push(appointment);
  res.json({ success: true, appointment, message: 'Appointment booked!' });
});

// Get appointments
router.get('/:email', (req, res) => {
  const userAppts = appointments.filter(a => a.email === req.params.email);
  res.json(userAppts);
});

// Update appointment
router.put('/:id', (req, res) => {
  const apt = appointments.find(a => a.id == req.params.id);
  if (apt) { Object.assign(apt, req.body); }
  res.json(apt);
});

// Cancel appointment
router.delete('/:id', (req, res) => {
  appointments = appointments.map(a => a.id == req.params.id ? { ...a, status: 'cancelled' } : a);
  res.json({ success: true, message: 'Cancelled' });
});

// Verify OTP
router.post('/verify-otp', (req, res) => {
  res.json({ success: true, verified: true });
});

module.exports = router;
