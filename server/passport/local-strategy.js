const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');

module.exports = (passport, data) => {

    const authStrategy = new LocalStrategy(
        (username, password, done) => {
            data.getAdminByName(username)
                .then(admin => {
                    if (admin) {
                        return admin;
                    }
                    done(null, false);
                })
                .then(admin => {
                    bcrypt.compare(password, admin.password)
                        .then(res => {
                            if (res) {
                                done(null, admin);
                                return;
                            }
                            done(null, false);
                        });

                })
                .catch(error => done(error, false));
        });
    passport.use(authStrategy);
};