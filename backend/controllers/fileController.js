const { generateFiles, downloadZip } = require('../services/fileService');

exports.generateFiles = async (req, res) => {
  try {
    const { files } = req.body;
    const result = await generateFiles(files);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'File generation error' });
  }
};

exports.downloadFiles = async (req, res) => {
  try {
    await downloadZip(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Download error' });
  }
};
