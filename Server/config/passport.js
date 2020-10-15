const passport = require('passport');
const request = require('request');
const { Strategy: InstagramStrategy } = require('passport-instagram');
const { Strategy: LocalStrategy } = require('passport-local');
const { Strategy: FacebookStrategy } = require('passport-facebook');
const { OAuth2Strategy: GoogleStrategy } = require('passport-google-oauth');
const { OAuth2Strategy } = require('passport-oauth');
const api = require('../controllers/api');
const refresh = require('passport-oauth2-refresh');
const moment = require('moment');

const User = require('../models/User');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

/**
 * Sign in using Email and Password.
 */
passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
  User.findOne({ email: email.toLowerCase() }, (err, user) => {
    if (err) { return done(err); }
    if (!user) {
      return done(null, false, { msg: `Email ${email} not found.` });
    }
    user.comparePassword(password, (err, isMatch) => {
      if (err) { return done(err); }
      if (isMatch) {
        return done(null, user);
      }
      return done(null, false, { msg: 'Invalid email or password.' });
    });
  });
}));

/**
 * OAuth Strategy Overview
 *
 * - User is already logged in.
 *   - Check if there is an existing account with a provider id.
 *     - If there is, return an error message. (Account merging not supported)
 *     - Else link new OAuth account with currently logged-in user.
 * - User is not logged in.
 *   - Check if it's a returning user.
 *     - If returning user, sign in and we are done.
 *     - Else check if there is an existing account with user's email.
 *       - If there is, return an error message.
 *       - Else create a new account.
 */

/**
 * Sign in with Facebook.
 */
// passport.use(new FacebookStrategy({
//   clientID: process.env.FACEBOOK_ID,
//   clientSecret: process.env.FACEBOOK_SECRET,
//   callbackURL: '/auth/facebook/callback',
//   profileFields: ['name', 'email', 'link', 'locale', 'timezone', 'gender'],
//   passReqToCallback: true
// }, (req, accessToken, refreshToken, profile, done) => {
//   if (req.user) {
//     User.findOne({ facebook: profile.id }, (err, existingUser) => {
//       if (err) { return done(err); }
//       if (existingUser) {
//         req.flash('errors', { msg: 'There is already a Facebook account that belongs to you. Sign in with that account or delete it, then link it with your current account.' });
//         done(err);
//       } else {
//         User.findById(req.user.id, (err, user) => {
//           if (err) { return done(err); }
//           user.facebook = profile.id;
//           user.tokens.push({ kind: 'facebook', accessToken });
//           user.profile.name = user.profile.name || `${profile.name.givenName} ${profile.name.familyName}`;
//           user.profile.gender = user.profile.gender || profile._json.gender;
//           user.profile.picture = user.profile.picture || `https://graph.facebook.com/${profile.id}/picture?type=large`;
//           user.save((err) => {
            

//             req.flash('info', { msg: 'Facebook account has been linked.' });
//             done(err, user);
//           });
//         });
//       }
//     });
//   } else {
//     User.findOne({ facebook: profile.id }, (err, existingUser) => {
//       if (err) { return done(err); }
//       if (existingUser) {
//         return done(null, existingUser);
//       }
//       User.findOne({ email: profile._json.email }, (err, existingEmailUser) => {
//         if (err) { return done(err); }
//         if (existingEmailUser) {
//           req.flash('errors', { msg: 'There is already an account using this email address. Sign in to that account and link it with Facebook manually from Account Settings.' });
//           done(err);
//         } else {
//           const user = new User();
//           user.email = profile._json.email;
//           user.facebook = profile.id;
//           user.tokens.push({ kind: 'facebook', accessToken });
//           user.profile.name = `${profile.name.givenName} ${profile.name.familyName}`;
//           user.profile.gender = profile._json.gender;
//           user.profile.picture = `https://graph.facebook.com/${profile.id}/picture?type=large`;
//           user.profile.location = (profile._json.location) ? profile._json.location.name : '';
//           user.save((err) => {
//            done(err, user);
//           });
//         }
//       });
//     });
//   }
// }));





// /**
//  * Sign in with Instagram.
//  */
// passport.use(new InstagramStrategy({
//   clientID: process.env.INSTAGRAM_ID,
//   clientSecret: process.env.INSTAGRAM_SECRET,
//   callbackURL: '/api/auth/instagram/callback',
//   passReqToCallback: true
// }, (req, accessToken, refreshToken, profile, done) => {
//   if (req.user) {
//     User.findOne({ instagram: profile.id }, (err, existingUser) => {
//       if (err) { return done(err); }
//       if (existingUser) {
//         req.flash('errors', { msg: 'There is already an Instagram account that belongs to you. Sign in with that account or delete it, then link it with your current account.' });
//         done(err);
//       } else {
//         User.findById(req.user.id, (err, user) => {
//           if (err) { return done(err); }
//           user.instagram = profile.id;
//           user.tokens.push({ kind: 'instagram', accessToken });
//           user.profile.name = user.profile.name || profile.displayName;
//           user.profile.picture = user.profile.picture || profile._json.data.profile_picture;
//           user.profile.website = user.profile.website || profile._json.data.website;
//           user.save((err) => {
//             req.flash('info', { msg: 'Instagram account has been linked.' });
//               api.saveInstagramImage(req.user,  done);
//               done(err, user);
//           });
//         });
//       }
//     });
//   } else {
//     User.findOne({ instagram: profile.id }, (err, existingUser) => {
//       if (err) { return done(err); }
//       if (existingUser) {
//         return done(null, existingUser);
//       }
//       const user = new User();
//       user.instagram = profile.id;
//       user.tokens.push({ kind: 'instagram', accessToken });
//       user.profile.name = profile.displayName;
//       // Similar to Twitter API, assigns a temporary e-mail address
//       // to get on with the registration process. It can be changed later
//       // to a valid e-mail address in Profile Management.
//       user.email = `${profile.username}@instagram.com`;
//       user.profile.website = profile._json.data.website;
//       user.profile.username=profile.username;
//       user.profile.picture = profile._json.data.profile_picture;
//       user.save((err) => {
//         api.saveInstagramImage(user, done);
//         done(err, user);
//       });
//     });
//   }
// }));



