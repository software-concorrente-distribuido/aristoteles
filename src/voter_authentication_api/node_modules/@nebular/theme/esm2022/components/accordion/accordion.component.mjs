/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { convertToBoolProperty } from '../helpers';
import * as i0 from "@angular/core";
/**
 * An accordion allows to toggle the display of sections of content
 *
 * Basic example
 * @stacked-example(Showcase, accordion/accordion-showcase.component)
 *
 * ```ts
 * <nb-accordion>
 *  <nb-accordion-item>
 *   <nb-accordion-item-header>Product Details</nb-accordion-item-header>
 *   <nb-accordion-item-body>
 *     Item Content
 *   </nb-accordion-item-body>
 *  </nb-accordion-item>
 * </nb-accordion>
 * ```
 * ### Installation
 *
 * Import `NbAccordionModule` to your feature module.
 * ```ts
 * @NgModule({
 *   imports: [
 *     // ...
 *     NbAccordionModule,
 *   ],
 * })
 * export class PageModule { }
 * ```
 * ### Usage
 *
 * With `multi` mode accordion can have multiple items expanded:
 * @stacked-example(Multiple expanded items, accordion/accordion-multi.component)
 *
 * `NbAccordionItemComponent` has several methods, for example it is possible to trigger item click/toggle:
 * @stacked-example(Expand API, accordion/accordion-toggle.component)
 *
 * @styles
 *
 * accordion-border-radius:
 * accordion-padding:
 * accordion-shadow:
 * accordion-header-text-color:
 * accordion-header-text-font-family:
 * accordion-header-text-font-size:
 * accordion-header-text-font-weight:
 * accordion-header-text-line-height:
 * accordion-header-disabled-text-color:
 * accordion-header-border-color:
 * accordion-header-border-style:
 * accordion-header-border-width:
 * accordion-item-background-color:
 * accordion-item-text-color:
 * accordion-item-text-font-family:
 * accordion-item-text-font-size:
 * accordion-item-text-font-weight:
 * accordion-item-text-line-height:
 */
