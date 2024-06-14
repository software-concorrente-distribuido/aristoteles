/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, Input, HostBinding, forwardRef, Output, EventEmitter, ChangeDetectionStrategy, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { convertToBoolProperty } from '../helpers';
import * as i0 from "@angular/core";
import * as i1 from "../../services/status.service";
import * as i2 from "@angular/common";
import * as i3 from "../icon/icon.component";
/**
 * Styled checkbox component
 *
 * @stacked-example(Showcase, checkbox/checkbox-showcase.component)
 *
 * ### Installation
 *
 * Import `NbCheckboxComponent` to your feature module.
 * ```ts
 * @NgModule({
 *   imports: [
 *     // ...
 *     NbCheckboxModule,
 *   ],
 * })
 * export class PageModule { }
 * ```
 * ### Usage
 *
 * Checkbox is available in multiple colors using `status` property:
 * @stacked-example(Colored Checkboxes, checkbox/checkbox-status.component)
 *
 * Indeterminate state is also supported:
 * @stacked-example(Indeterminate Checkbox, checkbox/checkbox-indeterminate.component)
 *
 * Checkbox can be disabled via `disabled` attribute.
 * @stacked-example(Disabled Checkbox, checkbox/checkbox-disabled.component)
 *
 * @styles
 *
 * checkbox-height:
 * checkbox-width:
 * checkbox-border-style:
 * checkbox-border-width:
 * checkbox-border-radius:
 * checkbox-outline-width:
 * checkbox-outline-color:
 * checkbox-text-font-family:
 * checkbox-text-font-size:
 * checkbox-text-font-weight:
 * checkbox-text-line-height:
 * checkbox-text-space:
 * checkbox-padding:
 * checkbox-focus-inset-shadow-length:
 * checkbox-basic-text-color:
 * checkbox-basic-background-color:
 * checkbox-basic-border-color:
 * checkbox-basic-checked-background-color:
 * checkbox-basic-checked-border-color:
 * checkbox-basic-checked-checkmark-color:
 * checkbox-basic-indeterminate-background-color:
 * checkbox-basic-indeterminate-border-color:
 * checkbox-basic-indeterminate-checkmark-color:
 * checkbox-basic-focus-background-color:
 * checkbox-basic-focus-border-color:
 * checkbox-basic-focus-checked-background-color:
 * checkbox-basic-focus-checked-border-color:
 * checkbox-basic-hover-background-color:
 * checkbox-basic-hover-border-color:
 * checkbox-basic-hover-checked-background-color:
 * checkbox-basic-hover-checked-border-color:
 * checkbox-basic-active-background-color:
 * checkbox-basic-active-border-color:
 * checkbox-basic-active-checked-background-color:
 * checkbox-basic-active-checked-border-color:
 * checkbox-basic-disabled-background-color:
 * checkbox-basic-disabled-border-color:
 * checkbox-basic-disabled-checkmark-color:
 * checkbox-basic-disabled-text-color:
 * checkbox-basic-disabled-checked-background-color:
 * checkbox-primary-text-color:
 * checkbox-primary-background-color:
 * checkbox-primary-border-color:
 * checkbox-primary-checked-background-color:
 * checkbox-primary-checked-border-color:
 * checkbox-primary-checked-checkmark-color:
 * checkbox-primary-indeterminate-background-color:
 * checkbox-primary-indeterminate-border-color:
 * checkbox-primary-indeterminate-checkmark-color:
 * checkbox-primary-focus-background-color:
 * checkbox-primary-focus-border-color:
 * checkbox-primary-focus-checked-background-color:
 * checkbox-primary-focus-checked-border-color:
 * checkbox-primary-hover-background-color:
 * checkbox-primary-hover-border-color:
 * checkbox-primary-hover-checked-background-color:
 * checkbox-primary-hover-checked-border-color:
 * checkbox-primary-active-background-color:
 * checkbox-primary-active-border-color:
 * checkbox-primary-active-checked-background-color:
 * checkbox-primary-active-checked-border-color:
 * checkbox-primary-disabled-background-color:
 * checkbox-primary-disabled-border-color:
 * checkbox-primary-disabled-checkmark-color:
 * checkbox-primary-disabled-text-color:
 * checkbox-primary-disabled-checked-background-color:
 * checkbox-success-text-color:
 * checkbox-success-background-color:
 * checkbox-success-border-color:
 * checkbox-success-checked-background-color:
 * checkbox-success-checked-border-color:
 * checkbox-success-checked-checkmark-color:
 * checkbox-success-indeterminate-background-color:
 * checkbox-success-indeterminate-border-color:
 * checkbox-success-indeterminate-checkmark-color:
 * checkbox-success-focus-background-color:
 * checkbox-success-focus-border-color:
 * checkbox-success-focus-checked-background-color:
 * checkbox-success-focus-checked-border-color:
 * checkbox-success-hover-background-color:
 * checkbox-success-hover-border-color:
 * checkbox-success-hover-checked-background-color:
 * checkbox-success-hover-checked-border-color:
 * checkbox-success-active-background-color:
 * checkbox-success-active-border-color:
 * checkbox-success-active-checked-background-color:
 * checkbox-success-active-checked-border-color:
 * checkbox-success-disabled-background-color:
 * checkbox-success-disabled-border-color:
 * checkbox-success-disabled-checkmark-color:
 * checkbox-success-disabled-text-color:
 * checkbox-success-disabled-checked-background-color:
 * checkbox-info-text-color:
 * checkbox-info-background-color:
 * checkbox-info-border-color:
 * checkbox-info-checked-background-color:
 * checkbox-info-checked-border-color:
 * checkbox-info-checked-checkmark-color:
 * checkbox-info-indeterminate-background-color:
 * checkbox-info-indeterminate-border-color:
 * checkbox-info-indeterminate-checkmark-color:
 * checkbox-info-focus-background-color:
 * checkbox-info-focus-border-color:
 * checkbox-info-focus-checked-background-color:
 * checkbox-info-focus-checked-border-color:
 * checkbox-info-hover-background-color:
 * checkbox-info-hover-border-color:
 * checkbox-info-hover-checked-background-color:
 * checkbox-info-hover-checked-border-color:
 * checkbox-info-active-background-color:
 * checkbox-info-active-border-color:
 * checkbox-info-active-checked-background-color:
 * checkbox-info-active-checked-border-color:
 * checkbox-info-disabled-background-color:
 * checkbox-info-disabled-border-color:
 * checkbox-info-disabled-checkmark-color:
 * checkbox-info-disabled-text-color:
 * checkbox-info-disabled-checked-background-color:
 * checkbox-warning-text-color:
 * checkbox-warning-background-color:
 * checkbox-warning-border-color:
 * checkbox-warning-checked-background-color:
 * checkbox-warning-checked-border-color:
 * checkbox-warning-checked-checkmark-color:
 * checkbox-warning-indeterminate-background-color:
 * checkbox-warning-indeterminate-border-color:
 * checkbox-warning-indeterminate-checkmark-color:
 * checkbox-warning-focus-background-color:
 * checkbox-warning-focus-border-color:
 * checkbox-warning-focus-checked-background-color:
 * checkbox-warning-focus-checked-border-color:
 * checkbox-warning-hover-background-color:
 * checkbox-warning-hover-border-color:
 * checkbox-warning-hover-checked-background-color:
 * checkbox-warning-hover-checked-border-color:
 * checkbox-warning-active-background-color:
 * checkbox-warning-active-border-color:
 * checkbox-warning-active-checked-background-color:
 * checkbox-warning-active-checked-border-color:
 * checkbox-warning-disabled-background-color:
 * checkbox-warning-disabled-border-color:
 * checkbox-warning-disabled-checkmark-color:
 * checkbox-warning-disabled-text-color:
 * checkbox-warning-disabled-checked-background-color:
 * checkbox-danger-text-color:
 * checkbox-danger-background-color:
 * checkbox-danger-border-color:
 * checkbox-danger-checked-background-color:
 * checkbox-danger-checked-border-color:
 * checkbox-danger-checked-checkmark-color:
 * checkbox-danger-indeterminate-background-color:
 * checkbox-danger-indeterminate-border-color:
 * checkbox-danger-indeterminate-checkmark-color:
 * checkbox-danger-focus-background-color:
 * checkbox-danger-focus-border-color:
 * checkbox-danger-focus-checked-background-color:
 * checkbox-danger-focus-checked-border-color:
 * checkbox-danger-hover-background-color:
 * checkbox-danger-hover-border-color:
 * checkbox-danger-hover-checked-background-color:
 * checkbox-danger-hover-checked-border-color:
 * checkbox-danger-active-background-color:
 * checkbox-danger-active-border-color:
 * checkbox-danger-active-checked-background-color:
 * checkbox-danger-active-checked-border-color:
 * checkbox-danger-disabled-background-color:
 * checkbox-danger-disabled-border-color:
 * checkbox-danger-disabled-checkmark-color:
 * checkbox-danger-disabled-text-color:
 * checkbox-danger-disabled-checked-background-color:
 * checkbox-control-text-color:
 * checkbox-control-background-color:
 * checkbox-control-border-color:
 * checkbox-control-checked-background-color:
 * checkbox-control-checked-border-color:
 * checkbox-control-checked-checkmark-color:
 * checkbox-control-indeterminate-background-color:
 * checkbox-control-indeterminate-border-color:
 * checkbox-control-indeterminate-checkmark-color:
 * checkbox-control-focus-background-color:
 * checkbox-control-focus-border-color:
 * checkbox-control-focus-checked-background-color:
 * checkbox-control-focus-checked-border-color:
 * checkbox-control-hover-background-color:
 * checkbox-control-hover-border-color:
 * checkbox-control-hover-checked-background-color:
 * checkbox-control-hover-checked-border-color:
 * checkbox-control-active-background-color:
 * checkbox-control-active-border-color:
 * checkbox-control-active-checked-background-color:
 * checkbox-control-active-checked-border-color:
 * checkbox-control-disabled-background-color:
 * checkbox-control-disabled-border-color:
 * checkbox-control-disabled-checkmark-color:
 * checkbox-control-disabled-text-color:
 * checkbox-control-disabled-checked-background-color:
 */
