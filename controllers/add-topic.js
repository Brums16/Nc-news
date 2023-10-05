const { insertTopic } = require("../models/insert-topic");

exports.addTopic = async (req, res, next) => {
  const { slug, description } = req.body;
  try {
    const addedTopic = await insertTopic(slug, description);
    return res.status(201).send({ topic: addedTopic });
  } catch (err) {
    console.log(err, "error in controller");
    next(err);
  }
};
