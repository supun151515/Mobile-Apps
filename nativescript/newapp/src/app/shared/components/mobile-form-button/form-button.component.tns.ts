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
import { Component, Input, Optional, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { KsFormComponent } from '@src/app/shared/components/form/form.component';

@Component({
    selector: 'ks-form-button',
    templateUrl: './form-button.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => KsFormButtonComponent),
            multi: true
        }
    ]
})
export class KsFormButtonComponent implements ControlValueAccessor {
    @Input() buttonType: string;
    @Input() value: any;

    classList = '';

    private onChange = (_: any) => { };

    constructor(@Optional() protected parentForm: KsFormComponent) { }

    onTap() {
        this.onChange(this.value);

        if (this.parentForm) {
            this.parentForm.submit();
        }
    }

    writeValue(value: any): void {
        this.classList = this.value === value ? '-selected' : '';
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(): void { }
}
