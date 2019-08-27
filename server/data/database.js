const CONFIG = require('../config/config');
const dbURI = process.env.MONGODB || CONFIG.DB_URL;
const mongoose = require('mongoose');
const AdminModel = require('../scheme/admin.schema');

const data = mongoose.connect(dbURI, {
    useNewUrlParser: true
});

module.exports = {
    getAllAdmins() {
        return new Promise((resolve, reject) => {
            //data;
            let db = mongoose.connection;
            db.on('open', () => {
                console.log("getAllAdmins we're connected!");
            });
            AdminModel.find()
                .then(admins => {
                    //console.log(admins);
                });
        });
    },
    getAdminByName(username) {
        console.log("getAdminByName we're connected!");
        return new Promise((resolve, reject) => {
            // data;
            let db = mongoose.connection;
            db.on('open', () => {
                console.log("getAdminByName we're connected!");
            });
            AdminModel.findOne({
                    username: username
                })
                .then(admin => {
                    console.log("Admin: " + admin);
                    resolve(admin);
                });
        });
    },

    getAdminById(adminId) {
        return new Promise((resolve, reject) => {
            let db = mongoose.connection;
            db.on('open', () => {
                console.log("getAdminById we're connected!");
            });
            AdminModel.findOne({
                    _id: adminId
                })
                .then(admin => {
                    resolve(admin);
                });
        });
    }
};