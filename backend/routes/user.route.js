import { Router } from "express";
import {
  user_signup,
  google_signin,
  send_email_OTP,
  verify_email,
  user_login,
  user_logout,
} from "../controllers/userController/user.auth.js";

const router = Router();

router.post("/sent_email_otp", send_email_OTP);
router.post("/verify_email", verify_email);
router.post("/signup", user_signup);

router.post("/google_signup", google_signin);

router.post("/login", user_login);
router.post("/logout", user_logout);

//
router.get("/test", (req, res) => {
  res.send("test successful.");
});

export default router;
