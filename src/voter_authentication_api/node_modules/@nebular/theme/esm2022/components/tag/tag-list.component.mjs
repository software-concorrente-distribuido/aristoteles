/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { ChangeDetectionStrategy, Component, ContentChild, ContentChildren, EventEmitter, HostBinding, HostListener, Input, Output, } from '@angular/core';
import { merge, Subject } from 'rxjs';
import { filter, finalize, map, startWith, switchMap, takeUntil } from 'rxjs/operators';
import { BACKSPACE, DELETE, SPACE } from '../cdk/keycodes/keycodes';
import { convertToBoolProperty } from '../helpers';
import { NbAutocompleteDirective } from '../autocomplete/autocomplete.directive';
import { NbTagComponent } from './tag.component';
import { NbTagInputDirective } from './tag-input.directive';
import * as i0 from "@angular/core";
import * as i1 from "../cdk/a11y/a11y.module";
import * as i2 from "../cdk/a11y/descendant-key-manager";
import * as i3 from "../../services/direction.service";
import * as i4 from "../../services/status.service";
/**
 *
 * `nb-tag-list` component displays a list of `nb-tag` components.
 *
 * @stacked-example(Tag List Showcase, tag/tag-showcase.component)
 *
 * @styles
 *
 * tag-list-tiny-tag-offset:
 * tag-list-small-tag-offset:
 * tag-list-medium-tag-offset:
 * tag-list-large-tag-offset:
 * tag-list-giant-tag-offset:
 * tag-list-with-input-tiny-padding:
 * tag-list-with-input-small-padding:
 * tag-list-with-input-medium-padding:
 * tag-list-with-input-large-padding:
 * tag-list-with-input-giant-padding:
 * tag-list-with-input-rectangle-border-radius:
 * tag-list-with-input-semi-round-border-radius:
 * tag-list-with-input-round-border-radius:
 */
