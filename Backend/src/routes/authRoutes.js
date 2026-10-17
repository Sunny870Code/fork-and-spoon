const express = require("express");
const router = express.Router();
const { otpIpLimiter, otpAccountLimiter } = require('../middleware/otpLimiter');
const { authUser } = require("../middleware/auth.middleware");
const authController = require("../controller/auth.controller");

// POST route for registration
router.post("/register" ,authController.registerUser);
router.post("/verifyotp",otpIpLimiter,otpAccountLimiter ,authController.verifyOtp);
router.post("/login", authController.loginUser);
router.get("/me", authUser, authController.getCurrentUser);
router.post("/gauth", authController.googleAuth);
router.post("/logout", authController.logout);

module.exports = router;