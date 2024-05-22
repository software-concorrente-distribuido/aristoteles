/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class NbTreeGridService {
    expand(data, row, options = {}) {
        const node = this.find(data, row);
        node.expanded = true;
        if (options.deep && node.hasChildren()) {
            node.children.forEach((n) => this.expand(data, n.data, options));
        }
    }
    collapse(data, row, options = {}) {
        const node = this.find(data, row);
        node.expanded = false;
        if (options.deep && node.hasChildren()) {
            node.children.forEach((n) => this.collapse(data, n.data, options));
        }
    }
    toggle(data, row, options = {}) {
        const node = this.find(data, row);
        if (node.expanded) {
            this.collapse(data, row, options);
        }
        else {
            this.expand(data, row, options);
        }
    }
    find(data, row) {
        const toCheck = [...data];
        for (const node of toCheck) {
            if (node.data === row) {
                return node;
            }
            if (node.hasChildren()) {
                toCheck.push(...node.children);
            }
        }
        return undefined;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbTreeGridService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbTreeGridService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbTreeGridService, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1ncmlkLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvZnJhbWV3b3JrL3RoZW1lL2NvbXBvbmVudHMvdHJlZS1ncmlkL2RhdGEtc291cmNlL3RyZWUtZ3JpZC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFHSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQVMzQyxNQUFNLE9BQU8saUJBQWlCO0lBQzVCLE1BQU0sQ0FBQyxJQUFxQyxFQUFFLEdBQU0sRUFBRSxVQUEyQixFQUFFO1FBQ2pGLE1BQU0sSUFBSSxHQUFrQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNqRSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUVyQixJQUFJLE9BQU8sQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUM7WUFDdkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFnQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDbEcsQ0FBQztJQUNILENBQUM7SUFFRCxRQUFRLENBQUMsSUFBcUMsRUFBRSxHQUFNLEVBQUUsVUFBMkIsRUFBRTtRQUNuRixNQUFNLElBQUksR0FBa0MsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDakUsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFFdEIsSUFBSSxPQUFPLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBZ0MsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ3BHLENBQUM7SUFDSCxDQUFDO0lBRUQsTUFBTSxDQUFDLElBQXFDLEVBQUUsR0FBTSxFQUFFLFVBQTJCLEVBQUU7UUFDakYsTUFBTSxJQUFJLEdBQWtDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ2pFLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ2xCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNwQyxDQUFDO2FBQU0sQ0FBQztZQUNOLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNsQyxDQUFDO0lBQ0gsQ0FBQztJQUVPLElBQUksQ0FBQyxJQUFxQyxFQUFFLEdBQU07UUFDeEQsTUFBTSxPQUFPLEdBQW9DLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztRQUUzRCxLQUFLLE1BQU0sSUFBSSxJQUFJLE9BQU8sRUFBRSxDQUFDO1lBQzNCLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQztnQkFDdEIsT0FBTyxJQUFJLENBQUM7WUFDZCxDQUFDO1lBRUQsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQztnQkFDdkIsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNqQyxDQUFDO1FBQ0gsQ0FBQztRQUVELE9BQU8sU0FBUyxDQUFDO0lBQ25CLENBQUM7OEdBMUNVLGlCQUFpQjtrSEFBakIsaUJBQWlCOzsyRkFBakIsaUJBQWlCO2tCQUQ3QixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgQWt2ZW8uIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICovXG5cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOYlRyZWVHcmlkUHJlc2VudGF0aW9uTm9kZSB9IGZyb20gJy4vdHJlZS1ncmlkLm1vZGVsJztcblxuZXhwb3J0IGludGVyZmFjZSBOYlRvZ2dsZU9wdGlvbnMge1xuICBkZWVwPzogYm9vbGVhbjtcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE5iVHJlZUdyaWRTZXJ2aWNlPFQ+IHtcbiAgZXhwYW5kKGRhdGE6IE5iVHJlZUdyaWRQcmVzZW50YXRpb25Ob2RlPFQ+W10sIHJvdzogVCwgb3B0aW9uczogTmJUb2dnbGVPcHRpb25zID0ge30pIHtcbiAgICBjb25zdCBub2RlOiBOYlRyZWVHcmlkUHJlc2VudGF0aW9uTm9kZTxUPiA9IHRoaXMuZmluZChkYXRhLCByb3cpO1xuICAgIG5vZGUuZXhwYW5kZWQgPSB0cnVlO1xuXG4gICAgaWYgKG9wdGlvbnMuZGVlcCAmJiBub2RlLmhhc0NoaWxkcmVuKCkpIHtcbiAgICAgIG5vZGUuY2hpbGRyZW4uZm9yRWFjaCgobjogTmJUcmVlR3JpZFByZXNlbnRhdGlvbk5vZGU8VD4pID0+IHRoaXMuZXhwYW5kKGRhdGEsIG4uZGF0YSwgb3B0aW9ucykpO1xuICAgIH1cbiAgfVxuXG4gIGNvbGxhcHNlKGRhdGE6IE5iVHJlZUdyaWRQcmVzZW50YXRpb25Ob2RlPFQ+W10sIHJvdzogVCwgb3B0aW9uczogTmJUb2dnbGVPcHRpb25zID0ge30pIHtcbiAgICBjb25zdCBub2RlOiBOYlRyZWVHcmlkUHJlc2VudGF0aW9uTm9kZTxUPiA9IHRoaXMuZmluZChkYXRhLCByb3cpO1xuICAgIG5vZGUuZXhwYW5kZWQgPSBmYWxzZTtcblxuICAgIGlmIChvcHRpb25zLmRlZXAgJiYgbm9kZS5oYXNDaGlsZHJlbigpKSB7XG4gICAgICBub2RlLmNoaWxkcmVuLmZvckVhY2goKG46IE5iVHJlZUdyaWRQcmVzZW50YXRpb25Ob2RlPFQ+KSA9PiB0aGlzLmNvbGxhcHNlKGRhdGEsIG4uZGF0YSwgb3B0aW9ucykpO1xuICAgIH1cbiAgfVxuXG4gIHRvZ2dsZShkYXRhOiBOYlRyZWVHcmlkUHJlc2VudGF0aW9uTm9kZTxUPltdLCByb3c6IFQsIG9wdGlvbnM6IE5iVG9nZ2xlT3B0aW9ucyA9IHt9KSB7XG4gICAgY29uc3Qgbm9kZTogTmJUcmVlR3JpZFByZXNlbnRhdGlvbk5vZGU8VD4gPSB0aGlzLmZpbmQoZGF0YSwgcm93KTtcbiAgICBpZiAobm9kZS5leHBhbmRlZCkge1xuICAgICAgdGhpcy5jb2xsYXBzZShkYXRhLCByb3csIG9wdGlvbnMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmV4cGFuZChkYXRhLCByb3csIG9wdGlvbnMpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZmluZChkYXRhOiBOYlRyZWVHcmlkUHJlc2VudGF0aW9uTm9kZTxUPltdLCByb3c6IFQpOiBOYlRyZWVHcmlkUHJlc2VudGF0aW9uTm9kZTxUPiB7XG4gICAgY29uc3QgdG9DaGVjazogTmJUcmVlR3JpZFByZXNlbnRhdGlvbk5vZGU8VD5bXSA9IFsuLi5kYXRhXTtcblxuICAgIGZvciAoY29uc3Qgbm9kZSBvZiB0b0NoZWNrKSB7XG4gICAgICBpZiAobm9kZS5kYXRhID09PSByb3cpIHtcbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgICB9XG5cbiAgICAgIGlmIChub2RlLmhhc0NoaWxkcmVuKCkpIHtcbiAgICAgICAgdG9DaGVjay5wdXNoKC4uLm5vZGUuY2hpbGRyZW4pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbn1cbiJdfQ==