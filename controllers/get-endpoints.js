const { fetchEndpoints } = require("../models/fetch-endpoints");

exports.getEndpoints = async (req, res, next) => {
  try {
    const foundEndpoints = await fetchEndpoints();
    return res.send({ endpoints: foundEndpoints });
  } catch (err) {
    next(err);
  }
};
