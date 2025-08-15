const { getEmails, sendEmail } = require('../services/mailService');

exports.getEmails = async (req, res) => {
  try {
    const emails = await getEmails(req.user);
    res.json(emails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Email fetch error' });
  }
};

exports.sendEmail = async (req, res) => {
  try {
    const { to, subject, body } = req.body;
    const result = await sendEmail(req.user, to, subject, body);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Email send error' });
  }
};