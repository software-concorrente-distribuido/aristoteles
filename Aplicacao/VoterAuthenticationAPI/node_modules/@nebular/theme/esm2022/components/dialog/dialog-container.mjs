/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, ViewChild } from '@angular/core';
import { NbPortalOutletDirective } from '../cdk/overlay/mapping';
import * as i0 from "@angular/core";
import * as i1 from "./dialog-config";
import * as i2 from "../cdk/a11y/focus-trap";
import * as i3 from "../cdk/overlay/mapping";
/**
 * Container component for each dialog.
 * All the dialogs will be attached to it.
 * // TODO add animations
 * */
export class NbDialogContainerComponent {
    constructor(config, elementRef, focusTrapFactory) {
        this.config = config;
        this.elementRef = elementRef;
        this.focusTrapFactory = focusTrapFactory;
    }
    ngOnInit() {
        if (this.config.autoFocus) {
            this.focusTrap = this.focusTrapFactory.create(this.elementRef.nativeElement);
            this.focusTrap.blurPreviouslyFocusedElement();
            this.focusTrap.focusInitialElement();
        }
    }
    ngOnDestroy() {
        if (this.config.autoFocus && this.focusTrap) {
            this.focusTrap.restoreFocus();
        }
    }
    attachComponentPortal(portal) {
        return this.portalOutlet.attachComponentPortal(portal);
    }
    attachTemplatePortal(portal) {
        return this.portalOutlet.attachTemplatePortal(portal);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbDialogContainerComponent, deps: [{ token: i1.NbDialogConfig }, { token: i0.ElementRef }, { token: i2.NbFocusTrapFactoryService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.1.0", type: NbDialogContainerComponent, selector: "nb-dialog-container", viewQueries: [{ propertyName: "portalOutlet", first: true, predicate: NbPortalOutletDirective, descendants: true, static: true }], ngImport: i0, template: '<ng-template nbPortalOutlet></ng-template>', isInline: true, dependencies: [{ kind: "directive", type: i3.NbPortalOutletDirective, selector: "[nbPortalOutlet]" }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbDialogContainerComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nb-dialog-container',
                    template: '<ng-template nbPortalOutlet></ng-template>',
                }]
        }], ctorParameters: () => [{ type: i1.NbDialogConfig }, { type: i0.ElementRef }, { type: i2.NbFocusTrapFactoryService }], propDecorators: { portalOutlet: [{
                type: ViewChild,
                args: [NbPortalOutletDirective, { static: true }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLWNvbnRhaW5lci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9mcmFtZXdvcmsvdGhlbWUvY29tcG9uZW50cy9kaWFsb2cvZGlhbG9nLWNvbnRhaW5lci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFNBQVMsRUFBZ0UsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRW5ILE9BQU8sRUFBcUIsdUJBQXVCLEVBQW9CLE1BQU0sd0JBQXdCLENBQUM7Ozs7O0FBS3RHOzs7O0tBSUs7QUFLTCxNQUFNLE9BQU8sMEJBQTBCO0lBT3JDLFlBQXNCLE1BQXNCLEVBQ3RCLFVBQXNCLEVBQ3RCLGdCQUEyQztRQUYzQyxXQUFNLEdBQU4sTUFBTSxDQUFnQjtRQUN0QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBMkI7SUFDakUsQ0FBQztJQUVELFFBQVE7UUFDTixJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDMUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDN0UsSUFBSSxDQUFDLFNBQVMsQ0FBQyw0QkFBNEIsRUFBRSxDQUFDO1lBQzlDLElBQUksQ0FBQyxTQUFTLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUN2QyxDQUFDO0lBQ0gsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUM1QyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ2hDLENBQUM7SUFDSCxDQUFDO0lBRUQscUJBQXFCLENBQUksTUFBNEI7UUFDbkQsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLHFCQUFxQixDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFFRCxvQkFBb0IsQ0FBSSxNQUEyQjtRQUNqRCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDeEQsQ0FBQzs4R0FoQ1UsMEJBQTBCO2tHQUExQiwwQkFBMEIseUdBRzFCLHVCQUF1Qiw4REFMeEIsNENBQTRDOzsyRkFFM0MsMEJBQTBCO2tCQUp0QyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxxQkFBcUI7b0JBQy9CLFFBQVEsRUFBRSw0Q0FBNEM7aUJBQ3ZEO29KQUl1RCxZQUFZO3NCQUFqRSxTQUFTO3VCQUFDLHVCQUF1QixFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBBa3Zlby4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi9cblxuaW1wb3J0IHsgQ29tcG9uZW50LCBDb21wb25lbnRSZWYsIEVsZW1lbnRSZWYsIEVtYmVkZGVkVmlld1JlZiwgT25EZXN0cm95LCBPbkluaXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOYkNvbXBvbmVudFBvcnRhbCwgTmJQb3J0YWxPdXRsZXREaXJlY3RpdmUsIE5iVGVtcGxhdGVQb3J0YWwgfSBmcm9tICcuLi9jZGsvb3ZlcmxheS9tYXBwaW5nJztcbmltcG9ydCB7IE5iRm9jdXNUcmFwLCBOYkZvY3VzVHJhcEZhY3RvcnlTZXJ2aWNlIH0gZnJvbSAnLi4vY2RrL2ExMXkvZm9jdXMtdHJhcCc7XG5pbXBvcnQgeyBOYkRpYWxvZ0NvbmZpZyB9IGZyb20gJy4vZGlhbG9nLWNvbmZpZyc7XG5cblxuLyoqXG4gKiBDb250YWluZXIgY29tcG9uZW50IGZvciBlYWNoIGRpYWxvZy5cbiAqIEFsbCB0aGUgZGlhbG9ncyB3aWxsIGJlIGF0dGFjaGVkIHRvIGl0LlxuICogLy8gVE9ETyBhZGQgYW5pbWF0aW9uc1xuICogKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25iLWRpYWxvZy1jb250YWluZXInLFxuICB0ZW1wbGF0ZTogJzxuZy10ZW1wbGF0ZSBuYlBvcnRhbE91dGxldD48L25nLXRlbXBsYXRlPicsXG59KVxuZXhwb3J0IGNsYXNzIE5iRGlhbG9nQ29udGFpbmVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG4gIC8vIFRPRE8gc3RhdGljIG11c3QgYmUgZmFsc2UgYXMgb2YgQW5ndWxhciA5LjAuMCwgaXNzdWVzLzE1MTRcbiAgQFZpZXdDaGlsZChOYlBvcnRhbE91dGxldERpcmVjdGl2ZSwgeyBzdGF0aWM6IHRydWUgfSkgcG9ydGFsT3V0bGV0OiBOYlBvcnRhbE91dGxldERpcmVjdGl2ZTtcblxuICBwcm90ZWN0ZWQgZm9jdXNUcmFwOiBOYkZvY3VzVHJhcDtcblxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgY29uZmlnOiBOYkRpYWxvZ0NvbmZpZyxcbiAgICAgICAgICAgICAgcHJvdGVjdGVkIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgICAgICAgIHByb3RlY3RlZCBmb2N1c1RyYXBGYWN0b3J5OiBOYkZvY3VzVHJhcEZhY3RvcnlTZXJ2aWNlKSB7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAodGhpcy5jb25maWcuYXV0b0ZvY3VzKSB7XG4gICAgICB0aGlzLmZvY3VzVHJhcCA9IHRoaXMuZm9jdXNUcmFwRmFjdG9yeS5jcmVhdGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgdGhpcy5mb2N1c1RyYXAuYmx1clByZXZpb3VzbHlGb2N1c2VkRWxlbWVudCgpO1xuICAgICAgdGhpcy5mb2N1c1RyYXAuZm9jdXNJbml0aWFsRWxlbWVudCgpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGlmICh0aGlzLmNvbmZpZy5hdXRvRm9jdXMgJiYgdGhpcy5mb2N1c1RyYXApIHtcbiAgICAgIHRoaXMuZm9jdXNUcmFwLnJlc3RvcmVGb2N1cygpO1xuICAgIH1cbiAgfVxuXG4gIGF0dGFjaENvbXBvbmVudFBvcnRhbDxUPihwb3J0YWw6IE5iQ29tcG9uZW50UG9ydGFsPFQ+KTogQ29tcG9uZW50UmVmPFQ+IHtcbiAgICByZXR1cm4gdGhpcy5wb3J0YWxPdXRsZXQuYXR0YWNoQ29tcG9uZW50UG9ydGFsKHBvcnRhbCk7XG4gIH1cblxuICBhdHRhY2hUZW1wbGF0ZVBvcnRhbDxDPihwb3J0YWw6IE5iVGVtcGxhdGVQb3J0YWw8Qz4pOiBFbWJlZGRlZFZpZXdSZWY8Qz4ge1xuICAgIHJldHVybiB0aGlzLnBvcnRhbE91dGxldC5hdHRhY2hUZW1wbGF0ZVBvcnRhbChwb3J0YWwpO1xuICB9XG59XG4iXX0=