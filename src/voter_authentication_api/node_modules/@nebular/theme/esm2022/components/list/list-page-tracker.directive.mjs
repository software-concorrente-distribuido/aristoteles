import { Directive, ContentChildren, Input, ElementRef, Output, EventEmitter, } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NbListItemComponent } from './list.component';
import * as i0 from "@angular/core";
/**
 * List pager directive
 *
 * Directive allows you to determine page of currently viewing items.
 *
 */
export class NbListPageTrackerDirective {
    constructor() {
        this.destroy$ = new Subject();
        /**
         * Page to start counting with.
         */
        this.startPage = 1;
        /**
         * Emits when another page become visible.
         */
        this.pageChange = new EventEmitter();
        this.observer = new IntersectionObserver((entries) => this.checkForPageChange(entries), { threshold: 0.5 });
    }
    ngAfterViewInit() {
        if (this.listItems && this.listItems.length) {
            this.observeItems();
        }
        this.listItems.changes.pipe(takeUntil(this.destroy$)).subscribe(() => this.observeItems());
    }
    ngOnDestroy() {
        this.observer.disconnect && this.observer.disconnect();
    }
    observeItems() {
        this.listItems.forEach((i) => this.observer.observe(i.nativeElement));
    }
    checkForPageChange(entries) {
        const mostVisiblePage = this.findMostVisiblePage(entries);
        if (mostVisiblePage && this.currentPage !== mostVisiblePage) {
            this.currentPage = mostVisiblePage;
            this.pageChange.emit(this.currentPage);
        }
    }
    findMostVisiblePage(entries) {
        const intersectionRatioByPage = new Map();
        for (const entry of entries) {
            if (entry.intersectionRatio < 0.5) {
                continue;
            }
            const elementIndex = this.elementIndex(entry.target);
            if (elementIndex === -1) {
                continue;
            }
            const page = this.startPage + Math.floor(elementIndex / this.pageSize);
            let ratio = entry.intersectionRatio;
            if (intersectionRatioByPage.has(page)) {
                ratio += intersectionRatioByPage.get(page);
            }
            intersectionRatioByPage.set(page, ratio);
        }
        let maxRatio = 0;
        let mostVisiblePage;
        intersectionRatioByPage.forEach((ratio, page) => {
            if (ratio > maxRatio) {
                maxRatio = ratio;
                mostVisiblePage = page;
            }
        });
        return mostVisiblePage;
    }
    elementIndex(element) {
        return element.parentElement && element.parentElement.children
            ? Array.from(element.parentElement.children).indexOf(element)
            : -1;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbListPageTrackerDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "17.1.0", type: NbListPageTrackerDirective, selector: "[nbListPageTracker]", inputs: { pageSize: "pageSize", startPage: "startPage" }, outputs: { pageChange: "pageChange" }, queries: [{ propertyName: "listItems", predicate: NbListItemComponent, read: ElementRef }], ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbListPageTrackerDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[nbListPageTracker]',
                }]
        }], ctorParameters: () => [], propDecorators: { pageSize: [{
                type: Input
            }], startPage: [{
                type: Input
            }], pageChange: [{
                type: Output
            }], listItems: [{
                type: ContentChildren,
                args: [NbListItemComponent, { read: ElementRef }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1wYWdlLXRyYWNrZXIuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2ZyYW1ld29yay90aGVtZS9jb21wb25lbnRzL2xpc3QvbGlzdC1wYWdlLXRyYWNrZXIuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsZUFBZSxFQUVmLEtBQUssRUFDTCxVQUFVLEVBR1YsTUFBTSxFQUNOLFlBQVksR0FDYixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQzs7QUFFdkQ7Ozs7O0dBS0c7QUFJSCxNQUFNLE9BQU8sMEJBQTBCO0lBMkJyQztRQTFCUSxhQUFRLEdBQUcsSUFBSSxPQUFPLEVBQVEsQ0FBQztRQVd2Qzs7V0FFRztRQUVILGNBQVMsR0FBVyxDQUFDLENBQUM7UUFFdEI7O1dBRUc7UUFFSCxlQUFVLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQU10QyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksb0JBQW9CLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQzlHLENBQUM7SUFFRCxlQUFlO1FBQ2IsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDNUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3RCLENBQUM7UUFFRCxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUks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UTtzQkFEUCxLQUFLO2dCQU9OLFNBQVM7c0JBRFIsS0FBSztnQkFPTixVQUFVO3NCQURULE1BQU07Z0JBSVAsU0FBUztzQkFEUixlQUFlO3VCQUFDLG1CQUFtQixFQUFFLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgQ29udGVudENoaWxkcmVuLFxuICBRdWVyeUxpc3QsXG4gIElucHV0LFxuICBFbGVtZW50UmVmLFxuICBBZnRlclZpZXdJbml0LFxuICBPbkRlc3Ryb3ksXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE5iTGlzdEl0ZW1Db21wb25lbnQgfSBmcm9tICcuL2xpc3QuY29tcG9uZW50JztcblxuLyoqXG4gKiBMaXN0IHBhZ2VyIGRpcmVjdGl2ZVxuICpcbiAqIERpcmVjdGl2ZSBhbGxvd3MgeW91IHRvIGRldGVybWluZSBwYWdlIG9mIGN1cnJlbnRseSB2aWV3aW5nIGl0ZW1zLlxuICpcbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW25iTGlzdFBhZ2VUcmFja2VyXScsXG59KVxuZXhwb3J0IGNsYXNzIE5iTGlzdFBhZ2VUcmFja2VyRGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSBkZXN0cm95JCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgcHJpdmF0ZSBvYnNlcnZlcjogSW50ZXJzZWN0aW9uT2JzZXJ2ZXI7XG4gIHByaXZhdGUgY3VycmVudFBhZ2U6IG51bWJlcjtcblxuICAvKipcbiAgICogSXRlbXMgcGVyIHBhZ2UuXG4gICAqL1xuICBASW5wdXQoKVxuICBwYWdlU2l6ZTogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBQYWdlIHRvIHN0YXJ0IGNvdW50aW5nIHdpdGguXG4gICAqL1xuICBASW5wdXQoKVxuICBzdGFydFBhZ2U6IG51bWJlciA9IDE7XG5cbiAgLyoqXG4gICAqIEVtaXRzIHdoZW4gYW5vdGhlciBwYWdlIGJlY29tZSB2aXNpYmxlLlxuICAgKi9cbiAgQE91dHB1dCgpXG4gIHBhZ2VDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcblxuICBAQ29udGVudENoaWxkcmVuKE5iTGlzdEl0ZW1Db21wb25lbnQsIHsgcmVhZDogRWxlbWVudFJlZiB9KVxuICBsaXN0SXRlbXM6IFF1ZXJ5TGlzdDxFbGVtZW50UmVmPjtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLm9ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKChlbnRyaWVzKSA9PiB0aGlzLmNoZWNrRm9yUGFnZUNoYW5nZShlbnRyaWVzKSwgeyB0aHJlc2hvbGQ6IDAuNSB9KTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICBpZiAodGhpcy5saXN0SXRlbXMgJiYgdGhpcy5saXN0SXRlbXMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm9ic2VydmVJdGVtcygpO1xuICAgIH1cblxuICAgIHRoaXMubGlzdEl0ZW1zLmNoYW5nZXMucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpLnN1YnNjcmliZSgoKSA9PiB0aGlzLm9ic2VydmVJdGVtcygpKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMub2JzZXJ2ZXIuZGlzY29ubmVjdCAmJiB0aGlzLm9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgfVxuXG4gIHByaXZhdGUgb2JzZXJ2ZUl0ZW1zKCkge1xuICAgIHRoaXMubGlzdEl0ZW1zLmZvckVhY2goKGkpID0+IHRoaXMub2JzZXJ2ZXIub2JzZXJ2ZShpLm5hdGl2ZUVsZW1lbnQpKTtcbiAgfVxuXG4gIHByaXZhdGUgY2hlY2tGb3JQYWdlQ2hhbmdlKGVudHJpZXM6IEludGVyc2VjdGlvbk9ic2VydmVyRW50cnlbXSkge1xuICAgIGNvbnN0IG1vc3RWaXNpYmxlUGFnZSA9IHRoaXMuZmluZE1vc3RWaXNpYmxlUGFnZShlbnRyaWVzKTtcblxuICAgIGlmIChtb3N0VmlzaWJsZVBhZ2UgJiYgdGhpcy5jdXJyZW50UGFnZSAhPT0gbW9zdFZpc2libGVQYWdlKSB7XG4gICAgICB0aGlzLmN1cnJlbnRQYWdlID0gbW9zdFZpc2libGVQYWdlO1xuICAgICAgdGhpcy5wYWdlQ2hhbmdlLmVtaXQodGhpcy5jdXJyZW50UGFnZSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBmaW5kTW9zdFZpc2libGVQYWdlKGVudHJpZXM6IEludGVyc2VjdGlvbk9ic2VydmVyRW50cnlbXSk6IG51bWJlciB8IG51bGwge1xuICAgIGNvbnN0IGludGVyc2VjdGlvblJhdGlvQnlQYWdlID0gbmV3IE1hcDxudW1iZXIsIG51bWJlcj4oKTtcblxuICAgIGZvciAoY29uc3QgZW50cnkgb2YgZW50cmllcykge1xuICAgICAgaWYgKGVudHJ5LmludGVyc2VjdGlvblJhdGlvIDwgMC41KSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBlbGVtZW50SW5kZXggPSB0aGlzLmVsZW1lbnRJbmRleChlbnRyeS50YXJnZXQpO1xuICAgICAgaWYgKGVsZW1lbnRJbmRleCA9PT0gLTEpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBjb25zdCBwYWdlID0gdGhpcy5zdGFydFBhZ2UgKyBNYXRoLmZsb29yKGVsZW1lbnRJbmRleCAvIHRoaXMucGFnZVNpemUpO1xuXG4gICAgICBsZXQgcmF0aW8gPSBlbnRyeS5pbnRlcnNlY3Rpb25SYXRpbztcbiAgICAgIGlmIChpbnRlcnNlY3Rpb25SYXRpb0J5UGFnZS5oYXMocGFnZSkpIHtcbiAgICAgICAgcmF0aW8gKz0gaW50ZXJzZWN0aW9uUmF0aW9CeVBhZ2UuZ2V0KHBhZ2UpO1xuICAgICAgfVxuICAgICAgaW50ZXJzZWN0aW9uUmF0aW9CeVBhZ2Uuc2V0KHBhZ2UsIHJhdGlvKTtcbiAgICB9XG5cbiAgICBsZXQgbWF4UmF0aW8gPSAwO1xuICAgIGxldCBtb3N0VmlzaWJsZVBhZ2U7XG4gICAgaW50ZXJzZWN0aW9uUmF0aW9CeVBhZ2UuZm9yRWFjaCgocmF0aW8sIHBhZ2UpID0+IHtcbiAgICAgIGlmIChyYXRpbyA+IG1heFJhdGlvKSB7XG4gICAgICAgIG1heFJhdGlvID0gcmF0aW87XG4gICAgICAgIG1vc3RWaXNpYmxlUGFnZSA9IHBhZ2U7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gbW9zdFZpc2libGVQYWdlO1xuICB9XG5cbiAgcHJpdmF0ZSBlbGVtZW50SW5kZXgoZWxlbWVudDogRWxlbWVudCk6IG51bWJlciB7XG4gICAgcmV0dXJuIGVsZW1lbnQucGFyZW50RWxlbWVudCAmJiBlbGVtZW50LnBhcmVudEVsZW1lbnQuY2hpbGRyZW5cbiAgICAgID8gQXJyYXkuZnJvbShlbGVtZW50LnBhcmVudEVsZW1lbnQuY2hpbGRyZW4pLmluZGV4T2YoZWxlbWVudClcbiAgICAgIDogLTE7XG4gIH1cbn1cbiJdfQ==