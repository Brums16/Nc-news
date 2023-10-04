exports.errorHandler = (err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send("Bad Request");
  }
  if (err.code === "23503") {
    res.status(404).send(err.detail);
  }
  if (err.code === "23502") {
    res.status(400).send("Bad Request");
  }
  res.status(err.status).send(err.msg);
};
