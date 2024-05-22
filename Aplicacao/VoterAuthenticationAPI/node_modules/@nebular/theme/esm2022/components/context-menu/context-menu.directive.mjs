/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Directive, HostBinding, Input, } from '@angular/core';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NbDynamicOverlay } from '../cdk/overlay/dynamic/dynamic-overlay';
import { NbDynamicOverlayHandler } from '../cdk/overlay/dynamic/dynamic-overlay-handler';
import { NbAdjustment, NbPosition } from '../cdk/overlay/overlay-position';
import { NbTrigger } from '../cdk/overlay/overlay-trigger';
import { NbContextMenuComponent } from './context-menu.component';
import * as i0 from "@angular/core";
import * as i1 from "../menu/menu.service";
import * as i2 from "../cdk/overlay/dynamic/dynamic-overlay-handler";
/**
 * Full featured context menu directive.
 *
 * @stacked-example(Showcase, context-menu/context-menu-showcase.component)
 *
 * Just pass menu items array:
 *
 * ```html
 * <button [nbContextMenu]="items"></button>
 * ...
 * items = [{ title: 'Profile' }, { title: 'Log out' }];
 * ```
 * ### Installation
 *
 * Import `NbContextMenuModule` to your feature module.
 * ```ts
 * @NgModule({
 *   imports: [
 *     // ...
 *     NbContextMenuModule,
 *   ],
 * })
 * export class PageModule { }
 * ```
 * Also make sure `NbMenuModule` is imported to your `app.module`.
 * ```ts
 * @NgModule({
 *   imports: [
 *     // ...
 *     NbMenuModule.forRoot(),
 *   ],
 * })
 * export class AppModule { }
 * ```
 *
 * ### Usage
 *
 * If you want to handle context menu clicks you have to pass `nbContextMenuTag`
 * param and register to events using NbMenuService.
 * `NbContextMenu` renders plain `NbMenu` inside, so
 * you have to work with it just like with `NbMenu` component:
 *
 * @stacked-example(Menu item click, context-menu/context-menu-click.component)
 *
 * Context menu has different placements, such as: top, bottom, left and right
 * which can be used as following:
 *
 * ```html
 * <button [nbContextMenu]="items" nbContextMenuPlacement="right"></button>
 * ```
 *
 * ```ts
 * items = [{ title: 'Profile' }, { title: 'Log out' }];
 * ```
 *
 * By default context menu will try to adjust itself to maximally fit viewport
 * and provide the best user experience. It will try to change position of the context menu.
 * If you wanna disable this behaviour just set it falsy value.
 *
 * ```html
 * <button [nbContextMenu]="items" nbContextMenuAdjustment="counterclockwise"></button>
 * ```
 *
 * ```ts
 * items = [{ title: 'Profile' }, { title: 'Log out' }];
 * ```
 * Context menu has a number of triggers which provides an ability to show and hide the component in different ways:
 *
 * - Click mode shows the component when a user clicks on the host element and hides when the user clicks
 * somewhere on the document outside the component.
 * - Hint provides capability to show the component when the user hovers over the host element
 * and hide when the user hovers out of the host.
 * - Hover works like hint mode with one exception - when the user moves mouse from host element to
 * the container element the component remains open, so that it is possible to interact with it content.
 * - Focus mode is applied when user focuses the element.
 * - Noop mode - the component won't react to the user interaction.
 *
 * @stacked-example(Available Triggers, context-menu/context-menu-modes.component.html)
 *
 * Noop mode is especially useful when you need to control Popover programmatically, for example show/hide
 * as a result of some third-party action, like HTTP request or validation check:
 *
 * @stacked-example(Manual Control, context-menu/context-menu-noop.component)
 *
 * @stacked-example(Manual Control, context-menu/context-menu-right-click.component)
 * */
