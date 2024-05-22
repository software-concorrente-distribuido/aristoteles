/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { NgModule } from '@angular/core';
import { NbSharedModule } from '../shared/shared.module';
import { NbSpinnerComponent } from './spinner.component';
import { NbSpinnerDirective } from './spinner.directive';
import * as i0 from "@angular/core";
export class NbSpinnerModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbSpinnerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.1.0", ngImport: i0, type: NbSpinnerModule, declarations: [NbSpinnerComponent, NbSpinnerDirective], imports: [NbSharedModule], exports: [NbSpinnerComponent, NbSpinnerDirective] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbSpinnerModule, imports: [NbSharedModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbSpinnerModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        NbSharedModule,
                    ],
                    exports: [NbSpinnerComponent, NbSpinnerDirective],
                    declarations: [NbSpinnerComponent, NbSpinnerDirective],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Bpbm5lci5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvZnJhbWV3b3JrL3RoZW1lL2NvbXBvbmVudHMvc3Bpbm5lci9zcGlubmVyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDekQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDekQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0scUJBQXFCLENBQUM7O0FBVXpELE1BQU0sT0FBTyxlQUFlOzhHQUFmLGVBQWU7K0dBQWYsZUFBZSxpQkFGWCxrQkFBa0IsRUFBRSxrQkFBa0IsYUFIbkQsY0FBYyxhQUVOLGtCQUFrQixFQUFFLGtCQUFrQjsrR0FHckMsZUFBZSxZQUx4QixjQUFjOzsyRkFLTCxlQUFlO2tCQVAzQixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxjQUFjO3FCQUNmO29CQUNELE9BQU8sRUFBRSxDQUFDLGtCQUFrQixFQUFFLGtCQUFrQixDQUFDO29CQUNqRCxZQUFZLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxrQkFBa0IsQ0FBQztpQkFDdkQiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgQWt2ZW8uIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICovXG5cbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOYlNoYXJlZE1vZHVsZSB9IGZyb20gJy4uL3NoYXJlZC9zaGFyZWQubW9kdWxlJztcbmltcG9ydCB7IE5iU3Bpbm5lckNvbXBvbmVudCB9IGZyb20gJy4vc3Bpbm5lci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTmJTcGlubmVyRGlyZWN0aXZlIH0gZnJvbSAnLi9zcGlubmVyLmRpcmVjdGl2ZSc7XG5cblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIE5iU2hhcmVkTW9kdWxlLFxuICBdLFxuICBleHBvcnRzOiBbTmJTcGlubmVyQ29tcG9uZW50LCBOYlNwaW5uZXJEaXJlY3RpdmVdLFxuICBkZWNsYXJhdGlvbnM6IFtOYlNwaW5uZXJDb21wb25lbnQsIE5iU3Bpbm5lckRpcmVjdGl2ZV0sXG59KVxuZXhwb3J0IGNsYXNzIE5iU3Bpbm5lck1vZHVsZSB7fVxuIl19