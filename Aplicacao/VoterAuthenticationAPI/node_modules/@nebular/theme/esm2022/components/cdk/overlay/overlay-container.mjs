import { Component, ComponentFactoryResolver, HostBinding, Input, ViewChild, } from '@angular/core';
import { NbPosition } from './overlay-position';
import { NbPortalInjector, NbPortalOutletDirective } from './mapping';
import * as i0 from "@angular/core";
import * as i1 from "./mapping";
import * as i2 from "@angular/common";
export class NbPositionedContainerComponent {
    get top() {
        return this.position === NbPosition.TOP;
    }
    get topStart() {
        return this.position === NbPosition.TOP_START;
    }
    get topEnd() {
        return this.position === NbPosition.TOP_END;
    }
    get right() {
        return this.position === NbPosition.RIGHT || this.position === NbPosition.END;
    }
    get endTop() {
        return this.position === NbPosition.END_TOP;
    }
    get endBottom() {
        return this.position === NbPosition.END_BOTTOM;
    }
    get bottom() {
        return this.position === NbPosition.BOTTOM;
    }
    get bottomStart() {
        return this.position === NbPosition.BOTTOM_START;
    }
    get bottomEnd() {
        return this.position === NbPosition.BOTTOM_END;
    }
    get left() {
        return this.position === NbPosition.LEFT || this.position === NbPosition.START;
    }
    get startTop() {
        return this.position === NbPosition.START_TOP;
    }
    get startBottom() {
        return this.position === NbPosition.START_BOTTOM;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbPositionedContainerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.1.0", type: NbPositionedContainerComponent, selector: "ng-component", inputs: { position: "position" }, host: { properties: { "class.nb-overlay-top": "this.top", "class.nb-overlay-top-start": "this.topStart", "class.nb-overlay-top-end": "this.topEnd", "class.nb-overlay-right": "this.right", "class.nb-overlay-end-top": "this.endTop", "class.nb-overlay-end-bottom": "this.endBottom", "class.nb-overlay-bottom": "this.bottom", "class.nb-overlay-bottom-start": "this.bottomStart", "class.nb-overlay-bottom-end": "this.bottomEnd", "class.nb-overlay-left": "this.left", "class.nb-overlay-start-top": "this.startTop", "class.nb-overlay-start-bottom": "this.startBottom" } }, ngImport: i0, template: '', isInline: true }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbPositionedContainerComponent, decorators: [{
            type: Component,
            args: [{
                    template: '',
                }]
        }], propDecorators: { position: [{
                type: Input
            }], top: [{
                type: HostBinding,
                args: ['class.nb-overlay-top']
            }], topStart: [{
                type: HostBinding,
                args: ['class.nb-overlay-top-start']
            }], topEnd: [{
                type: HostBinding,
                args: ['class.nb-overlay-top-end']
            }], right: [{
                type: HostBinding,
                args: ['class.nb-overlay-right']
            }], endTop: [{
                type: HostBinding,
                args: ['class.nb-overlay-end-top']
            }], endBottom: [{
                type: HostBinding,
                args: ['class.nb-overlay-end-bottom']
            }], bottom: [{
                type: HostBinding,
                args: ['class.nb-overlay-bottom']
            }], bottomStart: [{
                type: HostBinding,
                args: ['class.nb-overlay-bottom-start']
            }], bottomEnd: [{
                type: HostBinding,
                args: ['class.nb-overlay-bottom-end']
            }], left: [{
                type: HostBinding,
                args: ['class.nb-overlay-left']
            }], startTop: [{
                type: HostBinding,
                args: ['class.nb-overlay-start-top']
            }], startBottom: [{
                type: HostBinding,
                args: ['class.nb-overlay-start-bottom']
            }] } });
