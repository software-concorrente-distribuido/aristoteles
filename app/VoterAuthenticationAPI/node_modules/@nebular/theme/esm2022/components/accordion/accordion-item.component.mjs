/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, HostBinding, Host, } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { convertToBoolProperty } from '../helpers';
import * as i0 from "@angular/core";
import * as i1 from "./accordion.component";
/**
 * Component intended to be used within `<nb-accordion>` component
 */
export class NbAccordionItemComponent {
    /**
     * Item is collapse (`true` by default)
     * @type {boolean}
     */
    get collapsed() {
        return this.collapsedValue;
    }
    set collapsed(val) {
        this.collapsedValue = convertToBoolProperty(val);
        this.collapsedChange.emit(this.collapsedValue);
        this.invalidate();
    }
    /**
     * Item is expanded (`false` by default)
     * @type {boolean}
     */
    get expanded() {
        return !this.collapsed;
    }
    set expanded(val) {
        this.collapsedValue = !convertToBoolProperty(val);
    }
    /**
     * Item is disabled and cannot be opened.
     * @type {boolean}
     */
    get disabled() {
        return this.disabledValue;
    }
    set disabled(val) {
        this.disabledValue = convertToBoolProperty(val);
        this.invalidate();
    }
    constructor(accordion, cd) {
        this.accordion = accordion;
        this.cd = cd;
        /**
         * Emits whenever the expanded state of the accordion changes.
         * Primarily used to facilitate two-way binding.
         */
        this.collapsedChange = new EventEmitter();
        this.accordionItemInvalidate = new Subject();
        this.collapsedValue = true;
        this.disabledValue = false;
        this.destroy$ = new Subject();
    }
    /**
     * Open/close the item
     */
    toggle() {
        if (!this.disabled) {
            // we need this temporary variable as `openCloseItems.next` will change current value we need to save
            const willSet = !this.collapsed;
            if (!this.accordion.multi) {
                this.accordion.openCloseItems.next(true);
            }
            this.collapsed = willSet;
        }
    }
    /**
     * Open the item.
     */
    open() {
        !this.disabled && (this.collapsed = false);
    }
    /**
     * Collapse the item.
     */
    close() {
        !this.disabled && (this.collapsed = true);
    }
    ngOnInit() {
        this.accordion.openCloseItems
            .pipe(takeUntil(this.destroy$))
            .subscribe(collapsed => {
            !this.disabled && (this.collapsed = collapsed);
        });
    }
    ngOnChanges(changes) {
        this.accordionItemInvalidate.next(true);
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
        this.accordionItemInvalidate.complete();
    }
    invalidate() {
        this.accordionItemInvalidate.next(true);
        this.cd.markForCheck();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbAccordionItemComponent, deps: [{ token: i1.NbAccordionComponent, host: true }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.1.0", type: NbAccordionItemComponent, selector: "nb-accordion-item", inputs: { collapsed: "collapsed", expanded: "expanded", disabled: "disabled" }, outputs: { collapsedChange: "collapsedChange" }, host: { properties: { "class.collapsed": "this.collapsed", "class.expanded": "this.expanded", "class.disabled": "this.disabled" } }, usesOnChanges: true, ngImport: i0, template: `
    <ng-content select="nb-accordion-item-header"></ng-content>
    <ng-content select="nb-accordion-item-body"></ng-content>
  `, isInline: true, styles: ["/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */:host{display:flex;flex-direction:column}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbAccordionItemComponent, decorators: [{
            type: Component,
            args: [{ selector: 'nb-accordion-item', template: `
    <ng-content select="nb-accordion-item-header"></ng-content>
    <ng-content select="nb-accordion-item-body"></ng-content>
  `, changeDetection: ChangeDetectionStrategy.OnPush, styles: ["/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */:host{display:flex;flex-direction:column}\n"] }]
        }], ctorParameters: () => [{ type: i1.NbAccordionComponent, decorators: [{
                    type: Host
                }] }, { type: i0.ChangeDetectorRef }], propDecorators: { collapsed: [{
                type: Input,
                args: ['collapsed']
            }, {
                type: HostBinding,
                args: ['class.collapsed']
            }], expanded: [{
                type: Input,
                args: ['expanded']
            }, {
                type: HostBinding,
                args: ['class.expanded']
            }], disabled: [{
                type: Input,
                args: ['disabled']
            }, {
                type: HostBinding,
                args: ['class.disabled']
            }], collapsedChange: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3JkaW9uLWl0ZW0uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2ZyYW1ld29yay90aGVtZS9jb21wb25lbnRzL2FjY29yZGlvbi9hY2NvcmRpb24taXRlbS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFDTCxTQUFTLEVBQ1QsdUJBQXVCLEVBRXZCLEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUVaLFdBQVcsRUFDWCxJQUFJLEdBSUwsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHM0MsT0FBTyxFQUFFLHFCQUFxQixFQUFrQixNQUFNLFlBQVksQ0FBQzs7O0FBRW5FOztHQUVHO0FBVUgsTUFBTSxPQUFPLHdCQUF3QjtJQUVuQzs7O09BR0c7SUFDSCxJQUVJLFNBQVM7UUFDWCxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUM7SUFDN0IsQ0FBQztJQUNELElBQUksU0FBUyxDQUFDLEdBQVk7UUFDeEIsSUFBSSxDQUFDLGNBQWMsR0FBRyxxQkFBcUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFHRDs7O09BR0c7SUFDSCxJQUVJLFFBQVE7UUFDVixPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN6QixDQUFDO0lBQ0QsSUFBSSxRQUFRLENBQUMsR0FBWTtRQUN2QixJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMscUJBQXFCLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUdEOzs7T0FHRztJQUNI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OztzQkFDaEIsV0FBVzt1QkFBQyxnQkFBZ0I7Z0JBY25CLGVBQWU7c0JBQXhCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgQWt2ZW8uIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICovXG5cbmltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIEhvc3RCaW5kaW5nLFxuICBIb3N0LFxuICBPbkluaXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgTmJBY2NvcmRpb25Db21wb25lbnQgfSBmcm9tICcuL2FjY29yZGlvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgY29udmVydFRvQm9vbFByb3BlcnR5LCBOYkJvb2xlYW5JbnB1dCB9IGZyb20gJy4uL2hlbHBlcnMnO1xuXG4vKipcbiAqIENvbXBvbmVudCBpbnRlbmRlZCB0byBiZSB1c2VkIHdpdGhpbiBgPG5iLWFjY29yZGlvbj5gIGNvbXBvbmVudFxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduYi1hY2NvcmRpb24taXRlbScsXG4gIHN0eWxlVXJsczogWycuL2FjY29yZGlvbi1pdGVtLmNvbXBvbmVudC5zY3NzJ10sXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwibmItYWNjb3JkaW9uLWl0ZW0taGVhZGVyXCI+PC9uZy1jb250ZW50PlxuICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIm5iLWFjY29yZGlvbi1pdGVtLWJvZHlcIj48L25nLWNvbnRlbnQ+XG4gIGAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBOYkFjY29yZGlvbkl0ZW1Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcblxuICAvKipcbiAgICogSXRlbSBpcyBjb2xsYXBzZSAoYHRydWVgIGJ5IGRlZmF1bHQpXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKi9cbiAgQElucHV0KCdjb2xsYXBzZWQnKVxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmNvbGxhcHNlZCcpXG4gIGdldCBjb2xsYXBzZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuY29sbGFwc2VkVmFsdWU7XG4gIH1cbiAgc2V0IGNvbGxhcHNlZCh2YWw6IGJvb2xlYW4pIHtcbiAgICB0aGlzLmNvbGxhcHNlZFZhbHVlID0gY29udmVydFRvQm9vbFByb3BlcnR5KHZhbCk7XG4gICAgdGhpcy5jb2xsYXBzZWRDaGFuZ2UuZW1pdCh0aGlzLmNvbGxhcHNlZFZhbHVlKTtcbiAgICB0aGlzLmludmFsaWRhdGUoKTtcbiAgfVxuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfY29sbGFwc2VkOiBOYkJvb2xlYW5JbnB1dDtcblxuICAvKipcbiAgICogSXRlbSBpcyBleHBhbmRlZCAoYGZhbHNlYCBieSBkZWZhdWx0KVxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICovXG4gIEBJbnB1dCgnZXhwYW5kZWQnKVxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmV4cGFuZGVkJylcbiAgZ2V0IGV4cGFuZGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhdGhpcy5jb2xsYXBzZWQ7XG4gIH1cbiAgc2V0IGV4cGFuZGVkKHZhbDogYm9vbGVhbikge1xuICAgIHRoaXMuY29sbGFwc2VkVmFsdWUgPSAhY29udmVydFRvQm9vbFByb3BlcnR5KHZhbCk7XG4gIH1cbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2V4cGFuZGVkOiBOYkJvb2xlYW5JbnB1dDtcblxuICAvKipcbiAgICogSXRlbSBpcyBkaXNhYmxlZCBhbmQgY2Fubm90IGJlIG9wZW5lZC5cbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqL1xuICBASW5wdXQoJ2Rpc2FibGVkJylcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5kaXNhYmxlZCcpXG4gIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5kaXNhYmxlZFZhbHVlO1xuICB9XG4gIHNldCBkaXNhYmxlZCh2YWw6IGJvb2xlYW4pIHtcbiAgICB0aGlzLmRpc2FibGVkVmFsdWUgPSBjb252ZXJ0VG9Cb29sUHJvcGVydHkodmFsKTtcbiAgICB0aGlzLmludmFsaWRhdGUoKTtcbiAgfVxuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfZGlzYWJsZWQ6IE5iQm9vbGVhbklucHV0O1xuXG4gIC8qKlxuICAgKiBFbWl0cyB3aGVuZXZlciB0aGUgZXhwYW5kZWQgc3RhdGUgb2YgdGhlIGFjY29yZGlvbiBjaGFuZ2VzLlxuICAgKiBQcmltYXJpbHkgdXNlZCB0byBmYWNpbGl0YXRlIHR3by13YXkgYmluZGluZy5cbiAgICovXG4gIEBPdXRwdXQoKSBjb2xsYXBzZWRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgYWNjb3JkaW9uSXRlbUludmFsaWRhdGUgPSBuZXcgU3ViamVjdDxib29sZWFuPigpO1xuXG4gIHByaXZhdGUgY29sbGFwc2VkVmFsdWUgPSB0cnVlO1xuICBwcml2YXRlIGRpc2FibGVkVmFsdWUgPSBmYWxzZTtcbiAgcHJpdmF0ZSBkZXN0cm95JCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgY29uc3RydWN0b3IoQEhvc3QoKSBwcml2YXRlIGFjY29yZGlvbjogTmJBY2NvcmRpb25Db21wb25lbnQsIHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gIH1cblxuICAvKipcbiAgICogT3Blbi9jbG9zZSB0aGUgaXRlbVxuICAgKi9cbiAgdG9nZ2xlKCkge1xuICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xuICAgICAgLy8gd2UgbmVlZCB0aGlzIHRlbXBvcmFyeSB2YXJpYWJsZSBhcyBgb3BlbkNsb3NlSXRlbXMubmV4dGAgd2lsbCBjaGFuZ2UgY3VycmVudCB2YWx1ZSB3ZSBuZWVkIHRvIHNhdmVcbiAgICAgIGNvbnN0IHdpbGxTZXQgPSAhdGhpcy5jb2xsYXBzZWQ7XG5cbiAgICAgIGlmICghdGhpcy5hY2NvcmRpb24ubXVsdGkpIHtcbiAgICAgICAgdGhpcy5hY2NvcmRpb24ub3BlbkNsb3NlSXRlbXMubmV4dCh0cnVlKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuY29sbGFwc2VkID0gd2lsbFNldDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogT3BlbiB0aGUgaXRlbS5cbiAgICovXG4gIG9wZW4oKSB7XG4gICAgIXRoaXMuZGlzYWJsZWQgJiYgKHRoaXMuY29sbGFwc2VkID0gZmFsc2UpO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbGxhcHNlIHRoZSBpdGVtLlxuICAgKi9cbiAgY2xvc2UoKSB7XG4gICAgIXRoaXMuZGlzYWJsZWQgJiYgKHRoaXMuY29sbGFwc2VkID0gdHJ1ZSk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmFjY29yZGlvbi5vcGVuQ2xvc2VJdGVtc1xuICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKVxuICAgICAgLnN1YnNjcmliZShjb2xsYXBzZWQgPT4ge1xuICAgICAgICAhdGhpcy5kaXNhYmxlZCAmJiAodGhpcy5jb2xsYXBzZWQgPSBjb2xsYXBzZWQpO1xuICAgIH0pO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIHRoaXMuYWNjb3JkaW9uSXRlbUludmFsaWRhdGUubmV4dCh0cnVlKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuZGVzdHJveSQubmV4dCgpO1xuICAgIHRoaXMuZGVzdHJveSQuY29tcGxldGUoKTtcbiAgICB0aGlzLmFjY29yZGlvbkl0ZW1JbnZhbGlkYXRlLmNvbXBsZXRlKCk7XG4gIH1cblxuICBwcml2YXRlIGludmFsaWRhdGUoKSB7XG4gICAgdGhpcy5hY2NvcmRpb25JdGVtSW52YWxpZGF0ZS5uZXh0KHRydWUpO1xuICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gIH1cbn1cbiJdfQ==