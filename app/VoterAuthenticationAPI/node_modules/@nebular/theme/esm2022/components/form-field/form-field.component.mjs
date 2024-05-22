/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, ChangeDetectionStrategy, ContentChild, ContentChildren, HostBinding, } from '@angular/core';
import { merge, Subject, combineLatest, ReplaySubject } from 'rxjs';
import { takeUntil, distinctUntilChanged, map, tap } from 'rxjs/operators';
import { NbPrefixDirective } from './prefix.directive';
import { NbSuffixDirective } from './suffix.directive';
import { NbFormFieldControl, NbFormFieldControlConfig } from './form-field-control';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function throwFormControlElementNotFound() {
    throw new Error(`NbFormFieldComponent must contain [nbInput]`);
}
/*
 * NbFormFieldComponent
 *
 * @styles
 *
 * form-field-addon-basic-text-color:
 * form-field-addon-basic-highlight-text-color:
 * form-field-addon-primary-text-color:
 * form-field-addon-primary-highlight-text-color:
 * form-field-addon-success-text-color:
 * form-field-addon-success-highlight-text-color:
 * form-field-addon-info-text-color:
 * form-field-addon-info-highlight-text-color:
 * form-field-addon-warning-text-color:
 * form-field-addon-warning-highlight-text-color:
 * form-field-addon-danger-text-color:
 * form-field-addon-danger-highlight-text-color:
 * form-field-addon-control-text-color:
 * form-field-addon-control-highlight-text-color:
 * form-field-addon-disabled-text-color:
 * form-field-addon-tiny-height:
 * form-field-addon-tiny-width:
 * form-field-addon-tiny-icon-size:
 * form-field-addon-tiny-font-size:
 * form-field-addon-tiny-line-height:
 * form-field-addon-tiny-font-weight:
 * form-field-addon-small-height:
 * form-field-addon-small-width:
 * form-field-addon-small-icon-size:
 * form-field-addon-small-font-size:
 * form-field-addon-small-line-height:
 * form-field-addon-small-font-weight:
 * form-field-addon-medium-height:
 * form-field-addon-medium-width:
 * form-field-addon-medium-icon-size:
 * form-field-addon-medium-font-size:
 * form-field-addon-medium-line-height:
 * form-field-addon-medium-font-weight:
 * form-field-addon-large-height:
 * form-field-addon-large-width:
 * form-field-addon-large-icon-size:
 * form-field-addon-large-font-size:
 * form-field-addon-large-line-height:
 * form-field-addon-large-font-weight:
 * form-field-addon-giant-height:
 * form-field-addon-giant-width:
 * form-field-addon-giant-icon-size:
 * form-field-addon-giant-font-size:
 * form-field-addon-giant-line-height:
 * form-field-addon-giant-font-weight:
 **/
