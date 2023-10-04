const { deleteComment } = require("../models/delete-comment");

exports.removeComment = async (req, res, next) => {
  const id = req.params.comment_id;
  try {
    await deleteComment(id);
    return res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};
