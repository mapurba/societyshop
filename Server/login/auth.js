/**
 * Login Required middleware.
 */
exports.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.send(401);
};


/**
 * Login Admin user Required middleware.
 */
exports.isAuthenticatedAdmin = (req, res, next) => {
    if (req.isAuthenticated() && req.user.isAdmin) {
        console.log('admin User check  user :', req.user.profile.name);
        return next();
    } else {
        res.status(401).send({mgs: 'unauthorized user'});
    }
};


/**
 * Authorization Required middleware.
 */
exports.isAuthorized = (req, res, next) => {
    const provider = req.path.split('/').slice(-1)[0];
    const token = req.user.tokens.find(token => token.kind === provider);
    if (token) {
        next();
    } else {
        res.redirect(`/auth/${provider}`);
    }
};
