const fs = require("fs");

const readFile = (path = "", ascii = "") => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, ascii, (err, data) => {
      if (err) reject(err);
      resolve(JSON.parse(data));
    });
  });
};

const writeFile = (path, data, ascii) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, ascii, (err) => {
      reject(err);
    });
    resolve("Product created!");
  });
};

module.exports = { readFile, writeFile };
