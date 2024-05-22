/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { EventEmitter, OnChanges, SimpleChanges, Type } from '@angular/core';
import { NbCalendarMonthModelService } from '../../services/calendar-month-model.service';
import { NbCalendarCell, NbCalendarSize, NbCalendarSizeValues } from '../../model';
import { NbBooleanInput } from '../../../helpers';
import * as i0 from "@angular/core";
/**
 * Provides capability pick days.
 * */
export declare class NbCalendarDayPickerComponent<D, T> implements OnChanges {
    private monthModel;
    /**
     * Describes which month picker have to render.
     * */
    visibleDate: D;
    /**
     * Defines if we should render previous and next months
     * in the current month view.
     * */
    boundingMonths: boolean;
    /**
     * Minimum available date for selection.
     * */
    min: D;
    /**
     * Maximum available date for selection.
     * */
    max: D;
    /**
     * Predicate that decides which cells will be disabled.
     * */
    filter: (D: any) => boolean;
    /**
     * Custom day cell component. Have to implement `NbCalendarCell` interface.
     * */
    set setCellComponent(cellComponent: Type<NbCalendarCell<D, T>>);
    cellComponent: Type<NbCalendarCell<any, any>>;
    /**
     * Size of the component.
     * Can be 'medium' which is default or 'large'.
     * */
    size: NbCalendarSize;
    static ngAcceptInputType_size: NbCalendarSizeValues;
    /**
     * Already selected date.
     * */
    date: T;
    /**
     * Determines should we show week numbers column.
     * False by default.
     * */
    get showWeekNumber(): boolean;
    set showWeekNumber(value: boolean);
    protected _showWeekNumber: boolean;
    static ngAcceptInputType_showWeekNumber: NbBooleanInput;
    /**
     * Sets symbol used as a header for week numbers column
     * */
    weekNumberSymbol: string;
    /**
     * Sets first day of the week, it can be 1 if week starts from monday and 0 if from sunday and so on.
     * `undefined` means that default locale setting will be used.
     * */
    firstDayOfWeek: number | undefined;
    /**
     * Fires newly selected date.
     * */
    dateChange: EventEmitter<D>;
    get large(): boolean;
    /**
     * Day picker model.
     * Provides all days in current month and if boundingMonth is true some days
     * from previous and next one.
     * */
    weeks: D[][];
    constructor(monthModel: NbCalendarMonthModelService<D>);
    ngOnChanges({ visibleDate, boundingMonths, firstDayOfWeek }: SimpleChanges): void;
    onSelect(day: D): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NbCalendarDayPickerComponent<any, any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NbCalendarDayPickerComponent<any, any>, "nb-calendar-day-picker", never, { "visibleDate": { "alias": "visibleDate"; "required": false; }; "boundingMonths": { "alias": "boundingMonths"; "required": false; }; "min": { "alias": "min"; "required": false; }; "max": { "alias": "max"; "required": false; }; "filter": { "alias": "filter"; "required": false; }; "setCellComponent": { "alias": "cellComponent"; "required": false; }; "size": { "alias": "size"; "required": false; }; "date": { "alias": "date"; "required": false; }; "showWeekNumber": { "alias": "showWeekNumber"; "required": false; }; "weekNumberSymbol": { "alias": "weekNumberSymbol"; "required": false; }; "firstDayOfWeek": { "alias": "firstDayOfWeek"; "required": false; }; }, { "dateChange": "dateChange"; }, never, never, false, never>;
}
