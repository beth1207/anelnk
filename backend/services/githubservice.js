const axios = require('axios');

async function getRepos(token) {
  const res = await axios.get('https://api.github.com/user/repos', {
    headers: { Authorization: `token ${token}` }
  });
  return res.data;
}

async function createRepo(token, name) {
  const res = await axios.post(
    'https://api.github.com/user/repos',
    { name },
    { headers: { Authorization: `token ${token}` } }
  );
  return res.data;
}

module.exports = { getRepos, createRepo };
