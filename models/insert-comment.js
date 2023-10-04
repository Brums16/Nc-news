const db = require("../db/connection");

exports.insertComment = async (username, body, id) => {
  const { rows } = await db.query(
    `
        INSERT INTO comments(author, body, article_id)
        VALUES ($1, $2, $3) RETURNING *
       `,
    [username, body, id]
  );
  if (!rows[0])
    return Promise.reject({
      status: 404,
      msg: `No article found for article_id ${id}`,
    });
  return rows[0];
};
