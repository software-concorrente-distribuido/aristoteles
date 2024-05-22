import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "../../../button/button.component";
export class NbCalendarActionsComponent {
    constructor() {
        this._applyButtonText = 'ok';
        this._currentTimeButtonText = 'now';
        this.setCurrentTime = new EventEmitter();
        this.saveValue = new EventEmitter();
    }
    set applyButtonText(value) {
        if (value) {
            this._applyButtonText = value;
        }
    }
    ;
    get applyText() {
        return this._applyButtonText;
    }
    ;
    set currentTimeButtonText(value) {
        if (value) {
            this._currentTimeButtonText = value;
        }
    }
    get currentTimeText() {
        return this._currentTimeButtonText;
    }
    ;
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbCalendarActionsComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.1.0", type: NbCalendarActionsComponent, selector: "nb-calendar-actions", inputs: { applyButtonText: "applyButtonText", currentTimeButtonText: "currentTimeButtonText", showCurrentTimeButton: "showCurrentTimeButton" }, outputs: { setCurrentTime: "setCurrentTime", saveValue: "saveValue" }, ngImport: i0, template: `
    <button
      *ngIf="showCurrentTimeButton"
      nbButton
      ghost
      status="primary"
      size="small"
      (click)="setCurrentTime.emit()">
      {{ currentTimeText }}</button>
    <button
      class="apply-text-button"
      nbButton
      status="primary"
      size="small"
      (click)="saveValue.emit()">
      {{ applyText }}</button>
  `, isInline: true, styles: ["/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */:host{display:flex;justify-content:space-between}[dir=ltr] :host .apply-text-button{margin-left:auto}[dir=rtl] :host .apply-text-button{margin-right:auto}\n"], dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i2.NbButtonComponent, selector: "button[nbButton],a[nbButton],input[type=\"button\"][nbButton],input[type=\"submit\"][nbButton]", inputs: ["hero"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbCalendarActionsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'nb-calendar-actions', template: `
    <button
      *ngIf="showCurrentTimeButton"
      nbButton
      ghost
      status="primary"
      size="small"
      (click)="setCurrentTime.emit()">
      {{ currentTimeText }}</button>
    <button
      class="apply-text-button"
      nbButton
      status="primary"
      size="small"
      (click)="saveValue.emit()">
      {{ applyText }}</button>
  `, changeDetection: ChangeDetectionStrategy.OnPush, styles: ["/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */:host{display:flex;justify-content:space-between}[dir=ltr] :host .apply-text-button{margin-left:auto}[dir=rtl] :host .apply-text-button{margin-right:auto}\n"] }]
        }], propDecorators: { applyButtonText: [{
                type: Input
            }], currentTimeButtonText: [{
                type: Input
            }], showCurrentTimeButton: [{
                type: Input
            }], setCurrentTime: [{
                type: Output
            }], saveValue: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItYWN0aW9ucy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvZnJhbWV3b3JrL3RoZW1lL2NvbXBvbmVudHMvY2FsZW5kYXIta2l0L2NvbXBvbmVudHMvY2FsZW5kYXItYWN0aW9ucy9jYWxlbmRhci1hY3Rpb25zLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7O0FBd0JoRyxNQUFNLE9BQU8sMEJBQTBCO0lBdEJ2QztRQStCWSxxQkFBZ0IsR0FBRyxJQUFJLENBQUM7UUFVbEMsMkJBQXNCLEdBQUcsS0FBSyxDQUFDO1FBSXJCLG1CQUFjLEdBQXVCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDeEQsY0FBUyxHQUF1QixJQUFJLFlBQVksRUFBRSxDQUFDO0tBQzlEO0lBeEJDLElBQWEsZUFBZSxDQUFDLEtBQWE7UUFDeEMsSUFBSSxLQUFLLEVBQUUsQ0FBQztZQUNWLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUM7UUFDaEMsQ0FBQztJQUNILENBQUM7SUFBQSxDQUFDO0lBQ0YsSUFBSSxTQUFTO1FBQ1gsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7SUFDL0IsQ0FBQztJQUFBLENBQUM7SUFHRixJQUFhLHFCQUFxQixDQUFDLEtBQWE7UUFDOUMsSUFBSSxLQUFLLEVBQUUsQ0FBQztZQUNWLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxLQUFLLENBQUM7UUFDdEMsQ0FBQztJQUNILENBQUM7SUFDRCxJQUFJLGVBQWU7UUFDakIsT0FBTyxJQUFJLENBQUMsc0JBQXNCLENBQUM7SUFDckMsQ0FBQztJQUFBLENBQUM7OEdBbEJTLDBCQUEwQjtrR0FBMUIsMEJBQTBCLGtSQXBCM0I7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQlQ7OzJGQUlVLDBCQUEwQjtrQkF0QnRDLFNBQVM7K0JBQ0UscUJBQXFCLFlBQ3JCOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JULG1CQUVnQix1QkFBdUIsQ0FBQyxNQUFNOzhCQUdsQyxlQUFlO3NCQUEzQixLQUFLO2dCQVVPLHFCQUFxQjtzQkFBakMsS0FBSztnQkFVRyxxQkFBcUI7c0JBQTdCLEtBQUs7Z0JBRUksY0FBYztzQkFBdkIsTUFBTTtnQkFDRyxTQUFTO3NCQUFsQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25iLWNhbGVuZGFyLWFjdGlvbnMnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxidXR0b25cbiAgICAgICpuZ0lmPVwic2hvd0N1cnJlbnRUaW1lQnV0dG9uXCJcbiAgICAgIG5iQnV0dG9uXG4gICAgICBnaG9zdFxuICAgICAgc3RhdHVzPVwicHJpbWFyeVwiXG4gICAgICBzaXplPVwic21hbGxcIlxuICAgICAgKGNsaWNrKT1cInNldEN1cnJlbnRUaW1lLmVtaXQoKVwiPlxuICAgICAge3sgY3VycmVudFRpbWVUZXh0IH19PC9idXR0b24+XG4gICAgPGJ1dHRvblxuICAgICAgY2xhc3M9XCJhcHBseS10ZXh0LWJ1dHRvblwiXG4gICAgICBuYkJ1dHRvblxuICAgICAgc3RhdHVzPVwicHJpbWFyeVwiXG4gICAgICBzaXplPVwic21hbGxcIlxuICAgICAgKGNsaWNrKT1cInNhdmVWYWx1ZS5lbWl0KClcIj5cbiAgICAgIHt7IGFwcGx5VGV4dCB9fTwvYnV0dG9uPlxuICBgLFxuICBzdHlsZVVybHM6IFsnLi9jYWxlbmRhci1hY3Rpb25zLmNvbXBvbmVudC5zY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBOYkNhbGVuZGFyQWN0aW9uc0NvbXBvbmVudCB7XG4gIEBJbnB1dCgpIHNldCBhcHBseUJ1dHRvblRleHQodmFsdWU6IHN0cmluZykge1xuICAgIGlmICh2YWx1ZSkge1xuICAgICAgdGhpcy5fYXBwbHlCdXR0b25UZXh0ID0gdmFsdWU7XG4gICAgfVxuICB9O1xuICBnZXQgYXBwbHlUZXh0KCkge1xuICAgIHJldHVybiB0aGlzLl9hcHBseUJ1dHRvblRleHQ7XG4gIH07XG4gIHByb3RlY3RlZCBfYXBwbHlCdXR0b25UZXh0ID0gJ29rJztcblxuICBASW5wdXQoKSBzZXQgY3VycmVudFRpbWVCdXR0b25UZXh0KHZhbHVlOiBzdHJpbmcpIHtcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIHRoaXMuX2N1cnJlbnRUaW1lQnV0dG9uVGV4dCA9IHZhbHVlO1xuICAgIH1cbiAgfVxuICBnZXQgY3VycmVudFRpbWVUZXh0KCkge1xuICAgIHJldHVybiB0aGlzLl9jdXJyZW50VGltZUJ1dHRvblRleHQ7XG4gIH07XG4gIF9jdXJyZW50VGltZUJ1dHRvblRleHQgPSAnbm93JztcblxuICBASW5wdXQoKSBzaG93Q3VycmVudFRpbWVCdXR0b246IGJvb2xlYW47XG5cbiAgQE91dHB1dCgpIHNldEN1cnJlbnRUaW1lOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBzYXZlVmFsdWU6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbn1cbiJdfQ==