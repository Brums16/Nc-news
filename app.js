const express = require("express");
const {
  getTopics,
  getEndpoints,
  getArticleById,
  getAllArticles,
  getCommentsByArticleId,
  addComment,
} = require("./controllers/topics-controller");
const { errorHandler } = require("./error-handler");

const app = express();
app.use(express.json());

app.route("/api").get(getEndpoints);

app.route("/api/topics").get(getTopics);

app.route("/api/articles/:article_id").get(getArticleById);

app.route("/api/articles").get(getAllArticles);

app
  .route("/api/articles/:article_id/comments")
  .get(getCommentsByArticleId)
  .post(addComment);

app.use(errorHandler);

module.exports = { app };
