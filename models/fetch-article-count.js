const db = require("../db/connection");

exports.fetchArticleCount = async () => {
  const { rows } = await db.query(
    `
      SELECT CAST(COUNT(*) AS integer) FROM articles
     `
  );
  return rows[0];
};
