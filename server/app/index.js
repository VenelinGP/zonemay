const path = require('path'); // Node In-Build Module
const config = require('../config/config');
const express = require('express'); // $ npm install express
const cors = require('cors'); // $ npm install cors
const session = require('express-session'); // $ npm install express-session
const bodyParser = require('body-parser'); // $ npm install body-parser
const cookieParser = require('cookie-parser'); // $ npm install cookie-parser

const server = express();
const url = require('url');

let corsOptions = {
    //origin: 'http://localhost:4200/',
    origin: 'http://www.zonemay.bg/',
    optionsSuccessStatus: 200
};

server.use(cors(corsOptions));
// Parsers for POST data
server.use(cookieParser());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
    extended: false
}));

server.use(
    session({
        //name: 'demo',
        //store: sessionStore, // connect-mongo session store
        secret: config.SECRET,
        proxy: true,
        resave: true,
        saveUninitialized: true
    })
);

server.use(express.static(path.join(__dirname, '../../dist/zonemay')));
server.use('/libs', express.static('../../node_modules'));
//erver.use("/uploads", express.static(path.join(__dirname, '../../uploads')));
//server.use("/uploads/images/taskers", express.static(path.join(__dirname, '../../uploads/images/taskers')));

require('../passport')(server);

// Get our API routes
const api = require('../routes/api.routes');

// Set our api routes
server.use('/api', api);

// Catch all other routes and return the index file
server.get('*', (req, res) => {
    console.log('Here - index.js');
    res.sendFile(path.join(__dirname, '../../dist/zonemay/index.html'));
});

module.exports = server;