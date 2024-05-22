/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, Inject, Input, Output, Optional, } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { ReplaySubject, Subject } from 'rxjs';
import { NbComponentPortal } from '../cdk/overlay/mapping';
import { NbAdjustment, NbPosition, } from '../cdk/overlay/overlay-position';
import { patch } from '../cdk/overlay/overlay-service';
import { NbTrigger } from '../cdk/overlay/overlay-trigger';
import { NbDatepickerContainerComponent } from './datepicker-container.component';
import { NB_DOCUMENT } from '../../theme.options';
import { NbCalendarRangeComponent } from '../calendar/calendar-range.component';
import { NbCalendarComponent } from '../calendar/calendar.component';
import { NbCalendarSize, NbCalendarViewMode, } from '../calendar-kit/model';
import { NB_DATE_SERVICE_OPTIONS, NbDatepicker } from './datepicker.directive';
import { convertToBoolProperty } from '../helpers';
import * as i0 from "@angular/core";
import * as i1 from "../cdk/overlay/overlay-position";
import * as i2 from "../cdk/overlay/overlay-trigger";
import * as i3 from "../cdk/overlay/overlay-service";
import * as i4 from "../calendar-kit/services/date.service";
/**
 * The `NbBasePicker` component concentrates overlay manipulation logic.
 * */
export class NbBasePicker extends NbDatepicker {
    constructor(overlay, positionBuilder, triggerStrategyBuilder, cfr, dateService, dateServiceOptions) {
        super();
        this.overlay = overlay;
        this.positionBuilder = positionBuilder;
        this.triggerStrategyBuilder = triggerStrategyBuilder;
        this.cfr = cfr;
        this.dateService = dateService;
        this.dateServiceOptions = dateServiceOptions;
        this.formatChanged$ = new Subject();
        this.init$ = new ReplaySubject();
        /**
         * Stream of picker changes. Required to be the subject because picker hides and shows and picker
         * change stream becomes recreated.
         * */
        this.onChange$ = new Subject();
        this.overlayOffset = 8;
        this.adjustment = NbAdjustment.COUNTERCLOCKWISE;
        this.destroy$ = new Subject();
        this.blur$ = new Subject();
    }
    /**
     * Returns picker instance.
     * */
    get picker() {
        return this.pickerRef && this.pickerRef.instance;
    }
    /**
     * Stream of picker value changes.
     * */
    get valueChange() {
        return this.onChange$.asObservable();
    }
    get isShown() {
        return this.ref && this.ref.hasAttached();
    }
    get init() {
        return this.init$.asObservable();
    }
    /**
     * Emits when datepicker looses focus.
     */
    get blur() {
        return this.blur$.asObservable();
    }
    /**
     * Datepicker knows nothing about host html input element.
     * So, attach method attaches datepicker to the host input element.
     * */
    attach(hostRef) {
        this.hostRef = hostRef;
        this.subscribeOnTriggers();
    }
    getValidatorConfig() {
        return { min: this.min, max: this.max, filter: this.filter };
    }
    show() {
        if (!this.ref) {
            this.createOverlay();
        }
        this.openDatepicker();
    }
    shouldHide() {
        return this.hideOnSelect && !!this.value;
    }
    hide() {
        if (this.ref) {
            this.ref.detach();
        }
        // save current value if picker was rendered
        if (this.picker) {
            this.queue = this.value;
            this.pickerRef.destroy();
            this.pickerRef = null;
            this.container = null;
        }
    }
    createOverlay() {
        this.positionStrategy = this.createPositionStrategy();
        this.ref = this.overlay.create({
            positionStrategy: this.positionStrategy,
            scrollStrategy: this.overlay.scrollStrategies.reposition(),
        });
        this.subscribeOnPositionChange();
    }
    openDatepicker() {
        this.container = this.ref.attach(new NbComponentPortal(NbDatepickerContainerComponent, null, null, this.cfr));
        this.instantiatePicker();
        this.subscribeOnValueChange();
        this.writeQueue();
        this.patchWithInputs();
        this.pickerRef.changeDetectorRef.markForCheck();
    }
    createPositionStrategy() {
        return this.positionBuilder
            .connectedTo(this.hostRef)
            .position(NbPosition.BOTTOM)
            .offset(this.overlayOffset)
            .adjustment(this.adjustment);
    }
    subscribeOnPositionChange() {
        this.positionStrategy.positionChange
            .pipe(takeUntil(this.destroy$))
            .subscribe((position) => patch(this.container, { position }));
    }
    createTriggerStrategy() {
        return this.triggerStrategyBuilder
            .trigger(NbTrigger.FOCUS)
            .host(this.hostRef.nativeElement)
            .container(() => this.container)
            .build();
    }
    subscribeOnTriggers() {
        this.triggerStrategy = this.createTriggerStrategy();
        this.triggerStrategy.show$.subscribe(() => this.show());
        this.triggerStrategy.hide$.subscribe(() => {
            this.blur$.next();
            this.hide();
        });
    }
    instantiatePicker() {
        this.pickerRef = this.container.instance.attach(new NbComponentPortal(this.pickerClass, null, null, this.cfr));
    }
    /**
     * Subscribes on picker value changes and emit data through this.onChange$ subject.
     * */
    subscribeOnValueChange() {
        this.pickerValueChange.subscribe((date) => {
            this.onChange$.next(date);
        });
    }
    patchWithInputs() {
        this.picker.boundingMonth = this.boundingMonth;
        this.picker.startView = this.startView;
        this.picker.min = this.min;
        this.picker.max = this.max;
        this.picker.filter = this.filter;
        this.picker._cellComponent = this.dayCellComponent;
        this.picker._monthCellComponent = this.monthCellComponent;
        this.picker._yearCellComponent = this.yearCellComponent;
        this.picker.size = this.size;
        this.picker.showNavigation = this.showNavigation;
        this.picker.visibleDate = this.visibleDate;
        this.picker.showWeekNumber = this.showWeekNumber;
        this.picker.weekNumberSymbol = this.weekNumberSymbol;
        this.picker.firstDayOfWeek = this.firstDayOfWeek;
    }
    checkFormat() {
        if (this.dateService.getId() === 'native' && this.format) {
            throw new Error("Can't format native date. To use custom formatting you have to install @nebular/moment or " +
                '@nebular/date-fns package and import NbMomentDateModule or NbDateFnsDateModule accordingly.' +
                'More information at "Formatting issue" ' +
                'https://akveo.github.io/nebular/docs/components/datepicker/overview#nbdatepickercomponent');
        }
        const isFormatSet = this.format || (this.dateServiceOptions && this.dateServiceOptions.format);
        if (this.dateService.getId() === 'date-fns' && !isFormatSet) {
            throw new Error('format is required when using NbDateFnsDateModule');
        }
    }
}
export class NbBasePickerComponent extends NbBasePicker {
    /**
     * Determines should we show week numbers column.
     * False by default.
     * */
    get showWeekNumber() {
        return this._showWeekNumber;
    }
    set showWeekNumber(value) {
        this._showWeekNumber = convertToBoolProperty(value);
    }
    constructor(document, positionBuilder, triggerStrategyBuilder, overlay, cfr, dateService, dateServiceOptions) {
        super(overlay, positionBuilder, triggerStrategyBuilder, cfr, dateService, dateServiceOptions);
        /**
         * Defines if we should render previous and next months
         * in the current month view.
         * */
        this.boundingMonth = true;
        /**
         * Defines starting view for calendar.
         * */
        this.startView = NbCalendarViewMode.DATE;
        /**
         * Size of the calendar and entire components.
         * Can be 'medium' which is default or 'large'.
         * */
        this.size = NbCalendarSize.MEDIUM;
        /**
         * Hide picker when a date or a range is selected, `true` by default
         * @type {boolean}
         */
        this.hideOnSelect = true;
        /**
         * Determines should we show calendars navigation or not.
         * @type {boolean}
         */
        this.showNavigation = true;
        /**
         * Sets symbol used as a header for week numbers column
         * */
        this.weekNumberSymbol = '#';
        this._showWeekNumber = false;
        /**
         * Determines picker overlay offset (in pixels).
         * */
        this.overlayOffset = 8;
        this.adjustment = NbAdjustment.COUNTERCLOCKWISE;
    }
    ngOnInit() {
        this.checkFormat();
        this.init$.next();
    }
    ngOnChanges(changes) {
        if (changes.format) {
            if (!changes.format.isFirstChange()) {
                this.checkFormat();
            }
            this.formatChanged$.next();
        }
        if (this.picker) {
            this.patchWithInputs();
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
        this.hide();
        this.init$.complete();
        if (this.ref) {
            this.ref.dispose();
        }
        if (this.triggerStrategy) {
            this.triggerStrategy.destroy();
        }
    }
    get pickerValueChange() {
        return undefined;
    }
    get value() {
        return undefined;
    }
    set value(value) { }
    writeQueue() { }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbBasePickerComponent, deps: [{ token: NB_DOCUMENT }, { token: i1.NbPositionBuilderService }, { token: i2.NbTriggerStrategyBuilderService }, { token: i3.NbOverlayService }, { token: i0.ComponentFactoryResolver }, { token: i4.NbDateService }, { token: NB_DATE_SERVICE_OPTIONS, optional: true }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.1.0", type: NbBasePickerComponent, selector: "ng-component", inputs: { format: "format", boundingMonth: "boundingMonth", startView: "startView", min: "min", max: "max", filter: "filter", dayCellComponent: "dayCellComponent", monthCellComponent: "monthCellComponent", yearCellComponent: "yearCellComponent", size: "size", visibleDate: "visibleDate", hideOnSelect: "hideOnSelect", showNavigation: "showNavigation", weekNumberSymbol: "weekNumberSymbol", showWeekNumber: "showWeekNumber", firstDayOfWeek: "firstDayOfWeek", overlayOffset: "overlayOffset", adjustment: "adjustment" }, usesInheritance: true, usesOnChanges: true, ngImport: i0, template: '', isInline: true }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbBasePickerComponent, decorators: [{
            type: Component,
            args: [{
                    template: '',
                }]
        }], ctorParameters: () => [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [NB_DOCUMENT]
                }] }, { type: i1.NbPositionBuilderService }, { type: i2.NbTriggerStrategyBuilderService }, { type: i3.NbOverlayService }, { type: i0.ComponentFactoryResolver }, { type: i4.NbDateService }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [NB_DATE_SERVICE_OPTIONS]
                }] }], propDecorators: { format: [{
                type: Input
            }], boundingMonth: [{
                type: Input
            }], startView: [{
                type: Input
            }], min: [{
                type: Input
            }], max: [{
                type: Input
            }], filter: [{
                type: Input
            }], dayCellComponent: [{
                type: Input
            }], monthCellComponent: [{
                type: Input
            }], yearCellComponent: [{
                type: Input
            }], size: [{
                type: Input
            }], visibleDate: [{
                type: Input
            }], hideOnSelect: [{
                type: Input
            }], showNavigation: [{
                type: Input
            }], weekNumberSymbol: [{
                type: Input
            }], showWeekNumber: [{
                type: Input
            }], firstDayOfWeek: [{
                type: Input
            }], overlayOffset: [{
                type: Input
            }], adjustment: [{
                type: Input
            }] } });
