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
    }));

authRouter.get('/google/callback',
    passport.authenticate('google', {failureRedirect: '/login'}),
    (req, res) => {
        res.redirect('/');
    });

module.exports = authRouter;
