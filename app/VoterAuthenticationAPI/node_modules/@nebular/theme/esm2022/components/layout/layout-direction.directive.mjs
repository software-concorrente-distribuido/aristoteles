/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Directive } from '@angular/core';
import { distinctUntilChanged, map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NbLayoutDirection } from '../../services/direction.service';
import * as i0 from "@angular/core";
import * as i1 from "../../services/direction.service";
class NbBaseLayoutDirectionDirective {
    constructor(templateRef, viewContainer, cd, directionService, directionToShow) {
        this.templateRef = templateRef;
        this.viewContainer = viewContainer;
        this.cd = cd;
        this.directionService = directionService;
        this.directionToShow = directionToShow;
        this.destroy$ = new Subject();
    }
    ngOnInit() {
        this.directionService
            .onDirectionChange()
            .pipe(map((layoutDirection) => layoutDirection === this.directionToShow), distinctUntilChanged(), takeUntil(this.destroy$))
            .subscribe((shouldShow) => this.updateView(shouldShow));
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    updateView(shouldShow) {
        if (shouldShow && !this.viewContainer.length) {
            this.viewContainer.createEmbeddedView(this.templateRef);
            this.cd.markForCheck();
        }
        else if (!shouldShow && this.viewContainer.length) {
            this.viewContainer.clear();
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbBaseLayoutDirectionDirective, deps: [{ token: i0.TemplateRef }, { token: i0.ViewContainerRef }, { token: i0.ChangeDetectorRef }, { token: i1.NbLayoutDirectionService }, { token: i1.NbLayoutDirection }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "17.1.0", type: NbBaseLayoutDirectionDirective, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbBaseLayoutDirectionDirective, decorators: [{
            type: Directive
        }], ctorParameters: () => [{ type: i0.TemplateRef }, { type: i0.ViewContainerRef }, { type: i0.ChangeDetectorRef }, { type: i1.NbLayoutDirectionService }, { type: i1.NbLayoutDirection }] });
/**
 * Apply `nbLtr` directive to the element you need to show only when layout direction is `LTR`.
 *
 * ```html
 * <div *nbLtr>This text is visible only when layout direction is LTR</div>
 * ```
 */
export class NbLtrDirective extends NbBaseLayoutDirectionDirective {
    constructor(templateRef, viewContainer, cd, directionService) {
        super(templateRef, viewContainer, cd, directionService, NbLayoutDirection.LTR);
        this.templateRef = templateRef;
        this.viewContainer = viewContainer;
        this.cd = cd;
        this.directionService = directionService;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbLtrDirective, deps: [{ token: i0.TemplateRef }, { token: i0.ViewContainerRef }, { token: i0.ChangeDetectorRef }, { token: i1.NbLayoutDirectionService }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "17.1.0", type: NbLtrDirective, selector: "[nbLtr]", usesInheritance: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbLtrDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[nbLtr]',
                }]
        }], ctorParameters: () => [{ type: i0.TemplateRef }, { type: i0.ViewContainerRef }, { type: i0.ChangeDetectorRef }, { type: i1.NbLayoutDirectionService }] });
/**
 * Apply `nbRtl` directive to the element you need to show only when layout direction is `RTL`.
 *
 * ```html
 * <div *nbRtl>This text is visible only when layout direction is RTL</div>
 * ```
 */
