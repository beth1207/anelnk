const fs = require('fs');
const path = require('path');
const archiver = require('archiver');
const { v4: uuidv4 } = require('uuid');

exports.createZipArchive = async (files, outputPath) => {
  const output = fs.createWriteStream(outputPath);
  const archive = archiver('zip', { zlib: { level: 9 } });

  return new Promise((resolve, reject) => {
    output.on('close', () => resolve(outputPath));
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

exports.generateUniqueName = (prefix = 'file') => {
  return `${prefix}-${uuidv4()}`;
};