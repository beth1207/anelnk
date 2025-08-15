// In a real app, you'd use a database like MongoDB or PostgreSQL
const analyticsData = {};

exports.trackEvent = async (userId, eventType, metadata = {}) => {
  if (!analyticsData[userId]) {
    analyticsData[userId] = [];
  }
  
  analyticsData[userId].push({
    timestamp: new Date().toISOString(),
    eventType,
    metadata
  });
};

exports.getAnalytics = async (userId) => {
  return analyticsData[userId] || [];
};