export class NbRtlDirective extends NbBaseLayoutDirectionDirective {
    constructor(templateRef, viewContainer, cd, directionService) {
        super(templateRef, viewContainer, cd, directionService, NbLayoutDirection.RTL);
        this.templateRef = templateRef;
        this.viewContainer = viewContainer;
        this.cd = cd;
        this.directionService = directionService;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbRtlDirective, deps: [{ token: i0.TemplateRef }, { token: i0.ViewContainerRef }, { token: i0.ChangeDetectorRef }, { token: i1.NbLayoutDirectionService }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "17.1.0", type: NbRtlDirective, selector: "[nbRtl]", usesInheritance: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbRtlDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[nbRtl]',
                }]
        }], ctorParameters: () => [{ type: i0.TemplateRef }, { type: i0.ViewContainerRef }, { type: i0.ChangeDetectorRef }, { type: i1.NbLayoutDirectionService }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0LWRpcmVjdGlvbi5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvZnJhbWV3b3JrL3RoZW1lL2NvbXBvbmVudHMvbGF5b3V0L2xheW91dC1kaXJlY3Rpb24uZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQXFCLFNBQVMsRUFBb0QsTUFBTSxlQUFlLENBQUM7QUFDL0csT0FBTyxFQUFFLG9CQUFvQixFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN0RSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxpQkFBaUIsRUFBNEIsTUFBTSxrQ0FBa0MsQ0FBQzs7O0FBRS9GLE1BQ2UsOEJBQThCO0lBRzNDLFlBQ1ksV0FBNkIsRUFDN0IsYUFBK0IsRUFDL0IsRUFBcUIsRUFDckIsZ0JBQTBDLEVBQzFDLGVBQWtDO1FBSmxDLGdCQUFXLEdBQVgsV0FBVyxDQUFrQjtRQUM3QixrQkFBYSxHQUFiLGFBQWEsQ0FBa0I7UUFDL0IsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7UUFDckIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUEwQjtRQUMxQyxvQkFBZSxHQUFmLGVBQWUsQ0FBbUI7UUFQcEMsYUFBUSxHQUFHLElBQUksT0FBTyxFQUFRLENBQUM7SUFRdEMsQ0FBQztJQUVKLFFBQVE7UUFDTixJQUFJLENBQUMsZ0JBQWdCO2FBQ2xCLGlCQUFpQixFQUFFO2FBQ25CLElBQUksQ0FDSCxHQUFHLENBQUMsQ0FBQyxlQUFrQyxFQUFFLEVBQUUsQ0FBQyxlQUFlLEtBQUssSUFBSSxDQUFDLGVBQWUsQ0FBQyxFQUNyRixvQkFBb0IsRUFBRSxFQUN0QixTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUN6QjthQUNBLFNBQVMsQ0FBQyxDQUFDLFVBQW1CLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQVUsVUFBVSxDQUFDLENBQUMsQ0FBQztJQUM5RSxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRVMsVUFBVSxDQUFJLFVBQWE7UUFDbkMsSUFBSSxVQUFVLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQzdDLElBQUksQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3hELElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDekIsQ0FBQzthQUFNLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNwRCxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzdCLENBQUM7SUFDSCxDQUFDOzhHQWxDWSw4QkFBOEI7a0dBQTlCLDhCQUE4Qjs7MkZBQTlCLDhCQUE4QjtrQkFENUMsU0FBUzs7QUFzQ1Y7Ozs7OztHQU1HO0FBSUgsTUFBTSxPQUFPLGNBQWUsU0FBUSw4QkFBOEI7SUFDaEUsWUFDWSxXQUE2QixFQUM3QixhQUErQixFQUMvQixFQUFxQixFQUNyQixnQkFBMEM7UUFFcEQsS0FBSyxDQUFDLFdBQVcsRUFBRSxhQUFhLEVBQUUsRUFBRSxFQUFFLGdCQUFnQixFQUFFLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBTHJFLGdCQUFXLEdBQVgsV0FBVyxDQUFrQjtRQUM3QixrQkFBYSxHQUFiLGFBQWEsQ0FBa0I7UUFDL0IsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7UUFDckIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUEwQjtJQUd0RCxDQUFDOzhHQVJVLGNBQWM7a0dBQWQsY0FBYzs7MkZBQWQsY0FBYztrQkFIMUIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsU0FBUztpQkFDcEI7O0FBWUQ7Ozs7OztHQU1HO0FBSUgsTUFBTSxPQUFPLGNBQWUsU0FBUSw4QkFBOEI7SUFDaEUsWUFDWSxXQUE2QixFQUM3QixhQUErQixFQUMvQixFQUFxQixFQUNyQixnQkFBMEM7UUFFcEQsS0FBSyxDQUFDLFdBQVcsRUFBRSxhQUFhLEVBQUUsRUFBRSxFQUFFLGdCQUFnQixFQUFFLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBTHJFLGdCQUFXLEdBQVgsV0FBVyxDQUFrQjtRQUM3QixrQkFBYSxHQUFiLGFBQWEsQ0FBa0I7UUFDL0IsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7UUFDckIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUEwQjtJQUd0RCxDQUFDOzhHQVJVLGNBQWM7a0dBQWQsY0FBYzs7MkZBQWQsY0FBYztrQkFIMUIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsU0FBUztpQkFDcEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgQWt2ZW8uIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICovXG5cbmltcG9ydCB7IENoYW5nZURldGVjdG9yUmVmLCBEaXJlY3RpdmUsIE9uRGVzdHJveSwgT25Jbml0LCBUZW1wbGF0ZVJlZiwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZGlzdGluY3RVbnRpbENoYW5nZWQsIG1hcCwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgTmJMYXlvdXREaXJlY3Rpb24sIE5iTGF5b3V0RGlyZWN0aW9uU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2RpcmVjdGlvbi5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSgpXG5hYnN0cmFjdCBjbGFzcyBOYkJhc2VMYXlvdXREaXJlY3Rpb25EaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIHByb3RlY3RlZCBkZXN0cm95JCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxhbnk+LFxuICAgIHByb3RlY3RlZCB2aWV3Q29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgIHByb3RlY3RlZCBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJvdGVjdGVkIGRpcmVjdGlvblNlcnZpY2U6IE5iTGF5b3V0RGlyZWN0aW9uU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgZGlyZWN0aW9uVG9TaG93OiBOYkxheW91dERpcmVjdGlvbixcbiAgKSB7fVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuZGlyZWN0aW9uU2VydmljZVxuICAgICAgLm9uRGlyZWN0aW9uQ2hhbmdlKClcbiAgICAgIC5waXBlKFxuICAgICAgICBtYXAoKGxheW91dERpcmVjdGlvbjogTmJMYXlvdXREaXJlY3Rpb24pID0+IGxheW91dERpcmVjdGlvbiA9PT0gdGhpcy5kaXJlY3Rpb25Ub1Nob3cpLFxuICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLFxuICAgICAgICB0YWtlVW50aWwodGhpcy5kZXN0cm95JCksXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKChzaG91bGRTaG93OiBib29sZWFuKSA9PiB0aGlzLnVwZGF0ZVZpZXc8Ym9vbGVhbj4oc2hvdWxkU2hvdykpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5kZXN0cm95JC5uZXh0KCk7XG4gICAgdGhpcy5kZXN0cm95JC5jb21wbGV0ZSgpO1xuICB9XG5cbiAgcHJvdGVjdGVkIHVwZGF0ZVZpZXc8VD4oc2hvdWxkU2hvdzogVCk6IHZvaWQge1xuICAgIGlmIChzaG91bGRTaG93ICYmICF0aGlzLnZpZXdDb250YWluZXIubGVuZ3RoKSB7XG4gICAgICB0aGlzLnZpZXdDb250YWluZXIuY3JlYXRlRW1iZWRkZWRWaWV3KHRoaXMudGVtcGxhdGVSZWYpO1xuICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICB9IGVsc2UgaWYgKCFzaG91bGRTaG93ICYmIHRoaXMudmlld0NvbnRhaW5lci5sZW5ndGgpIHtcbiAgICAgIHRoaXMudmlld0NvbnRhaW5lci5jbGVhcigpO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEFwcGx5IGBuYkx0cmAgZGlyZWN0aXZlIHRvIHRoZSBlbGVtZW50IHlvdSBuZWVkIHRvIHNob3cgb25seSB3aGVuIGxheW91dCBkaXJlY3Rpb24gaXMgYExUUmAuXG4gKlxuICogYGBgaHRtbFxuICogPGRpdiAqbmJMdHI+VGhpcyB0ZXh0IGlzIHZpc2libGUgb25seSB3aGVuIGxheW91dCBkaXJlY3Rpb24gaXMgTFRSPC9kaXY+XG4gKiBgYGBcbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW25iTHRyXScsXG59KVxuZXhwb3J0IGNsYXNzIE5iTHRyRGlyZWN0aXZlIGV4dGVuZHMgTmJCYXNlTGF5b3V0RGlyZWN0aW9uRGlyZWN0aXZlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxhbnk+LFxuICAgIHByb3RlY3RlZCB2aWV3Q29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgIHByb3RlY3RlZCBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJvdGVjdGVkIGRpcmVjdGlvblNlcnZpY2U6IE5iTGF5b3V0RGlyZWN0aW9uU2VydmljZSxcbiAgKSB7XG4gICAgc3VwZXIodGVtcGxhdGVSZWYsIHZpZXdDb250YWluZXIsIGNkLCBkaXJlY3Rpb25TZXJ2aWNlLCBOYkxheW91dERpcmVjdGlvbi5MVFIpO1xuICB9XG59XG5cbi8qKlxuICogQXBwbHkgYG5iUnRsYCBkaXJlY3RpdmUgdG8gdGhlIGVsZW1lbnQgeW91IG5lZWQgdG8gc2hvdyBvbmx5IHdoZW4gbGF5b3V0IGRpcmVjdGlvbiBpcyBgUlRMYC5cbiAqXG4gKiBgYGBodG1sXG4gKiA8ZGl2ICpuYlJ0bD5UaGlzIHRleHQgaXMgdmlzaWJsZSBvbmx5IHdoZW4gbGF5b3V0IGRpcmVjdGlvbiBpcyBSVEw8L2Rpdj5cbiAqIGBgYFxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbmJSdGxdJyxcbn0pXG5leHBvcnQgY2xhc3MgTmJSdGxEaXJlY3RpdmUgZXh0ZW5kcyBOYkJhc2VMYXlvdXREaXJlY3Rpb25EaXJlY3RpdmUge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPGFueT4sXG4gICAgcHJvdGVjdGVkIHZpZXdDb250YWluZXI6IFZpZXdDb250YWluZXJSZWYsXG4gICAgcHJvdGVjdGVkIGNkOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcm90ZWN0ZWQgZGlyZWN0aW9uU2VydmljZTogTmJMYXlvdXREaXJlY3Rpb25TZXJ2aWNlLFxuICApIHtcbiAgICBzdXBlcih0ZW1wbGF0ZVJlZiwgdmlld0NvbnRhaW5lciwgY2QsIGRpcmVjdGlvblNlcnZpY2UsIE5iTGF5b3V0RGlyZWN0aW9uLlJUTCk7XG4gIH1cbn1cbiJdfQ==