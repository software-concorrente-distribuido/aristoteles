/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Attribute, Component, HostBinding, Inject, Input, Optional, SkipSelf, } from '@angular/core';
import { fromEvent, merge, Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { NB_DOCUMENT, NB_WINDOW } from '../../theme.options';
import { NB_TABLE_TEMPLATE, NbTable, NB_TABLE_PROVIDERS, NB_COALESCED_STYLE_SCHEDULER, NB_VIEW_REPEATER_STRATEGY, } from '../cdk/table/table.module';
import { NB_STICKY_POSITIONING_LISTENER } from '../cdk/table/type-mappings';
import { NbTreeGridDataSource } from './data-source/tree-grid-data-source';
import { NB_DEFAULT_ROW_LEVEL } from './data-source/tree-grid.model';
import { NB_TREE_GRID } from './tree-grid-injection-tokens';
import { convertToBoolProperty } from '../helpers';
import { NbColumnsService } from './tree-grid-columns.service';
import * as i0 from "@angular/core";
import * as i1 from "./data-source/tree-grid-data-source";
import * as i2 from "../cdk/bidi/bidi-service";
import * as i3 from "../cdk/platform/platform-service";
import * as i4 from "../cdk/adapter/viewport-ruler-adapter";
import * as i5 from "../cdk/table/row";
/**
 * Tree grid component that can be used to display nested rows of data.
 * Supports filtering and sorting.
 * @stacked-example(Showcase, tree-grid/tree-grid-showcase.component)
 *
 * ### Installation
 *
 * Import `NbTreeGridModule` to your feature module.
 * ```ts
 * @NgModule({
 *   imports: [
 *     // ...
 *     NbTreeGridModule,
 *   ],
 * })
 * export class PageModule { }
 * ```
 *
 * ### Usage
 *
 * As the most basic usage you need to define [nbTreeGridRowDef](docs/components/treegrid/api#nbtreegridrowdefdirective)
 * where you should pass columns to display in rows and
 * [nbTreeGridColumnDef](docs/components/treegrid/api#nbtreegridcolumndefdirective) - component containing cell
 * definitions for each column passed to row definition.
 * @stacked-example(Basic, tree-grid/tree-grid-basic.component)
 *
 * `NbTreeGridComponent`'s source input and `NbTreeGridDataSourceBuilder.create` expecting data to be an array of
 * objects with `data`, `children` and `expanded` properties. If your data doesn't match this interface, you can pass
 * getter functions for each property as arguments to `NbTreeGridDataSourceBuilder.create` method.
 * @stacked-example(Custom node structure, tree-grid/tree-grid-custom-node-structure.component)
 *
 * To use sorting you can add `nbSort` directive to table and subscribe to `sort` method. When user click on header,
 * sort event will be emitted. Event object contain clicked column name and desired sort direction.
 * @stacked-example(Sortable, tree-grid/tree-grid-sortable.component)
 *
 * You can use `Data Source Builder` to create `NbTreeGridDataSource` which would have toggle, sort and
 * filter methods. Then you can call this methods to change sort or toggle rows programmatically. Also `nbSort` and
 * `nbFilterInput` directives both support `NbTreeGridDataSource`, so you can pass it directly as an input and
 * directives will trigger sort, toggle themselves.
 * @stacked-example(Data Source Builder, tree-grid/tree-grid-showcase.component)
 *
 * You can create responsive grid by setting `hideOn` and `showOn` inputs of
 * [nbTreeGridColumnDef](docs/components/tree-grid/api#nbtreegridcolumndefdirective) directive.
 * When viewport reaches specified width grid hides or shows columns.
 * @stacked-example(Responsive columns, tree-grid/tree-grid-responsive.component)
 *
 * To customize sort or row toggle icons you can use `nbSortHeaderIcon` and `nbTreeGridRowToggle` directives
 * respectively. `nbSortHeaderIcon` is a structural directive and it's implicit context set to current direction.
 * Also context has three properties: `isAscending`, `isDescending` and `isNone`.
 * @stacked-example(Custom icons, tree-grid/tree-grid-custom-icons.component)
 *
 * By default, row to toggle happens when user clicks anywhere in the row. Also double click expands row deeply.
 * To disable this you can set `[clickToToggle]="false"` input of `nbTreeGridRow`.
 * @stacked-example(Disable click toggle, tree-grid/tree-grid-disable-click-toggle.component)
 *
 * @styles
 *
 * tree-grid-cell-border-width:
 * tree-grid-cell-border-style:
 * tree-grid-cell-border-color:
 * tree-grid-row-min-height:
 * tree-grid-cell-padding:
 * tree-grid-header-background-color:
 * tree-grid-header-text-color:
 * tree-grid-header-text-font-family:
 * tree-grid-header-text-font-size:
 * tree-grid-header-text-font-weight:
 * tree-grid-header-text-line-height:
 * tree-grid-footer-background-color:
 * tree-grid-footer-text-color:
 * tree-grid-footer-text-font-family:
 * tree-grid-footer-text-font-size:
 * tree-grid-footer-text-font-weight:
 * tree-grid-footer-text-line-height:
 * tree-grid-row-background-color:
 * tree-grid-row-even-background-color:
 * tree-grid-row-hover-background-color:
 * tree-grid-row-text-color:
 * tree-grid-row-text-font-family:
 * tree-grid-row-text-font-size:
 * tree-grid-row-text-font-weight:
 * tree-grid-row-text-line-height:
 * tree-grid-sort-header-button-background-color:
 * tree-grid-sort-header-button-border:
 * tree-grid-sort-header-button-padding:
 */
export class NbTreeGridComponent extends NbTable {
    constructor(dataSourceBuilder, differs, changeDetectorRef, elementRef, role, dir, document, platform, window, _viewRepeater, _coalescedStyleScheduler, _viewportRuler, _stickyPositioningListener) {
        super(differs, changeDetectorRef, elementRef, role, dir, document, platform, _viewRepeater, _coalescedStyleScheduler, _viewportRuler, _stickyPositioningListener);
        this.dataSourceBuilder = dataSourceBuilder;
        this.window = window;
        this._viewRepeater = _viewRepeater;
        this._coalescedStyleScheduler = _coalescedStyleScheduler;
        this._stickyPositioningListener = _stickyPositioningListener;
        this.destroy$ = new Subject();
        this.levelPadding = '';
        this.equalColumnsWidthValue = false;
        this.treeClass = true;
        this.platform = platform;
    }
    /**
     * The table's data
     * @param data
     * @type {<T>[] | NbTreeGridDataSource}
     */
    set source(data) {
        if (!data) {
            return;
        }
        if (data instanceof NbTreeGridDataSource) {
            this._source = data;
        }
        else {
            this._source = this.dataSourceBuilder.create(data);
        }
        this.dataSource = this._source;
    }
    /**
     * Make all columns equal width. False by default.
     */
    set equalColumnsWidth(value) {
        this.equalColumnsWidthValue = convertToBoolProperty(value);
    }
    get equalColumnsWidth() {
        return this.equalColumnsWidthValue;
    }
    ngAfterViewInit() {
        this.checkDefsCount();
        const rowsChange$ = merge(this._contentRowDefs.changes, this._contentHeaderRowDefs.changes, this._contentFooterRowDefs.changes);
        rowsChange$.pipe(takeUntil(this.destroy$))
            .subscribe(() => this.checkDefsCount());
        if (this.platform.isBrowser) {
            this.updateVisibleColumns();
            const windowResize$ = fromEvent(this.window, 'resize').pipe(debounceTime(50));
            merge(rowsChange$, this._contentColumnDefs.changes, windowResize$)
                .pipe(takeUntil(this.destroy$))
                .subscribe(() => this.updateVisibleColumns());
        }
    }
    ngOnDestroy() {
        super.ngOnDestroy();
        this.destroy$.next();
        this.destroy$.complete();
    }
    toggleRow(row, options) {
        const context = this.getRowContext(row);
        this._source.toggle(context.$implicit.data, options);
    }
    toggleCellRow(cell) {
        const context = this.getCellContext(cell);
        this._source.toggle(context.$implicit.data);
    }
    getColumnWidth() {
        if (this.equalColumnsWidth) {
            return `${100 / this.getColumnsCount()}%`;
        }
        return '';
    }
    getCellLevel(cell, columnName) {
        if (this.isFirstColumn(columnName)) {
            return this.getCellContext(cell).$implicit.level;
        }
        return NB_DEFAULT_ROW_LEVEL;
    }
    getRowContext(row) {
        return this.getContextByRowEl(row.elementRef.nativeElement);
    }
    getCellContext(cell) {
        return this.getContextByCellEl(cell.elementRef.nativeElement);
    }
    getContextByCellEl(cellEl) {
        return this.getContextByRowEl(cellEl.parentElement);
    }
    getContextByRowEl(rowEl) {
        const rowsContainer = this._rowOutlet.viewContainer;
        for (let i = 0; i < rowsContainer.length; i++) {
            const rowViewRef = rowsContainer.get(i);
            if (rowViewRef.rootNodes.includes(rowEl)) {
                return rowViewRef.context;
            }
        }
        return undefined;
    }
    getColumns() {
        let rowDef;
        if (this._contentHeaderRowDefs.length) {
            rowDef = this._contentHeaderRowDefs.first;
        }
        else {
            rowDef = this._contentRowDefs.first;
        }
        return Array.from(rowDef.getVisibleColumns() || []);
    }
    getColumnsCount() {
        return this.getColumns().length;
    }
    isFirstColumn(columnName) {
        return this.getColumns()[0] === columnName;
    }
    checkDefsCount() {
        if (this._contentRowDefs.length > 1) {
            throw new Error(`Found multiple row definitions`);
        }
        if (this._contentHeaderRowDefs.length > 1) {
            throw new Error(`Found multiple header row definitions`);
        }
        if (this._contentFooterRowDefs.length > 1) {
            throw new Error(`Found multiple footer row definitions`);
        }
    }
    updateVisibleColumns() {
        const width = this.window.innerWidth;
        const columnDefs = this._contentColumnDefs;
        const columnsToHide = columnDefs
            .filter((col) => col.shouldHide(width))
            .map(col => col.name);
        const columnsToShow = columnDefs
            .filter((col) => col.shouldShow(width))
            .map(col => col.name);
        if (!columnsToHide.length && !columnsToShow.length) {
            return;
        }
        const rowDefs = [
            this._contentHeaderRowDefs.first,
            this._contentRowDefs.first,
            this._contentFooterRowDefs.first,
        ].filter(d => !!d);
        for (const rowDef of rowDefs) {
            for (const column of columnsToHide) {
                rowDef.hideColumn(column);
            }
            for (const column of columnsToShow) {
                rowDef.showColumn(column);
            }
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbTreeGridComponent, deps: [{ token: i1.NbTreeGridDataSourceBuilder }, { token: i0.IterableDiffers }, { token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: 'role', attribute: true }, { token: i2.NbDirectionality }, { token: NB_DOCUMENT }, { token: i3.NbPlatform }, { token: NB_WINDOW }, { token: NB_VIEW_REPEATER_STRATEGY }, { token: NB_COALESCED_STYLE_SCHEDULER }, { token: i4.NbViewportRulerAdapter }, { token: NB_STICKY_POSITIONING_LISTENER, optional: true, skipSelf: true }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.1.0", type: NbTreeGridComponent, selector: "table[nbTreeGrid]", inputs: { source: ["nbTreeGrid", "source"], levelPadding: "levelPadding", equalColumnsWidth: "equalColumnsWidth" }, host: { properties: { "class.nb-tree-grid": "this.treeClass" } }, providers: [
            { provide: NB_TREE_GRID, useExisting: NbTreeGridComponent },
            NbColumnsService,
            ...NB_TABLE_PROVIDERS,
        ], usesInheritance: true, ngImport: i0, template: "\n  <ng-container nbHeaderRowOutlet></ng-container>\n  <ng-container nbRowOutlet></ng-container>\n  <ng-container nbNoDataRowOutlet></ng-container>\n  <ng-container nbFooterRowOutlet></ng-container>\n", isInline: true, styles: ["/*\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */:host{table-layout:fixed;border-spacing:0;border-collapse:collapse;width:100%;max-width:100%;overflow:auto}::ng-deep .nb-tree-grid-cell,::ng-deep .nb-tree-grid-header-cell,::ng-deep .nb-tree-grid-footer-cell{overflow:hidden}\n"], dependencies: [{ kind: "directive", type: i5.NbDataRowOutletDirective, selector: "[nbRowOutlet]" }, { kind: "directive", type: i5.NbHeaderRowOutletDirective, selector: "[nbHeaderRowOutlet]" }, { kind: "directive", type: i5.NbFooterRowOutletDirective, selector: "[nbFooterRowOutlet]" }, { kind: "directive", type: i5.NbNoDataRowOutletDirective, selector: "[nbNoDataRowOutlet]" }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbTreeGridComponent, decorators: [{
            type: Component,
            args: [{ selector: 'table[nbTreeGrid]', template: NB_TABLE_TEMPLATE, providers: [
                        { provide: NB_TREE_GRID, useExisting: NbTreeGridComponent },
                        NbColumnsService,
                        ...NB_TABLE_PROVIDERS,
                    ], styles: ["/*\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */:host{table-layout:fixed;border-spacing:0;border-collapse:collapse;width:100%;max-width:100%;overflow:auto}::ng-deep .nb-tree-grid-cell,::ng-deep .nb-tree-grid-header-cell,::ng-deep .nb-tree-grid-footer-cell{overflow:hidden}\n"] }]
        }], ctorParameters: () => [{ type: i1.NbTreeGridDataSourceBuilder }, { type: i0.IterableDiffers }, { type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: undefined, decorators: [{
                    type: Attribute,
                    args: ['role']
                }] }, { type: i2.NbDirectionality }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [NB_DOCUMENT]
                }] }, { type: i3.NbPlatform }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [NB_WINDOW]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [NB_VIEW_REPEATER_STRATEGY]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [NB_COALESCED_STYLE_SCHEDULER]
                }] }, { type: i4.NbViewportRulerAdapter }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: SkipSelf
                }, {
                    type: Inject,
                    args: [NB_STICKY_POSITIONING_LISTENER]
                }] }], propDecorators: { source: [{
                type: Input,
                args: ['nbTreeGrid']
            }], levelPadding: [{
                type: Input
            }], equalColumnsWidth: [{
                type: Input
            }], treeClass: [{
                type: HostBinding,
                args: ['class.nb-tree-grid']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1ncmlkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9mcmFtZXdvcmsvdGhlbWUvY29tcG9uZW50cy90cmVlLWdyaWQvdHJlZS1ncmlkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUVMLFNBQVMsRUFFVCxTQUFTLEVBRVQsV0FBVyxFQUNYLE1BQU0sRUFDTixLQUFLLEVBTUwsUUFBUSxFQUNSLFFBQVEsR0FDVCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDakQsT0FBTyxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV6RCxPQUFPLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRzdELE9BQU8sRUFDTCxpQkFBaUIsRUFDakIsT0FBTyxFQUNQLGtCQUFrQixFQUNsQiw0QkFBNEIsRUFDNUIseUJBQXlCLEdBQzFCLE1BQU0sMkJBQTJCLENBQUM7QUFDbkMsT0FBTyxFQUFFLDhCQUE4QixFQUFnQixNQUFNLDRCQUE0QixDQUFDO0FBRTFGLE9BQU8sRUFBRSxvQkFBb0IsRUFBK0IsTUFBTSxxQ0FBcUMsQ0FBQztBQUN4RyxPQUFPLEVBQUUsb0JBQW9CLEVBQThCLE1BQU0sK0JBQStCLENBQUM7QUFFakcsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBRzVELE9BQU8sRUFBRSxxQkFBcUIsRUFBa0IsTUFBTSxZQUFZLENBQUM7QUFPbkUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7Ozs7Ozs7QUFFL0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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OzBCQVNZLFNBQVM7MkJBQUMsTUFBTTs7MEJBRWhCLE1BQU07MkJBQUMsV0FBVzs7MEJBRWxCLE1BQU07MkJBQUMsU0FBUzs7MEJBQ2hCLE1BQU07MkJBQUMseUJBQXlCOzswQkFDaEMsTUFBTTsyQkFBQyw0QkFBNEI7OzBCQUVuQyxRQUFROzswQkFBSSxRQUFROzswQkFBSSxNQUFNOzJCQUFDLDhCQUE4Qjt5Q0FpQmpELE1BQU07c0JBQTlCLEtBQUs7dUJBQUMsWUFBWTtnQkFhVixZQUFZO3NCQUFwQixLQUFLO2dCQU1GLGlCQUFpQjtzQkFEcEIsS0FBSztnQkFVc0MsU0FBUztzQkFBcEQsV0FBVzt1QkFBQyxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBBa3Zlby4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi9cblxuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQXR0cmlidXRlLFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBIb3N0QmluZGluZyxcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgSXRlcmFibGVEaWZmZXJzLFxuICBPbkRlc3Ryb3ksXG4gIFF1ZXJ5TGlzdCxcbiAgRW1iZWRkZWRWaWV3UmVmLFxuICBWaWV3Q29udGFpbmVyUmVmLFxuICBPcHRpb25hbCxcbiAgU2tpcFNlbGYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZnJvbUV2ZW50LCBtZXJnZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGVib3VuY2VUaW1lLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IE5CX0RPQ1VNRU5ULCBOQl9XSU5ET1cgfSBmcm9tICcuLi8uLi90aGVtZS5vcHRpb25zJztcbmltcG9ydCB7IE5iUGxhdGZvcm0gfSBmcm9tICcuLi9jZGsvcGxhdGZvcm0vcGxhdGZvcm0tc2VydmljZSc7XG5pbXBvcnQgeyBOYkRpcmVjdGlvbmFsaXR5IH0gZnJvbSAnLi4vY2RrL2JpZGkvYmlkaS1zZXJ2aWNlJztcbmltcG9ydCB7XG4gIE5CX1RBQkxFX1RFTVBMQVRFLFxuICBOYlRhYmxlLFxuICBOQl9UQUJMRV9QUk9WSURFUlMsXG4gIE5CX0NPQUxFU0NFRF9TVFlMRV9TQ0hFRFVMRVIsXG4gIE5CX1ZJRVdfUkVQRUFURVJfU1RSQVRFR1ksXG59IGZyb20gJy4uL2Nkay90YWJsZS90YWJsZS5tb2R1bGUnO1xuaW1wb3J0IHsgTkJfU1RJQ0tZX1BPU0lUSU9OSU5HX0xJU1RFTkVSLCBOYlJvd0NvbnRleHQgfSBmcm9tICcuLi9jZGsvdGFibGUvdHlwZS1tYXBwaW5ncyc7XG5pbXBvcnQgeyBOYlZpZXdwb3J0UnVsZXJBZGFwdGVyIH0gZnJvbSAnLi4vY2RrL2FkYXB0ZXIvdmlld3BvcnQtcnVsZXItYWRhcHRlcic7XG5pbXBvcnQgeyBOYlRyZWVHcmlkRGF0YVNvdXJjZSwgTmJUcmVlR3JpZERhdGFTb3VyY2VCdWlsZGVyIH0gZnJvbSAnLi9kYXRhLXNvdXJjZS90cmVlLWdyaWQtZGF0YS1zb3VyY2UnO1xuaW1wb3J0IHsgTkJfREVGQVVMVF9ST1dfTEVWRUwsIE5iVHJlZUdyaWRQcmVzZW50YXRpb25Ob2RlIH0gZnJvbSAnLi9kYXRhLXNvdXJjZS90cmVlLWdyaWQubW9kZWwnO1xuaW1wb3J0IHsgTmJUb2dnbGVPcHRpb25zIH0gZnJvbSAnLi9kYXRhLXNvdXJjZS90cmVlLWdyaWQuc2VydmljZSc7XG5pbXBvcnQgeyBOQl9UUkVFX0dSSUQgfSBmcm9tICcuL3RyZWUtZ3JpZC1pbmplY3Rpb24tdG9rZW5zJztcbmltcG9ydCB7IE5iVHJlZUdyaWRSb3dDb21wb25lbnQgfSBmcm9tICcuL3RyZWUtZ3JpZC1yb3cuY29tcG9uZW50JztcbmltcG9ydCB7IE5iVHJlZUdyaWRDZWxsRGlyZWN0aXZlIH0gZnJvbSAnLi90cmVlLWdyaWQtY2VsbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgY29udmVydFRvQm9vbFByb3BlcnR5LCBOYkJvb2xlYW5JbnB1dCB9IGZyb20gJy4uL2hlbHBlcnMnO1xuaW1wb3J0IHsgTmJUcmVlR3JpZENvbHVtbkRlZkRpcmVjdGl2ZSB9IGZyb20gJy4vdHJlZS1ncmlkLWNvbHVtbi1kZWYuZGlyZWN0aXZlJztcbmltcG9ydCB7XG4gIE5iVHJlZUdyaWRGb290ZXJSb3dEZWZEaXJlY3RpdmUsXG4gIE5iVHJlZUdyaWRIZWFkZXJSb3dEZWZEaXJlY3RpdmUsXG4gIE5iVHJlZUdyaWRSb3dEZWZEaXJlY3RpdmUsXG59IGZyb20gJy4vdHJlZS1ncmlkLWRlZi5jb21wb25lbnQnO1xuaW1wb3J0IHsgTmJDb2x1bW5zU2VydmljZSB9IGZyb20gJy4vdHJlZS1ncmlkLWNvbHVtbnMuc2VydmljZSc7XG5cbi8qKlxuICogVHJlZSBncmlkIGNvbXBvbmVudCB0aGF0IGNhbiBiZSB1c2VkIHRvIGRpc3BsYXkgbmVzdGVkIHJvd3Mgb2YgZGF0YS5cbiAqIFN1cHBvcnRzIGZpbHRlcmluZyBhbmQgc29ydGluZy5cbiAqIEBzdGFja2VkLWV4YW1wbGUoU2hvd2Nhc2UsIHRyZWUtZ3JpZC90cmVlLWdyaWQtc2hvd2Nhc2UuY29tcG9uZW50KVxuICpcbiAqICMjIyBJbnN0YWxsYXRpb25cbiAqXG4gKiBJbXBvcnQgYE5iVHJlZUdyaWRNb2R1bGVgIHRvIHlvdXIgZmVhdHVyZSBtb2R1bGUuXG4gKiBgYGB0c1xuICogQE5nTW9kdWxlKHtcbiAqICAgaW1wb3J0czogW1xuICogICAgIC8vIC4uLlxuICogICAgIE5iVHJlZUdyaWRNb2R1bGUsXG4gKiAgIF0sXG4gKiB9KVxuICogZXhwb3J0IGNsYXNzIFBhZ2VNb2R1bGUgeyB9XG4gKiBgYGBcbiAqXG4gKiAjIyMgVXNhZ2VcbiAqXG4gKiBBcyB0aGUgbW9zdCBiYXNpYyB1c2FnZSB5b3UgbmVlZCB0byBkZWZpbmUgW25iVHJlZUdyaWRSb3dEZWZdKGRvY3MvY29tcG9uZW50cy90cmVlZ3JpZC9hcGkjbmJ0cmVlZ3JpZHJvd2RlZmRpcmVjdGl2ZSlcbiAqIHdoZXJlIHlvdSBzaG91bGQgcGFzcyBjb2x1bW5zIHRvIGRpc3BsYXkgaW4gcm93cyBhbmRcbiAqIFtuYlRyZWVHcmlkQ29sdW1uRGVmXShkb2NzL2NvbXBvbmVudHMvdHJlZWdyaWQvYXBpI25idHJlZWdyaWRjb2x1bW5kZWZkaXJlY3RpdmUpIC0gY29tcG9uZW50IGNvbnRhaW5pbmcgY2VsbFxuICogZGVmaW5pdGlvbnMgZm9yIGVhY2ggY29sdW1uIHBhc3NlZCB0byByb3cgZGVmaW5pdGlvbi5cbiAqIEBzdGFja2VkLWV4YW1wbGUoQmFzaWMsIHRyZWUtZ3JpZC90cmVlLWdyaWQtYmFzaWMuY29tcG9uZW50KVxuICpcbiAqIGBOYlRyZWVHcmlkQ29tcG9uZW50YCdzIHNvdXJjZSBpbnB1dCBhbmQgYE5iVHJlZUdyaWREYXRhU291cmNlQnVpbGRlci5jcmVhdGVgIGV4cGVjdGluZyBkYXRhIHRvIGJlIGFuIGFycmF5IG9mXG4gKiBvYmplY3RzIHdpdGggYGRhdGFgLCBgY2hpbGRyZW5gIGFuZCBgZXhwYW5kZWRgIHByb3BlcnRpZXMuIElmIHlvdXIgZGF0YSBkb2Vzbid0IG1hdGNoIHRoaXMgaW50ZXJmYWNlLCB5b3UgY2FuIHBhc3NcbiAqIGdldHRlciBmdW5jdGlvbnMgZm9yIGVhY2ggcHJvcGVydHkgYXMgYXJndW1lbnRzIHRvIGBOYlRyZWVHcmlkRGF0YVNvdXJjZUJ1aWxkZXIuY3JlYXRlYCBtZXRob2QuXG4gKiBAc3RhY2tlZC1leGFtcGxlKEN1c3RvbSBub2RlIHN0cnVjdHVyZSwgdHJlZS1ncmlkL3RyZWUtZ3JpZC1jdXN0b20tbm9kZS1zdHJ1Y3R1cmUuY29tcG9uZW50KVxuICpcbiAqIFRvIHVzZSBzb3J0aW5nIHlvdSBjYW4gYWRkIGBuYlNvcnRgIGRpcmVjdGl2ZSB0byB0YWJsZSBhbmQgc3Vic2NyaWJlIHRvIGBzb3J0YCBtZXRob2QuIFdoZW4gdXNlciBjbGljayBvbiBoZWFkZXIsXG4gKiBzb3J0IGV2ZW50IHdpbGwgYmUgZW1pdHRlZC4gRXZlbnQgb2JqZWN0IGNvbnRhaW4gY2xpY2tlZCBjb2x1bW4gbmFtZSBhbmQgZGVzaXJlZCBzb3J0IGRpcmVjdGlvbi5cbiAqIEBzdGFja2VkLWV4YW1wbGUoU29ydGFibGUsIHRyZWUtZ3JpZC90cmVlLWdyaWQtc29ydGFibGUuY29tcG9uZW50KVxuICpcbiAqIFlvdSBjYW4gdXNlIGBEYXRhIFNvdXJjZSBCdWlsZGVyYCB0byBjcmVhdGUgYE5iVHJlZUdyaWREYXRhU291cmNlYCB3aGljaCB3b3VsZCBoYXZlIHRvZ2dsZSwgc29ydCBhbmRcbiAqIGZpbHRlciBtZXRob2RzLiBUaGVuIHlvdSBjYW4gY2FsbCB0aGlzIG1ldGhvZHMgdG8gY2hhbmdlIHNvcnQgb3IgdG9nZ2xlIHJvd3MgcHJvZ3JhbW1hdGljYWxseS4gQWxzbyBgbmJTb3J0YCBhbmRcbiAqIGBuYkZpbHRlcklucHV0YCBkaXJlY3RpdmVzIGJvdGggc3VwcG9ydCBgTmJUcmVlR3JpZERhdGFTb3VyY2VgLCBzbyB5b3UgY2FuIHBhc3MgaXQgZGlyZWN0bHkgYXMgYW4gaW5wdXQgYW5kXG4gKiBkaXJlY3RpdmVzIHdpbGwgdHJpZ2dlciBzb3J0LCB0b2dnbGUgdGhlbXNlbHZlcy5cbiAqIEBzdGFja2VkLWV4YW1wbGUoRGF0YSBTb3VyY2UgQnVpbGRlciwgdHJlZS1ncmlkL3RyZWUtZ3JpZC1zaG93Y2FzZS5jb21wb25lbnQpXG4gKlxuICogWW91IGNhbiBjcmVhdGUgcmVzcG9uc2l2ZSBncmlkIGJ5IHNldHRpbmcgYGhpZGVPbmAgYW5kIGBzaG93T25gIGlucHV0cyBvZlxuICogW25iVHJlZUdyaWRDb2x1bW5EZWZdKGRvY3MvY29tcG9uZW50cy90cmVlLWdyaWQvYXBpI25idHJlZWdyaWRjb2x1bW5kZWZkaXJlY3RpdmUpIGRpcmVjdGl2ZS5cbiAqIFdoZW4gdmlld3BvcnQgcmVhY2hlcyBzcGVjaWZpZWQgd2lkdGggZ3JpZCBoaWRlcyBvciBzaG93cyBjb2x1bW5zLlxuICogQHN0YWNrZWQtZXhhbXBsZShSZXNwb25zaXZlIGNvbHVtbnMsIHRyZWUtZ3JpZC90cmVlLWdyaWQtcmVzcG9uc2l2ZS5jb21wb25lbnQpXG4gKlxuICogVG8gY3VzdG9taXplIHNvcnQgb3Igcm93IHRvZ2dsZSBpY29ucyB5b3UgY2FuIHVzZSBgbmJTb3J0SGVhZGVySWNvbmAgYW5kIGBuYlRyZWVHcmlkUm93VG9nZ2xlYCBkaXJlY3RpdmVzXG4gKiByZXNwZWN0aXZlbHkuIGBuYlNvcnRIZWFkZXJJY29uYCBpcyBhIHN0cnVjdHVyYWwgZGlyZWN0aXZlIGFuZCBpdCdzIGltcGxpY2l0IGNvbnRleHQgc2V0IHRvIGN1cnJlbnQgZGlyZWN0aW9uLlxuICogQWxzbyBjb250ZXh0IGhhcyB0aHJlZSBwcm9wZXJ0aWVzOiBgaXNBc2NlbmRpbmdgLCBgaXNEZXNjZW5kaW5nYCBhbmQgYGlzTm9uZWAuXG4gKiBAc3RhY2tlZC1leGFtcGxlKEN1c3RvbSBpY29ucywgdHJlZS1ncmlkL3RyZWUtZ3JpZC1jdXN0b20taWNvbnMuY29tcG9uZW50KVxuICpcbiAqIEJ5IGRlZmF1bHQsIHJvdyB0byB0b2dnbGUgaGFwcGVucyB3aGVuIHVzZXIgY2xpY2tzIGFueXdoZXJlIGluIHRoZSByb3cuIEFsc28gZG91YmxlIGNsaWNrIGV4cGFuZHMgcm93IGRlZXBseS5cbiAqIFRvIGRpc2FibGUgdGhpcyB5b3UgY2FuIHNldCBgW2NsaWNrVG9Ub2dnbGVdPVwiZmFsc2VcImAgaW5wdXQgb2YgYG5iVHJlZUdyaWRSb3dgLlxuICogQHN0YWNrZWQtZXhhbXBsZShEaXNhYmxlIGNsaWNrIHRvZ2dsZSwgdHJlZS1ncmlkL3RyZWUtZ3JpZC1kaXNhYmxlLWNsaWNrLXRvZ2dsZS5jb21wb25lbnQpXG4gKlxuICogQHN0eWxlc1xuICpcbiAqIHRyZWUtZ3JpZC1jZWxsLWJvcmRlci13aWR0aDpcbiAqIHRyZWUtZ3JpZC1jZWxsLWJvcmRlci1zdHlsZTpcbiAqIHRyZWUtZ3JpZC1jZWxsLWJvcmRlci1jb2xvcjpcbiAqIHRyZWUtZ3JpZC1yb3ctbWluLWhlaWdodDpcbiAqIHRyZWUtZ3JpZC1jZWxsLXBhZGRpbmc6XG4gKiB0cmVlLWdyaWQtaGVhZGVyLWJhY2tncm91bmQtY29sb3I6XG4gKiB0cmVlLWdyaWQtaGVhZGVyLXRleHQtY29sb3I6XG4gKiB0cmVlLWdyaWQtaGVhZGVyLXRleHQtZm9udC1mYW1pbHk6XG4gKiB0cmVlLWdyaWQtaGVhZGVyLXRleHQtZm9udC1zaXplOlxuICogdHJlZS1ncmlkLWhlYWRlci10ZXh0LWZvbnQtd2VpZ2h0OlxuICogdHJlZS1ncmlkLWhlYWRlci10ZXh0LWxpbmUtaGVpZ2h0OlxuICogdHJlZS1ncmlkLWZvb3Rlci1iYWNrZ3JvdW5kLWNvbG9yOlxuICogdHJlZS1ncmlkLWZvb3Rlci10ZXh0LWNvbG9yOlxuICogdHJlZS1ncmlkLWZvb3Rlci10ZXh0LWZvbnQtZmFtaWx5OlxuICogdHJlZS1ncmlkLWZvb3Rlci10ZXh0LWZvbnQtc2l6ZTpcbiAqIHRyZWUtZ3JpZC1mb290ZXItdGV4dC1mb250LXdlaWdodDpcbiAqIHRyZWUtZ3JpZC1mb290ZXItdGV4dC1saW5lLWhlaWdodDpcbiAqIHRyZWUtZ3JpZC1yb3ctYmFja2dyb3VuZC1jb2xvcjpcbiAqIHRyZWUtZ3JpZC1yb3ctZXZlbi1iYWNrZ3JvdW5kLWNvbG9yOlxuICogdHJlZS1ncmlkLXJvdy1ob3Zlci1iYWNrZ3JvdW5kLWNvbG9yOlxuICogdHJlZS1ncmlkLXJvdy10ZXh0LWNvbG9yOlxuICogdHJlZS1ncmlkLXJvdy10ZXh0LWZvbnQtZmFtaWx5OlxuICogdHJlZS1ncmlkLXJvdy10ZXh0LWZvbnQtc2l6ZTpcbiAqIHRyZWUtZ3JpZC1yb3ctdGV4dC1mb250LXdlaWdodDpcbiAqIHRyZWUtZ3JpZC1yb3ctdGV4dC1saW5lLWhlaWdodDpcbiAqIHRyZWUtZ3JpZC1zb3J0LWhlYWRlci1idXR0b24tYmFja2dyb3VuZC1jb2xvcjpcbiAqIHRyZWUtZ3JpZC1zb3J0LWhlYWRlci1idXR0b24tYm9yZGVyOlxuICogdHJlZS1ncmlkLXNvcnQtaGVhZGVyLWJ1dHRvbi1wYWRkaW5nOlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd0YWJsZVtuYlRyZWVHcmlkXScsXG4gIHRlbXBsYXRlOiBOQl9UQUJMRV9URU1QTEFURSxcbiAgc3R5bGVVcmxzOiBbJy4vdHJlZS1ncmlkLmNvbXBvbmVudC5zY3NzJ10sXG4gIHByb3ZpZGVyczogW1xuICAgIHsgcHJvdmlkZTogTkJfVFJFRV9HUklELCB1c2VFeGlzdGluZzogTmJUcmVlR3JpZENvbXBvbmVudCB9LFxuICAgIE5iQ29sdW1uc1NlcnZpY2UsXG4gICAgLi4uTkJfVEFCTEVfUFJPVklERVJTLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBOYlRyZWVHcmlkQ29tcG9uZW50PFQ+IGV4dGVuZHMgTmJUYWJsZTxOYlRyZWVHcmlkUHJlc2VudGF0aW9uTm9kZTxUPj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRhdGFTb3VyY2VCdWlsZGVyOiBOYlRyZWVHcmlkRGF0YVNvdXJjZUJ1aWxkZXI8VD4sXG4gICAgICAgICAgICAgIGRpZmZlcnM6IEl0ZXJhYmxlRGlmZmVycyxcbiAgICAgICAgICAgICAgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICAgICAgICBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICAgICAgICBAQXR0cmlidXRlKCdyb2xlJykgcm9sZTogc3RyaW5nLFxuICAgICAgICAgICAgICBkaXI6IE5iRGlyZWN0aW9uYWxpdHksXG4gICAgICAgICAgICAgIEBJbmplY3QoTkJfRE9DVU1FTlQpIGRvY3VtZW50LFxuICAgICAgICAgICAgICBwbGF0Zm9ybTogTmJQbGF0Zm9ybSxcbiAgICAgICAgICAgICAgQEluamVjdChOQl9XSU5ET1cpIHByaXZhdGUgd2luZG93LFxuICAgICAgICAgICAgICBASW5qZWN0KE5CX1ZJRVdfUkVQRUFURVJfU1RSQVRFR1kpIHByb3RlY3RlZCByZWFkb25seSBfdmlld1JlcGVhdGVyLFxuICAgICAgICAgICAgICBASW5qZWN0KE5CX0NPQUxFU0NFRF9TVFlMRV9TQ0hFRFVMRVIpIHByb3RlY3RlZCByZWFkb25seSBfY29hbGVzY2VkU3R5bGVTY2hlZHVsZXIsXG4gICAgICAgICAgICAgIF92aWV3cG9ydFJ1bGVyOiBOYlZpZXdwb3J0UnVsZXJBZGFwdGVyLFxuICAgICAgICAgICAgICBAT3B0aW9uYWwoKSBAU2tpcFNlbGYoKSBASW5qZWN0KE5CX1NUSUNLWV9QT1NJVElPTklOR19MSVNURU5FUilcbiAgICAgICAgICAgICAgcHJvdGVjdGVkIHJlYWRvbmx5IF9zdGlja3lQb3NpdGlvbmluZ0xpc3RlbmVyLFxuICApIHtcbiAgICBzdXBlcihkaWZmZXJzLCBjaGFuZ2VEZXRlY3RvclJlZiwgZWxlbWVudFJlZiwgcm9sZSwgZGlyLCBkb2N1bWVudCwgcGxhdGZvcm0sIF92aWV3UmVwZWF0ZXIsXG4gICAgICAgICAgX2NvYWxlc2NlZFN0eWxlU2NoZWR1bGVyLCBfdmlld3BvcnRSdWxlciwgX3N0aWNreVBvc2l0aW9uaW5nTGlzdGVuZXIpO1xuICAgIHRoaXMucGxhdGZvcm0gPSBwbGF0Zm9ybTtcbiAgfVxuXG4gIHByaXZhdGUgZGVzdHJveSQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuICBwcml2YXRlIF9zb3VyY2U6IE5iVHJlZUdyaWREYXRhU291cmNlPFQ+O1xuICBwcml2YXRlIHBsYXRmb3JtOiBOYlBsYXRmb3JtO1xuXG4gIC8qKlxuICAgKiBUaGUgdGFibGUncyBkYXRhXG4gICAqIEBwYXJhbSBkYXRhXG4gICAqIEB0eXBlIHs8VD5bXSB8IE5iVHJlZUdyaWREYXRhU291cmNlfVxuICAgKi9cbiAgQElucHV0KCduYlRyZWVHcmlkJykgc2V0IHNvdXJjZShkYXRhOiBUW10gfCBOYlRyZWVHcmlkRGF0YVNvdXJjZTxUPikge1xuICAgIGlmICghZGF0YSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChkYXRhIGluc3RhbmNlb2YgTmJUcmVlR3JpZERhdGFTb3VyY2UpIHtcbiAgICAgIHRoaXMuX3NvdXJjZSA9IGRhdGE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3NvdXJjZSA9IHRoaXMuZGF0YVNvdXJjZUJ1aWxkZXIuY3JlYXRlKGRhdGEpO1xuICAgIH1cbiAgICB0aGlzLmRhdGFTb3VyY2UgPSB0aGlzLl9zb3VyY2U7XG4gIH1cblxuICBASW5wdXQoKSBsZXZlbFBhZGRpbmc6IHN0cmluZyA9ICcnO1xuXG4gIC8qKlxuICAgKiBNYWtlIGFsbCBjb2x1bW5zIGVxdWFsIHdpZHRoLiBGYWxzZSBieSBkZWZhdWx0LlxuICAgKi9cbiAgQElucHV0KClcbiAgc2V0IGVxdWFsQ29sdW1uc1dpZHRoKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5lcXVhbENvbHVtbnNXaWR0aFZhbHVlID0gY29udmVydFRvQm9vbFByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBnZXQgZXF1YWxDb2x1bW5zV2lkdGgoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZXF1YWxDb2x1bW5zV2lkdGhWYWx1ZTtcbiAgfVxuICBwcml2YXRlIGVxdWFsQ29sdW1uc1dpZHRoVmFsdWU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2VxdWFsQ29sdW1uc1dpZHRoOiBOYkJvb2xlYW5JbnB1dDtcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLm5iLXRyZWUtZ3JpZCcpIHJlYWRvbmx5IHRyZWVDbGFzcyA9IHRydWU7XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuY2hlY2tEZWZzQ291bnQoKTtcbiAgICBjb25zdCByb3dzQ2hhbmdlJCA9IG1lcmdlKFxuICAgICAgdGhpcy5fY29udGVudFJvd0RlZnMuY2hhbmdlcyxcbiAgICAgIHRoaXMuX2NvbnRlbnRIZWFkZXJSb3dEZWZzLmNoYW5nZXMsXG4gICAgICB0aGlzLl9jb250ZW50Rm9vdGVyUm93RGVmcy5jaGFuZ2VzLFxuICAgICk7XG4gICAgcm93c0NoYW5nZSQucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuY2hlY2tEZWZzQ291bnQoKSk7XG5cbiAgICBpZiAodGhpcy5wbGF0Zm9ybS5pc0Jyb3dzZXIpIHtcbiAgICAgIHRoaXMudXBkYXRlVmlzaWJsZUNvbHVtbnMoKTtcblxuICAgICAgY29uc3Qgd2luZG93UmVzaXplJCA9IGZyb21FdmVudCh0aGlzLndpbmRvdywgJ3Jlc2l6ZScpLnBpcGUoZGVib3VuY2VUaW1lKDUwKSk7XG4gICAgICBtZXJnZShyb3dzQ2hhbmdlJCwgdGhpcy5fY29udGVudENvbHVtbkRlZnMuY2hhbmdlcywgd2luZG93UmVzaXplJClcbiAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKVxuICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMudXBkYXRlVmlzaWJsZUNvbHVtbnMoKSk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgc3VwZXIubmdPbkRlc3Ryb3koKTtcbiAgICB0aGlzLmRlc3Ryb3kkLm5leHQoKTtcbiAgICB0aGlzLmRlc3Ryb3kkLmNvbXBsZXRlKCk7XG4gIH1cblxuICB0b2dnbGVSb3cocm93OiBOYlRyZWVHcmlkUm93Q29tcG9uZW50LCBvcHRpb25zPzogTmJUb2dnbGVPcHRpb25zKTogdm9pZCB7XG4gICAgY29uc3QgY29udGV4dCA9IHRoaXMuZ2V0Um93Q29udGV4dChyb3cpO1xuICAgIHRoaXMuX3NvdXJjZS50b2dnbGUoY29udGV4dC4kaW1wbGljaXQuZGF0YSwgb3B0aW9ucyk7XG4gIH1cblxuICB0b2dnbGVDZWxsUm93KGNlbGw6IE5iVHJlZUdyaWRDZWxsRGlyZWN0aXZlKTogdm9pZCB7XG4gICAgY29uc3QgY29udGV4dCA9IHRoaXMuZ2V0Q2VsbENvbnRleHQoY2VsbCk7XG4gICAgdGhpcy5fc291cmNlLnRvZ2dsZShjb250ZXh0LiRpbXBsaWNpdC5kYXRhKTtcbiAgfVxuXG4gIGdldENvbHVtbldpZHRoKCk6IHN0cmluZyB7XG4gICAgaWYgKHRoaXMuZXF1YWxDb2x1bW5zV2lkdGgpIHtcbiAgICAgIHJldHVybiBgJHsxMDAgLyB0aGlzLmdldENvbHVtbnNDb3VudCgpfSVgO1xuICAgIH1cbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICBnZXRDZWxsTGV2ZWwoY2VsbDogTmJUcmVlR3JpZENlbGxEaXJlY3RpdmUsIGNvbHVtbk5hbWU6IHN0cmluZyk6IG51bWJlciB7XG4gICAgaWYgKHRoaXMuaXNGaXJzdENvbHVtbihjb2x1bW5OYW1lKSkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0Q2VsbENvbnRleHQoY2VsbCkuJGltcGxpY2l0LmxldmVsO1xuICAgIH1cbiAgICByZXR1cm4gTkJfREVGQVVMVF9ST1dfTEVWRUw7XG4gIH1cblxuICBwcml2YXRlIGdldFJvd0NvbnRleHQocm93OiBOYlRyZWVHcmlkUm93Q29tcG9uZW50KTogTmJSb3dDb250ZXh0PE5iVHJlZUdyaWRQcmVzZW50YXRpb25Ob2RlPFQ+PiB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0Q29udGV4dEJ5Um93RWwocm93LmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG4gIH1cblxuICBwcml2YXRlIGdldENlbGxDb250ZXh0KGNlbGw6IE5iVHJlZUdyaWRDZWxsRGlyZWN0aXZlKTogTmJSb3dDb250ZXh0PE5iVHJlZUdyaWRQcmVzZW50YXRpb25Ob2RlPFQ+PiB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0Q29udGV4dEJ5Q2VsbEVsKGNlbGwuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0Q29udGV4dEJ5Q2VsbEVsKGNlbGxFbDogSFRNTEVsZW1lbnQpOiBOYlJvd0NvbnRleHQ8TmJUcmVlR3JpZFByZXNlbnRhdGlvbk5vZGU8VD4+IHtcbiAgICByZXR1cm4gdGhpcy5nZXRDb250ZXh0QnlSb3dFbChjZWxsRWwucGFyZW50RWxlbWVudCk7XG4gIH1cblxuICBwcml2YXRlIGdldENvbnRleHRCeVJvd0VsKHJvd0VsOiBIVE1MRWxlbWVudCk6IE5iUm93Q29udGV4dDxOYlRyZWVHcmlkUHJlc2VudGF0aW9uTm9kZTxUPj4ge1xuICAgIGNvbnN0IHJvd3NDb250YWluZXI6IFZpZXdDb250YWluZXJSZWYgPSB0aGlzLl9yb3dPdXRsZXQudmlld0NvbnRhaW5lcjtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcm93c0NvbnRhaW5lci5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3Qgcm93Vmlld1JlZiA9IHJvd3NDb250YWluZXIuZ2V0KGkpIGFzIEVtYmVkZGVkVmlld1JlZjxOYlJvd0NvbnRleHQ8TmJUcmVlR3JpZFByZXNlbnRhdGlvbk5vZGU8VD4+PjtcblxuICAgICAgaWYgKHJvd1ZpZXdSZWYucm9vdE5vZGVzLmluY2x1ZGVzKHJvd0VsKSkge1xuICAgICAgICByZXR1cm4gcm93Vmlld1JlZi5jb250ZXh0O1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBwcml2YXRlIGdldENvbHVtbnMoKTogc3RyaW5nW10ge1xuICAgIGxldCByb3dEZWY6IE5iVHJlZUdyaWRIZWFkZXJSb3dEZWZEaXJlY3RpdmUgfCBOYlRyZWVHcmlkUm93RGVmRGlyZWN0aXZlPGFueT47XG5cbiAgICBpZiAodGhpcy5fY29udGVudEhlYWRlclJvd0RlZnMubGVuZ3RoKSB7XG4gICAgICByb3dEZWYgPSB0aGlzLl9jb250ZW50SGVhZGVyUm93RGVmcy5maXJzdCBhcyBOYlRyZWVHcmlkSGVhZGVyUm93RGVmRGlyZWN0aXZlO1xuICAgIH0gZWxzZSB7XG4gICAgICByb3dEZWYgPSB0aGlzLl9jb250ZW50Um93RGVmcy5maXJzdCBhcyBOYlRyZWVHcmlkUm93RGVmRGlyZWN0aXZlPGFueT47XG4gICAgfVxuXG4gICAgcmV0dXJuIEFycmF5LmZyb20ocm93RGVmLmdldFZpc2libGVDb2x1bW5zKCkgfHwgW10pO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRDb2x1bW5zQ291bnQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5nZXRDb2x1bW5zKCkubGVuZ3RoO1xuICB9XG5cbiAgcHJpdmF0ZSBpc0ZpcnN0Q29sdW1uKGNvbHVtbk5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmdldENvbHVtbnMoKVswXSA9PT0gY29sdW1uTmFtZTtcbiAgfVxuXG4gIHByaXZhdGUgY2hlY2tEZWZzQ291bnQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2NvbnRlbnRSb3dEZWZzLmxlbmd0aCA+IDEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgRm91bmQgbXVsdGlwbGUgcm93IGRlZmluaXRpb25zYCk7XG4gICAgfVxuICAgIGlmICh0aGlzLl9jb250ZW50SGVhZGVyUm93RGVmcy5sZW5ndGggPiAxKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEZvdW5kIG11bHRpcGxlIGhlYWRlciByb3cgZGVmaW5pdGlvbnNgKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuX2NvbnRlbnRGb290ZXJSb3dEZWZzLmxlbmd0aCA+IDEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgRm91bmQgbXVsdGlwbGUgZm9vdGVyIHJvdyBkZWZpbml0aW9uc2ApO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlVmlzaWJsZUNvbHVtbnMoKTogdm9pZCB7XG4gICAgY29uc3Qgd2lkdGggPSB0aGlzLndpbmRvdy5pbm5lcldpZHRoO1xuICAgIGNvbnN0IGNvbHVtbkRlZnMgPSAodGhpcy5fY29udGVudENvbHVtbkRlZnMgYXMgUXVlcnlMaXN0PE5iVHJlZUdyaWRDb2x1bW5EZWZEaXJlY3RpdmU+KTtcblxuICAgIGNvbnN0IGNvbHVtbnNUb0hpZGU6IHN0cmluZ1tdID0gY29sdW1uRGVmc1xuICAgICAgLmZpbHRlcigoY29sOiBOYlRyZWVHcmlkQ29sdW1uRGVmRGlyZWN0aXZlKSA9PiBjb2wuc2hvdWxkSGlkZSh3aWR0aCkpXG4gICAgICAubWFwKGNvbCA9PiBjb2wubmFtZSk7XG5cbiAgICBjb25zdCBjb2x1bW5zVG9TaG93OiBzdHJpbmdbXSA9IGNvbHVtbkRlZnNcbiAgICAgIC5maWx0ZXIoKGNvbDogTmJUcmVlR3JpZENvbHVtbkRlZkRpcmVjdGl2ZSkgPT4gY29sLnNob3VsZFNob3cod2lkdGgpKVxuICAgICAgLm1hcChjb2wgPT4gY29sLm5hbWUpO1xuXG4gICAgaWYgKCFjb2x1bW5zVG9IaWRlLmxlbmd0aCAmJiAhY29sdW1uc1RvU2hvdy5sZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCByb3dEZWZzID0gW1xuICAgICAgdGhpcy5fY29udGVudEhlYWRlclJvd0RlZnMuZmlyc3QgYXMgTmJUcmVlR3JpZEhlYWRlclJvd0RlZkRpcmVjdGl2ZSxcbiAgICAgIHRoaXMuX2NvbnRlbnRSb3dEZWZzLmZpcnN0IGFzIE5iVHJlZUdyaWRSb3dEZWZEaXJlY3RpdmU8YW55PixcbiAgICAgIHRoaXMuX2NvbnRlbnRGb290ZXJSb3dEZWZzLmZpcnN0IGFzIE5iVHJlZUdyaWRGb290ZXJSb3dEZWZEaXJlY3RpdmUsXG4gICAgXS5maWx0ZXIoZCA9PiAhIWQpO1xuXG4gICAgZm9yIChjb25zdCByb3dEZWYgb2Ygcm93RGVmcykge1xuICAgICAgZm9yIChjb25zdCBjb2x1bW4gb2YgY29sdW1uc1RvSGlkZSkge1xuICAgICAgICByb3dEZWYuaGlkZUNvbHVtbihjb2x1bW4pO1xuICAgICAgfVxuXG4gICAgICBmb3IgKGNvbnN0IGNvbHVtbiBvZiBjb2x1bW5zVG9TaG93KSB7XG4gICAgICAgIHJvd0RlZi5zaG93Q29sdW1uKGNvbHVtbik7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=