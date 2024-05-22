/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, HostListener, Inject, Input, Optional, Output, } from '@angular/core';
import { Subject } from 'rxjs';
import { convertToBoolProperty } from '../helpers';
import { NB_SELECT_INJECTION_TOKEN } from '../select/select-injection-tokens';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "../checkbox/checkbox.component";
// Component class scoped counter for aria attributes.
let lastOptionId = 0;
/**
 * NbOptionComponent
 *
 * @styles
 *
 * option-background-color:
 * option-text-color:
 * option-text-font-family:
 * option-hover-background-color:
 * option-hover-text-color:
 * option-active-background-color:
 * option-active-text-color:
 * option-focus-background-color:
 * option-focus-text-color:
 * option-selected-background-color:
 * option-selected-text-color:
 * option-selected-hover-background-color:
 * option-selected-hover-text-color:
 * option-selected-active-background-color:
 * option-selected-active-text-color:
 * option-selected-focus-background-color:
 * option-selected-focus-text-color:
 * option-disabled-background-color:
 * option-disabled-text-color:
 * option-tiny-text-font-size:
 * option-tiny-text-font-weight:
 * option-tiny-text-line-height:
 * option-tiny-padding:
 * option-small-text-font-size:
 * option-small-text-font-weight:
 * option-small-text-line-height:
 * option-small-padding:
 * option-medium-text-font-size:
 * option-medium-text-font-weight:
 * option-medium-text-line-height:
 * option-medium-padding:
 * option-large-text-font-size:
 * option-large-text-font-weight:
 * option-large-text-line-height:
 * option-large-padding:
 * option-giant-text-font-size:
 * option-giant-text-font-weight:
 * option-giant-text-line-height:
 * option-giant-padding:
 **/
