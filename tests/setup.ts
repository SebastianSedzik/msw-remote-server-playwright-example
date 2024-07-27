import { test } from '@playwright/test';
import { setupRemoteServer, SetupRemoteServerApi } from 'msw/node';

const server = setupRemoteServer();

export const setupMockServer = (): SetupRemoteServerApi => {
    test.beforeAll(async () => {
        await server.listen({ port: 3001 });
    });

    test.afterEach(async () => {
        await server.resetHandlers();
    })

    test.afterAll(async () => {
        await server.close();
    });

    return server;
}