/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, HostBinding, Input, Output, } from '@angular/core';
import { from, merge, Subject } from 'rxjs';
import { debounceTime, filter, startWith, switchMap, takeUntil } from 'rxjs/operators';
import { convertToBoolProperty } from '../helpers';
import { NbButton } from '../button/base-button';
import { NbButtonToggleDirective } from './button-toggle.directive';
import { NB_BUTTON_GROUP } from './button-group-injection-tokens';
import * as i0 from "@angular/core";
import * as i1 from "../../services/status.service";
/**
 * `<nb-button-group>` visually groups buttons together and allow to control buttons properties and the state as a
 * group.
 * @stacked-example(Button Group Showcase, button-group/button-group-showcase.component)
 *
 * ### Installation
 *
 * Import `NbButtonGroupModule` to your feature module.
 * ```ts
 * @NgModule({
 *   imports: [
 *     // ...
 *     NbButtonGroupModule,
 *   ],
 * })
 * export class PageModule { }
 * ```
 *
 * ### Usage
 *
 * You can use `<nb-button-group>` to group a series of `[nbButton]` or `[nbButtonToggle]` components.
 * @stacked-example(Button and Button Toggle Groups, button-group/button-and-button-toggle-groups.component)
 *
 * For a group of multiple `[nbButtonToggle]` you also can control multi-selection behavior. By default, the group
 * component allows only one pressed button toggle at a time (similar to the radio group). To be able to keep multiple
 * toggles pressed, you need to add `multiple` attributes to the `<nb-button-toggle>`.
 * @stacked-example(Button Group Multiple, button-group/button-group-multiple.component)
 *
 * To know which buttons are currently pressed listen to `(valueChange)` on the `nb-button-group`. Event
 * contains an array of values of currently pressed button toggles. You can assign a value to the
 * `[nbButtonToggle]` via the `value` input.
 * @stacked-example(Button Group Value Change, button-group/button-group-value-change.component)
 *
 * To disable a group of buttons, add a `disabled` attribute to the `<nb-button-group>`.
 * @stacked-example(Button Group Disabled, button-group/button-group-disabled.component)
 *
 * The group component controls all visual attributes of buttons such as `appearance`, `status`, `size`, `shape`.
 * You can change it via the appropriate attributes.
 *
 * Button group appearances:
 * @stacked-example(Button Group Appearances, button-group/button-group-appearances.component)
 *
 * Button group statuses:
 * @stacked-example(Button Group Statuses, button-group/button-group-statuses.component)
 *
 * Button group sizes:
 * @stacked-example(Button Group Sizes, button-group/button-group-sizes.component)
 *
 * Buttons group shapes:
 * @additional-example(Button Group Shapes, button-group/button-group-shapes.component)
 *
 * @styles
 *
 * button-group-filled-button-basic-text-color:
 * button-group-filled-button-primary-text-color:
 * button-group-filled-button-success-text-color:
 * button-group-filled-button-info-text-color:
 * button-group-filled-button-warning-text-color:
 * button-group-filled-button-danger-text-color:
 * button-group-filled-button-control-text-color:
 * button-group-filled-basic-divider-color:
 * button-group-filled-primary-divider-color:
 * button-group-filled-success-divider-color:
 * button-group-filled-info-divider-color:
 * button-group-filled-warning-divider-color:
 * button-group-filled-danger-divider-color:
 * button-group-filled-control-divider-color:
 * button-group-ghost-divider-color:
 **/
