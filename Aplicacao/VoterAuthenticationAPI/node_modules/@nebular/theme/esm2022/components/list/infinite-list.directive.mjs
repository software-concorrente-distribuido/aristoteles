import { Directive, Input, HostListener, EventEmitter, Output, ContentChildren, } from '@angular/core';
import { forkJoin, of as observableOf, interval, timer, Subject, merge, BehaviorSubject } from 'rxjs';
import { filter, switchMap, map, takeUntil, take, throttle } from 'rxjs/operators';
import { convertToBoolProperty } from '../helpers';
import { NbListItemComponent } from './list.component';
import * as i0 from "@angular/core";
import * as i1 from "../../services/scroll.service";
import * as i2 from "../../services/ruler.service";
export class NbScrollableContainerDimensions {
}
/**
 * Infinite List Directive
 *
 * ```html
 *  <nb-list nbInfiniteList [threshold]="500" (bottomThreshold)="loadNext()">
 *    <nb-list-item *ngFor="let item of items"></nb-list-item>
 *  </nb-list>
 * ```
 *
 * @stacked-example(Simple infinite list, infinite-list/infinite-list-showcase.component)
 *
 * Directive will notify when list scrolled up or down to a given threshold.
 * By default it listen to scroll of list on which applied, but also can be set to listen to window scroll.
 *
 * @stacked-example(Scroll modes, infinite-list/infinite-list-scroll-modes.component)
 *
 * To improve UX of infinite lists, it's better to keep current page in url,
 * so user able to return to the last viewed page or to share a link to this page.
 * `nbListPageTracker` directive will help you to know, what page user currently viewing.
 * Just put it on a list, set page size and it will calculate page that currently in viewport.
 * You can [open the example](example/infinite-list/infinite-news-list.component)
 * in a new tab to check out this feature.
 *
 * @stacked-example(Infinite list with pager, infinite-list/infinite-news-list.component)
 *
 * @stacked-example(Infinite list with placeholders at the top, infinite-list/infinite-list-placeholders.component)
 *
 */
