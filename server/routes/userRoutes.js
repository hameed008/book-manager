import express from "express";
import checkAuth from "../middlewares/authMiddleware.js";
import {
  signupUser,
  loginUser,
  getUserProfile,
  logoutUser,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/user/signup", signupUser);
router.post("/user/login", loginUser)
router.get('/user', checkAuth, getUserProfile);
router.post('/user/logout', checkAuth, logoutUser);
export default router;

