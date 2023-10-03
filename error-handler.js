exports.errorHandler = (err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send("Bad Request, id must be an integer");
  }
  if (err.code === "23503") {
    res.status(404).send(err.detail);
  }
  if (err.code === "23502") {
    res.status(400).send("Bad request");
  }
  res.status(err.status).send(err.msg);
};
