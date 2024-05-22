/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NbCalendarSize, NbCalendarViewMode, } from '../calendar-kit/model';
import { NbCalendarRangeDayCellComponent } from './calendar-range-day-cell.component';
import { NbCalendarRangeYearCellComponent } from './calendar-range-year-cell.component';
import { NbCalendarRangeMonthCellComponent } from './calendar-range-month-cell.component';
import { convertToBoolProperty } from '../helpers';
import * as i0 from "@angular/core";
import * as i1 from "../calendar-kit/services/date.service";
import * as i2 from "./base-calendar.component";
/**
 * CalendarRange component provides a capability to choose a date range.
 *
 * ```html
 * <nb-calendar [(date)]="date"></nb-calendar>
 * <nb-calendar [date]="date" (dateChange)="handleDateChange($event)"></nb-calendar>
 * ```
 *
 * Basic usage example
 * @stacked-example(Range, calendar/calendar-range-showcase.component)
 *
 * ### Installation
 *
 * Import `NbCalendarRangeModule` to your feature module.
 * ```ts
 * @NgModule({
 *   imports: [
 *     // ...
 *     NbCalendarRangeModule,
 *   ],
 * })
 * export class PageModule { }
 * ```
 *
 * ### Usage
 *
 * CalendarRange component supports all of the Calendar component customization properties. More defails can be found
 * in the [Calendar component docs](docs/components/calendar).
 *
 * @styles
 *
 * calendar-width:
 * calendar-background-color:
 * calendar-border-color:
 * calendar-border-style:
 * calendar-border-width:
 * calendar-border-radius:
 * calendar-text-color:
 * calendar-text-font-family:
 * calendar-text-font-size:
 * calendar-text-font-weight:
 * calendar-text-line-height:
 * calendar-picker-padding-top:
 * calendar-picker-padding-bottom:
 * calendar-picker-padding-start:
 * calendar-picker-padding-end:
 * calendar-navigation-text-color:
 * calendar-navigation-text-font-family:
 * calendar-navigation-title-text-font-size:
 * calendar-navigation-title-text-font-weight:
 * calendar-navigation-title-text-line-height:
 * calendar-navigation-padding:
 * calendar-cell-inactive-text-color:
 * calendar-cell-disabled-text-color:
 * calendar-cell-hover-background-color:
 * calendar-cell-hover-border-color:
 * calendar-cell-hover-text-color:
 * calendar-cell-hover-text-font-size:
 * calendar-cell-hover-text-font-weight:
 * calendar-cell-hover-text-line-height:
 * calendar-cell-active-background-color:
 * calendar-cell-active-border-color:
 * calendar-cell-active-text-color:
 * calendar-cell-active-text-font-size:
 * calendar-cell-active-text-font-weight:
 * calendar-cell-active-text-line-height:
 * calendar-cell-today-background-color:
 * calendar-cell-today-border-color:
 * calendar-cell-today-text-color:
 * calendar-cell-today-text-font-size:
 * calendar-cell-today-text-font-weight:
 * calendar-cell-today-text-line-height:
 * calendar-cell-today-hover-background-color:
 * calendar-cell-today-hover-border-color:
 * calendar-cell-today-active-background-color:
 * calendar-cell-today-active-border-color:
 * calendar-cell-today-disabled-border-color:
 * calendar-cell-today-selected-background-color:
 * calendar-cell-today-selected-border-color:
 * calendar-cell-today-selected-text-color:
 * calendar-cell-today-selected-hover-background-color:
 * calendar-cell-today-selected-hover-border-color:
 * calendar-cell-today-selected-active-background-color:
 * calendar-cell-today-selected-active-border-color:
 * calendar-cell-today-in-range-background-color:
 * calendar-cell-today-in-range-border-color:
 * calendar-cell-today-in-range-text-color:
 * calendar-cell-today-in-range-hover-background-color:
 * calendar-cell-today-in-range-hover-border-color:
 * calendar-cell-today-in-range-active-background-color:
 * calendar-cell-today-in-range-active-border-color:
 * calendar-cell-selected-background-color:
 * calendar-cell-selected-border-color:
 * calendar-cell-selected-text-color:
 * calendar-cell-selected-text-font-size:
 * calendar-cell-selected-text-font-weight:
 * calendar-cell-selected-text-line-height:
 * calendar-cell-selected-hover-background-color:
 * calendar-cell-selected-hover-border-color:
 * calendar-cell-selected-active-background-color:
 * calendar-cell-selected-active-border-color:
 * calendar-day-cell-width:
 * calendar-day-cell-height:
 * calendar-month-cell-width:
 * calendar-month-cell-height:
 * calendar-year-cell-width:
 * calendar-year-cell-height:
 * calendar-weekday-background:
 * calendar-weekday-divider-color:
 * calendar-weekday-divider-width:
 * calendar-weekday-text-color:
 * calendar-weekday-text-font-size:
 * calendar-weekday-text-font-weight:
 * calendar-weekday-text-line-height:
 * calendar-weekday-holiday-text-color:
 * calendar-weekday-height:
 * calendar-weekday-width:
 * calendar-weeknumber-background:
 * calendar-weeknumber-divider-color:
 * calendar-weeknumber-divider-width:
 * calendar-weeknumber-text-color:
 * calendar-weeknumber-text-font-size:
 * calendar-weeknumber-text-font-weight:
 * calendar-weeknumber-text-line-height:
 * calendar-weeknumber-height:
 * calendar-weeknumber-width:
 * calendar-large-width:
 * calendar-day-cell-large-width:
 * calendar-day-cell-large-height:
 * calendar-weekday-large-height:
 * calendar-weekday-large-width:
 * calendar-weeknumber-large-height:
 * calendar-weeknumber-large-width:
 * calendar-month-cell-large-width:
 * calendar-month-cell-large-height:
 * calendar-year-cell-large-width:
 * calendar-year-cell-large-height:
 * */
