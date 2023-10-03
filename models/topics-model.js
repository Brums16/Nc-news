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
      SELECT articles.article_id, title, topic, articles.author, articles.created_at,
      articles.votes, article_img_url, CAST(COUNT(comment_id) AS int) AS comment_count
      FROM articles 
      LEFT JOIN comments ON comments.article_id = articles.article_id
      GROUP BY articles.article_id
      ORDER BY created_at DESC;
     `
  );
  return rows;
};

exports.fetchCommentsByArticleId = async (id) => {
  const { rows } = await db.query(
    `
      SELECT articles.article_id, comments.author, comments.body, comment_id, comments.created_at, comments.votes FROM articles LEFT JOIN comments
      ON articles.article_id = comments.article_id
      WHERE articles.article_id = $1
      ORDER BY created_at DESC
     `,
    [id]
  );
  if (!rows[0])
    return Promise.reject({
      status: 404,
      msg: `No article found for article_id ${id}`,
    });
  else if (rows[0].comment_id === null) return [];
  else return rows;
};

exports.insertComment = async (username, body, id) => {
  const { rows } = await db.query(
    `
      INSERT INTO comments(author, body, article_id)
      VALUES ($1, $2, $3) RETURNING *
     `,
    [username, body, id]
  );
  console.log(rows[0]);
  if (!rows[0])
    return Promise.reject({
      status: 404,
      msg: `No article found for article_id ${id}`,
    });
  return rows[0];
};
