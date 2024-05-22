import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbOverlayModule } from '../cdk/overlay/overlay.module';
import { NbCardModule } from '../card/card.module';
import { NbIconModule } from '../icon/icon.module';
import { NbButtonModule } from '../button/button.module';
import { NbWindowService } from './window.service';
import { NbWindowsContainerComponent } from './windows-container.component';
import { NbWindowComponent } from './window.component';
import { NB_WINDOW_CONFIG } from './window.options';
import * as i0 from "@angular/core";
export class NbWindowModule {
    static forRoot(defaultConfig) {
        return {
            ngModule: NbWindowModule,
            providers: [
                NbWindowService,
                { provide: NB_WINDOW_CONFIG, useValue: defaultConfig },
            ],
        };
    }
    static forChild(defaultConfig) {
        return {
            ngModule: NbWindowModule,
            providers: [
                NbWindowService,
                { provide: NB_WINDOW_CONFIG, useValue: defaultConfig },
            ],
        };
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbWindowModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.1.0", ngImport: i0, type: NbWindowModule, declarations: [NbWindowsContainerComponent,
            NbWindowComponent], imports: [CommonModule, NbOverlayModule, NbCardModule, NbIconModule, NbButtonModule] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbWindowModule, imports: [CommonModule, NbOverlayModule, NbCardModule, NbIconModule, NbButtonModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbWindowModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, NbOverlayModule, NbCardModule, NbIconModule, NbButtonModule],
                    declarations: [
                        NbWindowsContainerComponent,
                        NbWindowComponent,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2luZG93Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9mcmFtZXdvcmsvdGhlbWUvY29tcG9uZW50cy93aW5kb3cvd2luZG93Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQXVCLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDbkQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQWtCLE1BQU0sa0JBQWtCLENBQUM7O0FBU3BFLE1BQU0sT0FBTyxjQUFjO0lBQ3pCLE1BQU0sQ0FBQyxPQUFPLENBQUMsYUFBdUM7UUFDcEQsT0FBTztZQUNMLFFBQVEsRUFBRSxjQUFjO1lBQ3hCLFNBQVMsRUFBRTtnQkFDVCxlQUFlO2dCQUNmLEVBQUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUU7YUFDdkQ7U0FDRixDQUFDO0lBQ0osQ0FBQztJQUVELE1BQU0sQ0FBQyxRQUFRLENBQUMsYUFBdUM7UUFDckQsT0FBTztZQUNMLFFBQVEsRUFBRSxjQUFjO1lBQ3hCLFNBQVMsRUFBRTtnQkFDVCxlQUFlO2dCQUNmLEVBQUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUU7YUFDdkQ7U0FDRixDQUFDO0lBQ0osQ0FBQzs4R0FuQlUsY0FBYzsrR0FBZCxjQUFjLGlCQUp2QiwyQkFBMkI7WUFDM0IsaUJBQWlCLGFBSFIsWUFBWSxFQUFFLGVBQWUsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLGNBQWM7K0dBTXpFLGNBQWMsWUFOZCxZQUFZLEVBQUUsZUFBZSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsY0FBYzs7MkZBTXpFLGNBQWM7a0JBUDFCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUUsWUFBWSxFQUFFLGVBQWUsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLGNBQWMsQ0FBRTtvQkFDdEYsWUFBWSxFQUFFO3dCQUNaLDJCQUEyQjt3QkFDM0IsaUJBQWlCO3FCQUNsQjtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmJPdmVybGF5TW9kdWxlIH0gZnJvbSAnLi4vY2RrL292ZXJsYXkvb3ZlcmxheS5tb2R1bGUnO1xuaW1wb3J0IHsgTmJDYXJkTW9kdWxlIH0gZnJvbSAnLi4vY2FyZC9jYXJkLm1vZHVsZSc7XG5pbXBvcnQgeyBOYkljb25Nb2R1bGUgfSBmcm9tICcuLi9pY29uL2ljb24ubW9kdWxlJztcbmltcG9ydCB7IE5iQnV0dG9uTW9kdWxlIH0gZnJvbSAnLi4vYnV0dG9uL2J1dHRvbi5tb2R1bGUnO1xuaW1wb3J0IHsgTmJXaW5kb3dTZXJ2aWNlIH0gZnJvbSAnLi93aW5kb3cuc2VydmljZSc7XG5pbXBvcnQgeyBOYldpbmRvd3NDb250YWluZXJDb21wb25lbnQgfSBmcm9tICcuL3dpbmRvd3MtY29udGFpbmVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOYldpbmRvd0NvbXBvbmVudCB9IGZyb20gJy4vd2luZG93LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOQl9XSU5ET1dfQ09ORklHLCBOYldpbmRvd0NvbmZpZyB9IGZyb20gJy4vd2luZG93Lm9wdGlvbnMnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbIENvbW1vbk1vZHVsZSwgTmJPdmVybGF5TW9kdWxlLCBOYkNhcmRNb2R1bGUsIE5iSWNvbk1vZHVsZSwgTmJCdXR0b25Nb2R1bGUgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgTmJXaW5kb3dzQ29udGFpbmVyQ29tcG9uZW50LFxuICAgIE5iV2luZG93Q29tcG9uZW50LFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBOYldpbmRvd01vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KGRlZmF1bHRDb25maWc/OiBQYXJ0aWFsPE5iV2luZG93Q29uZmlnPik6IE1vZHVsZVdpdGhQcm92aWRlcnM8TmJXaW5kb3dNb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IE5iV2luZG93TW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIE5iV2luZG93U2VydmljZSxcbiAgICAgICAgeyBwcm92aWRlOiBOQl9XSU5ET1dfQ09ORklHLCB1c2VWYWx1ZTogZGVmYXVsdENvbmZpZyB9LFxuICAgICAgXSxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGZvckNoaWxkKGRlZmF1bHRDb25maWc/OiBQYXJ0aWFsPE5iV2luZG93Q29uZmlnPik6IE1vZHVsZVdpdGhQcm92aWRlcnM8TmJXaW5kb3dNb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IE5iV2luZG93TW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIE5iV2luZG93U2VydmljZSxcbiAgICAgICAgeyBwcm92aWRlOiBOQl9XSU5ET1dfQ09ORklHLCB1c2VWYWx1ZTogZGVmYXVsdENvbmZpZyB9LFxuICAgICAgXSxcbiAgICB9O1xuICB9XG59XG4iXX0=