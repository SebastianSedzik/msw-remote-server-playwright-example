import { test } from '@playwright/test';
import { setupRemoteServer, SetupRemoteServerApi } from 'msw/node';

const remote = setupRemoteServer();

export const setupMockServer = (): SetupRemoteServerApi => {
    test.beforeAll(async () => {
        await remote.listen();
    });
    
    test.afterEach(async () => {
        await remote.resetHandlers();
    })
    
    test.afterAll(async () => {
        await remote.close();
    });

    return remote;
}