export class NbButtonGroupComponent {
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        if (this.disabled !== convertToBoolProperty(value)) {
            this._disabled = !this.disabled;
        }
    }
    /**
     * Allows to keep multiple button toggles pressed. Off by default.
     */
    get multiple() {
        return this._multiple;
    }
    set multiple(value) {
        this._multiple = convertToBoolProperty(value);
    }
    /**
     * Sets `filled` appearance
     */
    get filled() {
        return this.appearance === 'filled';
    }
    set filled(value) {
        if (convertToBoolProperty(value)) {
            this.appearance = 'filled';
        }
    }
    /**
     * Sets `outline` appearance
     */
    get outline() {
        return this.appearance === 'outline';
    }
    set outline(value) {
        if (convertToBoolProperty(value)) {
            this.appearance = 'outline';
        }
    }
    /**
     * Sets `ghost` appearance
     */
    get ghost() {
        return this.appearance === 'ghost';
    }
    set ghost(value) {
        if (convertToBoolProperty(value)) {
            this.appearance = 'ghost';
        }
    }
    get additionalClasses() {
        if (this.statusService.isCustomStatus(this.status)) {
            return [this.statusService.getStatusClass(this.status)];
        }
        return [];
    }
    constructor(cd, statusService) {
        this.cd = cd;
        this.statusService = statusService;
        this.lastEmittedValue = [];
        this.destroy$ = new Subject();
        this.buttonsChange$ = new Subject();
        /**
         * Button group size, available sizes:
         * `tiny`, `small`, `medium`, `large`, `giant`
         */
        this.size = 'medium';
        /**
         * Button group status (adds specific styles):
         * `basic`, `primary`, `info`, `success`, `warning`, `danger`, `control`
         */
        this.status = 'basic';
        /**
         * Button group shapes: `rectangle`, `round`, `semi-round`
         */
        this.shape = 'rectangle';
        /**
         * Button group appearance: `filled`, `outline`, `ghost`
         */
        this.appearance = 'filled';
        this._disabled = false;
        this._multiple = false;
        /**
         * Emits when `nbButtonToggle` pressed state change. `$event` contains an array of the currently pressed button
         * toggles.
         */
        this.valueChange = new EventEmitter();
        this.role = 'group';
    }
    ngOnChanges({ size, status, shape, multiple, filled, outline, ghost, disabled }) {
        if (size || status || shape || multiple || filled || outline || ghost || disabled) {
            this.syncButtonsProperties(this.buttons?.toArray() || []);
        }
    }
    ngAfterContentInit() {
        this.buttonsChange$.pipe(takeUntil(this.destroy$)).subscribe((buttons) => {
            this.listenButtonPressedState(buttons);
            this.syncButtonsProperties(buttons);
        });
        this.buttons.changes
            .pipe(
        // `buttons.changes` emit during change detection run after projected content already was initialized.
        // So at this time, it's too late to update projected buttons properties as updating bindings after
        // initialization doesn't make sense. Changes won't be picked up and should cause an "expression changed" error.
        // Instead, we wrap the new buttons list into a promise to defer update to the following microtask and also to
        // trigger change detection one more time.
        switchMap((buttons) => from(Promise.resolve(buttons.toArray()))), takeUntil(this.destroy$))
            .subscribe(this.buttonsChange$);
        this.buttonsChange$.next(this.buttons.toArray());
    }
    listenButtonPressedState(buttons) {
        const toggleButtons = buttons.filter((button) => {
            return button instanceof NbButtonToggleDirective;
        });
        if (!toggleButtons.length) {
            return;
        }
        const buttonsPressedChange$ = toggleButtons.map((button) => button.pressedChange$);
        merge(...buttonsPressedChange$)
            .pipe(filter(({ pressed }) => !this.multiple && pressed), takeUntil(merge(this.buttonsChange$, this.destroy$)))
            .subscribe(({ source }) => {
            toggleButtons
                .filter((button) => button !== source)
                .forEach((button) => button._updatePressed(false));
        });
        merge(...buttonsPressedChange$)
            .pipe(
        // Use startWith to emit if some buttons are initially pressed.
        startWith(''), 
        // Use debounce to emit change once when pressed state change in multiple button toggles.
        debounceTime(0), takeUntil(merge(this.buttonsChange$, this.destroy$)))
            .subscribe(() => this.emitCurrentValue(toggleButtons));
    }
    syncButtonsProperties(buttons) {
        buttons.forEach((button) => {
            button.updateProperties({
                appearance: this.appearance,
                size: this.size,
                status: this.status,
                shape: this.shape,
                disabled: this.disabled,
            });
        });
    }
    emitCurrentValue(toggleButtons) {
        const pressedToggleValues = toggleButtons
            .filter((b) => b.pressed && typeof b.value !== 'undefined')
            .map((b) => b.value);
        // Prevent multiple emissions of empty value.
        if (pressedToggleValues.length === 0 && this.lastEmittedValue.length === 0) {
            return;
        }
        this.valueChange.emit(pressedToggleValues);
        this.lastEmittedValue = pressedToggleValues;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbButtonGroupComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i1.NbStatusService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.1.0", type: NbButtonGroupComponent, selector: "nb-button-group", inputs: { size: "size", status: "status", shape: "shape", appearance: "appearance", disabled: "disabled", multiple: "multiple", filled: "filled", outline: "outline", ghost: "ghost" }, outputs: { valueChange: "valueChange" }, host: { properties: { "attr.role": "this.role", "class": "this.additionalClasses" } }, providers: [{ provide: NB_BUTTON_GROUP, useExisting: NbButtonGroupComponent }], queries: [{ propertyName: "buttons", predicate: NbButton }], usesOnChanges: true, ngImport: i0, template: ` <ng-content></ng-content> `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbButtonGroupComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nb-button-group',
                    template: ` <ng-content></ng-content> `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [{ provide: NB_BUTTON_GROUP, useExisting: NbButtonGroupComponent }],
                }]
        }], ctorParameters: () => [{ type: i0.ChangeDetectorRef }, { type: i1.NbStatusService }], propDecorators: { buttons: [{
                type: ContentChildren,
                args: [NbButton]
            }], size: [{
                type: Input
            }], status: [{
                type: Input
            }], shape: [{
                type: Input
            }], appearance: [{
                type: Input
            }], disabled: [{
                type: Input
            }], multiple: [{
                type: Input
            }], filled: [{
                type: Input
            }], outline: [{
                type: Input
            }], ghost: [{
                type: Input
            }], valueChange: [{
                type: Output
            }], role: [{
                type: HostBinding,
                args: ['attr.role']
            }], additionalClasses: [{
                type: HostBinding,
                args: ['class']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLWdyb3VwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9mcmFtZXdvcmsvdGhlbWUvY29tcG9uZW50cy9idXR0b24tZ3JvdXAvYnV0dG9uLWdyb3VwLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUVMLHVCQUF1QixFQUV2QixTQUFTLEVBQ1QsZUFBZSxFQUNmLFlBQVksRUFDWixXQUFXLEVBQ1gsS0FBSyxFQUVMLE1BQU0sR0FHUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBYyxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDeEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUd2RixPQUFPLEVBQUUscUJBQXFCLEVBQWtCLE1BQU0sWUFBWSxDQUFDO0FBSW5FLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNqRCxPQUFPLEVBQWtELHVCQUF1QixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDcEgsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGlDQUFpQyxDQUFDOzs7QUFFbEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBb0VJO0FBT0osTUFBTSxPQUFPLHNCQUFzQjtJQThCakMsSUFDSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3hCLENBQUM7SUFDRCxJQUFJLFFBQVEsQ0FBQyxLQUFjO1FBQ3pCLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDO1lBQ25ELElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FB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QVosS0FBSztnQkFNRyxNQUFNO3NCQUFkLEtBQUs7Z0JBS0csS0FBSztzQkFBYixLQUFLO2dCQUtHLFVBQVU7c0JBQWxCLEtBQUs7Z0JBR0YsUUFBUTtzQkFEWCxLQUFLO2dCQWdCRixRQUFRO3NCQURYLEtBQUs7Z0JBY0YsTUFBTTtzQkFEVCxLQUFLO2dCQWVGLE9BQU87c0JBRFYsS0FBSztnQkFlRixLQUFLO3NCQURSLEtBQUs7Z0JBZUksV0FBVztzQkFBcEIsTUFBTTtnQkFFbUIsSUFBSTtzQkFBN0IsV0FBVzt1QkFBQyxXQUFXO2dCQUdwQixpQkFBaUI7c0JBRHBCLFdBQVc7dUJBQUMsT0FBTyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBBa3Zlby4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi9cblxuaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0QmluZGluZyxcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT3V0cHV0LFxuICBRdWVyeUxpc3QsXG4gIFNpbXBsZUNoYW5nZXMsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZnJvbSwgbWVyZ2UsIE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlYm91bmNlVGltZSwgZmlsdGVyLCBzdGFydFdpdGgsIHN3aXRjaE1hcCwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBOYlN0YXR1c1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9zdGF0dXMuc2VydmljZSc7XG5pbXBvcnQgeyBjb252ZXJ0VG9Cb29sUHJvcGVydHksIE5iQm9vbGVhbklucHV0IH0gZnJvbSAnLi4vaGVscGVycyc7XG5pbXBvcnQgeyBOYkNvbXBvbmVudFNpemUgfSBmcm9tICcuLi9jb21wb25lbnQtc2l6ZSc7XG5pbXBvcnQgeyBOYkNvbXBvbmVudFNoYXBlIH0gZnJvbSAnLi4vY29tcG9uZW50LXNoYXBlJztcbmltcG9ydCB7IE5iQ29tcG9uZW50T3JDdXN0b21TdGF0dXMgfSBmcm9tICcuLi9jb21wb25lbnQtc3RhdHVzJztcbmltcG9ydCB7IE5iQnV0dG9uIH0gZnJvbSAnLi4vYnV0dG9uL2Jhc2UtYnV0dG9uJztcbmltcG9ydCB7IE5iQnV0dG9uVG9nZ2xlQXBwZWFyYW5jZSwgTmJCdXR0b25Ub2dnbGVDaGFuZ2UsIE5iQnV0dG9uVG9nZ2xlRGlyZWN0aXZlIH0gZnJvbSAnLi9idXR0b24tdG9nZ2xlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBOQl9CVVRUT05fR1JPVVAgfSBmcm9tICcuL2J1dHRvbi1ncm91cC1pbmplY3Rpb24tdG9rZW5zJztcblxuLyoqXG4gKiBgPG5iLWJ1dHRvbi1ncm91cD5gIHZpc3VhbGx5IGdyb3VwcyBidXR0b25zIHRvZ2V0aGVyIGFuZCBhbGxvdyB0byBjb250cm9sIGJ1dHRvbnMgcHJvcGVydGllcyBhbmQgdGhlIHN0YXRlIGFzIGFcbiAqIGdyb3VwLlxuICogQHN0YWNrZWQtZXhhbXBsZShCdXR0b24gR3JvdXAgU2hvd2Nhc2UsIGJ1dHRvbi1ncm91cC9idXR0b24tZ3JvdXAtc2hvd2Nhc2UuY29tcG9uZW50KVxuICpcbiAqICMjIyBJbnN0YWxsYXRpb25cbiAqXG4gKiBJbXBvcnQgYE5iQnV0dG9uR3JvdXBNb2R1bGVgIHRvIHlvdXIgZmVhdHVyZSBtb2R1bGUuXG4gKiBgYGB0c1xuICogQE5nTW9kdWxlKHtcbiAqICAgaW1wb3J0czogW1xuICogICAgIC8vIC4uLlxuICogICAgIE5iQnV0dG9uR3JvdXBNb2R1bGUsXG4gKiAgIF0sXG4gKiB9KVxuICogZXhwb3J0IGNsYXNzIFBhZ2VNb2R1bGUgeyB9XG4gKiBgYGBcbiAqXG4gKiAjIyMgVXNhZ2VcbiAqXG4gKiBZb3UgY2FuIHVzZSBgPG5iLWJ1dHRvbi1ncm91cD5gIHRvIGdyb3VwIGEgc2VyaWVzIG9mIGBbbmJCdXR0b25dYCBvciBgW25iQnV0dG9uVG9nZ2xlXWAgY29tcG9uZW50cy5cbiAqIEBzdGFja2VkLWV4YW1wbGUoQnV0dG9uIGFuZCBCdXR0b24gVG9nZ2xlIEdyb3VwcywgYnV0dG9uLWdyb3VwL2J1dHRvbi1hbmQtYnV0dG9uLXRvZ2dsZS1ncm91cHMuY29tcG9uZW50KVxuICpcbiAqIEZvciBhIGdyb3VwIG9mIG11bHRpcGxlIGBbbmJCdXR0b25Ub2dnbGVdYCB5b3UgYWxzbyBjYW4gY29udHJvbCBtdWx0aS1zZWxlY3Rpb24gYmVoYXZpb3IuIEJ5IGRlZmF1bHQsIHRoZSBncm91cFxuICogY29tcG9uZW50IGFsbG93cyBvbmx5IG9uZSBwcmVzc2VkIGJ1dHRvbiB0b2dnbGUgYXQgYSB0aW1lIChzaW1pbGFyIHRvIHRoZSByYWRpbyBncm91cCkuIFRvIGJlIGFibGUgdG8ga2VlcCBtdWx0aXBsZVxuICogdG9nZ2xlcyBwcmVzc2VkLCB5b3UgbmVlZCB0byBhZGQgYG11bHRpcGxlYCBhdHRyaWJ1dGVzIHRvIHRoZSBgPG5iLWJ1dHRvbi10b2dnbGU+YC5cbiAqIEBzdGFja2VkLWV4YW1wbGUoQnV0dG9uIEdyb3VwIE11bHRpcGxlLCBidXR0b24tZ3JvdXAvYnV0dG9uLWdyb3VwLW11bHRpcGxlLmNvbXBvbmVudClcbiAqXG4gKiBUbyBrbm93IHdoaWNoIGJ1dHRvbnMgYXJlIGN1cnJlbnRseSBwcmVzc2VkIGxpc3RlbiB0byBgKHZhbHVlQ2hhbmdlKWAgb24gdGhlIGBuYi1idXR0b24tZ3JvdXBgLiBFdmVudFxuICogY29udGFpbnMgYW4gYXJyYXkgb2YgdmFsdWVzIG9mIGN1cnJlbnRseSBwcmVzc2VkIGJ1dHRvbiB0b2dnbGVzLiBZb3UgY2FuIGFzc2lnbiBhIHZhbHVlIHRvIHRoZVxuICogYFtuYkJ1dHRvblRvZ2dsZV1gIHZpYSB0aGUgYHZhbHVlYCBpbnB1dC5cbiAqIEBzdGFja2VkLWV4YW1wbGUoQnV0dG9uIEdyb3VwIFZhbHVlIENoYW5nZSwgYnV0dG9uLWdyb3VwL2J1dHRvbi1ncm91cC12YWx1ZS1jaGFuZ2UuY29tcG9uZW50KVxuICpcbiAqIFRvIGRpc2FibGUgYSBncm91cCBvZiBidXR0b25zLCBhZGQgYSBgZGlzYWJsZWRgIGF0dHJpYnV0ZSB0byB0aGUgYDxuYi1idXR0b24tZ3JvdXA+YC5cbiAqIEBzdGFja2VkLWV4YW1wbGUoQnV0dG9uIEdyb3VwIERpc2FibGVkLCBidXR0b24tZ3JvdXAvYnV0dG9uLWdyb3VwLWRpc2FibGVkLmNvbXBvbmVudClcbiAqXG4gKiBUaGUgZ3JvdXAgY29tcG9uZW50IGNvbnRyb2xzIGFsbCB2aXN1YWwgYXR0cmlidXRlcyBvZiBidXR0b25zIHN1Y2ggYXMgYGFwcGVhcmFuY2VgLCBgc3RhdHVzYCwgYHNpemVgLCBgc2hhcGVgLlxuICogWW91IGNhbiBjaGFuZ2UgaXQgdmlhIHRoZSBhcHByb3ByaWF0ZSBhdHRyaWJ1dGVzLlxuICpcbiAqIEJ1dHRvbiBncm91cCBhcHBlYXJhbmNlczpcbiAqIEBzdGFja2VkLWV4YW1wbGUoQnV0dG9uIEdyb3VwIEFwcGVhcmFuY2VzLCBidXR0b24tZ3JvdXAvYnV0dG9uLWdyb3VwLWFwcGVhcmFuY2VzLmNvbXBvbmVudClcbiAqXG4gKiBCdXR0b24gZ3JvdXAgc3RhdHVzZXM6XG4gKiBAc3RhY2tlZC1leGFtcGxlKEJ1dHRvbiBHcm91cCBTdGF0dXNlcywgYnV0dG9uLWdyb3VwL2J1dHRvbi1ncm91cC1zdGF0dXNlcy5jb21wb25lbnQpXG4gKlxuICogQnV0dG9uIGdyb3VwIHNpemVzOlxuICogQHN0YWNrZWQtZXhhbXBsZShCdXR0b24gR3JvdXAgU2l6ZXMsIGJ1dHRvbi1ncm91cC9idXR0b24tZ3JvdXAtc2l6ZXMuY29tcG9uZW50KVxuICpcbiAqIEJ1dHRvbnMgZ3JvdXAgc2hhcGVzOlxuICogQGFkZGl0aW9uYWwtZXhhbXBsZShCdXR0b24gR3JvdXAgU2hhcGVzLCBidXR0b24tZ3JvdXAvYnV0dG9uLWdyb3VwLXNoYXBlcy5jb21wb25lbnQpXG4gKlxuICogQHN0eWxlc1xuICpcbiAqIGJ1dHRvbi1ncm91cC1maWxsZWQtYnV0dG9uLWJhc2ljLXRleHQtY29sb3I6XG4gKiBidXR0b24tZ3JvdXAtZmlsbGVkLWJ1dHRvbi1wcmltYXJ5LXRleHQtY29sb3I6XG4gKiBidXR0b24tZ3JvdXAtZmlsbGVkLWJ1dHRvbi1zdWNjZXNzLXRleHQtY29sb3I6XG4gKiBidXR0b24tZ3JvdXAtZmlsbGVkLWJ1dHRvbi1pbmZvLXRleHQtY29sb3I6XG4gKiBidXR0b24tZ3JvdXAtZmlsbGVkLWJ1dHRvbi13YXJuaW5nLXRleHQtY29sb3I6XG4gKiBidXR0b24tZ3JvdXAtZmlsbGVkLWJ1dHRvbi1kYW5nZXItdGV4dC1jb2xvcjpcbiAqIGJ1dHRvbi1ncm91cC1maWxsZWQtYnV0dG9uLWNvbnRyb2wtdGV4dC1jb2xvcjpcbiAqIGJ1dHRvbi1ncm91cC1maWxsZWQtYmFzaWMtZGl2aWRlci1jb2xvcjpcbiAqIGJ1dHRvbi1ncm91cC1maWxsZWQtcHJpbWFyeS1kaXZpZGVyLWNvbG9yOlxuICogYnV0dG9uLWdyb3VwLWZpbGxlZC1zdWNjZXNzLWRpdmlkZXItY29sb3I6XG4gKiBidXR0b24tZ3JvdXAtZmlsbGVkLWluZm8tZGl2aWRlci1jb2xvcjpcbiAqIGJ1dHRvbi1ncm91cC1maWxsZWQtd2FybmluZy1kaXZpZGVyLWNvbG9yOlxuICogYnV0dG9uLWdyb3VwLWZpbGxlZC1kYW5nZXItZGl2aWRlci1jb2xvcjpcbiAqIGJ1dHRvbi1ncm91cC1maWxsZWQtY29udHJvbC1kaXZpZGVyLWNvbG9yOlxuICogYnV0dG9uLWdyb3VwLWdob3N0LWRpdmlkZXItY29sb3I6XG4gKiovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduYi1idXR0b24tZ3JvdXAnLFxuICB0ZW1wbGF0ZTogYCA8bmctY29udGVudD48L25nLWNvbnRlbnQ+IGAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IE5CX0JVVFRPTl9HUk9VUCwgdXNlRXhpc3Rpbmc6IE5iQnV0dG9uR3JvdXBDb21wb25lbnQgfV0sXG59KVxuZXhwb3J0IGNsYXNzIE5iQnV0dG9uR3JvdXBDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIEFmdGVyQ29udGVudEluaXQge1xuICBwcm90ZWN0ZWQgbGFzdEVtaXR0ZWRWYWx1ZTogYW55W10gPSBbXTtcblxuICBwcm90ZWN0ZWQgcmVhZG9ubHkgZGVzdHJveSQ6IFN1YmplY3Q8dm9pZD4gPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgYnV0dG9uc0NoYW5nZSQgPSBuZXcgU3ViamVjdDxOYkJ1dHRvbltdPigpO1xuXG4gIEBDb250ZW50Q2hpbGRyZW4oTmJCdXR0b24pIHJlYWRvbmx5IGJ1dHRvbnM6IFF1ZXJ5TGlzdDxOYkJ1dHRvbj47XG5cbiAgLyoqXG4gICAqIEJ1dHRvbiBncm91cCBzaXplLCBhdmFpbGFibGUgc2l6ZXM6XG4gICAqIGB0aW55YCwgYHNtYWxsYCwgYG1lZGl1bWAsIGBsYXJnZWAsIGBnaWFudGBcbiAgICovXG4gIEBJbnB1dCgpIHNpemU6IE5iQ29tcG9uZW50U2l6ZSA9ICdtZWRpdW0nO1xuXG4gIC8qKlxuICAgKiBCdXR0b24gZ3JvdXAgc3RhdHVzIChhZGRzIHNwZWNpZmljIHN0eWxlcyk6XG4gICAqIGBiYXNpY2AsIGBwcmltYXJ5YCwgYGluZm9gLCBgc3VjY2Vzc2AsIGB3YXJuaW5nYCwgYGRhbmdlcmAsIGBjb250cm9sYFxuICAgKi9cbiAgQElucHV0KCkgc3RhdHVzOiBOYkNvbXBvbmVudE9yQ3VzdG9tU3RhdHVzID0gJ2Jhc2ljJztcblxuICAvKipcbiAgICogQnV0dG9uIGdyb3VwIHNoYXBlczogYHJlY3RhbmdsZWAsIGByb3VuZGAsIGBzZW1pLXJvdW5kYFxuICAgKi9cbiAgQElucHV0KCkgc2hhcGU6IE5iQ29tcG9uZW50U2hhcGUgPSAncmVjdGFuZ2xlJztcblxuICAvKipcbiAgICogQnV0dG9uIGdyb3VwIGFwcGVhcmFuY2U6IGBmaWxsZWRgLCBgb3V0bGluZWAsIGBnaG9zdGBcbiAgICovXG4gIEBJbnB1dCgpIGFwcGVhcmFuY2U6IE5iQnV0dG9uVG9nZ2xlQXBwZWFyYW5jZSA9ICdmaWxsZWQnO1xuXG4gIEBJbnB1dCgpXG4gIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7XG4gIH1cbiAgc2V0IGRpc2FibGVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgaWYgKHRoaXMuZGlzYWJsZWQgIT09IGNvbnZlcnRUb0Jvb2xQcm9wZXJ0eSh2YWx1ZSkpIHtcbiAgICAgIHRoaXMuX2Rpc2FibGVkID0gIXRoaXMuZGlzYWJsZWQ7XG4gICAgfVxuICB9XG4gIHByb3RlY3RlZCBfZGlzYWJsZWQgPSBmYWxzZTtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2Rpc2FibGVkOiBOYkJvb2xlYW5JbnB1dDtcblxuICAvKipcbiAgICogQWxsb3dzIHRvIGtlZXAgbXVsdGlwbGUgYnV0dG9uIHRvZ2dsZXMgcHJlc3NlZC4gT2ZmIGJ5IGRlZmF1bHQuXG4gICAqL1xuICBASW5wdXQoKVxuICBnZXQgbXVsdGlwbGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX211bHRpcGxlO1xuICB9XG4gIHNldCBtdWx0aXBsZSh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX211bHRpcGxlID0gY29udmVydFRvQm9vbFByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcm90ZWN0ZWQgX211bHRpcGxlOiBib29sZWFuID0gZmFsc2U7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9tdWx0aXBsZTogTmJCb29sZWFuSW5wdXQ7XG5cbiAgLyoqXG4gICAqIFNldHMgYGZpbGxlZGAgYXBwZWFyYW5jZVxuICAgKi9cbiAgQElucHV0KClcbiAgZ2V0IGZpbGxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5hcHBlYXJhbmNlID09PSAnZmlsbGVkJztcbiAgfVxuICBzZXQgZmlsbGVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgaWYgKGNvbnZlcnRUb0Jvb2xQcm9wZXJ0eSh2YWx1ZSkpIHtcbiAgICAgIHRoaXMuYXBwZWFyYW5jZSA9ICdmaWxsZWQnO1xuICAgIH1cbiAgfVxuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfZmlsbGVkOiBOYkJvb2xlYW5JbnB1dDtcblxuICAvKipcbiAgICogU2V0cyBgb3V0bGluZWAgYXBwZWFyYW5jZVxuICAgKi9cbiAgQElucHV0KClcbiAgZ2V0IG91dGxpbmUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuYXBwZWFyYW5jZSA9PT0gJ291dGxpbmUnO1xuICB9XG4gIHNldCBvdXRsaW5lKHZhbHVlOiBib29sZWFuKSB7XG4gICAgaWYgKGNvbnZlcnRUb0Jvb2xQcm9wZXJ0eSh2YWx1ZSkpIHtcbiAgICAgIHRoaXMuYXBwZWFyYW5jZSA9ICdvdXRsaW5lJztcbiAgICB9XG4gIH1cbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX291dGxpbmU6IE5iQm9vbGVhbklucHV0O1xuXG4gIC8qKlxuICAgKiBTZXRzIGBnaG9zdGAgYXBwZWFyYW5jZVxuICAgKi9cbiAgQElucHV0KClcbiAgZ2V0IGdob3N0KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmFwcGVhcmFuY2UgPT09ICdnaG9zdCc7XG4gIH1cbiAgc2V0IGdob3N0KHZhbHVlOiBib29sZWFuKSB7XG4gICAgaWYgKGNvbnZlcnRUb0Jvb2xQcm9wZXJ0eSh2YWx1ZSkpIHtcbiAgICAgIHRoaXMuYXBwZWFyYW5jZSA9ICdnaG9zdCc7XG4gICAgfVxuICB9XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9naG9zdDogTmJCb29sZWFuSW5wdXQ7XG5cbiAgLyoqXG4gICAqIEVtaXRzIHdoZW4gYG5iQnV0dG9uVG9nZ2xlYCBwcmVzc2VkIHN0YXRlIGNoYW5nZS4gYCRldmVudGAgY29udGFpbnMgYW4gYXJyYXkgb2YgdGhlIGN1cnJlbnRseSBwcmVzc2VkIGJ1dHRvblxuICAgKiB0b2dnbGVzLlxuICAgKi9cbiAgQE91dHB1dCgpIHZhbHVlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnlbXT4oKTtcblxuICBASG9zdEJpbmRpbmcoJ2F0dHIucm9sZScpIHJvbGUgPSAnZ3JvdXAnO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MnKVxuICBnZXQgYWRkaXRpb25hbENsYXNzZXMoKTogc3RyaW5nW10ge1xuICAgIGlmICh0aGlzLnN0YXR1c1NlcnZpY2UuaXNDdXN0b21TdGF0dXModGhpcy5zdGF0dXMpKSB7XG4gICAgICByZXR1cm4gW3RoaXMuc3RhdHVzU2VydmljZS5nZXRTdGF0dXNDbGFzcyh0aGlzLnN0YXR1cyldO1xuICAgIH1cbiAgICByZXR1cm4gW107XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgY2Q6IENoYW5nZURldGVjdG9yUmVmLCBwcm90ZWN0ZWQgc3RhdHVzU2VydmljZTogTmJTdGF0dXNTZXJ2aWNlKSB7fVxuXG4gIG5nT25DaGFuZ2VzKHsgc2l6ZSwgc3RhdHVzLCBzaGFwZSwgbXVsdGlwbGUsIGZpbGxlZCwgb3V0bGluZSwgZ2hvc3QsIGRpc2FibGVkIH06IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoc2l6ZSB8fCBzdGF0dXMgfHwgc2hhcGUgfHwgbXVsdGlwbGUgfHwgZmlsbGVkIHx8IG91dGxpbmUgfHwgZ2hvc3QgfHwgZGlzYWJsZWQpIHtcbiAgICAgIHRoaXMuc3luY0J1dHRvbnNQcm9wZXJ0aWVzKHRoaXMuYnV0dG9ucz8udG9BcnJheSgpIHx8IFtdKTtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5idXR0b25zQ2hhbmdlJC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSkuc3Vic2NyaWJlKChidXR0b25zOiBOYkJ1dHRvbltdKSA9PiB7XG4gICAgICB0aGlzLmxpc3RlbkJ1dHRvblByZXNzZWRTdGF0ZShidXR0b25zKTtcbiAgICAgIHRoaXMuc3luY0J1dHRvbnNQcm9wZXJ0aWVzKGJ1dHRvbnMpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5idXR0b25zLmNoYW5nZXNcbiAgICAgIC5waXBlKFxuICAgICAgICAvLyBgYnV0dG9ucy5jaGFuZ2VzYCBlbWl0IGR1cmluZyBjaGFuZ2UgZGV0ZWN0aW9uIHJ1biBhZnRlciBwcm9qZWN0ZWQgY29udGVudCBhbHJlYWR5IHdhcyBpbml0aWFsaXplZC5cbiAgICAgICAgLy8gU28gYXQgdGhpcyB0aW1lLCBpdCdzIHRvbyBsYXRlIHRvIHVwZGF0ZSBwcm9qZWN0ZWQgYnV0dG9ucyBwcm9wZXJ0aWVzIGFzIHVwZGF0aW5nIGJpbmRpbmdzIGFmdGVyXG4gICAgICAgIC8vIGluaXRpYWxpemF0aW9uIGRvZXNuJ3QgbWFrZSBzZW5zZS4gQ2hhbmdlcyB3b24ndCBiZSBwaWNrZWQgdXAgYW5kIHNob3VsZCBjYXVzZSBhbiBcImV4cHJlc3Npb24gY2hhbmdlZFwiIGVycm9yLlxuICAgICAgICAvLyBJbnN0ZWFkLCB3ZSB3cmFwIHRoZSBuZXcgYnV0dG9ucyBsaXN0IGludG8gYSBwcm9taXNlIHRvIGRlZmVyIHVwZGF0ZSB0byB0aGUgZm9sbG93aW5nIG1pY3JvdGFzayBhbmQgYWxzbyB0b1xuICAgICAgICAvLyB0cmlnZ2VyIGNoYW5nZSBkZXRlY3Rpb24gb25lIG1vcmUgdGltZS5cbiAgICAgICAgc3dpdGNoTWFwKChidXR0b25zOiBRdWVyeUxpc3Q8TmJCdXR0b24+KSA9PiBmcm9tKFByb21pc2UucmVzb2x2ZShidXR0b25zLnRvQXJyYXkoKSkpKSxcbiAgICAgICAgdGFrZVVudGlsKHRoaXMuZGVzdHJveSQpLFxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSh0aGlzLmJ1dHRvbnNDaGFuZ2UkKTtcblxuICAgIHRoaXMuYnV0dG9uc0NoYW5nZSQubmV4dCh0aGlzLmJ1dHRvbnMudG9BcnJheSgpKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBsaXN0ZW5CdXR0b25QcmVzc2VkU3RhdGUoYnV0dG9uczogTmJCdXR0b25bXSk6IHZvaWQge1xuICAgIGNvbnN0IHRvZ2dsZUJ1dHRvbnM6IE5iQnV0dG9uVG9nZ2xlRGlyZWN0aXZlW10gPSBidXR0b25zLmZpbHRlcigoYnV0dG9uOiBOYkJ1dHRvbikgPT4ge1xuICAgICAgcmV0dXJuIGJ1dHRvbiBpbnN0YW5jZW9mIE5iQnV0dG9uVG9nZ2xlRGlyZWN0aXZlO1xuICAgIH0pIGFzIE5iQnV0dG9uVG9nZ2xlRGlyZWN0aXZlW107XG5cbiAgICBpZiAoIXRvZ2dsZUJ1dHRvbnMubGVuZ3RoKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgYnV0dG9uc1ByZXNzZWRDaGFuZ2UkOiBPYnNlcnZhYmxlPE5iQnV0dG9uVG9nZ2xlQ2hhbmdlPltdID0gdG9nZ2xlQnV0dG9ucy5tYXAoXG4gICAgICAoYnV0dG9uOiBOYkJ1dHRvblRvZ2dsZURpcmVjdGl2ZSkgPT4gYnV0dG9uLnByZXNzZWRDaGFuZ2UkLFxuICAgICk7XG5cbiAgICBtZXJnZSguLi5idXR0b25zUHJlc3NlZENoYW5nZSQpXG4gICAgICAucGlwZShcbiAgICAgICAgZmlsdGVyKCh7IHByZXNzZWQgfTogTmJCdXR0b25Ub2dnbGVDaGFuZ2UpID0+ICF0aGlzLm11bHRpcGxlICYmIHByZXNzZWQpLFxuICAgICAgICB0YWtlVW50aWwobWVyZ2UodGhpcy5idXR0b25zQ2hhbmdlJCwgdGhpcy5kZXN0cm95JCkpLFxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSgoeyBzb3VyY2UgfTogTmJCdXR0b25Ub2dnbGVDaGFuZ2UpID0+IHtcbiAgICAgICAgdG9nZ2xlQnV0dG9uc1xuICAgICAgICAgIC5maWx0ZXIoKGJ1dHRvbjogTmJCdXR0b25Ub2dnbGVEaXJlY3RpdmUpID0+IGJ1dHRvbiAhPT0gc291cmNlKVxuICAgICAgICAgIC5mb3JFYWNoKChidXR0b246IE5iQnV0dG9uVG9nZ2xlRGlyZWN0aXZlKSA9PiBidXR0b24uX3VwZGF0ZVByZXNzZWQoZmFsc2UpKTtcbiAgICAgIH0pO1xuXG4gICAgbWVyZ2UoLi4uYnV0dG9uc1ByZXNzZWRDaGFuZ2UkKVxuICAgICAgLnBpcGUoXG4gICAgICAgIC8vIFVzZSBzdGFydFdpdGggdG8gZW1pdCBpZiBzb21lIGJ1dHRvbnMgYXJlIGluaXRpYWxseSBwcmVzc2VkLlxuICAgICAgICBzdGFydFdpdGgoJycpLFxuICAgICAgICAvLyBVc2UgZGVib3VuY2UgdG8gZW1pdCBjaGFuZ2Ugb25jZSB3aGVuIHByZXNzZWQgc3RhdGUgY2hhbmdlIGluIG11bHRpcGxlIGJ1dHRvbiB0b2dnbGVzLlxuICAgICAgICBkZWJvdW5jZVRpbWUoMCksXG4gICAgICAgIHRha2VVbnRpbChtZXJnZSh0aGlzLmJ1dHRvbnNDaGFuZ2UkLCB0aGlzLmRlc3Ryb3kkKSksXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuZW1pdEN1cnJlbnRWYWx1ZSh0b2dnbGVCdXR0b25zKSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgc3luY0J1dHRvbnNQcm9wZXJ0aWVzKGJ1dHRvbnM6IE5iQnV0dG9uW10pOiB2b2lkIHtcbiAgICBidXR0b25zLmZvckVhY2goKGJ1dHRvbjogTmJCdXR0b24pID0+IHtcbiAgICAgIGJ1dHRvbi51cGRhdGVQcm9wZXJ0aWVzKHtcbiAgICAgICAgYXBwZWFyYW5jZTogdGhpcy5hcHBlYXJhbmNlLFxuICAgICAgICBzaXplOiB0aGlzLnNpemUsXG4gICAgICAgIHN0YXR1czogdGhpcy5zdGF0dXMsXG4gICAgICAgIHNoYXBlOiB0aGlzLnNoYXBlLFxuICAgICAgICBkaXNhYmxlZDogdGhpcy5kaXNhYmxlZCxcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIGVtaXRDdXJyZW50VmFsdWUodG9nZ2xlQnV0dG9uczogTmJCdXR0b25Ub2dnbGVEaXJlY3RpdmVbXSk6IHZvaWQge1xuICAgIGNvbnN0IHByZXNzZWRUb2dnbGVWYWx1ZXMgPSB0b2dnbGVCdXR0b25zXG4gICAgICAuZmlsdGVyKChiOiBOYkJ1dHRvblRvZ2dsZURpcmVjdGl2ZSkgPT4gYi5wcmVzc2VkICYmIHR5cGVvZiBiLnZhbHVlICE9PSAndW5kZWZpbmVkJylcbiAgICAgIC5tYXAoKGI6IE5iQnV0dG9uVG9nZ2xlRGlyZWN0aXZlKSA9PiBiLnZhbHVlKTtcblxuICAgIC8vIFByZXZlbnQgbXVsdGlwbGUgZW1pc3Npb25zIG9mIGVtcHR5IHZhbHVlLlxuICAgIGlmIChwcmVzc2VkVG9nZ2xlVmFsdWVzLmxlbmd0aCA9PT0gMCAmJiB0aGlzLmxhc3RFbWl0dGVkVmFsdWUubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy52YWx1ZUNoYW5nZS5lbWl0KHByZXNzZWRUb2dnbGVWYWx1ZXMpO1xuICAgIHRoaXMubGFzdEVtaXR0ZWRWYWx1ZSA9IHByZXNzZWRUb2dnbGVWYWx1ZXM7XG4gIH1cbn1cbiJdfQ==