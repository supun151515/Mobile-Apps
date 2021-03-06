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
import { merge, of, Observable } from 'rxjs';
import { map, scan } from 'rxjs/operators';

import { BaseDataService } from '@src/app/core/data/base-data.service';
import { DataState } from '@src/app/core/data/data-state.service';

export interface InitDataServiceOptions<TState extends DataState> {
    instance: BaseDataService<any, any, any>;
    initialState?: TState;
    onChanges?: Array<Observable<any>>;
}

export interface InitDataOptions {
    dataServices: { [key: string]: InitDataServiceOptions<DataState> };
    observables: { [key: string]: Observable<any> };
}

export function combineObservables(observablesMap: { [key: string]: Observable<any> }): Observable<{}> {
    const keys = Object.keys(observablesMap);

    if (keys.length === 0) {
        return of({});
    }

    const observables = keys.map(key => observablesMap[key].pipe(map(value => ({ [key]: value }))));

    return merge(of({}), ...observables).pipe(
        scan((oldData, newData) => ({ ...oldData, ...newData }))
    );
}

export function getDataObservable({ dataServices, observables }: InitDataOptions): Observable<any> {
    const allDataChanges = {};

    Object.keys(dataServices).forEach(key => {
        const ds = dataServices[key];

        if (ds.initialState) {
            ds.instance.dataState.update(() => ds.initialState);
        }

        (ds.onChanges || []).forEach(item => {
            ds.instance.dataState.onChanges(item);
        });

        allDataChanges[key] = ds.instance.dataChanges;
    });

    return combineObservables({ ...allDataChanges, ...observables });
}
