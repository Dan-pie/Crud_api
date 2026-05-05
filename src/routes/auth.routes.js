const express = require("express");
const router = express.Router();

const authControllers = require("../controllers/auth.controller");
const validate = require("../middlewares/validate.middleware");
const auth = require("../middlewares/auth.middleware")
const {
  registerSchema,
  loginSchema,
} = require("../validators/auth.validators");

router.post("/signUp", validate(registerSchema), authControllers.signUp);
router.post("/signIn", validate(loginSchema), authControllers.signIn);
router.post("/refresh", authControllers.refresh)
router.post("/logout", auth ,authControllers.logout)

module.exports = router;
