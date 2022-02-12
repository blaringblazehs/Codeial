const express = require("express");

const router = express.Router();
const homeController = require("../controllers/home_controller");
const userProfile = require("../controllers/userProfile_controller");

console.log("router loded");

router.get("/", homeController.home);
router.get("/userProfile", userProfile.userProfile);
// router.use("/users", require("./users"));

module.exports = router;
