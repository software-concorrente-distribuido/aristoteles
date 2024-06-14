import { Injectable, SimpleChange } from '@angular/core';
import { Subject } from 'rxjs';
import { skip, takeUntil } from 'rxjs/operators';
import { NbTrigger } from '../overlay-trigger';
import { NbAdjustment, NbPosition, } from '../overlay-position';
import * as i0 from "@angular/core";
import * as i1 from "../overlay-position";
import * as i2 from "../overlay-trigger";
import * as i3 from "./dynamic-overlay";
import * as i4 from "../../../../services/direction.service";
export class NbDynamicOverlayChange extends SimpleChange {
    constructor(previousValue, currentValue, firstChange = false) {
        super(previousValue, currentValue, firstChange);
    }
    isChanged() {
        return this.currentValue !== this.previousValue;
    }
}
export class NbDynamicOverlayHandler {
    constructor(positionBuilder, triggerStrategyBuilder, dynamicOverlayService, directionService) {
        this.positionBuilder = positionBuilder;
        this.triggerStrategyBuilder = triggerStrategyBuilder;
        this.dynamicOverlayService = dynamicOverlayService;
        this.directionService = directionService;
        this._context = {};
        this._trigger = NbTrigger.NOOP;
        this._disabled = false;
        this._position = NbPosition.TOP;
        this._adjustment = NbAdjustment.NOOP;
        this._offset = 15;
        this._overlayConfig = {};
        this.changes = {};
        this.destroy$ = new Subject();
    }
    host(host) {
        this.changes.host = new NbDynamicOverlayChange(this._host, host);
        this._host = host;
        return this;
    }
    trigger(trigger) {
        this.changes.trigger = new NbDynamicOverlayChange(this._trigger, trigger);
        this._trigger = trigger;
        return this;
    }
    disabled(disabled) {
        this.changes.disabled = new NbDynamicOverlayChange(this._disabled, disabled);
        this._disabled = disabled;
        return this;
    }
    position(position) {
        this.changes.position = new NbDynamicOverlayChange(this._position, position);
        this._position = position;
        return this;
    }
    adjustment(adjustment) {
        this.changes.adjustment = new NbDynamicOverlayChange(this._adjustment, adjustment);
        this._adjustment = adjustment;
        return this;
    }
    componentType(componentType) {
        this.changes.componentType = new NbDynamicOverlayChange(this._componentType, componentType);
        this._componentType = componentType;
        return this;
    }
    content(content) {
        this.changes.content = new NbDynamicOverlayChange(this._content, content);
        this._content = content;
        return this;
    }
    context(context) {
        this.changes.context = new NbDynamicOverlayChange(this._context, context);
        this._context = context;
        return this;
    }
    offset(offset) {
        this.changes.offset = new NbDynamicOverlayChange(this._offset, offset);
        this._offset = offset;
        return this;
    }
    overlayConfig(overlayConfig) {
        this.changes.overlayConfig = new NbDynamicOverlayChange(this._overlayConfig, overlayConfig);
        this._overlayConfig = overlayConfig;
        return this;
    }
    build() {
        if (!this._componentType || !this._host) {
            throw Error(`NbDynamicOverlayHandler: at least 'componentType' and 'host' should be
      passed before building a dynamic overlay.`);
        }
        this.dynamicOverlay = this.dynamicOverlayService.create(this._componentType, this._content, this._context, this.createPositionStrategy(), this._overlayConfig, this._disabled);
        this.connect();
        this.clearChanges();
        return this.dynamicOverlay;
    }
    rebuild() {
        /**
         * we should not throw here
         * as we use rebuilt in lifecycle hooks
         * which it could be called before the build
         * so we just ignore this call
         */
        if (!this.dynamicOverlay) {
            return undefined;
        }
        if (this.isPositionStrategyUpdateRequired()) {
            this.dynamicOverlay.setPositionStrategy(this.createPositionStrategy());
        }
        if (this.isTriggerStrategyUpdateRequired()) {
            this.connect();
        }
        if (this.isContainerRerenderRequired()) {
            this.dynamicOverlay.setContentAndContext(this._content, this._context);
        }
        if (this.isComponentTypeUpdateRequired()) {
            this.dynamicOverlay.setComponent(this._componentType);
        }
        if (this.isOverlayConfigUpdateRequired()) {
            this.dynamicOverlay.setOverlayConfig(this._overlayConfig);
        }
        if (this.isDisabledUpdated()) {
            this.dynamicOverlay.setDisabled(this._disabled);
        }
        this.clearChanges();
        return this.dynamicOverlay;
    }
    connect() {
        if (!this.dynamicOverlay) {
            throw new Error(`NbDynamicOverlayHandler: cannot connect to DynamicOverlay
      as it is not created yet. Call build() first`);
        }
        this.disconnect();
        this.subscribeOnTriggers(this.dynamicOverlay);
        this.subscribeOnDirectionChange();
    }
    disconnect() {
        if (this.triggerStrategy) {
            this.triggerStrategy.destroy();
        }
    }
    destroy() {
        this.destroy$.next();
        this.destroy$.complete();
        this.disconnect();
        this.clearChanges();
        if (this.dynamicOverlay) {
            this.dynamicOverlay.dispose();
        }
    }
    createPositionStrategy() {
        return this.positionBuilder
            .connectedTo(this._host)
            .position(this._position)
            .adjustment(this._adjustment)
            .offset(this._offset)
            .direction(this.directionService.getDirection());
    }
    subscribeOnTriggers(dynamicOverlay) {
        this.triggerStrategy = this.triggerStrategyBuilder
            .trigger(this._trigger)
            .host(this._host.nativeElement)
            .container(() => dynamicOverlay.getContainer())
            .build();
        this.triggerStrategy.show$.subscribe(() => dynamicOverlay.show());
        this.triggerStrategy.hide$.subscribe(() => dynamicOverlay.hide());
    }
    subscribeOnDirectionChange() {
        this.directionService
            .onDirectionChange()
            .pipe(skip(1), takeUntil(this.destroy$))
            .subscribe(() => {
            this.dynamicOverlay.setPositionStrategy(this.createPositionStrategy());
        });
    }
    isContainerRerenderRequired() {
        return this.isContentUpdated() || this.isContextUpdated() || this.isPositionStrategyUpdateRequired();
    }
    isPositionStrategyUpdateRequired() {
        return this.isAdjustmentUpdated() || this.isPositionUpdated() || this.isOffsetUpdated() || this.isHostUpdated();
    }
    isTriggerStrategyUpdateRequired() {
        return this.isTriggerUpdated() || this.isHostUpdated();
    }
    isComponentTypeUpdateRequired() {
        return this.isComponentTypeUpdated();
    }
    isOverlayConfigUpdateRequired() {
        return this.isOverlayConfigUpdated();
    }
    isComponentTypeUpdated() {
        return this.changes.componentType && this.changes.componentType.isChanged();
    }
    isContentUpdated() {
        return this.changes.content && this.changes.content.isChanged();
    }
    isContextUpdated() {
        return this.changes.context && this.changes.context.isChanged();
    }
    isAdjustmentUpdated() {
        return this.changes.adjustment && this.changes.adjustment.isChanged();
    }
    isPositionUpdated() {
        return this.changes.position && this.changes.position.isChanged();
    }
    isHostUpdated() {
        return this.changes.host && this.changes.host.isChanged();
    }
    isTriggerUpdated() {
        return this.changes.trigger && this.changes.trigger.isChanged();
    }
    isOffsetUpdated() {
        return this.changes.offset && this.changes.offset.isChanged();
    }
    isOverlayConfigUpdated() {
        return this.changes.overlayConfig && this.changes.overlayConfig.isChanged();
    }
    isDisabledUpdated() {
        return this.changes.disabled && this.changes.disabled.isChanged();
    }
    clearChanges() {
        this.changes = {};
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbDynamicOverlayHandler, deps: [{ token: i1.NbPositionBuilderService }, { token: i2.NbTriggerStrategyBuilderService }, { token: i3.NbDynamicOverlay }, { token: i4.NbLayoutDirectionService }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbDynamicOverlayHandler }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbDynamicOverlayHandler, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: i1.NbPositionBuilderService }, { type: i2.NbTriggerStrategyBuilderService }, { type: i3.NbDynamicOverlay }, { type: i4.NbLayoutDirectionService }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pYy1vdmVybGF5LWhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvZnJhbWV3b3JrL3RoZW1lL2NvbXBvbmVudHMvY2RrL292ZXJsYXkvZHluYW1pYy9keW5hbWljLW92ZXJsYXktaGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWMsVUFBVSxFQUFFLFlBQVksRUFBUSxNQUFNLGVBQWUsQ0FBQztBQUMzRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFakQsT0FBTyxFQUFFLFNBQVMsRUFBc0QsTUFBTSxvQkFBb0IsQ0FBQztBQUNuRyxPQUFPLEVBRUwsWUFBWSxFQUNaLFVBQVUsR0FFWCxNQUFNLHFCQUFxQixDQUFDOzs7Ozs7QUFPN0IsTUFBTSxPQUFPLHNCQUF1QixTQUFRLFlBQVk7SUFDdEQsWUFBWSxhQUFrQixFQUFFLFlBQWlCLEVBQUUsY0FBdUIsS0FBSztRQUM3RSxLQUFLLENBQUMsYUFBYSxFQUFFLFlBQVksRUFBRSxXQUFXLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRUQsU0FBUztRQUNQLE9BQU8sSUFBSSxDQUFDLFlBQVksS0FBSyxJQUFJLENBQUMsYUFBYSxDQUFDO0lBQ2xELENBQUM7Q0FDRjtBQUdELE1BQU0sT0FBTyx1QkFBdUI7SUFxQmxDLFlBQ1UsZUFBeUMsRUFDekMsc0JBQXVELEVBQ3ZELHFCQUF1QyxFQUN2QyxnQkFBMEM7UUFIMUMsb0JBQWUsR0FBZixlQUFlLENBQTBCO1FBQ3pDLDJCQUFzQixHQUF0QixzQkFBc0IsQ0FBaUM7UUFDdkQsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUFrQjtRQUN2QyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQTBCO1FBdEIxQyxhQUFRLEdBQVcsRUFBRSxDQUFDO1FBRXRCLGFB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LE9BQU8sQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDcEUsQ0FBQztJQUVTLFlBQVk7UUFDcEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7SUFDcEIsQ0FBQzs4R0F6UVUsdUJBQXVCO2tIQUF2Qix1QkFBdUI7OzJGQUF2Qix1QkFBdUI7a0JBRG5DLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbGVtZW50UmVmLCBJbmplY3RhYmxlLCBTaW1wbGVDaGFuZ2UsIFR5cGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHNraXAsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgTmJUcmlnZ2VyLCBOYlRyaWdnZXJTdHJhdGVneSwgTmJUcmlnZ2VyU3RyYXRlZ3lCdWlsZGVyU2VydmljZSB9IGZyb20gJy4uL292ZXJsYXktdHJpZ2dlcic7XG5pbXBvcnQge1xuICBOYkFkanVzdGFibGVDb25uZWN0ZWRQb3NpdGlvblN0cmF0ZWd5LFxuICBOYkFkanVzdG1lbnQsXG4gIE5iUG9zaXRpb24sXG4gIE5iUG9zaXRpb25CdWlsZGVyU2VydmljZSxcbn0gZnJvbSAnLi4vb3ZlcmxheS1wb3NpdGlvbic7XG5pbXBvcnQgeyBOYlJlbmRlcmFibGVDb250YWluZXIgfSBmcm9tICcuLi9vdmVybGF5LWNvbnRhaW5lcic7XG5pbXBvcnQgeyBOYk92ZXJsYXlDb250ZW50IH0gZnJvbSAnLi4vb3ZlcmxheS1zZXJ2aWNlJztcbmltcG9ydCB7IE5iRHluYW1pY092ZXJsYXkgfSBmcm9tICcuL2R5bmFtaWMtb3ZlcmxheSc7XG5pbXBvcnQgeyBOYk92ZXJsYXlDb25maWcgfSBmcm9tICcuLi9tYXBwaW5nJztcbmltcG9ydCB7IE5iTGF5b3V0RGlyZWN0aW9uU2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uL3NlcnZpY2VzL2RpcmVjdGlvbi5zZXJ2aWNlJztcblxuZXhwb3J0IGNsYXNzIE5iRHluYW1pY092ZXJsYXlDaGFuZ2UgZXh0ZW5kcyBTaW1wbGVDaGFuZ2Uge1xuICBjb25zdHJ1Y3RvcihwcmV2aW91c1ZhbHVlOiBhbnksIGN1cnJlbnRWYWx1ZTogYW55LCBmaXJzdENoYW5nZTogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgc3VwZXIocHJldmlvdXNWYWx1ZSwgY3VycmVudFZhbHVlLCBmaXJzdENoYW5nZSk7XG4gIH1cblxuICBpc0NoYW5nZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudFZhbHVlICE9PSB0aGlzLnByZXZpb3VzVmFsdWU7XG4gIH1cbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE5iRHluYW1pY092ZXJsYXlIYW5kbGVyIHtcbiAgcHJvdGVjdGVkIF9jb21wb25lbnRUeXBlOiBUeXBlPE5iUmVuZGVyYWJsZUNvbnRhaW5lcj47XG4gIHByb3RlY3RlZCBfaG9zdDogRWxlbWVudFJlZjtcbiAgcHJvdGVjdGVkIF9jb250ZXh0OiBPYmplY3QgPSB7fTtcbiAgcHJvdGVjdGVkIF9jb250ZW50OiBOYk92ZXJsYXlDb250ZW50O1xuICBwcm90ZWN0ZWQgX3RyaWdnZXI6IE5iVHJpZ2dlciA9IE5iVHJpZ2dlci5OT09QO1xuICBwcm90ZWN0ZWQgX2Rpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG4gIHByb3RlY3RlZCBfcG9zaXRpb246IE5iUG9zaXRpb24gPSBOYlBvc2l0aW9uLlRPUDtcbiAgcHJvdGVjdGVkIF9hZGp1c3RtZW50OiBOYkFkanVzdG1lbnQgPSBOYkFkanVzdG1lbnQuTk9PUDtcbiAgcHJvdGVjdGVkIF9vZmZzZXQ6IG51bWJlciA9IDE1O1xuICBwcm90ZWN0ZWQgX292ZXJsYXlDb25maWc6IE5iT3ZlcmxheUNvbmZpZyA9IHt9O1xuXG4gIHByb3RlY3RlZCBkeW5hbWljT3ZlcmxheTogTmJEeW5hbWljT3ZlcmxheTtcbiAgcHJvdGVjdGVkIHRyaWdnZXJTdHJhdGVneTogTmJUcmlnZ2VyU3RyYXRlZ3k7XG5cbiAgcHJvdGVjdGVkIHBvc2l0aW9uU3RyYXRlZ3k6IE5iQWRqdXN0YWJsZUNvbm5lY3RlZFBvc2l0aW9uU3RyYXRlZ3k7XG5cbiAgcHJvdGVjdGVkIGNoYW5nZXM6IHsgW2tleTogc3RyaW5nXTogTmJEeW5hbWljT3ZlcmxheUNoYW5nZSB9ID0ge307XG5cbiAgcHJvdGVjdGVkIGRlc3Ryb3kkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHBvc2l0aW9uQnVpbGRlcjogTmJQb3NpdGlvbkJ1aWxkZXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgdHJpZ2dlclN0cmF0ZWd5QnVpbGRlcjogTmJUcmlnZ2VyU3RyYXRlZ3lCdWlsZGVyU2VydmljZSxcbiAgICBwcml2YXRlIGR5bmFtaWNPdmVybGF5U2VydmljZTogTmJEeW5hbWljT3ZlcmxheSxcbiAgICBwcml2YXRlIGRpcmVjdGlvblNlcnZpY2U6IE5iTGF5b3V0RGlyZWN0aW9uU2VydmljZSxcbiAgKSB7fVxuXG4gIGhvc3QoaG9zdDogRWxlbWVudFJlZikge1xuICAgIHRoaXMuY2hhbmdlcy5ob3N0ID0gbmV3IE5iRHluYW1pY092ZXJsYXlDaGFuZ2UodGhpcy5faG9zdCwgaG9zdCk7XG4gICAgdGhpcy5faG9zdCA9IGhvc3Q7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICB0cmlnZ2VyKHRyaWdnZXI6IE5iVHJpZ2dlcikge1xuICAgIHRoaXMuY2hhbmdlcy50cmlnZ2VyID0gbmV3IE5iRHluYW1pY092ZXJsYXlDaGFuZ2UodGhpcy5fdHJpZ2dlciwgdHJpZ2dlcik7XG4gICAgdGhpcy5fdHJpZ2dlciA9IHRyaWdnZXI7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBkaXNhYmxlZChkaXNhYmxlZDogYm9vbGVhbikge1xuICAgIHRoaXMuY2hhbmdlcy5kaXNhYmxlZCA9IG5ldyBOYkR5bmFtaWNPdmVybGF5Q2hhbmdlKHRoaXMuX2Rpc2FibGVkLCBkaXNhYmxlZCk7XG4gICAgdGhpcy5fZGlzYWJsZWQgPSBkaXNhYmxlZDtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHBvc2l0aW9uKHBvc2l0aW9uOiBOYlBvc2l0aW9uKSB7XG4gICAgdGhpcy5jaGFuZ2VzLnBvc2l0aW9uID0gbmV3IE5iRHluYW1pY092ZXJsYXlDaGFuZ2UodGhpcy5fcG9zaXRpb24sIHBvc2l0aW9uKTtcbiAgICB0aGlzLl9wb3NpdGlvbiA9IHBvc2l0aW9uO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgYWRqdXN0bWVudChhZGp1c3RtZW50OiBOYkFkanVzdG1lbnQpIHtcbiAgICB0aGlzLmNoYW5nZXMuYWRqdXN0bWVudCA9IG5ldyBOYkR5bmFtaWNPdmVybGF5Q2hhbmdlKHRoaXMuX2FkanVzdG1lbnQsIGFkanVzdG1lbnQpO1xuICAgIHRoaXMuX2FkanVzdG1lbnQgPSBhZGp1c3RtZW50O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgY29tcG9uZW50VHlwZShjb21wb25lbnRUeXBlOiBUeXBlPE5iUmVuZGVyYWJsZUNvbnRhaW5lcj4pIHtcbiAgICB0aGlzLmNoYW5nZXMuY29tcG9uZW50VHlwZSA9IG5ldyBOYkR5bmFtaWNPdmVybGF5Q2hhbmdlKHRoaXMuX2NvbXBvbmVudFR5cGUsIGNvbXBvbmVudFR5cGUpO1xuICAgIHRoaXMuX2NvbXBvbmVudFR5cGUgPSBjb21wb25lbnRUeXBlO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgY29udGVudChjb250ZW50OiBOYk92ZXJsYXlDb250ZW50KSB7XG4gICAgdGhpcy5jaGFuZ2VzLmNvbnRlbnQgPSBuZXcgTmJEeW5hbWljT3ZlcmxheUNoYW5nZSh0aGlzLl9jb250ZW50LCBjb250ZW50KTtcbiAgICB0aGlzLl9jb250ZW50ID0gY29udGVudDtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGNvbnRleHQoY29udGV4dDoge30pIHtcbiAgICB0aGlzLmNoYW5nZXMuY29udGV4dCA9IG5ldyBOYkR5bmFtaWNPdmVybGF5Q2hhbmdlKHRoaXMuX2NvbnRleHQsIGNvbnRleHQpO1xuICAgIHRoaXMuX2NvbnRleHQgPSBjb250ZXh0O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgb2Zmc2V0KG9mZnNldDogbnVtYmVyKSB7XG4gICAgdGhpcy5jaGFuZ2VzLm9mZnNldCA9IG5ldyBOYkR5bmFtaWNPdmVybGF5Q2hhbmdlKHRoaXMuX29mZnNldCwgb2Zmc2V0KTtcbiAgICB0aGlzLl9vZmZzZXQgPSBvZmZzZXQ7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBvdmVybGF5Q29uZmlnKG92ZXJsYXlDb25maWc6IE5iT3ZlcmxheUNvbmZpZykge1xuICAgIHRoaXMuY2hhbmdlcy5vdmVybGF5Q29uZmlnID0gbmV3IE5iRHluYW1pY092ZXJsYXlDaGFuZ2UodGhpcy5fb3ZlcmxheUNvbmZpZywgb3ZlcmxheUNvbmZpZyk7XG4gICAgdGhpcy5fb3ZlcmxheUNvbmZpZyA9IG92ZXJsYXlDb25maWc7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBidWlsZCgpIHtcbiAgICBpZiAoIXRoaXMuX2NvbXBvbmVudFR5cGUgfHwgIXRoaXMuX2hvc3QpIHtcbiAgICAgIHRocm93IEVycm9yKGBOYkR5bmFtaWNPdmVybGF5SGFuZGxlcjogYXQgbGVhc3QgJ2NvbXBvbmVudFR5cGUnIGFuZCAnaG9zdCcgc2hvdWxkIGJlXG4gICAgICBwYXNzZWQgYmVmb3JlIGJ1aWxkaW5nIGEgZHluYW1pYyBvdmVybGF5LmApO1xuICAgIH1cbiAgICB0aGlzLmR5bmFtaWNPdmVybGF5ID0gdGhpcy5keW5hbWljT3ZlcmxheVNlcnZpY2UuY3JlYXRlKFxuICAgICAgdGhpcy5fY29tcG9uZW50VHlwZSxcbiAgICAgIHRoaXMuX2NvbnRlbnQsXG4gICAgICB0aGlzLl9jb250ZXh0LFxuICAgICAgdGhpcy5jcmVhdGVQb3NpdGlvblN0cmF0ZWd5KCksXG4gICAgICB0aGlzLl9vdmVybGF5Q29uZmlnLFxuICAgICAgdGhpcy5fZGlzYWJsZWQsXG4gICAgKTtcblxuICAgIHRoaXMuY29ubmVjdCgpO1xuICAgIHRoaXMuY2xlYXJDaGFuZ2VzKCk7XG5cbiAgICByZXR1cm4gdGhpcy5keW5hbWljT3ZlcmxheTtcbiAgfVxuXG4gIHJlYnVpbGQoKSB7XG4gICAgLyoqXG4gICAgICogd2Ugc2hvdWxkIG5vdCB0aHJvdyBoZXJlXG4gICAgICogYXMgd2UgdXNlIHJlYnVpbHQgaW4gbGlmZWN5Y2xlIGhvb2tzXG4gICAgICogd2hpY2ggaXQgY291bGQgYmUgY2FsbGVkIGJlZm9yZSB0aGUgYnVpbGRcbiAgICAgKiBzbyB3ZSBqdXN0IGlnbm9yZSB0aGlzIGNhbGxcbiAgICAgKi9cbiAgICBpZiAoIXRoaXMuZHluYW1pY092ZXJsYXkpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaXNQb3NpdGlvblN0cmF0ZWd5VXBkYXRlUmVxdWlyZWQoKSkge1xuICAgICAgdGhpcy5keW5hbWljT3ZlcmxheS5zZXRQb3NpdGlvblN0cmF0ZWd5KHRoaXMuY3JlYXRlUG9zaXRpb25TdHJhdGVneSgpKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5pc1RyaWdnZXJTdHJhdGVneVVwZGF0ZVJlcXVpcmVkKCkpIHtcbiAgICAgIHRoaXMuY29ubmVjdCgpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmlzQ29udGFpbmVyUmVyZW5kZXJSZXF1aXJlZCgpKSB7XG4gICAgICB0aGlzLmR5bmFtaWNPdmVybGF5LnNldENvbnRlbnRBbmRDb250ZXh0KHRoaXMuX2NvbnRlbnQsIHRoaXMuX2NvbnRleHQpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmlzQ29tcG9uZW50VHlwZVVwZGF0ZVJlcXVpcmVkKCkpIHtcbiAgICAgIHRoaXMuZHluYW1pY092ZXJsYXkuc2V0Q29tcG9uZW50KHRoaXMuX2NvbXBvbmVudFR5cGUpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmlzT3ZlcmxheUNvbmZpZ1VwZGF0ZVJlcXVpcmVkKCkpIHtcbiAgICAgIHRoaXMuZHluYW1pY092ZXJsYXkuc2V0T3ZlcmxheUNvbmZpZyh0aGlzLl9vdmVybGF5Q29uZmlnKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5pc0Rpc2FibGVkVXBkYXRlZCgpKSB7XG4gICAgICB0aGlzLmR5bmFtaWNPdmVybGF5LnNldERpc2FibGVkKHRoaXMuX2Rpc2FibGVkKTtcbiAgICB9XG5cbiAgICB0aGlzLmNsZWFyQ2hhbmdlcygpO1xuICAgIHJldHVybiB0aGlzLmR5bmFtaWNPdmVybGF5O1xuICB9XG5cbiAgY29ubmVjdCgpIHtcbiAgICBpZiAoIXRoaXMuZHluYW1pY092ZXJsYXkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgTmJEeW5hbWljT3ZlcmxheUhhbmRsZXI6IGNhbm5vdCBjb25uZWN0IHRvIER5bmFtaWNPdmVybGF5XG4gICAgICBhcyBpdCBpcyBub3QgY3JlYXRlZCB5ZXQuIENhbGwgYnVpbGQoKSBmaXJzdGApO1xuICAgIH1cbiAgICB0aGlzLmRpc2Nvbm5lY3QoKTtcbiAgICB0aGlzLnN1YnNjcmliZU9uVHJpZ2dlcnModGhpcy5keW5hbWljT3ZlcmxheSk7XG4gICAgdGhpcy5zdWJzY3JpYmVPbkRpcmVjdGlvbkNoYW5nZSgpO1xuICB9XG5cbiAgZGlzY29ubmVjdCgpIHtcbiAgICBpZiAodGhpcy50cmlnZ2VyU3RyYXRlZ3kpIHtcbiAgICAgIHRoaXMudHJpZ2dlclN0cmF0ZWd5LmRlc3Ryb3koKTtcbiAgICB9XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHRoaXMuZGVzdHJveSQubmV4dCgpO1xuICAgIHRoaXMuZGVzdHJveSQuY29tcGxldGUoKTtcblxuICAgIHRoaXMuZGlzY29ubmVjdCgpO1xuICAgIHRoaXMuY2xlYXJDaGFuZ2VzKCk7XG4gICAgaWYgKHRoaXMuZHluYW1pY092ZXJsYXkpIHtcbiAgICAgIHRoaXMuZHluYW1pY092ZXJsYXkuZGlzcG9zZSgpO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBjcmVhdGVQb3NpdGlvblN0cmF0ZWd5KCkge1xuICAgIHJldHVybiB0aGlzLnBvc2l0aW9uQnVpbGRlclxuICAgICAgLmNvbm5lY3RlZFRvKHRoaXMuX2hvc3QpXG4gICAgICAucG9zaXRpb24odGhpcy5fcG9zaXRpb24pXG4gICAgICAuYWRqdXN0bWVudCh0aGlzLl9hZGp1c3RtZW50KVxuICAgICAgLm9mZnNldCh0aGlzLl9vZmZzZXQpXG4gICAgICAuZGlyZWN0aW9uKHRoaXMuZGlyZWN0aW9uU2VydmljZS5nZXREaXJlY3Rpb24oKSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgc3Vic2NyaWJlT25UcmlnZ2VycyhkeW5hbWljT3ZlcmxheTogTmJEeW5hbWljT3ZlcmxheSkge1xuICAgIHRoaXMudHJpZ2dlclN0cmF0ZWd5ID0gdGhpcy50cmlnZ2VyU3RyYXRlZ3lCdWlsZGVyXG4gICAgICAudHJpZ2dlcih0aGlzLl90cmlnZ2VyKVxuICAgICAgLmhvc3QodGhpcy5faG9zdC5uYXRpdmVFbGVtZW50KVxuICAgICAgLmNvbnRhaW5lcigoKSA9PiBkeW5hbWljT3ZlcmxheS5nZXRDb250YWluZXIoKSlcbiAgICAgIC5idWlsZCgpO1xuXG4gICAgdGhpcy50cmlnZ2VyU3RyYXRlZ3kuc2hvdyQuc3Vic2NyaWJlKCgpID0+IGR5bmFtaWNPdmVybGF5LnNob3coKSk7XG4gICAgdGhpcy50cmlnZ2VyU3RyYXRlZ3kuaGlkZSQuc3Vic2NyaWJlKCgpID0+IGR5bmFtaWNPdmVybGF5LmhpZGUoKSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgc3Vic2NyaWJlT25EaXJlY3Rpb25DaGFuZ2UoKSB7XG4gICAgdGhpcy5kaXJlY3Rpb25TZXJ2aWNlXG4gICAgICAub25EaXJlY3Rpb25DaGFuZ2UoKVxuICAgICAgLnBpcGUoc2tpcCgxKSwgdGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuZHluYW1pY092ZXJsYXkuc2V0UG9zaXRpb25TdHJhdGVneSh0aGlzLmNyZWF0ZVBvc2l0aW9uU3RyYXRlZ3koKSk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHByb3RlY3RlZCBpc0NvbnRhaW5lclJlcmVuZGVyUmVxdWlyZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNDb250ZW50VXBkYXRlZCgpIHx8IHRoaXMuaXNDb250ZXh0VXBkYXRlZCgpIHx8IHRoaXMuaXNQb3NpdGlvblN0cmF0ZWd5VXBkYXRlUmVxdWlyZWQoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBpc1Bvc2l0aW9uU3RyYXRlZ3lVcGRhdGVSZXF1aXJlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5pc0FkanVzdG1lbnRVcGRhdGVkKCkgfHwgdGhpcy5pc1Bvc2l0aW9uVXBkYXRlZCgpIHx8IHRoaXMuaXNPZmZzZXRVcGRhdGVkKCkgfHwgdGhpcy5pc0hvc3RVcGRhdGVkKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgaXNUcmlnZ2VyU3RyYXRlZ3lVcGRhdGVSZXF1aXJlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5pc1RyaWdnZXJVcGRhdGVkKCkgfHwgdGhpcy5pc0hvc3RVcGRhdGVkKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgaXNDb21wb25lbnRUeXBlVXBkYXRlUmVxdWlyZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuaXNDb21wb25lbnRUeXBlVXBkYXRlZCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBpc092ZXJsYXlDb25maWdVcGRhdGVSZXF1aXJlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5pc092ZXJsYXlDb25maWdVcGRhdGVkKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgaXNDb21wb25lbnRUeXBlVXBkYXRlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5jaGFuZ2VzLmNvbXBvbmVudFR5cGUgJiYgdGhpcy5jaGFuZ2VzLmNvbXBvbmVudFR5cGUuaXNDaGFuZ2VkKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgaXNDb250ZW50VXBkYXRlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5jaGFuZ2VzLmNvbnRlbnQgJiYgdGhpcy5jaGFuZ2VzLmNvbnRlbnQuaXNDaGFuZ2VkKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgaXNDb250ZXh0VXBkYXRlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5jaGFuZ2VzLmNvbnRleHQgJiYgdGhpcy5jaGFuZ2VzLmNvbnRleHQuaXNDaGFuZ2VkKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgaXNBZGp1c3RtZW50VXBkYXRlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5jaGFuZ2VzLmFkanVzdG1lbnQgJiYgdGhpcy5jaGFuZ2VzLmFkanVzdG1lbnQuaXNDaGFuZ2VkKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgaXNQb3NpdGlvblVwZGF0ZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuY2hhbmdlcy5wb3NpdGlvbiAmJiB0aGlzLmNoYW5nZXMucG9zaXRpb24uaXNDaGFuZ2VkKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgaXNIb3N0VXBkYXRlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5jaGFuZ2VzLmhvc3QgJiYgdGhpcy5jaGFuZ2VzLmhvc3QuaXNDaGFuZ2VkKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgaXNUcmlnZ2VyVXBkYXRlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5jaGFuZ2VzLnRyaWdnZXIgJiYgdGhpcy5jaGFuZ2VzLnRyaWdnZXIuaXNDaGFuZ2VkKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgaXNPZmZzZXRVcGRhdGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmNoYW5nZXMub2Zmc2V0ICYmIHRoaXMuY2hhbmdlcy5vZmZzZXQuaXNDaGFuZ2VkKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgaXNPdmVybGF5Q29uZmlnVXBkYXRlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5jaGFuZ2VzLm92ZXJsYXlDb25maWcgJiYgdGhpcy5jaGFuZ2VzLm92ZXJsYXlDb25maWcuaXNDaGFuZ2VkKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgaXNEaXNhYmxlZFVwZGF0ZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuY2hhbmdlcy5kaXNhYmxlZCAmJiB0aGlzLmNoYW5nZXMuZGlzYWJsZWQuaXNDaGFuZ2VkKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgY2xlYXJDaGFuZ2VzKCkge1xuICAgIHRoaXMuY2hhbmdlcyA9IHt9O1xuICB9XG59XG4iXX0=