const express = require("express");
const router = express.Router();

const userControllers = require("../controllers/user.controller");
const auth = require("../middlewares/auth.middleware");
const validate = require("../middlewares/validate.middleware");
const role = require("../middlewares/role.middleware");

const { updateSchema, changeRoleSchema } = require("../validators/user.validators");

router.get("/findAll", auth, userControllers.findAll)

router.get("/me", auth, userControllers.profile);
router.get("/:id", auth, userControllers.profile);

router.put("/me", auth, validate(updateSchema), userControllers.update);
router.put("/:id", auth, validate(updateSchema), userControllers.update);

router.delete("/me", auth, userControllers.delete);
router.delete("/:id", auth, userControllers.delete);

router.put(
  "/:id/role",
  auth,
  role("admin"),
  validate(changeRoleSchema),
  userControllers.changeRole,
);

module.exports = router;
