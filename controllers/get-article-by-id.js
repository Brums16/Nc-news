const { fetchArticleById } = require("../models/fetch-article-by-id");

exports.getArticleById = async (req, res, next) => {
  const id = req.params.article_id;
  try {
    const foundArticle = await fetchArticleById(id);
    return res.send({ article: foundArticle });
  } catch (err) {
    next(err);
  }
};
