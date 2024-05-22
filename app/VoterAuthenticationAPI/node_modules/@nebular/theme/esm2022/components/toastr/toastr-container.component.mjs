/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, Input, ViewChildren } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NbToastComponent } from './toast.component';
import * as i0 from "@angular/core";
import * as i1 from "../../services/direction.service";
import * as i2 from "../cdk/overlay/position-helper";
import * as i3 from "@angular/common";
import * as i4 from "./toast.component";
const voidState = style({
    transform: 'translateX({{ direction }}110%)',
    height: 0,
    marginLeft: '0',
    marginRight: '0',
    marginTop: '0',
    marginBottom: '0',
});
const defaultOptions = { params: { direction: '' } };
export class NbToastrContainerComponent {
    constructor(layoutDirection, positionHelper) {
        this.layoutDirection = layoutDirection;
        this.positionHelper = positionHelper;
        this.destroy$ = new Subject();
        this.content = [];
    }
    ngOnInit() {
        this.layoutDirection.onDirectionChange()
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => this.onDirectionChange());
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    onDirectionChange() {
        const direction = this.positionHelper.isRightPosition(this.position) ? '' : '-';
        this.fadeIn = { value: '', params: { direction } };
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbToastrContainerComponent, deps: [{ token: i1.NbLayoutDirectionService }, { token: i2.NbPositionHelper }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.1.0", type: NbToastrContainerComponent, selector: "nb-toastr-container", inputs: { content: "content", context: "context", position: "position" }, viewQueries: [{ propertyName: "toasts", predicate: NbToastComponent, descendants: true }], ngImport: i0, template: `
    <nb-toast [@fadeIn]="fadeIn" *ngFor="let toast of content" [toast]="toast"></nb-toast>`, isInline: true, dependencies: [{ kind: "directive", type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "component", type: i4.NbToastComponent, selector: "nb-toast", inputs: ["toast"], outputs: ["destroy", "toastClick"] }], animations: [
            trigger('fadeIn', [
                transition(':enter', [voidState, animate(100)], defaultOptions),
                transition(':leave', [animate(100, voidState)], defaultOptions),
            ]),
        ] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbToastrContainerComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nb-toastr-container',
                    template: `
    <nb-toast [@fadeIn]="fadeIn" *ngFor="let toast of content" [toast]="toast"></nb-toast>`,
                    animations: [
                        trigger('fadeIn', [
                            transition(':enter', [voidState, animate(100)], defaultOptions),
                            transition(':leave', [animate(100, voidState)], defaultOptions),
                        ]),
                    ],
                }]
        }], ctorParameters: () => [{ type: i1.NbLayoutDirectionService }, { type: i2.NbPositionHelper }], propDecorators: { content: [{
                type: Input
            }], context: [{
                type: Input
            }], position: [{
                type: Input
            }], toasts: [{
                type: ViewChildren,
                args: [NbToastComponent]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3RyLWNvbnRhaW5lci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvZnJhbWV3b3JrL3RoZW1lL2NvbXBvbmVudHMvdG9hc3RyL3RvYXN0ci1jb250YWluZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBZ0MsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdGLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUMxRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUUvQixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQzs7Ozs7O0FBS3JELE1BQU0sU0FBUyxHQUFHLEtBQUssQ0FBQztJQUN0QixTQUFTLEVBQUUsaUNBQWlDO0lBQzVDLE1BQU0sRUFBRSxDQUFDO0lBQ1QsVUFBVSxFQUFFLEdBQUc7SUFDZixXQUFXLEVBQUUsR0FBRztJQUNoQixTQUFTLEVBQUUsR0FBRztJQUNkLFlBQVksRUFBRSxHQUFHO0NBQ2xCLENBQUMsQ0FBQztBQUVILE1BQU0sY0FBYyxHQUFHLEVBQUUsTUFBTSxFQUFFLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7QUFhckQsTUFBTSxPQUFPLDBCQUEwQjtJQWtCckMsWUFBc0IsZUFBeUMsRUFDekMsY0FBZ0M7UUFEaEMsb0JBQWUsR0FBZixlQUFlLENBQTBCO1FBQ3pDLG1CQUFjLEdBQWQsY0FBYyxDQUFrQjtRQWpCNUMsYUFBUSxHQUFHLElBQUksT0FBTyxFQUFRLENBQUM7UUFHekMsWUFBTyxHQUFjLEVBQUUsQ0FBQztJQWV4QixDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxlQUFlLENBQUMsaUJBQWlCLEVBQUU7YUFDckMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDOUIsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVTLGlCQUFpQjtRQUN6QixNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ2hGLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLFNBQVMsRUFBRSxFQUFFLENBQUM7SUFDckQsQ0FBQzs4R0FwQ1UsMEJBQTBCO2tHQUExQiwwQkFBMEIsZ0tBYXZCLGdCQUFnQixnREF0QnBCOzJGQUMrRSwwU0FDN0U7WUFDVixPQUFPLENBQUMsUUFBUSxFQUFFO2dCQUNoQixVQUFVLENBQUMsUUFBUSxFQUFFLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLGNBQWMsQ0FBQztnQkFDL0QsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsU0FBUyxDQUFDLENBQUMsRUFBRSxjQUFjLENBQUM7YUFDaEUsQ0FBQztTQUNIOzsyRkFFVSwwQkFBMEI7a0JBWHRDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLHFCQUFxQjtvQkFDL0IsUUFBUSxFQUFFOzJGQUMrRTtvQkFDekYsVUFBVSxFQUFFO3dCQUNWLE9BQU8sQ0FBQyxRQUFRLEVBQUU7NEJBQ2hCLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsY0FBYyxDQUFDOzRCQUMvRCxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxTQUFTLENBQUMsQ0FBQyxFQUFFLGNBQWMsQ0FBQzt5QkFDaEUsQ0FBQztxQkFDSDtpQkFDRjs0SEFNQyxPQUFPO3NCQUROLEtBQUs7Z0JBSU4sT0FBTztzQkFETixLQUFLO2dCQUlOLFFBQVE7c0JBRFAsS0FBSztnQkFJTixNQUFNO3NCQURMLFlBQVk7dUJBQUMsZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEFrdmVvLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqL1xuXG5pbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCwgUXVlcnlMaXN0LCBWaWV3Q2hpbGRyZW4gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGFuaW1hdGUsIHN0eWxlLCB0cmFuc2l0aW9uLCB0cmlnZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IE5iVG9hc3RDb21wb25lbnQgfSBmcm9tICcuL3RvYXN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOYlRvYXN0IH0gZnJvbSAnLi9tb2RlbCc7XG5pbXBvcnQgeyBOYkxheW91dERpcmVjdGlvblNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9kaXJlY3Rpb24uc2VydmljZSc7XG5pbXBvcnQgeyBOYkdsb2JhbFBvc2l0aW9uLCBOYlBvc2l0aW9uSGVscGVyIH0gZnJvbSAnLi4vY2RrL292ZXJsYXkvcG9zaXRpb24taGVscGVyJztcblxuY29uc3Qgdm9pZFN0YXRlID0gc3R5bGUoe1xuICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKHt7IGRpcmVjdGlvbiB9fTExMCUpJyxcbiAgaGVpZ2h0OiAwLFxuICBtYXJnaW5MZWZ0OiAnMCcsXG4gIG1hcmdpblJpZ2h0OiAnMCcsXG4gIG1hcmdpblRvcDogJzAnLFxuICBtYXJnaW5Cb3R0b206ICcwJyxcbn0pO1xuXG5jb25zdCBkZWZhdWx0T3B0aW9ucyA9IHsgcGFyYW1zOiB7IGRpcmVjdGlvbjogJycgfSB9O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduYi10b2FzdHItY29udGFpbmVyJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmItdG9hc3QgW0BmYWRlSW5dPVwiZmFkZUluXCIgKm5nRm9yPVwibGV0IHRvYXN0IG9mIGNvbnRlbnRcIiBbdG9hc3RdPVwidG9hc3RcIj48L25iLXRvYXN0PmAsXG4gIGFuaW1hdGlvbnM6IFtcbiAgICB0cmlnZ2VyKCdmYWRlSW4nLCBbXG4gICAgICB0cmFuc2l0aW9uKCc6ZW50ZXInLCBbdm9pZFN0YXRlLCBhbmltYXRlKDEwMCldLCBkZWZhdWx0T3B0aW9ucyksXG4gICAgICB0cmFuc2l0aW9uKCc6bGVhdmUnLCBbYW5pbWF0ZSgxMDAsIHZvaWRTdGF0ZSldLCBkZWZhdWx0T3B0aW9ucyksXG4gICAgXSksXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIE5iVG9hc3RyQ29udGFpbmVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG4gIHByb3RlY3RlZCBkZXN0cm95JCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgQElucHV0KClcbiAgY29udGVudDogTmJUb2FzdFtdID0gW107XG5cbiAgQElucHV0KClcbiAgY29udGV4dDogT2JqZWN0O1xuXG4gIEBJbnB1dCgpXG4gIHBvc2l0aW9uOiBOYkdsb2JhbFBvc2l0aW9uO1xuXG4gIEBWaWV3Q2hpbGRyZW4oTmJUb2FzdENvbXBvbmVudClcbiAgdG9hc3RzOiBRdWVyeUxpc3Q8TmJUb2FzdENvbXBvbmVudD47XG5cbiAgZmFkZUluO1xuXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBsYXlvdXREaXJlY3Rpb246IE5iTGF5b3V0RGlyZWN0aW9uU2VydmljZSxcbiAgICAgICAgICAgICAgcHJvdGVjdGVkIHBvc2l0aW9uSGVscGVyOiBOYlBvc2l0aW9uSGVscGVyKSB7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmxheW91dERpcmVjdGlvbi5vbkRpcmVjdGlvbkNoYW5nZSgpXG4gICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMub25EaXJlY3Rpb25DaGFuZ2UoKSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmRlc3Ryb3kkLm5leHQoKTtcbiAgICB0aGlzLmRlc3Ryb3kkLmNvbXBsZXRlKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgb25EaXJlY3Rpb25DaGFuZ2UoKSB7XG4gICAgY29uc3QgZGlyZWN0aW9uID0gdGhpcy5wb3NpdGlvbkhlbHBlci5pc1JpZ2h0UG9zaXRpb24odGhpcy5wb3NpdGlvbikgPyAnJyA6ICctJztcbiAgICB0aGlzLmZhZGVJbiA9IHsgdmFsdWU6ICcnLCBwYXJhbXM6IHsgZGlyZWN0aW9uIH0gfTtcbiAgfVxufVxuIl19