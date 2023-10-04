const { fetchArticles } = require("../models/fetch-articles");

exports.getArticles = async (req, res, next) => {
  try {
    const foundArticles = await fetchArticles();
    return res.send({ articles: foundArticles });
  } catch (err) {
    next(err);
  }
};
