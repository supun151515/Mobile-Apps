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
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';

@Component({
    templateUrl: './signature-modal.component.html'
})
export class SignatureModalComponent implements OnInit {
    @ViewChild('DrawingPad', { static: true }) drawingPad: ElementRef;

    constructor(private _params: ModalDialogParams) { }
    public context: any;
    ngOnInit(): void {
        this.context = this._params.context;
    }

    onCancel(): void {
        this._params.closeCallback();
    }

    onClose(): void {
        const pad = (<any>this.drawingPad).nativeElement;
        const imagePromise = pad && this.context.imageType === 'vector' ? pad.getDrawingSvg() : pad.getDrawing();
        imagePromise.then(image => {
            this._params.closeCallback(image);
        });
    }

    onClear(): void {
        (<any>this.drawingPad).nativeElement.clearDrawing();
    }
}
