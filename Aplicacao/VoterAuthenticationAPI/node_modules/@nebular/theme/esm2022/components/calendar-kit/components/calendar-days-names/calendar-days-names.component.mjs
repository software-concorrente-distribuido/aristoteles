/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { ChangeDetectionStrategy, Component, Input, HostBinding } from '@angular/core';
import { NbCalendarSize } from '../../model';
import * as i0 from "@angular/core";
import * as i1 from "../../services/date.service";
import * as i2 from "@angular/common";
export class NbCalendarDaysNamesComponent {
    get isLarge() {
        return this.size === NbCalendarSize.LARGE;
    }
    constructor(dateService) {
        this.dateService = dateService;
    }
    ngOnInit() {
        const days = this.createDaysNames();
        this.days = this.shiftStartOfWeek(days);
    }
    ngOnChanges({ firstDayOfWeek }) {
        if (firstDayOfWeek) {
            const days = this.createDaysNames();
            this.days = this.shiftStartOfWeek(days);
        }
    }
    createDaysNames() {
        return this.dateService.getDayOfWeekNames()
            .map(this.markIfHoliday);
    }
    shiftStartOfWeek(days) {
        const firstDayOfWeek = this.firstDayOfWeek ?? this.dateService.getFirstDayOfWeek();
        for (let i = 0; i < firstDayOfWeek; i++) {
            days.push(days.shift());
        }
        return days;
    }
    markIfHoliday(name, i) {
        return { name, isHoliday: i % 6 === 0 };
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbCalendarDaysNamesComponent, deps: [{ token: i1.NbDateService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.1.0", type: NbCalendarDaysNamesComponent, selector: "nb-calendar-days-names", inputs: { size: "size", firstDayOfWeek: "firstDayOfWeek" }, host: { properties: { "class.size-large": "this.isLarge" } }, usesOnChanges: true, ngImport: i0, template: `
    <div class="day" *ngFor="let day of days" [class.holiday]="day.isHoliday">{{ day.name }}</div>
  `, isInline: true, styles: ["/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */:host{display:flex;justify-content:space-between}:host .day{display:flex;align-items:center;justify-content:center}\n"], dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbCalendarDaysNamesComponent, decorators: [{
            type: Component,
            args: [{ selector: 'nb-calendar-days-names', template: `
    <div class="day" *ngFor="let day of days" [class.holiday]="day.isHoliday">{{ day.name }}</div>
  `, changeDetection: ChangeDetectionStrategy.OnPush, styles: ["/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */:host{display:flex;justify-content:space-between}:host .day{display:flex;align-items:center;justify-content:center}\n"] }]
        }], ctorParameters: () => [{ type: i1.NbDateService }], propDecorators: { size: [{
                type: Input
            }], isLarge: [{
                type: HostBinding,
                args: ['class.size-large']
            }], firstDayOfWeek: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItZGF5cy1uYW1lcy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvZnJhbWV3b3JrL3RoZW1lL2NvbXBvbmVudHMvY2FsZW5kYXIta2l0L2NvbXBvbmVudHMvY2FsZW5kYXItZGF5cy1uYW1lcy9jYWxlbmRhci1kYXlzLW5hbWVzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsV0FBVyxFQUE0QixNQUFNLGVBQWUsQ0FBQztBQUV6SCxPQUFPLEVBQWlCLGNBQWMsRUFBd0IsTUFBTSxhQUFhLENBQUM7Ozs7QUFZbEYsTUFBTSxPQUFPLDRCQUE0QjtJQU92QyxJQUNJLE9BQU87UUFDVCxPQUFPLElBQUksQ0FBQyxJQUFJLEtBQUssY0FBYyxDQUFDLEtBQUssQ0FBQztJQUM1QyxDQUFDO0lBUUQsWUFBb0IsV0FBNkI7UUFBN0IsZ0JBQVcsR0FBWCxXQUFXLENBQWtCO0lBQ2pELENBQUM7SUFFRCxRQUFRO1FBQ04sTUFBTSxJQUFJLEdBQW9CLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUNyRCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRUQsV0FBVyxDQUFDLEVBQUMsY0FBYyxFQUFnQjtRQUN6QyxJQUFJLGNBQWMsRUFBRSxDQUFDO1lBQ25CLE1BQU0sSUFBSSxHQUFvQixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7WUFDckQsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDMUMsQ0FBQztJQUNILENBQUM7SUFFTyxlQUFlO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsRUFBRTthQUN4QyxHQUFHLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFTyxnQkFBZ0IsQ0FBQyxJQUFxQjtRQUM1QyxNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsY0FBYyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUNuRixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsY0FBYyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDeEMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUMxQixDQUFDO1FBRUQsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRU8sYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzNCLE9BQU8sRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7SUFDMUMsQ0FBQzs4R0FqRFUsNEJBQTRCO2tHQUE1Qiw0QkFBNEIsNk1BTDdCOztHQUVUOzsyRkFHVSw0QkFBNEI7a0JBUnhDLFNBQVM7K0JBQ0Usd0JBQXdCLFlBRXhCOztHQUVULG1CQUNnQix1QkFBdUIsQ0FBQyxNQUFNO2tGQU10QyxJQUFJO3NCQUFaLEtBQUs7Z0JBSUYsT0FBTztzQkFEVixXQUFXO3VCQUFDLGtCQUFrQjtnQkFTdEIsY0FBYztzQkFBdEIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBBa3Zlby4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi9cblxuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgSG9zdEJpbmRpbmcsIFNpbXBsZUNoYW5nZXMsIE9uQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOYkNhbGVuZGFyRGF5LCBOYkNhbGVuZGFyU2l6ZSwgTmJDYWxlbmRhclNpemVWYWx1ZXMgfSBmcm9tICcuLi8uLi9tb2RlbCc7XG5pbXBvcnQgeyBOYkRhdGVTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZGF0ZS5zZXJ2aWNlJztcblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduYi1jYWxlbmRhci1kYXlzLW5hbWVzJyxcbiAgc3R5bGVVcmxzOiBbJy4vY2FsZW5kYXItZGF5cy1uYW1lcy5jb21wb25lbnQuc2NzcyddLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJkYXlcIiAqbmdGb3I9XCJsZXQgZGF5IG9mIGRheXNcIiBbY2xhc3MuaG9saWRheV09XCJkYXkuaXNIb2xpZGF5XCI+e3sgZGF5Lm5hbWUgfX08L2Rpdj5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE5iQ2FsZW5kYXJEYXlzTmFtZXNDb21wb25lbnQ8RD4gaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG5cbiAgZGF5czogTmJDYWxlbmRhckRheVtdO1xuXG4gIEBJbnB1dCgpIHNpemU6IE5iQ2FsZW5kYXJTaXplO1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfc2l6ZTogTmJDYWxlbmRhclNpemVWYWx1ZXM7XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5zaXplLWxhcmdlJylcbiAgZ2V0IGlzTGFyZ2UoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc2l6ZSA9PT0gTmJDYWxlbmRhclNpemUuTEFSR0U7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyBmaXJzdCBkYXkgb2YgdGhlIHdlZWssIGl0IGNhbiBiZSAxIGlmIHdlZWsgc3RhcnRzIGZyb20gbW9uZGF5IGFuZCAwIGlmIGZyb20gc3VuZGF5IGFuZCBzbyBvbi5cbiAgICogYHVuZGVmaW5lZGAgbWVhbnMgdGhhdCBkZWZhdWx0IGxvY2FsZSBzZXR0aW5nIHdpbGwgYmUgdXNlZC5cbiAgICogKi9cbiAgQElucHV0KCkgZmlyc3REYXlPZldlZWs6IG51bWJlciB8IHVuZGVmaW5lZDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRhdGVTZXJ2aWNlOiBOYkRhdGVTZXJ2aWNlPEQ+KSB7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBjb25zdCBkYXlzOiBOYkNhbGVuZGFyRGF5W10gPSB0aGlzLmNyZWF0ZURheXNOYW1lcygpO1xuICAgIHRoaXMuZGF5cyA9IHRoaXMuc2hpZnRTdGFydE9mV2VlayhkYXlzKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKHtmaXJzdERheU9mV2Vla306IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoZmlyc3REYXlPZldlZWspIHtcbiAgICAgIGNvbnN0IGRheXM6IE5iQ2FsZW5kYXJEYXlbXSA9IHRoaXMuY3JlYXRlRGF5c05hbWVzKCk7XG4gICAgICB0aGlzLmRheXMgPSB0aGlzLnNoaWZ0U3RhcnRPZldlZWsoZGF5cyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVEYXlzTmFtZXMoKTogTmJDYWxlbmRhckRheVtdIHtcbiAgICByZXR1cm4gdGhpcy5kYXRlU2VydmljZS5nZXREYXlPZldlZWtOYW1lcygpXG4gICAgICAubWFwKHRoaXMubWFya0lmSG9saWRheSk7XG4gIH1cblxuICBwcml2YXRlIHNoaWZ0U3RhcnRPZldlZWsoZGF5czogTmJDYWxlbmRhckRheVtdKTogTmJDYWxlbmRhckRheVtdIHtcbiAgICBjb25zdCBmaXJzdERheU9mV2VlayA9IHRoaXMuZmlyc3REYXlPZldlZWsgPz8gdGhpcy5kYXRlU2VydmljZS5nZXRGaXJzdERheU9mV2VlaygpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZmlyc3REYXlPZldlZWs7IGkrKykge1xuICAgICAgZGF5cy5wdXNoKGRheXMuc2hpZnQoKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRheXM7XG4gIH1cblxuICBwcml2YXRlIG1hcmtJZkhvbGlkYXkobmFtZSwgaSkge1xuICAgIHJldHVybiB7IG5hbWUsIGlzSG9saWRheTogaSAlIDYgPT09IDAgfTtcbiAgfVxufVxuIl19