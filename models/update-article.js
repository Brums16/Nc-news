const db = require("../db/connection");

exports.updateArticle = async (inc_votes, id) => {
  const { rows } = await db.query(
    `
        UPDATE articles
        SET votes = votes + $1 
        WHERE article_id = $2 RETURNING *
       `,
    [inc_votes, id]
  );
  if (!rows[0])
    return Promise.reject({
      status: 404,
      msg: `No article found for article_id ${id}`,
    });
  return rows[0];
};