export class NbFormFieldComponent {
    constructor(cd, zone, elementRef, renderer) {
        this.cd = cd;
        this.zone = zone;
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.destroy$ = new Subject();
        this.formControlState$ = new ReplaySubject(1);
        this.prefixClasses$ = this.formControlState$.pipe(map(s => this.getAddonClasses('prefix', s)));
        this.suffixClasses$ = this.formControlState$.pipe(map(s => this.getAddonClasses('suffix', s)));
    }
    ngAfterContentChecked() {
        if (!this.formControl) {
            throwFormControlElementNotFound();
        }
    }
    ngAfterContentInit() {
        this.subscribeToFormControlStateChange();
        this.subscribeToAddonChange();
    }
    ngAfterViewInit() {
        // TODO: #2254
        this.zone.runOutsideAngular(() => setTimeout(() => {
            this.renderer.addClass(this.elementRef.nativeElement, 'nb-transition');
        }));
    }
    ngOnDestroy() {
        this.destroy$.next();
    }
    shouldShowPrefix() {
        return this.getFormControlConfig().supportsPrefix && !!this.prefix.length;
    }
    shouldShowSuffix() {
        return this.getFormControlConfig().supportsSuffix && !!this.suffix.length;
    }
    subscribeToFormControlStateChange() {
        const { disabled$, focused$, size$, status$, fullWidth$ } = this.formControl;
        combineLatest([disabled$, focused$, size$, status$, fullWidth$])
            .pipe(map(([disabled, focused, size, status, fullWidth]) => ({ disabled, focused, size, status, fullWidth })), distinctUntilChanged((oldState, state) => this.isStatesEqual(oldState, state)), tap(({ size, fullWidth }) => {
            const formFieldClasses = [`nb-form-field-size-${size}`];
            if (!fullWidth) {
                formFieldClasses.push('nb-form-field-limited-width');
            }
            this.formFieldClasses = formFieldClasses.join(' ');
        }), takeUntil(this.destroy$))
            .subscribe(this.formControlState$);
    }
    subscribeToAddonChange() {
        merge(this.prefix.changes, this.suffix.changes)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => this.cd.markForCheck());
    }
    getAddonClasses(addon, state) {
        const classes = [
            'nb-form-field-addon',
            `nb-form-field-${addon}-${state.size}`,
        ];
        if (state.disabled) {
            classes.push(`nb-form-field-addon-disabled`);
        }
        else if (state.focused) {
            classes.push(`nb-form-field-addon-${state.status}-highlight`);
        }
        else {
            classes.push(`nb-form-field-addon-${state.status}`);
        }
        return classes;
    }
    getFormControlConfig() {
        return this.formControlConfig || new NbFormFieldControlConfig();
    }
    isStatesEqual(oldState, state) {
        return oldState.status === state.status &&
            oldState.disabled === state.disabled &&
            oldState.focused === state.focused &&
            oldState.fullWidth === state.fullWidth &&
            oldState.size === state.size;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbFormFieldComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.NgZone }, { token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.1.0", type: NbFormFieldComponent, selector: "nb-form-field", host: { properties: { "class": "this.formFieldClasses" } }, queries: [{ propertyName: "formControl", first: true, predicate: NbFormFieldControl, descendants: true }, { propertyName: "formControlConfig", first: true, predicate: NbFormFieldControlConfig, descendants: true }, { propertyName: "prefix", predicate: NbPrefixDirective, descendants: true }, { propertyName: "suffix", predicate: NbSuffixDirective, descendants: true }], ngImport: i0, template: "<div *ngIf=\"shouldShowPrefix()\" [ngClass]=\"prefixClasses$ | async\">\n  <ng-content select=\"[nbPrefix]\"></ng-content>\n</div>\n\n<div class=\"nb-form-control-container\"\n     [class.nb-form-field-control-with-prefix]=\"shouldShowPrefix()\"\n     [class.nb-form-field-control-with-suffix]=\"shouldShowSuffix()\">\n  <ng-content></ng-content>\n</div>\n\n<div *ngIf=\"shouldShowSuffix()\" [ngClass]=\"suffixClasses$ | async\">\n  <ng-content select=\"[nbSuffix]\"></ng-content>\n</div>\n", styles: ["/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */:host{display:flex;align-items:center}:host[hidden]{display:none}.nb-form-control-container{width:100%}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "pipe", type: i1.AsyncPipe, name: "async" }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbFormFieldComponent, decorators: [{
            type: Component,
            args: [{ selector: 'nb-form-field', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div *ngIf=\"shouldShowPrefix()\" [ngClass]=\"prefixClasses$ | async\">\n  <ng-content select=\"[nbPrefix]\"></ng-content>\n</div>\n\n<div class=\"nb-form-control-container\"\n     [class.nb-form-field-control-with-prefix]=\"shouldShowPrefix()\"\n     [class.nb-form-field-control-with-suffix]=\"shouldShowSuffix()\">\n  <ng-content></ng-content>\n</div>\n\n<div *ngIf=\"shouldShowSuffix()\" [ngClass]=\"suffixClasses$ | async\">\n  <ng-content select=\"[nbSuffix]\"></ng-content>\n</div>\n", styles: ["/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */:host{display:flex;align-items:center}:host[hidden]{display:none}.nb-form-control-container{width:100%}\n"] }]
        }], ctorParameters: () => [{ type: i0.ChangeDetectorRef }, { type: i0.NgZone }, { type: i0.ElementRef }, { type: i0.Renderer2 }], propDecorators: { prefix: [{
                type: ContentChildren,
                args: [NbPrefixDirective, { descendants: true }]
            }], suffix: [{
                type: ContentChildren,
                args: [NbSuffixDirective, { descendants: true }]
            }], formControl: [{
                type: ContentChild,
                args: [NbFormFieldControl, { static: false }]
            }], formControlConfig: [{
                type: ContentChild,
                args: [NbFormFieldControlConfig, { static: false }]
            }], formFieldClasses: [{
                type: HostBinding,
                args: ['class']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1maWVsZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvZnJhbWV3b3JrL3RoZW1lL2NvbXBvbmVudHMvZm9ybS1maWVsZC9mb3JtLWZpZWxkLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uL3NyYy9mcmFtZXdvcmsvdGhlbWUvY29tcG9uZW50cy9mb3JtLWZpZWxkL2Zvcm0tZmllbGQuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFDTCxTQUFTLEVBQ1QsdUJBQXVCLEVBQ3ZCLFlBQVksRUFHWixlQUFlLEVBUWYsV0FBVyxHQUNaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFjLGFBQWEsRUFBRSxhQUFhLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDaEYsT0FBTyxFQUFFLFNBQVMsRUFBRSxvQkFBb0IsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFM0UsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDdkQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDdkQsT0FBTyxFQUFFLGtCQUFrQixFQUFzQix3QkFBd0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDOzs7QUFJeEcsU0FBUywrQkFBK0I7SUFDdEMsTUFBTSxJQUFJLEtBQUssQ0FBQyw2Q0FBNkMsQ0FBQyxDQUFBO0FBQ2hFLENBQUM7QUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFrREk7QUFPSixNQUFNLE9BQU8sb0JBQW9CO0lBZ0IvQixZQUNZLEVBQXFCLEVBQ3JCLElBQVksRUFDWixVQUFzQixFQUN0QixRQUFtQjtRQUhuQixPQUFFLEdBQUYsRUFBRSxDQUFtQjtRQUNyQixTQUFJ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QU8sUUFBUSxDQUFDLE1BQU0sS0FBSyxLQUFLLENBQUMsTUFBTTtZQUNoQyxRQUFRLENBQUMsUUFBUSxLQUFLLEtBQUssQ0FBQyxRQUFRO1lBQ3BDLFFBQVEsQ0FBQyxPQUFPLEtBQUssS0FBSyxDQUFDLE9BQU87WUFDbEMsUUFBUSxDQUFDLFNBQVMsS0FBSyxLQUFLLENBQUMsU0FBUztZQUN0QyxRQUFRLENBQUMsSUFBSSxLQUFLLEtBQUssQ0FBQyxJQUFJLENBQUM7SUFDdEMsQ0FBQzs4R0ExR1Usb0JBQW9CO2tHQUFwQixvQkFBb0IsMEpBV2pCLGtCQUFrQixvRkFDbEIsd0JBQXdCLDREQUpyQixpQkFBaUIsNERBQ2pCLGlCQUFpQixnRENyR3BDLDRlQWFBOzsyRkQrRWEsb0JBQW9CO2tCQU5oQyxTQUFTOytCQUNFLGVBQWUsbUJBR1IsdUJBQXVCLENBQUMsTUFBTTs0SkFVWSxNQUFNO3NCQUFoRSxlQUFlO3VCQUFDLGlCQUFpQixFQUFFLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRTtnQkFDRSxNQUFNO3NCQUFoRSxlQUFlO3VCQUFDLGlCQUFpQixFQUFFLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRTtnQkFFSixXQUFXO3NCQUEvRCxZQUFZO3VCQUFDLGtCQUFrQixFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTtnQkFDUSxpQkFBaUI7c0JBQTNFLFlBQVk7dUJBQUMsd0JBQXdCLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFO2dCQUVuQyxnQkFBZ0I7c0JBQXJDLFdBQVc7dUJBQUMsT0FBTyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBBa3Zlby4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi9cblxuaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29udGVudENoaWxkLFxuICBBZnRlckNvbnRlbnRDaGVja2VkLFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29udGVudENoaWxkcmVuLFxuICBRdWVyeUxpc3QsXG4gIEFmdGVyQ29udGVudEluaXQsXG4gIE9uRGVzdHJveSxcbiAgTmdab25lLFxuICBFbGVtZW50UmVmLFxuICBSZW5kZXJlcjIsXG4gIEFmdGVyVmlld0luaXQsXG4gIEhvc3RCaW5kaW5nLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IG1lcmdlLCBTdWJqZWN0LCBPYnNlcnZhYmxlLCBjb21iaW5lTGF0ZXN0LCBSZXBsYXlTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YWtlVW50aWwsIGRpc3RpbmN0VW50aWxDaGFuZ2VkLCBtYXAsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgTmJQcmVmaXhEaXJlY3RpdmUgfSBmcm9tICcuL3ByZWZpeC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTmJTdWZmaXhEaXJlY3RpdmUgfSBmcm9tICcuL3N1ZmZpeC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTmJGb3JtRmllbGRDb250cm9sLCBOYkZvcm1Db250cm9sU3RhdGUsIE5iRm9ybUZpZWxkQ29udHJvbENvbmZpZyB9IGZyb20gJy4vZm9ybS1maWVsZC1jb250cm9sJztcblxuZXhwb3J0IHR5cGUgTmJGb3JtQ29udHJvbEFkZG9uID0gJ3ByZWZpeCcgfCAnc3VmZml4JztcblxuZnVuY3Rpb24gdGhyb3dGb3JtQ29udHJvbEVsZW1lbnROb3RGb3VuZCgpIHtcbiAgdGhyb3cgbmV3IEVycm9yKGBOYkZvcm1GaWVsZENvbXBvbmVudCBtdXN0IGNvbnRhaW4gW25iSW5wdXRdYClcbn1cblxuLypcbiAqIE5iRm9ybUZpZWxkQ29tcG9uZW50XG4gKlxuICogQHN0eWxlc1xuICpcbiAqIGZvcm0tZmllbGQtYWRkb24tYmFzaWMtdGV4dC1jb2xvcjpcbiAqIGZvcm0tZmllbGQtYWRkb24tYmFzaWMtaGlnaGxpZ2h0LXRleHQtY29sb3I6XG4gKiBmb3JtLWZpZWxkLWFkZG9uLXByaW1hcnktdGV4dC1jb2xvcjpcbiAqIGZvcm0tZmllbGQtYWRkb24tcHJpbWFyeS1oaWdobGlnaHQtdGV4dC1jb2xvcjpcbiAqIGZvcm0tZmllbGQtYWRkb24tc3VjY2Vzcy10ZXh0LWNvbG9yOlxuICogZm9ybS1maWVsZC1hZGRvbi1zdWNjZXNzLWhpZ2hsaWdodC10ZXh0LWNvbG9yOlxuICogZm9ybS1maWVsZC1hZGRvbi1pbmZvLXRleHQtY29sb3I6XG4gKiBmb3JtLWZpZWxkLWFkZG9uLWluZm8taGlnaGxpZ2h0LXRleHQtY29sb3I6XG4gKiBmb3JtLWZpZWxkLWFkZG9uLXdhcm5pbmctdGV4dC1jb2xvcjpcbiAqIGZvcm0tZmllbGQtYWRkb24td2FybmluZy1oaWdobGlnaHQtdGV4dC1jb2xvcjpcbiAqIGZvcm0tZmllbGQtYWRkb24tZGFuZ2VyLXRleHQtY29sb3I6XG4gKiBmb3JtLWZpZWxkLWFkZG9uLWRhbmdlci1oaWdobGlnaHQtdGV4dC1jb2xvcjpcbiAqIGZvcm0tZmllbGQtYWRkb24tY29udHJvbC10ZXh0LWNvbG9yOlxuICogZm9ybS1maWVsZC1hZGRvbi1jb250cm9sLWhpZ2hsaWdodC10ZXh0LWNvbG9yOlxuICogZm9ybS1maWVsZC1hZGRvbi1kaXNhYmxlZC10ZXh0LWNvbG9yOlxuICogZm9ybS1maWVsZC1hZGRvbi10aW55LWhlaWdodDpcbiAqIGZvcm0tZmllbGQtYWRkb24tdGlueS13aWR0aDpcbiAqIGZvcm0tZmllbGQtYWRkb24tdGlueS1pY29uLXNpemU6XG4gKiBmb3JtLWZpZWxkLWFkZG9uLXRpbnktZm9udC1zaXplOlxuICogZm9ybS1maWVsZC1hZGRvbi10aW55LWxpbmUtaGVpZ2h0OlxuICogZm9ybS1maWVsZC1hZGRvbi10aW55LWZvbnQtd2VpZ2h0OlxuICogZm9ybS1maWVsZC1hZGRvbi1zbWFsbC1oZWlnaHQ6XG4gKiBmb3JtLWZpZWxkLWFkZG9uLXNtYWxsLXdpZHRoOlxuICogZm9ybS1maWVsZC1hZGRvbi1zbWFsbC1pY29uLXNpemU6XG4gKiBmb3JtLWZpZWxkLWFkZG9uLXNtYWxsLWZvbnQtc2l6ZTpcbiAqIGZvcm0tZmllbGQtYWRkb24tc21hbGwtbGluZS1oZWlnaHQ6XG4gKiBmb3JtLWZpZWxkLWFkZG9uLXNtYWxsLWZvbnQtd2VpZ2h0OlxuICogZm9ybS1maWVsZC1hZGRvbi1tZWRpdW0taGVpZ2h0OlxuICogZm9ybS1maWVsZC1hZGRvbi1tZWRpdW0td2lkdGg6XG4gKiBmb3JtLWZpZWxkLWFkZG9uLW1lZGl1bS1pY29uLXNpemU6XG4gKiBmb3JtLWZpZWxkLWFkZG9uLW1lZGl1bS1mb250LXNpemU6XG4gKiBmb3JtLWZpZWxkLWFkZG9uLW1lZGl1bS1saW5lLWhlaWdodDpcbiAqIGZvcm0tZmllbGQtYWRkb24tbWVkaXVtLWZvbnQtd2VpZ2h0OlxuICogZm9ybS1maWVsZC1hZGRvbi1sYXJnZS1oZWlnaHQ6XG4gKiBmb3JtLWZpZWxkLWFkZG9uLWxhcmdlLXdpZHRoOlxuICogZm9ybS1maWVsZC1hZGRvbi1sYXJnZS1pY29uLXNpemU6XG4gKiBmb3JtLWZpZWxkLWFkZG9uLWxhcmdlLWZvbnQtc2l6ZTpcbiAqIGZvcm0tZmllbGQtYWRkb24tbGFyZ2UtbGluZS1oZWlnaHQ6XG4gKiBmb3JtLWZpZWxkLWFkZG9uLWxhcmdlLWZvbnQtd2VpZ2h0OlxuICogZm9ybS1maWVsZC1hZGRvbi1naWFudC1oZWlnaHQ6XG4gKiBmb3JtLWZpZWxkLWFkZG9uLWdpYW50LXdpZHRoOlxuICogZm9ybS1maWVsZC1hZGRvbi1naWFudC1pY29uLXNpemU6XG4gKiBmb3JtLWZpZWxkLWFkZG9uLWdpYW50LWZvbnQtc2l6ZTpcbiAqIGZvcm0tZmllbGQtYWRkb24tZ2lhbnQtbGluZS1oZWlnaHQ6XG4gKiBmb3JtLWZpZWxkLWFkZG9uLWdpYW50LWZvbnQtd2VpZ2h0OlxuICoqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmItZm9ybS1maWVsZCcsXG4gIHN0eWxlVXJsczogWycuL2Zvcm0tZmllbGQuY29tcG9uZW50LnNjc3MnXSxcbiAgdGVtcGxhdGVVcmw6ICcuL2Zvcm0tZmllbGQuY29tcG9uZW50Lmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgTmJGb3JtRmllbGRDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRDaGVja2VkLCBBZnRlckNvbnRlbnRJbml0LCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuXG4gIHByb3RlY3RlZCByZWFkb25seSBkZXN0cm95JCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgcHJvdGVjdGVkIGZvcm1Db250cm9sU3RhdGUkID0gbmV3IFJlcGxheVN1YmplY3Q8TmJGb3JtQ29udHJvbFN0YXRlPigxKTtcbiAgcHJlZml4Q2xhc3NlcyQ6IE9ic2VydmFibGU8c3RyaW5nW10+ID0gdGhpcy5mb3JtQ29udHJvbFN0YXRlJC5waXBlKG1hcChzID0+IHRoaXMuZ2V0QWRkb25DbGFzc2VzKCdwcmVmaXgnLCBzKSkpO1xuICBzdWZmaXhDbGFzc2VzJDogT2JzZXJ2YWJsZTxzdHJpbmdbXT4gPSB0aGlzLmZvcm1Db250cm9sU3RhdGUkLnBpcGUobWFwKHMgPT4gdGhpcy5nZXRBZGRvbkNsYXNzZXMoJ3N1ZmZpeCcsIHMpKSk7XG5cbiAgQENvbnRlbnRDaGlsZHJlbihOYlByZWZpeERpcmVjdGl2ZSwgeyBkZXNjZW5kYW50czogdHJ1ZSB9KSBwcmVmaXg6IFF1ZXJ5TGlzdDxOYlByZWZpeERpcmVjdGl2ZT47XG4gIEBDb250ZW50Q2hpbGRyZW4oTmJTdWZmaXhEaXJlY3RpdmUsIHsgZGVzY2VuZGFudHM6IHRydWUgfSkgc3VmZml4OiBRdWVyeUxpc3Q8TmJTdWZmaXhEaXJlY3RpdmU+O1xuXG4gIEBDb250ZW50Q2hpbGQoTmJGb3JtRmllbGRDb250cm9sLCB7IHN0YXRpYzogZmFsc2UgfSkgZm9ybUNvbnRyb2w6IE5iRm9ybUZpZWxkQ29udHJvbDtcbiAgQENvbnRlbnRDaGlsZChOYkZvcm1GaWVsZENvbnRyb2xDb25maWcsIHsgc3RhdGljOiBmYWxzZSB9KSBmb3JtQ29udHJvbENvbmZpZzogTmJGb3JtRmllbGRDb250cm9sQ29uZmlnO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MnKSBmb3JtRmllbGRDbGFzc2VzO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJvdGVjdGVkIHpvbmU6IE5nWm9uZSxcbiAgICBwcm90ZWN0ZWQgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBwcm90ZWN0ZWQgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgKSB7XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudENoZWNrZWQoKSB7XG4gICAgaWYgKCF0aGlzLmZvcm1Db250cm9sKSB7XG4gICAgICB0aHJvd0Zvcm1Db250cm9sRWxlbWVudE5vdEZvdW5kKCk7XG4gICAgfVxuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIHRoaXMuc3Vic2NyaWJlVG9Gb3JtQ29udHJvbFN0YXRlQ2hhbmdlKCk7XG4gICAgdGhpcy5zdWJzY3JpYmVUb0FkZG9uQ2hhbmdlKCk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgLy8gVE9ETzogIzIyNTRcbiAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnbmItdHJhbnNpdGlvbicpO1xuICAgIH0pKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuZGVzdHJveSQubmV4dCgpO1xuICB9XG5cbiAgc2hvdWxkU2hvd1ByZWZpeCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5nZXRGb3JtQ29udHJvbENvbmZpZygpLnN1cHBvcnRzUHJlZml4ICYmICEhdGhpcy5wcmVmaXgubGVuZ3RoO1xuICB9XG5cbiAgc2hvdWxkU2hvd1N1ZmZpeCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5nZXRGb3JtQ29udHJvbENvbmZpZygpLnN1cHBvcnRzU3VmZml4ICYmICEhdGhpcy5zdWZmaXgubGVuZ3RoO1xuICB9XG5cbiAgcHJvdGVjdGVkIHN1YnNjcmliZVRvRm9ybUNvbnRyb2xTdGF0ZUNoYW5nZSgpIHtcbiAgICBjb25zdCB7IGRpc2FibGVkJCwgZm9jdXNlZCQsIHNpemUkLCBzdGF0dXMkLCBmdWxsV2lkdGgkIH0gPSB0aGlzLmZvcm1Db250cm9sO1xuXG4gICAgY29tYmluZUxhdGVzdChbZGlzYWJsZWQkLCBmb2N1c2VkJCwgc2l6ZSQsIHN0YXR1cyQsIGZ1bGxXaWR0aCRdKVxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcCgoW2Rpc2FibGVkLCBmb2N1c2VkLCBzaXplLCBzdGF0dXMsIGZ1bGxXaWR0aF0pID0+ICh7IGRpc2FibGVkLCBmb2N1c2VkLCBzaXplLCBzdGF0dXMsIGZ1bGxXaWR0aCB9KSksXG4gICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKChvbGRTdGF0ZSwgc3RhdGUpID0+IHRoaXMuaXNTdGF0ZXNFcXVhbChvbGRTdGF0ZSwgc3RhdGUpKSxcbiAgICAgICAgdGFwKCh7IHNpemUsIGZ1bGxXaWR0aCB9KSA9PiB7XG4gICAgICAgICAgY29uc3QgZm9ybUZpZWxkQ2xhc3NlcyA9IFtgbmItZm9ybS1maWVsZC1zaXplLSR7c2l6ZX1gXTtcbiAgICAgICAgICBpZiAoIWZ1bGxXaWR0aCkge1xuICAgICAgICAgICAgZm9ybUZpZWxkQ2xhc3Nlcy5wdXNoKCduYi1mb3JtLWZpZWxkLWxpbWl0ZWQtd2lkdGgnKVxuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmZvcm1GaWVsZENsYXNzZXMgPSBmb3JtRmllbGRDbGFzc2VzLmpvaW4oJyAnKTtcbiAgICAgICAgfSksXG4gICAgICAgIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSxcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUodGhpcy5mb3JtQ29udHJvbFN0YXRlJCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgc3Vic2NyaWJlVG9BZGRvbkNoYW5nZSgpIHtcbiAgICBtZXJnZSh0aGlzLnByZWZpeC5jaGFuZ2VzLCB0aGlzLnN1ZmZpeC5jaGFuZ2VzKVxuICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLmNkLm1hcmtGb3JDaGVjaygpKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRBZGRvbkNsYXNzZXMoYWRkb246IE5iRm9ybUNvbnRyb2xBZGRvbiwgc3RhdGU6IE5iRm9ybUNvbnRyb2xTdGF0ZSk6IHN0cmluZ1tdIHtcbiAgICBjb25zdCBjbGFzc2VzID0gW1xuICAgICAgJ25iLWZvcm0tZmllbGQtYWRkb24nLFxuICAgICAgYG5iLWZvcm0tZmllbGQtJHthZGRvbn0tJHtzdGF0ZS5zaXplfWAsXG4gICAgXTtcblxuICAgIGlmIChzdGF0ZS5kaXNhYmxlZCkge1xuICAgICAgY2xhc3Nlcy5wdXNoKGBuYi1mb3JtLWZpZWxkLWFkZG9uLWRpc2FibGVkYCk7XG4gICAgfSBlbHNlIGlmIChzdGF0ZS5mb2N1c2VkKSB7XG4gICAgICBjbGFzc2VzLnB1c2goYG5iLWZvcm0tZmllbGQtYWRkb24tJHtzdGF0ZS5zdGF0dXN9LWhpZ2hsaWdodGApO1xuICAgIH0gZWxzZSB7XG4gICAgICBjbGFzc2VzLnB1c2goYG5iLWZvcm0tZmllbGQtYWRkb24tJHtzdGF0ZS5zdGF0dXN9YCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNsYXNzZXM7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0Rm9ybUNvbnRyb2xDb25maWcoKTogTmJGb3JtRmllbGRDb250cm9sQ29uZmlnIHtcbiAgICByZXR1cm4gdGhpcy5mb3JtQ29udHJvbENvbmZpZyB8fCBuZXcgTmJGb3JtRmllbGRDb250cm9sQ29uZmlnKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgaXNTdGF0ZXNFcXVhbChvbGRTdGF0ZTogTmJGb3JtQ29udHJvbFN0YXRlLCBzdGF0ZTogTmJGb3JtQ29udHJvbFN0YXRlKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIG9sZFN0YXRlLnN0YXR1cyA9PT0gc3RhdGUuc3RhdHVzICYmXG4gICAgICAgICAgIG9sZFN0YXRlLmRpc2FibGVkID09PSBzdGF0ZS5kaXNhYmxlZCAmJlxuICAgICAgICAgICBvbGRTdGF0ZS5mb2N1c2VkID09PSBzdGF0ZS5mb2N1c2VkICYmXG4gICAgICAgICAgIG9sZFN0YXRlLmZ1bGxXaWR0aCA9PT0gc3RhdGUuZnVsbFdpZHRoICYmXG4gICAgICAgICAgIG9sZFN0YXRlLnNpemUgPT09IHN0YXRlLnNpemU7XG4gIH1cbn1cbiIsIjxkaXYgKm5nSWY9XCJzaG91bGRTaG93UHJlZml4KClcIiBbbmdDbGFzc109XCJwcmVmaXhDbGFzc2VzJCB8IGFzeW5jXCI+XG4gIDxuZy1jb250ZW50IHNlbGVjdD1cIltuYlByZWZpeF1cIj48L25nLWNvbnRlbnQ+XG48L2Rpdj5cblxuPGRpdiBjbGFzcz1cIm5iLWZvcm0tY29udHJvbC1jb250YWluZXJcIlxuICAgICBbY2xhc3MubmItZm9ybS1maWVsZC1jb250cm9sLXdpdGgtcHJlZml4XT1cInNob3VsZFNob3dQcmVmaXgoKVwiXG4gICAgIFtjbGFzcy5uYi1mb3JtLWZpZWxkLWNvbnRyb2wtd2l0aC1zdWZmaXhdPVwic2hvdWxkU2hvd1N1ZmZpeCgpXCI+XG4gIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbjwvZGl2PlxuXG48ZGl2ICpuZ0lmPVwic2hvdWxkU2hvd1N1ZmZpeCgpXCIgW25nQ2xhc3NdPVwic3VmZml4Q2xhc3NlcyQgfCBhc3luY1wiPlxuICA8bmctY29udGVudCBzZWxlY3Q9XCJbbmJTdWZmaXhdXCI+PC9uZy1jb250ZW50PlxuPC9kaXY+XG4iXX0=