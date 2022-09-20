const fs = require("fs");

const dataDir = "data/";

function writeFile(name, body) {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  fs.writeFileSync(dataDir + name, JSON.stringify(body), { encoding: "utf8" });
}

function readFile(name) {
  const filePath = dataDir + name;

  if (!fs.existsSync(filePath)) {
    return false;
  }

  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

module.exports = { writeFile, readFile };
