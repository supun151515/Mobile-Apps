// -------------------------------------------------------------------------
// Write your custom logic for AppLayoutViewComponent here.
// Changes to this file are preserved when the app regenerates.
// Find more information on https://devcenter.kinvey.com/guides/studio-extension-points.
// -------------------------------------------------------------------------
import { Inject, Injector } from '@angular/core';
import { AppLayoutViewBaseComponent } from '@src/app/modules/system/app-layout/app-layout.base.component';

export class AppLayoutViewComponent extends AppLayoutViewBaseComponent {
    constructor(@Inject(Injector) injector: Injector) {
        super(injector);
    }

}
