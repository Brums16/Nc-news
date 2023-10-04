const express = require("express");
const {
  getTopics,
  getEndpoints,
  getArticleById,
  getArticles,
  getCommentsByArticleId,
  addComment,
  changeArticle,
  removeComment,
  getUsers,
} = require("./controllers/topics-controller");
const { errorHandler } = require("./error-handler");

const app = express();
app.use(express.json());

app.route("/api").get(getEndpoints);

app.route("/api/topics").get(getTopics);

app.route("/api/articles/:article_id").get(getArticleById).patch(changeArticle);

app.route("/api/articles").get(getArticles);

app
  .route("/api/articles/:article_id/comments")
  .get(getCommentsByArticleId)
  .post(addComment);

app.route("/api/comments/:comment_id").delete(removeComment);

app.route("/api/users").get(getUsers);

app.use(errorHandler);

module.exports = { app };
