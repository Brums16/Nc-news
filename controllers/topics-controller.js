const {
  fetchTopics,
  fetchEndpoints,
  fetchArticleById,
  fetchAllArticles,
} = require("../models/topics-model");

exports.getTopics = async (req, res, next) => {
  try {
    const foundTopics = await fetchTopics();
    return res.send({ topics: foundTopics });
  } catch (err) {
    next(err);
  }
};

exports.getEndpoints = async (req, res, next) => {
  try {
    const foundEndpoints = await fetchEndpoints();
    return res.send({ endpoints: foundEndpoints });
  } catch (err) {
    next(err);
  }
};

exports.getArticleById = async (req, res, next) => {
  const id = req.params.article_id;
  try {
    const foundArticle = await fetchArticleById(id);
    return res.send({ article: foundArticle });
  } catch (err) {
    next(err);
  }
};

exports.getAllArticles = async (req, res, next) => {
  // console.log("in the controller");
  try {
    const foundArticles = await fetchAllArticles();
    // console.log(foundArticles, "foundArticles in the controller");
    return res.send({ articles: foundArticles });
  } catch (err) {
    next(err);
  }
};
