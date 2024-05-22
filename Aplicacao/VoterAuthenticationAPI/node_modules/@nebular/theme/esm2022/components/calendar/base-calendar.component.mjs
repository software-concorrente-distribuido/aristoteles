/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { NbCalendarSize, NbCalendarViewMode, } from '../calendar-kit/model';
import { convertToBoolProperty } from '../helpers';
import * as i0 from "@angular/core";
import * as i1 from "../calendar-kit/services/date.service";
import * as i2 from "../calendar-kit/services/calendar-year-model.service";
import * as i3 from "../calendar-kit/components/calendar-navigation/calendar-view-mode.component";
import * as i4 from "../calendar-kit/components/calendar-navigation/calendar-pageable-navigation.component";
import * as i5 from "../calendar-kit/components/calendar-year-picker/calendar-year-picker.component";
import * as i6 from "../calendar-kit/components/calendar-month-picker/calendar-month-picker.component";
import * as i7 from "../calendar-kit/components/calendar-day-picker/calendar-day-picker.component";
import * as i8 from "@angular/common";
import * as i9 from "../card/card.component";
/**
 * The basis for calendar and range calendar components.
 * Encapsulates common behavior - store calendar state and perform navigation
 * between pickers.
 * */
export class NbBaseCalendarComponent {
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
    constructor(dateService, yearModelService) {
        this.dateService = dateService;
        this.yearModelService = yearModelService;
        /**
         * Defines if we should render previous and next months
         * in the current month view.
         * */
        this.boundingMonth = true;
        /**
         * Defines active view for calendar.
         * */
        this.activeViewMode = NbCalendarViewMode.DATE;
        /**
         * Size of the calendar and entire components.
         * Can be 'medium' which is default or 'large'.
         * */
        this.size = NbCalendarSize.MEDIUM;
        /**
         * Determines whether we should show calendar navigation or not.
         * */
        this.showNavigation = true;
        this._showWeekNumber = false;
        /**
         * Emits date when selected.
         * */
        this.dateChange = new EventEmitter();
        this.ViewMode = NbCalendarViewMode;
    }
    ngOnInit() {
        if (!this.visibleDate) {
            this.visibleDate = this.dateService.today();
        }
    }
    get large() {
        return this.size === NbCalendarSize.LARGE;
    }
    setViewMode(viewMode) {
        this.activeViewMode = viewMode;
    }
    setVisibleDate(visibleDate) {
        this.visibleDate = visibleDate;
    }
    prevMonth() {
        this.changeVisibleMonth(-1);
    }
    nextMonth() {
        this.changeVisibleMonth(1);
    }
    prevYear() {
        this.changeVisibleYear(-1);
    }
    nextYear() {
        this.changeVisibleYear(1);
    }
    prevYears() {
        this.changeVisibleYears(-1);
    }
    nextYears() {
        this.changeVisibleYears(1);
    }
    navigatePrev() {
        switch (this.activeViewMode) {
            case NbCalendarViewMode.DATE:
                return this.prevMonth();
            case NbCalendarViewMode.MONTH:
                return this.prevYear();
            case NbCalendarViewMode.YEAR:
                return this.prevYears();
        }
    }
    navigateNext() {
        switch (this.activeViewMode) {
            case NbCalendarViewMode.DATE:
                return this.nextMonth();
            case NbCalendarViewMode.MONTH:
                return this.nextYear();
            case NbCalendarViewMode.YEAR:
                return this.nextYears();
        }
    }
    onChangeViewMode() {
        if (this.activeViewMode === NbCalendarViewMode.DATE) {
            return this.setViewMode(NbCalendarViewMode.YEAR);
        }
        this.setViewMode(NbCalendarViewMode.DATE);
    }
    changeVisibleMonth(direction) {
        this.visibleDate = this.dateService.addMonth(this.visibleDate, direction);
    }
    changeVisibleYear(direction) {
        this.visibleDate = this.dateService.addYear(this.visibleDate, direction);
    }
    changeVisibleYears(direction) {
        this.visibleDate = this.dateService.addYear(this.visibleDate, direction * this.yearModelService.getYearsInView());
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbBaseCalendarComponent, deps: [{ token: i1.NbDateService }, { token: i2.NbCalendarYearModelService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.1.0", type: NbBaseCalendarComponent, selector: "nb-base-calendar", inputs: { boundingMonth: "boundingMonth", activeViewMode: ["startView", "activeViewMode"], min: "min", max: "max", filter: "filter", dayCellComponent: "dayCellComponent", monthCellComponent: "monthCellComponent", yearCellComponent: "yearCellComponent", size: "size", visibleDate: "visibleDate", showNavigation: "showNavigation", date: "date", showWeekNumber: "showWeekNumber", weekNumberSymbol: "weekNumberSymbol", firstDayOfWeek: "firstDayOfWeek" }, outputs: { dateChange: "dateChange" }, host: { properties: { "class.has-navigation": "this.showNavigation", "class.has-week-number": "this.showWeekNumber", "class.size-large": "this.large" } }, ngImport: i0, template: "<nb-card>\n  <nb-card-header *ngIf=\"showNavigation\" class=\"calendar-navigation\">\n    <nb-calendar-view-mode [date]=\"visibleDate\"\n                           [viewMode]=\"activeViewMode\"\n                           (changeMode)=\"onChangeViewMode()\">\n    </nb-calendar-view-mode>\n\n    <nb-calendar-pageable-navigation (prev)=\"navigatePrev()\" (next)=\"navigateNext()\">\n    </nb-calendar-pageable-navigation>\n  </nb-card-header>\n\n  <nb-card-body [ngSwitch]=\"activeViewMode\">\n\n    <nb-calendar-day-picker *ngSwitchCase=\"ViewMode.DATE\"\n                            [boundingMonths]=\"boundingMonth\"\n                            [cellComponent]=\"dayCellComponent\"\n                            [min]=\"min\"\n                            [max]=\"max\"\n                            [filter]=\"filter\"\n                            [visibleDate]=\"visibleDate\"\n                            [size]=\"size\"\n                            [date]=\"date\"\n                            [showWeekNumber]=\"showWeekNumber\"\n                            [firstDayOfWeek]=\"firstDayOfWeek\"\n                            (dateChange)=\"dateChange.emit($any($event))\"\n                            [weekNumberSymbol]=\"weekNumberSymbol\">\n    </nb-calendar-day-picker>\n\n    <nb-calendar-year-picker *ngSwitchCase=\"ViewMode.YEAR\"\n                             [cellComponent]=\"yearCellComponent\"\n                             [date]=\"$any(date)\"\n                             [min]=\"min\"\n                             [max]=\"max\"\n                             [filter]=\"filter\"\n                             [size]=\"size\"\n                             [year]=\"visibleDate\"\n                             (yearChange)=\"setVisibleDate($event); setViewMode(ViewMode.MONTH)\">\n    </nb-calendar-year-picker>\n\n    <nb-calendar-month-picker *ngSwitchCase=\"ViewMode.MONTH\"\n                              [cellComponent]=\"monthCellComponent\"\n                              [min]=\"min\"\n                              [max]=\"max\"\n                              [filter]=\"filter\"\n                              [size]=\"size\"\n                              [month]=\"visibleDate\"\n                              [date]=\"$any(date)\"\n                              (monthChange)=\"setVisibleDate($event); setViewMode(ViewMode.DATE)\">\n    </nb-calendar-month-picker>\n\n  </nb-card-body>\n\n</nb-card>\n", dependencies: [{ kind: "component", type: i3.NbCalendarViewModeComponent, selector: "nb-calendar-view-mode", inputs: ["date", "viewMode"], outputs: ["changeMode"] }, { kind: "component", type: i4.NbCalendarPageableNavigationComponent, selector: "nb-calendar-pageable-navigation", outputs: ["next", "prev"] }, { kind: "component", type: i5.NbCalendarYearPickerComponent, selector: "nb-calendar-year-picker", inputs: ["date", "min", "max", "filter", "cellComponent", "size", "year"], outputs: ["yearChange"] }, { kind: "component", type: i6.NbCalendarMonthPickerComponent, selector: "nb-calendar-month-picker", inputs: ["min", "max", "filter", "size", "month", "date", "cellComponent"], outputs: ["monthChange"] }, { kind: "component", type: i7.NbCalendarDayPickerComponent, selector: "nb-calendar-day-picker", inputs: ["visibleDate", "boundingMonths", "min", "max", "filter", "cellComponent", "size", "date", "showWeekNumber", "weekNumberSymbol", "firstDayOfWeek"], outputs: ["dateChange"] }, { kind: "directive", type: i8.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i8.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: i8.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { kind: "component", type: i9.NbCardComponent, selector: "nb-card", inputs: ["size", "status", "accent"] }, { kind: "component", type: i9.NbCardBodyComponent, selector: "nb-card-body" }, { kind: "component", type: i9.NbCardHeaderComponent, selector: "nb-card-header" }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbBaseCalendarComponent, decorators: [{
            type: Component,
            args: [{ selector: 'nb-base-calendar', template: "<nb-card>\n  <nb-card-header *ngIf=\"showNavigation\" class=\"calendar-navigation\">\n    <nb-calendar-view-mode [date]=\"visibleDate\"\n                           [viewMode]=\"activeViewMode\"\n                           (changeMode)=\"onChangeViewMode()\">\n    </nb-calendar-view-mode>\n\n    <nb-calendar-pageable-navigation (prev)=\"navigatePrev()\" (next)=\"navigateNext()\">\n    </nb-calendar-pageable-navigation>\n  </nb-card-header>\n\n  <nb-card-body [ngSwitch]=\"activeViewMode\">\n\n    <nb-calendar-day-picker *ngSwitchCase=\"ViewMode.DATE\"\n                            [boundingMonths]=\"boundingMonth\"\n                            [cellComponent]=\"dayCellComponent\"\n                            [min]=\"min\"\n                            [max]=\"max\"\n                            [filter]=\"filter\"\n                            [visibleDate]=\"visibleDate\"\n                            [size]=\"size\"\n                            [date]=\"date\"\n                            [showWeekNumber]=\"showWeekNumber\"\n                            [firstDayOfWeek]=\"firstDayOfWeek\"\n                            (dateChange)=\"dateChange.emit($any($event))\"\n                            [weekNumberSymbol]=\"weekNumberSymbol\">\n    </nb-calendar-day-picker>\n\n    <nb-calendar-year-picker *ngSwitchCase=\"ViewMode.YEAR\"\n                             [cellComponent]=\"yearCellComponent\"\n                             [date]=\"$any(date)\"\n                             [min]=\"min\"\n                             [max]=\"max\"\n                             [filter]=\"filter\"\n                             [size]=\"size\"\n                             [year]=\"visibleDate\"\n                             (yearChange)=\"setVisibleDate($event); setViewMode(ViewMode.MONTH)\">\n    </nb-calendar-year-picker>\n\n    <nb-calendar-month-picker *ngSwitchCase=\"ViewMode.MONTH\"\n                              [cellComponent]=\"monthCellComponent\"\n                              [min]=\"min\"\n                              [max]=\"max\"\n                              [filter]=\"filter\"\n                              [size]=\"size\"\n                              [month]=\"visibleDate\"\n                              [date]=\"$any(date)\"\n                              (monthChange)=\"setVisibleDate($event); setViewMode(ViewMode.DATE)\">\n    </nb-calendar-month-picker>\n\n  </nb-card-body>\n\n</nb-card>\n" }]
        }], ctorParameters: () => [{ type: i1.NbDateService }, { type: i2.NbCalendarYearModelService }], propDecorators: { boundingMonth: [{
                type: Input
            }], activeViewMode: [{
                type: Input,
                args: ['startView']
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
            }, {
                type: HostBinding,
                args: ['class.has-navigation']
            }], date: [{
                type: Input
            }], showWeekNumber: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['class.has-week-number']
            }], weekNumberSymbol: [{
                type: Input
            }], firstDayOfWeek: [{
                type: Input
            }], dateChange: [{
                type: Output
            }], large: [{
                type: HostBinding,
                args: ['class.size-large']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS1jYWxlbmRhci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvZnJhbWV3b3JrL3RoZW1lL2NvbXBvbmVudHMvY2FsZW5kYXIvYmFzZS1jYWxlbmRhci5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi9zcmMvZnJhbWV3b3JrL3RoZW1lL2NvbXBvbmVudHMvY2FsZW5kYXIvYmFzZS1jYWxlbmRhci5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQVEsTUFBTSxlQUFlLENBQUM7QUFHbEcsT0FBTyxFQUVMLGNBQWMsRUFDZCxrQkFBa0IsR0FHbkIsTUFBTSx1QkFBdUIsQ0FBQztBQUUvQixPQUFPLEVBQUUscUJBQXFCLEVBQWtCLE1BQU0sWUFBWSxDQUFDOzs7Ozs7Ozs7OztBQUVuRTs7OztLQUlLO0FBS0wsTUFBTSxPQUFPLHVCQUF1QjtJQWlFbEM7OztTQUdLO0lBQ0wsSUFFSSxjQUFjO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQztJQUM5QixDQUFDO0lBQ0QsSUFBSSxjQUFjLENBQUMsS0FBYztRQUMvQixJQUFJLENBQUMsZUFBZSxHQUFHLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFvQkQsWUFDWSxXQUE2QixFQUM3QixnQkFBK0M7UUFEL0MsZ0JBQVcsR0FBWCxXQUFXLENBQWtCO1FBQzdCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBK0I7UUFoRzNEOzs7YUFHSztRQUNJLGtCQUFhLEdBQVksSUFBSSxDQUFDO1FBRXZDOzthQUVLO1FBQ2UsbUJBQWMsR0FBdUIsa0JBQWtCLENBQUMsSUFBSSxDQUFDO1FBaUNqRjs7O2FBR0s7UUFDSSxTQUFJLEdBQW1CLGNBQWMsQ0FBQyxNQUFNLENBQUM7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VyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQzNFLENBQUM7SUFFTyxrQkFBa0IsQ0FBQyxTQUFpQjtRQUMxQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsU0FBUyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDO0lBQ3BILENBQUM7OEdBMUxVLHVCQUF1QjtrR0FBdkIsdUJBQXVCLDZyQkM1QnBDLGs0RUFxREE7OzJGRHpCYSx1QkFBdUI7a0JBSm5DLFNBQVM7K0JBQ0Usa0JBQWtCOzJIQVNuQixhQUFhO3NCQUFyQixLQUFLO2dCQUtjLGNBQWM7c0JBQWpDLEtBQUs7dUJBQUMsV0FBVztnQkFNVCxHQUFHO3NCQUFYLEtBQUs7Z0JBS0csR0FBRztzQkFBWCxLQUFLO2dCQUtHLE1BQU07c0JBQWQsS0FBSztnQkFLRyxnQkFBZ0I7c0JBQXhCLEtBQUs7Z0JBS0csa0JBQWtCO3NCQUExQixLQUFLO2dCQUtHLGlCQUFpQjtzQkFBekIsS0FBSztnQkFNRyxJQUFJO3NCQUFaLEtBQUs7Z0JBR0csV0FBVztzQkFBbkIsS0FBSztnQkFPTixjQUFjO3NCQUZiLEtBQUs7O3NCQUNMLFdBQVc7dUJBQUMsc0JBQXNCO2dCQU0xQixJQUFJO3NCQUFaLEtBQUs7Z0JBUUYsY0FBYztzQkFGakIsS0FBSzs7c0JBQ0wsV0FBVzt1QkFBQyx1QkFBdUI7Z0JBYTNCLGdCQUFnQjtzQkFBeEIsS0FBSztnQkFNRyxjQUFjO3NCQUF0QixLQUFLO2dCQUtJLFVBQVU7c0JBQW5CLE1BQU07Z0JBY0gsS0FBSztzQkFEUixXQUFXO3VCQUFDLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBBa3Zlby4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi9cblxuaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIEhvc3RCaW5kaW5nLCBJbnB1dCwgT25Jbml0LCBPdXRwdXQsIFR5cGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTmJDYWxlbmRhclllYXJNb2RlbFNlcnZpY2UgfSBmcm9tICcuLi9jYWxlbmRhci1raXQvc2VydmljZXMvY2FsZW5kYXIteWVhci1tb2RlbC5zZXJ2aWNlJztcbmltcG9ydCB7XG4gIE5iQ2FsZW5kYXJDZWxsLFxuICBOYkNhbGVuZGFyU2l6ZSxcbiAgTmJDYWxlbmRhclZpZXdNb2RlLFxuICBOYkNhbGVuZGFyU2l6ZVZhbHVlcyxcbiAgTmJDYWxlbmRhclZpZXdNb2RlVmFsdWVzLFxufSBmcm9tICcuLi9jYWxlbmRhci1raXQvbW9kZWwnO1xuaW1wb3J0IHsgTmJEYXRlU2VydmljZSB9IGZyb20gJy4uL2NhbGVuZGFyLWtpdC9zZXJ2aWNlcy9kYXRlLnNlcnZpY2UnO1xuaW1wb3J0IHsgY29udmVydFRvQm9vbFByb3BlcnR5LCBOYkJvb2xlYW5JbnB1dCB9IGZyb20gJy4uL2hlbHBlcnMnO1xuXG4vKipcbiAqIFRoZSBiYXNpcyBmb3IgY2FsZW5kYXIgYW5kIHJhbmdlIGNhbGVuZGFyIGNvbXBvbmVudHMuXG4gKiBFbmNhcHN1bGF0ZXMgY29tbW9uIGJlaGF2aW9yIC0gc3RvcmUgY2FsZW5kYXIgc3RhdGUgYW5kIHBlcmZvcm0gbmF2aWdhdGlvblxuICogYmV0d2VlbiBwaWNrZXJzLlxuICogKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25iLWJhc2UtY2FsZW5kYXInLFxuICB0ZW1wbGF0ZVVybDogJy4vYmFzZS1jYWxlbmRhci5jb21wb25lbnQuaHRtbCcsXG59KVxuZXhwb3J0IGNsYXNzIE5iQmFzZUNhbGVuZGFyQ29tcG9uZW50PEQsIFQ+IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAvKipcbiAgICogRGVmaW5lcyBpZiB3ZSBzaG91bGQgcmVuZGVyIHByZXZpb3VzIGFuZCBuZXh0IG1vbnRoc1xuICAgKiBpbiB0aGUgY3VycmVudCBtb250aCB2aWV3LlxuICAgKiAqL1xuICBASW5wdXQoKSBib3VuZGluZ01vbnRoOiBib29sZWFuID0gdHJ1ZTtcblxuICAvKipcbiAgICogRGVmaW5lcyBhY3RpdmUgdmlldyBmb3IgY2FsZW5kYXIuXG4gICAqICovXG4gIEBJbnB1dCgnc3RhcnRWaWV3JykgYWN0aXZlVmlld01vZGU6IE5iQ2FsZW5kYXJWaWV3TW9kZSA9IE5iQ2FsZW5kYXJWaWV3TW9kZS5EQVRFO1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfYWN0aXZlVmlld01vZGU6IE5iQ2FsZW5kYXJWaWV3TW9kZVZhbHVlcztcblxuICAvKipcbiAgICogTWluaW11bSBhdmFpbGFibGUgZGF0ZSBmb3Igc2VsZWN0aW9uLlxuICAgKiAqL1xuICBASW5wdXQoKSBtaW46IEQ7XG5cbiAgLyoqXG4gICAqIE1heGltdW0gYXZhaWxhYmxlIGRhdGUgZm9yIHNlbGVjdGlvbi5cbiAgICogKi9cbiAgQElucHV0KCkgbWF4OiBEO1xuXG4gIC8qKlxuICAgKiBQcmVkaWNhdGUgdGhhdCBkZWNpZGVzIHdoaWNoIGNlbGxzIHdpbGwgYmUgZGlzYWJsZWQuXG4gICAqICovXG4gIEBJbnB1dCgpIGZpbHRlcjogKEQpID0+IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEN1c3RvbSBkYXkgY2VsbCBjb21wb25lbnQuIEhhdmUgdG8gaW1wbGVtZW50IGBOYkNhbGVuZGFyQ2VsbGAgaW50ZXJmYWNlLlxuICAgKiAqL1xuICBASW5wdXQoKSBkYXlDZWxsQ29tcG9uZW50OiBUeXBlPE5iQ2FsZW5kYXJDZWxsPEQsIFQ+PjtcblxuICAvKipcbiAgICogQ3VzdG9tIG1vbnRoIGNlbGwgY29tcG9uZW50LiBIYXZlIHRvIGltcGxlbWVudCBgTmJDYWxlbmRhckNlbGxgIGludGVyZmFjZS5cbiAgICogKi9cbiAgQElucHV0KCkgbW9udGhDZWxsQ29tcG9uZW50OiBUeXBlPE5iQ2FsZW5kYXJDZWxsPEQsIFQ+PjtcblxuICAvKipcbiAgICogQ3VzdG9tIHllYXIgY2VsbCBjb21wb25lbnQuIEhhdmUgdG8gaW1wbGVtZW50IGBOYkNhbGVuZGFyQ2VsbGAgaW50ZXJmYWNlLlxuICAgKiAqL1xuICBASW5wdXQoKSB5ZWFyQ2VsbENvbXBvbmVudDogVHlwZTxOYkNhbGVuZGFyQ2VsbDxELCBUPj47XG5cbiAgLyoqXG4gICAqIFNpemUgb2YgdGhlIGNhbGVuZGFyIGFuZCBlbnRpcmUgY29tcG9uZW50cy5cbiAgICogQ2FuIGJlICdtZWRpdW0nIHdoaWNoIGlzIGRlZmF1bHQgb3IgJ2xhcmdlJy5cbiAgICogKi9cbiAgQElucHV0KCkgc2l6ZTogTmJDYWxlbmRhclNpemUgPSBOYkNhbGVuZGFyU2l6ZS5NRURJVU07XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9zaXplOiBOYkNhbGVuZGFyU2l6ZVZhbHVlcztcblxuICBASW5wdXQoKSB2aXNpYmxlRGF0ZTogRDtcblxuICAvKipcbiAgICogRGV0ZXJtaW5lcyB3aGV0aGVyIHdlIHNob3VsZCBzaG93IGNhbGVuZGFyIG5hdmlnYXRpb24gb3Igbm90LlxuICAgKiAqL1xuICBASW5wdXQoKVxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmhhcy1uYXZpZ2F0aW9uJylcbiAgc2hvd05hdmlnYXRpb246IGJvb2xlYW4gPSB0cnVlO1xuXG4gIC8qKlxuICAgKiBWYWx1ZSB3aGljaCB3aWxsIGJlIHJlbmRlcmVkIGFzIHNlbGVjdGVkLlxuICAgKiAqL1xuICBASW5wdXQoKSBkYXRlOiBUO1xuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmVzIHNob3VsZCB3ZSBzaG93IHdlZWsgbnVtYmVycyBjb2x1bW4uXG4gICAqIEZhbHNlIGJ5IGRlZmF1bHQuXG4gICAqICovXG4gIEBJbnB1dCgpXG4gIEBIb3N0QmluZGluZygnY2xhc3MuaGFzLXdlZWstbnVtYmVyJylcbiAgZ2V0IHNob3dXZWVrTnVtYmVyKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9zaG93V2Vla051bWJlcjtcbiAgfVxuICBzZXQgc2hvd1dlZWtOdW1iZXIodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9zaG93V2Vla051bWJlciA9IGNvbnZlcnRUb0Jvb2xQcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJvdGVjdGVkIF9zaG93V2Vla051bWJlciA9IGZhbHNlO1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfc2hvd1dlZWtOdW1iZXI6IE5iQm9vbGVhbklucHV0O1xuXG4gIC8qKlxuICAgKiBTZXRzIHN5bWJvbCB1c2VkIGFzIGEgaGVhZGVyIGZvciB3ZWVrIG51bWJlcnMgY29sdW1uXG4gICAqICovXG4gIEBJbnB1dCgpIHdlZWtOdW1iZXJTeW1ib2w6IHN0cmluZztcblxuICAvKipcbiAgICogU2V0cyBmaXJzdCBkYXkgb2YgdGhlIHdlZWssIGl0IGNhbiBiZSAxIGlmIHdlZWsgc3RhcnRzIGZyb20gbW9uZGF5IGFuZCAwIGlmIGZyb20gc3VuZGF5IGFuZCBzbyBvbi5cbiAgICogYHVuZGVmaW5lZGAgbWVhbnMgdGhhdCBkZWZhdWx0IGxvY2FsZSBzZXR0aW5nIHdpbGwgYmUgdXNlZC5cbiAgICogKi9cbiAgQElucHV0KCkgZmlyc3REYXlPZldlZWs6IG51bWJlciB8IHVuZGVmaW5lZDtcblxuICAvKipcbiAgICogRW1pdHMgZGF0ZSB3aGVuIHNlbGVjdGVkLlxuICAgKiAqL1xuICBAT3V0cHV0KCkgZGF0ZUNoYW5nZTogRXZlbnRFbWl0dGVyPFQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBkYXRlU2VydmljZTogTmJEYXRlU2VydmljZTxEPixcbiAgICBwcm90ZWN0ZWQgeWVhck1vZGVsU2VydmljZTogTmJDYWxlbmRhclllYXJNb2RlbFNlcnZpY2U8RD4sXG4gICkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAoIXRoaXMudmlzaWJsZURhdGUpIHtcbiAgICAgIHRoaXMudmlzaWJsZURhdGUgPSB0aGlzLmRhdGVTZXJ2aWNlLnRvZGF5KCk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5zaXplLWxhcmdlJylcbiAgZ2V0IGxhcmdlKCkge1xuICAgIHJldHVybiB0aGlzLnNpemUgPT09IE5iQ2FsZW5kYXJTaXplLkxBUkdFO1xuICB9XG5cbiAgVmlld01vZGUgPSBOYkNhbGVuZGFyVmlld01vZGU7XG5cbiAgc2V0Vmlld01vZGUodmlld01vZGU6IE5iQ2FsZW5kYXJWaWV3TW9kZSkge1xuICAgIHRoaXMuYWN0aXZlVmlld01vZGUgPSB2aWV3TW9kZTtcbiAgfVxuXG4gIHNldFZpc2libGVEYXRlKHZpc2libGVEYXRlOiBEKSB7XG4gICAgdGhpcy52aXNpYmxlRGF0ZSA9IHZpc2libGVEYXRlO1xuICB9XG5cbiAgcHJldk1vbnRoKCkge1xuICAgIHRoaXMuY2hhbmdlVmlzaWJsZU1vbnRoKC0xKTtcbiAgfVxuXG4gIG5leHRNb250aCgpIHtcbiAgICB0aGlzLmNoYW5nZVZpc2libGVNb250aCgxKTtcbiAgfVxuXG4gIHByZXZZZWFyKCkge1xuICAgIHRoaXMuY2hhbmdlVmlzaWJsZVllYXIoLTEpO1xuICB9XG5cbiAgbmV4dFllYXIoKSB7XG4gICAgdGhpcy5jaGFuZ2VWaXNpYmxlWWVhcigxKTtcbiAgfVxuXG4gIHByZXZZZWFycygpIHtcbiAgICB0aGlzLmNoYW5nZVZpc2libGVZZWFycygtMSk7XG4gIH1cblxuICBuZXh0WWVhcnMoKSB7XG4gICAgdGhpcy5jaGFuZ2VWaXNpYmxlWWVhcnMoMSk7XG4gIH1cblxuICBuYXZpZ2F0ZVByZXYoKSB7XG4gICAgc3dpdGNoICh0aGlzLmFjdGl2ZVZpZXdNb2RlKSB7XG4gICAgICBjYXNlIE5iQ2FsZW5kYXJWaWV3TW9kZS5EQVRFOlxuICAgICAgICByZXR1cm4gdGhpcy5wcmV2TW9udGgoKTtcbiAgICAgIGNhc2UgTmJDYWxlbmRhclZpZXdNb2RlLk1PTlRIOlxuICAgICAgICByZXR1cm4gdGhpcy5wcmV2WWVhcigpO1xuICAgICAgY2FzZSBOYkNhbGVuZGFyVmlld01vZGUuWUVBUjpcbiAgICAgICAgcmV0dXJuIHRoaXMucHJldlllYXJzKCk7XG4gICAgfVxuICB9XG5cbiAgbmF2aWdhdGVOZXh0KCkge1xuICAgIHN3aXRjaCAodGhpcy5hY3RpdmVWaWV3TW9kZSkge1xuICAgICAgY2FzZSBOYkNhbGVuZGFyVmlld01vZGUuREFURTpcbiAgICAgICAgcmV0dXJuIHRoaXMubmV4dE1vbnRoKCk7XG4gICAgICBjYXNlIE5iQ2FsZW5kYXJWaWV3TW9kZS5NT05USDpcbiAgICAgICAgcmV0dXJuIHRoaXMubmV4dFllYXIoKTtcbiAgICAgIGNhc2UgTmJDYWxlbmRhclZpZXdNb2RlLllFQVI6XG4gICAgICAgIHJldHVybiB0aGlzLm5leHRZZWFycygpO1xuICAgIH1cbiAgfVxuXG4gIG9uQ2hhbmdlVmlld01vZGUoKSB7XG4gICAgaWYgKHRoaXMuYWN0aXZlVmlld01vZGUgPT09IE5iQ2FsZW5kYXJWaWV3TW9kZS5EQVRFKSB7XG4gICAgICByZXR1cm4gdGhpcy5zZXRWaWV3TW9kZShOYkNhbGVuZGFyVmlld01vZGUuWUVBUik7XG4gICAgfVxuXG4gICAgdGhpcy5zZXRWaWV3TW9kZShOYkNhbGVuZGFyVmlld01vZGUuREFURSk7XG4gIH1cblxuICBwcml2YXRlIGNoYW5nZVZpc2libGVNb250aChkaXJlY3Rpb246IG51bWJlcikge1xuICAgIHRoaXMudmlzaWJsZURhdGUgPSB0aGlzLmRhdGVTZXJ2aWNlLmFkZE1vbnRoKHRoaXMudmlzaWJsZURhdGUsIGRpcmVjdGlvbik7XG4gIH1cblxuICBwcml2YXRlIGNoYW5nZVZpc2libGVZZWFyKGRpcmVjdGlvbjogbnVtYmVyKSB7XG4gICAgdGhpcy52aXNpYmxlRGF0ZSA9IHRoaXMuZGF0ZVNlcnZpY2UuYWRkWWVhcih0aGlzLnZpc2libGVEYXRlLCBkaXJlY3Rpb24pO1xuICB9XG5cbiAgcHJpdmF0ZSBjaGFuZ2VWaXNpYmxlWWVhcnMoZGlyZWN0aW9uOiBudW1iZXIpIHtcbiAgICB0aGlzLnZpc2libGVEYXRlID0gdGhpcy5kYXRlU2VydmljZS5hZGRZZWFyKHRoaXMudmlzaWJsZURhdGUsIGRpcmVjdGlvbiAqIHRoaXMueWVhck1vZGVsU2VydmljZS5nZXRZZWFyc0luVmlldygpKTtcbiAgfVxufVxuIiwiPG5iLWNhcmQ+XG4gIDxuYi1jYXJkLWhlYWRlciAqbmdJZj1cInNob3dOYXZpZ2F0aW9uXCIgY2xhc3M9XCJjYWxlbmRhci1uYXZpZ2F0aW9uXCI+XG4gICAgPG5iLWNhbGVuZGFyLXZpZXctbW9kZSBbZGF0ZV09XCJ2aXNpYmxlRGF0ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBbdmlld01vZGVdPVwiYWN0aXZlVmlld01vZGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgKGNoYW5nZU1vZGUpPVwib25DaGFuZ2VWaWV3TW9kZSgpXCI+XG4gICAgPC9uYi1jYWxlbmRhci12aWV3LW1vZGU+XG5cbiAgICA8bmItY2FsZW5kYXItcGFnZWFibGUtbmF2aWdhdGlvbiAocHJldik9XCJuYXZpZ2F0ZVByZXYoKVwiIChuZXh0KT1cIm5hdmlnYXRlTmV4dCgpXCI+XG4gICAgPC9uYi1jYWxlbmRhci1wYWdlYWJsZS1uYXZpZ2F0aW9uPlxuICA8L25iLWNhcmQtaGVhZGVyPlxuXG4gIDxuYi1jYXJkLWJvZHkgW25nU3dpdGNoXT1cImFjdGl2ZVZpZXdNb2RlXCI+XG5cbiAgICA8bmItY2FsZW5kYXItZGF5LXBpY2tlciAqbmdTd2l0Y2hDYXNlPVwiVmlld01vZGUuREFURVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2JvdW5kaW5nTW9udGhzXT1cImJvdW5kaW5nTW9udGhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtjZWxsQ29tcG9uZW50XT1cImRheUNlbGxDb21wb25lbnRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFttaW5dPVwibWluXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbWF4XT1cIm1heFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2ZpbHRlcl09XCJmaWx0ZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt2aXNpYmxlRGF0ZV09XCJ2aXNpYmxlRGF0ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW3NpemVdPVwic2l6ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2RhdGVdPVwiZGF0ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW3Nob3dXZWVrTnVtYmVyXT1cInNob3dXZWVrTnVtYmVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZmlyc3REYXlPZldlZWtdPVwiZmlyc3REYXlPZldlZWtcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChkYXRlQ2hhbmdlKT1cImRhdGVDaGFuZ2UuZW1pdCgkYW55KCRldmVudCkpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbd2Vla051bWJlclN5bWJvbF09XCJ3ZWVrTnVtYmVyU3ltYm9sXCI+XG4gICAgPC9uYi1jYWxlbmRhci1kYXktcGlja2VyPlxuXG4gICAgPG5iLWNhbGVuZGFyLXllYXItcGlja2VyICpuZ1N3aXRjaENhc2U9XCJWaWV3TW9kZS5ZRUFSXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2NlbGxDb21wb25lbnRdPVwieWVhckNlbGxDb21wb25lbnRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZGF0ZV09XCIkYW55KGRhdGUpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW21pbl09XCJtaW5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbWF4XT1cIm1heFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtmaWx0ZXJdPVwiZmlsdGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3NpemVdPVwic2l6ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt5ZWFyXT1cInZpc2libGVEYXRlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHllYXJDaGFuZ2UpPVwic2V0VmlzaWJsZURhdGUoJGV2ZW50KTsgc2V0Vmlld01vZGUoVmlld01vZGUuTU9OVEgpXCI+XG4gICAgPC9uYi1jYWxlbmRhci15ZWFyLXBpY2tlcj5cblxuICAgIDxuYi1jYWxlbmRhci1tb250aC1waWNrZXIgKm5nU3dpdGNoQ2FzZT1cIlZpZXdNb2RlLk1PTlRIXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtjZWxsQ29tcG9uZW50XT1cIm1vbnRoQ2VsbENvbXBvbmVudFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbWluXT1cIm1pblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbWF4XT1cIm1heFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZmlsdGVyXT1cImZpbHRlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbc2l6ZV09XCJzaXplXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFttb250aF09XCJ2aXNpYmxlRGF0ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZGF0ZV09XCIkYW55KGRhdGUpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChtb250aENoYW5nZSk9XCJzZXRWaXNpYmxlRGF0ZSgkZXZlbnQpOyBzZXRWaWV3TW9kZShWaWV3TW9kZS5EQVRFKVwiPlxuICAgIDwvbmItY2FsZW5kYXItbW9udGgtcGlja2VyPlxuXG4gIDwvbmItY2FyZC1ib2R5PlxuXG48L25iLWNhcmQ+XG4iXX0=