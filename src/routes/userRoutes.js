const express = require("express");
const router = express.Router();

const userControllers = require("../controllers/user.controller");
const authControllers = require("../controllers/auth.controller");
const auth = require("../middlewares/auth");

router.post("/signUp", authControllers.signUp);
router.get("/", auth, userControllers.profile);
router.put("/", auth, userControllers.update);
router.post("/signIn", authControllers.signIn);
router.delete("/", auth, userControllers.delete);

module.exports = router;
