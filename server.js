// Injecting Our Configuration
const CONFIG = require('./server/config/config');
const CONFIG_PORT = CONFIG.PORT;
const CONFIG_ENV = CONFIG.ENV;
const CONFIG_DB = CONFIG.DB_URL;
console.log(CONFIG_DB);

const http = require("http");

const app = require("./server/app/");

/**
 * Get port from environment and store in Express.
 */
app.set("port", CONFIG_PORT);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/** HTTP Server Instance */
try {
    app.listen(CONFIG_PORT, () => {
        console.log(`API running on http://localhost:${CONFIG_PORT}/api`);
    });
} catch (ex) {
    console.log(ex);
}