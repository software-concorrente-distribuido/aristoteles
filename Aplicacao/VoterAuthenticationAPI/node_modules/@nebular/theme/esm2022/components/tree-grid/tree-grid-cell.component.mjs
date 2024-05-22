/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Directive, HostBinding, Inject, PLATFORM_ID, } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NB_WINDOW } from '../../theme.options';
import { NbCellDirective, NbFooterCellDirective, NbHeaderCellDirective } from '../cdk/table/cell';
import { NbCdkCell, NbCdkFooterCell, NbCdkHeaderCell } from '../cdk/table/type-mappings';
import { NB_TREE_GRID } from './tree-grid-injection-tokens';
import { NB_DEFAULT_ROW_LEVEL } from './data-source/tree-grid.model';
import * as i0 from "@angular/core";
import * as i1 from "./tree-grid-column-def.directive";
import * as i2 from "@angular/platform-browser";
import * as i3 from "../../services/direction.service";
import * as i4 from "./tree-grid-columns.service";
export class NbTreeGridCellDirective extends NbCellDirective {
    get columnWidth() {
        this.latestWidth = this.tree.getColumnWidth();
        if (this.latestWidth) {
            return this.latestWidth;
        }
        return null;
    }
    get leftPadding() {
        if (this.directionService.isLtr()) {
            return this.getStartPadding();
        }
        return null;
    }
    get rightPadding() {
        if (this.directionService.isRtl()) {
            return this.getStartPadding();
        }
        return null;
    }
    constructor(columnDef, elementRef, tree, platformId, window, sanitizer, directionService, columnService, cd) {
        super(columnDef, elementRef);
        this.platformId = platformId;
        this.window = window;
        this.sanitizer = sanitizer;
        this.directionService = directionService;
        this.columnService = columnService;
        this.cd = cd;
        this.destroy$ = new Subject();
        this.initialLeftPadding = '';
        this.initialRightPadding = '';
        this.tree = tree;
        this.columnDef = columnDef;
        this.elementRef = elementRef;
    }
    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            const style = this.window.getComputedStyle(this.elementRef.nativeElement);
            this.initialLeftPadding = style.paddingLeft;
            this.initialRightPadding = style.paddingRight;
        }
        this.columnService.onColumnsChange()
            .pipe(filter(() => this.latestWidth !== this.tree.getColumnWidth()), takeUntil(this.destroy$))
            .subscribe(() => this.cd.detectChanges());
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    toggleRow() {
        this.tree.toggleCellRow(this);
    }
    get initialStartPadding() {
        return this.directionService.isLtr()
            ? this.initialLeftPadding
            : this.initialRightPadding;
    }
    getStartPadding() {
        const rowLevel = this.tree.getCellLevel(this, this.columnDef.name);
        if (rowLevel === NB_DEFAULT_ROW_LEVEL) {
            return null;
        }
        const nestingLevel = rowLevel + 1;
        let padding = '';
        if (this.tree.levelPadding) {
            padding = `calc(${this.tree.levelPadding} * ${nestingLevel})`;
        }
        else if (this.initialStartPadding) {
            padding = `calc(${this.initialStartPadding} * ${nestingLevel})`;
        }
        if (!padding) {
            return null;
        }
        return this.sanitizer.bypassSecurityTrustStyle(padding);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbTreeGridCellDirective, deps: [{ token: i1.NbTreeGridColumnDefDirective }, { token: i0.ElementRef }, { token: NB_TREE_GRID }, { token: PLATFORM_ID }, { token: NB_WINDOW }, { token: i2.DomSanitizer }, { token: i3.NbLayoutDirectionService }, { token: i4.NbColumnsService }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "17.1.0", type: NbTreeGridCellDirective, selector: "td[nbTreeGridCell]", host: { attributes: { "role": "gridcell" }, properties: { "style.width": "this.columnWidth", "style.padding-left": "this.leftPadding", "style.padding-right": "this.rightPadding" }, classAttribute: "nb-tree-grid-cell" }, providers: [{ provide: NbCdkCell, useExisting: NbTreeGridCellDirective }], usesInheritance: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbTreeGridCellDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'td[nbTreeGridCell]',
                    host: {
                        'class': 'nb-tree-grid-cell',
                        'role': 'gridcell',
                    },
                    providers: [{ provide: NbCdkCell, useExisting: NbTreeGridCellDirective }],
                }]
        }], ctorParameters: () => [{ type: i1.NbTreeGridColumnDefDirective }, { type: i0.ElementRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [NB_TREE_GRID]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [NB_WINDOW]
                }] }, { type: i2.DomSanitizer }, { type: i3.NbLayoutDirectionService }, { type: i4.NbColumnsService }, { type: i0.ChangeDetectorRef }], propDecorators: { columnWidth: [{
                type: HostBinding,
                args: ['style.width']
            }], leftPadding: [{
                type: HostBinding,
                args: ['style.padding-left']
            }], rightPadding: [{
                type: HostBinding,
                args: ['style.padding-right']
            }] } });
