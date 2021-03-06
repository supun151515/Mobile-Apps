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
import { Injectable, Injector } from '@angular/core';

import { ErrorHandlingService } from '@src/app/core/error-handling.service';
import { DataServiceConfig } from '@src/app/core/data/interfaces/data-service-config.interface';
import { BaseDataService } from '@src/app/core/data/base-data.service';
import { AggregationDataService } from '@src/app/core/data/aggregation-data.service';
import { CollectionDataService } from '@src/app/core/data/collection-data.service';
import { EntityDataService } from '@src/app/core/data/entity-data.service';

export { CollectionDataService, EntityDataService, AggregationDataService, DataServiceConfig };

export interface DataServiceFactoryOptions {
    config: DataServiceConfig;
    customErrorHandling?: boolean;
}

@Injectable()
export class DataServiceFactory {
    constructor(protected injector: Injector, protected errorHandlingService: ErrorHandlingService) { }

    public collection<T>(config: DataServiceConfig): CollectionDataService<T> {
        const service = new CollectionDataService<T>(this.injector, config);
        this.initService(service);
        return service;
    }

    public entity<T>(config: DataServiceConfig): EntityDataService<T> {
        const service = new EntityDataService<T>(this.injector, config);
        this.initService(service);
        return service;
    }

    public aggregation(config: DataServiceConfig): AggregationDataService {
        const service = new AggregationDataService(this.injector, config);
        this.initService(service);
        return service;
    }

    protected initService(service: BaseDataService<any, DataServiceConfig, any>) {
        this.errorHandlingService.subscribe(service.errors);
    }
}
