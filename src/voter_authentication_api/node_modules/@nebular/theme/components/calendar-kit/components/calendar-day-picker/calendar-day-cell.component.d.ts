/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { EventEmitter } from '@angular/core';
import { NbCalendarCell, NbCalendarSize, NbCalendarSizeValues } from '../../model';
import { NbDateService } from '../../services/date.service';
import * as i0 from "@angular/core";
export declare class NbCalendarDayCellComponent<D> implements NbCalendarCell<D, D> {
    protected dateService: NbDateService<D>;
    date: D;
    selectedValue: D;
    visibleDate: D;
    min: D;
    max: D;
    filter: (D: any) => boolean;
    size: NbCalendarSize;
    static ngAcceptInputType_size: NbCalendarSizeValues;
    select: EventEmitter<D>;
    constructor(dateService: NbDateService<D>);
    get today(): boolean;
    get boundingMonth(): boolean;
    get selected(): boolean;
    get empty(): boolean;
    get disabled(): boolean;
    get isLarge(): boolean;
    dayCellClass: boolean;
    get day(): number;
    onClick(): void;
    private smallerThanMin;
    private greaterThanMax;
    private dontFitFilter;
    static ɵfac: i0.ɵɵFactoryDeclaration<NbCalendarDayCellComponent<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NbCalendarDayCellComponent<any>, "nb-calendar-day-cell", never, { "date": { "alias": "date"; "required": false; }; "selectedValue": { "alias": "selectedValue"; "required": false; }; "visibleDate": { "alias": "visibleDate"; "required": false; }; "min": { "alias": "min"; "required": false; }; "max": { "alias": "max"; "required": false; }; "filter": { "alias": "filter"; "required": false; }; "size": { "alias": "size"; "required": false; }; }, { "select": "select"; }, never, never, false, never>;
}
