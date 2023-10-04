const db = require("../db/connection");

exports.deleteComment = async (id) => {
  const { rows } = await db.query(
    `
        DELETE FROM comments WHERE comment_id = $1 RETURNING *
       `,
    [id]
  );
  if (rows.length === 0) {
    return Promise.reject({
      status: 404,
      msg: `No comment found for comment_id ${id}`,
    });
  }
};
