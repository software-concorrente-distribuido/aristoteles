/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Inject, Injectable, TemplateRef } from '@angular/core';
import { fromEvent as observableFromEvent } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { NbComponentPortal, NbPortalInjector, NbTemplatePortal, } from '../cdk/overlay/mapping';
import { NB_DOCUMENT } from '../../theme.options';
import { NB_DIALOG_CONFIG, NbDialogConfig } from './dialog-config';
import { NbDialogRef } from './dialog-ref';
import { NbDialogContainerComponent } from './dialog-container';
import * as i0 from "@angular/core";
import * as i1 from "../cdk/overlay/overlay-position";
import * as i2 from "../cdk/overlay/overlay-service";
/**
 * The `NbDialogService` helps to open dialogs.
 *
 * @stacked-example(Showcase, dialog/dialog-showcase.component)
 *
 * A new dialog is opened by calling the `open` method with a component to be loaded and an optional configuration.
 * `open` method will return `NbDialogRef` that can be used for the further manipulations.
 *
 * ### Installation
 *
 * Import `NbDialogModule.forRoot()` to your app module.
 * ```ts
 * @NgModule({
 *   imports: [
 *     // ...
 *     NbDialogModule.forRoot(config),
 *   ],
 * })
 * export class AppModule { }
 * ```
 *
 * If you are using it in a lazy loaded module than you have to install it with `NbDialogModule.forChild()`:
 * ```ts
 * @NgModule({
 *   imports: [
 *     // ...
 *     NbDialogModule.forChild(config),
 *   ],
 * })
 * export class LazyLoadedModule { }
 * ```
 *
 * ### Usage
 *
 * ```ts
 * const dialogRef = this.dialogService.open(MyDialogComponent, { ... });
 * ```
 *
 * `NbDialogRef` gives capability access reference to the rendered dialog component,
 * destroy dialog and some other options described below.
 *
 * Also, you can inject `NbDialogRef` in dialog component.
 *
 * ```ts
 * this.dialogService.open(MyDialogComponent, { ... });
 *
 * // my-dialog.component.ts
 * constructor(protected dialogRef: NbDialogRef) {
 * }
 *
 * close() {
 *   this.dialogRef.close();
 * }
 * ```
 *
 * Instead of component you can create dialog from TemplateRef:
 *
 * @stacked-example(Template ref, dialog/dialog-template.component)
 *
 * The dialog may return result through `NbDialogRef`. Calling component can receive this result with `onClose`
 * stream of `NbDialogRef`.
 *
 * @stacked-example(Result, dialog/dialog-result.component)
 *
 * ### Configuration
 *
 * As we mentioned above, `open` method of the `NbDialogService` may receive optional configuration options.
 * Also, you can provide global dialogs configuration through `NbDialogModule.forRoot({ ... })`.
 *
 * This config may contain the following:
 *
 * `context` - both, template and component may receive data through `config.context` property.
 * For components, this data will be assigned through inputs.
 * For templates, you can access it inside template as $implicit.
 *
 * ```ts
 * this.dialogService.open(template, { context: 'pass data in template' });
 * ```
 *
 * ```html
 * <ng-template let-some-additional-data>
 *   {{ some-additional-data }}
 * <ng-template/>
 * ```
 *
 * `hasBackdrop` - determines is service have to render backdrop under the dialog.
 * Default is true.
 * @stacked-example(Backdrop, dialog/dialog-has-backdrop.component)
 *
 * `closeOnBackdropClick` - close dialog on backdrop click if true.
 * Default is true.
 * @stacked-example(Backdrop click, dialog/dialog-backdrop-click.component)
 *
 * `closeOnEsc` - close dialog on escape button on the keyboard.
 * Default is true.
 * @stacked-example(Escape hit, dialog/dialog-esc.component)
 *
 * `hasScroll` - Disables scroll on content under dialog if true and does nothing otherwise.
 * Default is false.
 * Please, open dialogs in the separate window and try to scroll.
 * @stacked-example(Scroll, dialog/dialog-scroll.component)
 *
 * `autoFocus` - Focuses dialog automatically after open if true. It's useful to prevent misclicks on
 * trigger elements and opening multiple dialogs.
 * Default is true.
 *
 * As you can see, if you open dialog with auto focus dialog will focus first focusable element
 * or just blur previously focused automatically.
 * Otherwise, without auto focus, the focus will stay on the previously focused element.
 * Please, open dialogs in the separate window and try to click on the button without focus
 * and then hit space any times. Multiple same dialogs will be opened.
 * @stacked-example(Auto focus, dialog/dialog-auto-focus.component)
 * */
