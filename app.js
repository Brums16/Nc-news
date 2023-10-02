const express = require("express");
const { getTopics } = require("./controllers/topics-controller");

const app = express();
app.use(express.json());

app.route("/api/topics").get(getTopics);

const errorHandler = (err, req, res, next) => {
  res.status(400).send(err.message);
};

app.use(errorHandler);

// const PORT = process.env.PORT || 3000;

// const server = app.listen(PORT, () =>
//   console.log(`Server running on port PORT!`)
// );

module.exports = { app };
