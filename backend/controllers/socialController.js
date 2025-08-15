const { createPost, getAnalytics } = require('../services/socialService');

exports.createPost = async (req, res) => {
  try {
    const { platform, content } = req.body;
    const result = await createPost(req.user, platform, content);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Post creation error' });
  }
};

exports.getAnalytics = async (req, res) => {
  try {
    const analytics = await getAnalytics(req.user);
    res.json(analytics);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Analytics fetch error' });
  }
};