const { changeComment } = require("../controllers/change-comment");
const { removeComment } = require("../controllers/remove-comment");

const commentsRouter = require("express").Router();

commentsRouter.route("/:comment_id").delete(removeComment).patch(changeComment);

module.exports = commentsRouter;
