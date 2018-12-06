const config = require('./config');

module.exports = {
    onRequest: {
        type: 'onRequest',
        method: async (request, h) => {
            if (request.path !== config.recentRequests.path) {
                // payloads do not get parsed until the preHandler event
                // BUT hapi won't run the preHandler unless it can match a route
                // so we need to save the original path
                // and redirect the request to '/'
                // ditto for the request method
                request.app.path = request.path;
                request.path = '/';

                request.app.method = request.method;
                request.method = 'post';
            }
            return h.continue;
        }
    },
    onPreHandler: {
        type: 'onPreHandler',
        method: async (request, h) => {
            if (request.path === config.recentRequests.path && request.method.toLowerCase() === 'get') {
                return h.continue;
            }

            // not logging request params because they will always be null
            // but they will show up in the path string
            const meta = {
                query: request.query,
                payload: request.payload,
                headers: request.headers,
                path: request.app.path,
                method: request.app.method,
                info: request.info
            };

            request.server.app.logger.info('New request', meta);
            const recentRequests = request.server.app.recentRequests;
            const numMaxRequests = config.recentRequests.numRequests;
            recentRequests.push(meta);
            if (recentRequests.length > numMaxRequests) {
                request.server.app.recentRequests = recentRequests.splice(recentRequests.length - numMaxRequests);
            }

            return h.continue;
        }
    }
};
