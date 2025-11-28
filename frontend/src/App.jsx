import React, { useState, useEffect } from 'react';
import { FiMessageCircle, FiX, FiSend, FiPhone, FiMail, FiCalendar } from 'react-icons/fi';
import './App.css';

const App = () => {
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Welcome to Consulting Services! How can I assist you today?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [step, setStep] = useState('welcome');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredDate: '',
    serviceType: ''
  });
  const [isOpen, setIsOpen] = useState(false);

  const services = [
    { id: 1, name: 'Business Consultation', desc: '60 min strategic consultation' },
    { id: 2, name: 'Financial Planning', desc: '45 min financial advice' },
    { id: 3, name: 'Career Coaching', desc: '30 min career guidance' },
    { id: 4, name: 'Legal Advisory', desc: '45 min legal consultation' }
  ];

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    setMessages([...messages, { type: 'user', text: inputValue }]);
    
    if (step === 'welcome') {
      setMessages(prev => [...prev, 
        { type: 'bot', text: 'Great! Let\'s start your booking. First, what is your name?' }
      ]);
      setStep('name');
    } else if (step === 'name') {
      setFormData({ ...formData, name: inputValue });
      setMessages(prev => [...prev, 
        { type: 'bot', text: 'Nice to meet you! What\'s your email address?' }
      ]);
      setStep('email');
    } else if (step === 'email') {
      setFormData({ ...formData, email: inputValue });
      setMessages(prev => [...prev, 
        { type: 'bot', text: 'And your phone number?' }
      ]);
      setStep('phone');
    } else if (step === 'phone') {
      setFormData({ ...formData, phone: inputValue });
      setMessages(prev => [...prev, 
        { type: 'bot', text: 'Perfect! Your information has been recorded.' }
      ]);
      setStep('service');
    }
    
    setInputValue('');
  };

  const selectService = (service) => {
    setFormData({ ...formData, serviceType: service.name });
    setMessages([...messages, 
      { type: 'user', text: `I want to book: ${service.name}` },
      { type: 'bot', text: `Excellent! I've noted you want a ${service.name}. What date works best for you?` }
    ]);
    setStep('date');
  };

  const bookAppointment = async () => {
    try {
      const response = await fetch('/api/appointments/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setMessages(prev => [...prev, 
          { type: 'bot', text: 'Your appointment has been confirmed! Check your email for details.' }
        ]);
        setStep('complete');
      }
    } catch (error) {
      setMessages(prev => [...prev, 
        { type: 'bot', text: 'Sorry, there was an error. Please try again.' }
      ]);
    }
  };

  return (
    <div className="app">
      {!isOpen ? (
        <button 
          className="chatbot-toggle"
          onClick={() => setIsOpen(true)}
          title="Open Chatbot"
        >
          <FiMessageCircle size={24} />
        </button>
      ) : (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h3>Consulting Services Chatbot</h3>
            <button 
              className="close-btn"
              onClick={() => setIsOpen(false)}
            >
              <FiX />
            </button>
          </div>
          
          <div className="messages-container">
            {messages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.type}`}>
                {msg.text}
              </div>
            ))}
          </div>
          
          {step === 'service' && (
            <div className="services-carousel">
              {services.map(service => (
                <button
                  key={service.id}
                  className="service-card"
                  onClick={() => selectService(service)}
                >
                  <strong>{service.name}</strong>
                  <small>{service.desc}</small>
                </button>
              ))}
            </div>
          )}
          
          {step !== 'complete' && (
            <div className="input-area">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                className="message-input"
              />
              <button onClick={handleSendMessage} className="send-btn">
                <FiSend />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
