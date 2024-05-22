/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { ComponentFactoryResolver, EventEmitter, OnChanges, Type, ViewContainerRef } from '@angular/core';
import { NbCalendarCell, NbCalendarSize, NbCalendarSizeValues } from '../../model';
import * as i0 from "@angular/core";
export declare class NbCalendarPickerRowComponent<D, T> implements OnChanges {
    private cfr;
    row: D[];
    selectedValue: T;
    visibleDate: D;
    component: Type<NbCalendarCell<D, T>>;
    min: D;
    max: D;
    filter: (D: any) => boolean;
    size: NbCalendarSize;
    static ngAcceptInputType_size: NbCalendarSizeValues;
    select: EventEmitter<D>;
    containerRef: ViewContainerRef;
    constructor(cfr: ComponentFactoryResolver);
    ngOnChanges(): void;
    private patchWithContext;
    static ɵfac: i0.ɵɵFactoryDeclaration<NbCalendarPickerRowComponent<any, any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NbCalendarPickerRowComponent<any, any>, "nb-calendar-picker-row", never, { "row": { "alias": "row"; "required": false; }; "selectedValue": { "alias": "selectedValue"; "required": false; }; "visibleDate": { "alias": "visibleDate"; "required": false; }; "component": { "alias": "component"; "required": false; }; "min": { "alias": "min"; "required": false; }; "max": { "alias": "max"; "required": false; }; "filter": { "alias": "filter"; "required": false; }; "size": { "alias": "size"; "required": false; }; }, { "select": "select"; }, never, never, false, never>;
}
