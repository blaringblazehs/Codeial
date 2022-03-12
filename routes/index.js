const express = require("express");

const router = express.Router();
const homeController = require("../controllers/home_controller");
const usersController = require("../controllers/users_controller");

console.log("router loded");

router.get("/", homeController.home);
router.get("/profile", usersController.profile);
router.use("/users", require("./users"));
router.use("/posts", require("./posts"));
router.use("/comments", require("./comments"));
router.use("/likes", require("./likes"));

router.use("/api", require("./api"));

module.exports = router;
