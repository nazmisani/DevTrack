// src/routers/index.ts
const express = require("express");
const router = express.Router();

import AuthController from "../controllers/authController";
import SkillController from "../controllers/skillControllers";
import authentication from "../middlewares/authentication";
import errorHandler from "../middlewares/errorHandler";

router.post("/auth/login", AuthController.login);
router.post("/auth/register", AuthController.register);

router.use(authentication);

router.get("/skills", SkillController.getSkill);
router.post("/skills", SkillController.addSkill);
router.put("/skills/:id", SkillController.updateSkill);
router.delete("/skills/:id", SkillController.deleteSkill);

router.use(errorHandler);

export default router;
