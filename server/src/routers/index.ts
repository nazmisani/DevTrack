// src/routers/index.ts
const express = require("express");
const router = express.Router();

import AuthController from "../controllers/authController";
import authentication from "../middlewares/authentication";

router.post("/auth/login", AuthController.login);
router.post("/auth/register", AuthController.register);

router.use(authentication);

export default router;
