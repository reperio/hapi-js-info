const config = require('./config');
const extensions = require('./extensions');
const defaultRoute = require('./route');
const Server = require('@reperio/hapijs-starter');

const start = async function() {
    const server = new Server(config.server);
    await server.registerExtension(extensions.onRequest);
    await server.registerExtension(extensions.onPreHandler);
    await server.server.route(defaultRoute);
    await server.startServer();
};

start();