/**
 * Foursquare API OAuth.
 */
// passport.use('foursquare', new OAuth2Strategy({
//   authorizationURL: 'https://foursquare.com/oauth2/authorize',
//   tokenURL: 'https://foursquare.com/oauth2/access_token',
//   clientID: process.env.FOURSQUARE_ID,
//   clientSecret: process.env.FOURSQUARE_SECRET,
//   callbackURL: process.env.FOURSQUARE_REDIRECT_URL,
//   passReqToCallback: true
// },
//   (req, accessToken, refreshToken, profile, done) => {
//     User.findById(req.user._id, (err, user) => {
//       if (err) { return done(err); }
//       user.tokens.push({ kind: 'foursquare', accessToken });
//       user.save((err) => {
//         done(err, user);
//       });
//     });
//   }));



/**
 * Sign in with Google.
 */
const googleStrategyConfig = new GoogleStrategy({
  clientID: process.env.GOOGLE_ID,
  clientSecret: process.env.GOOGLE_SECRET,
  callbackURL: '/auth/google/callback',
  passReqToCallback: true
}, (req, accessToken, refreshToken, params, profile, done) => {
  if (req.user) {
    User.findOne({ google: profile.id }, (err, existingUser) => {
      if (err) { return done(err); }
      if (existingUser && (existingUser.id !== req.user.id)) {
        req.flash('errors', { msg: 'There is already a Google account that belongs to you. Sign in with that account or delete it, then link it with your current account.' });
        done(err);
      } else {
        User.findById(req.user.id, (err, user) => {
          if (err) { return done(err); }
          user.google = profile.id;
          user.tokens.push({
            kind: 'google',
            accessToken,
            accessTokenExpires: moment().add(params.expires_in, 'seconds').format(),
            refreshToken,
          });
          user.profile.name = user.profile.name || profile.displayName;
          user.profile.gender = user.profile.gender || profile._json.gender;
          user.profile.picture = user.profile.picture || profile._json.picture;
          user.save((err) => {
            req.flash('info', { msg: 'Google account has been linked.' });
            done(err, user);
          });
        });
      }
    });
  } else {
    User.findOne({ google: profile.id }, (err, existingUser) => {
      if (err) { return done(err); }
      if (existingUser) {
        return done(null, existingUser);
      }
      User.findOne({ email: profile.emails[0].value }, (err, existingEmailUser) => {
        if (err) { return done(err); }
        if (existingEmailUser) {
          req.flash('errors', { msg: 'There is already an account using this email address. Sign in to that account and link it with Google manually from Account Settings.' });
          done(err);
        } else {
          const user = new User();
          user.email = profile.emails[0].value;
          user.google = profile.id;
          user.tokens.push({
            kind: 'google',
            accessToken,
            accessTokenExpires: moment().add(params.expires_in, 'seconds').format(),
            refreshToken,
          });
          user.profile.name = profile.displayName;
          user.profile.gender = profile._json.gender;
          user.profile.picture = profile._json.picture;
          user.save((err) => {
            done(err, user);
          });
        }
      });
    });
  }
});
passport.use('google', googleStrategyConfig);
refresh.use('google', googleStrategyConfig);


/**
 * Login Required middleware.
 */
exports.isAuthenticated = (req, res, next) => {
  // return next();
  if (req.isAuthenticated()) {
    return next();
  }
  res.send(401);
};

/**
 * Login Admin user Required middleware.
 */

exports.isAuthenticatedAdmin = (req, res, next) => {
  // return next();

  if (req.isAuthenticated()) {
    if(req.user.isAdmin){
      console.log('admin User check  user :',req.user.profile.name );
      return next();
    }
   
  } else {
  res.status(401).send({mgs:'unauthorized user'});
  }
};



/**
 * Authorization Required middleware.
 */
exports.isAuthorized = (req, res, next) => {
  // next();
  const provider = req.path.split('/').slice(-1)[0];
  const token = req.user.tokens.find(token => token.kind === provider);
  if (token) {
    next();
  } else {
    res.redirect(`/auth/${provider}`);
  }
};
