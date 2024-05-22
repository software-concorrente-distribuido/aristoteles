/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output, } from '@angular/core';
import { combineLatest, Subject } from 'rxjs';
import { takeUntil, filter, map, startWith } from 'rxjs/operators';
import { convertToBoolProperty } from '../helpers';
import { getSidebarState$, getSidebarResponsiveState$ } from './sidebar.service';
import * as i0 from "@angular/core";
import * as i1 from "./sidebar.service";
import * as i2 from "../../services/theme.service";
/**
 * Sidebar header container.
 *
 * Placeholder which contains a sidebar header content,
 * placed at the very top of the sidebar outside of the scroll area.
 */
export class NbSidebarHeaderComponent {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbSidebarHeaderComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.1.0", type: NbSidebarHeaderComponent, selector: "nb-sidebar-header", ngImport: i0, template: ` <ng-content></ng-content> `, isInline: true }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbSidebarHeaderComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nb-sidebar-header',
                    template: ` <ng-content></ng-content> `,
                }]
        }] });
/**
 * Sidebar footer container.
 *
 * Placeholder which contains a sidebar footer content,
 * placed at the very bottom of the sidebar outside of the scroll area.
 */
export class NbSidebarFooterComponent {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbSidebarFooterComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.1.0", type: NbSidebarFooterComponent, selector: "nb-sidebar-footer", ngImport: i0, template: ` <ng-content></ng-content> `, isInline: true }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbSidebarFooterComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nb-sidebar-footer',
                    template: ` <ng-content></ng-content> `,
                }]
        }] });
/**
 * Layout sidebar component.
 *
 * @stacked-example(Showcase, sidebar/sidebar-showcase.component)
 *
 * ### Installation
 *
 * Import `NbSidebarModule.forRoot()` to your app module.
 * ```ts
 * @NgModule({
 *   imports: [
 *     // ...
 *     NbSidebarModule.forRoot(),
 *   ],
 * })
 * export class AppModule { }
 * ```
 * and `NbSidebarModule` to your feature module where the component should be shown:
 * ```ts
 * @NgModule({
 *   imports: [
 *     // ...
 *     NbSidebarModule,
 *   ],
 * })
 * export class PageModule { }
 * ```
 * ### Usage
 *
 * Sidebar can be placed on the left or the right side of the layout,
 * or on start/end position of layout (depends on document direction, left to right or right to left)
 * It can be fixed (shown above the content) or can push the layout when opened.
 *
 * There are three states - `expanded`, `collapsed`, `compacted`.
 * By default sidebar content is fixed and saves its position while the page is being scrolled.
 *
 * Compacted sidebar example:
 * @stacked-example(Compacted Sidebar, sidebar/sidebar-compacted.component)
 *
 * Sidebar also supports a `responsive` behavior, listening to window size change and changing its size respectably.
 *
 * In a pair with header it is possible to setup a configuration when header is placed on a side of the sidebar
 * and not on top of it. To achieve this simply put a `subheader` property to the header like this:
 * ```html
 * <nb-layout-header subheader></nb-layout-header>
 * ```
 * @stacked-example(Subheader, layout/layout-sidebar-subheader.component)
 * Note that in such configuration sidebar shadow is removed and header cannot be make `fixed`.
 *
 * @additional-example(Right Sidebar, sidebar/sidebar-right.component)
 * @additional-example(Fixed Sidebar, sidebar/sidebar-fixed.component)
 *
 * @styles
 *
 * sidebar-background-color:
 * sidebar-text-color:
 * sidebar-text-font-family:
 * sidebar-text-font-size:
 * sidebar-text-font-weight:
 * sidebar-text-line-height:
 * sidebar-height:
 * sidebar-width:
 * sidebar-width-compact:
 * sidebar-padding:
 * sidebar-header-height:
 * sidebar-footer-height:
 * sidebar-shadow:
 * sidebar-menu-item-highlight-color:
 * sidebar-scrollbar-background-color:
 * sidebar-scrollbar-color:
 * sidebar-scrollbar-width:
 */
