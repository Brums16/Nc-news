const { read } = require("fs");
const db = require("../db/connection");
const fs = require("fs/promises");

exports.fetchTopics = async () => {
  const { rows } = await db.query(
    `
      SELECT * FROM topics;
     `
  );
  return rows;
};

exports.fetchEndpoints = async () => {
  const readEndpoints = await fs.readFile(
    `${__dirname}/../endpoints.json`,
    "utf-8"
  );
  return JSON.parse(readEndpoints);
};

exports.fetchArticleById = async (id) => {
  const { rows } = await db.query(
    `
      SELECT * FROM articles
      WHERE article_id = $1
     `,
    [id]
  );
  if (!rows[0])
    return Promise.reject({
      status: 404,
      msg: `No article found for article_id: ${id}`,
    });
  return rows[0];
};

exports.fetchAllArticles = async () => {
  const { rows } = await db.query(
    `
      SELECT article_id, title, topic, author, created_at, votes, article_img_url FROM articles ORDER BY created_at DESC
     `
  );
  const articlesArray = rows;
  for (const article of articlesArray) {
    const comments = await db.query(
      `SELECT COUNT(*) FROM comments WHERE article_id = $1`,
      [article.article_id]
    );
    article.comment_count = Number(comments.rows[0].count);
  }
  return articlesArray;
};
