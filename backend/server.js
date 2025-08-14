const express = require('express');
const cors = require('cors');
const githubRoutes = require('./routes/github');
const emailRoutes = require('./routes/email');
const socialsRoutes = require('./routes/socials');
const aiRoutes = require('./routes/ai');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/github', githubRoutes);
app.use('/api/email', emailRoutes);
app.use('/api/socials', socialsRoutes);
app.use('/api/ai', aiRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('AI Assistant backend running 🚀');
});

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
