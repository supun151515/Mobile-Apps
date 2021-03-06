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
import { Component, Input, Injector } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ReplaySubject } from 'rxjs';
import { ExtendedNavigationExtras } from 'nativescript-angular/router/router-extensions';
import { MapboxViewApi } from 'nativescript-mapbox';

import { NavigationService } from '@src/app/core/services/navigation.service';
import { StringUtilsService } from '@src/app/core/services/string-utils.service';

@Component({
    selector: 'ks-mapbox',
    templateUrl: './mapbox.component.html'
})
export class KSMapboxComponent {
    public mapView: MapboxViewApi;

    @Input() public config: {
        marker: {
            title: string;
            subtitle: string;
            navigateTo?: {
                allowBackNavigation: boolean;
                module?: string;
                view?: string;
            }
        }
    };

    @Input() public set data(value) {
        if (!value) {
            return;
        }

        if (Array.isArray(value)) {
            this.markers.next(value);
        } else if (Array.isArray(value.data)) {
            this.markers.next(value.data);
        }
    }

    @Input() public queryIdParamName: string;

    protected markers = new ReplaySubject<Array<any>>(1);

    private activatedRoute: ActivatedRoute;
    private navigationService: NavigationService;
    private stringUtilsService: StringUtilsService;

    constructor(public injector: Injector) {
        this.activatedRoute = injector.get(ActivatedRoute);
        this.navigationService = injector.get(NavigationService);
        this.stringUtilsService = injector.get(StringUtilsService);
    }

    public onMapReady(args, latitude, longitude, showUserLocation) {
        this.mapView = args.map;

        if ((!latitude || !longitude) && showUserLocation) {
            this.mapView.getUserLocation().then(({ location }) => this.mapView.setCenter(location));
        }

        this.markers.subscribe(markersData => this.mapView.addMarkers(markersData.map(item => this.createMarker(item))));
    }

    private createMarker(item: any) {
        const title = this.stringUtilsService.interpolate(this.config.marker.title, { item });
        const subtitle = this.stringUtilsService.interpolate(this.config.marker.subtitle, { item });
        const navigateTo = this.config.marker.navigateTo;
        const [lng, lat] = item._geoloc;

        return {
            id: item._id,
            lng: lng,
            lat: lat,
            title,
            subtitle,
            onCalloutTap: () => {
                if (!navigateTo || !navigateTo.module || !navigateTo.view) {
                    return;
                }

                const command = [navigateTo.module, navigateTo.view];
                const extras: ExtendedNavigationExtras = {
                    relativeTo: this.activatedRoute,
                    queryParams: {
                        [this.queryIdParamName]: item._id
                    },
                    clearHistory: !navigateTo.allowBackNavigation
                };
                const preserveQueryParams = true;

                return this.navigationService.navigate(command, extras, preserveQueryParams);
            }
        };
    }
}
