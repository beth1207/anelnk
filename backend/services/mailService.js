const { google } = require('googleapis');
const config = require('../config');
const { trackEvent } = require('./analyticsService');

const oauth2Client = new google.auth.OAuth2(
  config.GOOGLE_CLIENT_ID,
  config.GOOGLE_CLIENT_SECRET,
  config.GOOGLE_REDIRECT_URI
);

exports.getEmails = async (user) => {
  oauth2Client.setCredentials(user.googleTokens);
  const gmail = google.gmail({ version: 'v1', auth: oauth2Client });
  
  const { data } = await gmail.users.messages.list({
    userId: 'me',
    maxResults: 10
  });
  
  await trackEvent(user.id, 'emails_fetched');
  return data.messages || [];
};

exports.sendEmail = async (user, to, subject, body) => {
  oauth2Client.setCredentials(user.googleTokens);
  const gmail = google.gmail({ version: 'v1', auth: oauth2Client });
  
  const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString('base64')}?=`;
  const messageParts = [
    `From: ${user.email}`,
    `To: ${to}`,
    'Content-Type: text/html; charset=utf-8',
    'MIME-Version: 1.0',
    `Subject: ${utf8Subject}`,
    '',
    body
  ];
  
  const message = messageParts.join('\n');
  const encodedMessage = Buffer.from(message).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  
  const { data } = await gmail.users.messages.send({
    userId: 'me',
    requestBody: {
      raw: encodedMessage
    }
  });
  
  await trackEvent(user.id, 'email_sent', { to, subject_length: subject.length });
  return data;
};