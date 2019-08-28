const CONFIG = require('../config/config');
const dbURI = process.env.MONGODB || CONFIG.DB_URL;
const mongoose = require('mongoose');
const AdminModel = require('../scheme/admin.schema');
const bcrypt = require('bcrypt');
const saltRounds = 8;
let db = mongoose.connection;

const data = mongoose.connect(dbURI, {
    useNewUrlParser: true
});

module.exports = () => {
    function addAdmin(req, res) {

        mongoose.connect(dbURI, {
            useNewUrlParser: true
        });
        db.on('error', (err) => {
            console.log('connection error!');
        });
        let admin = req.body;
        console.log("add Admin");
        console.log(admin);
        let password = req.body.password;
        if (password) {
            bcrypt.genSalt(saltRounds, (error, salt) => {
                if (error) {
                    res.send({
                        status: false,
                        message: error
                    });
                }
                bcrypt.hash(password, salt, (err, hash) => {
                    if (err) {
                        res.send({
                            status: false,
                            message: err
                        });
                    }
                    if (hash) {
                        admin.password = hash;
                        AdminModel.create(req.body, error => {
                            if (error) {
                                return res.send({
                                    status: false,
                                    message: "Потребител с такова име или E-mail вече съществува!",
                                    error: error
                                });
                            }
                            res.send({
                                status: true,
                                message: "Потребителят е създаден!"
                            });
                        });
                    }
                });
            });
        } else {
            res.send({
                status: false,
                message: "Въведете парола!"
            });
        }
    }

    function getAdmins(req, res) {
        mongoose.connect(dbURI, {
            useNewUrlParser: true
        });
        db.on('error', (err) => {
            console.log('connection error!');
        });
        db.on('open', () => {
            console.log("getAdmins we're connected!");
        });
        AdminModel.find()
            .then((users) => {
                admins = (users.role == "Admin");
                return res.send({
                    status: true,
                    message: admins
                });
            });
    }

    function getAdminByName(username) {
        return new Promise((resolve, reject) => {
            // data;
            let db = mongoose.connection;
            db.on('open', () => {
                console.log("getAdminByUsername we're connected!");
            });
            AdminModel.findOne({
                    username: username
                })
                .then(admin => {
                    resolve(admin);
                });
        });
    }

    function getAdminById(req, res) {
        userId = req.params.id;
        mongoose.connect(dbURI, {
            useNewUrlParser: true
        });
        db.on('error', (err) => {
            console.log('connection error!');
        });
        db.on('open', () => {
            console.log("getAdminById we're connected!");
        });
        AdminModel.findOne({
                _id: userId
            })
            .then(admin => {
                res.send(admin);
            });
    }


    return {
        addAdmin,
        getAdmins,
        getAdminById,
        getAdminByName
    };
};