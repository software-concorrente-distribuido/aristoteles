/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NbSharedModule } from '../shared/shared.module';
import { NbButtonModule } from '../button/button.module';
import { NbIconModule } from '../icon/icon.module';
import { NbCalendarMonthModelService } from './services/calendar-month-model.service';
import { NbDateService } from './services/date.service';
import { NbCalendarDayCellComponent } from './components/calendar-day-picker/calendar-day-cell.component';
import { NbCalendarDayPickerComponent } from './components/calendar-day-picker/calendar-day-picker.component';
import { NbCalendarDaysNamesComponent } from './components/calendar-days-names/calendar-days-names.component';
import { NbCalendarMonthCellComponent } from './components/calendar-month-picker/calendar-month-cell.component';
import { NbCalendarMonthPickerComponent } from './components/calendar-month-picker/calendar-month-picker.component';
import { NbCalendarViewModeComponent } from './components/calendar-navigation/calendar-view-mode.component';
import { NbCalendarPageableNavigationComponent, } from './components/calendar-navigation/calendar-pageable-navigation.component';
import { NbCalendarPickerComponent } from './components/calendar-picker/calendar-picker.component';
import { NbCalendarPickerRowComponent } from './components/calendar-picker/calendar-picker-row.component';
import { NbCalendarYearCellComponent } from './components/calendar-year-picker/calendar-year-cell.component';
import { NbCalendarYearPickerComponent } from './components/calendar-year-picker/calendar-year-picker.component';
import { NbCalendarWeekNumberComponent } from './components/calendar-week-number/calendar-week-number.component';
import { NbNativeDateService } from './services/native-date.service';
import { NbCalendarYearModelService } from './services/calendar-year-model.service';
import { NbCalendarTimeModelService } from './services/calendar-time-model.service';
import { NbCalendarActionsComponent } from './components/calendar-actions/calendar-actions.component';
import * as i0 from "@angular/core";
const SERVICES = [
    { provide: NbDateService, useClass: NbNativeDateService },
    DatePipe,
    NbCalendarMonthModelService,
    NbCalendarYearModelService,
    NbCalendarTimeModelService,
];
const COMPONENTS = [
    NbCalendarViewModeComponent,
    NbCalendarPageableNavigationComponent,
    NbCalendarDaysNamesComponent,
    NbCalendarYearPickerComponent,
    NbCalendarMonthPickerComponent,
    NbCalendarDayPickerComponent,
    NbCalendarDayCellComponent,
    NbCalendarActionsComponent,
    NbCalendarMonthCellComponent,
    NbCalendarYearCellComponent,
    NbCalendarPickerRowComponent,
    NbCalendarPickerComponent,
    NbCalendarWeekNumberComponent,
];
/**
 * `NbCalendarKitModule` is a module that contains multiple useful components for building custom calendars.
 * So if you think our calendars is not enough powerful for you just use calendar-kit and build your own calendar!
 *
 * Available components:
 * - `NbCalendarDayPicker`
 * - `NbCalendarDayCell`
 * - `NbCalendarMonthPicker`
 * - `NbCalendarMonthCell`
 * - `NbCalendarYearPicker`
 * - `NbCalendarYearCell`
 * - `NbCalendarViewModeComponent`
 * - `NbCalendarPageableNavigation`
 *
 * For example you can easily build full calendar:
 * @stacked-example(Full calendar, calendar-kit/calendar-kit-full-calendar.component)
 * */
