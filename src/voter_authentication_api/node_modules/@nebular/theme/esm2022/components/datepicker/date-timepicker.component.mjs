import { ChangeDetectionStrategy, Component, Inject, Input, Optional, Output, } from '@angular/core';
import { convertToBoolProperty } from '../helpers';
import { NB_DOCUMENT } from '../../theme.options';
import { NbCalendarWithTimeComponent } from './calendar-with-time.component';
import { NbBasePickerComponent } from './datepicker.component';
import { NB_DATE_SERVICE_OPTIONS } from './datepicker.directive';
import * as i0 from "@angular/core";
import * as i1 from "../cdk/overlay/overlay-position";
import * as i2 from "../cdk/overlay/overlay-trigger";
import * as i3 from "../cdk/overlay/overlay-service";
import * as i4 from "../calendar-kit/services/date.service";
import * as i5 from "../calendar-kit/services/calendar-time-model.service";
/**
 * The DateTimePicker component itself.
 * Provides a proxy to `NbCalendarWithTimeComponent` options as well as custom picker options.
 */
export class NbDateTimePickerComponent extends NbBasePickerComponent {
    get value() {
        return this.picker ? this.picker.date : undefined;
    }
    set value(date) {
        if (!this.picker) {
            this.queue = date;
            return;
        }
        if (date) {
            this.visibleDate = date;
            this.picker.visibleDate = date;
            this.picker.date = date;
            this.picker.cd.markForCheck();
        }
    }
    /**
     * Defines 12 hours format like '07:00 PM'.
     * */
    get twelveHoursFormat() {
        return this._twelveHoursFormat;
    }
    set twelveHoursFormat(value) {
        this._twelveHoursFormat = convertToBoolProperty(value);
    }
    /**
     * Defines should show am/pm label if twelveHoursFormat enabled.
     * */
    get showAmPmLabel() {
        return this._showAmPmLabel;
    }
    set showAmPmLabel(value) {
        this._showAmPmLabel = convertToBoolProperty(value);
    }
    /**
     * Show seconds in timepicker.
     * Ignored when singleColumn is true.
     * */
    get withSeconds() {
        return this._withSeconds;
    }
    set withSeconds(value) {
        this._withSeconds = convertToBoolProperty(value);
    }
    /**
     * Show timepicker values in one column with 60 minutes step by default.
     * */
    get singleColumn() {
        return this._singleColumn;
    }
    set singleColumn(value) {
        this._singleColumn = convertToBoolProperty(value);
    }
    /**
     * Emits date with time when selected.
     * */
    get dateTimeChange() {
        return this.valueChange;
    }
    constructor(document, positionBuilder, triggerStrategyBuilder, overlay, cfr, dateService, dateServiceOptions, calendarWithTimeModelService) {
        super(document, positionBuilder, triggerStrategyBuilder, overlay, cfr, dateService, dateServiceOptions);
        this.calendarWithTimeModelService = calendarWithTimeModelService;
        this.pickerClass = NbCalendarWithTimeComponent;
        this.showCurrentTimeButton = true;
        this._showAmPmLabel = true;
    }
    ngOnInit() {
        this.format = this.format || this.buildTimeFormat();
        this.init$.next();
    }
    patchWithInputs() {
        this.picker.singleColumn = this.singleColumn;
        this.picker.twelveHoursFormat = this.twelveHoursFormat;
        this.picker.showAmPmLabel = this.showAmPmLabel;
        this.picker.withSeconds = this.withSeconds;
        this.picker.step = this.step;
        this.picker.title = this.title;
        this.picker.applyButtonText = this.applyButtonText;
        this.picker.currentTimeButtonText = this.currentTimeButtonText;
        this.picker.showCurrentTimeButton = this.showCurrentTimeButton;
        if (this.twelveHoursFormat) {
            this.picker.timeFormat = this.dateService.getTwelveHoursFormat();
        }
        else {
            this.picker.timeFormat =
                this.withSeconds && !this.singleColumn
                    ? this.dateService.getTwentyFourHoursFormatWithSeconds()
                    : this.dateService.getTwentyFourHoursFormat();
        }
        super.patchWithInputs();
        this.picker.cd.markForCheck();
    }
    get pickerValueChange() {
        return this.picker.dateChange;
    }
    writeQueue() {
        if (this.queue) {
            const date = this.queue;
            this.queue = null;
            this.value = date;
        }
    }
    buildTimeFormat() {
        if (this.singleColumn) {
            return this.calendarWithTimeModelService.buildDateFormat(this.twelveHoursFormat);
        }
        else {
            return this.calendarWithTimeModelService.buildDateFormat(this.twelveHoursFormat, this.withSeconds);
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbDateTimePickerComponent, deps: [{ token: NB_DOCUMENT }, { token: i1.NbPositionBuilderService }, { token: i2.NbTriggerStrategyBuilderService }, { token: i3.NbOverlayService }, { token: i0.ComponentFactoryResolver }, { token: i4.NbDateService }, { token: NB_DATE_SERVICE_OPTIONS, optional: true }, { token: i5.NbCalendarTimeModelService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.1.0", type: NbDateTimePickerComponent, selector: "nb-date-timepicker", inputs: { step: "step", title: "title", applyButtonText: "applyButtonText", currentTimeButtonText: "currentTimeButtonText", showCurrentTimeButton: "showCurrentTimeButton", twelveHoursFormat: "twelveHoursFormat", showAmPmLabel: "showAmPmLabel", withSeconds: "withSeconds", singleColumn: "singleColumn" }, outputs: { dateTimeChange: "dateTimeChange" }, usesInheritance: true, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbDateTimePickerComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nb-date-timepicker',
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], ctorParameters: () => [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [NB_DOCUMENT]
                }] }, { type: i1.NbPositionBuilderService }, { type: i2.NbTriggerStrategyBuilderService }, { type: i3.NbOverlayService }, { type: i0.ComponentFactoryResolver }, { type: i4.NbDateService }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [NB_DATE_SERVICE_OPTIONS]
                }] }, { type: i5.NbCalendarTimeModelService }], propDecorators: { step: [{
                type: Input
            }], title: [{
                type: Input
            }], applyButtonText: [{
                type: Input
            }], currentTimeButtonText: [{
                type: Input
            }], showCurrentTimeButton: [{
                type: Input
            }], twelveHoursFormat: [{
                type: Input
            }], showAmPmLabel: [{
                type: Input
            }], withSeconds: [{
                type: Input
            }], singleColumn: [{
                type: Input
            }], dateTimeChange: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lcGlja2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9mcmFtZXdvcmsvdGhlbWUvY29tcG9uZW50cy9kYXRlcGlja2VyL2RhdGUtdGltZXBpY2tlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixTQUFTLEVBR1QsTUFBTSxFQUNOLEtBQUssRUFFTCxRQUFRLEVBQ1IsTUFBTSxHQUVQLE1BQU0sZUFBZSxDQUFDO0FBR3ZCLE9BQU8sRUFBRSxxQkFBcUIsRUFBa0IsTUFBTSxZQUFZLENBQUM7QUFDbkUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBTWxELE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQy9ELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDOzs7Ozs7O0FBRWpFOzs7R0FHRztBQU1ILE1BQU0sT0FBTyx5QkFDWCxTQUFRLHFCQUEyRDtJQUtuRSxJQUFJLEtBQUs7UUFDUCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7SUFDcEQsQ0FBQztJQUNELElBQUksS0FBSyxDQUFDLElBQVM7UUFDakIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNqQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztZQUNsQixPQUFPO1FBQ1QsQ0FBQztRQUVELElBQUksSUFBSSxFQUFFLENBQUM7WUFDVCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztZQUN4QixJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsR0FBRyxJQUFJLENB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O1FBQ3JHLENBQUM7SUFDSCxDQUFDOzhHQTFKVSx5QkFBeUIsa0JBK0YxQixXQUFXLHlNQU1DLHVCQUF1QjtrR0FyR2xDLHlCQUF5QixnYkFIMUIsRUFBRTs7MkZBR0QseUJBQXlCO2tCQUxyQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxvQkFBb0I7b0JBQzlCLFFBQVEsRUFBRSxFQUFFO29CQUNaLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2lCQUNoRDs7MEJBZ0dJLE1BQU07MkJBQUMsV0FBVzs7MEJBTWxCLFFBQVE7OzBCQUFJLE1BQU07MkJBQUMsdUJBQXVCO2tGQTFFcEMsSUFBSTtzQkFBWixLQUFLO2dCQUVHLEtBQUs7c0JBQWIsS0FBSztnQkFDRyxlQUFlO3NCQUF2QixLQUFLO2dCQUNHLHFCQUFxQjtzQkFBN0IsS0FBSztnQkFDRyxxQkFBcUI7c0JBQTdCLEtBQUs7Z0JBTUYsaUJBQWlCO3NCQURwQixLQUFLO2dCQWNGLGFBQWE7c0JBRGhCLEtBQUs7Z0JBZUYsV0FBVztzQkFEZCxLQUFLO2dCQWNGLFlBQVk7c0JBRGYsS0FBSztnQkFhUSxjQUFjO3NCQUEzQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICBFdmVudEVtaXR0ZXIsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE9uSW5pdCxcbiAgT3B0aW9uYWwsXG4gIE91dHB1dCxcbiAgVHlwZSxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IGNvbnZlcnRUb0Jvb2xQcm9wZXJ0eSwgTmJCb29sZWFuSW5wdXQgfSBmcm9tICcuLi9oZWxwZXJzJztcbmltcG9ydCB7IE5CX0RPQ1VNRU5UIH0gZnJvbSAnLi4vLi4vdGhlbWUub3B0aW9ucyc7XG5pbXBvcnQgeyBOYlBvc2l0aW9uQnVpbGRlclNlcnZpY2UgfSBmcm9tICcuLi9jZGsvb3ZlcmxheS9vdmVybGF5LXBvc2l0aW9uJztcbmltcG9ydCB7IE5iVHJpZ2dlclN0cmF0ZWd5QnVpbGRlclNlcnZpY2UgfSBmcm9tICcuLi9jZGsvb3ZlcmxheS9vdmVybGF5LXRyaWdnZXInO1xuaW1wb3J0IHsgTmJPdmVybGF5U2VydmljZSB9IGZyb20gJy4uL2Nkay9vdmVybGF5L292ZXJsYXktc2VydmljZSc7XG5pbXBvcnQgeyBOYkNhbGVuZGFyVGltZU1vZGVsU2VydmljZSB9IGZyb20gJy4uL2NhbGVuZGFyLWtpdC9zZXJ2aWNlcy9jYWxlbmRhci10aW1lLW1vZGVsLnNlcnZpY2UnO1xuaW1wb3J0IHsgTmJEYXRlU2VydmljZSB9IGZyb20gJy4uL2NhbGVuZGFyLWtpdC9zZXJ2aWNlcy9kYXRlLnNlcnZpY2UnO1xuaW1wb3J0IHsgTmJDYWxlbmRhcldpdGhUaW1lQ29tcG9uZW50IH0gZnJvbSAnLi9jYWxlbmRhci13aXRoLXRpbWUuY29tcG9uZW50JztcbmltcG9ydCB7IE5iQmFzZVBpY2tlckNvbXBvbmVudCB9IGZyb20gJy4vZGF0ZXBpY2tlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTkJfREFURV9TRVJWSUNFX09QVElPTlMgfSBmcm9tICcuL2RhdGVwaWNrZXIuZGlyZWN0aXZlJztcblxuLyoqXG4gKiBUaGUgRGF0ZVRpbWVQaWNrZXIgY29tcG9uZW50IGl0c2VsZi5cbiAqIFByb3ZpZGVzIGEgcHJveHkgdG8gYE5iQ2FsZW5kYXJXaXRoVGltZUNvbXBvbmVudGAgb3B0aW9ucyBhcyB3ZWxsIGFzIGN1c3RvbSBwaWNrZXIgb3B0aW9ucy5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmItZGF0ZS10aW1lcGlja2VyJyxcbiAgdGVtcGxhdGU6ICcnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgTmJEYXRlVGltZVBpY2tlckNvbXBvbmVudDxEPlxuICBleHRlbmRzIE5iQmFzZVBpY2tlckNvbXBvbmVudDxELCBELCBOYkNhbGVuZGFyV2l0aFRpbWVDb21wb25lbnQ8RD4+XG4gIGltcGxlbWVudHMgT25Jbml0XG57XG4gIHByb3RlY3RlZCBwaWNrZXJDbGFzczogVHlwZTxOYkNhbGVuZGFyV2l0aFRpbWVDb21wb25lbnQ8RD4+ID0gTmJDYWxlbmRhcldpdGhUaW1lQ29tcG9uZW50O1xuXG4gIGdldCB2YWx1ZSgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLnBpY2tlciA/IHRoaXMucGlja2VyLmRhdGUgOiB1bmRlZmluZWQ7XG4gIH1cbiAgc2V0IHZhbHVlKGRhdGU6IGFueSkge1xuICAgIGlmICghdGhpcy5waWNrZXIpIHtcbiAgICAgIHRoaXMucXVldWUgPSBkYXRlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChkYXRlKSB7XG4gICAgICB0aGlzLnZpc2libGVEYXRlID0gZGF0ZTtcbiAgICAgIHRoaXMucGlja2VyLnZpc2libGVEYXRlID0gZGF0ZTtcbiAgICAgIHRoaXMucGlja2VyLmRhdGUgPSBkYXRlO1xuICAgICAgdGhpcy5waWNrZXIuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIERlZmluZXMgbWludXRlcyBzdGVwIHdoZW4gd2UgdXNlIGZpbGwgdGltZSBmb3JtYXQuXG4gICAqIElmIHNldCB0byAyMCwgaXQgd2lsbCBiZTogJzEyOjAwLCAxMjoyMDogMTI6NDAsIDEzOjAwLi4uJ1xuICAgKiAqL1xuICBASW5wdXQoKSBzdGVwOiBudW1iZXI7XG5cbiAgQElucHV0KCkgdGl0bGU6IHN0cmluZztcbiAgQElucHV0KCkgYXBwbHlCdXR0b25UZXh0OiBzdHJpbmc7XG4gIEBJbnB1dCgpIGN1cnJlbnRUaW1lQnV0dG9uVGV4dDogc3RyaW5nO1xuICBASW5wdXQoKSBzaG93Q3VycmVudFRpbWVCdXR0b24gPSB0cnVlO1xuXG4gIC8qKlxuICAgKiBEZWZpbmVzIDEyIGhvdXJzIGZvcm1hdCBsaWtlICcwNzowMCBQTScuXG4gICAqICovXG4gIEBJbnB1dCgpXG4gIGdldCB0d2VsdmVIb3Vyc0Zvcm1hdCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fdHdlbHZlSG91cnNGb3JtYXQ7XG4gIH1cbiAgc2V0IHR3ZWx2ZUhvdXJzRm9ybWF0KHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fdHdlbHZlSG91cnNGb3JtYXQgPSBjb252ZXJ0VG9Cb29sUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIF90d2VsdmVIb3Vyc0Zvcm1hdDogYm9vbGVhbjtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX3R3ZWx2ZUhvdXJzRm9ybWF0OiBOYkJvb2xlYW5JbnB1dDtcblxuICAvKipcbiAgICogRGVmaW5lcyBzaG91bGQgc2hvdyBhbS9wbSBsYWJlbCBpZiB0d2VsdmVIb3Vyc0Zvcm1hdCBlbmFibGVkLlxuICAgKiAqL1xuICBASW5wdXQoKVxuICBnZXQgc2hvd0FtUG1MYWJlbCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fc2hvd0FtUG1MYWJlbDtcbiAgfVxuICBzZXQgc2hvd0FtUG1MYWJlbCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX3Nob3dBbVBtTGFiZWwgPSBjb252ZXJ0VG9Cb29sUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIHByb3RlY3RlZCBfc2hvd0FtUG1MYWJlbDogYm9vbGVhbiA9IHRydWU7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9zaG93QW1QbUxhYmVsOiBOYkJvb2xlYW5JbnB1dDtcblxuICAvKipcbiAgICogU2hvdyBzZWNvbmRzIGluIHRpbWVwaWNrZXIuXG4gICAqIElnbm9yZWQgd2hlbiBzaW5nbGVDb2x1bW4gaXMgdHJ1ZS5cbiAgICogKi9cbiAgQElucHV0KClcbiAgZ2V0IHdpdGhTZWNvbmRzKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl93aXRoU2Vjb25kcztcbiAgfVxuICBzZXQgd2l0aFNlY29uZHModmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl93aXRoU2Vjb25kcyA9IGNvbnZlcnRUb0Jvb2xQcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgX3dpdGhTZWNvbmRzOiBib29sZWFuO1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfd2l0aFNlY29uZHM6IE5iQm9vbGVhbklucHV0O1xuXG4gIC8qKlxuICAgKiBTaG93IHRpbWVwaWNrZXIgdmFsdWVzIGluIG9uZSBjb2x1bW4gd2l0aCA2MCBtaW51dGVzIHN0ZXAgYnkgZGVmYXVsdC5cbiAgICogKi9cbiAgQElucHV0KClcbiAgZ2V0IHNpbmdsZUNvbHVtbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fc2luZ2xlQ29sdW1uO1xuICB9XG4gIHNldCBzaW5nbGVDb2x1bW4odmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9zaW5nbGVDb2x1bW4gPSBjb252ZXJ0VG9Cb29sUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIF9zaW5nbGVDb2x1bW46IGJvb2xlYW47XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9zaW5nbGVDb2x1bW46IE5iQm9vbGVhbklucHV0O1xuXG4gIC8qKlxuICAgKiBFbWl0cyBkYXRlIHdpdGggdGltZSB3aGVuIHNlbGVjdGVkLlxuICAgKiAqL1xuICBAT3V0cHV0KCkgZ2V0IGRhdGVUaW1lQ2hhbmdlKCk6IEV2ZW50RW1pdHRlcjxEPiB7XG4gICAgcmV0dXJuIHRoaXMudmFsdWVDaGFuZ2UgYXMgRXZlbnRFbWl0dGVyPEQ+O1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChOQl9ET0NVTUVOVCkgZG9jdW1lbnQsXG4gICAgcG9zaXRpb25CdWlsZGVyOiBOYlBvc2l0aW9uQnVpbGRlclNlcnZpY2UsXG4gICAgdHJpZ2dlclN0cmF0ZWd5QnVpbGRlcjogTmJUcmlnZ2VyU3RyYXRlZ3lCdWlsZGVyU2VydmljZSxcbiAgICBvdmVybGF5OiBOYk92ZXJsYXlTZXJ2aWNlLFxuICAgIGNmcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgIGRhdGVTZXJ2aWNlOiBOYkRhdGVTZXJ2aWNlPEQ+LFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTkJfREFURV9TRVJWSUNFX09QVElPTlMpIGRhdGVTZXJ2aWNlT3B0aW9ucyxcbiAgICBwcm90ZWN0ZWQgY2FsZW5kYXJXaXRoVGltZU1vZGVsU2VydmljZTogTmJDYWxlbmRhclRpbWVNb2RlbFNlcnZpY2U8RD4sXG4gICkge1xuICAgIHN1cGVyKGRvY3VtZW50LCBwb3NpdGlvbkJ1aWxkZXIsIHRyaWdnZXJTdHJhdGVneUJ1aWxkZXIsIG92ZXJsYXksIGNmciwgZGF0ZVNlcnZpY2UsIGRhdGVTZXJ2aWNlT3B0aW9ucyk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmZvcm1hdCA9IHRoaXMuZm9ybWF0IHx8IHRoaXMuYnVpbGRUaW1lRm9ybWF0KCk7XG4gICAgdGhpcy5pbml0JC5uZXh0KCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgcGF0Y2hXaXRoSW5wdXRzKCkge1xuICAgIHRoaXMucGlja2VyLnNpbmdsZUNvbHVtbiA9IHRoaXMuc2luZ2xlQ29sdW1uO1xuICAgIHRoaXMucGlja2VyLnR3ZWx2ZUhvdXJzRm9ybWF0ID0gdGhpcy50d2VsdmVIb3Vyc0Zvcm1hdDtcbiAgICB0aGlzLnBpY2tlci5zaG93QW1QbUxhYmVsID0gdGhpcy5zaG93QW1QbUxhYmVsO1xuICAgIHRoaXMucGlja2VyLndpdGhTZWNvbmRzID0gdGhpcy53aXRoU2Vjb25kcztcbiAgICB0aGlzLnBpY2tlci5zdGVwID0gdGhpcy5zdGVwO1xuICAgIHRoaXMucGlja2VyLnRpdGxlID0gdGhpcy50aXRsZTtcbiAgICB0aGlzLnBpY2tlci5hcHBseUJ1dHRvblRleHQgPSB0aGlzLmFwcGx5QnV0dG9uVGV4dDtcbiAgICB0aGlzLnBpY2tlci5jdXJyZW50VGltZUJ1dHRvblRleHQgPSB0aGlzLmN1cnJlbnRUaW1lQnV0dG9uVGV4dDtcbiAgICB0aGlzLnBpY2tlci5zaG93Q3VycmVudFRpbWVCdXR0b24gPSB0aGlzLnNob3dDdXJyZW50VGltZUJ1dHRvbjtcblxuICAgIGlmICh0aGlzLnR3ZWx2ZUhvdXJzRm9ybWF0KSB7XG4gICAgICB0aGlzLnBpY2tlci50aW1lRm9ybWF0ID0gdGhpcy5kYXRlU2VydmljZS5nZXRUd2VsdmVIb3Vyc0Zvcm1hdCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnBpY2tlci50aW1lRm9ybWF0ID1cbiAgICAgICAgdGhpcy53aXRoU2Vjb25kcyAmJiAhdGhpcy5zaW5nbGVDb2x1bW5cbiAgICAgICAgICA/IHRoaXMuZGF0ZVNlcnZpY2UuZ2V0VHdlbnR5Rm91ckhvdXJzRm9ybWF0V2l0aFNlY29uZHMoKVxuICAgICAgICAgIDogdGhpcy5kYXRlU2VydmljZS5nZXRUd2VudHlGb3VySG91cnNGb3JtYXQoKTtcbiAgICB9XG4gICAgc3VwZXIucGF0Y2hXaXRoSW5wdXRzKCk7XG5cbiAgICB0aGlzLnBpY2tlci5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXQgcGlja2VyVmFsdWVDaGFuZ2UoKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5waWNrZXIuZGF0ZUNoYW5nZTtcbiAgfVxuXG4gIHByb3RlY3RlZCB3cml0ZVF1ZXVlKCkge1xuICAgIGlmICh0aGlzLnF1ZXVlKSB7XG4gICAgICBjb25zdCBkYXRlID0gdGhpcy5xdWV1ZTtcbiAgICAgIHRoaXMucXVldWUgPSBudWxsO1xuICAgICAgdGhpcy52YWx1ZSA9IGRhdGU7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIGJ1aWxkVGltZUZvcm1hdCgpOiBzdHJpbmcge1xuICAgIGlmICh0aGlzLnNpbmdsZUNvbHVtbikge1xuICAgICAgcmV0dXJuIHRoaXMuY2FsZW5kYXJXaXRoVGltZU1vZGVsU2VydmljZS5idWlsZERhdGVGb3JtYXQodGhpcy50d2VsdmVIb3Vyc0Zvcm1hdCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmNhbGVuZGFyV2l0aFRpbWVNb2RlbFNlcnZpY2UuYnVpbGREYXRlRm9ybWF0KHRoaXMudHdlbHZlSG91cnNGb3JtYXQsIHRoaXMud2l0aFNlY29uZHMpO1xuICAgIH1cbiAgfVxufVxuIl19