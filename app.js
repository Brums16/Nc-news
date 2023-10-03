const express = require("express");
const {
  getTopics,
  getEndpoints,
  getArticleById,
} = require("./controllers/topics-controller");
const { errorHandler } = require("./error-handler");

const app = express();

app.route("/api").get(getEndpoints);

app.route("/api/topics").get(getTopics);

app.route("/api/articles/:article_id").get(getArticleById);

app.use(errorHandler);

module.exports = { app };
