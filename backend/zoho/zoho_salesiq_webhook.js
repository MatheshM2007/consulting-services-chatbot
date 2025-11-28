// Zoho SalesIQ Webhook Handler for consulting services chatbot
// Handles visitor messages, chat assignments, and engagement tracking
// Version: 1.0

const crypto = require('crypto');
const axios = require('axios');

class SalesIQWebhookHandler {
  constructor(config) {
    this.clientId = config.clientId;
    this.clientSecret = config.clientSecret;
    this.baseUrl = 'https://api.salesiq.zoho.com/v2';
  }

  // Verify webhook signature
  verifyWebhookSignature(req, secret) {
    const signature = req.headers['x-zoho-signature'];
    if (!signature) return false;
    const payload = JSON.stringify(req.body);
    const hash = crypto.createHmac('sha256', secret).update(payload).digest('base64');
    return hash === signature;
  }

  // Handle visitor message
  async handleVisitorMessage(event) {
    try {
      const { visitorId, message, visitorEmail, departmentId } = event;
      const response = {
        visitorId,
        message,
        departmentId,
        timestamp: new Date(),
        status: 'received'
      };
      return { success: true, response };
    } catch (error) {
      console.error('Error in visitor message:', error);
      return { success: false, error: error.message };
    }
  }

  // Handle chat assignment
  async handleChatAssignment(event) {
    try {
      const { chatId, agentId, visitorId, departmentId } = event;
      const assignmentData = {
        chatId, agentId, visitorId, departmentId,
        assignedAt: new Date()
      };
      return { success: true, assignmentData };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Handle chat closure with feedback
  async handleChatClosure(event) {
    try {
      const { chatId, rating, feedback } = event;
      const closureData = {
        chatId, rating, feedback,
        closedAt: new Date()
      };
      return { success: true, closureData };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

module.exports = SalesIQWebhookHandler;