export class NbAccordionComponent {
    constructor() {
        this.openCloseItems = new Subject();
        this.multiValue = false;
    }
    /**
     *  Allow multiple items to be expanded at the same time.
     * @type {boolean}
     */
    get multi() {
        return this.multiValue;
    }
    set multi(val) {
        this.multiValue = convertToBoolProperty(val);
    }
    /**
     * Opens all enabled accordion items.
     */
    openAll() {
        if (this.multi) {
            this.openCloseItems.next(false);
        }
    }
    /**
     * Closes all enabled accordion items.
     */
    closeAll() {
        this.openCloseItems.next(true);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbAccordionComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.1.0", type: NbAccordionComponent, selector: "nb-accordion", inputs: { multi: "multi" }, ngImport: i0, template: `
    <ng-content select="nb-accordion-item"></ng-content>
  `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbAccordionComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nb-accordion',
                    template: `
    <ng-content select="nb-accordion-item"></ng-content>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], propDecorators: { multi: [{
                type: Input,
                args: ['multi']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3JkaW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9mcmFtZXdvcmsvdGhlbWUvY29tcG9uZW50cy9hY2NvcmRpb24vYWNjb3JkaW9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFNBQVMsRUFBRSx1QkFBdUIsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQixPQUFPLEVBQUUscUJBQXFCLEVBQWtCLE1BQU0sWUFBWSxDQUFDOztBQUVuRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3REc7QUFRSCxNQUFNLE9BQU8sb0JBQW9CO0lBUGpDO1FBU0UsbUJBQWMsR0FBRyxJQUFJLE9BQU8sRUFBVyxDQUFDO1FBZWhDLGVBQVUsR0FBRyxLQUFLLENBQUM7S0FpQjVCO0lBOUJDOzs7T0FHRztJQUNILElBQ0ksS0FBSztRQUNQLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUN6QixDQUFDO0lBQ0QsSUFBSSxLQUFLLENBQUMsR0FBWTtRQUNwQixJQUFJLENBQUMsVUFBVSxHQUFHLHFCQUFxQixDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFLRDs7T0FFRztJQUNILE9BQU87UUFDTCxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNmLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2xDLENBQUM7SUFDSCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxRQUFRO1FBQ04sSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDakMsQ0FBQzs4R0FqQ1Usb0JBQW9CO2tHQUFwQixvQkFBb0IsZ0ZBTHJCOztHQUVUOzsyRkFHVSxvQkFBb0I7a0JBUGhDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGNBQWM7b0JBQ3hCLFFBQVEsRUFBRTs7R0FFVDtvQkFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtpQkFDaEQ7OEJBVUssS0FBSztzQkFEUixLQUFLO3VCQUFDLE9BQU8iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgQWt2ZW8uIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICovXG5cbmltcG9ydCB7IENvbXBvbmVudCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjb252ZXJ0VG9Cb29sUHJvcGVydHksIE5iQm9vbGVhbklucHV0IH0gZnJvbSAnLi4vaGVscGVycyc7XG5cbi8qKlxuICogQW4gYWNjb3JkaW9uIGFsbG93cyB0byB0b2dnbGUgdGhlIGRpc3BsYXkgb2Ygc2VjdGlvbnMgb2YgY29udGVudFxuICpcbiAqIEJhc2ljIGV4YW1wbGVcbiAqIEBzdGFja2VkLWV4YW1wbGUoU2hvd2Nhc2UsIGFjY29yZGlvbi9hY2NvcmRpb24tc2hvd2Nhc2UuY29tcG9uZW50KVxuICpcbiAqIGBgYHRzXG4gKiA8bmItYWNjb3JkaW9uPlxuICogIDxuYi1hY2NvcmRpb24taXRlbT5cbiAqICAgPG5iLWFjY29yZGlvbi1pdGVtLWhlYWRlcj5Qcm9kdWN0IERldGFpbHM8L25iLWFjY29yZGlvbi1pdGVtLWhlYWRlcj5cbiAqICAgPG5iLWFjY29yZGlvbi1pdGVtLWJvZHk+XG4gKiAgICAgSXRlbSBDb250ZW50XG4gKiAgIDwvbmItYWNjb3JkaW9uLWl0ZW0tYm9keT5cbiAqICA8L25iLWFjY29yZGlvbi1pdGVtPlxuICogPC9uYi1hY2NvcmRpb24+XG4gKiBgYGBcbiAqICMjIyBJbnN0YWxsYXRpb25cbiAqXG4gKiBJbXBvcnQgYE5iQWNjb3JkaW9uTW9kdWxlYCB0byB5b3VyIGZlYXR1cmUgbW9kdWxlLlxuICogYGBgdHNcbiAqIEBOZ01vZHVsZSh7XG4gKiAgIGltcG9ydHM6IFtcbiAqICAgICAvLyAuLi5cbiAqICAgICBOYkFjY29yZGlvbk1vZHVsZSxcbiAqICAgXSxcbiAqIH0pXG4gKiBleHBvcnQgY2xhc3MgUGFnZU1vZHVsZSB7IH1cbiAqIGBgYFxuICogIyMjIFVzYWdlXG4gKlxuICogV2l0aCBgbXVsdGlgIG1vZGUgYWNjb3JkaW9uIGNhbiBoYXZlIG11bHRpcGxlIGl0ZW1zIGV4cGFuZGVkOlxuICogQHN0YWNrZWQtZXhhbXBsZShNdWx0aXBsZSBleHBhbmRlZCBpdGVtcywgYWNjb3JkaW9uL2FjY29yZGlvbi1tdWx0aS5jb21wb25lbnQpXG4gKlxuICogYE5iQWNjb3JkaW9uSXRlbUNvbXBvbmVudGAgaGFzIHNldmVyYWwgbWV0aG9kcywgZm9yIGV4YW1wbGUgaXQgaXMgcG9zc2libGUgdG8gdHJpZ2dlciBpdGVtIGNsaWNrL3RvZ2dsZTpcbiAqIEBzdGFja2VkLWV4YW1wbGUoRXhwYW5kIEFQSSwgYWNjb3JkaW9uL2FjY29yZGlvbi10b2dnbGUuY29tcG9uZW50KVxuICpcbiAqIEBzdHlsZXNcbiAqXG4gKiBhY2NvcmRpb24tYm9yZGVyLXJhZGl1czpcbiAqIGFjY29yZGlvbi1wYWRkaW5nOlxuICogYWNjb3JkaW9uLXNoYWRvdzpcbiAqIGFjY29yZGlvbi1oZWFkZXItdGV4dC1jb2xvcjpcbiAqIGFjY29yZGlvbi1oZWFkZXItdGV4dC1mb250LWZhbWlseTpcbiAqIGFjY29yZGlvbi1oZWFkZXItdGV4dC1mb250LXNpemU6XG4gKiBhY2NvcmRpb24taGVhZGVyLXRleHQtZm9udC13ZWlnaHQ6XG4gKiBhY2NvcmRpb24taGVhZGVyLXRleHQtbGluZS1oZWlnaHQ6XG4gKiBhY2NvcmRpb24taGVhZGVyLWRpc2FibGVkLXRleHQtY29sb3I6XG4gKiBhY2NvcmRpb24taGVhZGVyLWJvcmRlci1jb2xvcjpcbiAqIGFjY29yZGlvbi1oZWFkZXItYm9yZGVyLXN0eWxlOlxuICogYWNjb3JkaW9uLWhlYWRlci1ib3JkZXItd2lkdGg6XG4gKiBhY2NvcmRpb24taXRlbS1iYWNrZ3JvdW5kLWNvbG9yOlxuICogYWNjb3JkaW9uLWl0ZW0tdGV4dC1jb2xvcjpcbiAqIGFjY29yZGlvbi1pdGVtLXRleHQtZm9udC1mYW1pbHk6XG4gKiBhY2NvcmRpb24taXRlbS10ZXh0LWZvbnQtc2l6ZTpcbiAqIGFjY29yZGlvbi1pdGVtLXRleHQtZm9udC13ZWlnaHQ6XG4gKiBhY2NvcmRpb24taXRlbS10ZXh0LWxpbmUtaGVpZ2h0OlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduYi1hY2NvcmRpb24nLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIm5iLWFjY29yZGlvbi1pdGVtXCI+PC9uZy1jb250ZW50PlxuICBgLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgTmJBY2NvcmRpb25Db21wb25lbnQge1xuXG4gIG9wZW5DbG9zZUl0ZW1zID0gbmV3IFN1YmplY3Q8Ym9vbGVhbj4oKTtcblxuICAvKipcbiAgICogIEFsbG93IG11bHRpcGxlIGl0ZW1zIHRvIGJlIGV4cGFuZGVkIGF0IHRoZSBzYW1lIHRpbWUuXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKi9cbiAgQElucHV0KCdtdWx0aScpXG4gIGdldCBtdWx0aSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5tdWx0aVZhbHVlO1xuICB9XG4gIHNldCBtdWx0aSh2YWw6IGJvb2xlYW4pIHtcbiAgICB0aGlzLm11bHRpVmFsdWUgPSBjb252ZXJ0VG9Cb29sUHJvcGVydHkodmFsKTtcbiAgfVxuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbXVsdGk6IE5iQm9vbGVhbklucHV0O1xuXG4gIHByaXZhdGUgbXVsdGlWYWx1ZSA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBPcGVucyBhbGwgZW5hYmxlZCBhY2NvcmRpb24gaXRlbXMuXG4gICAqL1xuICBvcGVuQWxsKCkge1xuICAgIGlmICh0aGlzLm11bHRpKSB7XG4gICAgICB0aGlzLm9wZW5DbG9zZUl0ZW1zLm5leHQoZmFsc2UpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDbG9zZXMgYWxsIGVuYWJsZWQgYWNjb3JkaW9uIGl0ZW1zLlxuICAgKi9cbiAgY2xvc2VBbGwoKSB7XG4gICAgdGhpcy5vcGVuQ2xvc2VJdGVtcy5uZXh0KHRydWUpO1xuICB9XG59XG4iXX0=