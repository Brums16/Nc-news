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
      SELECT articles.article_id, title, topic, articles.author, articles.created_at, articles.votes, article_img_url, COUNT(comment_id) AS comment_count
      FROM articles 
      LEFT JOIN comments ON comments.article_id = articles.article_id
      GROUP BY articles.article_id
      ORDER BY created_at DESC;
     `
  );
  rows.forEach((row) => (row.comment_count = Number(row.comment_count)));
  return rows;
};
