/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, HostBinding, Input, Output, ViewChild, } from '@angular/core';
import { NavigationEnd } from '@angular/router';
import { of as observableOf, Subject } from 'rxjs';
import { filter, delay, takeUntil } from 'rxjs/operators';
import { NbPortalDirective } from '../cdk/overlay/mapping';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "../icon/icon.component";
import * as i3 from "../button/button.component";
import * as i4 from "./search.service";
import * as i5 from "../../services/theme.service";
import * as i6 from "@angular/router";
import * as i7 from "../cdk/overlay/overlay-service";
import * as i8 from "../cdk/overlay/mapping";
/**
 * search-field-component is used under the hood by nb-search component
 * can't be used itself
 */
export class NbSearchFieldComponent {
    constructor() {
        this.show = false;
        this.close = new EventEmitter();
        this.search = new EventEmitter();
        this.searchInput = new EventEmitter();
    }
    static { this.TYPE_MODAL_ZOOMIN = 'modal-zoomin'; }
    static { this.TYPE_ROTATE_LAYOUT = 'rotate-layout'; }
    static { this.TYPE_MODAL_MOVE = 'modal-move'; }
    static { this.TYPE_CURTAIN = 'curtain'; }
    static { this.TYPE_COLUMN_CURTAIN = 'column-curtain'; }
    static { this.TYPE_MODAL_DROP = 'modal-drop'; }
    static { this.TYPE_MODAL_HALF = 'modal-half'; }
    get showClass() {
        return this.show;
    }
    get modalZoomin() {
        return this.type === NbSearchFieldComponent.TYPE_MODAL_ZOOMIN;
    }
    get rotateLayout() {
        return this.type === NbSearchFieldComponent.TYPE_ROTATE_LAYOUT;
    }
    get modalMove() {
        return this.type === NbSearchFieldComponent.TYPE_MODAL_MOVE;
    }
    get curtain() {
        return this.type === NbSearchFieldComponent.TYPE_CURTAIN;
    }
    get columnCurtain() {
        return this.type === NbSearchFieldComponent.TYPE_COLUMN_CURTAIN;
    }
    get modalDrop() {
        return this.type === NbSearchFieldComponent.TYPE_MODAL_DROP;
    }
    get modalHalf() {
        return this.type === NbSearchFieldComponent.TYPE_MODAL_HALF;
    }
    ngOnChanges({ show }) {
        const becameHidden = !show.isFirstChange() && show.currentValue === false;
        if (becameHidden && this.inputElement) {
            this.inputElement.nativeElement.value = '';
        }
        this.focusInput();
    }
    ngAfterViewInit() {
        this.focusInput();
    }
    emitClose() {
        this.close.emit();
    }
    submitSearch(term) {
        if (term) {
            this.search.emit(term);
        }
    }
    emitSearchInput(term) {
        this.searchInput.emit(term);
    }
    focusInput() {
        if (this.show && this.inputElement) {
            this.inputElement.nativeElement.focus();
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbSearchFieldComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.1.0", type: NbSearchFieldComponent, selector: "nb-search-field", inputs: { type: "type", placeholder: "placeholder", hint: "hint", show: "show" }, outputs: { close: "close", search: "search", searchInput: "searchInput" }, host: { properties: { "class.show": "this.showClass", "class.modal-zoomin": "this.modalZoomin", "class.rotate-layout": "this.rotateLayout", "class.modal-move": "this.modalMove", "class.curtain": "this.curtain", "class.column-curtain": "this.columnCurtain", "class.modal-drop": "this.modalDrop", "class.modal-half": "this.modalHalf" } }, viewQueries: [{ propertyName: "inputElement", first: true, predicate: ["searchInput"], descendants: true }], usesOnChanges: true, ngImport: i0, template: `
    <div class="search" (keyup.esc)="emitClose()">
      <button (click)="emitClose()" nbButton ghost class="close-button">
        <nb-icon icon="close-outline" pack="nebular-essentials"></nb-icon>
      </button>
      <div class="form-wrapper">
        <form class="form" (keyup.enter)="submitSearch(searchInput.value)">
          <div class="form-content">
            <input class="search-input"
                   #searchInput
                   (input)="emitSearchInput(searchInput.value)"
                   autocomplete="off"
                   [attr.placeholder]="placeholder"
                   tabindex="-1"
                   (blur)="focusInput()"/>
          </div>
          <span class="info">{{ hint }}</span>
        </form>
      </div>
    </div>
  `, isInline: true, styles: ["/**\n* @license\n* Copyright Akveo. All Rights Reserved.\n* Licensed under the MIT License. See License.txt in the project root for license information.\n*//**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */:host button{margin:0;padding:0;cursor:pointer;border:none;background:none}:host button:focus{box-shadow:none;outline:none}:host input{border-top:0;border-right:0;border-left:0;background:transparent;border-radius:0;line-height:1;display:inline-block;box-sizing:border-box;padding:.05rem 0;-webkit-appearance:none}:host input:focus{outline:none}:host input::placeholder{opacity:.3}:host span{font-size:90%;font-weight:700;display:block;width:75%;margin:0 auto;padding:.85rem 0;text-align:right}:host.modal-zoomin{display:block}:host.modal-zoomin .search{display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;position:fixed;z-index:1050;top:0;left:0;width:100%;height:100vh;pointer-events:none;opacity:0;transition:opacity .5s}:host.modal-zoomin .search:before,:host.modal-zoomin .search:after{content:\"\";position:absolute;width:calc(100% + 15px);height:calc(100% + 15px);pointer-events:none}:host.modal-zoomin .search:before{top:0;left:0;border-right-width:0;border-bottom-width:0;transform:translate3d(-15px,-15px,0)}:host.modal-zoomin .search:after{right:0;bottom:0;border-top-width:0;border-left-width:0;transform:translate3d(15px,15px,0)}:host.modal-zoomin .search button{position:absolute;top:3rem;font-size:2.5rem}[dir=ltr] :host.modal-zoomin .search button{right:3rem}[dir=rtl] :host.modal-zoomin .search button{left:3rem}:host.modal-zoomin .search input{font-size:10vw;width:75%}:host.modal-zoomin .search button{opacity:0;transform:scale3d(.8,.8,1);transition:opacity .5s,transform .5s}:host.modal-zoomin .search form{opacity:0;transform:scale3d(.8,.8,1);transition:opacity .5s,transform .5s}:host.modal-zoomin.show .search{pointer-events:auto;opacity:1}:host.modal-zoomin.show .search:before,:host.modal-zoomin.show .search:after{transform:translateZ(0);transition:transform .5s}:host.modal-zoomin.show .search button{opacity:1;transform:scaleZ(1)}:host.modal-zoomin.show .search form{opacity:1;transform:scaleZ(1)}@media screen and (max-width: 40rem){:host.modal-zoomin form{margin:5rem 0 1rem}:host.modal-zoomin span{text-align:left}}\n", "/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */::ng-deep nb-layout.rotate-layout{position:fixed;overflow:hidden;width:100%}::ng-deep nb-layout.rotate-layout .scrollable-container{position:relative;z-index:10001;transition:transform .5s cubic-bezier(.2,1,.3,1)}::ng-deep nb-layout.rotate-layout.with-search .scrollable-container{transition:transform .5s cubic-bezier(.2,1,.3,1);transform-origin:50vw 50vh;transform:perspective(1000px) translate3d(0,50vh,0) rotateX(30deg);pointer-events:none}:host.rotate-layout{position:absolute;display:block;width:100vw;height:100vh;pointer-events:none;opacity:0;transition-property:opacity;transition-delay:.4s}:host.rotate-layout .search{display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;z-index:1050;position:fixed;top:0;left:0;width:100%;height:50vh;pointer-events:none;opacity:0;transition:opacity .5s;transition-timing-function:cubic-bezier(.2,1,.3,1)}:host.rotate-layout .search button{position:absolute;top:3rem;font-size:2.5rem;opacity:0;transform:scale3d(.8,.8,1);transition:opacity .5s,transform .5s;transition-timing-function:cubic-bezier(.2,1,.3,1)}[dir=ltr] :host.rotate-layout .search button{right:3rem}[dir=rtl] :host.rotate-layout .search button{left:3rem}:host.rotate-layout .search form{margin:5rem 0;opacity:0;transform:scale3d(.7,.7,1);transition:opacity .5s,transform .5s;transition-timing-function:cubic-bezier(.2,1,.3,1)}:host.rotate-layout .search input{font-size:7vw;width:75%}:host.rotate-layout.show{opacity:1;transition-delay:0s}:host.rotate-layout.show .search{pointer-events:auto;opacity:1}:host.rotate-layout.show .search button{opacity:1;transform:scaleZ(1)}:host.rotate-layout.show .search form{opacity:1;transform:scaleZ(1)}\n", "/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */::ng-deep nb-layout.modal-move .layout{transition:transform .5s}::ng-deep nb-layout.modal-move.with-search .layout{transform:scale3d(.8,.8,1);pointer-events:none}:host.modal-move .search{display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;position:fixed;z-index:1050;top:0;left:0;width:100%;height:100vh;pointer-events:none;opacity:0;transition:opacity .5s}:host.modal-move .search button{position:absolute;top:3rem;font-size:2.5rem;opacity:0;transition:opacity .5s}[dir=ltr] :host.modal-move .search button{right:3rem}[dir=rtl] :host.modal-move .search button{left:3rem}:host.modal-move .search form{margin:5rem 0;opacity:0;transform:scale3d(.8,.8,1);transition:opacity .5s,transform .5s}:host.modal-move .search input{font-size:10vw;width:75%;transform:scale3d(0,1,1);transform-origin:0 50%;transition:transform .3s}:host.modal-move.show .search{pointer-events:auto;opacity:1}:host.modal-move.show .search button{opacity:1}:host.modal-move.show .search form{opacity:1;transform:scaleZ(1)}:host.modal-move.show .search input{transform:scaleZ(1);transition-duration:.5s}@media screen and (max-width: 40rem){:host.modal-move span{text-align:left}}\n", "/**\n* @license\n* Copyright Akveo. All Rights Reserved.\n* Licensed under the MIT License. See License.txt in the project root for license information.\n*//**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */:host.curtain .search{position:fixed;z-index:1050;top:0;left:100%;overflow:hidden;height:100vh;width:100%;padding:3rem;pointer-events:none;transition:transform .3s;transition-delay:.4s;transition-timing-function:ease-out}:host.curtain .search:after{content:\"\";position:absolute;top:0;left:0;width:100%;height:100%;transition:transform .3s;transition-timing-function:ease-out}:host.curtain .search button{font-size:2.5rem;position:absolute;top:3rem;transition:opacity .1s;transition-delay:.3s}[dir=ltr] :host.curtain .search button{right:3rem}[dir=rtl] :host.curtain .search button{left:3rem}:host.curtain .search form{width:50%;opacity:0;transform:scale3d(.8,.8,1);transition:opacity .5s,transform .5s}:host.curtain .search input{width:100%;font-size:6vw}:host.curtain.show .search{width:100%;pointer-events:auto;transform:translate3d(-100%,0,0);transition-delay:0s}:host.curtain.show .search:after{transform:translate3d(100%,0,0);transition-delay:.4s}:host.curtain.show .search button{opacity:1;transform:scaleZ(1)}:host.curtain.show .search form{opacity:1;transform:scaleZ(1)}@media screen and (max-width: 40em){:host.curtain span{width:90%}:host.curtain input{font-size:2em;width:90%}}::ng-deep nb-layout.curtain .scrollable-container{position:relative;z-index:0}\n", "/**\n* @license\n* Copyright Akveo. All Rights Reserved.\n* Licensed under the MIT License. See License.txt in the project root for license information.\n*//**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */::ng-deep nb-layout.column-curtain.with-search .layout{pointer-events:none}:host.column-curtain{display:block;position:fixed;z-index:1050;top:0;left:50%;overflow:hidden;width:50%;height:100vh;pointer-events:none}:host.column-curtain:before{content:\"\";position:absolute;top:0;left:0;width:100%;height:100%;transform:scale3d(0,1,1);transform-origin:0 50%;transition:transform .3s;transition-timing-function:cubic-bezier(.86,0,.07,1)}:host.column-curtain .search{position:relative;padding:2.5rem 1.5rem 0;background:transparent}:host.column-curtain .search button{position:absolute;top:2rem;font-size:2.5rem;opacity:0;transition:opacity .5s}[dir=ltr] :host.column-curtain .search button{right:2rem}[dir=rtl] :host.column-curtain .search button{left:2rem}:host.column-curtain .search form{width:85%;transform:translate3d(-150%,0,0);transition:transform .3s}:host.column-curtain .search input{font-size:2.5rem;width:100%}:host.column-curtain .search span{font-size:85%}:host.column-curtain.show{pointer-events:auto}:host.column-curtain.show:before{transform:scaleZ(1)}:host.column-curtain.show .search form{transform:translateZ(0);transition-delay:.15s;transition-timing-function:cubic-bezier(.86,0,.07,1)}:host.column-curtain.show .search button{opacity:1;z-index:100}@media screen and (max-width: 40rem){:host.column-curtain span{width:90%}:host.column-curtain input{font-size:2rem;width:90%}}\n", "/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */::ng-deep nb-layout.modal-drop .layout{position:relative;transition:transform .4s,opacity .4s;transition-timing-function:cubic-bezier(.4,0,.2,1)}::ng-deep nb-layout.modal-drop.with-search .layout{opacity:0;transform:scale3d(.9,.9,1);pointer-events:none}:host.modal-drop .search{display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;z-index:1050;position:fixed;top:0;left:0;width:100%;height:100vh;background:none;pointer-events:none}:host.modal-drop .search:before{content:\"\";position:absolute;top:0;right:0;width:100%;height:100%;opacity:0;transition:opacity .4s}:host.modal-drop .search button{font-size:2.5rem;position:absolute;top:3rem;display:block;opacity:0;transition:opacity .4s}[dir=ltr] :host.modal-drop .search button{right:3rem}[dir=rtl] :host.modal-drop .search button{left:3rem}:host.modal-drop .search form{position:relative;margin:5rem 0 2rem}:host.modal-drop .search input{font-size:6vw;width:60%;padding:.25rem;text-align:center;opacity:0;transition:opacity .4s}:host.modal-drop .search span{position:relative;z-index:9;display:block;width:60%;padding:.85rem 0;opacity:0;transform:translate3d(0,-50px,0);transition:opacity .4s,transform .4s}:host.modal-drop .search .form-content{position:relative;z-index:10;overflow:hidden;transform:translate3d(0,-50px,0);transition:transform .4s}:host.modal-drop .search .form-content:after{content:\"\";position:absolute;top:0;left:20%;width:60%;height:105%;opacity:0;transform-origin:50% 0}:host.modal-drop.show .search{pointer-events:auto}:host.modal-drop.show .search:before{opacity:1}:host.modal-drop.show .search button{opacity:1}:host.modal-drop.show .search .form-content{transform:translateZ(0);transition:none}:host.modal-drop.show .search .form-content:after{animation:scaleUpDown .8s cubic-bezier(.4,0,.2,1) forwards}:host.modal-drop.show .search input{opacity:1;transition:opacity 0s .4s}:host.modal-drop.show .search span{opacity:1;transform:translateZ(0);transition-delay:.4s;transition-timing-function:ease-out}@keyframes scaleUpDown{0%{opacity:1;transform:scale3d(1,0,1)}50%{transform:scaleZ(1);transform-origin:50% 0;transition-timing-function:ease-out}50.1%{transform-origin:50% 100%;transition-timing-function:ease-out}to{opacity:1;transform:scale3d(1,0,1);transform-origin:50% 100%;transition-timing-function:ease-out}}@media screen and (max-width: 40rem){:host.modal-drop form{margin:2rem 0}:host.modal-drop input{width:100%;left:0}}\n", "/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */::ng-deep nb-layout.modal-half .layout{transition:transform .6s,opacity .6s;transition-timing-function:cubic-bezier(.2,1,.3,1)}::ng-deep nb-layout.modal-half.with-search .layout{transform:scale3d(.8,.8,1);pointer-events:none}:host.modal-half .search{text-align:center;position:fixed;z-index:1050;top:0;left:0;overflow:hidden;width:100%;height:100vh;background:none;pointer-events:none}:host.modal-half .search:before{content:\"\";position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;opacity:0;transition:opacity .6s;transition-timing-function:cubic-bezier(.2,1,.3,1)}:host.modal-half .search button{font-size:2.5rem;position:absolute;top:3rem;display:block;z-index:100;opacity:0;transform:scale3d(.8,.8,1);transition:opacity .6s,transform .6s;transition-timing-function:cubic-bezier(.2,1,.3,1)}[dir=ltr] :host.modal-half .search button{right:3rem}[dir=rtl] :host.modal-half .search button{left:3rem}:host.modal-half .search .form-wrapper{position:absolute;display:flex;justify-content:center;align-items:center;width:100%;height:50%;transition:transform .6s;transition-timing-function:cubic-bezier(.2,1,.3,1);transform:translate3d(0,-100%,0)}:host.modal-half .search form{width:75%;margin:0 auto}:host.modal-half .search input{font-size:7vw;width:100%}:host.modal-half.show .search{pointer-events:auto}:host.modal-half.show .search:before{opacity:1}:host.modal-half.show .search button{opacity:1;transform:scaleZ(1)}:host.modal-half.show .search .form-wrapper{transform:translateZ(0)}\n"], dependencies: [{ kind: "directive", type: i1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i1.NgForm, selector: "form:not([ngNoForm]):not([formGroup]),ng-form,[ngForm]", inputs: ["ngFormOptions"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "component", type: i2.NbIconComponent, selector: "nb-icon", inputs: ["icon", "pack", "options", "status", "config"] }, { kind: "component", type: i3.NbButtonComponent, selector: "button[nbButton],a[nbButton],input[type=\"button\"][nbButton],input[type=\"submit\"][nbButton]", inputs: ["hero"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbSearchFieldComponent, decorators: [{
            type: Component,
            args: [{ selector: 'nb-search-field', changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <div class="search" (keyup.esc)="emitClose()">
      <button (click)="emitClose()" nbButton ghost class="close-button">
        <nb-icon icon="close-outline" pack="nebular-essentials"></nb-icon>
      </button>
      <div class="form-wrapper">
        <form class="form" (keyup.enter)="submitSearch(searchInput.value)">
          <div class="form-content">
            <input class="search-input"
                   #searchInput
                   (input)="emitSearchInput(searchInput.value)"
                   autocomplete="off"
                   [attr.placeholder]="placeholder"
                   tabindex="-1"
                   (blur)="focusInput()"/>
          </div>
          <span class="info">{{ hint }}</span>
        </form>
      </div>
    </div>
  `, styles: ["/**\n* @license\n* Copyright Akveo. All Rights Reserved.\n* Licensed under the MIT License. See License.txt in the project root for license information.\n*//**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */:host button{margin:0;padding:0;cursor:pointer;border:none;background:none}:host button:focus{box-shadow:none;outline:none}:host input{border-top:0;border-right:0;border-left:0;background:transparent;border-radius:0;line-height:1;display:inline-block;box-sizing:border-box;padding:.05rem 0;-webkit-appearance:none}:host input:focus{outline:none}:host input::placeholder{opacity:.3}:host span{font-size:90%;font-weight:700;display:block;width:75%;margin:0 auto;padding:.85rem 0;text-align:right}:host.modal-zoomin{display:block}:host.modal-zoomin .search{display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;position:fixed;z-index:1050;top:0;left:0;width:100%;height:100vh;pointer-events:none;opacity:0;transition:opacity .5s}:host.modal-zoomin .search:before,:host.modal-zoomin .search:after{content:\"\";position:absolute;width:calc(100% + 15px);height:calc(100% + 15px);pointer-events:none}:host.modal-zoomin .search:before{top:0;left:0;border-right-width:0;border-bottom-width:0;transform:translate3d(-15px,-15px,0)}:host.modal-zoomin .search:after{right:0;bottom:0;border-top-width:0;border-left-width:0;transform:translate3d(15px,15px,0)}:host.modal-zoomin .search button{position:absolute;top:3rem;font-size:2.5rem}[dir=ltr] :host.modal-zoomin .search button{right:3rem}[dir=rtl] :host.modal-zoomin .search button{left:3rem}:host.modal-zoomin .search input{font-size:10vw;width:75%}:host.modal-zoomin .search button{opacity:0;transform:scale3d(.8,.8,1);transition:opacity .5s,transform .5s}:host.modal-zoomin .search form{opacity:0;transform:scale3d(.8,.8,1);transition:opacity .5s,transform .5s}:host.modal-zoomin.show .search{pointer-events:auto;opacity:1}:host.modal-zoomin.show .search:before,:host.modal-zoomin.show .search:after{transform:translateZ(0);transition:transform .5s}:host.modal-zoomin.show .search button{opacity:1;transform:scaleZ(1)}:host.modal-zoomin.show .search form{opacity:1;transform:scaleZ(1)}@media screen and (max-width: 40rem){:host.modal-zoomin form{margin:5rem 0 1rem}:host.modal-zoomin span{text-align:left}}\n", "/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */::ng-deep nb-layout.rotate-layout{position:fixed;overflow:hidden;width:100%}::ng-deep nb-layout.rotate-layout .scrollable-container{position:relative;z-index:10001;transition:transform .5s cubic-bezier(.2,1,.3,1)}::ng-deep nb-layout.rotate-layout.with-search .scrollable-container{transition:transform .5s cubic-bezier(.2,1,.3,1);transform-origin:50vw 50vh;transform:perspective(1000px) translate3d(0,50vh,0) rotateX(30deg);pointer-events:none}:host.rotate-layout{position:absolute;display:block;width:100vw;height:100vh;pointer-events:none;opacity:0;transition-property:opacity;transition-delay:.4s}:host.rotate-layout .search{display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;z-index:1050;position:fixed;top:0;left:0;width:100%;height:50vh;pointer-events:none;opacity:0;transition:opacity .5s;transition-timing-function:cubic-bezier(.2,1,.3,1)}:host.rotate-layout .search button{position:absolute;top:3rem;font-size:2.5rem;opacity:0;transform:scale3d(.8,.8,1);transition:opacity .5s,transform .5s;transition-timing-function:cubic-bezier(.2,1,.3,1)}[dir=ltr] :host.rotate-layout .search button{right:3rem}[dir=rtl] :host.rotate-layout .search button{left:3rem}:host.rotate-layout .search form{margin:5rem 0;opacity:0;transform:scale3d(.7,.7,1);transition:opacity .5s,transform .5s;transition-timing-function:cubic-bezier(.2,1,.3,1)}:host.rotate-layout .search input{font-size:7vw;width:75%}:host.rotate-layout.show{opacity:1;transition-delay:0s}:host.rotate-layout.show .search{pointer-events:auto;opacity:1}:host.rotate-layout.show .search button{opacity:1;transform:scaleZ(1)}:host.rotate-layout.show .search form{opacity:1;transform:scaleZ(1)}\n", "/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */::ng-deep nb-layout.modal-move .layout{transition:transform .5s}::ng-deep nb-layout.modal-move.with-search .layout{transform:scale3d(.8,.8,1);pointer-events:none}:host.modal-move .search{display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;position:fixed;z-index:1050;top:0;left:0;width:100%;height:100vh;pointer-events:none;opacity:0;transition:opacity .5s}:host.modal-move .search button{position:absolute;top:3rem;font-size:2.5rem;opacity:0;transition:opacity .5s}[dir=ltr] :host.modal-move .search button{right:3rem}[dir=rtl] :host.modal-move .search button{left:3rem}:host.modal-move .search form{margin:5rem 0;opacity:0;transform:scale3d(.8,.8,1);transition:opacity .5s,transform .5s}:host.modal-move .search input{font-size:10vw;width:75%;transform:scale3d(0,1,1);transform-origin:0 50%;transition:transform .3s}:host.modal-move.show .search{pointer-events:auto;opacity:1}:host.modal-move.show .search button{opacity:1}:host.modal-move.show .search form{opacity:1;transform:scaleZ(1)}:host.modal-move.show .search input{transform:scaleZ(1);transition-duration:.5s}@media screen and (max-width: 40rem){:host.modal-move span{text-align:left}}\n", "/**\n* @license\n* Copyright Akveo. All Rights Reserved.\n* Licensed under the MIT License. See License.txt in the project root for license information.\n*//**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */:host.curtain .search{position:fixed;z-index:1050;top:0;left:100%;overflow:hidden;height:100vh;width:100%;padding:3rem;pointer-events:none;transition:transform .3s;transition-delay:.4s;transition-timing-function:ease-out}:host.curtain .search:after{content:\"\";position:absolute;top:0;left:0;width:100%;height:100%;transition:transform .3s;transition-timing-function:ease-out}:host.curtain .search button{font-size:2.5rem;position:absolute;top:3rem;transition:opacity .1s;transition-delay:.3s}[dir=ltr] :host.curtain .search button{right:3rem}[dir=rtl] :host.curtain .search button{left:3rem}:host.curtain .search form{width:50%;opacity:0;transform:scale3d(.8,.8,1);transition:opacity .5s,transform .5s}:host.curtain .search input{width:100%;font-size:6vw}:host.curtain.show .search{width:100%;pointer-events:auto;transform:translate3d(-100%,0,0);transition-delay:0s}:host.curtain.show .search:after{transform:translate3d(100%,0,0);transition-delay:.4s}:host.curtain.show .search button{opacity:1;transform:scaleZ(1)}:host.curtain.show .search form{opacity:1;transform:scaleZ(1)}@media screen and (max-width: 40em){:host.curtain span{width:90%}:host.curtain input{font-size:2em;width:90%}}::ng-deep nb-layout.curtain .scrollable-container{position:relative;z-index:0}\n", "/**\n* @license\n* Copyright Akveo. All Rights Reserved.\n* Licensed under the MIT License. See License.txt in the project root for license information.\n*//**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */::ng-deep nb-layout.column-curtain.with-search .layout{pointer-events:none}:host.column-curtain{display:block;position:fixed;z-index:1050;top:0;left:50%;overflow:hidden;width:50%;height:100vh;pointer-events:none}:host.column-curtain:before{content:\"\";position:absolute;top:0;left:0;width:100%;height:100%;transform:scale3d(0,1,1);transform-origin:0 50%;transition:transform .3s;transition-timing-function:cubic-bezier(.86,0,.07,1)}:host.column-curtain .search{position:relative;padding:2.5rem 1.5rem 0;background:transparent}:host.column-curtain .search button{position:absolute;top:2rem;font-size:2.5rem;opacity:0;transition:opacity .5s}[dir=ltr] :host.column-curtain .search button{right:2rem}[dir=rtl] :host.column-curtain .search button{left:2rem}:host.column-curtain .search form{width:85%;transform:translate3d(-150%,0,0);transition:transform .3s}:host.column-curtain .search input{font-size:2.5rem;width:100%}:host.column-curtain .search span{font-size:85%}:host.column-curtain.show{pointer-events:auto}:host.column-curtain.show:before{transform:scaleZ(1)}:host.column-curtain.show .search form{transform:translateZ(0);transition-delay:.15s;transition-timing-function:cubic-bezier(.86,0,.07,1)}:host.column-curtain.show .search button{opacity:1;z-index:100}@media screen and (max-width: 40rem){:host.column-curtain span{width:90%}:host.column-curtain input{font-size:2rem;width:90%}}\n", "/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */::ng-deep nb-layout.modal-drop .layout{position:relative;transition:transform .4s,opacity .4s;transition-timing-function:cubic-bezier(.4,0,.2,1)}::ng-deep nb-layout.modal-drop.with-search .layout{opacity:0;transform:scale3d(.9,.9,1);pointer-events:none}:host.modal-drop .search{display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;z-index:1050;position:fixed;top:0;left:0;width:100%;height:100vh;background:none;pointer-events:none}:host.modal-drop .search:before{content:\"\";position:absolute;top:0;right:0;width:100%;height:100%;opacity:0;transition:opacity .4s}:host.modal-drop .search button{font-size:2.5rem;position:absolute;top:3rem;display:block;opacity:0;transition:opacity .4s}[dir=ltr] :host.modal-drop .search button{right:3rem}[dir=rtl] :host.modal-drop .search button{left:3rem}:host.modal-drop .search form{position:relative;margin:5rem 0 2rem}:host.modal-drop .search input{font-size:6vw;width:60%;padding:.25rem;text-align:center;opacity:0;transition:opacity .4s}:host.modal-drop .search span{position:relative;z-index:9;display:block;width:60%;padding:.85rem 0;opacity:0;transform:translate3d(0,-50px,0);transition:opacity .4s,transform .4s}:host.modal-drop .search .form-content{position:relative;z-index:10;overflow:hidden;transform:translate3d(0,-50px,0);transition:transform .4s}:host.modal-drop .search .form-content:after{content:\"\";position:absolute;top:0;left:20%;width:60%;height:105%;opacity:0;transform-origin:50% 0}:host.modal-drop.show .search{pointer-events:auto}:host.modal-drop.show .search:before{opacity:1}:host.modal-drop.show .search button{opacity:1}:host.modal-drop.show .search .form-content{transform:translateZ(0);transition:none}:host.modal-drop.show .search .form-content:after{animation:scaleUpDown .8s cubic-bezier(.4,0,.2,1) forwards}:host.modal-drop.show .search input{opacity:1;transition:opacity 0s .4s}:host.modal-drop.show .search span{opacity:1;transform:translateZ(0);transition-delay:.4s;transition-timing-function:ease-out}@keyframes scaleUpDown{0%{opacity:1;transform:scale3d(1,0,1)}50%{transform:scaleZ(1);transform-origin:50% 0;transition-timing-function:ease-out}50.1%{transform-origin:50% 100%;transition-timing-function:ease-out}to{opacity:1;transform:scale3d(1,0,1);transform-origin:50% 100%;transition-timing-function:ease-out}}@media screen and (max-width: 40rem){:host.modal-drop form{margin:2rem 0}:host.modal-drop input{width:100%;left:0}}\n", "/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */::ng-deep nb-layout.modal-half .layout{transition:transform .6s,opacity .6s;transition-timing-function:cubic-bezier(.2,1,.3,1)}::ng-deep nb-layout.modal-half.with-search .layout{transform:scale3d(.8,.8,1);pointer-events:none}:host.modal-half .search{text-align:center;position:fixed;z-index:1050;top:0;left:0;overflow:hidden;width:100%;height:100vh;background:none;pointer-events:none}:host.modal-half .search:before{content:\"\";position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;opacity:0;transition:opacity .6s;transition-timing-function:cubic-bezier(.2,1,.3,1)}:host.modal-half .search button{font-size:2.5rem;position:absolute;top:3rem;display:block;z-index:100;opacity:0;transform:scale3d(.8,.8,1);transition:opacity .6s,transform .6s;transition-timing-function:cubic-bezier(.2,1,.3,1)}[dir=ltr] :host.modal-half .search button{right:3rem}[dir=rtl] :host.modal-half .search button{left:3rem}:host.modal-half .search .form-wrapper{position:absolute;display:flex;justify-content:center;align-items:center;width:100%;height:50%;transition:transform .6s;transition-timing-function:cubic-bezier(.2,1,.3,1);transform:translate3d(0,-100%,0)}:host.modal-half .search form{width:75%;margin:0 auto}:host.modal-half .search input{font-size:7vw;width:100%}:host.modal-half.show .search{pointer-events:auto}:host.modal-half.show .search:before{opacity:1}:host.modal-half.show .search button{opacity:1;transform:scaleZ(1)}:host.modal-half.show .search .form-wrapper{transform:translateZ(0)}\n"] }]
        }], propDecorators: { type: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], hint: [{
                type: Input
            }], show: [{
                type: Input
            }], close: [{
                type: Output
            }], search: [{
                type: Output
            }], searchInput: [{
                type: Output
            }], inputElement: [{
                type: ViewChild,
                args: ['searchInput']
            }], showClass: [{
                type: HostBinding,
                args: ['class.show']
            }], modalZoomin: [{
                type: HostBinding,
                args: ['class.modal-zoomin']
            }], rotateLayout: [{
                type: HostBinding,
                args: ['class.rotate-layout']
            }], modalMove: [{
                type: HostBinding,
                args: ['class.modal-move']
            }], curtain: [{
                type: HostBinding,
                args: ['class.curtain']
            }], columnCurtain: [{
                type: HostBinding,
                args: ['class.column-curtain']
            }], modalDrop: [{
                type: HostBinding,
                args: ['class.modal-drop']
            }], modalHalf: [{
                type: HostBinding,
                args: ['class.modal-half']
            }] } });
