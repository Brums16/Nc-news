const {
  fetchTopics,
  fetchEndpoints,
  fetchArticleById,
  fetchArticles,
  fetchCommentsByArticleId,
  insertComment,
  updateArticle,
  deleteComment,
  fetchUsers,
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

exports.getArticles = async (req, res, next) => {
  try {
    const foundArticles = await fetchArticles();
    return res.send({ articles: foundArticles });
  } catch (err) {
    next(err);
  }
};

exports.getCommentsByArticleId = async (req, res, next) => {
  const id = req.params.article_id;
  try {
    const foundComments = await fetchCommentsByArticleId(id);
    return res.send({ comments: foundComments });
  } catch (err) {
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
    next(err);
  }
};

exports.changeArticle = async (req, res, next) => {
  const id = req.params.article_id;
  const { inc_votes } = req.body;
  try {
    const updatedArticle = await updateArticle(inc_votes, id);
    return res.send({ article: updatedArticle });
  } catch (err) {
    next(err);
  }
};

exports.removeComment = async (req, res, next) => {
  const id = req.params.comment_id;
  try {
    await deleteComment(id);
    return res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const foundUsers = await fetchUsers();
    return res.send({ users: foundUsers });
  } catch (err) {
    next(err);
  }
};
