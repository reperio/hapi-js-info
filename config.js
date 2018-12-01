module.exports = {
    server: {
        host: process.env.INFO_HOST || '0.0.0.0',
        port: process.env.INFO_PORT || 3000,
        statusMonitor: false,
        cors: true,
        corsOrigins: ['*'],
        authEnabled: false
    }
};
