exports.errorHandler = (err, req, res, next) => {
  if (err.status === 404) {
    res.status(404).send(err.msg);
  }
  res.status(400).send(err.message);
};
