// -------------------------------------------------------------------------
// Write your custom logic for CustomersViewComponent here.
// Changes to this file are preserved when the app regenerates.
// Find more information on https://devcenter.kinvey.com/guides/studio-extension-points.
// -------------------------------------------------------------------------
import { Inject, Injector } from '@angular/core';
import { SelectionEvent } from '@progress/kendo-angular-grid';
import { CustomersViewBaseComponent } from '@src/app/modules/main/customers/customers.base.component';

export class CustomersViewComponent extends CustomersViewBaseComponent {
    constructor(@Inject(Injector) injector: Injector) {
        super(injector);
    }

    public onRowSelect(e: SelectionEvent): void {
    }
}
