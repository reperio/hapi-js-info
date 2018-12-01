const config = require('./config');
const extensions = require('./extensions');
const routes = require('./routes');
const Server = require('@reperio/hapijs-starter');

const start = async function() {
    const server = new Server(config.server);
    await server.registerExtension(extensions.onRequest);
    await server.registerExtension(extensions.onPreHandler);
    await server.server.route(routes);
    await server.startServer();
    
    server.app.recentRequests = [];
};

start();
