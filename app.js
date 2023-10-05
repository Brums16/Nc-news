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
const { addArticle } = require("./controllers/add-article");
const { changeComment } = require("./controllers/change-comment");
const { getUserByUsername } = require("./controllers/get-user-by-username");
const articlesRouter = require("./routes/articles-router");
const topicsRouter = require("./routes/topics-router");
const usersRouter = require("./routes/users-router");
const commentsRouter = require("./routes/comments-router");

const app = express();
app.use(express.json());

app.route("/api").get(getEndpoints);

app.use("/api/articles", articlesRouter);
app.use("/api/topics", topicsRouter);
app.use("/api/users", usersRouter);
app.use("/api/comments", commentsRouter);

app.use(errorHandler);

module.exports = { app };
