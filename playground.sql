\c nc_news

SELECT * FROM comments;

SELECT * FROM articles;

SELECT * FROM users;

SELECT * FROM topics;

SELECT articles.article_id, title, topic, articles.author, articles.created_at, articles.votes, article_img_url, COUNT(comment_id) AS comment_count
      FROM articles LEFT JOIN comments ON comments.article_id = articles.article_id
      GROUP BY articles.article_id
      ORDER BY created_at DESC;