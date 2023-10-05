const { updateComment } = require("../models/update-comment");

exports.changeComment = async (req, res, next) => {
  const id = req.params.comment_id;
  console.log(id, "id in controller");
  const { inc_votes } = req.body;
  console.log(inc_votes, "inc_votes in controller");
  try {
    const updatedComment = await updateComment(inc_votes, id);
    return res.send({ comment: updatedComment });
  } catch (err) {
    console.log(err, "err in controller");
    next(err);
  }
};
