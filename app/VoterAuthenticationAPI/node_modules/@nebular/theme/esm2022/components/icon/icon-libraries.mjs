/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Injectable } from '@angular/core';
import { NbIconPackType } from './icon-pack';
import { NbFontIcon, NbSvgIcon } from './icon';
import * as i0 from "@angular/core";
export class NbIconDefinition {
}
function throwPackNotFoundError(name) {
    throw Error(`Icon Pack '${name}' is not registered`);
}
function throwNoDefaultPackError() {
    throw Error('Default pack is not registered.');
}
function throwWrongPackTypeError(name, type, desiredType) {
    throw Error(`Pack '${name}' is not an '${desiredType}' Pack and its type is '${type}'`);
}
/**
 * This service allows to register multiple icon packs to use them later within `<nb-icon></nb-icon>` component.
 */
export class NbIconLibraries {
    constructor() {
        this.packs = new Map();
    }
    /**
     * Registers new Svg icon pack
     * @param {string} name
     * @param {NbIcon} icons
     * @param {NbIconPackParams} params
     */
    registerSvgPack(name, icons, params = {}) {
        this.packs.set(name, {
            name,
            icons: new Map(Object.entries(icons)),
            params,
            type: NbIconPackType.SVG,
        });
    }
    /**
     * Registers new font pack
     * @param {string} name
     * @param {NbIconPackParams} params
     */
    registerFontPack(name, params = {}) {
        this.packs.set(name, {
            name,
            params,
            icons: new Map(),
            type: NbIconPackType.FONT,
        });
    }
    /**
     * Returns pack by name
     * @param {string} name
     */
    getPack(name) {
        return this.packs.get(name);
    }
    /**
     * Sets pack as a default
     * @param {string} name
     */
    setDefaultPack(name) {
        if (!this.packs.has(name)) {
            throwPackNotFoundError(name);
        }
        this.defaultPack = this.packs.get(name);
    }
    /**
     * Returns Svg icon
     * @param {string} name
     * @param {string} pack
     *
     * @returns NbIconDefinition
     */
    getSvgIcon(name, pack) {
        const iconsPack = pack ? this.getPackOrThrow(pack) : this.getDefaultPackOrThrow();
        if (iconsPack.type !== NbIconPackType.SVG) {
            throwWrongPackTypeError(iconsPack.name, iconsPack.type, 'SVG');
        }
        const icon = this.getIconFromPack(name, iconsPack);
        if (!icon) {
            return null;
        }
        return {
            name,
            pack: iconsPack.name,
            type: NbIconPackType.SVG,
            icon: this.createSvgIcon(name, icon, iconsPack.params),
        };
    }
    /**
     * Returns Font icon
     * @param {string} name
     * @param {string} pack
     *
     * @returns NbIconDefinition
     */
    getFontIcon(name, pack) {
        const iconsPack = pack ? this.getPackOrThrow(pack) : this.getDefaultPackOrThrow();
        if (iconsPack.type !== NbIconPackType.FONT) {
            throwWrongPackTypeError(iconsPack.name, iconsPack.type, 'Font');
        }
        const icon = this.getIconFromPack(name, iconsPack) ?? '';
        const iconContent = iconsPack.params.ligature ? name : icon;
        return {
            name,
            pack: iconsPack.name,
            type: NbIconPackType.FONT,
            icon: this.createFontIcon(name, iconContent, iconsPack.params),
        };
    }
    /**
     * Returns an icon
     * @param {string} name
     * @param {string} pack
     *
     * @returns NbIconDefinition
     */
    getIcon(name, pack) {
        const iconsPack = pack ? this.getPackOrThrow(pack) : this.getDefaultPackOrThrow();
        if (iconsPack.type === NbIconPackType.SVG) {
            return this.getSvgIcon(name, pack);
        }
        return this.getFontIcon(name, pack);
    }
    createSvgIcon(name, content, params) {
        return content instanceof NbSvgIcon ? content : new NbSvgIcon(name, content, params);
    }
    createFontIcon(name, content, params) {
        return content instanceof NbFontIcon ? content : new NbFontIcon(name, content, params);
    }
    getPackOrThrow(name) {
        const pack = this.packs.get(name);
        if (!pack) {
            throwPackNotFoundError(name);
        }
        return pack;
    }
    getDefaultPackOrThrow() {
        if (!this.defaultPack) {
            throwNoDefaultPackError();
        }
        return this.defaultPack;
    }
    getIconFromPack(name, pack) {
        if (pack.icons.has(name)) {
            return pack.icons.get(name);
        }
        return null;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbIconLibraries, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbIconLibraries, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbIconLibraries, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNvbi1saWJyYXJpZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvZnJhbWV3b3JrL3RoZW1lL2NvbXBvbmVudHMvaWNvbi9pY29uLWxpYnJhcmllcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQXNELGNBQWMsRUFBVyxNQUFNLGFBQWEsQ0FBQztBQUMxRyxPQUFPLEVBQUUsVUFBVSxFQUFVLFNBQVMsRUFBRSxNQUFNLFFBQVEsQ0FBQzs7QUFFdkQsTUFBTSxPQUFPLGdCQUFnQjtDQUs1QjtBQUVELFNBQVMsc0JBQXNCLENBQUMsSUFBWTtJQUMxQyxNQUFNLEtBQUssQ0FBQyxjQUFjLElBQUkscUJBQXFCLENBQUMsQ0FBQztBQUN2RCxDQUFDO0FBRUQsU0FBUyx1QkFBdUI7SUFDOUIsTUFBTSxLQUFLLENBQUMsaUNBQWlDLENBQUMsQ0FBQztBQUNqRCxDQUFDO0FBRUQsU0FBUyx1QkFBdUIsQ0FBQyxJQUFZLEVBQUUsSUFBWSxFQUFFLFdBQW1CO0lBQzlFLE1BQU0sS0FBSyxDQUFDLFNBQVMsSUFBSSxnQkFBZ0IsV0FBVywyQkFBMkIsSUFBSSxHQUFHLENBQUMsQ0FBQztBQUMxRixDQUFDO0FBRUQ7O0dBRUc7QUFFSCxNQUFNLE9BQU8sZUFBZTtJQUQ1QjtRQUVZLFVBQUssR0FBNEIsSUFBSSxHQUFHLEVBQUUsQ0FBQztLQXdKdEQ7SUFySkM7Ozs7O09BS0c7SUFDSCxlQUFlLENBQUMsSUFBWSxFQUFFLEtBQWMsRUFBRSxTQUEyQixFQUFFO1FBQ3pFLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRTtZQUNuQixJQUFJO1lBQ0osS0FBSyxFQUFFLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDckMsTUFBTTtZQUNOLElB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QzdCLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDdEIsdUJBQXVCLEVBQUUsQ0FBQztRQUM1QixDQUFDO1FBQ0QsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQzFCLENBQUM7SUFFUyxlQUFlLENBQUMsSUFBWSxFQUFFLElBQWdCO1FBQ3RELElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUN6QixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlCLENBQUM7UUFFRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7OEdBeEpVLGVBQWU7a0hBQWYsZUFBZSxjQURGLE1BQU07OzJGQUNuQixlQUFlO2tCQUQzQixVQUFVO21CQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBBa3Zlby4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmJGb250SWNvblBhY2tQYXJhbXMsIE5iSWNvblBhY2ssIE5iSWNvblBhY2tQYXJhbXMsIE5iSWNvblBhY2tUeXBlLCBOYkljb25zIH0gZnJvbSAnLi9pY29uLXBhY2snO1xuaW1wb3J0IHsgTmJGb250SWNvbiwgTmJJY29uLCBOYlN2Z0ljb24gfSBmcm9tICcuL2ljb24nO1xuXG5leHBvcnQgY2xhc3MgTmJJY29uRGVmaW5pdGlvbiB7XG4gIG5hbWU6IHN0cmluZztcbiAgdHlwZTogc3RyaW5nO1xuICBwYWNrOiBzdHJpbmc7XG4gIGljb246IE5iSWNvbjtcbn1cblxuZnVuY3Rpb24gdGhyb3dQYWNrTm90Rm91bmRFcnJvcihuYW1lOiBzdHJpbmcpIHtcbiAgdGhyb3cgRXJyb3IoYEljb24gUGFjayAnJHtuYW1lfScgaXMgbm90IHJlZ2lzdGVyZWRgKTtcbn1cblxuZnVuY3Rpb24gdGhyb3dOb0RlZmF1bHRQYWNrRXJyb3IoKSB7XG4gIHRocm93IEVycm9yKCdEZWZhdWx0IHBhY2sgaXMgbm90IHJlZ2lzdGVyZWQuJyk7XG59XG5cbmZ1bmN0aW9uIHRocm93V3JvbmdQYWNrVHlwZUVycm9yKG5hbWU6IHN0cmluZywgdHlwZTogc3RyaW5nLCBkZXNpcmVkVHlwZTogc3RyaW5nKSB7XG4gIHRocm93IEVycm9yKGBQYWNrICcke25hbWV9JyBpcyBub3QgYW4gJyR7ZGVzaXJlZFR5cGV9JyBQYWNrIGFuZCBpdHMgdHlwZSBpcyAnJHt0eXBlfSdgKTtcbn1cblxuLyoqXG4gKiBUaGlzIHNlcnZpY2UgYWxsb3dzIHRvIHJlZ2lzdGVyIG11bHRpcGxlIGljb24gcGFja3MgdG8gdXNlIHRoZW0gbGF0ZXIgd2l0aGluIGA8bmItaWNvbj48L25iLWljb24+YCBjb21wb25lbnQuXG4gKi9cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgTmJJY29uTGlicmFyaWVzIHtcbiAgcHJvdGVjdGVkIHBhY2tzOiBNYXA8c3RyaW5nLCBOYkljb25QYWNrPiA9IG5ldyBNYXAoKTtcbiAgcHJvdGVjdGVkIGRlZmF1bHRQYWNrOiBOYkljb25QYWNrO1xuXG4gIC8qKlxuICAgKiBSZWdpc3RlcnMgbmV3IFN2ZyBpY29uIHBhY2tcbiAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAgICogQHBhcmFtIHtOYkljb259IGljb25zXG4gICAqIEBwYXJhbSB7TmJJY29uUGFja1BhcmFtc30gcGFyYW1zXG4gICAqL1xuICByZWdpc3RlclN2Z1BhY2sobmFtZTogc3RyaW5nLCBpY29uczogTmJJY29ucywgcGFyYW1zOiBOYkljb25QYWNrUGFyYW1zID0ge30pIHtcbiAgICB0aGlzLnBhY2tzLnNldChuYW1lLCB7XG4gICAgICBuYW1lLFxuICAgICAgaWNvbnM6IG5ldyBNYXAoT2JqZWN0LmVudHJpZXMoaWNvbnMpKSxcbiAgICAgIHBhcmFtcyxcbiAgICAgIHR5cGU6IE5iSWNvblBhY2tUeXBlLlNWRyxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlcnMgbmV3IGZvbnQgcGFja1xuICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICAgKiBAcGFyYW0ge05iSWNvblBhY2tQYXJhbXN9IHBhcmFtc1xuICAgKi9cbiAgcmVnaXN0ZXJGb250UGFjayhuYW1lOiBzdHJpbmcsIHBhcmFtczogTmJGb250SWNvblBhY2tQYXJhbXMgPSB7fSkge1xuICAgIHRoaXMucGFja3Muc2V0KG5hbWUsIHtcbiAgICAgIG5hbWUsXG4gICAgICBwYXJhbXMsXG4gICAgICBpY29uczogbmV3IE1hcCgpLFxuICAgICAgdHlwZTogTmJJY29uUGFja1R5cGUuRk9OVCxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHBhY2sgYnkgbmFtZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICAgKi9cbiAgZ2V0UGFjayhuYW1lOiBzdHJpbmcpOiBOYkljb25QYWNrIHtcbiAgICByZXR1cm4gdGhpcy5wYWNrcy5nZXQobmFtZSk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyBwYWNrIGFzIGEgZGVmYXVsdFxuICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICAgKi9cbiAgc2V0RGVmYXVsdFBhY2sobmFtZTogc3RyaW5nKSB7XG4gICAgaWYgKCF0aGlzLnBhY2tzLmhhcyhuYW1lKSkge1xuICAgICAgdGhyb3dQYWNrTm90Rm91bmRFcnJvcihuYW1lKTtcbiAgICB9XG5cbiAgICB0aGlzLmRlZmF1bHRQYWNrID0gdGhpcy5wYWNrcy5nZXQobmFtZSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBTdmcgaWNvblxuICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gcGFja1xuICAgKlxuICAgKiBAcmV0dXJucyBOYkljb25EZWZpbml0aW9uXG4gICAqL1xuICBnZXRTdmdJY29uKG5hbWU6IHN0cmluZywgcGFjaz86IHN0cmluZyk6IE5iSWNvbkRlZmluaXRpb24gfCBudWxsIHtcbiAgICBjb25zdCBpY29uc1BhY2sgPSBwYWNrID8gdGhpcy5nZXRQYWNrT3JUaHJvdyhwYWNrKSA6IHRoaXMuZ2V0RGVmYXVsdFBhY2tPclRocm93KCk7XG5cbiAgICBpZiAoaWNvbnNQYWNrLnR5cGUgIT09IE5iSWNvblBhY2tUeXBlLlNWRykge1xuICAgICAgdGhyb3dXcm9uZ1BhY2tUeXBlRXJyb3IoaWNvbnNQYWNrLm5hbWUsIGljb25zUGFjay50eXBlLCAnU1ZHJyk7XG4gICAgfVxuXG4gICAgY29uc3QgaWNvbiA9IHRoaXMuZ2V0SWNvbkZyb21QYWNrKG5hbWUsIGljb25zUGFjayk7XG5cbiAgICBpZiAoIWljb24pIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBuYW1lLFxuICAgICAgcGFjazogaWNvbnNQYWNrLm5hbWUsXG4gICAgICB0eXBlOiBOYkljb25QYWNrVHlwZS5TVkcsXG4gICAgICBpY29uOiB0aGlzLmNyZWF0ZVN2Z0ljb24obmFtZSwgaWNvbiwgaWNvbnNQYWNrLnBhcmFtcyksXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIEZvbnQgaWNvblxuICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gcGFja1xuICAgKlxuICAgKiBAcmV0dXJucyBOYkljb25EZWZpbml0aW9uXG4gICAqL1xuICBnZXRGb250SWNvbihuYW1lOiBzdHJpbmcsIHBhY2s/OiBzdHJpbmcpOiBOYkljb25EZWZpbml0aW9uIHtcbiAgICBjb25zdCBpY29uc1BhY2sgPSBwYWNrID8gdGhpcy5nZXRQYWNrT3JUaHJvdyhwYWNrKSA6IHRoaXMuZ2V0RGVmYXVsdFBhY2tPclRocm93KCk7XG5cbiAgICBpZiAoaWNvbnNQYWNrLnR5cGUgIT09IE5iSWNvblBhY2tUeXBlLkZPTlQpIHtcbiAgICAgIHRocm93V3JvbmdQYWNrVHlwZUVycm9yKGljb25zUGFjay5uYW1lLCBpY29uc1BhY2sudHlwZSwgJ0ZvbnQnKTtcbiAgICB9XG5cbiAgICBjb25zdCBpY29uID0gdGhpcy5nZXRJY29uRnJvbVBhY2sobmFtZSwgaWNvbnNQYWNrKSA/PyAnJztcbiAgICBjb25zdCBpY29uQ29udGVudCA9IGljb25zUGFjay5wYXJhbXMubGlnYXR1cmUgPyBuYW1lIDogaWNvbjtcblxuICAgIHJldHVybiB7XG4gICAgICBuYW1lLFxuICAgICAgcGFjazogaWNvbnNQYWNrLm5hbWUsXG4gICAgICB0eXBlOiBOYkljb25QYWNrVHlwZS5GT05ULFxuICAgICAgaWNvbjogdGhpcy5jcmVhdGVGb250SWNvbihuYW1lLCBpY29uQ29udGVudCwgaWNvbnNQYWNrLnBhcmFtcyksXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFuIGljb25cbiAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAgICogQHBhcmFtIHtzdHJpbmd9IHBhY2tcbiAgICpcbiAgICogQHJldHVybnMgTmJJY29uRGVmaW5pdGlvblxuICAgKi9cbiAgZ2V0SWNvbihuYW1lOiBzdHJpbmcsIHBhY2s/OiBzdHJpbmcpOiBOYkljb25EZWZpbml0aW9uIHwgbnVsbCB7XG4gICAgY29uc3QgaWNvbnNQYWNrID0gcGFjayA/IHRoaXMuZ2V0UGFja09yVGhyb3cocGFjaykgOiB0aGlzLmdldERlZmF1bHRQYWNrT3JUaHJvdygpO1xuXG4gICAgaWYgKGljb25zUGFjay50eXBlID09PSBOYkljb25QYWNrVHlwZS5TVkcpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldFN2Z0ljb24obmFtZSwgcGFjayk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuZ2V0Rm9udEljb24obmFtZSwgcGFjayk7XG4gIH1cblxuICBwcm90ZWN0ZWQgY3JlYXRlU3ZnSWNvbihuYW1lOiBzdHJpbmcsIGNvbnRlbnQ6IE5iSWNvbiB8IHN0cmluZywgcGFyYW1zOiBOYkljb25QYWNrUGFyYW1zKTogTmJTdmdJY29uIHtcbiAgICByZXR1cm4gY29udGVudCBpbnN0YW5jZW9mIE5iU3ZnSWNvbiA/IGNvbnRlbnQgOiBuZXcgTmJTdmdJY29uKG5hbWUsIGNvbnRlbnQsIHBhcmFtcyk7XG4gIH1cblxuICBwcm90ZWN0ZWQgY3JlYXRlRm9udEljb24obmFtZTogc3RyaW5nLCBjb250ZW50OiBOYkljb24gfCBzdHJpbmcsIHBhcmFtczogTmJGb250SWNvblBhY2tQYXJhbXMpOiBOYkZvbnRJY29uIHtcbiAgICByZXR1cm4gY29udGVudCBpbnN0YW5jZW9mIE5iRm9udEljb24gPyBjb250ZW50IDogbmV3IE5iRm9udEljb24obmFtZSwgY29udGVudCwgcGFyYW1zKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRQYWNrT3JUaHJvdyhuYW1lOiBzdHJpbmcpOiBOYkljb25QYWNrIHtcbiAgICBjb25zdCBwYWNrOiBOYkljb25QYWNrID0gdGhpcy5wYWNrcy5nZXQobmFtZSk7XG4gICAgaWYgKCFwYWNrKSB7XG4gICAgICB0aHJvd1BhY2tOb3RGb3VuZEVycm9yKG5hbWUpO1xuICAgIH1cbiAgICByZXR1cm4gcGFjaztcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXREZWZhdWx0UGFja09yVGhyb3coKTogTmJJY29uUGFjayB7XG4gICAgaWYgKCF0aGlzLmRlZmF1bHRQYWNrKSB7XG4gICAgICB0aHJvd05vRGVmYXVsdFBhY2tFcnJvcigpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5kZWZhdWx0UGFjaztcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRJY29uRnJvbVBhY2sobmFtZTogc3RyaW5nLCBwYWNrOiBOYkljb25QYWNrKTogTmJJY29uIHwgc3RyaW5nIHwgbnVsbCB7XG4gICAgaWYgKHBhY2suaWNvbnMuaGFzKG5hbWUpKSB7XG4gICAgICByZXR1cm4gcGFjay5pY29ucy5nZXQobmFtZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cbiJdfQ==