/**
 * Beautiful full-page search control.
 *
 * @stacked-example(Showcase, search/search-showcase.component)
 *
 * Basic setup:
 *
 * ```ts
 *  <nb-search type="rotate-layout"></nb-search>
 * ```
 * ### Installation
 *
 * Import `NbSearchModule` to your feature module.
 * ```ts
 * @NgModule({
 *   imports: [
 *     // ...
 *     NbSearchModule,
 *   ],
 * })
 * export class PageModule { }
 * ```
 * ### Usage
 *
 * Several animation types are available:
 * modal-zoomin, rotate-layout, modal-move, curtain, column-curtain, modal-drop, modal-half
 *
 * It is also possible to handle search event using `NbSearchService`:
 *
 * @stacked-example(Search Event, search/search-event.component)
 *
 * @styles
 *
 * search-background-color:
 * search-divider-color:
 * search-divider-style:
 * search-divider-width:
 * search-extra-background-color:
 * search-text-color:
 * search-text-font-family:
 * search-text-font-size:
 * search-text-font-weight:
 * search-text-line-height:
 * search-placeholder-text-color:
 * search-info-text-color:
 * search-info-text-font-family:
 * search-info-text-font-size:
 * search-info-text-font-weight:
 * search-info-text-line-height:
 */
export class NbSearchComponent {
    constructor(searchService, themeService, router, overlayService, changeDetector) {
        this.searchService = searchService;
        this.themeService = themeService;
        this.router = router;
        this.overlayService = overlayService;
        this.changeDetector = changeDetector;
        this.destroy$ = new Subject();
        this.showSearchField = false;
        /**
         * Search input placeholder
         * @type {string}
         */
        this.placeholder = 'Search...';
        /**
         * Hint showing under the input field to improve user experience
         *
         * @type {string}
         */
        this.hint = 'Hit enter to search';
    }
    ngOnInit() {
        this.router.events
            .pipe(filter(event => event instanceof NavigationEnd), takeUntil(this.destroy$))
            .subscribe(() => this.hideSearch());
        this.searchService.onSearchActivate()
            .pipe(filter(data => !this.tag || data.tag === this.tag), takeUntil(this.destroy$))
            .subscribe(() => this.openSearch());
        this.searchService.onSearchDeactivate()
            .pipe(filter(data => !this.tag || data.tag === this.tag), takeUntil(this.destroy$))
            .subscribe(() => this.hideSearch());
    }
    ngOnDestroy() {
        if (this.overlayRef && this.overlayRef.hasAttached()) {
            this.removeLayoutClasses();
            this.overlayRef.detach();
        }
        this.destroy$.next();
        this.destroy$.complete();
    }
    openSearch() {
        if (!this.overlayRef) {
            this.overlayRef = this.overlayService.create();
            this.overlayRef.attach(this.searchFieldPortal);
        }
        this.themeService.appendLayoutClass(this.type);
        observableOf(null).pipe(delay(0)).subscribe(() => {
            this.themeService.appendLayoutClass('with-search');
            this.showSearchField = true;
            this.changeDetector.detectChanges();
        });
    }
    hideSearch() {
        this.removeLayoutClasses();
        this.showSearchField = false;
        this.changeDetector.detectChanges();
        this.searchButton.nativeElement.focus();
    }
    search(term) {
        this.searchService.submitSearch(term, this.tag);
        this.hideSearch();
    }
    emitInput(term) {
        this.searchService.searchInput(term, this.tag);
    }
    emitActivate() {
        this.searchService.activateSearch(this.type, this.tag);
    }
    emitDeactivate() {
        this.searchService.deactivateSearch(this.type, this.tag);
    }
    removeLayoutClasses() {
        this.themeService.removeLayoutClass('with-search');
        observableOf(null).pipe(delay(500)).subscribe(() => {
            this.themeService.removeLayoutClass(this.type);
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbSearchComponent, deps: [{ token: i4.NbSearchService }, { token: i5.NbThemeService }, { token: i6.Router }, { token: i7.NbOverlayService }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.1.0", type: NbSearchComponent, selector: "nb-search", inputs: { tag: "tag", placeholder: "placeholder", hint: "hint", type: "type" }, viewQueries: [{ propertyName: "searchFieldPortal", first: true, predicate: NbPortalDirective, descendants: true }, { propertyName: "searchButton", first: true, predicate: ["searchButton"], descendants: true, read: ElementRef }], ngImport: i0, template: `
    <button #searchButton class="start-search" (click)="emitActivate()" nbButton ghost>
      <nb-icon icon="search-outline" pack="nebular-essentials"></nb-icon>
    </button>
    <nb-search-field
      *nbPortal
      [show]="showSearchField"
      [type]="type"
      [placeholder]="placeholder"
      [hint]="hint"
      (search)="search($event)"
      (searchInput)="emitInput($event)"
      (close)="emitDeactivate()">
    </nb-search-field>
  `, isInline: true, styles: ["/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */:host button{font-size:2rem;margin:0 auto;padding:0;cursor:pointer;border:none;background:none}:host button:focus{box-shadow:none;outline:none}::ng-deep nb-layout.with-search .scrollable-container{position:relative;z-index:0}\n"], dependencies: [{ kind: "directive", type: i8.NbPortalDirective, selector: "[nbPortal]" }, { kind: "component", type: i2.NbIconComponent, selector: "nb-icon", inputs: ["icon", "pack", "options", "status", "config"] }, { kind: "component", type: i3.NbButtonComponent, selector: "button[nbButton],a[nbButton],input[type=\"button\"][nbButton],input[type=\"submit\"][nbButton]", inputs: ["hero"] }, { kind: "component", type: NbSearchFieldComponent, selector: "nb-search-field", inputs: ["type", "placeholder", "hint", "show"], outputs: ["close", "search", "searchInput"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0", ngImport: i0, type: NbSearchComponent, decorators: [{
            type: Component,
            args: [{ selector: 'nb-search', changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <button #searchButton class="start-search" (click)="emitActivate()" nbButton ghost>
      <nb-icon icon="search-outline" pack="nebular-essentials"></nb-icon>
    </button>
    <nb-search-field
      *nbPortal
      [show]="showSearchField"
      [type]="type"
      [placeholder]="placeholder"
      [hint]="hint"
      (search)="search($event)"
      (searchInput)="emitInput($event)"
      (close)="emitDeactivate()">
    </nb-search-field>
  `, styles: ["/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */:host button{font-size:2rem;margin:0 auto;padding:0;cursor:pointer;border:none;background:none}:host button:focus{box-shadow:none;outline:none}::ng-deep nb-layout.with-search .scrollable-container{position:relative;z-index:0}\n"] }]
        }], ctorParameters: () => [{ type: i4.NbSearchService }, { type: i5.NbThemeService }, { type: i6.Router }, { type: i7.NbOverlayService }, { type: i0.ChangeDetectorRef }], propDecorators: { tag: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], hint: [{
                type: Input
            }], type: [{
                type: Input
            }], searchFieldPortal: [{
                type: ViewChild,
                args: [NbPortalDirective]
            }], searchButton: [{
                type: ViewChild,
                args: ['searchButton', { read: ElementRef }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9mcmFtZXdvcmsvdGhlbWUvY29tcG9uZW50cy9zZWFyY2gvc2VhcmNoLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUVMLHVCQUF1QixFQUV2QixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixXQUFXLEVBQ1gsS0FBSyxFQUlMLE1BQU0sRUFFTixTQUFTLEdBQ1YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGFBQWEsRUFBVSxNQUFNLGlCQUFpQixDQUFDO0FBRXhELE9BQU8sRUFBRSxFQUFFLElBQUksWUFBWSxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNuRCxPQUFPLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUsxRCxPQUFPLEVBQWdCLGlCQUFpQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7Ozs7Ozs7Ozs7QUFFekU7OztHQUdHO0FBbUNILE1BQU0sT0FBTyxzQkFBc0I7SUFsQ25DO1FBK0NXLFNBQUksR0FBRyxLQUFLLENBQUM7UUFFWixVQUFLLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUMzQixXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUM1QixnQkFBVyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7S0E0RTVDO2FBM0ZpQixzQkFBaUIsR0FBRyxjQUFjLEFBQWpCLENBQWtCO2FBQ25DLHVCQUFrQixHQUFHLGVBQWUsQUFBbEIsQ0FBbUI7YUFDckMsb0JBQWUsR0FBRyxZQUFZLEFBQWYsQ0FBZ0I7YUFDL0IsaUJBQVksR0FBRyxTQUFTLEFBQVosQ0FBYTthQUN6Qix3QkFBbUIsR0FBRyxnQkFBZ0IsQUFBbkIsQ0FBb0I7YUFDdkMsb0JBQWUsR0FBRyxZQUFZLEFBQWYs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QUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFFTyxtQkFBbUI7UUFDekIsSUFBSSxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNuRCxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDakQsSUFBSSxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakQsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOzhHQXpIVSxpQkFBaUI7a0dBQWpCLGlCQUFpQixvTEFrQ2pCLGlCQUFpQiwwSEFDTyxVQUFVLDZCQW5EbkM7Ozs7Ozs7Ozs7Ozs7O0dBY1QsdzBCQXRLVSxzQkFBc0I7OzJGQXdLdEIsaUJBQWlCO2tCQXBCN0IsU0FBUzsrQkFDRSxXQUFXLG1CQUNKLHVCQUF1QixDQUFDLE1BQU0sWUFFckM7Ozs7Ozs7Ozs7Ozs7O0dBY1Q7cU1BY1EsR0FBRztzQkFBWCxLQUFLO2dCQU1HLFdBQVc7c0JBQW5CLEtBQUs7Z0JBT0csSUFBSTtzQkFBWixLQUFLO2dCQU9HLElBQUk7c0JBQVosS0FBSztnQkFFd0IsaUJBQWlCO3NCQUE5QyxTQUFTO3VCQUFDLGlCQUFpQjtnQkFDcUIsWUFBWTtzQkFBNUQsU0FBUzt1QkFBQyxjQUFjLEVBQUUsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEFrdmVvLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqL1xuXG5pbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0QmluZGluZyxcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVmlld0NoaWxkLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5hdmlnYXRpb25FbmQsIFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5cbmltcG9ydCB7IG9mIGFzIG9ic2VydmFibGVPZiwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCBkZWxheSwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBOYlNlYXJjaFNlcnZpY2UgfSBmcm9tICcuL3NlYXJjaC5zZXJ2aWNlJztcbmltcG9ydCB7IE5iVGhlbWVTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvdGhlbWUuc2VydmljZSc7XG5pbXBvcnQgeyBOYk92ZXJsYXlTZXJ2aWNlIH0gZnJvbSAnLi4vY2RrL292ZXJsYXkvb3ZlcmxheS1zZXJ2aWNlJztcbmltcG9ydCB7IE5iT3ZlcmxheVJlZiwgTmJQb3J0YWxEaXJlY3RpdmUgfSBmcm9tICcuLi9jZGsvb3ZlcmxheS9tYXBwaW5nJztcblxuLyoqXG4gKiBzZWFyY2gtZmllbGQtY29tcG9uZW50IGlzIHVzZWQgdW5kZXIgdGhlIGhvb2QgYnkgbmItc2VhcmNoIGNvbXBvbmVudFxuICogY2FuJ3QgYmUgdXNlZCBpdHNlbGZcbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmItc2VhcmNoLWZpZWxkJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHN0eWxlVXJsczogW1xuICAgICdzdHlsZXMvc2VhcmNoLmNvbXBvbmVudC5tb2RhbC16b29taW4uc2NzcycsXG4gICAgJ3N0eWxlcy9zZWFyY2guY29tcG9uZW50LmxheW91dC1yb3RhdGUuc2NzcycsXG4gICAgJ3N0eWxlcy9zZWFyY2guY29tcG9uZW50Lm1vZGFsLW1vdmUuc2NzcycsXG4gICAgJ3N0eWxlcy9zZWFyY2guY29tcG9uZW50LmN1cnRhaW4uc2NzcycsXG4gICAgJ3N0eWxlcy9zZWFyY2guY29tcG9uZW50LmNvbHVtbi1jdXJ0YWluLnNjc3MnLFxuICAgICdzdHlsZXMvc2VhcmNoLmNvbXBvbmVudC5tb2RhbC1kcm9wLnNjc3MnLFxuICAgICdzdHlsZXMvc2VhcmNoLmNvbXBvbmVudC5tb2RhbC1oYWxmLnNjc3MnLFxuICBdLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJzZWFyY2hcIiAoa2V5dXAuZXNjKT1cImVtaXRDbG9zZSgpXCI+XG4gICAgICA8YnV0dG9uIChjbGljayk9XCJlbWl0Q2xvc2UoKVwiIG5iQnV0dG9uIGdob3N0IGNsYXNzPVwiY2xvc2UtYnV0dG9uXCI+XG4gICAgICAgIDxuYi1pY29uIGljb249XCJjbG9zZS1vdXRsaW5lXCIgcGFjaz1cIm5lYnVsYXItZXNzZW50aWFsc1wiPjwvbmItaWNvbj5cbiAgICAgIDwvYnV0dG9uPlxuICAgICAgPGRpdiBjbGFzcz1cImZvcm0td3JhcHBlclwiPlxuICAgICAgICA8Zm9ybSBjbGFzcz1cImZvcm1cIiAoa2V5dXAuZW50ZXIpPVwic3VibWl0U2VhcmNoKHNlYXJjaElucHV0LnZhbHVlKVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWNvbnRlbnRcIj5cbiAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cInNlYXJjaC1pbnB1dFwiXG4gICAgICAgICAgICAgICAgICAgI3NlYXJjaElucHV0XG4gICAgICAgICAgICAgICAgICAgKGlucHV0KT1cImVtaXRTZWFyY2hJbnB1dChzZWFyY2hJbnB1dC52YWx1ZSlcIlxuICAgICAgICAgICAgICAgICAgIGF1dG9jb21wbGV0ZT1cIm9mZlwiXG4gICAgICAgICAgICAgICAgICAgW2F0dHIucGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIlxuICAgICAgICAgICAgICAgICAgIHRhYmluZGV4PVwiLTFcIlxuICAgICAgICAgICAgICAgICAgIChibHVyKT1cImZvY3VzSW5wdXQoKVwiLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImluZm9cIj57eyBoaW50IH19PC9zcGFuPlxuICAgICAgICA8L2Zvcm0+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgTmJTZWFyY2hGaWVsZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgc3RhdGljIHJlYWRvbmx5IFRZUEVfTU9EQUxfWk9PTUlOID0gJ21vZGFsLXpvb21pbic7XG4gIHN0YXRpYyByZWFkb25seSBUWVBFX1JPVEFURV9MQVlPVVQgPSAncm90YXRlLWxheW91dCc7XG4gIHN0YXRpYyByZWFkb25seSBUWVBFX01PREFMX01PVkUgPSAnbW9kYWwtbW92ZSc7XG4gIHN0YXRpYyByZWFkb25seSBUWVBFX0NVUlRBSU4gPSAnY3VydGFpbic7XG4gIHN0YXRpYyByZWFkb25seSBUWVBFX0NPTFVNTl9DVVJUQUlOID0gJ2NvbHVtbi1jdXJ0YWluJztcbiAgc3RhdGljIHJlYWRvbmx5IFRZUEVfTU9EQUxfRFJPUCA9ICdtb2RhbC1kcm9wJztcbiAgc3RhdGljIHJlYWRvbmx5IFRZUEVfTU9EQUxfSEFMRiA9ICdtb2RhbC1oYWxmJztcblxuICBASW5wdXQoKSB0eXBlOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGhpbnQ6IHN0cmluZztcbiAgQElucHV0KCkgc2hvdyA9IGZhbHNlO1xuXG4gIEBPdXRwdXQoKSBjbG9zZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHNlYXJjaCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHNlYXJjaElucHV0ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIEBWaWV3Q2hpbGQoJ3NlYXJjaElucHV0JykgaW5wdXRFbGVtZW50OiBFbGVtZW50UmVmPEhUTUxJbnB1dEVsZW1lbnQ+O1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3Muc2hvdycpXG4gIGdldCBzaG93Q2xhc3MoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2hvdztcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3MubW9kYWwtem9vbWluJylcbiAgZ2V0IG1vZGFsWm9vbWluKCkge1xuICAgIHJldHVybiB0aGlzLnR5cGUgPT09IE5iU2VhcmNoRmllbGRDb21wb25lbnQuVFlQRV9NT0RBTF9aT09NSU47XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnJvdGF0ZS1sYXlvdXQnKVxuICBnZXQgcm90YXRlTGF5b3V0KCkge1xuICAgIHJldHVybiB0aGlzLnR5cGUgPT09IE5iU2VhcmNoRmllbGRDb21wb25lbnQuVFlQRV9ST1RBVEVfTEFZT1VUO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5tb2RhbC1tb3ZlJylcbiAgZ2V0IG1vZGFsTW92ZSgpIHtcbiAgICByZXR1cm4gdGhpcy50eXBlID09PSBOYlNlYXJjaEZpZWxkQ29tcG9uZW50LlRZUEVfTU9EQUxfTU9WRTtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3MuY3VydGFpbicpXG4gIGdldCBjdXJ0YWluKCkge1xuICAgIHJldHVybiB0aGlzLnR5cGUgPT09IE5iU2VhcmNoRmllbGRDb21wb25lbnQuVFlQRV9DVVJUQUlOO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5jb2x1bW4tY3VydGFpbicpXG4gIGdldCBjb2x1bW5DdXJ0YWluKCkge1xuICAgIHJldHVybiB0aGlzLnR5cGUgPT09IE5iU2VhcmNoRmllbGRDb21wb25lbnQuVFlQRV9DT0xVTU5fQ1VSVEFJTjtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3MubW9kYWwtZHJvcCcpXG4gIGdldCBtb2RhbERyb3AoKSB7XG4gICAgcmV0dXJuIHRoaXMudHlwZSA9PT0gTmJTZWFyY2hGaWVsZENvbXBvbmVudC5UWVBFX01PREFMX0RST1A7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLm1vZGFsLWhhbGYnKVxuICBnZXQgbW9kYWxIYWxmKCkge1xuICAgIHJldHVybiB0aGlzLnR5cGUgPT09IE5iU2VhcmNoRmllbGRDb21wb25lbnQuVFlQRV9NT0RBTF9IQUxGO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoeyBzaG93IH06IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBjb25zdCBiZWNhbWVIaWRkZW4gPSAhc2hvdy5pc0ZpcnN0Q2hhbmdlKCkgJiYgc2hvdy5jdXJyZW50VmFsdWUgPT09IGZhbHNlO1xuICAgIGlmIChiZWNhbWVIaWRkZW4gJiYgdGhpcy5pbnB1dEVsZW1lbnQpIHtcbiAgICAgIHRoaXMuaW5wdXRFbGVtZW50Lm5hdGl2ZUVsZW1lbnQudmFsdWUgPSAnJztcbiAgICB9XG5cbiAgICB0aGlzLmZvY3VzSW5wdXQoKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLmZvY3VzSW5wdXQoKTtcbiAgfVxuXG4gIGVtaXRDbG9zZSgpIHtcbiAgICB0aGlzLmNsb3NlLmVtaXQoKTtcbiAgfVxuXG4gIHN1Ym1pdFNlYXJjaCh0ZXJtKSB7XG4gICAgaWYgKHRlcm0pIHtcbiAgICAgIHRoaXMuc2VhcmNoLmVtaXQodGVybSk7XG4gICAgfVxuICB9XG5cbiAgZW1pdFNlYXJjaElucHV0KHRlcm06IHN0cmluZykge1xuICAgIHRoaXMuc2VhcmNoSW5wdXQuZW1pdCh0ZXJtKTtcbiAgfVxuXG4gIGZvY3VzSW5wdXQoKSB7XG4gICAgaWYgKHRoaXMuc2hvdyAmJiB0aGlzLmlucHV0RWxlbWVudCkge1xuICAgICAgdGhpcy5pbnB1dEVsZW1lbnQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgdHlwZSBOYlNlYXJjaFR5cGUgPSAnbW9kYWwtem9vbWluJyB8ICdyb3RhdGUtbGF5b3V0JyB8ICdtb2RhbC1tb3ZlJyB8XG4gICdjdXJ0YWluJyB8ICdjb2x1bW4tY3VydGFpbicgfCAnbW9kYWwtZHJvcCcgfCAnbW9kYWwtaGFsZic7XG5cbi8qKlxuICogQmVhdXRpZnVsIGZ1bGwtcGFnZSBzZWFyY2ggY29udHJvbC5cbiAqXG4gKiBAc3RhY2tlZC1leGFtcGxlKFNob3djYXNlLCBzZWFyY2gvc2VhcmNoLXNob3djYXNlLmNvbXBvbmVudClcbiAqXG4gKiBCYXNpYyBzZXR1cDpcbiAqXG4gKiBgYGB0c1xuICogIDxuYi1zZWFyY2ggdHlwZT1cInJvdGF0ZS1sYXlvdXRcIj48L25iLXNlYXJjaD5cbiAqIGBgYFxuICogIyMjIEluc3RhbGxhdGlvblxuICpcbiAqIEltcG9ydCBgTmJTZWFyY2hNb2R1bGVgIHRvIHlvdXIgZmVhdHVyZSBtb2R1bGUuXG4gKiBgYGB0c1xuICogQE5nTW9kdWxlKHtcbiAqICAgaW1wb3J0czogW1xuICogICAgIC8vIC4uLlxuICogICAgIE5iU2VhcmNoTW9kdWxlLFxuICogICBdLFxuICogfSlcbiAqIGV4cG9ydCBjbGFzcyBQYWdlTW9kdWxlIHsgfVxuICogYGBgXG4gKiAjIyMgVXNhZ2VcbiAqXG4gKiBTZXZlcmFsIGFuaW1hdGlvbiB0eXBlcyBhcmUgYXZhaWxhYmxlOlxuICogbW9kYWwtem9vbWluLCByb3RhdGUtbGF5b3V0LCBtb2RhbC1tb3ZlLCBjdXJ0YWluLCBjb2x1bW4tY3VydGFpbiwgbW9kYWwtZHJvcCwgbW9kYWwtaGFsZlxuICpcbiAqIEl0IGlzIGFsc28gcG9zc2libGUgdG8gaGFuZGxlIHNlYXJjaCBldmVudCB1c2luZyBgTmJTZWFyY2hTZXJ2aWNlYDpcbiAqXG4gKiBAc3RhY2tlZC1leGFtcGxlKFNlYXJjaCBFdmVudCwgc2VhcmNoL3NlYXJjaC1ldmVudC5jb21wb25lbnQpXG4gKlxuICogQHN0eWxlc1xuICpcbiAqIHNlYXJjaC1iYWNrZ3JvdW5kLWNvbG9yOlxuICogc2VhcmNoLWRpdmlkZXItY29sb3I6XG4gKiBzZWFyY2gtZGl2aWRlci1zdHlsZTpcbiAqIHNlYXJjaC1kaXZpZGVyLXdpZHRoOlxuICogc2VhcmNoLWV4dHJhLWJhY2tncm91bmQtY29sb3I6XG4gKiBzZWFyY2gtdGV4dC1jb2xvcjpcbiAqIHNlYXJjaC10ZXh0LWZvbnQtZmFtaWx5OlxuICogc2VhcmNoLXRleHQtZm9udC1zaXplOlxuICogc2VhcmNoLXRleHQtZm9udC13ZWlnaHQ6XG4gKiBzZWFyY2gtdGV4dC1saW5lLWhlaWdodDpcbiAqIHNlYXJjaC1wbGFjZWhvbGRlci10ZXh0LWNvbG9yOlxuICogc2VhcmNoLWluZm8tdGV4dC1jb2xvcjpcbiAqIHNlYXJjaC1pbmZvLXRleHQtZm9udC1mYW1pbHk6XG4gKiBzZWFyY2gtaW5mby10ZXh0LWZvbnQtc2l6ZTpcbiAqIHNlYXJjaC1pbmZvLXRleHQtZm9udC13ZWlnaHQ6XG4gKiBzZWFyY2gtaW5mby10ZXh0LWxpbmUtaGVpZ2h0OlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduYi1zZWFyY2gnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgc3R5bGVVcmxzOiBbJ3N0eWxlcy9zZWFyY2guY29tcG9uZW50LnNjc3MnXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8YnV0dG9uICNzZWFyY2hCdXR0b24gY2xhc3M9XCJzdGFydC1zZWFyY2hcIiAoY2xpY2spPVwiZW1pdEFjdGl2YXRlKClcIiBuYkJ1dHRvbiBnaG9zdD5cbiAgICAgIDxuYi1pY29uIGljb249XCJzZWFyY2gtb3V0bGluZVwiIHBhY2s9XCJuZWJ1bGFyLWVzc2VudGlhbHNcIj48L25iLWljb24+XG4gICAgPC9idXR0b24+XG4gICAgPG5iLXNlYXJjaC1maWVsZFxuICAgICAgKm5iUG9ydGFsXG4gICAgICBbc2hvd109XCJzaG93U2VhcmNoRmllbGRcIlxuICAgICAgW3R5cGVdPVwidHlwZVwiXG4gICAgICBbcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIlxuICAgICAgW2hpbnRdPVwiaGludFwiXG4gICAgICAoc2VhcmNoKT1cInNlYXJjaCgkZXZlbnQpXCJcbiAgICAgIChzZWFyY2hJbnB1dCk9XCJlbWl0SW5wdXQoJGV2ZW50KVwiXG4gICAgICAoY2xvc2UpPVwiZW1pdERlYWN0aXZhdGUoKVwiPlxuICAgIDwvbmItc2VhcmNoLWZpZWxkPlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBOYlNlYXJjaENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcblxuICBwcml2YXRlIGRlc3Ryb3kkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcbiAgcHJpdmF0ZSBvdmVybGF5UmVmOiBOYk92ZXJsYXlSZWY7XG4gIHNob3dTZWFyY2hGaWVsZCA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBUYWdzIGEgc2VhcmNoIHdpdGggc29tZSBJRCwgY2FuIGJlIGxhdGVyIHVzZWQgaW4gdGhlIHNlYXJjaCBzZXJ2aWNlXG4gICAqIHRvIGRldGVybWluZSB3aGljaCBzZWFyY2ggY29tcG9uZW50IHRyaWdnZXJlZCB0aGUgYWN0aW9uLCBpZiBtdWx0aXBsZSBzZWFyY2hlcyBleGlzdCBvbiB0aGUgcGFnZS5cbiAgICpcbiAgICogQHR5cGUge3N0cmluZ31cbiAgICovXG4gIEBJbnB1dCgpIHRhZzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBTZWFyY2ggaW5wdXQgcGxhY2Vob2xkZXJcbiAgICogQHR5cGUge3N0cmluZ31cbiAgICovXG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyOiBzdHJpbmcgPSAnU2VhcmNoLi4uJztcblxuICAvKipcbiAgICogSGludCBzaG93aW5nIHVuZGVyIHRoZSBpbnB1dCBmaWVsZCB0byBpbXByb3ZlIHVzZXIgZXhwZXJpZW5jZVxuICAgKlxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKi9cbiAgQElucHV0KCkgaGludDogc3RyaW5nID0gJ0hpdCBlbnRlciB0byBzZWFyY2gnO1xuXG4gIC8qKlxuICAgKiBTZWFyY2ggZGVzaWduIHR5cGUsIGF2YWlsYWJsZSB0eXBlcyBhcmVcbiAgICogbW9kYWwtem9vbWluLCByb3RhdGUtbGF5b3V0LCBtb2RhbC1tb3ZlLCBjdXJ0YWluLCBjb2x1bW4tY3VydGFpbiwgbW9kYWwtZHJvcCwgbW9kYWwtaGFsZlxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKi9cbiAgQElucHV0KCkgdHlwZTogTmJTZWFyY2hUeXBlO1xuXG4gIEBWaWV3Q2hpbGQoTmJQb3J0YWxEaXJlY3RpdmUpIHNlYXJjaEZpZWxkUG9ydGFsOiBOYlBvcnRhbERpcmVjdGl2ZTtcbiAgQFZpZXdDaGlsZCgnc2VhcmNoQnV0dG9uJywgeyByZWFkOiBFbGVtZW50UmVmIH0pIHNlYXJjaEJ1dHRvbjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBzZWFyY2hTZXJ2aWNlOiBOYlNlYXJjaFNlcnZpY2UsXG4gICAgcHJpdmF0ZSB0aGVtZVNlcnZpY2U6IE5iVGhlbWVTZXJ2aWNlLFxuICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXG4gICAgcHJpdmF0ZSBvdmVybGF5U2VydmljZTogTmJPdmVybGF5U2VydmljZSxcbiAgICBwcml2YXRlIGNoYW5nZURldGVjdG9yOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMucm91dGVyLmV2ZW50c1xuICAgICAgLnBpcGUoXG4gICAgICAgIGZpbHRlcihldmVudCA9PiBldmVudCBpbnN0YW5jZW9mIE5hdmlnYXRpb25FbmQpLFxuICAgICAgICB0YWtlVW50aWwodGhpcy5kZXN0cm95JCksXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuaGlkZVNlYXJjaCgpKTtcblxuICAgIHRoaXMuc2VhcmNoU2VydmljZS5vblNlYXJjaEFjdGl2YXRlKClcbiAgICAgIC5waXBlKFxuICAgICAgICBmaWx0ZXIoZGF0YSA9PiAhdGhpcy50YWcgfHwgZGF0YS50YWcgPT09IHRoaXMudGFnKSxcbiAgICAgICAgdGFrZVVudGlsKHRoaXMuZGVzdHJveSQpLFxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLm9wZW5TZWFyY2goKSk7XG5cbiAgICB0aGlzLnNlYXJjaFNlcnZpY2Uub25TZWFyY2hEZWFjdGl2YXRlKClcbiAgICAgIC5waXBlKFxuICAgICAgICBmaWx0ZXIoZGF0YSA9PiAhdGhpcy50YWcgfHwgZGF0YS50YWcgPT09IHRoaXMudGFnKSxcbiAgICAgICAgdGFrZVVudGlsKHRoaXMuZGVzdHJveSQpLFxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLmhpZGVTZWFyY2goKSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5vdmVybGF5UmVmICYmIHRoaXMub3ZlcmxheVJlZi5oYXNBdHRhY2hlZCgpKSB7XG4gICAgICB0aGlzLnJlbW92ZUxheW91dENsYXNzZXMoKTtcbiAgICAgIHRoaXMub3ZlcmxheVJlZi5kZXRhY2goKTtcbiAgICB9XG5cbiAgICB0aGlzLmRlc3Ryb3kkLm5leHQoKTtcbiAgICB0aGlzLmRlc3Ryb3kkLmNvbXBsZXRlKCk7XG4gIH1cblxuICBvcGVuU2VhcmNoKCkge1xuICAgIGlmICghdGhpcy5vdmVybGF5UmVmKSB7XG4gICAgICB0aGlzLm92ZXJsYXlSZWYgPSB0aGlzLm92ZXJsYXlTZXJ2aWNlLmNyZWF0ZSgpO1xuICAgICAgdGhpcy5vdmVybGF5UmVmLmF0dGFjaCh0aGlzLnNlYXJjaEZpZWxkUG9ydGFsKTtcbiAgICB9XG5cbiAgICB0aGlzLnRoZW1lU2VydmljZS5hcHBlbmRMYXlvdXRDbGFzcyh0aGlzLnR5cGUpO1xuICAgIG9ic2VydmFibGVPZihudWxsKS5waXBlKGRlbGF5KDApKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy50aGVtZVNlcnZpY2UuYXBwZW5kTGF5b3V0Q2xhc3MoJ3dpdGgtc2VhcmNoJyk7XG4gICAgICB0aGlzLnNob3dTZWFyY2hGaWVsZCA9IHRydWU7XG4gICAgICB0aGlzLmNoYW5nZURldGVjdG9yLmRldGVjdENoYW5nZXMoKTtcbiAgICB9KTtcbiAgfVxuXG4gIGhpZGVTZWFyY2goKSB7XG4gICAgdGhpcy5yZW1vdmVMYXlvdXRDbGFzc2VzKCk7XG4gICAgdGhpcy5zaG93U2VhcmNoRmllbGQgPSBmYWxzZTtcbiAgICB0aGlzLmNoYW5nZURldGVjdG9yLmRldGVjdENoYW5nZXMoKTtcbiAgICB0aGlzLnNlYXJjaEJ1dHRvbi5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gIH1cblxuICBzZWFyY2godGVybSkge1xuICAgIHRoaXMuc2VhcmNoU2VydmljZS5zdWJtaXRTZWFyY2godGVybSwgdGhpcy50YWcpO1xuICAgIHRoaXMuaGlkZVNlYXJjaCgpO1xuICB9XG5cbiAgZW1pdElucHV0KHRlcm06IHN0cmluZykge1xuICAgIHRoaXMuc2VhcmNoU2VydmljZS5zZWFyY2hJbnB1dCh0ZXJtLCB0aGlzLnRhZyk7XG4gIH1cblxuICBlbWl0QWN0aXZhdGUoKSB7XG4gICAgdGhpcy5zZWFyY2hTZXJ2aWNlLmFjdGl2YXRlU2VhcmNoKHRoaXMudHlwZSwgdGhpcy50YWcpO1xuICB9XG5cbiAgZW1pdERlYWN0aXZhdGUoKSB7XG4gICAgdGhpcy5zZWFyY2hTZXJ2aWNlLmRlYWN0aXZhdGVTZWFyY2godGhpcy50eXBlLCB0aGlzLnRhZyk7XG4gIH1cblxuICBwcml2YXRlIHJlbW92ZUxheW91dENsYXNzZXMoKSB7XG4gICAgdGhpcy50aGVtZVNlcnZpY2UucmVtb3ZlTGF5b3V0Q2xhc3MoJ3dpdGgtc2VhcmNoJyk7XG4gICAgb2JzZXJ2YWJsZU9mKG51bGwpLnBpcGUoZGVsYXkoNTAwKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMudGhlbWVTZXJ2aWNlLnJlbW92ZUxheW91dENsYXNzKHRoaXMudHlwZSk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==