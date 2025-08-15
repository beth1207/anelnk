const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');

const aiController = require('../controllers/aiController');
const fileController = require('../controllers/fileController');
const githubController = require('../controllers/githubController');
const mailController = require('../controllers/mailController');
const socialController = require('../controllers/socialController');
const analyticsController = require('../controllers/analyticsController');

// AI Routes
router.post('/ai/chat', protect, aiController.chat);
router.post('/ai/generate-content', protect, aiController.generateContent);

// File Routes
router.post('/files/generate', protect, fileController.generateFiles);
router.get('/files/download/:id', protect, fileController.downloadFiles);

// GitHub Routes
router.get('/github/repos', protect, githubController.getRepos);
router.post('/github/create-repo', protect, githubController.createRepo);
router.post('/github/create-file', protect, githubController.createFile);

// Email Routes
router.get('/gmail/emails', protect, mailController.getEmails);
router.post('/gmail/send', protect, mailController.sendEmail);

// Social Media Routes
router.post('/social/post', protect, socialController.createPost);
router.get('/social/analytics', protect, socialController.getAnalytics);

// Analytics Routes
router.get('/analytics', protect, analyticsController.getAnalytics);

module.exports = router;