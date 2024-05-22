import { Component, HostListener, Inject, Input } from '@angular/core';
import { Subject, timer } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { NbCdkFooterRow, NbCdkHeaderRow, NbCdkRow } from '../cdk/table/type-mappings';
import { NbFooterRowComponent, NbHeaderRowComponent, NbRowComponent } from '../cdk/table/row';
import { NB_TREE_GRID } from './tree-grid-injection-tokens';
import * as i0 from "@angular/core";
import * as i1 from "../cdk/table/row";
export const NB_ROW_DOUBLE_CLICK_DELAY = 200;
/**
 * Cells container. Adds the right class and role.
 */
export class NbTreeGridRowComponent extends NbRowComponent {
    toggleIfEnabledNode() {
        if (!this.clickToToggle) {
            return;
        }
        timer(NB_ROW_DOUBLE_CLICK_DELAY)
            .pipe(take(1), takeUntil(this.doubleClick$))
            .subscribe(() => this.tree.toggleRow(this));
    }
    toggleIfEnabledNodeDeep() {
        if (!this.clickToToggle) {
            return;
        }
        this.doubleClick$.next();
        this.tree.toggleRow(this, { deep: true });
    }
    constructor(tree, elementRef) {
        super();
        this.elementRef = elementRef;
        this.doubleClick$ = new Subject();
        /**
         * Time to wait for second click to expand row deeply.
         * 200ms by default.
         */
        this.doubleClickDelay = NB_ROW_DOUBLE_CLICK_DELAY;
        /**
         * Toggle row on click. Enabled by default.
         */
        this.clickToToggle = true;
        this.tree = tree;
    }
    ngOnDestroy() {
        this.doubleClick$.complete();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbTreeGridRowComponent, deps: [{ token: NB_TREE_GRID }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.1.0", type: NbTreeGridRowComponent, selector: "tr[nbTreeGridRow]", inputs: { doubleClickDelay: "doubleClickDelay", clickToToggle: "clickToToggle" }, host: { attributes: { "role": "row" }, listeners: { "click": "toggleIfEnabledNode()", "dblclick": "toggleIfEnabledNodeDeep()" }, classAttribute: "nb-tree-grid-row" }, providers: [{ provide: NbCdkRow, useExisting: NbTreeGridRowComponent }], usesInheritance: true, ngImport: i0, template: `<ng-container nbCellOutlet></ng-container>`, isInline: true, dependencies: [{ kind: "directive", type: i1.NbCellOutletDirective, selector: "[nbCellOutlet]" }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbTreeGridRowComponent, decorators: [{
            type: Component,
            args: [{
                    // eslint-disable-next-line @angular-eslint/component-selector
                    selector: 'tr[nbTreeGridRow]',
                    template: `<ng-container nbCellOutlet></ng-container>`,
                    // eslint-disable-next-line @angular-eslint/no-host-metadata-property
                    host: {
                        class: 'nb-tree-grid-row',
                        role: 'row',
                    },
                    providers: [{ provide: NbCdkRow, useExisting: NbTreeGridRowComponent }],
                }]
        }], ctorParameters: () => [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [NB_TREE_GRID]
                }] }, { type: i0.ElementRef }], propDecorators: { doubleClickDelay: [{
                type: Input
            }], clickToToggle: [{
                type: Input
            }], toggleIfEnabledNode: [{
                type: HostListener,
                args: ['click']
            }], toggleIfEnabledNodeDeep: [{
                type: HostListener,
                args: ['dblclick']
            }] } });
export class NbTreeGridHeaderRowComponent extends NbHeaderRowComponent {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbTreeGridHeaderRowComponent, deps: null, target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.1.0", type: NbTreeGridHeaderRowComponent, selector: "tr[nbTreeGridHeaderRow]", host: { attributes: { "role": "row" }, classAttribute: "nb-tree-grid-header-row" }, providers: [{ provide: NbCdkHeaderRow, useExisting: NbTreeGridHeaderRowComponent }], usesInheritance: true, ngImport: i0, template: ` <ng-container nbCellOutlet></ng-container>`, isInline: true, dependencies: [{ kind: "directive", type: i1.NbCellOutletDirective, selector: "[nbCellOutlet]" }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbTreeGridHeaderRowComponent, decorators: [{
            type: Component,
            args: [{
                    // eslint-disable-next-line @angular-eslint/component-selector
                    selector: 'tr[nbTreeGridHeaderRow]',
                    template: ` <ng-container nbCellOutlet></ng-container>`,
                    // eslint-disable-next-line @angular-eslint/no-host-metadata-property
                    host: {
                        class: 'nb-tree-grid-header-row',
                        role: 'row',
                    },
                    providers: [{ provide: NbCdkHeaderRow, useExisting: NbTreeGridHeaderRowComponent }],
                }]
        }] });
