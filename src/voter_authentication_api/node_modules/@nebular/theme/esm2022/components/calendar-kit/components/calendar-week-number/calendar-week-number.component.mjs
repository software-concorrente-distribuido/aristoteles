/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, Input, HostBinding, ChangeDetectionStrategy } from '@angular/core';
import { NbCalendarSize } from '../../model';
import * as i0 from "@angular/core";
import * as i1 from "../../services/date.service";
import * as i2 from "@angular/common";
export class NbCalendarWeekNumberComponent {
    get isLarge() {
        return this.size === NbCalendarSize.LARGE;
    }
    constructor(dateService) {
        this.dateService = dateService;
    }
    ngOnChanges(changes) {
        if (changes.weeks) {
            this.weekNumbers = this.getWeeks();
        }
    }
    getWeeks() {
        return this.weeks.map((week) => {
            // Find last defined day as week could contain null days in case
            // boundingMonth set to false
            const lastDay = [...week].reverse().find((day) => !!day);
            // Use last day of the week to determine week number.
            // This way weeks which span between sibling years is marked first
            return this.dateService.getWeekNumber(lastDay);
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbCalendarWeekNumberComponent, deps: [{ token: i1.NbDateService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.1.0", type: NbCalendarWeekNumberComponent, selector: "nb-calendar-week-numbers", inputs: { weeks: "weeks", size: "size", weekNumberSymbol: "weekNumberSymbol" }, host: { properties: { "class.size-large": "this.isLarge" } }, usesOnChanges: true, ngImport: i0, template: `
    <div class="sign-container">
      <div class="sign">{{ weekNumberSymbol }}</div>
    </div>
    <div class="week-number" *ngFor="let weekNumber of weekNumbers">{{ weekNumber }}</div>
  `, isInline: true, styles: ["/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */:host{display:flex;flex-direction:column}\n"], dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbCalendarWeekNumberComponent, decorators: [{
            type: Component,
            args: [{ selector: 'nb-calendar-week-numbers', template: `
    <div class="sign-container">
      <div class="sign">{{ weekNumberSymbol }}</div>
    </div>
    <div class="week-number" *ngFor="let weekNumber of weekNumbers">{{ weekNumber }}</div>
  `, changeDetection: ChangeDetectionStrategy.OnPush, styles: ["/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */:host{display:flex;flex-direction:column}\n"] }]
        }], ctorParameters: () => [{ type: i1.NbDateService }], propDecorators: { weeks: [{
                type: Input
            }], size: [{
                type: Input
            }], weekNumberSymbol: [{
                type: Input
            }], isLarge: [{
                type: HostBinding,
                args: ['class.size-large']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItd2Vlay1udW1iZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2ZyYW1ld29yay90aGVtZS9jb21wb25lbnRzL2NhbGVuZGFyLWtpdC9jb21wb25lbnRzL2NhbGVuZGFyLXdlZWstbnVtYmVyL2NhbGVuZGFyLXdlZWstbnVtYmVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLHVCQUF1QixFQUE0QixNQUFNLGVBQWUsQ0FBQztBQUdqSCxPQUFPLEVBQUUsY0FBYyxFQUF3QixNQUFNLGFBQWEsQ0FBQzs7OztBQWFuRSxNQUFNLE9BQU8sNkJBQTZCO0lBZ0J4QyxJQUNJLE9BQU87UUFDVCxPQUFPLElBQUksQ0FBQyxJQUFJLEtBQUssY0FBYyxDQUFDLEtBQUssQ0FBQztJQUM1QyxDQUFDO0lBRUQsWUFBb0IsV0FBNkI7UUFBN0IsZ0JBQVcsR0FBWCxXQUFXLENBQWtCO0lBQUcsQ0FBQztJQUVyRCxXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFBSSxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDbEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDckMsQ0FBQztJQUNILENBQUM7SUFFRCxRQUFRO1FBQ04sT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQVMsRUFBRSxFQUFFO1lBQ2xDLGdFQUFnRTtZQUNoRSw2QkFBNkI7WUFDN0IsTUFBTSxPQUFPLEdBQUcsQ0FBRSxHQUFHLElBQUksQ0FBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzlELHFEQUFxRDtZQUNyRCxrRUFBa0U7WUFDbEUsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNqRCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7OEdBdENVLDZCQUE2QjtrR0FBN0IsNkJBQTZCLG1PQVQ5Qjs7Ozs7R0FLVDs7MkZBSVUsNkJBQTZCO2tCQVh6QyxTQUFTOytCQUNFLDBCQUEwQixZQUMxQjs7Ozs7R0FLVCxtQkFFZ0IsdUJBQXVCLENBQUMsTUFBTTtrRkFPL0MsS0FBSztzQkFESixLQUFLO2dCQUlOLElBQUk7c0JBREgsS0FBSztnQkFPRyxnQkFBZ0I7c0JBQXhCLEtBQUs7Z0JBR0YsT0FBTztzQkFEVixXQUFXO3VCQUFDLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEFrdmVvLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqL1xuXG5pbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBIb3N0QmluZGluZywgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOYkRhdGVTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZGF0ZS5zZXJ2aWNlJztcbmltcG9ydCB7IE5iQ2FsZW5kYXJTaXplLCBOYkNhbGVuZGFyU2l6ZVZhbHVlcyB9IGZyb20gJy4uLy4uL21vZGVsJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmItY2FsZW5kYXItd2Vlay1udW1iZXJzJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwic2lnbi1jb250YWluZXJcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJzaWduXCI+e3sgd2Vla051bWJlclN5bWJvbCB9fTwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJ3ZWVrLW51bWJlclwiICpuZ0Zvcj1cImxldCB3ZWVrTnVtYmVyIG9mIHdlZWtOdW1iZXJzXCI+e3sgd2Vla051bWJlciB9fTwvZGl2PlxuICBgLFxuICBzdHlsZVVybHM6IFsnLi9jYWxlbmRhci13ZWVrLW51bWJlci5jb21wb25lbnQuc2NzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgTmJDYWxlbmRhcldlZWtOdW1iZXJDb21wb25lbnQ8RD4gaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuXG4gIHdlZWtOdW1iZXJzOiBudW1iZXJbXTtcblxuICBASW5wdXQoKVxuICB3ZWVrczogRFtdW107XG5cbiAgQElucHV0KClcbiAgc2l6ZTogTmJDYWxlbmRhclNpemU7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9zaXplOiBOYkNhbGVuZGFyU2l6ZVZhbHVlcztcblxuICAvKipcbiAgICogU2V0cyBzeW1ib2wgdXNlZCBhcyBhIGhlYWRlciBmb3Igd2VlayBudW1iZXJzIGNvbHVtblxuICAgKiAqL1xuICBASW5wdXQoKSB3ZWVrTnVtYmVyU3ltYm9sOiBzdHJpbmc7XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5zaXplLWxhcmdlJylcbiAgZ2V0IGlzTGFyZ2UoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2l6ZSA9PT0gTmJDYWxlbmRhclNpemUuTEFSR0U7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRhdGVTZXJ2aWNlOiBOYkRhdGVTZXJ2aWNlPEQ+KSB7fVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBpZiAoY2hhbmdlcy53ZWVrcykge1xuICAgICAgdGhpcy53ZWVrTnVtYmVycyA9IHRoaXMuZ2V0V2Vla3MoKTtcbiAgICB9XG4gIH1cblxuICBnZXRXZWVrcygpOiBudW1iZXJbXSB7XG4gICAgcmV0dXJuIHRoaXMud2Vla3MubWFwKCh3ZWVrOiBEW10pID0+IHtcbiAgICAgIC8vIEZpbmQgbGFzdCBkZWZpbmVkIGRheSBhcyB3ZWVrIGNvdWxkIGNvbnRhaW4gbnVsbCBkYXlzIGluIGNhc2VcbiAgICAgIC8vIGJvdW5kaW5nTW9udGggc2V0IHRvIGZhbHNlXG4gICAgICBjb25zdCBsYXN0RGF5ID0gWyAuLi53ZWVrIF0ucmV2ZXJzZSgpLmZpbmQoKGRheTogRCkgPT4gISFkYXkpO1xuICAgICAgLy8gVXNlIGxhc3QgZGF5IG9mIHRoZSB3ZWVrIHRvIGRldGVybWluZSB3ZWVrIG51bWJlci5cbiAgICAgIC8vIFRoaXMgd2F5IHdlZWtzIHdoaWNoIHNwYW4gYmV0d2VlbiBzaWJsaW5nIHllYXJzIGlzIG1hcmtlZCBmaXJzdFxuICAgICAgcmV0dXJuIHRoaXMuZGF0ZVNlcnZpY2UuZ2V0V2Vla051bWJlcihsYXN0RGF5KTtcbiAgICB9KTtcbiAgfVxufVxuIl19