export class NbTagListComponent {
    get multiple() {
        return this._multiple;
    }
    set multiple(value) {
        this._multiple = convertToBoolProperty(value);
    }
    get _hasInput() {
        return !!this.tagInput;
    }
    get _isFocused() {
        return this.focused;
    }
    get _isFullWidth() {
        return !!this.tagInput?.fullWidth;
    }
    get _inputClasses() {
        if (this._hasInput) {
            return [
                `shape-${this.tagInput.shape}`,
                `size-${this.tagInput.fieldSize}`,
                this.statusService.getStatusClass(this.tagInput.status),
            ];
        }
        return [`size-${this.size}`];
    }
    _onKeydown(event) {
        this.keyDown$.next(event);
    }
    _onClick({ target }) {
        const clickedTag = this.tags.find((tag) => tag._hostElement.nativeElement === target);
        if (clickedTag) {
            this.tagClick$.next(clickedTag);
        }
    }
    constructor(hostElement, cd, renderer, zone, focusMonitor, activeDescendantKeyManagerFactory, directionService, statusService) {
        this.hostElement = hostElement;
        this.cd = cd;
        this.renderer = renderer;
        this.zone = zone;
        this.focusMonitor = focusMonitor;
        this.activeDescendantKeyManagerFactory = activeDescendantKeyManagerFactory;
        this.directionService = directionService;
        this.statusService = statusService;
        this.destroy$ = new Subject();
        this.keyDown$ = new Subject();
        this.tagClick$ = new Subject();
        this.focused = false;
        /**
         * Controls tags offset.
         */
        this.size = 'medium';
        this.tabIndex = 0;
        this.role = 'listbox';
        this._multiple = false;
        this.activeTagId = null;
        /**
         * Emits when tag need to be removed (whether because of click on the remove button
         * or when `delete` or `backspace` key pressed).
         */
        this.tagRemove = new EventEmitter();
    }
    ngOnInit() {
        this.focusMonitor
            .monitor(this.hostElement, true)
            .pipe(map((origin) => !!origin), finalize(() => this.focusMonitor.stopMonitoring(this.hostElement)), takeUntil(this.destroy$))
            .subscribe((isFocused) => this.onFocusChange(isFocused));
    }
    ngAfterContentInit() {
        this.initKeyManager();
        this.setAutocompleteCustomHost();
    }
    ngAfterViewInit() {
        this.listenToLayoutDirectionChange();
        this.listenListKeyDown();
        this.listenInputKeyDown();
        this.listenTagClick();
        this.listenTagRemove();
        this.listenTagDestroy();
        this.listenActiveTagChange();
        this.listenNoTags();
        // TODO: #2254
        this.zone.runOutsideAngular(() => setTimeout(() => {
            this.renderer.addClass(this.hostElement.nativeElement, 'nb-transition');
        }));
    }
    ngOnDestroy() {
        this.destroy$.next();
    }
    initKeyManager() {
        this.keyManager = this.activeDescendantKeyManagerFactory
            .create(this.tags)
            .withHorizontalOrientation(this.directionService.getDirection())
            .withWrap();
    }
    listenToLayoutDirectionChange() {
        this.directionService
            .onDirectionChange()
            .pipe(takeUntil(this.destroy$))
            .subscribe((direction) => this.keyManager.withHorizontalOrientation(direction));
    }
    listenListKeyDown() {
        const tagListKeyDown$ = this.keyDown$.pipe(filter(({ target }) => target === this.hostElement.nativeElement));
        const activeTagKeyDown$ = tagListKeyDown$.pipe(filter(() => !!this.keyManager.activeItem));
        tagListKeyDown$
            .pipe(takeUntil(this.destroy$))
            .subscribe((event) => this.keyManager.onKeydown(event));
        activeTagKeyDown$
            .pipe(filter(({ keyCode }) => keyCode === SPACE), takeUntil(this.destroy$))
            .subscribe((event) => {
            this.toggleTag(this.keyManager.activeItem);
            // Prevents page scroll.
            event.preventDefault();
        });
        activeTagKeyDown$
            .pipe(filter(({ keyCode }) => this.isBackspaceOrDelete(keyCode)), map(() => this.keyManager.activeItem), takeUntil(this.destroy$))
            .subscribe((tagToRemove) => tagToRemove._remove());
    }
    listenInputKeyDown() {
        const inputKeyDown$ = this.keyDown$.pipe(filter(({ target }) => target === this.tagInput?._hostElement.nativeElement));
        inputKeyDown$
            .pipe(filter(({ keyCode }) => {
            return this.tagInput._value === '' && this.isBackspaceOrDelete(keyCode) && this.tags.length > 0;
        }), takeUntil(this.destroy$))
            .subscribe(() => {
            this.hostElement.nativeElement.focus();
            this.keyManager.setLastItemActive();
            this.cd.markForCheck();
        });
    }
    listenTagClick() {
        this.tagClick$.pipe(takeUntil(this.destroy$)).subscribe((clickedTag) => {
            this.toggleTag(clickedTag);
            this.keyManager.setActiveItem(clickedTag);
        });
    }
    listenTagRemove() {
        this.tags.changes
            .pipe(startWith(this.tags), switchMap((tags) => merge(...tags.map((tag) => tag.remove))), takeUntil(this.destroy$))
            .subscribe((tagToRemove) => this.tagRemove.emit(tagToRemove));
    }
    listenTagDestroy() {
        this.tags.changes
            .pipe(startWith(this.tags), switchMap((tags) => merge(...tags.map((tag) => tag.destroy$))), filter((destroyedTag) => destroyedTag === this.keyManager.activeItem), map((destroyedTag) => destroyedTag === this.tags.last), takeUntil(this.destroy$))
            .subscribe((isLastTagDestroyed) => {
            if (isLastTagDestroyed) {
                this.keyManager.setPreviousItemActive();
            }
            else {
                this.keyManager.setNextItemActive();
            }
        });
    }
    listenNoTags() {
        this.tags.changes
            .pipe(startWith(this.tags), filter((tags) => tags.length === 0), takeUntil(this.destroy$))
            .subscribe(() => this.focusInputIfActive());
    }
    listenActiveTagChange() {
        this.keyManager.change
            .pipe(map(() => this.keyManager.activeItem?._id), takeUntil(this.destroy$))
            .subscribe((activeTagId) => {
            this.activeTagId = activeTagId;
            this.cd.markForCheck();
        });
    }
    onFocusChange(isFocused) {
        this.focused = isFocused;
        this.cd.markForCheck();
        if (!isFocused || this.tagInput?.focused$.value) {
            this.keyManager?.setActiveItem(-1);
            return;
        }
        // Focus input when focusing tag list without tags. Otherwise select first tag.
        if (this.tags.length === 0 && this._hasInput) {
            this.focusInput();
        }
        else {
            this.keyManager.setFirstItemActive();
        }
    }
    isBackspaceOrDelete(keyCode) {
        return keyCode === BACKSPACE || keyCode === DELETE;
    }
    setAutocompleteCustomHost() {
        if (this.autocompleteDirective) {
            this.autocompleteDirective.customOverlayHost = this.hostElement;
        }
    }
    toggleTag(tagToToggle) {
        tagToToggle._toggleSelection();
        if (tagToToggle.selected && !this.multiple) {
            this.tags.forEach((tag) => {
                if (tag !== tagToToggle) {
                    tag.selected = false;
                }
            });
        }
    }
    focusInput() {
        if (this._hasInput) {
            this.tagInput._hostElement.nativeElement.focus();
        }
    }
    focusInputIfActive() {
        if (this._isFocused) {
            this.focusInput();
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbTagListComponent, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: i0.Renderer2 }, { token: i0.NgZone }, { token: i1.NbFocusMonitor }, { token: i2.NbActiveDescendantKeyManagerFactoryService }, { token: i3.NbLayoutDirectionService }, { token: i4.NbStatusService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.1.0", type: NbTagListComponent, selector: "nb-tag-list", inputs: { size: "size", tabIndex: "tabIndex", role: "role", multiple: "multiple" }, outputs: { tagRemove: "tagRemove" }, host: { listeners: { "keydown": "_onKeydown($event)", "click": "_onClick($event)" }, properties: { "attr.tabindex": "this.tabIndex", "attr.role": "this.role", "attr.aria-multiselectable": "this.multiple", "attr.aria-activedescendant": "this.activeTagId", "class.nb-tag-list-with-input": "this._hasInput", "class.focus": "this._isFocused", "class.input-full-width": "this._isFullWidth", "class": "this._inputClasses" } }, queries: [{ propertyName: "tagInput", first: true, predicate: NbTagInputDirective, descendants: true }, { propertyName: "autocompleteDirective", first: true, predicate: NbAutocompleteDirective, descendants: true }, { propertyName: "tags", predicate: NbTagComponent }], exportAs: ["nbTagList"], ngImport: i0, template: `
    <div class="nb-tag-list-tags-wrapper">
      <ng-content select="nb-tag, input[nbTagInput]"></ng-content>
    </div>
  `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbTagListComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nb-tag-list',
                    template: `
    <div class="nb-tag-list-tags-wrapper">
      <ng-content select="nb-tag, input[nbTagInput]"></ng-content>
    </div>
  `,
                    exportAs: 'nbTagList',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: i0.Renderer2 }, { type: i0.NgZone }, { type: i1.NbFocusMonitor }, { type: i2.NbActiveDescendantKeyManagerFactoryService }, { type: i3.NbLayoutDirectionService }, { type: i4.NbStatusService }], propDecorators: { tags: [{
                type: ContentChildren,
                args: [NbTagComponent]
            }], tagInput: [{
                type: ContentChild,
                args: [NbTagInputDirective]
            }], autocompleteDirective: [{
                type: ContentChild,
                args: [NbAutocompleteDirective]
            }], size: [{
                type: Input
            }], tabIndex: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['attr.tabindex']
            }], role: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['attr.role']
            }], multiple: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['attr.aria-multiselectable']
            }], activeTagId: [{
                type: HostBinding,
                args: ['attr.aria-activedescendant']
            }], tagRemove: [{
                type: Output
            }], _hasInput: [{
                type: HostBinding,
                args: ['class.nb-tag-list-with-input']
            }], _isFocused: [{
                type: HostBinding,
                args: ['class.focus']
            }], _isFullWidth: [{
                type: HostBinding,
                args: ['class.input-full-width']
            }], _inputClasses: [{
                type: HostBinding,
                args: ['class']
            }], _onKeydown: [{
                type: HostListener,
                args: ['keydown', ['$event']]
            }], _onClick: [{
                type: HostListener,
                args: ['click', ['$event']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnLWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2ZyYW1ld29yay90aGVtZS9jb21wb25lbnRzL3RhZy90YWctbGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFHTCx1QkFBdUIsRUFFdkIsU0FBUyxFQUNULFlBQVksRUFDWixlQUFlLEVBRWYsWUFBWSxFQUNaLFdBQVcsRUFDWCxZQUFZLEVBQ1osS0FBSyxFQUlMLE1BQU0sR0FHUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN0QyxPQUFPLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQVN4RixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNwRSxPQUFPLEVBQUUscUJBQXFCLEVBQWtCLE1BQU0sWUFBWSxDQUFDO0FBRW5FLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ2pGLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7Ozs7O0FBRTVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQkc7QUFXSCxNQUFNLE9BQU8sa0JBQWtCO0lBeUI3QixJQUVJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDeEIsQ0FBQztJQUNELElBQUksUUFBUSxDQUFDLEtBQWM7UUFDekIsSUFBSSxDQUFDLFNBQVMsR0FBRyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBYUQs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QkFNdkMsVUFBVTtzQkFEYixXQUFXO3VCQUFDLGFBQWE7Z0JBTXRCLFlBQVk7c0JBRGYsV0FBVzt1QkFBQyx3QkFBd0I7Z0JBTWpDLGFBQWE7c0JBRGhCLFdBQVc7dUJBQUMsT0FBTztnQkFjcEIsVUFBVTtzQkFEVCxZQUFZO3VCQUFDLFNBQVMsRUFBRSxDQUFDLFFBQVEsQ0FBQztnQkFNbkMsUUFBUTtzQkFEUCxZQUFZO3VCQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBBa3Zlby4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi9cblxuaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3RCaW5kaW5nLFxuICBIb3N0TGlzdGVuZXIsXG4gIElucHV0LFxuICBOZ1pvbmUsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFF1ZXJ5TGlzdCxcbiAgUmVuZGVyZXIyLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IG1lcmdlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIGZpbmFsaXplLCBtYXAsIHN0YXJ0V2l0aCwgc3dpdGNoTWFwLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IE5iTGF5b3V0RGlyZWN0aW9uLCBOYkxheW91dERpcmVjdGlvblNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9kaXJlY3Rpb24uc2VydmljZSc7XG5pbXBvcnQgeyBOYlN0YXR1c1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9zdGF0dXMuc2VydmljZSc7XG5pbXBvcnQgeyBOYkZvY3VzTW9uaXRvciB9IGZyb20gJy4uL2Nkay9hMTF5L2ExMXkubW9kdWxlJztcbmltcG9ydCB7XG4gIE5iQWN0aXZlRGVzY2VuZGFudEtleU1hbmFnZXIsXG4gIE5iQWN0aXZlRGVzY2VuZGFudEtleU1hbmFnZXJGYWN0b3J5U2VydmljZSxcbn0gZnJvbSAnLi4vY2RrL2ExMXkvZGVzY2VuZGFudC1rZXktbWFuYWdlcic7XG5pbXBvcnQgeyBCQUNLU1BBQ0UsIERFTEVURSwgU1BBQ0UgfSBmcm9tICcuLi9jZGsva2V5Y29kZXMva2V5Y29kZXMnO1xuaW1wb3J0IHsgY29udmVydFRvQm9vbFByb3BlcnR5LCBOYkJvb2xlYW5JbnB1dCB9IGZyb20gJy4uL2hlbHBlcnMnO1xuaW1wb3J0IHsgTmJDb21wb25lbnRTaXplIH0gZnJvbSAnLi4vY29tcG9uZW50LXNpemUnO1xuaW1wb3J0IHsgTmJBdXRvY29tcGxldGVEaXJlY3RpdmUgfSBmcm9tICcuLi9hdXRvY29tcGxldGUvYXV0b2NvbXBsZXRlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBOYlRhZ0NvbXBvbmVudCB9IGZyb20gJy4vdGFnLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOYlRhZ0lucHV0RGlyZWN0aXZlIH0gZnJvbSAnLi90YWctaW5wdXQuZGlyZWN0aXZlJztcblxuLyoqXG4gKlxuICogYG5iLXRhZy1saXN0YCBjb21wb25lbnQgZGlzcGxheXMgYSBsaXN0IG9mIGBuYi10YWdgIGNvbXBvbmVudHMuXG4gKlxuICogQHN0YWNrZWQtZXhhbXBsZShUYWcgTGlzdCBTaG93Y2FzZSwgdGFnL3RhZy1zaG93Y2FzZS5jb21wb25lbnQpXG4gKlxuICogQHN0eWxlc1xuICpcbiAqIHRhZy1saXN0LXRpbnktdGFnLW9mZnNldDpcbiAqIHRhZy1saXN0LXNtYWxsLXRhZy1vZmZzZXQ6XG4gKiB0YWctbGlzdC1tZWRpdW0tdGFnLW9mZnNldDpcbiAqIHRhZy1saXN0LWxhcmdlLXRhZy1vZmZzZXQ6XG4gKiB0YWctbGlzdC1naWFudC10YWctb2Zmc2V0OlxuICogdGFnLWxpc3Qtd2l0aC1pbnB1dC10aW55LXBhZGRpbmc6XG4gKiB0YWctbGlzdC13aXRoLWlucHV0LXNtYWxsLXBhZGRpbmc6XG4gKiB0YWctbGlzdC13aXRoLWlucHV0LW1lZGl1bS1wYWRkaW5nOlxuICogdGFnLWxpc3Qtd2l0aC1pbnB1dC1sYXJnZS1wYWRkaW5nOlxuICogdGFnLWxpc3Qtd2l0aC1pbnB1dC1naWFudC1wYWRkaW5nOlxuICogdGFnLWxpc3Qtd2l0aC1pbnB1dC1yZWN0YW5nbGUtYm9yZGVyLXJhZGl1czpcbiAqIHRhZy1saXN0LXdpdGgtaW5wdXQtc2VtaS1yb3VuZC1ib3JkZXItcmFkaXVzOlxuICogdGFnLWxpc3Qtd2l0aC1pbnB1dC1yb3VuZC1ib3JkZXItcmFkaXVzOlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduYi10YWctbGlzdCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cIm5iLXRhZy1saXN0LXRhZ3Mtd3JhcHBlclwiPlxuICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwibmItdGFnLCBpbnB1dFtuYlRhZ0lucHV0XVwiPjwvbmctY29udGVudD5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgZXhwb3J0QXM6ICduYlRhZ0xpc3QnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgTmJUYWdMaXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlckNvbnRlbnRJbml0LCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgZGVzdHJveSQ6IFN1YmplY3Q8dm9pZD4gPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkga2V5RG93biQ6IFN1YmplY3Q8S2V5Ym9hcmRFdmVudD4gPSBuZXcgU3ViamVjdDxLZXlib2FyZEV2ZW50PigpO1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgdGFnQ2xpY2skOiBTdWJqZWN0PE5iVGFnQ29tcG9uZW50PiA9IG5ldyBTdWJqZWN0PE5iVGFnQ29tcG9uZW50PigpO1xuICBwcm90ZWN0ZWQgZm9jdXNlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBwcm90ZWN0ZWQga2V5TWFuYWdlcjogTmJBY3RpdmVEZXNjZW5kYW50S2V5TWFuYWdlcjxOYlRhZ0NvbXBvbmVudD47XG5cbiAgQENvbnRlbnRDaGlsZHJlbihOYlRhZ0NvbXBvbmVudCkgdGFnczogUXVlcnlMaXN0PE5iVGFnQ29tcG9uZW50PjtcbiAgQENvbnRlbnRDaGlsZChOYlRhZ0lucHV0RGlyZWN0aXZlKSB0YWdJbnB1dDogTmJUYWdJbnB1dERpcmVjdGl2ZTtcbiAgQENvbnRlbnRDaGlsZChOYkF1dG9jb21wbGV0ZURpcmVjdGl2ZSkgYXV0b2NvbXBsZXRlRGlyZWN0aXZlOiBOYkF1dG9jb21wbGV0ZURpcmVjdGl2ZTxhbnk+O1xuXG4gIC8qKlxuICAgKiBDb250cm9scyB0YWdzIG9mZnNldC5cbiAgICovXG4gIEBJbnB1dCgpXG4gIHNpemU6IE5iQ29tcG9uZW50U2l6ZSA9ICdtZWRpdW0nO1xuXG4gIEBJbnB1dCgpXG4gIEBIb3N0QmluZGluZygnYXR0ci50YWJpbmRleCcpXG4gIHRhYkluZGV4OiBudW1iZXIgPSAwO1xuXG4gIEBJbnB1dCgpXG4gIEBIb3N0QmluZGluZygnYXR0ci5yb2xlJylcbiAgcm9sZTogc3RyaW5nID0gJ2xpc3Rib3gnO1xuXG4gIEBJbnB1dCgpXG4gIEBIb3N0QmluZGluZygnYXR0ci5hcmlhLW11bHRpc2VsZWN0YWJsZScpXG4gIGdldCBtdWx0aXBsZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fbXVsdGlwbGU7XG4gIH1cbiAgc2V0IG11bHRpcGxlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fbXVsdGlwbGUgPSBjb252ZXJ0VG9Cb29sUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIHByb3RlY3RlZCBfbXVsdGlwbGU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX211bHRpcGxlOiBOYkJvb2xlYW5JbnB1dDtcblxuICBASG9zdEJpbmRpbmcoJ2F0dHIuYXJpYS1hY3RpdmVkZXNjZW5kYW50JylcbiAgYWN0aXZlVGFnSWQ6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuXG4gIC8qKlxuICAgKiBFbWl0cyB3aGVuIHRhZyBuZWVkIHRvIGJlIHJlbW92ZWQgKHdoZXRoZXIgYmVjYXVzZSBvZiBjbGljayBvbiB0aGUgcmVtb3ZlIGJ1dHRvblxuICAgKiBvciB3aGVuIGBkZWxldGVgIG9yIGBiYWNrc3BhY2VgIGtleSBwcmVzc2VkKS5cbiAgICovXG4gIEBPdXRwdXQoKSByZWFkb25seSB0YWdSZW1vdmU6IEV2ZW50RW1pdHRlcjxOYlRhZ0NvbXBvbmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE5iVGFnQ29tcG9uZW50PigpO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MubmItdGFnLWxpc3Qtd2l0aC1pbnB1dCcpXG4gIGdldCBfaGFzSW5wdXQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhdGhpcy50YWdJbnB1dDtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3MuZm9jdXMnKVxuICBnZXQgX2lzRm9jdXNlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5mb2N1c2VkO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5pbnB1dC1mdWxsLXdpZHRoJylcbiAgZ2V0IF9pc0Z1bGxXaWR0aCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gISF0aGlzLnRhZ0lucHV0Py5mdWxsV2lkdGg7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzJylcbiAgZ2V0IF9pbnB1dENsYXNzZXMoKTogc3RyaW5nW10ge1xuICAgIGlmICh0aGlzLl9oYXNJbnB1dCkge1xuICAgICAgcmV0dXJuIFtcbiAgICAgICAgYHNoYXBlLSR7dGhpcy50YWdJbnB1dC5zaGFwZX1gLFxuICAgICAgICBgc2l6ZS0ke3RoaXMudGFnSW5wdXQuZmllbGRTaXplfWAsXG4gICAgICAgIHRoaXMuc3RhdHVzU2VydmljZS5nZXRTdGF0dXNDbGFzcyh0aGlzLnRhZ0lucHV0LnN0YXR1cyksXG4gICAgICBdO1xuICAgIH1cblxuICAgIHJldHVybiBbYHNpemUtJHt0aGlzLnNpemV9YF07XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdrZXlkb3duJywgWyckZXZlbnQnXSlcbiAgX29uS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIHRoaXMua2V5RG93biQubmV4dChldmVudCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pXG4gIF9vbkNsaWNrKHsgdGFyZ2V0IH06IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICBjb25zdCBjbGlja2VkVGFnID0gdGhpcy50YWdzLmZpbmQoKHRhZzogTmJUYWdDb21wb25lbnQpID0+IHRhZy5faG9zdEVsZW1lbnQubmF0aXZlRWxlbWVudCA9PT0gdGFyZ2V0KTtcbiAgICBpZiAoY2xpY2tlZFRhZykge1xuICAgICAgdGhpcy50YWdDbGljayQubmV4dChjbGlja2VkVGFnKTtcbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgaG9zdEVsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgIHByb3RlY3RlZCBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJvdGVjdGVkIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgcHJvdGVjdGVkIHpvbmU6IE5nWm9uZSxcbiAgICBwcm90ZWN0ZWQgZm9jdXNNb25pdG9yOiBOYkZvY3VzTW9uaXRvcixcbiAgICBwcm90ZWN0ZWQgYWN0aXZlRGVzY2VuZGFudEtleU1hbmFnZXJGYWN0b3J5OiBOYkFjdGl2ZURlc2NlbmRhbnRLZXlNYW5hZ2VyRmFjdG9yeVNlcnZpY2U8TmJUYWdDb21wb25lbnQ+LFxuICAgIHByb3RlY3RlZCBkaXJlY3Rpb25TZXJ2aWNlOiBOYkxheW91dERpcmVjdGlvblNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHN0YXR1c1NlcnZpY2U6IE5iU3RhdHVzU2VydmljZSxcbiAgKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuZm9jdXNNb25pdG9yXG4gICAgICAubW9uaXRvcih0aGlzLmhvc3RFbGVtZW50LCB0cnVlKVxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcCgob3JpZ2luKSA9PiAhIW9yaWdpbiksXG4gICAgICAgIGZpbmFsaXplKCgpID0+IHRoaXMuZm9jdXNNb25pdG9yLnN0b3BNb25pdG9yaW5nKHRoaXMuaG9zdEVsZW1lbnQpKSxcbiAgICAgICAgdGFrZVVudGlsKHRoaXMuZGVzdHJveSQpLFxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSgoaXNGb2N1c2VkOiBib29sZWFuKSA9PiB0aGlzLm9uRm9jdXNDaGFuZ2UoaXNGb2N1c2VkKSk7XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgdGhpcy5pbml0S2V5TWFuYWdlcigpO1xuICAgIHRoaXMuc2V0QXV0b2NvbXBsZXRlQ3VzdG9tSG9zdCgpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMubGlzdGVuVG9MYXlvdXREaXJlY3Rpb25DaGFuZ2UoKTtcbiAgICB0aGlzLmxpc3Rlbkxpc3RLZXlEb3duKCk7XG4gICAgdGhpcy5saXN0ZW5JbnB1dEtleURvd24oKTtcbiAgICB0aGlzLmxpc3RlblRhZ0NsaWNrKCk7XG4gICAgdGhpcy5saXN0ZW5UYWdSZW1vdmUoKTtcbiAgICB0aGlzLmxpc3RlblRhZ0Rlc3Ryb3koKTtcbiAgICB0aGlzLmxpc3RlbkFjdGl2ZVRhZ0NoYW5nZSgpO1xuICAgIHRoaXMubGlzdGVuTm9UYWdzKCk7XG5cbiAgICAvLyBUT0RPOiAjMjI1NFxuICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PlxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5ob3N0RWxlbWVudC5uYXRpdmVFbGVtZW50LCAnbmItdHJhbnNpdGlvbicpO1xuICAgICAgfSksXG4gICAgKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuZGVzdHJveSQubmV4dCgpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGluaXRLZXlNYW5hZ2VyKCk6IHZvaWQge1xuICAgIHRoaXMua2V5TWFuYWdlciA9IHRoaXMuYWN0aXZlRGVzY2VuZGFudEtleU1hbmFnZXJGYWN0b3J5XG4gICAgICAuY3JlYXRlKHRoaXMudGFncylcbiAgICAgIC53aXRoSG9yaXpvbnRhbE9yaWVudGF0aW9uKHRoaXMuZGlyZWN0aW9uU2VydmljZS5nZXREaXJlY3Rpb24oKSlcbiAgICAgIC53aXRoV3JhcCgpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGxpc3RlblRvTGF5b3V0RGlyZWN0aW9uQ2hhbmdlKCk6IHZvaWQge1xuICAgIHRoaXMuZGlyZWN0aW9uU2VydmljZVxuICAgICAgLm9uRGlyZWN0aW9uQ2hhbmdlKClcbiAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSlcbiAgICAgIC5zdWJzY3JpYmUoKGRpcmVjdGlvbjogTmJMYXlvdXREaXJlY3Rpb24pID0+IHRoaXMua2V5TWFuYWdlci53aXRoSG9yaXpvbnRhbE9yaWVudGF0aW9uKGRpcmVjdGlvbikpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGxpc3Rlbkxpc3RLZXlEb3duKCk6IHZvaWQge1xuICAgIGNvbnN0IHRhZ0xpc3RLZXlEb3duJCA9IHRoaXMua2V5RG93biQucGlwZShcbiAgICAgIGZpbHRlcigoeyB0YXJnZXQgfTogS2V5Ym9hcmRFdmVudCkgPT4gdGFyZ2V0ID09PSB0aGlzLmhvc3RFbGVtZW50Lm5hdGl2ZUVsZW1lbnQpLFxuICAgICk7XG4gICAgY29uc3QgYWN0aXZlVGFnS2V5RG93biQgPSB0YWdMaXN0S2V5RG93biQucGlwZShmaWx0ZXIoKCkgPT4gISF0aGlzLmtleU1hbmFnZXIuYWN0aXZlSXRlbSkpO1xuXG4gICAgdGFnTGlzdEtleURvd24kXG4gICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpXG4gICAgICAuc3Vic2NyaWJlKChldmVudDogS2V5Ym9hcmRFdmVudCkgPT4gdGhpcy5rZXlNYW5hZ2VyLm9uS2V5ZG93bihldmVudCkpO1xuXG4gICAgYWN0aXZlVGFnS2V5RG93biRcbiAgICAgIC5waXBlKFxuICAgICAgICBmaWx0ZXIoKHsga2V5Q29kZSB9OiBLZXlib2FyZEV2ZW50KSA9PiBrZXlDb2RlID09PSBTUEFDRSksXG4gICAgICAgIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSxcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoKGV2ZW50OiBLZXlib2FyZEV2ZW50KSA9PiB7XG4gICAgICAgIHRoaXMudG9nZ2xlVGFnKHRoaXMua2V5TWFuYWdlci5hY3RpdmVJdGVtKTtcbiAgICAgICAgLy8gUHJldmVudHMgcGFnZSBzY3JvbGwuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9KTtcblxuICAgIGFjdGl2ZVRhZ0tleURvd24kXG4gICAgICAucGlwZShcbiAgICAgICAgZmlsdGVyKCh7IGtleUNvZGUgfTogS2V5Ym9hcmRFdmVudCkgPT4gdGhpcy5pc0JhY2tzcGFjZU9yRGVsZXRlKGtleUNvZGUpKSxcbiAgICAgICAgbWFwKCgpID0+IHRoaXMua2V5TWFuYWdlci5hY3RpdmVJdGVtKSxcbiAgICAgICAgdGFrZVVudGlsKHRoaXMuZGVzdHJveSQpLFxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSgodGFnVG9SZW1vdmU6IE5iVGFnQ29tcG9uZW50KSA9PiB0YWdUb1JlbW92ZS5fcmVtb3ZlKCkpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGxpc3RlbklucHV0S2V5RG93bigpOiB2b2lkIHtcbiAgICBjb25zdCBpbnB1dEtleURvd24kID0gdGhpcy5rZXlEb3duJC5waXBlKFxuICAgICAgZmlsdGVyKCh7IHRhcmdldCB9OiBLZXlib2FyZEV2ZW50KSA9PiB0YXJnZXQgPT09IHRoaXMudGFnSW5wdXQ/Ll9ob3N0RWxlbWVudC5uYXRpdmVFbGVtZW50KSxcbiAgICApO1xuXG4gICAgaW5wdXRLZXlEb3duJFxuICAgICAgLnBpcGUoXG4gICAgICAgIGZpbHRlcigoeyBrZXlDb2RlIH06IEtleWJvYXJkRXZlbnQpID0+IHtcbiAgICAgICAgICByZXR1cm4gdGhpcy50YWdJbnB1dC5fdmFsdWUgPT09ICcnICYmIHRoaXMuaXNCYWNrc3BhY2VPckRlbGV0ZShrZXlDb2RlKSAmJiB0aGlzLnRhZ3MubGVuZ3RoID4gMDtcbiAgICAgICAgfSksXG4gICAgICAgIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSxcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLmhvc3RFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLnNldExhc3RJdGVtQWN0aXZlKCk7XG4gICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHByb3RlY3RlZCBsaXN0ZW5UYWdDbGljaygpOiB2b2lkIHtcbiAgICB0aGlzLnRhZ0NsaWNrJC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSkuc3Vic2NyaWJlKChjbGlja2VkVGFnOiBOYlRhZ0NvbXBvbmVudCkgPT4ge1xuICAgICAgdGhpcy50b2dnbGVUYWcoY2xpY2tlZFRhZyk7XG4gICAgICB0aGlzLmtleU1hbmFnZXIuc2V0QWN0aXZlSXRlbShjbGlja2VkVGFnKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByb3RlY3RlZCBsaXN0ZW5UYWdSZW1vdmUoKTogdm9pZCB7XG4gICAgdGhpcy50YWdzLmNoYW5nZXNcbiAgICAgIC5waXBlKFxuICAgICAgICBzdGFydFdpdGgodGhpcy50YWdzKSxcbiAgICAgICAgc3dpdGNoTWFwKCh0YWdzOiBRdWVyeUxpc3Q8TmJUYWdDb21wb25lbnQ+KSA9PiBtZXJnZSguLi50YWdzLm1hcCgodGFnOiBOYlRhZ0NvbXBvbmVudCkgPT4gdGFnLnJlbW92ZSkpKSxcbiAgICAgICAgdGFrZVVudGlsKHRoaXMuZGVzdHJveSQpLFxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSgodGFnVG9SZW1vdmU6IE5iVGFnQ29tcG9uZW50KSA9PiB0aGlzLnRhZ1JlbW92ZS5lbWl0KHRhZ1RvUmVtb3ZlKSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgbGlzdGVuVGFnRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnRhZ3MuY2hhbmdlc1xuICAgICAgLnBpcGUoXG4gICAgICAgIHN0YXJ0V2l0aCh0aGlzLnRhZ3MpLFxuICAgICAgICBzd2l0Y2hNYXAoKHRhZ3M6IFF1ZXJ5TGlzdDxOYlRhZ0NvbXBvbmVudD4pID0+IG1lcmdlKC4uLnRhZ3MubWFwKCh0YWc6IE5iVGFnQ29tcG9uZW50KSA9PiB0YWcuZGVzdHJveSQpKSksXG4gICAgICAgIGZpbHRlcigoZGVzdHJveWVkVGFnOiBOYlRhZ0NvbXBvbmVudCkgPT4gZGVzdHJveWVkVGFnID09PSB0aGlzLmtleU1hbmFnZXIuYWN0aXZlSXRlbSksXG4gICAgICAgIG1hcCgoZGVzdHJveWVkVGFnOiBOYlRhZ0NvbXBvbmVudCkgPT4gZGVzdHJveWVkVGFnID09PSB0aGlzLnRhZ3MubGFzdCksXG4gICAgICAgIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSxcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoKGlzTGFzdFRhZ0Rlc3Ryb3llZDogYm9vbGVhbikgPT4ge1xuICAgICAgICBpZiAoaXNMYXN0VGFnRGVzdHJveWVkKSB7XG4gICAgICAgICAgdGhpcy5rZXlNYW5hZ2VyLnNldFByZXZpb3VzSXRlbUFjdGl2ZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMua2V5TWFuYWdlci5zZXROZXh0SXRlbUFjdGl2ZSgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIHByb3RlY3RlZCBsaXN0ZW5Ob1RhZ3MoKTogdm9pZCB7XG4gICAgdGhpcy50YWdzLmNoYW5nZXNcbiAgICAgIC5waXBlKFxuICAgICAgICBzdGFydFdpdGgodGhpcy50YWdzKSxcbiAgICAgICAgZmlsdGVyKCh0YWdzOiBRdWVyeUxpc3Q8TmJUYWdDb21wb25lbnQ+KSA9PiB0YWdzLmxlbmd0aCA9PT0gMCksXG4gICAgICAgIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSxcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5mb2N1c0lucHV0SWZBY3RpdmUoKSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgbGlzdGVuQWN0aXZlVGFnQ2hhbmdlKCk6IHZvaWQge1xuICAgIHRoaXMua2V5TWFuYWdlci5jaGFuZ2VcbiAgICAgIC5waXBlKFxuICAgICAgICBtYXAoKCkgPT4gdGhpcy5rZXlNYW5hZ2VyLmFjdGl2ZUl0ZW0/Ll9pZCksXG4gICAgICAgIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSxcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoKGFjdGl2ZVRhZ0lkOiBzdHJpbmcgfCBudWxsKSA9PiB7XG4gICAgICAgIHRoaXMuYWN0aXZlVGFnSWQgPSBhY3RpdmVUYWdJZDtcbiAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIG9uRm9jdXNDaGFuZ2UoaXNGb2N1c2VkOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5mb2N1c2VkID0gaXNGb2N1c2VkO1xuICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG5cbiAgICBpZiAoIWlzRm9jdXNlZCB8fCB0aGlzLnRhZ0lucHV0Py5mb2N1c2VkJC52YWx1ZSkge1xuICAgICAgdGhpcy5rZXlNYW5hZ2VyPy5zZXRBY3RpdmVJdGVtKC0xKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBGb2N1cyBpbnB1dCB3aGVuIGZvY3VzaW5nIHRhZyBsaXN0IHdpdGhvdXQgdGFncy4gT3RoZXJ3aXNlIHNlbGVjdCBmaXJzdCB0YWcuXG4gICAgaWYgKHRoaXMudGFncy5sZW5ndGggPT09IDAgJiYgdGhpcy5faGFzSW5wdXQpIHtcbiAgICAgIHRoaXMuZm9jdXNJbnB1dCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmtleU1hbmFnZXIuc2V0Rmlyc3RJdGVtQWN0aXZlKCk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIGlzQmFja3NwYWNlT3JEZWxldGUoa2V5Q29kZTogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGtleUNvZGUgPT09IEJBQ0tTUEFDRSB8fCBrZXlDb2RlID09PSBERUxFVEU7XG4gIH1cblxuICBwcm90ZWN0ZWQgc2V0QXV0b2NvbXBsZXRlQ3VzdG9tSG9zdCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5hdXRvY29tcGxldGVEaXJlY3RpdmUpIHtcbiAgICAgIHRoaXMuYXV0b2NvbXBsZXRlRGlyZWN0aXZlLmN1c3RvbU92ZXJsYXlIb3N0ID0gdGhpcy5ob3N0RWxlbWVudDtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgdG9nZ2xlVGFnKHRhZ1RvVG9nZ2xlOiBOYlRhZ0NvbXBvbmVudCk6IHZvaWQge1xuICAgIHRhZ1RvVG9nZ2xlLl90b2dnbGVTZWxlY3Rpb24oKTtcblxuICAgIGlmICh0YWdUb1RvZ2dsZS5zZWxlY3RlZCAmJiAhdGhpcy5tdWx0aXBsZSkge1xuICAgICAgdGhpcy50YWdzLmZvckVhY2goKHRhZzogTmJUYWdDb21wb25lbnQpID0+IHtcbiAgICAgICAgaWYgKHRhZyAhPT0gdGFnVG9Ub2dnbGUpIHtcbiAgICAgICAgICB0YWcuc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIGZvY3VzSW5wdXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2hhc0lucHV0KSB7XG4gICAgICB0aGlzLnRhZ0lucHV0Ll9ob3N0RWxlbWVudC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIGZvY3VzSW5wdXRJZkFjdGl2ZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5faXNGb2N1c2VkKSB7XG4gICAgICB0aGlzLmZvY3VzSW5wdXQoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==