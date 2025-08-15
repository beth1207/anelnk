const fs = require('fs');
const path = require('path');
const JSZip = require('jszip');
const archiver = require('archiver');
const { v4: uuidv4 } = require('uuid');

const UPLOAD_DIR = process.env.UPLOAD_DIR || 'uploads';

if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

exports.generateZip = async (files, prefix) => {
  const zipId = uuidv4();
  const zipFileName = `${prefix}-${zipId}.zip`;
  const zipFilePath = path.join(UPLOAD_DIR, zipFileName);
  
  const output = fs.createWriteStream(zipFilePath);
  const archive = archiver('zip', { zlib: { level: 9 } });

  return new Promise((resolve, reject) => {
    output.on('close', () => {
      console.log(`Zip file created: ${archive.pointer()} total bytes`);
      resolve(`/api/files/download/${zipId}`);
    });

    archive.on('error', (err) => {
      reject(err);
    });

    archive.pipe(output);

    files.forEach((content, index) => {
      archive.append(content, { name: `file-${index + 1}.txt` });
    });

    archive.finalize();
  });
};

exports.downloadZip = (req, res) => {
  const { id } = req.params;
  const filePath = path.join(UPLOAD_DIR, `generated-content-${id}.zip`);
  
  if (fs.existsSync(filePath)) {
    res.download(filePath, (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Download failed');
      }
      // Optionally delete after download
      // fs.unlinkSync(filePath);
    });
  } else {
    res.status(404).send('File not found');
  }
};