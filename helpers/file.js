const fs = require("fs");
const path = require("path");
const touch = require("touch");
const logger = require("./logger");

// From config
const prefix = require("../template.config").prefix;
const filesExt = require("../template.config").extensions;
const fileCnt = require("../template.config").files;

function fileManager() {
  let getCurrentDirectoryBase = () => {
    return path.basename(process.cwd());
  };

  let directoryExists = filePath => {
    try {
      return fs.statSync(filePath).isDirectory();
    } catch (err) {
      return false;
    }
  };

  let createDirectory = dirName => {
    if (!directoryExists(prefix + dirName)) {
      fs.mkdirSync(prefix + dirName);
    }
    return true;
  };

  let createFiles = fileName => {
    logger.activity(`/${prefix + fileName}`);

    filesExt.forEach(ext => {
      const componentName = prefix + fileName;
      const pathToFile = `${componentName}/${componentName}.${ext}`;
      const cnt = fileCnt[ext](fileName);

      if (!fs.existsSync(pathToFile)) {
        fs.writeFile(pathToFile, cnt, function(err) {
          if (err) {
            console.log("Error writing file");
          }

          logger.info(` |- ${componentName}.${ext}`);
        });
      }
    });
  };

  let createFilesInDir = dirName => {
    if (createDirectory(dirName)) {
      createFiles(dirName);
    }
  };

  return {
    createFilesInDir
  };
}
module.exports = fileManager();
