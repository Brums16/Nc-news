const { getUserByUsername } = require("../controllers/get-user-by-username");
const { getUsers } = require("../controllers/get-users");

const usersRouter = require("express").Router();

usersRouter.route("/").get(getUsers);

usersRouter.route("/:username").get(getUserByUsername);

module.exports = usersRouter;
