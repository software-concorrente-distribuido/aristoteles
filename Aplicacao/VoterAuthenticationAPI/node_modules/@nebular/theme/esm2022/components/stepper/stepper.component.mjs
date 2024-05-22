/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, ContentChildren, EventEmitter, HostBinding, Input, Output, } from '@angular/core';
import { convertToBoolProperty } from '../helpers';
import { NB_STEPPER } from './stepper-tokens';
import { NbStepComponent } from './step.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "../icon/icon.component";
/**
 * Stepper component
 *
 * @stacked-example(Showcase, stepper/stepper-showcase.component)
 *
 * ### Installation
 *
 * Import `NbStepperModule` to your feature module.
 * ```ts
 * @NgModule({
 *   imports: [
 *     // ...
 *     NbStepperModule,
 *   ],
 * })
 * export class PageModule { }
 * ```
 * ### Usage
 *
 * If step label is string you can pass it as `label` attribute. Otherwise ng-template should be used:
 * ```html
 * // ...
 * <nb-stepper orientation="horizontal">
 *   <nb-step label="step number one">
 *       // ... step content here
 *   </nb-step>
 *   <nb-step label="stepLabel">
 *       <ng-template #stepLabel>
 *           <div>
 *               step number two
 *           </div>
 *       </ng-template>
 *       // ... step content here
 *   </nb-step>
 * </nb-stepper>
 * ```
 *
 * When linear mode enabled user can't move forward unless current step is complete.
 * @stacked-example(Linear, stepper/stepper-linear.component)
 *
 * Specify `[stepControl]="form"` and stepper allow go to the next step only if form is valid.
 * You can disable it via `linear` mode setting.
 * ```html
 * // ...
 * <nb-stepper  orientation="horizontal">
 *   <nb-step label="step number one" [stepControl]="form">
 *     <form [formGroup]="form">
 *       // ...
 *     </form>
 *   </nb-step>
 *    // ...
 * </nb-stepper>
 * ```
 *
 * @stacked-example(Validation, stepper/stepper-validation.component)
 *
 * Stepper component has two layout options - `vertical` & `horizontal`
 * @stacked-example(Vertical, stepper/stepper-vertical.component)
 *
 * `disableStepNavigation` disables navigation by clicking on steps, so user can navigate only using
 * 'nbStepperPrevious' and 'nbStepperNext' buttons.
 * @stacked-example(Disabled steps navigation, stepper/stepper-disabled-step-nav.component)
 *
 * Use `stepChange` output to listening to step change event. This event emits `NbStepChangeEvent` object.
 * @stacked-example(Step change event, stepper/stepper-step-change-event.component)
 *
 * @styles
 *
 * stepper-step-text-color:
 * stepper-step-text-font-family:
 * stepper-step-text-font-size:
 * stepper-step-text-font-weight:
 * stepper-step-text-line-height:
 * stepper-step-active-text-color:
 * stepper-step-completed-text-color:
 * stepper-step-index-border-color:
 * stepper-step-index-border-style:
 * stepper-step-index-border-width:
 * stepper-step-index-border-radius:
 * stepper-step-index-width:
 * stepper-step-index-active-border-color:
 * stepper-step-index-completed-background-color:
 * stepper-step-index-completed-border-color:
 * stepper-step-index-completed-text-color:
 * stepper-connector-background-color:
 * stepper-connector-completed-background-color:
 * stepper-horizontal-connector-margin:
 * stepper-vertical-connector-margin:
 * stepper-step-content-padding:
 */
