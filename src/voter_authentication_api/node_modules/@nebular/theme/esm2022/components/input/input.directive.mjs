/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Directive, Input, HostBinding, } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { map, finalize, takeUntil } from 'rxjs/operators';
import { convertToBoolProperty } from '../helpers';
import { NbFormFieldControl } from '../form-field/form-field-control';
import * as i0 from "@angular/core";
import * as i1 from "../cdk/a11y/a11y.module";
import * as i2 from "../../services/status.service";
/**
 * Basic input directive.
 *
 * ```html
 * <input nbInput></input>
 * ```
 *
 * ### Installation
 *
 * Import `NbInputModule` to your feature module.
 * ```ts
 * @NgModule({
 *   imports: [
 *     // ...
 *     NbInputModule,
 *   ],
 * })
 * export class PageModule { }
 * ```
 * ### Usage
 *
 * Default input size is `medium`:
 * @stacked-example(Showcase, input/input-showcase.component)
 *
 * Inputs are available in multiple colors using `status` property:
 * @stacked-example(Input Colors, input/input-colors.component)
 *
 * There are three input sizes:
 *
 * @stacked-example(Input Sizes, input/input-sizes.component)
 *
 * Inputs available in different shapes, which could be combined with the other properties:
 * @stacked-example(Input Shapes, input/input-shapes.component)
 *
 * `nbInput` could be applied to the following selectors - `input`, `textarea`:
 * @stacked-example(Input Elements, input/input-types.component)
 *
 * You can add `fullWidth` attribute to make element fill container:
 * @stacked-example(Full width inputs, input/input-full-width.component)
 *
 * Or you can bind control with form controls or ngModel:
 * @stacked-example(Input form binding, input/input-form.component)
 *
 * Use `<nb-form-field>` to add custom content to the input field.
 * First import `NbFormFieldModule`. Then put the input field and custom content into
 * `<nb-form-field>` and add `nbPrefix` or `nbSuffix` directive to the custom content.
 * `nbPrefix` puts content before input and `nbSuffix` after.
 *
 * @stacked-example(Input with icon, form-field/form-field-input.component)
 * @stacked-example(Input with button, form-field/form-field-password.component)
 *
 * @styles
 *
 * input-border-style:
 * input-border-width:
 * input-outline-color:
 * input-outline-width:
 * input-placeholder-text-font-family:
 * input-text-font-family:
 * input-basic-text-color:
 * input-basic-placeholder-text-color:
 * input-basic-background-color:
 * input-basic-border-color:
 * input-basic-focus-background-color:
 * input-basic-focus-border-color:
 * input-basic-hover-background-color:
 * input-basic-hover-border-color:
 * input-basic-disabled-background-color:
 * input-basic-disabled-border-color:
 * input-basic-disabled-text-color:
 * input-basic-disabled-placeholder-text-color:
 * input-primary-text-color:
 * input-primary-placeholder-text-color:
 * input-primary-background-color:
 * input-primary-border-color:
 * input-primary-focus-background-color:
 * input-primary-focus-border-color:
 * input-primary-hover-background-color:
 * input-primary-hover-border-color:
 * input-primary-disabled-background-color:
 * input-primary-disabled-border-color:
 * input-primary-disabled-text-color:
 * input-primary-disabled-placeholder-text-color:
 * input-success-text-color:
 * input-success-placeholder-text-color:
 * input-success-background-color:
 * input-success-border-color:
 * input-success-focus-background-color:
 * input-success-focus-border-color:
 * input-success-hover-background-color:
 * input-success-hover-border-color:
 * input-success-disabled-background-color:
 * input-success-disabled-border-color:
 * input-success-disabled-text-color:
 * input-success-disabled-placeholder-text-color:
 * input-info-text-color:
 * input-info-placeholder-text-color:
 * input-info-background-color:
 * input-info-border-color:
 * input-info-focus-background-color:
 * input-info-focus-border-color:
 * input-info-hover-background-color:
 * input-info-hover-border-color:
 * input-info-disabled-background-color:
 * input-info-disabled-border-color:
 * input-info-disabled-text-color:
 * input-info-disabled-placeholder-text-color:
 * input-warning-text-color:
 * input-warning-placeholder-text-color:
 * input-warning-background-color:
 * input-warning-border-color:
 * input-warning-focus-background-color:
 * input-warning-focus-border-color:
 * input-warning-hover-background-color:
 * input-warning-hover-border-color:
 * input-warning-disabled-background-color:
 * input-warning-disabled-border-color:
 * input-warning-disabled-text-color:
 * input-warning-disabled-placeholder-text-color:
 * input-danger-text-color:
 * input-danger-placeholder-text-color:
 * input-danger-background-color:
 * input-danger-border-color:
 * input-danger-focus-background-color:
 * input-danger-focus-border-color:
 * input-danger-hover-background-color:
 * input-danger-hover-border-color:
 * input-danger-disabled-background-color:
 * input-danger-disabled-border-color:
 * input-danger-disabled-text-color:
 * input-danger-disabled-placeholder-text-color:
 * input-control-text-color:
 * input-control-placeholder-text-color:
 * input-control-background-color:
 * input-control-border-color:
 * input-control-focus-background-color:
 * input-control-focus-border-color:
 * input-control-hover-background-color:
 * input-control-hover-border-color:
 * input-control-disabled-background-color:
 * input-control-disabled-border-color:
 * input-control-disabled-text-color:
 * input-control-disabled-placeholder-text-color:
 * input-rectangle-border-radius:
 * input-semi-round-border-radius:
 * input-round-border-radius:
 * input-tiny-text-font-size:
 * input-tiny-text-font-weight:
 * input-tiny-text-line-height:
 * input-tiny-placeholder-text-font-size:
 * input-tiny-placeholder-text-font-weight:
 * input-tiny-placeholder-text-line-height:
 * input-tiny-padding:
 * input-tiny-max-width:
 * input-small-text-font-size:
 * input-small-text-font-weight:
 * input-small-text-line-height:
 * input-small-placeholder-text-font-size:
 * input-small-placeholder-text-font-weight:
 * input-small-placeholder-text-line-height:
 * input-small-padding:
 * input-small-max-width:
 * input-medium-text-font-size:
 * input-medium-text-font-weight:
 * input-medium-text-line-height:
 * input-medium-placeholder-text-font-size:
 * input-medium-placeholder-text-font-weight:
 * input-medium-placeholder-text-line-height:
 * input-medium-padding:
 * input-medium-max-width:
 * input-large-text-font-size:
 * input-large-text-font-weight:
 * input-large-text-line-height:
 * input-large-placeholder-text-font-size:
 * input-large-placeholder-text-font-weight:
 * input-large-placeholder-text-line-height:
 * input-large-padding:
 * input-large-max-width:
 * input-giant-text-font-size:
 * input-giant-text-font-weight:
 * input-giant-text-line-height:
 * input-giant-placeholder-text-font-size:
 * input-giant-placeholder-text-font-weight:
 * input-giant-placeholder-text-line-height:
 * input-giant-padding:
 * input-giant-max-width:
 */
