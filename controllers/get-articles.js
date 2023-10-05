const { fetchArticles } = require("../models/fetch-articles");

exports.getArticles = async (req, res, next) => {
  const { topic, sort_by, order, limit, p } = req.query;

  try {
    const foundArticles = await fetchArticles(topic, sort_by, order, limit, p);
    return res.send({ articles: foundArticles });
  } catch (err) {
    console.log(err, "err in controller");
    next(err);
  }
};
