exports.errorHandler = (err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send("Bad Request, id must be an integer");
  }
  res.status(err.status).send(err.msg);
};
