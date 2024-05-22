import { EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
export declare class NbCalendarActionsComponent {
    set applyButtonText(value: string);
    get applyText(): string;
    protected _applyButtonText: string;
    set currentTimeButtonText(value: string);
    get currentTimeText(): string;
    _currentTimeButtonText: string;
    showCurrentTimeButton: boolean;
    setCurrentTime: EventEmitter<void>;
    saveValue: EventEmitter<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<NbCalendarActionsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NbCalendarActionsComponent, "nb-calendar-actions", never, { "applyButtonText": { "alias": "applyButtonText"; "required": false; }; "currentTimeButtonText": { "alias": "currentTimeButtonText"; "required": false; }; "showCurrentTimeButton": { "alias": "showCurrentTimeButton"; "required": false; }; }, { "setCurrentTime": "setCurrentTime"; "saveValue": "saveValue"; }, never, never, false, never>;
}