export class NbInputDirective {
    /**
     * If set element will fill container. `false` by default.
     */
    get fullWidth() {
        return this._fullWidth;
    }
    set fullWidth(value) {
        this._fullWidth = convertToBoolProperty(value);
    }
    get additionalClasses() {
        if (this.statusService.isCustomStatus(this.status)) {
            return [this.statusService.getStatusClass(this.status)];
        }
        return [];
    }
    constructor(elementRef, focusMonitor, renderer, zone, statusService) {
        this.elementRef = elementRef;
        this.focusMonitor = focusMonitor;
        this.renderer = renderer;
        this.zone = zone;
        this.statusService = statusService;
        this.destroy$ = new Subject();
        /**
         * Field size modifications. Possible values: `small`, `medium` (default), `large`.
         */
        this.fieldSize = 'medium';
        /**
         * Field status (adds specific styles):
         * `basic`, `primary`, `info`, `success`, `warning`, `danger`, `control`
         */
        this.status = 'basic';
        /**
         * Field shapes modifications. Possible values: `rectangle` (default), `round`, `semi-round`.
         */
        this.shape = 'rectangle';
        this._fullWidth = false;
        /*
         * @docs-private
         **/
        this.status$ = new BehaviorSubject(this.status);
        /*
         * @docs-private
         **/
        this.size$ = new BehaviorSubject(this.fieldSize);
        /*
         * @docs-private
         **/
        this.focused$ = new BehaviorSubject(false);
        /*
         * @docs-private
         **/
        this.disabled$ = new BehaviorSubject(false);
        /*
         * @docs-private
         **/
        this.fullWidth$ = new BehaviorSubject(this.fullWidth);
    }
    ngDoCheck() {
        const isDisabled = this.elementRef.nativeElement.disabled;
        if (isDisabled !== this.disabled$.value) {
            this.disabled$.next(isDisabled);
        }
    }
    ngOnChanges({ status, fieldSize, fullWidth }) {
        if (status) {
            this.status$.next(this.status);
        }
        if (fieldSize) {
            this.size$.next(this.fieldSize);
        }
        if (fullWidth) {
            this.fullWidth$.next(this.fullWidth);
        }
    }
    ngOnInit() {
        this.focusMonitor.monitor(this.elementRef)
            .pipe(map(origin => !!origin), finalize(() => this.focusMonitor.stopMonitoring(this.elementRef)), takeUntil(this.destroy$))
            .subscribe(this.focused$);
    }
    ngAfterViewInit() {
        // TODO: #2254
        this.zone.runOutsideAngular(() => setTimeout(() => {
            this.renderer.addClass(this.elementRef.nativeElement, 'nb-transition');
        }));
    }
    ngOnDestroy() {
        this.destroy$.next();
    }
    get tiny() {
        return this.fieldSize === 'tiny';
    }
    get small() {
        return this.fieldSize === 'small';
    }
    get medium() {
        return this.fieldSize === 'medium';
    }
    get large() {
        return this.fieldSize === 'large';
    }
    get giant() {
        return this.fieldSize === 'giant';
    }
    get primary() {
        return this.status === 'primary';
    }
    get info() {
        return this.status === 'info';
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
    get basic() {
        return this.status === 'basic';
    }
    get control() {
        return this.status === 'control';
    }
    get rectangle() {
        return this.shape === 'rectangle';
    }
    get semiRound() {
        return this.shape === 'semi-round';
    }
    get round() {
        return this.shape === 'round';
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbInputDirective, deps: [{ token: i0.ElementRef }, { token: i1.NbFocusMonitor }, { token: i0.Renderer2 }, { token: i0.NgZone }, { token: i2.NbStatusService }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "17.1.0", type: NbInputDirective, selector: "input[nbInput],textarea[nbInput]", inputs: { fieldSize: "fieldSize", status: "status", shape: "shape", fullWidth: "fullWidth" }, host: { properties: { "class.input-full-width": "this.fullWidth", "class": "this.additionalClasses", "class.size-tiny": "this.tiny", "class.size-small": "this.small", "class.size-medium": "this.medium", "class.size-large": "this.large", "class.size-giant": "this.giant", "class.status-primary": "this.primary", "class.status-info": "this.info", "class.status-success": "this.success", "class.status-warning": "this.warning", "class.status-danger": "this.danger", "class.status-basic": "this.basic", "class.status-control": "this.control", "class.shape-rectangle": "this.rectangle", "class.shape-semi-round": "this.semiRound", "class.shape-round": "this.round" } }, providers: [
            { provide: NbFormFieldControl, useExisting: NbInputDirective },
        ], usesOnChanges: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbInputDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'input[nbInput],textarea[nbInput]',
                    providers: [
                        { provide: NbFormFieldControl, useExisting: NbInputDirective },
                    ],
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i1.NbFocusMonitor }, { type: i0.Renderer2 }, { type: i0.NgZone }, { type: i2.NbStatusService }], propDecorators: { fieldSize: [{
                type: Input
            }], status: [{
                type: Input
            }], shape: [{
                type: Input
            }], fullWidth: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['class.input-full-width']
            }], additionalClasses: [{
                type: HostBinding,
                args: ['class']
            }], tiny: [{
                type: HostBinding,
                args: ['class.size-tiny']
            }], small: [{
                type: HostBinding,
                args: ['class.size-small']
            }], medium: [{
                type: HostBinding,
                args: ['class.size-medium']
            }], large: [{
                type: HostBinding,
                args: ['class.size-large']
            }], giant: [{
                type: HostBinding,
                args: ['class.size-giant']
            }], primary: [{
                type: HostBinding,
                args: ['class.status-primary']
            }], info: [{
                type: HostBinding,
                args: ['class.status-info']
            }], success: [{
                type: HostBinding,
                args: ['class.status-success']
            }], warning: [{
                type: HostBinding,
                args: ['class.status-warning']
            }], danger: [{
                type: HostBinding,
                args: ['class.status-danger']
            }], basic: [{
                type: HostBinding,
                args: ['class.status-basic']
            }], control: [{
                type: HostBinding,
                args: ['class.status-control']
            }], rectangle: [{
                type: HostBinding,
                args: ['class.shape-rectangle']
            }], semiRound: [{
                type: HostBinding,
                args: ['class.shape-semi-round']
            }], round: [{
                type: HostBinding,
                args: ['class.shape-round']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2ZyYW1ld29yay90aGVtZS9jb21wb25lbnRzL2lucHV0L2lucHV0LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsV0FBVyxHQVVaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2hELE9BQU8sRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRzFELE9BQU8sRUFBRSxxQkFBcUIsRUFBa0IsTUFBTSxZQUFZLENBQUM7QUFJbkUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7Ozs7QUFHdEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBMRztBQU9ILE1BQU0sT0FBTyxnQkFBZ0I7SUFzQjNCOztPQUVHO0lBQ0gsSUFFSSxTQUFTO1FBQ1gsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQ3pCLENBQUM7SUFDRCxJQUFJLFNBQVMsQ0FBQyxLQUFjO1FBQzFCLElBQUksQ0FBQyxVQUFVLEdBQUcscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUlELElBQ0ksaUJBQWlCO1FBQ25CLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxF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LENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBQ3pFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDTixDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVELElBQ0ksSUFBSTtRQUNOLE9BQU8sSUFBSSxDQUFDLFNBQVMsS0FBSyxNQUFNLENBQUM7SUFDbkMsQ0FBQztJQUVELElBQ0ksS0FBSztRQUNQLE9BQU8sSUFBSSxDQUFDLFNBQVMsS0FBSyxPQUFPLENBQUM7SUFDcEMsQ0FBQztJQUVELElBQ0ksTUFBTTtRQUNSLE9BQU8sSUFBSSxDQUFDLFNBQVMsS0FBSyxRQUFRLENBQUM7SUFDckMsQ0FBQztJQUVELElBQ0ksS0FBSztRQUNQLE9BQU8sSUFBSSxDQUFDLFNBQVMsS0FBSyxPQUFPLENBQUM7SUFDcEMsQ0FBQztJQUVELElBQ0ksS0FBSztRQUNQLE9BQU8sSUFBSSxDQUFDLFNBQVMsS0FBSyxPQUFPLENBQUM7SUFDcEMsQ0FBQztJQUVELElBQ0ksT0FBTztRQUNULE9BQU8sSUFBSSxDQUFDLE1BQU0sS0FBSyxTQUFTLENBQUM7SUFDbkMsQ0FBQztJQUVELElBQ0ksSUFBSTtRQUNOLE9BQU8sSUFBSSxDQUFDLE1BQU0sS0FBSyxNQUFNLENBQUM7SUFDaEMsQ0FBQztJQUVELElBQ0ksT0FBTztRQUNULE9BQU8sSUFBSSxDQUFDLE1BQU0sS0FBSyxTQUFTLENBQUM7SUFDbkMsQ0FBQztJQUVELElBQ0ksT0FBTztRQUNULE9BQU8sSUFBSSxDQUFDLE1BQU0sS0FBSyxTQUFTLENBQUM7SUFDbkMsQ0FBQztJQUVELElBQ0ksTUFBTTtRQUNSLE9BQU8sSUFBSSxDQUFDLE1BQU0sS0FBSyxRQUFRLENBQUM7SUFDbEMsQ0FBQztJQUVELElBQ0ksS0FBSztRQUNQLE9BQU8sSUFBSSxDQUFDLE1BQU0sS0FBSyxPQUFPLENBQUM7SUFDakMsQ0FBQztJQUVELElBQ0ksT0FBTztRQUNULE9BQU8sSUFBSSxDQUFDLE1BQU0sS0FBSyxTQUFTLENBQUM7SUFDbkMsQ0FBQztJQUVELElBQ0ksU0FBUztRQUNYLE9BQU8sSUFBSSxDQUFDLEtBQUssS0FBSyxXQUFXLENBQUM7SUFDcEMsQ0FBQztJQUVELElBQ0ksU0FBUztRQUNYLE9BQU8sSUFBSSxDQUFDLEtBQUssS0FBSyxZQUFZLENBQUM7SUFDckMsQ0FBQztJQUVELElBQ0ksS0FBSztRQUNQLE9BQU8sSUFBSSxDQUFDLEtBQUssS0FBSyxPQUFPLENBQUM7SUFDaEMsQ0FBQzs4R0F0S1UsZ0JBQWdCO2tHQUFoQixnQkFBZ0Isa3pCQUpoQjtZQUNULEVBQUUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLFdBQVcsRUFBRSxnQkFBZ0IsRUFBRTtTQUMvRDs7MkZBRVUsZ0JBQWdCO2tCQU41QixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxrQ0FBa0M7b0JBQzVDLFNBQVMsRUFBRTt3QkFDVCxFQUFFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxXQUFXLGtCQUFrQixFQUFFO3FCQUMvRDtpQkFDRjt1TEFTQyxTQUFTO3NCQURSLEtBQUs7Z0JBT0csTUFBTTtzQkFBZCxLQUFLO2dCQU1OLEtBQUs7c0JBREosS0FBSztnQkFRRixTQUFTO3NCQUZaLEtBQUs7O3NCQUNMLFdBQVc7dUJBQUMsd0JBQXdCO2dCQVdqQyxpQkFBaUI7c0JBRHBCLFdBQVc7dUJBQUMsT0FBTztnQkEwRGhCLElBQUk7c0JBRFAsV0FBVzt1QkFBQyxpQkFBaUI7Z0JBTTFCLEtBQUs7c0JBRFIsV0FBVzt1QkFBQyxrQkFBa0I7Z0JBTTNCLE1BQU07c0JBRFQsV0FBVzt1QkFBQyxtQkFBbUI7Z0JBTTVCLEtBQUs7c0JBRFIsV0FBVzt1QkFBQyxrQkFBa0I7Z0JBTTNCLEtBQUs7c0JBRFIsV0FBVzt1QkFBQyxrQkFBa0I7Z0JBTTNCLE9BQU87c0JBRFYsV0FBVzt1QkFBQyxzQkFBc0I7Z0JBTS9CLElBQUk7c0JBRFAsV0FBVzt1QkFBQyxtQkFBbUI7Z0JBTTVCLE9BQU87c0JBRFYsV0FBVzt1QkFBQyxzQkFBc0I7Z0JBTS9CLE9BQU87c0JBRFYsV0FBVzt1QkFBQyxzQkFBc0I7Z0JBTS9CLE1BQU07c0JBRFQsV0FBVzt1QkFBQyxxQkFBcUI7Z0JBTTlCLEtBQUs7c0JBRFIsV0FBVzt1QkFBQyxvQkFBb0I7Z0JBTTdCLE9BQU87c0JBRFYsV0FBVzt1QkFBQyxzQkFBc0I7Z0JBTS9CLFNBQVM7c0JBRFosV0FBVzt1QkFBQyx1QkFBdUI7Z0JBTWhDLFNBQVM7c0JBRFosV0FBVzt1QkFBQyx3QkFBd0I7Z0JBTWpDLEtBQUs7c0JBRFIsV0FBVzt1QkFBQyxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgQWt2ZW8uIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICovXG5cbmltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgSW5wdXQsXG4gIEhvc3RCaW5kaW5nLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgRWxlbWVudFJlZixcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgT25DaGFuZ2VzLFxuICBEb0NoZWNrLFxuICBBZnRlclZpZXdJbml0LFxuICBSZW5kZXJlcjIsXG4gIE5nWm9uZSxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0LCBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCwgZmluYWxpemUsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgTmJTdGF0dXNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvc3RhdHVzLnNlcnZpY2UnO1xuaW1wb3J0IHsgY29udmVydFRvQm9vbFByb3BlcnR5LCBOYkJvb2xlYW5JbnB1dCB9IGZyb20gJy4uL2hlbHBlcnMnO1xuaW1wb3J0IHsgTmJDb21wb25lbnRTaXplIH0gZnJvbSAnLi4vY29tcG9uZW50LXNpemUnO1xuaW1wb3J0IHsgTmJDb21wb25lbnRTaGFwZSB9IGZyb20gJy4uL2NvbXBvbmVudC1zaGFwZSc7XG5pbXBvcnQgeyBOYkNvbXBvbmVudE9yQ3VzdG9tU3RhdHVzIH0gZnJvbSAnLi4vY29tcG9uZW50LXN0YXR1cyc7XG5pbXBvcnQgeyBOYkZvcm1GaWVsZENvbnRyb2wgfSBmcm9tICcuLi9mb3JtLWZpZWxkL2Zvcm0tZmllbGQtY29udHJvbCc7XG5pbXBvcnQgeyBOYkZvY3VzTW9uaXRvciB9IGZyb20gJy4uL2Nkay9hMTF5L2ExMXkubW9kdWxlJztcblxuLyoqXG4gKiBCYXNpYyBpbnB1dCBkaXJlY3RpdmUuXG4gKlxuICogYGBgaHRtbFxuICogPGlucHV0IG5iSW5wdXQ+PC9pbnB1dD5cbiAqIGBgYFxuICpcbiAqICMjIyBJbnN0YWxsYXRpb25cbiAqXG4gKiBJbXBvcnQgYE5iSW5wdXRNb2R1bGVgIHRvIHlvdXIgZmVhdHVyZSBtb2R1bGUuXG4gKiBgYGB0c1xuICogQE5nTW9kdWxlKHtcbiAqICAgaW1wb3J0czogW1xuICogICAgIC8vIC4uLlxuICogICAgIE5iSW5wdXRNb2R1bGUsXG4gKiAgIF0sXG4gKiB9KVxuICogZXhwb3J0IGNsYXNzIFBhZ2VNb2R1bGUgeyB9XG4gKiBgYGBcbiAqICMjIyBVc2FnZVxuICpcbiAqIERlZmF1bHQgaW5wdXQgc2l6ZSBpcyBgbWVkaXVtYDpcbiAqIEBzdGFja2VkLWV4YW1wbGUoU2hvd2Nhc2UsIGlucHV0L2lucHV0LXNob3djYXNlLmNvbXBvbmVudClcbiAqXG4gKiBJbnB1dHMgYXJlIGF2YWlsYWJsZSBpbiBtdWx0aXBsZSBjb2xvcnMgdXNpbmcgYHN0YXR1c2AgcHJvcGVydHk6XG4gKiBAc3RhY2tlZC1leGFtcGxlKElucHV0IENvbG9ycywgaW5wdXQvaW5wdXQtY29sb3JzLmNvbXBvbmVudClcbiAqXG4gKiBUaGVyZSBhcmUgdGhyZWUgaW5wdXQgc2l6ZXM6XG4gKlxuICogQHN0YWNrZWQtZXhhbXBsZShJbnB1dCBTaXplcywgaW5wdXQvaW5wdXQtc2l6ZXMuY29tcG9uZW50KVxuICpcbiAqIElucHV0cyBhdmFpbGFibGUgaW4gZGlmZmVyZW50IHNoYXBlcywgd2hpY2ggY291bGQgYmUgY29tYmluZWQgd2l0aCB0aGUgb3RoZXIgcHJvcGVydGllczpcbiAqIEBzdGFja2VkLWV4YW1wbGUoSW5wdXQgU2hhcGVzLCBpbnB1dC9pbnB1dC1zaGFwZXMuY29tcG9uZW50KVxuICpcbiAqIGBuYklucHV0YCBjb3VsZCBiZSBhcHBsaWVkIHRvIHRoZSBmb2xsb3dpbmcgc2VsZWN0b3JzIC0gYGlucHV0YCwgYHRleHRhcmVhYDpcbiAqIEBzdGFja2VkLWV4YW1wbGUoSW5wdXQgRWxlbWVudHMsIGlucHV0L2lucHV0LXR5cGVzLmNvbXBvbmVudClcbiAqXG4gKiBZb3UgY2FuIGFkZCBgZnVsbFdpZHRoYCBhdHRyaWJ1dGUgdG8gbWFrZSBlbGVtZW50IGZpbGwgY29udGFpbmVyOlxuICogQHN0YWNrZWQtZXhhbXBsZShGdWxsIHdpZHRoIGlucHV0cywgaW5wdXQvaW5wdXQtZnVsbC13aWR0aC5jb21wb25lbnQpXG4gKlxuICogT3IgeW91IGNhbiBiaW5kIGNvbnRyb2wgd2l0aCBmb3JtIGNvbnRyb2xzIG9yIG5nTW9kZWw6XG4gKiBAc3RhY2tlZC1leGFtcGxlKElucHV0IGZvcm0gYmluZGluZywgaW5wdXQvaW5wdXQtZm9ybS5jb21wb25lbnQpXG4gKlxuICogVXNlIGA8bmItZm9ybS1maWVsZD5gIHRvIGFkZCBjdXN0b20gY29udGVudCB0byB0aGUgaW5wdXQgZmllbGQuXG4gKiBGaXJzdCBpbXBvcnQgYE5iRm9ybUZpZWxkTW9kdWxlYC4gVGhlbiBwdXQgdGhlIGlucHV0IGZpZWxkIGFuZCBjdXN0b20gY29udGVudCBpbnRvXG4gKiBgPG5iLWZvcm0tZmllbGQ+YCBhbmQgYWRkIGBuYlByZWZpeGAgb3IgYG5iU3VmZml4YCBkaXJlY3RpdmUgdG8gdGhlIGN1c3RvbSBjb250ZW50LlxuICogYG5iUHJlZml4YCBwdXRzIGNvbnRlbnQgYmVmb3JlIGlucHV0IGFuZCBgbmJTdWZmaXhgIGFmdGVyLlxuICpcbiAqIEBzdGFja2VkLWV4YW1wbGUoSW5wdXQgd2l0aCBpY29uLCBmb3JtLWZpZWxkL2Zvcm0tZmllbGQtaW5wdXQuY29tcG9uZW50KVxuICogQHN0YWNrZWQtZXhhbXBsZShJbnB1dCB3aXRoIGJ1dHRvbiwgZm9ybS1maWVsZC9mb3JtLWZpZWxkLXBhc3N3b3JkLmNvbXBvbmVudClcbiAqXG4gKiBAc3R5bGVzXG4gKlxuICogaW5wdXQtYm9yZGVyLXN0eWxlOlxuICogaW5wdXQtYm9yZGVyLXdpZHRoOlxuICogaW5wdXQtb3V0bGluZS1jb2xvcjpcbiAqIGlucHV0LW91dGxpbmUtd2lkdGg6XG4gKiBpbnB1dC1wbGFjZWhvbGRlci10ZXh0LWZvbnQtZmFtaWx5OlxuICogaW5wdXQtdGV4dC1mb250LWZhbWlseTpcbiAqIGlucHV0LWJhc2ljLXRleHQtY29sb3I6XG4gKiBpbnB1dC1iYXNpYy1wbGFjZWhvbGRlci10ZXh0LWNvbG9yOlxuICogaW5wdXQtYmFzaWMtYmFja2dyb3VuZC1jb2xvcjpcbiAqIGlucHV0LWJhc2ljLWJvcmRlci1jb2xvcjpcbiAqIGlucHV0LWJhc2ljLWZvY3VzLWJhY2tncm91bmQtY29sb3I6XG4gKiBpbnB1dC1iYXNpYy1mb2N1cy1ib3JkZXItY29sb3I6XG4gKiBpbnB1dC1iYXNpYy1ob3Zlci1iYWNrZ3JvdW5kLWNvbG9yOlxuICogaW5wdXQtYmFzaWMtaG92ZXItYm9yZGVyLWNvbG9yOlxuICogaW5wdXQtYmFzaWMtZGlzYWJsZWQtYmFja2dyb3VuZC1jb2xvcjpcbiAqIGlucHV0LWJhc2ljLWRpc2FibGVkLWJvcmRlci1jb2xvcjpcbiAqIGlucHV0LWJhc2ljLWRpc2FibGVkLXRleHQtY29sb3I6XG4gKiBpbnB1dC1iYXNpYy1kaXNhYmxlZC1wbGFjZWhvbGRlci10ZXh0LWNvbG9yOlxuICogaW5wdXQtcHJpbWFyeS10ZXh0LWNvbG9yOlxuICogaW5wdXQtcHJpbWFyeS1wbGFjZWhvbGRlci10ZXh0LWNvbG9yOlxuICogaW5wdXQtcHJpbWFyeS1iYWNrZ3JvdW5kLWNvbG9yOlxuICogaW5wdXQtcHJpbWFyeS1ib3JkZXItY29sb3I6XG4gKiBpbnB1dC1wcmltYXJ5LWZvY3VzLWJhY2tncm91bmQtY29sb3I6XG4gKiBpbnB1dC1wcmltYXJ5LWZvY3VzLWJvcmRlci1jb2xvcjpcbiAqIGlucHV0LXByaW1hcnktaG92ZXItYmFja2dyb3VuZC1jb2xvcjpcbiAqIGlucHV0LXByaW1hcnktaG92ZXItYm9yZGVyLWNvbG9yOlxuICogaW5wdXQtcHJpbWFyeS1kaXNhYmxlZC1iYWNrZ3JvdW5kLWNvbG9yOlxuICogaW5wdXQtcHJpbWFyeS1kaXNhYmxlZC1ib3JkZXItY29sb3I6XG4gKiBpbnB1dC1wcmltYXJ5LWRpc2FibGVkLXRleHQtY29sb3I6XG4gKiBpbnB1dC1wcmltYXJ5LWRpc2FibGVkLXBsYWNlaG9sZGVyLXRleHQtY29sb3I6XG4gKiBpbnB1dC1zdWNjZXNzLXRleHQtY29sb3I6XG4gKiBpbnB1dC1zdWNjZXNzLXBsYWNlaG9sZGVyLXRleHQtY29sb3I6XG4gKiBpbnB1dC1zdWNjZXNzLWJhY2tncm91bmQtY29sb3I6XG4gKiBpbnB1dC1zdWNjZXNzLWJvcmRlci1jb2xvcjpcbiAqIGlucHV0LXN1Y2Nlc3MtZm9jdXMtYmFja2dyb3VuZC1jb2xvcjpcbiAqIGlucHV0LXN1Y2Nlc3MtZm9jdXMtYm9yZGVyLWNvbG9yOlxuICogaW5wdXQtc3VjY2Vzcy1ob3Zlci1iYWNrZ3JvdW5kLWNvbG9yOlxuICogaW5wdXQtc3VjY2Vzcy1ob3Zlci1ib3JkZXItY29sb3I6XG4gKiBpbnB1dC1zdWNjZXNzLWRpc2FibGVkLWJhY2tncm91bmQtY29sb3I6XG4gKiBpbnB1dC1zdWNjZXNzLWRpc2FibGVkLWJvcmRlci1jb2xvcjpcbiAqIGlucHV0LXN1Y2Nlc3MtZGlzYWJsZWQtdGV4dC1jb2xvcjpcbiAqIGlucHV0LXN1Y2Nlc3MtZGlzYWJsZWQtcGxhY2Vob2xkZXItdGV4dC1jb2xvcjpcbiAqIGlucHV0LWluZm8tdGV4dC1jb2xvcjpcbiAqIGlucHV0LWluZm8tcGxhY2Vob2xkZXItdGV4dC1jb2xvcjpcbiAqIGlucHV0LWluZm8tYmFja2dyb3VuZC1jb2xvcjpcbiAqIGlucHV0LWluZm8tYm9yZGVyLWNvbG9yOlxuICogaW5wdXQtaW5mby1mb2N1cy1iYWNrZ3JvdW5kLWNvbG9yOlxuICogaW5wdXQtaW5mby1mb2N1cy1ib3JkZXItY29sb3I6XG4gKiBpbnB1dC1pbmZvLWhvdmVyLWJhY2tncm91bmQtY29sb3I6XG4gKiBpbnB1dC1pbmZvLWhvdmVyLWJvcmRlci1jb2xvcjpcbiAqIGlucHV0LWluZm8tZGlzYWJsZWQtYmFja2dyb3VuZC1jb2xvcjpcbiAqIGlucHV0LWluZm8tZGlzYWJsZWQtYm9yZGVyLWNvbG9yOlxuICogaW5wdXQtaW5mby1kaXNhYmxlZC10ZXh0LWNvbG9yOlxuICogaW5wdXQtaW5mby1kaXNhYmxlZC1wbGFjZWhvbGRlci10ZXh0LWNvbG9yOlxuICogaW5wdXQtd2FybmluZy10ZXh0LWNvbG9yOlxuICogaW5wdXQtd2FybmluZy1wbGFjZWhvbGRlci10ZXh0LWNvbG9yOlxuICogaW5wdXQtd2FybmluZy1iYWNrZ3JvdW5kLWNvbG9yOlxuICogaW5wdXQtd2FybmluZy1ib3JkZXItY29sb3I6XG4gKiBpbnB1dC13YXJuaW5nLWZvY3VzLWJhY2tncm91bmQtY29sb3I6XG4gKiBpbnB1dC13YXJuaW5nLWZvY3VzLWJvcmRlci1jb2xvcjpcbiAqIGlucHV0LXdhcm5pbmctaG92ZXItYmFja2dyb3VuZC1jb2xvcjpcbiAqIGlucHV0LXdhcm5pbmctaG92ZXItYm9yZGVyLWNvbG9yOlxuICogaW5wdXQtd2FybmluZy1kaXNhYmxlZC1iYWNrZ3JvdW5kLWNvbG9yOlxuICogaW5wdXQtd2FybmluZy1kaXNhYmxlZC1ib3JkZXItY29sb3I6XG4gKiBpbnB1dC13YXJuaW5nLWRpc2FibGVkLXRleHQtY29sb3I6XG4gKiBpbnB1dC13YXJuaW5nLWRpc2FibGVkLXBsYWNlaG9sZGVyLXRleHQtY29sb3I6XG4gKiBpbnB1dC1kYW5nZXItdGV4dC1jb2xvcjpcbiAqIGlucHV0LWRhbmdlci1wbGFjZWhvbGRlci10ZXh0LWNvbG9yOlxuICogaW5wdXQtZGFuZ2VyLWJhY2tncm91bmQtY29sb3I6XG4gKiBpbnB1dC1kYW5nZXItYm9yZGVyLWNvbG9yOlxuICogaW5wdXQtZGFuZ2VyLWZvY3VzLWJhY2tncm91bmQtY29sb3I6XG4gKiBpbnB1dC1kYW5nZXItZm9jdXMtYm9yZGVyLWNvbG9yOlxuICogaW5wdXQtZGFuZ2VyLWhvdmVyLWJhY2tncm91bmQtY29sb3I6XG4gKiBpbnB1dC1kYW5nZXItaG92ZXItYm9yZGVyLWNvbG9yOlxuICogaW5wdXQtZGFuZ2VyLWRpc2FibGVkLWJhY2tncm91bmQtY29sb3I6XG4gKiBpbnB1dC1kYW5nZXItZGlzYWJsZWQtYm9yZGVyLWNvbG9yOlxuICogaW5wdXQtZGFuZ2VyLWRpc2FibGVkLXRleHQtY29sb3I6XG4gKiBpbnB1dC1kYW5nZXItZGlzYWJsZWQtcGxhY2Vob2xkZXItdGV4dC1jb2xvcjpcbiAqIGlucHV0LWNvbnRyb2wtdGV4dC1jb2xvcjpcbiAqIGlucHV0LWNvbnRyb2wtcGxhY2Vob2xkZXItdGV4dC1jb2xvcjpcbiAqIGlucHV0LWNvbnRyb2wtYmFja2dyb3VuZC1jb2xvcjpcbiAqIGlucHV0LWNvbnRyb2wtYm9yZGVyLWNvbG9yOlxuICogaW5wdXQtY29udHJvbC1mb2N1cy1iYWNrZ3JvdW5kLWNvbG9yOlxuICogaW5wdXQtY29udHJvbC1mb2N1cy1ib3JkZXItY29sb3I6XG4gKiBpbnB1dC1jb250cm9sLWhvdmVyLWJhY2tncm91bmQtY29sb3I6XG4gKiBpbnB1dC1jb250cm9sLWhvdmVyLWJvcmRlci1jb2xvcjpcbiAqIGlucHV0LWNvbnRyb2wtZGlzYWJsZWQtYmFja2dyb3VuZC1jb2xvcjpcbiAqIGlucHV0LWNvbnRyb2wtZGlzYWJsZWQtYm9yZGVyLWNvbG9yOlxuICogaW5wdXQtY29udHJvbC1kaXNhYmxlZC10ZXh0LWNvbG9yOlxuICogaW5wdXQtY29udHJvbC1kaXNhYmxlZC1wbGFjZWhvbGRlci10ZXh0LWNvbG9yOlxuICogaW5wdXQtcmVjdGFuZ2xlLWJvcmRlci1yYWRpdXM6XG4gKiBpbnB1dC1zZW1pLXJvdW5kLWJvcmRlci1yYWRpdXM6XG4gKiBpbnB1dC1yb3VuZC1ib3JkZXItcmFkaXVzOlxuICogaW5wdXQtdGlueS10ZXh0LWZvbnQtc2l6ZTpcbiAqIGlucHV0LXRpbnktdGV4dC1mb250LXdlaWdodDpcbiAqIGlucHV0LXRpbnktdGV4dC1saW5lLWhlaWdodDpcbiAqIGlucHV0LXRpbnktcGxhY2Vob2xkZXItdGV4dC1mb250LXNpemU6XG4gKiBpbnB1dC10aW55LXBsYWNlaG9sZGVyLXRleHQtZm9udC13ZWlnaHQ6XG4gKiBpbnB1dC10aW55LXBsYWNlaG9sZGVyLXRleHQtbGluZS1oZWlnaHQ6XG4gKiBpbnB1dC10aW55LXBhZGRpbmc6XG4gKiBpbnB1dC10aW55LW1heC13aWR0aDpcbiAqIGlucHV0LXNtYWxsLXRleHQtZm9udC1zaXplOlxuICogaW5wdXQtc21hbGwtdGV4dC1mb250LXdlaWdodDpcbiAqIGlucHV0LXNtYWxsLXRleHQtbGluZS1oZWlnaHQ6XG4gKiBpbnB1dC1zbWFsbC1wbGFjZWhvbGRlci10ZXh0LWZvbnQtc2l6ZTpcbiAqIGlucHV0LXNtYWxsLXBsYWNlaG9sZGVyLXRleHQtZm9udC13ZWlnaHQ6XG4gKiBpbnB1dC1zbWFsbC1wbGFjZWhvbGRlci10ZXh0LWxpbmUtaGVpZ2h0OlxuICogaW5wdXQtc21hbGwtcGFkZGluZzpcbiAqIGlucHV0LXNtYWxsLW1heC13aWR0aDpcbiAqIGlucHV0LW1lZGl1bS10ZXh0LWZvbnQtc2l6ZTpcbiAqIGlucHV0LW1lZGl1bS10ZXh0LWZvbnQtd2VpZ2h0OlxuICogaW5wdXQtbWVkaXVtLXRleHQtbGluZS1oZWlnaHQ6XG4gKiBpbnB1dC1tZWRpdW0tcGxhY2Vob2xkZXItdGV4dC1mb250LXNpemU6XG4gKiBpbnB1dC1tZWRpdW0tcGxhY2Vob2xkZXItdGV4dC1mb250LXdlaWdodDpcbiAqIGlucHV0LW1lZGl1bS1wbGFjZWhvbGRlci10ZXh0LWxpbmUtaGVpZ2h0OlxuICogaW5wdXQtbWVkaXVtLXBhZGRpbmc6XG4gKiBpbnB1dC1tZWRpdW0tbWF4LXdpZHRoOlxuICogaW5wdXQtbGFyZ2UtdGV4dC1mb250LXNpemU6XG4gKiBpbnB1dC1sYXJnZS10ZXh0LWZvbnQtd2VpZ2h0OlxuICogaW5wdXQtbGFyZ2UtdGV4dC1saW5lLWhlaWdodDpcbiAqIGlucHV0LWxhcmdlLXBsYWNlaG9sZGVyLXRleHQtZm9udC1zaXplOlxuICogaW5wdXQtbGFyZ2UtcGxhY2Vob2xkZXItdGV4dC1mb250LXdlaWdodDpcbiAqIGlucHV0LWxhcmdlLXBsYWNlaG9sZGVyLXRleHQtbGluZS1oZWlnaHQ6XG4gKiBpbnB1dC1sYXJnZS1wYWRkaW5nOlxuICogaW5wdXQtbGFyZ2UtbWF4LXdpZHRoOlxuICogaW5wdXQtZ2lhbnQtdGV4dC1mb250LXNpemU6XG4gKiBpbnB1dC1naWFudC10ZXh0LWZvbnQtd2VpZ2h0OlxuICogaW5wdXQtZ2lhbnQtdGV4dC1saW5lLWhlaWdodDpcbiAqIGlucHV0LWdpYW50LXBsYWNlaG9sZGVyLXRleHQtZm9udC1zaXplOlxuICogaW5wdXQtZ2lhbnQtcGxhY2Vob2xkZXItdGV4dC1mb250LXdlaWdodDpcbiAqIGlucHV0LWdpYW50LXBsYWNlaG9sZGVyLXRleHQtbGluZS1oZWlnaHQ6XG4gKiBpbnB1dC1naWFudC1wYWRkaW5nOlxuICogaW5wdXQtZ2lhbnQtbWF4LXdpZHRoOlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdpbnB1dFtuYklucHV0XSx0ZXh0YXJlYVtuYklucHV0XScsXG4gIHByb3ZpZGVyczogW1xuICAgIHsgcHJvdmlkZTogTmJGb3JtRmllbGRDb250cm9sLCB1c2VFeGlzdGluZzogTmJJbnB1dERpcmVjdGl2ZSB9LFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBOYklucHV0RGlyZWN0aXZlIGltcGxlbWVudHMgRG9DaGVjaywgT25DaGFuZ2VzLCBPbkluaXQsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSwgTmJGb3JtRmllbGRDb250cm9sIHtcblxuICBwcm90ZWN0ZWQgZGVzdHJveSQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gIC8qKlxuICAgKiBGaWVsZCBzaXplIG1vZGlmaWNhdGlvbnMuIFBvc3NpYmxlIHZhbHVlczogYHNtYWxsYCwgYG1lZGl1bWAgKGRlZmF1bHQpLCBgbGFyZ2VgLlxuICAgKi9cbiAgQElucHV0KClcbiAgZmllbGRTaXplOiBOYkNvbXBvbmVudFNpemUgPSAnbWVkaXVtJztcblxuICAvKipcbiAgICogRmllbGQgc3RhdHVzIChhZGRzIHNwZWNpZmljIHN0eWxlcyk6XG4gICAqIGBiYXNpY2AsIGBwcmltYXJ5YCwgYGluZm9gLCBgc3VjY2Vzc2AsIGB3YXJuaW5nYCwgYGRhbmdlcmAsIGBjb250cm9sYFxuICAgKi9cbiAgQElucHV0KCkgc3RhdHVzOiBOYkNvbXBvbmVudE9yQ3VzdG9tU3RhdHVzID0gJ2Jhc2ljJztcblxuICAvKipcbiAgICogRmllbGQgc2hhcGVzIG1vZGlmaWNhdGlvbnMuIFBvc3NpYmxlIHZhbHVlczogYHJlY3RhbmdsZWAgKGRlZmF1bHQpLCBgcm91bmRgLCBgc2VtaS1yb3VuZGAuXG4gICAqL1xuICBASW5wdXQoKVxuICBzaGFwZTogTmJDb21wb25lbnRTaGFwZSA9ICdyZWN0YW5nbGUnO1xuXG4gIC8qKlxuICAgKiBJZiBzZXQgZWxlbWVudCB3aWxsIGZpbGwgY29udGFpbmVyLiBgZmFsc2VgIGJ5IGRlZmF1bHQuXG4gICAqL1xuICBASW5wdXQoKVxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmlucHV0LWZ1bGwtd2lkdGgnKVxuICBnZXQgZnVsbFdpZHRoKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9mdWxsV2lkdGg7XG4gIH1cbiAgc2V0IGZ1bGxXaWR0aCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2Z1bGxXaWR0aCA9IGNvbnZlcnRUb0Jvb2xQcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJpdmF0ZSBfZnVsbFdpZHRoID0gZmFsc2U7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9mdWxsV2lkdGg6IE5iQm9vbGVhbklucHV0O1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MnKVxuICBnZXQgYWRkaXRpb25hbENsYXNzZXMoKTogc3RyaW5nW10ge1xuICAgIGlmICh0aGlzLnN0YXR1c1NlcnZpY2UuaXNDdXN0b21TdGF0dXModGhpcy5zdGF0dXMpKSB7XG4gICAgICByZXR1cm4gW3RoaXMuc3RhdHVzU2VydmljZS5nZXRTdGF0dXNDbGFzcyh0aGlzLnN0YXR1cyldO1xuICAgIH1cbiAgICByZXR1cm4gW107XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MSW5wdXRFbGVtZW50IHwgSFRNTFRleHRBcmVhRWxlbWVudD4sXG4gICAgcHJvdGVjdGVkIGZvY3VzTW9uaXRvcjogTmJGb2N1c01vbml0b3IsXG4gICAgcHJvdGVjdGVkIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgcHJvdGVjdGVkIHpvbmU6IE5nWm9uZSxcbiAgICBwcm90ZWN0ZWQgc3RhdHVzU2VydmljZTogTmJTdGF0dXNTZXJ2aWNlLFxuICApIHtcbiAgfVxuXG4gIG5nRG9DaGVjaygpIHtcbiAgICBjb25zdCBpc0Rpc2FibGVkID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZGlzYWJsZWQ7XG4gICAgaWYgKGlzRGlzYWJsZWQgIT09IHRoaXMuZGlzYWJsZWQkLnZhbHVlKSB7XG4gICAgICB0aGlzLmRpc2FibGVkJC5uZXh0KGlzRGlzYWJsZWQpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKHsgc3RhdHVzLCBmaWVsZFNpemUsIGZ1bGxXaWR0aCB9OiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKHN0YXR1cykge1xuICAgICAgdGhpcy5zdGF0dXMkLm5leHQodGhpcy5zdGF0dXMpO1xuICAgIH1cbiAgICBpZiAoZmllbGRTaXplKSB7XG4gICAgICB0aGlzLnNpemUkLm5leHQodGhpcy5maWVsZFNpemUpO1xuICAgIH1cbiAgICBpZiAoZnVsbFdpZHRoKSB7XG4gICAgICB0aGlzLmZ1bGxXaWR0aCQubmV4dCh0aGlzLmZ1bGxXaWR0aCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5mb2N1c01vbml0b3IubW9uaXRvcih0aGlzLmVsZW1lbnRSZWYpXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKG9yaWdpbiA9PiAhIW9yaWdpbiksXG4gICAgICAgIGZpbmFsaXplKCgpID0+IHRoaXMuZm9jdXNNb25pdG9yLnN0b3BNb25pdG9yaW5nKHRoaXMuZWxlbWVudFJlZikpLFxuICAgICAgICB0YWtlVW50aWwodGhpcy5kZXN0cm95JCksXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKHRoaXMuZm9jdXNlZCQpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIC8vIFRPRE86ICMyMjU0XG4gICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ25iLXRyYW5zaXRpb24nKTtcbiAgICB9KSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmRlc3Ryb3kkLm5leHQoKTtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3Muc2l6ZS10aW55JylcbiAgZ2V0IHRpbnkoKSB7XG4gICAgcmV0dXJuIHRoaXMuZmllbGRTaXplID09PSAndGlueSc7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnNpemUtc21hbGwnKVxuICBnZXQgc21hbGwoKSB7XG4gICAgcmV0dXJuIHRoaXMuZmllbGRTaXplID09PSAnc21hbGwnO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5zaXplLW1lZGl1bScpXG4gIGdldCBtZWRpdW0oKSB7XG4gICAgcmV0dXJuIHRoaXMuZmllbGRTaXplID09PSAnbWVkaXVtJztcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3Muc2l6ZS1sYXJnZScpXG4gIGdldCBsYXJnZSgpIHtcbiAgICByZXR1cm4gdGhpcy5maWVsZFNpemUgPT09ICdsYXJnZSc7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnNpemUtZ2lhbnQnKVxuICBnZXQgZ2lhbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZmllbGRTaXplID09PSAnZ2lhbnQnO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5zdGF0dXMtcHJpbWFyeScpXG4gIGdldCBwcmltYXJ5KCkge1xuICAgIHJldHVybiB0aGlzLnN0YXR1cyA9PT0gJ3ByaW1hcnknO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5zdGF0dXMtaW5mbycpXG4gIGdldCBpbmZvKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXR1cyA9PT0gJ2luZm8nO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5zdGF0dXMtc3VjY2VzcycpXG4gIGdldCBzdWNjZXNzKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXR1cyA9PT0gJ3N1Y2Nlc3MnO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5zdGF0dXMtd2FybmluZycpXG4gIGdldCB3YXJuaW5nKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXR1cyA9PT0gJ3dhcm5pbmcnO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5zdGF0dXMtZGFuZ2VyJylcbiAgZ2V0IGRhbmdlcigpIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0dXMgPT09ICdkYW5nZXInO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5zdGF0dXMtYmFzaWMnKVxuICBnZXQgYmFzaWMoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdHVzID09PSAnYmFzaWMnO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5zdGF0dXMtY29udHJvbCcpXG4gIGdldCBjb250cm9sKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXR1cyA9PT0gJ2NvbnRyb2wnO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5zaGFwZS1yZWN0YW5nbGUnKVxuICBnZXQgcmVjdGFuZ2xlKCkge1xuICAgIHJldHVybiB0aGlzLnNoYXBlID09PSAncmVjdGFuZ2xlJztcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3Muc2hhcGUtc2VtaS1yb3VuZCcpXG4gIGdldCBzZW1pUm91bmQoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2hhcGUgPT09ICdzZW1pLXJvdW5kJztcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3Muc2hhcGUtcm91bmQnKVxuICBnZXQgcm91bmQoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2hhcGUgPT09ICdyb3VuZCc7XG4gIH1cblxuICAvKlxuICAgKiBAZG9jcy1wcml2YXRlXG4gICAqKi9cbiAgc3RhdHVzJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8TmJDb21wb25lbnRPckN1c3RvbVN0YXR1cz4odGhpcy5zdGF0dXMpO1xuXG4gIC8qXG4gICAqIEBkb2NzLXByaXZhdGVcbiAgICoqL1xuICBzaXplJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8TmJDb21wb25lbnRTaXplPih0aGlzLmZpZWxkU2l6ZSk7XG5cbiAgLypcbiAgICogQGRvY3MtcHJpdmF0ZVxuICAgKiovXG4gIGZvY3VzZWQkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG5cbiAgLypcbiAgICogQGRvY3MtcHJpdmF0ZVxuICAgKiovXG4gIGRpc2FibGVkJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuXG4gIC8qXG4gICAqIEBkb2NzLXByaXZhdGVcbiAgICoqL1xuICBmdWxsV2lkdGgkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPih0aGlzLmZ1bGxXaWR0aCk7XG59XG4iXX0=