const db = require("../db/connection");

exports.fetchCommentCountByArticleId = async (id) => {
  const { rows } = await db.query(
    `
      SELECT CAST(COUNT(*) AS integer) FROM COMMENTS
      WHERE article_id = $1
     `,
    [id]
  );
  return rows[0];
};