export class NbTreeGridFooterRowComponent extends NbFooterRowComponent {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbTreeGridFooterRowComponent, deps: null, target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.1.0", type: NbTreeGridFooterRowComponent, selector: "tr[nbTreeGridFooterRow]", host: { attributes: { "role": "row" }, classAttribute: "nb-tree-grid-footer-row" }, providers: [{ provide: NbCdkFooterRow, useExisting: NbTreeGridFooterRowComponent }], usesInheritance: true, ngImport: i0, template: ` <ng-container nbCellOutlet></ng-container>`, isInline: true, dependencies: [{ kind: "directive", type: i1.NbCellOutletDirective, selector: "[nbCellOutlet]" }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbTreeGridFooterRowComponent, decorators: [{
            type: Component,
            args: [{
                    // eslint-disable-next-line @angular-eslint/component-selector
                    selector: 'tr[nbTreeGridFooterRow]',
                    template: ` <ng-container nbCellOutlet></ng-container>`,
                    // eslint-disable-next-line @angular-eslint/no-host-metadata-property
                    host: {
                        class: 'nb-tree-grid-footer-row',
                        role: 'row',
                    },
                    providers: [{ provide: NbCdkFooterRow, useExisting: NbTreeGridFooterRowComponent }],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1ncmlkLXJvdy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvZnJhbWV3b3JrL3RoZW1lL2NvbXBvbmVudHMvdHJlZS1ncmlkL3RyZWUtZ3JpZC1yb3cuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQWMsWUFBWSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFDOUYsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdEMsT0FBTyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN0RixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsb0JBQW9CLEVBQUUsY0FBYyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFFOUYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDhCQUE4QixDQUFDOzs7QUFFNUQsTUFBTSxDQUFDLE1BQU0seUJBQXlCLEdBQVcsR0FBRyxDQUFDO0FBRXJEOztHQUVHO0FBWUgsTUFBTSxPQUFPLHNCQUF1QixTQUFRLGNBQWM7SUFnQnhELG1CQUFtQjtRQUNqQixJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQ3hCLE9BQU87UUFDVCxDQUFDO1FBRUQsS0FBSyxDQUFDLHlCQUF5QixDQUFDO2FBQzdCLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUMzQyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBR0QsdUJB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Q3BGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBIb3N0TGlzdGVuZXIsIEluamVjdCwgSW5wdXQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCwgdGltZXIgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2UsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE5iQ2RrRm9vdGVyUm93LCBOYkNka0hlYWRlclJvdywgTmJDZGtSb3cgfSBmcm9tICcuLi9jZGsvdGFibGUvdHlwZS1tYXBwaW5ncyc7XG5pbXBvcnQgeyBOYkZvb3RlclJvd0NvbXBvbmVudCwgTmJIZWFkZXJSb3dDb21wb25lbnQsIE5iUm93Q29tcG9uZW50IH0gZnJvbSAnLi4vY2RrL3RhYmxlL3Jvdyc7XG5pbXBvcnQgeyBOYlRyZWVHcmlkQ29tcG9uZW50IH0gZnJvbSAnLi90cmVlLWdyaWQuY29tcG9uZW50JztcbmltcG9ydCB7IE5CX1RSRUVfR1JJRCB9IGZyb20gJy4vdHJlZS1ncmlkLWluamVjdGlvbi10b2tlbnMnO1xuXG5leHBvcnQgY29uc3QgTkJfUk9XX0RPVUJMRV9DTElDS19ERUxBWTogbnVtYmVyID0gMjAwO1xuXG4vKipcbiAqIENlbGxzIGNvbnRhaW5lci4gQWRkcyB0aGUgcmlnaHQgY2xhc3MgYW5kIHJvbGUuXG4gKi9cbkBDb21wb25lbnQoe1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L2NvbXBvbmVudC1zZWxlY3RvclxuICBzZWxlY3RvcjogJ3RyW25iVHJlZUdyaWRSb3ddJyxcbiAgdGVtcGxhdGU6IGA8bmctY29udGFpbmVyIG5iQ2VsbE91dGxldD48L25nLWNvbnRhaW5lcj5gLFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L25vLWhvc3QtbWV0YWRhdGEtcHJvcGVydHlcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnbmItdHJlZS1ncmlkLXJvdycsXG4gICAgcm9sZTogJ3JvdycsXG4gIH0sXG4gIHByb3ZpZGVyczogW3sgcHJvdmlkZTogTmJDZGtSb3csIHVzZUV4aXN0aW5nOiBOYlRyZWVHcmlkUm93Q29tcG9uZW50IH1dLFxufSlcbmV4cG9ydCBjbGFzcyBOYlRyZWVHcmlkUm93Q29tcG9uZW50IGV4dGVuZHMgTmJSb3dDb21wb25lbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBwcml2YXRlIHJlYWRvbmx5IGRvdWJsZUNsaWNrJCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG4gIHByaXZhdGUgcmVhZG9ubHkgdHJlZTogTmJUcmVlR3JpZENvbXBvbmVudDxhbnk+O1xuXG4gIC8qKlxuICAgKiBUaW1lIHRvIHdhaXQgZm9yIHNlY29uZCBjbGljayB0byBleHBhbmQgcm93IGRlZXBseS5cbiAgICogMjAwbXMgYnkgZGVmYXVsdC5cbiAgICovXG4gIEBJbnB1dCgpIGRvdWJsZUNsaWNrRGVsYXk6IG51bWJlciA9IE5CX1JPV19ET1VCTEVfQ0xJQ0tfREVMQVk7XG5cbiAgLyoqXG4gICAqIFRvZ2dsZSByb3cgb24gY2xpY2suIEVuYWJsZWQgYnkgZGVmYXVsdC5cbiAgICovXG4gIEBJbnB1dCgpIGNsaWNrVG9Ub2dnbGU6IGJvb2xlYW4gPSB0cnVlO1xuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJylcbiAgdG9nZ2xlSWZFbmFibGVkTm9kZSgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuY2xpY2tUb1RvZ2dsZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRpbWVyKE5CX1JPV19ET1VCTEVfQ0xJQ0tfREVMQVkpXG4gICAgICAucGlwZSh0YWtlKDEpLCB0YWtlVW50aWwodGhpcy5kb3VibGVDbGljayQpKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLnRyZWUudG9nZ2xlUm93KHRoaXMpKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2RibGNsaWNrJylcbiAgdG9nZ2xlSWZFbmFibGVkTm9kZURlZXAoKSB7XG4gICAgaWYgKCF0aGlzLmNsaWNrVG9Ub2dnbGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmRvdWJsZUNsaWNrJC5uZXh0KCk7XG4gICAgdGhpcy50cmVlLnRvZ2dsZVJvdyh0aGlzLCB7IGRlZXA6IHRydWUgfSk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihASW5qZWN0KE5CX1RSRUVfR1JJRCkgdHJlZSwgcHVibGljIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+KSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnRyZWUgPSB0cmVlIGFzIE5iVHJlZUdyaWRDb21wb25lbnQ8YW55PjtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuZG91YmxlQ2xpY2skLmNvbXBsZXRlKCk7XG4gIH1cbn1cblxuQENvbXBvbmVudCh7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvY29tcG9uZW50LXNlbGVjdG9yXG4gIHNlbGVjdG9yOiAndHJbbmJUcmVlR3JpZEhlYWRlclJvd10nLFxuICB0ZW1wbGF0ZTogYCA8bmctY29udGFpbmVyIG5iQ2VsbE91dGxldD48L25nLWNvbnRhaW5lcj5gLFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L25vLWhvc3QtbWV0YWRhdGEtcHJvcGVydHlcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnbmItdHJlZS1ncmlkLWhlYWRlci1yb3cnLFxuICAgIHJvbGU6ICdyb3cnLFxuICB9LFxuICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IE5iQ2RrSGVhZGVyUm93LCB1c2VFeGlzdGluZzogTmJUcmVlR3JpZEhlYWRlclJvd0NvbXBvbmVudCB9XSxcbn0pXG5leHBvcnQgY2xhc3MgTmJUcmVlR3JpZEhlYWRlclJvd0NvbXBvbmVudCBleHRlbmRzIE5iSGVhZGVyUm93Q29tcG9uZW50IHt9XG5cbkBDb21wb25lbnQoe1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L2NvbXBvbmVudC1zZWxlY3RvclxuICBzZWxlY3RvcjogJ3RyW25iVHJlZUdyaWRGb290ZXJSb3ddJyxcbiAgdGVtcGxhdGU6IGAgPG5nLWNvbnRhaW5lciBuYkNlbGxPdXRsZXQ+PC9uZy1jb250YWluZXI+YCxcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9uby1ob3N0LW1ldGFkYXRhLXByb3BlcnR5XG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ25iLXRyZWUtZ3JpZC1mb290ZXItcm93JyxcbiAgICByb2xlOiAncm93JyxcbiAgfSxcbiAgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiBOYkNka0Zvb3RlclJvdywgdXNlRXhpc3Rpbmc6IE5iVHJlZUdyaWRGb290ZXJSb3dDb21wb25lbnQgfV0sXG59KVxuZXhwb3J0IGNsYXNzIE5iVHJlZUdyaWRGb290ZXJSb3dDb21wb25lbnQgZXh0ZW5kcyBOYkZvb3RlclJvd0NvbXBvbmVudCB7fVxuIl19