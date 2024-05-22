/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { ChangeDetectionStrategy, Component, ContentChildren, HostBinding, Input, } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { from, Subject } from 'rxjs';
import { convertToBoolProperty } from '../helpers';
import { NbOptionComponent } from './option.component';
import * as i0 from "@angular/core";
/**
 * NbOptionGroupComponent
 *
 * @styles
 *
 * option-group-text-color:
 * option-group-tiny-start-padding:
 * option-group-small-start-padding:
 * option-group-medium-start-padding:
 * option-group-large-start-padding:
 * option-group-giant-start-padding:
 **/
export class NbOptionGroupComponent {
    constructor() {
        this.destroy$ = new Subject();
        this._disabled = false;
    }
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = convertToBoolProperty(value);
        if (this.options) {
            this.updateOptionsDisabledState();
        }
    }
    get disabledAttribute() {
        return this.disabled ? '' : null;
    }
    ngAfterContentInit() {
        if (this.options.length) {
            this.asyncUpdateOptionsDisabledState();
        }
        this.options.changes
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => this.asyncUpdateOptionsDisabledState());
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    /**
     * Sets disabled state for each option to current group disabled state.
     */
    updateOptionsDisabledState() {
        this.options.forEach((option) => option.setDisabledByGroupState(this.disabled));
    }
    /**
     * Updates options disabled state after promise resolution.
     * This way change detection will be triggered after options state updated.
     * Use this method when updating options during change detection run (e.g. QueryList.changes, lifecycle hooks).
     */
    asyncUpdateOptionsDisabledState() {
        // Wrap Promise into Observable with `takeUntil(this.destroy$)` to prevent update if component destroyed.
        from(Promise.resolve())
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => this.updateOptionsDisabledState());
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbOptionGroupComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.1.0", type: NbOptionGroupComponent, selector: "nb-option-group", inputs: { title: "title", disabled: "disabled" }, host: { properties: { "attr.disabled": "this.disabledAttribute" } }, queries: [{ propertyName: "options", predicate: NbOptionComponent, descendants: true }], ngImport: i0, template: `
    <span class="option-group-title">{{ title }}</span>
    <ng-content select="nb-option, ng-container"></ng-content>
  `, isInline: true, styles: ["/*\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */:host{display:block}.option-group-title{display:block}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbOptionGroupComponent, decorators: [{
            type: Component,
            args: [{ selector: 'nb-option-group', changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <span class="option-group-title">{{ title }}</span>
    <ng-content select="nb-option, ng-container"></ng-content>
  `, styles: ["/*\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */:host{display:block}.option-group-title{display:block}\n"] }]
        }], propDecorators: { title: [{
                type: Input
            }], disabled: [{
                type: Input
            }], disabledAttribute: [{
                type: HostBinding,
                args: ['attr.disabled']
            }], options: [{
                type: ContentChildren,
                args: [NbOptionComponent, { descendants: true }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9uLWdyb3VwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9mcmFtZXdvcmsvdGhlbWUvY29tcG9uZW50cy9vcHRpb24vb3B0aW9uLWdyb3VwLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUVMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsZUFBZSxFQUNmLFdBQVcsRUFDWCxLQUFLLEdBR04sTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRXJDLE9BQU8sRUFBRSxxQkFBcUIsRUFBa0IsTUFBTSxZQUFZLENBQUM7QUFDbkUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7O0FBRXZEOzs7Ozs7Ozs7OztJQVdJO0FBVUosTUFBTSxPQUFPLHNCQUFzQjtJQVRuQztRQVdZLGFBQVEsR0FBRyxJQUFJLE9BQU8sRUFBUSxDQUFDO1FBZS9CLGNBQVMsR0FBWSxLQUFLLENBQUM7S0EyQ3RDO0lBdERDLElBQ0ksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDO0lBQ0QsSUFBSSxRQUFRLENBQUMsS0FBYztRQUN6QixJQUFJLENBQUMsU0FBUyxHQUFHLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRTlDLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ2pCLElBQUksQ0FBQywwQkFBMEIsRUFBRSxDQUFDO1FBQ3BDLENBQUM7SUFDSCxDQUFDO0lBSUQsSUFDSSxpQkFBaUI7UUFDbkIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUNuQyxDQUFDO0lBSUQsa0JBQWtCO1FBQ2hCLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUN4QixJQUFJLENBQUMsK0JBQStCLEVBQUUsQ0FBQztRQUN6QyxDQUFDO1FBRUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPO2FBQ2pCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQzlCLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsK0JBQStCLEVBQUUsQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRDs7T0FFRztJQUNPLDBCQUEwQjtRQUNsQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQXlCLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUNyRyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNPLCtCQUErQjtRQUN2Qyx5R0FBeUc7UUFDekcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQzthQUNwQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUM5QixTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLDBCQUEwQixFQUFFLENBQUMsQ0FBQztJQUN4RCxDQUFDOzhHQTNEVSxzQkFBc0I7a0dBQXRCLHNCQUFzQixzTUF5QmhCLGlCQUFpQixnREE5QnhCOzs7R0FHVDs7MkZBRVUsc0JBQXNCO2tCQVRsQyxTQUFTOytCQUNFLGlCQUFpQixtQkFFVix1QkFBdUIsQ0FBQyxNQUFNLFlBQ3JDOzs7R0FHVDs4QkFNUSxLQUFLO3NCQUFiLEtBQUs7Z0JBR0YsUUFBUTtzQkFEWCxLQUFLO2dCQWVGLGlCQUFpQjtzQkFEcEIsV0FBVzt1QkFBQyxlQUFlO2dCQUsrQixPQUFPO3NCQUFqRSxlQUFlO3VCQUFDLGlCQUFpQixFQUFFLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEFrdmVvLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqL1xuXG5pbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIEhvc3RCaW5kaW5nLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBRdWVyeUxpc3QsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgZnJvbSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBjb252ZXJ0VG9Cb29sUHJvcGVydHksIE5iQm9vbGVhbklucHV0IH0gZnJvbSAnLi4vaGVscGVycyc7XG5pbXBvcnQgeyBOYk9wdGlvbkNvbXBvbmVudCB9IGZyb20gJy4vb3B0aW9uLmNvbXBvbmVudCc7XG5cbi8qKlxuICogTmJPcHRpb25Hcm91cENvbXBvbmVudFxuICpcbiAqIEBzdHlsZXNcbiAqXG4gKiBvcHRpb24tZ3JvdXAtdGV4dC1jb2xvcjpcbiAqIG9wdGlvbi1ncm91cC10aW55LXN0YXJ0LXBhZGRpbmc6XG4gKiBvcHRpb24tZ3JvdXAtc21hbGwtc3RhcnQtcGFkZGluZzpcbiAqIG9wdGlvbi1ncm91cC1tZWRpdW0tc3RhcnQtcGFkZGluZzpcbiAqIG9wdGlvbi1ncm91cC1sYXJnZS1zdGFydC1wYWRkaW5nOlxuICogb3B0aW9uLWdyb3VwLWdpYW50LXN0YXJ0LXBhZGRpbmc6XG4gKiovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduYi1vcHRpb24tZ3JvdXAnLFxuICBzdHlsZVVybHM6IFsnLi9vcHRpb24tZ3JvdXAuY29tcG9uZW50LnNjc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHNwYW4gY2xhc3M9XCJvcHRpb24tZ3JvdXAtdGl0bGVcIj57eyB0aXRsZSB9fTwvc3Bhbj5cbiAgICA8bmctY29udGVudCBzZWxlY3Q9XCJuYi1vcHRpb24sIG5nLWNvbnRhaW5lclwiPjwvbmctY29udGVudD5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgTmJPcHRpb25Hcm91cENvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIE9uRGVzdHJveSB7XG5cbiAgcHJvdGVjdGVkIGRlc3Ryb3kkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICBASW5wdXQoKSB0aXRsZTogc3RyaW5nO1xuXG4gIEBJbnB1dCgpXG4gIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7XG4gIH1cbiAgc2V0IGRpc2FibGVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fZGlzYWJsZWQgPSBjb252ZXJ0VG9Cb29sUHJvcGVydHkodmFsdWUpO1xuXG4gICAgaWYgKHRoaXMub3B0aW9ucykge1xuICAgICAgdGhpcy51cGRhdGVPcHRpb25zRGlzYWJsZWRTdGF0ZSgpO1xuICAgIH1cbiAgfVxuICBwcm90ZWN0ZWQgX2Rpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9kaXNhYmxlZDogTmJCb29sZWFuSW5wdXQ7XG5cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLmRpc2FibGVkJylcbiAgZ2V0IGRpc2FibGVkQXR0cmlidXRlKCk6ICcnIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuZGlzYWJsZWQgPyAnJyA6IG51bGw7XG4gIH1cblxuICBAQ29udGVudENoaWxkcmVuKE5iT3B0aW9uQ29tcG9uZW50LCB7IGRlc2NlbmRhbnRzOiB0cnVlIH0pIG9wdGlvbnM6IFF1ZXJ5TGlzdDxOYk9wdGlvbkNvbXBvbmVudDxhbnk+PjtcblxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuYXN5bmNVcGRhdGVPcHRpb25zRGlzYWJsZWRTdGF0ZSgpO1xuICAgIH1cblxuICAgIHRoaXMub3B0aW9ucy5jaGFuZ2VzXG4gICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuYXN5bmNVcGRhdGVPcHRpb25zRGlzYWJsZWRTdGF0ZSgpKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuZGVzdHJveSQubmV4dCgpO1xuICAgIHRoaXMuZGVzdHJveSQuY29tcGxldGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIGRpc2FibGVkIHN0YXRlIGZvciBlYWNoIG9wdGlvbiB0byBjdXJyZW50IGdyb3VwIGRpc2FibGVkIHN0YXRlLlxuICAgKi9cbiAgcHJvdGVjdGVkIHVwZGF0ZU9wdGlvbnNEaXNhYmxlZFN0YXRlKCk6IHZvaWQge1xuICAgIHRoaXMub3B0aW9ucy5mb3JFYWNoKChvcHRpb246IE5iT3B0aW9uQ29tcG9uZW50KSA9PiBvcHRpb24uc2V0RGlzYWJsZWRCeUdyb3VwU3RhdGUodGhpcy5kaXNhYmxlZCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgb3B0aW9ucyBkaXNhYmxlZCBzdGF0ZSBhZnRlciBwcm9taXNlIHJlc29sdXRpb24uXG4gICAqIFRoaXMgd2F5IGNoYW5nZSBkZXRlY3Rpb24gd2lsbCBiZSB0cmlnZ2VyZWQgYWZ0ZXIgb3B0aW9ucyBzdGF0ZSB1cGRhdGVkLlxuICAgKiBVc2UgdGhpcyBtZXRob2Qgd2hlbiB1cGRhdGluZyBvcHRpb25zIGR1cmluZyBjaGFuZ2UgZGV0ZWN0aW9uIHJ1biAoZS5nLiBRdWVyeUxpc3QuY2hhbmdlcywgbGlmZWN5Y2xlIGhvb2tzKS5cbiAgICovXG4gIHByb3RlY3RlZCBhc3luY1VwZGF0ZU9wdGlvbnNEaXNhYmxlZFN0YXRlKCk6IHZvaWQge1xuICAgIC8vIFdyYXAgUHJvbWlzZSBpbnRvIE9ic2VydmFibGUgd2l0aCBgdGFrZVVudGlsKHRoaXMuZGVzdHJveSQpYCB0byBwcmV2ZW50IHVwZGF0ZSBpZiBjb21wb25lbnQgZGVzdHJveWVkLlxuICAgIGZyb20oUHJvbWlzZS5yZXNvbHZlKCkpXG4gICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMudXBkYXRlT3B0aW9uc0Rpc2FibGVkU3RhdGUoKSk7XG4gIH1cbn1cblxuXG4iXX0=