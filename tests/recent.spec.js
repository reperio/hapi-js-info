/* eslint-env jest */
const config = require('../config');
const extensions = require('../extensions');
const routes = require('../routes');
const Server = require('@reperio/hapijs-starter');

describe('Recent request tests', () => {
    let server = null;
    const testConfig = {
        host: '0.0.0.0',
        port: 3000,
        statusMonitor: false,
        cors: true,
        corsOrigins: ['*'],
        authEnabled: false,
        testMode: true
    };

    beforeEach(async () => {
        // create test server
        server = new Server(testConfig);
        await server.registerExtension(extensions.onRequest);
        await server.registerExtension(extensions.onPreHandler);
        await server.server.route(routes);
        await server.startServer();

        server.app.recentRequests = [];

        // replace all loggers
        server.server.app.logger = {
            debug: () => {},
            info: () => {},
            warn: () => {},
            error: () => {}
        };

        server.server.app.traceLogger = {
            debug: () => {},
            info: () => {},
            warn: () => {},
            error: () => {}
        };

        server.server.app.activityLogger = {
            debug: () => {},
            info: () => {},
            warn: () => {},
            error: () => {}
        };
    });

    afterEach(async () => {
        await server.server.stop();
        server = null;
    });

    it('new requests are pushed into server.app.recentRequests', async () => {
        const options = {
            url: '/test',
            method: 'get'
        };

        expect(server.app.recentRequests.length).toBe(0);
        await server.server.inject(options);
        expect(server.app.recentRequests.length).toBe(1);
    });

    it('server.app.recentRequests is truncated to length defined in config', async () => {
        const options = {
            url: '/test',
            method: 'get'
        };

        for(let i = 0; i < 50; i++) {
            await server.server.inject(options);
        }

        expect(server.app.recentRequests.length).toBe(config.recentRequests.numRequests);
    });

    it('recent requests route does not get logged', async () => {
        const options = {
            url: '/recent',
            method: 'get'
        };

        expect(server.app.recentRequests.length).toBe(0);
        await server.server.inject(options);
        expect(server.app.recentRequests.length).toBe(0);
    });

    it('recent requests route returns array of objects', async () => {
        const testOptions = {
            url: '/test',
            method: 'get'
        };

        for(let i = 0; i < 50; i++) {
            await server.server.inject(testOptions);
        }

        const recentOptions = {
            url: '/recent',
            method: 'get'
        };

        const response = await server.server.inject(recentOptions);
        const payload = JSON.parse(response.payload);
        expect(Array.isArray(payload)).toBe(true);
        expect(typeof payload[0]).toBe('object');
    });

    it('recent requests are sorted by newest', async () => {
        const testOptions = {
            url: '/test',
            method: 'get'
        };

        for(let i = 0; i < 50; i++) {
            await server.server.inject(testOptions);
        }

        const newestOptions = {
            url: '/newest',
            method: 'get'
        };
        await server.server.inject(newestOptions);


        const recentOptions = {
            url: '/recent',
            method: 'get'
        };

        const response = await server.server.inject(recentOptions);
        const payload = JSON.parse(response.payload);
        expect(Array.isArray(payload)).toBe(true);
        expect(payload[0].path).toBe(newestOptions.url);
    });
});
