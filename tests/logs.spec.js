/* eslint-env jest */
const extensions = require('../extensions');
const routes = require('../routes');
const Server = require('@reperio/hapijs-starter');

const testMethods = ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'];

describe('Logging Tests', () => {
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

    describe('Methods', () => {
        for (const method of testMethods) {
            it(`${method} request logs path`, async () => {
                const options = {
                    url: '/test',
                    method: method
                };
        
                const mockInfo = jest.fn();
                server.app.logger.info = mockInfo;
        
                const response = await server.server.inject(options);
                expect(response.statusCode).toBe(200);
                expect(mockInfo.mock.calls.length).toBe(1);
                
                const logMetaProperty = mockInfo.mock.calls[0][1];
                expect(logMetaProperty.path).toBe(options.url);
            });
            
            it(`${method} request logs method`, async () => {
                const options = {
                    url: '/test',
                    method: method.toLowerCase()
                };
        
                const mockInfo = jest.fn();
                server.app.logger.info = mockInfo;
        
                const response = await server.server.inject(options);
                expect(response.statusCode).toBe(200);
                expect(mockInfo.mock.calls.length).toBe(1);
                
                const logMetaProperty = mockInfo.mock.calls[0][1];
                expect(logMetaProperty.method).toBe(options.method);
            });
    
            it(`${method} request logs query params`, async () => {
                const options = {
                    url: '/test?testQuery=test',
                    method: method.toLowerCase()
                };
        
                const mockInfo = jest.fn();
                server.app.logger.info = mockInfo;
        
                const response = await server.server.inject(options);
                expect(response.statusCode).toBe(200);
                expect(mockInfo.mock.calls.length).toBe(1);
                
                const logMetaProperty = mockInfo.mock.calls[0][1];
                expect(logMetaProperty.query.testQuery).not.toBeUndefined();
                expect(logMetaProperty.query.testQuery).toBe('test');
            });
    
            it(`${method} request logs a defined payload`, async () => {
                const options = {
                    url: '/test',
                    method: method,
                    payload: {
                        testProperty: 'test'
                    }
                };
        
                const mockInfo = jest.fn();
                server.app.logger.info = mockInfo;
        
                const response = await server.server.inject(options);
                expect(response.statusCode).toBe(200);
                expect(mockInfo.mock.calls.length).toBe(1);
                
                const logMetaProperty = mockInfo.mock.calls[0][1];
                expect(logMetaProperty.payload).not.toBeUndefined();
            });
    
            it(`${method} request logs headers`, async () => {
                const options = {
                    url: '/test',
                    method: method,
                    headers: {
                        test: 'test'
                    }
                };
        
                const mockInfo = jest.fn();
                server.app.logger.info = mockInfo;
        
                const response = await server.server.inject(options);
                expect(response.statusCode).toBe(200);
                expect(mockInfo.mock.calls.length).toBe(1);
                
                const logMetaProperty = mockInfo.mock.calls[0][1];
                expect(logMetaProperty.headers).not.toBeUndefined();
                expect(logMetaProperty.headers.test).not.toBeUndefined();
                expect(logMetaProperty.headers.test).toBe(options.headers.test);
            });
    
            it(`${method} request logs info object`, async () => {
                const options = {
                    url: '/test',
                    method: method,
                    headers: {
                        test: 'test'
                    }
                };
        
                const mockInfo = jest.fn();
                server.app.logger.info = mockInfo;
        
                const response = await server.server.inject(options);
                expect(response.statusCode).toBe(200);
                expect(mockInfo.mock.calls.length).toBe(1);
                const logMetaProperty = mockInfo.mock.calls[0][1];
    
                expect(logMetaProperty.info).not.toBeUndefined();
                expect(logMetaProperty.info.remoteAddress).not.toBeUndefined();
                expect(logMetaProperty.info.remotePort).not.toBeUndefined();
                expect(logMetaProperty.info.host).not.toBeUndefined();
                expect(logMetaProperty.info.hostname).not.toBeUndefined();
                expect(logMetaProperty.info.id).not.toBeUndefined();
            });
        }
    });

    describe('Payloads', () => {
        it('POST request payload properties logged', async () => {
            const options = {
                url: '/test',
                method: 'post',
                payload: {
                    testProperty: 'test'
                }
            };
    
            const mockInfo = jest.fn();
            server.app.logger.info = mockInfo;
    
            const response = await server.server.inject(options);
            expect(response.statusCode).toBe(200);
            expect(mockInfo.mock.calls.length).toBe(1);
            
            const logMetaProperty = mockInfo.mock.calls[0][1];
            expect(logMetaProperty.payload).not.toBeUndefined();
            expect(logMetaProperty.payload.testProperty).not.toBeUndefined();
            expect(logMetaProperty.payload.testProperty).toBe(options.payload.testProperty);
        });

        it('PUT request payload properties logged', async () => {
            const options = {
                url: '/test',
                method: 'put',
                payload: {
                    testProperty: 'test'
                }
            };
    
            const mockInfo = jest.fn();
            server.app.logger.info = mockInfo;
    
            const response = await server.server.inject(options);
            expect(response.statusCode).toBe(200);
            expect(mockInfo.mock.calls.length).toBe(1);
            
            const logMetaProperty = mockInfo.mock.calls[0][1];
            expect(logMetaProperty.payload).not.toBeUndefined();
            expect(logMetaProperty.payload.testProperty).not.toBeUndefined();
            expect(logMetaProperty.payload.testProperty).toBe(options.payload.testProperty);
        });
    });
});
