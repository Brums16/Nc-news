const db = require("../db/connection");

exports.fetchCommentsByArticleId = async (id) => {
  const { rows } = await db.query(
    `
        SELECT articles.article_id, comments.author, comments.body, comment_id, comments.created_at, comments.votes FROM articles LEFT JOIN comments
        ON articles.article_id = comments.article_id
        WHERE articles.article_id = $1
        ORDER BY created_at DESC
       `,
    [id]
  );
  if (!rows[0])
    return Promise.reject({
      status: 404,
      msg: `No article found for article_id ${id}`,
    });
  else if (rows[0].comment_id === null) return [];
  else return rows;
};