export class NbOverlayContainerComponent {
    constructor(vcr, injector, changeDetectorRef) {
        this.vcr = vcr;
        this.injector = injector;
        this.changeDetectorRef = changeDetectorRef;
        this.isAttached = false;
    }
    get isStringContent() {
        return !!this.content;
    }
    attachComponentPortal(portal, context) {
        portal.injector = this.createChildInjector(portal.componentFactoryResolver);
        const componentRef = this.portalOutlet.attachComponentPortal(portal);
        if (context) {
            Object.assign(componentRef.instance, context);
        }
        componentRef.changeDetectorRef.markForCheck();
        componentRef.changeDetectorRef.detectChanges();
        this.isAttached = true;
        return componentRef;
    }
    attachTemplatePortal(portal) {
        const templateRef = this.portalOutlet.attachTemplatePortal(portal);
        templateRef.detectChanges();
        this.isAttached = true;
        return templateRef;
    }
    attachStringContent(content) {
        this.content = content;
        this.changeDetectorRef.markForCheck();
        this.changeDetectorRef.detectChanges();
        this.isAttached = true;
    }
    detach() {
        if (this.portalOutlet.hasAttached()) {
            this.portalOutlet.detach();
        }
        this.attachStringContent(null);
        this.isAttached = false;
    }
    createChildInjector(cfr) {
        return new NbPortalInjector(this.injector, new WeakMap([
            [ComponentFactoryResolver, cfr],
        ]));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbOverlayContainerComponent, deps: [{ token: i0.ViewContainerRef }, { token: i0.Injector }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.1.0", type: NbOverlayContainerComponent, selector: "nb-overlay-container", viewQueries: [{ propertyName: "portalOutlet", first: true, predicate: NbPortalOutletDirective, descendants: true, static: true }], ngImport: i0, template: `
    <div *ngIf="isStringContent" class="primitive-overlay">{{ content }}</div>
    <ng-template nbPortalOutlet></ng-template>
  `, isInline: true, dependencies: [{ kind: "directive", type: i1.NbPortalOutletDirective, selector: "[nbPortalOutlet]" }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbOverlayContainerComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nb-overlay-container',
                    template: `
    <div *ngIf="isStringContent" class="primitive-overlay">{{ content }}</div>
    <ng-template nbPortalOutlet></ng-template>
  `,
                }]
        }], ctorParameters: () => [{ type: i0.ViewContainerRef }, { type: i0.Injector }, { type: i0.ChangeDetectorRef }], propDecorators: { portalOutlet: [{
                type: ViewChild,
                args: [NbPortalOutletDirective, { static: true }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcmxheS1jb250YWluZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvZnJhbWV3b3JrL3RoZW1lL2NvbXBvbmVudHMvY2RrL292ZXJsYXkvb3ZlcmxheS1jb250YWluZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUVMLFNBQVMsRUFDVCx3QkFBd0IsRUFHeEIsV0FBVyxFQUVYLEtBQUssRUFDTCxTQUFTLEdBRVYsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2hELE9BQU8sRUFBcUIsZ0JBQWdCLEVBQUUsdUJBQXVCLEVBQW9CLE1BQU0sV0FBVyxDQUFDOzs7O0FBZ0IzRyxNQUFNLE9BQU8sOEJBQThCO0lBR3pDLElBQ0ksR0FBRztRQUNMLE9BQU8sSUFBSSxDQUFDLFFBQVEsS0FBSyxVQUFVLENBQUMsR0FBRyxDQUFDO0lBQzFDLENBQUM7SUFFRCxJQUNJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxRQUFRLEtBQUssVUFBVSxDQUFDLFNBQVMsQ0FBQztJQUNoRCxDQUFDO0lBRUQsSUFDSSxNQUFNO1FBQ1IsT0FBTyxJQUFJLENBQUMsUUFBUSxLQUFLLFVBQVUsQ0FBQyxPQUFPLENBQUM7SUFDOUMsQ0FBQztJQUVELElBQ0ksS0FBSztRQUNQLE9BQU8sSUFBSSxDQUFDLFFBQVEsS0FBSyxVQUFVLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssVUFBVSxDQUFDLEdBQUcsQ0FBQztJQUNoRixDQUFDO0lBRUQsSUFDSSxNQUFNO1FBQ1IsT0FBTyxJQUFJLENBQUMsUUFBUSxLQUFLLFVBQVUsQ0FBQyxPQUFPLENBQUM7SUFDOUMsQ0FBQztJQUVELElBQ0ksU0FBUztRQUNYLE9BQU8sSUFBSSxDQUFDLFFBQVEsS0FBSyxVQUFVLENBQUMsVUFBVSxDQUFDO0lBQ2pELENBQUM7SUFFRCxJQUNJLE1BQU07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b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICBDb21wb25lbnRSZWYsXG4gIEVtYmVkZGVkVmlld1JlZixcbiAgSG9zdEJpbmRpbmcsXG4gIEluamVjdG9yLFxuICBJbnB1dCxcbiAgVmlld0NoaWxkLFxuICBWaWV3Q29udGFpbmVyUmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTmJQb3NpdGlvbiB9IGZyb20gJy4vb3ZlcmxheS1wb3NpdGlvbic7XG5pbXBvcnQgeyBOYkNvbXBvbmVudFBvcnRhbCwgTmJQb3J0YWxJbmplY3RvciwgTmJQb3J0YWxPdXRsZXREaXJlY3RpdmUsIE5iVGVtcGxhdGVQb3J0YWwgfSBmcm9tICcuL21hcHBpbmcnO1xuXG5leHBvcnQgaW50ZXJmYWNlIE5iUmVuZGVyYWJsZUNvbnRhaW5lciB7XG5cbiAgLyoqXG4gICAqIEEgcmVuZGVyQ29udGVudCBtZXRob2QgcmVuZGVycyBjb250ZW50IHdpdGggcHJvdmlkZWQgY29udGV4dC5cbiAgICogTmF0dXJhbGx5LCB0aGlzIGpvYiBoYXMgdG8gYmUgZG9uZSBieSBuZ09uQ2hhbmdlcyBsaWZlY3ljbGUgaG9vaywgYnV0XG4gICAqIG5nT25DaGFuZ2VzIGhvb2sgd2lsbCBiZSB0cmlnZ2VyZWQgb25seSBpZiB3ZSB1cGRhdGUgY29udGVudCBvciBjb250ZXh0IHByb3BlcnRpZXNcbiAgICogdGhyb3VnaCB0ZW1wbGF0ZSBwcm9wZXJ0eSBiaW5kaW5nIHN5bnRheC4gQnV0IGluIG91ciBjYXNlIHdlJ3JlIHVwZGF0aW5nIHRoZXNlIHByb3BlcnRpZXMgcHJvZ3JhbW1hdGljYWxseS5cbiAgICogKi9cbiAgcmVuZGVyQ29udGVudCgpO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgdGVtcGxhdGU6ICcnLFxufSlcbmV4cG9ydCBjbGFzcyBOYlBvc2l0aW9uZWRDb250YWluZXJDb21wb25lbnQge1xuICBASW5wdXQoKSBwb3NpdGlvbjogTmJQb3NpdGlvbjtcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLm5iLW92ZXJsYXktdG9wJylcbiAgZ2V0IHRvcCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5wb3NpdGlvbiA9PT0gTmJQb3NpdGlvbi5UT1A7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLm5iLW92ZXJsYXktdG9wLXN0YXJ0JylcbiAgZ2V0IHRvcFN0YXJ0KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnBvc2l0aW9uID09PSBOYlBvc2l0aW9uLlRPUF9TVEFSVDtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3MubmItb3ZlcmxheS10b3AtZW5kJylcbiAgZ2V0IHRvcEVuZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5wb3NpdGlvbiA9PT0gTmJQb3NpdGlvbi5UT1BfRU5EO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5uYi1vdmVybGF5LXJpZ2h0JylcbiAgZ2V0IHJpZ2h0KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnBvc2l0aW9uID09PSBOYlBvc2l0aW9uLlJJR0hUIHx8IHRoaXMucG9zaXRpb24gPT09IE5iUG9zaXRpb24uRU5EO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5uYi1vdmVybGF5LWVuZC10b3AnKVxuICBnZXQgZW5kVG9wKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnBvc2l0aW9uID09PSBOYlBvc2l0aW9uLkVORF9UT1A7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLm5iLW92ZXJsYXktZW5kLWJvdHRvbScpXG4gIGdldCBlbmRCb3R0b20oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMucG9zaXRpb24gPT09IE5iUG9zaXRpb24uRU5EX0JPVFRPTTtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3MubmItb3ZlcmxheS1ib3R0b20nKVxuICBnZXQgYm90dG9tKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnBvc2l0aW9uID09PSBOYlBvc2l0aW9uLkJPVFRPTTtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3MubmItb3ZlcmxheS1ib3R0b20tc3RhcnQnKVxuICBnZXQgYm90dG9tU3RhcnQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMucG9zaXRpb24gPT09IE5iUG9zaXRpb24uQk9UVE9NX1NUQVJUO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5uYi1vdmVybGF5LWJvdHRvbS1lbmQnKVxuICBnZXQgYm90dG9tRW5kKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnBvc2l0aW9uID09PSBOYlBvc2l0aW9uLkJPVFRPTV9FTkQ7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLm5iLW92ZXJsYXktbGVmdCcpXG4gIGdldCBsZWZ0KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnBvc2l0aW9uID09PSBOYlBvc2l0aW9uLkxFRlQgfHwgdGhpcy5wb3NpdGlvbiA9PT0gTmJQb3NpdGlvbi5TVEFSVDtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3MubmItb3ZlcmxheS1zdGFydC10b3AnKVxuICBnZXQgc3RhcnRUb3AoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMucG9zaXRpb24gPT09IE5iUG9zaXRpb24uU1RBUlRfVE9QO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5uYi1vdmVybGF5LXN0YXJ0LWJvdHRvbScpXG4gIGdldCBzdGFydEJvdHRvbSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5wb3NpdGlvbiA9PT0gTmJQb3NpdGlvbi5TVEFSVF9CT1RUT007XG4gIH1cbn1cblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduYi1vdmVybGF5LWNvbnRhaW5lcicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiAqbmdJZj1cImlzU3RyaW5nQ29udGVudFwiIGNsYXNzPVwicHJpbWl0aXZlLW92ZXJsYXlcIj57eyBjb250ZW50IH19PC9kaXY+XG4gICAgPG5nLXRlbXBsYXRlIG5iUG9ydGFsT3V0bGV0PjwvbmctdGVtcGxhdGU+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIE5iT3ZlcmxheUNvbnRhaW5lckNvbXBvbmVudCB7XG5cbiAgLy8gVE9ETyBzdGF0aWMgbXVzdCBiZSBmYWxzZSBhcyBvZiBBbmd1bGFyIDkuMC4wLCBpc3N1ZXMvMTUxNFxuICBAVmlld0NoaWxkKE5iUG9ydGFsT3V0bGV0RGlyZWN0aXZlLCB7IHN0YXRpYzogdHJ1ZSB9KSBwb3J0YWxPdXRsZXQ6IE5iUG9ydGFsT3V0bGV0RGlyZWN0aXZlO1xuXG4gIGlzQXR0YWNoZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBjb250ZW50OiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIHZjcjogVmlld0NvbnRhaW5lclJlZixcbiAgICAgICAgICAgICAgcHJvdGVjdGVkIGluamVjdG9yOiBJbmplY3RvciwgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgfVxuXG4gIGdldCBpc1N0cmluZ0NvbnRlbnQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhdGhpcy5jb250ZW50O1xuICB9XG5cbiAgYXR0YWNoQ29tcG9uZW50UG9ydGFsPFQ+KHBvcnRhbDogTmJDb21wb25lbnRQb3J0YWw8VD4sIGNvbnRleHQ/OiBPYmplY3QpOiBDb21wb25lbnRSZWY8VD4ge1xuICAgIHBvcnRhbC5pbmplY3RvciA9IHRoaXMuY3JlYXRlQ2hpbGRJbmplY3Rvcihwb3J0YWwuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyKTtcbiAgICBjb25zdCBjb21wb25lbnRSZWYgPSB0aGlzLnBvcnRhbE91dGxldC5hdHRhY2hDb21wb25lbnRQb3J0YWwocG9ydGFsKTtcbiAgICBpZiAoY29udGV4dCkge1xuICAgICAgT2JqZWN0LmFzc2lnbihjb21wb25lbnRSZWYuaW5zdGFuY2UsIGNvbnRleHQpO1xuICAgIH1cbiAgICBjb21wb25lbnRSZWYuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgY29tcG9uZW50UmVmLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICB0aGlzLmlzQXR0YWNoZWQgPSB0cnVlO1xuICAgIHJldHVybiBjb21wb25lbnRSZWY7XG4gIH1cblxuICBhdHRhY2hUZW1wbGF0ZVBvcnRhbDxDPihwb3J0YWw6IE5iVGVtcGxhdGVQb3J0YWw8Qz4pOiBFbWJlZGRlZFZpZXdSZWY8Qz4ge1xuICAgIGNvbnN0IHRlbXBsYXRlUmVmID0gdGhpcy5wb3J0YWxPdXRsZXQuYXR0YWNoVGVtcGxhdGVQb3J0YWwocG9ydGFsKTtcbiAgICB0ZW1wbGF0ZVJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgdGhpcy5pc0F0dGFjaGVkID0gdHJ1ZTtcbiAgICByZXR1cm4gdGVtcGxhdGVSZWY7XG4gIH1cblxuICBhdHRhY2hTdHJpbmdDb250ZW50KGNvbnRlbnQ6IHN0cmluZykge1xuICAgIHRoaXMuY29udGVudCA9IGNvbnRlbnQ7XG4gICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICB0aGlzLmlzQXR0YWNoZWQgPSB0cnVlO1xuICB9XG5cbiAgZGV0YWNoKCkge1xuICAgIGlmICh0aGlzLnBvcnRhbE91dGxldC5oYXNBdHRhY2hlZCgpKSB7XG4gICAgICB0aGlzLnBvcnRhbE91dGxldC5kZXRhY2goKTtcbiAgICB9XG4gICAgdGhpcy5hdHRhY2hTdHJpbmdDb250ZW50KG51bGwpO1xuICAgIHRoaXMuaXNBdHRhY2hlZCA9IGZhbHNlO1xuICB9XG5cbiAgcHJvdGVjdGVkIGNyZWF0ZUNoaWxkSW5qZWN0b3IoY2ZyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIpOiBOYlBvcnRhbEluamVjdG9yIHtcbiAgICByZXR1cm4gbmV3IE5iUG9ydGFsSW5qZWN0b3IodGhpcy5pbmplY3RvciwgbmV3IFdlYWtNYXAoW1xuICAgICAgW0NvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgY2ZyXSxcbiAgICBdKSk7XG4gIH1cbn1cbiJdfQ==