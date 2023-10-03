const {
  fetchTopics,
  fetchEndpoints,
  fetchArticleById,
  fetchAllArticles,
  fetchCommentsByArticleId,
  insertComment,
} = require("../models/topics-model");

exports.getTopics = async (req, res, next) => {
  try {
    const foundTopics = await fetchTopics();
    return res.send({ topics: foundTopics });
  } catch (err) {
    console.log(err, "error in controller");
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
    console.log(err, "error in controller");
    next(err);
  }
};

exports.getAllArticles = async (req, res, next) => {
  try {
    const foundArticles = await fetchAllArticles();
    return res.send({ articles: foundArticles });
  } catch (err) {
    console.log(err, "error in controller");
    next(err);
  }
};

exports.getCommentsByArticleId = async (req, res, next) => {
  const id = req.params.article_id;
  try {
    const foundComments = await fetchCommentsByArticleId(id);
    return res.send({ comments: foundComments });
  } catch (err) {
    console.log(err, "error in controller");
    next(err);
  }
};

exports.addComment = async (req, res, next) => {
  const id = req.params.article_id;
  const { username, body } = req.body;
  try {
    const addedComment = await insertComment(username, body, id);
    return res.send({ comment: addedComment });
  } catch (err) {
    console.log(err, "error in controller");
    next(err);
  }
};
