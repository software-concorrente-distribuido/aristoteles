/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, Input, HostBinding } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../../services/status.service";
/**
 * Component intended to be used within the `<nb-card>` component.
 * It adds styles for a preset header section.
 *
 * @styles
 *
 * card-header-text-color:
 * card-header-text-font-family:
 * card-header-text-font-size:
 * card-header-text-font-weight:
 * card-header-text-line-height:
 * card-header-basic-background-color:
 * card-header-basic-text-color:
 * card-header-primary-background-color:
 * card-header-primary-text-color:
 * card-header-info-background-color:
 * card-header-info-text-color:
 * card-header-success-background-color:
 * card-header-success-text-color:
 * card-header-warning-background-color:
 * card-header-warning-text-color:
 * card-header-danger-background-color:
 * card-header-danger-text-color:
 * card-header-control-background-color:
 * card-header-control-text-color:
 */
export class NbCardHeaderComponent {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbCardHeaderComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.1.0", type: NbCardHeaderComponent, selector: "nb-card-header", ngImport: i0, template: `<ng-content></ng-content>`, isInline: true }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbCardHeaderComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nb-card-header',
                    template: `<ng-content></ng-content>`,
                }]
        }] });
/**
 * Component intended to be used within  the `<nb-card>` component.
 * Adds styles for a preset body section.
 */
export class NbCardBodyComponent {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbCardBodyComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.1.0", type: NbCardBodyComponent, selector: "nb-card-body", ngImport: i0, template: `<ng-content></ng-content>`, isInline: true }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbCardBodyComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nb-card-body',
                    template: `<ng-content></ng-content>`,
                }]
        }] });
/**
 * Component intended to be used within  the `<nb-card>` component.
 * Adds styles for a preset footer section.
 */
export class NbCardFooterComponent {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbCardFooterComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.1.0", type: NbCardFooterComponent, selector: "nb-card-footer", ngImport: i0, template: `<ng-content></ng-content>`, isInline: true }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbCardFooterComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nb-card-footer',
                    template: `<ng-content></ng-content>`,
                }]
        }] });
/**
 * Basic content container component.
 *
 * Basic card example:
 * @stacked-example(Showcase, card/card-showcase.component)
 *
 * Basic card configuration:
 *
 * ```html
 * <nb-card>
 *   <nb-card-body>
 *     Card
 *   </nb-card-body>
 * </nb-card>
 * ```
 *
 * ### Installation
 *
 * Import `NbCardModule` to your feature module.
 * ```ts
 * @NgModule({
 *   imports: [
 *     // ...
 *     NbCardModule,
 *   ],
 * })
 * export class PageModule { }
 * ```
 * ### Usage
 *
 * Card with header and footer:
 * @stacked-example(With Header & Footer, card/card-full.component)
 *
 * Most of the time main card content goes to `nb-card-body`,
 * so it is styled and aligned in accordance with the header and footer.
 * In case you need a higher level of control, you can pass contend directly to `nb-card`,
 * so `nb-card-body` styling will not be applied.
 *
 * Consider an example with `nb-list` component:
 * @stacked-example(Card with list, card/card-without-body.component)
 *
 * Colored cards could be simply configured by providing a `status` property:
 * @stacked-example(Colored Card, card/card-colors.component)
 *
 * It is also possible to assign an `accent` property for a slight card highlight
 * as well as combine it with `status`:
 * @stacked-example(Accent Card, card/card-accents.component)
 *
 * Cards of smaller sizes could be combined and put on the same row with a bigger card so they have the same heights.
 * @stacked-example(Card sizes combinations, card/card-sizes-combinations.component)
 *
 * @additional-example(Multiple Sizes, card/card-sizes.component)
 *
 * @styles
 *
 * card-background-color:
 * card-text-color:
 * card-text-font-family:
 * card-text-font-size:
 * card-text-font-weight:
 * card-text-line-height:
 * card-border-width:
 * card-border-style:
 * card-border-color:
 * card-border-radius:
 * card-padding:
 * card-shadow:
 * card-divider-color:
 * card-divider-style:
 * card-divider-width:
 * card-height-tiny:
 * card-height-small:
 * card-height-medium:
 * card-height-large:
 * card-height-giant:
 * card-margin-bottom:
 * card-scrollbar-color:
 * card-scrollbar-background-color:
 * card-scrollbar-width:
 */
