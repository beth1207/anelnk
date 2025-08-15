module.exports = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  SECRET_KEY: process.env.SECRET_KEY || 'your-secret-key-here',
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  GITHUB_TOKEN: process.env.GITHUB_TOKEN,
  // Add other config variables as needed
};