export class NbCalendarKitModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbCalendarKitModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.1.0", ngImport: i0, type: NbCalendarKitModule, declarations: [NbCalendarViewModeComponent,
            NbCalendarPageableNavigationComponent,
            NbCalendarDaysNamesComponent,
            NbCalendarYearPickerComponent,
            NbCalendarMonthPickerComponent,
            NbCalendarDayPickerComponent,
            NbCalendarDayCellComponent,
            NbCalendarActionsComponent,
            NbCalendarMonthCellComponent,
            NbCalendarYearCellComponent,
            NbCalendarPickerRowComponent,
            NbCalendarPickerComponent,
            NbCalendarWeekNumberComponent], imports: [NbSharedModule, NbButtonModule, NbIconModule], exports: [NbCalendarViewModeComponent,
            NbCalendarPageableNavigationComponent,
            NbCalendarDaysNamesComponent,
            NbCalendarYearPickerComponent,
            NbCalendarMonthPickerComponent,
            NbCalendarDayPickerComponent,
            NbCalendarDayCellComponent,
            NbCalendarActionsComponent,
            NbCalendarMonthCellComponent,
            NbCalendarYearCellComponent,
            NbCalendarPickerRowComponent,
            NbCalendarPickerComponent,
            NbCalendarWeekNumberComponent] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbCalendarKitModule, providers: [...SERVICES], imports: [NbSharedModule, NbButtonModule, NbIconModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbCalendarKitModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [NbSharedModule, NbButtonModule, NbIconModule],
                    exports: [...COMPONENTS],
                    declarations: [...COMPONENTS],
                    providers: [...SERVICES],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIta2l0Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9mcmFtZXdvcmsvdGhlbWUvY29tcG9uZW50cy9jYWxlbmRhci1raXQvY2FsZW5kYXIta2l0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFM0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFbkQsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDdEYsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRXhELE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLDhEQUE4RCxDQUFDO0FBQzFHLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLGdFQUFnRSxDQUFDO0FBQzlHLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLGdFQUFnRSxDQUFDO0FBQzlHLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLGtFQUFrRSxDQUFDO0FBQ2hILE9BQU8sRUFBRSw4QkFBOEIsRUFBRSxNQUFNLG9FQUFvRSxDQUFDO0FBQ3BILE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLCtEQUErRCxDQUFDO0FBQzVHLE9BQU8sRUFDTCxxQ0FBcUMsR0FDdEMsTUFBTSx5RUFBeUUsQ0FBQztBQUNqRixPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSx3REFBd0QsQ0FBQztBQUNuRyxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSw0REFBNEQsQ0FBQztBQUMxRyxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxnRUFBZ0UsQ0FBQztBQUM3RyxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSxrRUFBa0UsQ0FBQztBQUNqSCxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSxrRUFBa0UsQ0FBQztBQUVqSCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNyRSxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUNwRixPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUNwRixPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSwwREFBMEQsQ0FBQzs7QUFHdEcsTUFBTSxRQUFRLEdBQUc7SUFDZixFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsUUFBUSxFQUFFLG1CQUFtQixFQUFFO0lBQ3pELFFBQVE7SUFDUiwyQkFBMkI7SUFDM0IsMEJBQTBCO0lBQzFCLDBCQUEwQjtDQUMzQixDQUFDO0FBRUYsTUFBTSxVQUFVLEdBQUc7SUFDakIsMkJBQTJCO0lBQzNCLHFDQUFxQztJQUNyQyw0QkFBNEI7SUFDNUIsNkJBQTZCO0lBQzdCLDhCQUE4QjtJQUM5Qiw0QkFBNEI7SUFDNUIsMEJBQTBCO0lBQzFCLDBCQUEwQjtJQUMxQiw0QkFBNEI7SUFDNUIsMkJBQTJCO0lBQzNCLDRCQUE0QjtJQUM1Qix5QkFBeUI7SUFDekIsNkJBQTZCO0NBQzlCLENBQUM7QUFFRjs7Ozs7Ozs7Ozs7Ozs7OztLQWdCSztBQU9MLE1BQU0sT0FBTyxtQkFBbUI7OEdBQW5CLG1CQUFtQjsrR0FBbkIsbUJBQW1CLGlCQXRDOUIsMkJBQTJCO1lBQzNCLHFDQUFxQztZQUNyQyw0QkFBNEI7WUFDNUIsNkJBQTZCO1lBQzdCLDhCQUE4QjtZQUM5Qiw0QkFBNEI7WUFDNUIsMEJBQTBCO1lBQzFCLDBCQUEwQjtZQUMxQiw0QkFBNEI7WUFDNUIsMkJBQTJCO1lBQzNCLDRCQUE0QjtZQUM1Qix5QkFBeUI7WUFDekIsNkJBQTZCLGFBcUJsQixjQUFjLEVBQUUsY0FBYyxFQUFFLFlBQVksYUFqQ3ZELDJCQUEyQjtZQUMzQixxQ0FBcUM7WUFDckMsNEJBQTRCO1lBQzVCLDZCQUE2QjtZQUM3Qiw4QkFBOEI7WUFDOUIsNEJBQTRCO1lBQzVCLDBCQUEwQjtZQUMxQiwwQkFBMEI7WUFDMUIsNEJBQTRCO1lBQzVCLDJCQUEyQjtZQUMzQiw0QkFBNEI7WUFDNUIseUJBQXlCO1lBQ3pCLDZCQUE2QjsrR0EwQmxCLG1CQUFtQixhQUZuQixDQUFDLEdBQUcsUUFBUSxDQUFDLFlBSGIsY0FBYyxFQUFFLGNBQWMsRUFBRSxZQUFZOzsyRkFLNUMsbUJBQW1CO2tCQU4vQixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsWUFBWSxDQUFFO29CQUN6RCxPQUFPLEVBQUUsQ0FBQyxHQUFHLFVBQVUsQ0FBQztvQkFDeEIsWUFBWSxFQUFFLENBQUMsR0FBRyxVQUFVLENBQUM7b0JBQzdCLFNBQVMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDO2lCQUN6QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBBa3Zlby4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi9cblxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERhdGVQaXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0IHsgTmJTaGFyZWRNb2R1bGUgfSBmcm9tICcuLi9zaGFyZWQvc2hhcmVkLm1vZHVsZSc7XG5pbXBvcnQgeyBOYkJ1dHRvbk1vZHVsZSB9IGZyb20gJy4uL2J1dHRvbi9idXR0b24ubW9kdWxlJztcbmltcG9ydCB7IE5iSWNvbk1vZHVsZSB9IGZyb20gJy4uL2ljb24vaWNvbi5tb2R1bGUnO1xuXG5pbXBvcnQgeyBOYkNhbGVuZGFyTW9udGhNb2RlbFNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2NhbGVuZGFyLW1vbnRoLW1vZGVsLnNlcnZpY2UnO1xuaW1wb3J0IHsgTmJEYXRlU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvZGF0ZS5zZXJ2aWNlJztcblxuaW1wb3J0IHsgTmJDYWxlbmRhckRheUNlbGxDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvY2FsZW5kYXItZGF5LXBpY2tlci9jYWxlbmRhci1kYXktY2VsbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTmJDYWxlbmRhckRheVBpY2tlckNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9jYWxlbmRhci1kYXktcGlja2VyL2NhbGVuZGFyLWRheS1waWNrZXIuY29tcG9uZW50JztcbmltcG9ydCB7IE5iQ2FsZW5kYXJEYXlzTmFtZXNDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvY2FsZW5kYXItZGF5cy1uYW1lcy9jYWxlbmRhci1kYXlzLW5hbWVzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOYkNhbGVuZGFyTW9udGhDZWxsQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2NhbGVuZGFyLW1vbnRoLXBpY2tlci9jYWxlbmRhci1tb250aC1jZWxsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOYkNhbGVuZGFyTW9udGhQaWNrZXJDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvY2FsZW5kYXItbW9udGgtcGlja2VyL2NhbGVuZGFyLW1vbnRoLXBpY2tlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTmJDYWxlbmRhclZpZXdNb2RlQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2NhbGVuZGFyLW5hdmlnYXRpb24vY2FsZW5kYXItdmlldy1tb2RlLmNvbXBvbmVudCc7XG5pbXBvcnQge1xuICBOYkNhbGVuZGFyUGFnZWFibGVOYXZpZ2F0aW9uQ29tcG9uZW50LFxufSBmcm9tICcuL2NvbXBvbmVudHMvY2FsZW5kYXItbmF2aWdhdGlvbi9jYWxlbmRhci1wYWdlYWJsZS1uYXZpZ2F0aW9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOYkNhbGVuZGFyUGlja2VyQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2NhbGVuZGFyLXBpY2tlci9jYWxlbmRhci1waWNrZXIuY29tcG9uZW50JztcbmltcG9ydCB7IE5iQ2FsZW5kYXJQaWNrZXJSb3dDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvY2FsZW5kYXItcGlja2VyL2NhbGVuZGFyLXBpY2tlci1yb3cuY29tcG9uZW50JztcbmltcG9ydCB7IE5iQ2FsZW5kYXJZZWFyQ2VsbENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9jYWxlbmRhci15ZWFyLXBpY2tlci9jYWxlbmRhci15ZWFyLWNlbGwuY29tcG9uZW50JztcbmltcG9ydCB7IE5iQ2FsZW5kYXJZZWFyUGlja2VyQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2NhbGVuZGFyLXllYXItcGlja2VyL2NhbGVuZGFyLXllYXItcGlja2VyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOYkNhbGVuZGFyV2Vla051bWJlckNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9jYWxlbmRhci13ZWVrLW51bWJlci9jYWxlbmRhci13ZWVrLW51bWJlci5jb21wb25lbnQnO1xuXG5pbXBvcnQgeyBOYk5hdGl2ZURhdGVTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9uYXRpdmUtZGF0ZS5zZXJ2aWNlJztcbmltcG9ydCB7IE5iQ2FsZW5kYXJZZWFyTW9kZWxTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9jYWxlbmRhci15ZWFyLW1vZGVsLnNlcnZpY2UnO1xuaW1wb3J0IHsgTmJDYWxlbmRhclRpbWVNb2RlbFNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2NhbGVuZGFyLXRpbWUtbW9kZWwuc2VydmljZSc7XG5pbXBvcnQgeyBOYkNhbGVuZGFyQWN0aW9uc0NvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9jYWxlbmRhci1hY3Rpb25zL2NhbGVuZGFyLWFjdGlvbnMuY29tcG9uZW50JztcblxuXG5jb25zdCBTRVJWSUNFUyA9IFtcbiAgeyBwcm92aWRlOiBOYkRhdGVTZXJ2aWNlLCB1c2VDbGFzczogTmJOYXRpdmVEYXRlU2VydmljZSB9LFxuICBEYXRlUGlwZSxcbiAgTmJDYWxlbmRhck1vbnRoTW9kZWxTZXJ2aWNlLFxuICBOYkNhbGVuZGFyWWVhck1vZGVsU2VydmljZSxcbiAgTmJDYWxlbmRhclRpbWVNb2RlbFNlcnZpY2UsXG5dO1xuXG5jb25zdCBDT01QT05FTlRTID0gW1xuICBOYkNhbGVuZGFyVmlld01vZGVDb21wb25lbnQsXG4gIE5iQ2FsZW5kYXJQYWdlYWJsZU5hdmlnYXRpb25Db21wb25lbnQsXG4gIE5iQ2FsZW5kYXJEYXlzTmFtZXNDb21wb25lbnQsXG4gIE5iQ2FsZW5kYXJZZWFyUGlja2VyQ29tcG9uZW50LFxuICBOYkNhbGVuZGFyTW9udGhQaWNrZXJDb21wb25lbnQsXG4gIE5iQ2FsZW5kYXJEYXlQaWNrZXJDb21wb25lbnQsXG4gIE5iQ2FsZW5kYXJEYXlDZWxsQ29tcG9uZW50LFxuICBOYkNhbGVuZGFyQWN0aW9uc0NvbXBvbmVudCxcbiAgTmJDYWxlbmRhck1vbnRoQ2VsbENvbXBvbmVudCxcbiAgTmJDYWxlbmRhclllYXJDZWxsQ29tcG9uZW50LFxuICBOYkNhbGVuZGFyUGlja2VyUm93Q29tcG9uZW50LFxuICBOYkNhbGVuZGFyUGlja2VyQ29tcG9uZW50LFxuICBOYkNhbGVuZGFyV2Vla051bWJlckNvbXBvbmVudCxcbl07XG5cbi8qKlxuICogYE5iQ2FsZW5kYXJLaXRNb2R1bGVgIGlzIGEgbW9kdWxlIHRoYXQgY29udGFpbnMgbXVsdGlwbGUgdXNlZnVsIGNvbXBvbmVudHMgZm9yIGJ1aWxkaW5nIGN1c3RvbSBjYWxlbmRhcnMuXG4gKiBTbyBpZiB5b3UgdGhpbmsgb3VyIGNhbGVuZGFycyBpcyBub3QgZW5vdWdoIHBvd2VyZnVsIGZvciB5b3UganVzdCB1c2UgY2FsZW5kYXIta2l0IGFuZCBidWlsZCB5b3VyIG93biBjYWxlbmRhciFcbiAqXG4gKiBBdmFpbGFibGUgY29tcG9uZW50czpcbiAqIC0gYE5iQ2FsZW5kYXJEYXlQaWNrZXJgXG4gKiAtIGBOYkNhbGVuZGFyRGF5Q2VsbGBcbiAqIC0gYE5iQ2FsZW5kYXJNb250aFBpY2tlcmBcbiAqIC0gYE5iQ2FsZW5kYXJNb250aENlbGxgXG4gKiAtIGBOYkNhbGVuZGFyWWVhclBpY2tlcmBcbiAqIC0gYE5iQ2FsZW5kYXJZZWFyQ2VsbGBcbiAqIC0gYE5iQ2FsZW5kYXJWaWV3TW9kZUNvbXBvbmVudGBcbiAqIC0gYE5iQ2FsZW5kYXJQYWdlYWJsZU5hdmlnYXRpb25gXG4gKlxuICogRm9yIGV4YW1wbGUgeW91IGNhbiBlYXNpbHkgYnVpbGQgZnVsbCBjYWxlbmRhcjpcbiAqIEBzdGFja2VkLWV4YW1wbGUoRnVsbCBjYWxlbmRhciwgY2FsZW5kYXIta2l0L2NhbGVuZGFyLWtpdC1mdWxsLWNhbGVuZGFyLmNvbXBvbmVudClcbiAqICovXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbIE5iU2hhcmVkTW9kdWxlLCBOYkJ1dHRvbk1vZHVsZSwgTmJJY29uTW9kdWxlIF0sXG4gIGV4cG9ydHM6IFsuLi5DT01QT05FTlRTXSxcbiAgZGVjbGFyYXRpb25zOiBbLi4uQ09NUE9ORU5UU10sXG4gIHByb3ZpZGVyczogWy4uLlNFUlZJQ0VTXSxcbn0pXG5leHBvcnQgY2xhc3MgTmJDYWxlbmRhcktpdE1vZHVsZSB7XG59XG4iXX0=