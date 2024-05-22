/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbOverlayModule } from '../cdk/overlay/overlay.module';
import { NbContextMenuDirective } from './context-menu.directive';
import { NbContextMenuComponent } from './context-menu.component';
import { NbMenuModule } from '../menu/menu.module';
import * as i0 from "@angular/core";
export class NbContextMenuModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbContextMenuModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.1.0", ngImport: i0, type: NbContextMenuModule, declarations: [NbContextMenuDirective, NbContextMenuComponent], imports: [CommonModule, NbOverlayModule, NbMenuModule], exports: [NbContextMenuDirective] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbContextMenuModule, imports: [CommonModule, NbOverlayModule, NbMenuModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbContextMenuModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, NbOverlayModule, NbMenuModule],
                    exports: [NbContextMenuDirective],
                    declarations: [NbContextMenuDirective, NbContextMenuComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC1tZW51Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9mcmFtZXdvcmsvdGhlbWUvY29tcG9uZW50cy9jb250ZXh0LW1lbnUvY29udGV4dC1tZW51Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFL0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7QUFRbkQsTUFBTSxPQUFPLG1CQUFtQjs4R0FBbkIsbUJBQW1COytHQUFuQixtQkFBbUIsaUJBRmYsc0JBQXNCLEVBQUUsc0JBQXNCLGFBRm5ELFlBQVksRUFBRSxlQUFlLEVBQUUsWUFBWSxhQUMzQyxzQkFBc0I7K0dBR3JCLG1CQUFtQixZQUpwQixZQUFZLEVBQUUsZUFBZSxFQUFFLFlBQVk7OzJGQUkxQyxtQkFBbUI7a0JBTC9CLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGVBQWUsRUFBRSxZQUFZLENBQUM7b0JBQ3RELE9BQU8sRUFBRSxDQUFDLHNCQUFzQixDQUFDO29CQUNqQyxZQUFZLEVBQUUsQ0FBQyxzQkFBc0IsRUFBRSxzQkFBc0IsQ0FBQztpQkFDL0QiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgQWt2ZW8uIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICovXG5cbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5pbXBvcnQgeyBOYk92ZXJsYXlNb2R1bGUgfSBmcm9tICcuLi9jZGsvb3ZlcmxheS9vdmVybGF5Lm1vZHVsZSc7XG5pbXBvcnQgeyBOYkNvbnRleHRNZW51RGlyZWN0aXZlIH0gZnJvbSAnLi9jb250ZXh0LW1lbnUuZGlyZWN0aXZlJztcbmltcG9ydCB7IE5iQ29udGV4dE1lbnVDb21wb25lbnQgfSBmcm9tICcuL2NvbnRleHQtbWVudS5jb21wb25lbnQnO1xuaW1wb3J0IHsgTmJNZW51TW9kdWxlIH0gZnJvbSAnLi4vbWVudS9tZW51Lm1vZHVsZSc7XG5cblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgTmJPdmVybGF5TW9kdWxlLCBOYk1lbnVNb2R1bGVdLFxuICBleHBvcnRzOiBbTmJDb250ZXh0TWVudURpcmVjdGl2ZV0sXG4gIGRlY2xhcmF0aW9uczogW05iQ29udGV4dE1lbnVEaXJlY3RpdmUsIE5iQ29udGV4dE1lbnVDb21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBOYkNvbnRleHRNZW51TW9kdWxlIHtcbn1cbiJdfQ==