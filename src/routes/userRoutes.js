const express = require("express");
const router = express.Router();

const userControllers = require("../controllers/user.controller");
const authControllers = require("../controllers/auth.controller");
const auth = require("../middlewares/auth.middleware");
const validate = require("../middlewares/validate.middleware");
const {
  registerSchema,
  loginSchema,
} = require("../validators/auth.validators");
const { updateSchema } = require("../validators/user.validators");

router.post("/signUp", validate(registerSchema), authControllers.signUp);
router.get("/", auth, userControllers.profile);
router.put("/", auth, validate(updateSchema), userControllers.update);
router.post("/signIn", validate(loginSchema), authControllers.signIn);
router.delete("/", auth, userControllers.delete);

module.exports = router;
