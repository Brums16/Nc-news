const express = require("express");
const { getTopics, getEndpoints } = require("./controllers/topics-controller");
const { errorHandler } = require("./error-handler");

const app = express();

app.route("/api").get(getEndpoints);

app.route("/api/topics").get(getTopics);

app.use(errorHandler);

module.exports = { app };
