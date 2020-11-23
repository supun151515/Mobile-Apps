// -------------------------------------------------------------------------
// Write your custom logic for MiddleSectionComponent here.
// Changes to this file are preserved when the app regenerates.
// Find more information on https://devcenter.kinvey.com/guides/studio-extension-points.
// -------------------------------------------------------------------------
import { Component, Optional } from '@angular/core';
import { RegisterViewComponent } from '@src/app/modules/system/register/register.component';

@Component({
    selector: 'ks-middle-section',
    templateUrl: './middle-section.component.html',
})
export class MiddleSectionComponent {
    constructor(@Optional() public parent: RegisterViewComponent) {
    }
}
