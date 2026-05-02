const express = require("express");
const router = express.Router();

const userControllers = require("../controllers/user.controller");
const auth = require("../middlewares/auth.middleware");
const validate = require("../middlewares/validate.middleware");
const role = require("../middlewares/role.middleware")

const { updateSchema } = require("../validators/user.validators");

router.get("/", auth, role('user'), userControllers.profile);
router.put("/", auth, role('user'), validate(updateSchema), userControllers.update);
router.delete("/", auth, role('user'), userControllers.delete);

module.exports = router;
