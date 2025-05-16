// src/routers/index.ts
const express = require("express");
const router = express.Router();

import AuthController from "../controllers/authController";

router.post("/auth/login", AuthController.login);
router.post("/auth/register", AuthController.register);

export default router;
