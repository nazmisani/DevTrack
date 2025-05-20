// src/routers/index.ts
const express = require("express");
const router = express.Router();

import AuthController from "../controllers/authController";
import skillController from "../controllers/skillControllers";
import authentication from "../middlewares/authentication";
import errorHandler from "../middlewares/errorHandler";

router.post("/auth/login", AuthController.login);
router.post("/auth/register", AuthController.register);

router.use(authentication);

router.get("/skills", skillController.getSkill);
router.post("/skills", skillController.addSkill);
router.put("/skills/:id", skillController.deleteSkill);
router.delete("/skills/:id", skillController.updateSkill);

router.use(errorHandler);

export default router;
