const { Octokit } = await import("@octokit/rest");
const config = require('../config');
const { trackEvent } = require('./analyticsService');

const octokit = new Octokit({ auth: config.GITHUB_TOKEN });

exports.getRepos = async (user) => {
  const { data } = await octokit.repos.listForAuthenticatedUser();
  await trackEvent(user.id, 'github_repos_fetched');
  return data;
};

exports.createRepo = async (user, name, isPrivate = false) => {
  const { data } = await octokit.repos.createForAuthenticatedUser({
    name,
    private: isPrivate
  });
  await trackEvent(user.id, 'github_repo_created', { repo_name: name });
  return data;
};

exports.createFile = async (user, repo, filePath, content, message = 'Initial commit') => {
  const { data } = await octokit.repos.createOrUpdateFileContents({
    owner: user.githubUsername,
    repo,
    path: filePath,
    message,
    content: Buffer.from(content).toString('base64')
  });
  await trackEvent(user.id, 'github_file_created', { repo, path: filePath });
  return data;
};