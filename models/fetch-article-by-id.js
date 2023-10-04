const db = require("../db/connection");

exports.fetchArticleById = async (id) => {
  const { rows } = await db.query(
    `
    SELECT * FROM (SELECT articles.*, CAST(COUNT(comment_id) AS int) AS comment_count
    FROM articles 
    LEFT JOIN comments ON comments.article_id = articles.article_id
    GROUP BY articles.article_id) AS count_table WHERE article_id = $1
       `,
    [id]
  );
  if (!rows[0])
    return Promise.reject({
      status: 404,
      msg: `No article found for article_id: ${id}`,
    });
  return rows[0];
};
