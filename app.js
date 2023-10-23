const express = require("express");

const { errorHandler } = require("./error-handler");
const { getEndpoints } = require("./controllers/get-endpoints");
const articlesRouter = require("./routes/articles-router");
const topicsRouter = require("./routes/topics-router");
const usersRouter = require("./routes/users-router");
const commentsRouter = require("./routes/comments-router");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.route("/api").get(getEndpoints);

app.use("/api/articles", articlesRouter);
app.use("/api/topics", topicsRouter);
app.use("/api/users", usersRouter);
app.use("/api/comments", commentsRouter);

app.use(errorHandler);

module.exports = { app };
