/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, HostListener, Input, Output, } from '@angular/core';
import { Subject } from 'rxjs';
import { convertToBoolProperty } from '../helpers';
import * as i0 from "@angular/core";
import * as i1 from "../../services/status.service";
import * as i2 from "@angular/common";
import * as i3 from "../icon/icon.component";
let tagUniqueId = 0;
/**
 *
 * To show a cross on a tag and enable `remove` event add the `removable` attribute.
 * @stacked-example(Removable tags, tag/tag-removable.component)
 *
 * You can change appearance via `appearance` input:
 * @stacked-example(Tag Appearance, tag/tag-appearance.component)
 *
 * You can change status via `status` input:
 * @stacked-example(Tag Status, tag/tag-status.component)
 *
 * @styles
 *
 * tag-text-font-family:
 * tag-text-transform:
 * tag-border-width:
 * tag-border-style:
 * tag-border-radius:
 * tag-tiny-text-font-size:
 * tag-tiny-text-font-weight:
 * tag-tiny-text-line-height:
 * tag-tiny-padding:
 * tag-tiny-close-offset:
 * tag-small-text-font-size:
 * tag-small-text-font-weight:
 * tag-small-text-line-height:
 * tag-small-padding:
 * tag-small-close-offset:
 * tag-medium-text-font-size:
 * tag-medium-text-font-weight:
 * tag-medium-text-line-height:
 * tag-medium-padding:
 * tag-medium-close-offset:
 * tag-large-text-font-size:
 * tag-large-text-font-weight:
 * tag-large-text-line-height:
 * tag-large-padding:
 * tag-large-close-offset:
 * tag-giant-text-font-size:
 * tag-giant-text-font-weight:
 * tag-giant-text-line-height:
 * tag-giant-padding:
 * tag-giant-close-offset:
 * tag-filled-basic-background-color:
 * tag-filled-basic-border-color:
 * tag-filled-basic-text-color:
 * tag-filled-basic-active-background-color:
 * tag-filled-basic-active-border-color:
 * tag-filled-basic-hover-background-color:
 * tag-filled-basic-hover-border-color:
 * tag-filled-basic-selected-background-color:
 * tag-filled-basic-selected-border-color:
 * tag-filled-primary-background-color:
 * tag-filled-primary-border-color:
 * tag-filled-primary-text-color:
 * tag-filled-primary-active-background-color:
 * tag-filled-primary-active-border-color:
 * tag-filled-primary-hover-background-color:
 * tag-filled-primary-hover-border-color:
 * tag-filled-primary-selected-background-color:
 * tag-filled-primary-selected-border-color:
 * tag-filled-success-background-color:
 * tag-filled-success-border-color:
 * tag-filled-success-text-color:
 * tag-filled-success-active-background-color:
 * tag-filled-success-active-border-color:
 * tag-filled-success-hover-background-color:
 * tag-filled-success-hover-border-color:
 * tag-filled-success-selected-background-color:
 * tag-filled-success-selected-border-color:
 * tag-filled-info-background-color:
 * tag-filled-info-border-color:
 * tag-filled-info-text-color:
 * tag-filled-info-active-background-color:
 * tag-filled-info-active-border-color:
 * tag-filled-info-hover-background-color:
 * tag-filled-info-hover-border-color:
 * tag-filled-info-selected-background-color:
 * tag-filled-info-selected-border-color:
 * tag-filled-warning-background-color:
 * tag-filled-warning-border-color:
 * tag-filled-warning-text-color:
 * tag-filled-warning-active-background-color:
 * tag-filled-warning-active-border-color:
 * tag-filled-warning-hover-background-color:
 * tag-filled-warning-hover-border-color:
 * tag-filled-warning-selected-background-color:
 * tag-filled-warning-selected-border-color:
 * tag-filled-danger-background-color:
 * tag-filled-danger-border-color:
 * tag-filled-danger-text-color:
 * tag-filled-danger-active-background-color:
 * tag-filled-danger-active-border-color:
 * tag-filled-danger-hover-background-color:
 * tag-filled-danger-hover-border-color:
 * tag-filled-danger-selected-background-color:
 * tag-filled-danger-selected-border-color:
 * tag-filled-control-background-color:
 * tag-filled-control-border-color:
 * tag-filled-control-text-color:
 * tag-filled-control-active-background-color:
 * tag-filled-control-active-border-color:
 * tag-filled-control-hover-background-color:
 * tag-filled-control-hover-border-color:
 * tag-filled-control-selected-background-color:
 * tag-filled-control-selected-border-color:
 * tag-outline-basic-background-color:
 * tag-outline-basic-border-color:
 * tag-outline-basic-text-color:
 * tag-outline-basic-active-background-color:
 * tag-outline-basic-active-border-color:
 * tag-outline-basic-active-text-color:
 * tag-outline-basic-hover-background-color:
 * tag-outline-basic-hover-border-color:
 * tag-outline-basic-hover-text-color:
 * tag-outline-basic-selected-background-color:
 * tag-outline-basic-selected-border-color:
 * tag-outline-basic-selected-text-color:
 * tag-outline-primary-background-color:
 * tag-outline-primary-border-color:
 * tag-outline-primary-text-color:
 * tag-outline-primary-active-background-color:
 * tag-outline-primary-active-border-color:
 * tag-outline-primary-active-text-color:
 * tag-outline-primary-hover-background-color:
 * tag-outline-primary-hover-border-color:
 * tag-outline-primary-hover-text-color:
 * tag-outline-primary-selected-background-color:
 * tag-outline-primary-selected-border-color:
 * tag-outline-primary-selected-text-color:
 * tag-outline-success-background-color:
 * tag-outline-success-border-color:
 * tag-outline-success-text-color:
 * tag-outline-success-active-background-color:
 * tag-outline-success-active-border-color:
 * tag-outline-success-active-text-color:
 * tag-outline-success-hover-background-color:
 * tag-outline-success-hover-border-color:
 * tag-outline-success-hover-text-color:
 * tag-outline-success-selected-background-color:
 * tag-outline-success-selected-border-color:
 * tag-outline-success-selected-text-color:
 * tag-outline-info-background-color:
 * tag-outline-info-border-color:
 * tag-outline-info-text-color:
 * tag-outline-info-active-background-color:
 * tag-outline-info-active-border-color:
 * tag-outline-info-active-text-color:
 * tag-outline-info-hover-background-color:
 * tag-outline-info-hover-border-color:
 * tag-outline-info-hover-text-color:
 * tag-outline-info-selected-background-color:
 * tag-outline-info-selected-border-color:
 * tag-outline-info-selected-text-color:
 * tag-outline-warning-background-color:
 * tag-outline-warning-border-color:
 * tag-outline-warning-text-color:
 * tag-outline-warning-active-background-color:
 * tag-outline-warning-active-border-color:
 * tag-outline-warning-active-text-color:
 * tag-outline-warning-hover-background-color:
 * tag-outline-warning-hover-border-color:
 * tag-outline-warning-hover-text-color:
 * tag-outline-warning-selected-background-color:
 * tag-outline-warning-selected-border-color:
 * tag-outline-warning-selected-text-color:
 * tag-outline-danger-background-color:
 * tag-outline-danger-border-color:
 * tag-outline-danger-text-color:
 * tag-outline-danger-active-background-color:
 * tag-outline-danger-active-border-color:
 * tag-outline-danger-active-text-color:
 * tag-outline-danger-hover-background-color:
 * tag-outline-danger-hover-border-color:
 * tag-outline-danger-hover-text-color:
 * tag-outline-danger-selected-background-color:
 * tag-outline-danger-selected-border-color:
 * tag-outline-danger-selected-text-color:
 * tag-outline-control-background-color:
 * tag-outline-control-border-color:
 * tag-outline-control-text-color:
 * tag-outline-control-active-background-color:
 * tag-outline-control-active-border-color:
 * tag-outline-control-active-text-color:
 * tag-outline-control-hover-background-color:
 * tag-outline-control-hover-border-color:
 * tag-outline-control-hover-text-color:
 * tag-outline-control-selected-background-color:
 * tag-outline-control-selected-border-color:
 * tag-outline-control-selected-text-color:
 */
