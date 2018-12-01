module.exports = {
    server: {
        host: process.env.HAPI_JS_INFO_HOST || '0.0.0.0',
        port: process.env.HAPI_JS_INFO_PORT || 3000,
        statusMonitor: false,
        cors: true,
        corsOrigins: ['*'],
        authEnabled: false,
        defaultRoute: false
    },
    recentRequests: {
        path: process.env.HAPI_JS_INFO_RECENT_PATH || '/recent',
        numRequests: process.env.HAPI_JS_INFO_NUM_RECENT_REQUESTS || 10
    }
};