export class NbCalendarRangeComponent {
    /**
     * Custom day cell component. Have to implement `NbCalendarCell` interface.
     * */
    set _cellComponent(cellComponent) {
        if (cellComponent) {
            this.dayCellComponent = cellComponent;
        }
    }
    /**
     * Custom month cell component. Have to implement `NbCalendarCell` interface.
     * */
    set _monthCellComponent(cellComponent) {
        if (cellComponent) {
            this.monthCellComponent = cellComponent;
        }
    }
    /**
     * Custom year cell component. Have to implement `NbCalendarCell` interface.
     * */
    set _yearCellComponent(cellComponent) {
        if (cellComponent) {
            this.yearCellComponent = cellComponent;
        }
    }
    /**
     * Determines should we show week numbers column.
     * False by default.
     * */
    get showWeekNumber() {
        return this._showWeekNumber;
    }
    set showWeekNumber(value) {
        this._showWeekNumber = convertToBoolProperty(value);
    }
    constructor(dateService) {
        this.dateService = dateService;
        /**
         * Defines if we should render previous and next months
         * in the current month view.
         * */
        this.boundingMonth = true;
        /**
         * Defines starting view for the calendar.
         * */
        this.startView = NbCalendarViewMode.DATE;
        this.dayCellComponent = NbCalendarRangeDayCellComponent;
        this.monthCellComponent = NbCalendarRangeMonthCellComponent;
        this.yearCellComponent = NbCalendarRangeYearCellComponent;
        /**
         * Size of the calendar and entire components.
         * Can be 'medium' which is default or 'large'.
         * */
        this.size = NbCalendarSize.MEDIUM;
        /**
         * Determines should we show calendars navigation or not.
         * */
        this.showNavigation = true;
        this._showWeekNumber = false;
        /**
         * Sets symbol used as a header for week numbers column
         * */
        this.weekNumberSymbol = '#';
        /**
         * Emits range when start selected and emits again when end selected.
         * */
        this.rangeChange = new EventEmitter();
    }
    onChange(date) {
        this.initDateIfNull();
        this.handleSelected(date);
    }
    initDateIfNull() {
        if (!this.range) {
            this.range = { start: null, end: null };
        }
    }
    handleSelected(date) {
        if (this.selectionStarted()) {
            this.selectEnd(date);
        }
        else {
            this.selectStart(date);
        }
    }
    selectionStarted() {
        const { start, end } = this.range;
        return start && !end;
    }
    selectStart(start) {
        this.selectRange({ start });
    }
    selectEnd(date) {
        const { start } = this.range;
        if (this.dateService.compareDates(date, start) > 0) {
            this.selectRange({ start, end: date });
        }
        else {
            this.selectRange({ start: date, end: start });
        }
    }
    selectRange(range) {
        this.range = range;
        this.rangeChange.emit(range);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbCalendarRangeComponent, deps: [{ token: i1.NbDateService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.1.0", type: NbCalendarRangeComponent, selector: "nb-calendar-range", inputs: { boundingMonth: "boundingMonth", startView: "startView", min: "min", max: "max", filter: "filter", _cellComponent: ["dayCellComponent", "_cellComponent"], _monthCellComponent: ["monthCellComponent", "_monthCellComponent"], monthCellComponent: "monthCellComponent", _yearCellComponent: ["yearCellComponent", "_yearCellComponent"], size: "size", visibleDate: "visibleDate", showNavigation: "showNavigation", range: "range", showWeekNumber: "showWeekNumber", weekNumberSymbol: "weekNumberSymbol", firstDayOfWeek: "firstDayOfWeek" }, outputs: { rangeChange: "rangeChange" }, ngImport: i0, template: `
    <nb-base-calendar
      [date]="range"
      (dateChange)="onChange($any($event))"
      [min]="min"
      [max]="max"
      [filter]="filter"
      [startView]="startView"
      [boundingMonth]="boundingMonth"
      [dayCellComponent]="dayCellComponent"
      [monthCellComponent]="monthCellComponent"
      [yearCellComponent]="yearCellComponent"
      [visibleDate]="visibleDate"
      [showNavigation]="showNavigation"
      [size]="size"
      [showWeekNumber]="showWeekNumber"
      [weekNumberSymbol]="weekNumberSymbol"
      [firstDayOfWeek]="firstDayOfWeek"
    ></nb-base-calendar>
  `, isInline: true, dependencies: [{ kind: "component", type: i2.NbBaseCalendarComponent, selector: "nb-base-calendar", inputs: ["boundingMonth", "startView", "min", "max", "filter", "dayCellComponent", "monthCellComponent", "yearCellComponent", "size", "visibleDate", "showNavigation", "date", "showWeekNumber", "weekNumberSymbol", "firstDayOfWeek"], outputs: ["dateChange"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbCalendarRangeComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nb-calendar-range',
                    template: `
    <nb-base-calendar
      [date]="range"
      (dateChange)="onChange($any($event))"
      [min]="min"
      [max]="max"
      [filter]="filter"
      [startView]="startView"
      [boundingMonth]="boundingMonth"
      [dayCellComponent]="dayCellComponent"
      [monthCellComponent]="monthCellComponent"
      [yearCellComponent]="yearCellComponent"
      [visibleDate]="visibleDate"
      [showNavigation]="showNavigation"
      [size]="size"
      [showWeekNumber]="showWeekNumber"
      [weekNumberSymbol]="weekNumberSymbol"
      [firstDayOfWeek]="firstDayOfWeek"
    ></nb-base-calendar>
  `,
                }]
        }], ctorParameters: () => [{ type: i1.NbDateService }], propDecorators: { boundingMonth: [{
                type: Input
            }], startView: [{
                type: Input
            }], min: [{
                type: Input
            }], max: [{
                type: Input
            }], filter: [{
                type: Input
            }], _cellComponent: [{
                type: Input,
                args: ['dayCellComponent']
            }], _monthCellComponent: [{
                type: Input,
                args: ['monthCellComponent']
            }], monthCellComponent: [{
                type: Input
            }], _yearCellComponent: [{
                type: Input,
                args: ['yearCellComponent']
            }], size: [{
                type: Input
            }], visibleDate: [{
                type: Input
            }], showNavigation: [{
                type: Input
            }], range: [{
                type: Input
            }], showWeekNumber: [{
                type: Input
            }], weekNumberSymbol: [{
                type: Input
            }], firstDayOfWeek: [{
                type: Input
            }], rangeChange: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItcmFuZ2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2ZyYW1ld29yay90aGVtZS9jb21wb25lbnRzL2NhbGVuZGFyL2NhbGVuZGFyLXJhbmdlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBUSxNQUFNLGVBQWUsQ0FBQztBQUU3RSxPQUFPLEVBRUwsY0FBYyxFQUNkLGtCQUFrQixHQUduQixNQUFNLHVCQUF1QixDQUFDO0FBRS9CLE9BQU8sRUFBRSwrQkFBK0IsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQ3RGLE9BQU8sRUFBRSxnQ0FBZ0MsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQ3hGLE9BQU8sRUFBRSxpQ0FBaUMsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQzFGLE9BQU8sRUFBRSxxQkFBcUIsRUFBa0IsTUFBTSxZQUFZLENBQUM7Ozs7QUFRbkU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBeUlLO0FBd0JMLE1BQU0sT0FBTyx3QkFBd0I7SUE0Qm5DOztTQUVLO0lBQ0wsSUFDSSxjQUFjLENBQUMsYUFBMEQ7UUFDM0UsSUFBSSxhQUFhLEVBQUUsQ0FBQztZQUNsQixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsYUFBYSxDQUFDO1FBQ3hDLENBQUM7SUFDSCxDQUFDO0lBR0Q7O1NBRUs7SUFDTCxJQUNJLG1CQUFtQixDQUFDLGFBQTBEO1FBQ2hGLElBQUksYUFBYSxFQUFFLENBQUM7WUFDbEIsSUFBSSxDQUFDLGtCQUFrQixHQUFHLGFBQWEs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QUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMvQixDQUFDOzhHQTFKVSx3QkFBd0I7a0dBQXhCLHdCQUF3Qiw2bkJBckJ6Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1CVDs7MkZBRVUsd0JBQXdCO2tCQXZCcEMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsbUJBQW1CO29CQUM3QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQlQ7aUJBQ0Y7a0ZBTVUsYUFBYTtzQkFBckIsS0FBSztnQkFLRyxTQUFTO3NCQUFqQixLQUFLO2dCQU1HLEdBQUc7c0JBQVgsS0FBSztnQkFLRyxHQUFHO3NCQUFYLEtBQUs7Z0JBS0csTUFBTTtzQkFBZCxLQUFLO2dCQU1GLGNBQWM7c0JBRGpCLEtBQUs7dUJBQUMsa0JBQWtCO2dCQVlyQixtQkFBbUI7c0JBRHRCLEtBQUs7dUJBQUMsb0JBQW9CO2dCQU1sQixrQkFBa0I7c0JBQTFCLEtBQUs7Z0JBTUYsa0JBQWtCO3NCQURyQixLQUFLO3VCQUFDLG1CQUFtQjtnQkFZakIsSUFBSTtzQkFBWixLQUFLO2dCQUdHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBS0csY0FBYztzQkFBdEIsS0FBSztnQkFLRyxLQUFLO3NCQUFiLEtBQUs7Z0JBT0YsY0FBYztzQkFEakIsS0FBSztnQkFhRyxnQkFBZ0I7c0JBQXhCLEtBQUs7Z0JBTUcsY0FBYztzQkFBdEIsS0FBSztnQkFLSSxXQUFXO3NCQUFwQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEFrdmVvLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqL1xuXG5pbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCwgVHlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge1xuICBOYkNhbGVuZGFyQ2VsbCxcbiAgTmJDYWxlbmRhclNpemUsXG4gIE5iQ2FsZW5kYXJWaWV3TW9kZSxcbiAgTmJDYWxlbmRhclNpemVWYWx1ZXMsXG4gIE5iQ2FsZW5kYXJWaWV3TW9kZVZhbHVlcyxcbn0gZnJvbSAnLi4vY2FsZW5kYXIta2l0L21vZGVsJztcbmltcG9ydCB7IE5iRGF0ZVNlcnZpY2UgfSBmcm9tICcuLi9jYWxlbmRhci1raXQvc2VydmljZXMvZGF0ZS5zZXJ2aWNlJztcbmltcG9ydCB7IE5iQ2FsZW5kYXJSYW5nZURheUNlbGxDb21wb25lbnQgfSBmcm9tICcuL2NhbGVuZGFyLXJhbmdlLWRheS1jZWxsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOYkNhbGVuZGFyUmFuZ2VZZWFyQ2VsbENvbXBvbmVudCB9IGZyb20gJy4vY2FsZW5kYXItcmFuZ2UteWVhci1jZWxsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOYkNhbGVuZGFyUmFuZ2VNb250aENlbGxDb21wb25lbnQgfSBmcm9tICcuL2NhbGVuZGFyLXJhbmdlLW1vbnRoLWNlbGwuY29tcG9uZW50JztcbmltcG9ydCB7IGNvbnZlcnRUb0Jvb2xQcm9wZXJ0eSwgTmJCb29sZWFuSW5wdXQgfSBmcm9tICcuLi9oZWxwZXJzJztcblxuXG5leHBvcnQgaW50ZXJmYWNlIE5iQ2FsZW5kYXJSYW5nZTxEPiB7XG4gIHN0YXJ0OiBEO1xuICBlbmQ/OiBEO1xufVxuXG4vKipcbiAqIENhbGVuZGFyUmFuZ2UgY29tcG9uZW50IHByb3ZpZGVzIGEgY2FwYWJpbGl0eSB0byBjaG9vc2UgYSBkYXRlIHJhbmdlLlxuICpcbiAqIGBgYGh0bWxcbiAqIDxuYi1jYWxlbmRhciBbKGRhdGUpXT1cImRhdGVcIj48L25iLWNhbGVuZGFyPlxuICogPG5iLWNhbGVuZGFyIFtkYXRlXT1cImRhdGVcIiAoZGF0ZUNoYW5nZSk9XCJoYW5kbGVEYXRlQ2hhbmdlKCRldmVudClcIj48L25iLWNhbGVuZGFyPlxuICogYGBgXG4gKlxuICogQmFzaWMgdXNhZ2UgZXhhbXBsZVxuICogQHN0YWNrZWQtZXhhbXBsZShSYW5nZSwgY2FsZW5kYXIvY2FsZW5kYXItcmFuZ2Utc2hvd2Nhc2UuY29tcG9uZW50KVxuICpcbiAqICMjIyBJbnN0YWxsYXRpb25cbiAqXG4gKiBJbXBvcnQgYE5iQ2FsZW5kYXJSYW5nZU1vZHVsZWAgdG8geW91ciBmZWF0dXJlIG1vZHVsZS5cbiAqIGBgYHRzXG4gKiBATmdNb2R1bGUoe1xuICogICBpbXBvcnRzOiBbXG4gKiAgICAgLy8gLi4uXG4gKiAgICAgTmJDYWxlbmRhclJhbmdlTW9kdWxlLFxuICogICBdLFxuICogfSlcbiAqIGV4cG9ydCBjbGFzcyBQYWdlTW9kdWxlIHsgfVxuICogYGBgXG4gKlxuICogIyMjIFVzYWdlXG4gKlxuICogQ2FsZW5kYXJSYW5nZSBjb21wb25lbnQgc3VwcG9ydHMgYWxsIG9mIHRoZSBDYWxlbmRhciBjb21wb25lbnQgY3VzdG9taXphdGlvbiBwcm9wZXJ0aWVzLiBNb3JlIGRlZmFpbHMgY2FuIGJlIGZvdW5kXG4gKiBpbiB0aGUgW0NhbGVuZGFyIGNvbXBvbmVudCBkb2NzXShkb2NzL2NvbXBvbmVudHMvY2FsZW5kYXIpLlxuICpcbiAqIEBzdHlsZXNcbiAqXG4gKiBjYWxlbmRhci13aWR0aDpcbiAqIGNhbGVuZGFyLWJhY2tncm91bmQtY29sb3I6XG4gKiBjYWxlbmRhci1ib3JkZXItY29sb3I6XG4gKiBjYWxlbmRhci1ib3JkZXItc3R5bGU6XG4gKiBjYWxlbmRhci1ib3JkZXItd2lkdGg6XG4gKiBjYWxlbmRhci1ib3JkZXItcmFkaXVzOlxuICogY2FsZW5kYXItdGV4dC1jb2xvcjpcbiAqIGNhbGVuZGFyLXRleHQtZm9udC1mYW1pbHk6XG4gKiBjYWxlbmRhci10ZXh0LWZvbnQtc2l6ZTpcbiAqIGNhbGVuZGFyLXRleHQtZm9udC13ZWlnaHQ6XG4gKiBjYWxlbmRhci10ZXh0LWxpbmUtaGVpZ2h0OlxuICogY2FsZW5kYXItcGlja2VyLXBhZGRpbmctdG9wOlxuICogY2FsZW5kYXItcGlja2VyLXBhZGRpbmctYm90dG9tOlxuICogY2FsZW5kYXItcGlja2VyLXBhZGRpbmctc3RhcnQ6XG4gKiBjYWxlbmRhci1waWNrZXItcGFkZGluZy1lbmQ6XG4gKiBjYWxlbmRhci1uYXZpZ2F0aW9uLXRleHQtY29sb3I6XG4gKiBjYWxlbmRhci1uYXZpZ2F0aW9uLXRleHQtZm9udC1mYW1pbHk6XG4gKiBjYWxlbmRhci1uYXZpZ2F0aW9uLXRpdGxlLXRleHQtZm9udC1zaXplOlxuICogY2FsZW5kYXItbmF2aWdhdGlvbi10aXRsZS10ZXh0LWZvbnQtd2VpZ2h0OlxuICogY2FsZW5kYXItbmF2aWdhdGlvbi10aXRsZS10ZXh0LWxpbmUtaGVpZ2h0OlxuICogY2FsZW5kYXItbmF2aWdhdGlvbi1wYWRkaW5nOlxuICogY2FsZW5kYXItY2VsbC1pbmFjdGl2ZS10ZXh0LWNvbG9yOlxuICogY2FsZW5kYXItY2VsbC1kaXNhYmxlZC10ZXh0LWNvbG9yOlxuICogY2FsZW5kYXItY2VsbC1ob3Zlci1iYWNrZ3JvdW5kLWNvbG9yOlxuICogY2FsZW5kYXItY2VsbC1ob3Zlci1ib3JkZXItY29sb3I6XG4gKiBjYWxlbmRhci1jZWxsLWhvdmVyLXRleHQtY29sb3I6XG4gKiBjYWxlbmRhci1jZWxsLWhvdmVyLXRleHQtZm9udC1zaXplOlxuICogY2FsZW5kYXItY2VsbC1ob3Zlci10ZXh0LWZvbnQtd2VpZ2h0OlxuICogY2FsZW5kYXItY2VsbC1ob3Zlci10ZXh0LWxpbmUtaGVpZ2h0OlxuICogY2FsZW5kYXItY2VsbC1hY3RpdmUtYmFja2dyb3VuZC1jb2xvcjpcbiAqIGNhbGVuZGFyLWNlbGwtYWN0aXZlLWJvcmRlci1jb2xvcjpcbiAqIGNhbGVuZGFyLWNlbGwtYWN0aXZlLXRleHQtY29sb3I6XG4gKiBjYWxlbmRhci1jZWxsLWFjdGl2ZS10ZXh0LWZvbnQtc2l6ZTpcbiAqIGNhbGVuZGFyLWNlbGwtYWN0aXZlLXRleHQtZm9udC13ZWlnaHQ6XG4gKiBjYWxlbmRhci1jZWxsLWFjdGl2ZS10ZXh0LWxpbmUtaGVpZ2h0OlxuICogY2FsZW5kYXItY2VsbC10b2RheS1iYWNrZ3JvdW5kLWNvbG9yOlxuICogY2FsZW5kYXItY2VsbC10b2RheS1ib3JkZXItY29sb3I6XG4gKiBjYWxlbmRhci1jZWxsLXRvZGF5LXRleHQtY29sb3I6XG4gKiBjYWxlbmRhci1jZWxsLXRvZGF5LXRleHQtZm9udC1zaXplOlxuICogY2FsZW5kYXItY2VsbC10b2RheS10ZXh0LWZvbnQtd2VpZ2h0OlxuICogY2FsZW5kYXItY2VsbC10b2RheS10ZXh0LWxpbmUtaGVpZ2h0OlxuICogY2FsZW5kYXItY2VsbC10b2RheS1ob3Zlci1iYWNrZ3JvdW5kLWNvbG9yOlxuICogY2FsZW5kYXItY2VsbC10b2RheS1ob3Zlci1ib3JkZXItY29sb3I6XG4gKiBjYWxlbmRhci1jZWxsLXRvZGF5LWFjdGl2ZS1iYWNrZ3JvdW5kLWNvbG9yOlxuICogY2FsZW5kYXItY2VsbC10b2RheS1hY3RpdmUtYm9yZGVyLWNvbG9yOlxuICogY2FsZW5kYXItY2VsbC10b2RheS1kaXNhYmxlZC1ib3JkZXItY29sb3I6XG4gKiBjYWxlbmRhci1jZWxsLXRvZGF5LXNlbGVjdGVkLWJhY2tncm91bmQtY29sb3I6XG4gKiBjYWxlbmRhci1jZWxsLXRvZGF5LXNlbGVjdGVkLWJvcmRlci1jb2xvcjpcbiAqIGNhbGVuZGFyLWNlbGwtdG9kYXktc2VsZWN0ZWQtdGV4dC1jb2xvcjpcbiAqIGNhbGVuZGFyLWNlbGwtdG9kYXktc2VsZWN0ZWQtaG92ZXItYmFja2dyb3VuZC1jb2xvcjpcbiAqIGNhbGVuZGFyLWNlbGwtdG9kYXktc2VsZWN0ZWQtaG92ZXItYm9yZGVyLWNvbG9yOlxuICogY2FsZW5kYXItY2VsbC10b2RheS1zZWxlY3RlZC1hY3RpdmUtYmFja2dyb3VuZC1jb2xvcjpcbiAqIGNhbGVuZGFyLWNlbGwtdG9kYXktc2VsZWN0ZWQtYWN0aXZlLWJvcmRlci1jb2xvcjpcbiAqIGNhbGVuZGFyLWNlbGwtdG9kYXktaW4tcmFuZ2UtYmFja2dyb3VuZC1jb2xvcjpcbiAqIGNhbGVuZGFyLWNlbGwtdG9kYXktaW4tcmFuZ2UtYm9yZGVyLWNvbG9yOlxuICogY2FsZW5kYXItY2VsbC10b2RheS1pbi1yYW5nZS10ZXh0LWNvbG9yOlxuICogY2FsZW5kYXItY2VsbC10b2RheS1pbi1yYW5nZS1ob3Zlci1iYWNrZ3JvdW5kLWNvbG9yOlxuICogY2FsZW5kYXItY2VsbC10b2RheS1pbi1yYW5nZS1ob3Zlci1ib3JkZXItY29sb3I6XG4gKiBjYWxlbmRhci1jZWxsLXRvZGF5LWluLXJhbmdlLWFjdGl2ZS1iYWNrZ3JvdW5kLWNvbG9yOlxuICogY2FsZW5kYXItY2VsbC10b2RheS1pbi1yYW5nZS1hY3RpdmUtYm9yZGVyLWNvbG9yOlxuICogY2FsZW5kYXItY2VsbC1zZWxlY3RlZC1iYWNrZ3JvdW5kLWNvbG9yOlxuICogY2FsZW5kYXItY2VsbC1zZWxlY3RlZC1ib3JkZXItY29sb3I6XG4gKiBjYWxlbmRhci1jZWxsLXNlbGVjdGVkLXRleHQtY29sb3I6XG4gKiBjYWxlbmRhci1jZWxsLXNlbGVjdGVkLXRleHQtZm9udC1zaXplOlxuICogY2FsZW5kYXItY2VsbC1zZWxlY3RlZC10ZXh0LWZvbnQtd2VpZ2h0OlxuICogY2FsZW5kYXItY2VsbC1zZWxlY3RlZC10ZXh0LWxpbmUtaGVpZ2h0OlxuICogY2FsZW5kYXItY2VsbC1zZWxlY3RlZC1ob3Zlci1iYWNrZ3JvdW5kLWNvbG9yOlxuICogY2FsZW5kYXItY2VsbC1zZWxlY3RlZC1ob3Zlci1ib3JkZXItY29sb3I6XG4gKiBjYWxlbmRhci1jZWxsLXNlbGVjdGVkLWFjdGl2ZS1iYWNrZ3JvdW5kLWNvbG9yOlxuICogY2FsZW5kYXItY2VsbC1zZWxlY3RlZC1hY3RpdmUtYm9yZGVyLWNvbG9yOlxuICogY2FsZW5kYXItZGF5LWNlbGwtd2lkdGg6XG4gKiBjYWxlbmRhci1kYXktY2VsbC1oZWlnaHQ6XG4gKiBjYWxlbmRhci1tb250aC1jZWxsLXdpZHRoOlxuICogY2FsZW5kYXItbW9udGgtY2VsbC1oZWlnaHQ6XG4gKiBjYWxlbmRhci15ZWFyLWNlbGwtd2lkdGg6XG4gKiBjYWxlbmRhci15ZWFyLWNlbGwtaGVpZ2h0OlxuICogY2FsZW5kYXItd2Vla2RheS1iYWNrZ3JvdW5kOlxuICogY2FsZW5kYXItd2Vla2RheS1kaXZpZGVyLWNvbG9yOlxuICogY2FsZW5kYXItd2Vla2RheS1kaXZpZGVyLXdpZHRoOlxuICogY2FsZW5kYXItd2Vla2RheS10ZXh0LWNvbG9yOlxuICogY2FsZW5kYXItd2Vla2RheS10ZXh0LWZvbnQtc2l6ZTpcbiAqIGNhbGVuZGFyLXdlZWtkYXktdGV4dC1mb250LXdlaWdodDpcbiAqIGNhbGVuZGFyLXdlZWtkYXktdGV4dC1saW5lLWhlaWdodDpcbiAqIGNhbGVuZGFyLXdlZWtkYXktaG9saWRheS10ZXh0LWNvbG9yOlxuICogY2FsZW5kYXItd2Vla2RheS1oZWlnaHQ6XG4gKiBjYWxlbmRhci13ZWVrZGF5LXdpZHRoOlxuICogY2FsZW5kYXItd2Vla251bWJlci1iYWNrZ3JvdW5kOlxuICogY2FsZW5kYXItd2Vla251bWJlci1kaXZpZGVyLWNvbG9yOlxuICogY2FsZW5kYXItd2Vla251bWJlci1kaXZpZGVyLXdpZHRoOlxuICogY2FsZW5kYXItd2Vla251bWJlci10ZXh0LWNvbG9yOlxuICogY2FsZW5kYXItd2Vla251bWJlci10ZXh0LWZvbnQtc2l6ZTpcbiAqIGNhbGVuZGFyLXdlZWtudW1iZXItdGV4dC1mb250LXdlaWdodDpcbiAqIGNhbGVuZGFyLXdlZWtudW1iZXItdGV4dC1saW5lLWhlaWdodDpcbiAqIGNhbGVuZGFyLXdlZWtudW1iZXItaGVpZ2h0OlxuICogY2FsZW5kYXItd2Vla251bWJlci13aWR0aDpcbiAqIGNhbGVuZGFyLWxhcmdlLXdpZHRoOlxuICogY2FsZW5kYXItZGF5LWNlbGwtbGFyZ2Utd2lkdGg6XG4gKiBjYWxlbmRhci1kYXktY2VsbC1sYXJnZS1oZWlnaHQ6XG4gKiBjYWxlbmRhci13ZWVrZGF5LWxhcmdlLWhlaWdodDpcbiAqIGNhbGVuZGFyLXdlZWtkYXktbGFyZ2Utd2lkdGg6XG4gKiBjYWxlbmRhci13ZWVrbnVtYmVyLWxhcmdlLWhlaWdodDpcbiAqIGNhbGVuZGFyLXdlZWtudW1iZXItbGFyZ2Utd2lkdGg6XG4gKiBjYWxlbmRhci1tb250aC1jZWxsLWxhcmdlLXdpZHRoOlxuICogY2FsZW5kYXItbW9udGgtY2VsbC1sYXJnZS1oZWlnaHQ6XG4gKiBjYWxlbmRhci15ZWFyLWNlbGwtbGFyZ2Utd2lkdGg6XG4gKiBjYWxlbmRhci15ZWFyLWNlbGwtbGFyZ2UtaGVpZ2h0OlxuICogKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25iLWNhbGVuZGFyLXJhbmdlJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmItYmFzZS1jYWxlbmRhclxuICAgICAgW2RhdGVdPVwicmFuZ2VcIlxuICAgICAgKGRhdGVDaGFuZ2UpPVwib25DaGFuZ2UoJGFueSgkZXZlbnQpKVwiXG4gICAgICBbbWluXT1cIm1pblwiXG4gICAgICBbbWF4XT1cIm1heFwiXG4gICAgICBbZmlsdGVyXT1cImZpbHRlclwiXG4gICAgICBbc3RhcnRWaWV3XT1cInN0YXJ0Vmlld1wiXG4gICAgICBbYm91bmRpbmdNb250aF09XCJib3VuZGluZ01vbnRoXCJcbiAgICAgIFtkYXlDZWxsQ29tcG9uZW50XT1cImRheUNlbGxDb21wb25lbnRcIlxuICAgICAgW21vbnRoQ2VsbENvbXBvbmVudF09XCJtb250aENlbGxDb21wb25lbnRcIlxuICAgICAgW3llYXJDZWxsQ29tcG9uZW50XT1cInllYXJDZWxsQ29tcG9uZW50XCJcbiAgICAgIFt2aXNpYmxlRGF0ZV09XCJ2aXNpYmxlRGF0ZVwiXG4gICAgICBbc2hvd05hdmlnYXRpb25dPVwic2hvd05hdmlnYXRpb25cIlxuICAgICAgW3NpemVdPVwic2l6ZVwiXG4gICAgICBbc2hvd1dlZWtOdW1iZXJdPVwic2hvd1dlZWtOdW1iZXJcIlxuICAgICAgW3dlZWtOdW1iZXJTeW1ib2xdPVwid2Vla051bWJlclN5bWJvbFwiXG4gICAgICBbZmlyc3REYXlPZldlZWtdPVwiZmlyc3REYXlPZldlZWtcIlxuICAgID48L25iLWJhc2UtY2FsZW5kYXI+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIE5iQ2FsZW5kYXJSYW5nZUNvbXBvbmVudDxEPiB7XG4gIC8qKlxuICAgKiBEZWZpbmVzIGlmIHdlIHNob3VsZCByZW5kZXIgcHJldmlvdXMgYW5kIG5leHQgbW9udGhzXG4gICAqIGluIHRoZSBjdXJyZW50IG1vbnRoIHZpZXcuXG4gICAqICovXG4gIEBJbnB1dCgpIGJvdW5kaW5nTW9udGg6IGJvb2xlYW4gPSB0cnVlO1xuXG4gIC8qKlxuICAgKiBEZWZpbmVzIHN0YXJ0aW5nIHZpZXcgZm9yIHRoZSBjYWxlbmRhci5cbiAgICogKi9cbiAgQElucHV0KCkgc3RhcnRWaWV3OiBOYkNhbGVuZGFyVmlld01vZGUgPSBOYkNhbGVuZGFyVmlld01vZGUuREFURTtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX3N0YXJ0VmlldzogTmJDYWxlbmRhclZpZXdNb2RlVmFsdWVzO1xuXG4gIC8qKlxuICAgKiBBIG1pbmltdW0gYXZhaWxhYmxlIGRhdGUgZm9yIHNlbGVjdGlvbi5cbiAgICogKi9cbiAgQElucHV0KCkgbWluOiBEO1xuXG4gIC8qKlxuICAgKiBBIG1heGltdW0gYXZhaWxhYmxlIGRhdGUgZm9yIHNlbGVjdGlvbi5cbiAgICogKi9cbiAgQElucHV0KCkgbWF4OiBEO1xuXG4gIC8qKlxuICAgKiBBIHByZWRpY2F0ZSB0aGF0IGRlY2lkZXMgd2hpY2ggY2VsbHMgd2lsbCBiZSBkaXNhYmxlZC5cbiAgICogKi9cbiAgQElucHV0KCkgZmlsdGVyOiAoRCkgPT4gYm9vbGVhbjtcblxuICAvKipcbiAgICogQ3VzdG9tIGRheSBjZWxsIGNvbXBvbmVudC4gSGF2ZSB0byBpbXBsZW1lbnQgYE5iQ2FsZW5kYXJDZWxsYCBpbnRlcmZhY2UuXG4gICAqICovXG4gIEBJbnB1dCgnZGF5Q2VsbENvbXBvbmVudCcpXG4gIHNldCBfY2VsbENvbXBvbmVudChjZWxsQ29tcG9uZW50OiBUeXBlPE5iQ2FsZW5kYXJDZWxsPEQsIE5iQ2FsZW5kYXJSYW5nZTxEPj4+KSB7XG4gICAgaWYgKGNlbGxDb21wb25lbnQpIHtcbiAgICAgIHRoaXMuZGF5Q2VsbENvbXBvbmVudCA9IGNlbGxDb21wb25lbnQ7XG4gICAgfVxuICB9XG4gIGRheUNlbGxDb21wb25lbnQ6IFR5cGU8TmJDYWxlbmRhckNlbGw8RCwgTmJDYWxlbmRhclJhbmdlPEQ+Pj4gPSBOYkNhbGVuZGFyUmFuZ2VEYXlDZWxsQ29tcG9uZW50O1xuXG4gIC8qKlxuICAgKiBDdXN0b20gbW9udGggY2VsbCBjb21wb25lbnQuIEhhdmUgdG8gaW1wbGVtZW50IGBOYkNhbGVuZGFyQ2VsbGAgaW50ZXJmYWNlLlxuICAgKiAqL1xuICBASW5wdXQoJ21vbnRoQ2VsbENvbXBvbmVudCcpXG4gIHNldCBfbW9udGhDZWxsQ29tcG9uZW50KGNlbGxDb21wb25lbnQ6IFR5cGU8TmJDYWxlbmRhckNlbGw8RCwgTmJDYWxlbmRhclJhbmdlPEQ+Pj4pIHtcbiAgICBpZiAoY2VsbENvbXBvbmVudCkge1xuICAgICAgdGhpcy5tb250aENlbGxDb21wb25lbnQgPSBjZWxsQ29tcG9uZW50O1xuICAgIH1cbiAgfVxuICBASW5wdXQoKSBtb250aENlbGxDb21wb25lbnQ6IFR5cGU8TmJDYWxlbmRhckNlbGw8RCwgTmJDYWxlbmRhclJhbmdlPEQ+Pj4gPSBOYkNhbGVuZGFyUmFuZ2VNb250aENlbGxDb21wb25lbnQ7XG5cbiAgLyoqXG4gICAqIEN1c3RvbSB5ZWFyIGNlbGwgY29tcG9uZW50LiBIYXZlIHRvIGltcGxlbWVudCBgTmJDYWxlbmRhckNlbGxgIGludGVyZmFjZS5cbiAgICogKi9cbiAgQElucHV0KCd5ZWFyQ2VsbENvbXBvbmVudCcpXG4gIHNldCBfeWVhckNlbGxDb21wb25lbnQoY2VsbENvbXBvbmVudDogVHlwZTxOYkNhbGVuZGFyQ2VsbDxELCBOYkNhbGVuZGFyUmFuZ2U8RD4+Pikge1xuICAgIGlmIChjZWxsQ29tcG9uZW50KSB7XG4gICAgICB0aGlzLnllYXJDZWxsQ29tcG9uZW50ID0gY2VsbENvbXBvbmVudDtcbiAgICB9XG4gIH1cbiAgeWVhckNlbGxDb21wb25lbnQ6IFR5cGU8TmJDYWxlbmRhckNlbGw8RCwgTmJDYWxlbmRhclJhbmdlPEQ+Pj4gPSBOYkNhbGVuZGFyUmFuZ2VZZWFyQ2VsbENvbXBvbmVudDtcblxuICAvKipcbiAgICogU2l6ZSBvZiB0aGUgY2FsZW5kYXIgYW5kIGVudGlyZSBjb21wb25lbnRzLlxuICAgKiBDYW4gYmUgJ21lZGl1bScgd2hpY2ggaXMgZGVmYXVsdCBvciAnbGFyZ2UnLlxuICAgKiAqL1xuICBASW5wdXQoKSBzaXplOiBOYkNhbGVuZGFyU2l6ZSA9IE5iQ2FsZW5kYXJTaXplLk1FRElVTTtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX3NpemU6IE5iQ2FsZW5kYXJTaXplVmFsdWVzO1xuXG4gIEBJbnB1dCgpIHZpc2libGVEYXRlOiBEO1xuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmVzIHNob3VsZCB3ZSBzaG93IGNhbGVuZGFycyBuYXZpZ2F0aW9uIG9yIG5vdC5cbiAgICogKi9cbiAgQElucHV0KCkgc2hvd05hdmlnYXRpb246IGJvb2xlYW4gPSB0cnVlO1xuXG4gIC8qKlxuICAgKiBSYW5nZSB3aGljaCB3aWxsIGJlIHJlbmRlcmVkIGFzIHNlbGVjdGVkLlxuICAgKiAqL1xuICBASW5wdXQoKSByYW5nZTogTmJDYWxlbmRhclJhbmdlPEQ+O1xuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmVzIHNob3VsZCB3ZSBzaG93IHdlZWsgbnVtYmVycyBjb2x1bW4uXG4gICAqIEZhbHNlIGJ5IGRlZmF1bHQuXG4gICAqICovXG4gIEBJbnB1dCgpXG4gIGdldCBzaG93V2Vla051bWJlcigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fc2hvd1dlZWtOdW1iZXI7XG4gIH1cbiAgc2V0IHNob3dXZWVrTnVtYmVyKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fc2hvd1dlZWtOdW1iZXIgPSBjb252ZXJ0VG9Cb29sUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIHByb3RlY3RlZCBfc2hvd1dlZWtOdW1iZXI6IGJvb2xlYW4gPSBmYWxzZTtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX3Nob3dXZWVrTnVtYmVyOiBOYkJvb2xlYW5JbnB1dDtcblxuICAvKipcbiAgICogU2V0cyBzeW1ib2wgdXNlZCBhcyBhIGhlYWRlciBmb3Igd2VlayBudW1iZXJzIGNvbHVtblxuICAgKiAqL1xuICBASW5wdXQoKSB3ZWVrTnVtYmVyU3ltYm9sOiBzdHJpbmcgPSAnIyc7XG5cbiAgLyoqXG4gICAqIFNldHMgZmlyc3QgZGF5IG9mIHRoZSB3ZWVrLCBpdCBjYW4gYmUgMSBpZiB3ZWVrIHN0YXJ0cyBmcm9tIG1vbmRheSBhbmQgMCBpZiBmcm9tIHN1bmRheSBhbmQgc28gb24uXG4gICAqIGB1bmRlZmluZWRgIG1lYW5zIHRoYXQgZGVmYXVsdCBsb2NhbGUgc2V0dGluZyB3aWxsIGJlIHVzZWQuXG4gICAqICovXG4gIEBJbnB1dCgpIGZpcnN0RGF5T2ZXZWVrOiBudW1iZXIgfCB1bmRlZmluZWQ7XG5cbiAgLyoqXG4gICAqIEVtaXRzIHJhbmdlIHdoZW4gc3RhcnQgc2VsZWN0ZWQgYW5kIGVtaXRzIGFnYWluIHdoZW4gZW5kIHNlbGVjdGVkLlxuICAgKiAqL1xuICBAT3V0cHV0KCkgcmFuZ2VDaGFuZ2U6IEV2ZW50RW1pdHRlcjxOYkNhbGVuZGFyUmFuZ2U8RD4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBkYXRlU2VydmljZTogTmJEYXRlU2VydmljZTxEPikge1xuICB9XG5cbiAgb25DaGFuZ2UoZGF0ZTogRCkge1xuICAgIHRoaXMuaW5pdERhdGVJZk51bGwoKTtcbiAgICB0aGlzLmhhbmRsZVNlbGVjdGVkKGRhdGUpO1xuICB9XG5cbiAgcHJpdmF0ZSBpbml0RGF0ZUlmTnVsbCgpIHtcbiAgICBpZiAoIXRoaXMucmFuZ2UpIHtcbiAgICAgIHRoaXMucmFuZ2UgPSB7IHN0YXJ0OiBudWxsLCBlbmQ6IG51bGwgfTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGhhbmRsZVNlbGVjdGVkKGRhdGU6IEQpIHtcbiAgICBpZiAodGhpcy5zZWxlY3Rpb25TdGFydGVkKCkpIHtcbiAgICAgIHRoaXMuc2VsZWN0RW5kKGRhdGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNlbGVjdFN0YXJ0KGRhdGUpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2VsZWN0aW9uU3RhcnRlZCgpOiBib29sZWFuIHtcbiAgICBjb25zdCB7IHN0YXJ0LCBlbmQgfSA9IHRoaXMucmFuZ2U7XG4gICAgcmV0dXJuIHN0YXJ0ICYmICFlbmQ7XG4gIH1cblxuICBwcml2YXRlIHNlbGVjdFN0YXJ0KHN0YXJ0OiBEKSB7XG4gICAgdGhpcy5zZWxlY3RSYW5nZSh7IHN0YXJ0IH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBzZWxlY3RFbmQoZGF0ZTogRCkge1xuICAgIGNvbnN0IHsgc3RhcnQgfSA9IHRoaXMucmFuZ2U7XG5cbiAgICBpZiAodGhpcy5kYXRlU2VydmljZS5jb21wYXJlRGF0ZXMoZGF0ZSwgc3RhcnQpID4gMCkge1xuICAgICAgdGhpcy5zZWxlY3RSYW5nZSh7IHN0YXJ0LCBlbmQ6IGRhdGUgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2VsZWN0UmFuZ2UoeyBzdGFydDogZGF0ZSwgZW5kOiBzdGFydCB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNlbGVjdFJhbmdlKHJhbmdlOiBOYkNhbGVuZGFyUmFuZ2U8RD4pIHtcbiAgICB0aGlzLnJhbmdlID0gcmFuZ2U7XG4gICAgdGhpcy5yYW5nZUNoYW5nZS5lbWl0KHJhbmdlKTtcbiAgfVxufVxuIl19