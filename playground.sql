\c nc_news

SELECT articles.article_id, title, topic, articles.author, articles.created_at,
  articles.votes, article_img_url, CAST(COUNT(comment_id) AS int) AS comment_count
  FROM articles 
  LEFT JOIN comments ON comments.article_id = articles.article_id
  GROUP BY articles.article_id
  ORDER BY created_at DESC;



SELECT articles.article_id, title, topic, articles.author, articles.created_at,
  articles.votes, article_img_url, CAST(COUNT(comment_id) AS int) AS comment_count
  FROM articles 
    
  LEFT JOIN comments ON comments.article_id = articles.article_id
  WHERE articles.topic = 'coding'
  GROUP BY articles.article_id
  ORDER BY created_at DESC;

