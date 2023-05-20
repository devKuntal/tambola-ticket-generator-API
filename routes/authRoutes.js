import express from "express";
import {
  register,
  login,
  updateUser,
  logout,
  getCurrentUser,
} from "../controllers/authControllers.js";
import rateLimiter from "express-rate-limit";
import authenticateUser from "../middleware/auth.js";

// apply api rate limit
const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, //15 minutes
  max: 10,
  message:
    "Too many requests from this IP, Please try again after 15 minutes...",
});

const router = express.Router();

router.route("/register").post(apiLimiter, register);

router.route("/login").post(apiLimiter, login);

router.get("/logout", logout);

router.route("/updateUser").patch(authenticateUser, updateUser);

router.route("/getCurrentUser").get(authenticateUser, getCurrentUser);

export default router;