export class NbOptionComponent {
    get disabled() {
        return this._disabled || this.disabledByGroup;
    }
    set disabled(value) {
        this._disabled = convertToBoolProperty(value);
    }
    get click() {
        return this.click$.asObservable();
    }
    constructor(parent, elementRef, cd, zone, renderer) {
        this.elementRef = elementRef;
        this.cd = cd;
        this.zone = zone;
        this.renderer = renderer;
        this.disabledByGroup = false;
        this._disabled = false;
        /**
         * Fires value when option selection change.
         * */
        this.selectionChange = new EventEmitter();
        /**
         * Fires when option clicked
         */
        this.click$ = new Subject();
        this.selected = false;
        this.alive = true;
        /**
         * Component scoped id for aria attributes.
         * */
        this.id = `nb-option-${lastOptionId++}`;
        this._active = false;
        this.parent = parent;
    }
    ngOnDestroy() {
        this.alive = false;
    }
    ngAfterViewInit() {
        // TODO: #2254
        this.zone.runOutsideAngular(() => setTimeout(() => {
            this.renderer.addClass(this.elementRef.nativeElement, 'nb-transition');
        }));
    }
    /**
     * Determines should we render checkbox.
     * */
    get withCheckbox() {
        return this.multiple && this.value != null;
    }
    get content() {
        return this.elementRef.nativeElement.textContent;
    }
    get hidden() {
        return this.elementRef.nativeElement.hidden;
    }
    // TODO: replace with isShowCheckbox property to control this behaviour outside, issues/1965
    get multiple() {
        // We check parent existing because parent can be NbSelectComponent or
        // NbAutocomplete and `miltiple` property exists only in NbSelectComponent
        return this.parent ? this.parent.multiple : false;
    }
    get selectedClass() {
        return this.selected;
    }
    get disabledAttribute() {
        return this.disabled ? '' : null;
    }
    get tabindex() {
        return '-1';
    }
    get activeClass() {
        return this._active;
    }
    onClick(event) {
        this.click$.next(this);
        // Prevent scroll on space click, etc.
        event.preventDefault();
    }
    select() {
        this.setSelection(true);
    }
    deselect() {
        this.setSelection(false);
    }
    /**
     * Sets disabled by group state and marks component for check.
     */
    setDisabledByGroupState(disabled) {
        // Check if the component still alive as the option group defer method call so the component may become destroyed.
        if (this.disabledByGroup !== disabled && this.alive) {
            this.disabledByGroup = disabled;
            this.cd.markForCheck();
        }
    }
    setSelection(selected) {
        /**
         * In case of changing options in runtime the reference to the selected option will be kept in select component.
         * This may lead to exceptions with detecting changes in destroyed component.
         *
         * Also Angular can call writeValue on destroyed view (select implements ControlValueAccessor).
         * angular/angular#27803
         * */
        if (this.alive && this.selected !== selected) {
            this.selected = selected;
            this.selectionChange.emit(this);
            this.cd.markForCheck();
        }
    }
    focus() {
        this.elementRef.nativeElement.focus();
    }
    getLabel() {
        return this.content;
    }
    setActiveStyles() {
        this._active = true;
        this.cd.markForCheck();
    }
    setInactiveStyles() {
        this._active = false;
        this.cd.markForCheck();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbOptionComponent, deps: [{ token: NB_SELECT_INJECTION_TOKEN, optional: true }, { token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: i0.NgZone }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.1.0", type: NbOptionComponent, selector: "nb-option", inputs: { value: "value", disabled: "disabled" }, outputs: { selectionChange: "selectionChange" }, host: { listeners: { "click": "onClick($event)", "keydown.space": "onClick($event)", "keydown.enter": "onClick($event)" }, properties: { "attr.id": "this.id", "class.multiple": "this.multiple", "class.selected": "this.selectedClass", "attr.disabled": "this.disabledAttribute", "tabIndex": "this.tabindex", "class.active": "this.activeClass" } }, ngImport: i0, template: `
    <nb-checkbox *ngIf="withCheckbox" [checked]="selected" [disabled]="disabled" aria-hidden="true"> </nb-checkbox>
    <ng-content></ng-content>
  `, isInline: true, styles: ["/*!\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n *//**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */:host{display:flex}:host[hidden]{display:none}:host:hover{cursor:pointer}:host nb-checkbox{display:flex;pointer-events:none}[dir=ltr] :host nb-checkbox{margin-right:.5rem}[dir=rtl] :host nb-checkbox{margin-left:.5rem}:host nb-checkbox ::ng-deep .label{padding:0}:host([disabled]){pointer-events:none}:host(.nb-transition){transition-duration:.15s;transition-property:background-color,color;transition-timing-function:ease-in}\n"], dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i2.NbCheckboxComponent, selector: "nb-checkbox", inputs: ["checked", "disabled", "status", "indeterminate"], outputs: ["checkedChange"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbOptionComponent, decorators: [{
            type: Component,
            args: [{ selector: 'nb-option', changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <nb-checkbox *ngIf="withCheckbox" [checked]="selected" [disabled]="disabled" aria-hidden="true"> </nb-checkbox>
    <ng-content></ng-content>
  `, styles: ["/*!\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n *//**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */:host{display:flex}:host[hidden]{display:none}:host:hover{cursor:pointer}:host nb-checkbox{display:flex;pointer-events:none}[dir=ltr] :host nb-checkbox{margin-right:.5rem}[dir=rtl] :host nb-checkbox{margin-left:.5rem}:host nb-checkbox ::ng-deep .label{padding:0}:host([disabled]){pointer-events:none}:host(.nb-transition){transition-duration:.15s;transition-property:background-color,color;transition-timing-function:ease-in}\n"] }]
        }], ctorParameters: () => [{ type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [NB_SELECT_INJECTION_TOKEN]
                }] }, { type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: i0.NgZone }, { type: i0.Renderer2 }], propDecorators: { value: [{
                type: Input
            }], disabled: [{
                type: Input
            }], selectionChange: [{
                type: Output
            }], id: [{
                type: HostBinding,
                args: ['attr.id']
            }], multiple: [{
                type: HostBinding,
                args: ['class.multiple']
            }], selectedClass: [{
                type: HostBinding,
                args: ['class.selected']
            }], disabledAttribute: [{
                type: HostBinding,
                args: ['attr.disabled']
            }], tabindex: [{
                type: HostBinding,
                args: ['tabIndex']
            }], activeClass: [{
                type: HostBinding,
                args: ['class.active']
            }], onClick: [{
                type: HostListener,
                args: ['click', ['$event']]
            }, {
                type: HostListener,
                args: ['keydown.space', ['$event']]
            }, {
                type: HostListener,
                args: ['keydown.enter', ['$event']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9mcmFtZXdvcmsvdGhlbWUvY29tcG9uZW50cy9vcHRpb24vb3B0aW9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUNMLHVCQUF1QixFQUV2QixTQUFTLEVBRVQsWUFBWSxFQUNaLFdBQVcsRUFDWCxZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFFTCxRQUFRLEVBQ1IsTUFBTSxHQUlQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBYyxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFLM0MsT0FBTyxFQUFFLHFCQUFxQixFQUFrQixNQUFNLFlBQVksQ0FBQztBQUduRSxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQzs7OztBQU45RSxzREFBc0Q7QUFDdEQsSUFBSSxZQUFZLEdBQVcsQ0FBQyxDQUFDO0FBUTdCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQTRDSTtBQVVKLE1BQU0sT0FBTyxpQkFBaUI7SUFRNUIsSUFDSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUM7SUFDaEQsQ0FBQztJQUNELElBQUksUUFBUSxDQUFDLEtBQWM7UUFDekIsSUFBSSxDQUFDLFNBQVMsR0FBRyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBYUQsSUFBSSxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3BDLENBQUM7SUFZRCxZQUNpRCxNQUFNLEVBQzNDLFVBQXNCLEVBQ3RCLEVBQXFCLEVBQ3JCLElBQVksRUFDWixRQUFtQjtRQUhuQixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLE9BQUUsR0FBRixF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QWlCO3NCQURwQixXQUFXO3VCQUFDLGVBQWU7Z0JBTXhCLFFBQVE7c0JBRFgsV0FBVzt1QkFBQyxVQUFVO2dCQU1uQixXQUFXO3NCQURkLFdBQVc7dUJBQUMsY0FBYztnQkFTM0IsT0FBTztzQkFITixZQUFZO3VCQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQzs7c0JBQ2hDLFlBQVk7dUJBQUMsZUFBZSxFQUFFLENBQUMsUUFBUSxDQUFDOztzQkFDeEMsWUFBWTt1QkFBQyxlQUFlLEVBQUUsQ0FBQyxRQUFRLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBBa3Zlby4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSG9zdEJpbmRpbmcsXG4gIEhvc3RMaXN0ZW5lcixcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPcHRpb25hbCxcbiAgT3V0cHV0LFxuICBBZnRlclZpZXdJbml0LFxuICBOZ1pvbmUsXG4gIFJlbmRlcmVyMixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbi8vIENvbXBvbmVudCBjbGFzcyBzY29wZWQgY291bnRlciBmb3IgYXJpYSBhdHRyaWJ1dGVzLlxubGV0IGxhc3RPcHRpb25JZDogbnVtYmVyID0gMDtcblxuaW1wb3J0IHsgY29udmVydFRvQm9vbFByb3BlcnR5LCBOYkJvb2xlYW5JbnB1dCB9IGZyb20gJy4uL2hlbHBlcnMnO1xuaW1wb3J0IHsgTmJGb2N1c2FibGVPcHRpb24gfSBmcm9tICcuLi9jZGsvYTExeS9mb2N1cy1rZXktbWFuYWdlcic7XG5pbXBvcnQgeyBOYkhpZ2hsaWdodGFibGVPcHRpb24gfSBmcm9tICcuLi9jZGsvYTExeS9kZXNjZW5kYW50LWtleS1tYW5hZ2VyJztcbmltcG9ydCB7IE5CX1NFTEVDVF9JTkpFQ1RJT05fVE9LRU4gfSBmcm9tICcuLi9zZWxlY3Qvc2VsZWN0LWluamVjdGlvbi10b2tlbnMnO1xuaW1wb3J0IHsgTmJTZWxlY3RDb21wb25lbnQgfSBmcm9tICcuLi9zZWxlY3Qvc2VsZWN0LmNvbXBvbmVudCc7XG5cbi8qKlxuICogTmJPcHRpb25Db21wb25lbnRcbiAqXG4gKiBAc3R5bGVzXG4gKlxuICogb3B0aW9uLWJhY2tncm91bmQtY29sb3I6XG4gKiBvcHRpb24tdGV4dC1jb2xvcjpcbiAqIG9wdGlvbi10ZXh0LWZvbnQtZmFtaWx5OlxuICogb3B0aW9uLWhvdmVyLWJhY2tncm91bmQtY29sb3I6XG4gKiBvcHRpb24taG92ZXItdGV4dC1jb2xvcjpcbiAqIG9wdGlvbi1hY3RpdmUtYmFja2dyb3VuZC1jb2xvcjpcbiAqIG9wdGlvbi1hY3RpdmUtdGV4dC1jb2xvcjpcbiAqIG9wdGlvbi1mb2N1cy1iYWNrZ3JvdW5kLWNvbG9yOlxuICogb3B0aW9uLWZvY3VzLXRleHQtY29sb3I6XG4gKiBvcHRpb24tc2VsZWN0ZWQtYmFja2dyb3VuZC1jb2xvcjpcbiAqIG9wdGlvbi1zZWxlY3RlZC10ZXh0LWNvbG9yOlxuICogb3B0aW9uLXNlbGVjdGVkLWhvdmVyLWJhY2tncm91bmQtY29sb3I6XG4gKiBvcHRpb24tc2VsZWN0ZWQtaG92ZXItdGV4dC1jb2xvcjpcbiAqIG9wdGlvbi1zZWxlY3RlZC1hY3RpdmUtYmFja2dyb3VuZC1jb2xvcjpcbiAqIG9wdGlvbi1zZWxlY3RlZC1hY3RpdmUtdGV4dC1jb2xvcjpcbiAqIG9wdGlvbi1zZWxlY3RlZC1mb2N1cy1iYWNrZ3JvdW5kLWNvbG9yOlxuICogb3B0aW9uLXNlbGVjdGVkLWZvY3VzLXRleHQtY29sb3I6XG4gKiBvcHRpb24tZGlzYWJsZWQtYmFja2dyb3VuZC1jb2xvcjpcbiAqIG9wdGlvbi1kaXNhYmxlZC10ZXh0LWNvbG9yOlxuICogb3B0aW9uLXRpbnktdGV4dC1mb250LXNpemU6XG4gKiBvcHRpb24tdGlueS10ZXh0LWZvbnQtd2VpZ2h0OlxuICogb3B0aW9uLXRpbnktdGV4dC1saW5lLWhlaWdodDpcbiAqIG9wdGlvbi10aW55LXBhZGRpbmc6XG4gKiBvcHRpb24tc21hbGwtdGV4dC1mb250LXNpemU6XG4gKiBvcHRpb24tc21hbGwtdGV4dC1mb250LXdlaWdodDpcbiAqIG9wdGlvbi1zbWFsbC10ZXh0LWxpbmUtaGVpZ2h0OlxuICogb3B0aW9uLXNtYWxsLXBhZGRpbmc6XG4gKiBvcHRpb24tbWVkaXVtLXRleHQtZm9udC1zaXplOlxuICogb3B0aW9uLW1lZGl1bS10ZXh0LWZvbnQtd2VpZ2h0OlxuICogb3B0aW9uLW1lZGl1bS10ZXh0LWxpbmUtaGVpZ2h0OlxuICogb3B0aW9uLW1lZGl1bS1wYWRkaW5nOlxuICogb3B0aW9uLWxhcmdlLXRleHQtZm9udC1zaXplOlxuICogb3B0aW9uLWxhcmdlLXRleHQtZm9udC13ZWlnaHQ6XG4gKiBvcHRpb24tbGFyZ2UtdGV4dC1saW5lLWhlaWdodDpcbiAqIG9wdGlvbi1sYXJnZS1wYWRkaW5nOlxuICogb3B0aW9uLWdpYW50LXRleHQtZm9udC1zaXplOlxuICogb3B0aW9uLWdpYW50LXRleHQtZm9udC13ZWlnaHQ6XG4gKiBvcHRpb24tZ2lhbnQtdGV4dC1saW5lLWhlaWdodDpcbiAqIG9wdGlvbi1naWFudC1wYWRkaW5nOlxuICoqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmItb3B0aW9uJyxcbiAgc3R5bGVVcmxzOiBbJy4vb3B0aW9uLmNvbXBvbmVudC5zY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuYi1jaGVja2JveCAqbmdJZj1cIndpdGhDaGVja2JveFwiIFtjaGVja2VkXT1cInNlbGVjdGVkXCIgW2Rpc2FibGVkXT1cImRpc2FibGVkXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+IDwvbmItY2hlY2tib3g+XG4gICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBOYk9wdGlvbkNvbXBvbmVudDxUID0gYW55PiBpbXBsZW1lbnRzIE9uRGVzdHJveSwgQWZ0ZXJWaWV3SW5pdCwgTmJGb2N1c2FibGVPcHRpb24sIE5iSGlnaGxpZ2h0YWJsZU9wdGlvbiB7XG4gIHByb3RlY3RlZCBkaXNhYmxlZEJ5R3JvdXAgPSBmYWxzZTtcblxuICAvKipcbiAgICogT3B0aW9uIHZhbHVlIHRoYXQgd2lsbCBiZSBmaXJlZCBvbiBzZWxlY3Rpb24uXG4gICAqICovXG4gIEBJbnB1dCgpIHZhbHVlOiBUO1xuXG4gIEBJbnB1dCgpXG4gIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQgfHwgdGhpcy5kaXNhYmxlZEJ5R3JvdXA7XG4gIH1cbiAgc2V0IGRpc2FibGVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fZGlzYWJsZWQgPSBjb252ZXJ0VG9Cb29sUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIHByb3RlY3RlZCBfZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2Rpc2FibGVkOiBOYkJvb2xlYW5JbnB1dDtcblxuICAvKipcbiAgICogRmlyZXMgdmFsdWUgd2hlbiBvcHRpb24gc2VsZWN0aW9uIGNoYW5nZS5cbiAgICogKi9cbiAgQE91dHB1dCgpIHNlbGVjdGlvbkNoYW5nZTogRXZlbnRFbWl0dGVyPE5iT3B0aW9uQ29tcG9uZW50PFQ+PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAvKipcbiAgICogRmlyZXMgd2hlbiBvcHRpb24gY2xpY2tlZFxuICAgKi9cbiAgcHJvdGVjdGVkIGNsaWNrJDogU3ViamVjdDxOYk9wdGlvbkNvbXBvbmVudDxUPj4gPSBuZXcgU3ViamVjdDxOYk9wdGlvbkNvbXBvbmVudDxUPj4oKTtcbiAgZ2V0IGNsaWNrKCk6IE9ic2VydmFibGU8TmJPcHRpb25Db21wb25lbnQ8VD4+IHtcbiAgICByZXR1cm4gdGhpcy5jbGljayQuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBzZWxlY3RlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBwcm90ZWN0ZWQgcGFyZW50OiBOYlNlbGVjdENvbXBvbmVudDtcbiAgcHJvdGVjdGVkIGFsaXZlOiBib29sZWFuID0gdHJ1ZTtcblxuICAvKipcbiAgICogQ29tcG9uZW50IHNjb3BlZCBpZCBmb3IgYXJpYSBhdHRyaWJ1dGVzLlxuICAgKiAqL1xuICBASG9zdEJpbmRpbmcoJ2F0dHIuaWQnKVxuICBpZDogc3RyaW5nID0gYG5iLW9wdGlvbi0ke2xhc3RPcHRpb25JZCsrfWA7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChOQl9TRUxFQ1RfSU5KRUNUSU9OX1RPS0VOKSBwYXJlbnQsXG4gICAgcHJvdGVjdGVkIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHJvdGVjdGVkIGNkOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcm90ZWN0ZWQgem9uZTogTmdab25lLFxuICAgIHByb3RlY3RlZCByZW5kZXJlcjogUmVuZGVyZXIyLFxuICApIHtcbiAgICB0aGlzLnBhcmVudCA9IHBhcmVudDtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuYWxpdmUgPSBmYWxzZTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAvLyBUT0RPOiAjMjI1NFxuICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PlxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICduYi10cmFuc2l0aW9uJyk7XG4gICAgICB9KSxcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIERldGVybWluZXMgc2hvdWxkIHdlIHJlbmRlciBjaGVja2JveC5cbiAgICogKi9cbiAgZ2V0IHdpdGhDaGVja2JveCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5tdWx0aXBsZSAmJiB0aGlzLnZhbHVlICE9IG51bGw7XG4gIH1cblxuICBnZXQgY29udGVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQudGV4dENvbnRlbnQ7XG4gIH1cblxuICBnZXQgaGlkZGVuKCkge1xuICAgIHJldHVybiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5oaWRkZW47XG4gIH1cblxuICAvLyBUT0RPOiByZXBsYWNlIHdpdGggaXNTaG93Q2hlY2tib3ggcHJvcGVydHkgdG8gY29udHJvbCB0aGlzIGJlaGF2aW91ciBvdXRzaWRlLCBpc3N1ZXMvMTk2NVxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLm11bHRpcGxlJylcbiAgZ2V0IG11bHRpcGxlKCkge1xuICAgIC8vIFdlIGNoZWNrIHBhcmVudCBleGlzdGluZyBiZWNhdXNlIHBhcmVudCBjYW4gYmUgTmJTZWxlY3RDb21wb25lbnQgb3JcbiAgICAvLyBOYkF1dG9jb21wbGV0ZSBhbmQgYG1pbHRpcGxlYCBwcm9wZXJ0eSBleGlzdHMgb25seSBpbiBOYlNlbGVjdENvbXBvbmVudFxuICAgIHJldHVybiB0aGlzLnBhcmVudCA/ICh0aGlzLnBhcmVudCBhcyBOYlNlbGVjdENvbXBvbmVudCkubXVsdGlwbGUgOiBmYWxzZTtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3Muc2VsZWN0ZWQnKVxuICBnZXQgc2VsZWN0ZWRDbGFzcygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5zZWxlY3RlZDtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnYXR0ci5kaXNhYmxlZCcpXG4gIGdldCBkaXNhYmxlZEF0dHJpYnV0ZSgpOiAnJyB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLmRpc2FibGVkID8gJycgOiBudWxsO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCd0YWJJbmRleCcpXG4gIGdldCB0YWJpbmRleCgpIHtcbiAgICByZXR1cm4gJy0xJztcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3MuYWN0aXZlJylcbiAgZ2V0IGFjdGl2ZUNsYXNzKCkge1xuICAgIHJldHVybiB0aGlzLl9hY3RpdmU7XG4gIH1cbiAgcHJvdGVjdGVkIF9hY3RpdmU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pXG4gIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24uc3BhY2UnLCBbJyRldmVudCddKVxuICBASG9zdExpc3RlbmVyKCdrZXlkb3duLmVudGVyJywgWyckZXZlbnQnXSlcbiAgb25DbGljayhldmVudCkge1xuICAgIHRoaXMuY2xpY2skLm5leHQodGhpcyk7XG5cbiAgICAvLyBQcmV2ZW50IHNjcm9sbCBvbiBzcGFjZSBjbGljaywgZXRjLlxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIH1cblxuICBzZWxlY3QoKSB7XG4gICAgdGhpcy5zZXRTZWxlY3Rpb24odHJ1ZSk7XG4gIH1cblxuICBkZXNlbGVjdCgpIHtcbiAgICB0aGlzLnNldFNlbGVjdGlvbihmYWxzZSk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyBkaXNhYmxlZCBieSBncm91cCBzdGF0ZSBhbmQgbWFya3MgY29tcG9uZW50IGZvciBjaGVjay5cbiAgICovXG4gIHNldERpc2FibGVkQnlHcm91cFN0YXRlKGRpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgLy8gQ2hlY2sgaWYgdGhlIGNvbXBvbmVudCBzdGlsbCBhbGl2ZSBhcyB0aGUgb3B0aW9uIGdyb3VwIGRlZmVyIG1ldGhvZCBjYWxsIHNvIHRoZSBjb21wb25lbnQgbWF5IGJlY29tZSBkZXN0cm95ZWQuXG4gICAgaWYgKHRoaXMuZGlzYWJsZWRCeUdyb3VwICE9PSBkaXNhYmxlZCAmJiB0aGlzLmFsaXZlKSB7XG4gICAgICB0aGlzLmRpc2FibGVkQnlHcm91cCA9IGRpc2FibGVkO1xuICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgc2V0U2VsZWN0aW9uKHNlbGVjdGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgLyoqXG4gICAgICogSW4gY2FzZSBvZiBjaGFuZ2luZyBvcHRpb25zIGluIHJ1bnRpbWUgdGhlIHJlZmVyZW5jZSB0byB0aGUgc2VsZWN0ZWQgb3B0aW9uIHdpbGwgYmUga2VwdCBpbiBzZWxlY3QgY29tcG9uZW50LlxuICAgICAqIFRoaXMgbWF5IGxlYWQgdG8gZXhjZXB0aW9ucyB3aXRoIGRldGVjdGluZyBjaGFuZ2VzIGluIGRlc3Ryb3llZCBjb21wb25lbnQuXG4gICAgICpcbiAgICAgKiBBbHNvIEFuZ3VsYXIgY2FuIGNhbGwgd3JpdGVWYWx1ZSBvbiBkZXN0cm95ZWQgdmlldyAoc2VsZWN0IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IpLlxuICAgICAqIGFuZ3VsYXIvYW5ndWxhciMyNzgwM1xuICAgICAqICovXG4gICAgaWYgKHRoaXMuYWxpdmUgJiYgdGhpcy5zZWxlY3RlZCAhPT0gc2VsZWN0ZWQpIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWQgPSBzZWxlY3RlZDtcbiAgICAgIHRoaXMuc2VsZWN0aW9uQ2hhbmdlLmVtaXQodGhpcyk7XG4gICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cbiAgfVxuXG4gIGZvY3VzKCk6IHZvaWQge1xuICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gIH1cblxuICBnZXRMYWJlbCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmNvbnRlbnQ7XG4gIH1cblxuICBzZXRBY3RpdmVTdHlsZXMoKTogdm9pZCB7XG4gICAgdGhpcy5fYWN0aXZlID0gdHJ1ZTtcbiAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgc2V0SW5hY3RpdmVTdHlsZXMoKTogdm9pZCB7XG4gICAgdGhpcy5fYWN0aXZlID0gZmFsc2U7XG4gICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgfVxufVxuIl19