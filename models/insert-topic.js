const db = require("../db/connection");

exports.insertTopic = async (slug, description) => {
  const { rows } = await db.query(
    `
        INSERT INTO topics(slug, description)
        VALUES ($1, $2) RETURNING *
       `,
    [slug, description]
  );

  return rows[0];
};
