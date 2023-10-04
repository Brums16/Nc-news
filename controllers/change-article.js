const { updateArticle } = require("../models/update-article");

exports.changeArticle = async (req, res, next) => {
  const id = req.params.article_id;
  const { inc_votes } = req.body;
  try {
    const updatedArticle = await updateArticle(inc_votes, id);
    return res.send({ article: updatedArticle });
  } catch (err) {
    next(err);
  }
};
