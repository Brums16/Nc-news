const format = require("pg-format");
const db = require("../db/connection");

exports.fetchCommentsByArticleId = async (id, limit, p = 1) => {
  const idString = `WHERE articles.article_id = ${id}`;
  let paginationString = "";
  if (limit) {
    paginationString = `OFFSET ${
      (p - 1) * limit
    } ROWS FETCH NEXT ${limit} ROWS ONLY`;
  }
  const queryString = format(
    `
        SELECT articles.article_id, comments.author, comments.body, comment_id, comments.created_at, comments.votes FROM articles LEFT JOIN comments
        ON articles.article_id = comments.article_id
        %s
        ORDER BY created_at DESC
        %s
       `,
    idString,
    paginationString
  );
  const { rows } = await db.query(queryString);
  if (!rows[0])
    return Promise.reject({
      status: 404,
      msg: `No article found for article_id ${id}`,
    });
  else if (rows[0].comment_id === null) return [];
  else return rows;
};
