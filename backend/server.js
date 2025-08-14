const express = require('express');
const cors = require('cors');
const githubRoutes = require('./routes/github');
const emailRoutes = require('./routes/email');
const socialsRoutes = require('./routes/socials');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/github', githubRoutes);
app.use('/api/email', emailRoutes);
app.use('/api/socials', socialsRoutes);

app.get('/', (req, res) => {
  res.send('AI Assistant backend running!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const aiRoutes = require('./routes/ai');
app.use('/api/ai', aiRoutes);