export class NbTreeGridHeaderCellDirective extends NbHeaderCellDirective {
    get columnWidth() {
        this.latestWidth = this.tree.getColumnWidth();
        return this.latestWidth || null;
    }
    constructor(columnDef, elementRef, tree, columnService, cd) {
        super(columnDef, elementRef);
        this.columnService = columnService;
        this.cd = cd;
        this.destroy$ = new Subject();
        this.tree = tree;
    }
    ngOnInit() {
        this.columnService.onColumnsChange()
            .pipe(filter(() => this.latestWidth !== this.tree.getColumnWidth()), takeUntil(this.destroy$))
            .subscribe(() => this.cd.detectChanges());
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbTreeGridHeaderCellDirective, deps: [{ token: i1.NbTreeGridColumnDefDirective }, { token: i0.ElementRef }, { token: NB_TREE_GRID }, { token: i4.NbColumnsService }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "17.1.0", type: NbTreeGridHeaderCellDirective, selector: "th[nbTreeGridHeaderCell]", host: { attributes: { "role": "columnheader" }, properties: { "style.width": "this.columnWidth" }, classAttribute: "nb-tree-grid-header-cell" }, providers: [{ provide: NbCdkHeaderCell, useExisting: NbTreeGridHeaderCellDirective }], usesInheritance: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbTreeGridHeaderCellDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'th[nbTreeGridHeaderCell]',
                    host: {
                        'class': 'nb-tree-grid-header-cell',
                        'role': 'columnheader',
                    },
                    providers: [{ provide: NbCdkHeaderCell, useExisting: NbTreeGridHeaderCellDirective }],
                }]
        }], ctorParameters: () => [{ type: i1.NbTreeGridColumnDefDirective }, { type: i0.ElementRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [NB_TREE_GRID]
                }] }, { type: i4.NbColumnsService }, { type: i0.ChangeDetectorRef }], propDecorators: { columnWidth: [{
                type: HostBinding,
                args: ['style.width']
            }] } });
