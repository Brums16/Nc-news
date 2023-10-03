\c nc_news

SELECT articles.article_id, comments.author, comments.body, comment_id, comments.created_at, comments.votes FROM articles JOIN comments
      ON articles.article_id = comments.article_id
      WHERE articles.article_id = 18