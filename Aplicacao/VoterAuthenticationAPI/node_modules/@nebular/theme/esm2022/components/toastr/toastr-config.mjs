/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { InjectionToken } from '@angular/core';
import { NbGlobalLogicalPosition } from '../cdk/overlay/position-helper';
export const NB_TOASTR_CONFIG = new InjectionToken('Default toastr options');
/**
 * The `NbToastrConfig` class describes configuration of the `NbToastrService.show` and global toastr configuration.
 * */
export class NbToastrConfig {
    constructor(config) {
        /**
         * Determines where on the screen toast have to be rendered.
         * */
        this.position = NbGlobalLogicalPosition.TOP_END;
        /**
         * Status chooses color scheme for the toast.
         * */
        this.status = 'basic';
        /**
         * Duration is timeout between toast appears and disappears.
         * */
        this.duration = 3000;
        /**
         * Destroy by click means you can hide the toast by clicking it.
         * */
        this.destroyByClick = true;
        /**
         * If preventDuplicates is true then the toast with the same title, message and status will not be rendered.
         * Find duplicates behaviour determined by `preventDuplicates`.
         * The default `previous` duplicate behaviour is used.
         * */
        this.preventDuplicates = false;
        /**
         * Determines the how to treat duplicates.
         * */
        this.duplicatesBehaviour = 'previous';
        /*
        * The number of visible toasts. If the limit exceeded the oldest toast will be removed.
        * */
        this.limit = null;
        /**
         * Class to be applied to the toast.
         */
        this.toastClass = '';
        /**
         * Determines render icon or not.
         * */
        this.hasIcon = true;
        /**
         * Icon name or icon config object that can be provided to render custom icon.
         * */
        this.icon = 'email';
        /**
         * Toast status icon-class mapping.
         * */
        this.icons = {
            danger: 'flash-outline',
            success: 'checkmark-outline',
            info: 'question-mark-outline',
            warning: 'alert-triangle-outline',
            primary: 'email-outline',
            control: 'email-outline',
            basic: 'email-outline',
        };
        this.patchIcon(config);
        Object.assign(this, config);
    }
    patchIcon(config) {
        if (!('icon' in config)) {
            config.icon = {
                icon: this.icons[config.status] || this.icons.basic,
                pack: 'nebular-essentials',
            };
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3RyLWNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9mcmFtZXdvcmsvdGhlbWUvY29tcG9uZW50cy90b2FzdHIvdG9hc3RyLWNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUvQyxPQUFPLEVBQUUsdUJBQXVCLEVBQW9CLE1BQU0sZ0NBQWdDLENBQUM7QUFRM0YsTUFBTSxDQUFDLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxjQUFjLENBQWlCLHdCQUF3QixDQUFDLENBQUM7QUFJN0Y7O0tBRUs7QUFDTCxNQUFNLE9BQU8sY0FBYztJQXdEekIsWUFBWSxNQUErQjtRQXZEM0M7O2FBRUs7UUFDTCxhQUFRLEdBQXFCLHVCQUF1QixDQUFDLE9BQU8sQ0FBQztRQUM3RDs7YUFFSztRQUNMLFdBQU0sR0FBOEIsT0FBTyxDQUFDO1FBQzVDOzthQUVLO1FBQ0wsYUFBUSxHQUFXLElBQUksQ0FBQztRQUN4Qjs7YUFFSztRQUNMLG1CQUFjLEdBQVksSUFBSSxDQUFDO1FBQy9COzs7O2FBSUs7UUFDTCxzQkFBaUIsR0FBWSxLQUFLLENBQUM7UUFDbkM7O2FBRUs7UUFDTCx3QkFBbUIsR0FBOEIsVUFBVSxDQUFDO1FBQzVEOztZQUVJO1FBQ0osVUFBSyxHQUFZLElBQUksQ0FBQztRQUN0Qjs7V0FFRztRQUNILGVBQVUsR0FBVyxFQUFFLENBQUM7UUFDeEI7O2FBRUs7UUFDTCxZQUFPLEdBQVksSUFBSSxDQUFDO1FBQ3hCOzthQUVLO1FBQ0wsU0FBSSxHQUEwQixPQUFPLENBQUM7UUFDdEM7O2FBRUs7UUFDSyxVQUFLLEdBQW1CO1lBQ2hDLE1BQU0sRUFBRSxlQUFlO1lBQ3ZCLE9BQU8sRUFBRSxtQkFBbUI7WUFDNUIsSUFBSSxFQUFFLHVCQUF1QjtZQUM3QixPQUFPLEVBQUUsd0JBQXdCO1lBQ2pDLE9BQU8sRUFBRSxlQUFlO1lBQ3hCLE9BQU8sRUFBRSxlQUFlO1lBQ3hCLEtBQUssRUFBRSxlQUFlO1NBQ3ZCLENBQUM7UUFHQSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZCLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFUyxTQUFTLENBQUMsTUFBK0I7UUFDakQsSUFBSSxDQUFDLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxFQUFFLENBQUM7WUFDeEIsTUFBTSxDQUFDLElBQUksR0FBRztnQkFDWixJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLO2dCQUNuRCxJQUFJLEVBQUUsb0JBQW9CO2FBQzNCLENBQUM7UUFDSixDQUFDO0lBQ0gsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEFrdmVvLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqL1xuXG5pbXBvcnQgeyBJbmplY3Rpb25Ub2tlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOYkdsb2JhbExvZ2ljYWxQb3NpdGlvbiwgTmJHbG9iYWxQb3NpdGlvbiB9IGZyb20gJy4uL2Nkay9vdmVybGF5L3Bvc2l0aW9uLWhlbHBlcic7XG5pbXBvcnQgeyBOYkNvbXBvbmVudE9yQ3VzdG9tU3RhdHVzLCBOYkNvbXBvbmVudFN0YXR1cyB9IGZyb20gJy4uL2NvbXBvbmVudC1zdGF0dXMnO1xuaW1wb3J0IHsgTmJJY29uQ29uZmlnIH0gZnJvbSAnLi4vaWNvbi9pY29uLmNvbXBvbmVudCc7XG5cbnR5cGUgSWNvblRvQ2xhc3NNYXAgPSB7XG4gIFtzdGF0dXMgaW4gTmJDb21wb25lbnRTdGF0dXNdOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjb25zdCBOQl9UT0FTVFJfQ09ORklHID0gbmV3IEluamVjdGlvblRva2VuPE5iVG9hc3RyQ29uZmlnPignRGVmYXVsdCB0b2FzdHIgb3B0aW9ucycpO1xuXG5leHBvcnQgdHlwZSBOYkR1cGxpY2F0ZVRvYXN0QmVoYXZpb3VyID0gJ3ByZXZpb3VzJyB8ICdhbGwnO1xuXG4vKipcbiAqIFRoZSBgTmJUb2FzdHJDb25maWdgIGNsYXNzIGRlc2NyaWJlcyBjb25maWd1cmF0aW9uIG9mIHRoZSBgTmJUb2FzdHJTZXJ2aWNlLnNob3dgIGFuZCBnbG9iYWwgdG9hc3RyIGNvbmZpZ3VyYXRpb24uXG4gKiAqL1xuZXhwb3J0IGNsYXNzIE5iVG9hc3RyQ29uZmlnIHtcbiAgLyoqXG4gICAqIERldGVybWluZXMgd2hlcmUgb24gdGhlIHNjcmVlbiB0b2FzdCBoYXZlIHRvIGJlIHJlbmRlcmVkLlxuICAgKiAqL1xuICBwb3NpdGlvbjogTmJHbG9iYWxQb3NpdGlvbiA9IE5iR2xvYmFsTG9naWNhbFBvc2l0aW9uLlRPUF9FTkQ7XG4gIC8qKlxuICAgKiBTdGF0dXMgY2hvb3NlcyBjb2xvciBzY2hlbWUgZm9yIHRoZSB0b2FzdC5cbiAgICogKi9cbiAgc3RhdHVzOiBOYkNvbXBvbmVudE9yQ3VzdG9tU3RhdHVzID0gJ2Jhc2ljJztcbiAgLyoqXG4gICAqIER1cmF0aW9uIGlzIHRpbWVvdXQgYmV0d2VlbiB0b2FzdCBhcHBlYXJzIGFuZCBkaXNhcHBlYXJzLlxuICAgKiAqL1xuICBkdXJhdGlvbjogbnVtYmVyID0gMzAwMDtcbiAgLyoqXG4gICAqIERlc3Ryb3kgYnkgY2xpY2sgbWVhbnMgeW91IGNhbiBoaWRlIHRoZSB0b2FzdCBieSBjbGlja2luZyBpdC5cbiAgICogKi9cbiAgZGVzdHJveUJ5Q2xpY2s6IGJvb2xlYW4gPSB0cnVlO1xuICAvKipcbiAgICogSWYgcHJldmVudER1cGxpY2F0ZXMgaXMgdHJ1ZSB0aGVuIHRoZSB0b2FzdCB3aXRoIHRoZSBzYW1lIHRpdGxlLCBtZXNzYWdlIGFuZCBzdGF0dXMgd2lsbCBub3QgYmUgcmVuZGVyZWQuXG4gICAqIEZpbmQgZHVwbGljYXRlcyBiZWhhdmlvdXIgZGV0ZXJtaW5lZCBieSBgcHJldmVudER1cGxpY2F0ZXNgLlxuICAgKiBUaGUgZGVmYXVsdCBgcHJldmlvdXNgIGR1cGxpY2F0ZSBiZWhhdmlvdXIgaXMgdXNlZC5cbiAgICogKi9cbiAgcHJldmVudER1cGxpY2F0ZXM6IGJvb2xlYW4gPSBmYWxzZTtcbiAgLyoqXG4gICAqIERldGVybWluZXMgdGhlIGhvdyB0byB0cmVhdCBkdXBsaWNhdGVzLlxuICAgKiAqL1xuICBkdXBsaWNhdGVzQmVoYXZpb3VyOiBOYkR1cGxpY2F0ZVRvYXN0QmVoYXZpb3VyID0gJ3ByZXZpb3VzJztcbiAgLypcbiAgKiBUaGUgbnVtYmVyIG9mIHZpc2libGUgdG9hc3RzLiBJZiB0aGUgbGltaXQgZXhjZWVkZWQgdGhlIG9sZGVzdCB0b2FzdCB3aWxsIGJlIHJlbW92ZWQuXG4gICogKi9cbiAgbGltaXQ/OiBudW1iZXIgPSBudWxsO1xuICAvKipcbiAgICogQ2xhc3MgdG8gYmUgYXBwbGllZCB0byB0aGUgdG9hc3QuXG4gICAqL1xuICB0b2FzdENsYXNzOiBzdHJpbmcgPSAnJztcbiAgLyoqXG4gICAqIERldGVybWluZXMgcmVuZGVyIGljb24gb3Igbm90LlxuICAgKiAqL1xuICBoYXNJY29uOiBib29sZWFuID0gdHJ1ZTtcbiAgLyoqXG4gICAqIEljb24gbmFtZSBvciBpY29uIGNvbmZpZyBvYmplY3QgdGhhdCBjYW4gYmUgcHJvdmlkZWQgdG8gcmVuZGVyIGN1c3RvbSBpY29uLlxuICAgKiAqL1xuICBpY29uOiBzdHJpbmcgfCBOYkljb25Db25maWcgPSAnZW1haWwnO1xuICAvKipcbiAgICogVG9hc3Qgc3RhdHVzIGljb24tY2xhc3MgbWFwcGluZy5cbiAgICogKi9cbiAgcHJvdGVjdGVkIGljb25zOiBJY29uVG9DbGFzc01hcCA9IHtcbiAgICBkYW5nZXI6ICdmbGFzaC1vdXRsaW5lJyxcbiAgICBzdWNjZXNzOiAnY2hlY2ttYXJrLW91dGxpbmUnLFxuICAgIGluZm86ICdxdWVzdGlvbi1tYXJrLW91dGxpbmUnLFxuICAgIHdhcm5pbmc6ICdhbGVydC10cmlhbmdsZS1vdXRsaW5lJyxcbiAgICBwcmltYXJ5OiAnZW1haWwtb3V0bGluZScsXG4gICAgY29udHJvbDogJ2VtYWlsLW91dGxpbmUnLFxuICAgIGJhc2ljOiAnZW1haWwtb3V0bGluZScsXG4gIH07XG5cbiAgY29uc3RydWN0b3IoY29uZmlnOiBQYXJ0aWFsPE5iVG9hc3RyQ29uZmlnPikge1xuICAgIHRoaXMucGF0Y2hJY29uKGNvbmZpZyk7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBjb25maWcpO1xuICB9XG5cbiAgcHJvdGVjdGVkIHBhdGNoSWNvbihjb25maWc6IFBhcnRpYWw8TmJUb2FzdHJDb25maWc+KSB7XG4gICAgaWYgKCEoJ2ljb24nIGluIGNvbmZpZykpIHtcbiAgICAgIGNvbmZpZy5pY29uID0ge1xuICAgICAgICBpY29uOiB0aGlzLmljb25zW2NvbmZpZy5zdGF0dXNdIHx8IHRoaXMuaWNvbnMuYmFzaWMsXG4gICAgICAgIHBhY2s6ICduZWJ1bGFyLWVzc2VudGlhbHMnLFxuICAgICAgfTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==