const { insertArticle } = require("../models/insert-article");

exports.addArticle = async (req, res, next) => {
  const { author, body, title, topic, article_img_url } = req.body;
  try {
    const addedArticle = await insertArticle(
      author,
      body,
      title,
      topic,
      article_img_url
    );
    return res.status(201).send({ article: addedArticle });
  } catch (err) {
    console.log(err, "error in controller");
    next(err);
  }
};
