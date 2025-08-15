const { getRepos, createRepo, createFile } = require('../services/githubService');

exports.getRepos = async (req, res) => {
  try {
    const repos = await getRepos(req.user);
    res.json(repos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'GitHub error' });
  }
};

exports.createRepo = async (req, res) => {
  try {
    const { name, isPrivate } = req.body;
    const repo = await createRepo(req.user, name, isPrivate);
    res.json(repo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Repo creation error' });
  }
};

exports.createFile = async (req, res) => {
  try {
    const { repo, path, content, message } = req.body;
    const result = await createFile(req.user, repo, path, content, message);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'File creation error' });
  }
};