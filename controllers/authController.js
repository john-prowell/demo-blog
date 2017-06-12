const passport = require('passport');
const crypto = require('crypto'); // already built into node no npm install needded. does reset tokens
const mongoose = require('mongoose');
const User = mongoose.model('User');
const promisify = require('es6-promisify');
//const mail = require('../handlers/mail');

exports.login = passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: 'Failed Login!',
  successRedirect: '/',
  successFlash: 'You are now logged in!'
});

exports.logout = (req, res) => {
  req.logout();
  req.flash('success', 'You are now logged out! 👋');
  res.redirect('/');
};

//middleware that checks if user is logged in
exports.isLoggedIn = function(req, res, next) {
    // 1. first check if the user is authenticated
    // isAuthenticated() is a passport method
    if (req.isAuthenticated()) {
        next(); // carry on! They are logged in!
        return;
    }
    // if not let them know they need to be logged in and redirect to login page.
    req.flash('error', 'Oops! You must be logged in to do that!');
    res.redirect('/login');
};

exports.forgot = async (req, res) => {
  // 1. See if email exist
  const user = await User.findOne( { email: req.body.email });
  if (!user) {
    req.flash('danger', 'No account with that email exists;');
    return res.redirect('/login');
  }
// 2. Set reset tokens and expiry on User Model on their account
user.resetPasswordToken = crypto.randomBytes(20).toString('hex');
user.resetPasswordExpires = Date.now() + 3600000; // 1 hour from now
await user.save(); // save token info to user db

// 3. Send them an email with the token
const resetURL = `http://${req.headers.host}/account/reset/${user.resetPasswordToken}`;
req.flash('success', `You have been emailed a password reset link. ${resetURL}`);

// 4. redirect the to login page
res.redirect('/login');
};

exports.reset = async (req, res) => {
  const user = await User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: { $gt: Date.now } // $gt: is greater than Date.now is future
   });
   if (!user) {
     req.flash('danger', 'Password reset link is invalid or has expired.');
     return res.redirect('/login'); 
   };
};