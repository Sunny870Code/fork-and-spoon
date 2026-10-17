const rateLimit = require('express-rate-limit');
const { ipKeyGenerator } = require('express-rate-limit');
// 1. IP-Based Limiter: Max 5 attempts per IP per 15 minutes
const otpIpLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 15 minutes
  max: 15,                   // Limit each IP to 15 OTP verification requests per window
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: 'Too many OTP verification attempts from this IP. Please try again after 5 minutes.',
  },
});

// 2. Email/Account-Based Limiter: Max 3 failed attempts per target account
const otpAccountLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 5 minutes
  max: 30,                   // Allow 30 attempts per email address
  standardHeaders: true,
  legacyHeaders: false,
  // Key generator uses the target email instead of the client IP
  keyGenerator: (req, res) => {
    // If an email is provided, rate-limit per email (great for stopping attacks on a specific user)
    if (req.body && req.body.email) {
      return req.body.email.toLowerCase().trim();
    }
    // Otherwise, fall back to the IP address, processed safely with ipKeyGenerator for IPv6
    return ipKeyGenerator(req);
  },
  message: {
    message: 'Too many failed OTP attempts for this account. Please request a new OTP after 5 minutes.',
  },
});

module.exports = { otpIpLimiter, otpAccountLimiter };