const express = require('express');
const router = express.Router();
const { generatePlan } = require('../services/aiService');

router.post('/visualize', async (req, res) => {
  const { idea } = req.body;
  if (!idea) return res.status(400).json({ error: "Idea is required" });

  const result = await generatePlan(idea);
  res.json(result);
});

module.exports = router;
