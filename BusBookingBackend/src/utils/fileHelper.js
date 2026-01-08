// helper to read and write JSON files

const fs = require("fs").promises;

exports.readJSON = async (path) => {
  const data = await fs.readFile(path, "utf-8");
  return JSON.parse(data);
};

exports.writeJSON = async (path, data) => {
  await fs.writeFile(path, JSON.stringify(data, null, 2));
};
