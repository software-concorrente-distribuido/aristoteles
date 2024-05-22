/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class NbStatusService {
    constructor() {
        this.coreStatuses = ['basic', 'primary', 'info', 'warning', 'danger', 'control'];
    }
    isCoreStatus(status) {
        return this.coreStatuses.includes(status);
    }
    isCustomStatus(status) {
        if (this.isValidStatusString(status)) {
            return !this.isCoreStatus(status);
        }
        return false;
    }
    getStatusClass(status) {
        if (this.isValidStatusString(status)) {
            return `status-${status}`;
        }
        return undefined;
    }
    isValidStatusString(status) {
        return typeof status === 'string' && status.length > 0;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbStatusService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbStatusService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbStatusService, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdHVzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZnJhbWV3b3JrL3RoZW1lL3NlcnZpY2VzL3N0YXR1cy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUszQyxNQUFNLE9BQU8sZUFBZTtJQUQ1QjtRQUVXLGlCQUFZLEdBQXdCLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQztLQXlCM0c7SUF2QkMsWUFBWSxDQUFDLE1BQWlDO1FBQzVDLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsTUFBMkIsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFFRCxjQUFjLENBQUMsTUFBaUM7UUFDOUMsSUFBSSxJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztZQUNyQyxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNwQyxDQUFDO1FBRUQsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQsY0FBYyxDQUFDLE1BQWlDO1FBQzlDLElBQUksSUFBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7WUFDckMsT0FBTyxVQUFVLE1BQU0sRUFBRSxDQUFDO1FBQzVCLENBQUM7UUFFRCxPQUFPLFNBQVMsQ0FBQztJQUNuQixDQUFDO0lBRVMsbUJBQW1CLENBQUMsTUFBaUM7UUFDN0QsT0FBTyxPQUFPLE1BQU0sS0FBSyxRQUFRLElBQUksTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7SUFDekQsQ0FBQzs4R0F6QlUsZUFBZTtrSEFBZixlQUFlOzsyRkFBZixlQUFlO2tCQUQzQixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEFrdmVvLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE5iQ29tcG9uZW50T3JDdXN0b21TdGF0dXMsIE5iQ29tcG9uZW50U3RhdHVzIH0gZnJvbSAnLi4vY29tcG9uZW50cy9jb21wb25lbnQtc3RhdHVzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE5iU3RhdHVzU2VydmljZSB7XG4gIHJlYWRvbmx5IGNvcmVTdGF0dXNlczogTmJDb21wb25lbnRTdGF0dXNbXSA9IFsnYmFzaWMnLCAncHJpbWFyeScsICdpbmZvJywgJ3dhcm5pbmcnLCAnZGFuZ2VyJywgJ2NvbnRyb2wnXTtcblxuICBpc0NvcmVTdGF0dXMoc3RhdHVzOiBOYkNvbXBvbmVudE9yQ3VzdG9tU3RhdHVzKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuY29yZVN0YXR1c2VzLmluY2x1ZGVzKHN0YXR1cyBhcyBOYkNvbXBvbmVudFN0YXR1cyk7XG4gIH1cblxuICBpc0N1c3RvbVN0YXR1cyhzdGF0dXM6IE5iQ29tcG9uZW50T3JDdXN0b21TdGF0dXMpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5pc1ZhbGlkU3RhdHVzU3RyaW5nKHN0YXR1cykpIHtcbiAgICAgIHJldHVybiAhdGhpcy5pc0NvcmVTdGF0dXMoc3RhdHVzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBnZXRTdGF0dXNDbGFzcyhzdGF0dXM6IE5iQ29tcG9uZW50T3JDdXN0b21TdGF0dXMpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgIGlmICh0aGlzLmlzVmFsaWRTdGF0dXNTdHJpbmcoc3RhdHVzKSkge1xuICAgICAgcmV0dXJuIGBzdGF0dXMtJHtzdGF0dXN9YDtcbiAgICB9XG5cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgcHJvdGVjdGVkIGlzVmFsaWRTdGF0dXNTdHJpbmcoc3RhdHVzOiBOYkNvbXBvbmVudE9yQ3VzdG9tU3RhdHVzKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHR5cGVvZiBzdGF0dXMgPT09ICdzdHJpbmcnICYmIHN0YXR1cy5sZW5ndGggPiAwO1xuICB9XG59XG4iXX0=