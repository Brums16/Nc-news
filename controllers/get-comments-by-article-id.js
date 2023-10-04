const {
  fetchCommentsByArticleId,
} = require("../models/fetch-comments-by-article-id");

exports.getCommentsByArticleId = async (req, res, next) => {
  const id = req.params.article_id;
  try {
    const foundComments = await fetchCommentsByArticleId(id);
    return res.send({ comments: foundComments });
  } catch (err) {
    next(err);
  }
};
