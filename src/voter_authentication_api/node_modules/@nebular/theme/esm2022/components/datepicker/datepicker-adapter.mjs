/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Injectable } from '@angular/core';
import { NbDatepickerComponent, NbRangepickerComponent } from './datepicker.component';
import { NbDatepickerAdapter } from './datepicker.directive';
import { NbDateTimePickerComponent } from './date-timepicker.component';
import * as i0 from "@angular/core";
import * as i1 from "../calendar-kit/services/date.service";
export class NbDateAdapterService extends NbDatepickerAdapter {
    constructor(dateService) {
        super();
        this.dateService = dateService;
        this.picker = NbDatepickerComponent;
    }
    parse(date, format) {
        return this.dateService.parse(date, format);
    }
    format(date, format) {
        return this.dateService.format(date, format);
    }
    isValid(date, format) {
        return this.dateService.isValidDateString(date, format);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbDateAdapterService, deps: [{ token: i1.NbDateService }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbDateAdapterService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbDateAdapterService, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: i1.NbDateService }] });
export class NbRangeAdapterService extends NbDatepickerAdapter {
    constructor(dateService) {
        super();
        this.dateService = dateService;
        this.picker = NbRangepickerComponent;
    }
    parse(range, format) {
        const [start, end] = range.split('-').map(subDate => subDate.trim());
        return {
            start: this.dateService.parse(start, format),
            end: this.dateService.parse(end, format),
        };
    }
    format(range, format) {
        if (!range) {
            return '';
        }
        const start = this.dateService.format(range.start, format);
        const isStartValid = this.dateService.isValidDateString(start, format);
        if (!isStartValid) {
            return '';
        }
        const end = this.dateService.format(range.end, format);
        const isEndValid = this.dateService.isValidDateString(end, format);
        if (isEndValid) {
            return `${start} - ${end}`;
        }
        else {
            return start;
        }
    }
    isValid(range, format) {
        const [start, end] = range.split('-').map(subDate => subDate.trim());
        return this.dateService.isValidDateString(start, format) && this.dateService.isValidDateString(end, format);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbRangeAdapterService, deps: [{ token: i1.NbDateService }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbRangeAdapterService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbRangeAdapterService, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: i1.NbDateService }] });
