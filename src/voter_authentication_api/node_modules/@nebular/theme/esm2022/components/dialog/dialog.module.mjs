/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { NgModule } from '@angular/core';
import { NbSharedModule } from '../shared/shared.module';
import { NbOverlayModule } from '../cdk/overlay/overlay.module';
import { NbDialogService } from './dialog.service';
import { NbDialogContainerComponent } from './dialog-container';
import { NB_DIALOG_CONFIG } from './dialog-config';
import * as i0 from "@angular/core";
export class NbDialogModule {
    static forRoot(dialogConfig = {}) {
        return {
            ngModule: NbDialogModule,
            providers: [
                NbDialogService,
                { provide: NB_DIALOG_CONFIG, useValue: dialogConfig },
            ],
        };
    }
    static forChild(dialogConfig = {}) {
        return {
            ngModule: NbDialogModule,
            providers: [
                NbDialogService,
                { provide: NB_DIALOG_CONFIG, useValue: dialogConfig },
            ],
        };
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbDialogModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.1.0", ngImport: i0, type: NbDialogModule, declarations: [NbDialogContainerComponent], imports: [NbSharedModule, NbOverlayModule] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbDialogModule, imports: [NbSharedModule, NbOverlayModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbDialogModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [NbSharedModule, NbOverlayModule],
                    declarations: [NbDialogContainerComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9mcmFtZXdvcmsvdGhlbWUvY29tcG9uZW50cy9kaWFsb2cvZGlhbG9nLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUF1QixRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFOUQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNoRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDbkQsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDaEUsT0FBTyxFQUFFLGdCQUFnQixFQUFrQixNQUFNLGlCQUFpQixDQUFDOztBQU9uRSxNQUFNLE9BQU8sY0FBYztJQUN6QixNQUFNLENBQUMsT0FBTyxDQUFDLGVBQXdDLEVBQUU7UUFDdkQsT0FBTztZQUNMLFFBQVEsRUFBRSxjQUFjO1lBQ3hCLFNBQVMsRUFBRTtnQkFDVCxlQUFlO2dCQUNmLEVBQUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUU7YUFDdEQ7U0FDRixDQUFBO0lBQ0gsQ0FBQztJQUVELE1BQU0sQ0FBQyxRQUFRLENBQUMsZUFBd0MsRUFBRTtRQUN4RCxPQUFPO1lBQ0wsUUFBUSxFQUFFLGNBQWM7WUFDeEIsU0FBUyxFQUFFO2dCQUNULGVBQWU7Z0JBQ2YsRUFBRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRTthQUN0RDtTQUNGLENBQUE7SUFDSCxDQUFDOzhHQW5CVSxjQUFjOytHQUFkLGNBQWMsaUJBRlYsMEJBQTBCLGFBRC9CLGNBQWMsRUFBRSxlQUFlOytHQUc5QixjQUFjLFlBSGYsY0FBYyxFQUFFLGVBQWU7OzJGQUc5QixjQUFjO2tCQUoxQixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLGNBQWMsRUFBRSxlQUFlLENBQUM7b0JBQzFDLFlBQVksRUFBRSxDQUFDLDBCQUEwQixDQUFDO2lCQUMzQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBBa3Zlby4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi9cblxuaW1wb3J0IHsgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTmJTaGFyZWRNb2R1bGUgfSBmcm9tICcuLi9zaGFyZWQvc2hhcmVkLm1vZHVsZSc7XG5pbXBvcnQgeyBOYk92ZXJsYXlNb2R1bGUgfSBmcm9tICcuLi9jZGsvb3ZlcmxheS9vdmVybGF5Lm1vZHVsZSc7XG5pbXBvcnQgeyBOYkRpYWxvZ1NlcnZpY2UgfSBmcm9tICcuL2RpYWxvZy5zZXJ2aWNlJztcbmltcG9ydCB7IE5iRGlhbG9nQ29udGFpbmVyQ29tcG9uZW50IH0gZnJvbSAnLi9kaWFsb2ctY29udGFpbmVyJztcbmltcG9ydCB7IE5CX0RJQUxPR19DT05GSUcsIE5iRGlhbG9nQ29uZmlnIH0gZnJvbSAnLi9kaWFsb2ctY29uZmlnJztcblxuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbTmJTaGFyZWRNb2R1bGUsIE5iT3ZlcmxheU1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW05iRGlhbG9nQ29udGFpbmVyQ29tcG9uZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgTmJEaWFsb2dNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdChkaWFsb2dDb25maWc6IFBhcnRpYWw8TmJEaWFsb2dDb25maWc+ID0ge30pOiBNb2R1bGVXaXRoUHJvdmlkZXJzPE5iRGlhbG9nTW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBOYkRpYWxvZ01vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICBOYkRpYWxvZ1NlcnZpY2UsXG4gICAgICAgIHsgcHJvdmlkZTogTkJfRElBTE9HX0NPTkZJRywgdXNlVmFsdWU6IGRpYWxvZ0NvbmZpZyB9LFxuICAgICAgXSxcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZm9yQ2hpbGQoZGlhbG9nQ29uZmlnOiBQYXJ0aWFsPE5iRGlhbG9nQ29uZmlnPiA9IHt9KTogTW9kdWxlV2l0aFByb3ZpZGVyczxOYkRpYWxvZ01vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogTmJEaWFsb2dNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgTmJEaWFsb2dTZXJ2aWNlLFxuICAgICAgICB7IHByb3ZpZGU6IE5CX0RJQUxPR19DT05GSUcsIHVzZVZhbHVlOiBkaWFsb2dDb25maWcgfSxcbiAgICAgIF0sXG4gICAgfVxuICB9XG59XG4iXX0=