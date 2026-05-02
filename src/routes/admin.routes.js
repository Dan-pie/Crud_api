const express = require("express");
const router = express.Router();

const adminControllers = require("../controllers/admin.controller");
const auth = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware")

router.get("/", auth, role("admin"), adminControllers.seeAllUsers)

module.exports = router