export class NbDialogService {
    constructor(document, globalConfig, positionBuilder, overlay, injector, cfr) {
        this.document = document;
        this.globalConfig = globalConfig;
        this.positionBuilder = positionBuilder;
        this.overlay = overlay;
        this.injector = injector;
        this.cfr = cfr;
    }
    /**
     * Opens new instance of the dialog, may receive optional config.
     * */
    open(content, userConfig = {}) {
        const config = new NbDialogConfig({ ...this.globalConfig, ...userConfig });
        const overlayRef = this.createOverlay(config);
        const dialogRef = new NbDialogRef(overlayRef);
        const container = this.createContainer(config, overlayRef);
        this.createContent(config, content, container, dialogRef);
        this.registerCloseListeners(config, overlayRef, dialogRef);
        return dialogRef;
    }
    createOverlay(config) {
        const positionStrategy = this.createPositionStrategy();
        const scrollStrategy = this.createScrollStrategy(config.hasScroll);
        return this.overlay.create({
            positionStrategy,
            scrollStrategy,
            hasBackdrop: config.hasBackdrop,
            backdropClass: config.backdropClass,
            panelClass: config.dialogClass,
        });
    }
    createPositionStrategy() {
        return this.positionBuilder
            .global()
            .centerVertically()
            .centerHorizontally();
    }
    createScrollStrategy(hasScroll) {
        if (hasScroll) {
            return this.overlay.scrollStrategies.noop();
        }
        else {
            return this.overlay.scrollStrategies.block();
        }
    }
    createContainer(config, overlayRef) {
        const injector = new NbPortalInjector(this.createInjector(config), new WeakMap([[NbDialogConfig, config]]));
        const containerPortal = new NbComponentPortal(NbDialogContainerComponent, null, injector, this.cfr);
        const containerRef = overlayRef.attach(containerPortal);
        return containerRef.instance;
    }
    createContent(config, content, container, dialogRef) {
        if (content instanceof TemplateRef) {
            const portal = this.createTemplatePortal(config, content, dialogRef);
            container.attachTemplatePortal(portal);
        }
        else {
            const portal = this.createComponentPortal(config, content, dialogRef);
            dialogRef.componentRef = container.attachComponentPortal(portal);
            if (config.context) {
                Object.assign(dialogRef.componentRef.instance, { ...config.context });
            }
        }
    }
    createTemplatePortal(config, content, dialogRef) {
        return new NbTemplatePortal(content, null, { $implicit: config.context, dialogRef });
    }
    /**
     * We're creating portal with custom injector provided through config or using global injector.
     * This approach provides us capability inject `NbDialogRef` in dialog component.
     * */
    createComponentPortal(config, content, dialogRef) {
        const injector = this.createInjector(config);
        const portalInjector = new NbPortalInjector(injector, new WeakMap([[NbDialogRef, dialogRef]]));
        return new NbComponentPortal(content, config.viewContainerRef, portalInjector);
    }
    createInjector(config) {
        return config.viewContainerRef && config.viewContainerRef.injector || this.injector;
    }
    registerCloseListeners(config, overlayRef, dialogRef) {
        if (config.closeOnBackdropClick) {
            overlayRef.backdropClick().subscribe(() => dialogRef.close());
        }
        if (config.closeOnEsc) {
            observableFromEvent(this.document, 'keyup')
                .pipe(filter((event) => event.keyCode === 27), takeUntil(dialogRef.onClose))
                .subscribe(() => dialogRef.close());
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbDialogService, deps: [{ token: NB_DOCUMENT }, { token: NB_DIALOG_CONFIG }, { token: i1.NbPositionBuilderService }, { token: i2.NbOverlayService }, { token: i0.Injector }, { token: i0.ComponentFactoryResolver }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbDialogService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbDialogService, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [NB_DOCUMENT]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [NB_DIALOG_CONFIG]
                }] }, { type: i1.NbPositionBuilderService }, { type: i2.NbOverlayService }, { type: i0.Injector }, { type: i0.ComponentFactoryResolver }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvZnJhbWV3b3JrL3RoZW1lL2NvbXBvbmVudHMvZGlhbG9nL2RpYWxvZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQTRCLE1BQU0sRUFBRSxVQUFVLEVBQVksV0FBVyxFQUFRLE1BQU0sZUFBZSxDQUFDO0FBQzFHLE9BQU8sRUFBRSxTQUFTLElBQUksbUJBQW1CLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDeEQsT0FBTyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVuRCxPQUFPLEVBQ0wsaUJBQWlCLEVBRWpCLGdCQUFnQixFQUVoQixnQkFBZ0IsR0FDakIsTUFBTSx3QkFBd0IsQ0FBQztBQUdoQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDbEQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLGNBQWMsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ25FLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDM0MsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7Ozs7QUFHaEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0FnSEs7QUFFTCxNQUFNLE9BQU8sZUFBZTtJQUMxQixZQUEyQyxRQUFRLEVBQ0gsWUFBWSxFQUN0QyxlQUF5QyxFQUN6QyxPQUF5QixFQUN6QixRQUFrQixFQUNsQixHQUE2QjtRQUxSLGFBQVEsR0FBUixRQUFRLENBQUE7UUFDSCxpQkFBWSxHQUFaLFlBQVksQ0FBQTtRQUN0QyxvQkFBZSxHQUFmLGVBQWUsQ0FBMEI7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LHNCQUFzQixDQUFJLE1BQXNCLEVBQUUsVUFBd0IsRUFBRSxTQUF5QjtRQUM3RyxJQUFJLE1BQU0sQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1lBQ2hDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDaEUsQ0FBQztRQUVELElBQUksTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQ3RCLG1CQUFtQixDQUFnQixJQUFJLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQztpQkFDdkQsSUFBSSxDQUNILE1BQU0sQ0FBQyxDQUFDLEtBQW9CLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxPQUFPLEtBQUssRUFBRSxDQUFDLEVBQ3RELFNBQVMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQzdCO2lCQUNBLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUN4QyxDQUFDO0lBQ0gsQ0FBQzs4R0FoSFUsZUFBZSxrQkFDTixXQUFXLGFBQ1gsZ0JBQWdCO2tIQUZ6QixlQUFlOzsyRkFBZixlQUFlO2tCQUQzQixVQUFVOzswQkFFSSxNQUFNOzJCQUFDLFdBQVc7OzBCQUNsQixNQUFNOzJCQUFDLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBBa3Zlby4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi9cblxuaW1wb3J0IHsgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBJbmplY3QsIEluamVjdGFibGUsIEluamVjdG9yLCBUZW1wbGF0ZVJlZiwgVHlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZnJvbUV2ZW50IGFzIG9ic2VydmFibGVGcm9tRXZlbnQgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQge1xuICBOYkNvbXBvbmVudFBvcnRhbCxcbiAgTmJPdmVybGF5UmVmLFxuICBOYlBvcnRhbEluamVjdG9yLFxuICBOYlNjcm9sbFN0cmF0ZWd5LFxuICBOYlRlbXBsYXRlUG9ydGFsLFxufSBmcm9tICcuLi9jZGsvb3ZlcmxheS9tYXBwaW5nJztcbmltcG9ydCB7IE5iR2xvYmFsUG9zaXRpb25TdHJhdGVneSwgTmJQb3NpdGlvbkJ1aWxkZXJTZXJ2aWNlIH0gZnJvbSAnLi4vY2RrL292ZXJsYXkvb3ZlcmxheS1wb3NpdGlvbic7XG5pbXBvcnQgeyBOYk92ZXJsYXlTZXJ2aWNlIH0gZnJvbSAnLi4vY2RrL292ZXJsYXkvb3ZlcmxheS1zZXJ2aWNlJztcbmltcG9ydCB7IE5CX0RPQ1VNRU5UIH0gZnJvbSAnLi4vLi4vdGhlbWUub3B0aW9ucyc7XG5pbXBvcnQgeyBOQl9ESUFMT0dfQ09ORklHLCBOYkRpYWxvZ0NvbmZpZyB9IGZyb20gJy4vZGlhbG9nLWNvbmZpZyc7XG5pbXBvcnQgeyBOYkRpYWxvZ1JlZiB9IGZyb20gJy4vZGlhbG9nLXJlZic7XG5pbXBvcnQgeyBOYkRpYWxvZ0NvbnRhaW5lckNvbXBvbmVudCB9IGZyb20gJy4vZGlhbG9nLWNvbnRhaW5lcic7XG5cblxuLyoqXG4gKiBUaGUgYE5iRGlhbG9nU2VydmljZWAgaGVscHMgdG8gb3BlbiBkaWFsb2dzLlxuICpcbiAqIEBzdGFja2VkLWV4YW1wbGUoU2hvd2Nhc2UsIGRpYWxvZy9kaWFsb2ctc2hvd2Nhc2UuY29tcG9uZW50KVxuICpcbiAqIEEgbmV3IGRpYWxvZyBpcyBvcGVuZWQgYnkgY2FsbGluZyB0aGUgYG9wZW5gIG1ldGhvZCB3aXRoIGEgY29tcG9uZW50IHRvIGJlIGxvYWRlZCBhbmQgYW4gb3B0aW9uYWwgY29uZmlndXJhdGlvbi5cbiAqIGBvcGVuYCBtZXRob2Qgd2lsbCByZXR1cm4gYE5iRGlhbG9nUmVmYCB0aGF0IGNhbiBiZSB1c2VkIGZvciB0aGUgZnVydGhlciBtYW5pcHVsYXRpb25zLlxuICpcbiAqICMjIyBJbnN0YWxsYXRpb25cbiAqXG4gKiBJbXBvcnQgYE5iRGlhbG9nTW9kdWxlLmZvclJvb3QoKWAgdG8geW91ciBhcHAgbW9kdWxlLlxuICogYGBgdHNcbiAqIEBOZ01vZHVsZSh7XG4gKiAgIGltcG9ydHM6IFtcbiAqICAgICAvLyAuLi5cbiAqICAgICBOYkRpYWxvZ01vZHVsZS5mb3JSb290KGNvbmZpZyksXG4gKiAgIF0sXG4gKiB9KVxuICogZXhwb3J0IGNsYXNzIEFwcE1vZHVsZSB7IH1cbiAqIGBgYFxuICpcbiAqIElmIHlvdSBhcmUgdXNpbmcgaXQgaW4gYSBsYXp5IGxvYWRlZCBtb2R1bGUgdGhhbiB5b3UgaGF2ZSB0byBpbnN0YWxsIGl0IHdpdGggYE5iRGlhbG9nTW9kdWxlLmZvckNoaWxkKClgOlxuICogYGBgdHNcbiAqIEBOZ01vZHVsZSh7XG4gKiAgIGltcG9ydHM6IFtcbiAqICAgICAvLyAuLi5cbiAqICAgICBOYkRpYWxvZ01vZHVsZS5mb3JDaGlsZChjb25maWcpLFxuICogICBdLFxuICogfSlcbiAqIGV4cG9ydCBjbGFzcyBMYXp5TG9hZGVkTW9kdWxlIHsgfVxuICogYGBgXG4gKlxuICogIyMjIFVzYWdlXG4gKlxuICogYGBgdHNcbiAqIGNvbnN0IGRpYWxvZ1JlZiA9IHRoaXMuZGlhbG9nU2VydmljZS5vcGVuKE15RGlhbG9nQ29tcG9uZW50LCB7IC4uLiB9KTtcbiAqIGBgYFxuICpcbiAqIGBOYkRpYWxvZ1JlZmAgZ2l2ZXMgY2FwYWJpbGl0eSBhY2Nlc3MgcmVmZXJlbmNlIHRvIHRoZSByZW5kZXJlZCBkaWFsb2cgY29tcG9uZW50LFxuICogZGVzdHJveSBkaWFsb2cgYW5kIHNvbWUgb3RoZXIgb3B0aW9ucyBkZXNjcmliZWQgYmVsb3cuXG4gKlxuICogQWxzbywgeW91IGNhbiBpbmplY3QgYE5iRGlhbG9nUmVmYCBpbiBkaWFsb2cgY29tcG9uZW50LlxuICpcbiAqIGBgYHRzXG4gKiB0aGlzLmRpYWxvZ1NlcnZpY2Uub3BlbihNeURpYWxvZ0NvbXBvbmVudCwgeyAuLi4gfSk7XG4gKlxuICogLy8gbXktZGlhbG9nLmNvbXBvbmVudC50c1xuICogY29uc3RydWN0b3IocHJvdGVjdGVkIGRpYWxvZ1JlZjogTmJEaWFsb2dSZWYpIHtcbiAqIH1cbiAqXG4gKiBjbG9zZSgpIHtcbiAqICAgdGhpcy5kaWFsb2dSZWYuY2xvc2UoKTtcbiAqIH1cbiAqIGBgYFxuICpcbiAqIEluc3RlYWQgb2YgY29tcG9uZW50IHlvdSBjYW4gY3JlYXRlIGRpYWxvZyBmcm9tIFRlbXBsYXRlUmVmOlxuICpcbiAqIEBzdGFja2VkLWV4YW1wbGUoVGVtcGxhdGUgcmVmLCBkaWFsb2cvZGlhbG9nLXRlbXBsYXRlLmNvbXBvbmVudClcbiAqXG4gKiBUaGUgZGlhbG9nIG1heSByZXR1cm4gcmVzdWx0IHRocm91Z2ggYE5iRGlhbG9nUmVmYC4gQ2FsbGluZyBjb21wb25lbnQgY2FuIHJlY2VpdmUgdGhpcyByZXN1bHQgd2l0aCBgb25DbG9zZWBcbiAqIHN0cmVhbSBvZiBgTmJEaWFsb2dSZWZgLlxuICpcbiAqIEBzdGFja2VkLWV4YW1wbGUoUmVzdWx0LCBkaWFsb2cvZGlhbG9nLXJlc3VsdC5jb21wb25lbnQpXG4gKlxuICogIyMjIENvbmZpZ3VyYXRpb25cbiAqXG4gKiBBcyB3ZSBtZW50aW9uZWQgYWJvdmUsIGBvcGVuYCBtZXRob2Qgb2YgdGhlIGBOYkRpYWxvZ1NlcnZpY2VgIG1heSByZWNlaXZlIG9wdGlvbmFsIGNvbmZpZ3VyYXRpb24gb3B0aW9ucy5cbiAqIEFsc28sIHlvdSBjYW4gcHJvdmlkZSBnbG9iYWwgZGlhbG9ncyBjb25maWd1cmF0aW9uIHRocm91Z2ggYE5iRGlhbG9nTW9kdWxlLmZvclJvb3QoeyAuLi4gfSlgLlxuICpcbiAqIFRoaXMgY29uZmlnIG1heSBjb250YWluIHRoZSBmb2xsb3dpbmc6XG4gKlxuICogYGNvbnRleHRgIC0gYm90aCwgdGVtcGxhdGUgYW5kIGNvbXBvbmVudCBtYXkgcmVjZWl2ZSBkYXRhIHRocm91Z2ggYGNvbmZpZy5jb250ZXh0YCBwcm9wZXJ0eS5cbiAqIEZvciBjb21wb25lbnRzLCB0aGlzIGRhdGEgd2lsbCBiZSBhc3NpZ25lZCB0aHJvdWdoIGlucHV0cy5cbiAqIEZvciB0ZW1wbGF0ZXMsIHlvdSBjYW4gYWNjZXNzIGl0IGluc2lkZSB0ZW1wbGF0ZSBhcyAkaW1wbGljaXQuXG4gKlxuICogYGBgdHNcbiAqIHRoaXMuZGlhbG9nU2VydmljZS5vcGVuKHRlbXBsYXRlLCB7IGNvbnRleHQ6ICdwYXNzIGRhdGEgaW4gdGVtcGxhdGUnIH0pO1xuICogYGBgXG4gKlxuICogYGBgaHRtbFxuICogPG5nLXRlbXBsYXRlIGxldC1zb21lLWFkZGl0aW9uYWwtZGF0YT5cbiAqICAge3sgc29tZS1hZGRpdGlvbmFsLWRhdGEgfX1cbiAqIDxuZy10ZW1wbGF0ZS8+XG4gKiBgYGBcbiAqXG4gKiBgaGFzQmFja2Ryb3BgIC0gZGV0ZXJtaW5lcyBpcyBzZXJ2aWNlIGhhdmUgdG8gcmVuZGVyIGJhY2tkcm9wIHVuZGVyIHRoZSBkaWFsb2cuXG4gKiBEZWZhdWx0IGlzIHRydWUuXG4gKiBAc3RhY2tlZC1leGFtcGxlKEJhY2tkcm9wLCBkaWFsb2cvZGlhbG9nLWhhcy1iYWNrZHJvcC5jb21wb25lbnQpXG4gKlxuICogYGNsb3NlT25CYWNrZHJvcENsaWNrYCAtIGNsb3NlIGRpYWxvZyBvbiBiYWNrZHJvcCBjbGljayBpZiB0cnVlLlxuICogRGVmYXVsdCBpcyB0cnVlLlxuICogQHN0YWNrZWQtZXhhbXBsZShCYWNrZHJvcCBjbGljaywgZGlhbG9nL2RpYWxvZy1iYWNrZHJvcC1jbGljay5jb21wb25lbnQpXG4gKlxuICogYGNsb3NlT25Fc2NgIC0gY2xvc2UgZGlhbG9nIG9uIGVzY2FwZSBidXR0b24gb24gdGhlIGtleWJvYXJkLlxuICogRGVmYXVsdCBpcyB0cnVlLlxuICogQHN0YWNrZWQtZXhhbXBsZShFc2NhcGUgaGl0LCBkaWFsb2cvZGlhbG9nLWVzYy5jb21wb25lbnQpXG4gKlxuICogYGhhc1Njcm9sbGAgLSBEaXNhYmxlcyBzY3JvbGwgb24gY29udGVudCB1bmRlciBkaWFsb2cgaWYgdHJ1ZSBhbmQgZG9lcyBub3RoaW5nIG90aGVyd2lzZS5cbiAqIERlZmF1bHQgaXMgZmFsc2UuXG4gKiBQbGVhc2UsIG9wZW4gZGlhbG9ncyBpbiB0aGUgc2VwYXJhdGUgd2luZG93IGFuZCB0cnkgdG8gc2Nyb2xsLlxuICogQHN0YWNrZWQtZXhhbXBsZShTY3JvbGwsIGRpYWxvZy9kaWFsb2ctc2Nyb2xsLmNvbXBvbmVudClcbiAqXG4gKiBgYXV0b0ZvY3VzYCAtIEZvY3VzZXMgZGlhbG9nIGF1dG9tYXRpY2FsbHkgYWZ0ZXIgb3BlbiBpZiB0cnVlLiBJdCdzIHVzZWZ1bCB0byBwcmV2ZW50IG1pc2NsaWNrcyBvblxuICogdHJpZ2dlciBlbGVtZW50cyBhbmQgb3BlbmluZyBtdWx0aXBsZSBkaWFsb2dzLlxuICogRGVmYXVsdCBpcyB0cnVlLlxuICpcbiAqIEFzIHlvdSBjYW4gc2VlLCBpZiB5b3Ugb3BlbiBkaWFsb2cgd2l0aCBhdXRvIGZvY3VzIGRpYWxvZyB3aWxsIGZvY3VzIGZpcnN0IGZvY3VzYWJsZSBlbGVtZW50XG4gKiBvciBqdXN0IGJsdXIgcHJldmlvdXNseSBmb2N1c2VkIGF1dG9tYXRpY2FsbHkuXG4gKiBPdGhlcndpc2UsIHdpdGhvdXQgYXV0byBmb2N1cywgdGhlIGZvY3VzIHdpbGwgc3RheSBvbiB0aGUgcHJldmlvdXNseSBmb2N1c2VkIGVsZW1lbnQuXG4gKiBQbGVhc2UsIG9wZW4gZGlhbG9ncyBpbiB0aGUgc2VwYXJhdGUgd2luZG93IGFuZCB0cnkgdG8gY2xpY2sgb24gdGhlIGJ1dHRvbiB3aXRob3V0IGZvY3VzXG4gKiBhbmQgdGhlbiBoaXQgc3BhY2UgYW55IHRpbWVzLiBNdWx0aXBsZSBzYW1lIGRpYWxvZ3Mgd2lsbCBiZSBvcGVuZWQuXG4gKiBAc3RhY2tlZC1leGFtcGxlKEF1dG8gZm9jdXMsIGRpYWxvZy9kaWFsb2ctYXV0by1mb2N1cy5jb21wb25lbnQpXG4gKiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE5iRGlhbG9nU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoTkJfRE9DVU1FTlQpIHByb3RlY3RlZCBkb2N1bWVudCxcbiAgICAgICAgICAgICAgQEluamVjdChOQl9ESUFMT0dfQ09ORklHKSBwcm90ZWN0ZWQgZ2xvYmFsQ29uZmlnLFxuICAgICAgICAgICAgICBwcm90ZWN0ZWQgcG9zaXRpb25CdWlsZGVyOiBOYlBvc2l0aW9uQnVpbGRlclNlcnZpY2UsXG4gICAgICAgICAgICAgIHByb3RlY3RlZCBvdmVybGF5OiBOYk92ZXJsYXlTZXJ2aWNlLFxuICAgICAgICAgICAgICBwcm90ZWN0ZWQgaW5qZWN0b3I6IEluamVjdG9yLFxuICAgICAgICAgICAgICBwcm90ZWN0ZWQgY2ZyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIpIHtcbiAgfVxuXG4gIC8qKlxuICAgKiBPcGVucyBuZXcgaW5zdGFuY2Ugb2YgdGhlIGRpYWxvZywgbWF5IHJlY2VpdmUgb3B0aW9uYWwgY29uZmlnLlxuICAgKiAqL1xuICBvcGVuPFQ+KGNvbnRlbnQ6IFR5cGU8VD4gfCBUZW1wbGF0ZVJlZjxUPixcbiAgICAgICAgICB1c2VyQ29uZmlnOiBQYXJ0aWFsPE5iRGlhbG9nQ29uZmlnPFBhcnRpYWw8VD4gfCBzdHJpbmc+PiA9IHt9KTogTmJEaWFsb2dSZWY8VD4ge1xuICAgIGNvbnN0IGNvbmZpZyA9IG5ldyBOYkRpYWxvZ0NvbmZpZyh7IC4uLnRoaXMuZ2xvYmFsQ29uZmlnLCAuLi51c2VyQ29uZmlnIH0pO1xuICAgIGNvbnN0IG92ZXJsYXlSZWYgPSB0aGlzLmNyZWF0ZU92ZXJsYXkoY29uZmlnKTtcbiAgICBjb25zdCBkaWFsb2dSZWYgPSBuZXcgTmJEaWFsb2dSZWY8VD4ob3ZlcmxheVJlZik7XG4gICAgY29uc3QgY29udGFpbmVyID0gdGhpcy5jcmVhdGVDb250YWluZXIoY29uZmlnLCBvdmVybGF5UmVmKTtcbiAgICB0aGlzLmNyZWF0ZUNvbnRlbnQoY29uZmlnLCBjb250ZW50LCBjb250YWluZXIsIGRpYWxvZ1JlZik7XG5cbiAgICB0aGlzLnJlZ2lzdGVyQ2xvc2VMaXN0ZW5lcnMoY29uZmlnLCBvdmVybGF5UmVmLCBkaWFsb2dSZWYpO1xuXG4gICAgcmV0dXJuIGRpYWxvZ1JlZjtcbiAgfVxuXG4gIHByb3RlY3RlZCBjcmVhdGVPdmVybGF5KGNvbmZpZzogTmJEaWFsb2dDb25maWcpOiBOYk92ZXJsYXlSZWYge1xuICAgIGNvbnN0IHBvc2l0aW9uU3RyYXRlZ3kgPSB0aGlzLmNyZWF0ZVBvc2l0aW9uU3RyYXRlZ3koKTtcbiAgICBjb25zdCBzY3JvbGxTdHJhdGVneSA9IHRoaXMuY3JlYXRlU2Nyb2xsU3RyYXRlZ3koY29uZmlnLmhhc1Njcm9sbCk7XG5cbiAgICByZXR1cm4gdGhpcy5vdmVybGF5LmNyZWF0ZSh7XG4gICAgICBwb3NpdGlvblN0cmF0ZWd5LFxuICAgICAgc2Nyb2xsU3RyYXRlZ3ksXG4gICAgICBoYXNCYWNrZHJvcDogY29uZmlnLmhhc0JhY2tkcm9wLFxuICAgICAgYmFja2Ryb3BDbGFzczogY29uZmlnLmJhY2tkcm9wQ2xhc3MsXG4gICAgICBwYW5lbENsYXNzOiBjb25maWcuZGlhbG9nQ2xhc3MsXG4gICAgfSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgY3JlYXRlUG9zaXRpb25TdHJhdGVneSgpOiBOYkdsb2JhbFBvc2l0aW9uU3RyYXRlZ3kge1xuICAgIHJldHVybiB0aGlzLnBvc2l0aW9uQnVpbGRlclxuICAgICAgLmdsb2JhbCgpXG4gICAgICAuY2VudGVyVmVydGljYWxseSgpXG4gICAgICAuY2VudGVySG9yaXpvbnRhbGx5KCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgY3JlYXRlU2Nyb2xsU3RyYXRlZ3koaGFzU2Nyb2xsOiBib29sZWFuKTogTmJTY3JvbGxTdHJhdGVneSB7XG4gICAgaWYgKGhhc1Njcm9sbCkge1xuICAgICAgcmV0dXJuIHRoaXMub3ZlcmxheS5zY3JvbGxTdHJhdGVnaWVzLm5vb3AoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMub3ZlcmxheS5zY3JvbGxTdHJhdGVnaWVzLmJsb2NrKCk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIGNyZWF0ZUNvbnRhaW5lcihjb25maWc6IE5iRGlhbG9nQ29uZmlnLCBvdmVybGF5UmVmOiBOYk92ZXJsYXlSZWYpOiBOYkRpYWxvZ0NvbnRhaW5lckNvbXBvbmVudCB7XG4gICAgY29uc3QgaW5qZWN0b3IgPSBuZXcgTmJQb3J0YWxJbmplY3Rvcih0aGlzLmNyZWF0ZUluamVjdG9yKGNvbmZpZyksIG5ldyBXZWFrTWFwKFtbTmJEaWFsb2dDb25maWcsIGNvbmZpZ11dKSk7XG4gICAgY29uc3QgY29udGFpbmVyUG9ydGFsID0gbmV3IE5iQ29tcG9uZW50UG9ydGFsKE5iRGlhbG9nQ29udGFpbmVyQ29tcG9uZW50LCBudWxsLCBpbmplY3RvciwgdGhpcy5jZnIpO1xuICAgIGNvbnN0IGNvbnRhaW5lclJlZiA9IG92ZXJsYXlSZWYuYXR0YWNoKGNvbnRhaW5lclBvcnRhbCk7XG4gICAgcmV0dXJuIGNvbnRhaW5lclJlZi5pbnN0YW5jZTtcbiAgfVxuXG4gIHByb3RlY3RlZCBjcmVhdGVDb250ZW50PFQ+KGNvbmZpZzogTmJEaWFsb2dDb25maWcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFR5cGU8VD4gfCBUZW1wbGF0ZVJlZjxUPixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyOiBOYkRpYWxvZ0NvbnRhaW5lckNvbXBvbmVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlhbG9nUmVmOiBOYkRpYWxvZ1JlZjxUPikge1xuICAgIGlmIChjb250ZW50IGluc3RhbmNlb2YgVGVtcGxhdGVSZWYpIHtcbiAgICAgIGNvbnN0IHBvcnRhbCA9IHRoaXMuY3JlYXRlVGVtcGxhdGVQb3J0YWwoY29uZmlnLCBjb250ZW50LCBkaWFsb2dSZWYpO1xuICAgICAgY29udGFpbmVyLmF0dGFjaFRlbXBsYXRlUG9ydGFsKHBvcnRhbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHBvcnRhbCA9IHRoaXMuY3JlYXRlQ29tcG9uZW50UG9ydGFsKGNvbmZpZywgY29udGVudCwgZGlhbG9nUmVmKTtcbiAgICAgIGRpYWxvZ1JlZi5jb21wb25lbnRSZWYgPSBjb250YWluZXIuYXR0YWNoQ29tcG9uZW50UG9ydGFsKHBvcnRhbCk7XG5cbiAgICAgIGlmIChjb25maWcuY29udGV4dCkge1xuICAgICAgICBPYmplY3QuYXNzaWduKGRpYWxvZ1JlZi5jb21wb25lbnRSZWYuaW5zdGFuY2UsIHsgLi4uY29uZmlnLmNvbnRleHQgfSlcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgY3JlYXRlVGVtcGxhdGVQb3J0YWw8VD4oY29uZmlnOiBOYkRpYWxvZ0NvbmZpZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFRlbXBsYXRlUmVmPFQ+LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlhbG9nUmVmOiBOYkRpYWxvZ1JlZjxUPik6IE5iVGVtcGxhdGVQb3J0YWwge1xuICAgIHJldHVybiBuZXcgTmJUZW1wbGF0ZVBvcnRhbChjb250ZW50LCBudWxsLCA8YW55PnsgJGltcGxpY2l0OiBjb25maWcuY29udGV4dCwgZGlhbG9nUmVmIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFdlJ3JlIGNyZWF0aW5nIHBvcnRhbCB3aXRoIGN1c3RvbSBpbmplY3RvciBwcm92aWRlZCB0aHJvdWdoIGNvbmZpZyBvciB1c2luZyBnbG9iYWwgaW5qZWN0b3IuXG4gICAqIFRoaXMgYXBwcm9hY2ggcHJvdmlkZXMgdXMgY2FwYWJpbGl0eSBpbmplY3QgYE5iRGlhbG9nUmVmYCBpbiBkaWFsb2cgY29tcG9uZW50LlxuICAgKiAqL1xuICBwcm90ZWN0ZWQgY3JlYXRlQ29tcG9uZW50UG9ydGFsPFQ+KGNvbmZpZzogTmJEaWFsb2dDb25maWcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogVHlwZTxUPixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaWFsb2dSZWY6IE5iRGlhbG9nUmVmPFQ+KTogTmJDb21wb25lbnRQb3J0YWwge1xuICAgIGNvbnN0IGluamVjdG9yID0gdGhpcy5jcmVhdGVJbmplY3Rvcihjb25maWcpO1xuICAgIGNvbnN0IHBvcnRhbEluamVjdG9yID0gbmV3IE5iUG9ydGFsSW5qZWN0b3IoaW5qZWN0b3IsIG5ldyBXZWFrTWFwKFtbTmJEaWFsb2dSZWYsIGRpYWxvZ1JlZl1dKSk7XG4gICAgcmV0dXJuIG5ldyBOYkNvbXBvbmVudFBvcnRhbChjb250ZW50LCBjb25maWcudmlld0NvbnRhaW5lclJlZiwgcG9ydGFsSW5qZWN0b3IpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGNyZWF0ZUluamVjdG9yKGNvbmZpZzogTmJEaWFsb2dDb25maWcpOiBJbmplY3RvciB7XG4gICAgcmV0dXJuIGNvbmZpZy52aWV3Q29udGFpbmVyUmVmICYmIGNvbmZpZy52aWV3Q29udGFpbmVyUmVmLmluamVjdG9yIHx8IHRoaXMuaW5qZWN0b3I7XG4gIH1cblxuICBwcm90ZWN0ZWQgcmVnaXN0ZXJDbG9zZUxpc3RlbmVyczxUPihjb25maWc6IE5iRGlhbG9nQ29uZmlnLCBvdmVybGF5UmVmOiBOYk92ZXJsYXlSZWYsIGRpYWxvZ1JlZjogTmJEaWFsb2dSZWY8VD4pIHtcbiAgICBpZiAoY29uZmlnLmNsb3NlT25CYWNrZHJvcENsaWNrKSB7XG4gICAgICBvdmVybGF5UmVmLmJhY2tkcm9wQ2xpY2soKS5zdWJzY3JpYmUoKCkgPT4gZGlhbG9nUmVmLmNsb3NlKCkpO1xuICAgIH1cblxuICAgIGlmIChjb25maWcuY2xvc2VPbkVzYykge1xuICAgICAgb2JzZXJ2YWJsZUZyb21FdmVudDxLZXlib2FyZEV2ZW50Pih0aGlzLmRvY3VtZW50LCAna2V5dXAnKVxuICAgICAgICAucGlwZShcbiAgICAgICAgICBmaWx0ZXIoKGV2ZW50OiBLZXlib2FyZEV2ZW50KSA9PiBldmVudC5rZXlDb2RlID09PSAyNyksXG4gICAgICAgICAgdGFrZVVudGlsKGRpYWxvZ1JlZi5vbkNsb3NlKSxcbiAgICAgICAgKVxuICAgICAgICAuc3Vic2NyaWJlKCgpID0+IGRpYWxvZ1JlZi5jbG9zZSgpKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==