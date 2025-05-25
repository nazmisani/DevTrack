// src/routers/index.ts
const express = require("express");
const router = express.Router();

import AuthController from "../controllers/authController";
import SkillController from "../controllers/skillControllers";
import TagController from "../controllers/tagController";
import ProjectController from "../controllers/projectController";
import authentication from "../middlewares/authentication";
import errorHandler from "../middlewares/errorHandler";

router.post("/auth/login", AuthController.login);
router.post("/auth/register", AuthController.register);

router.use(authentication);

router.get("/skills", SkillController.getSkill);
router.get("/skill/:id", SkillController.getSkillDetail);
router.post("/skills", SkillController.addSkill);
router.put("/skills/:id", SkillController.updateSkill);
router.delete("/skills/:id", SkillController.deleteSkill);

router.get("/project", ProjectController.getProject);

router.get("/tags", TagController.getTags);
router.get("/tag/:id", TagController.getTagDetail);
router.post("/tags", TagController.addTag);
router.put("/tags/:id", TagController.updateTag);
router.delete("/tags/:id", TagController.deleteTag);

router.use(errorHandler);

export default router;
