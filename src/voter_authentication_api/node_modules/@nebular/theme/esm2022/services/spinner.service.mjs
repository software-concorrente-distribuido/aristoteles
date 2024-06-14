/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Injectable, Inject } from '@angular/core';
import { NB_DOCUMENT } from '../theme.options';
import * as i0 from "@angular/core";
/**
 * Service to control the global page spinner.
 */
export class NbSpinnerService {
    constructor(document) {
        this.document = document;
        this.loaders = [];
        this.selector = 'nb-global-spinner';
    }
    /**
     * Appends new loader to the list of loader to be completed before
     * spinner will be hidden
     * @param method Promise<any>
     */
    registerLoader(method) {
        this.loaders.push(method);
    }
    /**
     * Clears the list of loader
     */
    clear() {
        this.loaders = [];
    }
    /**
     * Start the loader process, show spinnder and execute loaders
     */
    load() {
        this.showSpinner();
        this.executeAll();
    }
    executeAll(done = (values) => { }) {
        Promise.all(this.loaders).then((values) => {
            this.hideSpinner();
            done.call(null, values);
        })
            .catch((error) => {
            // TODO: Promise.reject
            console.error(error);
        });
    }
    // TODO is there any better way of doing this?
    showSpinner() {
        const el = this.getSpinnerElement();
        if (el) {
            el.style['display'] = 'block';
        }
    }
    hideSpinner() {
        const el = this.getSpinnerElement();
        if (el) {
            el.style['display'] = 'none';
        }
    }
    getSpinnerElement() {
        return this.document.getElementById(this.selector);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbSpinnerService, deps: [{ token: NB_DOCUMENT }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbSpinnerService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbSpinnerService, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [NB_DOCUMENT]
                }] }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Bpbm5lci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2ZyYW1ld29yay90aGVtZS9zZXJ2aWNlcy9zcGlubmVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUNILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQzs7QUFFL0M7O0dBRUc7QUFFSCxNQUFNLE9BQU8sZ0JBQWdCO0lBSzNCLFlBQXlDLFFBQVE7UUFBUixhQUFRLEdBQVIsUUFBUSxDQUFBO1FBSHpDLFlBQU8sR0FBbUIsRUFBRSxDQUFDO1FBQzdCLGFBQVEsR0FBVyxtQkFBbUIsQ0FBQztJQUVLLENBQUM7SUFFckQ7Ozs7T0FJRztJQUNILGNBQWMsQ0FBQyxNQUFvQjtRQUNqQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBRUQ7O09BRUc7SUFDSCxLQUFLO1FBQ0gsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsSUFBSTtRQUNGLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVPLFVBQVUsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxNQUFNLEVBQUUsRUFBRSxHQUFFLENBQUM7UUFDdEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDeEMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ25CLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzFCLENBQUMsQ0FBQzthQUNDLEtBQUssQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ2YsdUJBQXVCO1lBQ3ZCLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdkIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsOENBQThDO0lBQ3RDLFdBQVc7UUFDakIsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDcEMsSUFBSSxFQUFFLEVBQUUsQ0FBQztZQUNQLEVBQUUsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsT0FBTyxDQUFDO1FBQ2hDLENBQUM7SUFDSCxDQUFDO0lBRU8sV0FBVztRQUNqQixNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUNwQyxJQUFJLEVBQUUsRUFBRSxDQUFDO1lBQ1AsRUFBRSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxNQUFNLENBQUM7UUFDL0IsQ0FBQztJQUNILENBQUM7SUFFTyxpQkFBaUI7UUFDdkIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDckQsQ0FBQzs4R0EzRFUsZ0JBQWdCLGtCQUtQLFdBQVc7a0hBTHBCLGdCQUFnQjs7MkZBQWhCLGdCQUFnQjtrQkFENUIsVUFBVTs7MEJBTUksTUFBTTsyQkFBQyxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEFrdmVvLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqL1xuaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOQl9ET0NVTUVOVCB9IGZyb20gJy4uL3RoZW1lLm9wdGlvbnMnO1xuXG4vKipcbiAqIFNlcnZpY2UgdG8gY29udHJvbCB0aGUgZ2xvYmFsIHBhZ2Ugc3Bpbm5lci5cbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE5iU3Bpbm5lclNlcnZpY2Uge1xuXG4gIHByaXZhdGUgbG9hZGVyczogUHJvbWlzZTxhbnk+W10gPSBbXTtcbiAgcHJpdmF0ZSBzZWxlY3Rvcjogc3RyaW5nID0gJ25iLWdsb2JhbC1zcGlubmVyJztcblxuICBjb25zdHJ1Y3RvcihASW5qZWN0KE5CX0RPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50KSB7fVxuXG4gIC8qKlxuICAgKiBBcHBlbmRzIG5ldyBsb2FkZXIgdG8gdGhlIGxpc3Qgb2YgbG9hZGVyIHRvIGJlIGNvbXBsZXRlZCBiZWZvcmVcbiAgICogc3Bpbm5lciB3aWxsIGJlIGhpZGRlblxuICAgKiBAcGFyYW0gbWV0aG9kIFByb21pc2U8YW55PlxuICAgKi9cbiAgcmVnaXN0ZXJMb2FkZXIobWV0aG9kOiBQcm9taXNlPGFueT4pOiB2b2lkIHtcbiAgICB0aGlzLmxvYWRlcnMucHVzaChtZXRob2QpO1xuICB9XG5cbiAgLyoqXG4gICAqIENsZWFycyB0aGUgbGlzdCBvZiBsb2FkZXJcbiAgICovXG4gIGNsZWFyKCk6IHZvaWQge1xuICAgIHRoaXMubG9hZGVycyA9IFtdO1xuICB9XG5cbiAgLyoqXG4gICAqIFN0YXJ0IHRoZSBsb2FkZXIgcHJvY2Vzcywgc2hvdyBzcGlubmRlciBhbmQgZXhlY3V0ZSBsb2FkZXJzXG4gICAqL1xuICBsb2FkKCk6IHZvaWQge1xuICAgIHRoaXMuc2hvd1NwaW5uZXIoKTtcbiAgICB0aGlzLmV4ZWN1dGVBbGwoKTtcbiAgfVxuXG4gIHByaXZhdGUgZXhlY3V0ZUFsbChkb25lID0gKHZhbHVlcykgPT4ge30pOiB2b2lkIHtcbiAgICBQcm9taXNlLmFsbCh0aGlzLmxvYWRlcnMpLnRoZW4oKHZhbHVlcykgPT4ge1xuICAgICAgdGhpcy5oaWRlU3Bpbm5lcigpO1xuICAgICAgZG9uZS5jYWxsKG51bGwsIHZhbHVlcyk7XG4gICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgLy8gVE9ETzogUHJvbWlzZS5yZWplY3RcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICB9KTtcbiAgfVxuXG4gIC8vIFRPRE8gaXMgdGhlcmUgYW55IGJldHRlciB3YXkgb2YgZG9pbmcgdGhpcz9cbiAgcHJpdmF0ZSBzaG93U3Bpbm5lcigpOiB2b2lkIHtcbiAgICBjb25zdCBlbCA9IHRoaXMuZ2V0U3Bpbm5lckVsZW1lbnQoKTtcbiAgICBpZiAoZWwpIHtcbiAgICAgIGVsLnN0eWxlWydkaXNwbGF5J10gPSAnYmxvY2snO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgaGlkZVNwaW5uZXIoKTogdm9pZCB7XG4gICAgY29uc3QgZWwgPSB0aGlzLmdldFNwaW5uZXJFbGVtZW50KCk7XG4gICAgaWYgKGVsKSB7XG4gICAgICBlbC5zdHlsZVsnZGlzcGxheSddID0gJ25vbmUnO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0U3Bpbm5lckVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5zZWxlY3Rvcik7XG4gIH1cbn1cbiJdfQ==