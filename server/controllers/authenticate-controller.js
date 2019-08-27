const CONFIG = require("../config/config");
const dbURI = process.env.MONGODB || CONFIG.DB_URL;
const mongoose = require("mongoose");
const passport = require("passport");
let db = mongoose.connection;

function generateAuthKey(uniquePart) {
    const AUTH_KEY_LENGTH = 60,
        AUTH_KEY_CHARS = "qwertyuiopasdfghjklzxcvbnmWERTYUIOPASDFGHJKLZXCVBNM";
    var authKey = uniquePart,
        index;
    while (authKey.length < AUTH_KEY_LENGTH) {
        index = Math.floor(Math.random() * AUTH_KEY_CHARS.length);
        authKey += AUTH_KEY_CHARS[index];
    }
    return authKey;
}

const data = mongoose.connect(dbURI, {
    useNewUrlParser: true
});

module.exports = () => {
    return {
        authenticate(req, res, next) {
            //console.log("Req:", req);
            //const user1 = req.body;
            const auth = passport.authenticate("local", (error, user) => {
                console.log("Auth:", user);
                if (error) {
                    return next(error);
                }
                if (!user) {
                    res.json({
                        status: false,
                        message: "Invalid user or password"
                    });
                }
                if (user.role === "Fake") {
                    res.json({
                        status: false,
                        message: "This user is not authorized!"
                    })
                }
                req.login(user, error => {
                    console.log("Logged");
                    const token = generateAuthKey("zone_may_");
                    if (error) {
                        return next(error);
                    }
                    res.send({
                        status: true,
                        user: {
                            id: user._id,
                            username: user.username,
                            name: user.name,
                            role: user.role,
                            token: token
                        }
                    });
                    //res.redirect('/admin/profile');
                });
            });
            auth(req, res, next);
        }
    };
};