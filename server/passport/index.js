const passport = require('passport');
const data = require('../data/database');

passport.serializeUser((user, done) => {
    if (user) {
        console.log("serializeUser: ", user._id);
        done(null, user._id);
    }
});

passport.deserializeUser((userId, done) => {
    console.log("deserializeUser: ", userId);
    data.getAdminById(userId)
        .then(user => {
            done(null, user || false)
        })
        .catch(error => done(error, false));
});

require('./local-strategy')(passport, data);

module.exports = (app) => {
    app.use(passport.initialize());
    app.use(passport.session());
};