export class NbCheckboxComponent {
    get checked() {
        return this._checked;
    }
    set checked(value) {
        this._checked = convertToBoolProperty(value);
    }
    /**
     * Controls input disabled state
     */
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = convertToBoolProperty(value);
    }
    /**
     * Controls checkbox indeterminate state
     */
    get indeterminate() {
        return this._indeterminate;
    }
    set indeterminate(value) {
        this._indeterminate = convertToBoolProperty(value);
    }
    get primary() {
        return this.status === 'primary';
    }
    get success() {
        return this.status === 'success';
    }
    get warning() {
        return this.status === 'warning';
    }
    get danger() {
        return this.status === 'danger';
    }
    get info() {
        return this.status === 'info';
    }
    get basic() {
        return this.status === 'basic';
    }
    get control() {
        return this.status === 'control';
    }
    get additionalClasses() {
        if (this.statusService.isCustomStatus(this.status)) {
            return [this.statusService.getStatusClass(this.status)];
        }
        return [];
    }
    constructor(changeDetector, renderer, hostElement, zone, statusService) {
        this.changeDetector = changeDetector;
        this.renderer = renderer;
        this.hostElement = hostElement;
        this.zone = zone;
        this.statusService = statusService;
        this.onChange = () => { };
        this.onTouched = () => { };
        this._checked = false;
        this._disabled = false;
        /**
         * Checkbox status.
         * Possible values are: `basic`, `primary`, `success`, `warning`, `danger`, `info`, `control`.
         */
        this.status = 'basic';
        this._indeterminate = false;
        /**
         * Output when checked state is changed by a user
         * @type EventEmitter<boolean>
         */
        this.checkedChange = new EventEmitter();
    }
    ngAfterViewInit() {
        // TODO: #2254
        this.zone.runOutsideAngular(() => setTimeout(() => {
            this.renderer.addClass(this.hostElement.nativeElement, 'nb-transition');
        }));
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    writeValue(val) {
        this._checked = val;
        this.changeDetector.markForCheck();
    }
    setDisabledState(val) {
        this.disabled = convertToBoolProperty(val);
        this.changeDetector.markForCheck();
    }
    setTouched() {
        this.onTouched();
    }
    updateValueAndIndeterminate(event) {
        const input = event.target;
        this.checked = input.checked;
        this.checkedChange.emit(this.checked);
        this.onChange(this.checked);
        this.indeterminate = input.indeterminate;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbCheckboxComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.Renderer2 }, { token: i0.ElementRef }, { token: i0.NgZone }, { token: i1.NbStatusService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.1.0", type: NbCheckboxComponent, selector: "nb-checkbox", inputs: { checked: "checked", disabled: "disabled", status: "status", indeterminate: "indeterminate" }, outputs: { checkedChange: "checkedChange" }, host: { properties: { "class.status-primary": "this.primary", "class.status-success": "this.success", "class.status-warning": "this.warning", "class.status-danger": "this.danger", "class.status-info": "this.info", "class.status-basic": "this.basic", "class.status-control": "this.control", "class": "this.additionalClasses" } }, providers: [{
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => NbCheckboxComponent),
                multi: true,
            }], ngImport: i0, template: `
    <label class="label">
      <input type="checkbox" class="native-input visually-hidden"
             [disabled]="disabled"
             [checked]="checked"
             (change)="updateValueAndIndeterminate($event)"
             (blur)="setTouched()"
             (click)="$event.stopPropagation()"
             [indeterminate]="indeterminate">
      <span [class.indeterminate]="indeterminate" [class.checked]="checked" class="custom-checkbox">
        <nb-icon *ngIf="indeterminate" icon="minus-bold-outline" pack="nebular-essentials" class="custom-checkbox-icon"></nb-icon>
        <nb-icon *ngIf="checked && !indeterminate" icon="checkmark-bold-outline" pack="nebular-essentials" class="custom-checkbox-icon"></nb-icon>
      </span>
      <span class="text">
        <ng-content></ng-content>
      </span>
    </label>
  `, isInline: true, styles: ["/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */:host .label{position:relative;display:inline-flex;align-items:center;margin:0;min-height:inherit}:host .custom-checkbox{flex-shrink:0}:host(.nb-transition) .custom-checkbox{transition-duration:.15s;transition-property:background-color,border,box-shadow;transition-timing-function:ease-in}:host(.nb-transition) .text{transition-duration:.15s;transition-property:color;transition-timing-function:ease-in}\n"], dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3.NbIconComponent, selector: "nb-icon", inputs: ["icon", "pack", "options", "status", "config"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbCheckboxComponent, decorators: [{
            type: Component,
            args: [{ selector: 'nb-checkbox', template: `
    <label class="label">
      <input type="checkbox" class="native-input visually-hidden"
             [disabled]="disabled"
             [checked]="checked"
             (change)="updateValueAndIndeterminate($event)"
             (blur)="setTouched()"
             (click)="$event.stopPropagation()"
             [indeterminate]="indeterminate">
      <span [class.indeterminate]="indeterminate" [class.checked]="checked" class="custom-checkbox">
        <nb-icon *ngIf="indeterminate" icon="minus-bold-outline" pack="nebular-essentials" class="custom-checkbox-icon"></nb-icon>
        <nb-icon *ngIf="checked && !indeterminate" icon="checkmark-bold-outline" pack="nebular-essentials" class="custom-checkbox-icon"></nb-icon>
      </span>
      <span class="text">
        <ng-content></ng-content>
      </span>
    </label>
  `, providers: [{
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => NbCheckboxComponent),
                            multi: true,
                        }], changeDetection: ChangeDetectionStrategy.OnPush, styles: ["/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */:host .label{position:relative;display:inline-flex;align-items:center;margin:0;min-height:inherit}:host .custom-checkbox{flex-shrink:0}:host(.nb-transition) .custom-checkbox{transition-duration:.15s;transition-property:background-color,border,box-shadow;transition-timing-function:ease-in}:host(.nb-transition) .text{transition-duration:.15s;transition-property:color;transition-timing-function:ease-in}\n"] }]
        }], ctorParameters: () => [{ type: i0.ChangeDetectorRef }, { type: i0.Renderer2 }, { type: i0.ElementRef }, { type: i0.NgZone }, { type: i1.NbStatusService }], propDecorators: { checked: [{
                type: Input
            }], disabled: [{
                type: Input
            }], status: [{
                type: Input
            }], indeterminate: [{
                type: Input
            }], checkedChange: [{
                type: Output
            }], primary: [{
                type: HostBinding,
                args: ['class.status-primary']
            }], success: [{
                type: HostBinding,
                args: ['class.status-success']
            }], warning: [{
                type: HostBinding,
                args: ['class.status-warning']
            }], danger: [{
                type: HostBinding,
                args: ['class.status-danger']
            }], info: [{
                type: HostBinding,
                args: ['class.status-info']
            }], basic: [{
                type: HostBinding,
                args: ['class.status-basic']
            }], control: [{
                type: HostBinding,
                args: ['class.status-control']
            }], additionalClasses: [{
                type: HostBinding,
                args: ['class']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3guY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2ZyYW1ld29yay90aGVtZS9jb21wb25lbnRzL2NoZWNrYm94L2NoZWNrYm94LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsV0FBVyxFQUNYLFVBQVUsRUFFVixNQUFNLEVBQ04sWUFBWSxFQUNaLHVCQUF1QixHQUt4QixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFJekUsT0FBTyxFQUFFLHFCQUFxQixFQUFrQixNQUFNLFlBQVksQ0FBQzs7Ozs7QUFFbkU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrT0c7QUE2QkgsTUFBTSxPQUFPLG1CQUFtQjtJQUs5QixJQUNJLE9BQU87UUFDVCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUNELElBQUksT0FBTyxDQUFDLEtBQWM7UUFDeEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBSUQ7O09BRUc7SUFDSCxJQUNJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDeEIsQ0FBQztJQUNELElBQUksUUFBUSxDQUFDLEtBQWM7UUFDekIsSUFBSSxDQUFDLFNB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c0JBRGhCLEtBQUs7Z0JBY0ksYUFBYTtzQkFBdEIsTUFBTTtnQkFHSCxPQUFPO3NCQURWLFdBQVc7dUJBQUMsc0JBQXNCO2dCQU0vQixPQUFPO3NCQURWLFdBQVc7dUJBQUMsc0JBQXNCO2dCQU0vQixPQUFPO3NCQURWLFdBQVc7dUJBQUMsc0JBQXNCO2dCQU0vQixNQUFNO3NCQURULFdBQVc7dUJBQUMscUJBQXFCO2dCQU05QixJQUFJO3NCQURQLFdBQVc7dUJBQUMsbUJBQW1CO2dCQU01QixLQUFLO3NCQURSLFdBQVc7dUJBQUMsb0JBQW9CO2dCQU03QixPQUFPO3NCQURWLFdBQVc7dUJBQUMsc0JBQXNCO2dCQU0vQixpQkFBaUI7c0JBRHBCLFdBQVc7dUJBQUMsT0FBTyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBBa3Zlby4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi9cblxuaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgSG9zdEJpbmRpbmcsXG4gIGZvcndhcmRSZWYsXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIFJlbmRlcmVyMixcbiAgRWxlbWVudFJlZixcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgTmdab25lLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHsgTmJTdGF0dXNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvc3RhdHVzLnNlcnZpY2UnO1xuaW1wb3J0IHsgTmJDb21wb25lbnRPckN1c3RvbVN0YXR1cyB9IGZyb20gJy4uL2NvbXBvbmVudC1zdGF0dXMnO1xuaW1wb3J0IHsgY29udmVydFRvQm9vbFByb3BlcnR5LCBOYkJvb2xlYW5JbnB1dCB9IGZyb20gJy4uL2hlbHBlcnMnO1xuXG4vKipcbiAqIFN0eWxlZCBjaGVja2JveCBjb21wb25lbnRcbiAqXG4gKiBAc3RhY2tlZC1leGFtcGxlKFNob3djYXNlLCBjaGVja2JveC9jaGVja2JveC1zaG93Y2FzZS5jb21wb25lbnQpXG4gKlxuICogIyMjIEluc3RhbGxhdGlvblxuICpcbiAqIEltcG9ydCBgTmJDaGVja2JveENvbXBvbmVudGAgdG8geW91ciBmZWF0dXJlIG1vZHVsZS5cbiAqIGBgYHRzXG4gKiBATmdNb2R1bGUoe1xuICogICBpbXBvcnRzOiBbXG4gKiAgICAgLy8gLi4uXG4gKiAgICAgTmJDaGVja2JveE1vZHVsZSxcbiAqICAgXSxcbiAqIH0pXG4gKiBleHBvcnQgY2xhc3MgUGFnZU1vZHVsZSB7IH1cbiAqIGBgYFxuICogIyMjIFVzYWdlXG4gKlxuICogQ2hlY2tib3ggaXMgYXZhaWxhYmxlIGluIG11bHRpcGxlIGNvbG9ycyB1c2luZyBgc3RhdHVzYCBwcm9wZXJ0eTpcbiAqIEBzdGFja2VkLWV4YW1wbGUoQ29sb3JlZCBDaGVja2JveGVzLCBjaGVja2JveC9jaGVja2JveC1zdGF0dXMuY29tcG9uZW50KVxuICpcbiAqIEluZGV0ZXJtaW5hdGUgc3RhdGUgaXMgYWxzbyBzdXBwb3J0ZWQ6XG4gKiBAc3RhY2tlZC1leGFtcGxlKEluZGV0ZXJtaW5hdGUgQ2hlY2tib3gsIGNoZWNrYm94L2NoZWNrYm94LWluZGV0ZXJtaW5hdGUuY29tcG9uZW50KVxuICpcbiAqIENoZWNrYm94IGNhbiBiZSBkaXNhYmxlZCB2aWEgYGRpc2FibGVkYCBhdHRyaWJ1dGUuXG4gKiBAc3RhY2tlZC1leGFtcGxlKERpc2FibGVkIENoZWNrYm94LCBjaGVja2JveC9jaGVja2JveC1kaXNhYmxlZC5jb21wb25lbnQpXG4gKlxuICogQHN0eWxlc1xuICpcbiAqIGNoZWNrYm94LWhlaWdodDpcbiAqIGNoZWNrYm94LXdpZHRoOlxuICogY2hlY2tib3gtYm9yZGVyLXN0eWxlOlxuICogY2hlY2tib3gtYm9yZGVyLXdpZHRoOlxuICogY2hlY2tib3gtYm9yZGVyLXJhZGl1czpcbiAqIGNoZWNrYm94LW91dGxpbmUtd2lkdGg6XG4gKiBjaGVja2JveC1vdXRsaW5lLWNvbG9yOlxuICogY2hlY2tib3gtdGV4dC1mb250LWZhbWlseTpcbiAqIGNoZWNrYm94LXRleHQtZm9udC1zaXplOlxuICogY2hlY2tib3gtdGV4dC1mb250LXdlaWdodDpcbiAqIGNoZWNrYm94LXRleHQtbGluZS1oZWlnaHQ6XG4gKiBjaGVja2JveC10ZXh0LXNwYWNlOlxuICogY2hlY2tib3gtcGFkZGluZzpcbiAqIGNoZWNrYm94LWZvY3VzLWluc2V0LXNoYWRvdy1sZW5ndGg6XG4gKiBjaGVja2JveC1iYXNpYy10ZXh0LWNvbG9yOlxuICogY2hlY2tib3gtYmFzaWMtYmFja2dyb3VuZC1jb2xvcjpcbiAqIGNoZWNrYm94LWJhc2ljLWJvcmRlci1jb2xvcjpcbiAqIGNoZWNrYm94LWJhc2ljLWNoZWNrZWQtYmFja2dyb3VuZC1jb2xvcjpcbiAqIGNoZWNrYm94LWJhc2ljLWNoZWNrZWQtYm9yZGVyLWNvbG9yOlxuICogY2hlY2tib3gtYmFzaWMtY2hlY2tlZC1jaGVja21hcmstY29sb3I6XG4gKiBjaGVja2JveC1iYXNpYy1pbmRldGVybWluYXRlLWJhY2tncm91bmQtY29sb3I6XG4gKiBjaGVja2JveC1iYXNpYy1pbmRldGVybWluYXRlLWJvcmRlci1jb2xvcjpcbiAqIGNoZWNrYm94LWJhc2ljLWluZGV0ZXJtaW5hdGUtY2hlY2ttYXJrLWNvbG9yOlxuICogY2hlY2tib3gtYmFzaWMtZm9jdXMtYmFja2dyb3VuZC1jb2xvcjpcbiAqIGNoZWNrYm94LWJhc2ljLWZvY3VzLWJvcmRlci1jb2xvcjpcbiAqIGNoZWNrYm94LWJhc2ljLWZvY3VzLWNoZWNrZWQtYmFja2dyb3VuZC1jb2xvcjpcbiAqIGNoZWNrYm94LWJhc2ljLWZvY3VzLWNoZWNrZWQtYm9yZGVyLWNvbG9yOlxuICogY2hlY2tib3gtYmFzaWMtaG92ZXItYmFja2dyb3VuZC1jb2xvcjpcbiAqIGNoZWNrYm94LWJhc2ljLWhvdmVyLWJvcmRlci1jb2xvcjpcbiAqIGNoZWNrYm94LWJhc2ljLWhvdmVyLWNoZWNrZWQtYmFja2dyb3VuZC1jb2xvcjpcbiAqIGNoZWNrYm94LWJhc2ljLWhvdmVyLWNoZWNrZWQtYm9yZGVyLWNvbG9yOlxuICogY2hlY2tib3gtYmFzaWMtYWN0aXZlLWJhY2tncm91bmQtY29sb3I6XG4gKiBjaGVja2JveC1iYXNpYy1hY3RpdmUtYm9yZGVyLWNvbG9yOlxuICogY2hlY2tib3gtYmFzaWMtYWN0aXZlLWNoZWNrZWQtYmFja2dyb3VuZC1jb2xvcjpcbiAqIGNoZWNrYm94LWJhc2ljLWFjdGl2ZS1jaGVja2VkLWJvcmRlci1jb2xvcjpcbiAqIGNoZWNrYm94LWJhc2ljLWRpc2FibGVkLWJhY2tncm91bmQtY29sb3I6XG4gKiBjaGVja2JveC1iYXNpYy1kaXNhYmxlZC1ib3JkZXItY29sb3I6XG4gKiBjaGVja2JveC1iYXNpYy1kaXNhYmxlZC1jaGVja21hcmstY29sb3I6XG4gKiBjaGVja2JveC1iYXNpYy1kaXNhYmxlZC10ZXh0LWNvbG9yOlxuICogY2hlY2tib3gtYmFzaWMtZGlzYWJsZWQtY2hlY2tlZC1iYWNrZ3JvdW5kLWNvbG9yOlxuICogY2hlY2tib3gtcHJpbWFyeS10ZXh0LWNvbG9yOlxuICogY2hlY2tib3gtcHJpbWFyeS1iYWNrZ3JvdW5kLWNvbG9yOlxuICogY2hlY2tib3gtcHJpbWFyeS1ib3JkZXItY29sb3I6XG4gKiBjaGVja2JveC1wcmltYXJ5LWNoZWNrZWQtYmFja2dyb3VuZC1jb2xvcjpcbiAqIGNoZWNrYm94LXByaW1hcnktY2hlY2tlZC1ib3JkZXItY29sb3I6XG4gKiBjaGVja2JveC1wcmltYXJ5LWNoZWNrZWQtY2hlY2ttYXJrLWNvbG9yOlxuICogY2hlY2tib3gtcHJpbWFyeS1pbmRldGVybWluYXRlLWJhY2tncm91bmQtY29sb3I6XG4gKiBjaGVja2JveC1wcmltYXJ5LWluZGV0ZXJtaW5hdGUtYm9yZGVyLWNvbG9yOlxuICogY2hlY2tib3gtcHJpbWFyeS1pbmRldGVybWluYXRlLWNoZWNrbWFyay1jb2xvcjpcbiAqIGNoZWNrYm94LXByaW1hcnktZm9jdXMtYmFja2dyb3VuZC1jb2xvcjpcbiAqIGNoZWNrYm94LXByaW1hcnktZm9jdXMtYm9yZGVyLWNvbG9yOlxuICogY2hlY2tib3gtcHJpbWFyeS1mb2N1cy1jaGVja2VkLWJhY2tncm91bmQtY29sb3I6XG4gKiBjaGVja2JveC1wcmltYXJ5LWZvY3VzLWNoZWNrZWQtYm9yZGVyLWNvbG9yOlxuICogY2hlY2tib3gtcHJpbWFyeS1ob3Zlci1iYWNrZ3JvdW5kLWNvbG9yOlxuICogY2hlY2tib3gtcHJpbWFyeS1ob3Zlci1ib3JkZXItY29sb3I6XG4gKiBjaGVja2JveC1wcmltYXJ5LWhvdmVyLWNoZWNrZWQtYmFja2dyb3VuZC1jb2xvcjpcbiAqIGNoZWNrYm94LXByaW1hcnktaG92ZXItY2hlY2tlZC1ib3JkZXItY29sb3I6XG4gKiBjaGVja2JveC1wcmltYXJ5LWFjdGl2ZS1iYWNrZ3JvdW5kLWNvbG9yOlxuICogY2hlY2tib3gtcHJpbWFyeS1hY3RpdmUtYm9yZGVyLWNvbG9yOlxuICogY2hlY2tib3gtcHJpbWFyeS1hY3RpdmUtY2hlY2tlZC1iYWNrZ3JvdW5kLWNvbG9yOlxuICogY2hlY2tib3gtcHJpbWFyeS1hY3RpdmUtY2hlY2tlZC1ib3JkZXItY29sb3I6XG4gKiBjaGVja2JveC1wcmltYXJ5LWRpc2FibGVkLWJhY2tncm91bmQtY29sb3I6XG4gKiBjaGVja2JveC1wcmltYXJ5LWRpc2FibGVkLWJvcmRlci1jb2xvcjpcbiAqIGNoZWNrYm94LXByaW1hcnktZGlzYWJsZWQtY2hlY2ttYXJrLWNvbG9yOlxuICogY2hlY2tib3gtcHJpbWFyeS1kaXNhYmxlZC10ZXh0LWNvbG9yOlxuICogY2hlY2tib3gtcHJpbWFyeS1kaXNhYmxlZC1jaGVja2VkLWJhY2tncm91bmQtY29sb3I6XG4gKiBjaGVja2JveC1zdWNjZXNzLXRleHQtY29sb3I6XG4gKiBjaGVja2JveC1zdWNjZXNzLWJhY2tncm91bmQtY29sb3I6XG4gKiBjaGVja2JveC1zdWNjZXNzLWJvcmRlci1jb2xvcjpcbiAqIGNoZWNrYm94LXN1Y2Nlc3MtY2hlY2tlZC1iYWNrZ3JvdW5kLWNvbG9yOlxuICogY2hlY2tib3gtc3VjY2Vzcy1jaGVja2VkLWJvcmRlci1jb2xvcjpcbiAqIGNoZWNrYm94LXN1Y2Nlc3MtY2hlY2tlZC1jaGVja21hcmstY29sb3I6XG4gKiBjaGVja2JveC1zdWNjZXNzLWluZGV0ZXJtaW5hdGUtYmFja2dyb3VuZC1jb2xvcjpcbiAqIGNoZWNrYm94LXN1Y2Nlc3MtaW5kZXRlcm1pbmF0ZS1ib3JkZXItY29sb3I6XG4gKiBjaGVja2JveC1zdWNjZXNzLWluZGV0ZXJtaW5hdGUtY2hlY2ttYXJrLWNvbG9yOlxuICogY2hlY2tib3gtc3VjY2Vzcy1mb2N1cy1iYWNrZ3JvdW5kLWNvbG9yOlxuICogY2hlY2tib3gtc3VjY2Vzcy1mb2N1cy1ib3JkZXItY29sb3I6XG4gKiBjaGVja2JveC1zdWNjZXNzLWZvY3VzLWNoZWNrZWQtYmFja2dyb3VuZC1jb2xvcjpcbiAqIGNoZWNrYm94LXN1Y2Nlc3MtZm9jdXMtY2hlY2tlZC1ib3JkZXItY29sb3I6XG4gKiBjaGVja2JveC1zdWNjZXNzLWhvdmVyLWJhY2tncm91bmQtY29sb3I6XG4gKiBjaGVja2JveC1zdWNjZXNzLWhvdmVyLWJvcmRlci1jb2xvcjpcbiAqIGNoZWNrYm94LXN1Y2Nlc3MtaG92ZXItY2hlY2tlZC1iYWNrZ3JvdW5kLWNvbG9yOlxuICogY2hlY2tib3gtc3VjY2Vzcy1ob3Zlci1jaGVja2VkLWJvcmRlci1jb2xvcjpcbiAqIGNoZWNrYm94LXN1Y2Nlc3MtYWN0aXZlLWJhY2tncm91bmQtY29sb3I6XG4gKiBjaGVja2JveC1zdWNjZXNzLWFjdGl2ZS1ib3JkZXItY29sb3I6XG4gKiBjaGVja2JveC1zdWNjZXNzLWFjdGl2ZS1jaGVja2VkLWJhY2tncm91bmQtY29sb3I6XG4gKiBjaGVja2JveC1zdWNjZXNzLWFjdGl2ZS1jaGVja2VkLWJvcmRlci1jb2xvcjpcbiAqIGNoZWNrYm94LXN1Y2Nlc3MtZGlzYWJsZWQtYmFja2dyb3VuZC1jb2xvcjpcbiAqIGNoZWNrYm94LXN1Y2Nlc3MtZGlzYWJsZWQtYm9yZGVyLWNvbG9yOlxuICogY2hlY2tib3gtc3VjY2Vzcy1kaXNhYmxlZC1jaGVja21hcmstY29sb3I6XG4gKiBjaGVja2JveC1zdWNjZXNzLWRpc2FibGVkLXRleHQtY29sb3I6XG4gKiBjaGVja2JveC1zdWNjZXNzLWRpc2FibGVkLWNoZWNrZWQtYmFja2dyb3VuZC1jb2xvcjpcbiAqIGNoZWNrYm94LWluZm8tdGV4dC1jb2xvcjpcbiAqIGNoZWNrYm94LWluZm8tYmFja2dyb3VuZC1jb2xvcjpcbiAqIGNoZWNrYm94LWluZm8tYm9yZGVyLWNvbG9yOlxuICogY2hlY2tib3gtaW5mby1jaGVja2VkLWJhY2tncm91bmQtY29sb3I6XG4gKiBjaGVja2JveC1pbmZvLWNoZWNrZWQtYm9yZGVyLWNvbG9yOlxuICogY2hlY2tib3gtaW5mby1jaGVja2VkLWNoZWNrbWFyay1jb2xvcjpcbiAqIGNoZWNrYm94LWluZm8taW5kZXRlcm1pbmF0ZS1iYWNrZ3JvdW5kLWNvbG9yOlxuICogY2hlY2tib3gtaW5mby1pbmRldGVybWluYXRlLWJvcmRlci1jb2xvcjpcbiAqIGNoZWNrYm94LWluZm8taW5kZXRlcm1pbmF0ZS1jaGVja21hcmstY29sb3I6XG4gKiBjaGVja2JveC1pbmZvLWZvY3VzLWJhY2tncm91bmQtY29sb3I6XG4gKiBjaGVja2JveC1pbmZvLWZvY3VzLWJvcmRlci1jb2xvcjpcbiAqIGNoZWNrYm94LWluZm8tZm9jdXMtY2hlY2tlZC1iYWNrZ3JvdW5kLWNvbG9yOlxuICogY2hlY2tib3gtaW5mby1mb2N1cy1jaGVja2VkLWJvcmRlci1jb2xvcjpcbiAqIGNoZWNrYm94LWluZm8taG92ZXItYmFja2dyb3VuZC1jb2xvcjpcbiAqIGNoZWNrYm94LWluZm8taG92ZXItYm9yZGVyLWNvbG9yOlxuICogY2hlY2tib3gtaW5mby1ob3Zlci1jaGVja2VkLWJhY2tncm91bmQtY29sb3I6XG4gKiBjaGVja2JveC1pbmZvLWhvdmVyLWNoZWNrZWQtYm9yZGVyLWNvbG9yOlxuICogY2hlY2tib3gtaW5mby1hY3RpdmUtYmFja2dyb3VuZC1jb2xvcjpcbiAqIGNoZWNrYm94LWluZm8tYWN0aXZlLWJvcmRlci1jb2xvcjpcbiAqIGNoZWNrYm94LWluZm8tYWN0aXZlLWNoZWNrZWQtYmFja2dyb3VuZC1jb2xvcjpcbiAqIGNoZWNrYm94LWluZm8tYWN0aXZlLWNoZWNrZWQtYm9yZGVyLWNvbG9yOlxuICogY2hlY2tib3gtaW5mby1kaXNhYmxlZC1iYWNrZ3JvdW5kLWNvbG9yOlxuICogY2hlY2tib3gtaW5mby1kaXNhYmxlZC1ib3JkZXItY29sb3I6XG4gKiBjaGVja2JveC1pbmZvLWRpc2FibGVkLWNoZWNrbWFyay1jb2xvcjpcbiAqIGNoZWNrYm94LWluZm8tZGlzYWJsZWQtdGV4dC1jb2xvcjpcbiAqIGNoZWNrYm94LWluZm8tZGlzYWJsZWQtY2hlY2tlZC1iYWNrZ3JvdW5kLWNvbG9yOlxuICogY2hlY2tib3gtd2FybmluZy10ZXh0LWNvbG9yOlxuICogY2hlY2tib3gtd2FybmluZy1iYWNrZ3JvdW5kLWNvbG9yOlxuICogY2hlY2tib3gtd2FybmluZy1ib3JkZXItY29sb3I6XG4gKiBjaGVja2JveC13YXJuaW5nLWNoZWNrZWQtYmFja2dyb3VuZC1jb2xvcjpcbiAqIGNoZWNrYm94LXdhcm5pbmctY2hlY2tlZC1ib3JkZXItY29sb3I6XG4gKiBjaGVja2JveC13YXJuaW5nLWNoZWNrZWQtY2hlY2ttYXJrLWNvbG9yOlxuICogY2hlY2tib3gtd2FybmluZy1pbmRldGVybWluYXRlLWJhY2tncm91bmQtY29sb3I6XG4gKiBjaGVja2JveC13YXJuaW5nLWluZGV0ZXJtaW5hdGUtYm9yZGVyLWNvbG9yOlxuICogY2hlY2tib3gtd2FybmluZy1pbmRldGVybWluYXRlLWNoZWNrbWFyay1jb2xvcjpcbiAqIGNoZWNrYm94LXdhcm5pbmctZm9jdXMtYmFja2dyb3VuZC1jb2xvcjpcbiAqIGNoZWNrYm94LXdhcm5pbmctZm9jdXMtYm9yZGVyLWNvbG9yOlxuICogY2hlY2tib3gtd2FybmluZy1mb2N1cy1jaGVja2VkLWJhY2tncm91bmQtY29sb3I6XG4gKiBjaGVja2JveC13YXJuaW5nLWZvY3VzLWNoZWNrZWQtYm9yZGVyLWNvbG9yOlxuICogY2hlY2tib3gtd2FybmluZy1ob3Zlci1iYWNrZ3JvdW5kLWNvbG9yOlxuICogY2hlY2tib3gtd2FybmluZy1ob3Zlci1ib3JkZXItY29sb3I6XG4gKiBjaGVja2JveC13YXJuaW5nLWhvdmVyLWNoZWNrZWQtYmFja2dyb3VuZC1jb2xvcjpcbiAqIGNoZWNrYm94LXdhcm5pbmctaG92ZXItY2hlY2tlZC1ib3JkZXItY29sb3I6XG4gKiBjaGVja2JveC13YXJuaW5nLWFjdGl2ZS1iYWNrZ3JvdW5kLWNvbG9yOlxuICogY2hlY2tib3gtd2FybmluZy1hY3RpdmUtYm9yZGVyLWNvbG9yOlxuICogY2hlY2tib3gtd2FybmluZy1hY3RpdmUtY2hlY2tlZC1iYWNrZ3JvdW5kLWNvbG9yOlxuICogY2hlY2tib3gtd2FybmluZy1hY3RpdmUtY2hlY2tlZC1ib3JkZXItY29sb3I6XG4gKiBjaGVja2JveC13YXJuaW5nLWRpc2FibGVkLWJhY2tncm91bmQtY29sb3I6XG4gKiBjaGVja2JveC13YXJuaW5nLWRpc2FibGVkLWJvcmRlci1jb2xvcjpcbiAqIGNoZWNrYm94LXdhcm5pbmctZGlzYWJsZWQtY2hlY2ttYXJrLWNvbG9yOlxuICogY2hlY2tib3gtd2FybmluZy1kaXNhYmxlZC10ZXh0LWNvbG9yOlxuICogY2hlY2tib3gtd2FybmluZy1kaXNhYmxlZC1jaGVja2VkLWJhY2tncm91bmQtY29sb3I6XG4gKiBjaGVja2JveC1kYW5nZXItdGV4dC1jb2xvcjpcbiAqIGNoZWNrYm94LWRhbmdlci1iYWNrZ3JvdW5kLWNvbG9yOlxuICogY2hlY2tib3gtZGFuZ2VyLWJvcmRlci1jb2xvcjpcbiAqIGNoZWNrYm94LWRhbmdlci1jaGVja2VkLWJhY2tncm91bmQtY29sb3I6XG4gKiBjaGVja2JveC1kYW5nZXItY2hlY2tlZC1ib3JkZXItY29sb3I6XG4gKiBjaGVja2JveC1kYW5nZXItY2hlY2tlZC1jaGVja21hcmstY29sb3I6XG4gKiBjaGVja2JveC1kYW5nZXItaW5kZXRlcm1pbmF0ZS1iYWNrZ3JvdW5kLWNvbG9yOlxuICogY2hlY2tib3gtZGFuZ2VyLWluZGV0ZXJtaW5hdGUtYm9yZGVyLWNvbG9yOlxuICogY2hlY2tib3gtZGFuZ2VyLWluZGV0ZXJtaW5hdGUtY2hlY2ttYXJrLWNvbG9yOlxuICogY2hlY2tib3gtZGFuZ2VyLWZvY3VzLWJhY2tncm91bmQtY29sb3I6XG4gKiBjaGVja2JveC1kYW5nZXItZm9jdXMtYm9yZGVyLWNvbG9yOlxuICogY2hlY2tib3gtZGFuZ2VyLWZvY3VzLWNoZWNrZWQtYmFja2dyb3VuZC1jb2xvcjpcbiAqIGNoZWNrYm94LWRhbmdlci1mb2N1cy1jaGVja2VkLWJvcmRlci1jb2xvcjpcbiAqIGNoZWNrYm94LWRhbmdlci1ob3Zlci1iYWNrZ3JvdW5kLWNvbG9yOlxuICogY2hlY2tib3gtZGFuZ2VyLWhvdmVyLWJvcmRlci1jb2xvcjpcbiAqIGNoZWNrYm94LWRhbmdlci1ob3Zlci1jaGVja2VkLWJhY2tncm91bmQtY29sb3I6XG4gKiBjaGVja2JveC1kYW5nZXItaG92ZXItY2hlY2tlZC1ib3JkZXItY29sb3I6XG4gKiBjaGVja2JveC1kYW5nZXItYWN0aXZlLWJhY2tncm91bmQtY29sb3I6XG4gKiBjaGVja2JveC1kYW5nZXItYWN0aXZlLWJvcmRlci1jb2xvcjpcbiAqIGNoZWNrYm94LWRhbmdlci1hY3RpdmUtY2hlY2tlZC1iYWNrZ3JvdW5kLWNvbG9yOlxuICogY2hlY2tib3gtZGFuZ2VyLWFjdGl2ZS1jaGVja2VkLWJvcmRlci1jb2xvcjpcbiAqIGNoZWNrYm94LWRhbmdlci1kaXNhYmxlZC1iYWNrZ3JvdW5kLWNvbG9yOlxuICogY2hlY2tib3gtZGFuZ2VyLWRpc2FibGVkLWJvcmRlci1jb2xvcjpcbiAqIGNoZWNrYm94LWRhbmdlci1kaXNhYmxlZC1jaGVja21hcmstY29sb3I6XG4gKiBjaGVja2JveC1kYW5nZXItZGlzYWJsZWQtdGV4dC1jb2xvcjpcbiAqIGNoZWNrYm94LWRhbmdlci1kaXNhYmxlZC1jaGVja2VkLWJhY2tncm91bmQtY29sb3I6XG4gKiBjaGVja2JveC1jb250cm9sLXRleHQtY29sb3I6XG4gKiBjaGVja2JveC1jb250cm9sLWJhY2tncm91bmQtY29sb3I6XG4gKiBjaGVja2JveC1jb250cm9sLWJvcmRlci1jb2xvcjpcbiAqIGNoZWNrYm94LWNvbnRyb2wtY2hlY2tlZC1iYWNrZ3JvdW5kLWNvbG9yOlxuICogY2hlY2tib3gtY29udHJvbC1jaGVja2VkLWJvcmRlci1jb2xvcjpcbiAqIGNoZWNrYm94LWNvbnRyb2wtY2hlY2tlZC1jaGVja21hcmstY29sb3I6XG4gKiBjaGVja2JveC1jb250cm9sLWluZGV0ZXJtaW5hdGUtYmFja2dyb3VuZC1jb2xvcjpcbiAqIGNoZWNrYm94LWNvbnRyb2wtaW5kZXRlcm1pbmF0ZS1ib3JkZXItY29sb3I6XG4gKiBjaGVja2JveC1jb250cm9sLWluZGV0ZXJtaW5hdGUtY2hlY2ttYXJrLWNvbG9yOlxuICogY2hlY2tib3gtY29udHJvbC1mb2N1cy1iYWNrZ3JvdW5kLWNvbG9yOlxuICogY2hlY2tib3gtY29udHJvbC1mb2N1cy1ib3JkZXItY29sb3I6XG4gKiBjaGVja2JveC1jb250cm9sLWZvY3VzLWNoZWNrZWQtYmFja2dyb3VuZC1jb2xvcjpcbiAqIGNoZWNrYm94LWNvbnRyb2wtZm9jdXMtY2hlY2tlZC1ib3JkZXItY29sb3I6XG4gKiBjaGVja2JveC1jb250cm9sLWhvdmVyLWJhY2tncm91bmQtY29sb3I6XG4gKiBjaGVja2JveC1jb250cm9sLWhvdmVyLWJvcmRlci1jb2xvcjpcbiAqIGNoZWNrYm94LWNvbnRyb2wtaG92ZXItY2hlY2tlZC1iYWNrZ3JvdW5kLWNvbG9yOlxuICogY2hlY2tib3gtY29udHJvbC1ob3Zlci1jaGVja2VkLWJvcmRlci1jb2xvcjpcbiAqIGNoZWNrYm94LWNvbnRyb2wtYWN0aXZlLWJhY2tncm91bmQtY29sb3I6XG4gKiBjaGVja2JveC1jb250cm9sLWFjdGl2ZS1ib3JkZXItY29sb3I6XG4gKiBjaGVja2JveC1jb250cm9sLWFjdGl2ZS1jaGVja2VkLWJhY2tncm91bmQtY29sb3I6XG4gKiBjaGVja2JveC1jb250cm9sLWFjdGl2ZS1jaGVja2VkLWJvcmRlci1jb2xvcjpcbiAqIGNoZWNrYm94LWNvbnRyb2wtZGlzYWJsZWQtYmFja2dyb3VuZC1jb2xvcjpcbiAqIGNoZWNrYm94LWNvbnRyb2wtZGlzYWJsZWQtYm9yZGVyLWNvbG9yOlxuICogY2hlY2tib3gtY29udHJvbC1kaXNhYmxlZC1jaGVja21hcmstY29sb3I6XG4gKiBjaGVja2JveC1jb250cm9sLWRpc2FibGVkLXRleHQtY29sb3I6XG4gKiBjaGVja2JveC1jb250cm9sLWRpc2FibGVkLWNoZWNrZWQtYmFja2dyb3VuZC1jb2xvcjpcbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmItY2hlY2tib3gnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxsYWJlbCBjbGFzcz1cImxhYmVsXCI+XG4gICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgY2xhc3M9XCJuYXRpdmUtaW5wdXQgdmlzdWFsbHktaGlkZGVuXCJcbiAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAgICAgICAgICAgIFtjaGVja2VkXT1cImNoZWNrZWRcIlxuICAgICAgICAgICAgIChjaGFuZ2UpPVwidXBkYXRlVmFsdWVBbmRJbmRldGVybWluYXRlKCRldmVudClcIlxuICAgICAgICAgICAgIChibHVyKT1cInNldFRvdWNoZWQoKVwiXG4gICAgICAgICAgICAgKGNsaWNrKT1cIiRldmVudC5zdG9wUHJvcGFnYXRpb24oKVwiXG4gICAgICAgICAgICAgW2luZGV0ZXJtaW5hdGVdPVwiaW5kZXRlcm1pbmF0ZVwiPlxuICAgICAgPHNwYW4gW2NsYXNzLmluZGV0ZXJtaW5hdGVdPVwiaW5kZXRlcm1pbmF0ZVwiIFtjbGFzcy5jaGVja2VkXT1cImNoZWNrZWRcIiBjbGFzcz1cImN1c3RvbS1jaGVja2JveFwiPlxuICAgICAgICA8bmItaWNvbiAqbmdJZj1cImluZGV0ZXJtaW5hdGVcIiBpY29uPVwibWludXMtYm9sZC1vdXRsaW5lXCIgcGFjaz1cIm5lYnVsYXItZXNzZW50aWFsc1wiIGNsYXNzPVwiY3VzdG9tLWNoZWNrYm94LWljb25cIj48L25iLWljb24+XG4gICAgICAgIDxuYi1pY29uICpuZ0lmPVwiY2hlY2tlZCAmJiAhaW5kZXRlcm1pbmF0ZVwiIGljb249XCJjaGVja21hcmstYm9sZC1vdXRsaW5lXCIgcGFjaz1cIm5lYnVsYXItZXNzZW50aWFsc1wiIGNsYXNzPVwiY3VzdG9tLWNoZWNrYm94LWljb25cIj48L25iLWljb24+XG4gICAgICA8L3NwYW4+XG4gICAgICA8c3BhbiBjbGFzcz1cInRleHRcIj5cbiAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgPC9zcGFuPlxuICAgIDwvbGFiZWw+XG4gIGAsXG4gIHN0eWxlVXJsczogWyBgLi9jaGVja2JveC5jb21wb25lbnQuc2Nzc2AgXSxcbiAgcHJvdmlkZXJzOiBbe1xuICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5iQ2hlY2tib3hDb21wb25lbnQpLFxuICAgIG11bHRpOiB0cnVlLFxuICB9XSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE5iQ2hlY2tib3hDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG5cbiAgb25DaGFuZ2U6IGFueSA9ICgpID0+IHsgfTtcbiAgb25Ub3VjaGVkOiBhbnkgPSAoKSA9PiB7IH07XG5cbiAgQElucHV0KClcbiAgZ2V0IGNoZWNrZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2NoZWNrZWQ7XG4gIH1cbiAgc2V0IGNoZWNrZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9jaGVja2VkID0gY29udmVydFRvQm9vbFByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcml2YXRlIF9jaGVja2VkOiBib29sZWFuID0gZmFsc2U7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9jaGVja2VkOiBOYkJvb2xlYW5JbnB1dDtcblxuICAvKipcbiAgICogQ29udHJvbHMgaW5wdXQgZGlzYWJsZWQgc3RhdGVcbiAgICovXG4gIEBJbnB1dCgpXG4gIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7XG4gIH1cbiAgc2V0IGRpc2FibGVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fZGlzYWJsZWQgPSBjb252ZXJ0VG9Cb29sUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIHByaXZhdGUgX2Rpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9kaXNhYmxlZDogTmJCb29sZWFuSW5wdXQ7XG5cbiAgLyoqXG4gICAqIENoZWNrYm94IHN0YXR1cy5cbiAgICogUG9zc2libGUgdmFsdWVzIGFyZTogYGJhc2ljYCwgYHByaW1hcnlgLCBgc3VjY2Vzc2AsIGB3YXJuaW5nYCwgYGRhbmdlcmAsIGBpbmZvYCwgYGNvbnRyb2xgLlxuICAgKi9cbiAgQElucHV0KCkgc3RhdHVzOiBOYkNvbXBvbmVudE9yQ3VzdG9tU3RhdHVzID0gJ2Jhc2ljJztcblxuICAvKipcbiAgICogQ29udHJvbHMgY2hlY2tib3ggaW5kZXRlcm1pbmF0ZSBzdGF0ZVxuICAgKi9cbiAgQElucHV0KClcbiAgZ2V0IGluZGV0ZXJtaW5hdGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2luZGV0ZXJtaW5hdGU7XG4gIH1cbiAgc2V0IGluZGV0ZXJtaW5hdGUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9pbmRldGVybWluYXRlID0gY29udmVydFRvQm9vbFByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcml2YXRlIF9pbmRldGVybWluYXRlOiBib29sZWFuID0gZmFsc2U7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9pbmRldGVybWluYXRlOiBOYkJvb2xlYW5JbnB1dDtcblxuICAvKipcbiAgICogT3V0cHV0IHdoZW4gY2hlY2tlZCBzdGF0ZSBpcyBjaGFuZ2VkIGJ5IGEgdXNlclxuICAgKiBAdHlwZSBFdmVudEVtaXR0ZXI8Ym9vbGVhbj5cbiAgICovXG4gIEBPdXRwdXQoKSBjaGVja2VkQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3Muc3RhdHVzLXByaW1hcnknKVxuICBnZXQgcHJpbWFyeSgpIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0dXMgPT09ICdwcmltYXJ5JztcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3Muc3RhdHVzLXN1Y2Nlc3MnKVxuICBnZXQgc3VjY2VzcygpIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0dXMgPT09ICdzdWNjZXNzJztcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3Muc3RhdHVzLXdhcm5pbmcnKVxuICBnZXQgd2FybmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0dXMgPT09ICd3YXJuaW5nJztcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3Muc3RhdHVzLWRhbmdlcicpXG4gIGdldCBkYW5nZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdHVzID09PSAnZGFuZ2VyJztcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3Muc3RhdHVzLWluZm8nKVxuICBnZXQgaW5mbygpIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0dXMgPT09ICdpbmZvJztcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3Muc3RhdHVzLWJhc2ljJylcbiAgZ2V0IGJhc2ljKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXR1cyA9PT0gJ2Jhc2ljJztcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3Muc3RhdHVzLWNvbnRyb2wnKVxuICBnZXQgY29udHJvbCgpIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0dXMgPT09ICdjb250cm9sJztcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3MnKVxuICBnZXQgYWRkaXRpb25hbENsYXNzZXMoKTogc3RyaW5nW10ge1xuICAgIGlmICh0aGlzLnN0YXR1c1NlcnZpY2UuaXNDdXN0b21TdGF0dXModGhpcy5zdGF0dXMpKSB7XG4gICAgICByZXR1cm4gW3RoaXMuc3RhdHVzU2VydmljZS5nZXRTdGF0dXNDbGFzcyh0aGlzLnN0YXR1cyldO1xuICAgIH1cbiAgICByZXR1cm4gW107XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNoYW5nZURldGVjdG9yOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgcHJpdmF0ZSBob3N0RWxlbWVudDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgcHJpdmF0ZSB6b25lOiBOZ1pvbmUsXG4gICAgcHJpdmF0ZSBzdGF0dXNTZXJ2aWNlOiBOYlN0YXR1c1NlcnZpY2UsXG4gICkge31cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgLy8gVE9ETzogIzIyNTRcbiAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuaG9zdEVsZW1lbnQubmF0aXZlRWxlbWVudCwgJ25iLXRyYW5zaXRpb24nKTtcbiAgICB9KSk7XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uQ2hhbmdlID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KSB7XG4gICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcbiAgfVxuXG4gIHdyaXRlVmFsdWUodmFsOiBhbnkpIHtcbiAgICB0aGlzLl9jaGVja2VkID0gdmFsO1xuICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBzZXREaXNhYmxlZFN0YXRlKHZhbDogYm9vbGVhbikge1xuICAgIHRoaXMuZGlzYWJsZWQgPSBjb252ZXJ0VG9Cb29sUHJvcGVydHkodmFsKTtcbiAgICB0aGlzLmNoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgc2V0VG91Y2hlZCgpIHtcbiAgICB0aGlzLm9uVG91Y2hlZCgpO1xuICB9XG5cbiAgdXBkYXRlVmFsdWVBbmRJbmRldGVybWluYXRlKGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgIGNvbnN0IGlucHV0ID0gKGV2ZW50LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KTtcbiAgICB0aGlzLmNoZWNrZWQgPSBpbnB1dC5jaGVja2VkO1xuICAgIHRoaXMuY2hlY2tlZENoYW5nZS5lbWl0KHRoaXMuY2hlY2tlZCk7XG4gICAgdGhpcy5vbkNoYW5nZSh0aGlzLmNoZWNrZWQpO1xuICAgIHRoaXMuaW5kZXRlcm1pbmF0ZSA9IGlucHV0LmluZGV0ZXJtaW5hdGU7XG4gIH1cbn1cbiJdfQ==