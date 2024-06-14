/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Inject, Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { map, filter, pairwise, distinctUntilChanged, startWith, share } from 'rxjs/operators';
import { NB_THEME_OPTIONS } from '../theme.options';
import * as i0 from "@angular/core";
import * as i1 from "./breakpoints.service";
import * as i2 from "./js-themes-registry.service";
/**
 * Main Nebular service. Includes various helper methods.
 */
export class NbThemeService {
    constructor(options, breakpointService, jsThemesRegistry) {
        this.options = options;
        this.breakpointService = breakpointService;
        this.jsThemesRegistry = jsThemesRegistry;
        this.themeChanges$ = new ReplaySubject(1);
        this.appendLayoutClass$ = new Subject();
        this.removeLayoutClass$ = new Subject();
        this.changeWindowWidth$ = new ReplaySubject(2);
        if (options && options.name) {
            this.changeTheme(options.name);
        }
    }
    /**
     * Change current application theme
     * @param {string} name
     */
    changeTheme(name) {
        this.themeChanges$.next({ name, previous: this.currentTheme });
        this.currentTheme = name;
    }
    changeWindowWidth(width) {
        this.changeWindowWidth$.next(width);
    }
    /**
     * Returns a theme object with variables (color/paddings/etc) on a theme change.
     * Once subscribed - returns current theme.
     *
     * @returns {Observable<NbJSThemeOptions>}
     */
    getJsTheme() {
        return this.onThemeChange().pipe(map((theme) => {
            return this.jsThemesRegistry.get(theme.name);
        }));
    }
    /**
     * Triggers media query breakpoint change
     * Returns a pair where the first item is previous media breakpoint and the second item is current breakpoit.
     * ```ts
     *  [{ name: 'xs', width: 0 }, { name: 'md', width: 768 }] // change from `xs` to `md`
     * ```
     * @returns {Observable<[NbMediaBreakpoint, NbMediaBreakpoint]>}
     */
    onMediaQueryChange() {
        return this.changeWindowWidth$
            .pipe(startWith(undefined), pairwise(), map(([prevWidth, width]) => {
            return [
                this.breakpointService.getByWidth(prevWidth),
                this.breakpointService.getByWidth(width),
            ];
        }), filter(([prevPoint, point]) => {
            return prevPoint.name !== point.name;
        }), distinctUntilChanged(null, params => params[0].name + params[1].name), share());
    }
    /**
     * Triggered when current theme is changed
     * @returns {Observable<any>}
     */
    onThemeChange() {
        return this.themeChanges$.pipe(share());
    }
    /**
     * Append a class to nb-layout
     * @param {string} className
     */
    appendLayoutClass(className) {
        this.appendLayoutClass$.next(className);
    }
    /**
     * Triggered when a new class is added to nb-layout through `appendLayoutClass` method
     * @returns {Observable<any>}
     */
    onAppendLayoutClass() {
        return this.appendLayoutClass$.pipe(share());
    }
    /**
     * Removes a class from nb-layout
     * @param {string} className
     */
    removeLayoutClass(className) {
        this.removeLayoutClass$.next(className);
    }
    /**
     * Triggered when a class is removed from nb-layout through `removeLayoutClass` method
     * @returns {Observable<any>}
     */
    onRemoveLayoutClass() {
        return this.removeLayoutClass$.pipe(share());
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbThemeService, deps: [{ token: NB_THEME_OPTIONS }, { token: i1.NbMediaBreakpointsService }, { token: i2.NbJSThemesRegistry }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbThemeService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbThemeService, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [NB_THEME_OPTIONS]
                }] }, { type: i1.NbMediaBreakpointsService }, { type: i2.NbJSThemesRegistry }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9mcmFtZXdvcmsvdGhlbWUvc2VydmljZXMvdGhlbWUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFbkQsT0FBTyxFQUFjLGFBQWEsRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDMUQsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLG9CQUFvQixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUUvRixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQzs7OztBQUtwRDs7R0FFRztBQUVILE1BQU0sT0FBTyxjQUFjO0lBU3pCLFlBQWdELE9BQVksRUFDeEMsaUJBQTRDLEVBQzVDLGdCQUFvQztRQUZSLFlBQU8sR0FBUCxPQUFPLENBQUs7UUFDeEMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUEyQjtRQUM1QyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQW9CO1FBUGhELGtCQUFhLEdBQUcsSUFBSSxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckMsdUJBQWtCLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUNuQyx1QkFBa0IsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO1FBQ25DLHVCQUFrQixHQUFHLElBQUksYUFBYSxDQUFTLENBQUMsQ0FBQyxDQUFDO1FBS3hELElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUM1QixJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqQyxDQUFDO0lBQ0gsQ0FBQztJQUVEOzs7T0FHRztJQUNILFdBQVcsQ0FBQyxJQUFZO1FBQ3RCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQztRQUMvRCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztJQUMzQixDQUFDO0lBRUQsaUJBQWlCLENBQUMsS0FBYTtRQUM3QixJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILFVBQVU7UUFDUixPQUFPLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxJQUFJLENBQzlCLEdBQUcsQ0FBQyxDQUFDLEtBQVUsRUFBRSxFQUFFO1lBQ2pCLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDL0MsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0gsa0JBQWtCO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLGtCQUFrQjthQUMzQixJQUFJLENBQ0gsU0FBUyxDQUFDLFNBQVMsQ0FBQyxFQUNwQixRQUFRLEVBQUUsRUFDVixHQUFHLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQW1CLEVBQUUsRUFBRTtZQUMzQyxPQUFPO2dCQUNMLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDO2dCQUM1QyxJQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQzthQUNDLENBQUM7UUFDOUMsQ0FBQyxDQUFDLEVBQ0YsTUFBTSxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUF5QyxFQUFFLEVBQUU7WUFDcEUsT0FBTyxTQUFTLENBQUMsSUFBSSxLQUFLLEtBQUssQ0FBQyxJQUFJLENBQUM7UUFDdkMsQ0FBQyxDQUFDLEVBQ0Ysb0JBQW9CLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQ3JFLEtBQUssRUFBRSxDQUNSLENBQUM7SUFDTixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsYUFBYTtRQUNYLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsaUJBQWlCLENBQUMsU0FBaUI7UUFDakMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsbUJBQW1CO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFRDs7O09BR0c7SUFDSCxpQkFBaUIsQ0FBQyxTQUFpQjtRQUNqQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFRDs7O09BR0c7SUFDSCxtQkFBbUI7UUFDakIsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7SUFDL0MsQ0FBQzs4R0E3R1UsY0FBYyxrQkFTTCxnQkFBZ0I7a0hBVHpCLGNBQWM7OzJGQUFkLGNBQWM7a0JBRDFCLFVBQVU7OzBCQVVJLE1BQU07MkJBQUMsZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEFrdmVvLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqL1xuXG5pbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgUmVwbGF5U3ViamVjdCwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwLCBmaWx0ZXIsIHBhaXJ3aXNlLCBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgc3RhcnRXaXRoLCBzaGFyZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgTkJfVEhFTUVfT1BUSU9OUyB9IGZyb20gJy4uL3RoZW1lLm9wdGlvbnMnO1xuaW1wb3J0IHsgTmJKU1RoZW1lT3B0aW9ucyB9IGZyb20gJy4vanMtdGhlbWVzL3RoZW1lLm9wdGlvbnMnO1xuaW1wb3J0IHsgTmJKU1RoZW1lc1JlZ2lzdHJ5IH0gZnJvbSAnLi9qcy10aGVtZXMtcmVnaXN0cnkuc2VydmljZSc7XG5pbXBvcnQgeyBOYk1lZGlhQnJlYWtwb2ludHNTZXJ2aWNlLCBOYk1lZGlhQnJlYWtwb2ludCB9IGZyb20gJy4vYnJlYWtwb2ludHMuc2VydmljZSc7XG5cbi8qKlxuICogTWFpbiBOZWJ1bGFyIHNlcnZpY2UuIEluY2x1ZGVzIHZhcmlvdXMgaGVscGVyIG1ldGhvZHMuXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBOYlRoZW1lU2VydmljZSB7XG5cbiAgLy8gVE9ETzogYmVoYXZpb3JhbCBzdWJqZWN0IGhlcmU/XG4gIGN1cnJlbnRUaGVtZTogc3RyaW5nO1xuICBwcml2YXRlIHRoZW1lQ2hhbmdlcyQgPSBuZXcgUmVwbGF5U3ViamVjdCgxKTtcbiAgcHJpdmF0ZSBhcHBlbmRMYXlvdXRDbGFzcyQgPSBuZXcgU3ViamVjdCgpO1xuICBwcml2YXRlIHJlbW92ZUxheW91dENsYXNzJCA9IG5ldyBTdWJqZWN0KCk7XG4gIHByaXZhdGUgY2hhbmdlV2luZG93V2lkdGgkID0gbmV3IFJlcGxheVN1YmplY3Q8bnVtYmVyPigyKTtcblxuICBjb25zdHJ1Y3RvcihASW5qZWN0KE5CX1RIRU1FX09QVElPTlMpIHByb3RlY3RlZCBvcHRpb25zOiBhbnksXG4gICAgICAgICAgICAgIHByaXZhdGUgYnJlYWtwb2ludFNlcnZpY2U6IE5iTWVkaWFCcmVha3BvaW50c1NlcnZpY2UsXG4gICAgICAgICAgICAgIHByaXZhdGUganNUaGVtZXNSZWdpc3RyeTogTmJKU1RoZW1lc1JlZ2lzdHJ5KSB7XG4gICAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5uYW1lKSB7XG4gICAgICB0aGlzLmNoYW5nZVRoZW1lKG9wdGlvbnMubmFtZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENoYW5nZSBjdXJyZW50IGFwcGxpY2F0aW9uIHRoZW1lXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gICAqL1xuICBjaGFuZ2VUaGVtZShuYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLnRoZW1lQ2hhbmdlcyQubmV4dCh7IG5hbWUsIHByZXZpb3VzOiB0aGlzLmN1cnJlbnRUaGVtZSB9KTtcbiAgICB0aGlzLmN1cnJlbnRUaGVtZSA9IG5hbWU7XG4gIH1cblxuICBjaGFuZ2VXaW5kb3dXaWR0aCh3aWR0aDogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5jaGFuZ2VXaW5kb3dXaWR0aCQubmV4dCh3aWR0aCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIHRoZW1lIG9iamVjdCB3aXRoIHZhcmlhYmxlcyAoY29sb3IvcGFkZGluZ3MvZXRjKSBvbiBhIHRoZW1lIGNoYW5nZS5cbiAgICogT25jZSBzdWJzY3JpYmVkIC0gcmV0dXJucyBjdXJyZW50IHRoZW1lLlxuICAgKlxuICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxOYkpTVGhlbWVPcHRpb25zPn1cbiAgICovXG4gIGdldEpzVGhlbWUoKTogT2JzZXJ2YWJsZTxOYkpTVGhlbWVPcHRpb25zPiB7XG4gICAgcmV0dXJuIHRoaXMub25UaGVtZUNoYW5nZSgpLnBpcGUoXG4gICAgICBtYXAoKHRoZW1lOiBhbnkpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuanNUaGVtZXNSZWdpc3RyeS5nZXQodGhlbWUubmFtZSk7XG4gICAgICB9KSxcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFRyaWdnZXJzIG1lZGlhIHF1ZXJ5IGJyZWFrcG9pbnQgY2hhbmdlXG4gICAqIFJldHVybnMgYSBwYWlyIHdoZXJlIHRoZSBmaXJzdCBpdGVtIGlzIHByZXZpb3VzIG1lZGlhIGJyZWFrcG9pbnQgYW5kIHRoZSBzZWNvbmQgaXRlbSBpcyBjdXJyZW50IGJyZWFrcG9pdC5cbiAgICogYGBgdHNcbiAgICogIFt7IG5hbWU6ICd4cycsIHdpZHRoOiAwIH0sIHsgbmFtZTogJ21kJywgd2lkdGg6IDc2OCB9XSAvLyBjaGFuZ2UgZnJvbSBgeHNgIHRvIGBtZGBcbiAgICogYGBgXG4gICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPFtOYk1lZGlhQnJlYWtwb2ludCwgTmJNZWRpYUJyZWFrcG9pbnRdPn1cbiAgICovXG4gIG9uTWVkaWFRdWVyeUNoYW5nZSgpOiBPYnNlcnZhYmxlPE5iTWVkaWFCcmVha3BvaW50W10+IHtcbiAgICByZXR1cm4gdGhpcy5jaGFuZ2VXaW5kb3dXaWR0aCRcbiAgICAgIC5waXBlKFxuICAgICAgICBzdGFydFdpdGgodW5kZWZpbmVkKSxcbiAgICAgICAgcGFpcndpc2UoKSxcbiAgICAgICAgbWFwKChbcHJldldpZHRoLCB3aWR0aF06IFtudW1iZXIsIG51bWJlcl0pID0+IHtcbiAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgdGhpcy5icmVha3BvaW50U2VydmljZS5nZXRCeVdpZHRoKHByZXZXaWR0aCksXG4gICAgICAgICAgICB0aGlzLmJyZWFrcG9pbnRTZXJ2aWNlLmdldEJ5V2lkdGgod2lkdGgpLFxuICAgICAgICAgIF0gYXMgW05iTWVkaWFCcmVha3BvaW50LCBOYk1lZGlhQnJlYWtwb2ludF07XG4gICAgICAgIH0pLFxuICAgICAgICBmaWx0ZXIoKFtwcmV2UG9pbnQsIHBvaW50XTogW05iTWVkaWFCcmVha3BvaW50LCBOYk1lZGlhQnJlYWtwb2ludF0pID0+IHtcbiAgICAgICAgICByZXR1cm4gcHJldlBvaW50Lm5hbWUgIT09IHBvaW50Lm5hbWU7XG4gICAgICAgIH0pLFxuICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZChudWxsLCBwYXJhbXMgPT4gcGFyYW1zWzBdLm5hbWUgKyBwYXJhbXNbMV0ubmFtZSksXG4gICAgICAgIHNoYXJlKCksXG4gICAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFRyaWdnZXJlZCB3aGVuIGN1cnJlbnQgdGhlbWUgaXMgY2hhbmdlZFxuICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxhbnk+fVxuICAgKi9cbiAgb25UaGVtZUNoYW5nZSgpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLnRoZW1lQ2hhbmdlcyQucGlwZShzaGFyZSgpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBlbmQgYSBjbGFzcyB0byBuYi1sYXlvdXRcbiAgICogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZVxuICAgKi9cbiAgYXBwZW5kTGF5b3V0Q2xhc3MoY2xhc3NOYW1lOiBzdHJpbmcpIHtcbiAgICB0aGlzLmFwcGVuZExheW91dENsYXNzJC5uZXh0KGNsYXNzTmFtZSk7XG4gIH1cblxuICAvKipcbiAgICogVHJpZ2dlcmVkIHdoZW4gYSBuZXcgY2xhc3MgaXMgYWRkZWQgdG8gbmItbGF5b3V0IHRocm91Z2ggYGFwcGVuZExheW91dENsYXNzYCBtZXRob2RcbiAgICogQHJldHVybnMge09ic2VydmFibGU8YW55Pn1cbiAgICovXG4gIG9uQXBwZW5kTGF5b3V0Q2xhc3MoKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5hcHBlbmRMYXlvdXRDbGFzcyQucGlwZShzaGFyZSgpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGEgY2xhc3MgZnJvbSBuYi1sYXlvdXRcbiAgICogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZVxuICAgKi9cbiAgcmVtb3ZlTGF5b3V0Q2xhc3MoY2xhc3NOYW1lOiBzdHJpbmcpIHtcbiAgICB0aGlzLnJlbW92ZUxheW91dENsYXNzJC5uZXh0KGNsYXNzTmFtZSk7XG4gIH1cblxuICAvKipcbiAgICogVHJpZ2dlcmVkIHdoZW4gYSBjbGFzcyBpcyByZW1vdmVkIGZyb20gbmItbGF5b3V0IHRocm91Z2ggYHJlbW92ZUxheW91dENsYXNzYCBtZXRob2RcbiAgICogQHJldHVybnMge09ic2VydmFibGU8YW55Pn1cbiAgICovXG4gIG9uUmVtb3ZlTGF5b3V0Q2xhc3MoKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5yZW1vdmVMYXlvdXRDbGFzcyQucGlwZShzaGFyZSgpKTtcbiAgfVxufVxuIl19