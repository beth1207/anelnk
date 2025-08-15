const express = require('express');
const router = express.Router();
const auth = require('../utils/auth');

const aiController = require('../controllers/aiController');
const fileController = require('../controllers/fileController');
const githubController = require('../controllers/githubController');
const mailController = require('../controllers/mailController');
const socialController = require('../controllers/socialController');
const analyticsController = require('../controllers/analyticsController');

// AI Chat Routes
router.post('/ai/chat', auth, aiController.chat);
router.post('/ai/generate-content', auth, aiController.generateContent);

// File Management Routes
router.post('/files/generate', auth, fileController.generateFiles);
router.get('/files/download/:id', auth, fileController.downloadFiles);

// GitHub Routes
router.get('/github/repos', auth, githubController.getRepos);
router.post('/github/create-repo', auth, githubController.createRepo);
router.post('/github/create-file', auth, githubController.createFile);

// Email Routes
router.get('/gmail/emails', auth, mailController.getEmails);
router.post('/gmail/send', auth, mailController.sendEmail);

// Social Media Routes
router.post('/social/post', auth, socialController.createPost);
router.get('/social/analytics', auth, socialController.getAnalytics);

// Analytics Routes
router.get('/analytics', auth, analyticsController.getAnalytics);

module.exports = router;