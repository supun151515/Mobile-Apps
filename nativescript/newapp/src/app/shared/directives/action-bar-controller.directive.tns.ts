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
import { Directive, OnInit, ElementRef } from '@angular/core';
import { ActionBar, NavigationButton } from 'tns-core-modules/ui/action-bar/action-bar';
import { isAndroid } from 'tns-core-modules/platform';
import { Page } from 'tns-core-modules/ui/page';

@Directive({
    // tslint:disable-next-line
    selector: 'ActionBar'
})
export class ActionBarControllerDirective implements OnInit {
    constructor(
        private page: Page
    ) {}

    ngOnInit(): void {
        this.page.actionBarHidden = false;

        if (isAndroid) {
            this.page.actionBar.once('loaded', ({ object: actionBar }) =>
              (<ActionBar>actionBar).nativeViewProtected.setContentInsetsAbsolute(0, 0));

            return;
        }

        this.page.actionBar.navigationButton = new NavigationButton();
        this.page.actionBar.navigationButton.visibility = 'collapsed';
    }
}
