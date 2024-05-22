/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, HostListener, Input, Output, } from '@angular/core';
import { NbCalendarSize } from '../../model';
import * as i0 from "@angular/core";
import * as i1 from "../../services/date.service";
export class NbCalendarDayCellComponent {
    constructor(dateService) {
        this.dateService = dateService;
        this.size = NbCalendarSize.MEDIUM;
        this.select = new EventEmitter(true);
        this.dayCellClass = true;
    }
    get today() {
        return this.dateService.isSameDaySafe(this.date, this.dateService.today());
    }
    get boundingMonth() {
        return !this.dateService.isSameMonthSafe(this.date, this.visibleDate);
    }
    get selected() {
        return this.dateService.isSameDaySafe(this.date, this.selectedValue);
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbCalendarDayCellComponent, deps: [{ token: i1.NbDateService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.1.0", type: NbCalendarDayCellComponent, selector: "nb-calendar-day-cell", inputs: { date: "date", selectedValue: "selectedValue", visibleDate: "visibleDate", min: "min", max: "max", filter: "filter", size: "size" }, outputs: { select: "select" }, host: { listeners: { "click": "onClick()" }, properties: { "class.today": "this.today", "class.bounding-month": "this.boundingMonth", "class.selected": "this.selected", "class.empty": "this.empty", "class.disabled": "this.disabled", "class.size-large": "this.isLarge", "class.day-cell": "this.dayCellClass" } }, ngImport: i0, template: `
    <div class="cell-content">
      {{ day }}
    </div>
  `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbCalendarDayCellComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nb-calendar-day-cell',
                    template: `
    <div class="cell-content">
      {{ day }}
    </div>
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
            }], dayCellClass: [{
                type: HostBinding,
                args: ['class.day-cell']
            }], onClick: [{
                type: HostListener,
                args: ['click']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItZGF5LWNlbGwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2ZyYW1ld29yay90aGVtZS9jb21wb25lbnRzL2NhbGVuZGFyLWtpdC9jb21wb25lbnRzL2NhbGVuZGFyLWRheS1waWNrZXIvY2FsZW5kYXItZGF5LWNlbGwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxZQUFZLEVBQ1osV0FBVyxFQUNYLFlBQVksRUFDWixLQUFLLEVBQ0wsTUFBTSxHQUNQLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBa0IsY0FBYyxFQUF3QixNQUFNLGFBQWEsQ0FBQzs7O0FBYW5GLE1BQU0sT0FBTywwQkFBMEI7SUFtQnJDLFlBQXNCLFdBQTZCO1FBQTdCLGdCQUFXLEdBQVgsV0FBVyxDQUFrQjtRQUwxQyxTQUFJLEdBQW1CLGNBQWMsQ0FBQyxNQUFNLENBQUM7UUFHNUMsV0FBTSxHQUFvQixJQUFJLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQStCM0QsaUJBQVksR0FBRyxJQUFJLENBQUM7SUE1QnBCLENBQUM7SUFFRCxJQUFnQyxLQUFLO1FBQ25DLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7SUFDN0UsQ0FBQztJQUVELElBQXlDLGFBQWE7UUFDcEQsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3hFLENBQUM7SUFFRCxJQUFtQyxRQUFRO1FBQ3pDLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUVELElBQWdDLEtBQUs7UUFDbkMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDcEIsQ0FBQztJQUVELElBQW1DLFFBQVE7UUFDekMsT0FBTyxJQUFJLENBQUMsY0FBYyxFQUFFLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUNoRixDQUFDO0lBRUQsSUFDSSxPQUFPO1FBQ1QsT0FBTyxJQUFJLENBQUMsSUFBSSxLQUFLLGNBQWMsQ0FBQyxLQUFLLENBQUM7SUFDNUMsQ0FBQztJQUtELElBQUksR0FBRztRQUNMLE9BQU8sSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUdELE9BQU87UUFDTCxJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2hDLE9BQU87UUFDVCxDQUFDO1FBRUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFTyxjQUFjO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN6RixDQUFDO0lBRU8sY0FBYztRQUNwQixPQUFPLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDekYsQ0FBQztJQUVPLGFBQWE7UUFDbkIsT0FBTyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3RCxDQUFDOzhHQXpFVSwwQkFBMEI7a0dBQTFCLDBCQUEwQixpaUJBUDNCOzs7O0dBSVQ7OzJGQUdVLDBCQUEwQjtrQkFUdEMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsc0JBQXNCO29CQUNoQyxRQUFRLEVBQUU7Ozs7R0FJVDtvQkFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtpQkFDaEQ7a0ZBR1UsSUFBSTtzQkFBWixLQUFLO2dCQUVHLGFBQWE7c0JBQXJCLEtBQUs7Z0JBRUcsV0FBVztzQkFBbkIsS0FBSztnQkFFRyxHQUFHO3NCQUFYLEtBQUs7Z0JBRUcsR0FBRztzQkFBWCxLQUFLO2dCQUVHLE1BQU07c0JBQWQsS0FBSztnQkFFRyxJQUFJO3NCQUFaLEtBQUs7Z0JBR0ksTUFBTTtzQkFBZixNQUFNO2dCQUt5QixLQUFLO3NCQUFwQyxXQUFXO3VCQUFDLGFBQWE7Z0JBSWUsYUFBYTtzQkFBckQsV0FBVzt1QkFBQyxzQkFBc0I7Z0JBSUEsUUFBUTtzQkFBMUMsV0FBVzt1QkFBQyxnQkFBZ0I7Z0JBSUcsS0FBSztzQkFBcEMsV0FBVzt1QkFBQyxhQUFhO2dCQUlTLFFBQVE7c0JBQTFDLFdBQVc7dUJBQUMsZ0JBQWdCO2dCQUt6QixPQUFPO3NCQURWLFdBQVc7dUJBQUMsa0JBQWtCO2dCQU0vQixZQUFZO3NCQURYLFdBQVc7dUJBQUMsZ0JBQWdCO2dCQVE3QixPQUFPO3NCQUROLFlBQVk7dUJBQUMsT0FBTyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBBa3Zlby4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0QmluZGluZyxcbiAgSG9zdExpc3RlbmVyLFxuICBJbnB1dCxcbiAgT3V0cHV0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTmJDYWxlbmRhckNlbGwsIE5iQ2FsZW5kYXJTaXplLCBOYkNhbGVuZGFyU2l6ZVZhbHVlcyB9IGZyb20gJy4uLy4uL21vZGVsJztcbmltcG9ydCB7IE5iRGF0ZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9kYXRlLnNlcnZpY2UnO1xuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25iLWNhbGVuZGFyLWRheS1jZWxsJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwiY2VsbC1jb250ZW50XCI+XG4gICAgICB7eyBkYXkgfX1cbiAgICA8L2Rpdj5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE5iQ2FsZW5kYXJEYXlDZWxsQ29tcG9uZW50PEQ+IGltcGxlbWVudHMgTmJDYWxlbmRhckNlbGw8RCwgRD4ge1xuXG4gIEBJbnB1dCgpIGRhdGU6IEQ7XG5cbiAgQElucHV0KCkgc2VsZWN0ZWRWYWx1ZTogRDtcblxuICBASW5wdXQoKSB2aXNpYmxlRGF0ZTogRDtcblxuICBASW5wdXQoKSBtaW46IEQ7XG5cbiAgQElucHV0KCkgbWF4OiBEO1xuXG4gIEBJbnB1dCgpIGZpbHRlcjogKEQpID0+IGJvb2xlYW47XG5cbiAgQElucHV0KCkgc2l6ZTogTmJDYWxlbmRhclNpemUgPSBOYkNhbGVuZGFyU2l6ZS5NRURJVU07XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9zaXplOiBOYkNhbGVuZGFyU2l6ZVZhbHVlcztcblxuICBAT3V0cHV0KCkgc2VsZWN0OiBFdmVudEVtaXR0ZXI8RD4gPSBuZXcgRXZlbnRFbWl0dGVyKHRydWUpO1xuXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBkYXRlU2VydmljZTogTmJEYXRlU2VydmljZTxEPikge1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy50b2RheScpIGdldCB0b2RheSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5kYXRlU2VydmljZS5pc1NhbWVEYXlTYWZlKHRoaXMuZGF0ZSwgdGhpcy5kYXRlU2VydmljZS50b2RheSgpKTtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3MuYm91bmRpbmctbW9udGgnKSBnZXQgYm91bmRpbmdNb250aCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gIXRoaXMuZGF0ZVNlcnZpY2UuaXNTYW1lTW9udGhTYWZlKHRoaXMuZGF0ZSwgdGhpcy52aXNpYmxlRGF0ZSk7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnNlbGVjdGVkJykgZ2V0IHNlbGVjdGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmRhdGVTZXJ2aWNlLmlzU2FtZURheVNhZmUodGhpcy5kYXRlLCB0aGlzLnNlbGVjdGVkVmFsdWUpO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5lbXB0eScpIGdldCBlbXB0eSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gIXRoaXMuZGF0ZTtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3MuZGlzYWJsZWQnKSBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc21hbGxlclRoYW5NaW4oKSB8fCB0aGlzLmdyZWF0ZXJUaGFuTWF4KCkgfHwgdGhpcy5kb250Rml0RmlsdGVyKCk7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnNpemUtbGFyZ2UnKVxuICBnZXQgaXNMYXJnZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5zaXplID09PSBOYkNhbGVuZGFyU2l6ZS5MQVJHRTtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3MuZGF5LWNlbGwnKVxuICBkYXlDZWxsQ2xhc3MgPSB0cnVlO1xuXG4gIGdldCBkYXkoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5kYXRlICYmIHRoaXMuZGF0ZVNlcnZpY2UuZ2V0RGF0ZSh0aGlzLmRhdGUpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKVxuICBvbkNsaWNrKCkge1xuICAgIGlmICh0aGlzLmRpc2FibGVkIHx8IHRoaXMuZW1wdHkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnNlbGVjdC5lbWl0KHRoaXMuZGF0ZSk7XG4gIH1cblxuICBwcml2YXRlIHNtYWxsZXJUaGFuTWluKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmRhdGUgJiYgdGhpcy5taW4gJiYgdGhpcy5kYXRlU2VydmljZS5jb21wYXJlRGF0ZXModGhpcy5kYXRlLCB0aGlzLm1pbikgPCAwO1xuICB9XG5cbiAgcHJpdmF0ZSBncmVhdGVyVGhhbk1heCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5kYXRlICYmIHRoaXMubWF4ICYmIHRoaXMuZGF0ZVNlcnZpY2UuY29tcGFyZURhdGVzKHRoaXMuZGF0ZSwgdGhpcy5tYXgpID4gMDtcbiAgfVxuXG4gIHByaXZhdGUgZG9udEZpdEZpbHRlcigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5kYXRlICYmIHRoaXMuZmlsdGVyICYmICF0aGlzLmZpbHRlcih0aGlzLmRhdGUpO1xuICB9XG59XG4iXX0=