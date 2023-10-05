const db = require("../db/connection");

exports.fetchUserByUsername = async (username) => {
  const { rows } = await db.query(
    `
        SELECT username, avatar_url, name FROM users
        WHERE username = $1
       `,
    [username]
  );
  if (!rows[0])
    return Promise.reject({
      status: 404,
      msg: `No user found for username: ${username}`,
    });

  return rows[0];
};
