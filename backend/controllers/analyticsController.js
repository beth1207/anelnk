const { getAnalytics } = require('../services/analyticsService');

exports.getAnalytics = async (req, res) => {
  try {
    const analytics = await getAnalytics(req.user);
    res.json(analytics);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Analytics fetch error' });
  }
};