export class NbCardComponent {
    /**
     * Card size, available sizes:
     * tiny, small, medium, large, giant
     */
    get size() {
        return this._size;
    }
    set size(value) {
        this._size = value;
    }
    get tiny() {
        return this.size === 'tiny';
    }
    get small() {
        return this.size === 'small';
    }
    get medium() {
        return this.size === 'medium';
    }
    get large() {
        return this.size === 'large';
    }
    get giant() {
        return this.size === 'giant';
    }
    get primary() {
        return this.status === 'primary';
    }
    get info() {
        return this.status === 'info';
    }
    get success() {
        return this.status === 'success';
    }
    get warning() {
        return this.status === 'warning';
    }
    get danger() {
        return this.status === 'danger';
    }
    get basic() {
        return this.status === 'basic';
    }
    get control() {
        return this.status === 'control';
    }
    get hasAccent() {
        return this.accent;
    }
    get primaryAccent() {
        return this.accent === 'primary';
    }
    get infoAccent() {
        return this.accent === 'info';
    }
    get successAccent() {
        return this.accent === 'success';
    }
    get warningAccent() {
        return this.accent === 'warning';
    }
    get dangerAccent() {
        return this.accent === 'danger';
    }
    get basicAccent() {
        return this.accent === 'basic';
    }
    get controlAccent() {
        return this.accent === 'control';
    }
    get additionalClasses() {
        if (this.statusService.isCustomStatus(this.status)) {
            return [this.statusService.getStatusClass(this.status)];
        }
        return [];
    }
    constructor(statusService) {
        this.statusService = statusService;
        this._size = '';
        /**
         * Card status:
         * `basic`, `primary`, `info`, `success`, `warning`, `danger`, `control`
         */
        this.status = '';
        /**
         * Card accent (color of the top border):
         * `basic`, `primary`, `info`, `success`, `warning`, `danger`, `control`
         */
        this.accent = '';
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbCardComponent, deps: [{ token: i1.NbStatusService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.1.0", type: NbCardComponent, selector: "nb-card", inputs: { size: "size", status: "status", accent: "accent" }, host: { properties: { "class.size-tiny": "this.tiny", "class.size-small": "this.small", "class.size-medium": "this.medium", "class.size-large": "this.large", "class.size-giant": "this.giant", "class.status-primary": "this.primary", "class.status-info": "this.info", "class.status-success": "this.success", "class.status-warning": "this.warning", "class.status-danger": "this.danger", "class.status-basic": "this.basic", "class.status-control": "this.control", "class.accent": "this.hasAccent", "class.accent-primary": "this.primaryAccent", "class.accent-info": "this.infoAccent", "class.accent-success": "this.successAccent", "class.accent-warning": "this.warningAccent", "class.accent-danger": "this.dangerAccent", "class.accent-basic": "this.basicAccent", "class.accent-control": "this.controlAccent", "class": "this.additionalClasses" } }, ngImport: i0, template: `
    <ng-content select="nb-card-header"></ng-content>
    <ng-content select="nb-card-body"></ng-content>
    <ng-content></ng-content>
    <ng-content select="nb-card-footer"></ng-content>
  `, isInline: true, styles: ["/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */:host{display:flex;flex-direction:column}\n"] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbCardComponent, decorators: [{
            type: Component,
            args: [{ selector: 'nb-card', template: `
    <ng-content select="nb-card-header"></ng-content>
    <ng-content select="nb-card-body"></ng-content>
    <ng-content></ng-content>
    <ng-content select="nb-card-footer"></ng-content>
  `, styles: ["/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */:host{display:flex;flex-direction:column}\n"] }]
        }], ctorParameters: () => [{ type: i1.NbStatusService }], propDecorators: { size: [{
                type: Input
            }], status: [{
                type: Input
            }], accent: [{
                type: Input
            }], tiny: [{
                type: HostBinding,
                args: ['class.size-tiny']
            }], small: [{
                type: HostBinding,
                args: ['class.size-small']
            }], medium: [{
                type: HostBinding,
                args: ['class.size-medium']
            }], large: [{
                type: HostBinding,
                args: ['class.size-large']
            }], giant: [{
                type: HostBinding,
                args: ['class.size-giant']
            }], primary: [{
                type: HostBinding,
                args: ['class.status-primary']
            }], info: [{
                type: HostBinding,
                args: ['class.status-info']
            }], success: [{
                type: HostBinding,
                args: ['class.status-success']
            }], warning: [{
                type: HostBinding,
                args: ['class.status-warning']
            }], danger: [{
                type: HostBinding,
                args: ['class.status-danger']
            }], basic: [{
                type: HostBinding,
                args: ['class.status-basic']
            }], control: [{
                type: HostBinding,
                args: ['class.status-control']
            }], hasAccent: [{
                type: HostBinding,
                args: ['class.accent']
            }], primaryAccent: [{
                type: HostBinding,
                args: ['class.accent-primary']
            }], infoAccent: [{
                type: HostBinding,
                args: ['class.accent-info']
            }], successAccent: [{
                type: HostBinding,
                args: ['class.accent-success']
            }], warningAccent: [{
                type: HostBinding,
                args: ['class.accent-warning']
            }], dangerAccent: [{
                type: HostBinding,
                args: ['class.accent-danger']
            }], basicAccent: [{
                type: HostBinding,
                args: ['class.accent-basic']
            }], controlAccent: [{
                type: HostBinding,
                args: ['class.accent-control']
            }], additionalClasses: [{
                type: HostBinding,
                args: ['class']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvZnJhbWV3b3JrL3RoZW1lL2NvbXBvbmVudHMvY2FyZC9jYXJkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7QUFNOUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F5Qkc7QUFLSCxNQUFNLE9BQU8scUJBQXFCOzhHQUFyQixxQkFBcUI7a0dBQXJCLHFCQUFxQixzREFGdEIsMkJBQTJCOzsyRkFFMUIscUJBQXFCO2tCQUpqQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxnQkFBZ0I7b0JBQzFCLFFBQVEsRUFBRSwyQkFBMkI7aUJBQ3RDOztBQUlEOzs7R0FHRztBQUtILE1BQU0sT0FBTyxtQkFBbUI7OEdBQW5CLG1CQUFtQjtrR0FBbkIsbUJBQW1CLG9EQUZwQiwyQkFBMkI7OzJGQUUxQixtQkFBbUI7a0JBSi9CLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGNBQWM7b0JBQ3hCLFFBQVEsRUFBRSwyQkFBMkI7aUJBQ3RDOztBQUlEOzs7R0FHRztBQUtILE1BQU0sT0FBTyxxQkFBcUI7OEdBQXJCLHFCQUFxQjtrR0FBckIscUJBQXFCLHNEQUZ0QiwyQkFBMkI7OzJGQUUxQixxQkFBcUI7a0JBSmpDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjtvQkFDMUIsUUFBUSxFQUFFLDJCQUEyQjtpQkFDdEM7O0FBSUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0ErRUc7QUFXSCxNQUFNLE9BQU8sZUFBZTtJQUUxQjs7O09BR0c7SUFDSCxJQUNJLElBQUk7UUFDTixPQUFPLElB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Y2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgQWt2ZW8uIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICovXG5cbmltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIEhvc3RCaW5kaW5nIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE5iU3RhdHVzU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3N0YXR1cy5zZXJ2aWNlJztcbmltcG9ydCB7IE5iQ29tcG9uZW50U2l6ZSB9IGZyb20gJy4uL2NvbXBvbmVudC1zaXplJztcbmltcG9ydCB7IE5iQ29tcG9uZW50T3JDdXN0b21TdGF0dXMsIE5iQ29tcG9uZW50U3RhdHVzIH0gZnJvbSAnLi4vY29tcG9uZW50LXN0YXR1cyc7XG5cbi8qKlxuICogQ29tcG9uZW50IGludGVuZGVkIHRvIGJlIHVzZWQgd2l0aGluIHRoZSBgPG5iLWNhcmQ+YCBjb21wb25lbnQuXG4gKiBJdCBhZGRzIHN0eWxlcyBmb3IgYSBwcmVzZXQgaGVhZGVyIHNlY3Rpb24uXG4gKlxuICogQHN0eWxlc1xuICpcbiAqIGNhcmQtaGVhZGVyLXRleHQtY29sb3I6XG4gKiBjYXJkLWhlYWRlci10ZXh0LWZvbnQtZmFtaWx5OlxuICogY2FyZC1oZWFkZXItdGV4dC1mb250LXNpemU6XG4gKiBjYXJkLWhlYWRlci10ZXh0LWZvbnQtd2VpZ2h0OlxuICogY2FyZC1oZWFkZXItdGV4dC1saW5lLWhlaWdodDpcbiAqIGNhcmQtaGVhZGVyLWJhc2ljLWJhY2tncm91bmQtY29sb3I6XG4gKiBjYXJkLWhlYWRlci1iYXNpYy10ZXh0LWNvbG9yOlxuICogY2FyZC1oZWFkZXItcHJpbWFyeS1iYWNrZ3JvdW5kLWNvbG9yOlxuICogY2FyZC1oZWFkZXItcHJpbWFyeS10ZXh0LWNvbG9yOlxuICogY2FyZC1oZWFkZXItaW5mby1iYWNrZ3JvdW5kLWNvbG9yOlxuICogY2FyZC1oZWFkZXItaW5mby10ZXh0LWNvbG9yOlxuICogY2FyZC1oZWFkZXItc3VjY2Vzcy1iYWNrZ3JvdW5kLWNvbG9yOlxuICogY2FyZC1oZWFkZXItc3VjY2Vzcy10ZXh0LWNvbG9yOlxuICogY2FyZC1oZWFkZXItd2FybmluZy1iYWNrZ3JvdW5kLWNvbG9yOlxuICogY2FyZC1oZWFkZXItd2FybmluZy10ZXh0LWNvbG9yOlxuICogY2FyZC1oZWFkZXItZGFuZ2VyLWJhY2tncm91bmQtY29sb3I6XG4gKiBjYXJkLWhlYWRlci1kYW5nZXItdGV4dC1jb2xvcjpcbiAqIGNhcmQtaGVhZGVyLWNvbnRyb2wtYmFja2dyb3VuZC1jb2xvcjpcbiAqIGNhcmQtaGVhZGVyLWNvbnRyb2wtdGV4dC1jb2xvcjpcbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmItY2FyZC1oZWFkZXInLFxuICB0ZW1wbGF0ZTogYDxuZy1jb250ZW50PjwvbmctY29udGVudD5gLFxufSlcbmV4cG9ydCBjbGFzcyBOYkNhcmRIZWFkZXJDb21wb25lbnQge1xufVxuXG4vKipcbiAqIENvbXBvbmVudCBpbnRlbmRlZCB0byBiZSB1c2VkIHdpdGhpbiAgdGhlIGA8bmItY2FyZD5gIGNvbXBvbmVudC5cbiAqIEFkZHMgc3R5bGVzIGZvciBhIHByZXNldCBib2R5IHNlY3Rpb24uXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25iLWNhcmQtYm9keScsXG4gIHRlbXBsYXRlOiBgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PmAsXG59KVxuZXhwb3J0IGNsYXNzIE5iQ2FyZEJvZHlDb21wb25lbnQge1xufVxuXG4vKipcbiAqIENvbXBvbmVudCBpbnRlbmRlZCB0byBiZSB1c2VkIHdpdGhpbiAgdGhlIGA8bmItY2FyZD5gIGNvbXBvbmVudC5cbiAqIEFkZHMgc3R5bGVzIGZvciBhIHByZXNldCBmb290ZXIgc2VjdGlvbi5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmItY2FyZC1mb290ZXInLFxuICB0ZW1wbGF0ZTogYDxuZy1jb250ZW50PjwvbmctY29udGVudD5gLFxufSlcbmV4cG9ydCBjbGFzcyBOYkNhcmRGb290ZXJDb21wb25lbnQge1xufVxuXG4vKipcbiAqIEJhc2ljIGNvbnRlbnQgY29udGFpbmVyIGNvbXBvbmVudC5cbiAqXG4gKiBCYXNpYyBjYXJkIGV4YW1wbGU6XG4gKiBAc3RhY2tlZC1leGFtcGxlKFNob3djYXNlLCBjYXJkL2NhcmQtc2hvd2Nhc2UuY29tcG9uZW50KVxuICpcbiAqIEJhc2ljIGNhcmQgY29uZmlndXJhdGlvbjpcbiAqXG4gKiBgYGBodG1sXG4gKiA8bmItY2FyZD5cbiAqICAgPG5iLWNhcmQtYm9keT5cbiAqICAgICBDYXJkXG4gKiAgIDwvbmItY2FyZC1ib2R5PlxuICogPC9uYi1jYXJkPlxuICogYGBgXG4gKlxuICogIyMjIEluc3RhbGxhdGlvblxuICpcbiAqIEltcG9ydCBgTmJDYXJkTW9kdWxlYCB0byB5b3VyIGZlYXR1cmUgbW9kdWxlLlxuICogYGBgdHNcbiAqIEBOZ01vZHVsZSh7XG4gKiAgIGltcG9ydHM6IFtcbiAqICAgICAvLyAuLi5cbiAqICAgICBOYkNhcmRNb2R1bGUsXG4gKiAgIF0sXG4gKiB9KVxuICogZXhwb3J0IGNsYXNzIFBhZ2VNb2R1bGUgeyB9XG4gKiBgYGBcbiAqICMjIyBVc2FnZVxuICpcbiAqIENhcmQgd2l0aCBoZWFkZXIgYW5kIGZvb3RlcjpcbiAqIEBzdGFja2VkLWV4YW1wbGUoV2l0aCBIZWFkZXIgJiBGb290ZXIsIGNhcmQvY2FyZC1mdWxsLmNvbXBvbmVudClcbiAqXG4gKiBNb3N0IG9mIHRoZSB0aW1lIG1haW4gY2FyZCBjb250ZW50IGdvZXMgdG8gYG5iLWNhcmQtYm9keWAsXG4gKiBzbyBpdCBpcyBzdHlsZWQgYW5kIGFsaWduZWQgaW4gYWNjb3JkYW5jZSB3aXRoIHRoZSBoZWFkZXIgYW5kIGZvb3Rlci5cbiAqIEluIGNhc2UgeW91IG5lZWQgYSBoaWdoZXIgbGV2ZWwgb2YgY29udHJvbCwgeW91IGNhbiBwYXNzIGNvbnRlbmQgZGlyZWN0bHkgdG8gYG5iLWNhcmRgLFxuICogc28gYG5iLWNhcmQtYm9keWAgc3R5bGluZyB3aWxsIG5vdCBiZSBhcHBsaWVkLlxuICpcbiAqIENvbnNpZGVyIGFuIGV4YW1wbGUgd2l0aCBgbmItbGlzdGAgY29tcG9uZW50OlxuICogQHN0YWNrZWQtZXhhbXBsZShDYXJkIHdpdGggbGlzdCwgY2FyZC9jYXJkLXdpdGhvdXQtYm9keS5jb21wb25lbnQpXG4gKlxuICogQ29sb3JlZCBjYXJkcyBjb3VsZCBiZSBzaW1wbHkgY29uZmlndXJlZCBieSBwcm92aWRpbmcgYSBgc3RhdHVzYCBwcm9wZXJ0eTpcbiAqIEBzdGFja2VkLWV4YW1wbGUoQ29sb3JlZCBDYXJkLCBjYXJkL2NhcmQtY29sb3JzLmNvbXBvbmVudClcbiAqXG4gKiBJdCBpcyBhbHNvIHBvc3NpYmxlIHRvIGFzc2lnbiBhbiBgYWNjZW50YCBwcm9wZXJ0eSBmb3IgYSBzbGlnaHQgY2FyZCBoaWdobGlnaHRcbiAqIGFzIHdlbGwgYXMgY29tYmluZSBpdCB3aXRoIGBzdGF0dXNgOlxuICogQHN0YWNrZWQtZXhhbXBsZShBY2NlbnQgQ2FyZCwgY2FyZC9jYXJkLWFjY2VudHMuY29tcG9uZW50KVxuICpcbiAqIENhcmRzIG9mIHNtYWxsZXIgc2l6ZXMgY291bGQgYmUgY29tYmluZWQgYW5kIHB1dCBvbiB0aGUgc2FtZSByb3cgd2l0aCBhIGJpZ2dlciBjYXJkIHNvIHRoZXkgaGF2ZSB0aGUgc2FtZSBoZWlnaHRzLlxuICogQHN0YWNrZWQtZXhhbXBsZShDYXJkIHNpemVzIGNvbWJpbmF0aW9ucywgY2FyZC9jYXJkLXNpemVzLWNvbWJpbmF0aW9ucy5jb21wb25lbnQpXG4gKlxuICogQGFkZGl0aW9uYWwtZXhhbXBsZShNdWx0aXBsZSBTaXplcywgY2FyZC9jYXJkLXNpemVzLmNvbXBvbmVudClcbiAqXG4gKiBAc3R5bGVzXG4gKlxuICogY2FyZC1iYWNrZ3JvdW5kLWNvbG9yOlxuICogY2FyZC10ZXh0LWNvbG9yOlxuICogY2FyZC10ZXh0LWZvbnQtZmFtaWx5OlxuICogY2FyZC10ZXh0LWZvbnQtc2l6ZTpcbiAqIGNhcmQtdGV4dC1mb250LXdlaWdodDpcbiAqIGNhcmQtdGV4dC1saW5lLWhlaWdodDpcbiAqIGNhcmQtYm9yZGVyLXdpZHRoOlxuICogY2FyZC1ib3JkZXItc3R5bGU6XG4gKiBjYXJkLWJvcmRlci1jb2xvcjpcbiAqIGNhcmQtYm9yZGVyLXJhZGl1czpcbiAqIGNhcmQtcGFkZGluZzpcbiAqIGNhcmQtc2hhZG93OlxuICogY2FyZC1kaXZpZGVyLWNvbG9yOlxuICogY2FyZC1kaXZpZGVyLXN0eWxlOlxuICogY2FyZC1kaXZpZGVyLXdpZHRoOlxuICogY2FyZC1oZWlnaHQtdGlueTpcbiAqIGNhcmQtaGVpZ2h0LXNtYWxsOlxuICogY2FyZC1oZWlnaHQtbWVkaXVtOlxuICogY2FyZC1oZWlnaHQtbGFyZ2U6XG4gKiBjYXJkLWhlaWdodC1naWFudDpcbiAqIGNhcmQtbWFyZ2luLWJvdHRvbTpcbiAqIGNhcmQtc2Nyb2xsYmFyLWNvbG9yOlxuICogY2FyZC1zY3JvbGxiYXItYmFja2dyb3VuZC1jb2xvcjpcbiAqIGNhcmQtc2Nyb2xsYmFyLXdpZHRoOlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduYi1jYXJkJyxcbiAgc3R5bGVVcmxzOiBbJy4vY2FyZC5jb21wb25lbnQuc2NzcyddLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIm5iLWNhcmQtaGVhZGVyXCI+PC9uZy1jb250ZW50PlxuICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIm5iLWNhcmQtYm9keVwiPjwvbmctY29udGVudD5cbiAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwibmItY2FyZC1mb290ZXJcIj48L25nLWNvbnRlbnQ+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIE5iQ2FyZENvbXBvbmVudCB7XG5cbiAgLyoqXG4gICAqIENhcmQgc2l6ZSwgYXZhaWxhYmxlIHNpemVzOlxuICAgKiB0aW55LCBzbWFsbCwgbWVkaXVtLCBsYXJnZSwgZ2lhbnRcbiAgICovXG4gIEBJbnB1dCgpXG4gIGdldCBzaXplKCk6ICcnIHwgTmJDb21wb25lbnRTaXplIHtcbiAgICByZXR1cm4gdGhpcy5fc2l6ZTtcbiAgfVxuICBzZXQgc2l6ZSh2YWx1ZTogJycgfCBOYkNvbXBvbmVudFNpemUpIHtcbiAgICB0aGlzLl9zaXplID0gdmFsdWU7XG4gIH1cbiAgX3NpemU6ICcnIHwgTmJDb21wb25lbnRTaXplID0gJyc7XG5cbiAgLyoqXG4gICAqIENhcmQgc3RhdHVzOlxuICAgKiBgYmFzaWNgLCBgcHJpbWFyeWAsIGBpbmZvYCwgYHN1Y2Nlc3NgLCBgd2FybmluZ2AsIGBkYW5nZXJgLCBgY29udHJvbGBcbiAgICovXG4gIEBJbnB1dCgpXG4gIHN0YXR1czogJycgfCBOYkNvbXBvbmVudE9yQ3VzdG9tU3RhdHVzID0gJyc7XG5cbiAgLyoqXG4gICAqIENhcmQgYWNjZW50IChjb2xvciBvZiB0aGUgdG9wIGJvcmRlcik6XG4gICAqIGBiYXNpY2AsIGBwcmltYXJ5YCwgYGluZm9gLCBgc3VjY2Vzc2AsIGB3YXJuaW5nYCwgYGRhbmdlcmAsIGBjb250cm9sYFxuICAgKi9cbiAgQElucHV0KClcbiAgYWNjZW50OiAnJyB8IE5iQ29tcG9uZW50U3RhdHVzID0gJyc7XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5zaXplLXRpbnknKVxuICBnZXQgdGlueSgpIHtcbiAgICByZXR1cm4gdGhpcy5zaXplID09PSAndGlueSc7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnNpemUtc21hbGwnKVxuICBnZXQgc21hbGwoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2l6ZSA9PT0gJ3NtYWxsJztcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3Muc2l6ZS1tZWRpdW0nKVxuICBnZXQgbWVkaXVtKCkge1xuICAgIHJldHVybiB0aGlzLnNpemUgPT09ICdtZWRpdW0nO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5zaXplLWxhcmdlJylcbiAgZ2V0IGxhcmdlKCkge1xuICAgIHJldHVybiB0aGlzLnNpemUgPT09ICdsYXJnZSc7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnNpemUtZ2lhbnQnKVxuICBnZXQgZ2lhbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2l6ZSA9PT0gJ2dpYW50JztcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3Muc3RhdHVzLXByaW1hcnknKVxuICBnZXQgcHJpbWFyeSgpIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0dXMgPT09ICdwcmltYXJ5JztcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3Muc3RhdHVzLWluZm8nKVxuICBnZXQgaW5mbygpIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0dXMgPT09ICdpbmZvJztcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3Muc3RhdHVzLXN1Y2Nlc3MnKVxuICBnZXQgc3VjY2VzcygpIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0dXMgPT09ICdzdWNjZXNzJztcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3Muc3RhdHVzLXdhcm5pbmcnKVxuICBnZXQgd2FybmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0dXMgPT09ICd3YXJuaW5nJztcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3Muc3RhdHVzLWRhbmdlcicpXG4gIGdldCBkYW5nZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdHVzID09PSAnZGFuZ2VyJztcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3Muc3RhdHVzLWJhc2ljJylcbiAgZ2V0IGJhc2ljKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXR1cyA9PT0gJ2Jhc2ljJztcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3Muc3RhdHVzLWNvbnRyb2wnKVxuICBnZXQgY29udHJvbCgpIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0dXMgPT09ICdjb250cm9sJztcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3MuYWNjZW50JylcbiAgZ2V0IGhhc0FjY2VudCgpIHtcbiAgICByZXR1cm4gdGhpcy5hY2NlbnQ7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmFjY2VudC1wcmltYXJ5JylcbiAgZ2V0IHByaW1hcnlBY2NlbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuYWNjZW50ID09PSAncHJpbWFyeSc7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmFjY2VudC1pbmZvJylcbiAgZ2V0IGluZm9BY2NlbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuYWNjZW50ID09PSAnaW5mbyc7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmFjY2VudC1zdWNjZXNzJylcbiAgZ2V0IHN1Y2Nlc3NBY2NlbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuYWNjZW50ID09PSAnc3VjY2Vzcyc7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmFjY2VudC13YXJuaW5nJylcbiAgZ2V0IHdhcm5pbmdBY2NlbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuYWNjZW50ID09PSAnd2FybmluZyc7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmFjY2VudC1kYW5nZXInKVxuICBnZXQgZGFuZ2VyQWNjZW50KCkge1xuICAgIHJldHVybiB0aGlzLmFjY2VudCA9PT0gJ2Rhbmdlcic7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmFjY2VudC1iYXNpYycpXG4gIGdldCBiYXNpY0FjY2VudCgpIHtcbiAgICByZXR1cm4gdGhpcy5hY2NlbnQgPT09ICdiYXNpYyc7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmFjY2VudC1jb250cm9sJylcbiAgZ2V0IGNvbnRyb2xBY2NlbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuYWNjZW50ID09PSAnY29udHJvbCc7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzJylcbiAgZ2V0IGFkZGl0aW9uYWxDbGFzc2VzKCk6IHN0cmluZ1tdIHtcbiAgICBpZiAodGhpcy5zdGF0dXNTZXJ2aWNlLmlzQ3VzdG9tU3RhdHVzKHRoaXMuc3RhdHVzKSkge1xuICAgICAgcmV0dXJuIFt0aGlzLnN0YXR1c1NlcnZpY2UuZ2V0U3RhdHVzQ2xhc3ModGhpcy5zdGF0dXMpXTtcbiAgICB9XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIHN0YXR1c1NlcnZpY2U6IE5iU3RhdHVzU2VydmljZSkge1xuICB9XG59XG4iXX0=