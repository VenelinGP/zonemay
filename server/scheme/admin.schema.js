const mongoose = require("mongoose");
const CONFIG = require('../config/config');
const dbURI = process.env.MONGODB || CONFIG.DB_URL;
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);
const ADMIN_SCHEMA = new Schema({
    username: {
        type: String,
        lowercase: true,
        index: {
            unique: true
        },
        trim: true
    },
    email: {
        type: String,
        lowercase: true,
        index: {
            unique: true
        },
        trim: true
    },
    password: String,
    name: String,
    role: String
});
let connection = mongoose.createConnection(dbURI, {
    useNewUrlParser: true
});
const AdminModel = connection.model('Admin', ADMIN_SCHEMA);
module.exports = AdminModel;