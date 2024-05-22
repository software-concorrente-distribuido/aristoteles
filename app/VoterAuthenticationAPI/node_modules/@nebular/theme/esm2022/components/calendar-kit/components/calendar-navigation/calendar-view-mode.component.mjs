/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { TranslationWidth } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { NbCalendarViewMode } from '../../model';
import * as i0 from "@angular/core";
import * as i1 from "../../services/date.service";
import * as i2 from "../../services/calendar-year-model.service";
import * as i3 from "../../../button/button.component";
import * as i4 from "../../../icon/icon.component";
export class NbCalendarViewModeComponent {
    constructor(dateService, yearModelService) {
        this.dateService = dateService;
        this.yearModelService = yearModelService;
        this.viewMode = NbCalendarViewMode.DATE;
        this.changeMode = new EventEmitter(true);
    }
    getText() {
        if (!this.date) {
            return '';
        }
        switch (this.viewMode) {
            case NbCalendarViewMode.DATE: {
                const month = this.dateService.getMonthName(this.date, TranslationWidth.Wide);
                const year = this.dateService.getYear(this.date);
                return `${month} ${year}`;
            }
            case NbCalendarViewMode.MONTH:
                return `${this.dateService.getYear(this.date)}`;
            case NbCalendarViewMode.YEAR:
                return `${this.getFirstYear()} - ${this.getLastYear()}`;
        }
    }
    getIcon() {
        if (this.viewMode === NbCalendarViewMode.DATE) {
            return 'chevron-down-outline';
        }
        return 'chevron-up-outline';
    }
    getFirstYear() {
        const years = this.yearModelService.getViewYears(this.date);
        return this.dateService.getYear(years[0][0]).toString();
    }
    getLastYear() {
        const years = this.yearModelService.getViewYears(this.date);
        const lastRow = years[years.length - 1];
        const lastYear = lastRow[lastRow.length - 1];
        return this.dateService.getYear(lastYear).toString();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbCalendarViewModeComponent, deps: [{ token: i1.NbDateService }, { token: i2.NbCalendarYearModelService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.1.0", type: NbCalendarViewModeComponent, selector: "nb-calendar-view-mode", inputs: { date: "date", viewMode: "viewMode" }, outputs: { changeMode: "changeMode" }, ngImport: i0, template: `
    <button nbButton (click)="changeMode.emit()" ghost status="basic">
      {{ getText() }}
      <nb-icon [icon]="getIcon()" pack="nebular-essentials"></nb-icon>
    </button>
  `, isInline: true, dependencies: [{ kind: "component", type: i3.NbButtonComponent, selector: "button[nbButton],a[nbButton],input[type=\"button\"][nbButton],input[type=\"submit\"][nbButton]", inputs: ["hero"] }, { kind: "component", type: i4.NbIconComponent, selector: "nb-icon", inputs: ["icon", "pack", "options", "status", "config"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbCalendarViewModeComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nb-calendar-view-mode',
                    template: `
    <button nbButton (click)="changeMode.emit()" ghost status="basic">
      {{ getText() }}
      <nb-icon [icon]="getIcon()" pack="nebular-essentials"></nb-icon>
    </button>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], ctorParameters: () => [{ type: i1.NbDateService }, { type: i2.NbCalendarYearModelService }], propDecorators: { date: [{
                type: Input
            }], viewMode: [{
                type: Input
            }], changeMode: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItdmlldy1tb2RlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9mcmFtZXdvcmsvdGhlbWUvY29tcG9uZW50cy9jYWxlbmRhci1raXQvY29tcG9uZW50cy9jYWxlbmRhci1uYXZpZ2F0aW9uL2NhbGVuZGFyLXZpZXctbW9kZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRW5ELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEcsT0FBTyxFQUFFLGtCQUFrQixFQUE0QixNQUFNLGFBQWEsQ0FBQzs7Ozs7O0FBZTNFLE1BQU0sT0FBTywyQkFBMkI7SUFNdEMsWUFDWSxXQUE2QixFQUM3QixnQkFBK0M7UUFEL0MsZ0JBQVcsR0FBWCxXQUFXLENBQWtCO1FBQzdCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBK0I7UUFObEQsYUFBUSxHQUF1QixrQkFBa0IsQ0FBQyxJQUFJLENBQUM7UUFFdEQsZUFBVSxHQUFHLElBQUksWUFBWSxDQUFPLElBQUksQ0FBQyxDQUFDO0lBS2pELENBQUM7SUFFSixPQUFPO1FBQ0wsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNmLE9BQU8sRUFBRSxDQUFDO1FBQ1osQ0FBQztRQUVELFFBQVEsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3RCLEtBQUssa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDN0IsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDOUUsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNqRCxPQUFPLEdBQUcsS0FBSyxJQUFJLElBQUksRUFBRSxDQUFDO1lBQzVCLENBQUM7WUFDRCxLQUFLLGtCQUFrQixDQUFDLEtBQUs7Z0JBQzNCLE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUNsRCxLQUFLLGtCQUFrQixDQUFDLElBQUk7Z0JBQzFCLE9BQU8sR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLE1BQU0sSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUM7UUFDNUQsQ0FBQztJQUNILENBQUM7SUFFRCxPQUFPO1FBQ0wsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLGtCQUFrQixDQUFDLElBQUksRUFBRSxDQUFDO1lBQzlDLE9BQU8sc0JBQXNCLENBQUM7UUFDaEMsQ0FBQztRQUVELE9BQU8sb0JBQW9CLENBQUM7SUFDOUIsQ0FBQztJQUVTLFlBQVk7UUFDcEIsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUQsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUMxRCxDQUFDO0lBRVMsV0FBVztRQUNuQixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1RCxNQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztRQUN4QyxNQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztRQUU3QyxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3ZELENBQUM7OEdBaERVLDJCQUEyQjtrR0FBM0IsMkJBQTJCLG9KQVI1Qjs7Ozs7R0FLVDs7MkZBR1UsMkJBQTJCO2tCQVZ2QyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSx1QkFBdUI7b0JBQ2pDLFFBQVEsRUFBRTs7Ozs7R0FLVDtvQkFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtpQkFDaEQ7MkhBRVUsSUFBSTtzQkFBWixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBRUksVUFBVTtzQkFBbkIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBBa3Zlby4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi9cblxuaW1wb3J0IHsgVHJhbnNsYXRpb25XaWR0aCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmJDYWxlbmRhclZpZXdNb2RlLCBOYkNhbGVuZGFyVmlld01vZGVWYWx1ZXMgfSBmcm9tICcuLi8uLi9tb2RlbCc7XG5pbXBvcnQgeyBOYkNhbGVuZGFyWWVhck1vZGVsU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2NhbGVuZGFyLXllYXItbW9kZWwuc2VydmljZSc7XG5pbXBvcnQgeyBOYkRhdGVTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZGF0ZS5zZXJ2aWNlJztcblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduYi1jYWxlbmRhci12aWV3LW1vZGUnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxidXR0b24gbmJCdXR0b24gKGNsaWNrKT1cImNoYW5nZU1vZGUuZW1pdCgpXCIgZ2hvc3Qgc3RhdHVzPVwiYmFzaWNcIj5cbiAgICAgIHt7IGdldFRleHQoKSB9fVxuICAgICAgPG5iLWljb24gW2ljb25dPVwiZ2V0SWNvbigpXCIgcGFjaz1cIm5lYnVsYXItZXNzZW50aWFsc1wiPjwvbmItaWNvbj5cbiAgICA8L2J1dHRvbj5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE5iQ2FsZW5kYXJWaWV3TW9kZUNvbXBvbmVudDxEPiB7XG4gIEBJbnB1dCgpIGRhdGU6IEQ7XG4gIEBJbnB1dCgpIHZpZXdNb2RlOiBOYkNhbGVuZGFyVmlld01vZGUgPSBOYkNhbGVuZGFyVmlld01vZGUuREFURTtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX3ZpZXdNb2RlOiBOYkNhbGVuZGFyVmlld01vZGVWYWx1ZXM7XG4gIEBPdXRwdXQoKSBjaGFuZ2VNb2RlID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPih0cnVlKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgZGF0ZVNlcnZpY2U6IE5iRGF0ZVNlcnZpY2U8RD4sXG4gICAgcHJvdGVjdGVkIHllYXJNb2RlbFNlcnZpY2U6IE5iQ2FsZW5kYXJZZWFyTW9kZWxTZXJ2aWNlPEQ+LFxuICApIHt9XG5cbiAgZ2V0VGV4dCgpOiBzdHJpbmcge1xuICAgIGlmICghdGhpcy5kYXRlKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgc3dpdGNoICh0aGlzLnZpZXdNb2RlKSB7XG4gICAgICBjYXNlIE5iQ2FsZW5kYXJWaWV3TW9kZS5EQVRFOiB7XG4gICAgICAgIGNvbnN0IG1vbnRoID0gdGhpcy5kYXRlU2VydmljZS5nZXRNb250aE5hbWUodGhpcy5kYXRlLCBUcmFuc2xhdGlvbldpZHRoLldpZGUpO1xuICAgICAgICBjb25zdCB5ZWFyID0gdGhpcy5kYXRlU2VydmljZS5nZXRZZWFyKHRoaXMuZGF0ZSk7XG4gICAgICAgIHJldHVybiBgJHttb250aH0gJHt5ZWFyfWA7XG4gICAgICB9XG4gICAgICBjYXNlIE5iQ2FsZW5kYXJWaWV3TW9kZS5NT05USDpcbiAgICAgICAgcmV0dXJuIGAke3RoaXMuZGF0ZVNlcnZpY2UuZ2V0WWVhcih0aGlzLmRhdGUpfWA7XG4gICAgICBjYXNlIE5iQ2FsZW5kYXJWaWV3TW9kZS5ZRUFSOlxuICAgICAgICByZXR1cm4gYCR7dGhpcy5nZXRGaXJzdFllYXIoKX0gLSAke3RoaXMuZ2V0TGFzdFllYXIoKX1gO1xuICAgIH1cbiAgfVxuXG4gIGdldEljb24oKTogc3RyaW5nIHtcbiAgICBpZiAodGhpcy52aWV3TW9kZSA9PT0gTmJDYWxlbmRhclZpZXdNb2RlLkRBVEUpIHtcbiAgICAgIHJldHVybiAnY2hldnJvbi1kb3duLW91dGxpbmUnO1xuICAgIH1cblxuICAgIHJldHVybiAnY2hldnJvbi11cC1vdXRsaW5lJztcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRGaXJzdFllYXIoKTogc3RyaW5nIHtcbiAgICBjb25zdCB5ZWFycyA9IHRoaXMueWVhck1vZGVsU2VydmljZS5nZXRWaWV3WWVhcnModGhpcy5kYXRlKTtcbiAgICByZXR1cm4gdGhpcy5kYXRlU2VydmljZS5nZXRZZWFyKHllYXJzWzBdWzBdKS50b1N0cmluZygpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldExhc3RZZWFyKCk6IHN0cmluZyB7XG4gICAgY29uc3QgeWVhcnMgPSB0aGlzLnllYXJNb2RlbFNlcnZpY2UuZ2V0Vmlld1llYXJzKHRoaXMuZGF0ZSk7XG4gICAgY29uc3QgbGFzdFJvdyA9IHllYXJzW3llYXJzLmxlbmd0aCAtIDFdO1xuICAgIGNvbnN0IGxhc3RZZWFyID0gbGFzdFJvd1tsYXN0Um93Lmxlbmd0aCAtIDFdO1xuXG4gICAgcmV0dXJuIHRoaXMuZGF0ZVNlcnZpY2UuZ2V0WWVhcihsYXN0WWVhcikudG9TdHJpbmcoKTtcbiAgfVxufVxuIl19