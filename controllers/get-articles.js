const { fetchArticleCount } = require("../models/fetch-article-count");
const { fetchArticles } = require("../models/fetch-articles");

exports.getArticles = async (req, res, next) => {
  const { topic, sort_by, order, limit, p } = req.query;

  try {
    const foundArticles = await fetchArticles(topic, sort_by, order, limit, p);
    const articleCount = await fetchArticleCount();
    return res.send({
      articles: foundArticles,
      totalCount: articleCount.count,
    });
  } catch (err) {
    console.log(err, "err in controller");
    next(err);
  }
};
