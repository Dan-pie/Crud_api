const express = require("express");
const router = express.Router();

const userControllers = require("../controllers/userControllers");
const auth = require("../middlewares/auth");

router.post("/signUp", userControllers.signUp);
router.get("/", auth, (req, res) => res.json(req.user));
router.put("/", auth, userControllers.update);
router.post("/signIn", userControllers.signIn);
router.delete("/", auth, userControllers.delete);

module.exports = router;
