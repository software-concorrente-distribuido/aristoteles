/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output, } from '@angular/core';
import { NbCalendarSize } from '../../model';
import { NbCalendarYearCellComponent } from './calendar-year-cell.component';
import * as i0 from "@angular/core";
import * as i1 from "../../services/date.service";
import * as i2 from "../../services/calendar-year-model.service";
import * as i3 from "../calendar-picker/calendar-picker.component";
export class NbCalendarYearPickerComponent {
    set _cellComponent(cellComponent) {
        if (cellComponent) {
            this.cellComponent = cellComponent;
        }
    }
    get large() {
        return this.size === NbCalendarSize.LARGE;
    }
    constructor(dateService, yearModelService) {
        this.dateService = dateService;
        this.yearModelService = yearModelService;
        this.cellComponent = NbCalendarYearCellComponent;
        this.size = NbCalendarSize.MEDIUM;
        this.yearChange = new EventEmitter();
    }
    ngOnChanges() {
        this.years = this.yearModelService.getViewYears(this.year);
    }
    onSelect(year) {
        this.yearChange.emit(year);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbCalendarYearPickerComponent, deps: [{ token: i1.NbDateService }, { token: i2.NbCalendarYearModelService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.1.0", type: NbCalendarYearPickerComponent, selector: "nb-calendar-year-picker", inputs: { date: "date", min: "min", max: "max", filter: "filter", _cellComponent: ["cellComponent", "_cellComponent"], size: "size", year: "year" }, outputs: { yearChange: "yearChange" }, host: { properties: { "class.size-large": "this.large" } }, usesOnChanges: true, ngImport: i0, template: `
    <nb-calendar-picker
      [data]="years"
      [min]="min"
      [max]="max"
      [filter]="filter"
      [selectedValue]="date"
      [visibleDate]="year"
      [cellComponent]="cellComponent"
      [size]="size"
      (select)="onSelect($event)">
    </nb-calendar-picker>
  `, isInline: true, dependencies: [{ kind: "component", type: i3.NbCalendarPickerComponent, selector: "nb-calendar-picker", inputs: ["data", "visibleDate", "selectedValue", "cellComponent", "min", "max", "filter", "size"], outputs: ["select"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbCalendarYearPickerComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nb-calendar-year-picker',
                    template: `
    <nb-calendar-picker
      [data]="years"
      [min]="min"
      [max]="max"
      [filter]="filter"
      [selectedValue]="date"
      [visibleDate]="year"
      [cellComponent]="cellComponent"
      [size]="size"
      (select)="onSelect($event)">
    </nb-calendar-picker>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], ctorParameters: () => [{ type: i1.NbDateService }, { type: i2.NbCalendarYearModelService }], propDecorators: { date: [{
                type: Input
            }], min: [{
                type: Input
            }], max: [{
                type: Input
            }], filter: [{
                type: Input
            }], _cellComponent: [{
                type: Input,
                args: ['cellComponent']
            }], size: [{
                type: Input
            }], year: [{
                type: Input
            }], yearChange: [{
                type: Output
            }], large: [{
                type: HostBinding,
                args: ['class.size-large']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIteWVhci1waWNrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2ZyYW1ld29yay90aGVtZS9jb21wb25lbnRzL2NhbGVuZGFyLWtpdC9jb21wb25lbnRzL2NhbGVuZGFyLXllYXItcGlja2VyL2NhbGVuZGFyLXllYXItcGlja2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsWUFBWSxFQUNaLFdBQVcsRUFDWCxLQUFLLEVBRUwsTUFBTSxHQUVQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBa0IsY0FBYyxFQUF3QixNQUFNLGFBQWEsQ0FBQztBQUNuRixPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQzs7Ozs7QUFxQjdFLE1BQU0sT0FBTyw2QkFBNkI7SUFVeEMsSUFDSSxjQUFjLENBQUMsYUFBeUM7UUFDMUQsSUFBSSxhQUFhLEVBQUUsQ0FBQztZQUNsQixJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztRQUNyQyxDQUFDO0lBQ0gsQ0FBQztJQVVELElBQ0ksS0FBSztRQUNQLE9BQU8sSUFBSSxDQUFDLElBQUksS0FBSyxjQUFjLENBQUMsS0FBSyxDQUFDO0lBQzVDLENBQUM7SUFJRCxZQUNZLFdBQTZCLEVBQzdCLGdCQUErQztRQUQvQyxnQkFBVyxHQUFYLFdBQVcsQ0FBa0I7UUFDN0IscUJBQWdCLEdBQWhCLGdCQUFnQixDQUErQjtRQWxCM0Qsa0JBQWEsR0FBK0IsMkJBQTJCLENBQUM7UUFFL0QsU0FBSSxHQUFtQixjQUFjLENBQUMsTUFBTSxDQUFDO1FBSzVDLGVBQVUsR0FBRyxJQUFJLFlBQVksRUFBSyxDQUFDO0lBWTFDLENBQUM7SUFFSixXQUFXO1FBQ1QsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBRUQsUUFBUSxDQUFDLElBQUk7UUFDWCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3QixDQUFDOzhHQTNDVSw2QkFBNkI7a0dBQTdCLDZCQUE2Qiw0VUFmOUI7Ozs7Ozs7Ozs7OztHQVlUOzsyRkFHVSw2QkFBNkI7a0JBakJ6QyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSx5QkFBeUI7b0JBQ25DLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7O0dBWVQ7b0JBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07aUJBQ2hEOzJIQUdVLElBQUk7c0JBQVosS0FBSztnQkFFRyxHQUFHO3NCQUFYLEtBQUs7Z0JBRUcsR0FBRztzQkFBWCxLQUFLO2dCQUVHLE1BQU07c0JBQWQsS0FBSztnQkFHRixjQUFjO3NCQURqQixLQUFLO3VCQUFDLGVBQWU7Z0JBUWIsSUFBSTtzQkFBWixLQUFLO2dCQUdHLElBQUk7c0JBQVosS0FBSztnQkFFSSxVQUFVO3NCQUFuQixNQUFNO2dCQUdILEtBQUs7c0JBRFIsV0FBVzt1QkFBQyxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgQWt2ZW8uIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICovXG5cbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEV2ZW50RW1pdHRlcixcbiAgSG9zdEJpbmRpbmcsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE91dHB1dCxcbiAgVHlwZSxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOYkNhbGVuZGFyQ2VsbCwgTmJDYWxlbmRhclNpemUsIE5iQ2FsZW5kYXJTaXplVmFsdWVzIH0gZnJvbSAnLi4vLi4vbW9kZWwnO1xuaW1wb3J0IHsgTmJDYWxlbmRhclllYXJDZWxsQ29tcG9uZW50IH0gZnJvbSAnLi9jYWxlbmRhci15ZWFyLWNlbGwuY29tcG9uZW50JztcbmltcG9ydCB7IE5iRGF0ZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9kYXRlLnNlcnZpY2UnO1xuaW1wb3J0IHsgTmJDYWxlbmRhclllYXJNb2RlbFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9jYWxlbmRhci15ZWFyLW1vZGVsLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduYi1jYWxlbmRhci15ZWFyLXBpY2tlcicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5iLWNhbGVuZGFyLXBpY2tlclxuICAgICAgW2RhdGFdPVwieWVhcnNcIlxuICAgICAgW21pbl09XCJtaW5cIlxuICAgICAgW21heF09XCJtYXhcIlxuICAgICAgW2ZpbHRlcl09XCJmaWx0ZXJcIlxuICAgICAgW3NlbGVjdGVkVmFsdWVdPVwiZGF0ZVwiXG4gICAgICBbdmlzaWJsZURhdGVdPVwieWVhclwiXG4gICAgICBbY2VsbENvbXBvbmVudF09XCJjZWxsQ29tcG9uZW50XCJcbiAgICAgIFtzaXplXT1cInNpemVcIlxuICAgICAgKHNlbGVjdCk9XCJvblNlbGVjdCgkZXZlbnQpXCI+XG4gICAgPC9uYi1jYWxlbmRhci1waWNrZXI+XG4gIGAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBOYkNhbGVuZGFyWWVhclBpY2tlckNvbXBvbmVudDxEPiBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG5cbiAgQElucHV0KCkgZGF0ZTogRDtcblxuICBASW5wdXQoKSBtaW46IEQ7XG5cbiAgQElucHV0KCkgbWF4OiBEO1xuXG4gIEBJbnB1dCgpIGZpbHRlcjogKEQpID0+IGJvb2xlYW47XG5cbiAgQElucHV0KCdjZWxsQ29tcG9uZW50JylcbiAgc2V0IF9jZWxsQ29tcG9uZW50KGNlbGxDb21wb25lbnQ6IFR5cGU8TmJDYWxlbmRhckNlbGw8RCwgRD4+KSB7XG4gICAgaWYgKGNlbGxDb21wb25lbnQpIHtcbiAgICAgIHRoaXMuY2VsbENvbXBvbmVudCA9IGNlbGxDb21wb25lbnQ7XG4gICAgfVxuICB9XG4gIGNlbGxDb21wb25lbnQ6IFR5cGU8TmJDYWxlbmRhckNlbGw8RCwgRD4+ID0gTmJDYWxlbmRhclllYXJDZWxsQ29tcG9uZW50O1xuXG4gIEBJbnB1dCgpIHNpemU6IE5iQ2FsZW5kYXJTaXplID0gTmJDYWxlbmRhclNpemUuTUVESVVNO1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfc2l6ZTogTmJDYWxlbmRhclNpemVWYWx1ZXM7XG5cbiAgQElucHV0KCkgeWVhcjogRDtcblxuICBAT3V0cHV0KCkgeWVhckNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8RD4oKTtcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnNpemUtbGFyZ2UnKVxuICBnZXQgbGFyZ2UoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2l6ZSA9PT0gTmJDYWxlbmRhclNpemUuTEFSR0U7XG4gIH1cblxuICB5ZWFyczogRFtdW107XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGRhdGVTZXJ2aWNlOiBOYkRhdGVTZXJ2aWNlPEQ+LFxuICAgIHByb3RlY3RlZCB5ZWFyTW9kZWxTZXJ2aWNlOiBOYkNhbGVuZGFyWWVhck1vZGVsU2VydmljZTxEPixcbiAgKSB7fVxuXG4gIG5nT25DaGFuZ2VzKCkge1xuICAgIHRoaXMueWVhcnMgPSB0aGlzLnllYXJNb2RlbFNlcnZpY2UuZ2V0Vmlld1llYXJzKHRoaXMueWVhcik7XG4gIH1cblxuICBvblNlbGVjdCh5ZWFyKSB7XG4gICAgdGhpcy55ZWFyQ2hhbmdlLmVtaXQoeWVhcik7XG4gIH1cbn1cbiJdfQ==