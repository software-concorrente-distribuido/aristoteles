/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';
import { share } from 'rxjs/operators';
import { isFragmentContain, isFragmentEqual, isUrlPathContain, isUrlPathEqual } from './url-matching-helpers';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
const itemClick$ = new Subject();
const addItems$ = new ReplaySubject(1);
const navigateHome$ = new ReplaySubject(1);
const getSelectedItem$ = new ReplaySubject(1);
const itemSelect$ = new ReplaySubject(1);
const itemHover$ = new ReplaySubject(1);
const submenuToggle$ = new ReplaySubject(1);
const collapseAll$ = new ReplaySubject(1);
// TODO: check if we need both URL and LINK
/**
 *
 *
 * Menu Item options example
 * @stacked-example(Menu Link Parameters, menu/menu-link-params.component)
 *
 *
 */
export class NbMenuItem {
    constructor() {
        /**
         * Item is selected when partly or fully equal to the current url
         * @type {string}
         */
        this.pathMatch = 'full';
    }
    /**
     * @returns item parents in top-down order
     */
    static getParents(item) {
        const parents = [];
        let parent = item.parent;
        while (parent) {
            parents.unshift(parent);
            parent = parent.parent;
        }
        return parents;
    }
    static isParent(item, possibleChild) {
        return possibleChild.parent ? possibleChild.parent === item || this.isParent(item, possibleChild.parent) : false;
    }
}
// TODO: map select events to router change events
// TODO: review the interface
/**
 *
 *
 * Menu Service. Allows you to listen to menu events, or to interact with a menu.
 * @stacked-example(Menu Service, menu/menu-service.component)
 *
 *
 */
export class NbMenuService {
    /**
     * Add items to the end of the menu items list
     * @param {List<NbMenuItem>} items
     * @param {string} tag
     */
    addItems(items, tag) {
        addItems$.next({ tag, items });
    }
    /**
     * Collapses all menu items
     * @param {string} tag
     */
    collapseAll(tag) {
        collapseAll$.next({ tag });
    }
    /**
     * Navigate to the home menu item
     * @param {string} tag
     */
    navigateHome(tag) {
        navigateHome$.next({ tag });
    }
    /**
     * Returns currently selected item. Won't subscribe to the future events.
     * @param {string} tag
     * @returns {Observable<{tag: string; item: NbMenuItem}>}
     */
    getSelectedItem(tag) {
        const listener = new BehaviorSubject(null);
        getSelectedItem$.next({ tag, listener });
        return listener.asObservable();
    }
    onItemClick() {
        return itemClick$.pipe(share());
    }
    onItemSelect() {
        return itemSelect$.pipe(share());
    }
    onItemHover() {
        return itemHover$.pipe(share());
    }
    onSubmenuToggle() {
        return submenuToggle$.pipe(share());
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbMenuService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbMenuService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbMenuService, decorators: [{
            type: Injectable
        }] });
