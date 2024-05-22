/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, HostBinding, Input } from '@angular/core';
import { convertToBoolProperty } from '../helpers';
import * as i0 from "@angular/core";
import * as i1 from "../../services/status.service";
/**
 * Badge is a simple labeling component.
 * It can be used to add additional information to any content or highlight unread items.
 *
 * Element is absolute positioned, so parent should be
 * [positioned element](https://developer.mozilla.org/en-US/docs/Web/CSS/position).
 * It means parent `position` should be set to anything except `static`, e.g. `relative`,
 * `absolute`, `fixed`, or `sticky`.
 *
 * ### Installation
 *
 * Import `NbBadgeModule` to your feature module.
 * ```ts
 * @NgModule({
 *   imports: [
 *     // ...
 *     NbBadgeModule,
 *   ],
 * })
 * export class PageModule { }
 * ```
 * ### Usage
 *
 * Badge with default position and status(color):
 *
 * ```html
 * <nb-badge text="badgeText"></nb-badge>
 * ```
 *
 * For example, badge can be placed into nb-card header:
 * @stacked-example(Showcase, badge/badge-showcase.component)
 *
 * Badge located on the bottom right with warning status:
 *
 * ```html
 * <nb-badge text="badgeText" status="warning" position="bottom right">
 * </nb-badge>
 * ```
 *
 * @styles
 *
 * badge-border-radius:
 * badge-text-font-family:
 * badge-text-font-size:
 * badge-text-font-weight:
 * badge-text-line-height:
 * badge-padding:
 * badge-basic-background-color:
 * badge-basic-text-color:
 * badge-primary-background-color:
 * badge-primary-text-color:
 * badge-success-background-color:
 * badge-success-text-color:
 * badge-info-background-color:
 * badge-info-text-color:
 * badge-warning-background-color:
 * badge-warning-text-color:
 * badge-danger-background-color:
 * badge-danger-text-color:
 * badge-control-background-color:
 * badge-control-text-color:
 */
