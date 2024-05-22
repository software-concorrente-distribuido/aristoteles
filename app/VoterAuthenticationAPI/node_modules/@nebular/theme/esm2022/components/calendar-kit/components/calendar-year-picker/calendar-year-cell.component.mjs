/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, HostListener, Input, Output, } from '@angular/core';
import { NbCalendarSize } from '../../model';
import * as i0 from "@angular/core";
import * as i1 from "../../services/date.service";
export class NbCalendarYearCellComponent {
    constructor(dateService) {
        this.dateService = dateService;
        this.size = NbCalendarSize.MEDIUM;
        this.select = new EventEmitter(true);
        this.yearCellClass = true;
    }
    get selected() {
        return this.dateService.isSameYearSafe(this.date, this.selectedValue);
    }
    get today() {
        return this.dateService.isSameYearSafe(this.date, this.dateService.today());
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbCalendarYearCellComponent, deps: [{ token: i1.NbDateService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.1.0", type: NbCalendarYearCellComponent, selector: "nb-calendar-year-cell", inputs: { date: "date", min: "min", max: "max", selectedValue: "selectedValue", size: "size" }, outputs: { select: "select" }, host: { listeners: { "click": "onClick()" }, properties: { "class.selected": "this.selected", "class.today": "this.today", "class.disabled": "this.disabled", "class.size-large": "this.isLarge", "class.year-cell": "this.yearCellClass" } }, ngImport: i0, template: `
    <div class="cell-content">
      {{ year }}
    </div>
  `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbCalendarYearCellComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nb-calendar-year-cell',
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
            }], onClick: [{
                type: HostListener,
                args: ['click']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIteWVhci1jZWxsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9mcmFtZXdvcmsvdGhlbWUvY29tcG9uZW50cy9jYWxlbmRhci1raXQvY29tcG9uZW50cy9jYWxlbmRhci15ZWFyLXBpY2tlci9jYWxlbmRhci15ZWFyLWNlbGwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxZQUFZLEVBQ1osV0FBVyxFQUNYLFlBQVksRUFDWixLQUFLLEVBQ0wsTUFBTSxHQUNQLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBa0IsY0FBYyxFQUF3QixNQUFNLGFBQWEsQ0FBQzs7O0FBWW5GLE1BQU0sT0FBTywyQkFBMkI7SUFjdEMsWUFBc0IsV0FBNkI7UUFBN0IsZ0JBQVcsR0FBWCxXQUFXLENBQWtCO1FBTDFDLFNBQUksR0FBbUIsY0FBYyxDQUFDLE1BQU0sQ0FBQztRQUc1QyxXQUFNLEdBQW9CLElBQUksWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBdUIzRCxrQkFBYSxHQUFHLElBQUksQ0FBQztJQXBCckIsQ0FBQztJQUVELElBQW1DLFFBQVE7UUFDekMsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUN4RSxDQUFDO0lBRUQsSUFBZ0MsS0FBSztRQUNuQyxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO0lBQzlFLENBQUM7SUFFRCxJQUFtQyxRQUFRO1FBQ3pDLE9BQU8sSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUN4RCxDQUFDO0lBRUQsSUFDSSxPQUFPO1FBQ1QsT0FBTyxJQUFJLENBQUMsSUFBSSxLQUFLLGNBQWMsQ0FBQyxLQUFLLENBQUM7SUFDNUMsQ0FBQztJQUtELElBQUksSUFBSTtRQUNOLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFHRCxPQUFPO1FBQ0wsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDbEIsT0FBTztRQUNULENBQUM7UUFFRCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUVPLGNBQWM7UUFDcEIsT0FBTyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDOUYsQ0FBQztJQUVPLGNBQWM7UUFDcEIsT0FBTyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDaEcsQ0FBQztJQUVPLFNBQVM7UUFDZixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRU8sT0FBTztRQUNiLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hELENBQUM7OEdBaEVVLDJCQUEyQjtrR0FBM0IsMkJBQTJCLDJhQVA1Qjs7OztHQUlUOzsyRkFHVSwyQkFBMkI7a0JBVHZDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLHVCQUF1QjtvQkFDakMsUUFBUSxFQUFFOzs7O0dBSVQ7b0JBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07aUJBQ2hEO2tGQUVVLElBQUk7c0JBQVosS0FBSztnQkFFRyxHQUFHO3NCQUFYLEtBQUs7Z0JBRUcsR0FBRztzQkFBWCxLQUFLO2dCQUVHLGFBQWE7c0JBQXJCLEtBQUs7Z0JBRUcsSUFBSTtzQkFBWixLQUFLO2dCQUdJLE1BQU07c0JBQWYsTUFBTTtnQkFLNEIsUUFBUTtzQkFBMUMsV0FBVzt1QkFBQyxnQkFBZ0I7Z0JBSUcsS0FBSztzQkFBcEMsV0FBVzt1QkFBQyxhQUFhO2dCQUlTLFFBQVE7c0JBQTFDLFdBQVc7dUJBQUMsZ0JBQWdCO2dCQUt6QixPQUFPO3NCQURWLFdBQVc7dUJBQUMsa0JBQWtCO2dCQU0vQixhQUFhO3NCQURaLFdBQVc7dUJBQUMsaUJBQWlCO2dCQVE5QixPQUFPO3NCQUROLFlBQVk7dUJBQUMsT0FBTyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBBa3Zlby4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0QmluZGluZyxcbiAgSG9zdExpc3RlbmVyLFxuICBJbnB1dCxcbiAgT3V0cHV0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5iRGF0ZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9kYXRlLnNlcnZpY2UnO1xuaW1wb3J0IHsgTmJDYWxlbmRhckNlbGwsIE5iQ2FsZW5kYXJTaXplLCBOYkNhbGVuZGFyU2l6ZVZhbHVlcyB9IGZyb20gJy4uLy4uL21vZGVsJztcblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduYi1jYWxlbmRhci15ZWFyLWNlbGwnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJjZWxsLWNvbnRlbnRcIj5cbiAgICAgIHt7IHllYXIgfX1cbiAgICA8L2Rpdj5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE5iQ2FsZW5kYXJZZWFyQ2VsbENvbXBvbmVudDxEPiBpbXBsZW1lbnRzIE5iQ2FsZW5kYXJDZWxsPEQsIEQ+IHtcbiAgQElucHV0KCkgZGF0ZTogRDtcblxuICBASW5wdXQoKSBtaW46IEQ7XG5cbiAgQElucHV0KCkgbWF4OiBEO1xuXG4gIEBJbnB1dCgpIHNlbGVjdGVkVmFsdWU6IEQ7XG5cbiAgQElucHV0KCkgc2l6ZTogTmJDYWxlbmRhclNpemUgPSBOYkNhbGVuZGFyU2l6ZS5NRURJVU07XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9zaXplOiBOYkNhbGVuZGFyU2l6ZVZhbHVlcztcblxuICBAT3V0cHV0KCkgc2VsZWN0OiBFdmVudEVtaXR0ZXI8RD4gPSBuZXcgRXZlbnRFbWl0dGVyKHRydWUpO1xuXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBkYXRlU2VydmljZTogTmJEYXRlU2VydmljZTxEPikge1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5zZWxlY3RlZCcpIGdldCBzZWxlY3RlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5kYXRlU2VydmljZS5pc1NhbWVZZWFyU2FmZSh0aGlzLmRhdGUsIHRoaXMuc2VsZWN0ZWRWYWx1ZSk7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnRvZGF5JykgZ2V0IHRvZGF5KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmRhdGVTZXJ2aWNlLmlzU2FtZVllYXJTYWZlKHRoaXMuZGF0ZSwgdGhpcy5kYXRlU2VydmljZS50b2RheSgpKTtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3MuZGlzYWJsZWQnKSBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc21hbGxlclRoYW5NaW4oKSB8fCB0aGlzLmdyZWF0ZXJUaGFuTWF4KCk7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnNpemUtbGFyZ2UnKVxuICBnZXQgaXNMYXJnZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5zaXplID09PSBOYkNhbGVuZGFyU2l6ZS5MQVJHRTtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3MueWVhci1jZWxsJylcbiAgeWVhckNlbGxDbGFzcyA9IHRydWU7XG5cbiAgZ2V0IHllYXIoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5kYXRlU2VydmljZS5nZXRZZWFyKHRoaXMuZGF0ZSk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdjbGljaycpXG4gIG9uQ2xpY2soKSB7XG4gICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnNlbGVjdC5lbWl0KHRoaXMuZGF0ZSk7XG4gIH1cblxuICBwcml2YXRlIHNtYWxsZXJUaGFuTWluKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmRhdGUgJiYgdGhpcy5taW4gJiYgdGhpcy5kYXRlU2VydmljZS5jb21wYXJlRGF0ZXModGhpcy55ZWFyRW5kKCksIHRoaXMubWluKSA8IDA7XG4gIH1cblxuICBwcml2YXRlIGdyZWF0ZXJUaGFuTWF4KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmRhdGUgJiYgdGhpcy5tYXggJiYgdGhpcy5kYXRlU2VydmljZS5jb21wYXJlRGF0ZXModGhpcy55ZWFyU3RhcnQoKSwgdGhpcy5tYXgpID4gMDtcbiAgfVxuXG4gIHByaXZhdGUgeWVhclN0YXJ0KCk6IEQge1xuICAgIHJldHVybiB0aGlzLmRhdGVTZXJ2aWNlLmdldFllYXJTdGFydCh0aGlzLmRhdGUpO1xuICB9XG5cbiAgcHJpdmF0ZSB5ZWFyRW5kKCk6IEQge1xuICAgIHJldHVybiB0aGlzLmRhdGVTZXJ2aWNlLmdldFllYXJFbmQodGhpcy5kYXRlKTtcbiAgfVxufVxuIl19