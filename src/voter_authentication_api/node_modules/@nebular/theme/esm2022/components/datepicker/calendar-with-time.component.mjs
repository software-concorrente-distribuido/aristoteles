import { ChangeDetectionStrategy, Component, Input, ViewChild, } from '@angular/core';
import { NbCalendarComponent } from '../calendar/calendar.component';
import { NbCalendarSize } from '../calendar-kit/model';
import { NbPortalOutletDirective } from '../cdk/overlay/mapping';
import { NbTimePickerComponent } from '../timepicker/timepicker.component';
import * as i0 from "@angular/core";
import * as i1 from "../calendar-kit/services/date.service";
import * as i2 from "../calendar-kit/services/calendar-time-model.service";
import * as i3 from "../cdk/overlay/mapping";
import * as i4 from "../card/card.component";
import * as i5 from "../calendar/base-calendar.component";
import * as i6 from "../timepicker/timepicker.component";
import * as i7 from "../calendar-kit/components/calendar-actions/calendar-actions.component";
export class NbCalendarWithTimeComponent extends NbCalendarComponent {
    constructor(dateService, cd, calendarTimeModelService) {
        super();
        this.dateService = dateService;
        this.cd = cd;
        this.calendarTimeModelService = calendarTimeModelService;
    }
    ngOnInit() {
        if (!this.date) {
            this.date = this.calendarTimeModelService.getResetTime();
        }
    }
    ngAfterViewInit() {
        this.portalOutlet.attachTemplatePortal(this.timepicker.portal);
    }
    onDateValueChange(date) {
        const hours = this.dateService.getHours(this.date);
        const minutes = this.dateService.getMinutes(this.date);
        const seconds = this.dateService.getSeconds(this.date);
        const milliseconds = this.dateService.getMilliseconds(this.date);
        let newDate = this.dateService.setHours(date, hours);
        newDate = this.dateService.setMinutes(newDate, minutes);
        newDate = this.dateService.setMinutes(newDate, minutes);
        newDate = this.dateService.setSeconds(newDate, seconds);
        newDate = this.dateService.setMilliseconds(newDate, milliseconds);
        this.date = newDate;
    }
    onTimeChange(selectedTime) {
        let newDate = this.dateService.clone(this.date);
        newDate = this.dateService.setHours(newDate, this.dateService.getHours(selectedTime.time));
        newDate = this.dateService.setMinutes(newDate, this.dateService.getMinutes(selectedTime.time));
        newDate = this.dateService.setSeconds(newDate, this.dateService.getSeconds(selectedTime.time));
        newDate = this.dateService.setMilliseconds(newDate, this.dateService.getMilliseconds(selectedTime.time));
        this.date = newDate;
    }
    saveValue() {
        this.dateChange.emit(this.date);
    }
    saveCurrentTime() {
        this.dateChange.emit(this.dateService.today());
    }
    showSeconds() {
        return this.withSeconds && !this.singleColumn;
    }
    isLarge() {
        return this.size === NbCalendarSize.LARGE;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbCalendarWithTimeComponent, deps: [{ token: i1.NbDateService }, { token: i0.ChangeDetectorRef }, { token: i2.NbCalendarTimeModelService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.1.0", type: NbCalendarWithTimeComponent, selector: "nb-calendar-with-time", inputs: { visibleDate: "visibleDate", twelveHoursFormat: "twelveHoursFormat", showAmPmLabel: "showAmPmLabel", withSeconds: "withSeconds", singleColumn: "singleColumn", step: "step", timeFormat: "timeFormat", title: "title", applyButtonText: "applyButtonText", currentTimeButtonText: "currentTimeButtonText", showCurrentTimeButton: "showCurrentTimeButton" }, viewQueries: [{ propertyName: "portalOutlet", first: true, predicate: NbPortalOutletDirective, descendants: true }, { propertyName: "timepicker", first: true, predicate: NbTimePickerComponent, descendants: true }], usesInheritance: true, ngImport: i0, template: `
    <nb-card class="calendar-with-time">
      <nb-card-body class="picker-body">
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
          (dateChange)="onDateValueChange($event)"
        >
        </nb-base-calendar>
        <div
          class="timepicker-section"
          [class.size-large]="isLarge()"
          [class.timepicker-single-column-width]="singleColumn"
          [class.timepicker-multiple-column-width]="!singleColumn"
        >
          <div class="picker-title">{{ title }}</div>
          <nb-timepicker
            (onSelectTime)="onTimeChange($event)"
            [date]="date"
            [twelveHoursFormat]="twelveHoursFormat"
            [showAmPmLabel]="showAmPmLabel"
            [withSeconds]="showSeconds()"
            [showFooter]="false"
            [singleColumn]="singleColumn"
            [step]="step"
          >
          </nb-timepicker>
          <ng-container nbPortalOutlet></ng-container>
        </div>
      </nb-card-body>
      <nb-card-footer class="picker-footer">
        <nb-calendar-actions
          [applyButtonText]="applyButtonText"
          [currentTimeButtonText]="currentTimeButtonText"
          [showCurrentTimeButton]="showCurrentTimeButton"
          (setCurrentTime)="saveCurrentTime()"
          (saveValue)="saveValue()"
        ></nb-calendar-actions>
      </nb-card-footer>
    </nb-card>
  `, isInline: true, styles: ["/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n*//**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */:host ::ng-deep nb-card.nb-timepicker-container{flex:1 0 0;border-radius:0;width:auto;border-right:0;border-bottom:0}[dir=ltr] :host .picker-footer{padding-left:.625rem}[dir=rtl] :host .picker-footer{padding-right:.625rem}.picker-body{align-items:stretch;display:flex;padding:0}.picker-body nb-base-calendar ::ng-deep nb-card{border-radius:0}.calendar-with-time{overflow:hidden}.timepicker-section{display:flex;flex-direction:column}\n"], dependencies: [{ kind: "directive", type: i3.NbPortalOutletDirective, selector: "[nbPortalOutlet]" }, { kind: "component", type: i4.NbCardComponent, selector: "nb-card", inputs: ["size", "status", "accent"] }, { kind: "component", type: i4.NbCardBodyComponent, selector: "nb-card-body" }, { kind: "component", type: i4.NbCardFooterComponent, selector: "nb-card-footer" }, { kind: "component", type: i5.NbBaseCalendarComponent, selector: "nb-base-calendar", inputs: ["boundingMonth", "startView", "min", "max", "filter", "dayCellComponent", "monthCellComponent", "yearCellComponent", "size", "visibleDate", "showNavigation", "date", "showWeekNumber", "weekNumberSymbol", "firstDayOfWeek"], outputs: ["dateChange"] }, { kind: "component", type: i6.NbTimePickerComponent, selector: "nb-timepicker", inputs: ["timeFormat", "twelveHoursFormat", "showAmPmLabel", "withSeconds", "singleColumn", "step", "date", "showFooter", "applyButtonText", "hoursText", "minutesText", "secondsText", "ampmText", "currentTimeButtonText"], outputs: ["onSelectTime"], exportAs: ["nbTimepicker"] }, { kind: "component", type: i7.NbCalendarActionsComponent, selector: "nb-calendar-actions", inputs: ["applyButtonText", "currentTimeButtonText", "showCurrentTimeButton"], outputs: ["setCurrentTime", "saveValue"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbCalendarWithTimeComponent, decorators: [{
            type: Component,
            args: [{ selector: 'nb-calendar-with-time', template: `
    <nb-card class="calendar-with-time">
      <nb-card-body class="picker-body">
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
          (dateChange)="onDateValueChange($event)"
        >
        </nb-base-calendar>
        <div
          class="timepicker-section"
          [class.size-large]="isLarge()"
          [class.timepicker-single-column-width]="singleColumn"
          [class.timepicker-multiple-column-width]="!singleColumn"
        >
          <div class="picker-title">{{ title }}</div>
          <nb-timepicker
            (onSelectTime)="onTimeChange($event)"
            [date]="date"
            [twelveHoursFormat]="twelveHoursFormat"
            [showAmPmLabel]="showAmPmLabel"
            [withSeconds]="showSeconds()"
            [showFooter]="false"
            [singleColumn]="singleColumn"
            [step]="step"
          >
          </nb-timepicker>
          <ng-container nbPortalOutlet></ng-container>
        </div>
      </nb-card-body>
      <nb-card-footer class="picker-footer">
        <nb-calendar-actions
          [applyButtonText]="applyButtonText"
          [currentTimeButtonText]="currentTimeButtonText"
          [showCurrentTimeButton]="showCurrentTimeButton"
          (setCurrentTime)="saveCurrentTime()"
          (saveValue)="saveValue()"
        ></nb-calendar-actions>
      </nb-card-footer>
    </nb-card>
  `, changeDetection: ChangeDetectionStrategy.OnPush, styles: ["/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n*//**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */:host ::ng-deep nb-card.nb-timepicker-container{flex:1 0 0;border-radius:0;width:auto;border-right:0;border-bottom:0}[dir=ltr] :host .picker-footer{padding-left:.625rem}[dir=rtl] :host .picker-footer{padding-right:.625rem}.picker-body{align-items:stretch;display:flex;padding:0}.picker-body nb-base-calendar ::ng-deep nb-card{border-radius:0}.calendar-with-time{overflow:hidden}.timepicker-section{display:flex;flex-direction:column}\n"] }]
        }], ctorParameters: () => [{ type: i1.NbDateService }, { type: i0.ChangeDetectorRef }, { type: i2.NbCalendarTimeModelService }], propDecorators: { visibleDate: [{
                type: Input
            }], twelveHoursFormat: [{
                type: Input
            }], showAmPmLabel: [{
                type: Input
            }], withSeconds: [{
                type: Input
            }], singleColumn: [{
                type: Input
            }], step: [{
                type: Input
            }], timeFormat: [{
                type: Input
            }], title: [{
                type: Input
            }], applyButtonText: [{
                type: Input
            }], currentTimeButtonText: [{
                type: Input
            }], showCurrentTimeButton: [{
                type: Input
            }], portalOutlet: [{
                type: ViewChild,
                args: [NbPortalOutletDirective]
            }], timepicker: [{
                type: ViewChild,
                args: [NbTimePickerComponent]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItd2l0aC10aW1lLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9mcmFtZXdvcmsvdGhlbWUvY29tcG9uZW50cy9kYXRlcGlja2VyL2NhbGVuZGFyLXdpdGgtdGltZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUVMLHVCQUF1QixFQUV2QixTQUFTLEVBQ1QsS0FBSyxFQUVMLFNBQVMsR0FDVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUlyRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDdkQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDakUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7Ozs7Ozs7OztBQTZEM0UsTUFBTSxPQUFPLDJCQUErQixTQUFRLG1CQUFzQjtJQW9EeEUsWUFDWSxXQUE2QixFQUNoQyxFQUFxQixFQUNsQix3QkFBdUQ7UUFFakUsS0FBSyxFQUFFLENBQUM7UUFKRSxnQkFBVyxHQUFYLFdBQVcsQ0FBa0I7UUFDaEMsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7UUFDbEIsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUErQjtJQUduRSxDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDZixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUMzRCxDQUFDO0lBQ0gsQ0FBQztJQUVELGVBQWU7UUFDYixJQUFJLENBQUMsWUFBWSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDakUsQ0FBQztJQUVELGlCQUFpQixDQUFDLElBQU87UUFDdkIsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25ELE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2RCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkQsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRWpFLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNyRCxPQUFPLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3hELE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDeEQsT0FBTyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztRQUN4RCxPQUFPLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBRWxFLElBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDO0lBQ3RCLENBQUM7SUFFRCxZQUFZLENBQUMsWUFBc0M7UUFDakQsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRWhELE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDM0YsT0FBTyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUMvRixPQUFPLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQy9GLE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFFekcsSUFBSSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUM7SUFDdEIsQ0FBQztJQUVELFNBQVM7UUFDUCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUVELGVBQWU7UUFDYixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVELFdBQVc7UUFDVCxPQUFPLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQ2hELENBQUM7SUFFRCxPQUFPO1FBQ0wsT0FBTyxJQUFJLENBQUMsSUFBSSxLQUFLLGNBQWMsQ0FBQyxLQUFLLENBQUM7SUFDNUMsQ0FBQzs4R0E5R1UsMkJBQTJCO2tHQUEzQiwyQkFBMkIsaWRBaUQzQix1QkFBdUIsNkVBQ3ZCLHFCQUFxQix1RUEzR3RCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFEVDs7MkZBSVUsMkJBQTJCO2tCQTNEdkMsU0FBUzsrQkFDRSx1QkFBdUIsWUFDdkI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcURULG1CQUVnQix1QkFBdUIsQ0FBQyxNQUFNOzJKQU10QyxXQUFXO3NCQUFuQixLQUFLO2dCQUtHLGlCQUFpQjtzQkFBekIsS0FBSztnQkFLRyxhQUFhO3NCQUFyQixLQUFLO2dCQU1HLFdBQVc7c0JBQW5CLEtBQUs7Z0JBS0csWUFBWTtzQkFBcEIsS0FBSztnQkFNRyxJQUFJO3NCQUFaLEtBQUs7Z0JBS0csVUFBVTtzQkFBbEIsS0FBSztnQkFLRyxLQUFLO3NCQUFiLEtBQUs7Z0JBRUcsZUFBZTtzQkFBdkIsS0FBSztnQkFFRyxxQkFBcUI7c0JBQTdCLEtBQUs7Z0JBRUcscUJBQXFCO3NCQUE3QixLQUFLO2dCQUU4QixZQUFZO3NCQUEvQyxTQUFTO3VCQUFDLHVCQUF1QjtnQkFDQSxVQUFVO3NCQUEzQyxTQUFTO3VCQUFDLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT25Jbml0LFxuICBWaWV3Q2hpbGQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmJDYWxlbmRhckNvbXBvbmVudCB9IGZyb20gJy4uL2NhbGVuZGFyL2NhbGVuZGFyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOYlNlbGVjdGVkVGltZVBheWxvYWQgfSBmcm9tICcuLi90aW1lcGlja2VyL21vZGVsJztcbmltcG9ydCB7IE5iRGF0ZVNlcnZpY2UgfSBmcm9tICcuLi9jYWxlbmRhci1raXQvc2VydmljZXMvZGF0ZS5zZXJ2aWNlJztcbmltcG9ydCB7IE5iQ2FsZW5kYXJUaW1lTW9kZWxTZXJ2aWNlIH0gZnJvbSAnLi4vY2FsZW5kYXIta2l0L3NlcnZpY2VzL2NhbGVuZGFyLXRpbWUtbW9kZWwuc2VydmljZSc7XG5pbXBvcnQgeyBOYkNhbGVuZGFyU2l6ZSB9IGZyb20gJy4uL2NhbGVuZGFyLWtpdC9tb2RlbCc7XG5pbXBvcnQgeyBOYlBvcnRhbE91dGxldERpcmVjdGl2ZSB9IGZyb20gJy4uL2Nkay9vdmVybGF5L21hcHBpbmcnO1xuaW1wb3J0IHsgTmJUaW1lUGlja2VyQ29tcG9uZW50IH0gZnJvbSAnLi4vdGltZXBpY2tlci90aW1lcGlja2VyLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25iLWNhbGVuZGFyLXdpdGgtdGltZScsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5iLWNhcmQgY2xhc3M9XCJjYWxlbmRhci13aXRoLXRpbWVcIj5cbiAgICAgIDxuYi1jYXJkLWJvZHkgY2xhc3M9XCJwaWNrZXItYm9keVwiPlxuICAgICAgICA8bmItYmFzZS1jYWxlbmRhclxuICAgICAgICAgIFtib3VuZGluZ01vbnRoXT1cImJvdW5kaW5nTW9udGhcIlxuICAgICAgICAgIFtzdGFydFZpZXddPVwic3RhcnRWaWV3XCJcbiAgICAgICAgICBbZGF0ZV09XCJkYXRlXCJcbiAgICAgICAgICBbbWluXT1cIm1pblwiXG4gICAgICAgICAgW21heF09XCJtYXhcIlxuICAgICAgICAgIFtmaWx0ZXJdPVwiZmlsdGVyXCJcbiAgICAgICAgICBbZGF5Q2VsbENvbXBvbmVudF09XCJkYXlDZWxsQ29tcG9uZW50XCJcbiAgICAgICAgICBbbW9udGhDZWxsQ29tcG9uZW50XT1cIm1vbnRoQ2VsbENvbXBvbmVudFwiXG4gICAgICAgICAgW3llYXJDZWxsQ29tcG9uZW50XT1cInllYXJDZWxsQ29tcG9uZW50XCJcbiAgICAgICAgICBbc2l6ZV09XCJzaXplXCJcbiAgICAgICAgICBbdmlzaWJsZURhdGVdPVwidmlzaWJsZURhdGVcIlxuICAgICAgICAgIFtzaG93TmF2aWdhdGlvbl09XCJzaG93TmF2aWdhdGlvblwiXG4gICAgICAgICAgW3Nob3dXZWVrTnVtYmVyXT1cInNob3dXZWVrTnVtYmVyXCJcbiAgICAgICAgICBbd2Vla051bWJlclN5bWJvbF09XCJ3ZWVrTnVtYmVyU3ltYm9sXCJcbiAgICAgICAgICBbZmlyc3REYXlPZldlZWtdPVwiZmlyc3REYXlPZldlZWtcIlxuICAgICAgICAgIChkYXRlQ2hhbmdlKT1cIm9uRGF0ZVZhbHVlQ2hhbmdlKCRldmVudClcIlxuICAgICAgICA+XG4gICAgICAgIDwvbmItYmFzZS1jYWxlbmRhcj5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzPVwidGltZXBpY2tlci1zZWN0aW9uXCJcbiAgICAgICAgICBbY2xhc3Muc2l6ZS1sYXJnZV09XCJpc0xhcmdlKClcIlxuICAgICAgICAgIFtjbGFzcy50aW1lcGlja2VyLXNpbmdsZS1jb2x1bW4td2lkdGhdPVwic2luZ2xlQ29sdW1uXCJcbiAgICAgICAgICBbY2xhc3MudGltZXBpY2tlci1tdWx0aXBsZS1jb2x1bW4td2lkdGhdPVwiIXNpbmdsZUNvbHVtblwiXG4gICAgICAgID5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicGlja2VyLXRpdGxlXCI+e3sgdGl0bGUgfX08L2Rpdj5cbiAgICAgICAgICA8bmItdGltZXBpY2tlclxuICAgICAgICAgICAgKG9uU2VsZWN0VGltZSk9XCJvblRpbWVDaGFuZ2UoJGV2ZW50KVwiXG4gICAgICAgICAgICBbZGF0ZV09XCJkYXRlXCJcbiAgICAgICAgICAgIFt0d2VsdmVIb3Vyc0Zvcm1hdF09XCJ0d2VsdmVIb3Vyc0Zvcm1hdFwiXG4gICAgICAgICAgICBbc2hvd0FtUG1MYWJlbF09XCJzaG93QW1QbUxhYmVsXCJcbiAgICAgICAgICAgIFt3aXRoU2Vjb25kc109XCJzaG93U2Vjb25kcygpXCJcbiAgICAgICAgICAgIFtzaG93Rm9vdGVyXT1cImZhbHNlXCJcbiAgICAgICAgICAgIFtzaW5nbGVDb2x1bW5dPVwic2luZ2xlQ29sdW1uXCJcbiAgICAgICAgICAgIFtzdGVwXT1cInN0ZXBcIlxuICAgICAgICAgID5cbiAgICAgICAgICA8L25iLXRpbWVwaWNrZXI+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lciBuYlBvcnRhbE91dGxldD48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L25iLWNhcmQtYm9keT5cbiAgICAgIDxuYi1jYXJkLWZvb3RlciBjbGFzcz1cInBpY2tlci1mb290ZXJcIj5cbiAgICAgICAgPG5iLWNhbGVuZGFyLWFjdGlvbnNcbiAgICAgICAgICBbYXBwbHlCdXR0b25UZXh0XT1cImFwcGx5QnV0dG9uVGV4dFwiXG4gICAgICAgICAgW2N1cnJlbnRUaW1lQnV0dG9uVGV4dF09XCJjdXJyZW50VGltZUJ1dHRvblRleHRcIlxuICAgICAgICAgIFtzaG93Q3VycmVudFRpbWVCdXR0b25dPVwic2hvd0N1cnJlbnRUaW1lQnV0dG9uXCJcbiAgICAgICAgICAoc2V0Q3VycmVudFRpbWUpPVwic2F2ZUN1cnJlbnRUaW1lKClcIlxuICAgICAgICAgIChzYXZlVmFsdWUpPVwic2F2ZVZhbHVlKClcIlxuICAgICAgICA+PC9uYi1jYWxlbmRhci1hY3Rpb25zPlxuICAgICAgPC9uYi1jYXJkLWZvb3Rlcj5cbiAgICA8L25iLWNhcmQ+XG4gIGAsXG4gIHN0eWxlVXJsczogWycuL2NhbGVuZGFyLXdpdGgtdGltZS1jb250YWluZXIuY29tcG9uZW50LnNjc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE5iQ2FsZW5kYXJXaXRoVGltZUNvbXBvbmVudDxEPiBleHRlbmRzIE5iQ2FsZW5kYXJDb21wb25lbnQ8RD4gaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQge1xuICAvKipcbiAgICogRGVmaW5lcyBzZWxlY3RlZCBkYXRlLlxuICAgKiAqL1xuICBASW5wdXQoKSB2aXNpYmxlRGF0ZTogRDtcblxuICAvKipcbiAgICogRGVmaW5lcyAxMiBob3VycyBmb3JtYXQgbGlrZSAnMDc6MDAgUE0nLlxuICAgKiAqL1xuICBASW5wdXQoKSB0d2VsdmVIb3Vyc0Zvcm1hdDogYm9vbGVhbjtcblxuICAvKipcbiAgICogRGVmaW5lcyBzaG91bGQgc2hvdyBhbS9wbSBsYWJlbCBpZiB0d2VsdmVIb3Vyc0Zvcm1hdCBlbmFibGVkLlxuICAgKiAqL1xuICBASW5wdXQoKSBzaG93QW1QbUxhYmVsOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBTaG93IHNlY29uZHMgaW4gdGltZXBpY2tlci5cbiAgICogSWdub3JlZCB3aGVuIHNpbmdsZUNvbHVtbiBpcyB0cnVlLlxuICAgKiAqL1xuICBASW5wdXQoKSB3aXRoU2Vjb25kczogYm9vbGVhbjtcblxuICAvKipcbiAgICogU2hvdyB0aW1lcGlja2VyIHZhbHVlcyBpbiBvbmUgY29sdW1uIHdpdGggNjAgbWludXRlcyBzdGVwIGJ5IGRlZmF1bHQuXG4gICAqICovXG4gIEBJbnB1dCgpIHNpbmdsZUNvbHVtbjogYm9vbGVhbjtcblxuICAvKipcbiAgICogRGVmaW5lcyBtaW51dGVzIHN0ZXAgd2hlbiB3ZSB1c2UgZmlsbCB0aW1lIGZvcm1hdC5cbiAgICogSWYgc2V0IHRvIDIwLCBpdCB3aWxsIGJlOiAnMTI6MDAsIDEyOjIwOiAxMjo0MCwgMTM6MDAuLi4nXG4gICAqICovXG4gIEBJbnB1dCgpIHN0ZXA6IG51bWJlcjtcblxuICAvKipcbiAgICogRGVmaW5lcyB0aW1lIGZvcm1hdC5cbiAgICogKi9cbiAgQElucHV0KCkgdGltZUZvcm1hdDogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBEZWZpbmVzIHRleHQgb3ZlciB0aGUgdGltZXBpY2tlci5cbiAgICogKi9cbiAgQElucHV0KCkgdGl0bGU6IHN0cmluZztcblxuICBASW5wdXQoKSBhcHBseUJ1dHRvblRleHQ6IHN0cmluZztcblxuICBASW5wdXQoKSBjdXJyZW50VGltZUJ1dHRvblRleHQ6IHN0cmluZztcblxuICBASW5wdXQoKSBzaG93Q3VycmVudFRpbWVCdXR0b246IGJvb2xlYW47XG5cbiAgQFZpZXdDaGlsZChOYlBvcnRhbE91dGxldERpcmVjdGl2ZSkgcG9ydGFsT3V0bGV0OiBOYlBvcnRhbE91dGxldERpcmVjdGl2ZTtcbiAgQFZpZXdDaGlsZChOYlRpbWVQaWNrZXJDb21wb25lbnQpIHRpbWVwaWNrZXI6IE5iVGltZVBpY2tlckNvbXBvbmVudDxEPjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgZGF0ZVNlcnZpY2U6IE5iRGF0ZVNlcnZpY2U8RD4sXG4gICAgcHVibGljIGNkOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcm90ZWN0ZWQgY2FsZW5kYXJUaW1lTW9kZWxTZXJ2aWNlOiBOYkNhbGVuZGFyVGltZU1vZGVsU2VydmljZTxEPixcbiAgKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5kYXRlKSB7XG4gICAgICB0aGlzLmRhdGUgPSB0aGlzLmNhbGVuZGFyVGltZU1vZGVsU2VydmljZS5nZXRSZXNldFRpbWUoKTtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5wb3J0YWxPdXRsZXQuYXR0YWNoVGVtcGxhdGVQb3J0YWwodGhpcy50aW1lcGlja2VyLnBvcnRhbCk7XG4gIH1cblxuICBvbkRhdGVWYWx1ZUNoYW5nZShkYXRlOiBEKTogdm9pZCB7XG4gICAgY29uc3QgaG91cnMgPSB0aGlzLmRhdGVTZXJ2aWNlLmdldEhvdXJzKHRoaXMuZGF0ZSk7XG4gICAgY29uc3QgbWludXRlcyA9IHRoaXMuZGF0ZVNlcnZpY2UuZ2V0TWludXRlcyh0aGlzLmRhdGUpO1xuICAgIGNvbnN0IHNlY29uZHMgPSB0aGlzLmRhdGVTZXJ2aWNlLmdldFNlY29uZHModGhpcy5kYXRlKTtcbiAgICBjb25zdCBtaWxsaXNlY29uZHMgPSB0aGlzLmRhdGVTZXJ2aWNlLmdldE1pbGxpc2Vjb25kcyh0aGlzLmRhdGUpO1xuXG4gICAgbGV0IG5ld0RhdGUgPSB0aGlzLmRhdGVTZXJ2aWNlLnNldEhvdXJzKGRhdGUsIGhvdXJzKTtcbiAgICBuZXdEYXRlID0gdGhpcy5kYXRlU2VydmljZS5zZXRNaW51dGVzKG5ld0RhdGUsIG1pbnV0ZXMpO1xuICAgIG5ld0RhdGUgPSB0aGlzLmRhdGVTZXJ2aWNlLnNldE1pbnV0ZXMobmV3RGF0ZSwgbWludXRlcyk7XG4gICAgbmV3RGF0ZSA9IHRoaXMuZGF0ZVNlcnZpY2Uuc2V0U2Vjb25kcyhuZXdEYXRlLCBzZWNvbmRzKTtcbiAgICBuZXdEYXRlID0gdGhpcy5kYXRlU2VydmljZS5zZXRNaWxsaXNlY29uZHMobmV3RGF0ZSwgbWlsbGlzZWNvbmRzKTtcblxuICAgIHRoaXMuZGF0ZSA9IG5ld0RhdGU7XG4gIH1cblxuICBvblRpbWVDaGFuZ2Uoc2VsZWN0ZWRUaW1lOiBOYlNlbGVjdGVkVGltZVBheWxvYWQ8RD4pOiB2b2lkIHtcbiAgICBsZXQgbmV3RGF0ZSA9IHRoaXMuZGF0ZVNlcnZpY2UuY2xvbmUodGhpcy5kYXRlKTtcblxuICAgIG5ld0RhdGUgPSB0aGlzLmRhdGVTZXJ2aWNlLnNldEhvdXJzKG5ld0RhdGUsIHRoaXMuZGF0ZVNlcnZpY2UuZ2V0SG91cnMoc2VsZWN0ZWRUaW1lLnRpbWUpKTtcbiAgICBuZXdEYXRlID0gdGhpcy5kYXRlU2VydmljZS5zZXRNaW51dGVzKG5ld0RhdGUsIHRoaXMuZGF0ZVNlcnZpY2UuZ2V0TWludXRlcyhzZWxlY3RlZFRpbWUudGltZSkpO1xuICAgIG5ld0RhdGUgPSB0aGlzLmRhdGVTZXJ2aWNlLnNldFNlY29uZHMobmV3RGF0ZSwgdGhpcy5kYXRlU2VydmljZS5nZXRTZWNvbmRzKHNlbGVjdGVkVGltZS50aW1lKSk7XG4gICAgbmV3RGF0ZSA9IHRoaXMuZGF0ZVNlcnZpY2Uuc2V0TWlsbGlzZWNvbmRzKG5ld0RhdGUsIHRoaXMuZGF0ZVNlcnZpY2UuZ2V0TWlsbGlzZWNvbmRzKHNlbGVjdGVkVGltZS50aW1lKSk7XG5cbiAgICB0aGlzLmRhdGUgPSBuZXdEYXRlO1xuICB9XG5cbiAgc2F2ZVZhbHVlKCk6IHZvaWQge1xuICAgIHRoaXMuZGF0ZUNoYW5nZS5lbWl0KHRoaXMuZGF0ZSk7XG4gIH1cblxuICBzYXZlQ3VycmVudFRpbWUoKTogdm9pZCB7XG4gICAgdGhpcy5kYXRlQ2hhbmdlLmVtaXQodGhpcy5kYXRlU2VydmljZS50b2RheSgpKTtcbiAgfVxuXG4gIHNob3dTZWNvbmRzKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLndpdGhTZWNvbmRzICYmICF0aGlzLnNpbmdsZUNvbHVtbjtcbiAgfVxuXG4gIGlzTGFyZ2UoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc2l6ZSA9PT0gTmJDYWxlbmRhclNpemUuTEFSR0U7XG4gIH1cbn1cbiJdfQ==