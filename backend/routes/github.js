const express = require('express');
const router = express.Router();
const { getRepos, createRepo } = require('../services/githubService');

router.get('/repos', async (req, res) => {
  const repos = await getRepos(req.query.token);
  res.json(repos);
});

router.post('/create', async (req, res) => {
  const { token, name } = req.body;
  const result = await createRepo(token, name);
  res.json(result);
});

module.exports = router;
