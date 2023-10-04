const { fetchUsers } = require("../models/fetch-users");

exports.getUsers = async (req, res, next) => {
  try {
    const foundUsers = await fetchUsers();
    return res.send({ users: foundUsers });
  } catch (err) {
    next(err);
  }
};
