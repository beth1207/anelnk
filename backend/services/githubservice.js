const { Octokit } = require("@octokit/rest");
const AnalyticsService = require('./analyticsService');

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
});

exports.getRepos = async (user) => {
  try {
    const { data } = await octokit.repos.listForAuthenticatedUser();
    await AnalyticsService.trackEvent(user.id, 'github_repos_fetched');
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch GitHub repos');
  }
};

exports.createRepo = async (user, repoName, isPrivate = false) => {
  try {
    const { data } = await octokit.repos.createForAuthenticatedUser({
      name: repoName,
      private: isPrivate
    });
    
    await AnalyticsService.trackEvent(user.id, 'github_repo_created', {
      repo_name: repoName,
      private: isPrivate
    });
    
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to create GitHub repo');
  }
};

exports.createFile = async (user, repo, path, content, message = 'Initial commit') => {
  try {
    const { data } = await octokit.repos.createOrUpdateFileContents({
      owner: user.githubUsername,
      repo,
      path,
      message,
      content: Buffer.from(content).toString('base64')
    });
    
    await AnalyticsService.trackEvent(user.id, 'github_file_created', {
      repo,
      path,
      content_length: content.length
    });
    
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to create GitHub file');
  }
};