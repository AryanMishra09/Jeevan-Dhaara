import express from "express";
import {registerController, loginController, currentUserController} from "../controllers/authController.js"
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

//routes:

// For register || POST
router.post("/register", registerController);

//for login || POST
router.post("/login", loginController);

//get current user // GET
router.get("/current-user", authMiddleware, currentUserController);

export default router;