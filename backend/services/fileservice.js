const fs = require('fs');
const path = require('path');
const archiver = require('archiver');
const { v4: uuidv4 } = require('uuid');
const config = require('../config');

const UPLOAD_DIR = path.join(__dirname, '../../uploads');

if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

exports.generateFiles = async (files) => {
  const generatedFiles = [];
  
  for (const file of files) {
    const fileName = `${uuidv4()}-${file.name}`;
    const filePath = path.join(UPLOAD_DIR, fileName);
    fs.writeFileSync(filePath, file.content);
    generatedFiles.push({ name: fileName, path: filePath });
  }

  if (generatedFiles.length > 5) {
    const zipUrl = await generateZip(generatedFiles, 'generated-files');
    return { zipUrl, count: generatedFiles.length };
  }

  return { files: generatedFiles };
};

exports.generateZip = async (files, prefix) => {
  const zipId = uuidv4();
  const zipFileName = `${prefix}-${zipId}.zip`;
  const zipFilePath = path.join(UPLOAD_DIR, zipFileName);
  
  const output = fs.createWriteStream(zipFilePath);
  const archive = archiver('zip', { zlib: { level: 9 } });

  return new Promise((resolve, reject) => {
    output.on('close', () => resolve(`/api/files/download/${zipId}`));
    archive.on('error', reject);
    archive.pipe(output);

    files.forEach(file => {
      if (file.content) {
        archive.append(file.content, { name: file.name || `file-${Date.now()}.txt` });
      } else if (fs.existsSync(file.path)) {
        archive.file(file.path, { name: path.basename(file.path) });
      }
    });

    archive.finalize();
  });
};

exports.downloadZip = async (req, res) => {
  const { id } = req.params;
  const filePath = path.join(UPLOAD_DIR, `generated-files-${id}.zip`);
  
  if (fs.existsSync(filePath)) {
    res.download(filePath);
  } else {
    res.status(404).send('File not found');
  }
};