const express = require("express");
const router = express.Router();

const data = require("../data/database");

const createAuthController = require("../controllers/authenticate-controller");
const authController = createAuthController(data);

const createAdminController = require("../controllers/admin-controller");
const AdminController = createAdminController();

router
    .get("/", (req, res) => {
        res.status(200).redirect("/");
    })
    .post("/registeradmin", AdminController.addAdmin)
    .post("/authenticate", authController.authenticate);

module.exports = router;