const db = require("../db/connection");
exports.insertArticle = async (
  author,
  body,
  title,
  topic,
  article_img_url = "placeholder_img.jpg"
) => {
  const { rows } = await db.query(
    `
        INSERT INTO articles(author, body, title, topic, article_img_url)
        VALUES ($1, $2, $3, $4, $5) RETURNING *
       `,
    [author, body, title, topic, article_img_url]
  );
  rows[0].comment_count = 0;
  return rows[0];
};