export class NbStepperComponent {
    constructor() {
        this._selectedIndex = 0;
        this._disableStepNavigation = false;
        /**
         * Stepper orientation - `horizontal`|`vertical`
         */
        this.orientation = 'horizontal';
        this._linear = true;
        /**
         * Emits when step changed
         * @type {EventEmitter<NbStepChangeEvent>}
         */
        this.stepChange = new EventEmitter();
    }
    /**
     * Selected step index
     */
    get selectedIndex() {
        return this._selectedIndex;
    }
    set selectedIndex(index) {
        if (!this.steps) {
            this._selectedIndex = index;
            return;
        }
        this.markCurrentStepInteracted();
        if (this.canBeSelected(index)) {
            const previouslySelectedIndex = this._selectedIndex;
            const previouslySelectedStep = this.selected;
            this._selectedIndex = index;
            this.stepChange.emit({
                index: this.selectedIndex,
                step: this.selected,
                previouslySelectedIndex,
                previouslySelectedStep,
            });
        }
    }
    /**
     * Disables navigation by clicking on steps. False by default
     * @param {boolean} value
     */
    set disableStepNavigation(value) {
        this._disableStepNavigation = convertToBoolProperty(value);
    }
    get disableStepNavigation() {
        return this._disableStepNavigation;
    }
    /**
     * Selected step component
     */
    get selected() {
        return this.steps ? this.steps.toArray()[this.selectedIndex] : undefined;
    }
    set selected(step) {
        if (!this.steps) {
            return;
        }
        this.selectedIndex = this.steps.toArray().indexOf(step);
    }
    /**
     * Allow moving forward only if the current step is complete
     * @default true
     */
    set linear(value) {
        this._linear = convertToBoolProperty(value);
    }
    get linear() {
        return this._linear;
    }
    get vertical() {
        return this.orientation === 'vertical';
    }
    get horizontal() {
        return this.orientation === 'horizontal';
    }
    /**
     * Navigate to next step
     * */
    next() {
        this.selectedIndex = Math.min(this.selectedIndex + 1, this.steps.length - 1);
    }
    /**
     * Navigate to previous step
     * */
    previous() {
        this.selectedIndex = Math.max(this.selectedIndex - 1, 0);
    }
    /**
     * Select step if navigation is not disabled
     * @param { NbStepComponent } step
     */
    changeStep(step) {
        if (!this.disableStepNavigation) {
            step.select();
        }
    }
    /**
     * Reset stepper and stepControls to initial state
     * */
    reset() {
        const previouslySelectedIndex = this.selectedIndex;
        const previouslySelectedStep = this.selected;
        this._selectedIndex = 0;
        this.steps.forEach((step) => step.reset());
        this.stepChange.emit({
            index: this.selectedIndex,
            step: this.selected,
            previouslySelectedIndex,
            previouslySelectedStep,
        });
    }
    isStepSelected(step) {
        return this.selected === step;
    }
    /*
     * @docs-private
     **/
    getStepTemplate(step) {
        if (step.isLabelTemplate) {
            return step.label;
        }
        return null;
    }
    isStepValid(index) {
        return this.steps.toArray()[index].completed;
    }
    canBeSelected(indexToCheck) {
        const noSteps = !this.steps || this.steps.length === 0;
        if (noSteps || indexToCheck < 0 || indexToCheck >= this.steps.length || indexToCheck === this.selectedIndex) {
            return false;
        }
        if (indexToCheck <= this.selectedIndex || !this.linear) {
            return true;
        }
        let isAllStepsValid = true;
        for (let i = this.selectedIndex; i < indexToCheck; i++) {
            if (!this.isStepValid(i)) {
                isAllStepsValid = false;
                break;
            }
        }
        return isAllStepsValid;
    }
    markCurrentStepInteracted() {
        if (this.selected) {
            this.selected.interacted = true;
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbStepperComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.1.0", type: NbStepperComponent, selector: "nb-stepper", inputs: { selectedIndex: "selectedIndex", disableStepNavigation: "disableStepNavigation", selected: "selected", orientation: "orientation", linear: "linear" }, outputs: { stepChange: "stepChange" }, host: { properties: { "class.vertical": "this.vertical", "class.horizontal": "this.horizontal" } }, providers: [{ provide: NB_STEPPER, useExisting: NbStepperComponent }], queries: [{ propertyName: "steps", predicate: NbStepComponent }], ngImport: i0, template: "<ng-template><ng-content select=\"nb-step\"></ng-content></ng-template>\n<div class=\"header\">\n  <ng-container *ngFor=\"let step of steps; let index = index; let first = first\">\n\n    <div *ngIf=\"!first && !step.hidden\"\n         [class.connector-past]=\"index <= selectedIndex\"\n         class=\"connector\"></div>\n\n    <div *ngIf=\"!step.hidden\" class=\"step\"\n         [class.selected]=\"isStepSelected(step)\"\n         [class.completed]=\"!isStepSelected(step) && step.completed\"\n         [class.noninteractive]=\"disableStepNavigation\"\n         (click)=\"changeStep(step)\">\n      <div class=\"label-index\">\n        <span *ngIf=\"!step.completed || isStepSelected(step)\">{{ index + 1 }}</span>\n        <nb-icon *ngIf=\"!isStepSelected(step) && step.completed\" icon=\"checkmark-outline\" pack=\"nebular-essentials\">\n        </nb-icon>\n      </div>\n      <div class=\"label\">\n        <ng-container *ngIf=\"step.isLabelTemplate\">\n          <ng-container *ngTemplateOutlet=\"getStepTemplate(step)\"></ng-container>\n        </ng-container>\n        <span *ngIf=\"!step.isLabelTemplate\">{{ step.label }}</span>\n      </div>\n    </div>\n  </ng-container>\n</div>\n<div class=\"step-content\">\n  <ng-container [ngTemplateOutlet]=\"selected?.content\"></ng-container>\n</div>\n", styles: [":host(.horizontal) .header .step{flex-direction:column}:host(.horizontal) .header .connector{height:2px}:host(.horizontal) .label-index{margin-bottom:10px}:host(.vertical){display:flex;height:100%}:host(.vertical) .header{flex-direction:column}:host(.vertical) .header .label{margin:0 10px}:host(.vertical) .header .connector{width:2px}.header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px}.header .connector{flex:auto}.header .step{display:flex;align-items:center;cursor:pointer}.header .step.noninteractive{cursor:default}.header .label-index{display:flex;justify-content:center;align-items:center}.header .label{width:max-content}\n"], dependencies: [{ kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "component", type: i2.NbIconComponent, selector: "nb-icon", inputs: ["icon", "pack", "options", "status", "config"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbStepperComponent, decorators: [{
            type: Component,
            args: [{ selector: 'nb-stepper', providers: [{ provide: NB_STEPPER, useExisting: NbStepperComponent }], template: "<ng-template><ng-content select=\"nb-step\"></ng-content></ng-template>\n<div class=\"header\">\n  <ng-container *ngFor=\"let step of steps; let index = index; let first = first\">\n\n    <div *ngIf=\"!first && !step.hidden\"\n         [class.connector-past]=\"index <= selectedIndex\"\n         class=\"connector\"></div>\n\n    <div *ngIf=\"!step.hidden\" class=\"step\"\n         [class.selected]=\"isStepSelected(step)\"\n         [class.completed]=\"!isStepSelected(step) && step.completed\"\n         [class.noninteractive]=\"disableStepNavigation\"\n         (click)=\"changeStep(step)\">\n      <div class=\"label-index\">\n        <span *ngIf=\"!step.completed || isStepSelected(step)\">{{ index + 1 }}</span>\n        <nb-icon *ngIf=\"!isStepSelected(step) && step.completed\" icon=\"checkmark-outline\" pack=\"nebular-essentials\">\n        </nb-icon>\n      </div>\n      <div class=\"label\">\n        <ng-container *ngIf=\"step.isLabelTemplate\">\n          <ng-container *ngTemplateOutlet=\"getStepTemplate(step)\"></ng-container>\n        </ng-container>\n        <span *ngIf=\"!step.isLabelTemplate\">{{ step.label }}</span>\n      </div>\n    </div>\n  </ng-container>\n</div>\n<div class=\"step-content\">\n  <ng-container [ngTemplateOutlet]=\"selected?.content\"></ng-container>\n</div>\n", styles: [":host(.horizontal) .header .step{flex-direction:column}:host(.horizontal) .header .connector{height:2px}:host(.horizontal) .label-index{margin-bottom:10px}:host(.vertical){display:flex;height:100%}:host(.vertical) .header{flex-direction:column}:host(.vertical) .header .label{margin:0 10px}:host(.vertical) .header .connector{width:2px}.header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px}.header .connector{flex:auto}.header .step{display:flex;align-items:center;cursor:pointer}.header .step.noninteractive{cursor:default}.header .label-index{display:flex;justify-content:center;align-items:center}.header .label{width:max-content}\n"] }]
        }], propDecorators: { selectedIndex: [{
                type: Input
            }], disableStepNavigation: [{
                type: Input
            }], selected: [{
                type: Input
            }], orientation: [{
                type: Input
            }], linear: [{
                type: Input
            }], stepChange: [{
                type: Output
            }], vertical: [{
                type: HostBinding,
                args: ['class.vertical']
            }], horizontal: [{
                type: HostBinding,
                args: ['class.horizontal']
            }], steps: [{
                type: ContentChildren,
                args: [NbStepComponent]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlcHBlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvZnJhbWV3b3JrL3RoZW1lL2NvbXBvbmVudHMvc3RlcHBlci9zdGVwcGVyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uL3NyYy9mcmFtZXdvcmsvdGhlbWUvY29tcG9uZW50cy9zdGVwcGVyL3N0ZXBwZXIuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFDTCxTQUFTLEVBQ1QsZUFBZSxFQUNmLFlBQVksRUFDWixXQUFXLEVBQ1gsS0FBSyxFQUNMLE1BQU0sR0FHUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUscUJBQXFCLEVBQWtCLE1BQU0sWUFBWSxDQUFDO0FBQ25FLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUM5QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7Ozs7QUFXbkQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUZHO0FBT0gsTUFBTSxPQUFPLGtCQUFrQjtJQU4vQjtRQW1DWSxtQkFBYyxHQUFXLENBQUMsQ0FBQztRQWEzQiwyQkFBc0IsR0FBWSxLQUFLLENBQUM7UUFpQmxEOztXQUVHO1FBQ00sZ0JBQVcsR0FBeUIsWUFBWSxDQUFDO1FBYWhELFlBQU8sR0FBRyxJQUFJLENBQUM7UUFHekI7OztXQUdHO1FBQ08sZUFBVSxHQUFHLElBQUksWUFBWSxFQUFxQixDQUFDO0tBa0c5RDtJQW5MQzs7T0FFRztJQUNILElBQ0ksYUFBYTtRQUNmLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQztJQUM3QixDQUFDO0lBQ0QsSUFBSSxhQUFhLENBQUMsS0FBYTtRQUM3QixJQUFJLENBQUMs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bGwgUmlnaHRzIFJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqL1xuXG5pbXBvcnQge1xuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0QmluZGluZyxcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgUXVlcnlMaXN0LFxuICBUZW1wbGF0ZVJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBjb252ZXJ0VG9Cb29sUHJvcGVydHksIE5iQm9vbGVhbklucHV0IH0gZnJvbSAnLi4vaGVscGVycyc7XG5pbXBvcnQgeyBOQl9TVEVQUEVSIH0gZnJvbSAnLi9zdGVwcGVyLXRva2Vucyc7XG5pbXBvcnQgeyBOYlN0ZXBDb21wb25lbnQgfSBmcm9tICcuL3N0ZXAuY29tcG9uZW50JztcblxuZXhwb3J0IHR5cGUgTmJTdGVwcGVyT3JpZW50YXRpb24gPSAndmVydGljYWwnIHwgJ2hvcml6b250YWwnO1xuXG5leHBvcnQgaW50ZXJmYWNlIE5iU3RlcENoYW5nZUV2ZW50IHtcbiAgaW5kZXg6IG51bWJlcjtcbiAgc3RlcDogTmJTdGVwQ29tcG9uZW50O1xuICBwcmV2aW91c2x5U2VsZWN0ZWRJbmRleDogbnVtYmVyO1xuICBwcmV2aW91c2x5U2VsZWN0ZWRTdGVwOiBOYlN0ZXBDb21wb25lbnQ7XG59XG5cbi8qKlxuICogU3RlcHBlciBjb21wb25lbnRcbiAqXG4gKiBAc3RhY2tlZC1leGFtcGxlKFNob3djYXNlLCBzdGVwcGVyL3N0ZXBwZXItc2hvd2Nhc2UuY29tcG9uZW50KVxuICpcbiAqICMjIyBJbnN0YWxsYXRpb25cbiAqXG4gKiBJbXBvcnQgYE5iU3RlcHBlck1vZHVsZWAgdG8geW91ciBmZWF0dXJlIG1vZHVsZS5cbiAqIGBgYHRzXG4gKiBATmdNb2R1bGUoe1xuICogICBpbXBvcnRzOiBbXG4gKiAgICAgLy8gLi4uXG4gKiAgICAgTmJTdGVwcGVyTW9kdWxlLFxuICogICBdLFxuICogfSlcbiAqIGV4cG9ydCBjbGFzcyBQYWdlTW9kdWxlIHsgfVxuICogYGBgXG4gKiAjIyMgVXNhZ2VcbiAqXG4gKiBJZiBzdGVwIGxhYmVsIGlzIHN0cmluZyB5b3UgY2FuIHBhc3MgaXQgYXMgYGxhYmVsYCBhdHRyaWJ1dGUuIE90aGVyd2lzZSBuZy10ZW1wbGF0ZSBzaG91bGQgYmUgdXNlZDpcbiAqIGBgYGh0bWxcbiAqIC8vIC4uLlxuICogPG5iLXN0ZXBwZXIgb3JpZW50YXRpb249XCJob3Jpem9udGFsXCI+XG4gKiAgIDxuYi1zdGVwIGxhYmVsPVwic3RlcCBudW1iZXIgb25lXCI+XG4gKiAgICAgICAvLyAuLi4gc3RlcCBjb250ZW50IGhlcmVcbiAqICAgPC9uYi1zdGVwPlxuICogICA8bmItc3RlcCBsYWJlbD1cInN0ZXBMYWJlbFwiPlxuICogICAgICAgPG5nLXRlbXBsYXRlICNzdGVwTGFiZWw+XG4gKiAgICAgICAgICAgPGRpdj5cbiAqICAgICAgICAgICAgICAgc3RlcCBudW1iZXIgdHdvXG4gKiAgICAgICAgICAgPC9kaXY+XG4gKiAgICAgICA8L25nLXRlbXBsYXRlPlxuICogICAgICAgLy8gLi4uIHN0ZXAgY29udGVudCBoZXJlXG4gKiAgIDwvbmItc3RlcD5cbiAqIDwvbmItc3RlcHBlcj5cbiAqIGBgYFxuICpcbiAqIFdoZW4gbGluZWFyIG1vZGUgZW5hYmxlZCB1c2VyIGNhbid0IG1vdmUgZm9yd2FyZCB1bmxlc3MgY3VycmVudCBzdGVwIGlzIGNvbXBsZXRlLlxuICogQHN0YWNrZWQtZXhhbXBsZShMaW5lYXIsIHN0ZXBwZXIvc3RlcHBlci1saW5lYXIuY29tcG9uZW50KVxuICpcbiAqIFNwZWNpZnkgYFtzdGVwQ29udHJvbF09XCJmb3JtXCJgIGFuZCBzdGVwcGVyIGFsbG93IGdvIHRvIHRoZSBuZXh0IHN0ZXAgb25seSBpZiBmb3JtIGlzIHZhbGlkLlxuICogWW91IGNhbiBkaXNhYmxlIGl0IHZpYSBgbGluZWFyYCBtb2RlIHNldHRpbmcuXG4gKiBgYGBodG1sXG4gKiAvLyAuLi5cbiAqIDxuYi1zdGVwcGVyICBvcmllbnRhdGlvbj1cImhvcml6b250YWxcIj5cbiAqICAgPG5iLXN0ZXAgbGFiZWw9XCJzdGVwIG51bWJlciBvbmVcIiBbc3RlcENvbnRyb2xdPVwiZm9ybVwiPlxuICogICAgIDxmb3JtIFtmb3JtR3JvdXBdPVwiZm9ybVwiPlxuICogICAgICAgLy8gLi4uXG4gKiAgICAgPC9mb3JtPlxuICogICA8L25iLXN0ZXA+XG4gKiAgICAvLyAuLi5cbiAqIDwvbmItc3RlcHBlcj5cbiAqIGBgYFxuICpcbiAqIEBzdGFja2VkLWV4YW1wbGUoVmFsaWRhdGlvbiwgc3RlcHBlci9zdGVwcGVyLXZhbGlkYXRpb24uY29tcG9uZW50KVxuICpcbiAqIFN0ZXBwZXIgY29tcG9uZW50IGhhcyB0d28gbGF5b3V0IG9wdGlvbnMgLSBgdmVydGljYWxgICYgYGhvcml6b250YWxgXG4gKiBAc3RhY2tlZC1leGFtcGxlKFZlcnRpY2FsLCBzdGVwcGVyL3N0ZXBwZXItdmVydGljYWwuY29tcG9uZW50KVxuICpcbiAqIGBkaXNhYmxlU3RlcE5hdmlnYXRpb25gIGRpc2FibGVzIG5hdmlnYXRpb24gYnkgY2xpY2tpbmcgb24gc3RlcHMsIHNvIHVzZXIgY2FuIG5hdmlnYXRlIG9ubHkgdXNpbmdcbiAqICduYlN0ZXBwZXJQcmV2aW91cycgYW5kICduYlN0ZXBwZXJOZXh0JyBidXR0b25zLlxuICogQHN0YWNrZWQtZXhhbXBsZShEaXNhYmxlZCBzdGVwcyBuYXZpZ2F0aW9uLCBzdGVwcGVyL3N0ZXBwZXItZGlzYWJsZWQtc3RlcC1uYXYuY29tcG9uZW50KVxuICpcbiAqIFVzZSBgc3RlcENoYW5nZWAgb3V0cHV0IHRvIGxpc3RlbmluZyB0byBzdGVwIGNoYW5nZSBldmVudC4gVGhpcyBldmVudCBlbWl0cyBgTmJTdGVwQ2hhbmdlRXZlbnRgIG9iamVjdC5cbiAqIEBzdGFja2VkLWV4YW1wbGUoU3RlcCBjaGFuZ2UgZXZlbnQsIHN0ZXBwZXIvc3RlcHBlci1zdGVwLWNoYW5nZS1ldmVudC5jb21wb25lbnQpXG4gKlxuICogQHN0eWxlc1xuICpcbiAqIHN0ZXBwZXItc3RlcC10ZXh0LWNvbG9yOlxuICogc3RlcHBlci1zdGVwLXRleHQtZm9udC1mYW1pbHk6XG4gKiBzdGVwcGVyLXN0ZXAtdGV4dC1mb250LXNpemU6XG4gKiBzdGVwcGVyLXN0ZXAtdGV4dC1mb250LXdlaWdodDpcbiAqIHN0ZXBwZXItc3RlcC10ZXh0LWxpbmUtaGVpZ2h0OlxuICogc3RlcHBlci1zdGVwLWFjdGl2ZS10ZXh0LWNvbG9yOlxuICogc3RlcHBlci1zdGVwLWNvbXBsZXRlZC10ZXh0LWNvbG9yOlxuICogc3RlcHBlci1zdGVwLWluZGV4LWJvcmRlci1jb2xvcjpcbiAqIHN0ZXBwZXItc3RlcC1pbmRleC1ib3JkZXItc3R5bGU6XG4gKiBzdGVwcGVyLXN0ZXAtaW5kZXgtYm9yZGVyLXdpZHRoOlxuICogc3RlcHBlci1zdGVwLWluZGV4LWJvcmRlci1yYWRpdXM6XG4gKiBzdGVwcGVyLXN0ZXAtaW5kZXgtd2lkdGg6XG4gKiBzdGVwcGVyLXN0ZXAtaW5kZXgtYWN0aXZlLWJvcmRlci1jb2xvcjpcbiAqIHN0ZXBwZXItc3RlcC1pbmRleC1jb21wbGV0ZWQtYmFja2dyb3VuZC1jb2xvcjpcbiAqIHN0ZXBwZXItc3RlcC1pbmRleC1jb21wbGV0ZWQtYm9yZGVyLWNvbG9yOlxuICogc3RlcHBlci1zdGVwLWluZGV4LWNvbXBsZXRlZC10ZXh0LWNvbG9yOlxuICogc3RlcHBlci1jb25uZWN0b3ItYmFja2dyb3VuZC1jb2xvcjpcbiAqIHN0ZXBwZXItY29ubmVjdG9yLWNvbXBsZXRlZC1iYWNrZ3JvdW5kLWNvbG9yOlxuICogc3RlcHBlci1ob3Jpem9udGFsLWNvbm5lY3Rvci1tYXJnaW46XG4gKiBzdGVwcGVyLXZlcnRpY2FsLWNvbm5lY3Rvci1tYXJnaW46XG4gKiBzdGVwcGVyLXN0ZXAtY29udGVudC1wYWRkaW5nOlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduYi1zdGVwcGVyJyxcbiAgc3R5bGVVcmxzOiBbJy4vc3RlcHBlci5jb21wb25lbnQuc2NzcyddLFxuICB0ZW1wbGF0ZVVybDogJy4vc3RlcHBlci5jb21wb25lbnQuaHRtbCcsXG4gIHByb3ZpZGVyczogW3sgcHJvdmlkZTogTkJfU1RFUFBFUiwgdXNlRXhpc3Rpbmc6IE5iU3RlcHBlckNvbXBvbmVudCB9XSxcbn0pXG5leHBvcnQgY2xhc3MgTmJTdGVwcGVyQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIFNlbGVjdGVkIHN0ZXAgaW5kZXhcbiAgICovXG4gIEBJbnB1dCgpXG4gIGdldCBzZWxlY3RlZEluZGV4KCkge1xuICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZEluZGV4O1xuICB9XG4gIHNldCBzZWxlY3RlZEluZGV4KGluZGV4OiBudW1iZXIpIHtcbiAgICBpZiAoIXRoaXMuc3RlcHMpIHtcbiAgICAgIHRoaXMuX3NlbGVjdGVkSW5kZXggPSBpbmRleDtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLm1hcmtDdXJyZW50U3RlcEludGVyYWN0ZWQoKTtcbiAgICBpZiAodGhpcy5jYW5CZVNlbGVjdGVkKGluZGV4KSkge1xuICAgICAgY29uc3QgcHJldmlvdXNseVNlbGVjdGVkSW5kZXggPSB0aGlzLl9zZWxlY3RlZEluZGV4O1xuICAgICAgY29uc3QgcHJldmlvdXNseVNlbGVjdGVkU3RlcCA9IHRoaXMuc2VsZWN0ZWQ7XG4gICAgICB0aGlzLl9zZWxlY3RlZEluZGV4ID0gaW5kZXg7XG5cbiAgICAgIHRoaXMuc3RlcENoYW5nZS5lbWl0KHtcbiAgICAgICAgaW5kZXg6IHRoaXMuc2VsZWN0ZWRJbmRleCxcbiAgICAgICAgc3RlcDogdGhpcy5zZWxlY3RlZCxcbiAgICAgICAgcHJldmlvdXNseVNlbGVjdGVkSW5kZXgsXG4gICAgICAgIHByZXZpb3VzbHlTZWxlY3RlZFN0ZXAsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgX3NlbGVjdGVkSW5kZXg6IG51bWJlciA9IDA7XG5cbiAgLyoqXG4gICAqIERpc2FibGVzIG5hdmlnYXRpb24gYnkgY2xpY2tpbmcgb24gc3RlcHMuIEZhbHNlIGJ5IGRlZmF1bHRcbiAgICogQHBhcmFtIHtib29sZWFufSB2YWx1ZVxuICAgKi9cbiAgQElucHV0KClcbiAgc2V0IGRpc2FibGVTdGVwTmF2aWdhdGlvbih2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2Rpc2FibGVTdGVwTmF2aWdhdGlvbiA9IGNvbnZlcnRUb0Jvb2xQcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgZ2V0IGRpc2FibGVTdGVwTmF2aWdhdGlvbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZGlzYWJsZVN0ZXBOYXZpZ2F0aW9uO1xuICB9XG4gIHByb3RlY3RlZCBfZGlzYWJsZVN0ZXBOYXZpZ2F0aW9uOiBib29sZWFuID0gZmFsc2U7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9kaXNhYmxlU3RlcE5hdmlnYXRpb246IE5iQm9vbGVhbklucHV0O1xuXG4gIC8qKlxuICAgKiBTZWxlY3RlZCBzdGVwIGNvbXBvbmVudFxuICAgKi9cbiAgQElucHV0KClcbiAgZ2V0IHNlbGVjdGVkKCk6IE5iU3RlcENvbXBvbmVudCB7XG4gICAgcmV0dXJuIHRoaXMuc3RlcHMgPyB0aGlzLnN0ZXBzLnRvQXJyYXkoKVt0aGlzLnNlbGVjdGVkSW5kZXhdIDogdW5kZWZpbmVkO1xuICB9XG4gIHNldCBzZWxlY3RlZChzdGVwOiBOYlN0ZXBDb21wb25lbnQpIHtcbiAgICBpZiAoIXRoaXMuc3RlcHMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5zZWxlY3RlZEluZGV4ID0gdGhpcy5zdGVwcy50b0FycmF5KCkuaW5kZXhPZihzdGVwKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdGVwcGVyIG9yaWVudGF0aW9uIC0gYGhvcml6b250YWxgfGB2ZXJ0aWNhbGBcbiAgICovXG4gIEBJbnB1dCgpIG9yaWVudGF0aW9uOiBOYlN0ZXBwZXJPcmllbnRhdGlvbiA9ICdob3Jpem9udGFsJztcblxuICAvKipcbiAgICogQWxsb3cgbW92aW5nIGZvcndhcmQgb25seSBpZiB0aGUgY3VycmVudCBzdGVwIGlzIGNvbXBsZXRlXG4gICAqIEBkZWZhdWx0IHRydWVcbiAgICovXG4gIEBJbnB1dCgpXG4gIHNldCBsaW5lYXIodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9saW5lYXIgPSBjb252ZXJ0VG9Cb29sUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIGdldCBsaW5lYXIoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2xpbmVhcjtcbiAgfVxuICBwcm90ZWN0ZWQgX2xpbmVhciA9IHRydWU7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9saW5lYXI6IE5iQm9vbGVhbklucHV0O1xuXG4gIC8qKlxuICAgKiBFbWl0cyB3aGVuIHN0ZXAgY2hhbmdlZFxuICAgKiBAdHlwZSB7RXZlbnRFbWl0dGVyPE5iU3RlcENoYW5nZUV2ZW50Pn1cbiAgICovXG4gIEBPdXRwdXQoKSBzdGVwQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxOYlN0ZXBDaGFuZ2VFdmVudD4oKTtcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnZlcnRpY2FsJylcbiAgZ2V0IHZlcnRpY2FsKCkge1xuICAgIHJldHVybiB0aGlzLm9yaWVudGF0aW9uID09PSAndmVydGljYWwnO1xuICB9XG4gIEBIb3N0QmluZGluZygnY2xhc3MuaG9yaXpvbnRhbCcpXG4gIGdldCBob3Jpem9udGFsKCkge1xuICAgIHJldHVybiB0aGlzLm9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCc7XG4gIH1cblxuICBAQ29udGVudENoaWxkcmVuKE5iU3RlcENvbXBvbmVudCkgc3RlcHM6IFF1ZXJ5TGlzdDxOYlN0ZXBDb21wb25lbnQ+O1xuXG4gIC8qKlxuICAgKiBOYXZpZ2F0ZSB0byBuZXh0IHN0ZXBcbiAgICogKi9cbiAgbmV4dCgpIHtcbiAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSBNYXRoLm1pbih0aGlzLnNlbGVjdGVkSW5kZXggKyAxLCB0aGlzLnN0ZXBzLmxlbmd0aCAtIDEpO1xuICB9XG5cbiAgLyoqXG4gICAqIE5hdmlnYXRlIHRvIHByZXZpb3VzIHN0ZXBcbiAgICogKi9cbiAgcHJldmlvdXMoKSB7XG4gICAgdGhpcy5zZWxlY3RlZEluZGV4ID0gTWF0aC5tYXgodGhpcy5zZWxlY3RlZEluZGV4IC0gMSwgMCk7XG4gIH1cblxuICAvKipcbiAgICogU2VsZWN0IHN0ZXAgaWYgbmF2aWdhdGlvbiBpcyBub3QgZGlzYWJsZWRcbiAgICogQHBhcmFtIHsgTmJTdGVwQ29tcG9uZW50IH0gc3RlcFxuICAgKi9cbiAgY2hhbmdlU3RlcChzdGVwOiBOYlN0ZXBDb21wb25lbnQpIHtcbiAgICBpZiAoIXRoaXMuZGlzYWJsZVN0ZXBOYXZpZ2F0aW9uKSB7XG4gICAgICBzdGVwLnNlbGVjdCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCBzdGVwcGVyIGFuZCBzdGVwQ29udHJvbHMgdG8gaW5pdGlhbCBzdGF0ZVxuICAgKiAqL1xuICByZXNldCgpIHtcbiAgICBjb25zdCBwcmV2aW91c2x5U2VsZWN0ZWRJbmRleCA9IHRoaXMuc2VsZWN0ZWRJbmRleDtcbiAgICBjb25zdCBwcmV2aW91c2x5U2VsZWN0ZWRTdGVwID0gdGhpcy5zZWxlY3RlZDtcblxuICAgIHRoaXMuX3NlbGVjdGVkSW5kZXggPSAwO1xuICAgIHRoaXMuc3RlcHMuZm9yRWFjaCgoc3RlcCkgPT4gc3RlcC5yZXNldCgpKTtcblxuICAgIHRoaXMuc3RlcENoYW5nZS5lbWl0KHtcbiAgICAgIGluZGV4OiB0aGlzLnNlbGVjdGVkSW5kZXgsXG4gICAgICBzdGVwOiB0aGlzLnNlbGVjdGVkLFxuICAgICAgcHJldmlvdXNseVNlbGVjdGVkSW5kZXgsXG4gICAgICBwcmV2aW91c2x5U2VsZWN0ZWRTdGVwLFxuICAgIH0pO1xuICB9XG5cbiAgaXNTdGVwU2VsZWN0ZWQoc3RlcDogTmJTdGVwQ29tcG9uZW50KSB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWQgPT09IHN0ZXA7XG4gIH1cblxuICAvKlxuICAgKiBAZG9jcy1wcml2YXRlXG4gICAqKi9cbiAgZ2V0U3RlcFRlbXBsYXRlKHN0ZXA6IE5iU3RlcENvbXBvbmVudCk6IFRlbXBsYXRlUmVmPGFueT4gfCBudWxsIHtcbiAgICBpZiAoc3RlcC5pc0xhYmVsVGVtcGxhdGUpIHtcbiAgICAgIHJldHVybiBzdGVwLmxhYmVsIGFzIFRlbXBsYXRlUmVmPGFueT47XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcHJvdGVjdGVkIGlzU3RlcFZhbGlkKGluZGV4OiBudW1iZXIpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5zdGVwcy50b0FycmF5KClbaW5kZXhdLmNvbXBsZXRlZDtcbiAgfVxuXG4gIHByb3RlY3RlZCBjYW5CZVNlbGVjdGVkKGluZGV4VG9DaGVjazogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgY29uc3Qgbm9TdGVwcyA9ICF0aGlzLnN0ZXBzIHx8IHRoaXMuc3RlcHMubGVuZ3RoID09PSAwO1xuICAgIGlmIChub1N0ZXBzIHx8IGluZGV4VG9DaGVjayA8IDAgfHwgaW5kZXhUb0NoZWNrID49IHRoaXMuc3RlcHMubGVuZ3RoIHx8IGluZGV4VG9DaGVjayA9PT0gdGhpcy5zZWxlY3RlZEluZGV4KSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKGluZGV4VG9DaGVjayA8PSB0aGlzLnNlbGVjdGVkSW5kZXggfHwgIXRoaXMubGluZWFyKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBsZXQgaXNBbGxTdGVwc1ZhbGlkID0gdHJ1ZTtcbiAgICBmb3IgKGxldCBpID0gdGhpcy5zZWxlY3RlZEluZGV4OyBpIDwgaW5kZXhUb0NoZWNrOyBpKyspIHtcbiAgICAgIGlmICghdGhpcy5pc1N0ZXBWYWxpZChpKSkge1xuICAgICAgICBpc0FsbFN0ZXBzVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBpc0FsbFN0ZXBzVmFsaWQ7XG4gIH1cblxuICBwcm90ZWN0ZWQgbWFya0N1cnJlbnRTdGVwSW50ZXJhY3RlZCgpIHtcbiAgICBpZiAodGhpcy5zZWxlY3RlZCkge1xuICAgICAgdGhpcy5zZWxlY3RlZC5pbnRlcmFjdGVkID0gdHJ1ZTtcbiAgICB9XG4gIH1cbn1cbiIsIjxuZy10ZW1wbGF0ZT48bmctY29udGVudCBzZWxlY3Q9XCJuYi1zdGVwXCI+PC9uZy1jb250ZW50PjwvbmctdGVtcGxhdGU+XG48ZGl2IGNsYXNzPVwiaGVhZGVyXCI+XG4gIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IHN0ZXAgb2Ygc3RlcHM7IGxldCBpbmRleCA9IGluZGV4OyBsZXQgZmlyc3QgPSBmaXJzdFwiPlxuXG4gICAgPGRpdiAqbmdJZj1cIiFmaXJzdCAmJiAhc3RlcC5oaWRkZW5cIlxuICAgICAgICAgW2NsYXNzLmNvbm5lY3Rvci1wYXN0XT1cImluZGV4IDw9IHNlbGVjdGVkSW5kZXhcIlxuICAgICAgICAgY2xhc3M9XCJjb25uZWN0b3JcIj48L2Rpdj5cblxuICAgIDxkaXYgKm5nSWY9XCIhc3RlcC5oaWRkZW5cIiBjbGFzcz1cInN0ZXBcIlxuICAgICAgICAgW2NsYXNzLnNlbGVjdGVkXT1cImlzU3RlcFNlbGVjdGVkKHN0ZXApXCJcbiAgICAgICAgIFtjbGFzcy5jb21wbGV0ZWRdPVwiIWlzU3RlcFNlbGVjdGVkKHN0ZXApICYmIHN0ZXAuY29tcGxldGVkXCJcbiAgICAgICAgIFtjbGFzcy5ub25pbnRlcmFjdGl2ZV09XCJkaXNhYmxlU3RlcE5hdmlnYXRpb25cIlxuICAgICAgICAgKGNsaWNrKT1cImNoYW5nZVN0ZXAoc3RlcClcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJsYWJlbC1pbmRleFwiPlxuICAgICAgICA8c3BhbiAqbmdJZj1cIiFzdGVwLmNvbXBsZXRlZCB8fCBpc1N0ZXBTZWxlY3RlZChzdGVwKVwiPnt7IGluZGV4ICsgMSB9fTwvc3Bhbj5cbiAgICAgICAgPG5iLWljb24gKm5nSWY9XCIhaXNTdGVwU2VsZWN0ZWQoc3RlcCkgJiYgc3RlcC5jb21wbGV0ZWRcIiBpY29uPVwiY2hlY2ttYXJrLW91dGxpbmVcIiBwYWNrPVwibmVidWxhci1lc3NlbnRpYWxzXCI+XG4gICAgICAgIDwvbmItaWNvbj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImxhYmVsXCI+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJzdGVwLmlzTGFiZWxUZW1wbGF0ZVwiPlxuICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJnZXRTdGVwVGVtcGxhdGUoc3RlcClcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDxzcGFuICpuZ0lmPVwiIXN0ZXAuaXNMYWJlbFRlbXBsYXRlXCI+e3sgc3RlcC5sYWJlbCB9fTwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L25nLWNvbnRhaW5lcj5cbjwvZGl2PlxuPGRpdiBjbGFzcz1cInN0ZXAtY29udGVudFwiPlxuICA8bmctY29udGFpbmVyIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInNlbGVjdGVkPy5jb250ZW50XCI+PC9uZy1jb250YWluZXI+XG48L2Rpdj5cbiJdfQ==