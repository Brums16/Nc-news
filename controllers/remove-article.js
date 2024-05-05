const { deleteArticle, deleteArticlesByAuthor } = require("../models/delete-article");

exports.removeArticle = async (req, res, next) => {
  const id = req.params.article_id;

  try {
    const removeArticle = await deleteArticle(id);
    return res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

exports.removeArticlesByAuthor = async (req, res, next) => {
  const author = req.params.author;

  try {
    await deleteArticlesByAuthor(author);
    return res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};
