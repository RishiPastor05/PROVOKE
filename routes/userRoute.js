const express= require("express");
const { signupController, loginController } = require("../controllers/auth");
const { addSubs, getSubs } = require("../controllers/subscription");
const { payment } = require("../controllers/payment");
const router= express.Router();

// auth routes
router.post('/signup',signupController);
router.post('/login',loginController);

// subscription routes
router.post('/addsubs',addSubs);
router.get('/getsubs',getSubs);

// payment routes
router.post('/payment',payment)

module.exports = router