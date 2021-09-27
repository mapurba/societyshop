const express = require('express'), authRouter = express.Router();

/**
 * API keys and Passport configuration.
 */

const passport = require('passport');

/**
 * OAuth authentication routes. (Sign in)
 */
// authRouter.get('/facebook', passport.authenticate('facebook', { scope: ['email', 'public_profile'] }));
// authRouter.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/' }), (req, res) => {
//     res.redirect(req.session.returnTo || '/profile');
// });


authRouter.get('/google', passport.authenticate('google',
    {
        scope: ['profile', 'email'],
        accessType: 'offline',
        prompt: 'consent'
    }), (req, res) => {
        console.log("new login...");
    });

authRouter.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "https://societystore.co/" }),
  (req, res) => {
    res.redirect("https://societystore.co/");
  }
);

module.exports = authRouter;