export class NbInfiniteListDirective {
    get elementScroll() {
        return !this.windowScroll;
    }
    /**
     * Prevent subsequent bottom/topThreshold emissions for specified duration after emitting once.
     * In milliseconds.
     */
    set throttleTime(value) {
        this.throttleTime$.next(value);
    }
    get throttleTime() {
        return this.throttleTime$.value;
    }
    /**
     * By default component observes list scroll position.
     * If set to `true`, component will observe position of page scroll instead.
     */
    set listenWindowScroll(value) {
        this.windowScroll = convertToBoolProperty(value);
    }
    onElementScroll() {
        if (this.elementScroll) {
            this.elementScroll$.next();
        }
    }
    constructor(elementRef, scrollService, dimensionsService) {
        this.elementRef = elementRef;
        this.scrollService = scrollService;
        this.dimensionsService = dimensionsService;
        this.destroy$ = new Subject();
        this.windowScroll = false;
        this.elementScroll$ = new Subject();
        this.windowScroll$ = this.scrollService.onScroll().pipe(filter(() => this.windowScroll));
        this.bottomThreshold$ = new Subject();
        this.topThreshold$ = new Subject();
        this.throttleTime$ = new BehaviorSubject(0);
        /**
         * Emits when distance between list bottom and current scroll position is less than threshold.
         */
        this.bottomThreshold = new EventEmitter(true);
        /**
         * Emits when distance between list top and current scroll position is less than threshold.
         */
        this.topThreshold = new EventEmitter(true);
    }
    ngAfterViewInit() {
        merge(this.windowScroll$, this.elementScroll$)
            .pipe(switchMap(() => this.getContainerDimensions()), takeUntil(this.destroy$))
            .subscribe((dimensions) => this.checkPosition(dimensions));
        this.throttleTime$
            .pipe(switchMap(() => this.topThreshold$.pipe(throttle(() => interval(this.throttleTime)))), takeUntil(this.destroy$))
            .subscribe(() => {
            this.topThreshold.emit();
        });
        this.throttleTime$
            .pipe(switchMap(() => this.bottomThreshold$.pipe(throttle(() => interval(this.throttleTime)))), takeUntil(this.destroy$))
            .subscribe(() => {
            this.bottomThreshold.emit();
        });
        this.listItems.changes
            .pipe(
        // For some reason, changes are emitted before list item removed from dom,
        // so dimensions will be incorrect.
        // Check every 50ms for a second if dom and query are in sync.
        // Once they synchronized, we can get proper dimensions.
        switchMap(() => interval(50).pipe(filter(() => this.inSyncWithDom()), take(1), takeUntil(timer(1000)))), switchMap(() => this.getContainerDimensions()), takeUntil(this.destroy$))
            .subscribe((dimensions) => this.checkPosition(dimensions));
        this.getContainerDimensions().subscribe((dimensions) => this.checkPosition(dimensions));
    }
    ngOnDestroy() {
        this.topThreshold$.complete();
        this.bottomThreshold$.complete();
        this.elementScroll$.complete();
        this.destroy$.next();
        this.destroy$.complete();
    }
    checkPosition({ scrollHeight, scrollTop, clientHeight }) {
        const initialCheck = this.lastScrollPosition == null;
        const manualCheck = this.lastScrollPosition === scrollTop;
        const scrollUp = scrollTop < this.lastScrollPosition;
        const scrollDown = scrollTop > this.lastScrollPosition;
        const distanceToBottom = scrollHeight - scrollTop - clientHeight;
        if ((initialCheck || manualCheck || scrollDown) && distanceToBottom <= this.threshold) {
            this.bottomThreshold$.next();
        }
        if ((initialCheck || scrollUp) && scrollTop <= this.threshold) {
            this.topThreshold$.next();
        }
        this.lastScrollPosition = scrollTop;
    }
    getContainerDimensions() {
        if (this.elementScroll) {
            const { scrollTop, scrollHeight, clientHeight } = this.elementRef.nativeElement;
            return observableOf({ scrollTop, scrollHeight, clientHeight });
        }
        return forkJoin([this.scrollService.getPosition(), this.dimensionsService.getDimensions()]).pipe(map(([scrollPosition, dimensions]) => ({
            scrollTop: scrollPosition.y,
            scrollHeight: dimensions.scrollHeight,
            clientHeight: dimensions.clientHeight,
        })));
    }
    inSyncWithDom() {
        return this.elementRef.nativeElement.children.length === this.listItems.length;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbInfiniteListDirective, deps: [{ token: i0.ElementRef }, { token: i1.NbLayoutScrollService }, { token: i2.NbLayoutRulerService }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "17.1.0", type: NbInfiniteListDirective, selector: "[nbInfiniteList]", inputs: { threshold: "threshold", throttleTime: "throttleTime", listenWindowScroll: "listenWindowScroll" }, outputs: { bottomThreshold: "bottomThreshold", topThreshold: "topThreshold" }, host: { listeners: { "scroll": "onElementScroll()" } }, queries: [{ propertyName: "listItems", predicate: NbListItemComponent }], ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbInfiniteListDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[nbInfiniteList]',
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i1.NbLayoutScrollService }, { type: i2.NbLayoutRulerService }], propDecorators: { threshold: [{
                type: Input
            }], throttleTime: [{
                type: Input
            }], listenWindowScroll: [{
                type: Input
            }], bottomThreshold: [{
                type: Output
            }], topThreshold: [{
                type: Output
            }], onElementScroll: [{
                type: HostListener,
                args: ['scroll']
            }], listItems: [{
                type: ContentChildren,
                args: [NbListItemComponent]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5maW5pdGUtbGlzdC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvZnJhbWV3b3JrL3RoZW1lL2NvbXBvbmVudHMvbGlzdC9pbmZpbml0ZS1saXN0LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxZQUFZLEVBRVosWUFBWSxFQUNaLE1BQU0sRUFHTixlQUFlLEdBRWhCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBYyxRQUFRLEVBQUUsRUFBRSxJQUFJLFlBQVksRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2xILE9BQU8sRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ25GLE9BQU8sRUFBRSxxQkFBcUIsRUFBa0IsTUFBTSxZQUFZLENBQUM7QUFHbkUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sa0JBQWtCLENBQUM7Ozs7QUFFdkQsTUFBTSxPQUFPLCtCQUErQjtDQUkzQztBQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EyQkc7QUFJSCxNQUFNLE9BQU8sdUJBQXVCO0lBSWxDLElBQVksYUFBYTtRQUN2QixPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQztJQUM1QixDQUFDO0lBY0Q7OztPQUdHO0lBQ0gsSUFDSSxZQUFZLENBQUMsS0FBYTtRQUM1QixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBQ0QsSUFBSSxZQUFZO1FBQ2QsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQztJQUNsQyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gs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QUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsTUFBTSxLQUFLLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDO0lBQ2pGLENBQUM7OEdBL0pVLHVCQUF1QjtrR0FBdkIsdUJBQXVCLHFVQTZEakIsbUJBQW1COzsyRkE3RHpCLHVCQUF1QjtrQkFIbkMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsa0JBQWtCO2lCQUM3QjtzSkFtQkMsU0FBUztzQkFEUixLQUFLO2dCQVFGLFlBQVk7c0JBRGYsS0FBSztnQkFhRixrQkFBa0I7c0JBRHJCLEtBQUs7Z0JBVU4sZUFBZTtzQkFEZCxNQUFNO2dCQU9QLFlBQVk7c0JBRFgsTUFBTTtnQkFJUCxlQUFlO3NCQURkLFlBQVk7dUJBQUMsUUFBUTtnQkFPZ0IsU0FBUztzQkFBOUMsZUFBZTt1QkFBQyxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBEaXJlY3RpdmUsXG4gIElucHV0LFxuICBIb3N0TGlzdGVuZXIsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgT3V0cHV0LFxuICBPbkRlc3Ryb3ksXG4gIEFmdGVyVmlld0luaXQsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgUXVlcnlMaXN0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIGZvcmtKb2luLCBvZiBhcyBvYnNlcnZhYmxlT2YsIGludGVydmFsLCB0aW1lciwgU3ViamVjdCwgbWVyZ2UsIEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCBzd2l0Y2hNYXAsIG1hcCwgdGFrZVVudGlsLCB0YWtlLCB0aHJvdHRsZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IGNvbnZlcnRUb0Jvb2xQcm9wZXJ0eSwgTmJCb29sZWFuSW5wdXQgfSBmcm9tICcuLi9oZWxwZXJzJztcbmltcG9ydCB7IE5iTGF5b3V0U2Nyb2xsU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3Njcm9sbC5zZXJ2aWNlJztcbmltcG9ydCB7IE5iTGF5b3V0UnVsZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvcnVsZXIuc2VydmljZSc7XG5pbXBvcnQgeyBOYkxpc3RJdGVtQ29tcG9uZW50IH0gZnJvbSAnLi9saXN0LmNvbXBvbmVudCc7XG5cbmV4cG9ydCBjbGFzcyBOYlNjcm9sbGFibGVDb250YWluZXJEaW1lbnNpb25zIHtcbiAgc2Nyb2xsVG9wOiBudW1iZXI7XG4gIHNjcm9sbEhlaWdodDogbnVtYmVyO1xuICBjbGllbnRIZWlnaHQ6IG51bWJlcjtcbn1cblxuLyoqXG4gKiBJbmZpbml0ZSBMaXN0IERpcmVjdGl2ZVxuICpcbiAqIGBgYGh0bWxcbiAqICA8bmItbGlzdCBuYkluZmluaXRlTGlzdCBbdGhyZXNob2xkXT1cIjUwMFwiIChib3R0b21UaHJlc2hvbGQpPVwibG9hZE5leHQoKVwiPlxuICogICAgPG5iLWxpc3QtaXRlbSAqbmdGb3I9XCJsZXQgaXRlbSBvZiBpdGVtc1wiPjwvbmItbGlzdC1pdGVtPlxuICogIDwvbmItbGlzdD5cbiAqIGBgYFxuICpcbiAqIEBzdGFja2VkLWV4YW1wbGUoU2ltcGxlIGluZmluaXRlIGxpc3QsIGluZmluaXRlLWxpc3QvaW5maW5pdGUtbGlzdC1zaG93Y2FzZS5jb21wb25lbnQpXG4gKlxuICogRGlyZWN0aXZlIHdpbGwgbm90aWZ5IHdoZW4gbGlzdCBzY3JvbGxlZCB1cCBvciBkb3duIHRvIGEgZ2l2ZW4gdGhyZXNob2xkLlxuICogQnkgZGVmYXVsdCBpdCBsaXN0ZW4gdG8gc2Nyb2xsIG9mIGxpc3Qgb24gd2hpY2ggYXBwbGllZCwgYnV0IGFsc28gY2FuIGJlIHNldCB0byBsaXN0ZW4gdG8gd2luZG93IHNjcm9sbC5cbiAqXG4gKiBAc3RhY2tlZC1leGFtcGxlKFNjcm9sbCBtb2RlcywgaW5maW5pdGUtbGlzdC9pbmZpbml0ZS1saXN0LXNjcm9sbC1tb2Rlcy5jb21wb25lbnQpXG4gKlxuICogVG8gaW1wcm92ZSBVWCBvZiBpbmZpbml0ZSBsaXN0cywgaXQncyBiZXR0ZXIgdG8ga2VlcCBjdXJyZW50IHBhZ2UgaW4gdXJsLFxuICogc28gdXNlciBhYmxlIHRvIHJldHVybiB0byB0aGUgbGFzdCB2aWV3ZWQgcGFnZSBvciB0byBzaGFyZSBhIGxpbmsgdG8gdGhpcyBwYWdlLlxuICogYG5iTGlzdFBhZ2VUcmFja2VyYCBkaXJlY3RpdmUgd2lsbCBoZWxwIHlvdSB0byBrbm93LCB3aGF0IHBhZ2UgdXNlciBjdXJyZW50bHkgdmlld2luZy5cbiAqIEp1c3QgcHV0IGl0IG9uIGEgbGlzdCwgc2V0IHBhZ2Ugc2l6ZSBhbmQgaXQgd2lsbCBjYWxjdWxhdGUgcGFnZSB0aGF0IGN1cnJlbnRseSBpbiB2aWV3cG9ydC5cbiAqIFlvdSBjYW4gW29wZW4gdGhlIGV4YW1wbGVdKGV4YW1wbGUvaW5maW5pdGUtbGlzdC9pbmZpbml0ZS1uZXdzLWxpc3QuY29tcG9uZW50KVxuICogaW4gYSBuZXcgdGFiIHRvIGNoZWNrIG91dCB0aGlzIGZlYXR1cmUuXG4gKlxuICogQHN0YWNrZWQtZXhhbXBsZShJbmZpbml0ZSBsaXN0IHdpdGggcGFnZXIsIGluZmluaXRlLWxpc3QvaW5maW5pdGUtbmV3cy1saXN0LmNvbXBvbmVudClcbiAqXG4gKiBAc3RhY2tlZC1leGFtcGxlKEluZmluaXRlIGxpc3Qgd2l0aCBwbGFjZWhvbGRlcnMgYXQgdGhlIHRvcCwgaW5maW5pdGUtbGlzdC9pbmZpbml0ZS1saXN0LXBsYWNlaG9sZGVycy5jb21wb25lbnQpXG4gKlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbmJJbmZpbml0ZUxpc3RdJyxcbn0pXG5leHBvcnQgY2xhc3MgTmJJbmZpbml0ZUxpc3REaXJlY3RpdmUgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuICBwcml2YXRlIGRlc3Ryb3kkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcbiAgcHJpdmF0ZSBsYXN0U2Nyb2xsUG9zaXRpb247XG4gIHdpbmRvd1Njcm9sbCA9IGZhbHNlO1xuICBwcml2YXRlIGdldCBlbGVtZW50U2Nyb2xsKCkge1xuICAgIHJldHVybiAhdGhpcy53aW5kb3dTY3JvbGw7XG4gIH1cbiAgcHJpdmF0ZSBlbGVtZW50U2Nyb2xsJCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG4gIHByaXZhdGUgd2luZG93U2Nyb2xsJCA9IHRoaXMuc2Nyb2xsU2VydmljZS5vblNjcm9sbCgpLnBpcGUoZmlsdGVyKCgpID0+IHRoaXMud2luZG93U2Nyb2xsKSk7XG4gIHByaXZhdGUgYm90dG9tVGhyZXNob2xkJCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG4gIHByaXZhdGUgdG9wVGhyZXNob2xkJCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG4gIHByaXZhdGUgdGhyb3R0bGVUaW1lJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigwKTtcblxuICAvKipcbiAgICogVGhyZXNob2xkIGFmdGVyIHdoaWNoIGV2ZW50IGxvYWQgbW9yZSBldmVudCB3aWxsIGJlIGVtaXRlZC5cbiAgICogSW4gcGl4ZWxzLlxuICAgKi9cbiAgQElucHV0KClcbiAgdGhyZXNob2xkOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFByZXZlbnQgc3Vic2VxdWVudCBib3R0b20vdG9wVGhyZXNob2xkIGVtaXNzaW9ucyBmb3Igc3BlY2lmaWVkIGR1cmF0aW9uIGFmdGVyIGVtaXR0aW5nIG9uY2UuXG4gICAqIEluIG1pbGxpc2Vjb25kcy5cbiAgICovXG4gIEBJbnB1dCgpXG4gIHNldCB0aHJvdHRsZVRpbWUodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMudGhyb3R0bGVUaW1lJC5uZXh0KHZhbHVlKTtcbiAgfVxuICBnZXQgdGhyb3R0bGVUaW1lKCkge1xuICAgIHJldHVybiB0aGlzLnRocm90dGxlVGltZSQudmFsdWU7XG4gIH1cblxuICAvKipcbiAgICogQnkgZGVmYXVsdCBjb21wb25lbnQgb2JzZXJ2ZXMgbGlzdCBzY3JvbGwgcG9zaXRpb24uXG4gICAqIElmIHNldCB0byBgdHJ1ZWAsIGNvbXBvbmVudCB3aWxsIG9ic2VydmUgcG9zaXRpb24gb2YgcGFnZSBzY3JvbGwgaW5zdGVhZC5cbiAgICovXG4gIEBJbnB1dCgpXG4gIHNldCBsaXN0ZW5XaW5kb3dTY3JvbGwodmFsdWUpIHtcbiAgICB0aGlzLndpbmRvd1Njcm9sbCA9IGNvbnZlcnRUb0Jvb2xQcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2xpc3RlbldpbmRvd1Njcm9sbDogTmJCb29sZWFuSW5wdXQ7XG5cbiAgLyoqXG4gICAqIEVtaXRzIHdoZW4gZGlzdGFuY2UgYmV0d2VlbiBsaXN0IGJvdHRvbSBhbmQgY3VycmVudCBzY3JvbGwgcG9zaXRpb24gaXMgbGVzcyB0aGFuIHRocmVzaG9sZC5cbiAgICovXG4gIEBPdXRwdXQoKVxuICBib3R0b21UaHJlc2hvbGQgPSBuZXcgRXZlbnRFbWl0dGVyKHRydWUpO1xuXG4gIC8qKlxuICAgKiBFbWl0cyB3aGVuIGRpc3RhbmNlIGJldHdlZW4gbGlzdCB0b3AgYW5kIGN1cnJlbnQgc2Nyb2xsIHBvc2l0aW9uIGlzIGxlc3MgdGhhbiB0aHJlc2hvbGQuXG4gICAqL1xuICBAT3V0cHV0KClcbiAgdG9wVGhyZXNob2xkID0gbmV3IEV2ZW50RW1pdHRlcih0cnVlKTtcblxuICBASG9zdExpc3RlbmVyKCdzY3JvbGwnKVxuICBvbkVsZW1lbnRTY3JvbGwoKSB7XG4gICAgaWYgKHRoaXMuZWxlbWVudFNjcm9sbCkge1xuICAgICAgdGhpcy5lbGVtZW50U2Nyb2xsJC5uZXh0KCk7XG4gICAgfVxuICB9XG5cbiAgQENvbnRlbnRDaGlsZHJlbihOYkxpc3RJdGVtQ29tcG9uZW50KSBsaXN0SXRlbXM6IFF1ZXJ5TGlzdDxOYkxpc3RJdGVtQ29tcG9uZW50PjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSBzY3JvbGxTZXJ2aWNlOiBOYkxheW91dFNjcm9sbFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBkaW1lbnNpb25zU2VydmljZTogTmJMYXlvdXRSdWxlclNlcnZpY2UsXG4gICkge31cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgbWVyZ2UodGhpcy53aW5kb3dTY3JvbGwkLCB0aGlzLmVsZW1lbnRTY3JvbGwkKVxuICAgICAgLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcCgoKSA9PiB0aGlzLmdldENvbnRhaW5lckRpbWVuc2lvbnMoKSksXG4gICAgICAgIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSxcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoKGRpbWVuc2lvbnMpID0+IHRoaXMuY2hlY2tQb3NpdGlvbihkaW1lbnNpb25zKSk7XG5cbiAgICB0aGlzLnRocm90dGxlVGltZSRcbiAgICAgIC5waXBlKFxuICAgICAgICBzd2l0Y2hNYXAoKCkgPT4gdGhpcy50b3BUaHJlc2hvbGQkLnBpcGUodGhyb3R0bGUoKCkgPT4gaW50ZXJ2YWwodGhpcy50aHJvdHRsZVRpbWUpKSkpLFxuICAgICAgICB0YWtlVW50aWwodGhpcy5kZXN0cm95JCksXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy50b3BUaHJlc2hvbGQuZW1pdCgpO1xuICAgICAgfSk7XG5cbiAgICB0aGlzLnRocm90dGxlVGltZSRcbiAgICAgIC5waXBlKFxuICAgICAgICBzd2l0Y2hNYXAoKCkgPT4gdGhpcy5ib3R0b21UaHJlc2hvbGQkLnBpcGUodGhyb3R0bGUoKCkgPT4gaW50ZXJ2YWwodGhpcy50aHJvdHRsZVRpbWUpKSkpLFxuICAgICAgICB0YWtlVW50aWwodGhpcy5kZXN0cm95JCksXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5ib3R0b21UaHJlc2hvbGQuZW1pdCgpO1xuICAgICAgfSk7XG5cbiAgICB0aGlzLmxpc3RJdGVtcy5jaGFuZ2VzXG4gICAgICAucGlwZShcbiAgICAgICAgLy8gRm9yIHNvbWUgcmVhc29uLCBjaGFuZ2VzIGFyZSBlbWl0dGVkIGJlZm9yZSBsaXN0IGl0ZW0gcmVtb3ZlZCBmcm9tIGRvbSxcbiAgICAgICAgLy8gc28gZGltZW5zaW9ucyB3aWxsIGJlIGluY29ycmVjdC5cbiAgICAgICAgLy8gQ2hlY2sgZXZlcnkgNTBtcyBmb3IgYSBzZWNvbmQgaWYgZG9tIGFuZCBxdWVyeSBhcmUgaW4gc3luYy5cbiAgICAgICAgLy8gT25jZSB0aGV5IHN5bmNocm9uaXplZCwgd2UgY2FuIGdldCBwcm9wZXIgZGltZW5zaW9ucy5cbiAgICAgICAgc3dpdGNoTWFwKCgpID0+XG4gICAgICAgICAgaW50ZXJ2YWwoNTApLnBpcGUoXG4gICAgICAgICAgICBmaWx0ZXIoKCkgPT4gdGhpcy5pblN5bmNXaXRoRG9tKCkpLFxuICAgICAgICAgICAgdGFrZSgxKSxcbiAgICAgICAgICAgIHRha2VVbnRpbCh0aW1lcigxMDAwKSksXG4gICAgICAgICAgKSxcbiAgICAgICAgKSxcbiAgICAgICAgc3dpdGNoTWFwKCgpID0+IHRoaXMuZ2V0Q29udGFpbmVyRGltZW5zaW9ucygpKSxcbiAgICAgICAgdGFrZVVudGlsKHRoaXMuZGVzdHJveSQpLFxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSgoZGltZW5zaW9ucykgPT4gdGhpcy5jaGVja1Bvc2l0aW9uKGRpbWVuc2lvbnMpKTtcblxuICAgIHRoaXMuZ2V0Q29udGFpbmVyRGltZW5zaW9ucygpLnN1YnNjcmliZSgoZGltZW5zaW9ucykgPT4gdGhpcy5jaGVja1Bvc2l0aW9uKGRpbWVuc2lvbnMpKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMudG9wVGhyZXNob2xkJC5jb21wbGV0ZSgpO1xuICAgIHRoaXMuYm90dG9tVGhyZXNob2xkJC5jb21wbGV0ZSgpO1xuICAgIHRoaXMuZWxlbWVudFNjcm9sbCQuY29tcGxldGUoKTtcbiAgICB0aGlzLmRlc3Ryb3kkLm5leHQoKTtcbiAgICB0aGlzLmRlc3Ryb3kkLmNvbXBsZXRlKCk7XG4gIH1cblxuICBjaGVja1Bvc2l0aW9uKHsgc2Nyb2xsSGVpZ2h0LCBzY3JvbGxUb3AsIGNsaWVudEhlaWdodCB9OiBOYlNjcm9sbGFibGVDb250YWluZXJEaW1lbnNpb25zKSB7XG4gICAgY29uc3QgaW5pdGlhbENoZWNrID0gdGhpcy5sYXN0U2Nyb2xsUG9zaXRpb24gPT0gbnVsbDtcbiAgICBjb25zdCBtYW51YWxDaGVjayA9IHRoaXMubGFzdFNjcm9sbFBvc2l0aW9uID09PSBzY3JvbGxUb3A7XG4gICAgY29uc3Qgc2Nyb2xsVXAgPSBzY3JvbGxUb3AgPCB0aGlzLmxhc3RTY3JvbGxQb3NpdGlvbjtcbiAgICBjb25zdCBzY3JvbGxEb3duID0gc2Nyb2xsVG9wID4gdGhpcy5sYXN0U2Nyb2xsUG9zaXRpb247XG4gICAgY29uc3QgZGlzdGFuY2VUb0JvdHRvbSA9IHNjcm9sbEhlaWdodCAtIHNjcm9sbFRvcCAtIGNsaWVudEhlaWdodDtcblxuICAgIGlmICgoaW5pdGlhbENoZWNrIHx8IG1hbnVhbENoZWNrIHx8IHNjcm9sbERvd24pICYmIGRpc3RhbmNlVG9Cb3R0b20gPD0gdGhpcy50aHJlc2hvbGQpIHtcbiAgICAgIHRoaXMuYm90dG9tVGhyZXNob2xkJC5uZXh0KCk7XG4gICAgfVxuXG4gICAgaWYgKChpbml0aWFsQ2hlY2sgfHwgc2Nyb2xsVXApICYmIHNjcm9sbFRvcCA8PSB0aGlzLnRocmVzaG9sZCkge1xuICAgICAgdGhpcy50b3BUaHJlc2hvbGQkLm5leHQoKTtcbiAgICB9XG5cbiAgICB0aGlzLmxhc3RTY3JvbGxQb3NpdGlvbiA9IHNjcm9sbFRvcDtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0Q29udGFpbmVyRGltZW5zaW9ucygpOiBPYnNlcnZhYmxlPE5iU2Nyb2xsYWJsZUNvbnRhaW5lckRpbWVuc2lvbnM+IHtcbiAgICBpZiAodGhpcy5lbGVtZW50U2Nyb2xsKSB7XG4gICAgICBjb25zdCB7IHNjcm9sbFRvcCwgc2Nyb2xsSGVpZ2h0LCBjbGllbnRIZWlnaHQgfSA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAgICAgcmV0dXJuIG9ic2VydmFibGVPZih7IHNjcm9sbFRvcCwgc2Nyb2xsSGVpZ2h0LCBjbGllbnRIZWlnaHQgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZvcmtKb2luKFt0aGlzLnNjcm9sbFNlcnZpY2UuZ2V0UG9zaXRpb24oKSwgdGhpcy5kaW1lbnNpb25zU2VydmljZS5nZXREaW1lbnNpb25zKCldKS5waXBlKFxuICAgICAgbWFwKChbc2Nyb2xsUG9zaXRpb24sIGRpbWVuc2lvbnNdKSA9PiAoe1xuICAgICAgICBzY3JvbGxUb3A6IHNjcm9sbFBvc2l0aW9uLnksXG4gICAgICAgIHNjcm9sbEhlaWdodDogZGltZW5zaW9ucy5zY3JvbGxIZWlnaHQsXG4gICAgICAgIGNsaWVudEhlaWdodDogZGltZW5zaW9ucy5jbGllbnRIZWlnaHQsXG4gICAgICB9KSksXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgaW5TeW5jV2l0aERvbSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW4ubGVuZ3RoID09PSB0aGlzLmxpc3RJdGVtcy5sZW5ndGg7XG4gIH1cbn1cbiJdfQ==