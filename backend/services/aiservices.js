const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // Store your API key in .env
});

const openai = new OpenAIApi(configuration);

/**
 * Generate a project plan or code scaffold from a user idea
 * @param {string} idea - The idea description
 */
async function generatePlan(idea) {
  const prompt = `
  I am building an AI assistant. 
  Based on this idea, generate:
  1. A structured project plan
  2. Suggested frontend & backend stack
  3. Sample folder/file structure
  4. GitHub repo creation suggestions

  Idea: "${idea}"
  Provide output in JSON format with keys: plan, techStack, folderStructure, repoSuggestion
  `;

  const response = await openai.createChatCompletion({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    max_tokens: 1000,
  });

  try {
    const result = JSON.parse(response.data.choices[0].message.content);
    return result;
  } catch (err) {
    return { error: "Failed to parse AI response", raw: response.data.choices[0].message.content };
  }
}

module.exports = { generatePlan };
