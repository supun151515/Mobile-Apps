// -------------------------------------------------------------------------
// <Auto-generated file - do not modify!>
//
// This code was generated automatically by Kinvey Studio.
//
// Changes to this file may cause undesired behavior and will be lost
// the next time the code regenerates.
//
// Find more information on https://devcenter.kinvey.com/guides/studio-extension-points.
// -------------------------------------------------------------------------
import { DataStoreType } from '@src/app/core/libs/kinvey-sdk';
import { DataServiceConfig } from '@src/app/core/data/interfaces/data-service-config.interface';

export class Mysql {
    public _id = '';
}

export function getMysqlConfig(): DataServiceConfig {
    return {
        dataProviderName: 'DefaultDataProvider',
        modelTypeName: 'Mysql',
        serverOperations: true,
        createModel: () => new Mysql(),
        collection: 'mysql',
        dataStoreType: DataStoreType.Network,
        requestOptions: {
            kinveyFileTLS: true
        }
    };
}
