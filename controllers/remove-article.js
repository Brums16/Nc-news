const { deleteArticle } = require("../models/delete-article");

exports.removeArticle = async (req, res, next) => {
  const id = req.params.article_id;

  try {
    const removeArticle = await deleteArticle(id);
    return res.sendStatus(204);
  } catch (err) {
    console.log(err);
  }
};
