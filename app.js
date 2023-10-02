const express = require("express");
const { getTopics } = require("./controllers/topics-controller");
const { errorHandler } = require("./error-handler");

const app = express();

app.route("/api/topics").get(getTopics);

app.use(errorHandler);

module.exports = { app };
