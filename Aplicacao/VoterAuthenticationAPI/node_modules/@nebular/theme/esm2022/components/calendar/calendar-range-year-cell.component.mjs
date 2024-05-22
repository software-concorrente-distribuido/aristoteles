/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, HostBinding, HostListener, } from '@angular/core';
import { NbCalendarSize } from '../calendar-kit/model';
import { NbBaseCalendarRangeCell } from './base-calendar-range-cell';
import * as i0 from "@angular/core";
import * as i1 from "../calendar-kit/services/date.service";
export class NbCalendarRangeYearCellComponent extends NbBaseCalendarRangeCell {
    constructor(dateService) {
        super();
        this.dateService = dateService;
        this.size = NbCalendarSize.MEDIUM;
        this.select = new EventEmitter(true);
        this.yearCellClass = true;
        this.rangeCellClass = true;
    }
    get inRange() {
        return this.hasRange && this.isInRange(this.date, this.selectedValue);
    }
    get rangeStart() {
        return this.hasRange && this.dateService.isSameYear(this.date, this.selectedValue.start);
    }
    get rangeEnd() {
        return this.hasRange && this.dateService.isSameYear(this.date, this.selectedValue.end);
    }
    get selected() {
        if (this.inRange) {
            return true;
        }
        if (this.selectedValue) {
            return this.dateService.isSameYearSafe(this.date, this.selectedValue.start);
        }
        return false;
    }
    get today() {
        return this.dateService.isSameYear(this.date, this.dateService.today());
    }
    get disabled() {
        return this.smallerThanMin() || this.greaterThanMax();
    }
    get isLarge() {
        return this.size === NbCalendarSize.LARGE;
    }
    get year() {
        return this.dateService.getYear(this.date);
    }
    onClick() {
        if (this.disabled) {
            return;
        }
        this.select.emit(this.date);
    }
    smallerThanMin() {
        return this.date && this.min && this.dateService.compareDates(this.yearEnd(), this.min) < 0;
    }
    greaterThanMax() {
        return this.date && this.max && this.dateService.compareDates(this.yearStart(), this.max) > 0;
    }
    yearStart() {
        return this.dateService.getYearStart(this.date);
    }
    yearEnd() {
        return this.dateService.getYearEnd(this.date);
    }
    isInRange(date, { start, end }) {
        if (start && end) {
            const cellYear = this.dateService.getYear(date);
            const startYear = this.dateService.getYear(start);
            const endYear = this.dateService.getYear(end);
            return cellYear >= startYear && cellYear <= endYear;
        }
        return this.dateService.isSameYear(date, start);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbCalendarRangeYearCellComponent, deps: [{ token: i1.NbDateService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.1.0", type: NbCalendarRangeYearCellComponent, selector: "nb-calendar-range-year-cell", inputs: { date: "date", min: "min", max: "max", selectedValue: "selectedValue", size: "size" }, outputs: { select: "select" }, host: { listeners: { "click": "onClick()" }, properties: { "class.in-range": "this.inRange", "class.start": "this.rangeStart", "class.end": "this.rangeEnd", "class.selected": "this.selected", "class.today": "this.today", "class.disabled": "this.disabled", "class.size-large": "this.isLarge", "class.year-cell": "this.yearCellClass", "class.range-cell": "this.rangeCellClass" } }, usesInheritance: true, ngImport: i0, template: `
    <div class="cell-content">
      {{ year }}
    </div>
  `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbCalendarRangeYearCellComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nb-calendar-range-year-cell',
                    template: `
    <div class="cell-content">
      {{ year }}
    </div>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], ctorParameters: () => [{ type: i1.NbDateService }], propDecorators: { date: [{
                type: Input
            }], min: [{
                type: Input
            }], max: [{
                type: Input
            }], selectedValue: [{
                type: Input
            }], size: [{
                type: Input
            }], select: [{
                type: Output
            }], inRange: [{
                type: HostBinding,
                args: ['class.in-range']
            }], rangeStart: [{
                type: HostBinding,
                args: ['class.start']
            }], rangeEnd: [{
                type: HostBinding,
                args: ['class.end']
            }], selected: [{
                type: HostBinding,
                args: ['class.selected']
            }], today: [{
                type: HostBinding,
                args: ['class.today']
            }], disabled: [{
                type: HostBinding,
                args: ['class.disabled']
            }], isLarge: [{
                type: HostBinding,
                args: ['class.size-large']
            }], yearCellClass: [{
                type: HostBinding,
                args: ['class.year-cell']
            }], rangeCellClass: [{
                type: HostBinding,
                args: ['class.range-cell']
            }], onClick: [{
                type: HostListener,
                args: ['click']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItcmFuZ2UteWVhci1jZWxsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9mcmFtZXdvcmsvdGhlbWUvY29tcG9uZW50cy9jYWxlbmRhci9jYWxlbmRhci1yYW5nZS15ZWFyLWNlbGwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQ0wsU0FBUyxFQUNULHVCQUF1QixFQUN2QixLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFDWixXQUFXLEVBQ1gsWUFBWSxHQUNiLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBa0IsY0FBYyxFQUF3QixNQUFNLHVCQUF1QixDQUFDO0FBRzdGLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDRCQUE0QixDQUFDOzs7QUFXckUsTUFBTSxPQUFPLGdDQUFvQyxTQUFRLHVCQUEwQjtJQWVqRixZQUFzQixXQUE2QjtRQUNqRCxLQUFLLEVBQUUsQ0FBQztRQURZLGdCQUFXLEdBQVgsV0FBVyxDQUFrQjtRQUwxQyxTQUFJLEdBQW1CLGNBQWMsQ0FBQyxNQUFNLENBQUM7UUFHNUMsV0FBTSxHQUFvQixJQUFJLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQWtEM0Qsa0JBQWEsR0FBRyxJQUFJLENBQUM7UUFHckIsbUJBQWMsR0FBRyxJQUFJLENBQUM7SUFqRHRCLENBQUM7SUFFRCxJQUNJLE9BQU87UUFDVCxPQUFPLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUN4RSxDQUFDO0lBRUQsSUFDSSxVQUFVO1FBQ1osT0FBTyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FB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QyxXQUFXLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNsRCxDQUFDOzhHQTNHVSxnQ0FBZ0M7a0dBQWhDLGdDQUFnQyxxbEJBUGpDOzs7O0dBSVQ7OzJGQUdVLGdDQUFnQztrQkFUNUMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsNkJBQTZCO29CQUN2QyxRQUFRLEVBQUU7Ozs7R0FJVDtvQkFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtpQkFDaEQ7a0ZBR1UsSUFBSTtzQkFBWixLQUFLO2dCQUVHLEdBQUc7c0JBQVgsS0FBSztnQkFFRyxHQUFHO3NCQUFYLEtBQUs7Z0JBRUcsYUFBYTtzQkFBckIsS0FBSztnQkFFRyxJQUFJO3NCQUFaLEtBQUs7Z0JBR0ksTUFBTTtzQkFBZixNQUFNO2dCQU9ILE9BQU87c0JBRFYsV0FBVzt1QkFBQyxnQkFBZ0I7Z0JBTXpCLFVBQVU7c0JBRGIsV0FBVzt1QkFBQyxhQUFhO2dCQU10QixRQUFRO3NCQURYLFdBQVc7dUJBQUMsV0FBVztnQkFNcEIsUUFBUTtzQkFEWCxXQUFXO3VCQUFDLGdCQUFnQjtnQkFjekIsS0FBSztzQkFEUixXQUFXO3VCQUFDLGFBQWE7Z0JBTXRCLFFBQVE7c0JBRFgsV0FBVzt1QkFBQyxnQkFBZ0I7Z0JBTXpCLE9BQU87c0JBRFYsV0FBVzt1QkFBQyxrQkFBa0I7Z0JBTS9CLGFBQWE7c0JBRFosV0FBVzt1QkFBQyxpQkFBaUI7Z0JBSTlCLGNBQWM7c0JBRGIsV0FBVzt1QkFBQyxrQkFBa0I7Z0JBUS9CLE9BQU87c0JBRE4sWUFBWTt1QkFBQyxPQUFPIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEFrdmVvLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqL1xuXG5pbXBvcnQge1xuICBDb21wb25lbnQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3RCaW5kaW5nLFxuICBIb3N0TGlzdGVuZXIsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOYkNhbGVuZGFyQ2VsbCwgTmJDYWxlbmRhclNpemUsIE5iQ2FsZW5kYXJTaXplVmFsdWVzIH0gZnJvbSAnLi4vY2FsZW5kYXIta2l0L21vZGVsJztcbmltcG9ydCB7IE5iQ2FsZW5kYXJSYW5nZSB9IGZyb20gJy4vY2FsZW5kYXItcmFuZ2UuY29tcG9uZW50JztcbmltcG9ydCB7IE5iRGF0ZVNlcnZpY2UgfSBmcm9tICcuLi9jYWxlbmRhci1raXQvc2VydmljZXMvZGF0ZS5zZXJ2aWNlJztcbmltcG9ydCB7IE5iQmFzZUNhbGVuZGFyUmFuZ2VDZWxsIH0gZnJvbSAnLi9iYXNlLWNhbGVuZGFyLXJhbmdlLWNlbGwnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduYi1jYWxlbmRhci1yYW5nZS15ZWFyLWNlbGwnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJjZWxsLWNvbnRlbnRcIj5cbiAgICAgIHt7IHllYXIgfX1cbiAgICA8L2Rpdj5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE5iQ2FsZW5kYXJSYW5nZVllYXJDZWxsQ29tcG9uZW50PEQ+IGV4dGVuZHMgTmJCYXNlQ2FsZW5kYXJSYW5nZUNlbGw8RD5cbiAgaW1wbGVtZW50cyBOYkNhbGVuZGFyQ2VsbDxELCBOYkNhbGVuZGFyUmFuZ2U8RD4+IHtcbiAgQElucHV0KCkgZGF0ZTogRDtcblxuICBASW5wdXQoKSBtaW46IEQ7XG5cbiAgQElucHV0KCkgbWF4OiBEO1xuXG4gIEBJbnB1dCgpIHNlbGVjdGVkVmFsdWU6IE5iQ2FsZW5kYXJSYW5nZTxEPjtcblxuICBASW5wdXQoKSBzaXplOiBOYkNhbGVuZGFyU2l6ZSA9IE5iQ2FsZW5kYXJTaXplLk1FRElVTTtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX3NpemU6IE5iQ2FsZW5kYXJTaXplVmFsdWVzO1xuXG4gIEBPdXRwdXQoKSBzZWxlY3Q6IEV2ZW50RW1pdHRlcjxEPiA9IG5ldyBFdmVudEVtaXR0ZXIodHJ1ZSk7XG5cbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGRhdGVTZXJ2aWNlOiBOYkRhdGVTZXJ2aWNlPEQ+KSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3MuaW4tcmFuZ2UnKVxuICBnZXQgaW5SYW5nZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5oYXNSYW5nZSAmJiB0aGlzLmlzSW5SYW5nZSh0aGlzLmRhdGUsIHRoaXMuc2VsZWN0ZWRWYWx1ZSk7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnN0YXJ0JylcbiAgZ2V0IHJhbmdlU3RhcnQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuaGFzUmFuZ2UgJiYgdGhpcy5kYXRlU2VydmljZS5pc1NhbWVZZWFyKHRoaXMuZGF0ZSwgdGhpcy5zZWxlY3RlZFZhbHVlLnN0YXJ0KTtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3MuZW5kJylcbiAgZ2V0IHJhbmdlRW5kKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmhhc1JhbmdlICYmIHRoaXMuZGF0ZVNlcnZpY2UuaXNTYW1lWWVhcih0aGlzLmRhdGUsIHRoaXMuc2VsZWN0ZWRWYWx1ZS5lbmQpO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5zZWxlY3RlZCcpXG4gIGdldCBzZWxlY3RlZCgpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5pblJhbmdlKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5zZWxlY3RlZFZhbHVlKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXRlU2VydmljZS5pc1NhbWVZZWFyU2FmZSh0aGlzLmRhdGUsIHRoaXMuc2VsZWN0ZWRWYWx1ZS5zdGFydCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy50b2RheScpXG4gIGdldCB0b2RheSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5kYXRlU2VydmljZS5pc1NhbWVZZWFyKHRoaXMuZGF0ZSwgdGhpcy5kYXRlU2VydmljZS50b2RheSgpKTtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3MuZGlzYWJsZWQnKVxuICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc21hbGxlclRoYW5NaW4oKSB8fCB0aGlzLmdyZWF0ZXJUaGFuTWF4KCk7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnNpemUtbGFyZ2UnKVxuICBnZXQgaXNMYXJnZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5zaXplID09PSBOYkNhbGVuZGFyU2l6ZS5MQVJHRTtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3MueWVhci1jZWxsJylcbiAgeWVhckNlbGxDbGFzcyA9IHRydWU7XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5yYW5nZS1jZWxsJylcbiAgcmFuZ2VDZWxsQ2xhc3MgPSB0cnVlO1xuXG4gIGdldCB5ZWFyKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuZGF0ZVNlcnZpY2UuZ2V0WWVhcih0aGlzLmRhdGUpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKVxuICBvbkNsaWNrKCkge1xuICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5zZWxlY3QuZW1pdCh0aGlzLmRhdGUpO1xuICB9XG5cbiAgcHJvdGVjdGVkIHNtYWxsZXJUaGFuTWluKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmRhdGUgJiYgdGhpcy5taW4gJiYgdGhpcy5kYXRlU2VydmljZS5jb21wYXJlRGF0ZXModGhpcy55ZWFyRW5kKCksIHRoaXMubWluKSA8IDA7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ3JlYXRlclRoYW5NYXgoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZGF0ZSAmJiB0aGlzLm1heCAmJiB0aGlzLmRhdGVTZXJ2aWNlLmNvbXBhcmVEYXRlcyh0aGlzLnllYXJTdGFydCgpLCB0aGlzLm1heCkgPiAwO1xuICB9XG5cbiAgcHJvdGVjdGVkIHllYXJTdGFydCgpOiBEIHtcbiAgICByZXR1cm4gdGhpcy5kYXRlU2VydmljZS5nZXRZZWFyU3RhcnQodGhpcy5kYXRlKTtcbiAgfVxuXG4gIHByb3RlY3RlZCB5ZWFyRW5kKCk6IEQge1xuICAgIHJldHVybiB0aGlzLmRhdGVTZXJ2aWNlLmdldFllYXJFbmQodGhpcy5kYXRlKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBpc0luUmFuZ2UoZGF0ZTogRCwgeyBzdGFydCwgZW5kIH06IE5iQ2FsZW5kYXJSYW5nZTxEPik6IGJvb2xlYW4ge1xuICAgIGlmIChzdGFydCAmJiBlbmQpIHtcbiAgICAgIGNvbnN0IGNlbGxZZWFyID0gdGhpcy5kYXRlU2VydmljZS5nZXRZZWFyKGRhdGUpO1xuICAgICAgY29uc3Qgc3RhcnRZZWFyID0gdGhpcy5kYXRlU2VydmljZS5nZXRZZWFyKHN0YXJ0KTtcbiAgICAgIGNvbnN0IGVuZFllYXIgPSB0aGlzLmRhdGVTZXJ2aWNlLmdldFllYXIoZW5kKTtcblxuICAgICAgcmV0dXJuIGNlbGxZZWFyID49IHN0YXJ0WWVhciAmJiBjZWxsWWVhciA8PSBlbmRZZWFyO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmRhdGVTZXJ2aWNlLmlzU2FtZVllYXIoZGF0ZSwgc3RhcnQpO1xuICB9XG59XG4iXX0=