export class NbTreeGridFooterCellDirective extends NbFooterCellDirective {
    get columnWidth() {
        this.latestWidth = this.tree.getColumnWidth();
        return this.latestWidth || null;
    }
    constructor(columnDef, elementRef, tree, columnService, cd) {
        super(columnDef, elementRef);
        this.columnService = columnService;
        this.cd = cd;
        this.destroy$ = new Subject();
        this.tree = tree;
    }
    ngOnInit() {
        this.columnService.onColumnsChange()
            .pipe(filter(() => this.latestWidth !== this.tree.getColumnWidth()), takeUntil(this.destroy$))
            .subscribe(() => this.cd.detectChanges());
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbTreeGridFooterCellDirective, deps: [{ token: i1.NbTreeGridColumnDefDirective }, { token: i0.ElementRef }, { token: NB_TREE_GRID }, { token: i4.NbColumnsService }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "17.1.0", type: NbTreeGridFooterCellDirective, selector: "td[nbTreeGridFooterCell]", host: { attributes: { "role": "gridcell" }, properties: { "style.width": "this.columnWidth" }, classAttribute: "nb-tree-grid-footer-cell" }, providers: [{ provide: NbCdkFooterCell, useExisting: NbTreeGridFooterCellDirective }], usesInheritance: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbTreeGridFooterCellDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'td[nbTreeGridFooterCell]',
                    host: {
                        'class': 'nb-tree-grid-footer-cell',
                        'role': 'gridcell',
                    },
                    providers: [{ provide: NbCdkFooterCell, useExisting: NbTreeGridFooterCellDirective }],
                }]
        }], ctorParameters: () => [{ type: i1.NbTreeGridColumnDefDirective }, { type: i0.ElementRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [NB_TREE_GRID]
                }] }, { type: i4.NbColumnsService }, { type: i0.ChangeDetectorRef }], propDecorators: { columnWidth: [{
                type: HostBinding,
                args: ['style.width']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1ncmlkLWNlbGwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2ZyYW1ld29yay90aGVtZS9jb21wb25lbnRzL3RyZWUtZ3JpZC90cmVlLWdyaWQtY2VsbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFFTCxTQUFTLEVBRVQsV0FBVyxFQUNYLE1BQU0sRUFHTixXQUFXLEdBQ1osTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFcEQsT0FBTyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRy9CLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNoRCxPQUFPLEVBQUUsZUFBZSxFQUFFLHFCQUFxQixFQUFFLHFCQUFxQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbEcsT0FBTyxFQUFFLFNBQVMsRUFBRSxlQUFlLEVBQUUsZUFBZSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDekYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBRzVELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLCtCQUErQixDQUFDOzs7Ozs7QUFXckUsTUFBTSxPQUFPLHVCQUF3QixTQUFRLGVBQWU7SUFTMUQsSUFDSSxXQUFXO1FBQ2IsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQzlDLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ3JCLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUMxQixDQUFDO1FBRUQsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQsSUFD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QyxFQUFFLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUMzQixDQUFDOzhHQWxDVSw2QkFBNkIsd0ZBYzlCLFlBQVk7a0dBZFgsNkJBQTZCLGdNQUY3QixDQUFDLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxXQUFXLEVBQUUsNkJBQTZCLEVBQUUsQ0FBQzs7MkZBRTFFLDZCQUE2QjtrQkFSekMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsMEJBQTBCO29CQUNwQyxJQUFJLEVBQUU7d0JBQ0osT0FBTyxFQUFFLDBCQUEwQjt3QkFDbkMsTUFBTSxFQUFFLFVBQVU7cUJBQ25CO29CQUNELFNBQVMsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxXQUFXLCtCQUErQixFQUFFLENBQUM7aUJBQ3RGOzswQkFlSSxNQUFNOzJCQUFDLFlBQVk7d0dBUmxCLFdBQVc7c0JBRGQsV0FBVzt1QkFBQyxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgQWt2ZW8uIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICovXG5cbmltcG9ydCB7XG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIEhvc3RCaW5kaW5nLFxuICBJbmplY3QsXG4gIE9uSW5pdCxcbiAgT25EZXN0cm95LFxuICBQTEFURk9STV9JRCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIsIFNhZmVTdHlsZSB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHsgZmlsdGVyLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IE5iTGF5b3V0RGlyZWN0aW9uU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2RpcmVjdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IE5CX1dJTkRPVyB9IGZyb20gJy4uLy4uL3RoZW1lLm9wdGlvbnMnO1xuaW1wb3J0IHsgTmJDZWxsRGlyZWN0aXZlLCBOYkZvb3RlckNlbGxEaXJlY3RpdmUsIE5iSGVhZGVyQ2VsbERpcmVjdGl2ZSB9IGZyb20gJy4uL2Nkay90YWJsZS9jZWxsJztcbmltcG9ydCB7IE5iQ2RrQ2VsbCwgTmJDZGtGb290ZXJDZWxsLCBOYkNka0hlYWRlckNlbGwgfSBmcm9tICcuLi9jZGsvdGFibGUvdHlwZS1tYXBwaW5ncyc7XG5pbXBvcnQgeyBOQl9UUkVFX0dSSUQgfSBmcm9tICcuL3RyZWUtZ3JpZC1pbmplY3Rpb24tdG9rZW5zJztcbmltcG9ydCB7IE5iVHJlZUdyaWRDb21wb25lbnQgfSBmcm9tICcuL3RyZWUtZ3JpZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTmJUcmVlR3JpZENvbHVtbkRlZkRpcmVjdGl2ZSB9IGZyb20gJy4vdHJlZS1ncmlkLWNvbHVtbi1kZWYuZGlyZWN0aXZlJztcbmltcG9ydCB7IE5CX0RFRkFVTFRfUk9XX0xFVkVMIH0gZnJvbSAnLi9kYXRhLXNvdXJjZS90cmVlLWdyaWQubW9kZWwnO1xuaW1wb3J0IHsgTmJDb2x1bW5zU2VydmljZSB9IGZyb20gJy4vdHJlZS1ncmlkLWNvbHVtbnMuc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ3RkW25iVHJlZUdyaWRDZWxsXScsXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAnbmItdHJlZS1ncmlkLWNlbGwnLFxuICAgICdyb2xlJzogJ2dyaWRjZWxsJyxcbiAgfSxcbiAgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiBOYkNka0NlbGwsIHVzZUV4aXN0aW5nOiBOYlRyZWVHcmlkQ2VsbERpcmVjdGl2ZSB9XSxcbn0pXG5leHBvcnQgY2xhc3MgTmJUcmVlR3JpZENlbGxEaXJlY3RpdmUgZXh0ZW5kcyBOYkNlbGxEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgZGVzdHJveSQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuICBwcml2YXRlIHJlYWRvbmx5IHRyZWU6IE5iVHJlZUdyaWRDb21wb25lbnQ8YW55PjtcbiAgcHJpdmF0ZSByZWFkb25seSBjb2x1bW5EZWY6IE5iVHJlZUdyaWRDb2x1bW5EZWZEaXJlY3RpdmU7XG4gIHByaXZhdGUgaW5pdGlhbExlZnRQYWRkaW5nOiBzdHJpbmcgPSAnJztcbiAgcHJpdmF0ZSBpbml0aWFsUmlnaHRQYWRkaW5nOiBzdHJpbmcgPSAnJztcbiAgcHJpdmF0ZSBsYXRlc3RXaWR0aDogc3RyaW5nO1xuICBlbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PjtcblxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLndpZHRoJylcbiAgZ2V0IGNvbHVtbldpZHRoKCk6IHN0cmluZyB7XG4gICAgdGhpcy5sYXRlc3RXaWR0aCA9IHRoaXMudHJlZS5nZXRDb2x1bW5XaWR0aCgpO1xuICAgIGlmICh0aGlzLmxhdGVzdFdpZHRoKSB7XG4gICAgICByZXR1cm4gdGhpcy5sYXRlc3RXaWR0aDtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnc3R5bGUucGFkZGluZy1sZWZ0JylcbiAgZ2V0IGxlZnRQYWRkaW5nKCk6IHN0cmluZyB8IFNhZmVTdHlsZSB8IG51bGwge1xuICAgIGlmICh0aGlzLmRpcmVjdGlvblNlcnZpY2UuaXNMdHIoKSkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0U3RhcnRQYWRkaW5nKCk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5wYWRkaW5nLXJpZ2h0JylcbiAgZ2V0IHJpZ2h0UGFkZGluZygpOiBzdHJpbmcgfCBTYWZlU3R5bGUgfCBudWxsIHtcbiAgICBpZiAodGhpcy5kaXJlY3Rpb25TZXJ2aWNlLmlzUnRsKCkpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldFN0YXJ0UGFkZGluZygpO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIGNvbHVtbkRlZjogTmJUcmVlR3JpZENvbHVtbkRlZkRpcmVjdGl2ZSxcbiAgICBlbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICBASW5qZWN0KE5CX1RSRUVfR1JJRCkgdHJlZSxcbiAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQsXG4gICAgQEluamVjdChOQl9XSU5ET1cpIHByaXZhdGUgd2luZG93LFxuICAgIHByaXZhdGUgc2FuaXRpemVyOiBEb21TYW5pdGl6ZXIsXG4gICAgcHJpdmF0ZSBkaXJlY3Rpb25TZXJ2aWNlOiBOYkxheW91dERpcmVjdGlvblNlcnZpY2UsXG4gICAgcHJpdmF0ZSBjb2x1bW5TZXJ2aWNlOiBOYkNvbHVtbnNTZXJ2aWNlLFxuICAgIHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmLFxuICApIHtcbiAgICBzdXBlcihjb2x1bW5EZWYsIGVsZW1lbnRSZWYpO1xuICAgIHRoaXMudHJlZSA9IHRyZWUgYXMgTmJUcmVlR3JpZENvbXBvbmVudDxhbnk+O1xuICAgIHRoaXMuY29sdW1uRGVmID0gY29sdW1uRGVmO1xuICAgIHRoaXMuZWxlbWVudFJlZiA9IGVsZW1lbnRSZWY7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgY29uc3Qgc3R5bGUgPSB0aGlzLndpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICAgIHRoaXMuaW5pdGlhbExlZnRQYWRkaW5nID0gc3R5bGUucGFkZGluZ0xlZnQ7XG4gICAgICB0aGlzLmluaXRpYWxSaWdodFBhZGRpbmcgPSBzdHlsZS5wYWRkaW5nUmlnaHQ7XG4gICAgfVxuXG4gICAgdGhpcy5jb2x1bW5TZXJ2aWNlLm9uQ29sdW1uc0NoYW5nZSgpXG4gICAgICAucGlwZShcbiAgICAgICAgZmlsdGVyKCgpID0+IHRoaXMubGF0ZXN0V2lkdGggIT09IHRoaXMudHJlZS5nZXRDb2x1bW5XaWR0aCgpKSxcbiAgICAgICAgdGFrZVVudGlsKHRoaXMuZGVzdHJveSQpLFxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLmNkLmRldGVjdENoYW5nZXMoKSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmRlc3Ryb3kkLm5leHQoKTtcbiAgICB0aGlzLmRlc3Ryb3kkLmNvbXBsZXRlKCk7XG4gIH1cblxuICB0b2dnbGVSb3coKTogdm9pZCB7XG4gICAgdGhpcy50cmVlLnRvZ2dsZUNlbGxSb3codGhpcyk7XG4gIH1cblxuICBwcml2YXRlIGdldCBpbml0aWFsU3RhcnRQYWRkaW5nKCk6IHN0cmluZyB7XG4gICAgICByZXR1cm4gdGhpcy5kaXJlY3Rpb25TZXJ2aWNlLmlzTHRyKClcbiAgICAgID8gdGhpcy5pbml0aWFsTGVmdFBhZGRpbmdcbiAgICAgIDogdGhpcy5pbml0aWFsUmlnaHRQYWRkaW5nO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRTdGFydFBhZGRpbmcoKTogc3RyaW5nIHwgU2FmZVN0eWxlIHwgbnVsbCB7XG4gICAgY29uc3Qgcm93TGV2ZWwgPSB0aGlzLnRyZWUuZ2V0Q2VsbExldmVsKHRoaXMsIHRoaXMuY29sdW1uRGVmLm5hbWUpO1xuICAgIGlmIChyb3dMZXZlbCA9PT0gTkJfREVGQVVMVF9ST1dfTEVWRUwpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IG5lc3RpbmdMZXZlbCA9IHJvd0xldmVsICsgMTtcbiAgICBsZXQgcGFkZGluZzogc3RyaW5nID0gJyc7XG4gICAgaWYgKHRoaXMudHJlZS5sZXZlbFBhZGRpbmcpIHtcbiAgICAgIHBhZGRpbmcgPSBgY2FsYygke3RoaXMudHJlZS5sZXZlbFBhZGRpbmd9ICogJHtuZXN0aW5nTGV2ZWx9KWA7XG4gICAgfSBlbHNlIGlmICh0aGlzLmluaXRpYWxTdGFydFBhZGRpbmcpIHtcbiAgICAgIHBhZGRpbmcgPSBgY2FsYygke3RoaXMuaW5pdGlhbFN0YXJ0UGFkZGluZ30gKiAke25lc3RpbmdMZXZlbH0pYDtcbiAgICB9XG5cbiAgICBpZiAoIXBhZGRpbmcpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0U3R5bGUocGFkZGluZyk7XG4gIH1cbn1cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAndGhbbmJUcmVlR3JpZEhlYWRlckNlbGxdJyxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICduYi10cmVlLWdyaWQtaGVhZGVyLWNlbGwnLFxuICAgICdyb2xlJzogJ2NvbHVtbmhlYWRlcicsXG4gIH0sXG4gIHByb3ZpZGVyczogW3sgcHJvdmlkZTogTmJDZGtIZWFkZXJDZWxsLCB1c2VFeGlzdGluZzogTmJUcmVlR3JpZEhlYWRlckNlbGxEaXJlY3RpdmUgfV0sXG59KVxuZXhwb3J0IGNsYXNzIE5iVHJlZUdyaWRIZWFkZXJDZWxsRGlyZWN0aXZlIGV4dGVuZHMgTmJIZWFkZXJDZWxsRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBwcml2YXRlIGRlc3Ryb3kkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcbiAgcHJpdmF0ZSBsYXRlc3RXaWR0aDogc3RyaW5nO1xuICBwcml2YXRlIHJlYWRvbmx5IHRyZWU6IE5iVHJlZUdyaWRDb21wb25lbnQ8YW55PjtcblxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLndpZHRoJylcbiAgZ2V0IGNvbHVtbldpZHRoKCk6IHN0cmluZyB7XG4gICAgdGhpcy5sYXRlc3RXaWR0aCA9IHRoaXMudHJlZS5nZXRDb2x1bW5XaWR0aCgpO1xuICAgIHJldHVybiB0aGlzLmxhdGVzdFdpZHRoIHx8IG51bGw7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBjb2x1bW5EZWY6IE5iVHJlZUdyaWRDb2x1bW5EZWZEaXJlY3RpdmUsXG4gICAgZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgQEluamVjdChOQl9UUkVFX0dSSUQpIHRyZWUsXG4gICAgcHJpdmF0ZSBjb2x1bW5TZXJ2aWNlOiBOYkNvbHVtbnNTZXJ2aWNlLFxuICAgIHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmLFxuICApIHtcbiAgICBzdXBlcihjb2x1bW5EZWYsIGVsZW1lbnRSZWYpO1xuICAgIHRoaXMudHJlZSA9IHRyZWUgYXMgTmJUcmVlR3JpZENvbXBvbmVudDxhbnk+O1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5jb2x1bW5TZXJ2aWNlLm9uQ29sdW1uc0NoYW5nZSgpXG4gICAgICAucGlwZShcbiAgICAgICAgZmlsdGVyKCgpID0+IHRoaXMubGF0ZXN0V2lkdGggIT09IHRoaXMudHJlZS5nZXRDb2x1bW5XaWR0aCgpKSxcbiAgICAgICAgdGFrZVVudGlsKHRoaXMuZGVzdHJveSQpLFxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLmNkLmRldGVjdENoYW5nZXMoKSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmRlc3Ryb3kkLm5leHQoKTtcbiAgICB0aGlzLmRlc3Ryb3kkLmNvbXBsZXRlKCk7XG4gIH1cbn1cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAndGRbbmJUcmVlR3JpZEZvb3RlckNlbGxdJyxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICduYi10cmVlLWdyaWQtZm9vdGVyLWNlbGwnLFxuICAgICdyb2xlJzogJ2dyaWRjZWxsJyxcbiAgfSxcbiAgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiBOYkNka0Zvb3RlckNlbGwsIHVzZUV4aXN0aW5nOiBOYlRyZWVHcmlkRm9vdGVyQ2VsbERpcmVjdGl2ZSB9XSxcbn0pXG5leHBvcnQgY2xhc3MgTmJUcmVlR3JpZEZvb3RlckNlbGxEaXJlY3RpdmUgZXh0ZW5kcyBOYkZvb3RlckNlbGxEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgZGVzdHJveSQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuICBwcml2YXRlIGxhdGVzdFdpZHRoOiBzdHJpbmc7XG4gIHByaXZhdGUgcmVhZG9ubHkgdHJlZTogTmJUcmVlR3JpZENvbXBvbmVudDxhbnk+O1xuXG4gIEBIb3N0QmluZGluZygnc3R5bGUud2lkdGgnKVxuICBnZXQgY29sdW1uV2lkdGgoKTogc3RyaW5nIHtcbiAgICB0aGlzLmxhdGVzdFdpZHRoID0gdGhpcy50cmVlLmdldENvbHVtbldpZHRoKCk7XG4gICAgcmV0dXJuIHRoaXMubGF0ZXN0V2lkdGggfHwgbnVsbDtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIGNvbHVtbkRlZjogTmJUcmVlR3JpZENvbHVtbkRlZkRpcmVjdGl2ZSxcbiAgICBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIEBJbmplY3QoTkJfVFJFRV9HUklEKSB0cmVlLFxuICAgIHByaXZhdGUgY29sdW1uU2VydmljZTogTmJDb2x1bW5zU2VydmljZSxcbiAgICBwcml2YXRlIGNkOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgKSB7XG4gICAgc3VwZXIoY29sdW1uRGVmLCBlbGVtZW50UmVmKTtcbiAgICB0aGlzLnRyZWUgPSB0cmVlIGFzIE5iVHJlZUdyaWRDb21wb25lbnQ8YW55PjtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuY29sdW1uU2VydmljZS5vbkNvbHVtbnNDaGFuZ2UoKVxuICAgICAgLnBpcGUoXG4gICAgICAgIGZpbHRlcigoKSA9PiB0aGlzLmxhdGVzdFdpZHRoICE9PSB0aGlzLnRyZWUuZ2V0Q29sdW1uV2lkdGgoKSksXG4gICAgICAgIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSxcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5jZC5kZXRlY3RDaGFuZ2VzKCkpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5kZXN0cm95JC5uZXh0KCk7XG4gICAgdGhpcy5kZXN0cm95JC5jb21wbGV0ZSgpO1xuICB9XG59XG4iXX0=