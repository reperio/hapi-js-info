module.exports = {
    server: {
        host: process.env.HAPI_JS_INFO_HOST || '0.0.0.0',
        port: process.env.HAPI_JS_INFO_PORT || 3000,
        statusMonitor: false,
        cors: true,
        corsOrigins: ['*'],
        authEnabled: false,
        defaultRoute: false
    }
};
