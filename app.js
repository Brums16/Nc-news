const express = require("express");

const { errorHandler } = require("./error-handler");
const { getEndpoints } = require("./controllers/get-endpoints");
const { getTopics } = require("./controllers/get-topics");
const { getArticleById } = require("./controllers/get-article-by-id");
const { changeArticle } = require("./controllers/change-article");
const { getArticles } = require("./controllers/get-articles");
const {
  getCommentsByArticleId,
} = require("./controllers/get-comments-by-article-id");
const { addComment } = require("./controllers/add-comment");
const { removeComment } = require("./controllers/remove-comment");
const { getUsers } = require("./controllers/get-users");
const { changeComment } = require("./controllers/change-comment");
const { getUserByUsername } = require("./controllers/get-user-by-username");


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

app
  .route("/api/comments/:comment_id")
  .delete(removeComment)
  .patch(changeComment);

app.route("/api/users").get(getUsers);

app.route("/api/users/:username").get(getUserByUsername);

app.use(errorHandler);

module.exports = { app };
