/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { NgModule } from '@angular/core';
import { NbOverlayModule } from '../cdk/overlay/overlay.module';
import { NbPopoverDirective } from './popover.directive';
import { NbPopoverComponent } from './popover.component';
import * as i0 from "@angular/core";
export class NbPopoverModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbPopoverModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.1.0", ngImport: i0, type: NbPopoverModule, declarations: [NbPopoverDirective, NbPopoverComponent], imports: [NbOverlayModule], exports: [NbPopoverDirective] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbPopoverModule, imports: [NbOverlayModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbPopoverModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [NbOverlayModule],
                    declarations: [NbPopoverDirective, NbPopoverComponent],
                    exports: [NbPopoverDirective],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvZnJhbWV3b3JrL3RoZW1lL2NvbXBvbmVudHMvcG9wb3Zlci9wb3BvdmVyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV6QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDaEUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDekQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0scUJBQXFCLENBQUM7O0FBUXpELE1BQU0sT0FBTyxlQUFlOzhHQUFmLGVBQWU7K0dBQWYsZUFBZSxpQkFIWCxrQkFBa0IsRUFBRSxrQkFBa0IsYUFEM0MsZUFBZSxhQUVmLGtCQUFrQjsrR0FFakIsZUFBZSxZQUpoQixlQUFlOzsyRkFJZCxlQUFlO2tCQUwzQixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLGVBQWUsQ0FBQztvQkFDMUIsWUFBWSxFQUFFLENBQUMsa0JBQWtCLEVBQUUsa0JBQWtCLENBQUM7b0JBQ3RELE9BQU8sRUFBRSxDQUFDLGtCQUFrQixDQUFDO2lCQUM5QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBBa3Zlby4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi9cblxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTmJPdmVybGF5TW9kdWxlIH0gZnJvbSAnLi4vY2RrL292ZXJsYXkvb3ZlcmxheS5tb2R1bGUnO1xuaW1wb3J0IHsgTmJQb3BvdmVyRGlyZWN0aXZlIH0gZnJvbSAnLi9wb3BvdmVyLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBOYlBvcG92ZXJDb21wb25lbnQgfSBmcm9tICcuL3BvcG92ZXIuY29tcG9uZW50JztcblxuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbTmJPdmVybGF5TW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbTmJQb3BvdmVyRGlyZWN0aXZlLCBOYlBvcG92ZXJDb21wb25lbnRdLFxuICBleHBvcnRzOiBbTmJQb3BvdmVyRGlyZWN0aXZlXSxcbn0pXG5leHBvcnQgY2xhc3MgTmJQb3BvdmVyTW9kdWxlIHtcbn1cbiJdfQ==