export class NbDateTimeAdapterService extends NbDatepickerAdapter {
    constructor(dateService) {
        super();
        this.dateService = dateService;
        this.picker = NbDateTimePickerComponent;
    }
    parse(date, format) {
        return this.dateService.parse(date, format);
    }
    format(date, format) {
        return this.dateService.format(date, format);
    }
    isValid(date, format) {
        return this.dateService.isValidDateString(date, format);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbDateTimeAdapterService, deps: [{ token: i1.NbDateService }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbDateTimeAdapterService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbDateTimeAdapterService, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: i1.NbDateService }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci1hZGFwdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2ZyYW1ld29yay90aGVtZS9jb21wb25lbnRzL2RhdGVwaWNrZXIvZGF0ZXBpY2tlci1hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFRLE1BQU0sZUFBZSxDQUFDO0FBR2pELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZGLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRTdELE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDOzs7QUFHeEUsTUFBTSxPQUFPLG9CQUF3QixTQUFRLG1CQUFzQjtJQUdqRSxZQUFzQixXQUE2QjtRQUNqRCxLQUFLLEVBQUUsQ0FBQztRQURZLGdCQUFXLEdBQVgsV0FBVyxDQUFrQjtRQUZuRCxXQUFNLEdBQW1DLHFCQUFxQixDQUFDO0lBSS9ELENBQUM7SUFFRCxLQUFLLENBQUMsSUFBWSxFQUFFLE1BQU07UUFDeEIsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVELE1BQU0sQ0FBQyxJQUFPLEVBQUUsTUFBYztRQUM1QixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRUQsT0FBTyxDQUFDLElBQVksRUFBRSxNQUFjO1FBQ2xDLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDMUQsQ0FBQzs4R0FqQlUsb0JBQW9CO2tIQUFwQixvQkFBb0I7OzJGQUFwQixvQkFBb0I7a0JBRGhDLFVBQVU7O0FB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QUMsSUFBWSxFQUFFLE1BQWM7UUFDbEMsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztJQUMxRCxDQUFDOzhHQWpCVSx3QkFBd0I7a0hBQXhCLHdCQUF3Qjs7MkZBQXhCLHdCQUF3QjtrQkFEcEMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEFrdmVvLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBUeXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE5iQ2FsZW5kYXJSYW5nZSB9IGZyb20gJy4uL2NhbGVuZGFyL2NhbGVuZGFyLXJhbmdlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOYkRhdGVwaWNrZXJDb21wb25lbnQsIE5iUmFuZ2VwaWNrZXJDb21wb25lbnQgfSBmcm9tICcuL2RhdGVwaWNrZXIuY29tcG9uZW50JztcbmltcG9ydCB7IE5iRGF0ZXBpY2tlckFkYXB0ZXIgfSBmcm9tICcuL2RhdGVwaWNrZXIuZGlyZWN0aXZlJztcbmltcG9ydCB7IE5iRGF0ZVNlcnZpY2UgfSBmcm9tICcuLi9jYWxlbmRhci1raXQvc2VydmljZXMvZGF0ZS5zZXJ2aWNlJztcbmltcG9ydCB7IE5iRGF0ZVRpbWVQaWNrZXJDb21wb25lbnQgfSBmcm9tICcuL2RhdGUtdGltZXBpY2tlci5jb21wb25lbnQnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTmJEYXRlQWRhcHRlclNlcnZpY2U8RD4gZXh0ZW5kcyBOYkRhdGVwaWNrZXJBZGFwdGVyPEQ+IHtcbiAgcGlja2VyOiBUeXBlPE5iRGF0ZXBpY2tlckNvbXBvbmVudDxEPj4gPSBOYkRhdGVwaWNrZXJDb21wb25lbnQ7XG5cbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGRhdGVTZXJ2aWNlOiBOYkRhdGVTZXJ2aWNlPEQ+KSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIHBhcnNlKGRhdGU6IHN0cmluZywgZm9ybWF0KTogRCB7XG4gICAgcmV0dXJuIHRoaXMuZGF0ZVNlcnZpY2UucGFyc2UoZGF0ZSwgZm9ybWF0KTtcbiAgfVxuXG4gIGZvcm1hdChkYXRlOiBELCBmb3JtYXQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuZGF0ZVNlcnZpY2UuZm9ybWF0KGRhdGUsIGZvcm1hdCk7XG4gIH1cblxuICBpc1ZhbGlkKGRhdGU6IHN0cmluZywgZm9ybWF0OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5kYXRlU2VydmljZS5pc1ZhbGlkRGF0ZVN0cmluZyhkYXRlLCBmb3JtYXQpO1xuICB9XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBOYlJhbmdlQWRhcHRlclNlcnZpY2U8RD4gZXh0ZW5kcyBOYkRhdGVwaWNrZXJBZGFwdGVyPE5iQ2FsZW5kYXJSYW5nZTxEPj4ge1xuICBwaWNrZXI6IFR5cGU8TmJSYW5nZXBpY2tlckNvbXBvbmVudDxEPj4gPSBOYlJhbmdlcGlja2VyQ29tcG9uZW50O1xuXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBkYXRlU2VydmljZTogTmJEYXRlU2VydmljZTxEPikge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICBwYXJzZShyYW5nZTogc3RyaW5nLCBmb3JtYXQpOiBOYkNhbGVuZGFyUmFuZ2U8RD4ge1xuICAgIGNvbnN0IFtzdGFydCwgZW5kXSA9IHJhbmdlLnNwbGl0KCctJykubWFwKHN1YkRhdGUgPT4gc3ViRGF0ZS50cmltKCkpO1xuICAgIHJldHVybiB7XG4gICAgICBzdGFydDogdGhpcy5kYXRlU2VydmljZS5wYXJzZShzdGFydCwgZm9ybWF0KSxcbiAgICAgIGVuZDogdGhpcy5kYXRlU2VydmljZS5wYXJzZShlbmQsIGZvcm1hdCksXG4gICAgfTtcbiAgfVxuXG4gIGZvcm1hdChyYW5nZTogTmJDYWxlbmRhclJhbmdlPEQ+LCBmb3JtYXQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgaWYgKCFyYW5nZSkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuICAgIGNvbnN0IHN0YXJ0ID0gdGhpcy5kYXRlU2VydmljZS5mb3JtYXQocmFuZ2Uuc3RhcnQsIGZvcm1hdCk7XG4gICAgY29uc3QgaXNTdGFydFZhbGlkID0gdGhpcy5kYXRlU2VydmljZS5pc1ZhbGlkRGF0ZVN0cmluZyhzdGFydCwgZm9ybWF0KTtcblxuICAgIGlmICghaXNTdGFydFZhbGlkKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgY29uc3QgZW5kID0gdGhpcy5kYXRlU2VydmljZS5mb3JtYXQocmFuZ2UuZW5kLCBmb3JtYXQpO1xuICAgIGNvbnN0IGlzRW5kVmFsaWQgPSB0aGlzLmRhdGVTZXJ2aWNlLmlzVmFsaWREYXRlU3RyaW5nKGVuZCwgZm9ybWF0KTtcblxuICAgIGlmIChpc0VuZFZhbGlkKSB7XG4gICAgICByZXR1cm4gYCR7c3RhcnR9IC0gJHtlbmR9YDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHN0YXJ0O1xuICAgIH1cbiAgfVxuXG4gIGlzVmFsaWQocmFuZ2U6IHN0cmluZywgZm9ybWF0OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBjb25zdCBbc3RhcnQsIGVuZF0gPSByYW5nZS5zcGxpdCgnLScpLm1hcChzdWJEYXRlID0+IHN1YkRhdGUudHJpbSgpKTtcbiAgICByZXR1cm4gdGhpcy5kYXRlU2VydmljZS5pc1ZhbGlkRGF0ZVN0cmluZyhzdGFydCwgZm9ybWF0KSAmJiB0aGlzLmRhdGVTZXJ2aWNlLmlzVmFsaWREYXRlU3RyaW5nKGVuZCwgZm9ybWF0KTtcbiAgfVxufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTmJEYXRlVGltZUFkYXB0ZXJTZXJ2aWNlPEQ+IGV4dGVuZHMgTmJEYXRlcGlja2VyQWRhcHRlcjxEPiB7XG4gIHBpY2tlcjogVHlwZTxOYkRhdGVUaW1lUGlja2VyQ29tcG9uZW50PEQ+PiA9IE5iRGF0ZVRpbWVQaWNrZXJDb21wb25lbnQ7XG5cbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGRhdGVTZXJ2aWNlOiBOYkRhdGVTZXJ2aWNlPEQ+KSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIHBhcnNlKGRhdGU6IHN0cmluZywgZm9ybWF0OiBzdHJpbmcpOiBEIHtcbiAgICByZXR1cm4gdGhpcy5kYXRlU2VydmljZS5wYXJzZShkYXRlLCBmb3JtYXQpO1xuICB9XG5cbiAgZm9ybWF0KGRhdGU6IGFueSwgZm9ybWF0OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmRhdGVTZXJ2aWNlLmZvcm1hdChkYXRlLCBmb3JtYXQpO1xuICB9XG5cbiAgaXNWYWxpZChkYXRlOiBzdHJpbmcsIGZvcm1hdDogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZGF0ZVNlcnZpY2UuaXNWYWxpZERhdGVTdHJpbmcoZGF0ZSwgZm9ybWF0KTtcbiAgfVxufVxuIl19