export class NbTagComponent {
    get destroy$() {
        return this._destroy$.asObservable();
    }
    get selected() {
        return this._selected;
    }
    set selected(value) {
        if (this.selected !== convertToBoolProperty(value)) {
            this._selected = !this.selected;
            this.selectedChange.emit({ tag: this, selected: this.selected });
        }
    }
    /**
     * Controls whether the user can remove a tag or not.
     */
    get removable() {
        return this._removable;
    }
    set removable(value) {
        this._removable = convertToBoolProperty(value);
    }
    get filled() {
        return this.appearance === 'filled';
    }
    set filled(value) {
        if (convertToBoolProperty(value)) {
            this.appearance = 'filled';
        }
    }
    get outline() {
        return this.appearance === 'outline';
    }
    set outline(value) {
        if (convertToBoolProperty(value)) {
            this.appearance = 'outline';
        }
    }
    get basic() {
        return this.status === 'basic';
    }
    get primary() {
        return this.status === 'primary';
    }
    get success() {
        return this.status === 'success';
    }
    get info() {
        return this.status === 'info';
    }
    get warning() {
        return this.status === 'warning';
    }
    get danger() {
        return this.status === 'danger';
    }
    get control() {
        return this.status === 'control';
    }
    get tiny() {
        return this.size === 'tiny';
    }
    get small() {
        return this.size === 'small';
    }
    get medium() {
        return this.size === 'medium';
    }
    get large() {
        return this.size === 'large';
    }
    get giant() {
        return this.size === 'giant';
    }
    get additionalClasses() {
        if (this.statusService.isCustomStatus(this.status)) {
            return [this.statusService.getStatusClass(this.status)];
        }
        return [];
    }
    _remove() {
        if (this.removable) {
            this.remove.emit(this);
        }
    }
    constructor(_hostElement, cd, renderer, zone, statusService) {
        this._hostElement = _hostElement;
        this.cd = cd;
        this.renderer = renderer;
        this.zone = zone;
        this.statusService = statusService;
        this._destroy$ = new Subject();
        this._selected = false;
        this._removable = false;
        /**
         * Tag appearance: `filled`, `outline`.
         */
        this.appearance = 'filled';
        /**
         * Tag status: `basic`, `primary`, `info`, `success`, `warning`, `danger`, `control`.
         */
        this.status = 'basic';
        /**
         * Tag size: `tiny`, `small`, `medium`, `large`, `giant`.
         */
        this.size = 'medium';
        this.role = 'option';
        /**
         * Emits when the user removes the tag
         * (whether by clicking on the remove button or by pressing `delete` or `backspace` key).
         */
        this.remove = new EventEmitter();
        this.selectedChange = new EventEmitter();
        this._isActive = false;
        this._id = `nb-tag-${tagUniqueId++}`;
    }
    ngAfterViewInit() {
        // TODO: #2254
        this.zone.runOutsideAngular(() => setTimeout(() => {
            this.renderer.addClass(this._hostElement.nativeElement, 'nb-transition');
        }));
    }
    ngOnDestroy() {
        this._destroy$.next(this);
    }
    _toggleSelection() {
        this.selected = !this.selected;
        this.cd.markForCheck();
    }
    setActiveStyles() {
        if (!this._isActive) {
            this._isActive = true;
            this.cd.markForCheck();
        }
    }
    setInactiveStyles() {
        if (this._isActive) {
            this._isActive = false;
            this.cd.markForCheck();
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbTagComponent, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: i0.Renderer2 }, { token: i0.NgZone }, { token: i1.NbStatusService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.1.0", type: NbTagComponent, selector: "nb-tag", inputs: { text: "text", selected: "selected", removable: "removable", appearance: "appearance", status: "status", size: "size", role: "role" }, outputs: { remove: "remove", selectedChange: "selectedChange" }, host: { listeners: { "keydown.delete": "_remove()", "keydown.backspace": "_remove()" }, properties: { "class.selected": "this.selected", "attr.aria-selected": "this.selected", "attr.role": "this.role", "class.active": "this._isActive", "attr.id": "this._id", "class.appearance-filled": "this.filled", "class.appearance-outline": "this.outline", "class.status-basic": "this.basic", "class.status-primary": "this.primary", "class.status-success": "this.success", "class.status-info": "this.info", "class.status-warning": "this.warning", "class.status-danger": "this.danger", "class.status-control": "this.control", "class.size-tiny": "this.tiny", "class.size-small": "this.small", "class.size-medium": "this.medium", "class.size-large": "this.large", "class.size-giant": "this.giant", "class": "this.additionalClasses" } }, exportAs: ["nbTag"], ngImport: i0, template: "{{ text }}\n<nb-icon *ngIf=\"removable\"\n         (click)=\"_remove()\"\n         class=\"nb-tag-remove size-{{size}}\"\n         icon=\"close-outline\"\n         pack=\"nebular-essentials\"\n         aria-hidden=\"true\">\n</nb-icon>\n", dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3.NbIconComponent, selector: "nb-icon", inputs: ["icon", "pack", "options", "status", "config"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbTagComponent, decorators: [{
            type: Component,
            args: [{ selector: 'nb-tag', exportAs: 'nbTag', changeDetection: ChangeDetectionStrategy.OnPush, template: "{{ text }}\n<nb-icon *ngIf=\"removable\"\n         (click)=\"_remove()\"\n         class=\"nb-tag-remove size-{{size}}\"\n         icon=\"close-outline\"\n         pack=\"nebular-essentials\"\n         aria-hidden=\"true\">\n</nb-icon>\n" }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: i0.Renderer2 }, { type: i0.NgZone }, { type: i1.NbStatusService }], propDecorators: { text: [{
                type: Input
            }], selected: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['class.selected']
            }, {
                type: HostBinding,
                args: ['attr.aria-selected']
            }], removable: [{
                type: Input
            }], appearance: [{
                type: Input
            }], status: [{
                type: Input
            }], size: [{
                type: Input
            }], role: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['attr.role']
            }], remove: [{
                type: Output
            }], selectedChange: [{
                type: Output
            }], _isActive: [{
                type: HostBinding,
                args: ['class.active']
            }], _id: [{
                type: HostBinding,
                args: ['attr.id']
            }], filled: [{
                type: HostBinding,
                args: ['class.appearance-filled']
            }], outline: [{
                type: HostBinding,
                args: ['class.appearance-outline']
            }], basic: [{
                type: HostBinding,
                args: ['class.status-basic']
            }], primary: [{
                type: HostBinding,
                args: ['class.status-primary']
            }], success: [{
                type: HostBinding,
                args: ['class.status-success']
            }], info: [{
                type: HostBinding,
                args: ['class.status-info']
            }], warning: [{
                type: HostBinding,
                args: ['class.status-warning']
            }], danger: [{
                type: HostBinding,
                args: ['class.status-danger']
            }], control: [{
                type: HostBinding,
                args: ['class.status-control']
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
            }], additionalClasses: [{
                type: HostBinding,
                args: ['class']
            }], _remove: [{
                type: HostListener,
                args: ['keydown.delete']
            }, {
                type: HostListener,
                args: ['keydown.backspace']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9mcmFtZXdvcmsvdGhlbWUvY29tcG9uZW50cy90YWcvdGFnLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uL3NyYy9mcmFtZXdvcmsvdGhlbWUvY29tcG9uZW50cy90YWcvdGFnLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBRUwsdUJBQXVCLEVBRXZCLFNBQVMsRUFFVCxZQUFZLEVBQ1osV0FBVyxFQUNYLFlBQVksRUFDWixLQUFLLEVBR0wsTUFBTSxHQUVQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBYyxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFJM0MsT0FBTyxFQUFFLHFCQUFxQixFQUFrQixNQUFNLFlBQVksQ0FBQzs7Ozs7QUFXbkUsSUFBSSxXQUFXLEdBQUcsQ0FBQyxDQUFDO0FBRXBCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBOExHO0FBT0gsTUFBTSxPQUFPLGNBQWM7SUFJekIsSUFBSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3ZDLENBQUM7SUFPRCxJQUdJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDeEIsQ0FBQztJQUNELElBQUksUUFBUSxDQUFDLEtBQWM7UUFDekIsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxFQUFFLENB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Z0JBV2xDLE9BQU87c0JBRFYsV0FBVzt1QkFBQywwQkFBMEI7Z0JBV25DLEtBQUs7c0JBRFIsV0FBVzt1QkFBQyxvQkFBb0I7Z0JBTTdCLE9BQU87c0JBRFYsV0FBVzt1QkFBQyxzQkFBc0I7Z0JBTS9CLE9BQU87c0JBRFYsV0FBVzt1QkFBQyxzQkFBc0I7Z0JBTS9CLElBQUk7c0JBRFAsV0FBVzt1QkFBQyxtQkFBbUI7Z0JBTTVCLE9BQU87c0JBRFYsV0FBVzt1QkFBQyxzQkFBc0I7Z0JBTS9CLE1BQU07c0JBRFQsV0FBVzt1QkFBQyxxQkFBcUI7Z0JBTTlCLE9BQU87c0JBRFYsV0FBVzt1QkFBQyxzQkFBc0I7Z0JBTS9CLElBQUk7c0JBRFAsV0FBVzt1QkFBQyxpQkFBaUI7Z0JBTTFCLEtBQUs7c0JBRFIsV0FBVzt1QkFBQyxrQkFBa0I7Z0JBTTNCLE1BQU07c0JBRFQsV0FBVzt1QkFBQyxtQkFBbUI7Z0JBTTVCLEtBQUs7c0JBRFIsV0FBVzt1QkFBQyxrQkFBa0I7Z0JBTTNCLEtBQUs7c0JBRFIsV0FBVzt1QkFBQyxrQkFBa0I7Z0JBTTNCLGlCQUFpQjtzQkFEcEIsV0FBVzt1QkFBQyxPQUFPO2dCQVVwQixPQUFPO3NCQUZOLFlBQVk7dUJBQUMsZ0JBQWdCOztzQkFDN0IsWUFBWTt1QkFBQyxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgQWt2ZW8uIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICovXG5cbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3RCaW5kaW5nLFxuICBIb3N0TGlzdGVuZXIsXG4gIElucHV0LFxuICBOZ1pvbmUsXG4gIE9uRGVzdHJveSxcbiAgT3V0cHV0LFxuICBSZW5kZXJlcjIsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBOYlN0YXR1c1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9zdGF0dXMuc2VydmljZSc7XG5pbXBvcnQgeyBOYkhpZ2hsaWdodGFibGVPcHRpb24gfSBmcm9tICcuLi9jZGsvYTExeS9kZXNjZW5kYW50LWtleS1tYW5hZ2VyJztcbmltcG9ydCB7IGNvbnZlcnRUb0Jvb2xQcm9wZXJ0eSwgTmJCb29sZWFuSW5wdXQgfSBmcm9tICcuLi9oZWxwZXJzJztcbmltcG9ydCB7IE5iQ29tcG9uZW50T3JDdXN0b21TdGF0dXMgfSBmcm9tICcuLi9jb21wb25lbnQtc3RhdHVzJztcbmltcG9ydCB7IE5iQ29tcG9uZW50U2l6ZSB9IGZyb20gJy4uL2NvbXBvbmVudC1zaXplJztcblxuZXhwb3J0IHR5cGUgTmJUYWdBcHBlYXJhbmNlID0gJ2ZpbGxlZCcgfCAnb3V0bGluZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTmJUYWdTZWxlY3Rpb25DaGFuZ2Uge1xuICB0YWc6IE5iVGFnQ29tcG9uZW50O1xuICBzZWxlY3RlZDogYm9vbGVhbjtcbn1cblxubGV0IHRhZ1VuaXF1ZUlkID0gMDtcblxuLyoqXG4gKlxuICogVG8gc2hvdyBhIGNyb3NzIG9uIGEgdGFnIGFuZCBlbmFibGUgYHJlbW92ZWAgZXZlbnQgYWRkIHRoZSBgcmVtb3ZhYmxlYCBhdHRyaWJ1dGUuXG4gKiBAc3RhY2tlZC1leGFtcGxlKFJlbW92YWJsZSB0YWdzLCB0YWcvdGFnLXJlbW92YWJsZS5jb21wb25lbnQpXG4gKlxuICogWW91IGNhbiBjaGFuZ2UgYXBwZWFyYW5jZSB2aWEgYGFwcGVhcmFuY2VgIGlucHV0OlxuICogQHN0YWNrZWQtZXhhbXBsZShUYWcgQXBwZWFyYW5jZSwgdGFnL3RhZy1hcHBlYXJhbmNlLmNvbXBvbmVudClcbiAqXG4gKiBZb3UgY2FuIGNoYW5nZSBzdGF0dXMgdmlhIGBzdGF0dXNgIGlucHV0OlxuICogQHN0YWNrZWQtZXhhbXBsZShUYWcgU3RhdHVzLCB0YWcvdGFnLXN0YXR1cy5jb21wb25lbnQpXG4gKlxuICogQHN0eWxlc1xuICpcbiAqIHRhZy10ZXh0LWZvbnQtZmFtaWx5OlxuICogdGFnLXRleHQtdHJhbnNmb3JtOlxuICogdGFnLWJvcmRlci13aWR0aDpcbiAqIHRhZy1ib3JkZXItc3R5bGU6XG4gKiB0YWctYm9yZGVyLXJhZGl1czpcbiAqIHRhZy10aW55LXRleHQtZm9udC1zaXplOlxuICogdGFnLXRpbnktdGV4dC1mb250LXdlaWdodDpcbiAqIHRhZy10aW55LXRleHQtbGluZS1oZWlnaHQ6XG4gKiB0YWctdGlueS1wYWRkaW5nOlxuICogdGFnLXRpbnktY2xvc2Utb2Zmc2V0OlxuICogdGFnLXNtYWxsLXRleHQtZm9udC1zaXplOlxuICogdGFnLXNtYWxsLXRleHQtZm9udC13ZWlnaHQ6XG4gKiB0YWctc21hbGwtdGV4dC1saW5lLWhlaWdodDpcbiAqIHRhZy1zbWFsbC1wYWRkaW5nOlxuICogdGFnLXNtYWxsLWNsb3NlLW9mZnNldDpcbiAqIHRhZy1tZWRpdW0tdGV4dC1mb250LXNpemU6XG4gKiB0YWctbWVkaXVtLXRleHQtZm9udC13ZWlnaHQ6XG4gKiB0YWctbWVkaXVtLXRleHQtbGluZS1oZWlnaHQ6XG4gKiB0YWctbWVkaXVtLXBhZGRpbmc6XG4gKiB0YWctbWVkaXVtLWNsb3NlLW9mZnNldDpcbiAqIHRhZy1sYXJnZS10ZXh0LWZvbnQtc2l6ZTpcbiAqIHRhZy1sYXJnZS10ZXh0LWZvbnQtd2VpZ2h0OlxuICogdGFnLWxhcmdlLXRleHQtbGluZS1oZWlnaHQ6XG4gKiB0YWctbGFyZ2UtcGFkZGluZzpcbiAqIHRhZy1sYXJnZS1jbG9zZS1vZmZzZXQ6XG4gKiB0YWctZ2lhbnQtdGV4dC1mb250LXNpemU6XG4gKiB0YWctZ2lhbnQtdGV4dC1mb250LXdlaWdodDpcbiAqIHRhZy1naWFudC10ZXh0LWxpbmUtaGVpZ2h0OlxuICogdGFnLWdpYW50LXBhZGRpbmc6XG4gKiB0YWctZ2lhbnQtY2xvc2Utb2Zmc2V0OlxuICogdGFnLWZpbGxlZC1iYXNpYy1iYWNrZ3JvdW5kLWNvbG9yOlxuICogdGFnLWZpbGxlZC1iYXNpYy1ib3JkZXItY29sb3I6XG4gKiB0YWctZmlsbGVkLWJhc2ljLXRleHQtY29sb3I6XG4gKiB0YWctZmlsbGVkLWJhc2ljLWFjdGl2ZS1iYWNrZ3JvdW5kLWNvbG9yOlxuICogdGFnLWZpbGxlZC1iYXNpYy1hY3RpdmUtYm9yZGVyLWNvbG9yOlxuICogdGFnLWZpbGxlZC1iYXNpYy1ob3Zlci1iYWNrZ3JvdW5kLWNvbG9yOlxuICogdGFnLWZpbGxlZC1iYXNpYy1ob3Zlci1ib3JkZXItY29sb3I6XG4gKiB0YWctZmlsbGVkLWJhc2ljLXNlbGVjdGVkLWJhY2tncm91bmQtY29sb3I6XG4gKiB0YWctZmlsbGVkLWJhc2ljLXNlbGVjdGVkLWJvcmRlci1jb2xvcjpcbiAqIHRhZy1maWxsZWQtcHJpbWFyeS1iYWNrZ3JvdW5kLWNvbG9yOlxuICogdGFnLWZpbGxlZC1wcmltYXJ5LWJvcmRlci1jb2xvcjpcbiAqIHRhZy1maWxsZWQtcHJpbWFyeS10ZXh0LWNvbG9yOlxuICogdGFnLWZpbGxlZC1wcmltYXJ5LWFjdGl2ZS1iYWNrZ3JvdW5kLWNvbG9yOlxuICogdGFnLWZpbGxlZC1wcmltYXJ5LWFjdGl2ZS1ib3JkZXItY29sb3I6XG4gKiB0YWctZmlsbGVkLXByaW1hcnktaG92ZXItYmFja2dyb3VuZC1jb2xvcjpcbiAqIHRhZy1maWxsZWQtcHJpbWFyeS1ob3Zlci1ib3JkZXItY29sb3I6XG4gKiB0YWctZmlsbGVkLXByaW1hcnktc2VsZWN0ZWQtYmFja2dyb3VuZC1jb2xvcjpcbiAqIHRhZy1maWxsZWQtcHJpbWFyeS1zZWxlY3RlZC1ib3JkZXItY29sb3I6XG4gKiB0YWctZmlsbGVkLXN1Y2Nlc3MtYmFja2dyb3VuZC1jb2xvcjpcbiAqIHRhZy1maWxsZWQtc3VjY2Vzcy1ib3JkZXItY29sb3I6XG4gKiB0YWctZmlsbGVkLXN1Y2Nlc3MtdGV4dC1jb2xvcjpcbiAqIHRhZy1maWxsZWQtc3VjY2Vzcy1hY3RpdmUtYmFja2dyb3VuZC1jb2xvcjpcbiAqIHRhZy1maWxsZWQtc3VjY2Vzcy1hY3RpdmUtYm9yZGVyLWNvbG9yOlxuICogdGFnLWZpbGxlZC1zdWNjZXNzLWhvdmVyLWJhY2tncm91bmQtY29sb3I6XG4gKiB0YWctZmlsbGVkLXN1Y2Nlc3MtaG92ZXItYm9yZGVyLWNvbG9yOlxuICogdGFnLWZpbGxlZC1zdWNjZXNzLXNlbGVjdGVkLWJhY2tncm91bmQtY29sb3I6XG4gKiB0YWctZmlsbGVkLXN1Y2Nlc3Mtc2VsZWN0ZWQtYm9yZGVyLWNvbG9yOlxuICogdGFnLWZpbGxlZC1pbmZvLWJhY2tncm91bmQtY29sb3I6XG4gKiB0YWctZmlsbGVkLWluZm8tYm9yZGVyLWNvbG9yOlxuICogdGFnLWZpbGxlZC1pbmZvLXRleHQtY29sb3I6XG4gKiB0YWctZmlsbGVkLWluZm8tYWN0aXZlLWJhY2tncm91bmQtY29sb3I6XG4gKiB0YWctZmlsbGVkLWluZm8tYWN0aXZlLWJvcmRlci1jb2xvcjpcbiAqIHRhZy1maWxsZWQtaW5mby1ob3Zlci1iYWNrZ3JvdW5kLWNvbG9yOlxuICogdGFnLWZpbGxlZC1pbmZvLWhvdmVyLWJvcmRlci1jb2xvcjpcbiAqIHRhZy1maWxsZWQtaW5mby1zZWxlY3RlZC1iYWNrZ3JvdW5kLWNvbG9yOlxuICogdGFnLWZpbGxlZC1pbmZvLXNlbGVjdGVkLWJvcmRlci1jb2xvcjpcbiAqIHRhZy1maWxsZWQtd2FybmluZy1iYWNrZ3JvdW5kLWNvbG9yOlxuICogdGFnLWZpbGxlZC13YXJuaW5nLWJvcmRlci1jb2xvcjpcbiAqIHRhZy1maWxsZWQtd2FybmluZy10ZXh0LWNvbG9yOlxuICogdGFnLWZpbGxlZC13YXJuaW5nLWFjdGl2ZS1iYWNrZ3JvdW5kLWNvbG9yOlxuICogdGFnLWZpbGxlZC13YXJuaW5nLWFjdGl2ZS1ib3JkZXItY29sb3I6XG4gKiB0YWctZmlsbGVkLXdhcm5pbmctaG92ZXItYmFja2dyb3VuZC1jb2xvcjpcbiAqIHRhZy1maWxsZWQtd2FybmluZy1ob3Zlci1ib3JkZXItY29sb3I6XG4gKiB0YWctZmlsbGVkLXdhcm5pbmctc2VsZWN0ZWQtYmFja2dyb3VuZC1jb2xvcjpcbiAqIHRhZy1maWxsZWQtd2FybmluZy1zZWxlY3RlZC1ib3JkZXItY29sb3I6XG4gKiB0YWctZmlsbGVkLWRhbmdlci1iYWNrZ3JvdW5kLWNvbG9yOlxuICogdGFnLWZpbGxlZC1kYW5nZXItYm9yZGVyLWNvbG9yOlxuICogdGFnLWZpbGxlZC1kYW5nZXItdGV4dC1jb2xvcjpcbiAqIHRhZy1maWxsZWQtZGFuZ2VyLWFjdGl2ZS1iYWNrZ3JvdW5kLWNvbG9yOlxuICogdGFnLWZpbGxlZC1kYW5nZXItYWN0aXZlLWJvcmRlci1jb2xvcjpcbiAqIHRhZy1maWxsZWQtZGFuZ2VyLWhvdmVyLWJhY2tncm91bmQtY29sb3I6XG4gKiB0YWctZmlsbGVkLWRhbmdlci1ob3Zlci1ib3JkZXItY29sb3I6XG4gKiB0YWctZmlsbGVkLWRhbmdlci1zZWxlY3RlZC1iYWNrZ3JvdW5kLWNvbG9yOlxuICogdGFnLWZpbGxlZC1kYW5nZXItc2VsZWN0ZWQtYm9yZGVyLWNvbG9yOlxuICogdGFnLWZpbGxlZC1jb250cm9sLWJhY2tncm91bmQtY29sb3I6XG4gKiB0YWctZmlsbGVkLWNvbnRyb2wtYm9yZGVyLWNvbG9yOlxuICogdGFnLWZpbGxlZC1jb250cm9sLXRleHQtY29sb3I6XG4gKiB0YWctZmlsbGVkLWNvbnRyb2wtYWN0aXZlLWJhY2tncm91bmQtY29sb3I6XG4gKiB0YWctZmlsbGVkLWNvbnRyb2wtYWN0aXZlLWJvcmRlci1jb2xvcjpcbiAqIHRhZy1maWxsZWQtY29udHJvbC1ob3Zlci1iYWNrZ3JvdW5kLWNvbG9yOlxuICogdGFnLWZpbGxlZC1jb250cm9sLWhvdmVyLWJvcmRlci1jb2xvcjpcbiAqIHRhZy1maWxsZWQtY29udHJvbC1zZWxlY3RlZC1iYWNrZ3JvdW5kLWNvbG9yOlxuICogdGFnLWZpbGxlZC1jb250cm9sLXNlbGVjdGVkLWJvcmRlci1jb2xvcjpcbiAqIHRhZy1vdXRsaW5lLWJhc2ljLWJhY2tncm91bmQtY29sb3I6XG4gKiB0YWctb3V0bGluZS1iYXNpYy1ib3JkZXItY29sb3I6XG4gKiB0YWctb3V0bGluZS1iYXNpYy10ZXh0LWNvbG9yOlxuICogdGFnLW91dGxpbmUtYmFzaWMtYWN0aXZlLWJhY2tncm91bmQtY29sb3I6XG4gKiB0YWctb3V0bGluZS1iYXNpYy1hY3RpdmUtYm9yZGVyLWNvbG9yOlxuICogdGFnLW91dGxpbmUtYmFzaWMtYWN0aXZlLXRleHQtY29sb3I6XG4gKiB0YWctb3V0bGluZS1iYXNpYy1ob3Zlci1iYWNrZ3JvdW5kLWNvbG9yOlxuICogdGFnLW91dGxpbmUtYmFzaWMtaG92ZXItYm9yZGVyLWNvbG9yOlxuICogdGFnLW91dGxpbmUtYmFzaWMtaG92ZXItdGV4dC1jb2xvcjpcbiAqIHRhZy1vdXRsaW5lLWJhc2ljLXNlbGVjdGVkLWJhY2tncm91bmQtY29sb3I6XG4gKiB0YWctb3V0bGluZS1iYXNpYy1zZWxlY3RlZC1ib3JkZXItY29sb3I6XG4gKiB0YWctb3V0bGluZS1iYXNpYy1zZWxlY3RlZC10ZXh0LWNvbG9yOlxuICogdGFnLW91dGxpbmUtcHJpbWFyeS1iYWNrZ3JvdW5kLWNvbG9yOlxuICogdGFnLW91dGxpbmUtcHJpbWFyeS1ib3JkZXItY29sb3I6XG4gKiB0YWctb3V0bGluZS1wcmltYXJ5LXRleHQtY29sb3I6XG4gKiB0YWctb3V0bGluZS1wcmltYXJ5LWFjdGl2ZS1iYWNrZ3JvdW5kLWNvbG9yOlxuICogdGFnLW91dGxpbmUtcHJpbWFyeS1hY3RpdmUtYm9yZGVyLWNvbG9yOlxuICogdGFnLW91dGxpbmUtcHJpbWFyeS1hY3RpdmUtdGV4dC1jb2xvcjpcbiAqIHRhZy1vdXRsaW5lLXByaW1hcnktaG92ZXItYmFja2dyb3VuZC1jb2xvcjpcbiAqIHRhZy1vdXRsaW5lLXByaW1hcnktaG92ZXItYm9yZGVyLWNvbG9yOlxuICogdGFnLW91dGxpbmUtcHJpbWFyeS1ob3Zlci10ZXh0LWNvbG9yOlxuICogdGFnLW91dGxpbmUtcHJpbWFyeS1zZWxlY3RlZC1iYWNrZ3JvdW5kLWNvbG9yOlxuICogdGFnLW91dGxpbmUtcHJpbWFyeS1zZWxlY3RlZC1ib3JkZXItY29sb3I6XG4gKiB0YWctb3V0bGluZS1wcmltYXJ5LXNlbGVjdGVkLXRleHQtY29sb3I6XG4gKiB0YWctb3V0bGluZS1zdWNjZXNzLWJhY2tncm91bmQtY29sb3I6XG4gKiB0YWctb3V0bGluZS1zdWNjZXNzLWJvcmRlci1jb2xvcjpcbiAqIHRhZy1vdXRsaW5lLXN1Y2Nlc3MtdGV4dC1jb2xvcjpcbiAqIHRhZy1vdXRsaW5lLXN1Y2Nlc3MtYWN0aXZlLWJhY2tncm91bmQtY29sb3I6XG4gKiB0YWctb3V0bGluZS1zdWNjZXNzLWFjdGl2ZS1ib3JkZXItY29sb3I6XG4gKiB0YWctb3V0bGluZS1zdWNjZXNzLWFjdGl2ZS10ZXh0LWNvbG9yOlxuICogdGFnLW91dGxpbmUtc3VjY2Vzcy1ob3Zlci1iYWNrZ3JvdW5kLWNvbG9yOlxuICogdGFnLW91dGxpbmUtc3VjY2Vzcy1ob3Zlci1ib3JkZXItY29sb3I6XG4gKiB0YWctb3V0bGluZS1zdWNjZXNzLWhvdmVyLXRleHQtY29sb3I6XG4gKiB0YWctb3V0bGluZS1zdWNjZXNzLXNlbGVjdGVkLWJhY2tncm91bmQtY29sb3I6XG4gKiB0YWctb3V0bGluZS1zdWNjZXNzLXNlbGVjdGVkLWJvcmRlci1jb2xvcjpcbiAqIHRhZy1vdXRsaW5lLXN1Y2Nlc3Mtc2VsZWN0ZWQtdGV4dC1jb2xvcjpcbiAqIHRhZy1vdXRsaW5lLWluZm8tYmFja2dyb3VuZC1jb2xvcjpcbiAqIHRhZy1vdXRsaW5lLWluZm8tYm9yZGVyLWNvbG9yOlxuICogdGFnLW91dGxpbmUtaW5mby10ZXh0LWNvbG9yOlxuICogdGFnLW91dGxpbmUtaW5mby1hY3RpdmUtYmFja2dyb3VuZC1jb2xvcjpcbiAqIHRhZy1vdXRsaW5lLWluZm8tYWN0aXZlLWJvcmRlci1jb2xvcjpcbiAqIHRhZy1vdXRsaW5lLWluZm8tYWN0aXZlLXRleHQtY29sb3I6XG4gKiB0YWctb3V0bGluZS1pbmZvLWhvdmVyLWJhY2tncm91bmQtY29sb3I6XG4gKiB0YWctb3V0bGluZS1pbmZvLWhvdmVyLWJvcmRlci1jb2xvcjpcbiAqIHRhZy1vdXRsaW5lLWluZm8taG92ZXItdGV4dC1jb2xvcjpcbiAqIHRhZy1vdXRsaW5lLWluZm8tc2VsZWN0ZWQtYmFja2dyb3VuZC1jb2xvcjpcbiAqIHRhZy1vdXRsaW5lLWluZm8tc2VsZWN0ZWQtYm9yZGVyLWNvbG9yOlxuICogdGFnLW91dGxpbmUtaW5mby1zZWxlY3RlZC10ZXh0LWNvbG9yOlxuICogdGFnLW91dGxpbmUtd2FybmluZy1iYWNrZ3JvdW5kLWNvbG9yOlxuICogdGFnLW91dGxpbmUtd2FybmluZy1ib3JkZXItY29sb3I6XG4gKiB0YWctb3V0bGluZS13YXJuaW5nLXRleHQtY29sb3I6XG4gKiB0YWctb3V0bGluZS13YXJuaW5nLWFjdGl2ZS1iYWNrZ3JvdW5kLWNvbG9yOlxuICogdGFnLW91dGxpbmUtd2FybmluZy1hY3RpdmUtYm9yZGVyLWNvbG9yOlxuICogdGFnLW91dGxpbmUtd2FybmluZy1hY3RpdmUtdGV4dC1jb2xvcjpcbiAqIHRhZy1vdXRsaW5lLXdhcm5pbmctaG92ZXItYmFja2dyb3VuZC1jb2xvcjpcbiAqIHRhZy1vdXRsaW5lLXdhcm5pbmctaG92ZXItYm9yZGVyLWNvbG9yOlxuICogdGFnLW91dGxpbmUtd2FybmluZy1ob3Zlci10ZXh0LWNvbG9yOlxuICogdGFnLW91dGxpbmUtd2FybmluZy1zZWxlY3RlZC1iYWNrZ3JvdW5kLWNvbG9yOlxuICogdGFnLW91dGxpbmUtd2FybmluZy1zZWxlY3RlZC1ib3JkZXItY29sb3I6XG4gKiB0YWctb3V0bGluZS13YXJuaW5nLXNlbGVjdGVkLXRleHQtY29sb3I6XG4gKiB0YWctb3V0bGluZS1kYW5nZXItYmFja2dyb3VuZC1jb2xvcjpcbiAqIHRhZy1vdXRsaW5lLWRhbmdlci1ib3JkZXItY29sb3I6XG4gKiB0YWctb3V0bGluZS1kYW5nZXItdGV4dC1jb2xvcjpcbiAqIHRhZy1vdXRsaW5lLWRhbmdlci1hY3RpdmUtYmFja2dyb3VuZC1jb2xvcjpcbiAqIHRhZy1vdXRsaW5lLWRhbmdlci1hY3RpdmUtYm9yZGVyLWNvbG9yOlxuICogdGFnLW91dGxpbmUtZGFuZ2VyLWFjdGl2ZS10ZXh0LWNvbG9yOlxuICogdGFnLW91dGxpbmUtZGFuZ2VyLWhvdmVyLWJhY2tncm91bmQtY29sb3I6XG4gKiB0YWctb3V0bGluZS1kYW5nZXItaG92ZXItYm9yZGVyLWNvbG9yOlxuICogdGFnLW91dGxpbmUtZGFuZ2VyLWhvdmVyLXRleHQtY29sb3I6XG4gKiB0YWctb3V0bGluZS1kYW5nZXItc2VsZWN0ZWQtYmFja2dyb3VuZC1jb2xvcjpcbiAqIHRhZy1vdXRsaW5lLWRhbmdlci1zZWxlY3RlZC1ib3JkZXItY29sb3I6XG4gKiB0YWctb3V0bGluZS1kYW5nZXItc2VsZWN0ZWQtdGV4dC1jb2xvcjpcbiAqIHRhZy1vdXRsaW5lLWNvbnRyb2wtYmFja2dyb3VuZC1jb2xvcjpcbiAqIHRhZy1vdXRsaW5lLWNvbnRyb2wtYm9yZGVyLWNvbG9yOlxuICogdGFnLW91dGxpbmUtY29udHJvbC10ZXh0LWNvbG9yOlxuICogdGFnLW91dGxpbmUtY29udHJvbC1hY3RpdmUtYmFja2dyb3VuZC1jb2xvcjpcbiAqIHRhZy1vdXRsaW5lLWNvbnRyb2wtYWN0aXZlLWJvcmRlci1jb2xvcjpcbiAqIHRhZy1vdXRsaW5lLWNvbnRyb2wtYWN0aXZlLXRleHQtY29sb3I6XG4gKiB0YWctb3V0bGluZS1jb250cm9sLWhvdmVyLWJhY2tncm91bmQtY29sb3I6XG4gKiB0YWctb3V0bGluZS1jb250cm9sLWhvdmVyLWJvcmRlci1jb2xvcjpcbiAqIHRhZy1vdXRsaW5lLWNvbnRyb2wtaG92ZXItdGV4dC1jb2xvcjpcbiAqIHRhZy1vdXRsaW5lLWNvbnRyb2wtc2VsZWN0ZWQtYmFja2dyb3VuZC1jb2xvcjpcbiAqIHRhZy1vdXRsaW5lLWNvbnRyb2wtc2VsZWN0ZWQtYm9yZGVyLWNvbG9yOlxuICogdGFnLW91dGxpbmUtY29udHJvbC1zZWxlY3RlZC10ZXh0LWNvbG9yOlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduYi10YWcnLFxuICB0ZW1wbGF0ZVVybDogJy4vdGFnLmNvbXBvbmVudC5odG1sJyxcbiAgZXhwb3J0QXM6ICduYlRhZycsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBOYlRhZ0NvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSwgTmJIaWdobGlnaHRhYmxlT3B0aW9uIHtcblxuICBwcml2YXRlIF9kZXN0cm95JDogU3ViamVjdDxOYlRhZ0NvbXBvbmVudD4gPSBuZXcgU3ViamVjdDxOYlRhZ0NvbXBvbmVudD4oKTtcblxuICBnZXQgZGVzdHJveSQoKTogT2JzZXJ2YWJsZTxOYlRhZ0NvbXBvbmVudD4ge1xuICAgIHJldHVybiB0aGlzLl9kZXN0cm95JC5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUYWcgdGV4dC5cbiAgICovXG4gIEBJbnB1dCgpIHRleHQ6IHN0cmluZztcblxuICBASW5wdXQoKVxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnNlbGVjdGVkJylcbiAgQEhvc3RCaW5kaW5nKCdhdHRyLmFyaWEtc2VsZWN0ZWQnKVxuICBnZXQgc2VsZWN0ZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkO1xuICB9XG4gIHNldCBzZWxlY3RlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgIGlmICh0aGlzLnNlbGVjdGVkICE9PSBjb252ZXJ0VG9Cb29sUHJvcGVydHkodmFsdWUpKSB7XG4gICAgICB0aGlzLl9zZWxlY3RlZCA9ICF0aGlzLnNlbGVjdGVkO1xuICAgICAgdGhpcy5zZWxlY3RlZENoYW5nZS5lbWl0KHsgdGFnOiB0aGlzLCBzZWxlY3RlZDogdGhpcy5zZWxlY3RlZCB9KTtcbiAgICB9XG4gIH1cbiAgcHJvdGVjdGVkIF9zZWxlY3RlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfc2VsZWN0ZWQ6IE5iQm9vbGVhbklucHV0O1xuXG4gIC8qKlxuICAgKiBDb250cm9scyB3aGV0aGVyIHRoZSB1c2VyIGNhbiByZW1vdmUgYSB0YWcgb3Igbm90LlxuICAgKi9cbiAgQElucHV0KClcbiAgZ2V0IHJlbW92YWJsZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fcmVtb3ZhYmxlO1xuICB9XG4gIHNldCByZW1vdmFibGUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9yZW1vdmFibGUgPSBjb252ZXJ0VG9Cb29sUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIHByb3RlY3RlZCBfcmVtb3ZhYmxlOiBib29sZWFuID0gZmFsc2U7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9yZW1vdmFibGU6IE5iQm9vbGVhbklucHV0O1xuXG4gIC8qKlxuICAgKiBUYWcgYXBwZWFyYW5jZTogYGZpbGxlZGAsIGBvdXRsaW5lYC5cbiAgICovXG4gIEBJbnB1dCgpIGFwcGVhcmFuY2U6IE5iVGFnQXBwZWFyYW5jZSA9ICdmaWxsZWQnO1xuXG4gIC8qKlxuICAgKiBUYWcgc3RhdHVzOiBgYmFzaWNgLCBgcHJpbWFyeWAsIGBpbmZvYCwgYHN1Y2Nlc3NgLCBgd2FybmluZ2AsIGBkYW5nZXJgLCBgY29udHJvbGAuXG4gICAqL1xuICBASW5wdXQoKSBzdGF0dXM6IE5iQ29tcG9uZW50T3JDdXN0b21TdGF0dXMgPSAnYmFzaWMnO1xuXG4gIC8qKlxuICAgKiBUYWcgc2l6ZTogYHRpbnlgLCBgc21hbGxgLCBgbWVkaXVtYCwgYGxhcmdlYCwgYGdpYW50YC5cbiAgICovXG4gIEBJbnB1dCgpIHNpemU6IE5iQ29tcG9uZW50U2l6ZSA9ICdtZWRpdW0nO1xuXG4gIEBJbnB1dCgpXG4gIEBIb3N0QmluZGluZygnYXR0ci5yb2xlJylcbiAgcm9sZTogc3RyaW5nID0gJ29wdGlvbic7XG5cbiAgLyoqXG4gICAqIEVtaXRzIHdoZW4gdGhlIHVzZXIgcmVtb3ZlcyB0aGUgdGFnXG4gICAqICh3aGV0aGVyIGJ5IGNsaWNraW5nIG9uIHRoZSByZW1vdmUgYnV0dG9uIG9yIGJ5IHByZXNzaW5nIGBkZWxldGVgIG9yIGBiYWNrc3BhY2VgIGtleSkuXG4gICAqL1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgcmVtb3ZlOiBFdmVudEVtaXR0ZXI8TmJUYWdDb21wb25lbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxOYlRhZ0NvbXBvbmVudD4oKTtcblxuICBAT3V0cHV0KCkgcmVhZG9ubHkgc2VsZWN0ZWRDaGFuZ2U6IEV2ZW50RW1pdHRlcjxOYlRhZ1NlbGVjdGlvbkNoYW5nZT4gPSBuZXcgRXZlbnRFbWl0dGVyPE5iVGFnU2VsZWN0aW9uQ2hhbmdlPigpO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MuYWN0aXZlJylcbiAgX2lzQWN0aXZlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLmlkJylcbiAgX2lkOiBzdHJpbmcgPSBgbmItdGFnLSR7dGFnVW5pcXVlSWQrK31gO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MuYXBwZWFyYW5jZS1maWxsZWQnKVxuICBnZXQgZmlsbGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmFwcGVhcmFuY2UgPT09ICdmaWxsZWQnO1xuICB9XG4gIHNldCBmaWxsZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICBpZiAoY29udmVydFRvQm9vbFByb3BlcnR5KHZhbHVlKSkge1xuICAgICAgdGhpcy5hcHBlYXJhbmNlID0gJ2ZpbGxlZCc7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5hcHBlYXJhbmNlLW91dGxpbmUnKVxuICBnZXQgb3V0bGluZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5hcHBlYXJhbmNlID09PSAnb3V0bGluZSc7XG4gIH1cbiAgc2V0IG91dGxpbmUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICBpZiAoY29udmVydFRvQm9vbFByb3BlcnR5KHZhbHVlKSkge1xuICAgICAgdGhpcy5hcHBlYXJhbmNlID0gJ291dGxpbmUnO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3Muc3RhdHVzLWJhc2ljJylcbiAgZ2V0IGJhc2ljKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXR1cyA9PT0gJ2Jhc2ljJztcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3Muc3RhdHVzLXByaW1hcnknKVxuICBnZXQgcHJpbWFyeSgpIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0dXMgPT09ICdwcmltYXJ5JztcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3Muc3RhdHVzLXN1Y2Nlc3MnKVxuICBnZXQgc3VjY2VzcygpIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0dXMgPT09ICdzdWNjZXNzJztcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3Muc3RhdHVzLWluZm8nKVxuICBnZXQgaW5mbygpIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0dXMgPT09ICdpbmZvJztcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3Muc3RhdHVzLXdhcm5pbmcnKVxuICBnZXQgd2FybmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0dXMgPT09ICd3YXJuaW5nJztcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3Muc3RhdHVzLWRhbmdlcicpXG4gIGdldCBkYW5nZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdHVzID09PSAnZGFuZ2VyJztcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3Muc3RhdHVzLWNvbnRyb2wnKVxuICBnZXQgY29udHJvbCgpIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0dXMgPT09ICdjb250cm9sJztcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3Muc2l6ZS10aW55JylcbiAgZ2V0IHRpbnkoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2l6ZSA9PT0gJ3RpbnknO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5zaXplLXNtYWxsJylcbiAgZ2V0IHNtYWxsKCkge1xuICAgIHJldHVybiB0aGlzLnNpemUgPT09ICdzbWFsbCc7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnNpemUtbWVkaXVtJylcbiAgZ2V0IG1lZGl1bSgpIHtcbiAgICByZXR1cm4gdGhpcy5zaXplID09PSAnbWVkaXVtJztcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3Muc2l6ZS1sYXJnZScpXG4gIGdldCBsYXJnZSgpIHtcbiAgICByZXR1cm4gdGhpcy5zaXplID09PSAnbGFyZ2UnO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5zaXplLWdpYW50JylcbiAgZ2V0IGdpYW50KCkge1xuICAgIHJldHVybiB0aGlzLnNpemUgPT09ICdnaWFudCc7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzJylcbiAgZ2V0IGFkZGl0aW9uYWxDbGFzc2VzKCk6IHN0cmluZ1tdIHtcbiAgICBpZiAodGhpcy5zdGF0dXNTZXJ2aWNlLmlzQ3VzdG9tU3RhdHVzKHRoaXMuc3RhdHVzKSkge1xuICAgICAgcmV0dXJuIFt0aGlzLnN0YXR1c1NlcnZpY2UuZ2V0U3RhdHVzQ2xhc3ModGhpcy5zdGF0dXMpXTtcbiAgICB9XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bi5kZWxldGUnKVxuICBASG9zdExpc3RlbmVyKCdrZXlkb3duLmJhY2tzcGFjZScpXG4gIF9yZW1vdmUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMucmVtb3ZhYmxlKSB7XG4gICAgICB0aGlzLnJlbW92ZS5lbWl0KHRoaXMpO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBfaG9zdEVsZW1lbnQ6IEVsZW1lbnRSZWYsXG4gICAgcHJvdGVjdGVkIGNkOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcm90ZWN0ZWQgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcm90ZWN0ZWQgem9uZTogTmdab25lLFxuICAgIHByb3RlY3RlZCBzdGF0dXNTZXJ2aWNlOiBOYlN0YXR1c1NlcnZpY2UsXG4gICkge31cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgLy8gVE9ETzogIzIyNTRcbiAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuX2hvc3RFbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICduYi10cmFuc2l0aW9uJyk7XG4gICAgfSkpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fZGVzdHJveSQubmV4dCh0aGlzKTtcbiAgfVxuXG4gIF90b2dnbGVTZWxlY3Rpb24oKTogdm9pZCB7XG4gICAgdGhpcy5zZWxlY3RlZCA9ICF0aGlzLnNlbGVjdGVkO1xuICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBzZXRBY3RpdmVTdHlsZXMoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLl9pc0FjdGl2ZSkge1xuICAgICAgdGhpcy5faXNBY3RpdmUgPSB0cnVlO1xuICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gIH1cblxuICBzZXRJbmFjdGl2ZVN0eWxlcygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5faXNBY3RpdmUpIHtcbiAgICAgIHRoaXMuX2lzQWN0aXZlID0gZmFsc2U7XG4gICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cbiAgfVxufVxuIiwie3sgdGV4dCB9fVxuPG5iLWljb24gKm5nSWY9XCJyZW1vdmFibGVcIlxuICAgICAgICAgKGNsaWNrKT1cIl9yZW1vdmUoKVwiXG4gICAgICAgICBjbGFzcz1cIm5iLXRhZy1yZW1vdmUgc2l6ZS17e3NpemV9fVwiXG4gICAgICAgICBpY29uPVwiY2xvc2Utb3V0bGluZVwiXG4gICAgICAgICBwYWNrPVwibmVidWxhci1lc3NlbnRpYWxzXCJcbiAgICAgICAgIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxuPC9uYi1pY29uPlxuIl19