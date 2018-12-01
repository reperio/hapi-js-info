const config = require('./config');
const Server = require('@reperio/hapijs-starter');

const start = async function() {
    const server = new Server(config.server);

    server.registerExtension({
        type: 'onRequest',
        method: async (request, h) => {
            request.server.app.logger.info('New request', {
                params: request.params,
                query: request.query,
                payload: request.payload,
                headers: request.headers,
                path: request.path,
                method: request.url.method,
                info: request.info
            });

            return h.response('success').code(200).takeover();
        }
    });

    await server.startServer();
};

start();
