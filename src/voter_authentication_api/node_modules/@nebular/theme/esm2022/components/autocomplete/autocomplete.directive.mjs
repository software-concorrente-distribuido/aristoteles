/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Directive, forwardRef, HostBinding, HostListener, Input, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { merge, Subject } from 'rxjs';
import { filter, startWith, switchMap, takeUntil, tap } from 'rxjs/operators';
import { NbTrigger } from '../cdk/overlay/overlay-trigger';
import { ENTER, ESCAPE } from '../cdk/keycodes/keycodes';
import { NbAdjustment, NbPosition, } from '../cdk/overlay/overlay-position';
import { NbKeyManagerActiveItemMode, } from '../cdk/a11y/descendant-key-manager';
import * as i0 from "@angular/core";
import * as i1 from "../cdk/overlay/overlay-service";
import * as i2 from "../cdk/overlay/overlay-trigger";
import * as i3 from "../cdk/overlay/overlay-position";
import * as i4 from "../cdk/a11y/descendant-key-manager";
/**
 * The `NbAutocompleteDirective` provides a capability to expand input with
 * `NbAutocompleteComponent` overlay containing options to select and fill input with.
 *
 * @stacked-example(Showcase, autocomplete/autocomplete-showcase.component)
 *
 * ### Installation
 *
 * Import `NbAutocompleteModule` to your feature module.
 * ```ts
 * @NgModule({
 *   imports: [
 *     // ...
 *     NbAutocompleteModule,
 *   ],
 * })
 * export class PageModule { }
 * ```
 * ### Usage
 *
 * You can bind control with form controls or ngModel.
 *
 * @stacked-example(Autocomplete form binding, autocomplete/autocomplete-form.component)
 *
 * Options in the autocomplete may be grouped using `nb-option-group` component.
 *
 * @stacked-example(Grouping, autocomplete/autocomplete-group.component)
 *
 * Autocomplete may change selected option value via provided function.
 *
 * @stacked-example(Custom display, autocomplete/autocomplete-custom-display.component)
 *
 * Also, autocomplete may make first option in option list active automatically.
 *
 * @stacked-example(Active first, autocomplete/autocomplete-active-first.component)
 *
 * */
