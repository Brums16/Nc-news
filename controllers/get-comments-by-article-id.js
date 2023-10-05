const {
  fetchCommentsByArticleId,
} = require("../models/fetch-comments-by-article-id");

exports.getCommentsByArticleId = async (req, res, next) => {
  const id = req.params.article_id;
  const { limit, p } = req.query;
  try {
    const foundComments = await fetchCommentsByArticleId(id, limit, p);
    return res.send({ comments: foundComments });
  } catch (err) {
    console.log(err, "error in the controller");
    next(err);
  }
};
