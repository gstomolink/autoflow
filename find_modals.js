const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
  });
}

walkDir('c:/Users/MSI/Documents/next/autoFlowUI/components/admin', function(filePath) {
  if (filePath.endsWith('Modal.tsx')) {
    console.log(filePath);
  }
});