export class NbContextMenuDirective {
    /**
     * Position will be calculated relatively host element based on the position.
     * Can be top, right, bottom and left.
     * */
    get position() {
        return this._position;
    }
    set position(value) {
        if (value !== this.position) {
            this._position = value;
            this.updateOverlayContext();
        }
    }
    /**
     * Set NbMenu tag, which helps identify menu when working with NbMenuService.
     * */
    get tag() {
        return this._tag;
    }
    set tag(value) {
        if (value !== this.tag) {
            this._tag = value;
            this.updateOverlayContext();
        }
    }
    /**
     * Basic menu items, will be passed to the internal NbMenuComponent.
     * */
    get items() {
        return this._items;
    }
    set items(items) {
        this.validateItems(items);
        this._items = items;
        this.updateOverlayContext();
    }
    ;
    get contextMenuClass() {
        return this._contextMenuClass;
    }
    set contextMenuClass(value) {
        if (value !== this.contextMenuClass) {
            this._contextMenuClass = value;
            this.overlayConfig = { panelClass: this.contextMenuClass };
        }
    }
    constructor(hostRef, menuService, dynamicOverlayHandler) {
        this.hostRef = hostRef;
        this.menuService = menuService;
        this.dynamicOverlayHandler = dynamicOverlayHandler;
        this.contextMenuHost = true;
        this._position = NbPosition.BOTTOM;
        /**
         * Container position will be changes automatically based on this strategy if container can't fit view port.
         * Set this property to any falsy value if you want to disable automatically adjustment.
         * Available values: clockwise, counterclockwise.
         * */
        this.adjustment = NbAdjustment.CLOCKWISE;
        /**
         * Describes when the container will be shown.
         * Available options: `click`, `hover`, `hint`, `focus` and `noop`
         * */
        this.trigger = NbTrigger.CLICK;
        this._contextMenuClass = '';
        this.overlayConfig = { panelClass: this.contextMenuClass };
        this.overlayContext = { items: this.items, tag: this.tag, position: this.position };
        this.destroy$ = new Subject();
        this._items = [];
    }
    ngOnInit() {
        this.dynamicOverlayHandler
            .host(this.hostRef)
            .componentType(NbContextMenuComponent);
    }
    ngOnChanges() {
        this.rebuild();
    }
    ngAfterViewInit() {
        this.dynamicOverlay = this.configureDynamicOverlay()
            .build();
        this.subscribeOnItemClick();
    }
    rebuild() {
        this.dynamicOverlay = this.configureDynamicOverlay()
            .rebuild();
    }
    show() {
        this.dynamicOverlay.show();
    }
    hide() {
        this.dynamicOverlay.hide();
    }
    toggle() {
        this.dynamicOverlay.toggle();
    }
    ngOnDestroy() {
        this.dynamicOverlayHandler.destroy();
        this.destroy$.next();
        this.destroy$.complete();
    }
    configureDynamicOverlay() {
        return this.dynamicOverlayHandler
            .position(this.position)
            .trigger(this.trigger)
            .adjustment(this.adjustment)
            .context(this.overlayContext)
            .overlayConfig(this.overlayConfig);
    }
    /*
     * NbMenuComponent will crash if don't pass menu items to it.
     * So, we just validating them and throw custom obvious error.
     * */
    validateItems(items) {
        if (!items || !items.length) {
            throw Error(`List of menu items expected, but given: ${items}`);
        }
    }
    subscribeOnItemClick() {
        this.menuService.onItemClick()
            .pipe(filter(({ tag }) => tag === this.tag && this.trigger !== NbTrigger.NOOP), takeUntil(this.destroy$))
            .subscribe(() => this.hide());
    }
    updateOverlayContext() {
        this.overlayContext = { items: this.items, position: this.position, tag: this.tag };
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbContextMenuDirective, deps: [{ token: i0.ElementRef }, { token: i1.NbMenuService }, { token: i2.NbDynamicOverlayHandler }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "17.1.0", type: NbContextMenuDirective, selector: "[nbContextMenu]", inputs: { position: ["nbContextMenuPlacement", "position"], adjustment: ["nbContextMenuAdjustment", "adjustment"], tag: ["nbContextMenuTag", "tag"], items: ["nbContextMenu", "items"], trigger: ["nbContextMenuTrigger", "trigger"], contextMenuClass: ["nbContextMenuClass", "contextMenuClass"] }, host: { properties: { "class.context-menu-host": "this.contextMenuHost" } }, providers: [NbDynamicOverlayHandler, NbDynamicOverlay], usesOnChanges: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbContextMenuDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[nbContextMenu]',
                    providers: [NbDynamicOverlayHandler, NbDynamicOverlay],
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i1.NbMenuService }, { type: i2.NbDynamicOverlayHandler }], propDecorators: { contextMenuHost: [{
                type: HostBinding,
                args: ['class.context-menu-host']
            }], position: [{
                type: Input,
                args: ['nbContextMenuPlacement']
            }], adjustment: [{
                type: Input,
                args: ['nbContextMenuAdjustment']
            }], tag: [{
                type: Input,
                args: ['nbContextMenuTag']
            }], items: [{
                type: Input,
                args: ['nbContextMenu']
            }], trigger: [{
                type: Input,
                args: ['nbContextMenuTrigger']
            }], contextMenuClass: [{
                type: Input,
                args: ['nbContextMenuClass']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC1tZW51LmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9mcmFtZXdvcmsvdGhlbWUvY29tcG9uZW50cy9jb250ZXh0LW1lbnUvY29udGV4dC1tZW51LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUdMLFNBQVMsRUFFVCxXQUFXLEVBQ1gsS0FBSyxHQUlOLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbkQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUUvQixPQUFPLEVBQUUsZ0JBQWdCLEVBQThCLE1BQU0sd0NBQXdDLENBQUM7QUFDdEcsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFFekYsT0FBTyxFQUF5QyxZQUFZLEVBQUUsVUFBVSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDbEgsT0FBTyxFQUFFLFNBQVMsRUFBbUIsTUFBTSxnQ0FBZ0MsQ0FBQztBQUM1RSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQzs7OztBQVNsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQXFGSztBQUtMLE1BQU0sT0FBTyxzQkFBc0I7SUFLakM7OztTQUdLO0lBQ0wsSUFDSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3hCLENBQUM7SUFDRCxJQUFJLFFBQVEsQ0FBQyxLQUFpQjtRQUM1QixJQUFJLEtBQUssS0FBSyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDNUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7WUFDdkIsSUFBSSxDQUFD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SUFDbEMsQ0FBQztJQUVTLG9CQUFvQjtRQUM1QixJQUFJLENBQUMsY0FBYyxHQUFHLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUN0RixDQUFDOzhHQWpLVSxzQkFBc0I7a0dBQXRCLHNCQUFzQiw2WkFGdEIsQ0FBQyx1QkFBdUIsRUFBRSxnQkFBZ0IsQ0FBQzs7MkZBRTNDLHNCQUFzQjtrQkFKbEMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsaUJBQWlCO29CQUMzQixTQUFTLEVBQUUsQ0FBQyx1QkFBdUIsRUFBRSxnQkFBZ0IsQ0FBQztpQkFDdkQ7aUpBSUMsZUFBZTtzQkFEZCxXQUFXO3VCQUFDLHlCQUF5QjtnQkFRbEMsUUFBUTtzQkFEWCxLQUFLO3VCQUFDLHdCQUF3QjtnQkFrQi9CLFVBQVU7c0JBRFQsS0FBSzt1QkFBQyx5QkFBeUI7Z0JBTzVCLEdBQUc7c0JBRE4sS0FBSzt1QkFBQyxrQkFBa0I7Z0JBZ0JyQixLQUFLO3NCQURSLEtBQUs7dUJBQUMsZUFBZTtnQkFldEIsT0FBTztzQkFETixLQUFLO3VCQUFDLHNCQUFzQjtnQkFLekIsZ0JBQWdCO3NCQURuQixLQUFLO3VCQUFDLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBBa3Zlby4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi9cblxuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ29tcG9uZW50UmVmLFxuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIEhvc3RCaW5kaW5nLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBmaWx0ZXIsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgTmJEeW5hbWljT3ZlcmxheSwgTmJEeW5hbWljT3ZlcmxheUNvbnRyb2xsZXIgfSBmcm9tICcuLi9jZGsvb3ZlcmxheS9keW5hbWljL2R5bmFtaWMtb3ZlcmxheSc7XG5pbXBvcnQgeyBOYkR5bmFtaWNPdmVybGF5SGFuZGxlciB9IGZyb20gJy4uL2Nkay9vdmVybGF5L2R5bmFtaWMvZHluYW1pYy1vdmVybGF5LWhhbmRsZXInO1xuaW1wb3J0IHsgTmJPdmVybGF5Q29uZmlnLCBOYk92ZXJsYXlSZWYgfSBmcm9tICcuLi9jZGsvb3ZlcmxheS9tYXBwaW5nJztcbmltcG9ydCB7IE5iQWRqdXN0YWJsZUNvbm5lY3RlZFBvc2l0aW9uU3RyYXRlZ3ksIE5iQWRqdXN0bWVudCwgTmJQb3NpdGlvbiB9IGZyb20gJy4uL2Nkay9vdmVybGF5L292ZXJsYXktcG9zaXRpb24nO1xuaW1wb3J0IHsgTmJUcmlnZ2VyLCBOYlRyaWdnZXJWYWx1ZXMgfSBmcm9tICcuLi9jZGsvb3ZlcmxheS9vdmVybGF5LXRyaWdnZXInO1xuaW1wb3J0IHsgTmJDb250ZXh0TWVudUNvbXBvbmVudCB9IGZyb20gJy4vY29udGV4dC1tZW51LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOYk1lbnVJdGVtLCBOYk1lbnVTZXJ2aWNlIH0gZnJvbSAnLi4vbWVudS9tZW51LnNlcnZpY2UnO1xuXG5leHBvcnQgaW50ZXJmYWNlIE5iQ29udGV4dE1lbnVDb250ZXh0IHtcbiAgaXRlbXM6IE5iTWVudUl0ZW1bXTtcbiAgdGFnOiBzdHJpbmc7XG4gIHBvc2l0aW9uOiBOYlBvc2l0aW9uO1xufVxuXG4vKipcbiAqIEZ1bGwgZmVhdHVyZWQgY29udGV4dCBtZW51IGRpcmVjdGl2ZS5cbiAqXG4gKiBAc3RhY2tlZC1leGFtcGxlKFNob3djYXNlLCBjb250ZXh0LW1lbnUvY29udGV4dC1tZW51LXNob3djYXNlLmNvbXBvbmVudClcbiAqXG4gKiBKdXN0IHBhc3MgbWVudSBpdGVtcyBhcnJheTpcbiAqXG4gKiBgYGBodG1sXG4gKiA8YnV0dG9uIFtuYkNvbnRleHRNZW51XT1cIml0ZW1zXCI+PC9idXR0b24+XG4gKiAuLi5cbiAqIGl0ZW1zID0gW3sgdGl0bGU6ICdQcm9maWxlJyB9LCB7IHRpdGxlOiAnTG9nIG91dCcgfV07XG4gKiBgYGBcbiAqICMjIyBJbnN0YWxsYXRpb25cbiAqXG4gKiBJbXBvcnQgYE5iQ29udGV4dE1lbnVNb2R1bGVgIHRvIHlvdXIgZmVhdHVyZSBtb2R1bGUuXG4gKiBgYGB0c1xuICogQE5nTW9kdWxlKHtcbiAqICAgaW1wb3J0czogW1xuICogICAgIC8vIC4uLlxuICogICAgIE5iQ29udGV4dE1lbnVNb2R1bGUsXG4gKiAgIF0sXG4gKiB9KVxuICogZXhwb3J0IGNsYXNzIFBhZ2VNb2R1bGUgeyB9XG4gKiBgYGBcbiAqIEFsc28gbWFrZSBzdXJlIGBOYk1lbnVNb2R1bGVgIGlzIGltcG9ydGVkIHRvIHlvdXIgYGFwcC5tb2R1bGVgLlxuICogYGBgdHNcbiAqIEBOZ01vZHVsZSh7XG4gKiAgIGltcG9ydHM6IFtcbiAqICAgICAvLyAuLi5cbiAqICAgICBOYk1lbnVNb2R1bGUuZm9yUm9vdCgpLFxuICogICBdLFxuICogfSlcbiAqIGV4cG9ydCBjbGFzcyBBcHBNb2R1bGUgeyB9XG4gKiBgYGBcbiAqXG4gKiAjIyMgVXNhZ2VcbiAqXG4gKiBJZiB5b3Ugd2FudCB0byBoYW5kbGUgY29udGV4dCBtZW51IGNsaWNrcyB5b3UgaGF2ZSB0byBwYXNzIGBuYkNvbnRleHRNZW51VGFnYFxuICogcGFyYW0gYW5kIHJlZ2lzdGVyIHRvIGV2ZW50cyB1c2luZyBOYk1lbnVTZXJ2aWNlLlxuICogYE5iQ29udGV4dE1lbnVgIHJlbmRlcnMgcGxhaW4gYE5iTWVudWAgaW5zaWRlLCBzb1xuICogeW91IGhhdmUgdG8gd29yayB3aXRoIGl0IGp1c3QgbGlrZSB3aXRoIGBOYk1lbnVgIGNvbXBvbmVudDpcbiAqXG4gKiBAc3RhY2tlZC1leGFtcGxlKE1lbnUgaXRlbSBjbGljaywgY29udGV4dC1tZW51L2NvbnRleHQtbWVudS1jbGljay5jb21wb25lbnQpXG4gKlxuICogQ29udGV4dCBtZW51IGhhcyBkaWZmZXJlbnQgcGxhY2VtZW50cywgc3VjaCBhczogdG9wLCBib3R0b20sIGxlZnQgYW5kIHJpZ2h0XG4gKiB3aGljaCBjYW4gYmUgdXNlZCBhcyBmb2xsb3dpbmc6XG4gKlxuICogYGBgaHRtbFxuICogPGJ1dHRvbiBbbmJDb250ZXh0TWVudV09XCJpdGVtc1wiIG5iQ29udGV4dE1lbnVQbGFjZW1lbnQ9XCJyaWdodFwiPjwvYnV0dG9uPlxuICogYGBgXG4gKlxuICogYGBgdHNcbiAqIGl0ZW1zID0gW3sgdGl0bGU6ICdQcm9maWxlJyB9LCB7IHRpdGxlOiAnTG9nIG91dCcgfV07XG4gKiBgYGBcbiAqXG4gKiBCeSBkZWZhdWx0IGNvbnRleHQgbWVudSB3aWxsIHRyeSB0byBhZGp1c3QgaXRzZWxmIHRvIG1heGltYWxseSBmaXQgdmlld3BvcnRcbiAqIGFuZCBwcm92aWRlIHRoZSBiZXN0IHVzZXIgZXhwZXJpZW5jZS4gSXQgd2lsbCB0cnkgdG8gY2hhbmdlIHBvc2l0aW9uIG9mIHRoZSBjb250ZXh0IG1lbnUuXG4gKiBJZiB5b3Ugd2FubmEgZGlzYWJsZSB0aGlzIGJlaGF2aW91ciBqdXN0IHNldCBpdCBmYWxzeSB2YWx1ZS5cbiAqXG4gKiBgYGBodG1sXG4gKiA8YnV0dG9uIFtuYkNvbnRleHRNZW51XT1cIml0ZW1zXCIgbmJDb250ZXh0TWVudUFkanVzdG1lbnQ9XCJjb3VudGVyY2xvY2t3aXNlXCI+PC9idXR0b24+XG4gKiBgYGBcbiAqXG4gKiBgYGB0c1xuICogaXRlbXMgPSBbeyB0aXRsZTogJ1Byb2ZpbGUnIH0sIHsgdGl0bGU6ICdMb2cgb3V0JyB9XTtcbiAqIGBgYFxuICogQ29udGV4dCBtZW51IGhhcyBhIG51bWJlciBvZiB0cmlnZ2VycyB3aGljaCBwcm92aWRlcyBhbiBhYmlsaXR5IHRvIHNob3cgYW5kIGhpZGUgdGhlIGNvbXBvbmVudCBpbiBkaWZmZXJlbnQgd2F5czpcbiAqXG4gKiAtIENsaWNrIG1vZGUgc2hvd3MgdGhlIGNvbXBvbmVudCB3aGVuIGEgdXNlciBjbGlja3Mgb24gdGhlIGhvc3QgZWxlbWVudCBhbmQgaGlkZXMgd2hlbiB0aGUgdXNlciBjbGlja3NcbiAqIHNvbWV3aGVyZSBvbiB0aGUgZG9jdW1lbnQgb3V0c2lkZSB0aGUgY29tcG9uZW50LlxuICogLSBIaW50IHByb3ZpZGVzIGNhcGFiaWxpdHkgdG8gc2hvdyB0aGUgY29tcG9uZW50IHdoZW4gdGhlIHVzZXIgaG92ZXJzIG92ZXIgdGhlIGhvc3QgZWxlbWVudFxuICogYW5kIGhpZGUgd2hlbiB0aGUgdXNlciBob3ZlcnMgb3V0IG9mIHRoZSBob3N0LlxuICogLSBIb3ZlciB3b3JrcyBsaWtlIGhpbnQgbW9kZSB3aXRoIG9uZSBleGNlcHRpb24gLSB3aGVuIHRoZSB1c2VyIG1vdmVzIG1vdXNlIGZyb20gaG9zdCBlbGVtZW50IHRvXG4gKiB0aGUgY29udGFpbmVyIGVsZW1lbnQgdGhlIGNvbXBvbmVudCByZW1haW5zIG9wZW4sIHNvIHRoYXQgaXQgaXMgcG9zc2libGUgdG8gaW50ZXJhY3Qgd2l0aCBpdCBjb250ZW50LlxuICogLSBGb2N1cyBtb2RlIGlzIGFwcGxpZWQgd2hlbiB1c2VyIGZvY3VzZXMgdGhlIGVsZW1lbnQuXG4gKiAtIE5vb3AgbW9kZSAtIHRoZSBjb21wb25lbnQgd29uJ3QgcmVhY3QgdG8gdGhlIHVzZXIgaW50ZXJhY3Rpb24uXG4gKlxuICogQHN0YWNrZWQtZXhhbXBsZShBdmFpbGFibGUgVHJpZ2dlcnMsIGNvbnRleHQtbWVudS9jb250ZXh0LW1lbnUtbW9kZXMuY29tcG9uZW50Lmh0bWwpXG4gKlxuICogTm9vcCBtb2RlIGlzIGVzcGVjaWFsbHkgdXNlZnVsIHdoZW4geW91IG5lZWQgdG8gY29udHJvbCBQb3BvdmVyIHByb2dyYW1tYXRpY2FsbHksIGZvciBleGFtcGxlIHNob3cvaGlkZVxuICogYXMgYSByZXN1bHQgb2Ygc29tZSB0aGlyZC1wYXJ0eSBhY3Rpb24sIGxpa2UgSFRUUCByZXF1ZXN0IG9yIHZhbGlkYXRpb24gY2hlY2s6XG4gKlxuICogQHN0YWNrZWQtZXhhbXBsZShNYW51YWwgQ29udHJvbCwgY29udGV4dC1tZW51L2NvbnRleHQtbWVudS1ub29wLmNvbXBvbmVudClcbiAqXG4gKiBAc3RhY2tlZC1leGFtcGxlKE1hbnVhbCBDb250cm9sLCBjb250ZXh0LW1lbnUvY29udGV4dC1tZW51LXJpZ2h0LWNsaWNrLmNvbXBvbmVudClcbiAqICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbmJDb250ZXh0TWVudV0nLFxuICBwcm92aWRlcnM6IFtOYkR5bmFtaWNPdmVybGF5SGFuZGxlciwgTmJEeW5hbWljT3ZlcmxheV0sXG59KVxuZXhwb3J0IGNsYXNzIE5iQ29udGV4dE1lbnVEaXJlY3RpdmUgaW1wbGVtZW50cyBOYkR5bmFtaWNPdmVybGF5Q29udHJvbGxlciwgT25DaGFuZ2VzLCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3ksIE9uSW5pdCB7XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5jb250ZXh0LW1lbnUtaG9zdCcpXG4gIGNvbnRleHRNZW51SG9zdCA9IHRydWU7XG5cbiAgLyoqXG4gICAqIFBvc2l0aW9uIHdpbGwgYmUgY2FsY3VsYXRlZCByZWxhdGl2ZWx5IGhvc3QgZWxlbWVudCBiYXNlZCBvbiB0aGUgcG9zaXRpb24uXG4gICAqIENhbiBiZSB0b3AsIHJpZ2h0LCBib3R0b20gYW5kIGxlZnQuXG4gICAqICovXG4gIEBJbnB1dCgnbmJDb250ZXh0TWVudVBsYWNlbWVudCcpXG4gIGdldCBwb3NpdGlvbigpOiBOYlBvc2l0aW9uIHtcbiAgICByZXR1cm4gdGhpcy5fcG9zaXRpb247XG4gIH1cbiAgc2V0IHBvc2l0aW9uKHZhbHVlOiBOYlBvc2l0aW9uKSB7XG4gICAgaWYgKHZhbHVlICE9PSB0aGlzLnBvc2l0aW9uKSB7XG4gICAgICB0aGlzLl9wb3NpdGlvbiA9IHZhbHVlO1xuICAgICAgdGhpcy51cGRhdGVPdmVybGF5Q29udGV4dCgpO1xuICAgIH1cbiAgfVxuICBfcG9zaXRpb246IE5iUG9zaXRpb24gPSBOYlBvc2l0aW9uLkJPVFRPTTtcblxuICAvKipcbiAgICogQ29udGFpbmVyIHBvc2l0aW9uIHdpbGwgYmUgY2hhbmdlcyBhdXRvbWF0aWNhbGx5IGJhc2VkIG9uIHRoaXMgc3RyYXRlZ3kgaWYgY29udGFpbmVyIGNhbid0IGZpdCB2aWV3IHBvcnQuXG4gICAqIFNldCB0aGlzIHByb3BlcnR5IHRvIGFueSBmYWxzeSB2YWx1ZSBpZiB5b3Ugd2FudCB0byBkaXNhYmxlIGF1dG9tYXRpY2FsbHkgYWRqdXN0bWVudC5cbiAgICogQXZhaWxhYmxlIHZhbHVlczogY2xvY2t3aXNlLCBjb3VudGVyY2xvY2t3aXNlLlxuICAgKiAqL1xuICBASW5wdXQoJ25iQ29udGV4dE1lbnVBZGp1c3RtZW50JylcbiAgYWRqdXN0bWVudDogTmJBZGp1c3RtZW50ID0gTmJBZGp1c3RtZW50LkNMT0NLV0lTRTtcblxuICAvKipcbiAgICogU2V0IE5iTWVudSB0YWcsIHdoaWNoIGhlbHBzIGlkZW50aWZ5IG1lbnUgd2hlbiB3b3JraW5nIHdpdGggTmJNZW51U2VydmljZS5cbiAgICogKi9cbiAgQElucHV0KCduYkNvbnRleHRNZW51VGFnJylcbiAgZ2V0IHRhZygpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl90YWc7XG4gIH1cbiAgc2V0IHRhZyh2YWx1ZTogc3RyaW5nKSB7XG4gICAgaWYgKHZhbHVlICE9PSB0aGlzLnRhZykge1xuICAgICAgdGhpcy5fdGFnID0gdmFsdWU7XG4gICAgICB0aGlzLnVwZGF0ZU92ZXJsYXlDb250ZXh0KCk7XG4gICAgfVxuICB9XG4gIF90YWc6IHN0cmluZztcblxuICAvKipcbiAgICogQmFzaWMgbWVudSBpdGVtcywgd2lsbCBiZSBwYXNzZWQgdG8gdGhlIGludGVybmFsIE5iTWVudUNvbXBvbmVudC5cbiAgICogKi9cbiAgQElucHV0KCduYkNvbnRleHRNZW51JylcbiAgZ2V0IGl0ZW1zKCk6IE5iTWVudUl0ZW1bXSB7XG4gICAgcmV0dXJuIHRoaXMuX2l0ZW1zO1xuICB9XG4gIHNldCBpdGVtcyhpdGVtczogTmJNZW51SXRlbVtdKSB7XG4gICAgdGhpcy52YWxpZGF0ZUl0ZW1zKGl0ZW1zKTtcbiAgICB0aGlzLl9pdGVtcyA9IGl0ZW1zO1xuICAgIHRoaXMudXBkYXRlT3ZlcmxheUNvbnRleHQoKTtcbiAgfTtcblxuICAvKipcbiAgICogRGVzY3JpYmVzIHdoZW4gdGhlIGNvbnRhaW5lciB3aWxsIGJlIHNob3duLlxuICAgKiBBdmFpbGFibGUgb3B0aW9uczogYGNsaWNrYCwgYGhvdmVyYCwgYGhpbnRgLCBgZm9jdXNgIGFuZCBgbm9vcGBcbiAgICogKi9cbiAgQElucHV0KCduYkNvbnRleHRNZW51VHJpZ2dlcicpXG4gIHRyaWdnZXI6IE5iVHJpZ2dlciA9IE5iVHJpZ2dlci5DTElDSztcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX3RyaWdnZXI6IE5iVHJpZ2dlclZhbHVlcztcblxuICBASW5wdXQoJ25iQ29udGV4dE1lbnVDbGFzcycpXG4gIGdldCBjb250ZXh0TWVudUNsYXNzKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbnRleHRNZW51Q2xhc3M7XG4gIH1cbiAgc2V0IGNvbnRleHRNZW51Q2xhc3ModmFsdWU6IHN0cmluZykge1xuICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5jb250ZXh0TWVudUNsYXNzKSB7XG4gICAgICB0aGlzLl9jb250ZXh0TWVudUNsYXNzID0gdmFsdWU7XG4gICAgICB0aGlzLm92ZXJsYXlDb25maWcgPSB7IHBhbmVsQ2xhc3M6IHRoaXMuY29udGV4dE1lbnVDbGFzcyB9O1xuICAgIH1cbiAgfVxuICBfY29udGV4dE1lbnVDbGFzczogc3RyaW5nID0gJyc7XG5cbiAgcHJvdGVjdGVkIHJlZjogTmJPdmVybGF5UmVmO1xuICBwcm90ZWN0ZWQgY29udGFpbmVyOiBDb21wb25lbnRSZWY8YW55PjtcbiAgcHJvdGVjdGVkIHBvc2l0aW9uU3RyYXRlZ3k6IE5iQWRqdXN0YWJsZUNvbm5lY3RlZFBvc2l0aW9uU3RyYXRlZ3k7XG4gIHByb3RlY3RlZCBvdmVybGF5Q29uZmlnOiBOYk92ZXJsYXlDb25maWcgPSB7IHBhbmVsQ2xhc3M6IHRoaXMuY29udGV4dE1lbnVDbGFzcyB9IDtcbiAgcHJvdGVjdGVkIG92ZXJsYXlDb250ZXh0OiBOYkNvbnRleHRNZW51Q29udGV4dCA9IHsgaXRlbXM6IHRoaXMuaXRlbXMsIHRhZzogdGhpcy50YWcsIHBvc2l0aW9uOiB0aGlzLnBvc2l0aW9uIH07XG4gIHByb3RlY3RlZCBkZXN0cm95JCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG4gIHByaXZhdGUgX2l0ZW1zOiBOYk1lbnVJdGVtW10gPSBbXTtcblxuICBwcml2YXRlIGR5bmFtaWNPdmVybGF5OiBOYkR5bmFtaWNPdmVybGF5O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaG9zdFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBtZW51U2VydmljZTogTmJNZW51U2VydmljZSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBkeW5hbWljT3ZlcmxheUhhbmRsZXI6IE5iRHluYW1pY092ZXJsYXlIYW5kbGVyKSB7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmR5bmFtaWNPdmVybGF5SGFuZGxlclxuICAgICAgLmhvc3QodGhpcy5ob3N0UmVmKVxuICAgICAgLmNvbXBvbmVudFR5cGUoTmJDb250ZXh0TWVudUNvbXBvbmVudCk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcygpIHtcbiAgICB0aGlzLnJlYnVpbGQoKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLmR5bmFtaWNPdmVybGF5ID0gdGhpcy5jb25maWd1cmVEeW5hbWljT3ZlcmxheSgpXG4gICAgICAuYnVpbGQoKTtcbiAgICB0aGlzLnN1YnNjcmliZU9uSXRlbUNsaWNrKCk7XG4gIH1cblxuICByZWJ1aWxkKCkge1xuICAgIHRoaXMuZHluYW1pY092ZXJsYXkgPSB0aGlzLmNvbmZpZ3VyZUR5bmFtaWNPdmVybGF5KClcbiAgICAgIC5yZWJ1aWxkKCk7XG4gIH1cblxuICBzaG93KCkge1xuICAgIHRoaXMuZHluYW1pY092ZXJsYXkuc2hvdygpO1xuICB9XG5cbiAgaGlkZSgpIHtcbiAgICB0aGlzLmR5bmFtaWNPdmVybGF5LmhpZGUoKTtcbiAgfVxuXG4gIHRvZ2dsZSgpIHtcbiAgICB0aGlzLmR5bmFtaWNPdmVybGF5LnRvZ2dsZSgpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5keW5hbWljT3ZlcmxheUhhbmRsZXIuZGVzdHJveSgpO1xuICAgIHRoaXMuZGVzdHJveSQubmV4dCgpO1xuICAgIHRoaXMuZGVzdHJveSQuY29tcGxldGUoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBjb25maWd1cmVEeW5hbWljT3ZlcmxheSgpIHtcbiAgICByZXR1cm4gdGhpcy5keW5hbWljT3ZlcmxheUhhbmRsZXJcbiAgICAgIC5wb3NpdGlvbih0aGlzLnBvc2l0aW9uKVxuICAgICAgLnRyaWdnZXIodGhpcy50cmlnZ2VyKVxuICAgICAgLmFkanVzdG1lbnQodGhpcy5hZGp1c3RtZW50KVxuICAgICAgLmNvbnRleHQodGhpcy5vdmVybGF5Q29udGV4dClcbiAgICAgIC5vdmVybGF5Q29uZmlnKHRoaXMub3ZlcmxheUNvbmZpZyk7XG4gIH1cblxuICAvKlxuICAgKiBOYk1lbnVDb21wb25lbnQgd2lsbCBjcmFzaCBpZiBkb24ndCBwYXNzIG1lbnUgaXRlbXMgdG8gaXQuXG4gICAqIFNvLCB3ZSBqdXN0IHZhbGlkYXRpbmcgdGhlbSBhbmQgdGhyb3cgY3VzdG9tIG9idmlvdXMgZXJyb3IuXG4gICAqICovXG4gIHByaXZhdGUgdmFsaWRhdGVJdGVtcyhpdGVtczogTmJNZW51SXRlbVtdKSB7XG4gICAgaWYgKCFpdGVtcyB8fCAhaXRlbXMubGVuZ3RoKSB7XG4gICAgICB0aHJvdyBFcnJvcihgTGlzdCBvZiBtZW51IGl0ZW1zIGV4cGVjdGVkLCBidXQgZ2l2ZW46ICR7aXRlbXN9YClcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHN1YnNjcmliZU9uSXRlbUNsaWNrKCkge1xuICAgIHRoaXMubWVudVNlcnZpY2Uub25JdGVtQ2xpY2soKVxuICAgICAgLnBpcGUoXG4gICAgICAgIGZpbHRlcigoeyB0YWcgfSkgPT4gdGFnID09PSB0aGlzLnRhZyAmJiB0aGlzLnRyaWdnZXIgIT09IE5iVHJpZ2dlci5OT09QKSxcbiAgICAgICAgdGFrZVVudGlsKHRoaXMuZGVzdHJveSQpLFxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLmhpZGUoKSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgdXBkYXRlT3ZlcmxheUNvbnRleHQoKSB7XG4gICAgdGhpcy5vdmVybGF5Q29udGV4dCA9IHsgaXRlbXM6IHRoaXMuaXRlbXMsIHBvc2l0aW9uOiB0aGlzLnBvc2l0aW9uLCB0YWc6IHRoaXMudGFnIH07XG4gIH1cbn1cbiJdfQ==