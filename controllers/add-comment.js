const { insertComment } = require("../models/insert-comment");

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
