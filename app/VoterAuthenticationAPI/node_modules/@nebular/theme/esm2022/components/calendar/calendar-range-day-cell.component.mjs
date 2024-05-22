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
export class NbCalendarRangeDayCellComponent extends NbBaseCalendarRangeCell {
    constructor(dateService) {
        super();
        this.dateService = dateService;
        this.size = NbCalendarSize.MEDIUM;
        this.select = new EventEmitter(true);
        this.rangeCellClass = true;
        this.dayCellClass = true;
    }
    get inRange() {
        if (this.date && this.hasRange) {
            return this.isInRange(this.date, this.selectedValue);
        }
        return false;
    }
    get start() {
        return this.date && this.hasRange && this.dateService.isSameDay(this.date, this.selectedValue.start);
    }
    get end() {
        return this.date && this.hasRange && this.dateService.isSameDay(this.date, this.selectedValue.end);
    }
    get today() {
        return this.date && this.dateService.isSameDay(this.date, this.dateService.today());
    }
    get boundingMonth() {
        return !this.dateService.isSameMonthSafe(this.date, this.visibleDate);
    }
    get selected() {
        if (this.inRange) {
            return true;
        }
        if (this.selectedValue) {
            return this.dateService.isSameDaySafe(this.date, this.selectedValue.start);
        }
        return false;
    }
    get empty() {
        return !this.date;
    }
    get disabled() {
        return this.smallerThanMin() || this.greaterThanMax() || this.dontFitFilter();
    }
    get isLarge() {
        return this.size === NbCalendarSize.LARGE;
    }
    get day() {
        return this.date && this.dateService.getDate(this.date);
    }
    onClick() {
        if (this.disabled || this.empty) {
            return;
        }
        this.select.emit(this.date);
    }
    smallerThanMin() {
        return this.date && this.min && this.dateService.compareDates(this.date, this.min) < 0;
    }
    greaterThanMax() {
        return this.date && this.max && this.dateService.compareDates(this.date, this.max) > 0;
    }
    dontFitFilter() {
        return this.date && this.filter && !this.filter(this.date);
    }
    isInRange(date, { start, end }) {
        const isGreaterThanStart = this.dateService.compareDates(this.date, start) >= 0;
        const isLessThanEnd = this.dateService.compareDates(this.date, end) <= 0;
        return isGreaterThanStart && isLessThanEnd;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbCalendarRangeDayCellComponent, deps: [{ token: i1.NbDateService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.1.0", type: NbCalendarRangeDayCellComponent, selector: "nb-calendar-range-day-cell", inputs: { date: "date", selectedValue: "selectedValue", visibleDate: "visibleDate", min: "min", max: "max", filter: "filter", size: "size" }, outputs: { select: "select" }, host: { listeners: { "click": "onClick()" }, properties: { "class.in-range": "this.inRange", "class.start": "this.start", "class.end": "this.end", "class.range-cell": "this.rangeCellClass", "class.day-cell": "this.dayCellClass", "class.today": "this.today", "class.bounding-month": "this.boundingMonth", "class.selected": "this.selected", "class.empty": "this.empty", "class.disabled": "this.disabled", "class.size-large": "this.isLarge" } }, usesInheritance: true, ngImport: i0, template: `
    <div class="cell-content">{{ day }}</div>
  `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbCalendarRangeDayCellComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nb-calendar-range-day-cell',
                    template: `
    <div class="cell-content">{{ day }}</div>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], ctorParameters: () => [{ type: i1.NbDateService }], propDecorators: { date: [{
                type: Input
            }], selectedValue: [{
                type: Input
            }], visibleDate: [{
                type: Input
            }], min: [{
                type: Input
            }], max: [{
                type: Input
            }], filter: [{
                type: Input
            }], size: [{
                type: Input
            }], select: [{
                type: Output
            }], inRange: [{
                type: HostBinding,
                args: ['class.in-range']
            }], start: [{
                type: HostBinding,
                args: ['class.start']
            }], end: [{
                type: HostBinding,
                args: ['class.end']
            }], rangeCellClass: [{
                type: HostBinding,
                args: ['class.range-cell']
            }], dayCellClass: [{
                type: HostBinding,
                args: ['class.day-cell']
            }], today: [{
                type: HostBinding,
                args: ['class.today']
            }], boundingMonth: [{
                type: HostBinding,
                args: ['class.bounding-month']
            }], selected: [{
                type: HostBinding,
                args: ['class.selected']
            }], empty: [{
                type: HostBinding,
                args: ['class.empty']
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItcmFuZ2UtZGF5LWNlbGwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2ZyYW1ld29yay90aGVtZS9jb21wb25lbnRzL2NhbGVuZGFyL2NhbGVuZGFyLXJhbmdlLWRheS1jZWxsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUNMLFNBQVMsRUFDVCx1QkFBdUIsRUFDdkIsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBQ1osV0FBVyxFQUNYLFlBQVksR0FDYixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQWtCLGNBQWMsRUFBd0IsTUFBTSx1QkFBdUIsQ0FBQztBQUc3RixPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQzs7O0FBU3JFLE1BQU0sT0FBTywrQkFBbUMsU0FBUSx1QkFBMEI7SUFtQmhGLFlBQXNCLFdBQTZCO1FBQ2pELEtBQUssRUFBRSxDQUFDO1FBRFksZ0JBQVcsR0FBWCxXQUFXLENBQWtCO1FBTDFDLFNBQUksR0FBbUIsY0FBYyxDQUFDLE1BQU0sQ0FBQztRQUc1QyxXQUFNLEdBQW9CLElBQUksWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBMEIzRCxtQkFBYyxHQUFHLElBQUksQ0FBQztRQUd0QixpQkFBWSxHQUFHLElBQUksQ0FBQztJQXpCcEIsQ0FBQztJQUVELElBQ0ksT0FBTztRQUNULElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDL0IsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3ZELENBQUM7UUFFRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFRCxJQUNJLEtBQUs7UUFDUCxPQUFPLElBQUksQ0FBQyxJQUFJLElBQUksSUFB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WCxXQUFXO3VCQUFDLGdCQUFnQjtnQkFNekIsT0FBTztzQkFEVixXQUFXO3VCQUFDLGtCQUFrQjtnQkFVL0IsT0FBTztzQkFETixZQUFZO3VCQUFDLE9BQU8iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgQWt2ZW8uIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICovXG5cbmltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgSG9zdEJpbmRpbmcsXG4gIEhvc3RMaXN0ZW5lcixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE5iQ2FsZW5kYXJDZWxsLCBOYkNhbGVuZGFyU2l6ZSwgTmJDYWxlbmRhclNpemVWYWx1ZXMgfSBmcm9tICcuLi9jYWxlbmRhci1raXQvbW9kZWwnO1xuaW1wb3J0IHsgTmJDYWxlbmRhclJhbmdlIH0gZnJvbSAnLi9jYWxlbmRhci1yYW5nZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgTmJEYXRlU2VydmljZSB9IGZyb20gJy4uL2NhbGVuZGFyLWtpdC9zZXJ2aWNlcy9kYXRlLnNlcnZpY2UnO1xuaW1wb3J0IHsgTmJCYXNlQ2FsZW5kYXJSYW5nZUNlbGwgfSBmcm9tICcuL2Jhc2UtY2FsZW5kYXItcmFuZ2UtY2VsbCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25iLWNhbGVuZGFyLXJhbmdlLWRheS1jZWxsJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwiY2VsbC1jb250ZW50XCI+e3sgZGF5IH19PC9kaXY+XG4gIGAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBOYkNhbGVuZGFyUmFuZ2VEYXlDZWxsQ29tcG9uZW50PEQ+IGV4dGVuZHMgTmJCYXNlQ2FsZW5kYXJSYW5nZUNlbGw8RD5cbiAgaW1wbGVtZW50cyBOYkNhbGVuZGFyQ2VsbDxELCBOYkNhbGVuZGFyUmFuZ2U8RD4+IHtcbiAgQElucHV0KCkgZGF0ZTogRDtcblxuICBASW5wdXQoKSBzZWxlY3RlZFZhbHVlOiBOYkNhbGVuZGFyUmFuZ2U8RD47XG5cbiAgQElucHV0KCkgdmlzaWJsZURhdGU6IEQ7XG5cbiAgQElucHV0KCkgbWluOiBEO1xuXG4gIEBJbnB1dCgpIG1heDogRDtcblxuICBASW5wdXQoKSBmaWx0ZXI6IChEKSA9PiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIHNpemU6IE5iQ2FsZW5kYXJTaXplID0gTmJDYWxlbmRhclNpemUuTUVESVVNO1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfc2l6ZTogTmJDYWxlbmRhclNpemVWYWx1ZXM7XG5cbiAgQE91dHB1dCgpIHNlbGVjdDogRXZlbnRFbWl0dGVyPEQ+ID0gbmV3IEV2ZW50RW1pdHRlcih0cnVlKTtcblxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgZGF0ZVNlcnZpY2U6IE5iRGF0ZVNlcnZpY2U8RD4pIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5pbi1yYW5nZScpXG4gIGdldCBpblJhbmdlKCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLmRhdGUgJiYgdGhpcy5oYXNSYW5nZSkge1xuICAgICAgcmV0dXJuIHRoaXMuaXNJblJhbmdlKHRoaXMuZGF0ZSwgdGhpcy5zZWxlY3RlZFZhbHVlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnN0YXJ0JylcbiAgZ2V0IHN0YXJ0KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmRhdGUgJiYgdGhpcy5oYXNSYW5nZSAmJiB0aGlzLmRhdGVTZXJ2aWNlLmlzU2FtZURheSh0aGlzLmRhdGUsIHRoaXMuc2VsZWN0ZWRWYWx1ZS5zdGFydCk7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmVuZCcpXG4gIGdldCBlbmQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZGF0ZSAmJiB0aGlzLmhhc1JhbmdlICYmIHRoaXMuZGF0ZVNlcnZpY2UuaXNTYW1lRGF5KHRoaXMuZGF0ZSwgdGhpcy5zZWxlY3RlZFZhbHVlLmVuZCk7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnJhbmdlLWNlbGwnKVxuICByYW5nZUNlbGxDbGFzcyA9IHRydWU7XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5kYXktY2VsbCcpXG4gIGRheUNlbGxDbGFzcyA9IHRydWU7XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy50b2RheScpXG4gIGdldCB0b2RheSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5kYXRlICYmIHRoaXMuZGF0ZVNlcnZpY2UuaXNTYW1lRGF5KHRoaXMuZGF0ZSwgdGhpcy5kYXRlU2VydmljZS50b2RheSgpKTtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3MuYm91bmRpbmctbW9udGgnKVxuICBnZXQgYm91bmRpbmdNb250aCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gIXRoaXMuZGF0ZVNlcnZpY2UuaXNTYW1lTW9udGhTYWZlKHRoaXMuZGF0ZSwgdGhpcy52aXNpYmxlRGF0ZSk7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnNlbGVjdGVkJylcbiAgZ2V0IHNlbGVjdGVkKCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLmluUmFuZ2UpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnNlbGVjdGVkVmFsdWUpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGVTZXJ2aWNlLmlzU2FtZURheVNhZmUodGhpcy5kYXRlLCB0aGlzLnNlbGVjdGVkVmFsdWUuc3RhcnQpO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3MuZW1wdHknKVxuICBnZXQgZW1wdHkoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICF0aGlzLmRhdGU7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmRpc2FibGVkJylcbiAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnNtYWxsZXJUaGFuTWluKCkgfHwgdGhpcy5ncmVhdGVyVGhhbk1heCgpIHx8IHRoaXMuZG9udEZpdEZpbHRlcigpO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5zaXplLWxhcmdlJylcbiAgZ2V0IGlzTGFyZ2UoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc2l6ZSA9PT0gTmJDYWxlbmRhclNpemUuTEFSR0U7XG4gIH1cblxuICBnZXQgZGF5KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuZGF0ZSAmJiB0aGlzLmRhdGVTZXJ2aWNlLmdldERhdGUodGhpcy5kYXRlKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJylcbiAgb25DbGljaygpIHtcbiAgICBpZiAodGhpcy5kaXNhYmxlZCB8fCB0aGlzLmVtcHR5KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5zZWxlY3QuZW1pdCh0aGlzLmRhdGUpO1xuICB9XG5cbiAgcHJvdGVjdGVkIHNtYWxsZXJUaGFuTWluKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmRhdGUgJiYgdGhpcy5taW4gJiYgdGhpcy5kYXRlU2VydmljZS5jb21wYXJlRGF0ZXModGhpcy5kYXRlLCB0aGlzLm1pbikgPCAwO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdyZWF0ZXJUaGFuTWF4KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmRhdGUgJiYgdGhpcy5tYXggJiYgdGhpcy5kYXRlU2VydmljZS5jb21wYXJlRGF0ZXModGhpcy5kYXRlLCB0aGlzLm1heCkgPiAwO1xuICB9XG5cbiAgcHJvdGVjdGVkIGRvbnRGaXRGaWx0ZXIoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZGF0ZSAmJiB0aGlzLmZpbHRlciAmJiAhdGhpcy5maWx0ZXIodGhpcy5kYXRlKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBpc0luUmFuZ2UoZGF0ZTogRCwgeyBzdGFydCwgZW5kIH06IE5iQ2FsZW5kYXJSYW5nZTxEPik6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGlzR3JlYXRlclRoYW5TdGFydCA9IHRoaXMuZGF0ZVNlcnZpY2UuY29tcGFyZURhdGVzKHRoaXMuZGF0ZSwgc3RhcnQpID49IDA7XG4gICAgY29uc3QgaXNMZXNzVGhhbkVuZCA9IHRoaXMuZGF0ZVNlcnZpY2UuY29tcGFyZURhdGVzKHRoaXMuZGF0ZSwgZW5kKSA8PSAwO1xuXG4gICAgcmV0dXJuIGlzR3JlYXRlclRoYW5TdGFydCAmJiBpc0xlc3NUaGFuRW5kO1xuICB9XG59XG4iXX0=