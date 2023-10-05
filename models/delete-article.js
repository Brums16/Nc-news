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
