const fs = require("fs");
const path = require("path");
const logger = require("./logger");

let prefix = '';

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

  let createDirectory = (dirName, location, customPrefix) => {
    if (customPrefix) {
      prefix = customPrefix;
    }
    if (!directoryExists(path.join(location, prefix + dirName))) {
      fs.mkdirSync(path.join(location, prefix + dirName));
    }
    return true;
  };

  let createFiles = (fileName, location) => {
    
    // From config
    const filesExt = require("../template.config").extensions;
    const fileCnt = require("../template.config").files;

    logger.activity(`On Loacation: ${location}`);
    logger.activity(`/${prefix + fileName}`);

    filesExt.forEach(ext => {
      const componentName = prefix + fileName;
      const pathToFile = path.join(location, componentName, `${componentName}.${ext}`);
      const cnt = fileCnt[ext](fileName, prefix);

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

  let createFilesInDir = (dirName, location, customPrefix) => {
    if (createDirectory(dirName, location, customPrefix)) {
      createFiles(dirName, location);
    }
  };

  return {
    createFilesInDir
  };
}
module.exports = fileManager();
