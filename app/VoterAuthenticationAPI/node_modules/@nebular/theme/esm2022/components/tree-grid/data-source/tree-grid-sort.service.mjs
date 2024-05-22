/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Injectable } from '@angular/core';
import { NbSortDirection } from '../tree-grid-sort.component';
import * as i0 from "@angular/core";
/**
 * Service used to sort tree grid data. Uses Array.prototype.sort method.
 * If you need custom sorting, you can extend this service and override comparator or whole sort method.
 */
export class NbTreeGridSortService {
    sort(request, data) {
        if (!request) {
            return data;
        }
        const sorted = data.sort((na, nb) => this.comparator(request, na, nb));
        for (const node of data) {
            if (node.children) {
                node.children = this.sort(request, node.children);
            }
        }
        return sorted;
    }
    comparator(request, na, nb) {
        const key = request.column;
        const dir = request.direction;
        const a = na.data[key];
        const b = nb.data[key];
        let res = 0;
        if (a > b) {
            res = 1;
        }
        if (a < b) {
            res = -1;
        }
        return dir === NbSortDirection.ASCENDING ? res : res * -1;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbTreeGridSortService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbTreeGridSortService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbTreeGridSortService, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1ncmlkLXNvcnQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9mcmFtZXdvcmsvdGhlbWUvY29tcG9uZW50cy90cmVlLWdyaWQvZGF0YS1zb3VyY2UvdHJlZS1ncmlkLXNvcnQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBR0gsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsZUFBZSxFQUFpQixNQUFNLDZCQUE2QixDQUFDOztBQUc3RTs7O0dBR0c7QUFFSCxNQUFNLE9BQU8scUJBQXFCO0lBRWhDLElBQUksQ0FBQyxPQUFzQixFQUFFLElBQXFDO1FBQ2hFLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNiLE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQztRQUVELE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN2RSxLQUFLLE1BQU0sSUFBSSxJQUFJLElBQUksRUFBRSxDQUFDO1lBQ3hCLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUNsQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNwRCxDQUFDO1FBQ0gsQ0FBQztRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFFUyxVQUFVLENBQ2xCLE9BQXNCLEVBQ3RCLEVBQWlDLEVBQ2pDLEVBQWlDO1FBRWpDLE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7UUFDM0IsTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQztRQUM5QixNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZCLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFdkIsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBRVosSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7WUFDVixHQUFHLEdBQUcsQ0FBQyxDQUFBO1FBQ1QsQ0FBQztRQUNELElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO1lBQ1YsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFBO1FBQ1YsQ0FBQztRQUVELE9BQU8sR0FBRyxLQUFLLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQzVELENBQUM7OEdBcENVLHFCQUFxQjtrSEFBckIscUJBQXFCOzsyRkFBckIscUJBQXFCO2tCQURqQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgQWt2ZW8uIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICovXG5cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmJTb3J0RGlyZWN0aW9uLCBOYlNvcnRSZXF1ZXN0IH0gZnJvbSAnLi4vdHJlZS1ncmlkLXNvcnQuY29tcG9uZW50JztcbmltcG9ydCB7IE5iVHJlZUdyaWRQcmVzZW50YXRpb25Ob2RlIH0gZnJvbSAnLi90cmVlLWdyaWQubW9kZWwnO1xuXG4vKipcbiAqIFNlcnZpY2UgdXNlZCB0byBzb3J0IHRyZWUgZ3JpZCBkYXRhLiBVc2VzIEFycmF5LnByb3RvdHlwZS5zb3J0IG1ldGhvZC5cbiAqIElmIHlvdSBuZWVkIGN1c3RvbSBzb3J0aW5nLCB5b3UgY2FuIGV4dGVuZCB0aGlzIHNlcnZpY2UgYW5kIG92ZXJyaWRlIGNvbXBhcmF0b3Igb3Igd2hvbGUgc29ydCBtZXRob2QuXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBOYlRyZWVHcmlkU29ydFNlcnZpY2U8VD4ge1xuXG4gIHNvcnQocmVxdWVzdDogTmJTb3J0UmVxdWVzdCwgZGF0YTogTmJUcmVlR3JpZFByZXNlbnRhdGlvbk5vZGU8VD5bXSk6IE5iVHJlZUdyaWRQcmVzZW50YXRpb25Ob2RlPFQ+W10ge1xuICAgIGlmICghcmVxdWVzdCkge1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuXG4gICAgY29uc3Qgc29ydGVkID0gZGF0YS5zb3J0KChuYSwgbmIpID0+IHRoaXMuY29tcGFyYXRvcihyZXF1ZXN0LCBuYSwgbmIpKTtcbiAgICBmb3IgKGNvbnN0IG5vZGUgb2YgZGF0YSkge1xuICAgICAgaWYgKG5vZGUuY2hpbGRyZW4pIHtcbiAgICAgICAgbm9kZS5jaGlsZHJlbiA9IHRoaXMuc29ydChyZXF1ZXN0LCBub2RlLmNoaWxkcmVuKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHNvcnRlZDtcbiAgfVxuXG4gIHByb3RlY3RlZCBjb21wYXJhdG9yKFxuICAgIHJlcXVlc3Q6IE5iU29ydFJlcXVlc3QsXG4gICAgbmE6IE5iVHJlZUdyaWRQcmVzZW50YXRpb25Ob2RlPFQ+LFxuICAgIG5iOiBOYlRyZWVHcmlkUHJlc2VudGF0aW9uTm9kZTxUPixcbiAgKTogbnVtYmVyIHtcbiAgICBjb25zdCBrZXkgPSByZXF1ZXN0LmNvbHVtbjtcbiAgICBjb25zdCBkaXIgPSByZXF1ZXN0LmRpcmVjdGlvbjtcbiAgICBjb25zdCBhID0gbmEuZGF0YVtrZXldO1xuICAgIGNvbnN0IGIgPSBuYi5kYXRhW2tleV07XG5cbiAgICBsZXQgcmVzID0gMDtcblxuICAgIGlmIChhID4gYikge1xuICAgICAgcmVzID0gMVxuICAgIH1cbiAgICBpZiAoYSA8IGIpIHtcbiAgICAgIHJlcyA9IC0xXG4gICAgfVxuXG4gICAgcmV0dXJuIGRpciA9PT0gTmJTb3J0RGlyZWN0aW9uLkFTQ0VORElORyA/IHJlcyA6IHJlcyAqIC0xO1xuICB9XG59XG4iXX0=