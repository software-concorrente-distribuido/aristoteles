/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, HostListener, Input, Output, } from '@angular/core';
import { NbCalendarSize } from '../../model';
import * as i0 from "@angular/core";
import * as i1 from "../../services/date.service";
export class NbCalendarMonthCellComponent {
    constructor(dateService) {
        this.dateService = dateService;
        this.size = NbCalendarSize.MEDIUM;
        this.select = new EventEmitter(true);
        this.monthCellClass = true;
    }
    get selected() {
        return this.dateService.isSameMonthSafe(this.date, this.selectedValue);
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
    get month() {
        return this.dateService.getMonthName(this.date);
    }
    onClick() {
        if (this.disabled) {
            return;
        }
        this.select.emit(this.date);
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbCalendarMonthCellComponent, deps: [{ token: i1.NbDateService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.1.0", type: NbCalendarMonthCellComponent, selector: "nb-calendar-month-cell", inputs: { date: "date", selectedValue: "selectedValue", min: "min", max: "max", size: "size" }, outputs: { select: "select" }, host: { listeners: { "click": "onClick()" }, properties: { "class.selected": "this.selected", "class.today": "this.today", "class.disabled": "this.disabled", "class.size-large": "this.isLarge", "class.month-cell": "this.monthCellClass" } }, ngImport: i0, template: `
    <div class="cell-content">
      {{ month }}
    </div>
  `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbCalendarMonthCellComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nb-calendar-month-cell',
                    template: `
    <div class="cell-content">
      {{ month }}
    </div>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], ctorParameters: () => [{ type: i1.NbDateService }], propDecorators: { date: [{
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
            }], monthCellClass: [{
                type: HostBinding,
                args: ['class.month-cell']
            }], onClick: [{
                type: HostListener,
                args: ['click']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItbW9udGgtY2VsbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvZnJhbWV3b3JrL3RoZW1lL2NvbXBvbmVudHMvY2FsZW5kYXIta2l0L2NvbXBvbmVudHMvY2FsZW5kYXItbW9udGgtcGlja2VyL2NhbGVuZGFyLW1vbnRoLWNlbGwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxZQUFZLEVBQ1osV0FBVyxFQUNYLFlBQVksRUFDWixLQUFLLEVBQ0wsTUFBTSxHQUNQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBa0IsY0FBYyxFQUF3QixNQUFNLGFBQWEsQ0FBQzs7O0FBYW5GLE1BQU0sT0FBTyw0QkFBNEI7SUFjdkMsWUFBb0IsV0FBNkI7UUFBN0IsZ0JBQVcsR0FBWCxXQUFXLENBQWtCO1FBTHhDLFNBQUksR0FBbUIsY0FBYyxDQUFDLE1BQU0sQ0FBQztRQUc1QyxXQUFNLEdBQW9CLElBQUksWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBdUIzRCxtQkFBYyxHQUFHLElBQUksQ0FBQztJQXBCdEIsQ0FBQztJQUVELElBQW1DLFFBQVE7UUFDekMsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUN6RSxDQUFDO0lBRUQsSUFBZ0MsS0FBSztRQUNuQyxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO0lBQy9FLENBQUM7SUFFRCxJQUFtQyxRQUFRO1FBQ3pDLE9BQU8sSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUN4RCxDQUFDO0lBRUQsSUFDSSxPQUFPO1FBQ1QsT0FBTyxJQUFJLENBQUMsSUFBSSxLQUFLLGNBQWMsQ0FBQyxLQUFLLENBQUM7SUFDNUMsQ0FBQztJQUtELElBQUksS0FBSztRQUNQLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFHRCxPQUFPO1FBQ0wsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDbEIsT0FBTztRQUNULENBQUM7UUFFRCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUVTLGNBQWM7UUFDdEIsT0FBTyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDL0YsQ0FBQztJQUVTLGNBQWM7UUFDdEIsT0FBTyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDakcsQ0FBQztJQUVTLFVBQVU7UUFDbEIsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVTLFFBQVE7UUFDaEIsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDakQsQ0FBQzs4R0FoRVUsNEJBQTRCO2tHQUE1Qiw0QkFBNEIsOGFBUDdCOzs7O0dBSVQ7OzJGQUdVLDRCQUE0QjtrQkFUeEMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsd0JBQXdCO29CQUNsQyxRQUFRLEVBQUU7Ozs7R0FJVDtvQkFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtpQkFDaEQ7a0ZBRVUsSUFBSTtzQkFBWixLQUFLO2dCQUVHLGFBQWE7c0JBQXJCLEtBQUs7Z0JBRUcsR0FBRztzQkFBWCxLQUFLO2dCQUVHLEdBQUc7c0JBQVgsS0FBSztnQkFFRyxJQUFJO3NCQUFaLEtBQUs7Z0JBR0ksTUFBTTtzQkFBZixNQUFNO2dCQUs0QixRQUFRO3NCQUExQyxXQUFXO3VCQUFDLGdCQUFnQjtnQkFJRyxLQUFLO3NCQUFwQyxXQUFXO3VCQUFDLGFBQWE7Z0JBSVMsUUFBUTtzQkFBMUMsV0FBVzt1QkFBQyxnQkFBZ0I7Z0JBS3pCLE9BQU87c0JBRFYsV0FBVzt1QkFBQyxrQkFBa0I7Z0JBTS9CLGNBQWM7c0JBRGIsV0FBVzt1QkFBQyxrQkFBa0I7Z0JBUS9CLE9BQU87c0JBRE4sWUFBWTt1QkFBQyxPQUFPIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEFrdmVvLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqL1xuXG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3RCaW5kaW5nLFxuICBIb3N0TGlzdGVuZXIsXG4gIElucHV0LFxuICBPdXRwdXQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmJDYWxlbmRhckNlbGwsIE5iQ2FsZW5kYXJTaXplLCBOYkNhbGVuZGFyU2l6ZVZhbHVlcyB9IGZyb20gJy4uLy4uL21vZGVsJztcbmltcG9ydCB7IE5iRGF0ZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9kYXRlLnNlcnZpY2UnO1xuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25iLWNhbGVuZGFyLW1vbnRoLWNlbGwnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJjZWxsLWNvbnRlbnRcIj5cbiAgICAgIHt7IG1vbnRoIH19XG4gICAgPC9kaXY+XG4gIGAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBOYkNhbGVuZGFyTW9udGhDZWxsQ29tcG9uZW50PEQ+IGltcGxlbWVudHMgTmJDYWxlbmRhckNlbGw8RCwgRD4ge1xuICBASW5wdXQoKSBkYXRlOiBEO1xuXG4gIEBJbnB1dCgpIHNlbGVjdGVkVmFsdWU6IEQ7XG5cbiAgQElucHV0KCkgbWluOiBEO1xuXG4gIEBJbnB1dCgpIG1heDogRDtcblxuICBASW5wdXQoKSBzaXplOiBOYkNhbGVuZGFyU2l6ZSA9IE5iQ2FsZW5kYXJTaXplLk1FRElVTTtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX3NpemU6IE5iQ2FsZW5kYXJTaXplVmFsdWVzO1xuXG4gIEBPdXRwdXQoKSBzZWxlY3Q6IEV2ZW50RW1pdHRlcjxEPiA9IG5ldyBFdmVudEVtaXR0ZXIodHJ1ZSk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBkYXRlU2VydmljZTogTmJEYXRlU2VydmljZTxEPikge1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5zZWxlY3RlZCcpIGdldCBzZWxlY3RlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5kYXRlU2VydmljZS5pc1NhbWVNb250aFNhZmUodGhpcy5kYXRlLCB0aGlzLnNlbGVjdGVkVmFsdWUpO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy50b2RheScpIGdldCB0b2RheSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5kYXRlU2VydmljZS5pc1NhbWVNb250aFNhZmUodGhpcy5kYXRlLCB0aGlzLmRhdGVTZXJ2aWNlLnRvZGF5KCkpO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5kaXNhYmxlZCcpIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5zbWFsbGVyVGhhbk1pbigpIHx8IHRoaXMuZ3JlYXRlclRoYW5NYXgoKTtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3Muc2l6ZS1sYXJnZScpXG4gIGdldCBpc0xhcmdlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnNpemUgPT09IE5iQ2FsZW5kYXJTaXplLkxBUkdFO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5tb250aC1jZWxsJylcbiAgbW9udGhDZWxsQ2xhc3MgPSB0cnVlO1xuXG4gIGdldCBtb250aCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmRhdGVTZXJ2aWNlLmdldE1vbnRoTmFtZSh0aGlzLmRhdGUpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKVxuICBvbkNsaWNrKCkge1xuICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5zZWxlY3QuZW1pdCh0aGlzLmRhdGUpO1xuICB9XG5cbiAgcHJvdGVjdGVkIHNtYWxsZXJUaGFuTWluKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmRhdGUgJiYgdGhpcy5taW4gJiYgdGhpcy5kYXRlU2VydmljZS5jb21wYXJlRGF0ZXModGhpcy5tb250aEVuZCgpLCB0aGlzLm1pbikgPCAwO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdyZWF0ZXJUaGFuTWF4KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmRhdGUgJiYgdGhpcy5tYXggJiYgdGhpcy5kYXRlU2VydmljZS5jb21wYXJlRGF0ZXModGhpcy5tb250aFN0YXJ0KCksIHRoaXMubWF4KSA+IDA7XG4gIH1cblxuICBwcm90ZWN0ZWQgbW9udGhTdGFydCgpOiBEIHtcbiAgICByZXR1cm4gdGhpcy5kYXRlU2VydmljZS5nZXRNb250aFN0YXJ0KHRoaXMuZGF0ZSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgbW9udGhFbmQoKTogRCB7XG4gICAgcmV0dXJuIHRoaXMuZGF0ZVNlcnZpY2UuZ2V0TW9udGhFbmQodGhpcy5kYXRlKTtcbiAgfVxufVxuIl19