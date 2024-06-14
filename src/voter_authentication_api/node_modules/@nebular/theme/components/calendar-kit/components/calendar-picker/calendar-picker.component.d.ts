/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { EventEmitter, Type } from '@angular/core';
import { NbCalendarCell, NbCalendarSize, NbCalendarSizeValues } from '../../model';
import * as i0 from "@angular/core";
export declare class NbCalendarPickerComponent<D, T> {
    data: D[][];
    visibleDate: D;
    selectedValue: T;
    cellComponent: Type<NbCalendarCell<D, T>>;
    min: D;
    max: D;
    filter: (D: any) => boolean;
    size: NbCalendarSize;
    static ngAcceptInputType_size: NbCalendarSizeValues;
    select: EventEmitter<D>;
    get isLarge(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<NbCalendarPickerComponent<any, any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NbCalendarPickerComponent<any, any>, "nb-calendar-picker", never, { "data": { "alias": "data"; "required": false; }; "visibleDate": { "alias": "visibleDate"; "required": false; }; "selectedValue": { "alias": "selectedValue"; "required": false; }; "cellComponent": { "alias": "cellComponent"; "required": false; }; "min": { "alias": "min"; "required": false; }; "max": { "alias": "max"; "required": false; }; "filter": { "alias": "filter"; "required": false; }; "size": { "alias": "size"; "required": false; }; }, { "select": "select"; }, never, never, false, never>;
}
