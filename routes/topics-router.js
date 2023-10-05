const { addTopic } = require("../controllers/add-topic");
const { getTopics } = require("../controllers/get-topics");

const topicsRouter = require("express").Router();

topicsRouter.route("/").get(getTopics).post(addTopic);

module.exports = topicsRouter;
