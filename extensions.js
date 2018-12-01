module.exports = {
    onRequest: {
        type: 'onRequest',
        method: async (request, h) => {
            // payloads do not get parsed until the preHandler event
            // BUT hapi won't run the preHandler unless it can match a route
            // so we need to save the original path
            // and redirect the request to '/'
            // ditto for the request method
            request.app.path = request.path;
            request.path = '/';

            request.app.method = request.method;
            request.method = 'post';

            return h.continue;
        }
    },
    onPreHandler: {
        type: 'onPreHandler',
        method: async (request, h) => {
            // not logging request params because they will always be null
            // but they will show up in the path string
            request.server.app.logger.info('New request', {
                query: request.query,
                payload: request.payload,
                headers: request.headers,
                path: request.app.path,
                method: request.app.method,
                info: request.info
            });

            return h.response('success').code(200).takeover();
        }
    }
};
