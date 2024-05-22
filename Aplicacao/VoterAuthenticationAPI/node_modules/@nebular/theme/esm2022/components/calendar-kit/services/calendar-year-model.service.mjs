/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Injectable } from '@angular/core';
import { range, batch } from '../helpers';
import * as i0 from "@angular/core";
import * as i1 from "./date.service";
export class NbCalendarYearModelService {
    constructor(dateService) {
        this.dateService = dateService;
        this.yearsInView = 12;
        this.yearsInRow = 4;
    }
    getYearsInView() {
        return this.yearsInView;
    }
    getYearsInRow() {
        return this.yearsInRow;
    }
    getViewYears(viewYear) {
        const year = this.dateService.getYear(viewYear);
        let viewStartYear;
        if (year >= 0) {
            viewStartYear = year - (year % this.yearsInView);
        }
        else {
            viewStartYear = year - (year % this.yearsInView + this.yearsInView);
        }
        const years = range(this.yearsInView).map(i => this.copyWithYear(viewStartYear + i, viewYear));
        return batch(years, this.yearsInRow);
    }
    copyWithYear(year, date) {
        return this.dateService.createDate(year, this.dateService.getMonth(date), this.dateService.getDate(date));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbCalendarYearModelService, deps: [{ token: i1.NbDateService }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbCalendarYearModelService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbCalendarYearModelService, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: i1.NbDateService }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIteWVhci1tb2RlbC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2ZyYW1ld29yay90aGVtZS9jb21wb25lbnRzL2NhbGVuZGFyLWtpdC9zZXJ2aWNlcy9jYWxlbmRhci15ZWFyLW1vZGVsLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsTUFBTSxZQUFZLENBQUM7OztBQUkxQyxNQUFNLE9BQU8sMEJBQTBCO0lBS3JDLFlBQXNCLFdBQTZCO1FBQTdCLGdCQUFXLEdBQVgsV0FBVyxDQUFrQjtRQUh6QyxnQkFBVyxHQUFHLEVBQUUsQ0FBQztRQUNqQixlQUFVLEdBQUcsQ0FBQyxDQUFDO0lBR3pCLENBQUM7SUFFRCxjQUFjO1FBQ1osT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQzFCLENBQUM7SUFFRCxhQUFhO1FBQ1gsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxZQUFZLENBQUMsUUFBVztRQUN0QixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNoRCxJQUFJLGFBQXFCLENBQUM7UUFDMUIsSUFBSSxJQUFJLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDZCxhQUFhLEdBQUcsSUFBSSxHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNuRCxDQUFDO2FBQU0sQ0FBQztZQUNOLGFBQWEsR0FBRyxJQUFJLEdBQUcsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDdEUsQ0FBQztRQUNELE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFFL0YsT0FBTyxLQUFLLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRVMsWUFBWSxDQUFDLElBQVksRUFBRSxJQUFPO1FBQzFDLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDNUcsQ0FBQzs4R0EvQlUsMEJBQTBCO2tIQUExQiwwQkFBMEI7OzJGQUExQiwwQkFBMEI7a0JBRHRDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBBa3Zlby4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyByYW5nZSwgYmF0Y2ggfSBmcm9tICcuLi9oZWxwZXJzJztcbmltcG9ydCB7IE5iRGF0ZVNlcnZpY2UgfSBmcm9tICcuL2RhdGUuc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBOYkNhbGVuZGFyWWVhck1vZGVsU2VydmljZTxEPiB7XG5cbiAgcHJvdGVjdGVkIHllYXJzSW5WaWV3ID0gMTI7XG4gIHByb3RlY3RlZCB5ZWFyc0luUm93ID0gNDtcblxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgZGF0ZVNlcnZpY2U6IE5iRGF0ZVNlcnZpY2U8RD4pIHtcbiAgfVxuXG4gIGdldFllYXJzSW5WaWV3KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMueWVhcnNJblZpZXc7XG4gIH1cblxuICBnZXRZZWFyc0luUm93KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMueWVhcnNJblJvdztcbiAgfVxuXG4gIGdldFZpZXdZZWFycyh2aWV3WWVhcjogRCk6IERbXVtdIHtcbiAgICBjb25zdCB5ZWFyID0gdGhpcy5kYXRlU2VydmljZS5nZXRZZWFyKHZpZXdZZWFyKTtcbiAgICBsZXQgdmlld1N0YXJ0WWVhcjogbnVtYmVyO1xuICAgIGlmICh5ZWFyID49IDApIHtcbiAgICAgIHZpZXdTdGFydFllYXIgPSB5ZWFyIC0gKHllYXIgJSB0aGlzLnllYXJzSW5WaWV3KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmlld1N0YXJ0WWVhciA9IHllYXIgLSAoeWVhciAlIHRoaXMueWVhcnNJblZpZXcgKyB0aGlzLnllYXJzSW5WaWV3KTtcbiAgICB9XG4gICAgY29uc3QgeWVhcnMgPSByYW5nZSh0aGlzLnllYXJzSW5WaWV3KS5tYXAoaSA9PiB0aGlzLmNvcHlXaXRoWWVhcih2aWV3U3RhcnRZZWFyICsgaSwgdmlld1llYXIpKTtcblxuICAgIHJldHVybiBiYXRjaCh5ZWFycywgdGhpcy55ZWFyc0luUm93KTtcbiAgfVxuXG4gIHByb3RlY3RlZCBjb3B5V2l0aFllYXIoeWVhcjogbnVtYmVyLCBkYXRlOiBEKTogRCB7XG4gICAgcmV0dXJuIHRoaXMuZGF0ZVNlcnZpY2UuY3JlYXRlRGF0ZSh5ZWFyLCB0aGlzLmRhdGVTZXJ2aWNlLmdldE1vbnRoKGRhdGUpLCB0aGlzLmRhdGVTZXJ2aWNlLmdldERhdGUoZGF0ZSkpO1xuICB9XG59XG4iXX0=