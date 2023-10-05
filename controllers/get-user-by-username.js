const { fetchUserByUsername } = require("../models/fetch-user-by-username");

exports.getUserByUsername = async (req, res, next) => {
  const username = req.params.username;
  try {
    const foundUser = await fetchUserByUsername(username);
    return res.send({ user: foundUser });
  } catch (err) {
    console.log(err, "error in controller");
    next(err);
  }
};
