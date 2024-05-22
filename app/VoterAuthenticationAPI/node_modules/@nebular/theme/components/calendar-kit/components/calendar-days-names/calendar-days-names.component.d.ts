/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { NbCalendarDay, NbCalendarSize, NbCalendarSizeValues } from '../../model';
import { NbDateService } from '../../services/date.service';
import * as i0 from "@angular/core";
export declare class NbCalendarDaysNamesComponent<D> implements OnInit, OnChanges {
    private dateService;
    days: NbCalendarDay[];
    size: NbCalendarSize;
    static ngAcceptInputType_size: NbCalendarSizeValues;
    get isLarge(): boolean;
    /**
     * Sets first day of the week, it can be 1 if week starts from monday and 0 if from sunday and so on.
     * `undefined` means that default locale setting will be used.
     * */
    firstDayOfWeek: number | undefined;
    constructor(dateService: NbDateService<D>);
    ngOnInit(): void;
    ngOnChanges({ firstDayOfWeek }: SimpleChanges): void;
    private createDaysNames;
    private shiftStartOfWeek;
    private markIfHoliday;
    static ɵfac: i0.ɵɵFactoryDeclaration<NbCalendarDaysNamesComponent<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NbCalendarDaysNamesComponent<any>, "nb-calendar-days-names", never, { "size": { "alias": "size"; "required": false; }; "firstDayOfWeek": { "alias": "firstDayOfWeek"; "required": false; }; }, {}, never, never, false, never>;
}
