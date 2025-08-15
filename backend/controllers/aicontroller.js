const OpenAI = require('openai');
const AnalyticsService = require('../services/analyticsService');
const FileService = require('../services/fileService');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

exports.chat = async (req, res) => {
  try {
    const { message, context } = req.body;
    
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a helpful AI assistant." },
        ...context,
        { role: "user", content: message }
      ],
      temperature: 0.7,
    });

    // Track analytics
    await AnalyticsService.trackEvent(req.user.id, 'ai_chat', {
      input: message,
      model: 'gpt-4'
    });

    res.json({ response: completion.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'AI service error' });
  }
};

exports.generateContent = async (req, res) => {
  try {
    const { prompt, type, count = 1 } = req.body;
    
    let content = [];
    for (let i = 0; i < count; i++) {
      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          { role: "system", content: `You are a ${type} content generator.` },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
      });
      content.push(completion.choices[0].message.content);
    }

    // If more than 5 items, generate zip file
    if (content.length > 5) {
      const zipUrl = await FileService.generateZip(content, 'generated-content');
      return res.json({ zipUrl, count: content.length });
    }

    res.json({ content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Content generation error' });
  }
};