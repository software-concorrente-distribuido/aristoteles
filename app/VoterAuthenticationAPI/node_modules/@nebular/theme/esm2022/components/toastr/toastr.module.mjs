/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { NgModule } from '@angular/core';
import { NbOverlayModule } from '../cdk/overlay/overlay.module';
import { NbSharedModule } from '../shared/shared.module';
import { NbIconModule } from '../icon/icon.module';
import { NbToastrContainerRegistry, NbToastrService } from './toastr.service';
import { NbToastComponent } from './toast.component';
import { NbToastrContainerComponent } from './toastr-container.component';
import { NB_TOASTR_CONFIG } from './toastr-config';
import * as i0 from "@angular/core";
export class NbToastrModule {
    static forRoot(toastrConfig = {}) {
        return {
            ngModule: NbToastrModule,
            providers: [
                NbToastrService,
                NbToastrContainerRegistry,
                { provide: NB_TOASTR_CONFIG, useValue: toastrConfig },
            ],
        };
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbToastrModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.1.0", ngImport: i0, type: NbToastrModule, declarations: [NbToastrContainerComponent, NbToastComponent], imports: [NbSharedModule, NbOverlayModule, NbIconModule] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbToastrModule, imports: [NbSharedModule, NbOverlayModule, NbIconModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbToastrModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [NbSharedModule, NbOverlayModule, NbIconModule],
                    declarations: [NbToastrContainerComponent, NbToastComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3RyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9mcmFtZXdvcmsvdGhlbWUvY29tcG9uZW50cy90b2FzdHIvdG9hc3RyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUF1QixRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFOUQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFbkQsT0FBTyxFQUFFLHlCQUF5QixFQUFFLGVBQWUsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQzlFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3JELE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBa0IsTUFBTSxpQkFBaUIsQ0FBQzs7QUFPbkUsTUFBTSxPQUFPLGNBQWM7SUFDekIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxlQUF3QyxFQUFFO1FBQ3ZELE9BQU87WUFDTCxRQUFRLEVBQUUsY0FBYztZQUN4QixTQUFTLEVBQUU7Z0JBQ1QsZUFBZTtnQkFDZix5QkFBeUI7Z0JBQ3pCLEVBQUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUU7YUFDdEQ7U0FDRixDQUFDO0lBQ0osQ0FBQzs4R0FWVSxjQUFjOytHQUFkLGNBQWMsaUJBRlYsMEJBQTBCLEVBQUUsZ0JBQWdCLGFBRGpELGNBQWMsRUFBRSxlQUFlLEVBQUUsWUFBWTsrR0FHNUMsY0FBYyxZQUhmLGNBQWMsRUFBRSxlQUFlLEVBQUUsWUFBWTs7MkZBRzVDLGNBQWM7a0JBSjFCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsY0FBYyxFQUFFLGVBQWUsRUFBRSxZQUFZLENBQUM7b0JBQ3hELFlBQVksRUFBRSxDQUFDLDBCQUEwQixFQUFFLGdCQUFnQixDQUFDO2lCQUM3RCIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBBa3Zlby4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi9cblxuaW1wb3J0IHsgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTmJPdmVybGF5TW9kdWxlIH0gZnJvbSAnLi4vY2RrL292ZXJsYXkvb3ZlcmxheS5tb2R1bGUnO1xuaW1wb3J0IHsgTmJTaGFyZWRNb2R1bGUgfSBmcm9tICcuLi9zaGFyZWQvc2hhcmVkLm1vZHVsZSc7XG5pbXBvcnQgeyBOYkljb25Nb2R1bGUgfSBmcm9tICcuLi9pY29uL2ljb24ubW9kdWxlJztcblxuaW1wb3J0IHsgTmJUb2FzdHJDb250YWluZXJSZWdpc3RyeSwgTmJUb2FzdHJTZXJ2aWNlIH0gZnJvbSAnLi90b2FzdHIuc2VydmljZSc7XG5pbXBvcnQgeyBOYlRvYXN0Q29tcG9uZW50IH0gZnJvbSAnLi90b2FzdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTmJUb2FzdHJDb250YWluZXJDb21wb25lbnQgfSBmcm9tICcuL3RvYXN0ci1jb250YWluZXIuY29tcG9uZW50JztcbmltcG9ydCB7IE5CX1RPQVNUUl9DT05GSUcsIE5iVG9hc3RyQ29uZmlnIH0gZnJvbSAnLi90b2FzdHItY29uZmlnJztcblxuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbTmJTaGFyZWRNb2R1bGUsIE5iT3ZlcmxheU1vZHVsZSwgTmJJY29uTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbTmJUb2FzdHJDb250YWluZXJDb21wb25lbnQsIE5iVG9hc3RDb21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBOYlRvYXN0ck1vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KHRvYXN0ckNvbmZpZzogUGFydGlhbDxOYlRvYXN0ckNvbmZpZz4gPSB7fSk6IE1vZHVsZVdpdGhQcm92aWRlcnM8TmJUb2FzdHJNb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IE5iVG9hc3RyTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIE5iVG9hc3RyU2VydmljZSxcbiAgICAgICAgTmJUb2FzdHJDb250YWluZXJSZWdpc3RyeSxcbiAgICAgICAgeyBwcm92aWRlOiBOQl9UT0FTVFJfQ09ORklHLCB1c2VWYWx1ZTogdG9hc3RyQ29uZmlnIH0sXG4gICAgICBdLFxuICAgIH07XG4gIH1cbn1cbiJdfQ==