export class NbBadgeComponent {
    /**
     * Badge position
     *
     * Can be set to any class or to one of predefined positions:
     * 'top left', 'top right', 'bottom left', 'bottom right',
     * 'top start', 'top end', 'bottom start', 'bottom end'
     * @type string
     */
    get position() {
        return this._position;
    }
    set position(value) {
        this._position = value || this._defaultPosition;
    }
    /**
     * Shows badge as a dot. No text is shown.
     * @type boolean
     */
    get dotMode() {
        return this._dotMode;
    }
    set dotMode(value) {
        this._dotMode = convertToBoolProperty(value);
    }
    get additionalClasses() {
        if (this.statusService.isCustomStatus(this.status)) {
            return [this.statusService.getStatusClass(this.status)];
        }
        return [];
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
    get basic() {
        return this.status === 'basic';
    }
    get control() {
        return this.status === 'control';
    }
    get top() {
        return this.position.includes('top');
    }
    get right() {
        return this.position.includes('right');
    }
    get bottom() {
        return this.position.includes('bottom');
    }
    get left() {
        return this.position.includes('left');
    }
    get start() {
        return this.position.includes('start');
    }
    get end() {
        return this.position.includes('end');
    }
    get center() {
        return this.position.includes('center');
    }
    constructor(statusService) {
        this.statusService = statusService;
        /**
         * Text to display
         * @type string
         */
        this.text = '';
        this._defaultPosition = 'top right';
        this._position = this._defaultPosition;
        /**
         * Badge status (adds specific styles):
         * 'basic', 'primary', 'info', 'success', 'warning', 'danger', 'control'
         */
        this.status = 'basic';
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbBadgeComponent, deps: [{ token: i1.NbStatusService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.1.0", type: NbBadgeComponent, selector: "nb-badge", inputs: { text: "text", position: "position", dotMode: "dotMode", status: "status" }, host: { properties: { "class.dot-mode": "this.dotMode", "class": "this.additionalClasses", "class.status-primary": "this.primary", "class.status-success": "this.success", "class.status-info": "this.info", "class.status-warning": "this.warning", "class.status-danger": "this.danger", "class.status-basic": "this.basic", "class.status-control": "this.control", "class.position-top": "this.top", "class.position-right": "this.right", "class.position-bottom": "this.bottom", "class.position-left": "this.left", "class.position-start": "this.start", "class.position-end": "this.end", "class.position-center": "this.center" } }, ngImport: i0, template: `{{dotMode ? '' : text}}`, isInline: true, styles: ["/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */:host{position:absolute;text-align:center;white-space:nowrap;vertical-align:baseline}:host(.position-top){top:0}:host(.position-right){right:0}:host(.position-bottom){bottom:0}:host(.position-left){left:0}:host(.position-center){top:50%;transform:translateY(-50%)}[dir=ltr] :host(.position-start){left:0}[dir=rtl] :host(.position-start){right:0}[dir=ltr] :host(.position-end){right:0}[dir=rtl] :host(.position-end){left:0}\n"] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbBadgeComponent, decorators: [{
            type: Component,
            args: [{ selector: 'nb-badge', template: `{{dotMode ? '' : text}}`, styles: ["/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */:host{position:absolute;text-align:center;white-space:nowrap;vertical-align:baseline}:host(.position-top){top:0}:host(.position-right){right:0}:host(.position-bottom){bottom:0}:host(.position-left){left:0}:host(.position-center){top:50%;transform:translateY(-50%)}[dir=ltr] :host(.position-start){left:0}[dir=rtl] :host(.position-start){right:0}[dir=ltr] :host(.position-end){right:0}[dir=rtl] :host(.position-end){left:0}\n"] }]
        }], ctorParameters: () => [{ type: i1.NbStatusService }], propDecorators: { text: [{
                type: Input
            }], position: [{
                type: Input
            }], dotMode: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['class.dot-mode']
            }], status: [{
                type: Input
            }], additionalClasses: [{
                type: HostBinding,
                args: ['class']
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
            }], basic: [{
                type: HostBinding,
                args: ['class.status-basic']
            }], control: [{
                type: HostBinding,
                args: ['class.status-control']
            }], top: [{
                type: HostBinding,
                args: ['class.position-top']
            }], right: [{
                type: HostBinding,
                args: ['class.position-right']
            }], bottom: [{
                type: HostBinding,
                args: ['class.position-bottom']
            }], left: [{
                type: HostBinding,
                args: ['class.position-left']
            }], start: [{
                type: HostBinding,
                args: ['class.position-start']
            }], end: [{
                type: HostBinding,
                args: ['class.position-end']
            }], center: [{
                type: HostBinding,
                args: ['class.position-center']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFkZ2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2ZyYW1ld29yay90aGVtZS9jb21wb25lbnRzL2JhZGdlL2JhZGdlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBSTlELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLFlBQVksQ0FBQzs7O0FBYW5EOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNkRHO0FBTUgsTUFBTSxPQUFPLGdCQUFnQjtJQVEzQjs7Ozs7OztPQU9HO0lBQ0gsSUFDSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3hCLENBQUM7SUFDRCxJQUFJLFFBQVEsQ0FBQyxLQUFzQjtRQUNqQyxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssSUFBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUM7SUFDbEQsQ0FBQztJQUlEOzs7T0FHRztJQUNILElBRUksT0FBTztRQUNULE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBQ0QsSUFBSSxPQUFPLENBQUMsS0FBYztRQUN4QixJQUFJLENBQUMsUUFBUSxHQUFHLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFTRCxJQUNJLGlCQUFpQjtRQUNuQixJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1lBQ25ELE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUMxRCxDQUFDO1FBQ0QsT0FBTyxFQUFFLENBQUM7SUFDWixDQUFDO0lBRUQsSUFDSSxPQUFPO1FBQ1QsT0FBTyxJQUFJLENBQUMsTUFBTSxLQUFLLFNBQVMsQ0FBQztJQUNuQyxDQUFDO0lBRUQsSUFDSSxPQUFPO1FBQ1QsT0FBTyxJQUFJLENBQUMsTUFBTSxLQUFLLFNBQVMsQ0FBQztJQUNuQyxDQUFDO0lBRUQsSUFDSSxJQUFJO1FBQ04sT0FBTyxJQUFJLENBQUMsTUFBTSxLQUFLLE1BQU0sQ0FBQztJQUNoQyxDQUFDO0lBRUQsSUFDSSxPQUFPO1FBQ1QsT0FBTyxJQUFJLENBQUMsTUFBTSxLQUFLLFNBQVMsQ0FBQztJQUNuQyxDQUFDO0lBRUQsSUFDSSxNQUFNO1FBQ1IsT0FBTyxJQUFJLENBQUMsTUFBTSxLQUFLLFFBQVEsQ0FBQztJQUNsQyxDQUFDO0lBRUQsSUFDSSxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsTUFBTSxLQUFLLE9BQU8sQ0FBQztJQUNqQyxDQUFDO0lBRUQsSUFDSSxPQUFPO1FBQ1QsT0FBTyxJQUFJLENBQUMsTUFBTSxLQUFLLFNBQVMsQ0FBQztJQUNuQyxDQUFDO0lBRUQsSUFDSSxHQUFHO1FBQ0wsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQsSUFDSSxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRUQsSUFDSSxNQUFNO1FBQ1IsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRUQsSUFDSSxJQUFJO1FBQ04sT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRUQsSUFDSSxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRUQsSUFDSSxHQUFHO1FBQ0wsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQsSUFDSSxNQUFNO1FBQ1IsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRUQsWUFBc0IsYUFBOEI7UUFBOUIsa0JBQWEsR0FBYixhQUFhLENBQWlCO1FBMUhwRDs7O1dBR0c7UUFDTSxTQUFJLEdBQVcsRUFBRSxDQUFDO1FBaUJqQixxQkFBZ0IsR0FBb0IsV0FBVyxDQUFDO1FBQ2hELGNBQVMsR0FBb0IsSUFBSSxDQUFDLGdCQUFnQixDQUFDO1FBZ0I3RDs7O1dBR0c7UUFDTSxXQUFNLEdBQThCLE9BQU8sQ0FBQztJQWlGckQsQ0FBQzs4R0E3SFUsZ0JBQWdCO2tHQUFoQixnQkFBZ0IscXZCQUZqQix5QkFBeUI7OzJGQUV4QixnQkFBZ0I7a0JBTDVCLFNBQVM7K0JBQ0UsVUFBVSxZQUVWLHlCQUF5QjtvRkFRMUIsSUFBSTtzQkFBWixLQUFLO2dCQVdGLFFBQVE7c0JBRFgsS0FBSztnQkFnQkYsT0FBTztzQkFGVixLQUFLOztzQkFDTCxXQUFXO3VCQUFDLGdCQUFnQjtnQkFhcEIsTUFBTTtzQkFBZCxLQUFLO2dCQUdGLGlCQUFpQjtzQkFEcEIsV0FBVzt1QkFBQyxPQUFPO2dCQVNoQixPQUFPO3NCQURWLFdBQVc7dUJBQUMsc0JBQXNCO2dCQU0vQixPQUFPO3NCQURWLFdBQVc7dUJBQUMsc0JBQXNCO2dCQU0vQixJQUFJO3NCQURQLFdBQVc7dUJBQUMsbUJBQW1CO2dCQU01QixPQUFPO3NCQURWLFdBQVc7dUJBQUMsc0JBQXNCO2dCQU0vQixNQUFNO3NCQURULFdBQVc7dUJBQUMscUJBQXFCO2dCQU05QixLQUFLO3NCQURSLFdBQVc7dUJBQUMsb0JBQW9CO2dCQU03QixPQUFPO3NCQURWLFdBQVc7dUJBQUMsc0JBQXNCO2dCQU0vQixHQUFHO3NCQUROLFdBQVc7dUJBQUMsb0JBQW9CO2dCQU03QixLQUFLO3NCQURSLFdBQVc7dUJBQUMsc0JBQXNCO2dCQU0vQixNQUFNO3NCQURULFdBQVc7dUJBQUMsdUJBQXVCO2dCQU1oQyxJQUFJO3NCQURQLFdBQVc7dUJBQUMscUJBQXFCO2dCQU05QixLQUFLO3NCQURSLFdBQVc7dUJBQUMsc0JBQXNCO2dCQU0vQixHQUFHO3NCQUROLFdBQVc7dUJBQUMsb0JBQW9CO2dCQU03QixNQUFNO3NCQURULFdBQVc7dUJBQUMsdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEFrdmVvLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqL1xuXG5pbXBvcnQgeyBDb21wb25lbnQsIEhvc3RCaW5kaW5nLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOYlN0YXR1c1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9zdGF0dXMuc2VydmljZSc7XG5pbXBvcnQgeyBOYkNvbXBvbmVudE9yQ3VzdG9tU3RhdHVzIH0gZnJvbSAnLi4vY29tcG9uZW50LXN0YXR1cyc7XG5pbXBvcnQgeyBjb252ZXJ0VG9Cb29sUHJvcGVydHkgfSBmcm9tICcuLi9oZWxwZXJzJztcblxuZXhwb3J0IHR5cGUgTmJCYWRnZVBoeXNpY2FsUG9zaXRpb24gPSAndG9wIGxlZnQnIHwgJ3RvcCByaWdodCcgfCAnYm90dG9tIGxlZnQnIHwgJ2JvdHRvbSByaWdodCcgfCAnY2VudGVyIHJpZ2h0JyB8ICdjZW50ZXIgbGVmdCc7XG5leHBvcnQgdHlwZSBOYkJhZGdlTG9naWNhbFBvc2l0aW9uID0gJ3RvcCBzdGFydCcgfCAndG9wIGVuZCcgfCAnYm90dG9tIHN0YXJ0JyB8ICdib3R0b20gZW5kJyB8ICdjZW50ZXIgc3RhcnQnfCAnY2VudGVyIGVuZCc7XG5leHBvcnQgdHlwZSBOYkJhZGdlUG9zaXRpb24gPSBOYkJhZGdlUGh5c2ljYWxQb3NpdGlvbiB8IE5iQmFkZ2VMb2dpY2FsUG9zaXRpb247XG5cbmV4cG9ydCBpbnRlcmZhY2UgTmJCYWRnZSB7XG4gIHRleHQ/OiBzdHJpbmc7XG4gIHBvc2l0aW9uPzogTmJCYWRnZVBvc2l0aW9uO1xuICBzdGF0dXM/OiBOYkNvbXBvbmVudE9yQ3VzdG9tU3RhdHVzO1xuICBkb3RNb2RlPzogYm9vbGVhbjtcbn1cblxuLyoqXG4gKiBCYWRnZSBpcyBhIHNpbXBsZSBsYWJlbGluZyBjb21wb25lbnQuXG4gKiBJdCBjYW4gYmUgdXNlZCB0byBhZGQgYWRkaXRpb25hbCBpbmZvcm1hdGlvbiB0byBhbnkgY29udGVudCBvciBoaWdobGlnaHQgdW5yZWFkIGl0ZW1zLlxuICpcbiAqIEVsZW1lbnQgaXMgYWJzb2x1dGUgcG9zaXRpb25lZCwgc28gcGFyZW50IHNob3VsZCBiZVxuICogW3Bvc2l0aW9uZWQgZWxlbWVudF0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQ1NTL3Bvc2l0aW9uKS5cbiAqIEl0IG1lYW5zIHBhcmVudCBgcG9zaXRpb25gIHNob3VsZCBiZSBzZXQgdG8gYW55dGhpbmcgZXhjZXB0IGBzdGF0aWNgLCBlLmcuIGByZWxhdGl2ZWAsXG4gKiBgYWJzb2x1dGVgLCBgZml4ZWRgLCBvciBgc3RpY2t5YC5cbiAqXG4gKiAjIyMgSW5zdGFsbGF0aW9uXG4gKlxuICogSW1wb3J0IGBOYkJhZGdlTW9kdWxlYCB0byB5b3VyIGZlYXR1cmUgbW9kdWxlLlxuICogYGBgdHNcbiAqIEBOZ01vZHVsZSh7XG4gKiAgIGltcG9ydHM6IFtcbiAqICAgICAvLyAuLi5cbiAqICAgICBOYkJhZGdlTW9kdWxlLFxuICogICBdLFxuICogfSlcbiAqIGV4cG9ydCBjbGFzcyBQYWdlTW9kdWxlIHsgfVxuICogYGBgXG4gKiAjIyMgVXNhZ2VcbiAqXG4gKiBCYWRnZSB3aXRoIGRlZmF1bHQgcG9zaXRpb24gYW5kIHN0YXR1cyhjb2xvcik6XG4gKlxuICogYGBgaHRtbFxuICogPG5iLWJhZGdlIHRleHQ9XCJiYWRnZVRleHRcIj48L25iLWJhZGdlPlxuICogYGBgXG4gKlxuICogRm9yIGV4YW1wbGUsIGJhZGdlIGNhbiBiZSBwbGFjZWQgaW50byBuYi1jYXJkIGhlYWRlcjpcbiAqIEBzdGFja2VkLWV4YW1wbGUoU2hvd2Nhc2UsIGJhZGdlL2JhZGdlLXNob3djYXNlLmNvbXBvbmVudClcbiAqXG4gKiBCYWRnZSBsb2NhdGVkIG9uIHRoZSBib3R0b20gcmlnaHQgd2l0aCB3YXJuaW5nIHN0YXR1czpcbiAqXG4gKiBgYGBodG1sXG4gKiA8bmItYmFkZ2UgdGV4dD1cImJhZGdlVGV4dFwiIHN0YXR1cz1cIndhcm5pbmdcIiBwb3NpdGlvbj1cImJvdHRvbSByaWdodFwiPlxuICogPC9uYi1iYWRnZT5cbiAqIGBgYFxuICpcbiAqIEBzdHlsZXNcbiAqXG4gKiBiYWRnZS1ib3JkZXItcmFkaXVzOlxuICogYmFkZ2UtdGV4dC1mb250LWZhbWlseTpcbiAqIGJhZGdlLXRleHQtZm9udC1zaXplOlxuICogYmFkZ2UtdGV4dC1mb250LXdlaWdodDpcbiAqIGJhZGdlLXRleHQtbGluZS1oZWlnaHQ6XG4gKiBiYWRnZS1wYWRkaW5nOlxuICogYmFkZ2UtYmFzaWMtYmFja2dyb3VuZC1jb2xvcjpcbiAqIGJhZGdlLWJhc2ljLXRleHQtY29sb3I6XG4gKiBiYWRnZS1wcmltYXJ5LWJhY2tncm91bmQtY29sb3I6XG4gKiBiYWRnZS1wcmltYXJ5LXRleHQtY29sb3I6XG4gKiBiYWRnZS1zdWNjZXNzLWJhY2tncm91bmQtY29sb3I6XG4gKiBiYWRnZS1zdWNjZXNzLXRleHQtY29sb3I6XG4gKiBiYWRnZS1pbmZvLWJhY2tncm91bmQtY29sb3I6XG4gKiBiYWRnZS1pbmZvLXRleHQtY29sb3I6XG4gKiBiYWRnZS13YXJuaW5nLWJhY2tncm91bmQtY29sb3I6XG4gKiBiYWRnZS13YXJuaW5nLXRleHQtY29sb3I6XG4gKiBiYWRnZS1kYW5nZXItYmFja2dyb3VuZC1jb2xvcjpcbiAqIGJhZGdlLWRhbmdlci10ZXh0LWNvbG9yOlxuICogYmFkZ2UtY29udHJvbC1iYWNrZ3JvdW5kLWNvbG9yOlxuICogYmFkZ2UtY29udHJvbC10ZXh0LWNvbG9yOlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduYi1iYWRnZScsXG4gIHN0eWxlVXJsczogWycuL2JhZGdlLmNvbXBvbmVudC5zY3NzJ10sXG4gIHRlbXBsYXRlOiBge3tkb3RNb2RlID8gJycgOiB0ZXh0fX1gLFxufSlcbmV4cG9ydCBjbGFzcyBOYkJhZGdlQ29tcG9uZW50IGltcGxlbWVudHMgTmJCYWRnZSB7XG5cbiAgLyoqXG4gICAqIFRleHQgdG8gZGlzcGxheVxuICAgKiBAdHlwZSBzdHJpbmdcbiAgICovXG4gIEBJbnB1dCgpIHRleHQ6IHN0cmluZyA9ICcnO1xuXG4gIC8qKlxuICAgKiBCYWRnZSBwb3NpdGlvblxuICAgKlxuICAgKiBDYW4gYmUgc2V0IHRvIGFueSBjbGFzcyBvciB0byBvbmUgb2YgcHJlZGVmaW5lZCBwb3NpdGlvbnM6XG4gICAqICd0b3AgbGVmdCcsICd0b3AgcmlnaHQnLCAnYm90dG9tIGxlZnQnLCAnYm90dG9tIHJpZ2h0JyxcbiAgICogJ3RvcCBzdGFydCcsICd0b3AgZW5kJywgJ2JvdHRvbSBzdGFydCcsICdib3R0b20gZW5kJ1xuICAgKiBAdHlwZSBzdHJpbmdcbiAgICovXG4gIEBJbnB1dCgpXG4gIGdldCBwb3NpdGlvbigpOiBOYkJhZGdlUG9zaXRpb24ge1xuICAgIHJldHVybiB0aGlzLl9wb3NpdGlvbjtcbiAgfVxuICBzZXQgcG9zaXRpb24odmFsdWU6IE5iQmFkZ2VQb3NpdGlvbikge1xuICAgIHRoaXMuX3Bvc2l0aW9uID0gdmFsdWUgfHwgdGhpcy5fZGVmYXVsdFBvc2l0aW9uO1xuICB9XG4gIHByb3RlY3RlZCBfZGVmYXVsdFBvc2l0aW9uOiBOYkJhZGdlUG9zaXRpb24gPSAndG9wIHJpZ2h0JztcbiAgcHJvdGVjdGVkIF9wb3NpdGlvbjogTmJCYWRnZVBvc2l0aW9uID0gdGhpcy5fZGVmYXVsdFBvc2l0aW9uO1xuXG4gIC8qKlxuICAgKiBTaG93cyBiYWRnZSBhcyBhIGRvdC4gTm8gdGV4dCBpcyBzaG93bi5cbiAgICogQHR5cGUgYm9vbGVhblxuICAgKi9cbiAgQElucHV0KClcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5kb3QtbW9kZScpXG4gIGdldCBkb3RNb2RlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9kb3RNb2RlO1xuICB9XG4gIHNldCBkb3RNb2RlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fZG90TW9kZSA9IGNvbnZlcnRUb0Jvb2xQcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJvdGVjdGVkIF9kb3RNb2RlOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBCYWRnZSBzdGF0dXMgKGFkZHMgc3BlY2lmaWMgc3R5bGVzKTpcbiAgICogJ2Jhc2ljJywgJ3ByaW1hcnknLCAnaW5mbycsICdzdWNjZXNzJywgJ3dhcm5pbmcnLCAnZGFuZ2VyJywgJ2NvbnRyb2wnXG4gICAqL1xuICBASW5wdXQoKSBzdGF0dXM6IE5iQ29tcG9uZW50T3JDdXN0b21TdGF0dXMgPSAnYmFzaWMnO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MnKVxuICBnZXQgYWRkaXRpb25hbENsYXNzZXMoKTogc3RyaW5nW10ge1xuICAgIGlmICh0aGlzLnN0YXR1c1NlcnZpY2UuaXNDdXN0b21TdGF0dXModGhpcy5zdGF0dXMpKSB7XG4gICAgICByZXR1cm4gW3RoaXMuc3RhdHVzU2VydmljZS5nZXRTdGF0dXNDbGFzcyh0aGlzLnN0YXR1cyldO1xuICAgIH1cbiAgICByZXR1cm4gW107XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnN0YXR1cy1wcmltYXJ5JylcbiAgZ2V0IHByaW1hcnkoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdHVzID09PSAncHJpbWFyeSc7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnN0YXR1cy1zdWNjZXNzJylcbiAgZ2V0IHN1Y2Nlc3MoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdHVzID09PSAnc3VjY2Vzcyc7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnN0YXR1cy1pbmZvJylcbiAgZ2V0IGluZm8oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdHVzID09PSAnaW5mbyc7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnN0YXR1cy13YXJuaW5nJylcbiAgZ2V0IHdhcm5pbmcoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdHVzID09PSAnd2FybmluZyc7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnN0YXR1cy1kYW5nZXInKVxuICBnZXQgZGFuZ2VyKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnN0YXR1cyA9PT0gJ2Rhbmdlcic7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnN0YXR1cy1iYXNpYycpXG4gIGdldCBiYXNpYygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0dXMgPT09ICdiYXNpYyc7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnN0YXR1cy1jb250cm9sJylcbiAgZ2V0IGNvbnRyb2woKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdHVzID09PSAnY29udHJvbCc7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnBvc2l0aW9uLXRvcCcpXG4gIGdldCB0b3AoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMucG9zaXRpb24uaW5jbHVkZXMoJ3RvcCcpO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5wb3NpdGlvbi1yaWdodCcpXG4gIGdldCByaWdodCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5wb3NpdGlvbi5pbmNsdWRlcygncmlnaHQnKTtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3MucG9zaXRpb24tYm90dG9tJylcbiAgZ2V0IGJvdHRvbSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5wb3NpdGlvbi5pbmNsdWRlcygnYm90dG9tJyk7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnBvc2l0aW9uLWxlZnQnKVxuICBnZXQgbGVmdCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5wb3NpdGlvbi5pbmNsdWRlcygnbGVmdCcpO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5wb3NpdGlvbi1zdGFydCcpXG4gIGdldCBzdGFydCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5wb3NpdGlvbi5pbmNsdWRlcygnc3RhcnQnKTtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3MucG9zaXRpb24tZW5kJylcbiAgZ2V0IGVuZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5wb3NpdGlvbi5pbmNsdWRlcygnZW5kJyk7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnBvc2l0aW9uLWNlbnRlcicpXG4gIGdldCBjZW50ZXIoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMucG9zaXRpb24uaW5jbHVkZXMoJ2NlbnRlcicpO1xuICB9XG5cbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIHN0YXR1c1NlcnZpY2U6IE5iU3RhdHVzU2VydmljZSkge1xuICB9XG59XG4iXX0=