export class NbMenuInternalService {
    constructor(location) {
        this.location = location;
    }
    prepareItems(items) {
        const defaultItem = new NbMenuItem();
        items.forEach((i) => {
            this.applyDefaults(i, defaultItem);
            this.setParent(i);
        });
    }
    selectFromUrl(items, tag, collapseOther = false) {
        const selectedItem = this.findItemByUrl(items);
        if (selectedItem) {
            this.selectItem(selectedItem, items, collapseOther, tag);
        }
    }
    selectItem(item, items, collapseOther = false, tag) {
        const unselectedItems = this.resetSelection(items);
        const collapsedItems = collapseOther ? this.collapseItems(items) : [];
        for (const parent of NbMenuItem.getParents(item)) {
            parent.selected = true;
            // emit event only for items that weren't selected before ('unselectedItems' contains items that were selected)
            if (!unselectedItems.includes(parent)) {
                this.itemSelect(parent, tag);
            }
            const wasNotExpanded = !parent.expanded;
            parent.expanded = true;
            const i = collapsedItems.indexOf(parent);
            // emit event only for items that weren't expanded before.
            // 'collapsedItems' contains items that were expanded, so no need to emit event.
            // in case 'collapseOther' is false, 'collapsedItems' will be empty,
            // so also check if item isn't expanded already ('wasNotExpanded').
            if (i === -1 && wasNotExpanded) {
                this.submenuToggle(parent, tag);
            }
            else {
                collapsedItems.splice(i, 1);
            }
        }
        item.selected = true;
        // emit event only for items that weren't selected before ('unselectedItems' contains items that were selected)
        if (!unselectedItems.includes(item)) {
            this.itemSelect(item, tag);
        }
        // remaining items which wasn't expanded back after expanding all currently selected items
        for (const collapsedItem of collapsedItems) {
            this.submenuToggle(collapsedItem, tag);
        }
    }
    collapseAll(items, tag, except) {
        const collapsedItems = this.collapseItems(items, except);
        for (const item of collapsedItems) {
            this.submenuToggle(item, tag);
        }
    }
    onAddItem() {
        return addItems$.pipe(share());
    }
    onNavigateHome() {
        return navigateHome$.pipe(share());
    }
    onCollapseAll() {
        return collapseAll$.pipe(share());
    }
    onGetSelectedItem() {
        return getSelectedItem$.pipe(share());
    }
    itemHover(item, tag) {
        itemHover$.next({ tag, item });
    }
    submenuToggle(item, tag) {
        submenuToggle$.next({ tag, item });
    }
    itemSelect(item, tag) {
        itemSelect$.next({ tag, item });
    }
    itemClick(item, tag) {
        itemClick$.next({ tag, item });
    }
    /**
     * Unselect all given items deeply.
     * @param items array of items to unselect.
     * @returns items which selected value was changed.
     */
    resetSelection(items) {
        const unselectedItems = [];
        for (const item of items) {
            if (item.selected) {
                unselectedItems.push(item);
            }
            item.selected = false;
            if (item.children) {
                unselectedItems.push(...this.resetSelection(item.children));
            }
        }
        return unselectedItems;
    }
    /**
     * Collapse all given items deeply.
     * @param items array of items to collapse.
     * @param except menu item which shouldn't be collapsed, also disables collapsing for parents of this item.
     * @returns items which expanded value was changed.
     */
    collapseItems(items, except) {
        const collapsedItems = [];
        for (const item of items) {
            if (except && (item === except || NbMenuItem.isParent(item, except))) {
                continue;
            }
            if (item.expanded) {
                collapsedItems.push(item);
            }
            item.expanded = false;
            if (item.children) {
                collapsedItems.push(...this.collapseItems(item.children));
            }
        }
        return collapsedItems;
    }
    applyDefaults(item, defaultItem) {
        const menuItem = { ...item };
        Object.assign(item, defaultItem, menuItem);
        item.children &&
            item.children.forEach((child) => {
                this.applyDefaults(child, defaultItem);
            });
    }
    setParent(item) {
        item.children &&
            item.children.forEach((child) => {
                child.parent = item;
                this.setParent(child);
            });
    }
    /**
     * Find deepest item which link matches current URL path.
     * @param items array of items to search in.
     * @returns found item of undefined.
     */
    findItemByUrl(items) {
        let selectedItem;
        items.some((item) => {
            if (item.children) {
                selectedItem = this.findItemByUrl(item.children);
            }
            if (!selectedItem && this.isSelectedInUrl(item)) {
                selectedItem = item;
            }
            return selectedItem;
        });
        return selectedItem;
    }
    isSelectedInUrl(item) {
        const exact = item.pathMatch === 'full';
        const link = item.link;
        const isSelectedInPath = exact
            ? isUrlPathEqual(this.location.path(), link)
            : isUrlPathContain(this.location.path(), link);
        if (isSelectedInPath && item.fragment != null) {
            return exact
                ? isFragmentEqual(this.location.path(true), item.fragment)
                : isFragmentContain(this.location.path(true), item.fragment);
        }
        return isSelectedInPath;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbMenuInternalService, deps: [{ token: i1.Location }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbMenuInternalService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbMenuInternalService, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: i1.Location }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2ZyYW1ld29yay90aGVtZS9jb21wb25lbnRzL21lbnUvbWVudS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzNDLE9BQU8sRUFBYyxlQUFlLEVBQUUsYUFBYSxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMzRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDdkMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLGVBQWUsRUFBRSxnQkFBZ0IsRUFBRSxjQUFjLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQzs7O0FBUzlHLE1BQU0sVUFBVSxHQUFHLElBQUksT0FBTyxFQUFhLENBQUM7QUFDNUMsTUFBTSxTQUFTLEdBQUcsSUFBSSxhQUFhLENBQXVDLENBQUMsQ0FBQyxDQUFDO0FBQzdFLE1BQU0sYUFBYSxHQUFHLElBQUksYUFBYSxDQUFrQixDQUFDLENBQUMsQ0FBQztBQUM1RCxNQUFNLGdCQUFnQixHQUFHLElBQUksYUFBYSxDQUF3RCxDQUFDLENBQUMsQ0FBQztBQUNyRyxNQUFNLFdBQVcsR0FBRyxJQUFJLGFBQWEsQ0FBWSxDQUFDLENBQUMsQ0FBQztBQUNwRCxNQUFNLFVBQVUsR0FBRyxJQUFJLGFBQWEsQ0FBWSxDQUFDLENBQUMsQ0FBQztBQUNuRCxNQUFNLGNBQWMsR0FBRyxJQUFJLGFBQWEsQ0FBWSxDQUFDLENBQUMsQ0FBQztBQUN2RCxNQUFNLFlBQVksR0FBRyxJQUFJLGFBQWEsQ0FBa0IsQ0FBQyxDQUFDLENBQUM7QUFJM0QsMkNBQTJDO0FBQzNDOzs7Ozs7O0dBT0c7QUFDSCxNQUFNLE9BQU8sVUFBVTtJQUF2QjtRQThDRTs7O1dBR0c7UUFDSCxjQUFTLEdBQXVCLE1BQU0sQ0FBQztJQWdEekMs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LENBQUMsQ0FBQztRQUNqRSxDQUFDO1FBRUQsT0FBTyxnQkFBZ0IsQ0FBQztJQUMxQixDQUFDOzhHQXRNVSxxQkFBcUI7a0hBQXJCLHFCQUFxQjs7MkZBQXJCLHFCQUFxQjtrQkFEakMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBBa3Zlby4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTG9jYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUGFyYW1zLCBRdWVyeVBhcmFtc0hhbmRsaW5nIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IE9ic2VydmFibGUsIEJlaGF2aW9yU3ViamVjdCwgUmVwbGF5U3ViamVjdCwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgc2hhcmUgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBpc0ZyYWdtZW50Q29udGFpbiwgaXNGcmFnbWVudEVxdWFsLCBpc1VybFBhdGhDb250YWluLCBpc1VybFBhdGhFcXVhbCB9IGZyb20gJy4vdXJsLW1hdGNoaW5nLWhlbHBlcnMnO1xuaW1wb3J0IHsgTmJJY29uQ29uZmlnIH0gZnJvbSAnLi4vaWNvbi9pY29uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOYkJhZGdlIH0gZnJvbSAnLi4vYmFkZ2UvYmFkZ2UuY29tcG9uZW50JztcblxuZXhwb3J0IGludGVyZmFjZSBOYk1lbnVCYWcge1xuICB0YWc6IHN0cmluZztcbiAgaXRlbTogTmJNZW51SXRlbTtcbn1cblxuY29uc3QgaXRlbUNsaWNrJCA9IG5ldyBTdWJqZWN0PE5iTWVudUJhZz4oKTtcbmNvbnN0IGFkZEl0ZW1zJCA9IG5ldyBSZXBsYXlTdWJqZWN0PHsgdGFnOiBzdHJpbmc7IGl0ZW1zOiBOYk1lbnVJdGVtW10gfT4oMSk7XG5jb25zdCBuYXZpZ2F0ZUhvbWUkID0gbmV3IFJlcGxheVN1YmplY3Q8eyB0YWc6IHN0cmluZyB9PigxKTtcbmNvbnN0IGdldFNlbGVjdGVkSXRlbSQgPSBuZXcgUmVwbGF5U3ViamVjdDx7IHRhZzogc3RyaW5nOyBsaXN0ZW5lcjogQmVoYXZpb3JTdWJqZWN0PE5iTWVudUJhZz4gfT4oMSk7XG5jb25zdCBpdGVtU2VsZWN0JCA9IG5ldyBSZXBsYXlTdWJqZWN0PE5iTWVudUJhZz4oMSk7XG5jb25zdCBpdGVtSG92ZXIkID0gbmV3IFJlcGxheVN1YmplY3Q8TmJNZW51QmFnPigxKTtcbmNvbnN0IHN1Ym1lbnVUb2dnbGUkID0gbmV3IFJlcGxheVN1YmplY3Q8TmJNZW51QmFnPigxKTtcbmNvbnN0IGNvbGxhcHNlQWxsJCA9IG5ldyBSZXBsYXlTdWJqZWN0PHsgdGFnOiBzdHJpbmcgfT4oMSk7XG5cbmV4cG9ydCB0eXBlIE5iTWVudUJhZGdlQ29uZmlnID0gT21pdDxOYkJhZGdlLCAncG9zaXRpb24nPjtcblxuLy8gVE9ETzogY2hlY2sgaWYgd2UgbmVlZCBib3RoIFVSTCBhbmQgTElOS1xuLyoqXG4gKlxuICpcbiAqIE1lbnUgSXRlbSBvcHRpb25zIGV4YW1wbGVcbiAqIEBzdGFja2VkLWV4YW1wbGUoTWVudSBMaW5rIFBhcmFtZXRlcnMsIG1lbnUvbWVudS1saW5rLXBhcmFtcy5jb21wb25lbnQpXG4gKlxuICpcbiAqL1xuZXhwb3J0IGNsYXNzIE5iTWVudUl0ZW0ge1xuICAvKipcbiAgICogSXRlbSBUaXRsZVxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKi9cbiAgdGl0bGU6IHN0cmluZztcbiAgLyoqXG4gICAqIEl0ZW0gcmVsYXRpdmUgbGluayAoZm9yIHJvdXRlckxpbmspXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqL1xuICBsaW5rPzogc3RyaW5nO1xuICAvKipcbiAgICogSXRlbSBVUkwgKGFic29sdXRlKVxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKi9cbiAgdXJsPzogc3RyaW5nO1xuICAvKipcbiAgICogSWNvbiBjbGFzcyBuYW1lIG9yIGljb24gY29uZmlnIG9iamVjdFxuICAgKiBAdHlwZSB7c3RyaW5nIHwgTmJJY29uQ29uZmlnfVxuICAgKi9cbiAgaWNvbj86IHN0cmluZyB8IE5iSWNvbkNvbmZpZztcbiAgLyoqXG4gICAqIEV4cGFuZGVkIGJ5IGRlZmF1bHRcbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqL1xuICBleHBhbmRlZD86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBCYWRnZSBjb21wb25lbnRcbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqL1xuICBiYWRnZT86IE5iTWVudUJhZGdlQ29uZmlnO1xuICAvKipcbiAgICogQ2hpbGRyZW4gaXRlbXNcbiAgICogQHR5cGUge0xpc3Q8TmJNZW51SXRlbT59XG4gICAqL1xuICBjaGlsZHJlbj86IE5iTWVudUl0ZW1bXTtcbiAgLyoqXG4gICAqIEhUTUwgTGluayB0YXJnZXRcbiAgICogQHR5cGUge3N0cmluZ31cbiAgICovXG4gIHRhcmdldD86IHN0cmluZztcbiAgLyoqXG4gICAqIEhpZGRlbiBJdGVtXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKi9cbiAgaGlkZGVuPzogYm9vbGVhbjtcbiAgLyoqXG4gICAqIEl0ZW0gaXMgc2VsZWN0ZWQgd2hlbiBwYXJ0bHkgb3IgZnVsbHkgZXF1YWwgdG8gdGhlIGN1cnJlbnQgdXJsXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqL1xuICBwYXRoTWF0Y2g/OiAnZnVsbCcgfCAncHJlZml4JyA9ICdmdWxsJztcbiAgLyoqXG4gICAqIFdoZXJlIHRoaXMgaXMgYSBob21lIGl0ZW1cbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqL1xuICBob21lPzogYm9vbGVhbjtcbiAgLyoqXG4gICAqIFdoZXRoZXIgdGhlIGl0ZW0gaXMganVzdCBhIGdyb3VwIChub24tY2xpY2thYmxlKVxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICovXG4gIGdyb3VwPzogYm9vbGVhbjtcbiAgLyoqIFdoZXRoZXIgdGhlIGl0ZW0gc2tpcExvY2F0aW9uQ2hhbmdlIGlzIHRydWUgb3IgZmFsc2VcbiAgICpAdHlwZSB7Ym9vbGVhbn1cbiAgICovXG4gIHNraXBMb2NhdGlvbkNoYW5nZT86IGJvb2xlYW47XG4gIC8qKiBNYXAgb2YgcXVlcnkgcGFyYW1ldGVyc1xuICAgKkB0eXBlIHtQYXJhbXN9XG4gICAqL1xuICBxdWVyeVBhcmFtcz86IFBhcmFtcztcbiAgcXVlcnlQYXJhbXNIYW5kbGluZz86IFF1ZXJ5UGFyYW1zSGFuZGxpbmc7XG4gIHBhcmVudD86IE5iTWVudUl0ZW07XG4gIHNlbGVjdGVkPzogYm9vbGVhbjtcbiAgZGF0YT86IGFueTtcbiAgZnJhZ21lbnQ/OiBzdHJpbmc7XG4gIHByZXNlcnZlRnJhZ21lbnQ/OiBib29sZWFuO1xuICAvKiogVGhlIG5hbWUgb2YgYSByb2xlIGluIHRoZSBBUklBIHNwZWNpZmljYXRpb25cbiAgICogQHR5cGUge3N0cmluZ31cbiAgICovXG4gIGFyaWFSb2xlPzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBAcmV0dXJucyBpdGVtIHBhcmVudHMgaW4gdG9wLWRvd24gb3JkZXJcbiAgICovXG4gIHN0YXRpYyBnZXRQYXJlbnRzKGl0ZW06IE5iTWVudUl0ZW0pOiBOYk1lbnVJdGVtW10ge1xuICAgIGNvbnN0IHBhcmVudHMgPSBbXTtcblxuICAgIGxldCBwYXJlbnQgPSBpdGVtLnBhcmVudDtcbiAgICB3aGlsZSAocGFyZW50KSB7XG4gICAgICBwYXJlbnRzLnVuc2hpZnQocGFyZW50KTtcbiAgICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBhcmVudHM7XG4gIH1cblxuICBzdGF0aWMgaXNQYXJlbnQoaXRlbTogTmJNZW51SXRlbSwgcG9zc2libGVDaGlsZDogTmJNZW51SXRlbSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBwb3NzaWJsZUNoaWxkLnBhcmVudCA/IHBvc3NpYmxlQ2hpbGQucGFyZW50ID09PSBpdGVtIHx8IHRoaXMuaXNQYXJlbnQoaXRlbSwgcG9zc2libGVDaGlsZC5wYXJlbnQpIDogZmFsc2U7XG4gIH1cbn1cblxuLy8gVE9ETzogbWFwIHNlbGVjdCBldmVudHMgdG8gcm91dGVyIGNoYW5nZSBldmVudHNcbi8vIFRPRE86IHJldmlldyB0aGUgaW50ZXJmYWNlXG4vKipcbiAqXG4gKlxuICogTWVudSBTZXJ2aWNlLiBBbGxvd3MgeW91IHRvIGxpc3RlbiB0byBtZW51IGV2ZW50cywgb3IgdG8gaW50ZXJhY3Qgd2l0aCBhIG1lbnUuXG4gKiBAc3RhY2tlZC1leGFtcGxlKE1lbnUgU2VydmljZSwgbWVudS9tZW51LXNlcnZpY2UuY29tcG9uZW50KVxuICpcbiAqXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBOYk1lbnVTZXJ2aWNlIHtcbiAgLyoqXG4gICAqIEFkZCBpdGVtcyB0byB0aGUgZW5kIG9mIHRoZSBtZW51IGl0ZW1zIGxpc3RcbiAgICogQHBhcmFtIHtMaXN0PE5iTWVudUl0ZW0+fSBpdGVtc1xuICAgKiBAcGFyYW0ge3N0cmluZ30gdGFnXG4gICAqL1xuICBhZGRJdGVtcyhpdGVtczogTmJNZW51SXRlbVtdLCB0YWc/OiBzdHJpbmcpIHtcbiAgICBhZGRJdGVtcyQubmV4dCh7IHRhZywgaXRlbXMgfSk7XG4gIH1cblxuICAvKipcbiAgICogQ29sbGFwc2VzIGFsbCBtZW51IGl0ZW1zXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0YWdcbiAgICovXG4gIGNvbGxhcHNlQWxsKHRhZz86IHN0cmluZykge1xuICAgIGNvbGxhcHNlQWxsJC5uZXh0KHsgdGFnIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIE5hdmlnYXRlIHRvIHRoZSBob21lIG1lbnUgaXRlbVxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGFnXG4gICAqL1xuICBuYXZpZ2F0ZUhvbWUodGFnPzogc3RyaW5nKSB7XG4gICAgbmF2aWdhdGVIb21lJC5uZXh0KHsgdGFnIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgY3VycmVudGx5IHNlbGVjdGVkIGl0ZW0uIFdvbid0IHN1YnNjcmliZSB0byB0aGUgZnV0dXJlIGV2ZW50cy5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHRhZ1xuICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTx7dGFnOiBzdHJpbmc7IGl0ZW06IE5iTWVudUl0ZW19Pn1cbiAgICovXG4gIGdldFNlbGVjdGVkSXRlbSh0YWc/OiBzdHJpbmcpOiBPYnNlcnZhYmxlPE5iTWVudUJhZz4ge1xuICAgIGNvbnN0IGxpc3RlbmVyID0gbmV3IEJlaGF2aW9yU3ViamVjdDxOYk1lbnVCYWc+KG51bGwpO1xuXG4gICAgZ2V0U2VsZWN0ZWRJdGVtJC5uZXh0KHsgdGFnLCBsaXN0ZW5lciB9KTtcblxuICAgIHJldHVybiBsaXN0ZW5lci5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIG9uSXRlbUNsaWNrKCk6IE9ic2VydmFibGU8TmJNZW51QmFnPiB7XG4gICAgcmV0dXJuIGl0ZW1DbGljayQucGlwZShzaGFyZSgpKTtcbiAgfVxuXG4gIG9uSXRlbVNlbGVjdCgpOiBPYnNlcnZhYmxlPE5iTWVudUJhZz4ge1xuICAgIHJldHVybiBpdGVtU2VsZWN0JC5waXBlKHNoYXJlKCkpO1xuICB9XG5cbiAgb25JdGVtSG92ZXIoKTogT2JzZXJ2YWJsZTxOYk1lbnVCYWc+IHtcbiAgICByZXR1cm4gaXRlbUhvdmVyJC5waXBlKHNoYXJlKCkpO1xuICB9XG5cbiAgb25TdWJtZW51VG9nZ2xlKCk6IE9ic2VydmFibGU8TmJNZW51QmFnPiB7XG4gICAgcmV0dXJuIHN1Ym1lbnVUb2dnbGUkLnBpcGUoc2hhcmUoKSk7XG4gIH1cbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE5iTWVudUludGVybmFsU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbG9jYXRpb246IExvY2F0aW9uKSB7fVxuXG4gIHByZXBhcmVJdGVtcyhpdGVtczogTmJNZW51SXRlbVtdKSB7XG4gICAgY29uc3QgZGVmYXVsdEl0ZW0gPSBuZXcgTmJNZW51SXRlbSgpO1xuICAgIGl0ZW1zLmZvckVhY2goKGkpID0+IHtcbiAgICAgIHRoaXMuYXBwbHlEZWZhdWx0cyhpLCBkZWZhdWx0SXRlbSk7XG4gICAgICB0aGlzLnNldFBhcmVudChpKTtcbiAgICB9KTtcbiAgfVxuXG4gIHNlbGVjdEZyb21VcmwoaXRlbXM6IE5iTWVudUl0ZW1bXSwgdGFnOiBzdHJpbmcsIGNvbGxhcHNlT3RoZXI6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgIGNvbnN0IHNlbGVjdGVkSXRlbSA9IHRoaXMuZmluZEl0ZW1CeVVybChpdGVtcyk7XG4gICAgaWYgKHNlbGVjdGVkSXRlbSkge1xuICAgICAgdGhpcy5zZWxlY3RJdGVtKHNlbGVjdGVkSXRlbSwgaXRlbXMsIGNvbGxhcHNlT3RoZXIsIHRhZyk7XG4gICAgfVxuICB9XG5cbiAgc2VsZWN0SXRlbShpdGVtOiBOYk1lbnVJdGVtLCBpdGVtczogTmJNZW51SXRlbVtdLCBjb2xsYXBzZU90aGVyOiBib29sZWFuID0gZmFsc2UsIHRhZzogc3RyaW5nKSB7XG4gICAgY29uc3QgdW5zZWxlY3RlZEl0ZW1zID0gdGhpcy5yZXNldFNlbGVjdGlvbihpdGVtcyk7XG4gICAgY29uc3QgY29sbGFwc2VkSXRlbXMgPSBjb2xsYXBzZU90aGVyID8gdGhpcy5jb2xsYXBzZUl0ZW1zKGl0ZW1zKSA6IFtdO1xuXG4gICAgZm9yIChjb25zdCBwYXJlbnQgb2YgTmJNZW51SXRlbS5nZXRQYXJlbnRzKGl0ZW0pKSB7XG4gICAgICBwYXJlbnQuc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgLy8gZW1pdCBldmVudCBvbmx5IGZvciBpdGVtcyB0aGF0IHdlcmVuJ3Qgc2VsZWN0ZWQgYmVmb3JlICgndW5zZWxlY3RlZEl0ZW1zJyBjb250YWlucyBpdGVtcyB0aGF0IHdlcmUgc2VsZWN0ZWQpXG4gICAgICBpZiAoIXVuc2VsZWN0ZWRJdGVtcy5pbmNsdWRlcyhwYXJlbnQpKSB7XG4gICAgICAgIHRoaXMuaXRlbVNlbGVjdChwYXJlbnQsIHRhZyk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHdhc05vdEV4cGFuZGVkID0gIXBhcmVudC5leHBhbmRlZDtcbiAgICAgIHBhcmVudC5leHBhbmRlZCA9IHRydWU7XG4gICAgICBjb25zdCBpID0gY29sbGFwc2VkSXRlbXMuaW5kZXhPZihwYXJlbnQpO1xuICAgICAgLy8gZW1pdCBldmVudCBvbmx5IGZvciBpdGVtcyB0aGF0IHdlcmVuJ3QgZXhwYW5kZWQgYmVmb3JlLlxuICAgICAgLy8gJ2NvbGxhcHNlZEl0ZW1zJyBjb250YWlucyBpdGVtcyB0aGF0IHdlcmUgZXhwYW5kZWQsIHNvIG5vIG5lZWQgdG8gZW1pdCBldmVudC5cbiAgICAgIC8vIGluIGNhc2UgJ2NvbGxhcHNlT3RoZXInIGlzIGZhbHNlLCAnY29sbGFwc2VkSXRlbXMnIHdpbGwgYmUgZW1wdHksXG4gICAgICAvLyBzbyBhbHNvIGNoZWNrIGlmIGl0ZW0gaXNuJ3QgZXhwYW5kZWQgYWxyZWFkeSAoJ3dhc05vdEV4cGFuZGVkJykuXG4gICAgICBpZiAoaSA9PT0gLTEgJiYgd2FzTm90RXhwYW5kZWQpIHtcbiAgICAgICAgdGhpcy5zdWJtZW51VG9nZ2xlKHBhcmVudCwgdGFnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbGxhcHNlZEl0ZW1zLnNwbGljZShpLCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpdGVtLnNlbGVjdGVkID0gdHJ1ZTtcbiAgICAvLyBlbWl0IGV2ZW50IG9ubHkgZm9yIGl0ZW1zIHRoYXQgd2VyZW4ndCBzZWxlY3RlZCBiZWZvcmUgKCd1bnNlbGVjdGVkSXRlbXMnIGNvbnRhaW5zIGl0ZW1zIHRoYXQgd2VyZSBzZWxlY3RlZClcbiAgICBpZiAoIXVuc2VsZWN0ZWRJdGVtcy5pbmNsdWRlcyhpdGVtKSkge1xuICAgICAgdGhpcy5pdGVtU2VsZWN0KGl0ZW0sIHRhZyk7XG4gICAgfVxuXG4gICAgLy8gcmVtYWluaW5nIGl0ZW1zIHdoaWNoIHdhc24ndCBleHBhbmRlZCBiYWNrIGFmdGVyIGV4cGFuZGluZyBhbGwgY3VycmVudGx5IHNlbGVjdGVkIGl0ZW1zXG4gICAgZm9yIChjb25zdCBjb2xsYXBzZWRJdGVtIG9mIGNvbGxhcHNlZEl0ZW1zKSB7XG4gICAgICB0aGlzLnN1Ym1lbnVUb2dnbGUoY29sbGFwc2VkSXRlbSwgdGFnKTtcbiAgICB9XG4gIH1cblxuICBjb2xsYXBzZUFsbChpdGVtczogTmJNZW51SXRlbVtdLCB0YWc6IHN0cmluZywgZXhjZXB0PzogTmJNZW51SXRlbSkge1xuICAgIGNvbnN0IGNvbGxhcHNlZEl0ZW1zID0gdGhpcy5jb2xsYXBzZUl0ZW1zKGl0ZW1zLCBleGNlcHQpO1xuXG4gICAgZm9yIChjb25zdCBpdGVtIG9mIGNvbGxhcHNlZEl0ZW1zKSB7XG4gICAgICB0aGlzLnN1Ym1lbnVUb2dnbGUoaXRlbSwgdGFnKTtcbiAgICB9XG4gIH1cblxuICBvbkFkZEl0ZW0oKTogT2JzZXJ2YWJsZTx7IHRhZzogc3RyaW5nOyBpdGVtczogTmJNZW51SXRlbVtdIH0+IHtcbiAgICByZXR1cm4gYWRkSXRlbXMkLnBpcGUoc2hhcmUoKSk7XG4gIH1cblxuICBvbk5hdmlnYXRlSG9tZSgpOiBPYnNlcnZhYmxlPHsgdGFnOiBzdHJpbmcgfT4ge1xuICAgIHJldHVybiBuYXZpZ2F0ZUhvbWUkLnBpcGUoc2hhcmUoKSk7XG4gIH1cblxuICBvbkNvbGxhcHNlQWxsKCk6IE9ic2VydmFibGU8eyB0YWc6IHN0cmluZyB9PiB7XG4gICAgcmV0dXJuIGNvbGxhcHNlQWxsJC5waXBlKHNoYXJlKCkpO1xuICB9XG5cbiAgb25HZXRTZWxlY3RlZEl0ZW0oKTogT2JzZXJ2YWJsZTx7IHRhZzogc3RyaW5nOyBsaXN0ZW5lcjogQmVoYXZpb3JTdWJqZWN0PE5iTWVudUJhZz4gfT4ge1xuICAgIHJldHVybiBnZXRTZWxlY3RlZEl0ZW0kLnBpcGUoc2hhcmUoKSk7XG4gIH1cblxuICBpdGVtSG92ZXIoaXRlbTogTmJNZW51SXRlbSwgdGFnPzogc3RyaW5nKSB7XG4gICAgaXRlbUhvdmVyJC5uZXh0KHsgdGFnLCBpdGVtIH0pO1xuICB9XG5cbiAgc3VibWVudVRvZ2dsZShpdGVtOiBOYk1lbnVJdGVtLCB0YWc/OiBzdHJpbmcpIHtcbiAgICBzdWJtZW51VG9nZ2xlJC5uZXh0KHsgdGFnLCBpdGVtIH0pO1xuICB9XG5cbiAgaXRlbVNlbGVjdChpdGVtOiBOYk1lbnVJdGVtLCB0YWc/OiBzdHJpbmcpIHtcbiAgICBpdGVtU2VsZWN0JC5uZXh0KHsgdGFnLCBpdGVtIH0pO1xuICB9XG5cbiAgaXRlbUNsaWNrKGl0ZW06IE5iTWVudUl0ZW0sIHRhZz86IHN0cmluZykge1xuICAgIGl0ZW1DbGljayQubmV4dCh7IHRhZywgaXRlbSB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVbnNlbGVjdCBhbGwgZ2l2ZW4gaXRlbXMgZGVlcGx5LlxuICAgKiBAcGFyYW0gaXRlbXMgYXJyYXkgb2YgaXRlbXMgdG8gdW5zZWxlY3QuXG4gICAqIEByZXR1cm5zIGl0ZW1zIHdoaWNoIHNlbGVjdGVkIHZhbHVlIHdhcyBjaGFuZ2VkLlxuICAgKi9cbiAgcHJpdmF0ZSByZXNldFNlbGVjdGlvbihpdGVtczogTmJNZW51SXRlbVtdKTogTmJNZW51SXRlbVtdIHtcbiAgICBjb25zdCB1bnNlbGVjdGVkSXRlbXMgPSBbXTtcblxuICAgIGZvciAoY29uc3QgaXRlbSBvZiBpdGVtcykge1xuICAgICAgaWYgKGl0ZW0uc2VsZWN0ZWQpIHtcbiAgICAgICAgdW5zZWxlY3RlZEl0ZW1zLnB1c2goaXRlbSk7XG4gICAgICB9XG4gICAgICBpdGVtLnNlbGVjdGVkID0gZmFsc2U7XG5cbiAgICAgIGlmIChpdGVtLmNoaWxkcmVuKSB7XG4gICAgICAgIHVuc2VsZWN0ZWRJdGVtcy5wdXNoKC4uLnRoaXMucmVzZXRTZWxlY3Rpb24oaXRlbS5jaGlsZHJlbikpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB1bnNlbGVjdGVkSXRlbXM7XG4gIH1cblxuICAvKipcbiAgICogQ29sbGFwc2UgYWxsIGdpdmVuIGl0ZW1zIGRlZXBseS5cbiAgICogQHBhcmFtIGl0ZW1zIGFycmF5IG9mIGl0ZW1zIHRvIGNvbGxhcHNlLlxuICAgKiBAcGFyYW0gZXhjZXB0IG1lbnUgaXRlbSB3aGljaCBzaG91bGRuJ3QgYmUgY29sbGFwc2VkLCBhbHNvIGRpc2FibGVzIGNvbGxhcHNpbmcgZm9yIHBhcmVudHMgb2YgdGhpcyBpdGVtLlxuICAgKiBAcmV0dXJucyBpdGVtcyB3aGljaCBleHBhbmRlZCB2YWx1ZSB3YXMgY2hhbmdlZC5cbiAgICovXG4gIHByaXZhdGUgY29sbGFwc2VJdGVtcyhpdGVtczogTmJNZW51SXRlbVtdLCBleGNlcHQ/OiBOYk1lbnVJdGVtKTogTmJNZW51SXRlbVtdIHtcbiAgICBjb25zdCBjb2xsYXBzZWRJdGVtcyA9IFtdO1xuXG4gICAgZm9yIChjb25zdCBpdGVtIG9mIGl0ZW1zKSB7XG4gICAgICBpZiAoZXhjZXB0ICYmIChpdGVtID09PSBleGNlcHQgfHwgTmJNZW51SXRlbS5pc1BhcmVudChpdGVtLCBleGNlcHQpKSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW0uZXhwYW5kZWQpIHtcbiAgICAgICAgY29sbGFwc2VkSXRlbXMucHVzaChpdGVtKTtcbiAgICAgIH1cbiAgICAgIGl0ZW0uZXhwYW5kZWQgPSBmYWxzZTtcblxuICAgICAgaWYgKGl0ZW0uY2hpbGRyZW4pIHtcbiAgICAgICAgY29sbGFwc2VkSXRlbXMucHVzaCguLi50aGlzLmNvbGxhcHNlSXRlbXMoaXRlbS5jaGlsZHJlbikpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBjb2xsYXBzZWRJdGVtcztcbiAgfVxuXG4gIHByaXZhdGUgYXBwbHlEZWZhdWx0cyhpdGVtLCBkZWZhdWx0SXRlbSkge1xuICAgIGNvbnN0IG1lbnVJdGVtID0geyAuLi5pdGVtIH07XG4gICAgT2JqZWN0LmFzc2lnbihpdGVtLCBkZWZhdWx0SXRlbSwgbWVudUl0ZW0pO1xuICAgIGl0ZW0uY2hpbGRyZW4gJiZcbiAgICAgIGl0ZW0uY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQpID0+IHtcbiAgICAgICAgdGhpcy5hcHBseURlZmF1bHRzKGNoaWxkLCBkZWZhdWx0SXRlbSk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0UGFyZW50KGl0ZW06IE5iTWVudUl0ZW0pIHtcbiAgICBpdGVtLmNoaWxkcmVuICYmXG4gICAgICBpdGVtLmNoaWxkcmVuLmZvckVhY2goKGNoaWxkKSA9PiB7XG4gICAgICAgIGNoaWxkLnBhcmVudCA9IGl0ZW07XG4gICAgICAgIHRoaXMuc2V0UGFyZW50KGNoaWxkKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbmQgZGVlcGVzdCBpdGVtIHdoaWNoIGxpbmsgbWF0Y2hlcyBjdXJyZW50IFVSTCBwYXRoLlxuICAgKiBAcGFyYW0gaXRlbXMgYXJyYXkgb2YgaXRlbXMgdG8gc2VhcmNoIGluLlxuICAgKiBAcmV0dXJucyBmb3VuZCBpdGVtIG9mIHVuZGVmaW5lZC5cbiAgICovXG4gIHByaXZhdGUgZmluZEl0ZW1CeVVybChpdGVtczogTmJNZW51SXRlbVtdKTogTmJNZW51SXRlbSB8IHVuZGVmaW5lZCB7XG4gICAgbGV0IHNlbGVjdGVkSXRlbTtcblxuICAgIGl0ZW1zLnNvbWUoKGl0ZW0pID0+IHtcbiAgICAgIGlmIChpdGVtLmNoaWxkcmVuKSB7XG4gICAgICAgIHNlbGVjdGVkSXRlbSA9IHRoaXMuZmluZEl0ZW1CeVVybChpdGVtLmNoaWxkcmVuKTtcbiAgICAgIH1cbiAgICAgIGlmICghc2VsZWN0ZWRJdGVtICYmIHRoaXMuaXNTZWxlY3RlZEluVXJsKGl0ZW0pKSB7XG4gICAgICAgIHNlbGVjdGVkSXRlbSA9IGl0ZW07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBzZWxlY3RlZEl0ZW07XG4gICAgfSk7XG5cbiAgICByZXR1cm4gc2VsZWN0ZWRJdGVtO1xuICB9XG5cbiAgcHJpdmF0ZSBpc1NlbGVjdGVkSW5VcmwoaXRlbTogTmJNZW51SXRlbSk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGV4YWN0OiBib29sZWFuID0gaXRlbS5wYXRoTWF0Y2ggPT09ICdmdWxsJztcbiAgICBjb25zdCBsaW5rOiBzdHJpbmcgPSBpdGVtLmxpbms7XG5cbiAgICBjb25zdCBpc1NlbGVjdGVkSW5QYXRoID0gZXhhY3RcbiAgICAgID8gaXNVcmxQYXRoRXF1YWwodGhpcy5sb2NhdGlvbi5wYXRoKCksIGxpbmspXG4gICAgICA6IGlzVXJsUGF0aENvbnRhaW4odGhpcy5sb2NhdGlvbi5wYXRoKCksIGxpbmspO1xuXG4gICAgaWYgKGlzU2VsZWN0ZWRJblBhdGggJiYgaXRlbS5mcmFnbWVudCAhPSBudWxsKSB7XG4gICAgICByZXR1cm4gZXhhY3RcbiAgICAgICAgPyBpc0ZyYWdtZW50RXF1YWwodGhpcy5sb2NhdGlvbi5wYXRoKHRydWUpLCBpdGVtLmZyYWdtZW50KVxuICAgICAgICA6IGlzRnJhZ21lbnRDb250YWluKHRoaXMubG9jYXRpb24ucGF0aCh0cnVlKSwgaXRlbS5mcmFnbWVudCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGlzU2VsZWN0ZWRJblBhdGg7XG4gIH1cbn1cbiJdfQ==