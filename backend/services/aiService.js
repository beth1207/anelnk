const { OpenAI } = require('openai');
const config = require('../config');
const { generateZip } = require('./fileService');

const openai = new OpenAI({ apiKey: config.OPENAI_API_KEY });

exports.chatCompletion = async (message, context = []) => {
  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      { role: "system", content: "You are a helpful AI assistant." },
      ...context,
      { role: "user", content: message }
    ],
    temperature: 0.7,
  });
  return completion.choices[0].message.content;
};

exports.generateContent = async (prompt, type, count = 1) => {
  const content = [];
  for (let i = 0; i < count; i++) {
    const response = await chatCompletion(
      `Generate ${type} content about: ${prompt}`,
      []
    );
    content.push(response);
  }

  if (content.length > 5) {
    const files = content.map((c, i) => ({
      path: `content-${i}.txt`,
      content: c
    }));
    const zipUrl = await generateZip(files, 'generated-content');
    return { zipUrl, count: content.length };
  }

  return { content };
};