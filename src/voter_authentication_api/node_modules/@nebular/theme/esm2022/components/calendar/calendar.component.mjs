/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NbCalendarSize, NbCalendarViewMode, } from '../calendar-kit/model';
import { convertToBoolProperty } from '../helpers';
import * as i0 from "@angular/core";
import * as i1 from "./base-calendar.component";
/**
 * Calendar component provides a capability to choose a date.
 *
 * ```html
 * <nb-calendar [(date)]="date"></nb-calendar>
 * <nb-calendar [date]="date" (dateChange)="handleDateChange($event)"></nb-calendar>
 * ```
 *
 * Basic usage example
 * @stacked-example(Showcase, calendar/calendar-showcase.component)
 *
 * ### Installation
 *
 * Import `NbCalendarModule` to your feature module.
 * ```ts
 * @NgModule({
 *   imports: [
 *     // ...
 *     NbCalendarModule,
 *   ],
 * })
 * export class PageModule { }
 * ```
 * ### Usage
 *
 * If you want to select ranges you can use `NbCalendarRangeComponent`.
 *
 * ```html
 * <nb-calendar-range [(range)]="range"></nb-calendar-range>
 * <nb-calendar-range [range]="range" (rangeChange)="handleRangeChange($event)"></nb-calendar-range>
 * ```
 *
 * In order to use it, you have to import `NbCalendarRangeModule`.
 * @stacked-example(Range, calendar/calendar-range-showcase.component)
 *
 * The calendar component is supplied with a calendar navigation that contains navigate buttons.
 * If you do not want to use it you can hide calendar navigation using `showNavigation` property.
 * @stacked-example(Without navigation, calendar/calendar-without-navigation.component)
 *
 * As you can see in the basic usage example calendar contains previous and next month days
 * which can be disabled using `boundingMonth` property.
 * @stacked-example(Bounding months, calendar/calendar-bounding-month.component)
 *
 * You can define starting view of the calendar by setting `startView` property.
 * Available values: year, month and date.
 * @stacked-example(Start view, calendar/calendar-start-view.component)
 *
 * You can use a larger version of the calendar by defining size property.
 * Available values: medium(which is default) and large.
 * @stacked-example(Size, calendar/calendar-size.component)
 *
 * Calendar supports min and max dates which disables values out of min-max range.
 * @stacked-example(Borders, calendar/calendar-min-max.component)
 *
 * Also, you can define custom filter property that should be predicate which receives
 * date and returns false if this date has to be disabled. In this example, we provide the filter
 * which disables weekdays.
 * @stacked-example(Filter, calendar/calendar-filter.component)
 *
 * Week numbers column could be enabled via `showWeekNumber` binding:
 * @stacked-example(Week number, calendar/calendar-week-number.component)
 *
 * If you need create custom cells you can easily provide custom components for
 * calendar. For examples if you want to show any average price under each date you can
 * just provide custom `dayCellComponent`. Custom cells for month and year can be provided
 * the same way, check API reference.
 * @stacked-example(Custom day cell, calendar/calendar-custom-day-cell-showcase.component)
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
export class NbCalendarComponent {
    constructor() {
        /**
         * Defines if we should render previous and next months
         * in the current month view.
         * */
        this.boundingMonth = true;
        /**
         * Defines starting view for calendar.
         * */
        this.startView = NbCalendarViewMode.DATE;
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
         * Emits date when selected.
         * */
        this.dateChange = new EventEmitter();
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbCalendarComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.1.0", type: NbCalendarComponent, selector: "nb-calendar", inputs: { boundingMonth: "boundingMonth", startView: "startView", min: "min", max: "max", filter: "filter", dayCellComponent: "dayCellComponent", monthCellComponent: "monthCellComponent", yearCellComponent: "yearCellComponent", size: "size", visibleDate: "visibleDate", showNavigation: "showNavigation", date: "date", showWeekNumber: "showWeekNumber", weekNumberSymbol: "weekNumberSymbol", firstDayOfWeek: "firstDayOfWeek" }, outputs: { dateChange: "dateChange" }, ngImport: i0, template: `
    <nb-base-calendar
      [boundingMonth]="boundingMonth"
      [startView]="startView"
      [date]="date"
      [min]="min"
      [max]="max"
      [filter]="filter"
      [dayCellComponent]="dayCellComponent"
      [monthCellComponent]="monthCellComponent"
      [yearCellComponent]="yearCellComponent"
      [size]="size"
      [visibleDate]="visibleDate"
      [showNavigation]="showNavigation"
      [showWeekNumber]="showWeekNumber"
      [weekNumberSymbol]="weekNumberSymbol"
      [firstDayOfWeek]="firstDayOfWeek"
      (dateChange)="dateChange.emit($event)"
    ></nb-base-calendar>
  `, isInline: true, dependencies: [{ kind: "component", type: i1.NbBaseCalendarComponent, selector: "nb-base-calendar", inputs: ["boundingMonth", "startView", "min", "max", "filter", "dayCellComponent", "monthCellComponent", "yearCellComponent", "size", "visibleDate", "showNavigation", "date", "showWeekNumber", "weekNumberSymbol", "firstDayOfWeek"], outputs: ["dateChange"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbCalendarComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nb-calendar',
                    template: `
    <nb-base-calendar
      [boundingMonth]="boundingMonth"
      [startView]="startView"
      [date]="date"
      [min]="min"
      [max]="max"
      [filter]="filter"
      [dayCellComponent]="dayCellComponent"
      [monthCellComponent]="monthCellComponent"
      [yearCellComponent]="yearCellComponent"
      [size]="size"
      [visibleDate]="visibleDate"
      [showNavigation]="showNavigation"
      [showWeekNumber]="showWeekNumber"
      [weekNumberSymbol]="weekNumberSymbol"
      [firstDayOfWeek]="firstDayOfWeek"
      (dateChange)="dateChange.emit($event)"
    ></nb-base-calendar>
  `,
                }]
        }], propDecorators: { boundingMonth: [{
                type: Input
            }], startView: [{
                type: Input
            }], min: [{
                type: Input
            }], max: [{
                type: Input
            }], filter: [{
                type: Input
            }], dayCellComponent: [{
                type: Input
            }], monthCellComponent: [{
                type: Input
            }], yearCellComponent: [{
                type: Input
            }], size: [{
                type: Input
            }], visibleDate: [{
                type: Input
            }], showNavigation: [{
                type: Input
            }], date: [{
                type: Input
            }], showWeekNumber: [{
                type: Input
            }], weekNumberSymbol: [{
                type: Input
            }], firstDayOfWeek: [{
                type: Input
            }], dateChange: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2ZyYW1ld29yay90aGVtZS9jb21wb25lbnRzL2NhbGVuZGFyL2NhbGVuZGFyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBUSxNQUFNLGVBQWUsQ0FBQztBQUU3RSxPQUFPLEVBRUwsY0FBYyxFQUNkLGtCQUFrQixHQUduQixNQUFNLHVCQUF1QixDQUFDO0FBQy9CLE9BQU8sRUFBRSxxQkFBcUIsRUFBa0IsTUFBTSxZQUFZLENBQUM7OztBQUduRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0FnTEs7QUF3QkwsTUFBTSxPQUFPLG1CQUFtQjtJQXZCaEM7UUF5QkU7OzthQUdLO1FBQ0ksa0JBQWEsR0FBWSxJQUFJLENBQUM7UUFFdkM7O2FBRUs7UUFDSSxjQUFTLEdBQXVCLGtCQUFrQixDQUFDLElBQUksQ0FBQztRQWlDakU7OzthQUdLO1FBQ0ksU0FBSSxHQUFtQixjQUFjLENBQUMsTUFBTSxDQUFDO1FBS3REOzthQUVLO1FBQ0ksbUJBQWMsR0FBWSxJQUFJLENBQUM7UUFrQjlCLG9CQUFlLEdBQVksS0FBSyxDQUFDO1FBRzNDOzthQUVLO1FBQ0kscUJBQWdCLEdBQVcsR0FBRyxDQUFDO1FBUXhDOzthQUVLO1FBQ0ssZUFBVSxHQUFvQixJQUFJLFlBQVksRUFBRSxDQUFDO0tBQzVEO0lBN0JDOzs7U0FHSztJQUNMLElBQ0ksY0FBYztRQUNoQixPQUFPLElBQUksQ0FBQyxlQUFlLENBQUM7SUFDOUIsQ0FBQztJQUNELElBQUksY0FBYyxDQUFDLEtBQWM7UUFDL0IsSUFBSSxDQUFDLGVBQWUsR0FBRyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN0RCxDQUFDOzhHQXpFVSxtQkFBbUI7a0dBQW5CLG1CQUFtQixvZ0JBckJwQjs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1CVDs7MkZBRVUsbUJBQW1CO2tCQXZCL0IsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsYUFBYTtvQkFDdkIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJUO2lCQUNGOzhCQU9VLGFBQWE7c0JBQXJCLEtBQUs7Z0JBS0csU0FBUztzQkFBakIsS0FBSztnQkFNRyxHQUFHO3NCQUFYLEtBQUs7Z0JBS0csR0FBRztzQkFBWCxLQUFLO2dCQUtHLE1BQU07c0JBQWQsS0FBSztnQkFLRyxnQkFBZ0I7c0JBQXhCLEtBQUs7Z0JBS0csa0JBQWtCO3NCQUExQixLQUFLO2dCQUtHLGlCQUFpQjtzQkFBekIsS0FBSztnQkFNRyxJQUFJO3NCQUFaLEtBQUs7Z0JBR0csV0FBVztzQkFBbkIsS0FBSztnQkFLRyxjQUFjO3NCQUF0QixLQUFLO2dCQUtHLElBQUk7c0JBQVosS0FBSztnQkFPRixjQUFjO3NCQURqQixLQUFLO2dCQWFHLGdCQUFnQjtzQkFBeEIsS0FBSztnQkFNRyxjQUFjO3NCQUF0QixLQUFLO2dCQUtJLFVBQVU7c0JBQW5CLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgQWt2ZW8uIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICovXG5cbmltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0LCBUeXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7XG4gIE5iQ2FsZW5kYXJDZWxsLFxuICBOYkNhbGVuZGFyU2l6ZSxcbiAgTmJDYWxlbmRhclZpZXdNb2RlLFxuICBOYkNhbGVuZGFyU2l6ZVZhbHVlcyxcbiAgTmJDYWxlbmRhclZpZXdNb2RlVmFsdWVzLFxufSBmcm9tICcuLi9jYWxlbmRhci1raXQvbW9kZWwnO1xuaW1wb3J0IHsgY29udmVydFRvQm9vbFByb3BlcnR5LCBOYkJvb2xlYW5JbnB1dCB9IGZyb20gJy4uL2hlbHBlcnMnO1xuXG5cbi8qKlxuICogQ2FsZW5kYXIgY29tcG9uZW50IHByb3ZpZGVzIGEgY2FwYWJpbGl0eSB0byBjaG9vc2UgYSBkYXRlLlxuICpcbiAqIGBgYGh0bWxcbiAqIDxuYi1jYWxlbmRhciBbKGRhdGUpXT1cImRhdGVcIj48L25iLWNhbGVuZGFyPlxuICogPG5iLWNhbGVuZGFyIFtkYXRlXT1cImRhdGVcIiAoZGF0ZUNoYW5nZSk9XCJoYW5kbGVEYXRlQ2hhbmdlKCRldmVudClcIj48L25iLWNhbGVuZGFyPlxuICogYGBgXG4gKlxuICogQmFzaWMgdXNhZ2UgZXhhbXBsZVxuICogQHN0YWNrZWQtZXhhbXBsZShTaG93Y2FzZSwgY2FsZW5kYXIvY2FsZW5kYXItc2hvd2Nhc2UuY29tcG9uZW50KVxuICpcbiAqICMjIyBJbnN0YWxsYXRpb25cbiAqXG4gKiBJbXBvcnQgYE5iQ2FsZW5kYXJNb2R1bGVgIHRvIHlvdXIgZmVhdHVyZSBtb2R1bGUuXG4gKiBgYGB0c1xuICogQE5nTW9kdWxlKHtcbiAqICAgaW1wb3J0czogW1xuICogICAgIC8vIC4uLlxuICogICAgIE5iQ2FsZW5kYXJNb2R1bGUsXG4gKiAgIF0sXG4gKiB9KVxuICogZXhwb3J0IGNsYXNzIFBhZ2VNb2R1bGUgeyB9XG4gKiBgYGBcbiAqICMjIyBVc2FnZVxuICpcbiAqIElmIHlvdSB3YW50IHRvIHNlbGVjdCByYW5nZXMgeW91IGNhbiB1c2UgYE5iQ2FsZW5kYXJSYW5nZUNvbXBvbmVudGAuXG4gKlxuICogYGBgaHRtbFxuICogPG5iLWNhbGVuZGFyLXJhbmdlIFsocmFuZ2UpXT1cInJhbmdlXCI+PC9uYi1jYWxlbmRhci1yYW5nZT5cbiAqIDxuYi1jYWxlbmRhci1yYW5nZSBbcmFuZ2VdPVwicmFuZ2VcIiAocmFuZ2VDaGFuZ2UpPVwiaGFuZGxlUmFuZ2VDaGFuZ2UoJGV2ZW50KVwiPjwvbmItY2FsZW5kYXItcmFuZ2U+XG4gKiBgYGBcbiAqXG4gKiBJbiBvcmRlciB0byB1c2UgaXQsIHlvdSBoYXZlIHRvIGltcG9ydCBgTmJDYWxlbmRhclJhbmdlTW9kdWxlYC5cbiAqIEBzdGFja2VkLWV4YW1wbGUoUmFuZ2UsIGNhbGVuZGFyL2NhbGVuZGFyLXJhbmdlLXNob3djYXNlLmNvbXBvbmVudClcbiAqXG4gKiBUaGUgY2FsZW5kYXIgY29tcG9uZW50IGlzIHN1cHBsaWVkIHdpdGggYSBjYWxlbmRhciBuYXZpZ2F0aW9uIHRoYXQgY29udGFpbnMgbmF2aWdhdGUgYnV0dG9ucy5cbiAqIElmIHlvdSBkbyBub3Qgd2FudCB0byB1c2UgaXQgeW91IGNhbiBoaWRlIGNhbGVuZGFyIG5hdmlnYXRpb24gdXNpbmcgYHNob3dOYXZpZ2F0aW9uYCBwcm9wZXJ0eS5cbiAqIEBzdGFja2VkLWV4YW1wbGUoV2l0aG91dCBuYXZpZ2F0aW9uLCBjYWxlbmRhci9jYWxlbmRhci13aXRob3V0LW5hdmlnYXRpb24uY29tcG9uZW50KVxuICpcbiAqIEFzIHlvdSBjYW4gc2VlIGluIHRoZSBiYXNpYyB1c2FnZSBleGFtcGxlIGNhbGVuZGFyIGNvbnRhaW5zIHByZXZpb3VzIGFuZCBuZXh0IG1vbnRoIGRheXNcbiAqIHdoaWNoIGNhbiBiZSBkaXNhYmxlZCB1c2luZyBgYm91bmRpbmdNb250aGAgcHJvcGVydHkuXG4gKiBAc3RhY2tlZC1leGFtcGxlKEJvdW5kaW5nIG1vbnRocywgY2FsZW5kYXIvY2FsZW5kYXItYm91bmRpbmctbW9udGguY29tcG9uZW50KVxuICpcbiAqIFlvdSBjYW4gZGVmaW5lIHN0YXJ0aW5nIHZpZXcgb2YgdGhlIGNhbGVuZGFyIGJ5IHNldHRpbmcgYHN0YXJ0Vmlld2AgcHJvcGVydHkuXG4gKiBBdmFpbGFibGUgdmFsdWVzOiB5ZWFyLCBtb250aCBhbmQgZGF0ZS5cbiAqIEBzdGFja2VkLWV4YW1wbGUoU3RhcnQgdmlldywgY2FsZW5kYXIvY2FsZW5kYXItc3RhcnQtdmlldy5jb21wb25lbnQpXG4gKlxuICogWW91IGNhbiB1c2UgYSBsYXJnZXIgdmVyc2lvbiBvZiB0aGUgY2FsZW5kYXIgYnkgZGVmaW5pbmcgc2l6ZSBwcm9wZXJ0eS5cbiAqIEF2YWlsYWJsZSB2YWx1ZXM6IG1lZGl1bSh3aGljaCBpcyBkZWZhdWx0KSBhbmQgbGFyZ2UuXG4gKiBAc3RhY2tlZC1leGFtcGxlKFNpemUsIGNhbGVuZGFyL2NhbGVuZGFyLXNpemUuY29tcG9uZW50KVxuICpcbiAqIENhbGVuZGFyIHN1cHBvcnRzIG1pbiBhbmQgbWF4IGRhdGVzIHdoaWNoIGRpc2FibGVzIHZhbHVlcyBvdXQgb2YgbWluLW1heCByYW5nZS5cbiAqIEBzdGFja2VkLWV4YW1wbGUoQm9yZGVycywgY2FsZW5kYXIvY2FsZW5kYXItbWluLW1heC5jb21wb25lbnQpXG4gKlxuICogQWxzbywgeW91IGNhbiBkZWZpbmUgY3VzdG9tIGZpbHRlciBwcm9wZXJ0eSB0aGF0IHNob3VsZCBiZSBwcmVkaWNhdGUgd2hpY2ggcmVjZWl2ZXNcbiAqIGRhdGUgYW5kIHJldHVybnMgZmFsc2UgaWYgdGhpcyBkYXRlIGhhcyB0byBiZSBkaXNhYmxlZC4gSW4gdGhpcyBleGFtcGxlLCB3ZSBwcm92aWRlIHRoZSBmaWx0ZXJcbiAqIHdoaWNoIGRpc2FibGVzIHdlZWtkYXlzLlxuICogQHN0YWNrZWQtZXhhbXBsZShGaWx0ZXIsIGNhbGVuZGFyL2NhbGVuZGFyLWZpbHRlci5jb21wb25lbnQpXG4gKlxuICogV2VlayBudW1iZXJzIGNvbHVtbiBjb3VsZCBiZSBlbmFibGVkIHZpYSBgc2hvd1dlZWtOdW1iZXJgIGJpbmRpbmc6XG4gKiBAc3RhY2tlZC1leGFtcGxlKFdlZWsgbnVtYmVyLCBjYWxlbmRhci9jYWxlbmRhci13ZWVrLW51bWJlci5jb21wb25lbnQpXG4gKlxuICogSWYgeW91IG5lZWQgY3JlYXRlIGN1c3RvbSBjZWxscyB5b3UgY2FuIGVhc2lseSBwcm92aWRlIGN1c3RvbSBjb21wb25lbnRzIGZvclxuICogY2FsZW5kYXIuIEZvciBleGFtcGxlcyBpZiB5b3Ugd2FudCB0byBzaG93IGFueSBhdmVyYWdlIHByaWNlIHVuZGVyIGVhY2ggZGF0ZSB5b3UgY2FuXG4gKiBqdXN0IHByb3ZpZGUgY3VzdG9tIGBkYXlDZWxsQ29tcG9uZW50YC4gQ3VzdG9tIGNlbGxzIGZvciBtb250aCBhbmQgeWVhciBjYW4gYmUgcHJvdmlkZWRcbiAqIHRoZSBzYW1lIHdheSwgY2hlY2sgQVBJIHJlZmVyZW5jZS5cbiAqIEBzdGFja2VkLWV4YW1wbGUoQ3VzdG9tIGRheSBjZWxsLCBjYWxlbmRhci9jYWxlbmRhci1jdXN0b20tZGF5LWNlbGwtc2hvd2Nhc2UuY29tcG9uZW50KVxuICpcbiAqIEBzdHlsZXNcbiAqXG4gKiBjYWxlbmRhci13aWR0aDpcbiAqIGNhbGVuZGFyLWJhY2tncm91bmQtY29sb3I6XG4gKiBjYWxlbmRhci1ib3JkZXItY29sb3I6XG4gKiBjYWxlbmRhci1ib3JkZXItc3R5bGU6XG4gKiBjYWxlbmRhci1ib3JkZXItd2lkdGg6XG4gKiBjYWxlbmRhci1ib3JkZXItcmFkaXVzOlxuICogY2FsZW5kYXItdGV4dC1jb2xvcjpcbiAqIGNhbGVuZGFyLXRleHQtZm9udC1mYW1pbHk6XG4gKiBjYWxlbmRhci10ZXh0LWZvbnQtc2l6ZTpcbiAqIGNhbGVuZGFyLXRleHQtZm9udC13ZWlnaHQ6XG4gKiBjYWxlbmRhci10ZXh0LWxpbmUtaGVpZ2h0OlxuICogY2FsZW5kYXItcGlja2VyLXBhZGRpbmctdG9wOlxuICogY2FsZW5kYXItcGlja2VyLXBhZGRpbmctYm90dG9tOlxuICogY2FsZW5kYXItcGlja2VyLXBhZGRpbmctc3RhcnQ6XG4gKiBjYWxlbmRhci1waWNrZXItcGFkZGluZy1lbmQ6XG4gKiBjYWxlbmRhci1uYXZpZ2F0aW9uLXRleHQtY29sb3I6XG4gKiBjYWxlbmRhci1uYXZpZ2F0aW9uLXRleHQtZm9udC1mYW1pbHk6XG4gKiBjYWxlbmRhci1uYXZpZ2F0aW9uLXRpdGxlLXRleHQtZm9udC1zaXplOlxuICogY2FsZW5kYXItbmF2aWdhdGlvbi10aXRsZS10ZXh0LWZvbnQtd2VpZ2h0OlxuICogY2FsZW5kYXItbmF2aWdhdGlvbi10aXRsZS10ZXh0LWxpbmUtaGVpZ2h0OlxuICogY2FsZW5kYXItbmF2aWdhdGlvbi1wYWRkaW5nOlxuICogY2FsZW5kYXItY2VsbC1pbmFjdGl2ZS10ZXh0LWNvbG9yOlxuICogY2FsZW5kYXItY2VsbC1kaXNhYmxlZC10ZXh0LWNvbG9yOlxuICogY2FsZW5kYXItY2VsbC1ob3Zlci1iYWNrZ3JvdW5kLWNvbG9yOlxuICogY2FsZW5kYXItY2VsbC1ob3Zlci1ib3JkZXItY29sb3I6XG4gKiBjYWxlbmRhci1jZWxsLWhvdmVyLXRleHQtY29sb3I6XG4gKiBjYWxlbmRhci1jZWxsLWhvdmVyLXRleHQtZm9udC1zaXplOlxuICogY2FsZW5kYXItY2VsbC1ob3Zlci10ZXh0LWZvbnQtd2VpZ2h0OlxuICogY2FsZW5kYXItY2VsbC1ob3Zlci10ZXh0LWxpbmUtaGVpZ2h0OlxuICogY2FsZW5kYXItY2VsbC1hY3RpdmUtYmFja2dyb3VuZC1jb2xvcjpcbiAqIGNhbGVuZGFyLWNlbGwtYWN0aXZlLWJvcmRlci1jb2xvcjpcbiAqIGNhbGVuZGFyLWNlbGwtYWN0aXZlLXRleHQtY29sb3I6XG4gKiBjYWxlbmRhci1jZWxsLWFjdGl2ZS10ZXh0LWZvbnQtc2l6ZTpcbiAqIGNhbGVuZGFyLWNlbGwtYWN0aXZlLXRleHQtZm9udC13ZWlnaHQ6XG4gKiBjYWxlbmRhci1jZWxsLWFjdGl2ZS10ZXh0LWxpbmUtaGVpZ2h0OlxuICogY2FsZW5kYXItY2VsbC10b2RheS1iYWNrZ3JvdW5kLWNvbG9yOlxuICogY2FsZW5kYXItY2VsbC10b2RheS1ib3JkZXItY29sb3I6XG4gKiBjYWxlbmRhci1jZWxsLXRvZGF5LXRleHQtY29sb3I6XG4gKiBjYWxlbmRhci1jZWxsLXRvZGF5LXRleHQtZm9udC1zaXplOlxuICogY2FsZW5kYXItY2VsbC10b2RheS10ZXh0LWZvbnQtd2VpZ2h0OlxuICogY2FsZW5kYXItY2VsbC10b2RheS10ZXh0LWxpbmUtaGVpZ2h0OlxuICogY2FsZW5kYXItY2VsbC10b2RheS1ob3Zlci1iYWNrZ3JvdW5kLWNvbG9yOlxuICogY2FsZW5kYXItY2VsbC10b2RheS1ob3Zlci1ib3JkZXItY29sb3I6XG4gKiBjYWxlbmRhci1jZWxsLXRvZGF5LWFjdGl2ZS1iYWNrZ3JvdW5kLWNvbG9yOlxuICogY2FsZW5kYXItY2VsbC10b2RheS1hY3RpdmUtYm9yZGVyLWNvbG9yOlxuICogY2FsZW5kYXItY2VsbC10b2RheS1kaXNhYmxlZC1ib3JkZXItY29sb3I6XG4gKiBjYWxlbmRhci1jZWxsLXRvZGF5LXNlbGVjdGVkLWJhY2tncm91bmQtY29sb3I6XG4gKiBjYWxlbmRhci1jZWxsLXRvZGF5LXNlbGVjdGVkLWJvcmRlci1jb2xvcjpcbiAqIGNhbGVuZGFyLWNlbGwtdG9kYXktc2VsZWN0ZWQtdGV4dC1jb2xvcjpcbiAqIGNhbGVuZGFyLWNlbGwtdG9kYXktc2VsZWN0ZWQtaG92ZXItYmFja2dyb3VuZC1jb2xvcjpcbiAqIGNhbGVuZGFyLWNlbGwtdG9kYXktc2VsZWN0ZWQtaG92ZXItYm9yZGVyLWNvbG9yOlxuICogY2FsZW5kYXItY2VsbC10b2RheS1zZWxlY3RlZC1hY3RpdmUtYmFja2dyb3VuZC1jb2xvcjpcbiAqIGNhbGVuZGFyLWNlbGwtdG9kYXktc2VsZWN0ZWQtYWN0aXZlLWJvcmRlci1jb2xvcjpcbiAqIGNhbGVuZGFyLWNlbGwtdG9kYXktaW4tcmFuZ2UtYmFja2dyb3VuZC1jb2xvcjpcbiAqIGNhbGVuZGFyLWNlbGwtdG9kYXktaW4tcmFuZ2UtYm9yZGVyLWNvbG9yOlxuICogY2FsZW5kYXItY2VsbC10b2RheS1pbi1yYW5nZS10ZXh0LWNvbG9yOlxuICogY2FsZW5kYXItY2VsbC10b2RheS1pbi1yYW5nZS1ob3Zlci1iYWNrZ3JvdW5kLWNvbG9yOlxuICogY2FsZW5kYXItY2VsbC10b2RheS1pbi1yYW5nZS1ob3Zlci1ib3JkZXItY29sb3I6XG4gKiBjYWxlbmRhci1jZWxsLXRvZGF5LWluLXJhbmdlLWFjdGl2ZS1iYWNrZ3JvdW5kLWNvbG9yOlxuICogY2FsZW5kYXItY2VsbC10b2RheS1pbi1yYW5nZS1hY3RpdmUtYm9yZGVyLWNvbG9yOlxuICogY2FsZW5kYXItY2VsbC1zZWxlY3RlZC1iYWNrZ3JvdW5kLWNvbG9yOlxuICogY2FsZW5kYXItY2VsbC1zZWxlY3RlZC1ib3JkZXItY29sb3I6XG4gKiBjYWxlbmRhci1jZWxsLXNlbGVjdGVkLXRleHQtY29sb3I6XG4gKiBjYWxlbmRhci1jZWxsLXNlbGVjdGVkLXRleHQtZm9udC1zaXplOlxuICogY2FsZW5kYXItY2VsbC1zZWxlY3RlZC10ZXh0LWZvbnQtd2VpZ2h0OlxuICogY2FsZW5kYXItY2VsbC1zZWxlY3RlZC10ZXh0LWxpbmUtaGVpZ2h0OlxuICogY2FsZW5kYXItY2VsbC1zZWxlY3RlZC1ob3Zlci1iYWNrZ3JvdW5kLWNvbG9yOlxuICogY2FsZW5kYXItY2VsbC1zZWxlY3RlZC1ob3Zlci1ib3JkZXItY29sb3I6XG4gKiBjYWxlbmRhci1jZWxsLXNlbGVjdGVkLWFjdGl2ZS1iYWNrZ3JvdW5kLWNvbG9yOlxuICogY2FsZW5kYXItY2VsbC1zZWxlY3RlZC1hY3RpdmUtYm9yZGVyLWNvbG9yOlxuICogY2FsZW5kYXItZGF5LWNlbGwtd2lkdGg6XG4gKiBjYWxlbmRhci1kYXktY2VsbC1oZWlnaHQ6XG4gKiBjYWxlbmRhci1tb250aC1jZWxsLXdpZHRoOlxuICogY2FsZW5kYXItbW9udGgtY2VsbC1oZWlnaHQ6XG4gKiBjYWxlbmRhci15ZWFyLWNlbGwtd2lkdGg6XG4gKiBjYWxlbmRhci15ZWFyLWNlbGwtaGVpZ2h0OlxuICogY2FsZW5kYXItd2Vla2RheS1iYWNrZ3JvdW5kOlxuICogY2FsZW5kYXItd2Vla2RheS1kaXZpZGVyLWNvbG9yOlxuICogY2FsZW5kYXItd2Vla2RheS1kaXZpZGVyLXdpZHRoOlxuICogY2FsZW5kYXItd2Vla2RheS10ZXh0LWNvbG9yOlxuICogY2FsZW5kYXItd2Vla2RheS10ZXh0LWZvbnQtc2l6ZTpcbiAqIGNhbGVuZGFyLXdlZWtkYXktdGV4dC1mb250LXdlaWdodDpcbiAqIGNhbGVuZGFyLXdlZWtkYXktdGV4dC1saW5lLWhlaWdodDpcbiAqIGNhbGVuZGFyLXdlZWtkYXktaG9saWRheS10ZXh0LWNvbG9yOlxuICogY2FsZW5kYXItd2Vla2RheS1oZWlnaHQ6XG4gKiBjYWxlbmRhci13ZWVrZGF5LXdpZHRoOlxuICogY2FsZW5kYXItd2Vla251bWJlci1iYWNrZ3JvdW5kOlxuICogY2FsZW5kYXItd2Vla251bWJlci1kaXZpZGVyLWNvbG9yOlxuICogY2FsZW5kYXItd2Vla251bWJlci1kaXZpZGVyLXdpZHRoOlxuICogY2FsZW5kYXItd2Vla251bWJlci10ZXh0LWNvbG9yOlxuICogY2FsZW5kYXItd2Vla251bWJlci10ZXh0LWZvbnQtc2l6ZTpcbiAqIGNhbGVuZGFyLXdlZWtudW1iZXItdGV4dC1mb250LXdlaWdodDpcbiAqIGNhbGVuZGFyLXdlZWtudW1iZXItdGV4dC1saW5lLWhlaWdodDpcbiAqIGNhbGVuZGFyLXdlZWtudW1iZXItaGVpZ2h0OlxuICogY2FsZW5kYXItd2Vla251bWJlci13aWR0aDpcbiAqIGNhbGVuZGFyLWxhcmdlLXdpZHRoOlxuICogY2FsZW5kYXItZGF5LWNlbGwtbGFyZ2Utd2lkdGg6XG4gKiBjYWxlbmRhci1kYXktY2VsbC1sYXJnZS1oZWlnaHQ6XG4gKiBjYWxlbmRhci13ZWVrZGF5LWxhcmdlLWhlaWdodDpcbiAqIGNhbGVuZGFyLXdlZWtkYXktbGFyZ2Utd2lkdGg6XG4gKiBjYWxlbmRhci13ZWVrbnVtYmVyLWxhcmdlLWhlaWdodDpcbiAqIGNhbGVuZGFyLXdlZWtudW1iZXItbGFyZ2Utd2lkdGg6XG4gKiBjYWxlbmRhci1tb250aC1jZWxsLWxhcmdlLXdpZHRoOlxuICogY2FsZW5kYXItbW9udGgtY2VsbC1sYXJnZS1oZWlnaHQ6XG4gKiBjYWxlbmRhci15ZWFyLWNlbGwtbGFyZ2Utd2lkdGg6XG4gKiBjYWxlbmRhci15ZWFyLWNlbGwtbGFyZ2UtaGVpZ2h0OlxuICogKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25iLWNhbGVuZGFyJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmItYmFzZS1jYWxlbmRhclxuICAgICAgW2JvdW5kaW5nTW9udGhdPVwiYm91bmRpbmdNb250aFwiXG4gICAgICBbc3RhcnRWaWV3XT1cInN0YXJ0Vmlld1wiXG4gICAgICBbZGF0ZV09XCJkYXRlXCJcbiAgICAgIFttaW5dPVwibWluXCJcbiAgICAgIFttYXhdPVwibWF4XCJcbiAgICAgIFtmaWx0ZXJdPVwiZmlsdGVyXCJcbiAgICAgIFtkYXlDZWxsQ29tcG9uZW50XT1cImRheUNlbGxDb21wb25lbnRcIlxuICAgICAgW21vbnRoQ2VsbENvbXBvbmVudF09XCJtb250aENlbGxDb21wb25lbnRcIlxuICAgICAgW3llYXJDZWxsQ29tcG9uZW50XT1cInllYXJDZWxsQ29tcG9uZW50XCJcbiAgICAgIFtzaXplXT1cInNpemVcIlxuICAgICAgW3Zpc2libGVEYXRlXT1cInZpc2libGVEYXRlXCJcbiAgICAgIFtzaG93TmF2aWdhdGlvbl09XCJzaG93TmF2aWdhdGlvblwiXG4gICAgICBbc2hvd1dlZWtOdW1iZXJdPVwic2hvd1dlZWtOdW1iZXJcIlxuICAgICAgW3dlZWtOdW1iZXJTeW1ib2xdPVwid2Vla051bWJlclN5bWJvbFwiXG4gICAgICBbZmlyc3REYXlPZldlZWtdPVwiZmlyc3REYXlPZldlZWtcIlxuICAgICAgKGRhdGVDaGFuZ2UpPVwiZGF0ZUNoYW5nZS5lbWl0KCRldmVudClcIlxuICAgID48L25iLWJhc2UtY2FsZW5kYXI+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIE5iQ2FsZW5kYXJDb21wb25lbnQ8RD4ge1xuXG4gIC8qKlxuICAgKiBEZWZpbmVzIGlmIHdlIHNob3VsZCByZW5kZXIgcHJldmlvdXMgYW5kIG5leHQgbW9udGhzXG4gICAqIGluIHRoZSBjdXJyZW50IG1vbnRoIHZpZXcuXG4gICAqICovXG4gIEBJbnB1dCgpIGJvdW5kaW5nTW9udGg6IGJvb2xlYW4gPSB0cnVlO1xuXG4gIC8qKlxuICAgKiBEZWZpbmVzIHN0YXJ0aW5nIHZpZXcgZm9yIGNhbGVuZGFyLlxuICAgKiAqL1xuICBASW5wdXQoKSBzdGFydFZpZXc6IE5iQ2FsZW5kYXJWaWV3TW9kZSA9IE5iQ2FsZW5kYXJWaWV3TW9kZS5EQVRFO1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfc3RhcnRWaWV3OiBOYkNhbGVuZGFyVmlld01vZGVWYWx1ZXM7XG5cbiAgLyoqXG4gICAqIE1pbmltdW0gYXZhaWxhYmxlIGRhdGUgZm9yIHNlbGVjdGlvbi5cbiAgICogKi9cbiAgQElucHV0KCkgbWluOiBEO1xuXG4gIC8qKlxuICAgKiBNYXhpbXVtIGF2YWlsYWJsZSBkYXRlIGZvciBzZWxlY3Rpb24uXG4gICAqICovXG4gIEBJbnB1dCgpIG1heDogRDtcblxuICAvKipcbiAgICogUHJlZGljYXRlIHRoYXQgZGVjaWRlcyB3aGljaCBjZWxscyB3aWxsIGJlIGRpc2FibGVkLlxuICAgKiAqL1xuICBASW5wdXQoKSBmaWx0ZXI6IChEKSA9PiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBDdXN0b20gZGF5IGNlbGwgY29tcG9uZW50LiBIYXZlIHRvIGltcGxlbWVudCBgTmJDYWxlbmRhckNlbGxgIGludGVyZmFjZS5cbiAgICogKi9cbiAgQElucHV0KCkgZGF5Q2VsbENvbXBvbmVudDogVHlwZTxOYkNhbGVuZGFyQ2VsbDxELCBEPj47XG5cbiAgLyoqXG4gICAqIEN1c3RvbSBtb250aCBjZWxsIGNvbXBvbmVudC4gSGF2ZSB0byBpbXBsZW1lbnQgYE5iQ2FsZW5kYXJDZWxsYCBpbnRlcmZhY2UuXG4gICAqICovXG4gIEBJbnB1dCgpIG1vbnRoQ2VsbENvbXBvbmVudDogVHlwZTxOYkNhbGVuZGFyQ2VsbDxELCBEPj47XG5cbiAgLyoqXG4gICAqIEN1c3RvbSB5ZWFyIGNlbGwgY29tcG9uZW50LiBIYXZlIHRvIGltcGxlbWVudCBgTmJDYWxlbmRhckNlbGxgIGludGVyZmFjZS5cbiAgICogKi9cbiAgQElucHV0KCkgeWVhckNlbGxDb21wb25lbnQ6IFR5cGU8TmJDYWxlbmRhckNlbGw8RCwgRD4+O1xuXG4gIC8qKlxuICAgKiBTaXplIG9mIHRoZSBjYWxlbmRhciBhbmQgZW50aXJlIGNvbXBvbmVudHMuXG4gICAqIENhbiBiZSAnbWVkaXVtJyB3aGljaCBpcyBkZWZhdWx0IG9yICdsYXJnZScuXG4gICAqICovXG4gIEBJbnB1dCgpIHNpemU6IE5iQ2FsZW5kYXJTaXplID0gTmJDYWxlbmRhclNpemUuTUVESVVNO1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfc2l6ZTogTmJDYWxlbmRhclNpemVWYWx1ZXM7XG5cbiAgQElucHV0KCkgdmlzaWJsZURhdGU6IEQ7XG5cbiAgLyoqXG4gICAqIERldGVybWluZXMgc2hvdWxkIHdlIHNob3cgY2FsZW5kYXJzIG5hdmlnYXRpb24gb3Igbm90LlxuICAgKiAqL1xuICBASW5wdXQoKSBzaG93TmF2aWdhdGlvbjogYm9vbGVhbiA9IHRydWU7XG5cbiAgLyoqXG4gICAqIERhdGUgd2hpY2ggd2lsbCBiZSByZW5kZXJlZCBhcyBzZWxlY3RlZC5cbiAgICogKi9cbiAgQElucHV0KCkgZGF0ZTogRDtcblxuICAvKipcbiAgICogRGV0ZXJtaW5lcyBzaG91bGQgd2Ugc2hvdyB3ZWVrIG51bWJlcnMgY29sdW1uLlxuICAgKiBGYWxzZSBieSBkZWZhdWx0LlxuICAgKiAqL1xuICBASW5wdXQoKVxuICBnZXQgc2hvd1dlZWtOdW1iZXIoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3Nob3dXZWVrTnVtYmVyO1xuICB9XG4gIHNldCBzaG93V2Vla051bWJlcih2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX3Nob3dXZWVrTnVtYmVyID0gY29udmVydFRvQm9vbFByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcm90ZWN0ZWQgX3Nob3dXZWVrTnVtYmVyOiBib29sZWFuID0gZmFsc2U7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9zaG93V2Vla051bWJlcjogTmJCb29sZWFuSW5wdXQ7XG5cbiAgLyoqXG4gICAqIFNldHMgc3ltYm9sIHVzZWQgYXMgYSBoZWFkZXIgZm9yIHdlZWsgbnVtYmVycyBjb2x1bW5cbiAgICogKi9cbiAgQElucHV0KCkgd2Vla051bWJlclN5bWJvbDogc3RyaW5nID0gJyMnO1xuXG4gIC8qKlxuICAgKiBTZXRzIGZpcnN0IGRheSBvZiB0aGUgd2VlaywgaXQgY2FuIGJlIDEgaWYgd2VlayBzdGFydHMgZnJvbSBtb25kYXkgYW5kIDAgaWYgZnJvbSBzdW5kYXkgYW5kIHNvIG9uLlxuICAgKiBgdW5kZWZpbmVkYCBtZWFucyB0aGF0IGRlZmF1bHQgbG9jYWxlIHNldHRpbmcgd2lsbCBiZSB1c2VkLlxuICAgKiAqL1xuICBASW5wdXQoKSBmaXJzdERheU9mV2VlazogbnVtYmVyIHwgdW5kZWZpbmVkO1xuXG4gIC8qKlxuICAgKiBFbWl0cyBkYXRlIHdoZW4gc2VsZWN0ZWQuXG4gICAqICovXG4gIEBPdXRwdXQoKSBkYXRlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8RD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG59XG4iXX0=