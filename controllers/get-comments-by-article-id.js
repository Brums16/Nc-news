const {
  fetchCommentCountByArticleId,
} = require("../models/fetch-comment-count-by-article-id");
const {
  fetchCommentsByArticleId,
} = require("../models/fetch-comments-by-article-id");

exports.getCommentsByArticleId = async (req, res, next) => {
  const id = req.params.article_id;
  const { limit, p } = req.query;
  try {
    const foundComments = await fetchCommentsByArticleId(id, limit, p);
    const commentCount = await fetchCommentCountByArticleId(id);
    return res.send({
      comments: foundComments,
      total_count: commentCount.count,
    });
  } catch (err) {
    console.log(err, "error in the controller");
    next(err);
  }
};

// the commentCount query needed to be separated from the foundComments query
// to satisfy the pagination tasks
