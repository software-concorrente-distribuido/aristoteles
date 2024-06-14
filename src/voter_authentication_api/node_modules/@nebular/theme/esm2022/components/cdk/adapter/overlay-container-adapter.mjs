import { Injectable } from '@angular/core';
import { NbOverlayContainer } from '../overlay/mapping';
import * as i0 from "@angular/core";
function throwLayoutNotFoundError() {
    throw new Error(`[NbOverlayContainerAdapter]: Layout not found.
  When using Nebular '<nb-layout>' is required and should wrap other nebular components.`);
}
/**
 * Provides nb-layout as overlay container.
 * Container has to be cleared when layout destroys.
 * Another way previous version of the container will be used
 * but it isn't inserted in DOM and exists in memory only.
 * This case important only if you switch between multiple layouts.
 * */
export class NbOverlayContainerAdapter extends NbOverlayContainer {
    setContainer(container) {
        this.container = container;
    }
    clearContainer() {
        this.container = null;
        this._containerElement = null;
    }
    _createContainer() {
        this.checkContainer();
        const container = this._document.createElement('div');
        container.classList.add('cdk-overlay-container');
        this.container.appendChild(container);
        this._containerElement = container;
    }
    checkContainer() {
        if (!this.container) {
            throwLayoutNotFoundError();
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbOverlayContainerAdapter, deps: null, target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbOverlayContainerAdapter }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbOverlayContainerAdapter, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcmxheS1jb250YWluZXItYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9mcmFtZXdvcmsvdGhlbWUvY29tcG9uZW50cy9jZGsvYWRhcHRlci9vdmVybGF5LWNvbnRhaW5lci1hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7O0FBRXhELFNBQVMsd0JBQXdCO0lBQy9CLE1BQU0sSUFBSSxLQUFLLENBQUM7eUZBQ3VFLENBQUMsQ0FBQztBQUMzRixDQUFDO0FBRUQ7Ozs7OztLQU1LO0FBRUwsTUFBTSxPQUFPLHlCQUEwQixTQUFRLGtCQUFrQjtJQUcvRCxZQUFZLENBQUMsU0FBc0I7UUFDakMsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7SUFDN0IsQ0FBQztJQUVELGNBQWM7UUFDWixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN0QixJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDO0lBQ2hDLENBQUM7SUFFUyxnQkFBZ0I7UUFDeEIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBRXRCLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3RELFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdEMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLFNBQVMsQ0FBQztJQUNyQyxDQUFDO0lBRVMsY0FBYztRQUN0QixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ3BCLHdCQUF3QixFQUFFLENBQUM7UUFDN0IsQ0FBQztJQUNILENBQUM7OEdBekJVLHlCQUF5QjtrSEFBekIseUJBQXlCOzsyRkFBekIseUJBQXlCO2tCQURyQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOYk92ZXJsYXlDb250YWluZXIgfSBmcm9tICcuLi9vdmVybGF5L21hcHBpbmcnO1xuXG5mdW5jdGlvbiB0aHJvd0xheW91dE5vdEZvdW5kRXJyb3IoKTogdm9pZCB7XG4gIHRocm93IG5ldyBFcnJvcihgW05iT3ZlcmxheUNvbnRhaW5lckFkYXB0ZXJdOiBMYXlvdXQgbm90IGZvdW5kLlxuICBXaGVuIHVzaW5nIE5lYnVsYXIgJzxuYi1sYXlvdXQ+JyBpcyByZXF1aXJlZCBhbmQgc2hvdWxkIHdyYXAgb3RoZXIgbmVidWxhciBjb21wb25lbnRzLmApO1xufVxuXG4vKipcbiAqIFByb3ZpZGVzIG5iLWxheW91dCBhcyBvdmVybGF5IGNvbnRhaW5lci5cbiAqIENvbnRhaW5lciBoYXMgdG8gYmUgY2xlYXJlZCB3aGVuIGxheW91dCBkZXN0cm95cy5cbiAqIEFub3RoZXIgd2F5IHByZXZpb3VzIHZlcnNpb24gb2YgdGhlIGNvbnRhaW5lciB3aWxsIGJlIHVzZWRcbiAqIGJ1dCBpdCBpc24ndCBpbnNlcnRlZCBpbiBET00gYW5kIGV4aXN0cyBpbiBtZW1vcnkgb25seS5cbiAqIFRoaXMgY2FzZSBpbXBvcnRhbnQgb25seSBpZiB5b3Ugc3dpdGNoIGJldHdlZW4gbXVsdGlwbGUgbGF5b3V0cy5cbiAqICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTmJPdmVybGF5Q29udGFpbmVyQWRhcHRlciBleHRlbmRzIE5iT3ZlcmxheUNvbnRhaW5lciB7XG4gIHByb3RlY3RlZCBjb250YWluZXI6IEhUTUxFbGVtZW50O1xuXG4gIHNldENvbnRhaW5lcihjb250YWluZXI6IEhUTUxFbGVtZW50KSB7XG4gICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXI7XG4gIH1cblxuICBjbGVhckNvbnRhaW5lcigpIHtcbiAgICB0aGlzLmNvbnRhaW5lciA9IG51bGw7XG4gICAgdGhpcy5fY29udGFpbmVyRWxlbWVudCA9IG51bGw7XG4gIH1cblxuICBwcm90ZWN0ZWQgX2NyZWF0ZUNvbnRhaW5lcigpOiB2b2lkIHtcbiAgICB0aGlzLmNoZWNrQ29udGFpbmVyKCk7XG5cbiAgICBjb25zdCBjb250YWluZXIgPSB0aGlzLl9kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZCgnY2RrLW92ZXJsYXktY29udGFpbmVyJyk7XG4gICAgdGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQoY29udGFpbmVyKTtcbiAgICB0aGlzLl9jb250YWluZXJFbGVtZW50ID0gY29udGFpbmVyO1xuICB9XG5cbiAgcHJvdGVjdGVkIGNoZWNrQ29udGFpbmVyKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5jb250YWluZXIpIHtcbiAgICAgIHRocm93TGF5b3V0Tm90Rm91bmRFcnJvcigpO1xuICAgIH1cbiAgfVxufVxuIl19