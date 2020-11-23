// -------------------------------------------------------------------------
// Write your custom logic here.
// Changes to this file are preserved when the app regenerates.
// Find more information on https://devcenter.kinvey.com/guides/studio-extension-points.
// -------------------------------------------------------------------------
import { environmentBase } from '@src/environments/environment-base';

// Change existing or put different environment settings for production environment
export const environment: any = {
    hmr: true,
    storage: environmentBase.storage,
    appId: environmentBase.appId,
    appName: environmentBase.appName,
    appKey: environmentBase.appKey,
    appSecret: environmentBase.appSecret,
    instanceId: environmentBase.instanceId
};
