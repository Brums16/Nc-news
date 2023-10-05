const db = require("../db/connection");
const format = require("pg-format");

exports.fetchArticles = async (
  topic,
  sort_by = "created_at",
  order = "DESC",
  limit,
  p = 1
) => {
  let topicString = "";
  if (topic) {
    topicString = `WHERE topic = '${topic}'`;
  }
  let paginationString = "";
  if (limit) {
    paginationString = `OFFSET ${
      (p - 1) * limit
    } ROWS FETCH NEXT ${limit} ROWS ONLY`;
  }

  const queryString = format(
    `
  SELECT articles.article_id, title, topic, articles.author, articles.created_at,
  articles.votes, article_img_url, CAST(COUNT(comment_id) AS int) AS comment_count
  FROM articles 
  LEFT JOIN comments ON comments.article_id = articles.article_id
  %s
  GROUP BY articles.article_id
  ORDER BY %s %s
  %s
 `,
    topicString,
    sort_by,
    order,
    paginationString
  );

  const { rows } = await db.query(queryString);
  if (rows.length === 0) {
    return Promise.reject({
      status: 404,
      msg: `No articles found for topic: ${topic}`,
    });
  }
  return rows;
};
