/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, HostListener, Input, Output, } from '@angular/core';
import { NbCalendarSize } from '../calendar-kit/model';
import { NbBaseCalendarRangeCell } from './base-calendar-range-cell';
import * as i0 from "@angular/core";
import * as i1 from "../calendar-kit/services/date.service";
export class NbCalendarRangeMonthCellComponent extends NbBaseCalendarRangeCell {
    get month() {
        return this.dateService.getMonthName(this.date);
    }
    get selected() {
        if (this.inRange) {
            return true;
        }
        if (this.selectedValue) {
            return this.dateService.isSameMonthSafe(this.date, this.selectedValue.start);
        }
        return false;
    }
    get inRange() {
        if (this.hasRange) {
            return this.isInRage(this.date, this.selectedValue);
        }
        return false;
    }
    get rangeStart() {
        if (this.hasRange) {
            return this.dateService.isSameMonth(this.date, this.selectedValue.start);
        }
        return false;
    }
    get rangeEnd() {
        if (this.hasRange) {
            return this.dateService.isSameMonth(this.date, this.selectedValue.end);
        }
        return false;
    }
    get today() {
        return this.dateService.isSameMonthSafe(this.date, this.dateService.today());
    }
    get disabled() {
        return this.smallerThanMin() || this.greaterThanMax();
    }
    get isLarge() {
        return this.size === NbCalendarSize.LARGE;
    }
    onClick() {
        if (this.disabled) {
            return;
        }
        this.select.emit(this.date);
    }
    constructor(dateService) {
        super();
        this.dateService = dateService;
        this.size = NbCalendarSize.MEDIUM;
        this.select = new EventEmitter(true);
        this.monthCellClass = true;
        this.rangeCellClass = true;
    }
    smallerThanMin() {
        return this.date && this.min && this.dateService.compareDates(this.monthEnd(), this.min) < 0;
    }
    greaterThanMax() {
        return this.date && this.max && this.dateService.compareDates(this.monthStart(), this.max) > 0;
    }
    monthStart() {
        return this.dateService.getMonthStart(this.date);
    }
    monthEnd() {
        return this.dateService.getMonthEnd(this.date);
    }
    isInRage(date, range) {
        if (range.start && range.end) {
            const cellDate = this.dateService.getMonthStart(date);
            const start = this.dateService.getMonthStart(range.start);
            const end = this.dateService.getMonthStart(range.end);
            const isGreaterThanStart = this.dateService.compareDates(cellDate, start) >= 0;
            const isLessThanEnd = this.dateService.compareDates(cellDate, end) <= 0;
            return isGreaterThanStart && isLessThanEnd;
        }
        return this.dateService.isSameMonth(date, range.start);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbCalendarRangeMonthCellComponent, deps: [{ token: i1.NbDateService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.1.0", type: NbCalendarRangeMonthCellComponent, selector: "nb-calendar-range-month-cell", inputs: { date: "date", visibleDate: "visibleDate", selectedValue: "selectedValue", min: "min", max: "max", size: "size" }, outputs: { select: "select" }, host: { listeners: { "click": "onClick()" }, properties: { "class.month-cell": "this.monthCellClass", "class.range-cell": "this.rangeCellClass", "class.selected": "this.selected", "class.in-range": "this.inRange", "class.start": "this.rangeStart", "class.end": "this.rangeEnd", "class.today": "this.today", "class.disabled": "this.disabled", "class.size-large": "this.isLarge" } }, usesInheritance: true, ngImport: i0, template: `
    <div class="cell-content">
      {{ month }}
    </div>
  `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbCalendarRangeMonthCellComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nb-calendar-range-month-cell',
                    template: `
    <div class="cell-content">
      {{ month }}
    </div>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], ctorParameters: () => [{ type: i1.NbDateService }], propDecorators: { date: [{
                type: Input
            }], visibleDate: [{
                type: Input
            }], selectedValue: [{
                type: Input
            }], min: [{
                type: Input
            }], max: [{
                type: Input
            }], size: [{
                type: Input
            }], select: [{
                type: Output
            }], monthCellClass: [{
                type: HostBinding,
                args: ['class.month-cell']
            }], rangeCellClass: [{
                type: HostBinding,
                args: ['class.range-cell']
            }], selected: [{
                type: HostBinding,
                args: ['class.selected']
            }], inRange: [{
                type: HostBinding,
                args: ['class.in-range']
            }], rangeStart: [{
                type: HostBinding,
                args: ['class.start']
            }], rangeEnd: [{
                type: HostBinding,
                args: ['class.end']
            }], today: [{
                type: HostBinding,
                args: ['class.today']
            }], disabled: [{
                type: HostBinding,
                args: ['class.disabled']
            }], isLarge: [{
                type: HostBinding,
                args: ['class.size-large']
            }], onClick: [{
                type: HostListener,
                args: ['click']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItcmFuZ2UtbW9udGgtY2VsbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvZnJhbWV3b3JrL3RoZW1lL2NvbXBvbmVudHMvY2FsZW5kYXIvY2FsZW5kYXItcmFuZ2UtbW9udGgtY2VsbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFlBQVksRUFDWixXQUFXLEVBQ1gsWUFBWSxFQUNaLEtBQUssRUFDTCxNQUFNLEdBQ1AsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFrQixjQUFjLEVBQXdCLE1BQU0sdUJBQXVCLENBQUM7QUFHN0YsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sNEJBQTRCLENBQUM7OztBQVdyRSxNQUFNLE9BQU8saUNBQXFDLFNBQVEsdUJBQTBCO0lBR2xGLElBQUksS0FBSztRQUNQLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFvQkQsSUFDSSxRQUFRO1FBQ1YsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDakIsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDO1FBRUQsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDdkIsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDL0UsQ0FBQztRQUVELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVELElBQ0ksT0FBTztRQUNULElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ2xCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElB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LFdBQVc7dUJBQUMsV0FBVztnQkFTcEIsS0FBSztzQkFEUixXQUFXO3VCQUFDLGFBQWE7Z0JBTXRCLFFBQVE7c0JBRFgsV0FBVzt1QkFBQyxnQkFBZ0I7Z0JBTXpCLE9BQU87c0JBRFYsV0FBVzt1QkFBQyxrQkFBa0I7Z0JBTS9CLE9BQU87c0JBRE4sWUFBWTt1QkFBQyxPQUFPIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEFrdmVvLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqL1xuXG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3RCaW5kaW5nLFxuICBIb3N0TGlzdGVuZXIsXG4gIElucHV0LFxuICBPdXRwdXQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOYkNhbGVuZGFyQ2VsbCwgTmJDYWxlbmRhclNpemUsIE5iQ2FsZW5kYXJTaXplVmFsdWVzIH0gZnJvbSAnLi4vY2FsZW5kYXIta2l0L21vZGVsJztcbmltcG9ydCB7IE5iRGF0ZVNlcnZpY2UgfSBmcm9tICcuLi9jYWxlbmRhci1raXQvc2VydmljZXMvZGF0ZS5zZXJ2aWNlJztcbmltcG9ydCB7IE5iQ2FsZW5kYXJSYW5nZSB9IGZyb20gJy4vY2FsZW5kYXItcmFuZ2UuY29tcG9uZW50JztcbmltcG9ydCB7IE5iQmFzZUNhbGVuZGFyUmFuZ2VDZWxsIH0gZnJvbSAnLi9iYXNlLWNhbGVuZGFyLXJhbmdlLWNlbGwnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduYi1jYWxlbmRhci1yYW5nZS1tb250aC1jZWxsJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwiY2VsbC1jb250ZW50XCI+XG4gICAgICB7eyBtb250aCB9fVxuICAgIDwvZGl2PlxuICBgLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgTmJDYWxlbmRhclJhbmdlTW9udGhDZWxsQ29tcG9uZW50PEQ+IGV4dGVuZHMgTmJCYXNlQ2FsZW5kYXJSYW5nZUNlbGw8RD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1wbGVtZW50cyBOYkNhbGVuZGFyQ2VsbDxELCBOYkNhbGVuZGFyUmFuZ2U8RD4+IHtcblxuICBnZXQgbW9udGgoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5kYXRlU2VydmljZS5nZXRNb250aE5hbWUodGhpcy5kYXRlKTtcbiAgfVxuXG4gIEBJbnB1dCgpIGRhdGU6IEQ7XG4gIEBJbnB1dCgpIHZpc2libGVEYXRlOiBEO1xuXG4gIEBJbnB1dCgpIHNlbGVjdGVkVmFsdWU6IE5iQ2FsZW5kYXJSYW5nZTxEPjtcbiAgQElucHV0KCkgbWluOiBEO1xuICBASW5wdXQoKSBtYXg6IEQ7XG5cbiAgQElucHV0KCkgc2l6ZTogTmJDYWxlbmRhclNpemUgPSBOYkNhbGVuZGFyU2l6ZS5NRURJVU07XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9zaXplOiBOYkNhbGVuZGFyU2l6ZVZhbHVlcztcblxuICBAT3V0cHV0KCkgc2VsZWN0OiBFdmVudEVtaXR0ZXI8RD4gPSBuZXcgRXZlbnRFbWl0dGVyKHRydWUpO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MubW9udGgtY2VsbCcpXG4gIG1vbnRoQ2VsbENsYXNzID0gdHJ1ZTtcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnJhbmdlLWNlbGwnKVxuICByYW5nZUNlbGxDbGFzcyA9IHRydWU7XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5zZWxlY3RlZCcpXG4gIGdldCBzZWxlY3RlZCgpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5pblJhbmdlKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5zZWxlY3RlZFZhbHVlKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXRlU2VydmljZS5pc1NhbWVNb250aFNhZmUodGhpcy5kYXRlLCB0aGlzLnNlbGVjdGVkVmFsdWUuc3RhcnQpO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3MuaW4tcmFuZ2UnKVxuICBnZXQgaW5SYW5nZSgpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5oYXNSYW5nZSkge1xuICAgICAgcmV0dXJuIHRoaXMuaXNJblJhZ2UodGhpcy5kYXRlLCB0aGlzLnNlbGVjdGVkVmFsdWUpO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnN0YXJ0JylcbiAgZ2V0IHJhbmdlU3RhcnQoKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMuaGFzUmFuZ2UpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGVTZXJ2aWNlLmlzU2FtZU1vbnRoKHRoaXMuZGF0ZSwgdGhpcy5zZWxlY3RlZFZhbHVlLnN0YXJ0KTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5lbmQnKVxuICBnZXQgcmFuZ2VFbmQoKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMuaGFzUmFuZ2UpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGVTZXJ2aWNlLmlzU2FtZU1vbnRoKHRoaXMuZGF0ZSwgdGhpcy5zZWxlY3RlZFZhbHVlLmVuZCk7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3MudG9kYXknKVxuICBnZXQgdG9kYXkoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZGF0ZVNlcnZpY2UuaXNTYW1lTW9udGhTYWZlKHRoaXMuZGF0ZSwgdGhpcy5kYXRlU2VydmljZS50b2RheSgpKTtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3MuZGlzYWJsZWQnKVxuICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc21hbGxlclRoYW5NaW4oKSB8fCB0aGlzLmdyZWF0ZXJUaGFuTWF4KCk7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnNpemUtbGFyZ2UnKVxuICBnZXQgaXNMYXJnZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5zaXplID09PSBOYkNhbGVuZGFyU2l6ZS5MQVJHRTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJylcbiAgb25DbGljaygpIHtcbiAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuc2VsZWN0LmVtaXQodGhpcy5kYXRlKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBkYXRlU2VydmljZTogTmJEYXRlU2VydmljZTxEPikge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgc21hbGxlclRoYW5NaW4oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZGF0ZSAmJiB0aGlzLm1pbiAmJiB0aGlzLmRhdGVTZXJ2aWNlLmNvbXBhcmVEYXRlcyh0aGlzLm1vbnRoRW5kKCksIHRoaXMubWluKSA8IDA7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ3JlYXRlclRoYW5NYXgoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZGF0ZSAmJiB0aGlzLm1heCAmJiB0aGlzLmRhdGVTZXJ2aWNlLmNvbXBhcmVEYXRlcyh0aGlzLm1vbnRoU3RhcnQoKSwgdGhpcy5tYXgpID4gMDtcbiAgfVxuXG4gIHByb3RlY3RlZCBtb250aFN0YXJ0KCk6IEQge1xuICAgIHJldHVybiB0aGlzLmRhdGVTZXJ2aWNlLmdldE1vbnRoU3RhcnQodGhpcy5kYXRlKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBtb250aEVuZCgpOiBEIHtcbiAgICByZXR1cm4gdGhpcy5kYXRlU2VydmljZS5nZXRNb250aEVuZCh0aGlzLmRhdGUpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGlzSW5SYWdlKGRhdGU6IEQsIHJhbmdlOiBOYkNhbGVuZGFyUmFuZ2U8RD4pOiBib29sZWFuIHtcbiAgICBpZiAocmFuZ2Uuc3RhcnQgJiYgcmFuZ2UuZW5kKSB7XG4gICAgICBjb25zdCBjZWxsRGF0ZSA9IHRoaXMuZGF0ZVNlcnZpY2UuZ2V0TW9udGhTdGFydChkYXRlKTtcbiAgICAgIGNvbnN0IHN0YXJ0ID0gdGhpcy5kYXRlU2VydmljZS5nZXRNb250aFN0YXJ0KHJhbmdlLnN0YXJ0KTtcbiAgICAgIGNvbnN0IGVuZCA9IHRoaXMuZGF0ZVNlcnZpY2UuZ2V0TW9udGhTdGFydChyYW5nZS5lbmQpO1xuXG4gICAgICBjb25zdCBpc0dyZWF0ZXJUaGFuU3RhcnQgPSB0aGlzLmRhdGVTZXJ2aWNlLmNvbXBhcmVEYXRlcyhjZWxsRGF0ZSwgc3RhcnQpID49IDA7XG4gICAgICBjb25zdCBpc0xlc3NUaGFuRW5kID0gdGhpcy5kYXRlU2VydmljZS5jb21wYXJlRGF0ZXMoY2VsbERhdGUsIGVuZCkgPD0gMDtcblxuICAgICAgcmV0dXJuIGlzR3JlYXRlclRoYW5TdGFydCAmJiBpc0xlc3NUaGFuRW5kO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmRhdGVTZXJ2aWNlLmlzU2FtZU1vbnRoKGRhdGUsIHJhbmdlLnN0YXJ0KTtcbiAgfVxufVxuIl19