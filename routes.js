const config = require('./config');

module.exports = [
    // catch all route
    {
        path: '/{p*}',
        method: 'POST',
        handler: async () => {
            return 'success';
        }
    },
    // recent requests route
    {
        path: config.recentRequests.path,
        method: 'GET',
        handler: async (request) => {
            // return recent requests sorted by newest
            return request.server.app.recentRequests.slice().reverse();
        }
    }
];
