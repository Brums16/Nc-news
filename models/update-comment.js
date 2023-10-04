const db = require("../db/connection");

exports.updateComment = async (inc_votes, id) => {
  const { rows } = await db.query(
    `
        UPDATE comments
        SET votes = votes + $1 
        WHERE comment_id = $2 RETURNING *
       `,
    [inc_votes, id]
  );
  if (!rows[0])
    return Promise.reject({
      status: 404,
      msg: `No comment found for comment_id ${id}`,
    });
  console.log(rows, "rows in model");
  return rows[0];
};
