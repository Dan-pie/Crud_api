const express = require("express");
const router = express.Router();

const userControllers = require("../controllers/user.controller");
const auth = require("../middlewares/auth.middleware");
const validate = require("../middlewares/validate.middleware");

const { updateSchema } = require("../validators/user.validators");

router.get("/", auth, userControllers.profile);
router.put("/", auth, validate(updateSchema), userControllers.update);
router.delete("/", auth, userControllers.delete);

module.exports = router;