/**
 * The DatePicker components itself.
 * Provides a proxy to `NbCalendar` options as well as custom picker options.
 */
export class NbDatepickerComponent extends NbBasePickerComponent {
    constructor() {
        super(...arguments);
        this.pickerClass = NbCalendarComponent;
    }
    /**
     * Date which will be rendered as selected.
     * */
    set date(date) {
        this.value = date;
    }
    /**
     * Emits date when selected.
     * */
    get dateChange() {
        return this.valueChange;
    }
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
        }
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbDatepickerComponent, deps: null, target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.1.0", type: NbDatepickerComponent, selector: "nb-datepicker", inputs: { date: "date" }, outputs: { dateChange: "dateChange" }, usesInheritance: true, ngImport: i0, template: '', isInline: true }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbDatepickerComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nb-datepicker',
                    template: '',
                }]
        }], propDecorators: { date: [{
                type: Input
            }], dateChange: [{
                type: Output
            }] } });
/**
 * The RangeDatePicker components itself.
 * Provides a proxy to `NbCalendarRange` options as well as custom picker options.
 */
export class NbRangepickerComponent extends NbBasePickerComponent {
    constructor() {
        super(...arguments);
        this.pickerClass = NbCalendarRangeComponent;
    }
    /**
     * Range which will be rendered as selected.
     * */
    set range(range) {
        this.value = range;
    }
    /**
     * Emits range when start selected and emits again when end selected.
     * */
    get rangeChange() {
        return this.valueChange;
    }
    get value() {
        return this.picker ? this.picker.range : undefined;
    }
    set value(range) {
        if (!this.picker) {
            this.queue = range;
            return;
        }
        if (range) {
            const visibleDate = range && range.start;
            this.visibleDate = visibleDate;
            this.picker.visibleDate = visibleDate;
            this.picker.range = range;
        }
    }
    get pickerValueChange() {
        return this.picker.rangeChange;
    }
    shouldHide() {
        return super.shouldHide() && !!(this.value && this.value.start && this.value.end);
    }
    writeQueue() {
        if (this.queue) {
            const range = this.queue;
            this.queue = null;
            this.value = range;
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbRangepickerComponent, deps: null, target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.1.0", type: NbRangepickerComponent, selector: "nb-rangepicker", inputs: { range: "range" }, outputs: { rangeChange: "rangeChange" }, usesInheritance: true, ngImport: i0, template: '', isInline: true }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbRangepickerComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nb-rangepicker',
                    template: '',
                }]
        }], propDecorators: { range: [{
                type: Input
            }], rangeChange: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvZnJhbWV3b3JrL3RoZW1lL2NvbXBvbmVudHMvZGF0ZXBpY2tlci9kYXRlcGlja2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUNMLFNBQVMsRUFNVCxNQUFNLEVBQ04sS0FBSyxFQUVMLE1BQU0sRUFJTixRQUFRLEdBQ1QsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBYyxhQUFhLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRTFELE9BQU8sRUFBRSxpQkFBaUIsRUFBZ0IsTUFBTSx3QkFBd0IsQ0FBQztBQUN6RSxPQUFPLEVBRUwsWUFBWSxFQUVaLFVBQVUsR0FFWCxNQUFNLGlDQUFpQyxDQUFDO0FBQ3pDLE9BQU8sRUFBb0IsS0FBSyxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDekUsT0FBTyxFQUFFLFNBQVMsRUFBc0QsTUFBTSxnQ0FBZ0MsQ0FBQztBQUMvRyxPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNsRixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDbEQsT0FBTyxFQUFtQix3QkFBd0IsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQ2pHLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3JFLE9BQU8sRUFFTCxjQUFjLEVBQ2Qsa0JBQWtCLEdBR25CLE1BQU0sdUJBQXVCLENBQUM7QUFFL0IsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFlBQVksRUFBMkIsTUFBTSx3QkFBd0IsQ0FBQztBQUN4RyxPQUFPLEVBQUUscUJBQXFCLEVBQWtCLE1BQU0sWUFBWSxDQUFDOzs7Ozs7QUFFbkU7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SUFFRCxVQUFVO1FBQ1IsT0FBTyxLQUFLLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3BGLENBQUM7SUFFUyxVQUFVO1FBQ2xCLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2YsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUN6QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztZQUNsQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNyQixDQUFDO0lBQ0gsQ0FBQzs4R0FyRFUsc0JBQXNCO2tHQUF0QixzQkFBc0Isa0pBRnZCLEVBQUU7OzJGQUVELHNCQUFzQjtrQkFKbEMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsZ0JBQWdCO29CQUMxQixRQUFRLEVBQUUsRUFBRTtpQkFDYjs4QkFXYyxLQUFLO3NCQUFqQixLQUFLO2dCQU9RLFdBQVc7c0JBQXhCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBBa3Zlby4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi9cblxuaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gIENvbXBvbmVudFJlZixcbiAgT25DaGFuZ2VzLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT3V0cHV0LFxuICBUeXBlLFxuICBPbkluaXQsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIE9wdGlvbmFsLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFJlcGxheVN1YmplY3QsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgTmJDb21wb25lbnRQb3J0YWwsIE5iT3ZlcmxheVJlZiB9IGZyb20gJy4uL2Nkay9vdmVybGF5L21hcHBpbmcnO1xuaW1wb3J0IHtcbiAgTmJBZGp1c3RhYmxlQ29ubmVjdGVkUG9zaXRpb25TdHJhdGVneSxcbiAgTmJBZGp1c3RtZW50LFxuICBOYkFkanVzdG1lbnRWYWx1ZXMsXG4gIE5iUG9zaXRpb24sXG4gIE5iUG9zaXRpb25CdWlsZGVyU2VydmljZSxcbn0gZnJvbSAnLi4vY2RrL292ZXJsYXkvb3ZlcmxheS1wb3NpdGlvbic7XG5pbXBvcnQgeyBOYk92ZXJsYXlTZXJ2aWNlLCBwYXRjaCB9IGZyb20gJy4uL2Nkay9vdmVybGF5L292ZXJsYXktc2VydmljZSc7XG5pbXBvcnQgeyBOYlRyaWdnZXIsIE5iVHJpZ2dlclN0cmF0ZWd5LCBOYlRyaWdnZXJTdHJhdGVneUJ1aWxkZXJTZXJ2aWNlIH0gZnJvbSAnLi4vY2RrL292ZXJsYXkvb3ZlcmxheS10cmlnZ2VyJztcbmltcG9ydCB7IE5iRGF0ZXBpY2tlckNvbnRhaW5lckNvbXBvbmVudCB9IGZyb20gJy4vZGF0ZXBpY2tlci1jb250YWluZXIuY29tcG9uZW50JztcbmltcG9ydCB7IE5CX0RPQ1VNRU5UIH0gZnJvbSAnLi4vLi4vdGhlbWUub3B0aW9ucyc7XG5pbXBvcnQgeyBOYkNhbGVuZGFyUmFuZ2UsIE5iQ2FsZW5kYXJSYW5nZUNvbXBvbmVudCB9IGZyb20gJy4uL2NhbGVuZGFyL2NhbGVuZGFyLXJhbmdlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOYkNhbGVuZGFyQ29tcG9uZW50IH0gZnJvbSAnLi4vY2FsZW5kYXIvY2FsZW5kYXIuY29tcG9uZW50JztcbmltcG9ydCB7XG4gIE5iQ2FsZW5kYXJDZWxsLFxuICBOYkNhbGVuZGFyU2l6ZSxcbiAgTmJDYWxlbmRhclZpZXdNb2RlLFxuICBOYkNhbGVuZGFyU2l6ZVZhbHVlcyxcbiAgTmJDYWxlbmRhclZpZXdNb2RlVmFsdWVzLFxufSBmcm9tICcuLi9jYWxlbmRhci1raXQvbW9kZWwnO1xuaW1wb3J0IHsgTmJEYXRlU2VydmljZSB9IGZyb20gJy4uL2NhbGVuZGFyLWtpdC9zZXJ2aWNlcy9kYXRlLnNlcnZpY2UnO1xuaW1wb3J0IHsgTkJfREFURV9TRVJWSUNFX09QVElPTlMsIE5iRGF0ZXBpY2tlciwgTmJQaWNrZXJWYWxpZGF0b3JDb25maWcgfSBmcm9tICcuL2RhdGVwaWNrZXIuZGlyZWN0aXZlJztcbmltcG9ydCB7IGNvbnZlcnRUb0Jvb2xQcm9wZXJ0eSwgTmJCb29sZWFuSW5wdXQgfSBmcm9tICcuLi9oZWxwZXJzJztcblxuLyoqXG4gKiBUaGUgYE5iQmFzZVBpY2tlcmAgY29tcG9uZW50IGNvbmNlbnRyYXRlcyBvdmVybGF5IG1hbmlwdWxhdGlvbiBsb2dpYy5cbiAqICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgTmJCYXNlUGlja2VyPEQsIFQsIFA+IGV4dGVuZHMgTmJEYXRlcGlja2VyPFQsIEQ+IHtcbiAgLyoqXG4gICAqIERhdGVwaWNrZXIgZGF0ZSBmb3JtYXQuIENhbiBiZSB1c2VkIG9ubHkgd2l0aCBkYXRlIGFkYXB0ZXJzIChtb21lbnQsIGRhdGUtZm5zKSBzaW5jZSBuYXRpdmUgZGF0ZVxuICAgKiBvYmplY3QgZG9lc24ndCBzdXBwb3J0IGZvcm1hdHRpbmcuXG4gICAqICovXG4gIGFic3RyYWN0IGZvcm1hdDogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBEZWZpbmVzIGlmIHdlIHNob3VsZCByZW5kZXIgcHJldmlvdXMgYW5kIG5leHQgbW9udGhzXG4gICAqIGluIHRoZSBjdXJyZW50IG1vbnRoIHZpZXcuXG4gICAqICovXG4gIGFic3RyYWN0IGJvdW5kaW5nTW9udGg6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIERlZmluZXMgc3RhcnRpbmcgdmlldyBmb3IgY2FsZW5kYXIuXG4gICAqICovXG4gIGFic3RyYWN0IHN0YXJ0VmlldzogTmJDYWxlbmRhclZpZXdNb2RlO1xuXG4gIC8qKlxuICAgKiBNaW5pbXVtIGF2YWlsYWJsZSBkYXRlIGZvciBzZWxlY3Rpb24uXG4gICAqICovXG4gIGFic3RyYWN0IG1pbjogRDtcblxuICAvKipcbiAgICogTWF4aW11bSBhdmFpbGFibGUgZGF0ZSBmb3Igc2VsZWN0aW9uLlxuICAgKiAqL1xuICBhYnN0cmFjdCBtYXg6IEQ7XG5cbiAgLyoqXG4gICAqIFByZWRpY2F0ZSB0aGF0IGRlY2lkZXMgd2hpY2ggY2VsbHMgd2lsbCBiZSBkaXNhYmxlZC5cbiAgICogKi9cbiAgYWJzdHJhY3QgZmlsdGVyOiAoRCkgPT4gYm9vbGVhbjtcblxuICAvKipcbiAgICogQ3VzdG9tIGRheSBjZWxsIGNvbXBvbmVudC4gSGF2ZSB0byBpbXBsZW1lbnQgYE5iQ2FsZW5kYXJDZWxsYCBpbnRlcmZhY2UuXG4gICAqICovXG4gIGFic3RyYWN0IGRheUNlbGxDb21wb25lbnQ6IFR5cGU8TmJDYWxlbmRhckNlbGw8RCwgVD4+O1xuXG4gIC8qKlxuICAgKiBDdXN0b20gbW9udGggY2VsbCBjb21wb25lbnQuIEhhdmUgdG8gaW1wbGVtZW50IGBOYkNhbGVuZGFyQ2VsbGAgaW50ZXJmYWNlLlxuICAgKiAqL1xuICBhYnN0cmFjdCBtb250aENlbGxDb21wb25lbnQ6IFR5cGU8TmJDYWxlbmRhckNlbGw8RCwgVD4+O1xuXG4gIC8qKlxuICAgKiBDdXN0b20geWVhciBjZWxsIGNvbXBvbmVudC4gSGF2ZSB0byBpbXBsZW1lbnQgYE5iQ2FsZW5kYXJDZWxsYCBpbnRlcmZhY2UuXG4gICAqICovXG4gIGFic3RyYWN0IHllYXJDZWxsQ29tcG9uZW50OiBUeXBlPE5iQ2FsZW5kYXJDZWxsPEQsIFQ+PjtcblxuICAvKipcbiAgICogU2l6ZSBvZiB0aGUgY2FsZW5kYXIgYW5kIGVudGlyZSBjb21wb25lbnRzLlxuICAgKiBDYW4gYmUgJ21lZGl1bScgd2hpY2ggaXMgZGVmYXVsdCBvciAnbGFyZ2UnLlxuICAgKiAqL1xuICBhYnN0cmFjdCBzaXplOiBOYkNhbGVuZGFyU2l6ZTtcblxuICAvKipcbiAgICogRGVwZW5kaW5nIG9uIHRoaXMgZGF0ZSBhIHBhcnRpY3VsYXIgbW9udGggaXMgc2VsZWN0ZWQgaW4gdGhlIGNhbGVuZGFyXG4gICAqL1xuICBhYnN0cmFjdCB2aXNpYmxlRGF0ZTogRDtcblxuICAvKipcbiAgICogSGlkZSBwaWNrZXIgd2hlbiBhIGRhdGUgb3IgYSByYW5nZSBpcyBzZWxlY3RlZCwgYHRydWVgIGJ5IGRlZmF1bHRcbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqL1xuICBhYnN0cmFjdCBoaWRlT25TZWxlY3Q6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIERldGVybWluZXMgc2hvdWxkIHdlIHNob3cgY2FsZW5kYXIgbmF2aWdhdGlvbiBvciBub3QuXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKi9cbiAgYWJzdHJhY3Qgc2hvd05hdmlnYXRpb246IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFNldHMgc3ltYm9sIHVzZWQgYXMgYSBoZWFkZXIgZm9yIHdlZWsgbnVtYmVycyBjb2x1bW5cbiAgICogKi9cbiAgYWJzdHJhY3Qgd2Vla051bWJlclN5bWJvbDogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmVzIHNob3VsZCB3ZSBzaG93IHdlZWsgbnVtYmVycyBjb2x1bW4uXG4gICAqIEZhbHNlIGJ5IGRlZmF1bHQuXG4gICAqICovXG4gIGFic3RyYWN0IHNob3dXZWVrTnVtYmVyOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBTZXRzIGZpcnN0IGRheSBvZiB0aGUgd2VlaywgaXQgY2FuIGJlIDEgaWYgd2VlayBzdGFydHMgZnJvbSBtb25kYXkgYW5kIDAgaWYgZnJvbSBzdW5kYXkgYW5kIHNvIG9uLlxuICAgKiBgdW5kZWZpbmVkYCBtZWFucyB0aGF0IGRlZmF1bHQgbG9jYWxlIHNldHRpbmcgd2lsbCBiZSB1c2VkLlxuICAgKiAqL1xuICBhYnN0cmFjdCBmaXJzdERheU9mV2VlazogbnVtYmVyIHwgdW5kZWZpbmVkO1xuXG4gIHJlYWRvbmx5IGZvcm1hdENoYW5nZWQkOiBTdWJqZWN0PHZvaWQ+ID0gbmV3IFN1YmplY3QoKTtcblxuICAvKipcbiAgICogQ2FsZW5kYXIgY29tcG9uZW50IGNsYXNzIHRoYXQgaGFzIHRvIGJlIGluc3RhbnRpYXRlZCBpbnNpZGUgb3ZlcmxheS5cbiAgICogKi9cbiAgcHJvdGVjdGVkIGFic3RyYWN0IHBpY2tlckNsYXNzOiBUeXBlPFA+O1xuXG4gIC8qKlxuICAgKiBPdmVybGF5IHJlZmVyZW5jZSBvYmplY3QuXG4gICAqICovXG4gIHByb3RlY3RlZCByZWY6IE5iT3ZlcmxheVJlZjtcblxuICAvKipcbiAgICogRGF0ZXBpY2tlciBjb250YWluZXIgdGhhdCBjb250YWlucyBpbnN0YW50aWF0ZWQgcGlja2VyLlxuICAgKiAqL1xuICBwcm90ZWN0ZWQgY29udGFpbmVyOiBDb21wb25lbnRSZWY8TmJEYXRlcGlja2VyQ29udGFpbmVyQ29tcG9uZW50PjtcblxuICAvKipcbiAgICogUG9zaXRpb25pbmcgc3RyYXRlZ3kgdXNlZCBieSBvdmVybGF5LlxuICAgKiAqL1xuICBwcm90ZWN0ZWQgcG9zaXRpb25TdHJhdGVneTogTmJBZGp1c3RhYmxlQ29ubmVjdGVkUG9zaXRpb25TdHJhdGVneTtcblxuICAvKipcbiAgICogVHJpZ2dlciBzdHJhdGVneSB1c2VkIGJ5IG92ZXJsYXlcbiAgICogKi9cbiAgcHJvdGVjdGVkIHRyaWdnZXJTdHJhdGVneTogTmJUcmlnZ2VyU3RyYXRlZ3k7XG5cbiAgLyoqXG4gICAqIEhUTUwgaW5wdXQgcmVmZXJlbmNlIHRvIHdoaWNoIGRhdGVwaWNrZXIgY29ubmVjdGVkLlxuICAgKiAqL1xuICBwcm90ZWN0ZWQgaG9zdFJlZjogRWxlbWVudFJlZjtcblxuICBwcm90ZWN0ZWQgaW5pdCQ6IFJlcGxheVN1YmplY3Q8dm9pZD4gPSBuZXcgUmVwbGF5U3ViamVjdDx2b2lkPigpO1xuXG4gIC8qKlxuICAgKiBTdHJlYW0gb2YgcGlja2VyIGNoYW5nZXMuIFJlcXVpcmVkIHRvIGJlIHRoZSBzdWJqZWN0IGJlY2F1c2UgcGlja2VyIGhpZGVzIGFuZCBzaG93cyBhbmQgcGlja2VyXG4gICAqIGNoYW5nZSBzdHJlYW0gYmVjb21lcyByZWNyZWF0ZWQuXG4gICAqICovXG4gIHByb3RlY3RlZCBvbkNoYW5nZSQ6IFN1YmplY3Q8VD4gPSBuZXcgU3ViamVjdCgpO1xuXG4gIC8qKlxuICAgKiBSZWZlcmVuY2UgdG8gdGhlIHBpY2tlciBpbnN0YW5jZSBpdHNlbGYuXG4gICAqICovXG4gIHByb3RlY3RlZCBwaWNrZXJSZWY6IENvbXBvbmVudFJlZjxhbnk+O1xuXG4gIHByb3RlY3RlZCBvdmVybGF5T2Zmc2V0ID0gODtcblxuICBwcm90ZWN0ZWQgYWRqdXN0bWVudDogTmJBZGp1c3RtZW50ID0gTmJBZGp1c3RtZW50LkNPVU5URVJDTE9DS1dJU0U7XG5cbiAgcHJvdGVjdGVkIGRlc3Ryb3kkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAvKipcbiAgICogUXVldWUgY29udGFpbnMgdGhlIGxhc3QgdmFsdWUgdGhhdCB3YXMgYXBwbGllZCB0byB0aGUgcGlja2VyIHdoZW4gaXQgd2FzIGhpZGRlbi5cbiAgICogVGhpcyB2YWx1ZSB3aWxsIGJlIHBhc3NlZCB0byB0aGUgcGlja2VyIGFzIHNvb24gYXMgaXQgc2hvd24uXG4gICAqICovXG4gIHByb3RlY3RlZCBxdWV1ZTogVCB8IHVuZGVmaW5lZDtcblxuICBwcm90ZWN0ZWQgYmx1ciQ6IFN1YmplY3Q8dm9pZD4gPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gIHByb3RlY3RlZCBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgb3ZlcmxheTogTmJPdmVybGF5U2VydmljZSxcbiAgICBwcm90ZWN0ZWQgcG9zaXRpb25CdWlsZGVyOiBOYlBvc2l0aW9uQnVpbGRlclNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHRyaWdnZXJTdHJhdGVneUJ1aWxkZXI6IE5iVHJpZ2dlclN0cmF0ZWd5QnVpbGRlclNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGNmcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgIHByb3RlY3RlZCBkYXRlU2VydmljZTogTmJEYXRlU2VydmljZTxEPixcbiAgICBwcm90ZWN0ZWQgZGF0ZVNlcnZpY2VPcHRpb25zLFxuICApIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgcGlja2VyIGluc3RhbmNlLlxuICAgKiAqL1xuICBnZXQgcGlja2VyKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMucGlja2VyUmVmICYmIHRoaXMucGlja2VyUmVmLmluc3RhbmNlO1xuICB9XG5cbiAgLyoqXG4gICAqIFN0cmVhbSBvZiBwaWNrZXIgdmFsdWUgY2hhbmdlcy5cbiAgICogKi9cbiAgZ2V0IHZhbHVlQ2hhbmdlKCk6IE9ic2VydmFibGU8VD4ge1xuICAgIHJldHVybiB0aGlzLm9uQ2hhbmdlJC5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIGdldCBpc1Nob3duKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnJlZiAmJiB0aGlzLnJlZi5oYXNBdHRhY2hlZCgpO1xuICB9XG5cbiAgZ2V0IGluaXQoKTogT2JzZXJ2YWJsZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuaW5pdCQuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICAvKipcbiAgICogRW1pdHMgd2hlbiBkYXRlcGlja2VyIGxvb3NlcyBmb2N1cy5cbiAgICovXG4gIGdldCBibHVyKCk6IE9ic2VydmFibGU8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLmJsdXIkLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGFic3RyYWN0IGdldCBwaWNrZXJWYWx1ZUNoYW5nZSgpOiBPYnNlcnZhYmxlPFQ+O1xuXG4gIC8qKlxuICAgKiBEYXRlcGlja2VyIGtub3dzIG5vdGhpbmcgYWJvdXQgaG9zdCBodG1sIGlucHV0IGVsZW1lbnQuXG4gICAqIFNvLCBhdHRhY2ggbWV0aG9kIGF0dGFjaGVzIGRhdGVwaWNrZXIgdG8gdGhlIGhvc3QgaW5wdXQgZWxlbWVudC5cbiAgICogKi9cbiAgYXR0YWNoKGhvc3RSZWY6IEVsZW1lbnRSZWYpIHtcbiAgICB0aGlzLmhvc3RSZWYgPSBob3N0UmVmO1xuICAgIHRoaXMuc3Vic2NyaWJlT25UcmlnZ2VycygpO1xuICB9XG5cbiAgZ2V0VmFsaWRhdG9yQ29uZmlnKCk6IE5iUGlja2VyVmFsaWRhdG9yQ29uZmlnPEQ+IHtcbiAgICByZXR1cm4geyBtaW46IHRoaXMubWluLCBtYXg6IHRoaXMubWF4LCBmaWx0ZXI6IHRoaXMuZmlsdGVyIH07XG4gIH1cblxuICBzaG93KCkge1xuICAgIGlmICghdGhpcy5yZWYpIHtcbiAgICAgIHRoaXMuY3JlYXRlT3ZlcmxheSgpO1xuICAgIH1cblxuICAgIHRoaXMub3BlbkRhdGVwaWNrZXIoKTtcbiAgfVxuXG4gIHNob3VsZEhpZGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuaGlkZU9uU2VsZWN0ICYmICEhdGhpcy52YWx1ZTtcbiAgfVxuXG4gIGhpZGUoKSB7XG4gICAgaWYgKHRoaXMucmVmKSB7XG4gICAgICB0aGlzLnJlZi5kZXRhY2goKTtcbiAgICB9XG5cbiAgICAvLyBzYXZlIGN1cnJlbnQgdmFsdWUgaWYgcGlja2VyIHdhcyByZW5kZXJlZFxuICAgIGlmICh0aGlzLnBpY2tlcikge1xuICAgICAgdGhpcy5xdWV1ZSA9IHRoaXMudmFsdWU7XG4gICAgICB0aGlzLnBpY2tlclJlZi5kZXN0cm95KCk7XG4gICAgICB0aGlzLnBpY2tlclJlZiA9IG51bGw7XG4gICAgICB0aGlzLmNvbnRhaW5lciA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIGFic3RyYWN0IHdyaXRlUXVldWUoKTtcblxuICBwcm90ZWN0ZWQgY3JlYXRlT3ZlcmxheSgpIHtcbiAgICB0aGlzLnBvc2l0aW9uU3RyYXRlZ3kgPSB0aGlzLmNyZWF0ZVBvc2l0aW9uU3RyYXRlZ3koKTtcbiAgICB0aGlzLnJlZiA9IHRoaXMub3ZlcmxheS5jcmVhdGUoe1xuICAgICAgcG9zaXRpb25TdHJhdGVneTogdGhpcy5wb3NpdGlvblN0cmF0ZWd5LFxuICAgICAgc2Nyb2xsU3RyYXRlZ3k6IHRoaXMub3ZlcmxheS5zY3JvbGxTdHJhdGVnaWVzLnJlcG9zaXRpb24oKSxcbiAgICB9KTtcbiAgICB0aGlzLnN1YnNjcmliZU9uUG9zaXRpb25DaGFuZ2UoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBvcGVuRGF0ZXBpY2tlcigpIHtcbiAgICB0aGlzLmNvbnRhaW5lciA9IHRoaXMucmVmLmF0dGFjaChuZXcgTmJDb21wb25lbnRQb3J0YWwoTmJEYXRlcGlja2VyQ29udGFpbmVyQ29tcG9uZW50LCBudWxsLCBudWxsLCB0aGlzLmNmcikpO1xuICAgIHRoaXMuaW5zdGFudGlhdGVQaWNrZXIoKTtcbiAgICB0aGlzLnN1YnNjcmliZU9uVmFsdWVDaGFuZ2UoKTtcbiAgICB0aGlzLndyaXRlUXVldWUoKTtcbiAgICB0aGlzLnBhdGNoV2l0aElucHV0cygpO1xuICAgIHRoaXMucGlja2VyUmVmLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGNyZWF0ZVBvc2l0aW9uU3RyYXRlZ3koKTogTmJBZGp1c3RhYmxlQ29ubmVjdGVkUG9zaXRpb25TdHJhdGVneSB7XG4gICAgcmV0dXJuIHRoaXMucG9zaXRpb25CdWlsZGVyXG4gICAgICAuY29ubmVjdGVkVG8odGhpcy5ob3N0UmVmKVxuICAgICAgLnBvc2l0aW9uKE5iUG9zaXRpb24uQk9UVE9NKVxuICAgICAgLm9mZnNldCh0aGlzLm92ZXJsYXlPZmZzZXQpXG4gICAgICAuYWRqdXN0bWVudCh0aGlzLmFkanVzdG1lbnQpO1xuICB9XG5cbiAgcHJvdGVjdGVkIHN1YnNjcmliZU9uUG9zaXRpb25DaGFuZ2UoKSB7XG4gICAgdGhpcy5wb3NpdGlvblN0cmF0ZWd5LnBvc2l0aW9uQ2hhbmdlXG4gICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpXG4gICAgICAuc3Vic2NyaWJlKChwb3NpdGlvbjogTmJQb3NpdGlvbikgPT4gcGF0Y2godGhpcy5jb250YWluZXIsIHsgcG9zaXRpb24gfSkpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGNyZWF0ZVRyaWdnZXJTdHJhdGVneSgpOiBOYlRyaWdnZXJTdHJhdGVneSB7XG4gICAgcmV0dXJuIHRoaXMudHJpZ2dlclN0cmF0ZWd5QnVpbGRlclxuICAgICAgLnRyaWdnZXIoTmJUcmlnZ2VyLkZPQ1VTKVxuICAgICAgLmhvc3QodGhpcy5ob3N0UmVmLm5hdGl2ZUVsZW1lbnQpXG4gICAgICAuY29udGFpbmVyKCgpID0+IHRoaXMuY29udGFpbmVyKVxuICAgICAgLmJ1aWxkKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgc3Vic2NyaWJlT25UcmlnZ2VycygpIHtcbiAgICB0aGlzLnRyaWdnZXJTdHJhdGVneSA9IHRoaXMuY3JlYXRlVHJpZ2dlclN0cmF0ZWd5KCk7XG4gICAgdGhpcy50cmlnZ2VyU3RyYXRlZ3kuc2hvdyQuc3Vic2NyaWJlKCgpID0+IHRoaXMuc2hvdygpKTtcbiAgICB0aGlzLnRyaWdnZXJTdHJhdGVneS5oaWRlJC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5ibHVyJC5uZXh0KCk7XG4gICAgICB0aGlzLmhpZGUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByb3RlY3RlZCBpbnN0YW50aWF0ZVBpY2tlcigpIHtcbiAgICB0aGlzLnBpY2tlclJlZiA9IHRoaXMuY29udGFpbmVyLmluc3RhbmNlLmF0dGFjaChuZXcgTmJDb21wb25lbnRQb3J0YWwodGhpcy5waWNrZXJDbGFzcywgbnVsbCwgbnVsbCwgdGhpcy5jZnIpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdWJzY3JpYmVzIG9uIHBpY2tlciB2YWx1ZSBjaGFuZ2VzIGFuZCBlbWl0IGRhdGEgdGhyb3VnaCB0aGlzLm9uQ2hhbmdlJCBzdWJqZWN0LlxuICAgKiAqL1xuICBwcm90ZWN0ZWQgc3Vic2NyaWJlT25WYWx1ZUNoYW5nZSgpIHtcbiAgICB0aGlzLnBpY2tlclZhbHVlQ2hhbmdlLnN1YnNjcmliZSgoZGF0ZSkgPT4ge1xuICAgICAgdGhpcy5vbkNoYW5nZSQubmV4dChkYXRlKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByb3RlY3RlZCBwYXRjaFdpdGhJbnB1dHMoKSB7XG4gICAgdGhpcy5waWNrZXIuYm91bmRpbmdNb250aCA9IHRoaXMuYm91bmRpbmdNb250aDtcbiAgICB0aGlzLnBpY2tlci5zdGFydFZpZXcgPSB0aGlzLnN0YXJ0VmlldztcbiAgICB0aGlzLnBpY2tlci5taW4gPSB0aGlzLm1pbjtcbiAgICB0aGlzLnBpY2tlci5tYXggPSB0aGlzLm1heDtcbiAgICB0aGlzLnBpY2tlci5maWx0ZXIgPSB0aGlzLmZpbHRlcjtcbiAgICB0aGlzLnBpY2tlci5fY2VsbENvbXBvbmVudCA9IHRoaXMuZGF5Q2VsbENvbXBvbmVudDtcbiAgICB0aGlzLnBpY2tlci5fbW9udGhDZWxsQ29tcG9uZW50ID0gdGhpcy5tb250aENlbGxDb21wb25lbnQ7XG4gICAgdGhpcy5waWNrZXIuX3llYXJDZWxsQ29tcG9uZW50ID0gdGhpcy55ZWFyQ2VsbENvbXBvbmVudDtcbiAgICB0aGlzLnBpY2tlci5zaXplID0gdGhpcy5zaXplO1xuICAgIHRoaXMucGlja2VyLnNob3dOYXZpZ2F0aW9uID0gdGhpcy5zaG93TmF2aWdhdGlvbjtcbiAgICB0aGlzLnBpY2tlci52aXNpYmxlRGF0ZSA9IHRoaXMudmlzaWJsZURhdGU7XG4gICAgdGhpcy5waWNrZXIuc2hvd1dlZWtOdW1iZXIgPSB0aGlzLnNob3dXZWVrTnVtYmVyO1xuICAgIHRoaXMucGlja2VyLndlZWtOdW1iZXJTeW1ib2wgPSB0aGlzLndlZWtOdW1iZXJTeW1ib2w7XG4gICAgdGhpcy5waWNrZXIuZmlyc3REYXlPZldlZWsgPSB0aGlzLmZpcnN0RGF5T2ZXZWVrO1xuICB9XG5cbiAgcHJvdGVjdGVkIGNoZWNrRm9ybWF0KCkge1xuICAgIGlmICh0aGlzLmRhdGVTZXJ2aWNlLmdldElkKCkgPT09ICduYXRpdmUnICYmIHRoaXMuZm9ybWF0KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIFwiQ2FuJ3QgZm9ybWF0IG5hdGl2ZSBkYXRlLiBUbyB1c2UgY3VzdG9tIGZvcm1hdHRpbmcgeW91IGhhdmUgdG8gaW5zdGFsbCBAbmVidWxhci9tb21lbnQgb3IgXCIgK1xuICAgICAgICAgICdAbmVidWxhci9kYXRlLWZucyBwYWNrYWdlIGFuZCBpbXBvcnQgTmJNb21lbnREYXRlTW9kdWxlIG9yIE5iRGF0ZUZuc0RhdGVNb2R1bGUgYWNjb3JkaW5nbHkuJyArXG4gICAgICAgICAgJ01vcmUgaW5mb3JtYXRpb24gYXQgXCJGb3JtYXR0aW5nIGlzc3VlXCIgJyArXG4gICAgICAgICAgJ2h0dHBzOi8vYWt2ZW8uZ2l0aHViLmlvL25lYnVsYXIvZG9jcy9jb21wb25lbnRzL2RhdGVwaWNrZXIvb3ZlcnZpZXcjbmJkYXRlcGlja2VyY29tcG9uZW50JyxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgY29uc3QgaXNGb3JtYXRTZXQgPSB0aGlzLmZvcm1hdCB8fCAodGhpcy5kYXRlU2VydmljZU9wdGlvbnMgJiYgdGhpcy5kYXRlU2VydmljZU9wdGlvbnMuZm9ybWF0KTtcbiAgICBpZiAodGhpcy5kYXRlU2VydmljZS5nZXRJZCgpID09PSAnZGF0ZS1mbnMnICYmICFpc0Zvcm1hdFNldCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdmb3JtYXQgaXMgcmVxdWlyZWQgd2hlbiB1c2luZyBOYkRhdGVGbnNEYXRlTW9kdWxlJyk7XG4gICAgfVxuICB9XG59XG5cbkBDb21wb25lbnQoe1xuICB0ZW1wbGF0ZTogJycsXG59KVxuZXhwb3J0IGNsYXNzIE5iQmFzZVBpY2tlckNvbXBvbmVudDxELCBULCBQPiBleHRlbmRzIE5iQmFzZVBpY2tlcjxELCBULCBQPiBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuICAvKipcbiAgICogRGF0ZXBpY2tlciBkYXRlIGZvcm1hdC4gQ2FuIGJlIHVzZWQgb25seSB3aXRoIGRhdGUgYWRhcHRlcnMgKG1vbWVudCwgZGF0ZS1mbnMpIHNpbmNlIG5hdGl2ZSBkYXRlXG4gICAqIG9iamVjdCBkb2Vzbid0IHN1cHBvcnQgZm9ybWF0dGluZy5cbiAgICogKi9cbiAgQElucHV0KCkgZm9ybWF0OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIERlZmluZXMgaWYgd2Ugc2hvdWxkIHJlbmRlciBwcmV2aW91cyBhbmQgbmV4dCBtb250aHNcbiAgICogaW4gdGhlIGN1cnJlbnQgbW9udGggdmlldy5cbiAgICogKi9cbiAgQElucHV0KCkgYm91bmRpbmdNb250aDogYm9vbGVhbiA9IHRydWU7XG5cbiAgLyoqXG4gICAqIERlZmluZXMgc3RhcnRpbmcgdmlldyBmb3IgY2FsZW5kYXIuXG4gICAqICovXG4gIEBJbnB1dCgpIHN0YXJ0VmlldzogTmJDYWxlbmRhclZpZXdNb2RlID0gTmJDYWxlbmRhclZpZXdNb2RlLkRBVEU7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9zdGFydFZpZXc6IE5iQ2FsZW5kYXJWaWV3TW9kZVZhbHVlcztcblxuICAvKipcbiAgICogTWluaW11bSBhdmFpbGFibGUgZGF0ZSBmb3Igc2VsZWN0aW9uLlxuICAgKiAqL1xuICBASW5wdXQoKSBtaW46IEQ7XG5cbiAgLyoqXG4gICAqIE1heGltdW0gYXZhaWxhYmxlIGRhdGUgZm9yIHNlbGVjdGlvbi5cbiAgICogKi9cbiAgQElucHV0KCkgbWF4OiBEO1xuXG4gIC8qKlxuICAgKiBQcmVkaWNhdGUgdGhhdCBkZWNpZGVzIHdoaWNoIGNlbGxzIHdpbGwgYmUgZGlzYWJsZWQuXG4gICAqICovXG4gIEBJbnB1dCgpIGZpbHRlcjogKEQpID0+IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEN1c3RvbSBkYXkgY2VsbCBjb21wb25lbnQuIEhhdmUgdG8gaW1wbGVtZW50IGBOYkNhbGVuZGFyQ2VsbGAgaW50ZXJmYWNlLlxuICAgKiAqL1xuICBASW5wdXQoKSBkYXlDZWxsQ29tcG9uZW50OiBUeXBlPE5iQ2FsZW5kYXJDZWxsPEQsIFQ+PjtcblxuICAvKipcbiAgICogQ3VzdG9tIG1vbnRoIGNlbGwgY29tcG9uZW50LiBIYXZlIHRvIGltcGxlbWVudCBgTmJDYWxlbmRhckNlbGxgIGludGVyZmFjZS5cbiAgICogKi9cbiAgQElucHV0KCkgbW9udGhDZWxsQ29tcG9uZW50OiBUeXBlPE5iQ2FsZW5kYXJDZWxsPEQsIFQ+PjtcblxuICAvKipcbiAgICogQ3VzdG9tIHllYXIgY2VsbCBjb21wb25lbnQuIEhhdmUgdG8gaW1wbGVtZW50IGBOYkNhbGVuZGFyQ2VsbGAgaW50ZXJmYWNlLlxuICAgKiAqL1xuICBASW5wdXQoKSB5ZWFyQ2VsbENvbXBvbmVudDogVHlwZTxOYkNhbGVuZGFyQ2VsbDxELCBUPj47XG5cbiAgLyoqXG4gICAqIFNpemUgb2YgdGhlIGNhbGVuZGFyIGFuZCBlbnRpcmUgY29tcG9uZW50cy5cbiAgICogQ2FuIGJlICdtZWRpdW0nIHdoaWNoIGlzIGRlZmF1bHQgb3IgJ2xhcmdlJy5cbiAgICogKi9cbiAgQElucHV0KCkgc2l6ZTogTmJDYWxlbmRhclNpemUgPSBOYkNhbGVuZGFyU2l6ZS5NRURJVU07XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9zaXplOiBOYkNhbGVuZGFyU2l6ZVZhbHVlcztcblxuICAvKipcbiAgICogRGVwZW5kaW5nIG9uIHRoaXMgZGF0ZSBhIHBhcnRpY3VsYXIgbW9udGggaXMgc2VsZWN0ZWQgaW4gdGhlIGNhbGVuZGFyXG4gICAqL1xuICBASW5wdXQoKSB2aXNpYmxlRGF0ZTogRDtcblxuICAvKipcbiAgICogSGlkZSBwaWNrZXIgd2hlbiBhIGRhdGUgb3IgYSByYW5nZSBpcyBzZWxlY3RlZCwgYHRydWVgIGJ5IGRlZmF1bHRcbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqL1xuICBASW5wdXQoKSBoaWRlT25TZWxlY3Q6IGJvb2xlYW4gPSB0cnVlO1xuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmVzIHNob3VsZCB3ZSBzaG93IGNhbGVuZGFycyBuYXZpZ2F0aW9uIG9yIG5vdC5cbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqL1xuICBASW5wdXQoKSBzaG93TmF2aWdhdGlvbjogYm9vbGVhbiA9IHRydWU7XG5cbiAgLyoqXG4gICAqIFNldHMgc3ltYm9sIHVzZWQgYXMgYSBoZWFkZXIgZm9yIHdlZWsgbnVtYmVycyBjb2x1bW5cbiAgICogKi9cbiAgQElucHV0KCkgd2Vla051bWJlclN5bWJvbDogc3RyaW5nID0gJyMnO1xuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmVzIHNob3VsZCB3ZSBzaG93IHdlZWsgbnVtYmVycyBjb2x1bW4uXG4gICAqIEZhbHNlIGJ5IGRlZmF1bHQuXG4gICAqICovXG4gIEBJbnB1dCgpXG4gIGdldCBzaG93V2Vla051bWJlcigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fc2hvd1dlZWtOdW1iZXI7XG4gIH1cbiAgc2V0IHNob3dXZWVrTnVtYmVyKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fc2hvd1dlZWtOdW1iZXIgPSBjb252ZXJ0VG9Cb29sUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIHByb3RlY3RlZCBfc2hvd1dlZWtOdW1iZXI6IGJvb2xlYW4gPSBmYWxzZTtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX3Nob3dXZWVrTnVtYmVyOiBOYkJvb2xlYW5JbnB1dDtcblxuICBASW5wdXQoKSBmaXJzdERheU9mV2VlazogbnVtYmVyIHwgdW5kZWZpbmVkO1xuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmVzIHBpY2tlciBvdmVybGF5IG9mZnNldCAoaW4gcGl4ZWxzKS5cbiAgICogKi9cbiAgQElucHV0KCkgb3ZlcmxheU9mZnNldCA9IDg7XG5cbiAgQElucHV0KCkgYWRqdXN0bWVudDogTmJBZGp1c3RtZW50ID0gTmJBZGp1c3RtZW50LkNPVU5URVJDTE9DS1dJU0U7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9hZGp1c3RtZW50OiBOYkFkanVzdG1lbnRWYWx1ZXM7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChOQl9ET0NVTUVOVCkgZG9jdW1lbnQsXG4gICAgcG9zaXRpb25CdWlsZGVyOiBOYlBvc2l0aW9uQnVpbGRlclNlcnZpY2UsXG4gICAgdHJpZ2dlclN0cmF0ZWd5QnVpbGRlcjogTmJUcmlnZ2VyU3RyYXRlZ3lCdWlsZGVyU2VydmljZSxcbiAgICBvdmVybGF5OiBOYk92ZXJsYXlTZXJ2aWNlLFxuICAgIGNmcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgIGRhdGVTZXJ2aWNlOiBOYkRhdGVTZXJ2aWNlPEQ+LFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTkJfREFURV9TRVJWSUNFX09QVElPTlMpIGRhdGVTZXJ2aWNlT3B0aW9ucyxcbiAgKSB7XG4gICAgc3VwZXIob3ZlcmxheSwgcG9zaXRpb25CdWlsZGVyLCB0cmlnZ2VyU3RyYXRlZ3lCdWlsZGVyLCBjZnIsIGRhdGVTZXJ2aWNlLCBkYXRlU2VydmljZU9wdGlvbnMpO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5jaGVja0Zvcm1hdCgpO1xuICAgIHRoaXMuaW5pdCQubmV4dCgpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChjaGFuZ2VzLmZvcm1hdCkge1xuICAgICAgaWYgKCFjaGFuZ2VzLmZvcm1hdC5pc0ZpcnN0Q2hhbmdlKCkpIHtcbiAgICAgICAgdGhpcy5jaGVja0Zvcm1hdCgpO1xuICAgICAgfVxuICAgICAgdGhpcy5mb3JtYXRDaGFuZ2VkJC5uZXh0KCk7XG4gICAgfVxuICAgIGlmICh0aGlzLnBpY2tlcikge1xuICAgICAgdGhpcy5wYXRjaFdpdGhJbnB1dHMoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmRlc3Ryb3kkLm5leHQoKTtcbiAgICB0aGlzLmRlc3Ryb3kkLmNvbXBsZXRlKCk7XG4gICAgdGhpcy5oaWRlKCk7XG4gICAgdGhpcy5pbml0JC5jb21wbGV0ZSgpO1xuXG4gICAgaWYgKHRoaXMucmVmKSB7XG4gICAgICB0aGlzLnJlZi5kaXNwb3NlKCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMudHJpZ2dlclN0cmF0ZWd5KSB7XG4gICAgICB0aGlzLnRyaWdnZXJTdHJhdGVneS5kZXN0cm95KCk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIHBpY2tlckNsYXNzOiBUeXBlPFA+O1xuXG4gIHByb3RlY3RlZCBnZXQgcGlja2VyVmFsdWVDaGFuZ2UoKTogT2JzZXJ2YWJsZTxUPiB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIGdldCB2YWx1ZSgpOiBUIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG4gIHNldCB2YWx1ZSh2YWx1ZTogVCkge31cblxuICBwcm90ZWN0ZWQgd3JpdGVRdWV1ZSgpIHt9XG59XG5cbi8qKlxuICogVGhlIERhdGVQaWNrZXIgY29tcG9uZW50cyBpdHNlbGYuXG4gKiBQcm92aWRlcyBhIHByb3h5IHRvIGBOYkNhbGVuZGFyYCBvcHRpb25zIGFzIHdlbGwgYXMgY3VzdG9tIHBpY2tlciBvcHRpb25zLlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduYi1kYXRlcGlja2VyJyxcbiAgdGVtcGxhdGU6ICcnLFxufSlcbmV4cG9ydCBjbGFzcyBOYkRhdGVwaWNrZXJDb21wb25lbnQ8RD4gZXh0ZW5kcyBOYkJhc2VQaWNrZXJDb21wb25lbnQ8RCwgRCwgTmJDYWxlbmRhckNvbXBvbmVudDxEPj4ge1xuICBwcm90ZWN0ZWQgcGlja2VyQ2xhc3M6IFR5cGU8TmJDYWxlbmRhckNvbXBvbmVudDxEPj4gPSBOYkNhbGVuZGFyQ29tcG9uZW50O1xuXG4gIC8qKlxuICAgKiBEYXRlIHdoaWNoIHdpbGwgYmUgcmVuZGVyZWQgYXMgc2VsZWN0ZWQuXG4gICAqICovXG4gIEBJbnB1dCgpIHNldCBkYXRlKGRhdGU6IEQpIHtcbiAgICB0aGlzLnZhbHVlID0gZGF0ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFbWl0cyBkYXRlIHdoZW4gc2VsZWN0ZWQuXG4gICAqICovXG4gIEBPdXRwdXQoKSBnZXQgZGF0ZUNoYW5nZSgpOiBFdmVudEVtaXR0ZXI8RD4ge1xuICAgIHJldHVybiB0aGlzLnZhbHVlQ2hhbmdlIGFzIEV2ZW50RW1pdHRlcjxEPjtcbiAgfVxuXG4gIGdldCB2YWx1ZSgpOiBEIHtcbiAgICByZXR1cm4gdGhpcy5waWNrZXIgPyB0aGlzLnBpY2tlci5kYXRlIDogdW5kZWZpbmVkO1xuICB9XG5cbiAgc2V0IHZhbHVlKGRhdGU6IEQpIHtcbiAgICBpZiAoIXRoaXMucGlja2VyKSB7XG4gICAgICB0aGlzLnF1ZXVlID0gZGF0ZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoZGF0ZSkge1xuICAgICAgdGhpcy52aXNpYmxlRGF0ZSA9IGRhdGU7XG4gICAgICB0aGlzLnBpY2tlci52aXNpYmxlRGF0ZSA9IGRhdGU7XG4gICAgICB0aGlzLnBpY2tlci5kYXRlID0gZGF0ZTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0IHBpY2tlclZhbHVlQ2hhbmdlKCk6IE9ic2VydmFibGU8RD4ge1xuICAgIHJldHVybiB0aGlzLnBpY2tlci5kYXRlQ2hhbmdlO1xuICB9XG5cbiAgcHJvdGVjdGVkIHdyaXRlUXVldWUoKSB7XG4gICAgaWYgKHRoaXMucXVldWUpIHtcbiAgICAgIGNvbnN0IGRhdGUgPSB0aGlzLnF1ZXVlO1xuICAgICAgdGhpcy5xdWV1ZSA9IG51bGw7XG4gICAgICB0aGlzLnZhbHVlID0gZGF0ZTtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBUaGUgUmFuZ2VEYXRlUGlja2VyIGNvbXBvbmVudHMgaXRzZWxmLlxuICogUHJvdmlkZXMgYSBwcm94eSB0byBgTmJDYWxlbmRhclJhbmdlYCBvcHRpb25zIGFzIHdlbGwgYXMgY3VzdG9tIHBpY2tlciBvcHRpb25zLlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduYi1yYW5nZXBpY2tlcicsXG4gIHRlbXBsYXRlOiAnJyxcbn0pXG5leHBvcnQgY2xhc3MgTmJSYW5nZXBpY2tlckNvbXBvbmVudDxEPiBleHRlbmRzIE5iQmFzZVBpY2tlckNvbXBvbmVudDxcbiAgRCxcbiAgTmJDYWxlbmRhclJhbmdlPEQ+LFxuICBOYkNhbGVuZGFyUmFuZ2VDb21wb25lbnQ8RD5cbj4ge1xuICBwcm90ZWN0ZWQgcGlja2VyQ2xhc3M6IFR5cGU8TmJDYWxlbmRhclJhbmdlQ29tcG9uZW50PEQ+PiA9IE5iQ2FsZW5kYXJSYW5nZUNvbXBvbmVudDtcblxuICAvKipcbiAgICogUmFuZ2Ugd2hpY2ggd2lsbCBiZSByZW5kZXJlZCBhcyBzZWxlY3RlZC5cbiAgICogKi9cbiAgQElucHV0KCkgc2V0IHJhbmdlKHJhbmdlOiBOYkNhbGVuZGFyUmFuZ2U8RD4pIHtcbiAgICB0aGlzLnZhbHVlID0gcmFuZ2U7XG4gIH1cblxuICAvKipcbiAgICogRW1pdHMgcmFuZ2Ugd2hlbiBzdGFydCBzZWxlY3RlZCBhbmQgZW1pdHMgYWdhaW4gd2hlbiBlbmQgc2VsZWN0ZWQuXG4gICAqICovXG4gIEBPdXRwdXQoKSBnZXQgcmFuZ2VDaGFuZ2UoKTogRXZlbnRFbWl0dGVyPE5iQ2FsZW5kYXJSYW5nZTxEPj4ge1xuICAgIHJldHVybiB0aGlzLnZhbHVlQ2hhbmdlIGFzIEV2ZW50RW1pdHRlcjxOYkNhbGVuZGFyUmFuZ2U8RD4+O1xuICB9XG5cbiAgZ2V0IHZhbHVlKCk6IE5iQ2FsZW5kYXJSYW5nZTxEPiB7XG4gICAgcmV0dXJuIHRoaXMucGlja2VyID8gdGhpcy5waWNrZXIucmFuZ2UgOiB1bmRlZmluZWQ7XG4gIH1cblxuICBzZXQgdmFsdWUocmFuZ2U6IE5iQ2FsZW5kYXJSYW5nZTxEPikge1xuICAgIGlmICghdGhpcy5waWNrZXIpIHtcbiAgICAgIHRoaXMucXVldWUgPSByYW5nZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAocmFuZ2UpIHtcbiAgICAgIGNvbnN0IHZpc2libGVEYXRlID0gcmFuZ2UgJiYgcmFuZ2Uuc3RhcnQ7XG4gICAgICB0aGlzLnZpc2libGVEYXRlID0gdmlzaWJsZURhdGU7XG4gICAgICB0aGlzLnBpY2tlci52aXNpYmxlRGF0ZSA9IHZpc2libGVEYXRlO1xuICAgICAgdGhpcy5waWNrZXIucmFuZ2UgPSByYW5nZTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0IHBpY2tlclZhbHVlQ2hhbmdlKCk6IE9ic2VydmFibGU8TmJDYWxlbmRhclJhbmdlPEQ+PiB7XG4gICAgcmV0dXJuIHRoaXMucGlja2VyLnJhbmdlQ2hhbmdlO1xuICB9XG5cbiAgc2hvdWxkSGlkZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gc3VwZXIuc2hvdWxkSGlkZSgpICYmICEhKHRoaXMudmFsdWUgJiYgdGhpcy52YWx1ZS5zdGFydCAmJiB0aGlzLnZhbHVlLmVuZCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgd3JpdGVRdWV1ZSgpIHtcbiAgICBpZiAodGhpcy5xdWV1ZSkge1xuICAgICAgY29uc3QgcmFuZ2UgPSB0aGlzLnF1ZXVlO1xuICAgICAgdGhpcy5xdWV1ZSA9IG51bGw7XG4gICAgICB0aGlzLnZhbHVlID0gcmFuZ2U7XG4gICAgfVxuICB9XG59XG4iXX0=