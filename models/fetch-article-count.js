const db = require("../db/connection");
const format = require("pg-format");

exports.fetchArticleCount = async (topic) => {
  let topicString = "";
  if (topic) {
    topicString = `WHERE topic = '${topic}'`;
  }
  const queryString = format(
    "SELECT CAST(COUNT(*) AS integer) FROM articles %s",
    topicString
  );
  const { rows } = await db.query(queryString);
  return rows[0];
};
