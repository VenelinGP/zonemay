var path = require('path');
var fs = require('fs');

var config = JSON.parse(fs.readFileSync(path.join(__dirname, "/config.json"), 'utf8'));

var CONFIG = {};
CONFIG.ENV = (process.env.NODE_ENV || 'development');
CONFIG.PORT = (process.env.PORT || config.port);
CONFIG.DB_URL = 'mongodb://' + config.mongodb.username + ':' + config.mongodb.password + '@' + config.mongodb.host + ':' + config.mongodb.port + '/' + config.mongodb.database;

CONFIG.DB = config.mongodb.database;
CONFIG.SECRET = config.secret;
CONFIG.SECRET_KEY = '16f198404de4bb7b994f16b84e30f14f';
CONFIG.GOOGLE_MAP_API_KEY = '';

//Export Module
module.exports = CONFIG;