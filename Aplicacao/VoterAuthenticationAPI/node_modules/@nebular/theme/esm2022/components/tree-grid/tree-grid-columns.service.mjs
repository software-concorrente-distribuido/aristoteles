import { Injectable } from '@angular/core';
import { merge, Subject } from 'rxjs';
import * as i0 from "@angular/core";
export class NbColumnsService {
    constructor(differs) {
        this.differs = differs;
        this.columnHide$ = new Subject();
        this.columnShow$ = new Subject();
    }
    setColumns(columns) {
        if (!this.changesDiffer) {
            this.changesDiffer = this.differs.find(columns || []).create();
        }
        if (this.changesDiffer.diff(columns)) {
            this.allColumns = Array.from(columns);
            this.visibleColumns = Array.from(columns);
        }
    }
    getVisibleColumns() {
        return this.visibleColumns;
    }
    hideColumn(column) {
        const toRemove = this.visibleColumns.indexOf(column);
        if (toRemove > -1) {
            this.visibleColumns.splice(toRemove, 1);
            this.columnHide$.next();
        }
    }
    showColumn(column) {
        if (this.visibleColumns.includes(column)) {
            return;
        }
        this.visibleColumns.splice(this.findInsertIndex(column), 0, column);
        this.columnShow$.next();
    }
    onColumnsChange() {
        return merge(this.columnShow$, this.columnHide$);
    }
    findInsertIndex(column) {
        const initialIndex = this.allColumns.indexOf(column);
        if (initialIndex === 0 || !this.visibleColumns.length) {
            return 0;
        }
        if (initialIndex === this.allColumns.length - 1) {
            return this.visibleColumns.length;
        }
        const leftSiblingIndex = initialIndex - 1;
        for (let i = leftSiblingIndex; i >= 0; i--) {
            const leftSibling = this.allColumns[i];
            const index = this.visibleColumns.indexOf(leftSibling);
            if (index !== -1) {
                return index + 1;
            }
        }
        const rightSiblingIndex = initialIndex + 1;
        for (let i = rightSiblingIndex; i < this.allColumns.length; i++) {
            const rightSibling = this.allColumns[i];
            const index = this.visibleColumns.indexOf(rightSibling);
            if (index !== -1) {
                return index;
            }
        }
        throw new Error(`Can't restore column position.`);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbColumnsService, deps: [{ token: i0.IterableDiffers }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbColumnsService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbColumnsService, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: i0.IterableDiffers }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1ncmlkLWNvbHVtbnMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9mcmFtZXdvcmsvdGhlbWUvY29tcG9uZW50cy90cmVlLWdyaWQvdHJlZS1ncmlkLWNvbHVtbnMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFtQyxNQUFNLGVBQWUsQ0FBQztBQUM1RSxPQUFPLEVBQUUsS0FBSyxFQUFjLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQzs7QUFJbEQsTUFBTSxPQUFPLGdCQUFnQjtJQU8zQixZQUFvQixPQUF3QjtRQUF4QixZQUFPLEdBQVAsT0FBTyxDQUFpQjtRQUhwQyxnQkFBVyxHQUFrQixJQUFJLE9BQU8sRUFBUSxDQUFDO1FBQ2pELGdCQUFXLEdBQWtCLElBQUksT0FBTyxFQUFRLENBQUM7SUFFVixDQUFDO0lBRWhELFVBQVUsQ0FBQyxPQUF5QjtRQUNsQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQ3hCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2pFLENBQUM7UUFFRCxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7WUFDckMsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3RDLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM1QyxDQUFDO0lBQ0gsQ0FBQztJQUVELGlCQUFpQjtRQUNmLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQztJQUM3QixDQUFDO0lBRUQsVUFBVSxDQUFDLE1BQWM7UUFDdkIsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDckQsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUNsQixJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDeEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUMxQixDQUFDO0lBQ0gsQ0FBQztJQUVELFVBQVUsQ0FBQyxNQUFjO1FBQ3ZCLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztZQUN6QyxPQUFPO1FBQ1QsQ0FBQztRQUNELElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3BFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVELGVBQWU7UUFDYixPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRU8sZUFBZSxDQUFDLE1BQWM7UUFDcEMsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFckQsSUFBSSxZQUFZLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUN0RCxPQUFPLENBQUMsQ0FBQztRQUNYLENBQUM7UUFDRCxJQUFJLFlBQVksS0FBSyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQztZQUNoRCxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDO1FBQ3BDLENBQUM7UUFFRCxNQUFNLGdCQUFnQixHQUFHLFlBQVksR0FBRyxDQUFDLENBQUM7UUFDMUMsS0FBSyxJQUFJLENBQUMsR0FBRyxnQkFBZ0IsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDM0MsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN2QyxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUN2RCxJQUFJLEtBQUssS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDO2dCQUNqQixPQUFPLEtBQUssR0FBRyxDQUFDLENBQUM7WUFDbkIsQ0FBQztRQUNILENBQUM7UUFFRCxNQUFNLGlCQUFpQixHQUFHLFlBQVksR0FBRyxDQUFDLENBQUM7UUFDM0MsS0FBSyxJQUFJLENBQUMsR0FBRyxpQkFBaUIsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUNoRSxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hDLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ3hELElBQUksS0FBSyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUM7Z0JBQ2pCLE9BQU8sS0FBSyxDQUFDO1lBQ2YsQ0FBQztRQUNILENBQUM7UUFFRCxNQUFNLElBQUksS0FBSyxDQUFDLGdDQUFnQyxDQUFDLENBQUM7SUFDcEQsQ0FBQzs4R0F6RVUsZ0JBQWdCO2tIQUFoQixnQkFBZ0I7OzJGQUFoQixnQkFBZ0I7a0JBRDVCLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJdGVyYWJsZURpZmZlciwgSXRlcmFibGVEaWZmZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBtZXJnZSwgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBOYkNvbHVtbnNTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBhbGxDb2x1bW5zOiBzdHJpbmdbXTtcbiAgcHJpdmF0ZSB2aXNpYmxlQ29sdW1uczogc3RyaW5nW107XG4gIHByaXZhdGUgY2hhbmdlc0RpZmZlcjogSXRlcmFibGVEaWZmZXI8YW55PjtcbiAgcHJpdmF0ZSBjb2x1bW5IaWRlJDogU3ViamVjdDx2b2lkPiA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG4gIHByaXZhdGUgY29sdW1uU2hvdyQ6IFN1YmplY3Q8dm9pZD4gPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZGlmZmVyczogSXRlcmFibGVEaWZmZXJzKSB7fVxuXG4gIHNldENvbHVtbnMoY29sdW1uczogSXRlcmFibGU8c3RyaW5nPik6IHZvaWQge1xuICAgIGlmICghdGhpcy5jaGFuZ2VzRGlmZmVyKSB7XG4gICAgICB0aGlzLmNoYW5nZXNEaWZmZXIgPSB0aGlzLmRpZmZlcnMuZmluZChjb2x1bW5zIHx8IFtdKS5jcmVhdGUoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5jaGFuZ2VzRGlmZmVyLmRpZmYoY29sdW1ucykpIHtcbiAgICAgIHRoaXMuYWxsQ29sdW1ucyA9IEFycmF5LmZyb20oY29sdW1ucyk7XG4gICAgICB0aGlzLnZpc2libGVDb2x1bW5zID0gQXJyYXkuZnJvbShjb2x1bW5zKTtcbiAgICB9XG4gIH1cblxuICBnZXRWaXNpYmxlQ29sdW1ucygpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHRoaXMudmlzaWJsZUNvbHVtbnM7XG4gIH1cblxuICBoaWRlQ29sdW1uKGNvbHVtbjogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3QgdG9SZW1vdmUgPSB0aGlzLnZpc2libGVDb2x1bW5zLmluZGV4T2YoY29sdW1uKTtcbiAgICBpZiAodG9SZW1vdmUgPiAtMSkge1xuICAgICAgdGhpcy52aXNpYmxlQ29sdW1ucy5zcGxpY2UodG9SZW1vdmUsIDEpO1xuICAgICAgdGhpcy5jb2x1bW5IaWRlJC5uZXh0KCk7XG4gICAgfVxuICB9XG5cbiAgc2hvd0NvbHVtbihjb2x1bW46IHN0cmluZyk6IHZvaWQge1xuICAgIGlmICh0aGlzLnZpc2libGVDb2x1bW5zLmluY2x1ZGVzKGNvbHVtbikpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy52aXNpYmxlQ29sdW1ucy5zcGxpY2UodGhpcy5maW5kSW5zZXJ0SW5kZXgoY29sdW1uKSwgMCwgY29sdW1uKTtcbiAgICB0aGlzLmNvbHVtblNob3ckLm5leHQoKTtcbiAgfVxuXG4gIG9uQ29sdW1uc0NoYW5nZSgpOiBPYnNlcnZhYmxlPHZvaWQ+IHtcbiAgICByZXR1cm4gbWVyZ2UodGhpcy5jb2x1bW5TaG93JCwgdGhpcy5jb2x1bW5IaWRlJCk7XG4gIH1cblxuICBwcml2YXRlIGZpbmRJbnNlcnRJbmRleChjb2x1bW46IHN0cmluZyk6IG51bWJlciB7XG4gICAgY29uc3QgaW5pdGlhbEluZGV4ID0gdGhpcy5hbGxDb2x1bW5zLmluZGV4T2YoY29sdW1uKTtcblxuICAgIGlmIChpbml0aWFsSW5kZXggPT09IDAgfHwgIXRoaXMudmlzaWJsZUNvbHVtbnMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgaWYgKGluaXRpYWxJbmRleCA9PT0gdGhpcy5hbGxDb2x1bW5zLmxlbmd0aCAtIDEpIHtcbiAgICAgIHJldHVybiB0aGlzLnZpc2libGVDb2x1bW5zLmxlbmd0aDtcbiAgICB9XG5cbiAgICBjb25zdCBsZWZ0U2libGluZ0luZGV4ID0gaW5pdGlhbEluZGV4IC0gMTtcbiAgICBmb3IgKGxldCBpID0gbGVmdFNpYmxpbmdJbmRleDsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIGNvbnN0IGxlZnRTaWJsaW5nID0gdGhpcy5hbGxDb2x1bW5zW2ldO1xuICAgICAgY29uc3QgaW5kZXggPSB0aGlzLnZpc2libGVDb2x1bW5zLmluZGV4T2YobGVmdFNpYmxpbmcpO1xuICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICByZXR1cm4gaW5kZXggKyAxO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHJpZ2h0U2libGluZ0luZGV4ID0gaW5pdGlhbEluZGV4ICsgMTtcbiAgICBmb3IgKGxldCBpID0gcmlnaHRTaWJsaW5nSW5kZXg7IGkgPCB0aGlzLmFsbENvbHVtbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHJpZ2h0U2libGluZyA9IHRoaXMuYWxsQ29sdW1uc1tpXTtcbiAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy52aXNpYmxlQ29sdW1ucy5pbmRleE9mKHJpZ2h0U2libGluZyk7XG4gICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgIHJldHVybiBpbmRleDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aHJvdyBuZXcgRXJyb3IoYENhbid0IHJlc3RvcmUgY29sdW1uIHBvc2l0aW9uLmApO1xuICB9XG59XG4iXX0=