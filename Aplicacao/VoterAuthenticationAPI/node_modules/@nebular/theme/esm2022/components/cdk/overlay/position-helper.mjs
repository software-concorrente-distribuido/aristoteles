import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../../../services/direction.service";
export var NbGlobalLogicalPosition;
(function (NbGlobalLogicalPosition) {
    NbGlobalLogicalPosition["TOP_START"] = "top-start";
    NbGlobalLogicalPosition["TOP_END"] = "top-end";
    NbGlobalLogicalPosition["BOTTOM_START"] = "bottom-start";
    NbGlobalLogicalPosition["BOTTOM_END"] = "bottom-end";
})(NbGlobalLogicalPosition || (NbGlobalLogicalPosition = {}));
export var NbGlobalPhysicalPosition;
(function (NbGlobalPhysicalPosition) {
    NbGlobalPhysicalPosition["TOP_RIGHT"] = "top-right";
    NbGlobalPhysicalPosition["TOP_LEFT"] = "top-left";
    NbGlobalPhysicalPosition["BOTTOM_RIGHT"] = "bottom-right";
    NbGlobalPhysicalPosition["BOTTOM_LEFT"] = "bottom-left";
})(NbGlobalPhysicalPosition || (NbGlobalPhysicalPosition = {}));
export class NbPositionHelper {
    constructor(layoutDirection) {
        this.layoutDirection = layoutDirection;
    }
    toLogicalPosition(position) {
        if (Object.values(NbGlobalLogicalPosition).includes(position)) {
            return position;
        }
        if (this.layoutDirection.isLtr()) {
            return this.toLogicalPositionWhenLtr(position);
        }
        else {
            return this.toLogicalPositionWhenRtl(position);
        }
    }
    toPhysicalPosition(position) {
        if (Object.values(NbGlobalPhysicalPosition).includes(position)) {
            return position;
        }
        if (this.layoutDirection.isLtr()) {
            return this.toPhysicalPositionWhenLtr(position);
        }
        else {
            return this.toPhysicalPositionWhenRtl(position);
        }
    }
    isTopPosition(position) {
        const logicalPosition = this.toLogicalPosition(position);
        return logicalPosition === NbGlobalLogicalPosition.TOP_END || logicalPosition === NbGlobalLogicalPosition.TOP_START;
    }
    isRightPosition(position) {
        const physicalPosition = this.toPhysicalPosition(position);
        return (physicalPosition === NbGlobalPhysicalPosition.TOP_RIGHT ||
            physicalPosition === NbGlobalPhysicalPosition.BOTTOM_RIGHT);
    }
    toLogicalPositionWhenLtr(position) {
        switch (position) {
            case NbGlobalPhysicalPosition.TOP_RIGHT:
                return NbGlobalLogicalPosition.TOP_END;
            case NbGlobalPhysicalPosition.TOP_LEFT:
                return NbGlobalLogicalPosition.TOP_START;
            case NbGlobalPhysicalPosition.BOTTOM_RIGHT:
                return NbGlobalLogicalPosition.BOTTOM_END;
            case NbGlobalPhysicalPosition.BOTTOM_LEFT:
                return NbGlobalLogicalPosition.BOTTOM_START;
        }
    }
    toLogicalPositionWhenRtl(position) {
        switch (position) {
            case NbGlobalPhysicalPosition.TOP_RIGHT:
                return NbGlobalLogicalPosition.TOP_START;
            case NbGlobalPhysicalPosition.TOP_LEFT:
                return NbGlobalLogicalPosition.TOP_END;
            case NbGlobalPhysicalPosition.BOTTOM_RIGHT:
                return NbGlobalLogicalPosition.BOTTOM_START;
            case NbGlobalPhysicalPosition.BOTTOM_LEFT:
                return NbGlobalLogicalPosition.BOTTOM_END;
        }
    }
    toPhysicalPositionWhenLtr(position) {
        switch (position) {
            case NbGlobalLogicalPosition.TOP_START:
                return NbGlobalPhysicalPosition.TOP_LEFT;
            case NbGlobalLogicalPosition.TOP_END:
                return NbGlobalPhysicalPosition.TOP_RIGHT;
            case NbGlobalLogicalPosition.BOTTOM_START:
                return NbGlobalPhysicalPosition.BOTTOM_LEFT;
            case NbGlobalLogicalPosition.BOTTOM_END:
                return NbGlobalPhysicalPosition.BOTTOM_RIGHT;
        }
    }
    toPhysicalPositionWhenRtl(position) {
        switch (position) {
            case NbGlobalLogicalPosition.TOP_START:
                return NbGlobalPhysicalPosition.TOP_RIGHT;
            case NbGlobalLogicalPosition.TOP_END:
                return NbGlobalPhysicalPosition.TOP_LEFT;
            case NbGlobalLogicalPosition.BOTTOM_START:
                return NbGlobalPhysicalPosition.BOTTOM_RIGHT;
            case NbGlobalLogicalPosition.BOTTOM_END:
                return NbGlobalPhysicalPosition.BOTTOM_LEFT;
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbPositionHelper, deps: [{ token: i1.NbLayoutDirectionService }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbPositionHelper }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbPositionHelper, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: i1.NbLayoutDirectionService }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zaXRpb24taGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2ZyYW1ld29yay90aGVtZS9jb21wb25lbnRzL2Nkay9vdmVybGF5L3Bvc2l0aW9uLWhlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7QUFJM0MsTUFBTSxDQUFOLElBQVksdUJBS1g7QUFMRCxXQUFZLHVCQUF1QjtJQUNqQyxrREFBdUIsQ0FBQTtJQUN2Qiw4Q0FBbUIsQ0FBQTtJQUNuQix3REFBNkIsQ0FBQTtJQUM3QixvREFBeUIsQ0FBQTtBQUMzQixDQUFDLEVBTFcsdUJBQXVCLEtBQXZCLHVCQUF1QixRQUtsQztBQUVELE1BQU0sQ0FBTixJQUFZLHdCQUtYO0FBTEQsV0FBWSx3QkFBd0I7SUFDbEMsbURBQXVCLENBQUE7SUFDdkIsaURBQXFCLENBQUE7SUFDckIseURBQTZCLENBQUE7SUFDN0IsdURBQTJCLENBQUE7QUFDN0IsQ0FBQyxFQUxXLHdCQUF3QixLQUF4Qix3QkFBd0IsUUFLbkM7QUFLRCxNQUFNLE9BQU8sZ0JBQWdCO0lBQzNCLFlBQXNCLGVBQXlDO1FBQXpDLG9CQUFlLEdBQWYsZUFBZSxDQUEwQjtJQUFHLENBQUM7SUFFbkUsaUJBQWlCLENBQUMsUUFBMEI7UUFDMUMsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLHVCQUF1QixDQUFDLENBQUMsUUFBUSxDQUFDLFFBQW1DLENBQUMsRUFBRSxDQUFDO1lBQ3pGLE9BQU8sUUFBbUMsQ0FBQztRQUM3QyxDQUFDO1FBRUQsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUM7WUFDakMsT0FBTyxJQUFJLENBQUMsd0JBQXdCLENBQUMsUUFBb0MsQ0FBQyxDQUFDO1FBQzdFLENBQUM7YUFBTSxDQUFDO1lBQ04sT0FBTyxJQUFJLENBQUMsd0JBQXdCLENBQUMsUUFB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QUNsQyxPQUFPLHdCQUF3QixDQUFDLFFBQVEsQ0FBQztZQUMzQyxLQUFLLHVCQUF1QixDQUFDLFlBQVk7Z0JBQ3ZDLE9BQU8sd0JBQXdCLENBQUMsWUFBWSxDQUFDO1lBQy9DLEtBQUssdUJBQXVCLENBQUMsVUFBVTtnQkFDckMsT0FBTyx3QkFBd0IsQ0FBQyxXQUFXLENBQUM7UUFDaEQsQ0FBQztJQUNILENBQUM7OEdBNUZVLGdCQUFnQjtrSEFBaEIsZ0JBQWdCOzsyRkFBaEIsZ0JBQWdCO2tCQUQ1QixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOYkxheW91dERpcmVjdGlvblNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zZXJ2aWNlcy9kaXJlY3Rpb24uc2VydmljZSc7XG5cbmV4cG9ydCBlbnVtIE5iR2xvYmFsTG9naWNhbFBvc2l0aW9uIHtcbiAgVE9QX1NUQVJUID0gJ3RvcC1zdGFydCcsXG4gIFRPUF9FTkQgPSAndG9wLWVuZCcsXG4gIEJPVFRPTV9TVEFSVCA9ICdib3R0b20tc3RhcnQnLFxuICBCT1RUT01fRU5EID0gJ2JvdHRvbS1lbmQnLFxufVxuXG5leHBvcnQgZW51bSBOYkdsb2JhbFBoeXNpY2FsUG9zaXRpb24ge1xuICBUT1BfUklHSFQgPSAndG9wLXJpZ2h0JyxcbiAgVE9QX0xFRlQgPSAndG9wLWxlZnQnLFxuICBCT1RUT01fUklHSFQgPSAnYm90dG9tLXJpZ2h0JyxcbiAgQk9UVE9NX0xFRlQgPSAnYm90dG9tLWxlZnQnLFxufVxuXG5leHBvcnQgdHlwZSBOYkdsb2JhbFBvc2l0aW9uID0gTmJHbG9iYWxQaHlzaWNhbFBvc2l0aW9uIHwgTmJHbG9iYWxMb2dpY2FsUG9zaXRpb247XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBOYlBvc2l0aW9uSGVscGVyIHtcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGxheW91dERpcmVjdGlvbjogTmJMYXlvdXREaXJlY3Rpb25TZXJ2aWNlKSB7fVxuXG4gIHRvTG9naWNhbFBvc2l0aW9uKHBvc2l0aW9uOiBOYkdsb2JhbFBvc2l0aW9uKTogTmJHbG9iYWxMb2dpY2FsUG9zaXRpb24ge1xuICAgIGlmIChPYmplY3QudmFsdWVzKE5iR2xvYmFsTG9naWNhbFBvc2l0aW9uKS5pbmNsdWRlcyhwb3NpdGlvbiBhcyBOYkdsb2JhbExvZ2ljYWxQb3NpdGlvbikpIHtcbiAgICAgIHJldHVybiBwb3NpdGlvbiBhcyBOYkdsb2JhbExvZ2ljYWxQb3NpdGlvbjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5sYXlvdXREaXJlY3Rpb24uaXNMdHIoKSkge1xuICAgICAgcmV0dXJuIHRoaXMudG9Mb2dpY2FsUG9zaXRpb25XaGVuTHRyKHBvc2l0aW9uIGFzIE5iR2xvYmFsUGh5c2ljYWxQb3NpdGlvbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnRvTG9naWNhbFBvc2l0aW9uV2hlblJ0bChwb3NpdGlvbiBhcyBOYkdsb2JhbFBoeXNpY2FsUG9zaXRpb24pO1xuICAgIH1cbiAgfVxuXG4gIHRvUGh5c2ljYWxQb3NpdGlvbihwb3NpdGlvbjogTmJHbG9iYWxQb3NpdGlvbik6IE5iR2xvYmFsUGh5c2ljYWxQb3NpdGlvbiB7XG4gICAgaWYgKE9iamVjdC52YWx1ZXMoTmJHbG9iYWxQaHlzaWNhbFBvc2l0aW9uKS5pbmNsdWRlcyhwb3NpdGlvbiBhcyBOYkdsb2JhbFBoeXNpY2FsUG9zaXRpb24pKSB7XG4gICAgICByZXR1cm4gcG9zaXRpb24gYXMgTmJHbG9iYWxQaHlzaWNhbFBvc2l0aW9uO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmxheW91dERpcmVjdGlvbi5pc0x0cigpKSB7XG4gICAgICByZXR1cm4gdGhpcy50b1BoeXNpY2FsUG9zaXRpb25XaGVuTHRyKHBvc2l0aW9uIGFzIE5iR2xvYmFsTG9naWNhbFBvc2l0aW9uKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMudG9QaHlzaWNhbFBvc2l0aW9uV2hlblJ0bChwb3NpdGlvbiBhcyBOYkdsb2JhbExvZ2ljYWxQb3NpdGlvbik7XG4gICAgfVxuICB9XG5cbiAgaXNUb3BQb3NpdGlvbihwb3NpdGlvbjogTmJHbG9iYWxQb3NpdGlvbikge1xuICAgIGNvbnN0IGxvZ2ljYWxQb3NpdGlvbiA9IHRoaXMudG9Mb2dpY2FsUG9zaXRpb24ocG9zaXRpb24pO1xuXG4gICAgcmV0dXJuIGxvZ2ljYWxQb3NpdGlvbiA9PT0gTmJHbG9iYWxMb2dpY2FsUG9zaXRpb24uVE9QX0VORCB8fCBsb2dpY2FsUG9zaXRpb24gPT09IE5iR2xvYmFsTG9naWNhbFBvc2l0aW9uLlRPUF9TVEFSVDtcbiAgfVxuXG4gIGlzUmlnaHRQb3NpdGlvbihwb3NpdGlvbjogTmJHbG9iYWxQb3NpdGlvbikge1xuICAgIGNvbnN0IHBoeXNpY2FsUG9zaXRpb24gPSB0aGlzLnRvUGh5c2ljYWxQb3NpdGlvbihwb3NpdGlvbik7XG5cbiAgICByZXR1cm4gKFxuICAgICAgcGh5c2ljYWxQb3NpdGlvbiA9PT0gTmJHbG9iYWxQaHlzaWNhbFBvc2l0aW9uLlRPUF9SSUdIVCB8fFxuICAgICAgcGh5c2ljYWxQb3NpdGlvbiA9PT0gTmJHbG9iYWxQaHlzaWNhbFBvc2l0aW9uLkJPVFRPTV9SSUdIVFxuICAgICk7XG4gIH1cblxuICBwcm90ZWN0ZWQgdG9Mb2dpY2FsUG9zaXRpb25XaGVuTHRyKHBvc2l0aW9uOiBOYkdsb2JhbFBoeXNpY2FsUG9zaXRpb24pOiBOYkdsb2JhbExvZ2ljYWxQb3NpdGlvbiB7XG4gICAgc3dpdGNoIChwb3NpdGlvbikge1xuICAgICAgY2FzZSBOYkdsb2JhbFBoeXNpY2FsUG9zaXRpb24uVE9QX1JJR0hUOlxuICAgICAgICByZXR1cm4gTmJHbG9iYWxMb2dpY2FsUG9zaXRpb24uVE9QX0VORDtcbiAgICAgIGNhc2UgTmJHbG9iYWxQaHlzaWNhbFBvc2l0aW9uLlRPUF9MRUZUOlxuICAgICAgICByZXR1cm4gTmJHbG9iYWxMb2dpY2FsUG9zaXRpb24uVE9QX1NUQVJUO1xuICAgICAgY2FzZSBOYkdsb2JhbFBoeXNpY2FsUG9zaXRpb24uQk9UVE9NX1JJR0hUOlxuICAgICAgICByZXR1cm4gTmJHbG9iYWxMb2dpY2FsUG9zaXRpb24uQk9UVE9NX0VORDtcbiAgICAgIGNhc2UgTmJHbG9iYWxQaHlzaWNhbFBvc2l0aW9uLkJPVFRPTV9MRUZUOlxuICAgICAgICByZXR1cm4gTmJHbG9iYWxMb2dpY2FsUG9zaXRpb24uQk9UVE9NX1NUQVJUO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCB0b0xvZ2ljYWxQb3NpdGlvbldoZW5SdGwocG9zaXRpb246IE5iR2xvYmFsUGh5c2ljYWxQb3NpdGlvbik6IE5iR2xvYmFsTG9naWNhbFBvc2l0aW9uIHtcbiAgICBzd2l0Y2ggKHBvc2l0aW9uKSB7XG4gICAgICBjYXNlIE5iR2xvYmFsUGh5c2ljYWxQb3NpdGlvbi5UT1BfUklHSFQ6XG4gICAgICAgIHJldHVybiBOYkdsb2JhbExvZ2ljYWxQb3NpdGlvbi5UT1BfU1RBUlQ7XG4gICAgICBjYXNlIE5iR2xvYmFsUGh5c2ljYWxQb3NpdGlvbi5UT1BfTEVGVDpcbiAgICAgICAgcmV0dXJuIE5iR2xvYmFsTG9naWNhbFBvc2l0aW9uLlRPUF9FTkQ7XG4gICAgICBjYXNlIE5iR2xvYmFsUGh5c2ljYWxQb3NpdGlvbi5CT1RUT01fUklHSFQ6XG4gICAgICAgIHJldHVybiBOYkdsb2JhbExvZ2ljYWxQb3NpdGlvbi5CT1RUT01fU1RBUlQ7XG4gICAgICBjYXNlIE5iR2xvYmFsUGh5c2ljYWxQb3NpdGlvbi5CT1RUT01fTEVGVDpcbiAgICAgICAgcmV0dXJuIE5iR2xvYmFsTG9naWNhbFBvc2l0aW9uLkJPVFRPTV9FTkQ7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIHRvUGh5c2ljYWxQb3NpdGlvbldoZW5MdHIocG9zaXRpb246IE5iR2xvYmFsTG9naWNhbFBvc2l0aW9uKTogTmJHbG9iYWxQaHlzaWNhbFBvc2l0aW9uIHtcbiAgICBzd2l0Y2ggKHBvc2l0aW9uKSB7XG4gICAgICBjYXNlIE5iR2xvYmFsTG9naWNhbFBvc2l0aW9uLlRPUF9TVEFSVDpcbiAgICAgICAgcmV0dXJuIE5iR2xvYmFsUGh5c2ljYWxQb3NpdGlvbi5UT1BfTEVGVDtcbiAgICAgIGNhc2UgTmJHbG9iYWxMb2dpY2FsUG9zaXRpb24uVE9QX0VORDpcbiAgICAgICAgcmV0dXJuIE5iR2xvYmFsUGh5c2ljYWxQb3NpdGlvbi5UT1BfUklHSFQ7XG4gICAgICBjYXNlIE5iR2xvYmFsTG9naWNhbFBvc2l0aW9uLkJPVFRPTV9TVEFSVDpcbiAgICAgICAgcmV0dXJuIE5iR2xvYmFsUGh5c2ljYWxQb3NpdGlvbi5CT1RUT01fTEVGVDtcbiAgICAgIGNhc2UgTmJHbG9iYWxMb2dpY2FsUG9zaXRpb24uQk9UVE9NX0VORDpcbiAgICAgICAgcmV0dXJuIE5iR2xvYmFsUGh5c2ljYWxQb3NpdGlvbi5CT1RUT01fUklHSFQ7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIHRvUGh5c2ljYWxQb3NpdGlvbldoZW5SdGwocG9zaXRpb246IE5iR2xvYmFsTG9naWNhbFBvc2l0aW9uKTogTmJHbG9iYWxQaHlzaWNhbFBvc2l0aW9uIHtcbiAgICBzd2l0Y2ggKHBvc2l0aW9uKSB7XG4gICAgICBjYXNlIE5iR2xvYmFsTG9naWNhbFBvc2l0aW9uLlRPUF9TVEFSVDpcbiAgICAgICAgcmV0dXJuIE5iR2xvYmFsUGh5c2ljYWxQb3NpdGlvbi5UT1BfUklHSFQ7XG4gICAgICBjYXNlIE5iR2xvYmFsTG9naWNhbFBvc2l0aW9uLlRPUF9FTkQ6XG4gICAgICAgIHJldHVybiBOYkdsb2JhbFBoeXNpY2FsUG9zaXRpb24uVE9QX0xFRlQ7XG4gICAgICBjYXNlIE5iR2xvYmFsTG9naWNhbFBvc2l0aW9uLkJPVFRPTV9TVEFSVDpcbiAgICAgICAgcmV0dXJuIE5iR2xvYmFsUGh5c2ljYWxQb3NpdGlvbi5CT1RUT01fUklHSFQ7XG4gICAgICBjYXNlIE5iR2xvYmFsTG9naWNhbFBvc2l0aW9uLkJPVFRPTV9FTkQ6XG4gICAgICAgIHJldHVybiBOYkdsb2JhbFBoeXNpY2FsUG9zaXRpb24uQk9UVE9NX0xFRlQ7XG4gICAgfVxuICB9XG59XG4iXX0=