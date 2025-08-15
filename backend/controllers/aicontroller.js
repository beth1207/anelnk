const { chatCompletion } = require('../services/aiService');
const { trackEvent } = require('../services/analyticsService');

exports.chat = async (req, res) => {
  try {
    const { message, context = [] } = req.body;
    const response = await chatCompletion(message, context);
    
    await trackEvent(req.user.id, 'ai_chat', {
      input: message,
      model: 'gpt-4'
    });

    res.json({ response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'AI service error' });
  }
};

exports.generateContent = async (req, res) => {
  try {
    const { prompt, type, count = 1 } = req.body;
    const { content, zipUrl } = await generateContent(prompt, type, count);
    
    if (zipUrl) {
      res.json({ zipUrl, count });
    } else {
      res.json({ content });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Content generation error' });
  }
};