const { read } = require("fs");
const fs = require("fs/promises");

exports.fetchEndpoints = async () => {
  const readEndpoints = await fs.readFile(
    `${__dirname}/../endpoints.json`,
    "utf-8"
  );
  return JSON.parse(readEndpoints);
};
