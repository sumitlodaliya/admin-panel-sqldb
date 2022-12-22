const express = require("express");

const passport = require('passport');

const routes = express.Router();

const logincontroller = require('../controllers/LoginControllers');

console.log("admin route is start");

// Login Mate
routes.get('/', logincontroller.login);

// routes.post('/loginData',logincontroller.loginData);
routes.post('/loginData', passport.authenticate('local', { failureRedirect: '/' }), logincontroller.loginData);

routes.get('/forgotemail',logincontroller.forgotemail);
routes.post('/forgotemaildata',logincontroller.forgotemaildata);
routes.get('/otp',logincontroller.otp);
routes.post('/otpData',logincontroller.otpData);
routes.get('/newpass',logincontroller.newpass);
routes.post('/newpassData',logincontroller.newpassData);



module.exports = routes;