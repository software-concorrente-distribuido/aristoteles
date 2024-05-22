/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { NgModule } from '@angular/core';
import { NbCalendarRangeComponent } from './calendar-range.component';
import { NbCalendarRangeDayCellComponent } from './calendar-range-day-cell.component';
import { NbCalendarRangeYearCellComponent } from './calendar-range-year-cell.component';
import { NbCalendarRangeMonthCellComponent } from './calendar-range-month-cell.component';
import { NbBaseCalendarModule } from './base-calendar.module';
import * as i0 from "@angular/core";
export class NbCalendarRangeModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbCalendarRangeModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.1.0", ngImport: i0, type: NbCalendarRangeModule, declarations: [NbCalendarRangeComponent,
            NbCalendarRangeDayCellComponent,
            NbCalendarRangeYearCellComponent,
            NbCalendarRangeMonthCellComponent], imports: [NbBaseCalendarModule], exports: [NbCalendarRangeComponent] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbCalendarRangeModule, imports: [NbBaseCalendarModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbCalendarRangeModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [NbBaseCalendarModule],
                    exports: [NbCalendarRangeComponent],
                    declarations: [
                        NbCalendarRangeComponent,
                        NbCalendarRangeDayCellComponent,
                        NbCalendarRangeYearCellComponent,
                        NbCalendarRangeMonthCellComponent,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItcmFuZ2UubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2ZyYW1ld29yay90aGVtZS9jb21wb25lbnRzL2NhbGVuZGFyL2NhbGVuZGFyLXJhbmdlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV6QyxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN0RSxPQUFPLEVBQUUsK0JBQStCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUN0RixPQUFPLEVBQUUsZ0NBQWdDLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUN4RixPQUFPLEVBQUUsaUNBQWlDLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUMxRixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQzs7QUFhOUQsTUFBTSxPQUFPLHFCQUFxQjs4R0FBckIscUJBQXFCOytHQUFyQixxQkFBcUIsaUJBTjlCLHdCQUF3QjtZQUN4QiwrQkFBK0I7WUFDL0IsZ0NBQWdDO1lBQ2hDLGlDQUFpQyxhQU56QixvQkFBb0IsYUFDcEIsd0JBQXdCOytHQVF2QixxQkFBcUIsWUFUdEIsb0JBQW9COzsyRkFTbkIscUJBQXFCO2tCQVZqQyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLG9CQUFvQixDQUFDO29CQUMvQixPQUFPLEVBQUUsQ0FBQyx3QkFBd0IsQ0FBQztvQkFDbkMsWUFBWSxFQUFFO3dCQUNaLHdCQUF3Qjt3QkFDeEIsK0JBQStCO3dCQUMvQixnQ0FBZ0M7d0JBQ2hDLGlDQUFpQztxQkFDbEM7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgQWt2ZW8uIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICovXG5cbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE5iQ2FsZW5kYXJSYW5nZUNvbXBvbmVudCB9IGZyb20gJy4vY2FsZW5kYXItcmFuZ2UuY29tcG9uZW50JztcbmltcG9ydCB7IE5iQ2FsZW5kYXJSYW5nZURheUNlbGxDb21wb25lbnQgfSBmcm9tICcuL2NhbGVuZGFyLXJhbmdlLWRheS1jZWxsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOYkNhbGVuZGFyUmFuZ2VZZWFyQ2VsbENvbXBvbmVudCB9IGZyb20gJy4vY2FsZW5kYXItcmFuZ2UteWVhci1jZWxsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOYkNhbGVuZGFyUmFuZ2VNb250aENlbGxDb21wb25lbnQgfSBmcm9tICcuL2NhbGVuZGFyLXJhbmdlLW1vbnRoLWNlbGwuY29tcG9uZW50JztcbmltcG9ydCB7IE5iQmFzZUNhbGVuZGFyTW9kdWxlIH0gZnJvbSAnLi9iYXNlLWNhbGVuZGFyLm1vZHVsZSc7XG5cblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW05iQmFzZUNhbGVuZGFyTW9kdWxlXSxcbiAgZXhwb3J0czogW05iQ2FsZW5kYXJSYW5nZUNvbXBvbmVudF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIE5iQ2FsZW5kYXJSYW5nZUNvbXBvbmVudCxcbiAgICBOYkNhbGVuZGFyUmFuZ2VEYXlDZWxsQ29tcG9uZW50LFxuICAgIE5iQ2FsZW5kYXJSYW5nZVllYXJDZWxsQ29tcG9uZW50LFxuICAgIE5iQ2FsZW5kYXJSYW5nZU1vbnRoQ2VsbENvbXBvbmVudCxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgTmJDYWxlbmRhclJhbmdlTW9kdWxlIHtcbn1cbiJdfQ==