export class NbSidebarComponent {
    get expanded() {
        return this.state === 'expanded';
    }
    get collapsed() {
        return this.state === 'collapsed';
    }
    get compacted() {
        return this.state === 'compacted';
    }
    /**
     * Places sidebar on the right side
     * @type {boolean}
     */
    set right(val) {
        this.rightValue = convertToBoolProperty(val);
        this.leftValue = !this.rightValue;
        this.startValue = false;
        this.endValue = false;
    }
    /**
     * Places sidebar on the left side
     * @type {boolean}
     */
    set left(val) {
        this.leftValue = convertToBoolProperty(val);
        this.rightValue = !this.leftValue;
        this.startValue = false;
        this.endValue = false;
    }
    /**
     * Places sidebar on the start edge of layout
     * @type {boolean}
     */
    set start(val) {
        this.startValue = convertToBoolProperty(val);
        this.endValue = !this.startValue;
        this.leftValue = false;
        this.rightValue = false;
    }
    /**
     * Places sidebar on the end edge of layout
     * @type {boolean}
     */
    set end(val) {
        this.endValue = convertToBoolProperty(val);
        this.startValue = !this.endValue;
        this.leftValue = false;
        this.rightValue = false;
    }
    /**
     * Makes sidebar fixed (shown above the layout content)
     * @type {boolean}
     */
    set fixed(val) {
        this.fixedValue = convertToBoolProperty(val);
    }
    /**
     * Makes sidebar container fixed
     * @type {boolean}
     */
    set containerFixed(val) {
        this.containerFixedValue = convertToBoolProperty(val);
    }
    /**
     * Initial sidebar state, `expanded`|`collapsed`|`compacted`
     * @type {string}
     */
    get state() {
        return this._state;
    }
    set state(value) {
        this._state = value;
    }
    /**
     * Makes sidebar listen to media query events and change its behaviour
     * @type {boolean}
     */
    get responsive() {
        return this._responsive;
    }
    set responsive(value) {
        if (this.responsive !== convertToBoolProperty(value)) {
            this._responsive = !this.responsive;
            this.responsiveValueChange$.next(this.responsive);
        }
    }
    constructor(sidebarService, themeService, element, cd) {
        this.sidebarService = sidebarService;
        this.themeService = themeService;
        this.element = element;
        this.cd = cd;
        this.responsiveValueChange$ = new Subject();
        this.responsiveState = 'pc';
        this.destroy$ = new Subject();
        this.containerFixedValue = true;
        this.fixedValue = false;
        this.rightValue = false;
        this.leftValue = true;
        this.startValue = false;
        this.endValue = false;
        this._state = 'expanded';
        this._responsive = false;
        // TODO: get width by the key and define only max width for the tablets and mobiles
        /**
         * Controls on which screen sizes sidebar should be switched to compacted state.
         * Works only when responsive mode is on.
         * Default values are `['xs', 'is', 'sm', 'md', 'lg']`.
         *
         * @type string[]
         */
        this.compactedBreakpoints = ['xs', 'is', 'sm', 'md', 'lg'];
        /**
         * Controls on which screen sizes sidebar should be switched to collapsed state.
         * Works only when responsive mode is on.
         * Default values are `['xs', 'is']`.
         *
         * @type string[]
         */
        this.collapsedBreakpoints = ['xs', 'is'];
        /**
         * Emits whenever sidebar state change.
         */
        this.stateChange = new EventEmitter();
        /**
         * Emits whenever sidebar responsive state change.
         */
        this.responsiveStateChange = new EventEmitter();
    }
    ngOnInit() {
        this.sidebarService
            .onToggle()
            .pipe(filter(({ tag }) => !this.tag || this.tag === tag), takeUntil(this.destroy$))
            .subscribe(({ compact }) => this.toggle(compact));
        this.sidebarService
            .onExpand()
            .pipe(filter(({ tag }) => !this.tag || this.tag === tag), takeUntil(this.destroy$))
            .subscribe(() => this.expand());
        this.sidebarService
            .onCollapse()
            .pipe(filter(({ tag }) => !this.tag || this.tag === tag), takeUntil(this.destroy$))
            .subscribe(() => this.collapse());
        this.sidebarService
            .onCompact()
            .pipe(filter(({ tag }) => !this.tag || this.tag === tag), takeUntil(this.destroy$))
            .subscribe(() => this.compact());
        getSidebarState$
            .pipe(filter(({ tag }) => !this.tag || this.tag === tag), takeUntil(this.destroy$))
            .subscribe(({ observer }) => observer.next(this.state));
        getSidebarResponsiveState$
            .pipe(filter(({ tag }) => !this.tag || this.tag === tag), takeUntil(this.destroy$))
            .subscribe(({ observer }) => observer.next(this.responsiveState));
        this.responsiveValueChange$
            .pipe(filter((responsive) => !responsive), takeUntil(this.destroy$))
            .subscribe(() => this.expand());
        this.subscribeToMediaQueryChange();
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    // TODO: this is more of a workaround, should be a better way to make components communicate to each other
    onClick(event) {
        const menu = this.element.nativeElement.querySelector('nb-menu');
        if (menu && menu.contains(event.target)) {
            const link = this.getMenuLink(event.target);
            if (link && link.nextElementSibling && link.nextElementSibling.classList.contains('menu-items')) {
                this.sidebarService.expand(this.tag);
            }
        }
    }
    /**
     * Collapses the sidebar
     */
    collapse() {
        this.updateState('collapsed');
    }
    /**
     * Expands the sidebar
     */
    expand() {
        this.updateState('expanded');
    }
    /**
     * Compacts the sidebar (minimizes)
     */
    compact() {
        this.updateState('compacted');
    }
    /**
     * Toggles sidebar state (expanded|collapsed|compacted)
     * @param {boolean} compact If true, then sidebar state will be changed between expanded & compacted,
     * otherwise - between expanded & collapsed. False by default.
     *
     * Toggle sidebar state
     *
     * ```ts
     * this.sidebar.toggle(true);
     * ```
     */
    toggle(compact = false) {
        if (this.responsive) {
            if (this.responsiveState === 'mobile') {
                compact = false;
            }
        }
        if (this.state === 'compacted' || this.state === 'collapsed') {
            this.updateState('expanded');
        }
        else {
            this.updateState(compact ? 'compacted' : 'collapsed');
        }
    }
    subscribeToMediaQueryChange() {
        combineLatest([
            this.responsiveValueChange$.pipe(startWith(this.responsive)),
            this.themeService.onMediaQueryChange(),
        ])
            .pipe(filter(([responsive]) => responsive), map(([, breakpoints]) => breakpoints), takeUntil(this.destroy$))
            .subscribe(([prev, current]) => {
            const isCollapsed = this.collapsedBreakpoints.includes(current.name);
            const isCompacted = this.compactedBreakpoints.includes(current.name);
            let newResponsiveState;
            if (isCompacted) {
                this.fixed = this.containerFixedValue;
                this.compact();
                newResponsiveState = 'tablet';
            }
            if (isCollapsed) {
                this.fixed = true;
                this.collapse();
                newResponsiveState = 'mobile';
            }
            if (!isCollapsed && !isCompacted && (!prev.width || prev.width < current.width)) {
                this.expand();
                this.fixed = false;
                newResponsiveState = 'pc';
            }
            if (newResponsiveState && newResponsiveState !== this.responsiveState) {
                this.responsiveState = newResponsiveState;
                this.responsiveStateChange.emit(this.responsiveState);
                this.cd.markForCheck();
            }
        });
    }
    getMenuLink(element) {
        if (!element || element.tagName.toLowerCase() === 'nb-menu') {
            return undefined;
        }
        if (element.tagName.toLowerCase() === 'a') {
            return element;
        }
        return this.getMenuLink(element.parentElement);
    }
    updateState(state) {
        if (this.state !== state) {
            this.state = state;
            this.stateChange.emit(this.state);
            this.cd.markForCheck();
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbSidebarComponent, deps: [{ token: i1.NbSidebarService }, { token: i2.NbThemeService }, { token: i0.ElementRef }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.1.0", type: NbSidebarComponent, selector: "nb-sidebar", inputs: { right: "right", left: "left", start: "start", end: "end", fixed: "fixed", containerFixed: "containerFixed", state: "state", responsive: "responsive", tag: "tag", compactedBreakpoints: "compactedBreakpoints", collapsedBreakpoints: "collapsedBreakpoints" }, outputs: { stateChange: "stateChange", responsiveStateChange: "responsiveStateChange" }, host: { properties: { "class.fixed": "this.fixedValue", "class.right": "this.rightValue", "class.left": "this.leftValue", "class.start": "this.startValue", "class.end": "this.endValue", "class.expanded": "this.expanded", "class.collapsed": "this.collapsed", "class.compacted": "this.compacted" } }, ngImport: i0, template: `
    <div class="main-container" [class.main-container-fixed]="containerFixedValue">
      <ng-content select="nb-sidebar-header"></ng-content>
      <div class="scrollable" (click)="onClick($event)">
        <ng-content></ng-content>
      </div>
      <ng-content select="nb-sidebar-footer"></ng-content>
    </div>
  `, isInline: true, styles: ["/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */:host{display:flex;flex-direction:column;overflow:hidden;z-index:auto;order:0}:host .scrollable{overflow-y:auto;overflow-x:hidden;flex:1}:host .main-container{transform:translateZ(0);display:flex;flex-direction:column}:host .main-container-fixed{position:fixed}:host.right{margin-right:0;margin-left:auto}[dir=ltr] :host.right{order:4}[dir=rtl] :host.right{order:0}:host.end{order:4}[dir=ltr] :host.end{margin-right:0;margin-left:auto}[dir=rtl] :host.end{margin-left:0;margin-right:auto}:host.fixed{position:fixed;height:100%;z-index:999;top:0;bottom:0;left:0}:host.fixed.right{right:0}[dir=ltr] :host.fixed.start{left:0}[dir=rtl] :host.fixed.start{right:0}[dir=ltr] :host.fixed.end{right:0}[dir=rtl] :host.fixed.end{left:0}:host ::ng-deep nb-sidebar-footer{margin-top:auto;display:block}:host ::ng-deep nb-sidebar-header{display:block}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbSidebarComponent, decorators: [{
            type: Component,
            args: [{ selector: 'nb-sidebar', template: `
    <div class="main-container" [class.main-container-fixed]="containerFixedValue">
      <ng-content select="nb-sidebar-header"></ng-content>
      <div class="scrollable" (click)="onClick($event)">
        <ng-content></ng-content>
      </div>
      <ng-content select="nb-sidebar-footer"></ng-content>
    </div>
  `, changeDetection: ChangeDetectionStrategy.OnPush, styles: ["/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */:host{display:flex;flex-direction:column;overflow:hidden;z-index:auto;order:0}:host .scrollable{overflow-y:auto;overflow-x:hidden;flex:1}:host .main-container{transform:translateZ(0);display:flex;flex-direction:column}:host .main-container-fixed{position:fixed}:host.right{margin-right:0;margin-left:auto}[dir=ltr] :host.right{order:4}[dir=rtl] :host.right{order:0}:host.end{order:4}[dir=ltr] :host.end{margin-right:0;margin-left:auto}[dir=rtl] :host.end{margin-left:0;margin-right:auto}:host.fixed{position:fixed;height:100%;z-index:999;top:0;bottom:0;left:0}:host.fixed.right{right:0}[dir=ltr] :host.fixed.start{left:0}[dir=rtl] :host.fixed.start{right:0}[dir=ltr] :host.fixed.end{right:0}[dir=rtl] :host.fixed.end{left:0}:host ::ng-deep nb-sidebar-footer{margin-top:auto;display:block}:host ::ng-deep nb-sidebar-header{display:block}\n"] }]
        }], ctorParameters: () => [{ type: i1.NbSidebarService }, { type: i2.NbThemeService }, { type: i0.ElementRef }, { type: i0.ChangeDetectorRef }], propDecorators: { fixedValue: [{
                type: HostBinding,
                args: ['class.fixed']
            }], rightValue: [{
                type: HostBinding,
                args: ['class.right']
            }], leftValue: [{
                type: HostBinding,
                args: ['class.left']
            }], startValue: [{
                type: HostBinding,
                args: ['class.start']
            }], endValue: [{
                type: HostBinding,
                args: ['class.end']
            }], expanded: [{
                type: HostBinding,
                args: ['class.expanded']
            }], collapsed: [{
                type: HostBinding,
                args: ['class.collapsed']
            }], compacted: [{
                type: HostBinding,
                args: ['class.compacted']
            }], right: [{
                type: Input
            }], left: [{
                type: Input
            }], start: [{
                type: Input
            }], end: [{
                type: Input
            }], fixed: [{
                type: Input
            }], containerFixed: [{
                type: Input
            }], state: [{
                type: Input
            }], responsive: [{
                type: Input
            }], tag: [{
                type: Input
            }], compactedBreakpoints: [{
                type: Input
            }], collapsedBreakpoints: [{
                type: Input
            }], stateChange: [{
                type: Output
            }], responsiveStateChange: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZWJhci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvZnJhbWV3b3JrL3RoZW1lL2NvbXBvbmVudHMvc2lkZWJhci9zaWRlYmFyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUNMLHVCQUF1QixFQUV2QixTQUFTLEVBRVQsWUFBWSxFQUNaLFdBQVcsRUFDWCxLQUFLLEVBR0wsTUFBTSxHQUNQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxhQUFhLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzFELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVuRSxPQUFPLEVBQUUscUJBQXFCLEVBQWtCLE1BQU0sWUFBWSxDQUFDO0FBR25FLE9BQU8sRUFBb0IsZ0JBQWdCLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQzs7OztBQUtuRzs7Ozs7R0FLRztBQUtILE1BQU0sT0FBTyx3QkFBd0I7OEdBQXhCLHdCQUF3QjtrR0FBeEIsd0JBQXdCLHlEQUZ6Qiw2QkFBNkI7OzJGQUU1Qix3QkFBd0I7a0JBSnBDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjtvQkFDN0IsUUFBUSxFQUFFLDZCQUE2QjtpQkFDeEM7O0FBR0Q7Ozs7O0dBS0c7QUFLSCxNQUFNLE9BQU8sd0JBQXdCOzhHQUF4Qix3QkFBd0I7a0dBQXhCLHdCQUF3Qix5REFGekIsNkJBQTZCOzsyRkFFNUIsd0JBQXdCO2tCQUpwQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxtQkFBbUI7b0JBQzdCLFFBQVEsRUFBRSw2QkFBNkI7aUJBQ3hDOztBQUdEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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bGljZW5zZVxuICogQ29weXJpZ2h0IEFrdmVvLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqL1xuXG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0QmluZGluZyxcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgY29tYmluZUxhdGVzdCwgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFrZVVudGlsLCBmaWx0ZXIsIG1hcCwgc3RhcnRXaXRoIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBjb252ZXJ0VG9Cb29sUHJvcGVydHksIE5iQm9vbGVhbklucHV0IH0gZnJvbSAnLi4vaGVscGVycyc7XG5pbXBvcnQgeyBOYlRoZW1lU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3RoZW1lLnNlcnZpY2UnO1xuaW1wb3J0IHsgTmJNZWRpYUJyZWFrcG9pbnQgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9icmVha3BvaW50cy5zZXJ2aWNlJztcbmltcG9ydCB7IE5iU2lkZWJhclNlcnZpY2UsIGdldFNpZGViYXJTdGF0ZSQsIGdldFNpZGViYXJSZXNwb25zaXZlU3RhdGUkIH0gZnJvbSAnLi9zaWRlYmFyLnNlcnZpY2UnO1xuXG5leHBvcnQgdHlwZSBOYlNpZGViYXJTdGF0ZSA9ICdleHBhbmRlZCcgfCAnY29sbGFwc2VkJyB8ICdjb21wYWN0ZWQnO1xuZXhwb3J0IHR5cGUgTmJTaWRlYmFyUmVzcG9uc2l2ZVN0YXRlID0gJ21vYmlsZScgfCAndGFibGV0JyB8ICdwYyc7XG5cbi8qKlxuICogU2lkZWJhciBoZWFkZXIgY29udGFpbmVyLlxuICpcbiAqIFBsYWNlaG9sZGVyIHdoaWNoIGNvbnRhaW5zIGEgc2lkZWJhciBoZWFkZXIgY29udGVudCxcbiAqIHBsYWNlZCBhdCB0aGUgdmVyeSB0b3Agb2YgdGhlIHNpZGViYXIgb3V0c2lkZSBvZiB0aGUgc2Nyb2xsIGFyZWEuXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25iLXNpZGViYXItaGVhZGVyJyxcbiAgdGVtcGxhdGU6IGAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PiBgLFxufSlcbmV4cG9ydCBjbGFzcyBOYlNpZGViYXJIZWFkZXJDb21wb25lbnQge31cblxuLyoqXG4gKiBTaWRlYmFyIGZvb3RlciBjb250YWluZXIuXG4gKlxuICogUGxhY2Vob2xkZXIgd2hpY2ggY29udGFpbnMgYSBzaWRlYmFyIGZvb3RlciBjb250ZW50LFxuICogcGxhY2VkIGF0IHRoZSB2ZXJ5IGJvdHRvbSBvZiB0aGUgc2lkZWJhciBvdXRzaWRlIG9mIHRoZSBzY3JvbGwgYXJlYS5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmItc2lkZWJhci1mb290ZXInLFxuICB0ZW1wbGF0ZTogYCA8bmctY29udGVudD48L25nLWNvbnRlbnQ+IGAsXG59KVxuZXhwb3J0IGNsYXNzIE5iU2lkZWJhckZvb3RlckNvbXBvbmVudCB7fVxuXG4vKipcbiAqIExheW91dCBzaWRlYmFyIGNvbXBvbmVudC5cbiAqXG4gKiBAc3RhY2tlZC1leGFtcGxlKFNob3djYXNlLCBzaWRlYmFyL3NpZGViYXItc2hvd2Nhc2UuY29tcG9uZW50KVxuICpcbiAqICMjIyBJbnN0YWxsYXRpb25cbiAqXG4gKiBJbXBvcnQgYE5iU2lkZWJhck1vZHVsZS5mb3JSb290KClgIHRvIHlvdXIgYXBwIG1vZHVsZS5cbiAqIGBgYHRzXG4gKiBATmdNb2R1bGUoe1xuICogICBpbXBvcnRzOiBbXG4gKiAgICAgLy8gLi4uXG4gKiAgICAgTmJTaWRlYmFyTW9kdWxlLmZvclJvb3QoKSxcbiAqICAgXSxcbiAqIH0pXG4gKiBleHBvcnQgY2xhc3MgQXBwTW9kdWxlIHsgfVxuICogYGBgXG4gKiBhbmQgYE5iU2lkZWJhck1vZHVsZWAgdG8geW91ciBmZWF0dXJlIG1vZHVsZSB3aGVyZSB0aGUgY29tcG9uZW50IHNob3VsZCBiZSBzaG93bjpcbiAqIGBgYHRzXG4gKiBATmdNb2R1bGUoe1xuICogICBpbXBvcnRzOiBbXG4gKiAgICAgLy8gLi4uXG4gKiAgICAgTmJTaWRlYmFyTW9kdWxlLFxuICogICBdLFxuICogfSlcbiAqIGV4cG9ydCBjbGFzcyBQYWdlTW9kdWxlIHsgfVxuICogYGBgXG4gKiAjIyMgVXNhZ2VcbiAqXG4gKiBTaWRlYmFyIGNhbiBiZSBwbGFjZWQgb24gdGhlIGxlZnQgb3IgdGhlIHJpZ2h0IHNpZGUgb2YgdGhlIGxheW91dCxcbiAqIG9yIG9uIHN0YXJ0L2VuZCBwb3NpdGlvbiBvZiBsYXlvdXQgKGRlcGVuZHMgb24gZG9jdW1lbnQgZGlyZWN0aW9uLCBsZWZ0IHRvIHJpZ2h0IG9yIHJpZ2h0IHRvIGxlZnQpXG4gKiBJdCBjYW4gYmUgZml4ZWQgKHNob3duIGFib3ZlIHRoZSBjb250ZW50KSBvciBjYW4gcHVzaCB0aGUgbGF5b3V0IHdoZW4gb3BlbmVkLlxuICpcbiAqIFRoZXJlIGFyZSB0aHJlZSBzdGF0ZXMgLSBgZXhwYW5kZWRgLCBgY29sbGFwc2VkYCwgYGNvbXBhY3RlZGAuXG4gKiBCeSBkZWZhdWx0IHNpZGViYXIgY29udGVudCBpcyBmaXhlZCBhbmQgc2F2ZXMgaXRzIHBvc2l0aW9uIHdoaWxlIHRoZSBwYWdlIGlzIGJlaW5nIHNjcm9sbGVkLlxuICpcbiAqIENvbXBhY3RlZCBzaWRlYmFyIGV4YW1wbGU6XG4gKiBAc3RhY2tlZC1leGFtcGxlKENvbXBhY3RlZCBTaWRlYmFyLCBzaWRlYmFyL3NpZGViYXItY29tcGFjdGVkLmNvbXBvbmVudClcbiAqXG4gKiBTaWRlYmFyIGFsc28gc3VwcG9ydHMgYSBgcmVzcG9uc2l2ZWAgYmVoYXZpb3IsIGxpc3RlbmluZyB0byB3aW5kb3cgc2l6ZSBjaGFuZ2UgYW5kIGNoYW5naW5nIGl0cyBzaXplIHJlc3BlY3RhYmx5LlxuICpcbiAqIEluIGEgcGFpciB3aXRoIGhlYWRlciBpdCBpcyBwb3NzaWJsZSB0byBzZXR1cCBhIGNvbmZpZ3VyYXRpb24gd2hlbiBoZWFkZXIgaXMgcGxhY2VkIG9uIGEgc2lkZSBvZiB0aGUgc2lkZWJhclxuICogYW5kIG5vdCBvbiB0b3Agb2YgaXQuIFRvIGFjaGlldmUgdGhpcyBzaW1wbHkgcHV0IGEgYHN1YmhlYWRlcmAgcHJvcGVydHkgdG8gdGhlIGhlYWRlciBsaWtlIHRoaXM6XG4gKiBgYGBodG1sXG4gKiA8bmItbGF5b3V0LWhlYWRlciBzdWJoZWFkZXI+PC9uYi1sYXlvdXQtaGVhZGVyPlxuICogYGBgXG4gKiBAc3RhY2tlZC1leGFtcGxlKFN1YmhlYWRlciwgbGF5b3V0L2xheW91dC1zaWRlYmFyLXN1YmhlYWRlci5jb21wb25lbnQpXG4gKiBOb3RlIHRoYXQgaW4gc3VjaCBjb25maWd1cmF0aW9uIHNpZGViYXIgc2hhZG93IGlzIHJlbW92ZWQgYW5kIGhlYWRlciBjYW5ub3QgYmUgbWFrZSBgZml4ZWRgLlxuICpcbiAqIEBhZGRpdGlvbmFsLWV4YW1wbGUoUmlnaHQgU2lkZWJhciwgc2lkZWJhci9zaWRlYmFyLXJpZ2h0LmNvbXBvbmVudClcbiAqIEBhZGRpdGlvbmFsLWV4YW1wbGUoRml4ZWQgU2lkZWJhciwgc2lkZWJhci9zaWRlYmFyLWZpeGVkLmNvbXBvbmVudClcbiAqXG4gKiBAc3R5bGVzXG4gKlxuICogc2lkZWJhci1iYWNrZ3JvdW5kLWNvbG9yOlxuICogc2lkZWJhci10ZXh0LWNvbG9yOlxuICogc2lkZWJhci10ZXh0LWZvbnQtZmFtaWx5OlxuICogc2lkZWJhci10ZXh0LWZvbnQtc2l6ZTpcbiAqIHNpZGViYXItdGV4dC1mb250LXdlaWdodDpcbiAqIHNpZGViYXItdGV4dC1saW5lLWhlaWdodDpcbiAqIHNpZGViYXItaGVpZ2h0OlxuICogc2lkZWJhci13aWR0aDpcbiAqIHNpZGViYXItd2lkdGgtY29tcGFjdDpcbiAqIHNpZGViYXItcGFkZGluZzpcbiAqIHNpZGViYXItaGVhZGVyLWhlaWdodDpcbiAqIHNpZGViYXItZm9vdGVyLWhlaWdodDpcbiAqIHNpZGViYXItc2hhZG93OlxuICogc2lkZWJhci1tZW51LWl0ZW0taGlnaGxpZ2h0LWNvbG9yOlxuICogc2lkZWJhci1zY3JvbGxiYXItYmFja2dyb3VuZC1jb2xvcjpcbiAqIHNpZGViYXItc2Nyb2xsYmFyLWNvbG9yOlxuICogc2lkZWJhci1zY3JvbGxiYXItd2lkdGg6XG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25iLXNpZGViYXInLFxuICBzdHlsZVVybHM6IFsnLi9zaWRlYmFyLmNvbXBvbmVudC5zY3NzJ10sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cIm1haW4tY29udGFpbmVyXCIgW2NsYXNzLm1haW4tY29udGFpbmVyLWZpeGVkXT1cImNvbnRhaW5lckZpeGVkVmFsdWVcIj5cbiAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIm5iLXNpZGViYXItaGVhZGVyXCI+PC9uZy1jb250ZW50PlxuICAgICAgPGRpdiBjbGFzcz1cInNjcm9sbGFibGVcIiAoY2xpY2spPVwib25DbGljaygkZXZlbnQpXCI+XG4gICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgIDwvZGl2PlxuICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwibmItc2lkZWJhci1mb290ZXJcIj48L25nLWNvbnRlbnQ+XG4gICAgPC9kaXY+XG4gIGAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBOYlNpZGViYXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIHByb3RlY3RlZCByZWFkb25seSByZXNwb25zaXZlVmFsdWVDaGFuZ2UkOiBTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IFN1YmplY3Q8Ym9vbGVhbj4oKTtcbiAgcHJvdGVjdGVkIHJlc3BvbnNpdmVTdGF0ZTogTmJTaWRlYmFyUmVzcG9uc2l2ZVN0YXRlID0gJ3BjJztcblxuICBwcm90ZWN0ZWQgZGVzdHJveSQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gIGNvbnRhaW5lckZpeGVkVmFsdWU6IGJvb2xlYW4gPSB0cnVlO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MuZml4ZWQnKSBmaXhlZFZhbHVlOiBib29sZWFuID0gZmFsc2U7XG4gIEBIb3N0QmluZGluZygnY2xhc3MucmlnaHQnKSByaWdodFZhbHVlOiBib29sZWFuID0gZmFsc2U7XG4gIEBIb3N0QmluZGluZygnY2xhc3MubGVmdCcpIGxlZnRWYWx1ZTogYm9vbGVhbiA9IHRydWU7XG4gIEBIb3N0QmluZGluZygnY2xhc3Muc3RhcnQnKSBzdGFydFZhbHVlOiBib29sZWFuID0gZmFsc2U7XG4gIEBIb3N0QmluZGluZygnY2xhc3MuZW5kJykgZW5kVmFsdWU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmV4cGFuZGVkJylcbiAgZ2V0IGV4cGFuZGVkKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXRlID09PSAnZXhwYW5kZWQnO1xuICB9XG4gIEBIb3N0QmluZGluZygnY2xhc3MuY29sbGFwc2VkJylcbiAgZ2V0IGNvbGxhcHNlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0ZSA9PT0gJ2NvbGxhcHNlZCc7XG4gIH1cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5jb21wYWN0ZWQnKVxuICBnZXQgY29tcGFjdGVkKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXRlID09PSAnY29tcGFjdGVkJztcbiAgfVxuXG4gIC8qKlxuICAgKiBQbGFjZXMgc2lkZWJhciBvbiB0aGUgcmlnaHQgc2lkZVxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICovXG4gIEBJbnB1dCgpXG4gIHNldCByaWdodCh2YWw6IGJvb2xlYW4pIHtcbiAgICB0aGlzLnJpZ2h0VmFsdWUgPSBjb252ZXJ0VG9Cb29sUHJvcGVydHkodmFsKTtcbiAgICB0aGlzLmxlZnRWYWx1ZSA9ICF0aGlzLnJpZ2h0VmFsdWU7XG4gICAgdGhpcy5zdGFydFZhbHVlID0gZmFsc2U7XG4gICAgdGhpcy5lbmRWYWx1ZSA9IGZhbHNlO1xuICB9XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9yaWdodDogTmJCb29sZWFuSW5wdXQ7XG5cbiAgLyoqXG4gICAqIFBsYWNlcyBzaWRlYmFyIG9uIHRoZSBsZWZ0IHNpZGVcbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqL1xuICBASW5wdXQoKVxuICBzZXQgbGVmdCh2YWw6IGJvb2xlYW4pIHtcbiAgICB0aGlzLmxlZnRWYWx1ZSA9IGNvbnZlcnRUb0Jvb2xQcm9wZXJ0eSh2YWwpO1xuICAgIHRoaXMucmlnaHRWYWx1ZSA9ICF0aGlzLmxlZnRWYWx1ZTtcbiAgICB0aGlzLnN0YXJ0VmFsdWUgPSBmYWxzZTtcbiAgICB0aGlzLmVuZFZhbHVlID0gZmFsc2U7XG4gIH1cbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2xlZnQ6IE5iQm9vbGVhbklucHV0O1xuXG4gIC8qKlxuICAgKiBQbGFjZXMgc2lkZWJhciBvbiB0aGUgc3RhcnQgZWRnZSBvZiBsYXlvdXRcbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqL1xuICBASW5wdXQoKVxuICBzZXQgc3RhcnQodmFsOiBib29sZWFuKSB7XG4gICAgdGhpcy5zdGFydFZhbHVlID0gY29udmVydFRvQm9vbFByb3BlcnR5KHZhbCk7XG4gICAgdGhpcy5lbmRWYWx1ZSA9ICF0aGlzLnN0YXJ0VmFsdWU7XG4gICAgdGhpcy5sZWZ0VmFsdWUgPSBmYWxzZTtcbiAgICB0aGlzLnJpZ2h0VmFsdWUgPSBmYWxzZTtcbiAgfVxuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfc3RhcnQ6IE5iQm9vbGVhbklucHV0O1xuXG4gIC8qKlxuICAgKiBQbGFjZXMgc2lkZWJhciBvbiB0aGUgZW5kIGVkZ2Ugb2YgbGF5b3V0XG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKi9cbiAgQElucHV0KClcbiAgc2V0IGVuZCh2YWw6IGJvb2xlYW4pIHtcbiAgICB0aGlzLmVuZFZhbHVlID0gY29udmVydFRvQm9vbFByb3BlcnR5KHZhbCk7XG4gICAgdGhpcy5zdGFydFZhbHVlID0gIXRoaXMuZW5kVmFsdWU7XG4gICAgdGhpcy5sZWZ0VmFsdWUgPSBmYWxzZTtcbiAgICB0aGlzLnJpZ2h0VmFsdWUgPSBmYWxzZTtcbiAgfVxuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfZW5kOiBOYkJvb2xlYW5JbnB1dDtcblxuICAvKipcbiAgICogTWFrZXMgc2lkZWJhciBmaXhlZCAoc2hvd24gYWJvdmUgdGhlIGxheW91dCBjb250ZW50KVxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICovXG4gIEBJbnB1dCgpXG4gIHNldCBmaXhlZCh2YWw6IGJvb2xlYW4pIHtcbiAgICB0aGlzLmZpeGVkVmFsdWUgPSBjb252ZXJ0VG9Cb29sUHJvcGVydHkodmFsKTtcbiAgfVxuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfZml4ZWQ6IE5iQm9vbGVhbklucHV0O1xuXG4gIC8qKlxuICAgKiBNYWtlcyBzaWRlYmFyIGNvbnRhaW5lciBmaXhlZFxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICovXG4gIEBJbnB1dCgpXG4gIHNldCBjb250YWluZXJGaXhlZCh2YWw6IGJvb2xlYW4pIHtcbiAgICB0aGlzLmNvbnRhaW5lckZpeGVkVmFsdWUgPSBjb252ZXJ0VG9Cb29sUHJvcGVydHkodmFsKTtcbiAgfVxuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfY29udGFpbmVyRml4ZWQ6IE5iQm9vbGVhbklucHV0O1xuXG4gIC8qKlxuICAgKiBJbml0aWFsIHNpZGViYXIgc3RhdGUsIGBleHBhbmRlZGB8YGNvbGxhcHNlZGB8YGNvbXBhY3RlZGBcbiAgICogQHR5cGUge3N0cmluZ31cbiAgICovXG4gIEBJbnB1dCgpXG4gIGdldCBzdGF0ZSgpOiBOYlNpZGViYXJTdGF0ZSB7XG4gICAgcmV0dXJuIHRoaXMuX3N0YXRlO1xuICB9XG4gIHNldCBzdGF0ZSh2YWx1ZTogTmJTaWRlYmFyU3RhdGUpIHtcbiAgICB0aGlzLl9zdGF0ZSA9IHZhbHVlO1xuICB9XG4gIHByb3RlY3RlZCBfc3RhdGU6IE5iU2lkZWJhclN0YXRlID0gJ2V4cGFuZGVkJztcblxuICAvKipcbiAgICogTWFrZXMgc2lkZWJhciBsaXN0ZW4gdG8gbWVkaWEgcXVlcnkgZXZlbnRzIGFuZCBjaGFuZ2UgaXRzIGJlaGF2aW91clxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICovXG4gIEBJbnB1dCgpXG4gIGdldCByZXNwb25zaXZlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9yZXNwb25zaXZlO1xuICB9XG4gIHNldCByZXNwb25zaXZlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgaWYgKHRoaXMucmVzcG9uc2l2ZSAhPT0gY29udmVydFRvQm9vbFByb3BlcnR5KHZhbHVlKSkge1xuICAgICAgdGhpcy5fcmVzcG9uc2l2ZSA9ICF0aGlzLnJlc3BvbnNpdmU7XG4gICAgICB0aGlzLnJlc3BvbnNpdmVWYWx1ZUNoYW5nZSQubmV4dCh0aGlzLnJlc3BvbnNpdmUpO1xuICAgIH1cbiAgfVxuICBwcm90ZWN0ZWQgX3Jlc3BvbnNpdmU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX3Jlc3BvbnNpdmU6IE5iQm9vbGVhbklucHV0O1xuXG4gIC8qKlxuICAgKiBUYWdzIGEgc2lkZWJhciB3aXRoIHNvbWUgSUQsIGNhbiBiZSBsYXRlciB1c2VkIGluIHRoZSBzaWRlYmFyIHNlcnZpY2VcbiAgICogdG8gZGV0ZXJtaW5lIHdoaWNoIHNpZGViYXIgdHJpZ2dlcmVkIHRoZSBhY3Rpb24sIGlmIG11bHRpcGxlIHNpZGViYXJzIGV4aXN0IG9uIHRoZSBwYWdlLlxuICAgKlxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKi9cbiAgQElucHV0KCkgdGFnOiBzdHJpbmc7XG5cbiAgLy8gVE9ETzogZ2V0IHdpZHRoIGJ5IHRoZSBrZXkgYW5kIGRlZmluZSBvbmx5IG1heCB3aWR0aCBmb3IgdGhlIHRhYmxldHMgYW5kIG1vYmlsZXNcbiAgLyoqXG4gICAqIENvbnRyb2xzIG9uIHdoaWNoIHNjcmVlbiBzaXplcyBzaWRlYmFyIHNob3VsZCBiZSBzd2l0Y2hlZCB0byBjb21wYWN0ZWQgc3RhdGUuXG4gICAqIFdvcmtzIG9ubHkgd2hlbiByZXNwb25zaXZlIG1vZGUgaXMgb24uXG4gICAqIERlZmF1bHQgdmFsdWVzIGFyZSBgWyd4cycsICdpcycsICdzbScsICdtZCcsICdsZyddYC5cbiAgICpcbiAgICogQHR5cGUgc3RyaW5nW11cbiAgICovXG4gIEBJbnB1dCgpIGNvbXBhY3RlZEJyZWFrcG9pbnRzOiBzdHJpbmdbXSA9IFsneHMnLCAnaXMnLCAnc20nLCAnbWQnLCAnbGcnXTtcblxuICAvKipcbiAgICogQ29udHJvbHMgb24gd2hpY2ggc2NyZWVuIHNpemVzIHNpZGViYXIgc2hvdWxkIGJlIHN3aXRjaGVkIHRvIGNvbGxhcHNlZCBzdGF0ZS5cbiAgICogV29ya3Mgb25seSB3aGVuIHJlc3BvbnNpdmUgbW9kZSBpcyBvbi5cbiAgICogRGVmYXVsdCB2YWx1ZXMgYXJlIGBbJ3hzJywgJ2lzJ11gLlxuICAgKlxuICAgKiBAdHlwZSBzdHJpbmdbXVxuICAgKi9cbiAgQElucHV0KCkgY29sbGFwc2VkQnJlYWtwb2ludHM6IHN0cmluZ1tdID0gWyd4cycsICdpcyddO1xuXG4gIC8qKlxuICAgKiBFbWl0cyB3aGVuZXZlciBzaWRlYmFyIHN0YXRlIGNoYW5nZS5cbiAgICovXG4gIEBPdXRwdXQoKSByZWFkb25seSBzdGF0ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8TmJTaWRlYmFyU3RhdGU+KCk7XG5cbiAgLyoqXG4gICAqIEVtaXRzIHdoZW5ldmVyIHNpZGViYXIgcmVzcG9uc2l2ZSBzdGF0ZSBjaGFuZ2UuXG4gICAqL1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgcmVzcG9uc2l2ZVN0YXRlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxOYlNpZGViYXJSZXNwb25zaXZlU3RhdGU+KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBzaWRlYmFyU2VydmljZTogTmJTaWRlYmFyU2VydmljZSxcbiAgICBwcml2YXRlIHRoZW1lU2VydmljZTogTmJUaGVtZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmLFxuICApIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5zaWRlYmFyU2VydmljZVxuICAgICAgLm9uVG9nZ2xlKClcbiAgICAgIC5waXBlKFxuICAgICAgICBmaWx0ZXIoKHsgdGFnIH0pID0+ICF0aGlzLnRhZyB8fCB0aGlzLnRhZyA9PT0gdGFnKSxcbiAgICAgICAgdGFrZVVudGlsKHRoaXMuZGVzdHJveSQpLFxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSgoeyBjb21wYWN0IH0pID0+IHRoaXMudG9nZ2xlKGNvbXBhY3QpKTtcblxuICAgIHRoaXMuc2lkZWJhclNlcnZpY2VcbiAgICAgIC5vbkV4cGFuZCgpXG4gICAgICAucGlwZShcbiAgICAgICAgZmlsdGVyKCh7IHRhZyB9KSA9PiAhdGhpcy50YWcgfHwgdGhpcy50YWcgPT09IHRhZyksXG4gICAgICAgIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSxcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5leHBhbmQoKSk7XG5cbiAgICB0aGlzLnNpZGViYXJTZXJ2aWNlXG4gICAgICAub25Db2xsYXBzZSgpXG4gICAgICAucGlwZShcbiAgICAgICAgZmlsdGVyKCh7IHRhZyB9KSA9PiAhdGhpcy50YWcgfHwgdGhpcy50YWcgPT09IHRhZyksXG4gICAgICAgIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSxcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5jb2xsYXBzZSgpKTtcblxuICAgIHRoaXMuc2lkZWJhclNlcnZpY2VcbiAgICAgIC5vbkNvbXBhY3QoKVxuICAgICAgLnBpcGUoXG4gICAgICAgIGZpbHRlcigoeyB0YWcgfSkgPT4gIXRoaXMudGFnIHx8IHRoaXMudGFnID09PSB0YWcpLFxuICAgICAgICB0YWtlVW50aWwodGhpcy5kZXN0cm95JCksXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuY29tcGFjdCgpKTtcblxuICAgIGdldFNpZGViYXJTdGF0ZSRcbiAgICAgIC5waXBlKFxuICAgICAgICBmaWx0ZXIoKHsgdGFnIH0pID0+ICF0aGlzLnRhZyB8fCB0aGlzLnRhZyA9PT0gdGFnKSxcbiAgICAgICAgdGFrZVVudGlsKHRoaXMuZGVzdHJveSQpLFxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSgoeyBvYnNlcnZlciB9KSA9PiBvYnNlcnZlci5uZXh0KHRoaXMuc3RhdGUpKTtcblxuICAgIGdldFNpZGViYXJSZXNwb25zaXZlU3RhdGUkXG4gICAgICAucGlwZShcbiAgICAgICAgZmlsdGVyKCh7IHRhZyB9KSA9PiAhdGhpcy50YWcgfHwgdGhpcy50YWcgPT09IHRhZyksXG4gICAgICAgIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSxcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoKHsgb2JzZXJ2ZXIgfSkgPT4gb2JzZXJ2ZXIubmV4dCh0aGlzLnJlc3BvbnNpdmVTdGF0ZSkpO1xuXG4gICAgdGhpcy5yZXNwb25zaXZlVmFsdWVDaGFuZ2UkXG4gICAgICAucGlwZShcbiAgICAgICAgZmlsdGVyKChyZXNwb25zaXZlOiBib29sZWFuKSA9PiAhcmVzcG9uc2l2ZSksXG4gICAgICAgIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSxcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5leHBhbmQoKSk7XG5cbiAgICB0aGlzLnN1YnNjcmliZVRvTWVkaWFRdWVyeUNoYW5nZSgpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5kZXN0cm95JC5uZXh0KCk7XG4gICAgdGhpcy5kZXN0cm95JC5jb21wbGV0ZSgpO1xuICB9XG5cbiAgLy8gVE9ETzogdGhpcyBpcyBtb3JlIG9mIGEgd29ya2Fyb3VuZCwgc2hvdWxkIGJlIGEgYmV0dGVyIHdheSB0byBtYWtlIGNvbXBvbmVudHMgY29tbXVuaWNhdGUgdG8gZWFjaCBvdGhlclxuICBvbkNsaWNrKGV2ZW50KTogdm9pZCB7XG4gICAgY29uc3QgbWVudSA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ25iLW1lbnUnKTtcblxuICAgIGlmIChtZW51ICYmIG1lbnUuY29udGFpbnMoZXZlbnQudGFyZ2V0KSkge1xuICAgICAgY29uc3QgbGluayA9IHRoaXMuZ2V0TWVudUxpbmsoZXZlbnQudGFyZ2V0KTtcblxuICAgICAgaWYgKGxpbmsgJiYgbGluay5uZXh0RWxlbWVudFNpYmxpbmcgJiYgbGluay5uZXh0RWxlbWVudFNpYmxpbmcuY2xhc3NMaXN0LmNvbnRhaW5zKCdtZW51LWl0ZW1zJykpIHtcbiAgICAgICAgdGhpcy5zaWRlYmFyU2VydmljZS5leHBhbmQodGhpcy50YWcpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDb2xsYXBzZXMgdGhlIHNpZGViYXJcbiAgICovXG4gIGNvbGxhcHNlKCkge1xuICAgIHRoaXMudXBkYXRlU3RhdGUoJ2NvbGxhcHNlZCcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEV4cGFuZHMgdGhlIHNpZGViYXJcbiAgICovXG4gIGV4cGFuZCgpIHtcbiAgICB0aGlzLnVwZGF0ZVN0YXRlKCdleHBhbmRlZCcpO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbXBhY3RzIHRoZSBzaWRlYmFyIChtaW5pbWl6ZXMpXG4gICAqL1xuICBjb21wYWN0KCkge1xuICAgIHRoaXMudXBkYXRlU3RhdGUoJ2NvbXBhY3RlZCcpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRvZ2dsZXMgc2lkZWJhciBzdGF0ZSAoZXhwYW5kZWR8Y29sbGFwc2VkfGNvbXBhY3RlZClcbiAgICogQHBhcmFtIHtib29sZWFufSBjb21wYWN0IElmIHRydWUsIHRoZW4gc2lkZWJhciBzdGF0ZSB3aWxsIGJlIGNoYW5nZWQgYmV0d2VlbiBleHBhbmRlZCAmIGNvbXBhY3RlZCxcbiAgICogb3RoZXJ3aXNlIC0gYmV0d2VlbiBleHBhbmRlZCAmIGNvbGxhcHNlZC4gRmFsc2UgYnkgZGVmYXVsdC5cbiAgICpcbiAgICogVG9nZ2xlIHNpZGViYXIgc3RhdGVcbiAgICpcbiAgICogYGBgdHNcbiAgICogdGhpcy5zaWRlYmFyLnRvZ2dsZSh0cnVlKTtcbiAgICogYGBgXG4gICAqL1xuICB0b2dnbGUoY29tcGFjdDogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgaWYgKHRoaXMucmVzcG9uc2l2ZSkge1xuICAgICAgaWYgKHRoaXMucmVzcG9uc2l2ZVN0YXRlID09PSAnbW9iaWxlJykge1xuICAgICAgICBjb21wYWN0ID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuc3RhdGUgPT09ICdjb21wYWN0ZWQnIHx8IHRoaXMuc3RhdGUgPT09ICdjb2xsYXBzZWQnKSB7XG4gICAgICB0aGlzLnVwZGF0ZVN0YXRlKCdleHBhbmRlZCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnVwZGF0ZVN0YXRlKGNvbXBhY3QgPyAnY29tcGFjdGVkJyA6ICdjb2xsYXBzZWQnKTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgc3Vic2NyaWJlVG9NZWRpYVF1ZXJ5Q2hhbmdlKCkge1xuICAgIGNvbWJpbmVMYXRlc3QoW1xuICAgICAgdGhpcy5yZXNwb25zaXZlVmFsdWVDaGFuZ2UkLnBpcGUoc3RhcnRXaXRoKHRoaXMucmVzcG9uc2l2ZSkpLFxuICAgICAgdGhpcy50aGVtZVNlcnZpY2Uub25NZWRpYVF1ZXJ5Q2hhbmdlKCkgYXMgT2JzZXJ2YWJsZTxbTmJNZWRpYUJyZWFrcG9pbnQsIE5iTWVkaWFCcmVha3BvaW50XT4sXG4gICAgXSlcbiAgICAgIC5waXBlKFxuICAgICAgICBmaWx0ZXIoKFtyZXNwb25zaXZlXSkgPT4gcmVzcG9uc2l2ZSksXG4gICAgICAgIG1hcCgoWywgYnJlYWtwb2ludHNdKSA9PiBicmVha3BvaW50cyksXG4gICAgICAgIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSxcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoKFtwcmV2LCBjdXJyZW50XTogW05iTWVkaWFCcmVha3BvaW50LCBOYk1lZGlhQnJlYWtwb2ludF0pID0+IHtcbiAgICAgICAgY29uc3QgaXNDb2xsYXBzZWQgPSB0aGlzLmNvbGxhcHNlZEJyZWFrcG9pbnRzLmluY2x1ZGVzKGN1cnJlbnQubmFtZSk7XG4gICAgICAgIGNvbnN0IGlzQ29tcGFjdGVkID0gdGhpcy5jb21wYWN0ZWRCcmVha3BvaW50cy5pbmNsdWRlcyhjdXJyZW50Lm5hbWUpO1xuXG4gICAgICAgIGxldCBuZXdSZXNwb25zaXZlU3RhdGU7XG5cbiAgICAgICAgaWYgKGlzQ29tcGFjdGVkKSB7XG4gICAgICAgICAgdGhpcy5maXhlZCA9IHRoaXMuY29udGFpbmVyRml4ZWRWYWx1ZTtcbiAgICAgICAgICB0aGlzLmNvbXBhY3QoKTtcbiAgICAgICAgICBuZXdSZXNwb25zaXZlU3RhdGUgPSAndGFibGV0JztcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNDb2xsYXBzZWQpIHtcbiAgICAgICAgICB0aGlzLmZpeGVkID0gdHJ1ZTtcbiAgICAgICAgICB0aGlzLmNvbGxhcHNlKCk7XG4gICAgICAgICAgbmV3UmVzcG9uc2l2ZVN0YXRlID0gJ21vYmlsZSc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFpc0NvbGxhcHNlZCAmJiAhaXNDb21wYWN0ZWQgJiYgKCFwcmV2LndpZHRoIHx8IHByZXYud2lkdGggPCBjdXJyZW50LndpZHRoKSkge1xuICAgICAgICAgIHRoaXMuZXhwYW5kKCk7XG4gICAgICAgICAgdGhpcy5maXhlZCA9IGZhbHNlO1xuICAgICAgICAgIG5ld1Jlc3BvbnNpdmVTdGF0ZSA9ICdwYyc7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobmV3UmVzcG9uc2l2ZVN0YXRlICYmIG5ld1Jlc3BvbnNpdmVTdGF0ZSAhPT0gdGhpcy5yZXNwb25zaXZlU3RhdGUpIHtcbiAgICAgICAgICB0aGlzLnJlc3BvbnNpdmVTdGF0ZSA9IG5ld1Jlc3BvbnNpdmVTdGF0ZTtcbiAgICAgICAgICB0aGlzLnJlc3BvbnNpdmVTdGF0ZUNoYW5nZS5lbWl0KHRoaXMucmVzcG9uc2l2ZVN0YXRlKTtcbiAgICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRNZW51TGluayhlbGVtZW50OiBIVE1MRWxlbWVudCk6IEhUTUxFbGVtZW50IHwgdW5kZWZpbmVkIHtcbiAgICBpZiAoIWVsZW1lbnQgfHwgZWxlbWVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICduYi1tZW51Jykge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBpZiAoZWxlbWVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdhJykge1xuICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuZ2V0TWVudUxpbmsoZWxlbWVudC5wYXJlbnRFbGVtZW50KTtcbiAgfVxuXG4gIHByb3RlY3RlZCB1cGRhdGVTdGF0ZShzdGF0ZTogTmJTaWRlYmFyU3RhdGUpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5zdGF0ZSAhPT0gc3RhdGUpIHtcbiAgICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcbiAgICAgIHRoaXMuc3RhdGVDaGFuZ2UuZW1pdCh0aGlzLnN0YXRlKTtcbiAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuICB9XG59XG4iXX0=