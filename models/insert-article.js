const db = require("../db/connection");
console.log("in the model");
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
  console.log(rows[0]);
  // here I'm setting the initial comment_count to 0.
  rows[0].comment_count = 0;
  return rows[0];
};
