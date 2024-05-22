/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { NgModule, PLATFORM_ID } from '@angular/core';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { NB_BUILT_IN_JS_THEMES, NB_MEDIA_BREAKPOINTS, NB_THEME_OPTIONS, NB_JS_THEMES, NB_DOCUMENT, NB_WINDOW, } from './theme.options';
import { NbThemeService } from './services/theme.service';
import { NbSpinnerService } from './services/spinner.service';
import { BUILT_IN_THEMES, NbJSThemesRegistry } from './services/js-themes-registry.service';
import { DEFAULT_MEDIA_BREAKPOINTS, NbMediaBreakpointsService, } from './services/breakpoints.service';
import { NbLayoutDirectionService, NbLayoutDirection, NB_LAYOUT_DIRECTION } from './services/direction.service';
import { NbLayoutScrollService } from './services/scroll.service';
import { NbLayoutRulerService } from './services/ruler.service';
import { NbOverlayModule } from './components/cdk/overlay/overlay.module';
import { NbStatusService } from './services/status.service';
import * as i0 from "@angular/core";
export function windowFactory(platformId) {
    if (isPlatformBrowser(platformId)) {
        return window;
    }
    // Provide undefined to get the error when trying to access the window as it
    // shouldn't be used outside the browser. Those who need to provide something
    // instead of window (e.g. domino window when running in node) could override
    // NB_WINDOW token.
    return undefined;
}
export class NbThemeModule {
    // TODO: check the options (throw exception?)
    /**
     * Main Theme Module
     *
     * @param nbThemeOptions {NbThemeOptions} Main theme options
     * @param nbJSThemes {NbJSThemeOptions[]} List of JS Themes, will be merged with default themes
     * @param nbMediaBreakpoints {NbMediaBreakpoint} Available media breakpoints
     * @param layoutDirection {NbLayoutDirection} Layout direction
     *
     * @returns {ModuleWithProviders}
     */
    static forRoot(nbThemeOptions = { name: 'default' }, nbJSThemes, nbMediaBreakpoints, layoutDirection) {
        return {
            ngModule: NbThemeModule,
            providers: [
                { provide: NB_THEME_OPTIONS, useValue: nbThemeOptions || {} },
                { provide: NB_BUILT_IN_JS_THEMES, useValue: BUILT_IN_THEMES },
                { provide: NB_JS_THEMES, useValue: nbJSThemes || [] },
                { provide: NB_MEDIA_BREAKPOINTS, useValue: nbMediaBreakpoints || DEFAULT_MEDIA_BREAKPOINTS },
                { provide: NB_DOCUMENT, useExisting: DOCUMENT },
                { provide: NB_WINDOW, useFactory: windowFactory, deps: [PLATFORM_ID] },
                NbJSThemesRegistry,
                NbThemeService,
                NbMediaBreakpointsService,
                NbSpinnerService,
                { provide: NB_LAYOUT_DIRECTION, useValue: layoutDirection || NbLayoutDirection.LTR },
                NbLayoutDirectionService,
                NbLayoutScrollService,
                NbLayoutRulerService,
                ...NbOverlayModule.forRoot().providers,
                NbStatusService,
            ],
        };
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbThemeModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.1.0", ngImport: i0, type: NbThemeModule, imports: [CommonModule] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbThemeModule, imports: [CommonModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbThemeModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                    ],
                    exports: [],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZyYW1ld29yay90aGVtZS90aGVtZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxRQUFRLEVBQXVCLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzRSxPQUFPLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRTVFLE9BQU8sRUFDTCxxQkFBcUIsRUFDckIsb0JBQW9CLEVBRXBCLGdCQUFnQixFQUNoQixZQUFZLEVBQ1osV0FBVyxFQUNYLFNBQVMsR0FDVixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUU5RCxPQUFPLEVBQUUsZUFBZSxFQUFFLGtCQUFrQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDNUYsT0FBTyxFQUNMLHlCQUF5QixFQUV6Qix5QkFBeUIsR0FDMUIsTUFBTSxnQ0FBZ0MsQ0FBQztBQUN4QyxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsaUJBQWlCLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUNoSCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNsRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDMUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDJCQUEyQixDQUFDOztBQUU1RCxNQUFNLFVBQVUsYUFBYSxDQUFDLFVBQWtCO0lBQzlDLElBQUksaUJBQWlCLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQztRQUNsQyxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBRUQsNEVBQTRFO0lBQzVFLDZFQUE2RTtJQUM3RSw2RUFBNkU7SUFDN0UsbUJBQW1CO0lBQ25CLE9BQU8sU0FBUyxDQUFDO0FBQ25CLENBQUM7QUFTRCxNQUFNLE9BQU8sYUFBYTtJQUV4Qiw2Q0FBNkM7SUFDN0M7Ozs7Ozs7OztPQVNHO0lBQ0gsTUFBTSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEVBQ3BELFVBQStCLEVBQy9CLGtCQUF3QyxFQUN4QyxlQUFtQztRQUVoRCxPQUFPO1lBQ0wsUUFBUSxFQUFFLGFBQWE7WUFDdkIsU0FBUyxFQUFFO2dCQUNULEVBQUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBRSxjQUFjLElBQUksRUFBRSxFQUFFO2dCQUM3RCxFQUFFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxRQUFRLEVBQUUsZUFBZSxFQUFFO2dCQUM3RCxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFFLFVBQVUsSUFBSSxFQUFFLEVBQUU7Z0JBQ3JELEVBQUUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLFFBQVEsRUFBRSxrQkFBa0IsSUFBSSx5QkFBeUIsRUFBRTtnQkFDNUYsRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUU7Z0JBQy9DLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxDQUFFLFdBQVcsQ0FBRSxFQUFFO2dCQUN4RSxrQkFBa0I7Z0JBQ2xCLGNBQWM7Z0JBQ2QseUJBQXlCO2dCQUN6QixnQkFBZ0I7Z0JBQ2hCLEVBQUUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLFFBQVEsRUFBRSxlQUFlLElBQUksaUJBQWlCLENBQUMsR0FBRyxFQUFFO2dCQUNwRix3QkFBd0I7Z0JBQ3hCLHFCQUFxQjtnQkFDckIsb0JBQW9CO2dCQUNwQixHQUFHLGVBQWUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxTQUFTO2dCQUN0QyxlQUFlO2FBQ2hCO1NBQ0YsQ0FBQztJQUNKLENBQUM7OEdBdkNVLGFBQWE7K0dBQWIsYUFBYSxZQUx0QixZQUFZOytHQUtILGFBQWEsWUFMdEIsWUFBWTs7MkZBS0gsYUFBYTtrQkFQekIsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTtxQkFDYjtvQkFDRCxPQUFPLEVBQUUsRUFDUjtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBBa3Zlby4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi9cblxuaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMsIFBMQVRGT1JNX0lEIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUsIERPQ1VNRU5ULCBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7XG4gIE5CX0JVSUxUX0lOX0pTX1RIRU1FUyxcbiAgTkJfTUVESUFfQlJFQUtQT0lOVFMsXG4gIE5iVGhlbWVPcHRpb25zLFxuICBOQl9USEVNRV9PUFRJT05TLFxuICBOQl9KU19USEVNRVMsXG4gIE5CX0RPQ1VNRU5ULFxuICBOQl9XSU5ET1csXG59IGZyb20gJy4vdGhlbWUub3B0aW9ucyc7XG5pbXBvcnQgeyBOYlRoZW1lU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvdGhlbWUuc2VydmljZSc7XG5pbXBvcnQgeyBOYlNwaW5uZXJTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9zcGlubmVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgTmJKU1RoZW1lT3B0aW9ucyB9IGZyb20gJy4vc2VydmljZXMvanMtdGhlbWVzL3RoZW1lLm9wdGlvbnMnO1xuaW1wb3J0IHsgQlVJTFRfSU5fVEhFTUVTLCBOYkpTVGhlbWVzUmVnaXN0cnkgfSBmcm9tICcuL3NlcnZpY2VzL2pzLXRoZW1lcy1yZWdpc3RyeS5zZXJ2aWNlJztcbmltcG9ydCB7XG4gIERFRkFVTFRfTUVESUFfQlJFQUtQT0lOVFMsXG4gIE5iTWVkaWFCcmVha3BvaW50LFxuICBOYk1lZGlhQnJlYWtwb2ludHNTZXJ2aWNlLFxufSBmcm9tICcuL3NlcnZpY2VzL2JyZWFrcG9pbnRzLnNlcnZpY2UnO1xuaW1wb3J0IHsgTmJMYXlvdXREaXJlY3Rpb25TZXJ2aWNlLCBOYkxheW91dERpcmVjdGlvbiwgTkJfTEFZT1VUX0RJUkVDVElPTiB9IGZyb20gJy4vc2VydmljZXMvZGlyZWN0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgTmJMYXlvdXRTY3JvbGxTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9zY3JvbGwuc2VydmljZSc7XG5pbXBvcnQgeyBOYkxheW91dFJ1bGVyU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvcnVsZXIuc2VydmljZSc7XG5pbXBvcnQgeyBOYk92ZXJsYXlNb2R1bGUgfSBmcm9tICcuL2NvbXBvbmVudHMvY2RrL292ZXJsYXkvb3ZlcmxheS5tb2R1bGUnO1xuaW1wb3J0IHsgTmJTdGF0dXNTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9zdGF0dXMuc2VydmljZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiB3aW5kb3dGYWN0b3J5KHBsYXRmb3JtSWQ6IE9iamVjdCk6IFdpbmRvdyB8IHVuZGVmaW5lZCB7XG4gIGlmIChpc1BsYXRmb3JtQnJvd3NlcihwbGF0Zm9ybUlkKSkge1xuICAgIHJldHVybiB3aW5kb3c7XG4gIH1cblxuICAvLyBQcm92aWRlIHVuZGVmaW5lZCB0byBnZXQgdGhlIGVycm9yIHdoZW4gdHJ5aW5nIHRvIGFjY2VzcyB0aGUgd2luZG93IGFzIGl0XG4gIC8vIHNob3VsZG4ndCBiZSB1c2VkIG91dHNpZGUgdGhlIGJyb3dzZXIuIFRob3NlIHdobyBuZWVkIHRvIHByb3ZpZGUgc29tZXRoaW5nXG4gIC8vIGluc3RlYWQgb2Ygd2luZG93IChlLmcuIGRvbWlubyB3aW5kb3cgd2hlbiBydW5uaW5nIGluIG5vZGUpIGNvdWxkIG92ZXJyaWRlXG4gIC8vIE5CX1dJTkRPVyB0b2tlbi5cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgXSxcbiAgZXhwb3J0czogW1xuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBOYlRoZW1lTW9kdWxlIHtcblxuICAvLyBUT0RPOiBjaGVjayB0aGUgb3B0aW9ucyAodGhyb3cgZXhjZXB0aW9uPylcbiAgLyoqXG4gICAqIE1haW4gVGhlbWUgTW9kdWxlXG4gICAqXG4gICAqIEBwYXJhbSBuYlRoZW1lT3B0aW9ucyB7TmJUaGVtZU9wdGlvbnN9IE1haW4gdGhlbWUgb3B0aW9uc1xuICAgKiBAcGFyYW0gbmJKU1RoZW1lcyB7TmJKU1RoZW1lT3B0aW9uc1tdfSBMaXN0IG9mIEpTIFRoZW1lcywgd2lsbCBiZSBtZXJnZWQgd2l0aCBkZWZhdWx0IHRoZW1lc1xuICAgKiBAcGFyYW0gbmJNZWRpYUJyZWFrcG9pbnRzIHtOYk1lZGlhQnJlYWtwb2ludH0gQXZhaWxhYmxlIG1lZGlhIGJyZWFrcG9pbnRzXG4gICAqIEBwYXJhbSBsYXlvdXREaXJlY3Rpb24ge05iTGF5b3V0RGlyZWN0aW9ufSBMYXlvdXQgZGlyZWN0aW9uXG4gICAqXG4gICAqIEByZXR1cm5zIHtNb2R1bGVXaXRoUHJvdmlkZXJzfVxuICAgKi9cbiAgc3RhdGljIGZvclJvb3QobmJUaGVtZU9wdGlvbnM6IE5iVGhlbWVPcHRpb25zID0geyBuYW1lOiAnZGVmYXVsdCcgfSxcbiAgICAgICAgICAgICAgICAgbmJKU1RoZW1lcz86IE5iSlNUaGVtZU9wdGlvbnNbXSxcbiAgICAgICAgICAgICAgICAgbmJNZWRpYUJyZWFrcG9pbnRzPzogTmJNZWRpYUJyZWFrcG9pbnRbXSxcbiAgICAgICAgICAgICAgICAgbGF5b3V0RGlyZWN0aW9uPzogTmJMYXlvdXREaXJlY3Rpb24pOiBNb2R1bGVXaXRoUHJvdmlkZXJzPE5iVGhlbWVNb2R1bGU+IHtcblxuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogTmJUaGVtZU1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7IHByb3ZpZGU6IE5CX1RIRU1FX09QVElPTlMsIHVzZVZhbHVlOiBuYlRoZW1lT3B0aW9ucyB8fCB7fSB9LFxuICAgICAgICB7IHByb3ZpZGU6IE5CX0JVSUxUX0lOX0pTX1RIRU1FUywgdXNlVmFsdWU6IEJVSUxUX0lOX1RIRU1FUyB9LFxuICAgICAgICB7IHByb3ZpZGU6IE5CX0pTX1RIRU1FUywgdXNlVmFsdWU6IG5iSlNUaGVtZXMgfHwgW10gfSxcbiAgICAgICAgeyBwcm92aWRlOiBOQl9NRURJQV9CUkVBS1BPSU5UUywgdXNlVmFsdWU6IG5iTWVkaWFCcmVha3BvaW50cyB8fCBERUZBVUxUX01FRElBX0JSRUFLUE9JTlRTIH0sXG4gICAgICAgIHsgcHJvdmlkZTogTkJfRE9DVU1FTlQsIHVzZUV4aXN0aW5nOiBET0NVTUVOVCB9LFxuICAgICAgICB7IHByb3ZpZGU6IE5CX1dJTkRPVywgdXNlRmFjdG9yeTogd2luZG93RmFjdG9yeSwgZGVwczogWyBQTEFURk9STV9JRCBdIH0sXG4gICAgICAgIE5iSlNUaGVtZXNSZWdpc3RyeSxcbiAgICAgICAgTmJUaGVtZVNlcnZpY2UsXG4gICAgICAgIE5iTWVkaWFCcmVha3BvaW50c1NlcnZpY2UsXG4gICAgICAgIE5iU3Bpbm5lclNlcnZpY2UsXG4gICAgICAgIHsgcHJvdmlkZTogTkJfTEFZT1VUX0RJUkVDVElPTiwgdXNlVmFsdWU6IGxheW91dERpcmVjdGlvbiB8fCBOYkxheW91dERpcmVjdGlvbi5MVFIgfSxcbiAgICAgICAgTmJMYXlvdXREaXJlY3Rpb25TZXJ2aWNlLFxuICAgICAgICBOYkxheW91dFNjcm9sbFNlcnZpY2UsXG4gICAgICAgIE5iTGF5b3V0UnVsZXJTZXJ2aWNlLFxuICAgICAgICAuLi5OYk92ZXJsYXlNb2R1bGUuZm9yUm9vdCgpLnByb3ZpZGVycyxcbiAgICAgICAgTmJTdGF0dXNTZXJ2aWNlLFxuICAgICAgXSxcbiAgICB9O1xuICB9XG59XG4iXX0=