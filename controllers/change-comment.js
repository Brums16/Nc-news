const { updateComment } = require("../models/update-comment");

exports.changeComment = async (req, res, next) => {
  const id = req.params.comment_id;
  const { inc_votes } = req.body;
  try {
    const updatedComment = await updateComment(inc_votes, id);
    return res.send({ comment: updatedComment });
  } catch (err) {
    console.log(err, "err in controller");
    next(err);
  }
};
