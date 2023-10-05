const { addArticle } = require("../controllers/add-article");
const { addComment } = require("../controllers/add-comment");
const { changeArticle } = require("../controllers/change-article");
const { getArticleById } = require("../controllers/get-article-by-id");
const { getArticles } = require("../controllers/get-articles");
const {
  getCommentsByArticleId,
} = require("../controllers/get-comments-by-article-id");

const articlesRouter = require("express").Router();

articlesRouter.route("/").get(getArticles).post(addArticle);

articlesRouter.route("/:article_id").get(getArticleById).patch(changeArticle);

articlesRouter
  .route("/:article_id/comments")
  .get(getCommentsByArticleId)
  .post(addComment);

module.exports = articlesRouter;
