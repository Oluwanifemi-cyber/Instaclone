import express from "express";
import {
  registerUser,
  loginUser,
  authenticateUser,
  resendEmailVerificationLink,
  verifyEmailAccount,
  sendForgotPasswordMail,
  resetPassword,
} from "../controllers/user.js";
import { verifyToken, authorizeRoles } from "../middleware/auth.js";
import { rateLimiter } from "../middleware/rateLimiter.js";
import { cacheMiddleware } from "../middleware/cache.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", rateLimiter, loginUser);
router.post(
  "/resend-verification-email",
  rateLimiter,
  verifyToken,
  authorizeRoles("user", "admin"),
  resendEmailVerificationLink,
  sendForgotPasswordMail
);
router.post("/sendforgot-password-mail", sendForgotPasswordMail);
//get
router.get(
  "/user",
  verifyToken,
  authorizeRoles("user", "admin"),
  cacheMiddleware("auth_User", 600),
  authenticateUser
);
//patch
router.patch(
  "/verify-account/:userId/:verificationToken",
  verifyToken,
  authorizeRoles("user", "admin"),
  verifyEmailAccount
);
router.patch(
  "/reset-password/:userId/:passwordToken",
  resetPassword
);

export default router;