export class NbAutocompleteDirective {
    /**
     * Determines is autocomplete overlay opened.
     * */
    get isOpen() {
        return this.overlayRef && this.overlayRef.hasAttached();
    }
    /**
     * Determines is autocomplete overlay closed.
     * */
    get isClosed() {
        return !this.isOpen;
    }
    /**
     * Provides autocomplete component.
     * */
    get autocomplete() {
        return this._autocomplete;
    }
    set autocomplete(autocomplete) {
        this._autocomplete = autocomplete;
    }
    get top() {
        return this.isOpen && this.autocomplete.options.length && this.autocomplete.overlayPosition === NbPosition.TOP;
    }
    get bottom() {
        return this.isOpen && this.autocomplete.options.length && this.autocomplete.overlayPosition === NbPosition.BOTTOM;
    }
    get ariaExpanded() {
        return this.isOpen && this.isOpen.toString();
    }
    get ariaOwns() {
        return this.isOpen ? this.autocomplete.id : null;
    }
    get ariaActiveDescendant() {
        return this.isOpen && this.keyManager.activeItem ? this.keyManager.activeItem.id : null;
    }
    constructor(hostRef, overlay, cd, triggerStrategyBuilder, positionBuilder, activeDescendantKeyManagerFactory, renderer) {
        this.hostRef = hostRef;
        this.overlay = overlay;
        this.cd = cd;
        this.triggerStrategyBuilder = triggerStrategyBuilder;
        this.positionBuilder = positionBuilder;
        this.activeDescendantKeyManagerFactory = activeDescendantKeyManagerFactory;
        this.renderer = renderer;
        this.destroy$ = new Subject();
        this._onChange = () => { };
        this._onTouched = () => { };
        /**
         * Determines options overlay offset (in pixels).
         **/
        this.overlayOffset = 8;
        /**
         * Determines options overlay scroll strategy.
         **/
        this.scrollStrategy = 'block';
        this.role = 'combobox';
        this.ariaAutocomplete = 'list';
        this.hasPopup = 'true';
    }
    ngAfterViewInit() {
        this.triggerStrategy = this.createTriggerStrategy();
        this.subscribeOnTriggers();
    }
    ngOnDestroy() {
        if (this.triggerStrategy) {
            this.triggerStrategy.destroy();
        }
        if (this.positionStrategy) {
            this.positionStrategy.dispose();
        }
        if (this.overlayRef) {
            this.overlayRef.dispose();
        }
        this.destroy$.next();
        this.destroy$.complete();
    }
    handleInput() {
        const currentValue = this.hostRef.nativeElement.value;
        this._onChange(currentValue);
        this.setHostInputValue(this.getDisplayValue(currentValue));
        this.show();
    }
    handleKeydown() {
        this.show();
    }
    handleBlur() {
        this._onTouched();
    }
    show() {
        if (this.shouldShow()) {
            this.attachToOverlay();
            this.setActiveItem();
        }
    }
    hide() {
        if (this.isOpen) {
            this.overlayRef.detach();
            // Need to update class via @HostBinding
            this.cd.markForCheck();
        }
    }
    writeValue(value) {
        this.handleInputValueUpdate(value);
    }
    registerOnChange(fn) {
        this._onChange = fn;
    }
    registerOnTouched(fn) {
        this._onTouched = fn;
    }
    setDisabledState(disabled) {
        this.renderer.setProperty(this.hostRef.nativeElement, 'disabled', disabled);
    }
    subscribeOnOptionClick() {
        /**
         * If the user changes provided options list in the runtime we have to handle this
         * and resubscribe on options selection changes event.
         * Otherwise, the user will not be able to select new options.
         * */
        this.autocomplete.options.changes
            .pipe(tap(() => this.setActiveItem()), startWith(this.autocomplete.options), switchMap((options) => {
            return merge(...options.map((option) => option.click));
        }), takeUntil(this.destroy$))
            .subscribe((clickedOption) => this.handleInputValueUpdate(clickedOption.value, true));
    }
    subscribeOnPositionChange() {
        this.positionStrategy.positionChange.pipe(takeUntil(this.destroy$)).subscribe((position) => {
            this.autocomplete.overlayPosition = position;
            this.cd.detectChanges();
        });
    }
    getActiveItem() {
        return this.keyManager.activeItem;
    }
    setupAutocomplete() {
        this.autocomplete.setHost(this.customOverlayHost || this.hostRef);
    }
    getDisplayValue(value) {
        const displayFn = this.autocomplete.handleDisplayFn;
        return displayFn ? displayFn(value) : value;
    }
    getContainer() {
        return (this.overlayRef &&
            this.isOpen &&
            {
                location: {
                    nativeElement: this.overlayRef.overlayElement,
                },
            });
    }
    handleInputValueUpdate(value, focusInput = false) {
        this.setHostInputValue(value ?? '');
        this._onChange(value);
        if (focusInput) {
            this.hostRef.nativeElement.focus();
        }
        this.autocomplete.emitSelected(value);
        this.hide();
    }
    subscribeOnTriggers() {
        this.triggerStrategy.show$.pipe(filter(() => this.isClosed)).subscribe(() => this.show());
        this.triggerStrategy.hide$.pipe(filter(() => this.isOpen)).subscribe(() => this.hide());
    }
    createTriggerStrategy() {
        return this.triggerStrategyBuilder
            .trigger(NbTrigger.FOCUS)
            .host(this.hostRef.nativeElement)
            .container(() => this.getContainer())
            .build();
    }
    createKeyManager() {
        this.keyManager = this.activeDescendantKeyManagerFactory.create(this.autocomplete.options);
    }
    setHostInputValue(value) {
        this.hostRef.nativeElement.value = this.getDisplayValue(value);
    }
    createPositionStrategy() {
        return this.positionBuilder
            .connectedTo(this.customOverlayHost || this.hostRef)
            .position(NbPosition.BOTTOM)
            .offset(this.overlayOffset)
            .adjustment(NbAdjustment.VERTICAL);
    }
    subscribeOnOverlayKeys() {
        this.overlayRef
            .keydownEvents()
            .pipe(takeUntil(this.destroy$))
            .subscribe((event) => {
            if (event.keyCode === ESCAPE && this.isOpen) {
                event.preventDefault();
                this.hostRef.nativeElement.focus();
                this.hide();
            }
            else if (event.keyCode === ENTER) {
                event.preventDefault();
                const activeItem = this.getActiveItem();
                if (!activeItem) {
                    return;
                }
                this.handleInputValueUpdate(activeItem.value, true);
            }
            else {
                this.keyManager.onKeydown(event);
            }
        });
    }
    setActiveItem() {
        // If autocomplete has activeFirst input set to true,
        // keyManager set first option active, otherwise - reset active option.
        const mode = this.autocomplete.activeFirst
            ? NbKeyManagerActiveItemMode.FIRST_ACTIVE
            : NbKeyManagerActiveItemMode.RESET_ACTIVE;
        this.keyManager.setActiveItem(mode);
        this.cd.detectChanges();
    }
    attachToOverlay() {
        if (!this.overlayRef) {
            this.setupAutocomplete();
            this.initOverlay();
        }
        this.overlayRef.attach(this.autocomplete.portal);
    }
    createOverlay() {
        const scrollStrategy = this.createScrollStrategy();
        this.overlayRef = this.overlay.create({
            positionStrategy: this.positionStrategy,
            scrollStrategy,
            panelClass: this.autocomplete.optionsPanelClass,
        });
    }
    initOverlay() {
        this.positionStrategy = this.createPositionStrategy();
        this.createKeyManager();
        this.subscribeOnPositionChange();
        this.subscribeOnOptionClick();
        this.checkOverlayVisibility();
        this.createOverlay();
        this.subscribeOnOverlayKeys();
    }
    checkOverlayVisibility() {
        this.autocomplete.options.changes.pipe(takeUntil(this.destroy$)).subscribe(() => {
            if (!this.autocomplete.options.length) {
                this.hide();
            }
        });
    }
    createScrollStrategy() {
        return this.overlay.scrollStrategies[this.scrollStrategy]();
    }
    shouldShow() {
        return this.isClosed;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbAutocompleteDirective, deps: [{ token: i0.ElementRef }, { token: i1.NbOverlayService }, { token: i0.ChangeDetectorRef }, { token: i2.NbTriggerStrategyBuilderService }, { token: i3.NbPositionBuilderService }, { token: i4.NbActiveDescendantKeyManagerFactoryService }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "17.1.0", type: NbAutocompleteDirective, selector: "input[nbAutocomplete]", inputs: { autocomplete: ["nbAutocomplete", "autocomplete"], overlayOffset: "overlayOffset", scrollStrategy: "scrollStrategy", customOverlayHost: "customOverlayHost" }, host: { listeners: { "input": "handleInput()", "keydown.arrowDown": "handleKeydown()", "keydown.arrowUp": "handleKeydown()", "blur": "handleBlur()" }, properties: { "class.nb-autocomplete-position-top": "this.top", "class.nb-autocomplete-position-bottom": "this.bottom", "attr.role": "this.role", "attr.aria-autocomplete": "this.ariaAutocomplete", "attr.haspopup": "this.hasPopup", "attr.aria-expanded": "this.ariaExpanded", "attr.aria-owns": "this.ariaOwns", "attr.aria-activedescendant": "this.ariaActiveDescendant" } }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => NbAutocompleteDirective),
                multi: true,
            },
        ], ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbAutocompleteDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'input[nbAutocomplete]',
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => NbAutocompleteDirective),
                            multi: true,
                        },
                    ],
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i1.NbOverlayService }, { type: i0.ChangeDetectorRef }, { type: i2.NbTriggerStrategyBuilderService }, { type: i3.NbPositionBuilderService }, { type: i4.NbActiveDescendantKeyManagerFactoryService }, { type: i0.Renderer2 }], propDecorators: { autocomplete: [{
                type: Input,
                args: ['nbAutocomplete']
            }], overlayOffset: [{
                type: Input
            }], scrollStrategy: [{
                type: Input
            }], customOverlayHost: [{
                type: Input
            }], top: [{
                type: HostBinding,
                args: ['class.nb-autocomplete-position-top']
            }], bottom: [{
                type: HostBinding,
                args: ['class.nb-autocomplete-position-bottom']
            }], role: [{
                type: HostBinding,
                args: ['attr.role']
            }], ariaAutocomplete: [{
                type: HostBinding,
                args: ['attr.aria-autocomplete']
            }], hasPopup: [{
                type: HostBinding,
                args: ['attr.haspopup']
            }], ariaExpanded: [{
                type: HostBinding,
                args: ['attr.aria-expanded']
            }], ariaOwns: [{
                type: HostBinding,
                args: ['attr.aria-owns']
            }], ariaActiveDescendant: [{
                type: HostBinding,
                args: ['attr.aria-activedescendant']
            }], handleInput: [{
                type: HostListener,
                args: ['input']
            }], handleKeydown: [{
                type: HostListener,
                args: ['keydown.arrowDown']
            }, {
                type: HostListener,
                args: ['keydown.arrowUp']
            }], handleBlur: [{
                type: HostListener,
                args: ['blur']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2NvbXBsZXRlLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9mcmFtZXdvcmsvdGhlbWUvY29tcG9uZW50cy9hdXRvY29tcGxldGUvYXV0b2NvbXBsZXRlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUlMLFNBQVMsRUFFVCxVQUFVLEVBQ1YsV0FBVyxFQUNYLFlBQVksRUFDWixLQUFLLEdBSU4sTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHOUUsT0FBTyxFQUFFLFNBQVMsRUFBc0QsTUFBTSxnQ0FBZ0MsQ0FBQztBQUUvRyxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3pELE9BQU8sRUFFTCxZQUFZLEVBQ1osVUFBVSxHQUVYLE1BQU0saUNBQWlDLENBQUM7QUFDekMsT0FBTyxFQUdMLDBCQUEwQixHQUMzQixNQUFNLG9DQUFvQyxDQUFDOzs7Ozs7QUFLNUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQW9DSztBQVdMLE1BQU0sT0FBTyx1QkFBdUI7SUF3QmxDOztTQUVLO0lBQ0wsSUFBSSxNQUFNO1FBQ1IsT0FBTyxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDMUQsQ0FBQztJQUVEOztTQUVLO0lBQ0wsSUFBSSxRQUFRO1FBQ1YsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDdEIs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dkIsV0FBVzt1QkFBQyw0QkFBNEI7Z0JBc0N6QyxXQUFXO3NCQURWLFlBQVk7dUJBQUMsT0FBTztnQkFVckIsYUFBYTtzQkFGWixZQUFZO3VCQUFDLG1CQUFtQjs7c0JBQ2hDLFlBQVk7dUJBQUMsaUJBQWlCO2dCQU0vQixVQUFVO3NCQURULFlBQVk7dUJBQUMsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBBa3Zlby4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi9cblxuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudFJlZixcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBmb3J3YXJkUmVmLFxuICBIb3N0QmluZGluZyxcbiAgSG9zdExpc3RlbmVyLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBRdWVyeUxpc3QsXG4gIFJlbmRlcmVyMixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBtZXJnZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCBzdGFydFdpdGgsIHN3aXRjaE1hcCwgdGFrZVVudGlsLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IE5iT3ZlcmxheVJlZiwgTmJTY3JvbGxTdHJhdGVneSB9IGZyb20gJy4uL2Nkay9vdmVybGF5L21hcHBpbmcnO1xuaW1wb3J0IHsgTmJUcmlnZ2VyLCBOYlRyaWdnZXJTdHJhdGVneSwgTmJUcmlnZ2VyU3RyYXRlZ3lCdWlsZGVyU2VydmljZSB9IGZyb20gJy4uL2Nkay9vdmVybGF5L292ZXJsYXktdHJpZ2dlcic7XG5pbXBvcnQgeyBOYk92ZXJsYXlTZXJ2aWNlIH0gZnJvbSAnLi4vY2RrL292ZXJsYXkvb3ZlcmxheS1zZXJ2aWNlJztcbmltcG9ydCB7IEVOVEVSLCBFU0NBUEUgfSBmcm9tICcuLi9jZGsva2V5Y29kZXMva2V5Y29kZXMnO1xuaW1wb3J0IHtcbiAgTmJBZGp1c3RhYmxlQ29ubmVjdGVkUG9zaXRpb25TdHJhdGVneSxcbiAgTmJBZGp1c3RtZW50LFxuICBOYlBvc2l0aW9uLFxuICBOYlBvc2l0aW9uQnVpbGRlclNlcnZpY2UsXG59IGZyb20gJy4uL2Nkay9vdmVybGF5L292ZXJsYXktcG9zaXRpb24nO1xuaW1wb3J0IHtcbiAgTmJBY3RpdmVEZXNjZW5kYW50S2V5TWFuYWdlcixcbiAgTmJBY3RpdmVEZXNjZW5kYW50S2V5TWFuYWdlckZhY3RvcnlTZXJ2aWNlLFxuICBOYktleU1hbmFnZXJBY3RpdmVJdGVtTW9kZSxcbn0gZnJvbSAnLi4vY2RrL2ExMXkvZGVzY2VuZGFudC1rZXktbWFuYWdlcic7XG5pbXBvcnQgeyBOYlNjcm9sbFN0cmF0ZWdpZXMgfSBmcm9tICcuLi9jZGsvYWRhcHRlci9ibG9jay1zY3JvbGwtc3RyYXRlZ3ktYWRhcHRlcic7XG5pbXBvcnQgeyBOYk9wdGlvbkNvbXBvbmVudCB9IGZyb20gJy4uL29wdGlvbi9vcHRpb24uY29tcG9uZW50JztcbmltcG9ydCB7IE5iQXV0b2NvbXBsZXRlQ29tcG9uZW50IH0gZnJvbSAnLi9hdXRvY29tcGxldGUuY29tcG9uZW50JztcblxuLyoqXG4gKiBUaGUgYE5iQXV0b2NvbXBsZXRlRGlyZWN0aXZlYCBwcm92aWRlcyBhIGNhcGFiaWxpdHkgdG8gZXhwYW5kIGlucHV0IHdpdGhcbiAqIGBOYkF1dG9jb21wbGV0ZUNvbXBvbmVudGAgb3ZlcmxheSBjb250YWluaW5nIG9wdGlvbnMgdG8gc2VsZWN0IGFuZCBmaWxsIGlucHV0IHdpdGguXG4gKlxuICogQHN0YWNrZWQtZXhhbXBsZShTaG93Y2FzZSwgYXV0b2NvbXBsZXRlL2F1dG9jb21wbGV0ZS1zaG93Y2FzZS5jb21wb25lbnQpXG4gKlxuICogIyMjIEluc3RhbGxhdGlvblxuICpcbiAqIEltcG9ydCBgTmJBdXRvY29tcGxldGVNb2R1bGVgIHRvIHlvdXIgZmVhdHVyZSBtb2R1bGUuXG4gKiBgYGB0c1xuICogQE5nTW9kdWxlKHtcbiAqICAgaW1wb3J0czogW1xuICogICAgIC8vIC4uLlxuICogICAgIE5iQXV0b2NvbXBsZXRlTW9kdWxlLFxuICogICBdLFxuICogfSlcbiAqIGV4cG9ydCBjbGFzcyBQYWdlTW9kdWxlIHsgfVxuICogYGBgXG4gKiAjIyMgVXNhZ2VcbiAqXG4gKiBZb3UgY2FuIGJpbmQgY29udHJvbCB3aXRoIGZvcm0gY29udHJvbHMgb3IgbmdNb2RlbC5cbiAqXG4gKiBAc3RhY2tlZC1leGFtcGxlKEF1dG9jb21wbGV0ZSBmb3JtIGJpbmRpbmcsIGF1dG9jb21wbGV0ZS9hdXRvY29tcGxldGUtZm9ybS5jb21wb25lbnQpXG4gKlxuICogT3B0aW9ucyBpbiB0aGUgYXV0b2NvbXBsZXRlIG1heSBiZSBncm91cGVkIHVzaW5nIGBuYi1vcHRpb24tZ3JvdXBgIGNvbXBvbmVudC5cbiAqXG4gKiBAc3RhY2tlZC1leGFtcGxlKEdyb3VwaW5nLCBhdXRvY29tcGxldGUvYXV0b2NvbXBsZXRlLWdyb3VwLmNvbXBvbmVudClcbiAqXG4gKiBBdXRvY29tcGxldGUgbWF5IGNoYW5nZSBzZWxlY3RlZCBvcHRpb24gdmFsdWUgdmlhIHByb3ZpZGVkIGZ1bmN0aW9uLlxuICpcbiAqIEBzdGFja2VkLWV4YW1wbGUoQ3VzdG9tIGRpc3BsYXksIGF1dG9jb21wbGV0ZS9hdXRvY29tcGxldGUtY3VzdG9tLWRpc3BsYXkuY29tcG9uZW50KVxuICpcbiAqIEFsc28sIGF1dG9jb21wbGV0ZSBtYXkgbWFrZSBmaXJzdCBvcHRpb24gaW4gb3B0aW9uIGxpc3QgYWN0aXZlIGF1dG9tYXRpY2FsbHkuXG4gKlxuICogQHN0YWNrZWQtZXhhbXBsZShBY3RpdmUgZmlyc3QsIGF1dG9jb21wbGV0ZS9hdXRvY29tcGxldGUtYWN0aXZlLWZpcnN0LmNvbXBvbmVudClcbiAqXG4gKiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnaW5wdXRbbmJBdXRvY29tcGxldGVdJyxcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOYkF1dG9jb21wbGV0ZURpcmVjdGl2ZSksXG4gICAgICBtdWx0aTogdHJ1ZSxcbiAgICB9LFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBOYkF1dG9jb21wbGV0ZURpcmVjdGl2ZTxUPiBpbXBsZW1lbnRzIE9uRGVzdHJveSwgQWZ0ZXJWaWV3SW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuICAvKipcbiAgICogTmJBdXRvY29tcGxldGVDb21wb25lbnQgaW5zdGFuY2UgcGFzc2VkIHZpYSBpbnB1dC5cbiAgICogKi9cbiAgcHJvdGVjdGVkIF9hdXRvY29tcGxldGU6IE5iQXV0b2NvbXBsZXRlQ29tcG9uZW50PFQ+O1xuXG4gIC8qKlxuICAgKiBUcmlnZ2VyIHN0cmF0ZWd5IHVzZWQgYnkgb3ZlcmxheS5cbiAgICogQGRvY3MtcHJpdmF0ZVxuICAgKiAqL1xuICBwcm90ZWN0ZWQgdHJpZ2dlclN0cmF0ZWd5OiBOYlRyaWdnZXJTdHJhdGVneTtcblxuICBwcm90ZWN0ZWQgcG9zaXRpb25TdHJhdGVneTogTmJBZGp1c3RhYmxlQ29ubmVjdGVkUG9zaXRpb25TdHJhdGVneTtcblxuICBwcm90ZWN0ZWQgb3ZlcmxheVJlZjogTmJPdmVybGF5UmVmO1xuXG4gIHByb3RlY3RlZCBrZXlNYW5hZ2VyOiBOYkFjdGl2ZURlc2NlbmRhbnRLZXlNYW5hZ2VyPE5iT3B0aW9uQ29tcG9uZW50PFQ+PjtcblxuICBwcm90ZWN0ZWQgZGVzdHJveSQ6IFN1YmplY3Q8dm9pZD4gPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gIHByb3RlY3RlZCBfb25DaGFuZ2U6ICh2YWx1ZTogVCkgPT4gdm9pZCA9ICgpID0+IHt9O1xuXG4gIHByb3RlY3RlZCBfb25Ub3VjaGVkID0gKCkgPT4ge307XG5cbiAgLyoqXG4gICAqIERldGVybWluZXMgaXMgYXV0b2NvbXBsZXRlIG92ZXJsYXkgb3BlbmVkLlxuICAgKiAqL1xuICBnZXQgaXNPcGVuKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLm92ZXJsYXlSZWYgJiYgdGhpcy5vdmVybGF5UmVmLmhhc0F0dGFjaGVkKCk7XG4gIH1cblxuICAvKipcbiAgICogRGV0ZXJtaW5lcyBpcyBhdXRvY29tcGxldGUgb3ZlcmxheSBjbG9zZWQuXG4gICAqICovXG4gIGdldCBpc0Nsb3NlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gIXRoaXMuaXNPcGVuO1xuICB9XG5cbiAgLyoqXG4gICAqIFByb3ZpZGVzIGF1dG9jb21wbGV0ZSBjb21wb25lbnQuXG4gICAqICovXG4gIEBJbnB1dCgnbmJBdXRvY29tcGxldGUnKVxuICBnZXQgYXV0b2NvbXBsZXRlKCk6IE5iQXV0b2NvbXBsZXRlQ29tcG9uZW50PFQ+IHtcbiAgICByZXR1cm4gdGhpcy5fYXV0b2NvbXBsZXRlO1xuICB9XG4gIHNldCBhdXRvY29tcGxldGUoYXV0b2NvbXBsZXRlOiBOYkF1dG9jb21wbGV0ZUNvbXBvbmVudDxUPikge1xuICAgIHRoaXMuX2F1dG9jb21wbGV0ZSA9IGF1dG9jb21wbGV0ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmVzIG9wdGlvbnMgb3ZlcmxheSBvZmZzZXQgKGluIHBpeGVscykuXG4gICAqKi9cbiAgQElucHV0KCkgb3ZlcmxheU9mZnNldDogbnVtYmVyID0gODtcblxuICAvKipcbiAgICogRGV0ZXJtaW5lcyBvcHRpb25zIG92ZXJsYXkgc2Nyb2xsIHN0cmF0ZWd5LlxuICAgKiovXG4gIEBJbnB1dCgpIHNjcm9sbFN0cmF0ZWd5OiBOYlNjcm9sbFN0cmF0ZWdpZXMgPSAnYmxvY2snO1xuXG4gIEBJbnB1dCgpIGN1c3RvbU92ZXJsYXlIb3N0OiBFbGVtZW50UmVmO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MubmItYXV0b2NvbXBsZXRlLXBvc2l0aW9uLXRvcCcpXG4gIGdldCB0b3AoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuaXNPcGVuICYmIHRoaXMuYXV0b2NvbXBsZXRlLm9wdGlvbnMubGVuZ3RoICYmIHRoaXMuYXV0b2NvbXBsZXRlLm92ZXJsYXlQb3NpdGlvbiA9PT0gTmJQb3NpdGlvbi5UT1A7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLm5iLWF1dG9jb21wbGV0ZS1wb3NpdGlvbi1ib3R0b20nKVxuICBnZXQgYm90dG9tKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmlzT3BlbiAmJiB0aGlzLmF1dG9jb21wbGV0ZS5vcHRpb25zLmxlbmd0aCAmJiB0aGlzLmF1dG9jb21wbGV0ZS5vdmVybGF5UG9zaXRpb24gPT09IE5iUG9zaXRpb24uQk9UVE9NO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLnJvbGUnKVxuICByb2xlOiBzdHJpbmcgPSAnY29tYm9ib3gnO1xuXG4gIEBIb3N0QmluZGluZygnYXR0ci5hcmlhLWF1dG9jb21wbGV0ZScpXG4gIGFyaWFBdXRvY29tcGxldGU6IHN0cmluZyA9ICdsaXN0JztcblxuICBASG9zdEJpbmRpbmcoJ2F0dHIuaGFzcG9wdXAnKVxuICBoYXNQb3B1cDogc3RyaW5nID0gJ3RydWUnO1xuXG4gIEBIb3N0QmluZGluZygnYXR0ci5hcmlhLWV4cGFuZGVkJylcbiAgZ2V0IGFyaWFFeHBhbmRlZCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmlzT3BlbiAmJiB0aGlzLmlzT3Blbi50b1N0cmluZygpO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLmFyaWEtb3ducycpXG4gIGdldCBhcmlhT3ducygpIHtcbiAgICByZXR1cm4gdGhpcy5pc09wZW4gPyB0aGlzLmF1dG9jb21wbGV0ZS5pZCA6IG51bGw7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2F0dHIuYXJpYS1hY3RpdmVkZXNjZW5kYW50JylcbiAgZ2V0IGFyaWFBY3RpdmVEZXNjZW5kYW50KCkge1xuICAgIHJldHVybiB0aGlzLmlzT3BlbiAmJiB0aGlzLmtleU1hbmFnZXIuYWN0aXZlSXRlbSA/IHRoaXMua2V5TWFuYWdlci5hY3RpdmVJdGVtLmlkIDogbnVsbDtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBob3N0UmVmOiBFbGVtZW50UmVmLFxuICAgIHByb3RlY3RlZCBvdmVybGF5OiBOYk92ZXJsYXlTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJvdGVjdGVkIHRyaWdnZXJTdHJhdGVneUJ1aWxkZXI6IE5iVHJpZ2dlclN0cmF0ZWd5QnVpbGRlclNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHBvc2l0aW9uQnVpbGRlcjogTmJQb3NpdGlvbkJ1aWxkZXJTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBhY3RpdmVEZXNjZW5kYW50S2V5TWFuYWdlckZhY3Rvcnk6IE5iQWN0aXZlRGVzY2VuZGFudEtleU1hbmFnZXJGYWN0b3J5U2VydmljZTxOYk9wdGlvbkNvbXBvbmVudDxUPj4sXG4gICAgcHJvdGVjdGVkIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICkge31cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy50cmlnZ2VyU3RyYXRlZ3kgPSB0aGlzLmNyZWF0ZVRyaWdnZXJTdHJhdGVneSgpO1xuICAgIHRoaXMuc3Vic2NyaWJlT25UcmlnZ2VycygpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMudHJpZ2dlclN0cmF0ZWd5KSB7XG4gICAgICB0aGlzLnRyaWdnZXJTdHJhdGVneS5kZXN0cm95KCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucG9zaXRpb25TdHJhdGVneSkge1xuICAgICAgdGhpcy5wb3NpdGlvblN0cmF0ZWd5LmRpc3Bvc2UoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vdmVybGF5UmVmKSB7XG4gICAgICB0aGlzLm92ZXJsYXlSZWYuZGlzcG9zZSgpO1xuICAgIH1cblxuICAgIHRoaXMuZGVzdHJveSQubmV4dCgpO1xuICAgIHRoaXMuZGVzdHJveSQuY29tcGxldGUoKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2lucHV0JylcbiAgaGFuZGxlSW5wdXQoKSB7XG4gICAgY29uc3QgY3VycmVudFZhbHVlID0gdGhpcy5ob3N0UmVmLm5hdGl2ZUVsZW1lbnQudmFsdWU7XG4gICAgdGhpcy5fb25DaGFuZ2UoY3VycmVudFZhbHVlKTtcbiAgICB0aGlzLnNldEhvc3RJbnB1dFZhbHVlKHRoaXMuZ2V0RGlzcGxheVZhbHVlKGN1cnJlbnRWYWx1ZSkpO1xuICAgIHRoaXMuc2hvdygpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bi5hcnJvd0Rvd24nKVxuICBASG9zdExpc3RlbmVyKCdrZXlkb3duLmFycm93VXAnKVxuICBoYW5kbGVLZXlkb3duKCkge1xuICAgIHRoaXMuc2hvdygpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignYmx1cicpXG4gIGhhbmRsZUJsdXIoKSB7XG4gICAgdGhpcy5fb25Ub3VjaGVkKCk7XG4gIH1cblxuICBzaG93KCkge1xuICAgIGlmICh0aGlzLnNob3VsZFNob3coKSkge1xuICAgICAgdGhpcy5hdHRhY2hUb092ZXJsYXkoKTtcbiAgICAgIHRoaXMuc2V0QWN0aXZlSXRlbSgpO1xuICAgIH1cbiAgfVxuXG4gIGhpZGUoKSB7XG4gICAgaWYgKHRoaXMuaXNPcGVuKSB7XG4gICAgICB0aGlzLm92ZXJsYXlSZWYuZGV0YWNoKCk7XG4gICAgICAvLyBOZWVkIHRvIHVwZGF0ZSBjbGFzcyB2aWEgQEhvc3RCaW5kaW5nXG4gICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cbiAgfVxuXG4gIHdyaXRlVmFsdWUodmFsdWU6IFQpOiB2b2lkIHtcbiAgICB0aGlzLmhhbmRsZUlucHV0VmFsdWVVcGRhdGUodmFsdWUpO1xuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKHZhbHVlOiBhbnkpID0+IHt9KTogdm9pZCB7XG4gICAgdGhpcy5fb25DaGFuZ2UgPSBmbjtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLl9vblRvdWNoZWQgPSBmbjtcbiAgfVxuXG4gIHNldERpc2FibGVkU3RhdGUoZGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KHRoaXMuaG9zdFJlZi5uYXRpdmVFbGVtZW50LCAnZGlzYWJsZWQnLCBkaXNhYmxlZCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgc3Vic2NyaWJlT25PcHRpb25DbGljaygpIHtcbiAgICAvKipcbiAgICAgKiBJZiB0aGUgdXNlciBjaGFuZ2VzIHByb3ZpZGVkIG9wdGlvbnMgbGlzdCBpbiB0aGUgcnVudGltZSB3ZSBoYXZlIHRvIGhhbmRsZSB0aGlzXG4gICAgICogYW5kIHJlc3Vic2NyaWJlIG9uIG9wdGlvbnMgc2VsZWN0aW9uIGNoYW5nZXMgZXZlbnQuXG4gICAgICogT3RoZXJ3aXNlLCB0aGUgdXNlciB3aWxsIG5vdCBiZSBhYmxlIHRvIHNlbGVjdCBuZXcgb3B0aW9ucy5cbiAgICAgKiAqL1xuICAgIHRoaXMuYXV0b2NvbXBsZXRlLm9wdGlvbnMuY2hhbmdlc1xuICAgICAgLnBpcGUoXG4gICAgICAgIHRhcCgoKSA9PiB0aGlzLnNldEFjdGl2ZUl0ZW0oKSksXG4gICAgICAgIHN0YXJ0V2l0aCh0aGlzLmF1dG9jb21wbGV0ZS5vcHRpb25zKSxcbiAgICAgICAgc3dpdGNoTWFwKChvcHRpb25zOiBRdWVyeUxpc3Q8TmJPcHRpb25Db21wb25lbnQ8VD4+KSA9PiB7XG4gICAgICAgICAgcmV0dXJuIG1lcmdlKC4uLm9wdGlvbnMubWFwKChvcHRpb24pID0+IG9wdGlvbi5jbGljaykpO1xuICAgICAgICB9KSxcbiAgICAgICAgdGFrZVVudGlsKHRoaXMuZGVzdHJveSQpLFxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSgoY2xpY2tlZE9wdGlvbjogTmJPcHRpb25Db21wb25lbnQ8VD4pID0+IHRoaXMuaGFuZGxlSW5wdXRWYWx1ZVVwZGF0ZShjbGlja2VkT3B0aW9uLnZhbHVlLCB0cnVlKSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgc3Vic2NyaWJlT25Qb3NpdGlvbkNoYW5nZSgpIHtcbiAgICB0aGlzLnBvc2l0aW9uU3RyYXRlZ3kucG9zaXRpb25DaGFuZ2UucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpLnN1YnNjcmliZSgocG9zaXRpb246IE5iUG9zaXRpb24pID0+IHtcbiAgICAgIHRoaXMuYXV0b2NvbXBsZXRlLm92ZXJsYXlQb3NpdGlvbiA9IHBvc2l0aW9uO1xuICAgICAgdGhpcy5jZC5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0QWN0aXZlSXRlbSgpOiBOYk9wdGlvbkNvbXBvbmVudDxUPiB7XG4gICAgcmV0dXJuIHRoaXMua2V5TWFuYWdlci5hY3RpdmVJdGVtO1xuICB9XG5cbiAgcHJvdGVjdGVkIHNldHVwQXV0b2NvbXBsZXRlKCkge1xuICAgIHRoaXMuYXV0b2NvbXBsZXRlLnNldEhvc3QodGhpcy5jdXN0b21PdmVybGF5SG9zdCB8fCB0aGlzLmhvc3RSZWYpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldERpc3BsYXlWYWx1ZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgY29uc3QgZGlzcGxheUZuID0gdGhpcy5hdXRvY29tcGxldGUuaGFuZGxlRGlzcGxheUZuO1xuICAgIHJldHVybiBkaXNwbGF5Rm4gPyBkaXNwbGF5Rm4odmFsdWUpIDogdmFsdWU7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0Q29udGFpbmVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICB0aGlzLm92ZXJsYXlSZWYgJiZcbiAgICAgIHRoaXMuaXNPcGVuICYmXG4gICAgICA8Q29tcG9uZW50UmVmPGFueT4+e1xuICAgICAgICBsb2NhdGlvbjoge1xuICAgICAgICAgIG5hdGl2ZUVsZW1lbnQ6IHRoaXMub3ZlcmxheVJlZi5vdmVybGF5RWxlbWVudCxcbiAgICAgICAgfSxcbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgcHJvdGVjdGVkIGhhbmRsZUlucHV0VmFsdWVVcGRhdGUodmFsdWU6IFQsIGZvY3VzSW5wdXQ6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgIHRoaXMuc2V0SG9zdElucHV0VmFsdWUodmFsdWUgPz8gJycpO1xuICAgIHRoaXMuX29uQ2hhbmdlKHZhbHVlKTtcbiAgICBpZiAoZm9jdXNJbnB1dCkge1xuICAgICAgdGhpcy5ob3N0UmVmLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICB9XG4gICAgdGhpcy5hdXRvY29tcGxldGUuZW1pdFNlbGVjdGVkKHZhbHVlKTtcbiAgICB0aGlzLmhpZGUoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBzdWJzY3JpYmVPblRyaWdnZXJzKCkge1xuICAgIHRoaXMudHJpZ2dlclN0cmF0ZWd5LnNob3ckLnBpcGUoZmlsdGVyKCgpID0+IHRoaXMuaXNDbG9zZWQpKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5zaG93KCkpO1xuXG4gICAgdGhpcy50cmlnZ2VyU3RyYXRlZ3kuaGlkZSQucGlwZShmaWx0ZXIoKCkgPT4gdGhpcy5pc09wZW4pKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5oaWRlKCkpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGNyZWF0ZVRyaWdnZXJTdHJhdGVneSgpOiBOYlRyaWdnZXJTdHJhdGVneSB7XG4gICAgcmV0dXJuIHRoaXMudHJpZ2dlclN0cmF0ZWd5QnVpbGRlclxuICAgICAgLnRyaWdnZXIoTmJUcmlnZ2VyLkZPQ1VTKVxuICAgICAgLmhvc3QodGhpcy5ob3N0UmVmLm5hdGl2ZUVsZW1lbnQpXG4gICAgICAuY29udGFpbmVyKCgpID0+IHRoaXMuZ2V0Q29udGFpbmVyKCkpXG4gICAgICAuYnVpbGQoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBjcmVhdGVLZXlNYW5hZ2VyKCk6IHZvaWQge1xuICAgIHRoaXMua2V5TWFuYWdlciA9IHRoaXMuYWN0aXZlRGVzY2VuZGFudEtleU1hbmFnZXJGYWN0b3J5LmNyZWF0ZSh0aGlzLmF1dG9jb21wbGV0ZS5vcHRpb25zKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBzZXRIb3N0SW5wdXRWYWx1ZSh2YWx1ZSkge1xuICAgIHRoaXMuaG9zdFJlZi5uYXRpdmVFbGVtZW50LnZhbHVlID0gdGhpcy5nZXREaXNwbGF5VmFsdWUodmFsdWUpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGNyZWF0ZVBvc2l0aW9uU3RyYXRlZ3koKTogTmJBZGp1c3RhYmxlQ29ubmVjdGVkUG9zaXRpb25TdHJhdGVneSB7XG4gICAgcmV0dXJuIHRoaXMucG9zaXRpb25CdWlsZGVyXG4gICAgICAuY29ubmVjdGVkVG8odGhpcy5jdXN0b21PdmVybGF5SG9zdCB8fCB0aGlzLmhvc3RSZWYpXG4gICAgICAucG9zaXRpb24oTmJQb3NpdGlvbi5CT1RUT00pXG4gICAgICAub2Zmc2V0KHRoaXMub3ZlcmxheU9mZnNldClcbiAgICAgIC5hZGp1c3RtZW50KE5iQWRqdXN0bWVudC5WRVJUSUNBTCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgc3Vic2NyaWJlT25PdmVybGF5S2V5cygpOiB2b2lkIHtcbiAgICB0aGlzLm92ZXJsYXlSZWZcbiAgICAgIC5rZXlkb3duRXZlbnRzKClcbiAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSlcbiAgICAgIC5zdWJzY3JpYmUoKGV2ZW50OiBLZXlib2FyZEV2ZW50KSA9PiB7XG4gICAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSBFU0NBUEUgJiYgdGhpcy5pc09wZW4pIHtcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIHRoaXMuaG9zdFJlZi5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnQua2V5Q29kZSA9PT0gRU5URVIpIHtcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIGNvbnN0IGFjdGl2ZUl0ZW0gPSB0aGlzLmdldEFjdGl2ZUl0ZW0oKTtcbiAgICAgICAgICBpZiAoIWFjdGl2ZUl0ZW0pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5oYW5kbGVJbnB1dFZhbHVlVXBkYXRlKGFjdGl2ZUl0ZW0udmFsdWUsIHRydWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMua2V5TWFuYWdlci5vbktleWRvd24oZXZlbnQpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIHByb3RlY3RlZCBzZXRBY3RpdmVJdGVtKCkge1xuICAgIC8vIElmIGF1dG9jb21wbGV0ZSBoYXMgYWN0aXZlRmlyc3QgaW5wdXQgc2V0IHRvIHRydWUsXG4gICAgLy8ga2V5TWFuYWdlciBzZXQgZmlyc3Qgb3B0aW9uIGFjdGl2ZSwgb3RoZXJ3aXNlIC0gcmVzZXQgYWN0aXZlIG9wdGlvbi5cbiAgICBjb25zdCBtb2RlID0gdGhpcy5hdXRvY29tcGxldGUuYWN0aXZlRmlyc3RcbiAgICAgID8gTmJLZXlNYW5hZ2VyQWN0aXZlSXRlbU1vZGUuRklSU1RfQUNUSVZFXG4gICAgICA6IE5iS2V5TWFuYWdlckFjdGl2ZUl0ZW1Nb2RlLlJFU0VUX0FDVElWRTtcbiAgICB0aGlzLmtleU1hbmFnZXIuc2V0QWN0aXZlSXRlbShtb2RlKTtcbiAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBhdHRhY2hUb092ZXJsYXkoKSB7XG4gICAgaWYgKCF0aGlzLm92ZXJsYXlSZWYpIHtcbiAgICAgIHRoaXMuc2V0dXBBdXRvY29tcGxldGUoKTtcbiAgICAgIHRoaXMuaW5pdE92ZXJsYXkoKTtcbiAgICB9XG4gICAgdGhpcy5vdmVybGF5UmVmLmF0dGFjaCh0aGlzLmF1dG9jb21wbGV0ZS5wb3J0YWwpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGNyZWF0ZU92ZXJsYXkoKSB7XG4gICAgY29uc3Qgc2Nyb2xsU3RyYXRlZ3kgPSB0aGlzLmNyZWF0ZVNjcm9sbFN0cmF0ZWd5KCk7XG4gICAgdGhpcy5vdmVybGF5UmVmID0gdGhpcy5vdmVybGF5LmNyZWF0ZSh7XG4gICAgICBwb3NpdGlvblN0cmF0ZWd5OiB0aGlzLnBvc2l0aW9uU3RyYXRlZ3ksXG4gICAgICBzY3JvbGxTdHJhdGVneSxcbiAgICAgIHBhbmVsQ2xhc3M6IHRoaXMuYXV0b2NvbXBsZXRlLm9wdGlvbnNQYW5lbENsYXNzLFxuICAgIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIGluaXRPdmVybGF5KCkge1xuICAgIHRoaXMucG9zaXRpb25TdHJhdGVneSA9IHRoaXMuY3JlYXRlUG9zaXRpb25TdHJhdGVneSgpO1xuXG4gICAgdGhpcy5jcmVhdGVLZXlNYW5hZ2VyKCk7XG4gICAgdGhpcy5zdWJzY3JpYmVPblBvc2l0aW9uQ2hhbmdlKCk7XG4gICAgdGhpcy5zdWJzY3JpYmVPbk9wdGlvbkNsaWNrKCk7XG4gICAgdGhpcy5jaGVja092ZXJsYXlWaXNpYmlsaXR5KCk7XG4gICAgdGhpcy5jcmVhdGVPdmVybGF5KCk7XG4gICAgdGhpcy5zdWJzY3JpYmVPbk92ZXJsYXlLZXlzKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgY2hlY2tPdmVybGF5VmlzaWJpbGl0eSgpIHtcbiAgICB0aGlzLmF1dG9jb21wbGV0ZS5vcHRpb25zLmNoYW5nZXMucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBpZiAoIXRoaXMuYXV0b2NvbXBsZXRlLm9wdGlvbnMubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIGNyZWF0ZVNjcm9sbFN0cmF0ZWd5KCk6IE5iU2Nyb2xsU3RyYXRlZ3kge1xuICAgIHJldHVybiB0aGlzLm92ZXJsYXkuc2Nyb2xsU3RyYXRlZ2llc1t0aGlzLnNjcm9sbFN0cmF0ZWd5XSgpO1xuICB9XG5cbiAgcHJvdGVjdGVkIHNob3VsZFNob3coKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuaXNDbG9zZWQ7XG4gIH1cbn1cbiJdfQ==