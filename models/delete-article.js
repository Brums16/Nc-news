const db = require("../db/connection");

exports.deleteArticle = async (id) => {
  await db.query(
    `
        DELETE FROM comments WHERE article_id = $1
        `,
    [id]
  );
  const { rows } = await db.query(
    `
        DELETE FROM articles WHERE article_id = $1 RETURNING *
       `,
    [id]
  );
  if (rows.length === 0) {
    return Promise.reject({
      status: 404,
      msg: `No article found for article_id ${id}`,
    });
  }
};

exports.deleteArticlesByAuthor = async (author) => {
  await db.query(
    `
        DELETE FROM comments WHERE article_id IN (SELECT article_id FROM articles WHERE author = $1)
        `,
    [author]
  );
  const { rows } = await db.query(
    `
        DELETE FROM articles WHERE author = $1 RETURNING *
       `,
    [author]
  );
  if (rows.length === 0) {
    return Promise.reject({
      status: 404,
      msg: `No articles found for author ${author}`,
    });
  }
};
